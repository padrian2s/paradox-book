/**
 * Socrates Knowledge Paradox Simulator
 */
import { SimulatorBase } from '../simulator-base.js';

class SocratesSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}
                .quote { background: var(--bg); padding: 2rem; border-radius: 0.5rem; text-align: center; margin: 1rem 0; font-size: 1.3rem; font-style: italic; border-left: 4px solid var(--accent); }
                .interpretation { background: var(--card); padding: 1rem; border-radius: 0.5rem; margin: 0.5rem 0; }
            </style>
            <h4>Socratic Wisdom</h4>
            <div class="quote">"I know that I know nothing"<br><small>— Socrates (attributed)</small></div>
            <div class="controls">
                <button id="literal-btn">Literal Reading</button>
                <button id="humble-btn">Humble Reading</button>
                <button id="meta-btn">Meta Reading</button>
            </div>
            <div id="analysis"></div>
            <div class="result" id="result"><p>Is this a paradox of self-reference, or profound humility?</p></div>
            <div class="insight">The historical Socrates likely meant something like: "I know I lack the wisdom others claim to have." The paradoxical reading takes "nothing" literally. Both interpretations have philosophical value!</div>
        `;
    }

    setupEventListeners() {
        this.$('#literal-btn').addEventListener('click', () => this.analyze('literal'));
        this.$('#humble-btn').addEventListener('click', () => this.analyze('humble'));
        this.$('#meta-btn').addEventListener('click', () => this.analyze('meta'));
    }

    analyze(mode) {
        const analysis = this.$('#analysis');
        if (mode === 'literal') {
            analysis.innerHTML = `
                <div class="interpretation" style="border-left: 4px solid #ef4444;">
                    <h5>Literal Paradox</h5>
                    <p>If Socrates knows NOTHING, then:</p>
                    <p>He doesn't know that he knows nothing</p>
                    <p>But he claims to KNOW this!</p>
                    <p style="color: #ef4444;">Contradiction: He knows at least one thing.</p>
                </div>
            `;
            this.$('#result').innerHTML = '<p style="color: #ef4444;">Taken literally, the statement is self-defeating. Knowing nothing includes not knowing that!</p>';
        } else if (mode === 'humble') {
            analysis.innerHTML = `
                <div class="interpretation" style="border-left: 4px solid #22c55e;">
                    <h5>Humble Interpretation</h5>
                    <p>Socrates means: "I know nothing <em>of real importance</em>"</p>
                    <p>Or: "I know nothing <em>with certainty</em>"</p>
                    <p>Or: "I know nothing <em>compared to true wisdom</em>"</p>
                    <p style="color: #22c55e;">No paradox: Meta-knowledge is different from object-knowledge.</p>
                </div>
            `;
            this.$('#result').innerHTML = '<p>The charitable reading: Socrates contrasts his awareness of ignorance with others\' false confidence. This isn\'t contradictory—it\'s insightful!</p>';
        } else {
            analysis.innerHTML = `
                <div class="interpretation" style="border-left: 4px solid var(--accent);">
                    <h5>Meta-Level Resolution</h5>
                    <p><strong>Level 0:</strong> Object knowledge (facts about the world)</p>
                    <p><strong>Level 1:</strong> Meta-knowledge (knowledge about knowledge)</p>
                    <p>Socrates: "I have no Level-0 knowledge"</p>
                    <p>This claim IS Level-1 knowledge</p>
                    <p style="color: var(--accent);">No contradiction across levels!</p>
                </div>
            `;
            this.$('#result').innerHTML = '<p>Distinguishing levels of knowledge dissolves the paradox. Knowing that you lack first-order knowledge is second-order knowledge.</p>';
        }
    }
}

customElements.define('socrates-simulator', SocratesSimulator);
export { SocratesSimulator };
