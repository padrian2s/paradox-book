/**
 * Allais Paradox Simulator
 * Human choices in gambles systematically violate expected utility theory
 */
import { SimulatorBase } from '../simulator-base.js';

class AllaisSimulator extends SimulatorBase {
    constructor() {
        super();
        this.choice1 = null;
        this.choice2 = null;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .choice-section {
                    margin-top: 1rem;
                }

                .choice-label {
                    color: var(--muted, #94a3b8);
                    margin-bottom: 0.5rem;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .stat-box {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .stat-value {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                }

                .stat-label {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                }

                button.selected {
                    background: var(--accent, #f59e0b);
                }

                @media (max-width: 600px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }
                    .controls {
                        flex-direction: column;
                    }
                }
            </style>

            <h4>Gamble Choice</h4>

            <div class="choice-section">
                <p class="choice-label">Choice 1:</p>
                <div class="controls">
                    <button id="choice-a">A: 100% chance of $1M</button>
                    <button id="choice-b">B: 89% $1M, 10% $5M, 1% $0</button>
                </div>
            </div>

            <div class="choice-section">
                <p class="choice-label">Choice 2:</p>
                <div class="controls">
                    <button id="choice-c">C: 11% chance of $1M</button>
                    <button id="choice-d">D: 10% chance of $5M</button>
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="c1">-</div>
                    <div class="stat-label">Choice 1</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="c2">-</div>
                    <div class="stat-label">Choice 2</div>
                </div>
            </div>

            <div class="result" id="result">
                <p>Make both choices to see if you're rational...</p>
            </div>

            <div class="insight">
                The "certainty effect" - we overweight guaranteed outcomes vs probabilistic ones of equal expected value. Most people choose A (certainty) and D (higher EV), but this is mathematically inconsistent!
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#choice-a').addEventListener('click', () => this.setChoice(1, 'A'));
        this.$('#choice-b').addEventListener('click', () => this.setChoice(1, 'B'));
        this.$('#choice-c').addEventListener('click', () => this.setChoice(2, 'C'));
        this.$('#choice-d').addEventListener('click', () => this.setChoice(2, 'D'));
    }

    setChoice(choiceNum, option) {
        if (choiceNum === 1) {
            this.choice1 = option;
            this.$('#choice-a').classList.toggle('selected', option === 'A');
            this.$('#choice-b').classList.toggle('selected', option === 'B');
            this.$('#c1').textContent = option;
        } else {
            this.choice2 = option;
            this.$('#choice-c').classList.toggle('selected', option === 'C');
            this.$('#choice-d').classList.toggle('selected', option === 'D');
            this.$('#c2').textContent = option;
        }

        this.checkParadox();
    }

    checkParadox() {
        if (!this.choice1 || !this.choice2) {
            this.$('#result').innerHTML = '<p>Make both choices to see if you\'re rational...</p>';
            return;
        }

        const consistent1 = (this.choice1 === 'A' && this.choice2 === 'C');
        const consistent2 = (this.choice1 === 'B' && this.choice2 === 'D');
        const isConsistent = consistent1 || consistent2;

        if (this.choice1 === 'A' && this.choice2 === 'D') {
            this.$('#result').innerHTML = `
                <p style="color: var(--accent);"><strong>ALLAIS PARADOX DETECTED!</strong></p>
                <p>You chose A (certainty of $1M) and D (higher expected value).</p>
                <p>This is the most common choice - but it's inconsistent!</p>
                <p>Mathematically: A→C and B→D are the only consistent pairs.</p>
                <p>Your choices reveal you value certainty MORE than expected value suggests.</p>
            `;
        } else if (this.choice1 === 'B' && this.choice2 === 'C') {
            this.$('#result').innerHTML = `
                <p style="color: var(--accent);"><strong>REVERSE ALLAIS!</strong></p>
                <p>Unusual: You chose the risky option (B) but then the safer one (C).</p>
                <p>This is also inconsistent with expected utility theory.</p>
            `;
        } else if (isConsistent) {
            this.$('#result').innerHTML = `
                <p style="color: #22c55e;"><strong>CONSISTENT CHOICES!</strong></p>
                <p>You chose ${this.choice1} and ${this.choice2}.</p>
                <p>Your choices are mathematically consistent with expected utility theory.</p>
                <p>You're in the minority - most people fall for the Allais paradox!</p>
            `;
        }
    }
}

customElements.define('allais-simulator', AllaisSimulator);

export { AllaisSimulator };
