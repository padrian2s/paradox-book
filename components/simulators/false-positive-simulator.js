/**
 * False Positive Paradox Simulator
 */
import { SimulatorBase } from '../simulator-base.js';

class FalsePositiveSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}
                .scenario { background: var(--bg); padding: 1rem; border-radius: 0.5rem; margin: 1rem 0; }
                .calc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1rem 0; }
                .calc-box { background: var(--card); padding: 1rem; border-radius: 0.5rem; }
            </style>
            <h4>Medical Test Results</h4>
            <div class="scenario">
                <p><strong>The test:</strong> 99% accurate (sensitivity & specificity)</p>
                <p><strong>The disease:</strong> affects 1 in 1000 people</p>
                <p><strong>Your result:</strong> POSITIVE 😰</p>
            </div>
            <div class="controls">
                <button id="intuition-btn">Intuitive Answer</button>
                <button id="bayes-btn">Apply Bayes' Theorem</button>
            </div>
            <div class="result" id="result"><p>What's the probability you actually have the disease?</p></div>
            <div class="insight">Base rate neglect is a common cognitive bias. Even highly accurate tests produce mostly false positives when testing for rare conditions. This is why screening tests need confirmation!</div>
        `;
    }
    setupEventListeners() {
        this.$('#intuition-btn').addEventListener('click', () => {
            this.$('#result').innerHTML = `<p><strong>Intuition:</strong> Test is 99% accurate, so...</p><p>P(have disease) ≈ 99%?</p><p style="color: #ef4444;"><strong>WRONG!</strong> This ignores the base rate.</p>`;
        });
        this.$('#bayes-btn').addEventListener('click', () => {
            this.$('#result').innerHTML = `
                <p><strong>In 100,000 people:</strong></p>
                <p>• 100 have disease → 99 test positive (true positives)</p>
                <p>• 99,900 healthy → 999 test positive (false positives)</p>
                <p>• Total positive tests: 99 + 999 = 1,098</p>
                <p><strong>P(disease | positive) = 99/1098 ≈ 9%</strong></p>
                <p style="color: var(--accent);">Despite 99% accuracy, only ~9% of positives actually have the disease!</p>
            `;
        });
    }
}
customElements.define('false-positive-simulator', FalsePositiveSimulator);
export { FalsePositiveSimulator };
