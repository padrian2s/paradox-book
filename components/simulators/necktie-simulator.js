/**
 * Necktie Paradox Simulator
 * Demonstrates the game theory paradox where both players think they have an advantage
 */
import { SimulatorBase } from '../simulator-base.js';

class NecktieSimulator extends SimulatorBase {
    constructor() {
        super();
        this.stats = { wins: 0, losses: 0, net: 0, games: 0 };
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .necktie-game {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .neckties {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 2rem;
                }

                .necktie-player {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .necktie {
                    font-size: 3rem;
                    width: 80px;
                    height: 80px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 0.5rem;
                }

                .tie-label {
                    margin-top: 0.5rem;
                    font-weight: bold;
                }

                .tie-value {
                    font-size: 1.25rem;
                    color: var(--primary, #6366f1);
                    font-weight: bold;
                }

                .vs {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--muted, #94a3b8);
                }

                .necktie-player.winner .necktie {
                    box-shadow: 0 0 20px #22c55e;
                }

                .necktie-player.loser .necktie {
                    opacity: 0.5;
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
                    color: var(--accent, #f59e0b);
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }

                @media (max-width: 768px) {
                    .stats-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 0.5rem;
                    }
                    .stat-box {
                        padding: 0.5rem;
                    }
                    .stat-value {
                        font-size: 1.1rem;
                    }
                    .stat-label {
                        font-size: 0.65rem;
                    }
                    .neckties {
                        gap: 1rem;
                    }
                    .necktie {
                        width: 60px;
                        height: 60px;
                        font-size: 2rem;
                    }
                }
            </style>

            <h4>Necktie Betting Game</h4>

            <div class="necktie-game">
                <div class="neckties">
                    <div class="necktie-player" id="tie-player">
                        <div class="necktie" style="background: linear-gradient(135deg, #3b82f6, #1d4ed8);">👔</div>
                        <div class="tie-label">Your Tie</div>
                        <div class="tie-value" id="your-tie-value">?</div>
                    </div>
                    <div class="vs">VS</div>
                    <div class="necktie-player" id="tie-opponent">
                        <div class="necktie" style="background: linear-gradient(135deg, #ef4444, #b91c1c);">👔</div>
                        <div class="tie-label">Opponent's Tie</div>
                        <div class="tie-value" id="opp-tie-value">?</div>
                    </div>
                </div>
                <p id="necktie-message" style="text-align: center; margin-top: 1rem;">Click "Play Round" to bet your ties!</p>
            </div>

            <div class="controls" style="margin-top: 1rem;">
                <button id="btn-play">Play Round</button>
                <button id="btn-auto">Auto-Play 100</button>
                <button id="btn-reset">Reset Stats</button>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="tie-wins">0</div>
                    <div class="stat-label">Your Wins</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="tie-losses">0</div>
                    <div class="stat-label">Your Losses</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="tie-net">$0</div>
                    <div class="stat-label">Net Value</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="tie-games">0</div>
                    <div class="stat-label">Games</div>
                </div>
            </div>

            <div class="result">
                <p id="necktie-explanation">Each player's reasoning: "If I have the cheaper tie, I win the expensive one. If I have the expensive one, I only lose it." But both can't have an advantage!</p>
            </div>

            <div class="insight">
                Like the Two Envelopes paradox, the fallacy is in the asymmetric reasoning. In reality, each has a 50% chance to win or lose, with equal expected value.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#btn-play').addEventListener('click', () => this.playNecktie());
        this.$('#btn-auto').addEventListener('click', () => this.autoNecktie(100));
        this.$('#btn-reset').addEventListener('click', () => this.resetNecktie());
    }

    playNecktie() {
        const yourTie = Math.floor(Math.random() * 100) + 20;
        const oppTie = Math.floor(Math.random() * 100) + 20;

        this.$('#your-tie-value').textContent = '$' + yourTie;
        this.$('#opp-tie-value').textContent = '$' + oppTie;

        const playerEl = this.$('#tie-player');
        const oppEl = this.$('#tie-opponent');
        playerEl.classList.remove('winner', 'loser');
        oppEl.classList.remove('winner', 'loser');

        this.stats.games++;

        if (yourTie < oppTie) {
            this.stats.wins++;
            this.stats.net += oppTie;
            playerEl.classList.add('winner');
            oppEl.classList.add('loser');
            this.$('#necktie-message').textContent = `You win! Your $${yourTie} tie was cheaper. You get both ties worth $${yourTie + oppTie}!`;
        } else if (yourTie > oppTie) {
            this.stats.losses++;
            this.stats.net -= yourTie;
            playerEl.classList.add('loser');
            oppEl.classList.add('winner');
            this.$('#necktie-message').textContent = `You lose! Your $${yourTie} tie was more expensive. You lose it!`;
        } else {
            this.$('#necktie-message').textContent = `It's a tie! Both neckties are worth $${yourTie}. No exchange.`;
        }

        this.updateTieStats();
    }

    autoNecktie(n) {
        for (let i = 0; i < n; i++) {
            const yourTie = Math.floor(Math.random() * 100) + 20;
            const oppTie = Math.floor(Math.random() * 100) + 20;
            this.stats.games++;
            if (yourTie < oppTie) {
                this.stats.wins++;
                this.stats.net += oppTie;
            } else if (yourTie > oppTie) {
                this.stats.losses++;
                this.stats.net -= yourTie;
            }
        }
        this.updateTieStats();
        this.$('#necktie-message').textContent = `Played ${n} rounds automatically. Check the stats!`;
    }

    updateTieStats() {
        this.$('#tie-wins').textContent = this.stats.wins;
        this.$('#tie-losses').textContent = this.stats.losses;
        this.$('#tie-net').textContent = (this.stats.net >= 0 ? '+$' : '-$') + Math.abs(this.stats.net);
        this.$('#tie-games').textContent = this.stats.games;
    }

    resetNecktie() {
        this.stats = { wins: 0, losses: 0, net: 0, games: 0 };
        this.updateTieStats();
        this.$('#your-tie-value').textContent = '?';
        this.$('#opp-tie-value').textContent = '?';
        this.$('#necktie-message').textContent = 'Click "Play Round" to bet your ties!';
        this.$('#tie-player').classList.remove('winner', 'loser');
        this.$('#tie-opponent').classList.remove('winner', 'loser');
    }
}

customElements.define('necktie-simulator', NecktieSimulator);

export { NecktieSimulator };
