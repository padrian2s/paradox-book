/**
 * Liar's Paradox Simulator
 * Demonstrates the truth value loop: "This sentence is false"
 */
import { SimulatorBase } from '../simulator-base.js';

class LiarSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .liar-viz {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                    text-align: center;
                }

                .statement-box {
                    padding: 1.5rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    margin-bottom: 1rem;
                }

                .statement-text {
                    font-size: 1.25rem;
                    font-style: italic;
                    margin-bottom: 0.5rem;
                }

                .truth-value {
                    font-size: 2rem;
                    font-weight: bold;
                }

                .truth-value.true {
                    color: #22c55e;
                }

                .truth-value.false {
                    color: #ef4444;
                }

                .truth-value.paradox {
                    color: #f59e0b;
                    animation: pulse 1s infinite;
                }

                @keyframes pulse {
                    50% { opacity: 0.5; }
                }

                .logic-chain {
                    text-align: left;
                    padding: 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                }

                .logic-step {
                    padding: 0.5rem;
                    margin: 0.25rem 0;
                    border-left: 3px solid var(--primary, #6366f1);
                    padding-left: 1rem;
                }

                .logic-step.contradiction {
                    border-left-color: #ef4444;
                    color: #ef4444;
                }
            </style>

            <h4>Truth Value Explorer</h4>

            <div class="liar-viz">
                <div class="statement-box">
                    <div class="statement-text">"This sentence is false."</div>
                    <div class="truth-value" id="truth-value">???</div>
                </div>
                <div class="logic-chain" id="logic-chain">
                    <div class="logic-step">Click a button to trace the logic...</div>
                </div>
            </div>

            <div class="controls" style="margin-top: 1rem;">
                <button id="btn-true">Assume TRUE</button>
                <button id="btn-false">Assume FALSE</button>
                <button id="btn-reset">Reset</button>
            </div>

            <div class="result">
                <p id="liar-result">This paradox challenged Aristotle, Russell, Tarski, and Godel. It's at the heart of incompleteness theorems.</p>
            </div>

            <div class="insight">
                Solutions include: truth-value gaps (neither true nor false), hierarchies of truth, or abandoning classical logic. None fully satisfy everyone.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#btn-true').addEventListener('click', () => this.assumeLiar('true'));
        this.$('#btn-false').addEventListener('click', () => this.assumeLiar('false'));
        this.$('#btn-reset').addEventListener('click', () => this.resetLiar());
    }

    assumeLiar(assumption) {
        const chain = this.$('#logic-chain');
        const truthValue = this.$('#truth-value');

        if (assumption === 'true') {
            chain.innerHTML = `
                <div class="logic-step">1. Assume the sentence is TRUE</div>
                <div class="logic-step">2. If true, then what it says is the case</div>
                <div class="logic-step">3. It says "this sentence is false"</div>
                <div class="logic-step">4. So the sentence must be FALSE</div>
                <div class="logic-step contradiction">5. CONTRADICTION! We assumed TRUE but derived FALSE</div>
            `;
            truthValue.textContent = 'TRUE -> FALSE';
            truthValue.className = 'truth-value paradox';
        } else {
            chain.innerHTML = `
                <div class="logic-step">1. Assume the sentence is FALSE</div>
                <div class="logic-step">2. If false, then what it says is NOT the case</div>
                <div class="logic-step">3. It says "this sentence is false"</div>
                <div class="logic-step">4. So the sentence must NOT be false, i.e., TRUE</div>
                <div class="logic-step contradiction">5. CONTRADICTION! We assumed FALSE but derived TRUE</div>
            `;
            truthValue.textContent = 'FALSE -> TRUE';
            truthValue.className = 'truth-value paradox';
        }

        this.$('#liar-result').innerHTML =
            '<strong style="color: #f59e0b;">PARADOX!</strong> Both assumptions lead to contradictions. The sentence can be neither true nor false!';
    }

    resetLiar() {
        this.$('#logic-chain').innerHTML = '<div class="logic-step">Click a button to trace the logic...</div>';
        this.$('#truth-value').textContent = '???';
        this.$('#truth-value').className = 'truth-value';
        this.$('#liar-result').textContent = 'This paradox challenged Aristotle, Russell, Tarski, and Godel. It\'s at the heart of incompleteness theorems.';
    }
}

customElements.define('liar-simulator', LiarSimulator);

export { LiarSimulator };
