/**
 * Twin Paradox Simulator
 * Space traveler returns younger than their twin who stayed on Earth
 */
import { SimulatorBase } from '../simulator-base.js';

class TwinParadoxSimulator extends SimulatorBase {
    constructor() {
        super();
        this.isRunning = false;
        this.earthTime = 0;
        this.shipTime = 0;
        this.velocity = 0.9;
        this.animationId = null;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .scenario-container {
                    display: flex;
                    justify-content: space-around;
                    align-items: flex-start;
                    margin-top: 1rem;
                    gap: 1rem;
                    flex-wrap: wrap;
                }

                .twin-box {
                    background: var(--card, #1e293b);
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    text-align: center;
                    min-width: 150px;
                    flex: 1;
                }

                .twin-icon {
                    font-size: 3rem;
                    margin-bottom: 0.5rem;
                }

                .twin-name {
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                }

                .twin-location {
                    font-size: 0.8rem;
                    color: var(--muted, #94a3b8);
                    margin-bottom: 1rem;
                }

                .age-display {
                    font-size: 2rem;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                }

                .age-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }

                .journey-display {
                    margin-top: 1rem;
                    padding: 1rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    position: relative;
                    height: 100px;
                    overflow: hidden;
                }

                .earth {
                    position: absolute;
                    left: 10%;
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: 2rem;
                }

                .star {
                    position: absolute;
                    right: 10%;
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: 2rem;
                }

                .spaceship {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: 1.5rem;
                    transition: left 0.1s linear;
                }

                .journey-path {
                    position: absolute;
                    top: 50%;
                    left: 15%;
                    right: 15%;
                    height: 2px;
                    background: var(--muted, #94a3b8);
                    opacity: 0.3;
                }

                .velocity-control {
                    margin-top: 1rem;
                    padding: 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                }

                .velocity-label {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 0.5rem;
                }

                .velocity-value {
                    color: var(--accent, #f59e0b);
                    font-weight: bold;
                }

                input[type="range"] {
                    width: 100%;
                }

                .formula-box {
                    margin-top: 1rem;
                    padding: 1rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    font-family: monospace;
                    text-align: center;
                }

                .time-dilation {
                    font-size: 1.2rem;
                    color: var(--primary, #6366f1);
                }

                .stats-row {
                    display: flex;
                    justify-content: space-around;
                    margin-top: 1rem;
                    text-align: center;
                    flex-wrap: wrap;
                    gap: 1rem;
                }

                .stat-item {
                    background: var(--card, #1e293b);
                    padding: 0.75rem 1rem;
                    border-radius: 0.25rem;
                }

                .stat-value {
                    font-size: 1.25rem;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                }

                .stat-label {
                    font-size: 0.7rem;
                    color: var(--muted, #94a3b8);
                }

                @media (max-width: 600px) {
                    .scenario-container {
                        flex-direction: column;
                    }

                    .twin-box {
                        width: 100%;
                    }
                }
            </style>

            <h4>Relativistic Time Dilation</h4>

            <div class="velocity-control">
                <div class="velocity-label">
                    <span>Spaceship Velocity</span>
                    <span class="velocity-value" id="velocity-display">0.90c (90% speed of light)</span>
                </div>
                <input type="range" id="velocity" min="10" max="99" value="90">
            </div>

            <div class="scenario-container">
                <div class="twin-box">
                    <div class="twin-icon">&#x1F468;</div>
                    <div class="twin-name">Earth Twin</div>
                    <div class="twin-location">Stays on Earth</div>
                    <div class="age-display" id="earth-age">30</div>
                    <div class="age-label">years old</div>
                </div>
                <div class="twin-box">
                    <div class="twin-icon">&#x1F468;&#x200D;&#x1F680;</div>
                    <div class="twin-name">Space Twin</div>
                    <div class="twin-location">Traveling at <span id="ship-velocity">0.9c</span></div>
                    <div class="age-display" id="ship-age">30</div>
                    <div class="age-label">years old</div>
                </div>
            </div>

            <div class="journey-display">
                <div class="journey-path"></div>
                <div class="earth">&#x1F30D;</div>
                <div class="star">&#x2B50;</div>
                <div class="spaceship" id="spaceship">&#x1F680;</div>
            </div>

            <div class="controls">
                <button id="start-btn">Start Journey</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="formula-box">
                <div>Time Dilation Factor (Lorentz)</div>
                <div class="time-dilation" id="lorentz">gamma = 1 / sqrt(1 - v^2/c^2) = 2.29</div>
            </div>

            <div class="stats-row">
                <div class="stat-item">
                    <div class="stat-value" id="earth-elapsed">0</div>
                    <div class="stat-label">Earth Years Passed</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value" id="ship-elapsed">0</div>
                    <div class="stat-label">Ship Years Passed</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value" id="age-diff">0</div>
                    <div class="stat-label">Age Difference</div>
                </div>
            </div>

            <div class="result" id="result">
                <p>Both twins start at age 30. Send the space twin on a journey!</p>
                <p>Higher velocity = greater time dilation = bigger age difference on return.</p>
            </div>

            <div class="insight">
                This isn't science fiction - GPS satellites must account for time dilation! The space twin ages slower because they change reference frames during acceleration and deceleration. Time is relative.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#start-btn').addEventListener('click', () => this.startJourney());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
        this.$('#velocity').addEventListener('input', (e) => this.updateVelocity(e.target.value));
    }

    updateVelocity(value) {
        this.velocity = value / 100;
        this.$('#velocity-display').textContent = `${(this.velocity).toFixed(2)}c (${value}% speed of light)`;
        this.$('#ship-velocity').textContent = `${(this.velocity).toFixed(2)}c`;

        const gamma = 1 / Math.sqrt(1 - this.velocity * this.velocity);
        this.$('#lorentz').textContent = `gamma = 1 / sqrt(1 - v^2/c^2) = ${gamma.toFixed(2)}`;
    }

    startJourney() {
        if (this.isRunning) return;
        this.isRunning = true;

        const gamma = 1 / Math.sqrt(1 - this.velocity * this.velocity);
        const journeyDuration = 20;
        const shipDuration = journeyDuration / gamma;

        this.earthTime = 0;
        this.shipTime = 0;

        const spaceship = this.$('#spaceship');
        let progress = 0;
        let outbound = true;

        const animate = () => {
            if (outbound) {
                progress += 0.5;
                if (progress >= 100) {
                    outbound = false;
                }
            } else {
                progress -= 0.5;
            }

            const leftPos = 15 + (progress * 0.7);
            spaceship.style.left = leftPos + '%';
            spaceship.style.transform = outbound
                ? 'translateY(-50%) scaleX(1)'
                : 'translateY(-50%) scaleX(-1)';

            const timeProgress = Math.abs(progress) / 100;
            this.earthTime = timeProgress * journeyDuration;
            this.shipTime = timeProgress * shipDuration;

            this.$('#earth-age').textContent = (30 + this.earthTime).toFixed(1);
            this.$('#ship-age').textContent = (30 + this.shipTime).toFixed(1);
            this.$('#earth-elapsed').textContent = this.earthTime.toFixed(1);
            this.$('#ship-elapsed').textContent = this.shipTime.toFixed(1);
            this.$('#age-diff').textContent = (this.earthTime - this.shipTime).toFixed(1);

            if (progress <= 0 && !outbound) {
                this.isRunning = false;
                this.$('#result').innerHTML = `
                    <p style="color: var(--accent);"><strong>Journey Complete!</strong></p>
                    <p>Earth twin aged ${this.earthTime.toFixed(1)} years and is now ${(30 + this.earthTime).toFixed(1)} years old.</p>
                    <p>Space twin aged only ${this.shipTime.toFixed(1)} years and is now ${(30 + this.shipTime).toFixed(1)} years old.</p>
                    <p style="color: #22c55e;">The space twin is ${(this.earthTime - this.shipTime).toFixed(1)} years younger!</p>
                `;
                return;
            }

            this.animationId = requestAnimationFrame(animate);
        };

        animate();
    }

    reset() {
        cancelAnimationFrame(this.animationId);
        this.isRunning = false;
        this.earthTime = 0;
        this.shipTime = 0;

        this.$('#spaceship').style.left = '15%';
        this.$('#spaceship').style.transform = 'translateY(-50%) scaleX(1)';
        this.$('#earth-age').textContent = '30';
        this.$('#ship-age').textContent = '30';
        this.$('#earth-elapsed').textContent = '0';
        this.$('#ship-elapsed').textContent = '0';
        this.$('#age-diff').textContent = '0';

        this.$('#result').innerHTML = `
            <p>Both twins start at age 30. Send the space twin on a journey!</p>
            <p>Higher velocity = greater time dilation = bigger age difference on return.</p>
        `;
    }

    cleanup() {
        cancelAnimationFrame(this.animationId);
    }
}

customElements.define('twin-paradox-simulator', TwinParadoxSimulator);

export { TwinParadoxSimulator };
