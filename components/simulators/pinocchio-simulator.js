/**
 * Pinocchio Paradox Simulator
 * What happens if Pinocchio says "My nose grows now"?
 */
import { SimulatorBase } from '../simulator-base.js';

class PinocchioSimulator extends SimulatorBase {
    constructor() {
        super();
        this.noseLength = 100;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .pinocchio-scene {
                    background: var(--bg, #0f172a);
                    padding: 2rem;
                    border-radius: 0.5rem;
                    text-align: center;
                    margin: 1rem 0;
                }

                .face {
                    font-size: 4rem;
                    margin-bottom: 1rem;
                }

                .nose-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    margin: 1rem 0;
                }

                .nose {
                    height: 20px;
                    background: linear-gradient(90deg, #d97706, #f59e0b);
                    border-radius: 0 10px 10px 0;
                    transition: width 0.5s ease;
                }

                .speech-bubble {
                    background: var(--card, #1e293b);
                    padding: 1.5rem;
                    border-radius: 1rem;
                    margin: 1rem auto;
                    max-width: 300px;
                    position: relative;
                    font-size: 1.2rem;
                    font-weight: bold;
                }

                .analysis-box {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    margin: 0.5rem 0;
                    text-align: left;
                }

                .analysis-box.paradox {
                    border: 2px solid #ef4444;
                }

                .loop-animation {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                    margin: 1rem 0;
                    font-size: 1.5rem;
                }

                .loop-item {
                    padding: 0.5rem 1rem;
                    border-radius: 0.5rem;
                    background: var(--card, #1e293b);
                }

                .loop-item.active {
                    background: var(--accent, #f59e0b);
                    color: var(--bg, #0f172a);
                }

                @media (max-width: 600px) {
                    .controls {
                        flex-direction: column;
                    }
                }
            </style>

            <h4>Pinocchio's Dilemma</h4>

            <div class="pinocchio-scene">
                <div class="face">lying_face</div>
                <div class="nose-container">
                    <span>Face</span>
                    <div class="nose" id="nose" style="width: 100px;"></div>
                </div>
                <div class="speech-bubble" id="speech">
                    "My nose grows now!"
                </div>
            </div>

            <div class="controls">
                <button id="analyze-btn">Analyze the Statement</button>
                <button id="loop-btn">Watch the Loop</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div id="analysis"></div>

            <div class="result" id="result">
                <p>The magic rule: Pinocchio's nose grows if and only if he tells a lie.</p>
            </div>

            <div class="insight">
                This modern paradox combines the Liar's Paradox with Pinocchio's magical nose. It's self-referential because the statement's truth value depends on what the nose does, but what the nose does depends on the statement's truth value!
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#analyze-btn').addEventListener('click', () => this.analyze());
        this.$('#loop-btn').addEventListener('click', () => this.showLoop());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
    }

    analyze() {
        this.$('#analysis').innerHTML = `
            <div class="analysis-box paradox">
                <h5>Case 1: Statement is TRUE (nose grows)</h5>
                <p>If "My nose grows now" is TRUE...</p>
                <p>Then his nose IS growing</p>
                <p>But noses only grow when Pinocchio LIES</p>
                <p style="color: #ef4444;">If nose grows, he's lying, so statement is FALSE!</p>
            </div>
            <div class="analysis-box paradox">
                <h5>Case 2: Statement is FALSE (nose doesn't grow)</h5>
                <p>If "My nose grows now" is FALSE...</p>
                <p>Then his nose is NOT growing</p>
                <p>But this means he told the truth</p>
                <p>Wait - his nose ISN'T growing, so he said something false!</p>
                <p style="color: #ef4444;">If nose doesn't grow, he told truth, but statement would be false... which is a lie... so nose SHOULD grow!</p>
            </div>
        `;

        this.$('#result').innerHTML = `
            <p style="color: #ef4444;"><strong>Paradox!</strong></p>
            <p>If TRUE nose grows, but growth means lie FALSE</p>
            <p>If FALSE nose stays, but staying means truth TRUE</p>
            <p>The nose can neither grow nor stay the same!</p>
        `;
    }

    showLoop() {
        this.stopLoop = false;
        let growing = true;
        const nose = this.$('#nose');
        const speech = this.$('#speech');

        const loop = () => {
            if (this.stopLoop) return;

            if (growing) {
                nose.style.width = '200px';
                speech.innerHTML = '"My nose grows now!"<br><small style="color: #ef4444;">Nose growing... but that means I lied!</small>';
            } else {
                nose.style.width = '100px';
                speech.innerHTML = '"My nose grows now!"<br><small style="color: #22c55e;">Nose shrinking... but that means I told truth!</small>';
            }
            growing = !growing;

            setTimeout(loop, 1500);
        };

        loop();

        this.$('#result').innerHTML = `
            <p style="color: var(--accent);"><strong>Infinite Loop!</strong></p>
            <p>TRUE leads to FALSE leads to TRUE leads to FALSE leads to TRUE...</p>
            <p>The paradox has no stable state.</p>
        `;
    }

    reset() {
        this.stopLoop = true;
        this.$('#nose').style.width = '100px';
        this.$('#speech').innerHTML = '"My nose grows now!"';
        this.$('#analysis').innerHTML = '';
        this.$('#result').innerHTML = `
            <p>The magic rule: Pinocchio's nose grows if and only if he tells a lie.</p>
        `;
    }
}

customElements.define('pinocchio-simulator', PinocchioSimulator);

export { PinocchioSimulator };
