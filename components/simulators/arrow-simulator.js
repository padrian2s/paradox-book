/**
 * Arrow's Impossibility Theorem Simulator
 */
import { SimulatorBase } from '../simulator-base.js';

class ArrowSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}
                .criteria { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; margin: 1rem 0; }
                .criterion { background: var(--card); padding: 0.75rem; border-radius: 0.5rem; font-size: 0.9rem; }
                .criterion.violated { border-left: 4px solid #ef4444; opacity: 0.7; }
            </style>
            <h4>Fair Voting Requirements</h4>
            <div class="criteria" id="criteria">
                <div class="criterion"><strong>1. Non-dictatorship:</strong> No single voter determines outcome</div>
                <div class="criterion"><strong>2. Unanimity:</strong> If all prefer A>B, society prefers A>B</div>
                <div class="criterion"><strong>3. Independence:</strong> A vs B ranking depends only on individual A vs B preferences</div>
                <div class="criterion"><strong>4. Unrestricted Domain:</strong> Works for any set of preferences</div>
                <div class="criterion"><strong>5. Transitivity:</strong> If A>B and B>C, then A>C</div>
            </div>
            <div class="controls"><button id="prove-btn">Arrow's Result</button></div>
            <div class="result" id="result"><p>All seem reasonable for a fair voting system. Can we satisfy all?</p></div>
            <div class="insight">Arrow won the Nobel Prize in Economics partly for this theorem. It shows no ranked voting system is perfect. This doesn't mean democracy is hopeless - just that we must accept trade-offs!</div>
        `;
    }
    setupEventListeners() {
        this.$('#prove-btn').addEventListener('click', () => {
            this.$('#criteria').innerHTML = `
                <div class="criterion violated"><strong>1. Non-dictatorship:</strong> ✗ (or give up another)</div>
                <div class="criterion violated"><strong>2. Unanimity:</strong> ✗ (or give up another)</div>
                <div class="criterion violated"><strong>3. Independence:</strong> ✗ (or give up another)</div>
                <div class="criterion"><strong>4. Unrestricted Domain:</strong> ✓ (if we restrict this, maybe...)</div>
                <div class="criterion"><strong>5. Transitivity:</strong> ✓ (but Condorcet cycles exist)</div>
            `;
            this.$('#result').innerHTML = `<p style="color:#ef4444"><strong>Arrow's Theorem (1951):</strong></p><p>No voting system with ≥3 options can satisfy ALL of:</p><p>Non-dictatorship + Unanimity + Independence + Unrestricted Domain + Transitivity</p><p>At least one must be sacrificed!</p>`;
        });
    }
}
customElements.define('arrow-simulator', ArrowSimulator);
export { ArrowSimulator };
