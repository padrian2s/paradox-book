import { SimulatorBase } from '../simulator-base.js';

class EnrichmentParadoxSimulator extends SimulatorBase {
    constructor() {
        super();
        this.nutrients = 50;
        this.algae = 30;
        this.fish = 20;
        this.oxygen = 100;
        this.biodiversity = 10;
        this.generation = 0;
        this.running = false;
        this.timeoutId = null;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .lake-scene {
                    background: linear-gradient(180deg, #0ea5e9 0%, #0369a1 100%);
                    border-radius: 0.5rem;
                    padding: 1rem;
                    min-height: 180px;
                    position: relative;
                    margin-top: 1rem;
                    overflow: hidden;
                    transition: background 0.5s;
                }

                .lake-scene.eutrophic {
                    background: linear-gradient(180deg, #22c55e 0%, #15803d 50%, #0f172a 100%);
                }

                .lake-scene.dead {
                    background: linear-gradient(180deg, #78350f 0%, #451a03 100%);
                }

                .lake-life {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 6px;
                    justify-content: center;
                    padding: 1rem;
                }

                .organism {
                    font-size: 1.5rem;
                    animation: swim 3s ease-in-out infinite;
                }

                @keyframes swim {
                    0%, 100% { transform: translateX(0) translateY(0); }
                    25% { transform: translateX(5px) translateY(-3px); }
                    75% { transform: translateX(-5px) translateY(3px); }
                }

                .algae-bloom {
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    background: radial-gradient(circle, #22c55e, transparent);
                    border-radius: 50%;
                    animation: bloom 2s ease-in-out infinite;
                }

                @keyframes bloom {
                    0%, 100% { transform: scale(1); opacity: 0.5; }
                    50% { transform: scale(1.5); opacity: 0.8; }
                }

                .nutrient-control {
                    background: var(--bg, #0f172a);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .nutrient-slider-container {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .nutrient-slider-container input[type="range"] {
                    flex: 1;
                }

                .nutrient-value {
                    font-size: 1.25rem;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                    min-width: 60px;
                    text-align: right;
                }

                .metrics-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 0.5rem;
                    margin-top: 1rem;
                }

                .metric-card {
                    background: var(--bg, #0f172a);
                    padding: 0.5rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .metric-value {
                    font-size: 1.25rem;
                    font-weight: bold;
                }

                .metric-label {
                    font-size: 0.65rem;
                    color: var(--muted, #94a3b8);
                }

                .algae-color { color: #22c55e; }
                .fish-color { color: #3b82f6; }
                .oxygen-color { color: #06b6d4; }
                .biodiv-color { color: #a855f7; }

                .status-bar {
                    position: absolute;
                    bottom: 10px;
                    left: 10px;
                    right: 10px;
                    background: rgba(0,0,0,0.6);
                    padding: 0.5rem;
                    border-radius: 0.25rem;
                    font-size: 0.75rem;
                    text-align: center;
                }

                @media (max-width: 768px) {
                    .metrics-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
            </style>

            <h4>Lake Eutrophication Simulator</h4>
            <p style="color: var(--muted, #94a3b8); margin-bottom: 1rem;">Add nutrients and watch the ecosystem respond over time.</p>

            <div class="nutrient-control">
                <label>Nutrient Level (nitrogen/phosphorus)</label>
                <div class="nutrient-slider-container">
                    <input type="range" id="nutrient-slider" min="10" max="200" value="50">
                    <span class="nutrient-value" id="nutrient-display">50</span>
                </div>
            </div>

            <div class="controls">
                <button id="start-btn">Run 30 Years</button>
                <button id="reset-btn">Reset Ecosystem</button>
            </div>

            <div class="lake-scene" id="lake">
                <div class="lake-life" id="lake-life"></div>
                <div class="status-bar" id="status">Healthy lake ecosystem</div>
            </div>

            <div class="metrics-grid">
                <div class="metric-card">
                    <div class="metric-value algae-color" id="algae-val">30</div>
                    <div class="metric-label">Algae Level</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value fish-color" id="fish-val">20</div>
                    <div class="metric-label">Fish Pop.</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value oxygen-color" id="oxygen-val">100</div>
                    <div class="metric-label">Oxygen %</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value biodiv-color" id="biodiv-val">10</div>
                    <div class="metric-label">Species</div>
                </div>
            </div>

            <div class="result" id="result-area">
                <p>Set nutrient level and run to observe the enrichment paradox.</p>
            </div>

            <div class="insight">
                More nutrients should mean more life, but excess causes algal blooms that block sunlight, consume oxygen when they die, and create "dead zones" where nothing survives.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#nutrient-slider').addEventListener('input', (e) => {
            this.$('#nutrient-display').textContent = e.target.value;
        });

        this.$('#start-btn').addEventListener('click', () => this.startSimulation());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
    }

    startSimulation() {
        if (this.running) return;
        this.running = true;
        this.$('#start-btn').disabled = true;

        this.nutrients = parseInt(this.$('#nutrient-slider').value);
        this.generation = 0;

        this.runYear();
    }

    runYear() {
        if (!this.running || this.generation >= 30) {
            this.running = false;
            this.$('#start-btn').disabled = false;
            this.showResult();
            return;
        }

        this.generation++;

        const nutrientFactor = this.nutrients / 50;

        if (this.nutrients > 80) {
            this.algae = Math.min(200, this.algae * (1.1 + nutrientFactor * 0.1));
        } else {
            this.algae = Math.max(10, Math.min(50, this.algae * 1.02));
        }

        if (this.algae > 100) {
            this.oxygen = Math.max(0, this.oxygen - (this.algae - 100) * 0.3);
        } else {
            this.oxygen = Math.min(100, this.oxygen + 2);
        }

        if (this.oxygen < 30) {
            this.fish = Math.max(0, this.fish * 0.7);
            this.biodiversity = Math.max(0, this.biodiversity - 1);
        } else if (this.oxygen > 60 && this.algae < 80) {
            this.fish = Math.min(30, this.fish * 1.05);
            this.biodiversity = Math.min(15, this.biodiversity + 0.2);
        }

        if (this.algae > 150) {
            this.biodiversity = Math.max(1, this.biodiversity - 0.5);
        }

        this.updateDisplay();

        this.timeoutId = setTimeout(() => this.runYear(), 200);
    }

    updateDisplay() {
        this.$('#algae-val').textContent = Math.round(this.algae);
        this.$('#fish-val').textContent = Math.round(this.fish);
        this.$('#oxygen-val').textContent = Math.round(this.oxygen);
        this.$('#biodiv-val').textContent = Math.round(this.biodiversity);

        const lake = this.$('#lake');
        lake.classList.remove('eutrophic', 'dead');

        if (this.oxygen < 20) {
            lake.classList.add('dead');
            this.$('#status').textContent = 'Dead zone - oxygen depleted';
        } else if (this.algae > 100) {
            lake.classList.add('eutrophic');
            this.$('#status').textContent = 'Eutrophic - algal bloom in progress';
        } else {
            this.$('#status').textContent = 'Healthy lake ecosystem';
        }

        const lakeLife = this.$('#lake-life');
        lakeLife.innerHTML = '';

        const algaeCount = Math.min(Math.floor(this.algae / 15), 15);
        for (let i = 0; i < algaeCount; i++) {
            const a = document.createElement('span');
            a.className = 'organism';
            a.innerHTML = '&#x1F33F;';
            a.style.animationDelay = Math.random() * 2 + 's';
            lakeLife.appendChild(a);
        }

        const fishCount = Math.min(Math.floor(this.fish / 3), 10);
        for (let i = 0; i < fishCount; i++) {
            const f = document.createElement('span');
            f.className = 'organism';
            f.innerHTML = '&#x1F41F;';
            f.style.animationDelay = Math.random() * 2 + 's';
            lakeLife.appendChild(f);
        }

        if (this.biodiversity > 5) {
            const extras = ['&#x1F99E;', '&#x1F985;', '&#x1F986;'];
            for (let i = 0; i < Math.min(this.biodiversity - 5, 3); i++) {
                const e = document.createElement('span');
                e.className = 'organism';
                e.innerHTML = extras[i];
                lakeLife.appendChild(e);
            }
        }
    }

    showResult() {
        const result = this.$('#result-area');

        if (this.oxygen < 30 || this.fish < 5) {
            result.innerHTML = `
                <p style="color: #ef4444;"><strong>Enrichment Paradox Demonstrated!</strong></p>
                <p>Adding nutrients (${this.nutrients}) killed the ecosystem. Algae bloomed to ${Math.round(this.algae)}, oxygen dropped to ${Math.round(this.oxygen)}%, fish died (${Math.round(this.fish)}), and only ${Math.round(this.biodiversity)} species remain.</p>
            `;
        } else if (this.algae > 80) {
            result.innerHTML = `
                <p style="color: #f59e0b;"><strong>System Under Stress</strong></p>
                <p>Elevated nutrients causing algae growth (${Math.round(this.algae)}), but ecosystem surviving with ${Math.round(this.oxygen)}% oxygen.</p>
            `;
        } else {
            result.innerHTML = `
                <p style="color: #22c55e;"><strong>Healthy Ecosystem Maintained!</strong></p>
                <p>Moderate nutrient levels (${this.nutrients}) support balanced life: ${Math.round(this.fish)} fish, ${Math.round(this.biodiversity)} species, ${Math.round(this.oxygen)}% oxygen.</p>
            `;
        }
    }

    reset() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
        this.running = false;
        this.algae = 30;
        this.fish = 20;
        this.oxygen = 100;
        this.biodiversity = 10;
        this.generation = 0;

        this.$('#start-btn').disabled = false;
        this.$('#nutrient-slider').value = 50;
        this.$('#nutrient-display').textContent = '50';

        const lake = this.$('#lake');
        lake.classList.remove('eutrophic', 'dead');

        this.updateDisplay();
        this.$('#result-area').innerHTML = '<p>Set nutrient level and run to observe the enrichment paradox.</p>';
    }
}

customElements.define('enrichment-paradox-simulator', EnrichmentParadoxSimulator);

export { EnrichmentParadoxSimulator };
