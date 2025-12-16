/**
 * Two Envelopes Paradox Simulator
 * Demonstrates the paradoxical reasoning about switching envelopes
 */
import { SimulatorBase } from '../simulator-base.js';

class TwoEnvelopesSimulator extends SimulatorBase {
    constructor() {
        super();
        this.state = { amounts: [0, 0], picked: null, phase: 'pick' };
        this.stats = { keepTotal: 0, switchTotal: 0, games: 0 };
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .envelope-game {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .envelopes {
                    display: flex;
                    justify-content: center;
                    gap: 2rem;
                }

                .envelope {
                    width: 120px;
                    height: 80px;
                    background: linear-gradient(135deg, #f59e0b, #d97706);
                    border-radius: 0.5rem;
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s;
                    position: relative;
                }

                .envelope:hover {
                    transform: scale(1.05);
                }

                .envelope.selected {
                    border: 3px solid #22c55e;
                }

                .envelope.revealed .envelope-amount {
                    opacity: 1;
                }

                .envelope-front {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: white;
                }

                .envelope-amount {
                    font-size: 1.25rem;
                    font-weight: bold;
                    color: white;
                    opacity: 0;
                    transition: opacity 0.3s;
                }

                .message {
                    text-align: center;
                    margin-top: 1rem;
                    min-height: 1.5em;
                }

                .choice-buttons {
                    display: none;
                    text-align: center;
                    margin-top: 1rem;
                    gap: 1rem;
                    justify-content: center;
                }

                .choice-buttons.visible {
                    display: flex;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .stat-box {
                    text-align: center;
                    padding: 0.75rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                }

                .stat-value {
                    font-size: 1.25rem;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }

                @media (max-width: 768px) {
                    .envelopes {
                        gap: 1rem;
                    }

                    .envelope {
                        width: 100px;
                        height: 70px;
                    }

                    .envelope-front {
                        font-size: 1.25rem;
                    }

                    .envelope-amount {
                        font-size: 1rem;
                    }

                    .stats-grid {
                        grid-template-columns: repeat(3, 1fr);
                        gap: 0.5rem;
                    }

                    .stat-box {
                        padding: 0.5rem;
                    }

                    .stat-value {
                        font-size: 1rem;
                    }

                    .stat-label {
                        font-size: 0.6rem;
                    }
                }
            </style>

            <h4>Envelope Switching Game</h4>

            <div class="envelope-game">
                <div class="envelopes">
                    <div class="envelope" id="env-a">
                        <div class="envelope-front">A</div>
                        <div class="envelope-amount" id="env-a-amount">?</div>
                    </div>
                    <div class="envelope" id="env-b">
                        <div class="envelope-front">B</div>
                        <div class="envelope-amount" id="env-b-amount">?</div>
                    </div>
                </div>
                <p class="message" id="message">Pick an envelope!</p>
                <div class="choice-buttons" id="choice-buttons">
                    <button id="keep-btn">Keep</button>
                    <button id="switch-btn">Switch</button>
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="keep-total">$0</div>
                    <div class="stat-label">Keep Total</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="switch-total">$0</div>
                    <div class="stat-label">Switch Total</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="games">0</div>
                    <div class="stat-label">Games Played</div>
                </div>
            </div>

            <div class="controls" style="margin-top: 1rem;">
                <button id="reset-btn">New Game</button>
                <button id="auto-btn">Auto-Play 100</button>
            </div>

            <div class="result">
                <p id="paradox-explanation">The fallacy: You can't use the SAME variable X for both "your envelope has X" AND for expected value calculations. The amounts are correlated!</p>
            </div>

            <div class="insight">
                The paradox reveals how easily we can be fooled by probabilistic reasoning when we conflate different reference points.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#env-a').addEventListener('click', () => this.pickEnvelope('a'));
        this.$('#env-b').addEventListener('click', () => this.pickEnvelope('b'));
        this.$('#keep-btn').addEventListener('click', () => this.makeDecision('keep'));
        this.$('#switch-btn').addEventListener('click', () => this.makeDecision('switch'));
        this.$('#reset-btn').addEventListener('click', () => this.reset());
        this.$('#auto-btn').addEventListener('click', () => this.autoPlay(100));

        this.reset();
    }

    reset() {
        const base = Math.floor(Math.random() * 100) + 10;
        const doubled = base * 2;
        this.state.amounts = Math.random() < 0.5 ? [base, doubled] : [doubled, base];
        this.state.picked = null;
        this.state.phase = 'pick';

        this.$('#env-a').classList.remove('selected', 'revealed');
        this.$('#env-b').classList.remove('selected', 'revealed');
        this.$('#env-a-amount').textContent = '?';
        this.$('#env-b-amount').textContent = '?';
        this.$('#message').textContent = 'Pick an envelope!';
        this.$('#choice-buttons').classList.remove('visible');
    }

    pickEnvelope(choice) {
        if (this.state.phase !== 'pick') return;
        this.state.picked = choice;
        this.state.phase = 'decide';

        const pickedEnv = this.$(`#env-${choice}`);
        pickedEnv.classList.add('selected');

        const amount = choice === 'a' ? this.state.amounts[0] : this.state.amounts[1];
        this.$(`#env-${choice}-amount`).textContent = '$' + amount;
        pickedEnv.classList.add('revealed');

        this.$('#message').textContent = `You found $${amount}. The other has either $${amount / 2} or $${amount * 2}. Switch?`;
        this.$('#choice-buttons').classList.add('visible');
    }

    makeDecision(decision) {
        if (this.state.phase !== 'decide') return;

        const otherEnv = this.state.picked === 'a' ? 'b' : 'a';
        this.$(`#env-${otherEnv}`).classList.add('revealed');
        this.$('#env-a-amount').textContent = '$' + this.state.amounts[0];
        this.$('#env-b-amount').textContent = '$' + this.state.amounts[1];

        const pickedAmount = this.state.picked === 'a' ? this.state.amounts[0] : this.state.amounts[1];
        const otherAmount = this.state.picked === 'a' ? this.state.amounts[1] : this.state.amounts[0];
        const finalAmount = decision === 'keep' ? pickedAmount : otherAmount;

        if (decision === 'keep') {
            this.stats.keepTotal += finalAmount;
        } else {
            this.stats.switchTotal += finalAmount;
        }
        this.stats.games++;

        this.$('#keep-total').textContent = '$' + this.stats.keepTotal;
        this.$('#switch-total').textContent = '$' + this.stats.switchTotal;
        this.$('#games').textContent = this.stats.games;

        const won = finalAmount > (decision === 'keep' ? otherAmount : pickedAmount);
        this.$('#message').textContent =
            `You ${decision === 'keep' ? 'kept' : 'switched'} and got $${finalAmount}. Other had $${decision === 'keep' ? otherAmount : pickedAmount}. ${won ? 'Good choice!' : 'Wrong choice!'}`;
        this.$('#choice-buttons').classList.remove('visible');
        this.state.phase = 'done';
    }

    autoPlay(n) {
        for (let i = 0; i < n; i++) {
            const base = Math.floor(Math.random() * 100) + 10;
            const amounts = Math.random() < 0.5 ? [base, base * 2] : [base * 2, base];
            const picked = Math.random() < 0.5 ? 0 : 1;

            // Randomly keep or switch
            if (Math.random() < 0.5) {
                this.stats.keepTotal += amounts[picked];
            } else {
                this.stats.switchTotal += amounts[1 - picked];
            }
            this.stats.games++;
        }

        this.$('#keep-total').textContent = '$' + this.stats.keepTotal;
        this.$('#switch-total').textContent = '$' + this.stats.switchTotal;
        this.$('#games').textContent = this.stats.games;

        this.$('#message').textContent = `Auto-played ${n} games. Keep and Switch averages tend to be equal!`;
    }
}

customElements.define('two-envelopes-simulator', TwoEnvelopesSimulator);

export { TwoEnvelopesSimulator };
