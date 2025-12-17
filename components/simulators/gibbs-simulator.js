/**
 * Gibbs Paradox Simulator
 * Entropy of mixing identical gases should be zero, yet calculation gives non-zero
 */
import { SimulatorBase } from '../simulator-base.js';

class GibbsSimulator extends SimulatorBase {
    constructor() {
        super();
        this.particles = { left: [], right: [] };
        this.isRunning = false;
        this.animationId = null;
        this.gasType = 'different';
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .gas-selector {
                    margin-top: 1rem;
                    padding: 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                }

                .selector-row {
                    display: flex;
                    gap: 1rem;
                    flex-wrap: wrap;
                }

                .gas-option {
                    flex: 1;
                    min-width: 120px;
                    padding: 1rem;
                    background: var(--bg, #0f172a);
                    border: 2px solid transparent;
                    border-radius: 0.5rem;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .gas-option:hover {
                    border-color: var(--muted, #94a3b8);
                }

                .gas-option.selected {
                    border-color: var(--primary, #6366f1);
                    background: rgba(99, 102, 241, 0.1);
                }

                .gas-icons {
                    font-size: 1.5rem;
                    margin-bottom: 0.5rem;
                }

                .container-display {
                    display: flex;
                    margin-top: 1rem;
                    height: 180px;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    overflow: hidden;
                    position: relative;
                }

                .chamber {
                    flex: 1;
                    position: relative;
                    overflow: hidden;
                }

                .chamber-left {
                    border-right: 3px solid var(--muted, #94a3b8);
                }

                .partition {
                    position: absolute;
                    left: 50%;
                    top: 0;
                    bottom: 0;
                    width: 6px;
                    background: var(--muted, #94a3b8);
                    transform: translateX(-50%);
                    transition: opacity 0.5s;
                    z-index: 10;
                }

                .partition.removed {
                    opacity: 0;
                }

                .particle {
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    transition: background 0.3s;
                }

                .gas-a { background: #ef4444; }
                .gas-b { background: #3b82f6; }
                .gas-identical { background: #22c55e; }

                .entropy-display {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .entropy-box {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .entropy-title {
                    font-size: 0.85rem;
                    color: var(--muted, #94a3b8);
                    margin-bottom: 0.5rem;
                }

                .entropy-value {
                    font-size: 1.5rem;
                    font-weight: bold;
                }

                .positive { color: #f59e0b; }
                .zero { color: #22c55e; }
                .paradox { color: #ef4444; }

                .formula-box {
                    margin-top: 1rem;
                    padding: 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    font-family: monospace;
                    text-align: center;
                }

                .formula {
                    font-size: 1rem;
                    color: var(--primary, #6366f1);
                }

                .chamber-label {
                    position: absolute;
                    bottom: 5px;
                    width: 100%;
                    text-align: center;
                    font-size: 0.7rem;
                    color: var(--muted, #94a3b8);
                }

                @media (max-width: 600px) {
                    .entropy-display {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>Mixing Entropy Paradox</h4>

            <div class="gas-selector">
                <div style="margin-bottom: 0.5rem; font-weight: bold;">Select Gas Types:</div>
                <div class="selector-row">
                    <div class="gas-option selected" id="different-option" data-type="different">
                        <div class="gas-icons">&#x1F534; &#x1F535;</div>
                        <div>Different Gases</div>
                        <div style="font-size: 0.75rem; color: var(--muted);">A and B</div>
                    </div>
                    <div class="gas-option" id="identical-option" data-type="identical">
                        <div class="gas-icons">&#x1F7E2; &#x1F7E2;</div>
                        <div>Identical Gases</div>
                        <div style="font-size: 0.75rem; color: var(--muted);">Same type</div>
                    </div>
                </div>
            </div>

            <div class="container-display" id="container">
                <div class="chamber chamber-left" id="left-chamber">
                    <div class="chamber-label">Chamber A</div>
                </div>
                <div class="partition" id="partition"></div>
                <div class="chamber chamber-right" id="right-chamber">
                    <div class="chamber-label">Chamber B</div>
                </div>
            </div>

            <div class="controls">
                <button id="mix-btn">Remove Partition</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="entropy-display">
                <div class="entropy-box">
                    <div class="entropy-title">Classical Calculation</div>
                    <div class="entropy-value" id="classical-entropy">+2nR ln(2)</div>
                    <div style="font-size: 0.75rem; color: var(--muted); margin-top: 0.25rem;">Always positive</div>
                </div>
                <div class="entropy-box">
                    <div class="entropy-title">Physical Reality</div>
                    <div class="entropy-value" id="real-entropy">+2nR ln(2)</div>
                    <div style="font-size: 0.75rem; color: var(--muted); margin-top: 0.25rem;" id="reality-note">Mixing occurs</div>
                </div>
            </div>

            <div class="formula-box">
                <div style="margin-bottom: 0.5rem;">Entropy of Mixing:</div>
                <div class="formula" id="formula">dS = -nR(x_A ln(x_A) + x_B ln(x_B))</div>
            </div>

            <div class="result" id="result">
                <p>Two chambers contain gas at the same temperature and pressure.</p>
                <p>Remove the partition to mix them. What happens to entropy?</p>
            </div>

            <div class="insight">
                Classical thermodynamics predicts entropy increase for ANY mixing. But mixing identical gases should produce no change - we can't tell the difference! Gibbs resolved this by treating identical particles as fundamentally indistinguishable, a key insight for quantum mechanics.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#mix-btn').addEventListener('click', () => this.mix());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
        this.$('#different-option').addEventListener('click', () => this.selectGasType('different'));
        this.$('#identical-option').addEventListener('click', () => this.selectGasType('identical'));
    }

    connectedCallback() {
        super.connectedCallback();
        this.initParticles();
    }

    selectGasType(type) {
        this.gasType = type;
        this.$('#different-option').classList.toggle('selected', type === 'different');
        this.$('#identical-option').classList.toggle('selected', type === 'identical');
        this.reset();
    }

    initParticles() {
        const leftChamber = this.$('#left-chamber');
        const rightChamber = this.$('#right-chamber');

        const existingLeft = leftChamber.querySelectorAll('.particle');
        const existingRight = rightChamber.querySelectorAll('.particle');
        existingLeft.forEach(p => p.remove());
        existingRight.forEach(p => p.remove());

        this.particles = { left: [], right: [] };

        for (let i = 0; i < 12; i++) {
            const leftParticle = {
                element: document.createElement('div'),
                x: 10 + Math.random() * 120,
                y: 20 + Math.random() * 130,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2
            };

            leftParticle.element.className = `particle ${this.gasType === 'identical' ? 'gas-identical' : 'gas-a'}`;
            leftParticle.element.style.left = leftParticle.x + 'px';
            leftParticle.element.style.top = leftParticle.y + 'px';
            leftChamber.appendChild(leftParticle.element);
            this.particles.left.push(leftParticle);

            const rightParticle = {
                element: document.createElement('div'),
                x: 10 + Math.random() * 120,
                y: 20 + Math.random() * 130,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2
            };

            rightParticle.element.className = `particle ${this.gasType === 'identical' ? 'gas-identical' : 'gas-b'}`;
            rightParticle.element.style.left = rightParticle.x + 'px';
            rightParticle.element.style.top = rightParticle.y + 'px';
            rightChamber.appendChild(rightParticle.element);
            this.particles.right.push(rightParticle);
        }

        this.startAnimation();
    }

    startAnimation() {
        const animate = () => {
            const chamberWidth = 145;
            const chamberHeight = 160;

            [...this.particles.left, ...this.particles.right].forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 5) { p.x = 5; p.vx *= -1; }
                if (p.x > chamberWidth - 15) { p.x = chamberWidth - 15; p.vx *= -1; }
                if (p.y < 5) { p.y = 5; p.vy *= -1; }
                if (p.y > chamberHeight - 15) { p.y = chamberHeight - 15; p.vy *= -1; }

                p.element.style.left = p.x + 'px';
                p.element.style.top = p.y + 'px';
            });

            this.animationId = requestAnimationFrame(animate);
        };

        animate();
    }

    mix() {
        this.$('#partition').classList.add('removed');

        const leftChamber = this.$('#left-chamber');
        const rightChamber = this.$('#right-chamber');

        setTimeout(() => {
            this.particles.left.forEach(p => {
                if (Math.random() > 0.5) {
                    leftChamber.removeChild(p.element);
                    rightChamber.appendChild(p.element);
                }
            });

            this.particles.right.forEach(p => {
                if (Math.random() > 0.5) {
                    rightChamber.removeChild(p.element);
                    leftChamber.appendChild(p.element);
                }
            });
        }, 500);

        if (this.gasType === 'different') {
            this.$('#classical-entropy').textContent = '+2nR ln(2)';
            this.$('#classical-entropy').className = 'entropy-value positive';
            this.$('#real-entropy').textContent = '+2nR ln(2)';
            this.$('#real-entropy').className = 'entropy-value positive';
            this.$('#reality-note').textContent = 'Real mixing occurs';

            this.$('#result').innerHTML = `
                <p style="color: var(--accent);"><strong>Different gases mixed!</strong></p>
                <p>Entropy increased: the gases are now dispersed.</p>
                <p>This is real, measurable mixing - reversing it requires work.</p>
            `;
        } else {
            this.$('#classical-entropy').textContent = '+2nR ln(2)';
            this.$('#classical-entropy').className = 'entropy-value paradox';
            this.$('#real-entropy').textContent = '0';
            this.$('#real-entropy').className = 'entropy-value zero';
            this.$('#reality-note').textContent = 'No physical change!';

            this.$('#result').innerHTML = `
                <p style="color: #ef4444;"><strong>The Gibbs Paradox!</strong></p>
                <p>Classical formula says: +2nR ln(2)</p>
                <p>Physical reality: ZERO change!</p>
                <p style="color: var(--accent);">If we can't distinguish the particles, did any "mixing" really occur?</p>
            `;
        }
    }

    reset() {
        cancelAnimationFrame(this.animationId);
        this.$('#partition').classList.remove('removed');

        this.$('#classical-entropy').textContent = '+2nR ln(2)';
        this.$('#classical-entropy').className = 'entropy-value positive';
        this.$('#real-entropy').textContent = this.gasType === 'identical' ? '???' : '+2nR ln(2)';
        this.$('#real-entropy').className = 'entropy-value';
        this.$('#reality-note').textContent = this.gasType === 'identical' ? 'What should it be?' : 'Mixing occurs';

        this.initParticles();

        this.$('#result').innerHTML = `
            <p>Two chambers contain ${this.gasType === 'identical' ? 'identical' : 'different'} gas at the same temperature and pressure.</p>
            <p>Remove the partition to mix them. What happens to entropy?</p>
        `;
    }

    cleanup() {
        cancelAnimationFrame(this.animationId);
    }
}

customElements.define('gibbs-simulator', GibbsSimulator);

export { GibbsSimulator };
