/**
 * Fitch's Paradox (Knowability Paradox) Simulator
 */
import { SimulatorBase } from '../simulator-base.js';

class FitchSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}
                .premise { background: var(--card); padding: 0.75rem; margin: 0.25rem 0; border-radius: 0.25rem; font-family: monospace; }
                .premise.highlight { border-left: 4px solid var(--accent); }
                .premise.conclusion { border-left: 4px solid #ef4444; background: rgba(239, 68, 68, 0.1); }
                .thesis { background: var(--bg); padding: 1rem; border-radius: 0.5rem; text-align: center; margin: 1rem 0; }
            </style>
            <h4>From Knowability to Omniscience</h4>
            <div class="thesis">
                <strong>Anti-Realist Thesis:</strong> All truths are knowable<br>
                <small>∀p (p → ◇Kp) — If p is true, it's possible to know p</small>
            </div>
            <div class="controls">
                <button id="proof-btn">Show the Proof</button>
                <button id="explain-btn">Why It Matters</button>
            </div>
            <div id="proof"></div>
            <div class="result" id="result"><p>A seemingly modest claim leads to a radical conclusion...</p></div>
            <div class="insight">Fitch's paradox is a major challenge to anti-realist theories of truth. If you think all truths are in principle knowable, you're committed to saying all truths are actually known!</div>
        `;
    }

    setupEventListeners() {
        this.$('#proof-btn').addEventListener('click', () => this.showProof());
        this.$('#explain-btn').addEventListener('click', () => this.showExplain());
    }

    showProof() {
        this.$('#proof').innerHTML = `
            <div class="premise">1. Assume: All truths are knowable: p → ◇Kp</div>
            <div class="premise">2. Suppose there's an unknown truth: p ∧ ¬Kp</div>
            <div class="premise highlight">3. By (1): (p ∧ ¬Kp) → ◇K(p ∧ ¬Kp)</div>
            <div class="premise">4. So it's possible to know: p ∧ ¬Kp</div>
            <div class="premise">5. But knowing a conjunction means knowing both parts</div>
            <div class="premise">6. So: K(p ∧ ¬Kp) implies Kp ∧ K¬Kp</div>
            <div class="premise">7. K¬Kp means "knowing that p is not known"</div>
            <div class="premise">8. If we know p (Kp), then p is known</div>
            <div class="premise highlight">9. So Kp ∧ K¬Kp is impossible (contradiction!)</div>
            <div class="premise">10. So (p ∧ ¬Kp) is impossible</div>
            <div class="premise conclusion">11. Therefore: No truth is unknown. All truths are known!</div>
        `;
        this.$('#result').innerHTML = '<p style="color: #ef4444;">From "all truths CAN be known" we derive "all truths ARE known." The modest knowability thesis implies omniscience!</p>';
    }

    showExplain() {
        this.$('#proof').innerHTML = `
            <p><strong>Why is this paradoxical?</strong></p>
            <p>Anti-realists want to say: truth is tied to our ability to verify.</p>
            <p>They accept: all truths are <em>knowable in principle</em>.</p>
            <p>This seems modest—surely some truths aren't yet discovered!</p>
            <p style="margin-top: 1rem;"><strong>But Fitch shows:</strong></p>
            <p>If you say all truths are knowable, you're committed to all truths being <em>actually known</em>.</p>
            <p>There can be no undiscovered truths, no unknown facts.</p>
            <p>This seems absurd—we constantly discover new truths!</p>
            <p style="margin-top: 1rem; color: var(--accent);">The paradox forces anti-realists to revise their view or accept a very strong conclusion.</p>
        `;
        this.$('#result').innerHTML = '<p>Fitch\'s paradox remains a serious challenge to anti-realist epistemology.</p>';
    }
}

customElements.define('fitch-simulator', FitchSimulator);
export { FitchSimulator };
