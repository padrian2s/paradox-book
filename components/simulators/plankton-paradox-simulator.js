import { SimulatorBase } from '../simulator-base.js';

class PlanktonParadoxSimulator extends SimulatorBase {
    constructor() {
        super();
        this.species = [];
        this.resources = { light: 100, nitrogen: 100, phosphorus: 100 };
        this.generation = 0;
        this.running = false;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .ocean-container {
                    background: linear-gradient(180deg, #0ea5e9 0%, #0369a1 50%, #0c4a6e 100%);
                    border-radius: 0.5rem;
                    padding: 1rem;
                    min-height: 250px;
                    position: relative;
                    margin-top: 1rem;
                    overflow: hidden;
                }

                .plankton-field {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 4px;
                    justify-content: center;
                    padding: 0.5rem;
                }

                .plankton {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    animation: float 3s ease-in-out infinite;
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-5px) rotate(180deg); }
                }

                .stats-row {
                    display: flex;
                    gap: 1rem;
                    margin-top: 1rem;
                    flex-wrap: wrap;
                }

                .stat-card {
                    flex: 1;
                    min-width: 100px;
                    background: var(--bg, #0f172a);
                    padding: 0.75rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .stat-value {
                    font-size: 1.25rem;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                }

                .stat-label {
                    font-size: 0.7rem;
                    color: var(--muted, #94a3b8);
                }

                .species-legend {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin-top: 1rem;
                    justify-content: center;
                }

                .species-item {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    font-size: 0.75rem;
                    padding: 0.25rem 0.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.25rem;
                }

                .species-dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                }

                .species-count {
                    color: var(--muted, #94a3b8);
                }

                .theory-box {
                    background: var(--bg, #0f172a);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .theory-title {
                    color: #ef4444;
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                }

                .generation-counter {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: rgba(0,0,0,0.5);
                    padding: 0.25rem 0.75rem;
                    border-radius: 0.25rem;
                    font-size: 0.875rem;
                }

                @media (max-width: 768px) {
                    .stat-card {
                        min-width: 80px;
                    }
                }
            </style>

            <h4>Phytoplankton Competition Simulator</h4>
            <p style="color: var(--muted, #94a3b8); margin-bottom: 1rem;">Watch species compete for limited resources. Theory says only a few should survive...</p>

            <div class="controls">
                <div class="control-group">
                    <label>Initial Species</label>
                    <select id="species-count">
                        <option value="5">5 species</option>
                        <option value="10" selected>10 species</option>
                        <option value="20">20 species</option>
                    </select>
                </div>
                <button id="start-btn">Start Simulation</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="ocean-container">
                <div class="generation-counter">Generation: <span id="gen-count">0</span></div>
                <div class="plankton-field" id="plankton-field"></div>
            </div>

            <div class="species-legend" id="species-legend"></div>

            <div class="stats-row">
                <div class="stat-card">
                    <div class="stat-value" id="surviving-species">0</div>
                    <div class="stat-label">Surviving Species</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value" id="total-population">0</div>
                    <div class="stat-label">Total Population</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value" id="resources-left">3</div>
                    <div class="stat-label">Resource Types</div>
                </div>
            </div>

            <div class="theory-box">
                <div class="theory-title">Competitive Exclusion Principle</div>
                <p style="font-size: 0.875rem; color: var(--muted, #94a3b8);">
                    With only 3 limiting resources (light, nitrogen, phosphorus), theory predicts only 3 species should survive.
                    Yet oceans contain thousands of coexisting phytoplankton species!
                </p>
            </div>

            <div class="result" id="result-area">
                <p>Start the simulation to see the paradox unfold.</p>
            </div>

            <div class="insight">
                G.E. Hutchinson's "Paradox of the Plankton" (1961): Coexistence is possible through temporal/spatial variation, predation, and the ocean never reaching equilibrium.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#start-btn').addEventListener('click', () => this.startSimulation());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
    }

    initSpecies(count) {
        const colors = [
            '#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6',
            '#ec4899', '#14b8a6', '#f97316', '#06b6d4', '#84cc16',
            '#a855f7', '#eab308', '#10b981', '#6366f1', '#f43f5e',
            '#0ea5e9', '#d946ef', '#fbbf24', '#4ade80', '#fb7185'
        ];

        this.species = [];
        for (let i = 0; i < count; i++) {
            this.species.push({
                id: i,
                name: `Species ${i + 1}`,
                color: colors[i % colors.length],
                population: 20 + Math.floor(Math.random() * 20),
                fitness: 0.8 + Math.random() * 0.4,
                niche: {
                    light: Math.random(),
                    nitrogen: Math.random(),
                    phosphorus: Math.random()
                }
            });
        }
    }

    startSimulation() {
        if (this.running) return;
        this.running = true;
        this.$('#start-btn').disabled = true;

        const count = parseInt(this.$('#species-count').value);
        this.initSpecies(count);
        this.generation = 0;

        this.runGeneration();
    }

    runGeneration() {
        if (!this.running || this.generation >= 100) {
            this.running = false;
            this.$('#start-btn').disabled = false;
            this.showFinalResult();
            return;
        }

        this.generation++;
        this.$('#gen-count').textContent = this.generation;

        this.species.forEach(sp => {
            const resourceFit = (sp.niche.light + sp.niche.nitrogen + sp.niche.phosphorus) / 3;
            const growth = sp.fitness * resourceFit * (0.9 + Math.random() * 0.2);

            if (Math.random() < 0.1) {
                sp.population = Math.floor(sp.population * (0.7 + Math.random() * 0.6));
            } else {
                sp.population = Math.floor(sp.population * growth);
            }

            sp.population = Math.max(0, Math.min(sp.population, 100));
        });

        this.species = this.species.filter(sp => sp.population > 0);

        this.render();

        setTimeout(() => this.runGeneration(), 150);
    }

    render() {
        const field = this.$('#plankton-field');
        const legend = this.$('#species-legend');

        field.innerHTML = '';
        this.species.forEach(sp => {
            for (let i = 0; i < Math.min(sp.population, 30); i++) {
                const dot = document.createElement('div');
                dot.className = 'plankton';
                dot.style.background = sp.color;
                dot.style.animationDelay = Math.random() * 3 + 's';
                field.appendChild(dot);
            }
        });

        legend.innerHTML = this.species.map(sp => `
            <div class="species-item">
                <div class="species-dot" style="background: ${sp.color};"></div>
                <span>${sp.name}</span>
                <span class="species-count">(${sp.population})</span>
            </div>
        `).join('');

        const totalPop = this.species.reduce((sum, sp) => sum + sp.population, 0);
        this.$('#surviving-species').textContent = this.species.length;
        this.$('#total-population').textContent = totalPop;
    }

    showFinalResult() {
        const result = this.$('#result-area');
        const survived = this.species.length;

        if (survived > 3) {
            result.innerHTML = `
                <p style="color: #22c55e;"><strong>Paradox Demonstrated!</strong></p>
                <p>${survived} species survived with only 3 resources. Competitive exclusion predicts only 3 should remain!</p>
            `;
        } else {
            result.innerHTML = `
                <p style="color: #f59e0b;"><strong>Competitive Exclusion Won!</strong></p>
                <p>Only ${survived} species survived, matching the theoretical limit of 3 resources.</p>
            `;
        }
    }

    reset() {
        this.running = false;
        this.species = [];
        this.generation = 0;
        this.$('#start-btn').disabled = false;
        this.$('#gen-count').textContent = '0';
        this.$('#plankton-field').innerHTML = '';
        this.$('#species-legend').innerHTML = '';
        this.$('#surviving-species').textContent = '0';
        this.$('#total-population').textContent = '0';
        this.$('#result-area').innerHTML = '<p>Start the simulation to see the paradox unfold.</p>';
    }
}

customElements.define('plankton-paradox-simulator', PlanktonParadoxSimulator);

export { PlanktonParadoxSimulator };
