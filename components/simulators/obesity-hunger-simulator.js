/**
 * Obesity-Hunger Paradox Simulator
 * Poor people often face both hunger AND obesity
 */
import { SimulatorBase } from '../simulator-base.js';

class ObesityHungerSimulator extends SimulatorBase {
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
                .poor { color: #ef4444; }

                @media (max-width: 600px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>Food Budget Impact</h4>

            <div class="controls">
                <div class="control-group" style="width: 100%;">
                    <label>Daily Food Budget: $<span id="budget-val">5</span></label>
                    <input type="range" id="budget" min="2" max="30" value="5" style="width: 100%;">
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="calories">High</div>
                    <div class="stat-label">Calories Access</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="nutrition">Low</div>
                    <div class="stat-label">Nutrition Quality</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="health">Poor</div>
                    <div class="stat-label">Health Outcome</div>
                </div>
            </div>

            <div class="result" id="result">
                <p>Food insecurity leads to binge-eating when food is available.</p>
            </div>

            <div class="insight">
                A McDonald's meal is $5. A healthy salad is $12. Poverty forces calorie maximization over nutrition. "Food deserts" lack grocery stores but have fast food.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#budget').addEventListener('input', () => this.update());
        this.update();
    }

    update() {
        const budget = parseInt(this.$('#budget').value);
        this.$('#budget-val').textContent = budget;

        const caloriesEl = this.$('#calories');
        const nutritionEl = this.$('#nutrition');
        const healthEl = this.$('#health');

        if (budget <= 5) {
            caloriesEl.textContent = 'High';
            caloriesEl.className = 'stat-value medium';
            nutritionEl.textContent = 'Low';
            nutritionEl.className = 'stat-value poor';
            healthEl.textContent = 'Poor';
            healthEl.className = 'stat-value poor';
            this.$('#result').innerHTML = `
                <p style="color: var(--accent);">THE PARADOX: High calories but low nutrition!</p>
                <p>$${budget}/day only affords processed foods: cheap, filling, but nutrient-poor.</p>
                <p>Result: obesity + malnutrition simultaneously. Food insecurity triggers overeating when food is available.</p>
            `;
        } else if (budget <= 15) {
            caloriesEl.textContent = 'Good';
            caloriesEl.className = 'stat-value good';
            nutritionEl.textContent = 'Medium';
            nutritionEl.className = 'stat-value medium';
            healthEl.textContent = 'Fair';
            healthEl.className = 'stat-value medium';
            this.$('#result').innerHTML = `
                <p>$${budget}/day allows some fresh food, but healthy eating is still a stretch.</p>
                <p>Can afford basic produce but organic, lean proteins remain expensive.</p>
            `;
        } else {
            caloriesEl.textContent = 'Good';
            caloriesEl.className = 'stat-value good';
            nutritionEl.textContent = 'High';
            nutritionEl.className = 'stat-value good';
            healthEl.textContent = 'Good';
            healthEl.className = 'stat-value good';
            this.$('#result').innerHTML = `
                <p>$${budget}/day allows a truly healthy diet: fresh produce, lean proteins, whole grains.</p>
                <p>This is what nutrition guidelines assume everyone can afford.</p>
            `;
        }
    }
}

customElements.define('obesity-hunger-simulator', ObesityHungerSimulator);

export { ObesityHungerSimulator };
