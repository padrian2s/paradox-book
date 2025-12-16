/**
 * Ellsberg Paradox Simulator
 * Demonstrates ambiguity aversion in decision-making
 */
import { SimulatorBase } from '../simulator-base.js';

class EllsbergSimulator extends SimulatorBase {
    constructor() {
        super();
        this.choices = { g1: null, g2: null };
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .ellsberg-viz {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .urn-container {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 1.5rem;
                }

                .urn {
                    width: 150px;
                    height: 180px;
                    background: linear-gradient(180deg, #374151, #1f2937);
                    border-radius: 0 0 50% 50%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    padding: 1rem;
                }

                .ball {
                    padding: 0.5rem 1rem;
                    border-radius: 2rem;
                    font-size: 0.875rem;
                    font-weight: bold;
                }

                .ball.red {
                    background: #ef4444;
                    color: white;
                }

                .ball.unknown {
                    background: linear-gradient(90deg, #1f2937, #fbbf24);
                    color: white;
                }

                .gamble-choices {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .gamble-set {
                    text-align: center;
                }

                .gamble-title {
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                }

                .gamble-set button {
                    margin: 0.25rem;
                }

                .gamble-set button.selected {
                    background: #22c55e !important;
                }

                .controls.reset-controls {
                    margin-top: 1rem;
                    justify-content: center;
                }

                @media (max-width: 600px) {
                    .gamble-set button {
                        display: block;
                        width: 100%;
                        margin: 0.25rem 0;
                    }
                }
            </style>

            <h4>The Urn Experiment</h4>
            <p style="margin-bottom: 1rem; color: var(--muted);">An urn has 90 balls: 30 red, and 60 that are either black or yellow (unknown ratio). You win $100 if you draw your chosen color.</p>

            <div class="ellsberg-viz">
                <div class="urn-container">
                    <div class="urn">
                        <div class="ball red">30</div>
                        <div class="ball unknown">60 (B or Y)</div>
                    </div>
                </div>

                <div class="gamble-choices">
                    <div class="gamble-set">
                        <div class="gamble-title">Gamble 1: Choose your bet</div>
                        <button id="g1-red">Bet on RED (30/90 = 33%)</button>
                        <button id="g1-black">Bet on BLACK (?/90 = ?%)</button>
                    </div>
                    <div class="gamble-set">
                        <div class="gamble-title">Gamble 2: Choose your bet</div>
                        <button id="g2-ry">Bet on RED or YELLOW</button>
                        <button id="g2-by">Bet on BLACK or YELLOW</button>
                    </div>
                </div>
            </div>

            <div class="controls reset-controls">
                <button id="reset-btn">Reset Choices</button>
            </div>

            <div class="result">
                <p id="ellsberg-result">Most people choose RED in Gamble 1 (known probability) but BLACK+YELLOW in Gamble 2. This is inconsistent! Can you see why?</p>
            </div>

            <div class="insight">
                If you prefer Red (Gamble 1), you should prefer Red+Yellow (Gamble 2). The inconsistency reveals we're not maximizing expected utility - we're avoiding ambiguity.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#g1-red').addEventListener('click', (e) => this.makeChoice(1, 'red', e.target));
        this.$('#g1-black').addEventListener('click', (e) => this.makeChoice(1, 'black', e.target));
        this.$('#g2-ry').addEventListener('click', (e) => this.makeChoice(2, 'red-yellow', e.target));
        this.$('#g2-by').addEventListener('click', (e) => this.makeChoice(2, 'black-yellow', e.target));
        this.$('#reset-btn').addEventListener('click', () => this.reset());
    }

    makeChoice(gamble, choice, button) {
        this.choices['g' + gamble] = choice;

        const gambleSet = button.parentElement;
        gambleSet.querySelectorAll('button').forEach(b => b.classList.remove('selected'));
        button.classList.add('selected');

        if (this.choices.g1 && this.choices.g2) {
            const inconsistent =
                (this.choices.g1 === 'red' && this.choices.g2 === 'black-yellow') ||
                (this.choices.g1 === 'black' && this.choices.g2 === 'red-yellow');

            if (inconsistent) {
                this.$('#ellsberg-result').innerHTML =
                    '<strong style="color: #f59e0b;">INCONSISTENCY DETECTED!</strong> Your choices violate expected utility theory. You\'re ambiguity-averse!';
            } else {
                this.$('#ellsberg-result').innerHTML =
                    '<strong style="color: #22c55e;">Consistent!</strong> Your choices follow expected utility. You\'re in the minority!';
            }

            this.dispatchSimulatorEvent('ellsberg-choice', {
                g1: this.choices.g1,
                g2: this.choices.g2,
                inconsistent
            });
        }
    }

    reset() {
        this.choices = { g1: null, g2: null };
        this.$$('.gamble-set button').forEach(b => b.classList.remove('selected'));
        this.$('#ellsberg-result').textContent =
            'Most people choose RED in Gamble 1 (known probability) but BLACK+YELLOW in Gamble 2. This is inconsistent! Can you see why?';
    }
}

customElements.define('ellsberg-simulator', EllsbergSimulator);

export { EllsbergSimulator };
