/**
 * Bertrand's Box Paradox Simulator
 */
import { SimulatorBase } from '../simulator-base.js';

class BertrandBoxSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}
                .boxes { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 1rem 0; }
                .box { background: var(--card); padding: 1rem; border-radius: 0.5rem; text-align: center; }
                .coin { display: inline-block; width: 30px; height: 30px; border-radius: 50%; margin: 0.25rem; }
                .gold { background: #fbbf24; }
                .silver { background: #94a3b8; }
            </style>
            <h4>Three Boxes, Two Coins Each</h4>
            <div class="boxes">
                <div class="box">Box 1<br><span class="coin gold"></span><span class="coin gold"></span><br>GG</div>
                <div class="box">Box 2<br><span class="coin silver"></span><span class="coin silver"></span><br>SS</div>
                <div class="box">Box 3<br><span class="coin gold"></span><span class="coin silver"></span><br>GS</div>
            </div>
            <p style="text-align: center;">You pick a random box, draw one coin: it's <strong style="color: #fbbf24;">GOLD</strong>!</p>
            <div class="controls">
                <button id="naive-btn">Naive: P = 1/2</button>
                <button id="correct-btn">Correct Answer</button>
            </div>
            <div class="result" id="result"><p>What's the probability the OTHER coin in your box is also gold?</p></div>
            <div class="insight">This is closely related to the Monty Hall problem. The key insight: you're not choosing equally among boxes, but among gold coins - and two of them are in the GG box!</div>
        `;
    }
    setupEventListeners() {
        this.$('#naive-btn').addEventListener('click', () => {
            this.$('#result').innerHTML = `<p><strong>Naive reasoning:</strong></p><p>Box must be GG or GS (drew gold).</p><p>Two boxes, so P = 1/2?</p><p style="color: #ef4444;">WRONG!</p>`;
        });
        this.$('#correct-btn').addEventListener('click', () => {
            this.$('#result').innerHTML = `<p><strong>Correct reasoning:</strong></p><p>3 gold coins exist: G₁ and G₂ in Box 1, G₃ in Box 3</p><p>You drew one gold coin. Which?</p><p>• If G₁: other coin is G₂ (gold)</p><p>• If G₂: other coin is G₁ (gold)</p><p>• If G₃: other coin is silver</p><p style="color: #22c55e;"><strong>P(other is gold) = 2/3</strong></p>`;
        });
    }
}
customElements.define('bertrand-box-simulator', BertrandBoxSimulator);
export { BertrandBoxSimulator };
