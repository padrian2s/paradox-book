/**
 * Preface Paradox Simulator
 */
import { SimulatorBase } from '../simulator-base.js';

class PrefaceSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}
                .book { background: var(--bg); padding: 1.5rem; border-radius: 0.5rem; margin: 1rem 0; }
                .book-title { font-size: 1.2rem; font-weight: bold; text-align: center; margin-bottom: 1rem; border-bottom: 2px solid var(--accent); padding-bottom: 0.5rem; }
                .statements { display: grid; gap: 0.5rem; }
                .stmt { background: var(--card); padding: 0.5rem; border-radius: 0.25rem; font-size: 0.9rem; }
                .preface { background: rgba(245, 158, 11, 0.2); padding: 1rem; border-radius: 0.5rem; margin-top: 1rem; border-left: 4px solid var(--accent); }
            </style>
            <h4>The Humble Author</h4>
            <div class="book">
                <div class="book-title">A Book of 100 Claims</div>
                <div class="statements">
                    <div class="stmt">Claim 1: [Author believes this is true]</div>
                    <div class="stmt">Claim 2: [Author believes this is true]</div>
                    <div class="stmt">Claim 3: [Author believes this is true]</div>
                    <div class="stmt">... (97 more claims) ...</div>
                    <div class="stmt">Claim 100: [Author believes this is true]</div>
                </div>
                <div class="preface">
                    <strong>Preface:</strong> "Despite my best efforts, I'm sure this book contains at least one error."
                </div>
            </div>
            <div class="controls">
                <button id="analyze-btn">Analyze the Beliefs</button>
            </div>
            <div class="result" id="result"><p>The author believes each claim, yet also believes one is wrong...</p></div>
            <div class="insight">The preface paradox challenges the principle that rational beliefs must be consistent. It suggests that humility about our fallibility might be incompatible with commitment to our individual beliefs!</div>
        `;
    }

    setupEventListeners() {
        this.$('#analyze-btn').addEventListener('click', () => this.analyze());
    }

    analyze() {
        this.$('#result').innerHTML = `
            <p><strong>The author's beliefs:</strong></p>
            <p>B1: Claim 1 is true</p>
            <p>B2: Claim 2 is true</p>
            <p>... B100: Claim 100 is true</p>
            <p>B-preface: At least one of claims 1-100 is false</p>
            <p style="color: #ef4444; margin-top: 1rem;"><strong>Paradox:</strong></p>
            <p>B1 ∧ B2 ∧ ... ∧ B100 implies ALL claims are true</p>
            <p>B-preface implies at least one is FALSE</p>
            <p style="color: #ef4444;">These are inconsistent, yet each belief seems rational!</p>
            <p style="margin-top: 1rem;">The author has rationally inconsistent beliefs. Should they give up the preface (seems arrogant) or doubt some claim (but which one?).</p>
        `;
    }
}

customElements.define('preface-simulator', PrefaceSimulator);
export { PrefaceSimulator };
