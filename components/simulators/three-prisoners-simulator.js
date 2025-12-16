/**
 * Three Prisoners Problem Simulator
 */
import { SimulatorBase } from '../simulator-base.js';

class ThreePrisonersSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}
                .prisoners { display: flex; justify-content: center; gap: 2rem; margin: 1rem 0; }
                .prisoner { background: var(--card); padding: 1rem; border-radius: 0.5rem; text-align: center; }
            </style>
            <h4>One Will Go Free</h4>
            <div class="prisoners">
                <div class="prisoner"><div style="font-size:2rem">🔒</div>A (You)</div>
                <div class="prisoner"><div style="font-size:2rem">🔒</div>B</div>
                <div class="prisoner"><div style="font-size:2rem">🔒</div>C</div>
            </div>
            <p style="text-align:center">One randomly chosen prisoner will be pardoned. You ask the guard to name another who will die.</p>
            <div class="controls">
                <button id="before-btn">Before Guard Speaks</button>
                <button id="after-btn">After: "B will die"</button>
            </div>
            <div class="result" id="result"><p>Guard says: "B will die." Should your hopes change?</p></div>
            <div class="insight">This is equivalent to the Monty Hall problem! The guard's information isn't random - he can't name you or the pardoned prisoner. This asymmetry changes the probabilities.</div>
        `;
    }
    setupEventListeners() {
        this.$('#before-btn').addEventListener('click', () => {
            this.$('#result').innerHTML = `<p><strong>Before:</strong></p><p>P(A pardoned) = 1/3</p><p>P(B pardoned) = 1/3</p><p>P(C pardoned) = 1/3</p>`;
        });
        this.$('#after-btn').addEventListener('click', () => {
            this.$('#result').innerHTML = `<p><strong>After guard says "B will die":</strong></p><p>P(A pardoned) = 1/3 (unchanged!)</p><p>P(B pardoned) = 0</p><p>P(C pardoned) = 2/3</p><p style="color:var(--accent)">Your chances don't improve, but C's double!</p><p>If you could switch identities with C, you should!</p>`;
        });
    }
}
customElements.define('three-prisoners-simulator', ThreePrisonersSimulator);
export { ThreePrisonersSimulator };
