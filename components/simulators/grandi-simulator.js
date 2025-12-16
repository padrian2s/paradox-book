/**
 * Grandi's Series Simulator
 */
import { SimulatorBase } from '../simulator-base.js';

class GrandiSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}
                .series { background: var(--bg); padding: 1.5rem; border-radius: 0.5rem; text-align: center; font-size: 1.3rem; margin: 1rem 0; }
                .grouping { background: var(--card); padding: 1rem; border-radius: 0.5rem; margin: 0.5rem 0; }
            </style>
            <h4>What Does This Sum Equal?</h4>
            <div class="series">1 - 1 + 1 - 1 + 1 - 1 + 1 - 1 + ...</div>
            <div class="controls">
                <button id="zero-btn">It's 0</button>
                <button id="one-btn">It's 1</button>
                <button id="half-btn">It's 1/2</button>
            </div>
            <div id="groupings"></div>
            <div class="result" id="result"><p>Three different groupings give three different answers!</p></div>
            <div class="insight">Grandi's series (1703) shows infinite series need careful treatment. Modern math says this series "diverges" - it has no sum. But summability methods can assign it the value 1/2!</div>
        `;
    }
    setupEventListeners() {
        this.$('#zero-btn').addEventListener('click', () => {
            this.$('#groupings').innerHTML = `<div class="grouping"><strong>Group in pairs from left:</strong><br>(1-1) + (1-1) + (1-1) + ... = 0 + 0 + 0 + ... = <strong>0</strong></div>`;
            this.$('#result').innerHTML = '<p>Each pair sums to zero, so the total is zero.</p>';
        });
        this.$('#one-btn').addEventListener('click', () => {
            this.$('#groupings').innerHTML = `<div class="grouping"><strong>Take first term, then pair:</strong><br>1 + (-1+1) + (-1+1) + ... = 1 + 0 + 0 + ... = <strong>1</strong></div>`;
            this.$('#result').innerHTML = '<p>The first 1 stands alone, then pairs sum to zero.</p>';
        });
        this.$('#half-btn').addEventListener('click', () => {
            this.$('#groupings').innerHTML = `<div class="grouping"><strong>Let S = 1 - 1 + 1 - 1 + ...</strong><br>Then S = 1 - (1 - 1 + 1 - 1 + ...) = 1 - S<br>2S = 1, so S = <strong>1/2</strong></div>`;
            this.$('#result').innerHTML = '<p>Algebraic manipulation gives 1/2. This is the Cesàro sum and agrees with many summability methods!</p>';
        });
    }
}
customElements.define('grandi-simulator', GrandiSimulator);
export { GrandiSimulator };
