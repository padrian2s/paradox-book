/**
 * Dome Paradox Simulator
 * A ball on Norton's dome can spontaneously start moving
 */
import { SimulatorBase } from '../simulator-base.js';

class DomeSimulator extends SimulatorBase {
    constructor() {
        super();
        this.animating = false;
        this.animationFrame = null;
        this.waitTimeout = null;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .canvas-container {
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    padding: 1rem;
                    display: flex;
                    justify-content: center;
                    margin: 1rem 0;
                }

                canvas {
                    display: block;
                }

                .physics-info {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    margin: 1rem 0;
                }

                .info-box {
                    padding: 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                }

                .info-title {
                    font-weight: bold;
                    font-size: 0.875rem;
                    margin-bottom: 0.5rem;
                    color: var(--text, #e2e8f0);
                }

                .info-content {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }

                .equation {
                    font-family: 'Times New Roman', serif;
                    font-style: italic;
                    text-align: center;
                    padding: 0.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.25rem;
                    margin-top: 0.5rem;
                }
            </style>

            <h4>Norton's Dome</h4>

            <div class="controls">
                <button id="start-btn">Wait for Motion</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="canvas-container">
                <canvas id="dome-canvas" width="300" height="200"></canvas>
            </div>

            <div class="result" id="dome-result">
                <p>The ball is perfectly balanced at the apex...</p>
            </div>

            <div class="physics-info">
                <div class="info-box">
                    <div class="info-title">The Dome Shape</div>
                    <div class="info-content">
                        Norton's dome has a special shape where the height is proportional to r^(3/2). This creates a surface where Newton's equations have multiple solutions.
                    </div>
                    <div class="equation">h = (2/3g)r^(3/2)</div>
                </div>
                <div class="info-box">
                    <div class="info-title">The Paradox</div>
                    <div class="info-content">
                        For a ball at the apex, Newton's F=ma has infinitely many solutions: the ball can remain still, or start moving at any time T without any cause!
                    </div>
                    <div class="equation">r(t) = (1/144)(t-T)^4 for t > T</div>
                </div>
            </div>

            <div class="insight">
                Norton's dome challenges the assumption that Newtonian mechanics is deterministic. The ball's motion is not caused by anything - it's a genuine case of uncaused causation within classical physics.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#start-btn').addEventListener('click', () => this.startDome());
        this.$('#reset-btn').addEventListener('click', () => this.resetDome());
        setTimeout(() => this.drawDome(150), 100);
    }

    drawDome(ballX) {
        const canvas = this.$('#dome-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(50, 180);
        ctx.quadraticCurveTo(150, 30, 250, 180);
        ctx.stroke();

        const normalizedX = (ballX - 150) / 100;
        const ballY = 50 + Math.pow(Math.abs(normalizedX), 1.5) * 130;

        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(ballX, ballY, 12, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(245, 158, 11, 0.3)';
        ctx.beginPath();
        ctx.arc(ballX, ballY, 8, 0, Math.PI * 2);
        ctx.fill();
    }

    startDome() {
        if (this.animating) return;
        this.animating = true;

        this.$('#dome-result').innerHTML = '<p>Waiting... at any moment T >= 0, the ball may spontaneously move...</p>';

        const waitTime = Math.random() * 3000 + 1000;

        this.waitTimeout = setTimeout(() => {
            let ballX = 150;
            let velocity = 0;

            const animate = () => {
                if (ballX < 250) {
                    velocity += 0.1;
                    ballX += velocity;
                    this.drawDome(ballX);
                    this.animationFrame = requestAnimationFrame(animate);
                } else {
                    this.animating = false;
                    this.$('#dome-result').innerHTML = '<p style="color: var(--accent);"><strong>The ball moved!</strong> But nothing caused it - this motion is allowed by Newton\'s equations. The ball could have stayed forever, or moved at any other moment T.</p>';
                }
            };

            animate();
        }, waitTime);
    }

    resetDome() {
        this.animating = false;
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        if (this.waitTimeout) {
            clearTimeout(this.waitTimeout);
        }
        this.drawDome(150);
        this.$('#dome-result').innerHTML = '<p>The ball is perfectly balanced at the apex...</p>';
    }

    cleanup() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        if (this.waitTimeout) {
            clearTimeout(this.waitTimeout);
        }
    }
}

customElements.define('dome-simulator', DomeSimulator);

export { DomeSimulator };
