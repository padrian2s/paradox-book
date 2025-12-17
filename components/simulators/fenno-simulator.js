import { SimulatorBase } from '../simulator-base.js';

class FennoSimulator extends SimulatorBase {
    constructor() {
        super();
        this.state = {
            congressApproval: 18,
            incumbentReelection: 94
        };
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .stats-container {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                    margin: 1rem 0;
                }

                .stat-card {
                    background: var(--bg, #0f172a);
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .stat-value {
                    font-size: 3rem;
                    font-weight: bold;
                }

                .stat-value.low {
                    color: #ef4444;
                }

                .stat-value.high {
                    color: #22c55e;
                }

                .stat-label {
                    color: var(--muted, #94a3b8);
                    font-size: 0.875rem;
                    margin-top: 0.5rem;
                }

                .explanation-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .reason-box {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                }

                .reason-box h5 {
                    margin: 0 0 0.5rem 0;
                    color: var(--accent, #f59e0b);
                }

                .reason-box ul {
                    margin: 0;
                    padding-left: 1.25rem;
                    font-size: 0.875rem;
                }

                .reason-box li {
                    margin-bottom: 0.25rem;
                }

                @media (max-width: 768px) {
                    .stats-container,
                    .explanation-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>Congress Approval vs Reelection Rates</h4>

            <div class="stats-container">
                <div class="stat-card">
                    <div class="stat-value low" id="approval">${this.state.congressApproval}%</div>
                    <div class="stat-label">Congress Approval Rating</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value high" id="reelection">${this.state.incumbentReelection}%</div>
                    <div class="stat-label">Incumbent Reelection Rate</div>
                </div>
            </div>

            <div class="controls">
                <button id="simulate-btn">Simulate Election Year</button>
                <button id="explain-btn">Explain the Paradox</button>
            </div>

            <div class="result">
                <p id="result-text">Americans hate Congress as a whole, but love THEIR representative. How can both be true?</p>
            </div>

            <div class="explanation-grid" id="explanations" style="display: none;">
                <div class="reason-box">
                    <h5>Why We Hate Congress</h5>
                    <ul>
                        <li>Gridlock and partisan fighting</li>
                        <li>Special interest influence</li>
                        <li>Other people's representatives</li>
                        <li>National media coverage of conflicts</li>
                    </ul>
                </div>
                <div class="reason-box">
                    <h5>Why We Love OUR Rep</h5>
                    <ul>
                        <li>They bring benefits to our district</li>
                        <li>They help with constituent services</li>
                        <li>We know them personally</li>
                        <li>Local media covers their successes</li>
                    </ul>
                </div>
            </div>

            <div class="insight">
                Richard Fenno identified this in 1978: "We hate Congress but love our congressman." The problem is always someone ELSE's representative - never our own.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#simulate-btn').addEventListener('click', () => this.simulate());
        this.$('#explain-btn').addEventListener('click', () => this.toggleExplanation());
    }

    simulate() {
        this.state.congressApproval = Math.floor(Math.random() * 25) + 10;
        this.state.incumbentReelection = Math.floor(Math.random() * 10) + 88;

        this.$('#approval').textContent = this.state.congressApproval + '%';
        this.$('#reelection').textContent = this.state.incumbentReelection + '%';

        const diff = this.state.incumbentReelection - this.state.congressApproval;
        this.$('#result-text').innerHTML = `
            <strong>Gap: ${diff} percentage points!</strong><br>
            Only ${this.state.congressApproval}% approve of Congress,
            yet ${this.state.incumbentReelection}% of incumbents win reelection.
            <br><span style="color: var(--accent);">Each voter thinks THEIR rep is the exception.</span>
        `;
    }

    toggleExplanation() {
        const el = this.$('#explanations');
        el.style.display = el.style.display === 'none' ? 'grid' : 'none';
    }
}

customElements.define('fenno-simulator', FennoSimulator);

export { FennoSimulator };
