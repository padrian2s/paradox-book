/**
 * Epimenides Paradox Simulator
 * "All Cretans are liars" said by a Cretan
 */
import { SimulatorBase } from '../simulator-base.js';

class EpimenidesSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .quote-box {
                    background: var(--bg, #0f172a);
                    padding: 2rem;
                    border-radius: 0.5rem;
                    text-align: center;
                    margin: 1rem 0;
                    border: 2px solid var(--accent, #f59e0b);
                }

                .quote {
                    font-size: 1.5rem;
                    font-style: italic;
                    color: var(--accent, #f59e0b);
                }

                .attribution {
                    margin-top: 0.5rem;
                    color: var(--muted, #94a3b8);
                }

                .analysis-section {
                    margin: 1rem 0;
                }

                .assumption-box {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    margin: 0.5rem 0;
                }

                .assumption-box.true {
                    border-left: 4px solid #22c55e;
                }

                .assumption-box.false {
                    border-left: 4px solid #3b82f6;
                }

                .assumption-box.paradox {
                    border-left: 4px solid #ef4444;
                    background: rgba(239, 68, 68, 0.1);
                }

                .step {
                    padding: 0.5rem 0;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                }

                .step:last-child {
                    border-bottom: none;
                }

                @media (max-width: 600px) {
                    .controls {
                        flex-direction: column;
                    }
                    .quote {
                        font-size: 1.2rem;
                    }
                }
            </style>

            <h4>The Cretan's Claim</h4>

            <div class="quote-box">
                <div class="quote">"All Cretans are liars."</div>
                <div class="attribution">— Epimenides of Crete (6th century BC)</div>
            </div>

            <div class="controls">
                <button id="true-btn">Assume Statement is TRUE</button>
                <button id="false-btn">Assume Statement is FALSE</button>
            </div>

            <div class="analysis-section" id="analysis">
                <p>What happens if we assume the statement is true or false?</p>
            </div>

            <div class="result" id="result">
                <p>Click a button to analyze the logical implications...</p>
            </div>

            <div class="insight">
                Unlike the pure Liar's Paradox ("This sentence is false"), Epimenides' version has an escape: if some Cretans tell truth sometimes, Epimenides could be one of the liars, making his statement false but not paradoxical. The statement is likely just false, not a true paradox!
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#true-btn').addEventListener('click', () => this.analyze(true));
        this.$('#false-btn').addEventListener('click', () => this.analyze(false));
    }

    analyze(assumeTrue) {
        const analysis = this.$('#analysis');
        const result = this.$('#result');

        if (assumeTrue) {
            analysis.innerHTML = `
                <div class="assumption-box paradox">
                    <h5>Assuming "All Cretans are liars" is TRUE:</h5>
                    <div class="step">1. Epimenides is a Cretan</div>
                    <div class="step">2. If ALL Cretans are liars, then Epimenides is a liar</div>
                    <div class="step">3. If he's a liar, his statement must be FALSE</div>
                    <div class="step">4. But we assumed it's TRUE...</div>
                    <div class="step" style="color: #ef4444; font-weight: bold;">5. CONTRADICTION!</div>
                </div>
            `;
            result.innerHTML = `
                <p style="color: #ef4444;"><strong>Contradiction Found!</strong></p>
                <p>If the statement is true, then Epimenides is lying (because he's a Cretan and all Cretans lie).</p>
                <p>But if he's lying, the statement can't be true.</p>
                <p><strong>Conclusion: The statement CANNOT be true.</strong></p>
            `;
        } else {
            analysis.innerHTML = `
                <div class="assumption-box false">
                    <h5>Assuming "All Cretans are liars" is FALSE:</h5>
                    <div class="step">1. "All Cretans are liars" is false</div>
                    <div class="step">2. This means: NOT all Cretans are liars</div>
                    <div class="step">3. At least SOME Cretans tell the truth (sometimes)</div>
                    <div class="step">4. Epimenides could be one of the liars</div>
                    <div class="step" style="color: #22c55e; font-weight: bold;">5. NO CONTRADICTION!</div>
                </div>
            `;
            result.innerHTML = `
                <p style="color: #22c55e;"><strong>No Paradox!</strong></p>
                <p>If the statement is false, then some Cretans tell the truth.</p>
                <p>Epimenides doesn't have to be truthful - he can be one of the liars.</p>
                <p>A liar making a false statement is perfectly consistent!</p>
                <p><strong>Conclusion: The statement is simply FALSE, not paradoxical.</strong></p>
            `;
        }
    }
}

customElements.define('epimenides-simulator', EpimenidesSimulator);

export { EpimenidesSimulator };
