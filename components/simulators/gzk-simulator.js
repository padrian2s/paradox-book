import { SimulatorBase } from '../simulator-base.js';

class GzkSimulator extends SimulatorBase {
    constructor() {
        super();
        this.energy = 19;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .space-view {
                    background: linear-gradient(180deg, #000 0%, #0f172a 100%);
                    border-radius: 0.5rem;
                    padding: 1rem;
                    margin: 1rem 0;
                    position: relative;
                    height: 180px;
                    overflow: hidden;
                }

                .cmb-background {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at 30% 40%, rgba(234, 179, 8, 0.1) 0%, transparent 50%),
                                radial-gradient(circle at 70% 60%, rgba(234, 179, 8, 0.1) 0%, transparent 50%);
                    opacity: 0.5;
                }

                .cosmic-ray {
                    position: absolute;
                    left: 10%;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 20px;
                    height: 20px;
                    background: radial-gradient(circle, #ef4444, #7f1d1d);
                    border-radius: 50%;
                    box-shadow: 0 0 20px #ef4444;
                    transition: all 1s;
                }

                .cosmic-ray.traveling {
                    left: 80%;
                }

                .cosmic-ray.degraded {
                    width: 10px;
                    height: 10px;
                    box-shadow: 0 0 10px #ef4444;
                }

                .photon-hits {
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                }

                .photon {
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: #fbbf24;
                    border-radius: 50%;
                    opacity: 0;
                }

                .earth-marker {
                    position: absolute;
                    right: 10%;
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: 2rem;
                }

                .source-marker {
                    position: absolute;
                    left: 5%;
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: 1.5rem;
                }

                .energy-display {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .energy-box {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .energy-value {
                    font-size: 1.5rem;
                    font-weight: bold;
                }

                .energy-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }

                .limit-indicator {
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    padding: 1rem;
                    margin-top: 1rem;
                }

                .limit-bar {
                    height: 30px;
                    background: var(--card, #1e293b);
                    border-radius: 0.25rem;
                    position: relative;
                    overflow: hidden;
                }

                .limit-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #22c55e, #eab308, #ef4444);
                    transition: width 0.5s;
                }

                .limit-marker {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    width: 3px;
                    background: white;
                    left: 60%;
                }

                .limit-labels {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 0.5rem;
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }

                .scenario-buttons {
                    display: flex;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                }

                .scenario-buttons button {
                    flex: 1;
                    min-width: 120px;
                }
            </style>

            <h4>GZK Limit Simulator</h4>
            <p style="color: var(--muted); margin-bottom: 1rem;">Cosmic rays should lose energy colliding with CMB photons. Yet ultra-high-energy rays reach Earth!</p>

            <div class="space-view">
                <div class="cmb-background"></div>
                <div class="source-marker" title="Distant Source">&#x2728;</div>
                <div class="cosmic-ray" id="ray"></div>
                <div class="earth-marker" title="Earth">&#x1F30D;</div>
                <div class="photon-hits" id="photons"></div>
            </div>

            <div class="controls scenario-buttons">
                <button id="below-btn">Below GZK (10^19 eV)</button>
                <button id="at-btn">At GZK Limit</button>
                <button id="above-btn">Above GZK (10^20 eV)!</button>
            </div>

            <div class="limit-indicator">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span>Cosmic Ray Energy</span>
                    <span id="energy-text">10^19 eV</span>
                </div>
                <div class="limit-bar">
                    <div class="limit-fill" id="energy-fill" style="width: 50%;"></div>
                    <div class="limit-marker"></div>
                </div>
                <div class="limit-labels">
                    <span>10^18 eV</span>
                    <span>GZK Cutoff (5 x 10^19 eV)</span>
                    <span>10^21 eV</span>
                </div>
            </div>

            <div class="energy-display">
                <div class="energy-box">
                    <div class="energy-value" style="color: var(--primary);" id="initial-energy">10^19 eV</div>
                    <div class="energy-label">Initial Energy</div>
                </div>
                <div class="energy-box">
                    <div class="energy-value" style="color: var(--accent);" id="final-energy">-</div>
                    <div class="energy-label">Energy at Earth</div>
                </div>
            </div>

            <div class="controls">
                <button id="travel-btn">Travel to Earth</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="result" id="result">
                <p>The GZK (Greisen-Zatsepin-Kuzmin) limit predicts cosmic rays above ~5 x 10^19 eV should interact with CMB photons and lose energy. They shouldn't reach Earth from distant sources.</p>
            </div>

            <div class="insight">
                Ultra-high-energy cosmic rays (UHECRs) above the GZK limit HAVE been detected! Possible explanations: nearby sources (within 50 Mpc), new physics, or errors in our understanding of particle interactions at extreme energies.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#below-btn').addEventListener('click', () => this.setEnergy(19));
        this.$('#at-btn').addEventListener('click', () => this.setEnergy(19.7));
        this.$('#above-btn').addEventListener('click', () => this.setEnergy(20.5));
        this.$('#travel-btn').addEventListener('click', () => this.travel());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
    }

    setEnergy(exp) {
        this.energy = exp;
        const percent = ((exp - 18) / 3) * 100;
        this.$('#energy-fill').style.width = percent + '%';
        this.$('#energy-text').textContent = '10^' + exp.toFixed(1) + ' eV';
        this.$('#initial-energy').textContent = '10^' + exp.toFixed(1) + ' eV';
        this.$('#final-energy').textContent = '-';
        this.reset();
    }

    travel() {
        const ray = this.$('#ray');
        ray.classList.add('traveling');

        const gzkLimit = 19.7;
        const aboveLimit = this.energy > gzkLimit;

        if (aboveLimit) {
            setTimeout(() => {
                this.showCollisions();
            }, 300);

            setTimeout(() => {
                const energyLoss = (this.energy - gzkLimit) * 0.8;
                const finalEnergy = this.energy - energyLoss;
                ray.classList.add('degraded');
                this.$('#final-energy').textContent = '10^' + finalEnergy.toFixed(1) + ' eV';
                this.$('#final-energy').style.color = '#ef4444';

                this.$('#result').innerHTML = `
                    <p style="color: var(--accent);"><strong>THE PARADOX!</strong></p>
                    <p>Theory says this ray should have lost most of its energy to CMB interactions. Yet we detect such rays!</p>
                    <p>Either: (1) the source is very close, (2) it's not a proton, (3) Lorentz invariance is violated, or (4) new physics is involved.</p>
                `;
            }, 1000);
        } else {
            this.$('#final-energy').textContent = '10^' + this.energy.toFixed(1) + ' eV';
            this.$('#final-energy').style.color = '#22c55e';

            this.$('#result').innerHTML = `
                <p style="color: #22c55e;"><strong>No paradox at this energy.</strong></p>
                <p>Below the GZK limit, cosmic rays can travel cosmological distances without significant energy loss from CMB interactions.</p>
            `;
        }
    }

    showCollisions() {
        const photons = this.$('#photons');
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const photon = document.createElement('div');
                photon.className = 'photon';
                photon.style.left = (20 + i * 15) + '%';
                photon.style.top = (40 + Math.random() * 20) + '%';
                photon.style.opacity = '1';
                photon.style.animation = 'fadeOut 0.5s forwards';
                photons.appendChild(photon);

                setTimeout(() => photon.remove(), 500);
            }, i * 150);
        }
    }

    reset() {
        const ray = this.$('#ray');
        ray.classList.remove('traveling', 'degraded');
        this.$('#final-energy').textContent = '-';
        this.$('#final-energy').style.color = 'var(--accent)';
        this.$('#result').innerHTML = `
            <p>The GZK (Greisen-Zatsepin-Kuzmin) limit predicts cosmic rays above ~5 x 10^19 eV should interact with CMB photons and lose energy. They shouldn't reach Earth from distant sources.</p>
        `;
    }
}

customElements.define('gzk-simulator', GzkSimulator);

export { GzkSimulator };
