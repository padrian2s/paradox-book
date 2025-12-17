import { SimulatorBase } from '../simulator-base.js';

class PesticideParadoxSimulator extends SimulatorBase {
    constructor() {
        super();
        this.pests = 100;
        this.predators = 30;
        this.crops = 100;
        this.generation = 0;
        this.running = false;
        this.usePesticide = false;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .farm-scene {
                    background: linear-gradient(180deg, #87ceeb 0%, #87ceeb 40%, #8b4513 40%, #654321 100%);
                    border-radius: 0.5rem;
                    padding: 1rem;
                    min-height: 200px;
                    position: relative;
                    margin-top: 1rem;
                }

                .population-display {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 4px;
                    justify-content: center;
                    margin-top: 0.5rem;
                }

                .entity {
                    font-size: 1.25rem;
                    animation: bounce 2s ease-in-out infinite;
                }

                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-3px); }
                }

                .spray-effect {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(255, 255, 0, 0.3);
                    animation: spray 1s ease-out;
                    pointer-events: none;
                    display: none;
                }

                @keyframes spray {
                    from { opacity: 0.5; }
                    to { opacity: 0; }
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 0.5rem;
                    margin-top: 1rem;
                }

                .stat-box {
                    background: var(--bg, #0f172a);
                    padding: 0.75rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .stat-value {
                    font-size: 1.5rem;
                    font-weight: bold;
                }

                .stat-label {
                    font-size: 0.7rem;
                    color: var(--muted, #94a3b8);
                }

                .pest-color { color: #ef4444; }
                .predator-color { color: #22c55e; }
                .crop-color { color: #f59e0b; }

                .chart-container {
                    background: var(--bg, #0f172a);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .bar-group {
                    margin-bottom: 0.75rem;
                }

                .bar-label {
                    font-size: 0.75rem;
                    margin-bottom: 0.25rem;
                    display: flex;
                    justify-content: space-between;
                }

                .bar-track {
                    height: 20px;
                    background: var(--card, #1e293b);
                    border-radius: 4px;
                    overflow: hidden;
                }

                .bar-fill {
                    height: 100%;
                    transition: width 0.3s;
                    border-radius: 4px;
                }

                .generation-info {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: rgba(0,0,0,0.6);
                    padding: 0.25rem 0.75rem;
                    border-radius: 0.25rem;
                    font-size: 0.875rem;
                }

                @media (max-width: 768px) {
                    .stats-grid {
                        grid-template-columns: repeat(3, 1fr);
                    }

                    .stat-value {
                        font-size: 1.25rem;
                    }
                }
            </style>

            <h4>Ecosystem Pesticide Simulator</h4>
            <p style="color: var(--muted, #94a3b8); margin-bottom: 1rem;">Compare natural predator control vs pesticide use.</p>

            <div class="controls">
                <div class="control-group">
                    <label>Strategy</label>
                    <select id="strategy-select">
                        <option value="natural">Natural Predators Only</option>
                        <option value="pesticide">Use Pesticides</option>
                    </select>
                </div>
                <button id="start-btn">Run 20 Generations</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="farm-scene">
                <div class="spray-effect" id="spray"></div>
                <div class="generation-info">Gen: <span id="gen-count">0</span></div>
                <div class="population-display" id="pop-display"></div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value pest-color" id="pest-count">100</div>
                    <div class="stat-label">Pests &#x1F41B;</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value predator-color" id="predator-count">30</div>
                    <div class="stat-label">Predators &#x1F41E;</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value crop-color" id="crop-count">100</div>
                    <div class="stat-label">Crop Health &#x1F33E;</div>
                </div>
            </div>

            <div class="chart-container">
                <div class="bar-group">
                    <div class="bar-label">
                        <span>Pests</span>
                        <span id="pest-pct">100%</span>
                    </div>
                    <div class="bar-track">
                        <div class="bar-fill" id="pest-bar" style="width: 50%; background: #ef4444;"></div>
                    </div>
                </div>
                <div class="bar-group">
                    <div class="bar-label">
                        <span>Predators</span>
                        <span id="predator-pct">30%</span>
                    </div>
                    <div class="bar-track">
                        <div class="bar-fill" id="predator-bar" style="width: 30%; background: #22c55e;"></div>
                    </div>
                </div>
                <div class="bar-group">
                    <div class="bar-label">
                        <span>Crop Health</span>
                        <span id="crop-pct">100%</span>
                    </div>
                    <div class="bar-track">
                        <div class="bar-fill" id="crop-bar" style="width: 100%; background: #f59e0b;"></div>
                    </div>
                </div>
            </div>

            <div class="result" id="result-area">
                <p>Select a strategy and run the simulation to see the outcome.</p>
            </div>

            <div class="insight">
                Pesticides often kill predators (ladybugs, wasps) more effectively than pests. Without natural control, pest populations explode, requiring even more pesticides - a destructive cycle.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#start-btn').addEventListener('click', () => this.startSimulation());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
    }

    startSimulation() {
        if (this.running) return;
        this.running = true;
        this.$('#start-btn').disabled = true;

        this.usePesticide = this.$('#strategy-select').value === 'pesticide';
        this.reset(false);

        this.runGeneration();
    }

    runGeneration() {
        if (!this.running || this.generation >= 20) {
            this.running = false;
            this.$('#start-btn').disabled = false;
            this.showResult();
            return;
        }

        this.generation++;
        this.$('#gen-count').textContent = this.generation;

        if (this.usePesticide) {
            const spray = this.$('#spray');
            spray.style.display = 'block';
            setTimeout(() => spray.style.display = 'none', 500);

            this.pests = Math.floor(this.pests * 0.5);
            this.predators = Math.floor(this.predators * 0.3);

            this.pests = Math.floor(this.pests * 1.8);
        } else {
            const predation = Math.min(this.pests * 0.4, this.predators * 2);
            this.pests = Math.floor(this.pests * 1.3 - predation);

            const foodSupply = Math.min(this.pests / 50, 1.2);
            this.predators = Math.floor(this.predators * foodSupply);
        }

        this.pests = Math.max(5, Math.min(this.pests, 300));
        this.predators = Math.max(0, Math.min(this.predators, 100));

        const damage = Math.max(0, (this.pests - 50) / 2);
        this.crops = Math.max(0, this.crops - damage);

        this.render();

        setTimeout(() => this.runGeneration(), 400);
    }

    render() {
        this.$('#pest-count').textContent = this.pests;
        this.$('#predator-count').textContent = this.predators;
        this.$('#crop-count').textContent = Math.round(this.crops);

        this.$('#pest-bar').style.width = Math.min(this.pests / 3, 100) + '%';
        this.$('#predator-bar').style.width = this.predators + '%';
        this.$('#crop-bar').style.width = this.crops + '%';

        this.$('#pest-pct').textContent = this.pests;
        this.$('#predator-pct').textContent = this.predators;
        this.$('#crop-pct').textContent = Math.round(this.crops) + '%';

        const display = this.$('#pop-display');
        display.innerHTML = '';

        const pestIcons = Math.min(Math.floor(this.pests / 10), 20);
        for (let i = 0; i < pestIcons; i++) {
            const e = document.createElement('span');
            e.className = 'entity';
            e.innerHTML = '&#x1F41B;';
            e.style.animationDelay = Math.random() * 2 + 's';
            display.appendChild(e);
        }

        const predatorIcons = Math.min(Math.floor(this.predators / 5), 15);
        for (let i = 0; i < predatorIcons; i++) {
            const e = document.createElement('span');
            e.className = 'entity';
            e.innerHTML = '&#x1F41E;';
            e.style.animationDelay = Math.random() * 2 + 's';
            display.appendChild(e);
        }
    }

    showResult() {
        const result = this.$('#result-area');

        if (this.usePesticide) {
            result.innerHTML = `
                <p style="color: #ef4444;"><strong>Pesticide Paradox!</strong></p>
                <p>Pesticides killed predators faster than pests. Final: ${this.pests} pests, ${this.predators} predators, ${Math.round(this.crops)}% crop health.</p>
            `;
        } else {
            result.innerHTML = `
                <p style="color: #22c55e;"><strong>Natural Balance Maintained!</strong></p>
                <p>Predators controlled pest population. Final: ${this.pests} pests, ${this.predators} predators, ${Math.round(this.crops)}% crop health.</p>
            `;
        }
    }

    reset(clearUI = true) {
        this.pests = 100;
        this.predators = 30;
        this.crops = 100;
        this.generation = 0;
        this.running = false;

        if (clearUI) {
            this.$('#start-btn').disabled = false;
        }

        this.$('#gen-count').textContent = '0';
        this.render();

        if (clearUI) {
            this.$('#result-area').innerHTML = '<p>Select a strategy and run the simulation to see the outcome.</p>';
        }
    }
}

customElements.define('pesticide-paradox-simulator', PesticideParadoxSimulator);

export { PesticideParadoxSimulator };
