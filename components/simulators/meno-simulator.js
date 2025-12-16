/**
 * Meno's Paradox (Learner's Paradox) Simulator
 */
import { SimulatorBase } from '../simulator-base.js';

class MenoSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}
                .argument { background: var(--bg); padding: 1rem; border-radius: 0.5rem; margin: 1rem 0; }
                .horn { background: var(--card); padding: 1rem; border-radius: 0.5rem; margin: 0.5rem 0; }
                .horn.left { border-left: 4px solid #3b82f6; }
                .horn.right { border-left: 4px solid #22c55e; }
                .question { text-align: center; font-size: 1.3rem; margin: 1rem 0; color: var(--accent); }
            </style>
            <h4>The Paradox of Inquiry</h4>
            <div class="question">"How can you search for something<br>if you don't know what it is?"</div>
            <div class="argument">
                <div class="horn left">
                    <h5>If you KNOW what you're looking for:</h5>
                    <p>You already have it!</p>
                    <p>No need to search.</p>
                    <p>Inquiry is unnecessary.</p>
                </div>
                <div class="horn right">
                    <h5>If you DON'T know what you're looking for:</h5>
                    <p>You won't recognize it when found!</p>
                    <p>How would you know you succeeded?</p>
                    <p>Inquiry is impossible.</p>
                </div>
            </div>
            <div class="controls">
                <button id="plato-btn">Plato's Solution</button>
                <button id="modern-btn">Modern Solutions</button>
            </div>
            <div class="result" id="result"><p>Either way, learning seems impossible. But we obviously do learn!</p></div>
            <div class="insight">This paradox from Plato's Meno dialogue motivated his theory of recollection (anamnesis)—we don't learn new things, we remember what our souls knew before birth!</div>
        `;
    }

    setupEventListeners() {
        this.$('#plato-btn').addEventListener('click', () => this.showPlato());
        this.$('#modern-btn').addEventListener('click', () => this.showModern());
    }

    showPlato() {
        this.$('#result').innerHTML = `
            <p><strong>Plato's Theory of Recollection:</strong></p>
            <p>The soul is immortal and has seen all things.</p>
            <p>"Learning" is really <em>remembering</em> what we already knew.</p>
            <p>We have latent knowledge that inquiry activates.</p>
            <p>This explains how we can recognize truth when we find it!</p>
            <p style="margin-top: 1rem; color: var(--muted);">Plato demonstrates this by having Socrates lead an uneducated slave boy to discover geometric truths through questioning alone.</p>
        `;
    }

    showModern() {
        this.$('#result').innerHTML = `
            <p><strong>Modern Resolutions:</strong></p>
            <p><strong>1. Partial Knowledge:</strong> You can know <em>something</em> about X without knowing everything. You search for more details about a partially known thing.</p>
            <p><strong>2. Descriptions:</strong> You can search for "the thing that satisfies condition C" without knowing what thing that is.</p>
            <p><strong>3. Implicit Understanding:</strong> You may recognize the answer when you see it, even if you couldn't articulate what you were looking for.</p>
            <p><strong>4. False Dichotomy:</strong> Knowledge comes in degrees. The paradox assumes all-or-nothing knowledge.</p>
        `;
    }
}

customElements.define('meno-simulator', MenoSimulator);
export { MenoSimulator };
