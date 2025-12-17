/**
 * Maxwell's Demon Simulator
 * A hypothetical demon could violate the second law of thermodynamics
 */
import { SimulatorBase } from '../simulator-base.js';

class MaxwellDemonSimulator extends SimulatorBase {
    constructor() {
        super();
        this.particles = [];
        this.demonActive = false;
        this.animationId = null;
        this.gateOpen = false;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .chamber-container {
                    display: flex;
                    margin-top: 1rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    overflow: hidden;
                    position: relative;
                    height: 200px;
                }

                .chamber {
                    flex: 1;
                    position: relative;
                    overflow: hidden;
                }

                .chamber-left {
                    background: linear-gradient(180deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%);
                }

                .chamber-right {
                    background: linear-gradient(180deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%);
                }

                .divider {
                    width: 8px;
                    background: var(--muted, #94a3b8);
                    position: relative;
                }

                .gate {
                    position: absolute;
                    top: 40%;
                    left: 0;
                    width: 100%;
                    height: 40px;
                    background: var(--bg, #0f172a);
                    transition: height 0.1s;
                }

                .gate.open {
                    height: 0;
                }

                .demon {
                    position: absolute;
                    top: 35%;
                    left: 50%;
                    transform: translateX(-50%);
                    font-size: 1.5rem;
                    z-index: 10;
                    opacity: 0.5;
                    transition: opacity 0.3s;
                }

                .demon.active {
                    opacity: 1;
                    animation: demonPulse 0.5s infinite;
                }

                @keyframes demonPulse {
                    0%, 100% { transform: translateX(-50%) scale(1); }
                    50% { transform: translateX(-50%) scale(1.1); }
                }

                .particle {
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                }

                .hot {
                    background: #ef4444;
                    box-shadow: 0 0 5px rgba(239, 68, 68, 0.5);
                }

                .cold {
                    background: #3b82f6;
                    box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
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

                .stat-title {
                    font-size: 0.8rem;
                    color: var(--muted, #94a3b8);
                    margin-bottom: 0.5rem;
                }

                .temp-display {
                    display: flex;
                    justify-content: space-around;
                }

                .temp-value {
                    font-size: 1.5rem;
                    font-weight: bold;
                }

                .temp-hot { color: #ef4444; }
                .temp-cold { color: #3b82f6; }

                .entropy-bar {
                    height: 20px;
                    background: var(--bg, #0f172a);
                    border-radius: 0.25rem;
                    overflow: hidden;
                    margin-top: 0.5rem;
                }

                .entropy-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #22c55e, #f59e0b, #ef4444);
                    transition: width 0.3s;
                }

                .chamber-label {
                    position: absolute;
                    bottom: 5px;
                    width: 100%;
                    text-align: center;
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }

                @media (max-width: 600px) {
                    .stats-container {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>Sorting Hot and Cold Particles</h4>

            <div class="controls">
                <button id="demon-btn">Activate Demon</button>
                <button id="mix-btn">Mix Particles</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="chamber-container" id="chamber-container">
                <div class="chamber chamber-left" id="left-chamber">
                    <div class="chamber-label">Left Chamber</div>
                </div>
                <div class="divider">
                    <div class="gate" id="gate"></div>
                </div>
                <div class="chamber chamber-right" id="right-chamber">
                    <div class="chamber-label">Right Chamber</div>
                </div>
                <div class="demon" id="demon">&#x1F608;</div>
            </div>

            <div class="stats-container">
                <div class="stat-box">
                    <div class="stat-title">Chamber Temperatures</div>
                    <div class="temp-display">
                        <div>
                            <div class="temp-value temp-hot" id="left-temp">50</div>
                            <div style="font-size: 0.7rem; color: var(--muted);">Left (K)</div>
                        </div>
                        <div>
                            <div class="temp-value temp-cold" id="right-temp">50</div>
                            <div style="font-size: 0.7rem; color: var(--muted);">Right (K)</div>
                        </div>
                    </div>
                </div>
                <div class="stat-box">
                    <div class="stat-title">System Entropy</div>
                    <div class="entropy-bar">
                        <div class="entropy-fill" id="entropy-bar" style="width: 100%"></div>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 0.7rem; color: var(--muted); margin-top: 0.25rem;">
                        <span>Low (ordered)</span>
                        <span>High (disordered)</span>
                    </div>
                </div>
            </div>

            <div class="result" id="result">
                <p>Particles of different speeds (hot = fast, cold = slow) are mixed randomly.</p>
                <p>Activate the demon to sort them without doing work - violating thermodynamics!</p>
            </div>

            <div class="insight">
                The demon appears to decrease entropy for free. But information has a thermodynamic cost! Landauer's principle shows erasing the demon's memory generates exactly enough entropy to satisfy the second law.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#demon-btn').addEventListener('click', () => this.toggleDemon());
        this.$('#mix-btn').addEventListener('click', () => this.mixParticles());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
    }

    connectedCallback() {
        super.connectedCallback();
        this.initParticles();
        this.startSimulation();
    }

    initParticles() {
        const leftChamber = this.$('#left-chamber');
        const rightChamber = this.$('#right-chamber');

        for (let i = 0; i < 20; i++) {
            const isHot = Math.random() > 0.5;
            const particle = {
                element: document.createElement('div'),
                x: Math.random() * 140 + 10,
                y: Math.random() * 160 + 20,
                vx: (Math.random() - 0.5) * (isHot ? 4 : 1.5),
                vy: (Math.random() - 0.5) * (isHot ? 4 : 1.5),
                isHot: isHot,
                chamber: Math.random() > 0.5 ? 'left' : 'right'
            };

            particle.element.className = `particle ${isHot ? 'hot' : 'cold'}`;
            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';

            if (particle.chamber === 'left') {
                leftChamber.appendChild(particle.element);
            } else {
                rightChamber.appendChild(particle.element);
            }

            this.particles.push(particle);
        }
    }

    startSimulation() {
        const animate = () => {
            this.particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                const chamberWidth = 160;
                const chamberHeight = 180;

                if (p.x < 5) { p.x = 5; p.vx *= -1; }
                if (p.x > chamberWidth - 15) { p.x = chamberWidth - 15; p.vx *= -1; }
                if (p.y < 5) { p.y = 5; p.vy *= -1; }
                if (p.y > chamberHeight - 15) { p.y = chamberHeight - 15; p.vy *= -1; }

                p.element.style.left = p.x + 'px';
                p.element.style.top = p.y + 'px';

                if (this.demonActive) {
                    const nearGate = p.y > 70 && p.y < 110;
                    const atEdge = p.chamber === 'left' ? p.x > chamberWidth - 20 : p.x < 20;

                    if (nearGate && atEdge) {
                        if ((p.chamber === 'left' && !p.isHot) || (p.chamber === 'right' && p.isHot)) {
                            this.gateOpen = true;
                            this.$('#gate').classList.add('open');

                            const targetChamber = p.chamber === 'left' ? 'right' : 'left';
                            const currentParent = p.element.parentElement;
                            const newParent = this.$(targetChamber === 'left' ? '#left-chamber' : '#right-chamber');

                            currentParent.removeChild(p.element);
                            newParent.appendChild(p.element);
                            p.chamber = targetChamber;
                            p.x = targetChamber === 'left' ? chamberWidth - 20 : 20;

                            setTimeout(() => {
                                this.gateOpen = false;
                                this.$('#gate').classList.remove('open');
                            }, 100);
                        }
                    }
                }
            });

            this.updateStats();
            this.animationId = requestAnimationFrame(animate);
        };

        animate();
    }

    updateStats() {
        let leftHot = 0, leftCold = 0, rightHot = 0, rightCold = 0;

        this.particles.forEach(p => {
            if (p.chamber === 'left') {
                if (p.isHot) leftHot++; else leftCold++;
            } else {
                if (p.isHot) rightHot++; else rightCold++;
            }
        });

        const leftTotal = leftHot + leftCold;
        const rightTotal = rightHot + rightCold;

        const leftTemp = leftTotal > 0 ? Math.round(30 + (leftHot / leftTotal) * 40) : 50;
        const rightTemp = rightTotal > 0 ? Math.round(30 + (rightHot / rightTotal) * 40) : 50;

        this.$('#left-temp').textContent = leftTemp;
        this.$('#right-temp').textContent = rightTemp;

        const tempDiff = Math.abs(leftTemp - rightTemp);
        const entropy = 100 - (tempDiff * 2);
        this.$('#entropy-bar').style.width = Math.max(0, entropy) + '%';

        if (this.demonActive && tempDiff > 15) {
            this.$('#result').innerHTML = `
                <p style="color: #ef4444;"><strong>Second Law Violated!</strong></p>
                <p>The demon has sorted particles: hot on left, cold on right.</p>
                <p>Entropy decreased without work - this seems to break physics!</p>
            `;
        }
    }

    toggleDemon() {
        this.demonActive = !this.demonActive;
        this.$('#demon').classList.toggle('active', this.demonActive);
        this.$('#demon-btn').textContent = this.demonActive ? 'Deactivate Demon' : 'Activate Demon';

        if (this.demonActive) {
            this.$('#result').innerHTML = `
                <p style="color: var(--accent);"><strong>Demon Active!</strong></p>
                <p>The demon opens the gate for cold particles going right, hot particles going left.</p>
                <p>Watch the temperatures separate...</p>
            `;
        }
    }

    mixParticles() {
        this.particles.forEach(p => {
            const newChamber = Math.random() > 0.5 ? 'left' : 'right';
            if (newChamber !== p.chamber) {
                const currentParent = p.element.parentElement;
                const newParent = this.$(newChamber === 'left' ? '#left-chamber' : '#right-chamber');
                currentParent.removeChild(p.element);
                newParent.appendChild(p.element);
                p.chamber = newChamber;
                p.x = Math.random() * 140 + 10;
            }
        });

        this.$('#result').innerHTML = `
            <p>Particles mixed randomly between chambers.</p>
            <p>Activate the demon to sort them without doing work!</p>
        `;
    }

    reset() {
        cancelAnimationFrame(this.animationId);
        this.demonActive = false;
        this.$('#demon').classList.remove('active');
        this.$('#demon-btn').textContent = 'Activate Demon';

        this.particles.forEach(p => p.element.remove());
        this.particles = [];

        this.initParticles();
        this.startSimulation();

        this.$('#result').innerHTML = `
            <p>Particles of different speeds (hot = fast, cold = slow) are mixed randomly.</p>
            <p>Activate the demon to sort them without doing work - violating thermodynamics!</p>
        `;
    }

    cleanup() {
        cancelAnimationFrame(this.animationId);
    }
}

customElements.define('maxwell-demon-simulator', MaxwellDemonSimulator);

export { MaxwellDemonSimulator };
