/**
 * Parrondo's Paradox Simulator
 * Demonstrates how two losing games can combine into a winning strategy
 */
import { SimulatorBase } from '../simulator-base.js';

class ParrondoSimulator extends SimulatorBase {
    constructor() {
        super();
        this.state = { capital: 100, rounds: 0, aNet: 0, bNet: 0, abNet: 0 };
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .parrondo-viz {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .game-display {
                    display: flex;
                    justify-content: center;
                    gap: 2rem;
                    margin-bottom: 1.5rem;
                }

                .game-card {
                    padding: 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    text-align: center;
                    min-width: 150px;
                }

                .game-title {
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                }

                .game-odds {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }

                .game-result {
                    font-size: 1.5rem;
                    margin-top: 0.5rem;
                    font-weight: bold;
                }

                .capital-display {
                    text-align: center;
                }

                .capital-label {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                    margin-bottom: 0.5rem;
                }

                .capital-value {
                    font-size: 2rem;
                    font-weight: bold;
                    color: var(--primary, #6366f1);
                }

                .capital-bar {
                    width: 100%;
                    height: 20px;
                    background: var(--card, #1e293b);
                    border-radius: 0.25rem;
                    overflow: hidden;
                    margin-top: 0.5rem;
                }

                .capital-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #ef4444, #f59e0b, #22c55e);
                    transition: width 0.3s;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
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
                    color: var(--primary, #6366f1);
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                @media (max-width: 600px) {
                    .game-display {
                        flex-direction: column;
                        gap: 1rem;
                    }
                    .game-card {
                        min-width: auto;
                    }
                }
            </style>

            <h4>Two Losing Games</h4>

            <div class="parrondo-viz">
                <div class="game-display">
                    <div class="game-card" id="game-a">
                        <div class="game-title">Game A (Coin Flip)</div>
                        <div class="game-odds">49% win chance</div>
                        <div class="game-result" id="game-a-result">-</div>
                    </div>
                    <div class="game-card" id="game-b">
                        <div class="game-title">Game B (Capital-based)</div>
                        <div class="game-odds">Varies by capital</div>
                        <div class="game-result" id="game-b-result">-</div>
                    </div>
                </div>
                <div class="capital-display">
                    <div class="capital-label">Your Capital</div>
                    <div class="capital-value" id="parrondo-capital">$100</div>
                    <div class="capital-bar">
                        <div class="capital-fill" id="capital-fill" style="width: 50%"></div>
                    </div>
                </div>
            </div>

            <div class="controls" style="margin-top: 1rem;">
                <button id="play-a-btn">Play Game A Only</button>
                <button id="play-b-btn">Play Game B Only</button>
                <button id="play-ab-btn">Alternate A-B</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="parrondo-rounds">0</div>
                    <div class="stat-label">Rounds</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="parrondo-a-net">$0</div>
                    <div class="stat-label">Game A Net</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="parrondo-b-net">$0</div>
                    <div class="stat-label">Game B Net</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="parrondo-ab-net">$0</div>
                    <div class="stat-label">A+B Net</div>
                </div>
            </div>

            <div class="result">
                <p id="parrondo-result">Play each strategy 100 times to see the paradox emerge...</p>
            </div>

            <div class="insight">
                Game A: slightly losing coin flip. Game B: lose if capital divisible by 3, else good odds. Alternating breaks the pattern that makes B lose!
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#play-a-btn').addEventListener('click', () => this.play('A'));
        this.$('#play-b-btn').addEventListener('click', () => this.play('B'));
        this.$('#play-ab-btn').addEventListener('click', () => this.play('AB'));
        this.$('#reset-btn').addEventListener('click', () => this.reset());
    }

    play(strategy) {
        const rounds = 100;
        let capital = 100;

        for (let i = 0; i < rounds; i++) {
            this.state.rounds++;
            let win = false;

            if (strategy === 'A' || (strategy === 'AB' && i % 2 === 0)) {
                win = Math.random() < 0.49;
                this.$('#game-a-result').textContent = win ? '\u2713' : '\u2717';
            } else {
                const winChance = capital % 3 === 0 ? 0.1 : 0.74;
                win = Math.random() < winChance;
                this.$('#game-b-result').textContent = win ? '\u2713' : '\u2717';
            }

            capital += win ? 1 : -1;
        }

        const net = capital - 100;
        if (strategy === 'A') this.state.aNet += net;
        else if (strategy === 'B') this.state.bNet += net;
        else this.state.abNet += net;

        this.state.capital = capital;
        this.updateDisplay();

        if (this.state.aNet < 0 && this.state.bNet < 0 && this.state.abNet > 0) {
            this.$('#parrondo-result').innerHTML =
                '<strong style="color: #22c55e;">PARADOX CONFIRMED!</strong> Games A and B both lose money, but alternating them wins!';
        }

        this.dispatchSimulatorEvent('parrondo-played', {
            strategy,
            net,
            state: this.state
        });
    }

    updateDisplay() {
        this.$('#parrondo-capital').textContent = '$' + this.state.capital;
        this.$('#capital-fill').style.width = Math.min(100, this.state.capital / 2) + '%';
        this.$('#parrondo-rounds').textContent = this.state.rounds;
        this.$('#parrondo-a-net').textContent = (this.state.aNet >= 0 ? '+' : '') + '$' + this.state.aNet;
        this.$('#parrondo-b-net').textContent = (this.state.bNet >= 0 ? '+' : '') + '$' + this.state.bNet;
        this.$('#parrondo-ab-net').textContent = (this.state.abNet >= 0 ? '+' : '') + '$' + this.state.abNet;
    }

    reset() {
        this.state = { capital: 100, rounds: 0, aNet: 0, bNet: 0, abNet: 0 };
        this.updateDisplay();
        this.$('#game-a-result').textContent = '-';
        this.$('#game-b-result').textContent = '-';
        this.$('#parrondo-result').textContent = 'Play each strategy 100 times to see the paradox emerge...';
    }
}

customElements.define('parrondo-simulator', ParrondoSimulator);

export { ParrondoSimulator };
