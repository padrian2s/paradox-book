/**
 * Buttered Cat Paradox Simulator
 * Demonstrates the absurd conclusion of combining two "laws"
 */
import { SimulatorBase } from '../simulator-base.js';

class ButteredCatSimulator extends SimulatorBase {
    constructor() {
        super();
        this.animating = false;
        this.spinInterval = null;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .cat-viz {
                    height: 280px;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    position: relative;
                    overflow: hidden;
                    margin-top: 1rem;
                }

                .cat-toast {
                    position: absolute;
                    left: 50%;
                    top: 30px;
                    transform: translateX(-50%);
                    font-size: 4rem;
                    transition: top 0.5s ease-in;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .cat-emoji {
                    line-height: 1;
                }

                .toast-emoji {
                    margin-top: -10px;
                    line-height: 1;
                }

                .cat-spin {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 4rem;
                    display: none;
                }

                .ground {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 25px;
                    background: linear-gradient(to bottom, #4a5568, #2d3748);
                }

                .law-boxes {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .law-box {
                    background: var(--bg, #0f172a);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .law-icon {
                    font-size: 2rem;
                    margin-bottom: 0.5rem;
                }

                .law-title {
                    font-weight: bold;
                    margin-bottom: 0.25rem;
                }

                .law-desc {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }

                .energy-meter {
                    margin-top: 1rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    padding: 1rem;
                    display: none;
                }

                .energy-bar {
                    height: 20px;
                    background: var(--card, #1e293b);
                    border-radius: 10px;
                    overflow: hidden;
                }

                .energy-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #22c55e, #f59e0b, #ef4444);
                    animation: energyPulse 1s infinite;
                }

                @keyframes energyPulse {
                    0%, 100% { width: 80%; }
                    50% { width: 100%; }
                }

                .energy-label {
                    text-align: center;
                    margin-top: 0.5rem;
                    font-size: 0.875rem;
                    color: var(--accent, #f59e0b);
                }

                @media (max-width: 768px) {
                    .law-boxes {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>Anti-Gravity Cat Generator</h4>

            <div class="controls">
                <button id="drop-btn">Drop the Cat-Toast!</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="cat-viz">
                <div class="cat-toast" id="cat-toast">
                    <span class="cat-emoji">&#x1F431;</span>
                    <span class="toast-emoji">&#x1F35E;</span>
                </div>
                <div class="cat-spin" id="cat-spin">
                    &#x1F431;&#x1F35E;
                </div>
                <div class="ground"></div>
            </div>

            <div class="law-boxes">
                <div class="law-box">
                    <div class="law-icon">&#x1F431;</div>
                    <div class="law-title">Murphy's Law of Cats</div>
                    <div class="law-desc">Cats always land on their feet</div>
                </div>
                <div class="law-box">
                    <div class="law-icon">&#x1F35E;</div>
                    <div class="law-title">Murphy's Law of Toast</div>
                    <div class="law-desc">Buttered toast always lands butter-side down</div>
                </div>
            </div>

            <div class="energy-meter" id="energy-meter">
                <div class="energy-bar">
                    <div class="energy-fill"></div>
                </div>
                <div class="energy-label">INFINITE ENERGY DETECTED!</div>
            </div>

            <div class="result">
                <p id="cat-result">Press "Drop" to test the hypothesis...</p>
            </div>

            <div class="insight">
                This humorous paradox illustrates how combining two "laws" can lead to absurd conclusions. It's a lesson in the limits of folk physics.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#drop-btn').addEventListener('click', () => this.drop());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
    }

    drop() {
        if (this.animating) return;
        this.animating = true;

        const catToast = this.$('#cat-toast');
        const catSpin = this.$('#cat-spin');

        catToast.style.top = '120px';

        setTimeout(() => {
            catToast.style.display = 'none';
            catSpin.style.display = 'block';

            let rotation = 0;
            this.spinInterval = setInterval(() => {
                rotation += 30;
                catSpin.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
            }, 50);

            this.$('#energy-meter').style.display = 'block';

            this.$('#cat-result').innerHTML = `
                <span style="color: var(--accent); font-size: 1.25rem;">PARADOX ACTIVATED!</span><br>
                The cat-toast system hovers indefinitely, spinning in place!<br>
                Cat wants to land feet-down. Toast wants to land butter-down.<br>
                Neither can win. Free energy discovered!
            `;

            setTimeout(() => {
                if (this.spinInterval) {
                    clearInterval(this.spinInterval);
                    this.spinInterval = null;
                }
                this.animating = false;
            }, 5000);
        }, 500);
    }

    reset() {
        this.animating = false;
        if (this.spinInterval) {
            clearInterval(this.spinInterval);
            this.spinInterval = null;
        }

        const catToast = this.$('#cat-toast');
        const catSpin = this.$('#cat-spin');

        catToast.style.display = 'flex';
        catToast.style.top = '30px';
        catSpin.style.display = 'none';
        catSpin.style.transform = 'translate(-50%, -50%)';

        this.$('#energy-meter').style.display = 'none';
        this.$('#cat-result').textContent = 'Press "Drop" to test the hypothesis...';
    }

    cleanup() {
        if (this.spinInterval) {
            clearInterval(this.spinInterval);
            this.spinInterval = null;
        }
    }
}

customElements.define('buttered-cat-simulator', ButteredCatSimulator);

export { ButteredCatSimulator };
