/**
 * Gender-Equality Paradox Simulator
 * Countries with more gender equality have fewer women in STEM
 */
import { SimulatorBase } from '../simulator-base.js';

class GenderEqualitySimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .comparison-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 0.5rem;
                    margin-top: 1rem;
                }

                .country-box {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .country-box h5 {
                    margin-bottom: 0.5rem;
                }

                .country-list {
                    font-size: 0.9rem;
                    color: var(--muted, #94a3b8);
                    margin-bottom: 0.5rem;
                }

                .stem-percentage {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                }

                .label {
                    font-size: 0.8rem;
                    color: var(--muted, #94a3b8);
                }

                .high-equality h5 { color: var(--primary, #6366f1); }
                .low-equality h5 { color: var(--secondary, #8b5cf6); }

                @media (max-width: 600px) {
                    .comparison-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>STEM Gender Gap by Country</h4>

            <div class="controls">
                <button id="show-btn">Show Data</button>
            </div>

            <div class="comparison-grid">
                <div class="country-box high-equality">
                    <h5>High Equality Countries</h5>
                    <p class="country-list">Finland, Norway, Sweden</p>
                    <p class="stem-percentage" id="high-pct">~20%</p>
                    <p class="label">Women in STEM</p>
                </div>
                <div class="country-box low-equality">
                    <h5>Lower Equality Countries</h5>
                    <p class="country-list">Algeria, Tunisia, UAE</p>
                    <p class="stem-percentage" id="low-pct">~40%</p>
                    <p class="label">Women in STEM</p>
                </div>
            </div>

            <div class="result" id="result">
                <p>When women are free to choose any career, they often choose non-STEM fields. In countries where STEM offers economic security, more women pursue it.</p>
            </div>

            <div class="insight">
                This paradox suggests that gender differences in interests may be partly innate, emerging more strongly when external pressures are removed.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#show-btn').addEventListener('click', () => this.showData());
    }

    showData() {
        const highEl = this.$('#high-pct');
        const lowEl = this.$('#low-pct');

        let high = 0, low = 0;
        const interval = setInterval(() => {
            high = Math.min(20, high + 1);
            low = Math.min(40, low + 2);
            highEl.textContent = high + '%';
            lowEl.textContent = low + '%';
            if (high >= 20 && low >= 40) {
                clearInterval(interval);
                highEl.textContent = '~20%';
                lowEl.textContent = '~40%';
            }
        }, 50);
    }
}

customElements.define('gender-equality-simulator', GenderEqualitySimulator);

export { GenderEqualitySimulator };
