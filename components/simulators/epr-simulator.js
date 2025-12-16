/**
 * EPR Paradox Simulator
 * Einstein-Podolsky-Rosen paradox - spooky action at a distance
 */
import { SimulatorBase } from '../simulator-base.js';

class EprSimulator extends SimulatorBase {
    constructor() {
        super();
        this.measured = false;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .entanglement-display {
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    margin-top: 1rem;
                    padding: 1rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                }

                .particle-box {
                    background: var(--card, #1e293b);
                    padding: 1rem 2rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .particle-icon {
                    font-size: 2rem;
                    margin-bottom: 0.5rem;
                }

                .particle-state {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                }

                .entanglement-link {
                    color: var(--muted, #94a3b8);
                    font-size: 0.9rem;
                }

                .distance-info {
                    text-align: center;
                    margin-top: 1rem;
                    color: var(--muted, #94a3b8);
                    font-size: 0.9rem;
                }

                @media (max-width: 600px) {
                    .entanglement-display {
                        flex-direction: column;
                        gap: 1rem;
                    }
                }
            </style>

            <h4>Entanglement Experiment</h4>

            <div class="controls">
                <button id="measure-a">Measure A</button>
                <button id="measure-b">Measure B</button>
                <button id="reset-btn">New Pair</button>
            </div>

            <div class="entanglement-display">
                <div class="particle-box">
                    <div class="particle-icon">atom</div>
                    <div class="particle-state" id="state-a">?</div>
                    <div>Particle A</div>
                </div>
                <div class="entanglement-link">
                    ~ entangled ~
                </div>
                <div class="particle-box">
                    <div class="particle-icon">atom</div>
                    <div class="particle-state" id="state-b">?</div>
                    <div>Particle B</div>
                </div>
            </div>

            <div class="distance-info">
                Particles could be light-years apart. Measurement is instantaneous.
            </div>

            <div class="result" id="result">
                <p>Measure one particle to instantly determine the other!</p>
            </div>

            <div class="insight">
                Einstein called this "spooky action at a distance." The correlation is instantaneous, yet no information travels faster than light.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#measure-a').addEventListener('click', () => this.measure('A'));
        this.$('#measure-b').addEventListener('click', () => this.measure('B'));
        this.$('#reset-btn').addEventListener('click', () => this.reset());
    }

    measure(particle) {
        if (this.measured) return;
        this.measured = true;

        const spin = Math.random() > 0.5 ? 'up' : 'down';
        const antiSpin = spin === 'up' ? 'down' : 'up';

        if (particle === 'A') {
            this.$('#state-a').textContent = spin;
            this.$('#state-b').textContent = antiSpin;
        } else {
            this.$('#state-b').textContent = spin;
            this.$('#state-a').textContent = antiSpin;
        }

        this.$('#result').innerHTML = `
            <p style="color: var(--accent);">
                Measured ${particle}! Other particle INSTANTLY becomes opposite - faster than light!
            </p>
            <p>No signal was sent. The particles were "decided" at measurement, not creation.</p>
        `;
    }

    reset() {
        this.measured = false;
        this.$('#state-a').textContent = '?';
        this.$('#state-b').textContent = '?';
        this.$('#result').innerHTML = '<p>Measure one particle to instantly determine the other!</p>';
    }
}

customElements.define('epr-simulator', EprSimulator);

export { EprSimulator };
