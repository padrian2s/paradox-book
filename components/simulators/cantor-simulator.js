/**
 * Cantor's Paradox Simulator
 */
import { SimulatorBase } from '../simulator-base.js';

class CantorSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}
                .set-vis { background: var(--bg); padding: 1.5rem; border-radius: 0.5rem; margin: 1rem 0; text-align: center; }
                .sets { display: flex; justify-content: space-around; margin: 1rem 0; }
                .set-box { background: var(--card); padding: 1rem; border-radius: 0.5rem; }
            </style>
            <h4>The Set of All Sets</h4>
            <div class="set-vis">
                <p>Let <strong>U = the set of ALL sets</strong></p>
                <div class="sets">
                    <div class="set-box">U contains:<br>{∅, {1}, {1,2}, ...}</div>
                    <div class="set-box">P(U) = power set<br>(all subsets of U)</div>
                </div>
            </div>
            <div class="controls"><button id="theorem-btn">Apply Cantor's Theorem</button></div>
            <div class="result" id="result"><p>Cantor proved: |P(S)| > |S| for any set S. What happens with U?</p></div>
            <div class="insight">Cantor's paradox shows "the set of all sets" is incoherent. In ZFC set theory, such collections are called "proper classes" - too big to be sets.</div>
        `;
    }
    setupEventListeners() {
        this.$('#theorem-btn').addEventListener('click', () => {
            this.$('#result').innerHTML = `
                <p><strong>Cantor's Theorem:</strong> For any set S, |P(S)| > |S|</p>
                <p>Apply to U (set of all sets):</p>
                <p>|P(U)| > |U|</p>
                <p>But P(U) is a set of sets...</p>
                <p>So P(U) ⊆ U (every set of sets is in U)</p>
                <p>Therefore |P(U)| ≤ |U|</p>
                <p style="color: #ef4444;"><strong>Contradiction:</strong> |P(U)| > |U| and |P(U)| ≤ |U| cannot both be true!</p>
            `;
        });
    }
}
customElements.define('cantor-simulator', CantorSimulator);
export { CantorSimulator };
