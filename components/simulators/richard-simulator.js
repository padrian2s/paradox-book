/**
 * Richard's Paradox Simulator
 */
import { SimulatorBase } from '../simulator-base.js';

class RichardSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}
                .decimal-box { background: var(--bg); padding: 1rem; border-radius: 0.5rem; margin: 1rem 0; font-family: monospace; }
                .definition { background: var(--card); padding: 1rem; border-radius: 0.5rem; margin: 0.5rem 0; border-left: 4px solid var(--primary); }
                .definition.paradox { border-left-color: #ef4444; }
            </style>
            <h4>Defining the Undefinable</h4>
            <div class="definition">
                <p><strong>Step 1:</strong> List all English definitions of real numbers between 0 and 1.</p>
                <p>e.g., "one half", "pi minus three", "the decimal 0.333..."</p>
            </div>
            <div class="definition">
                <p><strong>Step 2:</strong> Order them alphabetically and number them: D1, D2, D3, ...</p>
            </div>
            <div class="definition">
                <p><strong>Step 3:</strong> Construct Richard's number R:</p>
                <p>R's nth digit differs from the nth digit of Dn</p>
            </div>
            <div class="controls">
                <button id="construct-btn">Construct R</button>
                <button id="paradox-btn">The Paradox</button>
            </div>
            <div class="decimal-box" id="decimal"></div>
            <div class="result" id="result"><p>We can define a number that differs from every definable number...</p></div>
            <div class="insight">Richard's paradox (1905) shows that "definable in English" is not a well-defined mathematical concept. It influenced Gödel's incompleteness theorems and Tarski's undefinability theorem.</div>
        `;
    }

    setupEventListeners() {
        this.$('#construct-btn').addEventListener('click', () => this.construct());
        this.$('#paradox-btn').addEventListener('click', () => this.showParadox());
    }

    construct() {
        this.$('#decimal').innerHTML = `
            <p>D1 = 0.<strong>3</strong>333... → R's 1st digit ≠ 3 → use 4</p>
            <p>D2 = 0.1<strong>4</strong>159... → R's 2nd digit ≠ 4 → use 5</p>
            <p>D3 = 0.50<strong>0</strong>00... → R's 3rd digit ≠ 0 → use 1</p>
            <p>D4 = 0.142<strong>8</strong>5... → R's 4th digit ≠ 8 → use 9</p>
            <p>...</p>
            <p><strong>R = 0.4519...</strong> differs from every Dn!</p>
        `;
        this.$('#result').innerHTML = '<p>R differs from D1 in digit 1, from D2 in digit 2, etc. So R is not any of the definable numbers!</p>';
    }

    showParadox() {
        this.$('#decimal').innerHTML = `
            <div class="definition paradox">
                <p><strong>But wait!</strong></p>
                <p>We just DEFINED R in English:</p>
                <p>"The number whose nth digit differs from the nth digit of the nth definable number"</p>
                <p style="color: #ef4444;">This is a finite English definition!</p>
                <p style="color: #ef4444;">So R should be in our list as some Dk!</p>
                <p style="color: #ef4444;">But R differs from every number in the list!</p>
            </div>
        `;
        this.$('#result').innerHTML = '<p style="color: #ef4444;"><strong>Paradox!</strong> R is both definable (we just defined it) and not in the list of definable numbers (by construction).</p>';
    }
}

customElements.define('richard-simulator', RichardSimulator);
export { RichardSimulator };
