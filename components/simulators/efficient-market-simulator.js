/**
 * Efficient Market Paradox Simulator
 * Demonstrates the self-defeating nature of market efficiency
 */
import { SimulatorBase } from '../simulator-base.js';

class EfficientMarketSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .stat-box {
                    background: var(--bg, #0f172a);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .stat-value {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                .market-viz {
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    padding: 1rem;
                    margin-top: 1rem;
                }

                .market-canvas-container {
                    height: 200px;
                    position: relative;
                    overflow: hidden;
                }

                #market-canvas {
                    width: 100%;
                    height: 100%;
                    border-radius: 0.5rem;
                }

                .analyst-viz {
                    margin-top: 1rem;
                    display: flex;
                    gap: 0.25rem;
                    flex-wrap: wrap;
                    justify-content: center;
                }

                .analyst-icon {
                    font-size: 1.25rem;
                    transition: opacity 0.3s;
                }

                .analyst-icon.inactive {
                    opacity: 0.2;
                }

                @media (max-width: 768px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }

                    .market-canvas-container {
                        height: 150px;
                    }
                }
            </style>

            <h4>Market Efficiency Simulator</h4>

            <div class="controls">
                <div class="control-group">
                    <label>% of Analysts Active: <span id="market-analysts-val">50%</span></label>
                    <input type="range" id="market-analysts" min="0" max="100" value="50">
                </div>
                <button id="simulate-btn">Run Simulation</button>
            </div>

            <div class="market-viz">
                <div class="market-canvas-container">
                    <canvas id="market-canvas"></canvas>
                </div>
                <div class="analyst-viz" id="analyst-viz">
                    ${Array(20).fill('&#x1F4CA;').map(() => '<span class="analyst-icon">&#x1F4CA;</span>').join('')}
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="market-efficiency">50%</div>
                    <div class="stat-label">Market Efficiency</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="market-profit">$0</div>
                    <div class="stat-label">Analyst Avg Profit</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="market-worth">Maybe</div>
                    <div class="stat-label">Analysis Worth It?</div>
                </div>
            </div>

            <div class="result">
                <p id="market-explanation">The paradox: If everyone believes markets are efficient and stops analyzing, inefficiencies emerge. Analysis is only profitable when enough people DON'T analyze!</p>
            </div>

            <div class="insight">
                This creates an equilibrium where just enough analysts exist to keep markets mostly-but-not-perfectly efficient.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#market-analysts').addEventListener('input', () => this.updateAnalysts());
        this.$('#simulate-btn').addEventListener('click', () => this.simulate());
        this.updateAnalysts();
        this.drawChart();
    }

    updateAnalysts() {
        const value = this.$('#market-analysts').value;
        this.$('#market-analysts-val').textContent = value + '%';

        const icons = this.$$('.analyst-icon');
        const activeCount = Math.round(value / 5);
        icons.forEach((icon, i) => {
            icon.classList.toggle('inactive', i >= activeCount);
        });
    }

    simulate() {
        const analysts = parseInt(this.$('#market-analysts').value);

        const efficiency = Math.min(95, 10 + analysts * 0.85);
        const inefficiency = 100 - efficiency;
        const profitOpportunity = inefficiency * 2;
        const profitPerAnalyst = analysts > 0 ? profitOpportunity / (analysts / 10) : 0;
        const worth = profitPerAnalyst > 10 ? 'Yes!' : profitPerAnalyst > 5 ? 'Maybe' : 'No';

        this.$('#market-efficiency').textContent = Math.round(efficiency) + '%';
        this.$('#market-profit').textContent = '$' + Math.round(profitPerAnalyst);
        this.$('#market-worth').textContent = worth;

        if (analysts < 20) {
            this.$('#market-explanation').textContent = 'Few analysts = inefficient market = big profits for those analyzing. More analysts will enter!';
        } else if (analysts > 80) {
            this.$('#market-explanation').textContent = 'Many analysts = efficient market = tiny profits per analyst. Some will quit!';
        } else {
            this.$('#market-explanation').textContent = 'Market at equilibrium. Just enough inefficiency remains to justify analysis costs.';
        }

        this.drawChart();
    }

    drawChart() {
        const canvas = this.$('#market-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * 2;
        canvas.height = rect.height * 2;
        ctx.scale(2, 2);

        const width = rect.width;
        const height = rect.height;

        ctx.fillStyle = '#1e293b';
        ctx.fillRect(0, 0, width, height);

        const analysts = parseInt(this.$('#market-analysts').value);

        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, height - 20);
        for (let x = 0; x <= width; x++) {
            const pct = x / width * 100;
            const eff = Math.min(95, 10 + pct * 0.85);
            const y = height - (eff / 100 * (height - 40)) - 20;
            ctx.lineTo(x, y);
        }
        ctx.stroke();

        ctx.strokeStyle = '#f59e0b';
        ctx.beginPath();
        ctx.moveTo(0, 20);
        for (let x = 0; x <= width; x++) {
            const pct = x / width * 100;
            const profit = pct > 0 ? (90 - pct * 0.85) * 2 / (pct / 10) : 100;
            const y = height - (Math.max(0, Math.min(100, profit)) / 100 * (height - 40)) - 20;
            ctx.lineTo(x, y);
        }
        ctx.stroke();

        const xPos = (analysts / 100) * width;
        ctx.strokeStyle = '#6366f1';
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(xPos, 0);
        ctx.lineTo(xPos, height);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px sans-serif';
        ctx.fillText('Efficiency', 10, 30);
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(60, 22, 20, 10);

        ctx.fillStyle = '#94a3b8';
        ctx.fillText('Profit/Analyst', 90, 30);
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(170, 22, 20, 10);
    }
}

customElements.define('efficient-market-simulator', EfficientMarketSimulator);

export { EfficientMarketSimulator };
