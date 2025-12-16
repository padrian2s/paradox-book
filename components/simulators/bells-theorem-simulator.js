/**
 * Bell's Theorem Paradox Simulator
 * Quantum correlations violate classical probability rules
 */
import { SimulatorBase } from '../simulator-base.js';

class BellsTheoremSimulator extends SimulatorBase {
    constructor() {
        super();
        this.trials = 0;
        this.correlation = 0;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .comparison-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .prediction-box {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .prediction-box h5 {
                    margin-bottom: 0.5rem;
                }

                .prediction-box .value {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                }

                .prediction-box .note {
                    font-size: 0.8rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                .classical { color: var(--primary, #6366f1); }
                .quantum { color: var(--secondary, #8b5cf6); }

                .violation-indicator {
                    padding: 0.5rem 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                    margin-top: 1rem;
                    font-weight: bold;
                }

                .violation-indicator.violated {
                    background: rgba(34, 197, 94, 0.2);
                    color: #22c55e;
                }

                .violation-indicator.pending {
                    background: rgba(99, 102, 241, 0.1);
                    color: var(--muted, #94a3b8);
                }
            </style>

            <h4>Quantum vs Classical Probability</h4>

            <div class="controls">
                <button id="run-btn">Run Experiment</button>
                <button id="run-many-btn">Run 1000x</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="comparison-grid">
                <div class="prediction-box">
                    <h5 class="classical">Classical Prediction</h5>
                    <p>Correlation ≤ <span class="value">2.0</span></p>
                    <p class="note">(Bell inequality limit)</p>
                </div>
                <div class="prediction-box">
                    <h5 class="quantum">Quantum Result</h5>
                    <p>Correlation = <span class="value" id="result">?</span></p>
                    <p class="note">Measured: <span id="trials">0</span> trials</p>
                </div>
            </div>

            <div class="violation-indicator pending" id="indicator">
                Run experiments to test Bell's inequality...
            </div>

            <div class="result" id="explanation">
                <p>Run experiments to see if nature violates Bell's inequality...</p>
            </div>

            <div class="insight">
                Quantum mechanics predicts (and experiments confirm) correlations up to 2√2 ≈ 2.83, violating the classical limit. Reality is either non-local or non-realistic!
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#run-btn').addEventListener('click', () => this.runExperiment());
        this.$('#run-many-btn').addEventListener('click', () => this.runMany());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
    }

    runExperiment() {
        this.trials++;
        const thisResult = 2.0 + Math.random() * 0.828;
        this.correlation = ((this.correlation * (this.trials - 1)) + thisResult) / this.trials;
        this.updateDisplay();
    }

    runMany() {
        for (let i = 0; i < 1000; i++) {
            this.trials++;
            const thisResult = 2.0 + Math.random() * 0.828;
            this.correlation = ((this.correlation * (this.trials - 1)) + thisResult) / this.trials;
        }
        this.updateDisplay();
    }

    updateDisplay() {
        this.$('#result').textContent = this.correlation.toFixed(3);
        this.$('#trials').textContent = this.trials;

        const indicator = this.$('#indicator');
        const explanation = this.$('#explanation');

        if (this.correlation > 2.0) {
            indicator.className = 'violation-indicator violated';
            indicator.textContent = 'BELL INEQUALITY VIOLATED!';
            explanation.innerHTML = `
                <p style="color: #22c55e;"><strong>BELL INEQUALITY VIOLATED!</strong></p>
                <p>Measured correlation ${this.correlation.toFixed(3)} > 2.0 (classical limit)</p>
                <p>This proves quantum mechanics is correct and reality is stranger than classical physics allows!</p>
            `;
        } else {
            indicator.className = 'violation-indicator pending';
            indicator.textContent = 'Run more experiments...';
            explanation.innerHTML = `<p>Current correlation: ${this.correlation.toFixed(3)}. Run more trials...</p>`;
        }
    }

    reset() {
        this.trials = 0;
        this.correlation = 0;
        this.$('#result').textContent = '?';
        this.$('#trials').textContent = '0';
        this.$('#indicator').className = 'violation-indicator pending';
        this.$('#indicator').textContent = 'Run experiments to test Bell\'s inequality...';
        this.$('#explanation').innerHTML = '<p>Run experiments to see if nature violates Bell\'s inequality...</p>';
    }
}

customElements.define('bells-theorem-simulator', BellsTheoremSimulator);

export { BellsTheoremSimulator };
