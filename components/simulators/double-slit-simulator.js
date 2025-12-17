/**
 * Double-Slit Experiment Simulator
 * Particles behave as waves when unobserved, particles when observed
 */
import { SimulatorBase } from '../simulator-base.js';

class DoubleSlitSimulator extends SimulatorBase {
    constructor() {
        super();
        this.isObserving = false;
        this.particles = [];
        this.animationId = null;
        this.isFiring = false;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .experiment-container {
                    position: relative;
                    height: 250px;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                    overflow: hidden;
                }

                .source {
                    position: absolute;
                    left: 20px;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 40px;
                    height: 60px;
                    background: var(--card, #1e293b);
                    border: 2px solid var(--primary, #6366f1);
                    border-radius: 0.25rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                }

                .barrier {
                    position: absolute;
                    left: 45%;
                    top: 0;
                    width: 8px;
                    height: 100%;
                    background: var(--muted, #94a3b8);
                }

                .slit {
                    position: absolute;
                    left: 0;
                    width: 100%;
                    height: 30px;
                    background: var(--bg, #0f172a);
                }

                .slit-top { top: 35%; }
                .slit-bottom { top: 55%; }

                .detector {
                    position: absolute;
                    right: 20px;
                    top: 0;
                    width: 60px;
                    height: 100%;
                    background: var(--card, #1e293b);
                    border-left: 2px solid var(--accent, #f59e0b);
                }

                .detector-label {
                    position: absolute;
                    right: 25px;
                    bottom: 5px;
                    font-size: 0.7rem;
                    color: var(--muted, #94a3b8);
                }

                .particle {
                    position: absolute;
                    width: 6px;
                    height: 6px;
                    background: var(--primary, #6366f1);
                    border-radius: 50%;
                    transition: none;
                }

                .wave-particle {
                    width: 20px;
                    height: 20px;
                    background: radial-gradient(circle, var(--primary, #6366f1) 30%, transparent 70%);
                    opacity: 0.6;
                }

                .hit-mark {
                    position: absolute;
                    width: 3px;
                    height: 3px;
                    background: var(--accent, #f59e0b);
                    border-radius: 50%;
                }

                .observer {
                    position: absolute;
                    left: 48%;
                    top: 10px;
                    font-size: 1.5rem;
                    opacity: 0.3;
                    transition: opacity 0.3s;
                }

                .observer.active {
                    opacity: 1;
                    animation: watching 0.5s infinite;
                }

                @keyframes watching {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }

                .pattern-display {
                    display: flex;
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .pattern-box {
                    flex: 1;
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .pattern-title {
                    font-size: 0.9rem;
                    color: var(--muted, #94a3b8);
                    margin-bottom: 0.5rem;
                }

                .pattern-visual {
                    height: 60px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 2px;
                }

                .band {
                    width: 8px;
                    background: var(--accent, #f59e0b);
                    border-radius: 2px;
                }

                .interference .band:nth-child(odd) { height: 50px; opacity: 1; }
                .interference .band:nth-child(even) { height: 20px; opacity: 0.3; }

                .particle-pattern .band { height: 40px; opacity: 0.8; }
                .particle-pattern .band:nth-child(3),
                .particle-pattern .band:nth-child(7) { height: 50px; opacity: 1; }

                @media (max-width: 600px) {
                    .pattern-display {
                        flex-direction: column;
                    }
                }
            </style>

            <h4>Wave-Particle Duality</h4>

            <div class="controls">
                <button id="fire-btn">Fire Particles</button>
                <button id="observe-btn">Toggle Observer</button>
                <button id="reset-btn">Clear Screen</button>
            </div>

            <div class="experiment-container" id="experiment">
                <div class="source">&#x1F52B;</div>
                <div class="barrier">
                    <div class="slit slit-top"></div>
                    <div class="slit slit-bottom"></div>
                </div>
                <div class="observer" id="observer">&#x1F441;</div>
                <div class="detector" id="detector"></div>
                <div class="detector-label">Screen</div>
            </div>

            <div class="pattern-display">
                <div class="pattern-box">
                    <div class="pattern-title">Unobserved (Wave)</div>
                    <div class="pattern-visual interference">
                        <div class="band"></div>
                        <div class="band"></div>
                        <div class="band"></div>
                        <div class="band"></div>
                        <div class="band"></div>
                        <div class="band"></div>
                        <div class="band"></div>
                        <div class="band"></div>
                        <div class="band"></div>
                    </div>
                    <div style="font-size: 0.8rem; color: var(--muted); margin-top: 0.5rem;">Interference pattern</div>
                </div>
                <div class="pattern-box">
                    <div class="pattern-title">Observed (Particle)</div>
                    <div class="pattern-visual particle-pattern">
                        <div class="band"></div>
                        <div class="band"></div>
                        <div class="band"></div>
                        <div class="band"></div>
                        <div class="band"></div>
                        <div class="band"></div>
                        <div class="band"></div>
                        <div class="band"></div>
                        <div class="band"></div>
                    </div>
                    <div style="font-size: 0.8rem; color: var(--muted); margin-top: 0.5rem;">Two bands</div>
                </div>
            </div>

            <div class="result" id="result">
                <p><strong>Observer: OFF</strong> - Particles behave as waves, creating interference.</p>
                <p>Toggle the observer to see particles "choose" one slit when watched!</p>
            </div>

            <div class="insight">
                The act of observation changes the outcome. When we know which slit the particle goes through, the interference pattern vanishes. The particle seems to "know" if it's being watched!
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#fire-btn').addEventListener('click', () => this.fireParticles());
        this.$('#observe-btn').addEventListener('click', () => this.toggleObserver());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
    }

    toggleObserver() {
        this.isObserving = !this.isObserving;
        const observer = this.$('#observer');
        observer.classList.toggle('active', this.isObserving);

        this.$('#result').innerHTML = this.isObserving
            ? `<p><strong>Observer: ON</strong> - Now watching which slit each particle passes through.</p>
               <p style="color: var(--accent);">Particles must "choose" - wave behavior collapses!</p>`
            : `<p><strong>Observer: OFF</strong> - Particles behave as waves, creating interference.</p>
               <p>Toggle the observer to see particles "choose" one slit when watched!</p>`;
    }

    fireParticles() {
        if (this.isFiring) return;
        this.isFiring = true;

        let count = 0;
        const maxParticles = 30;

        const fire = () => {
            if (count >= maxParticles) {
                this.isFiring = false;
                return;
            }

            this.createParticle();
            count++;
            setTimeout(fire, 100);
        };

        fire();
    }

    createParticle() {
        const container = this.$('#experiment');
        const detector = this.$('#detector');

        const particle = document.createElement('div');
        particle.className = this.isObserving ? 'particle' : 'particle wave-particle';

        const startY = 125;
        particle.style.left = '70px';
        particle.style.top = startY + 'px';
        container.appendChild(particle);

        let x = 70;
        const slitY1 = 87.5 + 15;
        const slitY2 = 137.5 + 15;

        const animate = () => {
            x += 4;
            particle.style.left = x + 'px';

            if (x > 220) {
                particle.remove();

                const hit = document.createElement('div');
                hit.className = 'hit-mark';

                let hitY;
                if (this.isObserving) {
                    const goesTop = Math.random() > 0.5;
                    hitY = goesTop
                        ? slitY1 + (Math.random() - 0.5) * 30
                        : slitY2 + (Math.random() - 0.5) * 30;
                } else {
                    const bands = [-60, -40, -20, 0, 20, 40, 60];
                    const weights = [0.1, 0.3, 0.7, 1, 0.7, 0.3, 0.1];
                    let r = Math.random();
                    let bandIndex = 0;
                    for (let i = 0; i < weights.length; i++) {
                        if (Math.random() < weights[i]) {
                            bandIndex = i;
                            break;
                        }
                    }
                    hitY = 125 + bands[bandIndex] + (Math.random() - 0.5) * 15;
                }

                hit.style.top = Math.max(10, Math.min(240, hitY)) + 'px';
                hit.style.right = (5 + Math.random() * 50) + 'px';
                detector.appendChild(hit);

                return;
            }

            requestAnimationFrame(animate);
        };

        animate();
    }

    reset() {
        const detector = this.$('#detector');
        const hits = detector.querySelectorAll('.hit-mark');
        hits.forEach(h => h.remove());

        const container = this.$('#experiment');
        const particles = container.querySelectorAll('.particle');
        particles.forEach(p => p.remove());
    }

    cleanup() {
        cancelAnimationFrame(this.animationId);
    }
}

customElements.define('double-slit-simulator', DoubleSlitSimulator);

export { DoubleSlitSimulator };
