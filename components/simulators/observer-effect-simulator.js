import { SimulatorBase } from '../simulator-base.js';

class ObserverEffectSimulator extends SimulatorBase {
    constructor() {
        super();
        this.isObserving = false;
        this.particles = [];
        this.animationFrame = null;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .experiment-container {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                }

                .particle-box {
                    width: 100%;
                    height: 200px;
                    background: #0a0a0a;
                    border-radius: 0.5rem;
                    position: relative;
                    overflow: hidden;
                    border: 2px solid var(--muted, #94a3b8);
                }

                .particle {
                    position: absolute;
                    width: 12px;
                    height: 12px;
                    background: var(--primary, #6366f1);
                    border-radius: 50%;
                    transition: all 0.1s ease;
                    box-shadow: 0 0 10px var(--primary, #6366f1);
                }

                .particle.wave {
                    width: 60px;
                    height: 8px;
                    border-radius: 4px;
                    background: linear-gradient(90deg, transparent, var(--primary, #6366f1), transparent);
                    animation: wave-motion 1s ease-in-out infinite;
                }

                @keyframes wave-motion {
                    0%, 100% { transform: scaleX(1); }
                    50% { transform: scaleX(1.2); }
                }

                .observer-icon {
                    position: absolute;
                    right: 10px;
                    top: 10px;
                    font-size: 2rem;
                    transition: all 0.3s ease;
                    opacity: 0.3;
                }

                .observer-icon.active {
                    opacity: 1;
                    animation: observe-pulse 1s infinite;
                }

                @keyframes observe-pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }

                .measurement-beam {
                    position: absolute;
                    width: 100%;
                    height: 2px;
                    background: linear-gradient(90deg, transparent, #22c55e, transparent);
                    top: 50%;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .measurement-beam.active {
                    opacity: 0.5;
                    animation: scan 2s linear infinite;
                }

                @keyframes scan {
                    0% { transform: translateY(-80px); }
                    100% { transform: translateY(80px); }
                }

                .state-indicator {
                    display: flex;
                    justify-content: space-around;
                    margin-top: 1rem;
                    padding: 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                }

                .state-box {
                    text-align: center;
                    padding: 0.5rem 1rem;
                    border-radius: 0.5rem;
                    transition: all 0.3s ease;
                }

                .state-box.active {
                    background: var(--primary, #6366f1);
                }

                .state-icon {
                    font-size: 1.5rem;
                    margin-bottom: 0.25rem;
                }

                .state-label {
                    font-size: 0.75rem;
                    color: var(--text, #e2e8f0);
                }

                .example-panel {
                    margin-top: 1rem;
                    padding: 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                }

                .example-title {
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                    margin-bottom: 0.5rem;
                }

                .example-list {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                }

                .example-list li {
                    margin: 0.5rem 0;
                }
            </style>

            <h4>Observer Effect Simulator</h4>
            <p style="color: var(--muted); margin-bottom: 1rem;">Measurement disturbs the system being measured.</p>

            <div class="controls">
                <button id="observe-btn">Start Observing</button>
                <button id="stop-btn">Stop Observing</button>
            </div>

            <div class="experiment-container">
                <div class="particle-box" id="particle-box">
                    <div class="observer-icon" id="observer-icon">&#x1F441;</div>
                    <div class="measurement-beam" id="measurement-beam"></div>
                </div>

                <div class="state-indicator">
                    <div class="state-box" id="state-wave">
                        <div class="state-icon">&#x1F30A;</div>
                        <div class="state-label">Wave-like<br>(Unobserved)</div>
                    </div>
                    <div class="state-box" id="state-particle">
                        <div class="state-icon">&#x26AB;</div>
                        <div class="state-label">Particle-like<br>(Observed)</div>
                    </div>
                </div>
            </div>

            <div class="result" id="result">
                <p>Without observation, particles behave as waves - spread out and probabilistic.</p>
                <p>Click "Start Observing" to see what happens when we measure them.</p>
            </div>

            <div class="example-panel">
                <div class="example-title">Real-World Examples:</div>
                <ul class="example-list">
                    <li><strong>Double-slit experiment:</strong> Electrons create interference pattern unless you watch which slit they go through</li>
                    <li><strong>Heisenberg's microscope:</strong> Photons used to see a particle change its momentum</li>
                    <li><strong>Social science:</strong> People behave differently when they know they're being studied (Hawthorne effect)</li>
                </ul>
            </div>

            <div class="insight">
                The paradox: To learn about a system, we must interact with it. But interaction changes the system. So we can never observe the "true" undisturbed state.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#observe-btn').addEventListener('click', () => this.startObserving());
        this.$('#stop-btn').addEventListener('click', () => this.stopObserving());
        this.initParticles();
    }

    initParticles() {
        const box = this.$('#particle-box');
        this.particles = [];

        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle wave';
            particle.style.left = (20 + i * 15) + '%';
            particle.style.top = (30 + Math.random() * 40) + '%';
            box.appendChild(particle);
            this.particles.push({
                element: particle,
                baseX: 20 + i * 15,
                baseY: 30 + Math.random() * 40,
                phase: Math.random() * Math.PI * 2
            });
        }

        this.animateWaves();
        this.$('#state-wave').classList.add('active');
    }

    animateWaves() {
        if (!this.isObserving) {
            const time = Date.now() / 1000;
            this.particles.forEach((p, i) => {
                const offsetY = Math.sin(time * 2 + p.phase) * 10;
                const offsetX = Math.cos(time * 1.5 + p.phase) * 5;
                p.element.style.top = (p.baseY + offsetY) + '%';
                p.element.style.left = (p.baseX + offsetX) + '%';
            });
        }
        this.animationFrame = requestAnimationFrame(() => this.animateWaves());
    }

    startObserving() {
        this.isObserving = true;

        this.$('#observer-icon').classList.add('active');
        this.$('#measurement-beam').classList.add('active');

        this.particles.forEach(p => {
            p.element.classList.remove('wave');
            p.element.style.left = p.baseX + '%';
            p.element.style.top = (40 + Math.random() * 20) + '%';
        });

        this.$('#state-wave').classList.remove('active');
        this.$('#state-particle').classList.add('active');

        this.$('#result').innerHTML = `
            <p style="color: var(--accent);"><strong>STATE COLLAPSED!</strong></p>
            <p>The act of measurement forced each particle to "choose" a definite position.</p>
            <p>We gained information, but destroyed the wave-like quantum behavior.</p>
        `;
    }

    stopObserving() {
        this.isObserving = false;

        this.$('#observer-icon').classList.remove('active');
        this.$('#measurement-beam').classList.remove('active');

        this.particles.forEach(p => {
            p.element.classList.add('wave');
        });

        this.$('#state-particle').classList.remove('active');
        this.$('#state-wave').classList.add('active');

        this.$('#result').innerHTML = `
            <p>Without observation, particles return to wave-like behavior.</p>
            <p>They exist in superposition - everywhere at once until measured.</p>
        `;
    }

    cleanup() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }
}

customElements.define('observer-effect-simulator', ObserverEffectSimulator);

export { ObserverEffectSimulator };
