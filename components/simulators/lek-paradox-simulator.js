import { SimulatorBase } from '../simulator-base.js';

class LekParadoxSimulator extends SimulatorBase {
    constructor() {
        super();
        this.generation = 0;
        this.males = [];
        this.running = false;
        this.mutationRate = 5;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .lek-arena {
                    background: linear-gradient(135deg, #166534 0%, #14532d 50%, #0f4c2e 100%);
                    border-radius: 0.5rem;
                    padding: 1rem;
                    min-height: 200px;
                    position: relative;
                    margin-top: 1rem;
                }

                .males-display {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 8px;
                    padding: 1rem;
                }

                .male-bird {
                    font-size: 2rem;
                    position: relative;
                    transition: transform 0.3s;
                }

                .male-bird:hover {
                    transform: scale(1.2);
                }

                .male-bird.selected {
                    animation: dance 0.5s ease-in-out infinite;
                }

                @keyframes dance {
                    0%, 100% { transform: translateY(0) rotate(-5deg); }
                    50% { transform: translateY(-5px) rotate(5deg); }
                }

                .fitness-bar {
                    position: absolute;
                    bottom: -8px;
                    left: 50%;
                    transform: translateX(-50%);
                    height: 4px;
                    background: var(--accent, #f59e0b);
                    border-radius: 2px;
                    transition: width 0.3s;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 0.75rem;
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
                    color: var(--accent, #f59e0b);
                }

                .stat-label {
                    font-size: 0.7rem;
                    color: var(--muted, #94a3b8);
                }

                .variance-chart {
                    background: var(--bg, #0f172a);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .chart-title {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                    margin-bottom: 0.5rem;
                    text-align: center;
                }

                .variance-bars {
                    display: flex;
                    align-items: flex-end;
                    height: 100px;
                    gap: 4px;
                    padding: 0 1rem;
                }

                .var-bar {
                    flex: 1;
                    background: linear-gradient(180deg, var(--primary, #6366f1), var(--secondary, #8b5cf6));
                    border-radius: 2px 2px 0 0;
                    transition: height 0.3s;
                    min-width: 8px;
                }

                .generation-label {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: rgba(0,0,0,0.6);
                    padding: 0.25rem 0.75rem;
                    border-radius: 0.25rem;
                    font-size: 0.875rem;
                }

                .theory-box {
                    background: var(--bg, #0f172a);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                    border-left: 3px solid #ef4444;
                }

                .theory-title {
                    color: #ef4444;
                    font-weight: bold;
                    font-size: 0.875rem;
                    margin-bottom: 0.5rem;
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

            <h4>Lek Mating Simulation</h4>
            <p style="color: var(--muted, #94a3b8); margin-bottom: 1rem;">Watch females select mates over generations. Theory predicts variance should disappear...</p>

            <div class="controls">
                <div class="control-group">
                    <label>Mutation Rate: <span id="mutation-val">5</span>%</label>
                    <input type="range" id="mutation-slider" min="0" max="20" value="5">
                </div>
                <button id="start-btn">Run 50 Generations</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="lek-arena">
                <div class="generation-label">Gen: <span id="gen-count">0</span></div>
                <div class="males-display" id="males-display"></div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="avg-fitness">50</div>
                    <div class="stat-label">Avg Fitness</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="variance">25</div>
                    <div class="stat-label">Variance</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="top-male">100</div>
                    <div class="stat-label">Top Male</div>
                </div>
            </div>

            <div class="variance-chart">
                <div class="chart-title">Genetic Variance Over Generations</div>
                <div class="variance-bars" id="variance-chart"></div>
            </div>

            <div class="theory-box">
                <div class="theory-title">The Expected Outcome</div>
                <p style="font-size: 0.875rem; color: var(--muted, #94a3b8);">
                    If females always choose the "best" males, genetic variance in fitness traits should rapidly disappear.
                    After many generations, all males should be nearly identical. Yet in nature, variance persists!
                </p>
            </div>

            <div class="result" id="result-area">
                <p>Start the simulation to observe mate choice dynamics.</p>
            </div>

            <div class="insight">
                Possible resolutions: mutation-selection balance, fluctuating environments changing what's "best", genic capture (fitness traits linked to overall genetic quality), and condition-dependent expression.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#mutation-slider').addEventListener('input', (e) => {
            this.$('#mutation-val').textContent = e.target.value;
            this.mutationRate = parseInt(e.target.value);
        });

        this.$('#start-btn').addEventListener('click', () => this.startSimulation());
        this.$('#reset-btn').addEventListener('click', () => this.reset());

        this.initializeMales();
    }

    initializeMales() {
        this.males = [];
        for (let i = 0; i < 20; i++) {
            this.males.push({
                fitness: 30 + Math.random() * 40,
                id: i
            });
        }
        this.varianceHistory = [];
        this.renderMales();
        this.updateStats();
    }

    startSimulation() {
        if (this.running) return;
        this.running = true;
        this.$('#start-btn').disabled = true;
        this.generation = 0;
        this.varianceHistory = [];

        this.runGeneration();
    }

    runGeneration() {
        if (!this.running || this.generation >= 50) {
            this.running = false;
            this.$('#start-btn').disabled = false;
            this.showResult();
            return;
        }

        this.generation++;
        this.$('#gen-count').textContent = this.generation;

        const sorted = [...this.males].sort((a, b) => b.fitness - a.fitness);
        const topMales = sorted.slice(0, 5);

        const newMales = [];
        for (let i = 0; i < 20; i++) {
            const parent = topMales[Math.floor(Math.random() * topMales.length)];
            let childFitness = parent.fitness;

            if (Math.random() * 100 < this.mutationRate) {
                childFitness += (Math.random() - 0.5) * 20;
            }

            childFitness = Math.max(10, Math.min(100, childFitness));

            newMales.push({ fitness: childFitness, id: i });
        }

        this.males = newMales;

        const variance = this.calculateVariance();
        this.varianceHistory.push(variance);

        this.renderMales();
        this.updateStats();
        this.renderVarianceChart();

        setTimeout(() => this.runGeneration(), 150);
    }

    calculateVariance() {
        const avg = this.males.reduce((s, m) => s + m.fitness, 0) / this.males.length;
        const squaredDiffs = this.males.map(m => Math.pow(m.fitness - avg, 2));
        return squaredDiffs.reduce((s, d) => s + d, 0) / this.males.length;
    }

    renderMales() {
        const display = this.$('#males-display');
        const maxFitness = Math.max(...this.males.map(m => m.fitness));

        display.innerHTML = this.males.map(m => {
            const isTop = m.fitness === maxFitness;
            return `
                <div class="male-bird ${isTop ? 'selected' : ''}" title="Fitness: ${m.fitness.toFixed(1)}">
                    &#x1F426;
                    <div class="fitness-bar" style="width: ${m.fitness * 0.4}px;"></div>
                </div>
            `;
        }).join('');
    }

    updateStats() {
        const avg = this.males.reduce((s, m) => s + m.fitness, 0) / this.males.length;
        const variance = this.calculateVariance();
        const top = Math.max(...this.males.map(m => m.fitness));

        this.$('#avg-fitness').textContent = avg.toFixed(1);
        this.$('#variance').textContent = variance.toFixed(1);
        this.$('#top-male').textContent = top.toFixed(1);
    }

    renderVarianceChart() {
        const chart = this.$('#variance-chart');
        const maxVar = Math.max(...this.varianceHistory, 100);

        chart.innerHTML = this.varianceHistory.map(v => `
            <div class="var-bar" style="height: ${(v / maxVar) * 100}%;"></div>
        `).join('');
    }

    showResult() {
        const result = this.$('#result-area');
        const finalVariance = this.varianceHistory[this.varianceHistory.length - 1];
        const initialVariance = this.varianceHistory[0] || 100;

        if (finalVariance > 20 && this.mutationRate > 0) {
            result.innerHTML = `
                <p style="color: #22c55e;"><strong>Paradox Demonstrated!</strong></p>
                <p>Despite strong selection, variance persists at ${finalVariance.toFixed(1)} (started at ${initialVariance.toFixed(1)}).
                Mutation rate of ${this.mutationRate}% maintains genetic diversity despite female choice.</p>
            `;
        } else if (finalVariance < 10) {
            result.innerHTML = `
                <p style="color: #f59e0b;"><strong>Variance Depleted!</strong></p>
                <p>Without sufficient mutation (${this.mutationRate}%), selection pressure eliminated variance (now ${finalVariance.toFixed(1)}).
                This is what theory predicts, yet nature maintains diversity!</p>
            `;
        } else {
            result.innerHTML = `
                <p><strong>Equilibrium Reached</strong></p>
                <p>Variance stabilized at ${finalVariance.toFixed(1)}. The balance between selection and mutation creates stable genetic diversity.</p>
            `;
        }
    }

    reset() {
        this.running = false;
        this.generation = 0;
        this.$('#start-btn').disabled = false;
        this.$('#gen-count').textContent = '0';
        this.$('#variance-chart').innerHTML = '';
        this.initializeMales();
        this.$('#result-area').innerHTML = '<p>Start the simulation to observe mate choice dynamics.</p>';
    }
}

customElements.define('lek-paradox-simulator', LekParadoxSimulator);

export { LekParadoxSimulator };
