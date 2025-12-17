import { SimulatorBase } from '../simulator-base.js';

class AristotleWheelSimulator extends SimulatorBase {
    constructor() {
        super();
        this.rolling = false;
        this.animationFrame = null;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .wheel-container {
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    padding: 2rem 1rem;
                    margin: 1rem 0;
                    position: relative;
                    overflow: hidden;
                    height: 200px;
                }

                .wheel-assembly {
                    position: absolute;
                    left: 50px;
                    bottom: 30px;
                    transition: left 2s linear;
                }

                .wheel-assembly.rolled {
                    left: calc(100% - 150px);
                }

                .outer-wheel {
                    width: 100px;
                    height: 100px;
                    border: 4px solid var(--primary, #6366f1);
                    border-radius: 50%;
                    position: relative;
                }

                .inner-wheel {
                    width: 50px;
                    height: 50px;
                    border: 4px solid var(--accent, #f59e0b);
                    border-radius: 50%;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }

                .center-dot {
                    width: 8px;
                    height: 8px;
                    background: white;
                    border-radius: 50%;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }

                .wheel-marker {
                    position: absolute;
                    width: 4px;
                    height: 20px;
                    background: var(--primary, #6366f1);
                    top: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    transform-origin: bottom center;
                }

                .inner-marker {
                    position: absolute;
                    width: 3px;
                    height: 10px;
                    background: var(--accent, #f59e0b);
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -25px);
                    transform-origin: center bottom;
                }

                .track-outer {
                    position: absolute;
                    bottom: 28px;
                    left: 50px;
                    right: 50px;
                    height: 4px;
                    background: var(--primary, #6366f1);
                    opacity: 0.5;
                }

                .track-inner {
                    position: absolute;
                    bottom: 53px;
                    left: 50px;
                    right: 50px;
                    height: 4px;
                    background: var(--accent, #f59e0b);
                    opacity: 0.5;
                }

                .distance-labels {
                    position: absolute;
                    bottom: 5px;
                    left: 50px;
                    right: 50px;
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.7rem;
                    color: var(--muted, #94a3b8);
                }

                .measurements {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .measure-box {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .measure-value {
                    font-size: 1.5rem;
                    font-weight: bold;
                }

                .measure-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }

                .explanation-tabs {
                    display: flex;
                    gap: 0.5rem;
                    margin-top: 1rem;
                }

                .explanation-tabs button {
                    flex: 1;
                    font-size: 0.875rem;
                }

                .explanation-tabs button.active {
                    background: var(--accent, #f59e0b);
                }
            </style>

            <h4>Aristotle's Wheel</h4>
            <p style="color: var(--muted); margin-bottom: 1rem;">Two concentric circles roll together. The inner circle has half the circumference but travels the same distance!</p>

            <div class="wheel-container">
                <div class="track-outer"></div>
                <div class="track-inner"></div>
                <div class="wheel-assembly" id="wheel">
                    <div class="outer-wheel">
                        <div class="wheel-marker"></div>
                        <div class="inner-wheel">
                            <div class="inner-marker"></div>
                        </div>
                        <div class="center-dot"></div>
                    </div>
                </div>
                <div class="distance-labels">
                    <span>Start</span>
                    <span>One Full Rotation</span>
                </div>
            </div>

            <div class="controls">
                <button id="roll-btn">Roll Wheel</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="measurements">
                <div class="measure-box">
                    <div class="measure-value" style="color: var(--primary);" id="outer-dist">0</div>
                    <div class="measure-label">Outer Circle Distance (2 * pi * R)</div>
                </div>
                <div class="measure-box">
                    <div class="measure-value" style="color: var(--accent);" id="inner-dist">0</div>
                    <div class="measure-label">Inner Circle "Distance" (2 * pi * r)</div>
                </div>
            </div>

            <div class="explanation-tabs">
                <button id="tab-paradox" class="active">The Paradox</button>
                <button id="tab-resolution">Resolution</button>
            </div>

            <div class="result" id="result">
                <p>The outer circle (radius R) rolls one full rotation, traveling distance 2 * pi * R.</p>
                <p>The inner circle (radius r = R/2) also completes one rotation, but its circumference is only 2 * pi * r = half the distance!</p>
                <p><strong>How can both circles travel different distances while attached?</strong></p>
            </div>

            <div class="insight">
                The inner circle is NOT truly "rolling" - it's being dragged. It would need to slip or skid to keep up. Only the outer circle rolls without slipping. The inner circle's "path" involves sliding, not pure rolling.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#roll-btn').addEventListener('click', () => this.roll());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
        this.$('#tab-paradox').addEventListener('click', () => this.showTab('paradox'));
        this.$('#tab-resolution').addEventListener('click', () => this.showTab('resolution'));
    }

    roll() {
        if (this.rolling) return;
        this.rolling = true;

        const wheel = this.$('#wheel');
        wheel.classList.add('rolled');

        let progress = 0;
        const duration = 2000;
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            progress = Math.min(elapsed / duration, 1);

            const outerDist = (2 * Math.PI * 50 * progress).toFixed(0);
            const innerDist = (2 * Math.PI * 25 * progress).toFixed(0);

            this.$('#outer-dist').textContent = outerDist + ' px';
            this.$('#inner-dist').textContent = innerDist + ' px';

            if (progress < 1) {
                this.animationFrame = requestAnimationFrame(animate);
            } else {
                this.$('#outer-dist').textContent = '314 px';
                this.$('#inner-dist').textContent = '157 px';
            }
        };

        animate();
    }

    showTab(tab) {
        this.$$('.explanation-tabs button').forEach(btn => btn.classList.remove('active'));
        this.$(`#tab-${tab}`).classList.add('active');

        if (tab === 'paradox') {
            this.$('#result').innerHTML = `
                <p>The outer circle (radius R) rolls one full rotation, traveling distance 2 * pi * R.</p>
                <p>The inner circle (radius r = R/2) also completes one rotation, but its circumference is only 2 * pi * r = half the distance!</p>
                <p><strong>How can both circles travel different distances while attached?</strong></p>
            `;
        } else {
            this.$('#result').innerHTML = `
                <p><strong>Resolution:</strong> The inner circle does NOT roll - it slides!</p>
                <p>Imagine the inner circle had its own track. To roll without slipping on that track, it would only travel half the distance.</p>
                <p>But since it's attached to the outer circle, it's forced to travel the full distance by <em>slipping</em> along its track.</p>
                <p>Pure rolling = distance equals circumference. The inner circle cannot satisfy this - it's dragged, not rolled.</p>
            `;
        }
    }

    reset() {
        this.rolling = false;
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }

        const wheel = this.$('#wheel');
        wheel.classList.remove('rolled');

        this.$('#outer-dist').textContent = '0';
        this.$('#inner-dist').textContent = '0';
    }

    cleanup() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }
}

customElements.define('aristotle-wheel-simulator', AristotleWheelSimulator);

export { AristotleWheelSimulator };
