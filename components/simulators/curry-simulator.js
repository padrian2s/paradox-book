/**
 * Curry's Paradox Simulator
 * If this sentence is true, then Santa exists
 */
import { SimulatorBase } from '../simulator-base.js';

class CurrySimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .proof-container {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin: 1rem 0;
                }

                .proof-step {
                    padding: 0.75rem;
                    margin: 0.5rem 0;
                    background: var(--card, #1e293b);
                    border-left: 3px solid var(--primary, #6366f1);
                    border-radius: 0 0.25rem 0.25rem 0;
                    font-size: 0.875rem;
                }

                .proof-step.conclusion {
                    border-left-color: var(--accent, #f59e0b);
                    background: rgba(245, 158, 11, 0.1);
                }

                .proof-step.paradox {
                    border-left-color: #ef4444;
                    background: rgba(239, 68, 68, 0.1);
                    color: #ef4444;
                }

                .step-number {
                    display: inline-block;
                    width: 24px;
                    height: 24px;
                    background: var(--primary, #6366f1);
                    border-radius: 50%;
                    text-align: center;
                    line-height: 24px;
                    font-size: 0.75rem;
                    font-weight: bold;
                    margin-right: 0.5rem;
                }

                .claim-display {
                    text-align: center;
                    padding: 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    margin-bottom: 1rem;
                }

                .claim-text {
                    font-size: 1.25rem;
                    font-style: italic;
                    color: var(--accent, #f59e0b);
                }

                .claim-selector {
                    margin-top: 0.5rem;
                }
            </style>

            <h4>Self-Referential Logic</h4>

            <div class="controls">
                <button id="santa-btn">Prove Santa Exists</button>
                <button id="unicorn-btn">Prove Unicorns Exist</button>
                <button id="anything-btn">Prove Anything</button>
            </div>

            <div class="claim-display">
                <div>Let S = "If S is true, then...</div>
                <div class="claim-text" id="claim-text">[claim]</div>
                <div>...is true"</div>
            </div>

            <div class="proof-container" id="proof-container">
                <div class="proof-step">
                    <span class="step-number">1</span>
                    <span>Assume S is true</span>
                </div>
                <div class="proof-step">
                    <span class="step-number">2</span>
                    <span>Then by S's definition, [claim] is true</span>
                </div>
                <div class="proof-step">
                    <span class="step-number">3</span>
                    <span>We've proven "If S is true, then [claim]"</span>
                </div>
                <div class="proof-step">
                    <span class="step-number">4</span>
                    <span>But that's exactly what S says! So S is true.</span>
                </div>
                <div class="proof-step conclusion">
                    <span class="step-number">5</span>
                    <span>Therefore [claim] is true.</span>
                </div>
            </div>

            <div class="result" id="curry-result">
                <p>Choose something to "prove" using Curry's paradox...</p>
            </div>

            <div class="insight">
                Curry's paradox shows that self-reference + modus ponens breaks classical logic. Unlike the liar paradox, it doesn't use negation - making it harder to resolve.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#santa-btn').addEventListener('click', () => this.runCurry('Santa Claus exists'));
        this.$('#unicorn-btn').addEventListener('click', () => this.runCurry('Unicorns are real'));
        this.$('#anything-btn').addEventListener('click', () => this.runCurry('literally anything you want'));
    }

    runCurry(claim) {
        this.$('#claim-text').textContent = claim;

        this.$('#proof-container').innerHTML = `
            <div class="proof-step">
                <span class="step-number">1</span>
                <span>Assume S is true</span>
            </div>
            <div class="proof-step">
                <span class="step-number">2</span>
                <span>Then by S's definition, "${claim}" must be true</span>
            </div>
            <div class="proof-step">
                <span class="step-number">3</span>
                <span>We've just proven "If S is true, then ${claim}"</span>
            </div>
            <div class="proof-step">
                <span class="step-number">4</span>
                <span>But wait - that's exactly what S claims! So S must be true.</span>
            </div>
            <div class="proof-step paradox">
                <span class="step-number">5</span>
                <span>Therefore: <strong>${claim}</strong>!</span>
            </div>
        `;

        this.$('#curry-result').innerHTML = `<p style="color: var(--accent);">We just "proved" that <strong>${claim}</strong> using nothing but self-reference and modus ponens. Something is deeply wrong with this logic!</p>`;
    }
}

customElements.define('curry-simulator', CurrySimulator);

export { CurrySimulator };
