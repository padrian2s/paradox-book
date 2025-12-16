/**
 * No-No Paradox Simulator
 */
import { SimulatorBase } from '../simulator-base.js';

class NonoSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}
                .sentences { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1rem 0; }
                .sentence { background: var(--card); padding: 1.5rem; border-radius: 0.5rem; text-align: center; }
                .sentence.highlight-true { border: 3px solid #22c55e; }
                .sentence.highlight-false { border: 3px solid #ef4444; }
                .arrow { text-align: center; font-size: 2rem; color: var(--accent); }
            </style>
            <h4>Two Sentences, No Self-Reference</h4>
            <div class="sentences">
                <div class="sentence" id="sentA"><strong>Sentence A:</strong><br>"B is not true"</div>
                <div class="sentence" id="sentB"><strong>Sentence B:</strong><br>"A is not true"</div>
            </div>
            <div class="controls">
                <button id="a-true-btn">A is TRUE</button>
                <button id="a-false-btn">A is FALSE</button>
                <button id="symmetric-btn">Symmetric Analysis</button>
            </div>
            <div class="result" id="result"><p>Neither sentence refers to itself. Each refers only to the other. Yet together...</p></div>
            <div class="insight">The No-No paradox shows that self-reference isn't necessary for semantic paradoxes. Mutual reference creates the same problem. This challenges attempts to solve paradoxes by banning self-reference.</div>
        `;
    }

    setupEventListeners() {
        this.$('#a-true-btn').addEventListener('click', () => this.analyze('a-true'));
        this.$('#a-false-btn').addEventListener('click', () => this.analyze('a-false'));
        this.$('#symmetric-btn').addEventListener('click', () => this.analyze('symmetric'));
    }

    analyze(mode) {
        const sentA = this.$('#sentA');
        const sentB = this.$('#sentB');
        sentA.className = 'sentence';
        sentB.className = 'sentence';

        if (mode === 'a-true') {
            sentA.classList.add('highlight-true');
            sentB.classList.add('highlight-false');
            this.$('#result').innerHTML = `
                <p><strong>If A is TRUE:</strong></p>
                <p>A says "B is not true" → B is FALSE</p>
                <p>B says "A is not true" → But B is false, so A IS true</p>
                <p style="color: #22c55e;">Consistent! A=true, B=false works.</p>
            `;
        } else if (mode === 'a-false') {
            sentA.classList.add('highlight-false');
            sentB.classList.add('highlight-true');
            this.$('#result').innerHTML = `
                <p><strong>If A is FALSE:</strong></p>
                <p>A says "B is not true" is false → B IS true</p>
                <p>B says "A is not true" → And A is false, so B is true</p>
                <p style="color: #22c55e;">Consistent! A=false, B=true works.</p>
            `;
        } else {
            this.$('#result').innerHTML = `
                <p><strong>The Paradox:</strong></p>
                <p>Both solutions (A=T,B=F) and (A=F,B=T) are consistent!</p>
                <p>But the sentences are <em>perfectly symmetric</em>.</p>
                <p>What could make A true and B false, or vice versa?</p>
                <p style="color: #ef4444;">There's no reason to prefer one over the other!</p>
                <p>The paradox is: symmetric sentences should have symmetric truth values, but they can't both be true or both be false!</p>
            `;
        }
    }
}

customElements.define('nono-simulator', NonoSimulator);
export { NonoSimulator };
