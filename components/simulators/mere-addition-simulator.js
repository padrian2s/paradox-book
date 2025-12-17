import { SimulatorBase } from '../simulator-base.js';

class MereAdditionSimulator extends SimulatorBase {
    constructor() {
        super();
        this.populations = [
            { name: 'A', count: 10, happiness: 100 },
            { name: 'A+', count: 10, happiness: 100, extra: { count: 10, happiness: 50 } },
            { name: 'B-', count: 20, happiness: 75 },
            { name: 'B', count: 20, happiness: 75 }
        ];
        this.step = 0;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .mere-viz {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .population-comparison {
                    display: flex;
                    justify-content: center;
                    gap: 2rem;
                    flex-wrap: wrap;
                    margin-bottom: 1rem;
                }

                .population {
                    text-align: center;
                }

                .pop-label {
                    font-weight: bold;
                    font-size: 1.25rem;
                    margin-bottom: 0.5rem;
                    color: var(--primary, #6366f1);
                }

                .pop-bar-container {
                    display: flex;
                    gap: 0.25rem;
                    justify-content: center;
                }

                .pop-bar {
                    width: 30px;
                    background: linear-gradient(to top, #22c55e, #86efac);
                    border-radius: 0.25rem 0.25rem 0 0;
                    transition: height 0.5s ease;
                }

                .pop-bar.extra {
                    background: linear-gradient(to top, #f59e0b, #fcd34d);
                }

                .pop-stats {
                    margin-top: 0.5rem;
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }

                .total-utility {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                }

                .comparison-arrow {
                    display: flex;
                    align-items: center;
                    font-size: 2rem;
                    color: var(--muted, #94a3b8);
                }

                .step-explanation {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                    text-align: center;
                }

                .better-than {
                    color: #22c55e;
                    font-weight: bold;
                }

                @media (max-width: 600px) {
                    .population-comparison {
                        flex-direction: column;
                        align-items: center;
                    }
                    .comparison-arrow {
                        transform: rotate(90deg);
                    }
                    .pop-bar {
                        width: 20px;
                    }
                }
            </style>

            <h4>Parfit's Repugnant Conclusion</h4>

            <div class="mere-viz">
                <div class="population-comparison" id="pop-comparison">
                </div>

                <div class="step-explanation" id="step-explanation">
                    Click "Next Step" to see how adding happy lives leads to a troubling conclusion.
                </div>
            </div>

            <div class="controls" style="margin-top: 1rem;">
                <button id="next-step-btn">Next Step</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="result">
                <p id="mere-result">This paradox shows how seemingly reasonable intuitions about population ethics lead to "The Repugnant Conclusion."</p>
            </div>

            <div class="insight">
                Derek Parfit showed: If adding happy people is good, and equality is good, we reach a conclusion where a huge population barely worth living is "better" than a small ecstatic one.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#next-step-btn').addEventListener('click', () => this.nextStep());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
        this.renderStep();
    }

    renderStep() {
        const container = this.$('#pop-comparison');
        const explanation = this.$('#step-explanation');

        if (this.step === 0) {
            container.innerHTML = `
                <div class="population">
                    <div class="pop-label">World A</div>
                    <div class="pop-bar-container">
                        ${Array(10).fill('<div class="pop-bar" style="height: 100px;"></div>').join('')}
                    </div>
                    <div class="pop-stats">10 people, happiness: 100</div>
                    <div class="total-utility">Total: 1000</div>
                </div>
            `;
            explanation.innerHTML = 'World A: A small population of very happy people. Seems good!';
        } else if (this.step === 1) {
            container.innerHTML = `
                <div class="population">
                    <div class="pop-label">World A</div>
                    <div class="pop-bar-container">
                        ${Array(10).fill('<div class="pop-bar" style="height: 100px;"></div>').join('')}
                    </div>
                    <div class="pop-stats">10 people, happiness: 100</div>
                    <div class="total-utility">Total: 1000</div>
                </div>
                <div class="comparison-arrow">vs</div>
                <div class="population">
                    <div class="pop-label">World A+</div>
                    <div class="pop-bar-container">
                        ${Array(10).fill('<div class="pop-bar" style="height: 100px;"></div>').join('')}
                        ${Array(10).fill('<div class="pop-bar extra" style="height: 50px;"></div>').join('')}
                    </div>
                    <div class="pop-stats">10 @ 100 + 10 @ 50</div>
                    <div class="total-utility">Total: 1500</div>
                </div>
            `;
            explanation.innerHTML = '<span class="better-than">A+ seems better than A:</span> Same happy people, PLUS extra happy people. Adding happy lives is good, right?';
        } else if (this.step === 2) {
            container.innerHTML = `
                <div class="population">
                    <div class="pop-label">World A+</div>
                    <div class="pop-bar-container">
                        ${Array(10).fill('<div class="pop-bar" style="height: 100px;"></div>').join('')}
                        ${Array(10).fill('<div class="pop-bar extra" style="height: 50px;"></div>').join('')}
                    </div>
                    <div class="pop-stats">Unequal: 100 and 50</div>
                    <div class="total-utility">Total: 1500</div>
                </div>
                <div class="comparison-arrow">vs</div>
                <div class="population">
                    <div class="pop-label">World B</div>
                    <div class="pop-bar-container">
                        ${Array(20).fill('<div class="pop-bar" style="height: 75px;"></div>').join('')}
                    </div>
                    <div class="pop-stats">20 people @ 75 (equal!)</div>
                    <div class="total-utility">Total: 1500</div>
                </div>
            `;
            explanation.innerHTML = '<span class="better-than">B seems better than A+:</span> Same total utility, but equality is better than inequality!';
        } else if (this.step === 3) {
            container.innerHTML = `
                <div class="population">
                    <div class="pop-label">World A</div>
                    <div class="pop-bar-container">
                        ${Array(10).fill('<div class="pop-bar" style="height: 100px;"></div>').join('')}
                    </div>
                    <div class="pop-stats">10 very happy</div>
                    <div class="total-utility">Total: 1000</div>
                </div>
                <div class="comparison-arrow" style="color: #ef4444;">???</div>
                <div class="population">
                    <div class="pop-label">World B</div>
                    <div class="pop-bar-container">
                        ${Array(20).fill('<div class="pop-bar" style="height: 75px;"></div>').join('')}
                    </div>
                    <div class="pop-stats">20 somewhat happy</div>
                    <div class="total-utility">Total: 1500</div>
                </div>
            `;
            explanation.innerHTML = '<strong style="color: #ef4444;">THE PARADOX:</strong> By transitivity, B > A+ > A, so B > A. But B has lower individual happiness! Repeat this logic and you reach...';
        } else if (this.step === 4) {
            container.innerHTML = `
                <div class="population">
                    <div class="pop-label">World A</div>
                    <div class="pop-bar-container">
                        ${Array(10).fill('<div class="pop-bar" style="height: 100px;"></div>').join('')}
                    </div>
                    <div class="pop-stats">Ecstatic few</div>
                </div>
                <div class="comparison-arrow" style="color: #ef4444;">"worse than"</div>
                <div class="population">
                    <div class="pop-label">World Z</div>
                    <div class="pop-bar-container">
                        ${Array(30).fill('<div class="pop-bar" style="height: 5px;"></div>').join('')}
                    </div>
                    <div class="pop-stats">Billions barely worth living</div>
                </div>
            `;
            explanation.innerHTML = '<strong style="color: #ef4444;">THE REPUGNANT CONCLUSION:</strong> A vast population of lives barely worth living is "better" than a small population of very happy people!';
            this.$('#mere-result').innerHTML = '<strong>No escape!</strong> Each step seems reasonable, but the conclusion is deeply troubling. This is one of the hardest problems in ethics.';
        }
    }

    nextStep() {
        if (this.step < 4) {
            this.step++;
            this.renderStep();
        }
    }

    reset() {
        this.step = 0;
        this.renderStep();
        this.$('#mere-result').textContent = 'This paradox shows how seemingly reasonable intuitions about population ethics lead to "The Repugnant Conclusion."';
    }
}

customElements.define('mere-addition-simulator', MereAdditionSimulator);

export { MereAdditionSimulator };
