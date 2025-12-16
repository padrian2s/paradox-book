/**
 * Card Paradox Simulator
 * "The next statement is true. The previous statement is false."
 */
import { SimulatorBase } from '../simulator-base.js';

class CardSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .cards-container {
                    display: flex;
                    gap: 2rem;
                    justify-content: center;
                    margin: 1.5rem 0;
                    flex-wrap: wrap;
                }

                .card-item {
                    background: var(--card, #1e293b);
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    text-align: center;
                    min-width: 200px;
                    transition: all 0.3s;
                }

                .card-item.highlight-true {
                    border: 3px solid #22c55e;
                    box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
                }

                .card-item.highlight-false {
                    border: 3px solid #ef4444;
                    box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
                }

                .card-label {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                    margin-bottom: 0.5rem;
                }

                .card-text {
                    font-size: 1.1rem;
                    font-weight: bold;
                }

                .arrow {
                    font-size: 2rem;
                    color: var(--accent, #f59e0b);
                    display: flex;
                    align-items: center;
                }

                .logic-trace {
                    background: var(--bg, #0f172a);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    margin: 1rem 0;
                    font-family: monospace;
                    font-size: 0.9rem;
                }

                .trace-line {
                    padding: 0.25rem 0;
                }

                .trace-line.error {
                    color: #ef4444;
                }

                @media (max-width: 600px) {
                    .cards-container {
                        flex-direction: column;
                        align-items: center;
                    }
                    .arrow {
                        transform: rotate(90deg);
                    }
                }
            </style>

            <h4>Two Cards, Circular Reference</h4>

            <div class="cards-container">
                <div class="card-item" id="card1">
                    <div class="card-label">Card 1 (Front)</div>
                    <div class="card-text">"The statement on the back is TRUE"</div>
                </div>
                <div class="arrow">arrows_right_alt</div>
                <div class="card-item" id="card2">
                    <div class="card-label">Card 2 (Back)</div>
                    <div class="card-text">"The statement on the front is FALSE"</div>
                </div>
            </div>

            <div class="controls">
                <button id="card1-true-btn">Card 1 is TRUE</button>
                <button id="card1-false-btn">Card 1 is FALSE</button>
            </div>

            <div class="logic-trace" id="trace">
                <div class="trace-line">// Click a button to trace the logic...</div>
            </div>

            <div class="result" id="result">
                <p>Neither card directly references itself, yet together they create a paradox through circular reference.</p>
            </div>

            <div class="insight">
                This is a variant of the Liar's Paradox that avoids direct self-reference. Instead, it uses mutual/circular reference - each statement refers to the other. This shows that paradoxes can arise from reference loops, not just self-reference.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#card1-true-btn').addEventListener('click', () => this.trace(true));
        this.$('#card1-false-btn').addEventListener('click', () => this.trace(false));
    }

    trace(card1True) {
        const trace = this.$('#trace');
        const result = this.$('#result');
        const card1 = this.$('#card1');
        const card2 = this.$('#card2');

        // Reset classes
        card1.className = 'card-item';
        card2.className = 'card-item';

        if (card1True) {
            card1.classList.add('highlight-true');

            setTimeout(() => {
                card2.classList.add('highlight-true');
            }, 500);

            setTimeout(() => {
                card1.classList.remove('highlight-true');
                card1.classList.add('highlight-false');
            }, 1000);

            trace.innerHTML = `
                <div class="trace-line">Step 1: Assume Card 1 is TRUE</div>
                <div class="trace-line">Step 2: Card 1 says "Card 2 is TRUE"</div>
                <div class="trace-line">Step 3: So Card 2 must be TRUE</div>
                <div class="trace-line">Step 4: Card 2 says "Card 1 is FALSE"</div>
                <div class="trace-line">Step 5: So Card 1 must be FALSE</div>
                <div class="trace-line error">ERROR: We assumed Card 1 is TRUE, but derived it's FALSE!</div>
                <div class="trace-line error">>>> CONTRADICTION <<<</div>
            `;

            result.innerHTML = `
                <p style="color: #ef4444;"><strong>Contradiction!</strong></p>
                <p>TRUE leads to... FALSE</p>
                <p>Card 1 cannot be true.</p>
            `;
        } else {
            card1.classList.add('highlight-false');

            setTimeout(() => {
                card2.classList.add('highlight-false');
            }, 500);

            setTimeout(() => {
                card1.classList.remove('highlight-false');
                card1.classList.add('highlight-true');
            }, 1000);

            trace.innerHTML = `
                <div class="trace-line">Step 1: Assume Card 1 is FALSE</div>
                <div class="trace-line">Step 2: Card 1 says "Card 2 is TRUE" (but Card 1 lies)</div>
                <div class="trace-line">Step 3: So Card 2 must be FALSE</div>
                <div class="trace-line">Step 4: Card 2 says "Card 1 is FALSE" (but Card 2 lies)</div>
                <div class="trace-line">Step 5: So Card 1 must be TRUE</div>
                <div class="trace-line error">ERROR: We assumed Card 1 is FALSE, but derived it's TRUE!</div>
                <div class="trace-line error">>>> CONTRADICTION <<<</div>
            `;

            result.innerHTML = `
                <p style="color: #ef4444;"><strong>Contradiction!</strong></p>
                <p>FALSE leads to... TRUE</p>
                <p>Card 1 cannot be false either.</p>
            `;
        }
    }
}

customElements.define('card-simulator', CardSimulator);

export { CardSimulator };
