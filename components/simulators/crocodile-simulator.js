/**
 * Crocodile Dilemma Simulator
 * A crocodile's impossible promise about returning a child
 */
import { SimulatorBase } from '../simulator-base.js';

class CrocodileSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .scene {
                    background: var(--bg, #0f172a);
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    margin: 1rem 0;
                    text-align: center;
                }

                .characters {
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    margin: 1rem 0;
                    font-size: 2rem;
                }

                .speech-bubble {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 1rem;
                    margin: 0.5rem 0;
                    position: relative;
                }

                .analysis-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                    margin: 1rem 0;
                }

                .analysis-box {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                }

                .analysis-box.paradox {
                    border: 2px solid #ef4444;
                    background: rgba(239, 68, 68, 0.1);
                }

                .analysis-box h5 {
                    color: var(--accent, #f59e0b);
                    margin-bottom: 0.5rem;
                }

                @media (max-width: 600px) {
                    .analysis-grid {
                        grid-template-columns: 1fr;
                    }
                    .controls {
                        flex-direction: column;
                    }
                }
            </style>

            <h4>The Crocodile's Promise</h4>

            <div class="scene">
                <div class="characters">
                    <span>crocodile</span>
                    <span>child</span>
                    <span>parent</span>
                </div>
                <div class="speech-bubble">
                    <strong>Crocodile:</strong> "I will return your child if and only if you correctly predict what I will do."
                </div>
            </div>

            <div class="controls">
                <button id="return-btn">Father: "You'll return him"</button>
                <button id="keep-btn">Father: "You'll keep him"</button>
            </div>

            <div class="analysis-grid" id="analysis">
                <div class="analysis-box">
                    <h5>Choose a prediction...</h5>
                    <p>What does the father guess?</p>
                </div>
            </div>

            <div class="result" id="result">
                <p>The father must make his prediction. But one answer creates an impossible situation for the crocodile...</p>
            </div>

            <div class="insight">
                This ancient paradox (attributed to the Greeks) shows how self-referential promises can create logical impossibilities. The crocodile has made a promise it cannot keep in one scenario!
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#return-btn').addEventListener('click', () => this.analyze('return'));
        this.$('#keep-btn').addEventListener('click', () => this.analyze('keep'));
    }

    analyze(prediction) {
        const analysis = this.$('#analysis');
        const result = this.$('#result');

        if (prediction === 'return') {
            analysis.innerHTML = `
                <div class="analysis-box">
                    <h5>If Crocodile Returns Child:</h5>
                    <p>Father predicted correctly (return)</p>
                    <p>Promise says: return if correct</p>
                    <p style="color: #22c55e;">Consistent! Crocodile keeps promise.</p>
                </div>
                <div class="analysis-box">
                    <h5>If Crocodile Keeps Child:</h5>
                    <p>Father predicted wrong</p>
                    <p>Promise says: don't return if wrong</p>
                    <p style="color: #22c55e;">Consistent! Crocodile keeps promise.</p>
                </div>
            `;
            result.innerHTML = `
                <p><strong>No paradox here!</strong></p>
                <p>If father says "return," the crocodile can do either action consistently:</p>
                <ul>
                    <li>Return = correct prediction = must return (check)</li>
                    <li>Keep = wrong prediction = don't return (check)</li>
                </ul>
                <p>The crocodile has free choice with no logical conflict.</p>
            `;
        } else {
            analysis.innerHTML = `
                <div class="analysis-box paradox">
                    <h5>If Crocodile Returns Child:</h5>
                    <p>Father predicted WRONG (he said "keep")</p>
                    <p>Promise says: don't return if wrong</p>
                    <p style="color: #ef4444;">But crocodile returned!</p>
                    <p style="color: #ef4444;"><strong>BROKEN PROMISE!</strong></p>
                </div>
                <div class="analysis-box paradox">
                    <h5>If Crocodile Keeps Child:</h5>
                    <p>Father predicted CORRECTLY (he said "keep")</p>
                    <p>Promise says: return if correct</p>
                    <p style="color: #ef4444;">But crocodile kept child!</p>
                    <p style="color: #ef4444;"><strong>BROKEN PROMISE!</strong></p>
                </div>
            `;
            result.innerHTML = `
                <p style="color: #ef4444;"><strong>THE PARADOX!</strong></p>
                <p>If the father says "You will NOT return my child":</p>
                <ul>
                    <li>If crocodile returns: prediction was wrong, so shouldn't return. Contradiction!</li>
                    <li>If crocodile keeps: prediction was right, so should return. Contradiction!</li>
                </ul>
                <p><strong>The crocodile CANNOT keep its promise either way!</strong></p>
            `;
        }
    }
}

customElements.define('crocodile-simulator', CrocodileSimulator);

export { CrocodileSimulator };
