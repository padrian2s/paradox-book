/**
 * Black Hole Information Paradox Simulator
 * Information cannot be destroyed, but black holes seem to destroy everything
 */
import { SimulatorBase } from '../simulator-base.js';

class BlackHoleSimulator extends SimulatorBase {
    constructor() {
        super();
        this.infoIn = 0;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .bh-viz {
                    height: 150px;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    position: relative;
                    margin-top: 1rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                }

                .black-hole {
                    width: 80px;
                    height: 80px;
                    background: radial-gradient(circle, #000 55%, transparent 70%);
                    border-radius: 50%;
                    box-shadow: 0 0 30px rgba(139, 92, 246, 0.6), 0 0 60px rgba(139, 92, 246, 0.3);
                    position: relative;
                    z-index: 1;
                }

                .accretion-disk {
                    position: absolute;
                    width: 140px;
                    height: 30px;
                    background: linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.6), rgba(239, 68, 68, 0.6), rgba(245, 158, 11, 0.6), transparent);
                    border-radius: 50%;
                    animation: rotate 3s linear infinite;
                }

                @keyframes rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                .falling-object {
                    position: absolute;
                    left: 15%;
                    font-size: 1.5rem;
                    transition: all 1.5s ease-in;
                    z-index: 2;
                }

                .falling-object.falling {
                    left: 50%;
                    transform: translateX(-50%) scale(0);
                    opacity: 0;
                }

                .hawking-particle {
                    position: absolute;
                    right: 20%;
                    font-size: 0.8rem;
                    opacity: 0;
                    transition: all 0.5s;
                }

                .hawking-particle.visible {
                    opacity: 1;
                    animation: float 2s ease-out forwards;
                }

                @keyframes float {
                    to {
                        transform: translateY(-30px) translateX(20px);
                        opacity: 0;
                    }
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
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
                    color: var(--text, #e2e8f0);
                }

                .stat-value.lost {
                    color: #ef4444;
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }
            </style>

            <h4>Information Loss Simulator</h4>

            <div class="controls">
                <button id="drop-btn">Drop Object</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="bh-viz">
                <div class="accretion-disk"></div>
                <div class="black-hole"></div>
                <div class="falling-object" id="falling-object">&#x1F4E6;</div>
                <div class="hawking-particle" id="hawking-particle">&#x2728;</div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="info-in">0</div>
                    <div class="stat-label">Info Bits In</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="info-out">0</div>
                    <div class="stat-label">Hawking Bits Out</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="info-preserved">&#x2753;</div>
                    <div class="stat-label">Info Preserved?</div>
                </div>
            </div>

            <div class="result" id="result">
                <p>Drop an object into the black hole. Does the information about it survive?</p>
            </div>

            <div class="insight">
                Hawking radiation is thermal - it carries no information about what fell in. This violates quantum mechanics which says information cannot be destroyed!
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#drop-btn').addEventListener('click', () => this.drop());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
    }

    drop() {
        const obj = this.$('#falling-object');
        const particle = this.$('#hawking-particle');

        obj.classList.add('falling');
        this.infoIn += 1024;
        this.$('#info-in').textContent = this.infoIn;

        setTimeout(() => {
            particle.classList.add('visible');

            const hawkingBits = Math.floor(Math.random() * 50);
            this.$('#info-out').textContent = hawkingBits + ' (random)';
            this.$('#info-preserved').textContent = 'NO!';
            this.$('#info-preserved').classList.add('lost');

            this.$('#result').innerHTML = `
                <p style="color: #ef4444;"><strong>Information destroyed!</strong></p>
                <p>1024 bits of information (object properties, quantum states) went in.</p>
                <p>Only ${hawkingBits} random thermal bits came out as Hawking radiation.</p>
                <p style="color: var(--accent);">The rest is gone forever - or is it encoded on the event horizon?</p>
            `;

            setTimeout(() => {
                particle.classList.remove('visible');
                obj.classList.remove('falling');
            }, 2000);
        }, 1500);
    }

    reset() {
        this.infoIn = 0;
        this.$('#info-in').textContent = '0';
        this.$('#info-out').textContent = '0';
        this.$('#info-preserved').textContent = '?';
        this.$('#info-preserved').classList.remove('lost');
        this.$('#falling-object').classList.remove('falling');
        this.$('#hawking-particle').classList.remove('visible');

        this.$('#result').innerHTML = `
            <p>Drop an object into the black hole. Does the information about it survive?</p>
        `;
    }
}

customElements.define('black-hole-simulator', BlackHoleSimulator);

export { BlackHoleSimulator };
