/**
 * Dollar Auction Paradox Simulator
 * Demonstrates sunk cost fallacy and escalation of commitment
 */
import { SimulatorBase } from '../simulator-base.js';

class DollarAuctionSimulator extends SimulatorBase {
    constructor() {
        super();
        this.state = { yourBid: 0, oppBid: 0, round: 0, active: true, games: 0, totalProfit: 0 };
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .dollar-auction-viz {
                    padding: 2rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                    text-align: center;
                }

                .auction-prize {
                    margin-bottom: 1.5rem;
                }

                .prize-amount {
                    font-size: 3rem;
                    font-weight: bold;
                    color: #22c55e;
                }

                .prize-label {
                    color: var(--muted, #94a3b8);
                }

                .bidders {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 2rem;
                }

                .bidder {
                    padding: 1.5rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    min-width: 120px;
                }

                .bidder.you {
                    border: 2px solid #3b82f6;
                }

                .bidder.opponent {
                    border: 2px solid #ef4444;
                }

                .bidder-label {
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                }

                .bidder-bid {
                    font-size: 1.5rem;
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                }

                .vs-auction {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--muted, #94a3b8);
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

                .bidder button {
                    padding: 0.5rem 1rem;
                    font-size: 0.875rem;
                }

                .bidder button:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                @media (max-width: 600px) {
                    .bidders {
                        flex-direction: column;
                        gap: 1rem;
                    }
                    .vs-auction {
                        transform: rotate(90deg);
                    }
                    .prize-amount {
                        font-size: 2rem;
                    }
                }
            </style>

            <h4>Dollar Auction Game</h4>
            <p style="margin-bottom: 1rem; color: var(--muted);">You're bidding against an AI for a $100 prize. Both bidders pay their final bid, but only the winner gets the prize.</p>

            <div class="dollar-auction-viz">
                <div class="auction-prize">
                    <div class="prize-amount">$100</div>
                    <div class="prize-label">Prize</div>
                </div>
                <div class="bidders">
                    <div class="bidder you">
                        <div class="bidder-label">You</div>
                        <div class="bidder-bid" id="your-bid">$0</div>
                        <button id="bid-btn">Bid +$5</button>
                    </div>
                    <div class="vs-auction">VS</div>
                    <div class="bidder opponent">
                        <div class="bidder-label">Opponent</div>
                        <div class="bidder-bid" id="opponent-bid">$0</div>
                    </div>
                </div>
            </div>

            <div class="controls" style="margin-top: 1rem;">
                <button id="fold-btn">Fold (Stop Bidding)</button>
                <button id="reset-btn">New Auction</button>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="auction-round">0</div>
                    <div class="stat-label">Round</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="your-profit">$0</div>
                    <div class="stat-label">Your Profit/Loss</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="total-paid">$0</div>
                    <div class="stat-label">Total Paid (Both)</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="auction-games">0</div>
                    <div class="stat-label">Games Played</div>
                </div>
            </div>

            <div class="result">
                <p id="auction-result">Start bidding! Remember: you pay your bid even if you lose.</p>
            </div>

            <div class="insight">
                This demonstrates sunk cost fallacy and escalation of commitment. The rational choice is often not to play, but once committed, stopping means losing everything you've already bid.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#bid-btn').addEventListener('click', () => this.placeBid());
        this.$('#fold-btn').addEventListener('click', () => this.fold());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
    }

    placeBid() {
        if (!this.state.active) return;

        this.state.yourBid += 5;
        this.state.round++;
        this.$('#your-bid').textContent = '$' + this.state.yourBid;
        this.$('#auction-round').textContent = this.state.round;

        setTimeout(() => {
            if (this.state.oppBid < this.state.yourBid && this.state.active) {
                const continueChance = Math.min(0.9, 0.5 + this.state.oppBid / 200);
                if (Math.random() < continueChance && this.state.oppBid < 150) {
                    this.state.oppBid = this.state.yourBid + 5;
                    this.$('#opponent-bid').textContent = '$' + this.state.oppBid;
                    this.$('#auction-result').textContent =
                        `Opponent bids $${this.state.oppBid}. Total paid so far: $${this.state.yourBid + this.state.oppBid}. Keep going?`;
                } else {
                    this.endAuction('you');
                }
            }
            this.updateStats();
        }, 500);
    }

    fold() {
        if (!this.state.active) return;
        this.endAuction('opponent');
    }

    endAuction(winner) {
        this.state.active = false;
        this.state.games++;

        let profit = 0;

        if (winner === 'you') {
            profit = 100 - this.state.yourBid;
            this.$('#auction-result').innerHTML =
                `<span style="color: #22c55e;">YOU WIN!</span> Prize: $100. You paid: $${this.state.yourBid}. Opponent paid: $${this.state.oppBid}. Net profit: $${profit}`;
        } else {
            profit = -this.state.yourBid;
            this.$('#auction-result').innerHTML =
                `<span style="color: #ef4444;">YOU LOSE!</span> You paid $${this.state.yourBid} and got nothing. Opponent paid $${this.state.oppBid} for a $100 prize.`;
        }

        this.state.totalProfit += profit;
        this.$('#your-profit').textContent = (this.state.totalProfit >= 0 ? '+$' : '-$') + Math.abs(this.state.totalProfit);
        this.$('#auction-games').textContent = this.state.games;
        this.$('#bid-btn').disabled = true;

        this.dispatchSimulatorEvent('auction-ended', {
            winner,
            profit,
            totalProfit: this.state.totalProfit,
            games: this.state.games
        });
    }

    updateStats() {
        this.$('#total-paid').textContent = '$' + (this.state.yourBid + this.state.oppBid);
    }

    reset() {
        this.state.yourBid = 0;
        this.state.oppBid = 0;
        this.state.round = 0;
        this.state.active = true;
        this.$('#your-bid').textContent = '$0';
        this.$('#opponent-bid').textContent = '$0';
        this.$('#auction-round').textContent = '0';
        this.$('#total-paid').textContent = '$0';
        this.$('#auction-result').textContent = 'Start bidding! Remember: you pay your bid even if you lose.';
        this.$('#bid-btn').disabled = false;
    }
}

customElements.define('dollar-auction-simulator', DollarAuctionSimulator);

export { DollarAuctionSimulator };
