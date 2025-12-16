/**
 * All Horses Same Color Simulator
 */
import { SimulatorBase } from '../simulator-base.js';

class AllHorsesSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}
                .horses { display: flex; justify-content: center; gap: 0.5rem; margin: 1rem 0; font-size: 2rem; }
                .step { background: var(--card); padding: 1rem; border-radius: 0.5rem; margin: 0.5rem 0; }
                .step.error { border-left: 4px solid #ef4444; }
            </style>
            <h4>Flawed Induction</h4>
            <div class="horses">🐴🐴🐴🐴🐴</div>
            <div class="controls">
                <button id="proof-btn">Show "Proof"</button>
                <button id="flaw-btn">Find the Flaw</button>
            </div>
            <div id="steps"></div>
            <div class="result" id="result"><p>Can we "prove" all horses are the same color?</p></div>
            <div class="insight">This is a famous example of a flawed induction proof. The error is subtle - the inductive step fails at a specific case. Understanding why helps appreciate the rigor needed in proofs!</div>
        `;
    }
    setupEventListeners() {
        this.$('#proof-btn').addEventListener('click', () => {
            this.$('#steps').innerHTML = `
                <div class="step"><strong>Claim:</strong> In any set of n horses, all are the same color.</div>
                <div class="step"><strong>Base case (n=1):</strong> One horse is trivially the same color as itself. ✓</div>
                <div class="step"><strong>Inductive step:</strong> Assume true for n horses. Prove for n+1.</div>
                <div class="step">Take n+1 horses: {H₁, H₂, ..., Hₙ, Hₙ₊₁}</div>
                <div class="step">By hypothesis, {H₁, ..., Hₙ} are same color.</div>
                <div class="step">By hypothesis, {H₂, ..., Hₙ₊₁} are same color.</div>
                <div class="step">These sets overlap at {H₂, ..., Hₙ}, so ALL same color!</div>
            `;
            this.$('#result').innerHTML = '<p>Seems logical... but obviously false! Where\'s the error?</p>';
        });
        this.$('#flaw-btn').addEventListener('click', () => {
            this.$('#steps').innerHTML = `
                <div class="step error"><strong>The flaw is in the step from n=1 to n=2!</strong></div>
                <div class="step">For n=2 horses {H₁, H₂}:</div>
                <div class="step">Set 1: {H₁} - just H₁</div>
                <div class="step">Set 2: {H₂} - just H₂</div>
                <div class="step error">The "overlap" is EMPTY! There's no shared horse.</div>
                <div class="step">We can't conclude H₁ and H₂ are the same color.</div>
            `;
            this.$('#result').innerHTML = '<p style="color:#ef4444">The inductive step fails at n=1→2 because single-element sets don\'t overlap!</p>';
        });
    }
}
customElements.define('all-horses-simulator', AllHorsesSimulator);
export { AllHorsesSimulator };
