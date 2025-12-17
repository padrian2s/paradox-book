import { SimulatorBase } from '../simulator-base.js';

class NoShowSimulator extends SimulatorBase {
    constructor() {
        super();
        this.state = {
            scenario: 'initial',
            votes: { A: 0, B: 0, C: 0 }
        };
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .scenario-box {
                    background: var(--bg, #0f172a);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .voter-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                    gap: 0.5rem;
                    margin: 1rem 0;
                }

                .voter {
                    background: var(--card, #1e293b);
                    padding: 0.75rem;
                    border-radius: 0.5rem;
                    text-align: center;
                    font-size: 0.875rem;
                }

                .voter.you {
                    border: 2px solid var(--primary, #6366f1);
                }

                .voter.abstain {
                    opacity: 0.5;
                    border: 2px dashed #ef4444;
                }

                .ranking {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                .results-box {
                    background: var(--bg, #0f172a);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .round {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.5rem 0;
                    border-bottom: 1px solid var(--muted, #94a3b8);
                }

                .round:last-child {
                    border-bottom: none;
                }

                .winner {
                    color: #22c55e;
                    font-weight: bold;
                }

                .eliminated {
                    color: #ef4444;
                    text-decoration: line-through;
                }

                .your-choice {
                    color: var(--primary, #6366f1);
                }
            </style>

            <h4>Instant Runoff Voting Simulation</h4>

            <div class="controls">
                <button id="vote-btn">You Vote (For A)</button>
                <button id="abstain-btn">You Abstain</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="scenario-box">
                <strong>Scenario:</strong> 3 candidates (A, B, C). Instant runoff voting.
                <div class="voter-grid" id="voters">
                    <div class="voter you">
                        <strong>You</strong>
                        <div class="ranking">A > B > C</div>
                    </div>
                    <div class="voter">
                        <strong>6 voters</strong>
                        <div class="ranking">A > B > C</div>
                    </div>
                    <div class="voter">
                        <strong>6 voters</strong>
                        <div class="ranking">B > A > C</div>
                    </div>
                    <div class="voter">
                        <strong>5 voters</strong>
                        <div class="ranking">C > B > A</div>
                    </div>
                </div>
            </div>

            <div class="results-box" id="results">
                <p>Choose whether to vote or abstain to see the paradox.</p>
            </div>

            <div class="result">
                <p id="explanation">In some voting systems, casting your vote can cause your preferred candidate to LOSE.</p>
            </div>

            <div class="insight">
                The No-Show Paradox violates a basic principle: participating in an election should never hurt your interests. Yet in instant-runoff and other ranked systems, it can!
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#vote-btn').addEventListener('click', () => this.runElection(true));
        this.$('#abstain-btn').addEventListener('click', () => this.runElection(false));
        this.$('#reset-btn').addEventListener('click', () => this.reset());
    }

    runElection(youVote) {
        const resultsEl = this.$('#results');
        const explanationEl = this.$('#explanation');

        const youVoter = this.$('.voter.you');
        if (youVote) {
            youVoter.classList.remove('abstain');
        } else {
            youVoter.classList.add('abstain');
        }

        if (youVote) {
            resultsEl.innerHTML = `
                <strong>Round 1:</strong> A=7, B=6, C=5
                <div class="round">
                    <span>C eliminated (fewest votes)</span>
                    <span class="eliminated">C: 5</span>
                </div>
                <strong>Round 2:</strong> C's 5 votes go to B (their 2nd choice)
                <div class="round">
                    <span>A=7, B=11</span>
                    <span class="winner">B WINS!</span>
                </div>
            `;
            explanationEl.innerHTML = `
                <span style="color: #ef4444;">Your vote helped ELIMINATE C early, causing B to win!</span>
                <br>Your candidate A lost because you voted.
            `;
        } else {
            resultsEl.innerHTML = `
                <strong>Round 1:</strong> A=6, B=6, C=5
                <div class="round">
                    <span>C eliminated (fewest votes)</span>
                    <span class="eliminated">C: 5</span>
                </div>
                <strong>Round 2:</strong> C's 5 votes go to B
                <div class="round">
                    <span>A=6, B=11</span>
                </div>
                <em>Wait, let's reconsider with a tie-breaker scenario...</em>
                <br><br>
                <strong>Alternative Round 1:</strong> A=6, B=6, C=5
                <div class="round">
                    <span>B eliminated (tie-break rule)</span>
                    <span class="eliminated">B: 6</span>
                </div>
                <strong>Round 2:</strong> B's 6 votes go to A (their 2nd choice)
                <div class="round">
                    <span>A=12, C=5</span>
                    <span class="winner">A WINS!</span>
                </div>
            `;
            explanationEl.innerHTML = `
                <span style="color: #22c55e;">By NOT voting, your preferred candidate A wins!</span>
                <br>Your absence changed the elimination order, benefiting A.
            `;
        }
    }

    reset() {
        const youVoter = this.$('.voter.you');
        youVoter.classList.remove('abstain');
        this.$('#results').innerHTML = '<p>Choose whether to vote or abstain to see the paradox.</p>';
        this.$('#explanation').textContent = 'In some voting systems, casting your vote can cause your preferred candidate to LOSE.';
    }
}

customElements.define('no-show-simulator', NoShowSimulator);

export { NoShowSimulator };
