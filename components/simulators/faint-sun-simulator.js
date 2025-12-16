/**
 * Faint Sun Paradox Simulator
 * Early Sun was 30% dimmer, yet Earth had liquid water
 */
import { SimulatorBase } from '../simulator-base.js';

class FaintSunSimulator extends SimulatorBase {
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

                .expected { color: #3b82f6; }
                .actual { color: #22c55e; }

                @media (max-width: 600px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>Early Earth Temperature</h4>

            <div class="controls">
                <div class="control-group" style="width: 100%;">
                    <label>Billion years ago: <span id="time-val">4</span></label>
                    <input type="range" id="time" min="0" max="4" step="0.5" value="4" style="width: 100%;">
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="luminosity">70%</div>
                    <div class="stat-label">Solar Output</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value expected" id="expected">-40C</div>
                    <div class="stat-label">Expected Temp</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value actual" id="actual">+15C</div>
                    <div class="stat-label">Evidence Shows</div>
                </div>
            </div>

            <div class="result" id="result">
                <p>The paradox: How was early Earth warm enough for liquid water?</p>
            </div>

            <div class="insight">
                Solutions: more greenhouse gases (CO2, methane), different albedo (less reflective Earth), or tidal heating from a closer Moon. Life itself may have regulated the temperature!
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#time').addEventListener('input', () => this.update());
        this.update();
    }

    update() {
        const t = parseFloat(this.$('#time').value);
        this.$('#time-val').textContent = t;

        const luminosity = (100 - t * 7.5).toFixed(0);
        const expected = (-10 - t * 10).toFixed(0);
        const actual = (20 - t * 2).toFixed(0);

        this.$('#luminosity').textContent = luminosity + '%';
        this.$('#expected').textContent = expected + 'C';
        this.$('#actual').textContent = '+' + actual + 'C';

        let explanation;
        if (t === 0) {
            explanation = 'Today: Sun at full power. Earth\'s temperature matches expectations.';
        } else if (t <= 2) {
            explanation = `${t} billion years ago: Sun ${100 - parseInt(luminosity)}% dimmer. Small discrepancy between expected and observed temperatures.`;
        } else {
            explanation = `${t} billion years ago: Sun was ${100 - parseInt(luminosity)}% dimmer! Earth should have been frozen solid at ${expected}C, but geological evidence shows liquid water and life at ~${actual}C. THE PARADOX!`;
        }
        this.$('#result').innerHTML = '<p>' + explanation + '</p>';
    }
}

customElements.define('faint-sun-simulator', FaintSunSimulator);

export { FaintSunSimulator };
