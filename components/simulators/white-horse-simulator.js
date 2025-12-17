import { SimulatorBase } from '../simulator-base.js';

class WhiteHorseSimulator extends SimulatorBase {
    constructor() {
        super();
        this.currentStep = 0;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .argument-container {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                }

                .philosopher-quote {
                    text-align: center;
                    font-style: italic;
                    font-size: 1.25rem;
                    color: var(--accent, #f59e0b);
                    padding: 1rem;
                    margin-bottom: 1rem;
                    border: 1px dashed var(--accent);
                    border-radius: 0.5rem;
                }

                .venn-diagram {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 2rem;
                    position: relative;
                    min-height: 200px;
                }

                .circle {
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    transition: all 0.3s ease;
                }

                .circle.horses {
                    background: rgba(99, 102, 241, 0.3);
                    border: 3px solid var(--primary, #6366f1);
                }

                .circle.white-horses {
                    background: rgba(245, 158, 11, 0.3);
                    border: 3px solid var(--accent, #f59e0b);
                    margin-left: -50px;
                }

                .circle-label {
                    position: absolute;
                    font-size: 0.75rem;
                    font-weight: bold;
                }

                .circle.horses .circle-label {
                    bottom: -25px;
                    color: var(--primary);
                }

                .circle.white-horses .circle-label {
                    bottom: -25px;
                    color: var(--accent);
                }

                .horse-icon {
                    font-size: 2rem;
                }

                .argument-steps {
                    margin-top: 1rem;
                }

                .step {
                    padding: 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    margin: 0.5rem 0;
                    border-left: 3px solid var(--muted);
                    opacity: 0.5;
                    transition: all 0.3s ease;
                }

                .step.active {
                    opacity: 1;
                    border-left-color: var(--primary, #6366f1);
                }

                .step.highlight {
                    border-left-color: var(--accent, #f59e0b);
                    background: rgba(245, 158, 11, 0.1);
                }

                .step-number {
                    display: inline-block;
                    width: 24px;
                    height: 24px;
                    background: var(--primary);
                    border-radius: 50%;
                    text-align: center;
                    line-height: 24px;
                    font-size: 0.75rem;
                    margin-right: 0.5rem;
                }

                .counterpoint {
                    margin-top: 1rem;
                    padding: 1rem;
                    background: rgba(34, 197, 94, 0.1);
                    border: 1px solid #22c55e;
                    border-radius: 0.5rem;
                }

                .counterpoint-title {
                    font-weight: bold;
                    color: #22c55e;
                    margin-bottom: 0.5rem;
                }

                .philosopher-info {
                    margin-top: 1rem;
                    padding: 1rem;
                    background: var(--card);
                    border-radius: 0.5rem;
                    font-size: 0.875rem;
                }

                .philosopher-name {
                    font-weight: bold;
                    color: var(--accent);
                }

                @media (max-width: 600px) {
                    .venn-diagram {
                        flex-direction: column;
                        padding: 1rem;
                    }
                    .circle {
                        width: 120px;
                        height: 120px;
                    }
                    .circle.white-horses {
                        margin-left: 0;
                        margin-top: -40px;
                    }
                }
            </style>

            <h4>White Horse Paradox</h4>
            <p style="color: var(--muted); margin-bottom: 1rem;">An ancient Chinese logic puzzle: Is a white horse a horse?</p>

            <div class="controls">
                <button id="step-btn">Step Through Argument</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="argument-container">
                <div class="philosopher-quote">
                    "A white horse is not a horse."
                </div>

                <div class="venn-diagram">
                    <div class="circle horses" id="horses-circle">
                        <span class="horse-icon">&#x1F40E;</span>
                        <span class="circle-label">HORSES</span>
                    </div>
                    <div class="circle white-horses" id="white-horses-circle">
                        <span class="horse-icon" style="filter: grayscale(100%) brightness(2);">&#x1F40E;</span>
                        <span class="circle-label">WHITE HORSES</span>
                    </div>
                </div>

                <div class="argument-steps">
                    <div class="step" id="step-1">
                        <span class="step-number">1</span>
                        "Horse" refers to FORM (the shape/nature of being a horse)
                    </div>
                    <div class="step" id="step-2">
                        <span class="step-number">2</span>
                        "White" refers to COLOR (a property)
                    </div>
                    <div class="step" id="step-3">
                        <span class="step-number">3</span>
                        "White horse" refers to FORM + COLOR combined
                    </div>
                    <div class="step" id="step-4">
                        <span class="step-number">4</span>
                        FORM alone is not the same as FORM + COLOR
                    </div>
                    <div class="step highlight" id="step-5">
                        <span class="step-number">5</span>
                        Therefore: "A white horse is not a horse" (as categories differ!)
                    </div>
                </div>
            </div>

            <div class="result" id="result">
                <p>Click "Step Through Argument" to see Gongsun Long's reasoning.</p>
            </div>

            <div class="counterpoint">
                <div class="counterpoint-title">The Common Sense Response:</div>
                <p>Of course a white horse IS a horse! The argument confuses the <em>intension</em> (definition) with <em>extension</em> (instances). All white horses are instances of horses, even if "white horse" and "horse" have different definitions.</p>
            </div>

            <div class="philosopher-info">
                <span class="philosopher-name">Gongsun Long (320-250 BCE)</span> - Chinese philosopher of the School of Names, famous for his paradoxes about language and reality. This paradox explores how language carves up reality into categories.
            </div>

            <div class="insight">
                The paradox reveals that words can refer to categories at different levels of specificity. Modern logic distinguishes between class membership (a white horse IS a horse) and class identity (the class of white horses is NOT the same as the class of all horses).
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#step-btn').addEventListener('click', () => this.nextStep());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
    }

    nextStep() {
        this.currentStep++;

        if (this.currentStep <= 5) {
            this.$(`#step-${this.currentStep}`).classList.add('active');
            this.updateResult(this.currentStep);
        }

        if (this.currentStep === 3) {
            this.$('#white-horses-circle').style.transform = 'scale(1.1)';
            this.$('#white-horses-circle').style.boxShadow = '0 0 20px rgba(245, 158, 11, 0.5)';
        }

        if (this.currentStep === 5) {
            this.$('#horses-circle').style.marginRight = '30px';
            this.$('#white-horses-circle').style.marginLeft = '30px';
        }
    }

    updateResult(step) {
        const explanations = [
            'When we say "horse," we mean the abstract concept of horse-ness...',
            '"White" is a separate concept - a color property that can apply to many things...',
            '"White horse" combines two concepts into a more specific category...',
            'The concept "horse" (any color) differs from "white horse" (specific color)...',
            '<span style="color: var(--accent);"><strong>PARADOX!</strong></span> By this logic, "white horse" and "horse" are different concepts - so a white horse is "not a horse" in the sense of categorical identity!'
        ];
        this.$('#result').innerHTML = `<p>${explanations[step - 1]}</p>`;
    }

    reset() {
        this.currentStep = 0;
        for (let i = 1; i <= 5; i++) {
            this.$(`#step-${i}`).classList.remove('active');
        }
        this.$('#horses-circle').style.marginRight = '0';
        this.$('#white-horses-circle').style.marginLeft = '-50px';
        this.$('#white-horses-circle').style.transform = 'scale(1)';
        this.$('#white-horses-circle').style.boxShadow = 'none';
        this.$('#result').innerHTML = '<p>Click "Step Through Argument" to see Gongsun Long\'s reasoning.</p>';
    }
}

customElements.define('white-horse-simulator', WhiteHorseSimulator);

export { WhiteHorseSimulator };
