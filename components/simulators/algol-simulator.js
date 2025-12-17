import { SimulatorBase } from '../simulator-base.js';

class AlgolSimulator extends SimulatorBase {
    constructor() {
        super();
        this.showingTransfer = false;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .binary-system {
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    padding: 2rem;
                    margin: 1rem 0;
                    position: relative;
                    height: 200px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                }

                .orbit-path {
                    position: absolute;
                    width: 250px;
                    height: 120px;
                    border: 2px dashed rgba(148, 163, 184, 0.3);
                    border-radius: 50%;
                }

                .star {
                    position: absolute;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    transition: all 0.5s;
                }

                .star-a {
                    width: 80px;
                    height: 80px;
                    background: radial-gradient(circle at 30% 30%, #60a5fa, #1d4ed8);
                    box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
                    left: calc(50% - 100px);
                    font-size: 0.75rem;
                    color: white;
                }

                .star-b {
                    width: 50px;
                    height: 50px;
                    background: radial-gradient(circle at 30% 30%, #fde047, #f59e0b);
                    box-shadow: 0 0 20px rgba(245, 158, 11, 0.5);
                    right: calc(50% - 100px);
                    font-size: 0.7rem;
                    color: #1e293b;
                }

                .mass-transfer {
                    position: absolute;
                    width: 100px;
                    height: 20px;
                    left: calc(50% - 50px);
                    background: linear-gradient(90deg,
                        transparent,
                        rgba(245, 158, 11, 0.3),
                        rgba(245, 158, 11, 0.6),
                        rgba(245, 158, 11, 0.3),
                        transparent
                    );
                    opacity: 0;
                    transition: opacity 0.5s;
                }

                .mass-transfer.visible {
                    opacity: 1;
                    animation: flowRight 1s linear infinite;
                }

                @keyframes flowRight {
                    0% { background-position: -100px 0; }
                    100% { background-position: 100px 0; }
                }

                .star-info {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .star-card {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                }

                .star-title {
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .star-dot {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                }

                .star-dot.a { background: #3b82f6; }
                .star-dot.b { background: #f59e0b; }

                .star-stats {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                }

                .star-stats div {
                    margin: 0.25rem 0;
                }

                .paradox-label {
                    color: #ef4444;
                    font-weight: bold;
                }

                .timeline {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 1rem;
                    padding: 0.5rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                }

                .timeline-stage {
                    text-align: center;
                    flex: 1;
                    padding: 0.5rem;
                    cursor: pointer;
                    border-radius: 0.25rem;
                    transition: background 0.2s;
                }

                .timeline-stage:hover {
                    background: rgba(99, 102, 241, 0.2);
                }

                .timeline-stage.active {
                    background: rgba(99, 102, 241, 0.3);
                }

                .timeline-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }

                .timeline-title {
                    font-size: 0.875rem;
                    font-weight: bold;
                }
            </style>

            <h4>Algol Binary System</h4>
            <p style="color: var(--muted); margin-bottom: 1rem;">The "Demon Star" - where the smaller star appears older than its massive companion.</p>

            <div class="binary-system">
                <div class="orbit-path"></div>
                <div class="star star-a" id="star-a">Primary<br>B8V</div>
                <div class="star star-b" id="star-b">Secondary<br>K2IV</div>
                <div class="mass-transfer" id="mass-transfer"></div>
            </div>

            <div class="timeline">
                <div class="timeline-stage active" id="stage-now" data-stage="now">
                    <div class="timeline-title">Now</div>
                    <div class="timeline-label">Current state</div>
                </div>
                <div class="timeline-stage" id="stage-past" data-stage="past">
                    <div class="timeline-title">Past</div>
                    <div class="timeline-label">Original state</div>
                </div>
                <div class="timeline-stage" id="stage-transfer" data-stage="transfer">
                    <div class="timeline-title">Transfer</div>
                    <div class="timeline-label">Mass exchange</div>
                </div>
            </div>

            <div class="star-info">
                <div class="star-card">
                    <div class="star-title">
                        <span class="star-dot a"></span>
                        Primary (Algol A)
                    </div>
                    <div class="star-stats" id="stats-a">
                        <div>Mass: <strong>3.2 solar masses</strong></div>
                        <div>Type: <strong>Main sequence (young)</strong></div>
                        <div>Stage: Still fusing hydrogen</div>
                    </div>
                </div>
                <div class="star-card">
                    <div class="star-title">
                        <span class="star-dot b"></span>
                        Secondary (Algol B)
                    </div>
                    <div class="star-stats" id="stats-b">
                        <div>Mass: <strong>0.7 solar masses</strong></div>
                        <div>Type: <strong class="paradox-label">Subgiant (old!)</strong></div>
                        <div>Stage: Core hydrogen exhausted</div>
                    </div>
                </div>
            </div>

            <div class="result" id="result">
                <p><strong>The Paradox:</strong> Massive stars evolve faster and die younger. So why is the LESS massive star already a subgiant (evolved), while the MORE massive star is still on the main sequence (young)?</p>
            </div>

            <div class="insight">
                <strong>Resolution:</strong> Mass transfer! The current secondary was originally the MORE massive star. It evolved first, expanded, and transferred mass to its companion. The "young" primary is actually younger in evolution but received mass from the now-depleted secondary.
            </div>
        `;
    }

    setupEventListeners() {
        this.$$('.timeline-stage').forEach(stage => {
            stage.addEventListener('click', (e) => this.setStage(e.currentTarget.dataset.stage));
        });
    }

    setStage(stage) {
        this.$$('.timeline-stage').forEach(s => s.classList.remove('active'));
        this.$(`#stage-${stage}`).classList.add('active');

        const starA = this.$('#star-a');
        const starB = this.$('#star-b');
        const transfer = this.$('#mass-transfer');

        if (stage === 'now') {
            starA.style.width = '80px';
            starA.style.height = '80px';
            starA.innerHTML = 'Primary<br>B8V';
            starB.style.width = '50px';
            starB.style.height = '50px';
            starB.innerHTML = 'Secondary<br>K2IV';
            transfer.classList.remove('visible');

            this.$('#stats-a').innerHTML = `
                <div>Mass: <strong>3.2 solar masses</strong></div>
                <div>Type: <strong>Main sequence (young)</strong></div>
                <div>Stage: Still fusing hydrogen</div>
            `;
            this.$('#stats-b').innerHTML = `
                <div>Mass: <strong>0.7 solar masses</strong></div>
                <div>Type: <strong class="paradox-label">Subgiant (old!)</strong></div>
                <div>Stage: Core hydrogen exhausted</div>
            `;

            this.$('#result').innerHTML = `
                <p><strong>The Paradox:</strong> Massive stars evolve faster and die younger. So why is the LESS massive star already a subgiant (evolved), while the MORE massive star is still on the main sequence (young)?</p>
            `;
        } else if (stage === 'past') {
            starA.style.width = '50px';
            starA.style.height = '50px';
            starA.innerHTML = 'Star A<br>(small)';
            starB.style.width = '80px';
            starB.style.height = '80px';
            starB.innerHTML = 'Star B<br>(massive)';
            transfer.classList.remove('visible');

            this.$('#stats-a').innerHTML = `
                <div>Mass: <strong>~1 solar mass</strong></div>
                <div>Type: <strong>Main sequence</strong></div>
                <div>Stage: Young, evolving slowly</div>
            `;
            this.$('#stats-b').innerHTML = `
                <div>Mass: <strong>~3 solar masses</strong></div>
                <div>Type: <strong>Main sequence</strong></div>
                <div>Stage: Evolving FAST (massive stars burn hot)</div>
            `;

            this.$('#result').innerHTML = `
                <p><strong>Original State:</strong> Star B was originally the more massive star. Massive stars burn through their fuel much faster - a 3 solar mass star lives only ~500 million years vs 10 billion for a sun-like star.</p>
            `;
        } else {
            starA.style.width = '70px';
            starA.style.height = '70px';
            starA.innerHTML = 'Gaining<br>mass';
            starB.style.width = '90px';
            starB.style.height = '90px';
            starB.innerHTML = 'Losing<br>mass';
            starB.style.background = 'radial-gradient(circle at 30% 30%, #fca5a5, #ef4444)';
            transfer.classList.add('visible');

            this.$('#stats-a').innerHTML = `
                <div>Mass: <strong>Growing...</strong></div>
                <div>Receiving: <strong>Material from B</strong></div>
                <div>Effect: Becoming more massive</div>
            `;
            this.$('#stats-b').innerHTML = `
                <div>Mass: <strong>Shrinking...</strong></div>
                <div>Status: <strong>Expanded past Roche lobe</strong></div>
                <div>Effect: Mass streaming to A</div>
            `;

            this.$('#result').innerHTML = `
                <p><strong>Mass Transfer Phase:</strong> When Star B exhausted its core hydrogen, it expanded into a red giant. It grew so large that its outer layers crossed the Roche lobe - the gravitational boundary - and streamed onto Star A. Star B "donated" over 2 solar masses to Star A!</p>
            `;

            setTimeout(() => {
                starB.style.background = 'radial-gradient(circle at 30% 30%, #fde047, #f59e0b)';
            }, 100);
        }
    }
}

customElements.define('algol-simulator', AlgolSimulator);

export { AlgolSimulator };
