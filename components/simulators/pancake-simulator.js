/**
 * Pancake Paradox Simulator
 * Demonstrates the first-attempt phenomenon in systems requiring calibration
 */
import { SimulatorBase } from '../simulator-base.js';

class PancakeSimulator extends SimulatorBase {
    constructor() {
        super();
        this.state = { count: 0, panTemp: 0, goodPancakes: 0 };
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .pancake-viz {
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                    flex-wrap: wrap;
                    gap: 2rem;
                }

                .pan-container {
                    text-align: center;
                }

                .pan {
                    width: 150px;
                    height: 150px;
                    background: linear-gradient(145deg, #374151, #1f2937);
                    border-radius: 50%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    border: 8px solid #4b5563;
                    position: relative;
                }

                .pancake {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    transition: all 0.5s;
                }

                .pancake.cooking {
                    animation: sizzle 0.3s infinite;
                }

                @keyframes sizzle {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.02); }
                }

                .pancake.bad {
                    background: linear-gradient(145deg, #78350f, #451a03);
                }

                .pancake.ok {
                    background: linear-gradient(145deg, #ca8a04, #a16207);
                }

                .pancake.good {
                    background: linear-gradient(145deg, #fbbf24, #f59e0b);
                }

                .temp-indicator {
                    position: absolute;
                    bottom: -30px;
                    font-size: 0.875rem;
                }

                .pancake-stack {
                    min-width: 120px;
                }

                .stack-label {
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                    text-align: center;
                }

                .stacked-pancake {
                    width: 80px;
                    height: 15px;
                    margin: 2px auto;
                    border-radius: 50%;
                }

                .stacked-pancake.bad {
                    background: linear-gradient(145deg, #78350f, #451a03);
                }

                .stacked-pancake.ok {
                    background: linear-gradient(145deg, #ca8a04, #a16207);
                }

                .stacked-pancake.good {
                    background: linear-gradient(145deg, #fbbf24, #f59e0b);
                }

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

                @media (max-width: 768px) {
                    .stats-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
            </style>

            <h4>First Attempt Simulator</h4>

            <div class="pancake-viz">
                <div class="pan-container">
                    <div class="pan" id="pancake-pan">
                        <div class="pancake" id="current-pancake"></div>
                        <div class="temp-indicator" id="pan-temp">Cold</div>
                    </div>
                </div>
                <div class="pancake-stack" id="pancake-stack">
                    <div class="stack-label">Pancake Stack</div>
                </div>
            </div>

            <div class="controls" style="margin-top: 1rem;">
                <button id="cook-btn">Cook Pancake</button>
                <button id="reset-btn">Start Over</button>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="pancake-count">0</div>
                    <div class="stat-label">Pancakes Made</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="pan-temperature">Cold</div>
                    <div class="stat-label">Pan Status</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="pancake-quality">-</div>
                    <div class="stat-label">Current Quality</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="good-pancakes">0</div>
                    <div class="stat-label">Good Pancakes</div>
                </div>
            </div>

            <div class="result">
                <p id="pancake-result">Cook pancakes to see the first-attempt phenomenon in action...</p>
            </div>

            <div class="insight">
                This applies everywhere: first drafts, prototypes, pilots. The "first pancake" teaches you what you need to know for success. Embrace necessary failures.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#cook-btn').addEventListener('click', () => this.cookPancake());
        this.$('#reset-btn').addEventListener('click', () => this.resetPancakes());
    }

    cookPancake() {
        this.state.count++;
        this.state.panTemp = Math.min(100, this.state.panTemp + 35);

        const pancake = this.$('#current-pancake');
        pancake.classList.add('cooking');

        setTimeout(() => {
            pancake.classList.remove('cooking');

            let quality = '';
            let qualityClass = '';

            if (this.state.count === 1) {
                quality = 'Bad';
                qualityClass = 'bad';
                this.$('#pancake-result').textContent =
                    "First pancake is bad! Pan was too cold. But now it's heating up...";
            } else if (this.state.panTemp < 70) {
                quality = 'OK';
                qualityClass = 'ok';
                this.$('#pancake-result').textContent =
                    'Pan still calibrating. Getting better!';
            } else {
                quality = 'Perfect!';
                qualityClass = 'good';
                this.state.goodPancakes++;
                this.$('#pancake-result').textContent =
                    "Perfect pancake! The first one's sacrifice was not in vain.";
            }

            pancake.className = 'pancake ' + qualityClass;

            const stack = this.$('#pancake-stack');
            const stackedPancake = document.createElement('div');
            stackedPancake.className = 'stacked-pancake ' + qualityClass;
            stack.appendChild(stackedPancake);

            this.$('#pancake-count').textContent = this.state.count;
            this.$('#pan-temperature').textContent =
                this.state.panTemp < 50 ? 'Cold' : this.state.panTemp < 80 ? 'Warming' : 'Perfect!';
            this.$('#pan-temp').textContent =
                this.state.panTemp < 50 ? 'Cold' : this.state.panTemp < 80 ? 'Warm' : 'Hot!';
            this.$('#pancake-quality').textContent = quality;
            this.$('#good-pancakes').textContent = this.state.goodPancakes;
        }, 1000);
    }

    resetPancakes() {
        this.state = { count: 0, panTemp: 0, goodPancakes: 0 };
        this.$('#current-pancake').className = 'pancake';
        this.$('#pancake-count').textContent = '0';
        this.$('#pan-temperature').textContent = 'Cold';
        this.$('#pan-temp').textContent = 'Cold';
        this.$('#pancake-quality').textContent = '-';
        this.$('#good-pancakes').textContent = '0';
        this.$('#pancake-result').textContent = 'Cook pancakes to see the first-attempt phenomenon in action...';

        const stack = this.$('#pancake-stack');
        const stackedPancakes = stack.querySelectorAll('.stacked-pancake');
        stackedPancakes.forEach(p => p.remove());
    }
}

customElements.define('pancake-simulator', PancakeSimulator);

export { PancakeSimulator };
