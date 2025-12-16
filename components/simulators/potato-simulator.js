/**
 * Potato Paradox Simulator
 * Demonstrates how a 1% change in water content can cause 50% weight loss
 */
import { SimulatorBase } from '../simulator-base.js';

class PotatoSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .potato-visualization {
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                    gap: 1rem;
                }

                .potato-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    flex: 1;
                }

                .potato-label {
                    font-weight: bold;
                    color: var(--muted, #94a3b8);
                    margin-bottom: 0.5rem;
                    font-size: 0.875rem;
                }

                .potato-stack {
                    width: 120px;
                    height: 200px;
                    border: 3px solid var(--muted, #94a3b8);
                    border-radius: 0.5rem;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    position: relative;
                    background: var(--card, #1e293b);
                }

                .potato-water {
                    background: linear-gradient(180deg, #3b82f6, #1d4ed8);
                    transition: height 0.5s ease;
                }

                .potato-solid {
                    background: linear-gradient(180deg, #a16207, #78350f);
                    transition: height 0.5s ease;
                }

                .potato-weight {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                    margin-top: 0.5rem;
                }

                .potato-breakdown {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    font-size: 0.75rem;
                    margin-top: 0.25rem;
                }

                .water-amount {
                    color: #3b82f6;
                }

                .solid-amount {
                    color: #a16207;
                }

                .potato-arrow {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    color: var(--muted, #94a3b8);
                }

                .arrow-text {
                    font-size: 0.75rem;
                }

                .arrow-icon {
                    font-size: 2rem;
                    color: var(--primary, #6366f1);
                }

                .water-lost {
                    color: #3b82f6;
                    font-size: 0.875rem;
                    font-weight: bold;
                }

                @media (max-width: 600px) {
                    .potato-visualization {
                        flex-direction: column;
                    }
                    .potato-arrow {
                        transform: rotate(90deg);
                    }
                }
            </style>

            <h4>Potato Dehydration Simulator</h4>

            <div class="controls">
                <div class="control-group">
                    <label>Unit System</label>
                    <select id="unit">
                        <option value="lbs">lbs (Imperial)</option>
                        <option value="kg">kg (Metric)</option>
                    </select>
                </div>
                <div class="control-group">
                    <label>Initial Weight (<span id="unit-label">lbs</span>)</label>
                    <input type="number" id="weight" value="100" min="1" max="1000">
                </div>
                <div class="control-group">
                    <label>Initial Water %: <span id="initial-val">99%</span></label>
                    <input type="range" id="initial" min="80" max="99.9" step="0.1" value="99">
                </div>
                <div class="control-group">
                    <label>Final Water %: <span id="final-val">98%</span></label>
                    <input type="range" id="final" min="50" max="98.9" step="0.1" value="98">
                </div>
            </div>

            <div class="potato-visualization">
                <div class="potato-container">
                    <div class="potato-label">BEFORE</div>
                    <div class="potato-stack">
                        <div class="potato-water" id="before-water"></div>
                        <div class="potato-solid" id="before-solid"></div>
                    </div>
                    <div class="potato-weight" id="before-weight">100 lbs</div>
                    <div class="potato-breakdown">
                        <span class="water-amount" id="before-water-amt">99 lbs water</span>
                        <span class="solid-amount" id="before-solid-amt">1 lb solid</span>
                    </div>
                </div>

                <div class="potato-arrow">
                    <div class="arrow-text">Evaporation</div>
                    <div class="arrow-icon">→</div>
                    <div class="water-lost" id="water-lost">-49 lbs water</div>
                </div>

                <div class="potato-container">
                    <div class="potato-label">AFTER</div>
                    <div class="potato-stack">
                        <div class="potato-water" id="after-water"></div>
                        <div class="potato-solid" id="after-solid"></div>
                    </div>
                    <div class="potato-weight" id="after-weight">50 lbs</div>
                    <div class="potato-breakdown">
                        <span class="water-amount" id="after-water-amt">49 lbs water</span>
                        <span class="solid-amount" id="after-solid-amt">1 lb solid</span>
                    </div>
                </div>
            </div>

            <div class="result">
                <p>Final Weight: <span class="result-value" id="result">50 lbs</span></p>
                <p>Water % change: <span id="water-change" style="color: var(--accent);">-1%</span> → Weight change: <span id="weight-change" style="color: #ef4444;">-50%</span></p>
                <p id="explanation">The solid matter (1 lb) stays constant. At 98% water, it must be 2% of total weight. So 1 = 0.02 × weight, meaning weight = 50 lbs.</p>
            </div>

            <div class="insight">
                The paradox shows how percentages near 100% can be deceptive. The "dry matter" is the invariant that reveals the truth.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#unit').addEventListener('change', () => this.calculate());
        this.$('#weight').addEventListener('input', () => this.calculate());
        this.$('#initial').addEventListener('input', () => this.calculate());
        this.$('#final').addEventListener('input', () => this.calculate());

        // Initial calculation
        this.calculate();
    }

    calculate() {
        const weight = parseFloat(this.$('#weight').value) || 100;
        const initialWaterPct = parseFloat(this.$('#initial').value);
        const finalWaterPct = parseFloat(this.$('#final').value);
        const unit = this.$('#unit').value;

        // Update unit label
        this.$('#unit-label').textContent = unit;

        // Update slider labels
        this.$('#initial-val').textContent = initialWaterPct + '%';
        this.$('#final-val').textContent = finalWaterPct + '%';

        const initialWater = initialWaterPct / 100;
        const finalWater = finalWaterPct / 100;

        // Calculate values
        const solidMatter = weight * (1 - initialWater);
        const initialWaterWeight = weight * initialWater;
        const finalWeight = solidMatter / (1 - finalWater);
        const finalWaterWeight = finalWeight * finalWater;
        const waterLost = initialWaterWeight - finalWaterWeight;

        // Calculate percentage changes
        const waterPctChange = finalWaterPct - initialWaterPct;
        const weightPctChange = ((finalWeight - weight) / weight) * 100;

        // Update text displays
        this.$('#result').textContent = finalWeight.toFixed(2) + ' ' + unit;
        this.$('#before-weight').textContent = weight.toFixed(0) + ' ' + unit;
        this.$('#after-weight').textContent = finalWeight.toFixed(2) + ' ' + unit;

        this.$('#before-water-amt').textContent = initialWaterWeight.toFixed(1) + ' ' + unit + ' water';
        this.$('#before-solid-amt').textContent = solidMatter.toFixed(2) + ' ' + unit + ' solid';
        this.$('#after-water-amt').textContent = finalWaterWeight.toFixed(1) + ' ' + unit + ' water';
        this.$('#after-solid-amt').textContent = solidMatter.toFixed(2) + ' ' + unit + ' solid';

        this.$('#water-lost').textContent = '-' + waterLost.toFixed(1) + ' ' + unit + ' water';

        this.$('#water-change').textContent = waterPctChange.toFixed(1) + '%';
        this.$('#weight-change').textContent = weightPctChange.toFixed(1) + '%';

        // Update visual bars
        const maxHeight = 200;
        const beforeTotalHeight = maxHeight;
        const afterTotalHeight = (finalWeight / weight) * maxHeight;

        const beforeWaterHeight = initialWater * beforeTotalHeight;
        const beforeSolidHeight = (1 - initialWater) * beforeTotalHeight;
        this.$('#before-water').style.height = beforeWaterHeight + 'px';
        this.$('#before-solid').style.height = beforeSolidHeight + 'px';

        const afterWaterHeight = finalWater * afterTotalHeight;
        const afterSolidHeight = (1 - finalWater) * afterTotalHeight;
        this.$('#after-water').style.height = afterWaterHeight + 'px';
        this.$('#after-solid').style.height = afterSolidHeight + 'px';

        // Update explanation
        this.$('#explanation').textContent =
            `The solid matter (${solidMatter.toFixed(2)} ${unit}) stays constant. At ${finalWaterPct}% water, solid must be ${(100 - finalWaterPct).toFixed(1)}% of total. ` +
            `So ${solidMatter.toFixed(2)} = ${(100 - finalWaterPct).toFixed(1)}% × weight → weight = ${finalWeight.toFixed(2)} ${unit}.`;
    }
}

customElements.define('potato-simulator', PotatoSimulator);

export { PotatoSimulator };
