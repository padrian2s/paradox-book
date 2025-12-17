/**
 * Levinthal's Paradox Simulator
 * Proteins fold in milliseconds despite astronomical number of possible configurations
 */
import { SimulatorBase } from '../simulator-base.js';

class LevinthalSimulator extends SimulatorBase {
    constructor() {
        super();
        this.isRunning = false;
        this.randomSteps = 0;
        this.guidedSteps = 0;
        this.animationId = null;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .protein-container {
                    display: flex;
                    justify-content: space-around;
                    gap: 1rem;
                    margin-top: 1rem;
                    flex-wrap: wrap;
                }

                .folding-box {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                    flex: 1;
                    min-width: 200px;
                }

                .folding-title {
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                }

                .protein-visual {
                    height: 150px;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    overflow: hidden;
                }

                .chain {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 2px;
                    padding: 10px;
                }

                .amino-acid {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    transition: all 0.1s;
                }

                .unfolded { background: var(--muted, #94a3b8); }
                .folding { background: #f59e0b; }
                .folded { background: #22c55e; }

                .stats-display {
                    margin-top: 1rem;
                    font-size: 0.9rem;
                }

                .stat-row {
                    display: flex;
                    justify-content: space-between;
                    padding: 0.25rem 0;
                }

                .stat-value {
                    color: var(--accent, #f59e0b);
                    font-weight: bold;
                }

                .time-comparison {
                    margin-top: 1rem;
                    padding: 1rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                }

                .time-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.5rem 0;
                    border-bottom: 1px solid var(--card, #1e293b);
                }

                .time-row:last-child {
                    border-bottom: none;
                }

                .time-label {
                    font-size: 0.9rem;
                }

                .time-value {
                    font-weight: bold;
                    font-size: 0.85rem;
                }

                .time-random { color: #ef4444; }
                .time-actual { color: #22c55e; }

                .progress-bar {
                    height: 8px;
                    background: var(--bg, #0f172a);
                    border-radius: 0.25rem;
                    margin-top: 0.5rem;
                    overflow: hidden;
                }

                .progress-fill {
                    height: 100%;
                    transition: width 0.1s;
                }

                .random-fill { background: #ef4444; }
                .guided-fill { background: #22c55e; }

                .configuration-display {
                    font-family: monospace;
                    font-size: 0.8rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.5rem;
                }

                @media (max-width: 600px) {
                    .protein-container {
                        flex-direction: column;
                    }
                }
            </style>

            <h4>Protein Folding Challenge</h4>

            <div class="protein-container">
                <div class="folding-box">
                    <div class="folding-title">Random Search</div>
                    <div class="protein-visual">
                        <div class="chain" id="random-chain"></div>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill random-fill" id="random-progress" style="width: 0%"></div>
                    </div>
                    <div class="stats-display">
                        <div class="stat-row">
                            <span>Configurations tried:</span>
                            <span class="stat-value" id="random-configs">0</span>
                        </div>
                        <div class="stat-row">
                            <span>Progress:</span>
                            <span class="stat-value" id="random-percent">0%</span>
                        </div>
                    </div>
                    <div class="configuration-display" id="random-status">Waiting...</div>
                </div>

                <div class="folding-box">
                    <div class="folding-title">Energy-Guided Folding</div>
                    <div class="protein-visual">
                        <div class="chain" id="guided-chain"></div>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill guided-fill" id="guided-progress" style="width: 0%"></div>
                    </div>
                    <div class="stats-display">
                        <div class="stat-row">
                            <span>Steps taken:</span>
                            <span class="stat-value" id="guided-steps">0</span>
                        </div>
                        <div class="stat-row">
                            <span>Progress:</span>
                            <span class="stat-value" id="guided-percent">0%</span>
                        </div>
                    </div>
                    <div class="configuration-display" id="guided-status">Waiting...</div>
                </div>
            </div>

            <div class="controls">
                <button id="start-btn">Start Folding</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="time-comparison">
                <div style="font-weight: bold; margin-bottom: 0.5rem;">Time to Find Correct Fold</div>
                <div class="time-row">
                    <span class="time-label">Random search (100 amino acids):</span>
                    <span class="time-value time-random">10^77 years</span>
                </div>
                <div class="time-row">
                    <span class="time-label">Age of universe:</span>
                    <span class="time-value">13.8 billion years</span>
                </div>
                <div class="time-row">
                    <span class="time-label">Actual protein folding:</span>
                    <span class="time-value time-actual">Milliseconds</span>
                </div>
            </div>

            <div class="result" id="result">
                <p>A 100 amino acid protein has ~3^100 = 10^47 possible configurations.</p>
                <p>Trying one per picosecond would take longer than the universe has existed!</p>
            </div>

            <div class="insight">
                Proteins don't search randomly - they follow an energy landscape, always moving toward lower energy states. Like water flowing downhill, they find the correct fold through physics, not luck. This "funnel" mechanism makes the impossible routine.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#start-btn').addEventListener('click', () => this.startFolding());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
    }

    connectedCallback() {
        super.connectedCallback();
        this.initChains();
    }

    initChains() {
        const randomChain = this.$('#random-chain');
        const guidedChain = this.$('#guided-chain');

        randomChain.innerHTML = '';
        guidedChain.innerHTML = '';

        for (let i = 0; i < 25; i++) {
            const aa1 = document.createElement('div');
            aa1.className = 'amino-acid unfolded';
            randomChain.appendChild(aa1);

            const aa2 = document.createElement('div');
            aa2.className = 'amino-acid unfolded';
            guidedChain.appendChild(aa2);
        }
    }

    startFolding() {
        if (this.isRunning) return;
        this.isRunning = true;

        this.randomSteps = 0;
        this.guidedSteps = 0;

        const randomAAs = this.$('#random-chain').querySelectorAll('.amino-acid');
        const guidedAAs = this.$('#guided-chain').querySelectorAll('.amino-acid');

        let randomFolded = 0;
        let guidedFolded = 0;
        const total = 25;

        const fold = () => {
            this.randomSteps++;
            this.guidedSteps++;

            if (randomFolded < total) {
                if (Math.random() < 0.01) {
                    randomAAs[randomFolded].classList.remove('unfolded');
                    randomAAs[randomFolded].classList.add('folding');
                    setTimeout(() => {
                        randomAAs[randomFolded - 1]?.classList.remove('folding');
                        randomAAs[randomFolded - 1]?.classList.add('folded');
                    }, 100);
                    randomFolded++;
                }
            }

            if (guidedFolded < total && this.guidedSteps % 5 === 0) {
                guidedAAs[guidedFolded].classList.remove('unfolded');
                guidedAAs[guidedFolded].classList.add('folding');
                setTimeout(() => {
                    guidedAAs[guidedFolded - 1]?.classList.remove('folding');
                    guidedAAs[guidedFolded - 1]?.classList.add('folded');
                }, 100);
                guidedFolded++;
            }

            const randomProgress = (randomFolded / total) * 100;
            const guidedProgress = (guidedFolded / total) * 100;

            this.$('#random-progress').style.width = randomProgress + '%';
            this.$('#guided-progress').style.width = guidedProgress + '%';
            this.$('#random-configs').textContent = this.randomSteps.toLocaleString();
            this.$('#guided-steps').textContent = this.guidedSteps.toLocaleString();
            this.$('#random-percent').textContent = Math.round(randomProgress) + '%';
            this.$('#guided-percent').textContent = Math.round(guidedProgress) + '%';

            this.$('#random-status').textContent = `Trying random configurations...`;
            this.$('#guided-status').textContent = `Following energy gradient...`;

            if (guidedFolded >= total && randomFolded < total) {
                guidedAAs[total - 1].classList.remove('folding');
                guidedAAs[total - 1].classList.add('folded');

                this.$('#result').innerHTML = `
                    <p style="color: #22c55e;"><strong>Energy-guided folding complete!</strong></p>
                    <p>Guided: ${this.guidedSteps} steps to fold</p>
                    <p>Random: Still at ${Math.round(randomProgress)}% after ${this.randomSteps.toLocaleString()} attempts</p>
                    <p style="color: var(--accent);">This is why proteins can fold in milliseconds!</p>
                `;
            }

            if (randomFolded >= total) {
                randomAAs[total - 1].classList.remove('folding');
                randomAAs[total - 1].classList.add('folded');
                this.isRunning = false;
                return;
            }

            if (this.guidedSteps < 500) {
                this.animationId = requestAnimationFrame(fold);
            } else {
                this.isRunning = false;
                this.$('#result').innerHTML = `
                    <p style="color: var(--accent);"><strong>Simulation complete!</strong></p>
                    <p>Guided folding: ${guidedFolded}/${total} folded in ${this.guidedSteps} steps</p>
                    <p>Random search: ${randomFolded}/${total} folded in ${this.randomSteps} attempts</p>
                    <p>Real proteins face 10^47 configurations - random search is impossible!</p>
                `;
            }
        };

        fold();
    }

    reset() {
        cancelAnimationFrame(this.animationId);
        this.isRunning = false;
        this.randomSteps = 0;
        this.guidedSteps = 0;

        this.initChains();

        this.$('#random-progress').style.width = '0%';
        this.$('#guided-progress').style.width = '0%';
        this.$('#random-configs').textContent = '0';
        this.$('#guided-steps').textContent = '0';
        this.$('#random-percent').textContent = '0%';
        this.$('#guided-percent').textContent = '0%';
        this.$('#random-status').textContent = 'Waiting...';
        this.$('#guided-status').textContent = 'Waiting...';

        this.$('#result').innerHTML = `
            <p>A 100 amino acid protein has ~3^100 = 10^47 possible configurations.</p>
            <p>Trying one per picosecond would take longer than the universe has existed!</p>
        `;
    }

    cleanup() {
        cancelAnimationFrame(this.animationId);
    }
}

customElements.define('levinthal-simulator', LevinthalSimulator);

export { LevinthalSimulator };
