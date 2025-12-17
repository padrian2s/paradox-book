/**
 * Boltzmann Brain Simulator
 * Random quantum fluctuation creating a brain is more likely than ordered universe evolution
 */
import { SimulatorBase } from '../simulator-base.js';

class BoltzmannBrainSimulator extends SimulatorBase {
    constructor() {
        super();
        this.fluctuations = 0;
        this.brainFormed = false;
        this.universeFormed = false;
        this.animationId = null;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .space-container {
                    height: 200px;
                    background: linear-gradient(180deg, #0a0a1a 0%, #1a1a3a 100%);
                    border-radius: 0.5rem;
                    position: relative;
                    overflow: hidden;
                    margin-top: 1rem;
                }

                .particle {
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: rgba(147, 197, 253, 0.8);
                    border-radius: 50%;
                    animation: flicker 0.5s infinite;
                }

                @keyframes flicker {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 1; }
                }

                .brain-icon {
                    position: absolute;
                    font-size: 3rem;
                    left: 30%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    opacity: 0;
                    transition: opacity 0.5s;
                }

                .brain-icon.visible {
                    opacity: 1;
                }

                .universe-icon {
                    position: absolute;
                    font-size: 3rem;
                    right: 30%;
                    top: 50%;
                    transform: translate(50%, -50%);
                    opacity: 0;
                    transition: opacity 0.5s;
                }

                .universe-icon.visible {
                    opacity: 1;
                }

                .stats-container {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
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
                    font-size: 1.25rem;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                .probability-bar {
                    height: 20px;
                    background: var(--card, #1e293b);
                    border-radius: 0.25rem;
                    margin-top: 0.5rem;
                    overflow: hidden;
                    position: relative;
                }

                .probability-fill {
                    height: 100%;
                    transition: width 0.3s;
                }

                .brain-prob {
                    background: #8b5cf6;
                }

                .universe-prob {
                    background: #06b6d4;
                }

                .comparison {
                    margin-top: 1rem;
                    font-size: 0.9rem;
                    color: var(--muted, #94a3b8);
                }

                @media (max-width: 600px) {
                    .stats-container {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>Quantum Fluctuation Experiment</h4>

            <div class="controls">
                <button id="simulate-btn">Run Fluctuations</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="space-container" id="space">
                <div class="brain-icon" id="brain">&#x1F9E0;</div>
                <div class="universe-icon" id="universe">&#x1F30C;</div>
            </div>

            <div class="stats-container">
                <div class="stat-box">
                    <div class="stat-value" id="fluctuation-count">0</div>
                    <div class="stat-label">Quantum Fluctuations</div>
                    <div class="probability-bar">
                        <div class="probability-fill brain-prob" id="brain-bar" style="width: 0%"></div>
                    </div>
                    <div style="font-size: 0.7rem; color: var(--muted);">Brain formation probability</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="complexity">10^10^123</div>
                    <div class="stat-label">Universe Complexity</div>
                    <div class="probability-bar">
                        <div class="probability-fill universe-prob" id="universe-bar" style="width: 0%"></div>
                    </div>
                    <div style="font-size: 0.7rem; color: var(--muted);">Ordered universe probability</div>
                </div>
            </div>

            <div class="result" id="result">
                <p>In a thermodynamic equilibrium, random fluctuations occasionally produce structure.</p>
                <p>Which is more likely: a single conscious brain, or an entire ordered universe?</p>
            </div>

            <div class="insight">
                A Boltzmann Brain is far more probable than an ordered universe evolving observers. If our universe arose from fluctuations, why do we see such improbable order? This suggests our universe did NOT arise from equilibrium fluctuations.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#simulate-btn').addEventListener('click', () => this.simulate());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
    }

    simulate() {
        this.fluctuations = 0;
        this.brainFormed = false;
        this.universeFormed = false;

        const space = this.$('#space');
        const particles = space.querySelectorAll('.particle');
        particles.forEach(p => p.remove());

        const simulate = () => {
            this.fluctuations++;
            this.$('#fluctuation-count').textContent = this.fluctuations.toLocaleString();

            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            space.appendChild(particle);

            setTimeout(() => particle.remove(), 1000);

            const brainProb = Math.min(this.fluctuations / 100, 80);
            const universeProb = Math.min(this.fluctuations / 10000, 5);

            this.$('#brain-bar').style.width = brainProb + '%';
            this.$('#universe-bar').style.width = universeProb + '%';

            if (this.fluctuations >= 50 && !this.brainFormed) {
                this.brainFormed = true;
                this.$('#brain').classList.add('visible');
                this.$('#result').innerHTML = `
                    <p style="color: var(--accent);"><strong>Boltzmann Brain formed!</strong></p>
                    <p>A random fluctuation created a momentary conscious observer.</p>
                    <p>This required far fewer "lucky" fluctuations than creating an ordered universe.</p>
                `;
            }

            if (this.fluctuations >= 200 && !this.universeFormed) {
                this.universeFormed = true;
                this.$('#universe').classList.add('visible');
                cancelAnimationFrame(this.animationId);
                this.$('#result').innerHTML = `
                    <p style="color: var(--accent);"><strong>The Paradox:</strong></p>
                    <p>Brain: Formed at ~50 fluctuations (relatively simple)</p>
                    <p>Universe: Required ~200 fluctuations (enormously complex)</p>
                    <p style="color: #ef4444;">If we arose from thermal equilibrium, we should be Boltzmann Brains, not observers in an ordered universe!</p>
                `;
                return;
            }

            if (this.fluctuations < 200) {
                this.animationId = requestAnimationFrame(simulate);
            }
        };

        simulate();
    }

    reset() {
        cancelAnimationFrame(this.animationId);
        this.fluctuations = 0;
        this.brainFormed = false;
        this.universeFormed = false;

        this.$('#fluctuation-count').textContent = '0';
        this.$('#brain-bar').style.width = '0%';
        this.$('#universe-bar').style.width = '0%';
        this.$('#brain').classList.remove('visible');
        this.$('#universe').classList.remove('visible');

        const space = this.$('#space');
        const particles = space.querySelectorAll('.particle');
        particles.forEach(p => p.remove());

        this.$('#result').innerHTML = `
            <p>In a thermodynamic equilibrium, random fluctuations occasionally produce structure.</p>
            <p>Which is more likely: a single conscious brain, or an entire ordered universe?</p>
        `;
    }

    cleanup() {
        cancelAnimationFrame(this.animationId);
    }
}

customElements.define('boltzmann-brain-simulator', BoltzmannBrainSimulator);

export { BoltzmannBrainSimulator };
