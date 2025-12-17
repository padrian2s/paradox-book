/**
 * Quantum Zeno Effect Simulator
 * Continuously observing a quantum system prevents it from changing state
 */
import { SimulatorBase } from '../simulator-base.js';

class QuantumZenoSimulator extends SimulatorBase {
    constructor() {
        super();
        this.decayProgress = 0;
        this.isDecaying = false;
        this.observationRate = 0;
        this.animationId = null;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .experiment-display {
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    margin-top: 1rem;
                    padding: 1rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    flex-wrap: wrap;
                    gap: 1rem;
                }

                .atom-container {
                    text-align: center;
                }

                .atom {
                    font-size: 4rem;
                    position: relative;
                    display: inline-block;
                }

                .decay-ring {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 80px;
                    height: 80px;
                    border: 3px solid transparent;
                    border-top-color: var(--accent, #f59e0b);
                    border-radius: 50%;
                    animation: none;
                }

                .decay-ring.active {
                    animation: spin 2s linear infinite;
                }

                @keyframes spin {
                    to { transform: translate(-50%, -50%) rotate(360deg); }
                }

                .observer {
                    font-size: 3rem;
                    transition: opacity 0.3s;
                }

                .observer.watching {
                    animation: pulse 0.5s infinite;
                }

                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }

                .progress-container {
                    margin-top: 1rem;
                }

                .progress-label {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 0.5rem;
                    font-size: 0.9rem;
                }

                .progress-bar {
                    height: 24px;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    overflow: hidden;
                }

                .progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #22c55e, #f59e0b, #ef4444);
                    transition: width 0.1s;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    padding-right: 0.5rem;
                    font-size: 0.8rem;
                    font-weight: bold;
                }

                .observation-control {
                    margin-top: 1rem;
                    padding: 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                }

                .slider-label {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 0.5rem;
                }

                .slider-container input[type="range"] {
                    width: 100%;
                }

                .stats-row {
                    display: flex;
                    justify-content: space-around;
                    margin-top: 1rem;
                    text-align: center;
                }

                .stat-item {
                    padding: 0.5rem 1rem;
                }

                .stat-value {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }
            </style>

            <h4>Quantum Decay Observation</h4>

            <div class="experiment-display">
                <div class="atom-container">
                    <div class="atom">
                        &#x269B;
                        <div class="decay-ring" id="decay-ring"></div>
                    </div>
                    <div style="margin-top: 0.5rem; color: var(--muted);">Unstable Atom</div>
                </div>
                <div style="font-size: 2rem; color: var(--muted);">&#x27A1;</div>
                <div class="atom-container">
                    <div class="observer" id="observer">&#x1F441;</div>
                    <div style="margin-top: 0.5rem; color: var(--muted);">Observer</div>
                </div>
            </div>

            <div class="progress-container">
                <div class="progress-label">
                    <span>Stable</span>
                    <span>Decay Progress</span>
                    <span>Decayed</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" id="progress-fill" style="width: 0%"></div>
                </div>
            </div>

            <div class="observation-control">
                <div class="slider-label">
                    <span>Observation Frequency</span>
                    <span id="obs-rate-display">None</span>
                </div>
                <div class="slider-container">
                    <input type="range" id="obs-rate" min="0" max="100" value="0">
                </div>
            </div>

            <div class="controls">
                <button id="start-btn">Start Decay</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="stats-row">
                <div class="stat-item">
                    <div class="stat-value" id="decay-rate">Normal</div>
                    <div class="stat-label">Decay Rate</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value" id="time-elapsed">0s</div>
                    <div class="stat-label">Time Elapsed</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value" id="observations">0</div>
                    <div class="stat-label">Observations</div>
                </div>
            </div>

            <div class="result" id="result">
                <p>The atom will naturally decay over time.</p>
                <p>Increase the observation frequency to see the Quantum Zeno Effect!</p>
            </div>

