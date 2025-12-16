/**
 * Burali-Forti Paradox Simulator
 */
import { SimulatorBase } from '../simulator-base.js';

class BuraliFortiSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}
                .ordinals { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 1rem 0; justify-content: center; }
                .ordinal { background: var(--card); padding: 0.5rem 1rem; border-radius: 0.25rem; }
                .ordinal.omega { background: var(--accent); color: var(--bg); }
            </style>
            <h4>The Set of All Ordinals</h4>
            <div class="ordinals">
                <div class="ordinal">0</div><div class="ordinal">1</div><div class="ordinal">2</div><div class="ordinal">3</div>
                <div class="ordinal">...</div><div class="ordinal">ω</div><div class="ordinal">ω+1</div><div class="ordinal">...</div>
                <div class="ordinal omega">Ω = set of all ordinals?</div>
            </div>
            <div class="controls"><button id="analyze-btn">Analyze the Paradox</button></div>
            <div class="result" id="result"><p>Every well-ordered set has an ordinal number. What about the set of ALL ordinals?</p></div>
            <div class="insight">This paradox (1897) showed naive set theory leads to contradictions, motivating axiomatic set theory where "the set of all ordinals" simply doesn't exist.</div>
        `;
    }
    setupEventListeners() {
        this.$('#analyze-btn').addEventListener('click', () => {
            this.$('#result').innerHTML = `
                <p>1. Suppose Ω is the set of all ordinal numbers</p>
                <p>2. Ω is well-ordered (ordinals can be compared)</p>
                <p>3. So Ω has an ordinal number, call it α</p>
                <p>4. α must be IN Ω (it's an ordinal)</p>
                <p>5. But α = ordinal of Ω means α > every ordinal in Ω</p>
                <p style="color: #ef4444;"><strong>Contradiction:</strong> α is both in Ω and greater than everything in Ω!</p>
            `;
        });
    }
}
customElements.define('burali-forti-simulator', BuraliFortiSimulator);
export { BuraliFortiSimulator };
