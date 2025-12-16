/**
 * Full-Fat Paradox Simulator
 * Full-fat dairy may be healthier than low-fat despite more saturated fat
 */
import { SimulatorBase } from '../simulator-base.js';

class FullFatSimulator extends SimulatorBase {
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
                    background: var(--card, #1e293b);
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
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                }

                .good { color: #22c55e; }
                .medium { color: #f59e0b; }
                .bad { color: #ef4444; }

                @media (max-width: 600px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>Dairy Choice</h4>

            <div class="controls">
                <button id="lowfat-btn">Low-Fat Dairy</button>
                <button id="fullfat-btn">Full-Fat Dairy</button>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="fat">-</div>
                    <div class="stat-label">Saturated Fat</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="diabetes">-</div>
                    <div class="stat-label">Diabetes Risk</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="satiety">-</div>
                    <div class="stat-label">Satiety</div>
                </div>
            </div>

            <div class="result" id="result">
                <p>Compare the health outcomes...</p>
            </div>

            <div class="insight">
                Low-fat products often add sugar to improve taste. Fat helps with nutrient absorption and keeps you full longer. The "fat is bad" advice from the 1980s may have caused more obesity, not less.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#lowfat-btn').addEventListener('click', () => this.setChoice('lowfat'));
        this.$('#fullfat-btn').addEventListener('click', () => this.setChoice('fullfat'));
    }

    setChoice(choice) {
        const fatEl = this.$('#fat');
        const diabetesEl = this.$('#diabetes');
        const satietyEl = this.$('#satiety');

        if (choice === 'lowfat') {
            fatEl.textContent = 'Low';
            fatEl.className = 'stat-value good';
            diabetesEl.textContent = 'Higher';
            diabetesEl.className = 'stat-value bad';
            satietyEl.textContent = 'Low';
            satietyEl.className = 'stat-value bad';
            this.$('#result').innerHTML = `
                <p><strong>Low-fat dairy:</strong> Less saturated fat, but...</p>
                <p>- Added sugars to compensate for taste</p>
                <p>- Less satisfying, leading to more snacking</p>
                <p>- Reduced absorption of fat-soluble vitamins (A, D, E, K)</p>
                <p style="color: var(--accent);">Studies show HIGHER diabetes and obesity risk!</p>
            `;
        } else {
            fatEl.textContent = 'High';
            fatEl.className = 'stat-value bad';
            diabetesEl.textContent = 'Lower';
            diabetesEl.className = 'stat-value good';
            satietyEl.textContent = 'High';
            satietyEl.className = 'stat-value good';
            this.$('#result').innerHTML = `
                <p><strong>Full-fat dairy:</strong> More saturated fat, but...</p>
                <p style="color: var(--accent);">THE PARADOX: Better health outcomes!</p>
                <p>- No added sugars needed</p>
                <p>- More satisfying, reduces overall calorie intake</p>
                <p>- Better vitamin absorption</p>
                <p>- Associated with 23% lower diabetes risk in studies</p>
            `;
        }
    }
}

customElements.define('full-fat-simulator', FullFatSimulator);

export { FullFatSimulator };