            <div class="insight">
                Each measurement "resets" the quantum evolution, like repeatedly checking if water is boiling. Frequent enough observation prevents state change entirely - a "watched pot" that literally never boils!
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#start-btn').addEventListener('click', () => this.startDecay());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
        this.$('#obs-rate').addEventListener('input', (e) => this.updateObservationRate(e.target.value));
    }

    updateObservationRate(value) {
        this.observationRate = parseInt(value);
        const labels = ['None', 'Rare', 'Occasional', 'Frequent', 'Very Frequent', 'Continuous'];
        const index = Math.floor(this.observationRate / 20);
        this.$('#obs-rate-display').textContent = labels[Math.min(index, labels.length - 1)];

        const observer = this.$('#observer');
        if (this.observationRate > 50) {
            observer.classList.add('watching');
        } else {
            observer.classList.remove('watching');
        }
    }

    startDecay() {
        if (this.isDecaying) return;
        this.isDecaying = true;
        this.decayProgress = 0;

        const decayRing = this.$('#decay-ring');
        decayRing.classList.add('active');

        let observations = 0;
        let timeElapsed = 0;
        const startTime = Date.now();

        const decay = () => {
            timeElapsed = ((Date.now() - startTime) / 1000).toFixed(1);
            this.$('#time-elapsed').textContent = timeElapsed + 's';

            const zenoFactor = 1 - (this.observationRate / 120);
            const decayIncrement = 0.5 * Math.max(zenoFactor, 0.05);

            if (this.observationRate > 0 && Math.random() < this.observationRate / 100) {
                observations++;
                this.$('#observations').textContent = observations;
            }

            this.decayProgress += decayIncrement;
            this.decayProgress = Math.min(this.decayProgress, 100);

            this.$('#progress-fill').style.width = this.decayProgress + '%';

            if (this.observationRate >= 80) {
                this.$('#decay-rate').textContent = 'Frozen!';
                this.$('#decay-rate').style.color = '#22c55e';
            } else if (this.observationRate >= 50) {
                this.$('#decay-rate').textContent = 'Slowed';
                this.$('#decay-rate').style.color = '#f59e0b';
            } else {
                this.$('#decay-rate').textContent = 'Normal';
                this.$('#decay-rate').style.color = 'var(--accent)';
            }

            if (this.decayProgress >= 100) {
                this.isDecaying = false;
                decayRing.classList.remove('active');
                this.$('#result').innerHTML = `
                    <p style="color: #ef4444;"><strong>Atom has decayed!</strong></p>
                    <p>Time: ${timeElapsed}s | Observations: ${observations}</p>
                    <p>${this.observationRate > 50
                        ? 'Despite frequent observation, decay eventually occurred.'
                        : 'With less frequent observation, decay proceeded normally.'}</p>
                `;
                return;
            }

            if (this.observationRate >= 95 && this.decayProgress > 10) {
                this.$('#result').innerHTML = `
                    <p style="color: #22c55e;"><strong>Quantum Zeno Effect Active!</strong></p>
                    <p>Continuous observation has nearly frozen the decay!</p>
                    <p>The atom is being "held" in its undecayed state by measurement.</p>
                `;
            }

            this.animationId = requestAnimationFrame(decay);
        };

        decay();
    }

    reset() {
        cancelAnimationFrame(this.animationId);
        this.isDecaying = false;
        this.decayProgress = 0;

        this.$('#progress-fill').style.width = '0%';
        this.$('#decay-ring').classList.remove('active');
        this.$('#time-elapsed').textContent = '0s';
        this.$('#observations').textContent = '0';
        this.$('#decay-rate').textContent = 'Normal';
        this.$('#decay-rate').style.color = 'var(--accent)';

        this.$('#result').innerHTML = `
            <p>The atom will naturally decay over time.</p>
            <p>Increase the observation frequency to see the Quantum Zeno Effect!</p>
        `;
    }

    cleanup() {
        cancelAnimationFrame(this.animationId);
    }
}

customElements.define('quantum-zeno-simulator', QuantumZenoSimulator);

export { QuantumZenoSimulator };
