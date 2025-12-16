/**
 * St. Petersburg Paradox Simulator
 * Demonstrates a game with infinite expected value that no one would pay much to play
 */
import { SimulatorBase } from '../simulator-base.js';

class StPetersburgSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
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
                    margin-top: 0.25rem;
                }

                .history {
                    margin-top: 1rem;
                    max-height: 150px;
                    overflow-y: auto;
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                    background: var(--bg, #0f172a);
                    padding: 0.75rem;
                    border-radius: 0.5rem;
                }

                .history strong {
                    color: var(--text, #e2e8f0);
                }

                .profit-positive {
                    color: #22c55e;
                }

                .profit-negative {
                    color: #ef4444;
                }

                @media (max-width: 768px) {
                    .stats-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 0.5rem;
                    }

                    .stat-box {
                        padding: 0.75rem;
                    }

                    .stat-value {
                        font-size: 1.1rem;
                    }

                    .stat-label {
                        font-size: 0.65rem;
                    }

                    .history {
                        max-height: 120px;
                        font-size: 0.75rem;
                        padding: 0.5rem;
                    }
                }
            </style>

            <h4>St. Petersburg Casino</h4>

            <div class="controls">
                <div class="control-group">
                    <label>Entry Fee ($)</label>
                    <input type="number" id="fee" value="10" min="1" max="1000000">
                </div>
                <div class="control-group">
                    <label>Number of Games</label>
                    <input type="number" id="games" value="100" min="1" max="10000">
                </div>
                <button id="play-btn">Play Games</button>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="played">0</div>
                    <div class="stat-label">Games Played</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="spent">$0</div>
                    <div class="stat-label">Total Spent</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="won">$0</div>
                    <div class="stat-label">Total Won</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="profit">$0</div>
                    <div class="stat-label">Net Profit/Loss</div>
                </div>
            </div>

            <div class="history" id="history"></div>

            <div class="result">
                <p>Expected Value: <span class="result-value">INFINITE</span></p>
                <p>Mathematical EV = 1/2 x $2 + 1/4 x $4 + 1/8 x $8 + ... = $1 + $1 + $1 + ... = Infinity</p>
            </div>

            <div class="insight">
                Despite infinite expected value, most games pay small amounts. Big payoffs are exponentially rare. This is why expected value alone isn't a good decision criterion.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#play-btn').addEventListener('click', () => this.playGames());
    }

    playGames() {
        const fee = parseFloat(this.$('#fee').value) || 10;
        const numGames = parseInt(this.$('#games').value) || 100;

        let totalWon = 0;
        const totalSpent = fee * numGames;
        const history = [];

        for (let i = 0; i < numGames; i++) {
            let flips = 0;
            while (Math.random() < 0.5) {
                flips++;
            }
            const prize = Math.pow(2, flips + 1);
            totalWon += prize;
            if (flips >= 5 || i < 10) {
                history.push(`Game ${i + 1}: ${flips + 1} flips -> $${prize}`);
            }
        }

        this.$('#played').textContent = numGames;
        this.$('#spent').textContent = '$' + totalSpent.toLocaleString();
        this.$('#won').textContent = '$' + totalWon.toLocaleString();

        const profit = totalWon - totalSpent;
        const profitEl = this.$('#profit');
        profitEl.textContent = (profit >= 0 ? '+$' : '-$') + Math.abs(profit).toLocaleString();
        profitEl.className = 'stat-value ' + (profit >= 0 ? 'profit-positive' : 'profit-negative');

        this.$('#history').innerHTML =
            '<strong>Notable games:</strong><br>' + history.slice(-20).join('<br>');
    }
}

customElements.define('stpetersburg-simulator', StPetersburgSimulator);

export { StPetersburgSimulator };
