/**
 * Knower Paradox Simulator
 */
import { SimulatorBase } from '../simulator-base.js';

class KnowerSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}
                .statement { background: var(--bg); padding: 1.5rem; border-radius: 0.5rem; text-align: center; font-size: 1.3rem; margin: 1rem 0; border: 2px solid var(--accent); }
                .analysis { background: var(--card); padding: 1rem; border-radius: 0.5rem; margin: 0.5rem 0; }
                .analysis.error { border-left: 4px solid #ef4444; }
            </style>
            <h4>The Unknowable Statement</h4>
            <div class="statement">"This sentence is not known."</div>
            <div class="controls">
                <button id="known-btn">I Know It</button>
                <button id="unknown-btn">I Don't Know It</button>
            </div>
            <div id="analysis"></div>
            <div class="result" id="result"><p>Unlike the Liar paradox about truth, this is about knowledge. What happens if you know this sentence?</p></div>
            <div class="insight">The Knower paradox challenges epistemology. Unlike truth, knowledge seems like it should be closed under logical consequence. But this sentence suggests that not all truths can be known - a key result in epistemic logic!</div>
        `;
    }

    setupEventListeners() {
        this.$('#known-btn').addEventListener('click', () => this.analyze(true));
        this.$('#unknown-btn').addEventListener('click', () => this.analyze(false));
    }

    analyze(known) {
        const analysis = this.$('#analysis');
        if (known) {
            analysis.innerHTML = `
                <div class="analysis error">
                    <p><strong>Suppose you KNOW the sentence.</strong></p>
                    <p>The sentence says: "This sentence is not known"</p>
                    <p>If you know it, and knowledge implies truth...</p>
                    <p>Then the sentence is TRUE</p>
                    <p>So "this sentence is not known" is true</p>
                    <p style="color: #ef4444;"><strong>But you said you know it! Contradiction!</strong></p>
                </div>
            `;
            this.$('#result').innerHTML = '<p style="color: #ef4444;">If you know it, it must be true. But it says it\'s not known. Knowing it makes it false!</p>';
        } else {
            analysis.innerHTML = `
                <div class="analysis">
                    <p><strong>Suppose you DON'T know the sentence.</strong></p>
                    <p>The sentence says: "This sentence is not known"</p>
                    <p>If you don't know it, the sentence is TRUE</p>
                    <p>So there exists a true sentence you don't know</p>
                    <p style="color: #22c55e;">No immediate contradiction...</p>
                    <p><strong>But wait:</strong> Is this sentence KNOWABLE?</p>
                    <p>We showed knowing it leads to contradiction</p>
                    <p style="color: var(--accent);">So this is a TRUE but UNKNOWABLE statement!</p>
                </div>
            `;
            this.$('#result').innerHTML = '<p>The sentence is true but cannot be known. This proves there are truths that are inherently unknowable!</p>';
        }
    }
}

customElements.define('knower-simulator', KnowerSimulator);
export { KnowerSimulator };
