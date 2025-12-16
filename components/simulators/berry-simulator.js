/**
 * Berry Paradox Simulator
 * "The smallest integer not definable in under sixty letters" - self-referential paradox
 */
import { SimulatorBase } from '../simulator-base.js';

class BerrySimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .stat-box {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .stat-value {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                }

                .stat-label {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                }

                .phrase-display {
                    background: var(--bg, #0f172a);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                    text-align: center;
                    font-style: italic;
                }

                .paradox { color: #ef4444; }
                .ok { color: #22c55e; }

                @media (max-width: 600px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>Definition Counter</h4>

            <div class="controls">
                <div class="control-group" style="width: 100%;">
                    <label>Max letters allowed: <span id="max-val">60</span></label>
                    <input type="range" id="max" min="20" max="100" value="60" style="width: 100%;">
                </div>
            </div>

            <div class="phrase-display" id="phrase">
                "The smallest integer not definable in under <span id="phrase-n">sixty</span> letters"
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="count">57</div>
                    <div class="stat-label">Phrase Letters</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value paradox" id="status">PARADOX!</div>
                    <div class="stat-label">Status</div>
                </div>
            </div>

            <div class="result" id="result">
                <p>The phrase defines a number by claiming it can't be defined with this few letters!</p>
            </div>

            <div class="insight">
                Related to Gödel's incompleteness theorems. "Definability" itself cannot be well-defined within the system. Self-reference creates contradictions.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#max').addEventListener('input', () => this.update());
        this.update();
    }

    numberToWord(n) {
        const words = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety', 'one hundred'];
        const index = Math.floor((n - 20) / 10);
        return words[Math.min(index, words.length - 1)];
    }

    update() {
        const max = parseInt(this.$('#max').value);
        this.$('#max-val').textContent = max;

        const word = this.numberToWord(max);
        this.$('#phrase-n').textContent = word;

        const phrase = `the smallest integer not definable in under ${word} letters`;
        const letterCount = phrase.replace(/\s/g, '').length;

        this.$('#count').textContent = letterCount;

        const statusEl = this.$('#status');
        if (letterCount < max) {
            statusEl.textContent = 'PARADOX!';
            statusEl.className = 'stat-value paradox';
            this.$('#result').innerHTML = `
                <p style="color: #ef4444;"><strong>PARADOX DETECTED!</strong></p>
                <p>The phrase has ${letterCount} letters, which is under ${max}.</p>
                <p>So it DOES define "the smallest integer not definable in under ${max} letters"...</p>
                <p>But that means the number IS definable in under ${max} letters!</p>
                <p>Contradiction!</p>
            `;
        } else {
            statusEl.textContent = 'OK';
            statusEl.className = 'stat-value ok';
            this.$('#result').innerHTML = `
                <p>The phrase has ${letterCount} letters, which is NOT under ${max}.</p>
                <p>No paradox at this threshold - the phrase is too long to count.</p>
                <p>Try lowering the limit to trigger the paradox!</p>
            `;
        }
    }
}

customElements.define('berry-simulator', BerrySimulator);

export { BerrySimulator };
