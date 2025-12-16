/**
 * Quine's Paradox Simulator
 * "Yields a falsehood when appended to its own quotation"
 */
import { SimulatorBase } from '../simulator-base.js';

class QuineSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .construction {
                    background: var(--bg, #0f172a);
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    margin: 1rem 0;
                }

                .phrase-box {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    margin: 0.5rem 0;
                    font-family: monospace;
                }

                .phrase-box.quoted {
                    border-left: 4px solid #22c55e;
                }

                .phrase-box.full {
                    border-left: 4px solid var(--accent, #f59e0b);
                    font-size: 0.9rem;
                }

                .phrase-box.paradox {
                    border: 2px solid #ef4444;
                    background: rgba(239, 68, 68, 0.1);
                }

                .step-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-bottom: 0.25rem;
                }

                .arrow {
                    text-align: center;
                    font-size: 1.5rem;
                    color: var(--accent, #f59e0b);
                    margin: 0.5rem 0;
                }

                .comparison {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                    margin: 1rem 0;
                }

                .compare-box {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                }

                .compare-box h5 {
                    color: var(--accent, #f59e0b);
                    margin-bottom: 0.5rem;
                }

                @media (max-width: 600px) {
                    .comparison {
                        grid-template-columns: 1fr;
                    }
                    .phrase-box.full {
                        font-size: 0.75rem;
                        word-break: break-word;
                    }
                }
            </style>

            <h4>Building Quine's Sentence</h4>

            <div class="construction">
                <div class="phrase-box">
                    <div class="step-label">The Phrase (P):</div>
                    "yields a falsehood when appended to its own quotation"
                </div>

                <div class="arrow">Add its own quotation</div>

                <div class="phrase-box quoted">
                    <div class="step-label">Quotation of P:</div>
                    "yields a falsehood when appended to its own quotation"
                </div>

                <div class="arrow">Append P to its quotation</div>

                <div class="phrase-box full">
                    <div class="step-label">Complete Sentence:</div>
                    "yields a falsehood when appended to its own quotation" yields a falsehood when appended to its own quotation
                </div>
            </div>

            <div class="controls">
                <button id="true-btn">Assume TRUE</button>
                <button id="false-btn">Assume FALSE</button>
            </div>

            <div class="comparison" id="comparison">
                <div class="compare-box">
                    <h5>What the sentence SAYS:</h5>
                    <p>When you take the phrase and append it to its quotation, you get a falsehood.</p>
                </div>
                <div class="compare-box">
                    <h5>What the sentence IS:</h5>
                    <p>It IS the phrase appended to its own quotation!</p>
                </div>
            </div>

            <div class="result" id="result">
                <p>The sentence describes exactly what was done to create it. Is that description true or false?</p>
            </div>

            <div class="insight">
                Quine's Paradox achieves self-reference without using words like "this sentence." Instead, it uses quotation and description. The sentence talks about what happens when you append a phrase to its quotation - and the sentence itself IS that appending!
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#true-btn').addEventListener('click', () => this.analyze(true));
        this.$('#false-btn').addEventListener('click', () => this.analyze(false));
    }

    analyze(assumeTrue) {
        const result = this.$('#result');

        if (assumeTrue) {
            result.innerHTML = `
                <div class="phrase-box paradox">
                    <h5>Assume: The sentence is TRUE</h5>
                    <p>The sentence says: appending P to its quotation yields a falsehood</p>
                    <p>The sentence itself IS P appended to its quotation</p>
                    <p>So the sentence says: THIS SENTENCE is a falsehood</p>
                    <p style="color: #ef4444;"><strong>But we assumed it's TRUE!</strong></p>
                    <p style="color: #ef4444;">CONTRADICTION</p>
                </div>
            `;
        } else {
            result.innerHTML = `
                <div class="phrase-box paradox">
                    <h5>Assume: The sentence is FALSE</h5>
                    <p>The sentence says: appending P to its quotation yields a falsehood</p>
                    <p>If the sentence is FALSE, then appending P to its quotation does NOT yield a falsehood</p>
                    <p>But the sentence IS P appended to its quotation</p>
                    <p>So the sentence must be TRUE (not a falsehood)</p>
                    <p style="color: #ef4444;"><strong>But we assumed it's FALSE!</strong></p>
                    <p style="color: #ef4444;">CONTRADICTION</p>
                </div>
            `;
        }
    }
}

customElements.define('quine-simulator', QuineSimulator);

export { QuineSimulator };
