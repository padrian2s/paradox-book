/**
 * French Paradox Simulator
 * Demonstrates how the French have lower heart disease despite high-fat diets
 */
import { SimulatorBase } from '../simulator-base.js';

class FrenchParadoxSimulator extends SimulatorBase {
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

                .lifestyle-viz {
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    padding: 1.5rem;
                    margin-top: 1rem;
                }

                .lifestyle-comparison {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.5rem;
                }

                .lifestyle-column {
                    text-align: center;
                }

                .lifestyle-icon {
                    font-size: 3rem;
                    margin-bottom: 0.5rem;
                }

                .lifestyle-title {
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                }

                .lifestyle-items {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                }

                .factor-bars {
                    margin-top: 1rem;
                }

                .factor-bar {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-bottom: 0.5rem;
                }

                .factor-label {
                    width: 100px;
                    font-size: 0.75rem;
                    text-align: right;
                }

                .factor-track {
                    flex: 1;
                    height: 8px;
                    background: var(--card, #1e293b);
                    border-radius: 4px;
                    overflow: hidden;
                }

                .factor-fill {
                    height: 100%;
                    border-radius: 4px;
                    transition: width 0.3s;
                }

                @media (max-width: 768px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }

                    .lifestyle-comparison {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>Diet Comparison Simulator</h4>

            <div class="controls">
                <div class="control-group">
                    <label>Saturated Fat (g/day): <span id="french-fat-val">40</span></label>
                    <input type="range" id="french-fat" min="10" max="80" value="40">
                </div>
                <div class="control-group">
                    <label>Red Wine (glasses/day): <span id="french-wine-val">2</span></label>
                    <input type="range" id="french-wine" min="0" max="5" value="2">
                </div>
                <div class="control-group">
                    <label>Meal Duration (min): <span id="french-meal-val">60</span></label>
                    <input type="range" id="french-meal" min="10" max="120" value="60">
                </div>
            </div>

            <div class="lifestyle-viz">
                <div class="lifestyle-comparison">
                    <div class="lifestyle-column">
                        <div class="lifestyle-icon">&#x1F1FA;&#x1F1F8;</div>
                        <div class="lifestyle-title">American Style</div>
                        <div class="lifestyle-items">
                            Fast food, large portions<br>
                            15-min meals, eating alone<br>
                            Soda and processed foods
                        </div>
                    </div>
                    <div class="lifestyle-column">
                        <div class="lifestyle-icon">&#x1F1EB;&#x1F1F7;</div>
                        <div class="lifestyle-title">French Style</div>
                        <div class="lifestyle-items">
                            Rich food, smaller portions<br>
                            60-min meals, social dining<br>
                            Wine with meals
                        </div>
                    </div>
                </div>

                <div class="factor-bars">
                    <div class="factor-bar">
                        <span class="factor-label">Wine Effect:</span>
                        <div class="factor-track">
                            <div class="factor-fill" id="wine-bar" style="width: 32%; background: #8b5cf6;"></div>
                        </div>
                    </div>
                    <div class="factor-bar">
                        <span class="factor-label">Meal Pace:</span>
                        <div class="factor-track">
                            <div class="factor-fill" id="meal-bar" style="width: 16%; background: #22c55e;"></div>
                        </div>
                    </div>
                    <div class="factor-bar">
                        <span class="factor-label">Total Protection:</span>
                        <div class="factor-track">
                            <div class="factor-fill" id="protection-bar" style="width: 40%; background: var(--accent, #f59e0b);"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="french-american">100%</div>
                    <div class="stat-label">US Heart Disease Risk</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="french-french" style="color: #22c55e;">60%</div>
                    <div class="stat-label">French Heart Disease Risk</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="french-reduction">40%</div>
                    <div class="stat-label">Risk Reduction</div>
                </div>
            </div>

            <div class="result">
                <p id="french-explanation">Despite similar fat intake, the French have 40% lower heart disease. Wine's resveratrol, slower eating, and social dining may explain the paradox.</p>
            </div>

            <div class="insight">
                The paradox suggests that diet quality isn't just about nutrients - context matters. How you eat may be as important as what you eat.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#french-fat').addEventListener('input', () => this.update());
        this.$('#french-wine').addEventListener('input', () => this.update());
        this.$('#french-meal').addEventListener('input', () => this.update());
        this.update();
    }

    update() {
        const fat = parseInt(this.$('#french-fat').value);
        const wine = parseInt(this.$('#french-wine').value);
        const meal = parseInt(this.$('#french-meal').value);

        this.$('#french-fat-val').textContent = fat;
        this.$('#french-wine-val').textContent = wine;
        this.$('#french-meal-val').textContent = meal;

        const usRisk = 100;
        const wineReduction = wine * 8;
        const mealReduction = Math.min((meal - 10) / 3, 15);
        const frenchRisk = Math.max(40, 100 - wineReduction - mealReduction);

        this.$('#french-american').textContent = usRisk + '%';
        this.$('#french-french').textContent = frenchRisk.toFixed(0) + '%';
        this.$('#french-reduction').textContent = (usRisk - frenchRisk).toFixed(0) + '%';

        this.$('#wine-bar').style.width = wineReduction + '%';
        this.$('#meal-bar').style.width = mealReduction + '%';
        this.$('#protection-bar').style.width = (wineReduction + mealReduction) + '%';

        let explanation = '';
        if (wine >= 2 && meal >= 45) {
            explanation = `With ${wine} glasses of wine and ${meal}-minute meals, the French lifestyle provides significant cardioprotective benefits despite ${fat}g daily fat.`;
        } else if (wine >= 2) {
            explanation = `Moderate wine consumption (${wine} glasses) provides resveratrol and polyphenols that may explain some protection.`;
        } else if (meal >= 45) {
            explanation = `Longer meal times (${meal} min) allow better digestion and social bonding, reducing stress-related heart risk.`;
        } else {
            explanation = `Without wine or leisurely dining, the French advantages are minimal. The paradox requires the full lifestyle.`;
        }
        this.$('#french-explanation').textContent = explanation;
    }
}

customElements.define('french-paradox-simulator', FrenchParadoxSimulator);

export { FrenchParadoxSimulator };
