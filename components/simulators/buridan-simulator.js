/**
 * Buridan's Ass Simulator
 */
import { SimulatorBase } from '../simulator-base.js';

class BuridanSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}
                .scene { display: flex; justify-content: center; align-items: center; gap: 2rem; margin: 1rem 0; font-size: 2.5rem; }
                .item { text-align: center; }
            </style>
            <h4>Perfectly Equal Options</h4>
            <div class="scene">
                <div class="item">🥕<br><small>Food</small></div>
                <div class="item" id="donkey">🫏<br><small>Equally hungry<br>& thirsty</small></div>
                <div class="item">💧<br><small>Water</small></div>
            </div>
            <div class="controls">
                <button id="analyze-btn">Analyze the Dilemma</button>
                <button id="resolve-btn">Resolutions</button>
            </div>
            <div class="result" id="result"><p>The donkey is exactly equidistant from food and water, equally hungry and thirsty. What happens?</p></div>
            <div class="insight">Though attributed to 14th-century philosopher Jean Buridan, he never wrote this! It satirizes overly rational decision theory. Real agents break ties - through randomness, whim, or factors not in the model.</div>
        `;
    }
    setupEventListeners() {
        this.$('#analyze-btn').addEventListener('click', () => {
            this.$('#result').innerHTML = `<p><strong>The Rationalist's Dilemma:</strong></p><p>• No reason to prefer food over water</p><p>• No reason to prefer water over food</p><p>• A purely rational agent only acts on reasons</p><p>• With no reason to choose either, the agent cannot choose</p><p style="color:#ef4444">The donkey starves to death between perfectly good options!</p>`;
        });
        this.$('#resolve-btn').addEventListener('click', () => {
            this.$('#result').innerHTML = `<p><strong>Resolutions:</strong></p><p>1. <strong>Randomize:</strong> Flip a mental coin. Any choice beats no choice.</p><p>2. <strong>Satisficing:</strong> Either option is "good enough" - just pick one.</p><p>3. <strong>Higher-order preferences:</strong> "I prefer to decide quickly" breaks the tie.</p><p>4. <strong>Reject perfect symmetry:</strong> Real situations always have tiny asymmetries.</p>`;
        });
    }
}
customElements.define('buridan-simulator', BuridanSimulator);
export { BuridanSimulator };
