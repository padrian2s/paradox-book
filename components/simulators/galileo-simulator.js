/**
 * Galileo's Paradox Simulator
 */
import { SimulatorBase } from '../simulator-base.js';

class GalileoSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}
                .comparison { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1rem 0; }
                .col { background: var(--card); padding: 1rem; border-radius: 0.5rem; }
                .pairing { background: var(--bg); padding: 1rem; border-radius: 0.5rem; margin: 1rem 0; font-family: monospace; }
            </style>
            <h4>Integers vs Squares</h4>
            <div class="comparison">
                <div class="col"><strong>All Integers:</strong><br>1, 2, 3, 4, 5, 6, 7, 8, 9, 10...</div>
                <div class="col"><strong>Perfect Squares:</strong><br>1, 4, 9, 16, 25, 36, 49, 64, 81, 100...</div>
            </div>
            <div class="controls">
                <button id="less-btn">Squares Are Fewer</button>
                <button id="equal-btn">Squares Are Equal</button>
            </div>
            <div class="pairing" id="pairing"></div>
            <div class="result" id="result"><p>Are there more integers than perfect squares?</p></div>
            <div class="insight">Galileo noted this in 1638. It shows that infinite sets behave differently than finite ones - an infinite set can be put in one-to-one correspondence with a proper subset of itself!</div>
        `;
    }
    setupEventListeners() {
        this.$('#less-btn').addEventListener('click', () => {
            this.$('#pairing').innerHTML = `Most integers are NOT squares:<br>2, 3, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15...<br>These have no square root that's an integer.`;
            this.$('#result').innerHTML = '<p>Intuitively, squares are <em>sparser</em>. Between 1-100, there are only 10 squares but 90 non-squares.</p>';
        });
        this.$('#equal-btn').addEventListener('click', () => {
            this.$('#pairing').innerHTML = `Perfect pairing:<br>1 ↔ 1²=1<br>2 ↔ 2²=4<br>3 ↔ 3²=9<br>4 ↔ 4²=16<br>n ↔ n²<br>Every integer pairs with exactly one square!`;
            this.$('#result').innerHTML = '<p style="color: var(--accent);">There are EQUALLY MANY! Every integer n corresponds to exactly one square n². This is the definition of "same size" for infinite sets.</p>';
        });
    }
}
customElements.define('galileo-simulator', GalileoSimulator);
export { GalileoSimulator };
