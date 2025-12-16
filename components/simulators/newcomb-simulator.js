/**
 * Newcomb's Paradox Simulator
 * Demonstrates the conflict between causal and evidential decision theory
 */
import { SimulatorBase } from '../simulator-base.js';

class NewcombSimulator extends SimulatorBase {
    constructor() {
        super();
        this.stats = { games: 0, oneBoxTotal: 0, oneBoxGames: 0, bothBoxTotal: 0, bothBoxGames: 0 };
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .newcomb-viz {
                    padding: 2rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                    text-align: center;
                }

                .newcomb-boxes {
                    display: flex;
                    justify-content: center;
                    gap: 2rem;
                    margin-bottom: 1.5rem;
                }

                .newcomb-box {
                    width: 140px;
                    height: 140px;
                    border-radius: 0.5rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s;
                }

                .newcomb-box.transparent {
                    background: rgba(59, 130, 246, 0.2);
                    border: 3px solid #3b82f6;
                }

                .newcomb-box.opaque {
                    background: #1e293b;
                    border: 3px solid #64748b;
                }

                .newcomb-box.selected {
                    transform: scale(1.1);
                    box-shadow: 0 0 20px rgba(34, 197, 94, 0.5);
                }

                .newcomb-box.revealed {
                    background: rgba(34, 197, 94, 0.2);
                    border-color: #22c55e;
                }

                .box-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-bottom: 0.5rem;
                }

                .box-content {
                    font-size: 1.5rem;
                    font-weight: bold;
                }

                .predictor {
                    margin-top: 1rem;
                }

                .predictor-icon {
                    font-size: 2rem;
                }

                .predictor-text {
                    font-size: 0.875rem;
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

                @media (max-width: 600px) {
                    .newcomb-boxes {
                        gap: 1rem;
                    }
                    .newcomb-box {
                        width: 110px;
                        height: 110px;
                    }
                    .box-content {
                        font-size: 1.25rem;
                    }
                }
            </style>

            <h4>The Predictor's Game</h4>
            <p style="margin-bottom: 1rem; color: var(--muted);">The predictor is 90% accurate. They've already made their prediction and filled the boxes.</p>

            <div class="newcomb-viz">
                <div class="newcomb-boxes">
                    <div class="newcomb-box transparent" id="box-a">
                        <div class="box-label">Box A (Transparent)</div>
                        <div class="box-content">$1,000</div>
                    </div>
                    <div class="newcomb-box opaque" id="box-b">
                        <div class="box-label">Box B (Opaque)</div>
                        <div class="box-content">???</div>
                    </div>
                </div>
                <div class="predictor">
                    <div class="predictor-icon">&#128302;</div>
                    <div class="predictor-text" id="predictor-thought">The predictor is watching...</div>
                </div>
            </div>

            <div class="controls" style="margin-top: 1rem;">
                <button id="one-box-btn">Take Only Box B</button>
                <button id="both-box-btn">Take Both Boxes</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="newcomb-games">0</div>
                    <div class="stat-label">Games Played</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="newcomb-one-avg">$0</div>
                    <div class="stat-label">Avg (One Box)</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="newcomb-both-avg">$0</div>
                    <div class="stat-label">Avg (Both)</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="newcomb-total">$0</div>
                    <div class="stat-label">Total Winnings</div>
                </div>
            </div>

            <div class="result">
                <p id="newcomb-result">Two schools of thought: "one-boxers" (take only B, trust the predictor) vs "two-boxers" (take both, the money is already there).</p>
            </div>

            <div class="insight">
                Causal decision theory says take both (the prediction is already made). Evidential decision theory says take one (your choice is evidence of the prediction).
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#one-box-btn').addEventListener('click', () => this.makeChoice('one'));
        this.$('#both-box-btn').addEventListener('click', () => this.makeChoice('both'));
        this.$('#reset-btn').addEventListener('click', () => this.reset());
    }

    makeChoice(choice) {
        this.stats.games++;
        const predictorAccuracy = 0.9;
        let winnings = 0;
        let boxBContent = 0;

        if (choice === 'one') {
            boxBContent = Math.random() < predictorAccuracy ? 1000000 : 0;
            winnings = boxBContent;
            this.stats.oneBoxTotal += winnings;
            this.stats.oneBoxGames++;
        } else {
            boxBContent = Math.random() < predictorAccuracy ? 0 : 1000000;
            winnings = 1000 + boxBContent;
            this.stats.bothBoxTotal += winnings;
            this.stats.bothBoxGames++;
        }

        this.$('#box-b').querySelector('.box-content').textContent =
            boxBContent === 1000000 ? '$1,000,000' : '$0';
        this.$('#box-b').classList.add('revealed');

        if (choice === 'one') {
            this.$('#box-b').classList.add('selected');
        } else {
            this.$('#box-a').classList.add('selected');
            this.$('#box-b').classList.add('selected');
        }

        this.$('#predictor-thought').textContent =
            `The predictor ${boxBContent > 0 ? 'predicted one-box' : 'predicted two-box'}. You won $${winnings.toLocaleString()}!`;

        this.updateStats();

        this.dispatchSimulatorEvent('newcomb-choice', {
            choice,
            winnings,
            boxBContent,
            stats: this.stats
        });
    }

    updateStats() {
        this.$('#newcomb-games').textContent = this.stats.games;
        this.$('#newcomb-one-avg').textContent =
            this.stats.oneBoxGames > 0 ? '$' + Math.round(this.stats.oneBoxTotal / this.stats.oneBoxGames).toLocaleString() : '$0';
        this.$('#newcomb-both-avg').textContent =
            this.stats.bothBoxGames > 0 ? '$' + Math.round(this.stats.bothBoxTotal / this.stats.bothBoxGames).toLocaleString() : '$0';
        this.$('#newcomb-total').textContent =
            '$' + (this.stats.oneBoxTotal + this.stats.bothBoxTotal).toLocaleString();
    }

    reset() {
        this.$('#box-b').querySelector('.box-content').textContent = '???';
        this.$('#box-b').classList.remove('revealed', 'selected');
        this.$('#box-a').classList.remove('selected');
        this.$('#predictor-thought').textContent = 'The predictor is watching...';
    }
}

customElements.define('newcomb-simulator', NewcombSimulator);

export { NewcombSimulator };
