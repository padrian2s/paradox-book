/**
 * Archer's Paradox Simulator
 * An arrow must flex around the bow handle to hit a target it's not initially pointed at
 */
import { SimulatorBase } from '../simulator-base.js';

class ArcherSimulator extends SimulatorBase {
    constructor() {
        super();
        this.fired = false;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .archer-viz {
                    height: 120px;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    position: relative;
                    margin-top: 1rem;
                    overflow: hidden;
                }

                .bow {
                    position: absolute;
                    left: 20px;
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: 2.5rem;
                }

                .arrow {
                    position: absolute;
                    left: 60px;
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: 1.5rem;
                    transition: left 1s ease-out;
                }

                .arrow.flex {
                    animation: arrowFlex 0.3s ease-in-out;
                }

                @keyframes arrowFlex {
                    0%, 100% { transform: translateY(-50%) scaleX(1); }
                    25% { transform: translateY(-50%) scaleX(0.9) skewY(5deg); }
                    50% { transform: translateY(-50%) scaleX(1.05); }
                    75% { transform: translateY(-50%) scaleX(0.95) skewY(-3deg); }
                }

                .target {
                    position: absolute;
                    right: 20px;
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: 2.5rem;
                }

                .riser-line {
                    position: absolute;
                    left: 45px;
                    top: 20px;
                    bottom: 20px;
                    width: 3px;
                    background: var(--muted, #94a3b8);
                    opacity: 0.5;
                }

                .riser-label {
                    position: absolute;
                    left: 55px;
                    top: 20px;
                    font-size: 0.7rem;
                    color: var(--muted, #94a3b8);
                }

                .flight-path {
                    position: absolute;
                    left: 60px;
                    right: 60px;
                    top: 50%;
                    height: 2px;
                    background: transparent;
                    border-top: 2px dashed var(--primary, #6366f1);
                    opacity: 0;
                    transition: opacity 0.5s;
                }

                .flight-path.visible {
                    opacity: 0.5;
                }
            </style>

            <h4>Arrow Flight Simulator</h4>

            <div class="controls">
                <button id="fire-btn">Fire Arrow</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="archer-viz">
                <div class="riser-line"></div>
                <div class="riser-label">Bow Riser</div>
                <div class="bow">&#x1F3F9;</div>
                <div class="arrow" id="arrow">&#x27A1;&#xFE0F;</div>
                <div class="flight-path" id="flight-path"></div>
                <div class="target">&#x1F3AF;</div>
            </div>

            <div class="result" id="result">
                <p>The arrow is pointing at the bow riser (handle), not the target! How can it hit?</p>
            </div>

            <div class="insight">
                When the string releases, the arrow flexes around the riser in an S-curve. Proper "spine" (stiffness) matching is critical for accuracy. This is why arrow tuning matters!
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#fire-btn').addEventListener('click', () => this.fire());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
    }

    fire() {
        if (this.fired) return;
        this.fired = true;

        const arrow = this.$('#arrow');
        const flightPath = this.$('#flight-path');

        arrow.classList.add('flex');
        flightPath.classList.add('visible');

        setTimeout(() => {
            arrow.style.left = 'calc(100% - 80px)';
        }, 300);

        this.$('#result').innerHTML = `
            <p style="color: var(--accent);"><strong>HIT!</strong> The arrow flexed around the bow riser!</p>
            <p>The "Archer's Paradox": arrows must oscillate around the bow handle to fly straight. The spine (stiffness) must match the bow's draw weight.</p>
        `;
    }

    reset() {
        this.fired = false;

        const arrow = this.$('#arrow');
        const flightPath = this.$('#flight-path');

        arrow.classList.remove('flex');
        arrow.style.left = '60px';
        flightPath.classList.remove('visible');

        this.$('#result').innerHTML = `
            <p>The arrow is pointing at the bow riser (handle), not the target! How can it hit?</p>
        `;
    }
}

customElements.define('archer-simulator', ArcherSimulator);

export { ArcherSimulator };
