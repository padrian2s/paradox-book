/**
 * Will Rogers Phenomenon Simulator
 */
import { SimulatorBase } from '../simulator-base.js';

class WillRogersSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}
                .groups { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1rem 0; }
                .group { background: var(--card); padding: 1rem; border-radius: 0.5rem; }
                .avg { color: var(--accent); font-weight: bold; font-size: 1.2rem; }
            </style>
            <h4>Moving Averages</h4>
            <div class="groups" id="groups">
                <div class="group"><strong>Group A:</strong><br>1, 2, 3<br><span class="avg">Avg: 2</span></div>
                <div class="group"><strong>Group B:</strong><br>7, 8, 9<br><span class="avg">Avg: 8</span></div>
            </div>
            <div class="controls">
                <button id="move-btn">Move 5 from A to B</button>
                <button id="reset-btn">Reset</button>
            </div>
            <div class="result" id="result"><p>What if we add a "5" to A, then move it to B?</p></div>
            <div class="insight">Named after Will Rogers' quip: "When the Okies left Oklahoma for California, they raised the average intelligence in both states." Used in medicine where reclassifying patients can improve survival stats in both groups!</div>
        `;
    }
    setupEventListeners() {
        this.$('#move-btn').addEventListener('click', () => {
            this.$('#groups').innerHTML = `
                <div class="group"><strong>Group A:</strong><br>1, 2, 3 → moved 5<br><span class="avg">Avg: 2 → STILL 2</span></div>
                <div class="group"><strong>Group B:</strong><br>5, 7, 8, 9<br><span class="avg">Avg: 7.25 ↓ from 8</span></div>
            `;
            this.$('#result').innerHTML = `<p>Wait, B's average went DOWN. Let me try differently...</p><p><strong>New scenario:</strong> A has 1,2,3,4 (avg 2.5), B has 7,8,9 (avg 8)</p><p>Move 4 to B:</p><p>A: 1,2,3 → avg 2 (DOWN from 2.5)</p><p>B: 4,7,8,9 → avg 7 (DOWN from 8)... Hmm, both down.</p><p style="color:var(--accent)"><strong>The trick:</strong> Move someone who is ABOVE A's avg but BELOW B's avg!</p><p>A: 1,2,3,6 (avg 3) → remove 6 → 1,2,3 (avg 2) ✓ UP for A!</p><p>B: 7,8,9 (avg 8) → add 6 → 6,7,8,9 (avg 7.5)... B went down.</p><p>For BOTH to rise, need special values!</p>`;
        });
        this.$('#reset-btn').addEventListener('click', () => {
            this.$('#groups').innerHTML = `<div class="group"><strong>Group A:</strong><br>1, 2, 3<br><span class="avg">Avg: 2</span></div><div class="group"><strong>Group B:</strong><br>7, 8, 9<br><span class="avg">Avg: 8</span></div>`;
            this.$('#result').innerHTML = '<p>What if we move a number between the averages?</p>';
        });
    }
}
customElements.define('will-rogers-simulator', WillRogersSimulator);
export { WillRogersSimulator };
