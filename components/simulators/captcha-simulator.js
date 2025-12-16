/**
 * Captcha Paradox Simulator
 * Demonstrates how CAPTCHAs train AI to beat themselves
 */
import { SimulatorBase } from '../simulator-base.js';

class CaptchaSimulator extends SimulatorBase {
    constructor() {
        super();
        this.generation = 1;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .stat-box {
                    background: var(--bg, #0f172a);
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

                .evolution-viz {
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    padding: 1rem;
                    margin-top: 1rem;
                }

                .evolution-bar {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-bottom: 0.75rem;
                }

                .bar-label {
                    width: 80px;
                    font-size: 0.875rem;
                }

                .bar-container {
                    flex: 1;
                    height: 24px;
                    background: var(--card, #1e293b);
                    border-radius: 0.25rem;
                    overflow: hidden;
                    position: relative;
                }

                .bar-fill {
                    height: 100%;
                    transition: width 0.5s;
                    display: flex;
                    align-items: center;
                    padding-left: 0.5rem;
                    font-size: 0.75rem;
                    color: white;
                }

                .human-bar {
                    background: linear-gradient(90deg, #22c55e, #ef4444);
                }

                .bot-bar {
                    background: linear-gradient(90deg, #ef4444, #22c55e);
                }

                .cycle-indicator {
                    text-align: center;
                    margin-top: 1rem;
                    font-size: 2rem;
                }

                @media (max-width: 768px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>The Self-Defeating Loop</h4>

            <div class="controls">
                <button id="evolve-btn">Run Evolution</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="evolution-viz">
                <div class="evolution-bar">
                    <span class="bar-label">Humans:</span>
                    <div class="bar-container">
                        <div class="bar-fill human-bar" id="human-bar" style="width: 100%;">Easy</div>
                    </div>
                </div>
                <div class="evolution-bar">
                    <span class="bar-label">Bots:</span>
                    <div class="bar-container">
                        <div class="bar-fill bot-bar" id="bot-bar" style="width: 10%;">Hard</div>
                    </div>
                </div>
                <div class="cycle-indicator" id="cycle-viz">
                    Human solves -> Data collected -> AI trains -> CAPTCHA harder -> Repeat
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="captcha-gen">1</div>
                    <div class="stat-label">Generation</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="captcha-human">Easy</div>
                    <div class="stat-label">For Humans</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="captcha-bot">Hard</div>
                    <div class="stat-label">For Bots</div>
                </div>
            </div>

            <div class="result">
                <p id="captcha-result">Each CAPTCHA solved trains ML models to solve the next one...</p>
            </div>

            <div class="insight">
                The paradox: Every human-solved CAPTCHA becomes training data for AI, making the next generation of CAPTCHAs obsolete before they're deployed.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#evolve-btn').addEventListener('click', () => this.evolve());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
    }

    evolve() {
        this.generation++;
        const humanDifficulty = this.generation > 5 ? 'Very Hard' : this.generation > 3 ? 'Hard' : 'Easy';
        const botDifficulty = this.generation > 5 ? 'Easy (trained!)' : this.generation > 3 ? 'Medium' : 'Hard';

        const humanWidth = Math.max(20, 100 - (this.generation - 1) * 15);
        const botWidth = Math.min(100, 10 + (this.generation - 1) * 18);

        this.$('#captcha-gen').textContent = this.generation;
        this.$('#captcha-human').textContent = humanDifficulty;
        this.$('#captcha-bot').textContent = botDifficulty;
        this.$('#human-bar').style.width = humanWidth + '%';
        this.$('#human-bar').textContent = humanDifficulty;
        this.$('#bot-bar').style.width = botWidth + '%';
        this.$('#bot-bar').textContent = botDifficulty;

        if (this.generation > 5) {
            this.$('#captcha-result').innerHTML = '<span style="color: #ef4444;">PARADOX! CAPTCHAs are now harder for humans than bots!</span>';
            this.$('#captcha-human').style.color = '#ef4444';
            this.$('#captcha-bot').style.color = '#22c55e';
        } else {
            this.$('#captcha-result').innerHTML = `Generation ${this.generation}: Making CAPTCHAs harder trains better AI...`;
            this.$('#captcha-human').style.color = '';
            this.$('#captcha-bot').style.color = '';
        }
    }

    reset() {
        this.generation = 1;
        this.$('#captcha-gen').textContent = '1';
        this.$('#captcha-human').textContent = 'Easy';
        this.$('#captcha-human').style.color = '';
        this.$('#captcha-bot').textContent = 'Hard';
        this.$('#captcha-bot').style.color = '';
        this.$('#human-bar').style.width = '100%';
        this.$('#human-bar').textContent = 'Easy';
        this.$('#bot-bar').style.width = '10%';
        this.$('#bot-bar').textContent = 'Hard';
        this.$('#captcha-result').textContent = 'Each CAPTCHA solved trains ML models to solve the next one...';
    }
}

customElements.define('captcha-simulator', CaptchaSimulator);

export { CaptchaSimulator };
