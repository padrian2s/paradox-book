/**
 * Moore's Paradox Simulator
 */
import { SimulatorBase } from '../simulator-base.js';

class MooreSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}
                .statement { background: var(--bg); padding: 1.5rem; border-radius: 0.5rem; text-align: center; font-size: 1.3rem; margin: 1rem 0; }
                .comparison { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1rem 0; }
                .case { background: var(--card); padding: 1rem; border-radius: 0.5rem; }
                .case.ok { border-left: 4px solid #22c55e; }
                .case.weird { border-left: 4px solid #ef4444; }
            </style>
            <h4>Moore's Absurdity</h4>
            <div class="statement">"It's raining, but I don't believe it's raining."</div>
            <div class="controls">
                <button id="logic-btn">Is it Contradictory?</button>
                <button id="absurd-btn">Why is it Absurd?</button>
            </div>
            <div class="comparison" id="comparison"></div>
            <div class="result" id="result"><p>This sentence feels wrong, but why exactly?</p></div>
            <div class="insight">Moore's paradox reveals something about the nature of assertion. When you assert P, you implicitly commit to believing P. The paradox isn't logical but pragmatic—it's about what assertion means.</div>
        `;
    }

    setupEventListeners() {
        this.$('#logic-btn').addEventListener('click', () => this.showLogic());
        this.$('#absurd-btn').addEventListener('click', () => this.showAbsurd());
    }

    showLogic() {
        this.$('#comparison').innerHTML = `
            <div class="case ok">
                <h5>Third Person (No Problem):</h5>
                <p>"It's raining, but John doesn't believe it."</p>
                <p style="color: #22c55e;">Perfectly fine! John can be mistaken.</p>
            </div>
            <div class="case ok">
                <h5>Past Tense (No Problem):</h5>
                <p>"It was raining, but I didn't believe it."</p>
                <p style="color: #22c55e;">Perfectly fine! I was mistaken then.</p>
            </div>
        `;
        this.$('#result').innerHTML = `
            <p><strong>Not a logical contradiction!</strong></p>
            <p>It's possible for: (1) P to be true, and (2) someone not to believe P.</p>
            <p>The sentence could describe a real state of affairs.</p>
            <p>Yet saying it in first person, present tense feels impossible.</p>
        `;
    }

    showAbsurd() {
        this.$('#comparison').innerHTML = `
            <div class="case weird">
                <h5>The Problem:</h5>
                <p>Asserting "P" commits you to believing P</p>
                <p>But you then deny believing P</p>
                <p>You undermine your own assertion!</p>
            </div>
            <div class="case weird">
                <h5>Wittgenstein's Analysis:</h5>
                <p>"I believe P" ≈ just asserting P</p>
                <p>So: "P but I don't believe P"</p>
                <p>≈ "P but not-P"</p>
                <p style="color: #ef4444;">Pragmatic contradiction!</p>
            </div>
        `;
        this.$('#result').innerHTML = `
            <p>The absurdity isn't in what's said but in the <em>saying</em>.</p>
            <p>It's a performative contradiction—the act of asserting defeats the content.</p>
            <p>This reveals that assertion carries implicit commitments beyond literal meaning.</p>
        `;
    }
}

customElements.define('moore-simulator', MooreSimulator);
export { MooreSimulator };
