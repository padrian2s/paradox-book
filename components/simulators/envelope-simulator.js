/**
 * Two Envelopes Paradox Simulator
 * Demonstrates the switching paradox in probability
 */
import { SimulatorBase } from '../simulator-base.js';

class EnvelopeSimulator extends SimulatorBase {
    constructor() {
        super();
        this.state = { amounts: [0, 0], picked: null, phase: 'pick' };
        this.stats = { keepTotal: 0, switchTotal: 0, keepGames: 0, switchGames: 0 };
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
                    border: 3px solid transparent;
                }

                .envelope:hover:not(.disabled) {
                    transform: scale(1.05);
                }

                .envelope.selected {
                    border-color: #22c55e;
                    box-shadow: 0 0 15px rgba(34, 197, 94, 0.5);
                }

                .envelope.revealed .envelope-amount {
                    opacity: 1;
                }

                .envelope.disabled {
                    cursor: default;
                    opacity: 0.7;
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
                    font-size: 1.1rem;
                    color: var(--text, #e2e8f0);
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

                .choice-buttons button {
                    min-width: 100px;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1rem;
                    margin-top: 1.5rem;
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
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                .stat-avg {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }

                .action-buttons {
                    display: flex;
                    gap: 1rem;
                    margin-top: 1rem;
                    flex-wrap: wrap;
                }

                .explanation-box {
                    margin-top: 1.5rem;
                    padding: 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    border-left: 3px solid var(--accent, #f59e0b);
                }

                .explanation-title {
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                    margin-bottom: 0.5rem;
                }

                .explanation-text {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                    line-height: 1.5;
                }

                @media (max-width: 600px) {
                    .envelopes {
                        gap: 1rem;
                    }
                    .envelope {
                        width: 100px;
                        height: 70px;
                    }
                    .stats-grid {
                        grid-template-columns: repeat(3, 1fr);
                        gap: 0.5rem;
                    }
                    .stat-value {
                        font-size: 1.1rem;
                    }
                    .action-buttons {
                        flex-direction: column;
                    }
                    .action-buttons button {
                        width: 100%;
                    }
                }
            </style>

            <h4>Envelope Switching Game</h4>

            <div class="envelope-game">
                <div class="envelopes">
                    <div class="envelope" id="env-a" data-env="a">
                        <div class="envelope-front">A</div>
                        <div class="envelope-amount" id="env-a-amount">?</div>
                    </div>
                    <div class="envelope" id="env-b" data-env="b">
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
                    <div class="stat-avg" id="keep-avg"></div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="switch-total">$0</div>
                    <div class="stat-label">Switch Total</div>
                    <div class="stat-avg" id="switch-avg"></div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="games">0</div>
                    <div class="stat-label">Games Played</div>
                </div>
            </div>

            <div class="action-buttons controls">
                <button id="new-game-btn">New Game</button>
                <button id="auto-play-btn">Auto-Play 100</button>
                <button id="reset-stats-btn">Reset Stats</button>
            </div>

            <div class="explanation-box">
                <div class="explanation-title">The Fallacy</div>
                <div class="explanation-text" id="explanation">
                    You see $X. The other envelope has either $X/2 or $2X with equal probability.
                    Expected value of switching: 0.5($X/2) + 0.5($2X) = 1.25X. Always switch!
                    <br><br>
                    <strong>But wait...</strong> You can't use the SAME variable X for both "your envelope has X" AND for expected value calculations. The amounts are correlated!
                </div>
            </div>

            <div class="result">
                <p id="result">The paradox reveals how easily we can be fooled by probabilistic reasoning when we conflate different reference points.</p>
            </div>

            <div class="insight">
                Play many games and watch the averages. Keep and switch converge to the same expected value - there's no advantage to switching!
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#env-a').addEventListener('click', () => this.pickEnvelope('a'));
        this.$('#env-b').addEventListener('click', () => this.pickEnvelope('b'));
        this.$('#keep-btn').addEventListener('click', () => this.makeDecision('keep'));
        this.$('#switch-btn').addEventListener('click', () => this.makeDecision('switch'));
        this.$('#new-game-btn').addEventListener('click', () => this.resetGame());
        this.$('#auto-play-btn').addEventListener('click', () => this.autoPlay(100));
        this.$('#reset-stats-btn').addEventListener('click', () => this.resetStats());

        this.resetGame();
    }

    resetGame() {
        const base = Math.floor(Math.random() * 100) + 10;
        const doubled = base * 2;
        this.state.amounts = Math.random() < 0.5 ? [base, doubled] : [doubled, base];
        this.state.picked = null;
        this.state.phase = 'pick';

        this.$('#env-a').classList.remove('selected', 'revealed', 'disabled');
        this.$('#env-b').classList.remove('selected', 'revealed', 'disabled');
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

        this.$('#message').textContent = `You found $${amount}. The other has either $${amount/2} or $${amount*2}. Switch?`;
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
            this.stats.keepGames++;
        } else {
            this.stats.switchTotal += finalAmount;
            this.stats.switchGames++;
        }

        this.updateStats();

        const won = finalAmount > (decision === 'keep' ? otherAmount : pickedAmount);
        this.$('#message').textContent =
            `You ${decision === 'keep' ? 'kept' : 'switched'} and got $${finalAmount}. Other had $${decision === 'keep' ? otherAmount : pickedAmount}. ${won ? 'Good choice!' : 'Wrong choice!'}`;

        this.$('#choice-buttons').classList.remove('visible');
        this.$('#env-a').classList.add('disabled');
        this.$('#env-b').classList.add('disabled');
        this.state.phase = 'done';
    }

    autoPlay(n) {
        for (let i = 0; i < n; i++) {
            const base = Math.floor(Math.random() * 100) + 10;
            const amounts = Math.random() < 0.5 ? [base, base * 2] : [base * 2, base];
            const picked = Math.random() < 0.5 ? 0 : 1;

            if (Math.random() < 0.5) {
                this.stats.keepTotal += amounts[picked];
                this.stats.keepGames++;
            } else {
                this.stats.switchTotal += amounts[1 - picked];
                this.stats.switchGames++;
            }
        }
        this.updateStats();
        this.$('#message').textContent = `Auto-played ${n} games. Check the averages!`;
    }

    updateStats() {
        const totalGames = this.stats.keepGames + this.stats.switchGames;
        this.$('#keep-total').textContent = '$' + this.stats.keepTotal;
        this.$('#switch-total').textContent = '$' + this.stats.switchTotal;
        this.$('#games').textContent = totalGames;

        if (this.stats.keepGames > 0) {
            this.$('#keep-avg').textContent = `Avg: $${(this.stats.keepTotal / this.stats.keepGames).toFixed(0)} (${this.stats.keepGames} games)`;
        }
        if (this.stats.switchGames > 0) {
            this.$('#switch-avg').textContent = `Avg: $${(this.stats.switchTotal / this.stats.switchGames).toFixed(0)} (${this.stats.switchGames} games)`;
        }
    }

    resetStats() {
        this.stats = { keepTotal: 0, switchTotal: 0, keepGames: 0, switchGames: 0 };
        this.$('#keep-total').textContent = '$0';
        this.$('#switch-total').textContent = '$0';
        this.$('#games').textContent = '0';
        this.$('#keep-avg').textContent = '';
        this.$('#switch-avg').textContent = '';
        this.resetGame();
    }
}

customElements.define('envelope-simulator', EnvelopeSimulator);

export { EnvelopeSimulator };
