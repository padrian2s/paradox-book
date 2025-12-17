import { SimulatorBase } from '../simulator-base.js';

class LombardParadoxSimulator extends SimulatorBase {
    constructor() {
        super();
        this.squatAngle = 90;
        this.animating = false;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .body-diagram {
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    padding: 1rem;
                    margin-top: 1rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 300px;
                }

                .leg-container {
                    position: relative;
                    width: 200px;
                    height: 280px;
                }

                .body-part {
                    position: absolute;
                    background: var(--card, #1e293b);
                    border: 2px solid var(--primary, #6366f1);
                    border-radius: 8px;
                    transition: all 0.3s ease;
                }

                .torso {
                    width: 60px;
                    height: 80px;
                    left: 70px;
                    top: 0;
                    transform-origin: bottom center;
                }

                .thigh {
                    width: 30px;
                    height: 90px;
                    left: 85px;
                    top: 75px;
                    transform-origin: top center;
                    background: linear-gradient(90deg, var(--card, #1e293b) 50%, rgba(239, 68, 68, 0.3) 50%);
                }

                .shin {
                    width: 25px;
                    height: 85px;
                    left: 87px;
                    top: 160px;
                    transform-origin: top center;
                    background: linear-gradient(90deg, rgba(34, 197, 94, 0.3) 50%, var(--card, #1e293b) 50%);
                }

                .foot {
                    width: 50px;
                    height: 15px;
                    left: 75px;
                    top: 240px;
                }

                .muscle-indicator {
                    position: absolute;
                    padding: 0.25rem 0.5rem;
                    border-radius: 0.25rem;
                    font-size: 0.7rem;
                    font-weight: bold;
                    white-space: nowrap;
                }

                .quad-indicator {
                    background: rgba(239, 68, 68, 0.8);
                    color: white;
                    right: -80px;
                    top: 100px;
                }

                .ham-indicator {
                    background: rgba(34, 197, 94, 0.8);
                    color: white;
                    left: -80px;
                    top: 120px;
                }

                .activation-bars {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    margin-top: 1.5rem;
                }

                .activation-card {
                    background: var(--bg, #0f172a);
                    padding: 1rem;
                    border-radius: 0.5rem;
                }

                .muscle-name {
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .muscle-dot {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                }

                .bar-track {
                    height: 20px;
                    background: var(--card, #1e293b);
                    border-radius: 4px;
                    overflow: hidden;
                }

                .bar-fill {
                    height: 100%;
                    transition: width 0.3s;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    padding-right: 0.5rem;
                    font-size: 0.75rem;
                    color: white;
                    font-weight: bold;
                }

                .quad-bar {
                    background: linear-gradient(90deg, #ef4444, #dc2626);
                }

                .ham-bar {
                    background: linear-gradient(90deg, #22c55e, #16a34a);
                }

                .angle-display {
                    text-align: center;
                    margin-top: 1rem;
                }

                .angle-value {
                    font-size: 2rem;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                }

                .phase-indicator {
                    background: var(--card, #1e293b);
                    padding: 0.75rem;
                    border-radius: 0.5rem;
                    text-align: center;
                    margin-top: 1rem;
                }

                .joint-forces {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 0.5rem;
                    margin-top: 1rem;
                }

                .joint-box {
                    background: var(--bg, #0f172a);
                    padding: 0.5rem;
                    border-radius: 0.5rem;
                    text-align: center;
                    font-size: 0.75rem;
                }

                .joint-name {
                    color: var(--muted, #94a3b8);
                }

                .joint-action {
                    font-weight: bold;
                    color: var(--primary, #6366f1);
                    margin-top: 0.25rem;
                }

                @media (max-width: 768px) {
                    .activation-bars {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>Squat Muscle Activation</h4>
            <p style="color: var(--muted, #94a3b8); margin-bottom: 1rem;">Adjust knee angle and watch both antagonist muscles contract simultaneously.</p>

            <div class="controls">
                <div class="control-group">
                    <label>Knee Angle: <span id="angle-val">90</span>deg</label>
                    <input type="range" id="angle-slider" min="30" max="180" value="90">
                </div>
                <button id="squat-btn">Animate Squat</button>
            </div>

            <div class="body-diagram">
                <div class="leg-container">
                    <div class="body-part torso" id="torso"></div>
                    <div class="body-part thigh" id="thigh"></div>
                    <div class="body-part shin" id="shin"></div>
                    <div class="body-part foot"></div>
                    <div class="muscle-indicator quad-indicator">QUAD<br><span id="quad-pct">70%</span></div>
                    <div class="muscle-indicator ham-indicator">HAM<br><span id="ham-pct">60%</span></div>
                </div>
            </div>

            <div class="angle-display">
                <div class="angle-value" id="current-angle">90deg</div>
                <div style="color: var(--muted); font-size: 0.875rem;">Knee Flexion</div>
            </div>

            <div class="activation-bars">
                <div class="activation-card">
                    <div class="muscle-name">
                        <div class="muscle-dot" style="background: #ef4444;"></div>
                        Quadriceps
                    </div>
                    <div class="bar-track">
                        <div class="bar-fill quad-bar" id="quad-bar" style="width: 70%;">70%</div>
                    </div>
                    <div style="font-size: 0.7rem; color: var(--muted); margin-top: 0.25rem;">Extends knee joint</div>
                </div>
                <div class="activation-card">
                    <div class="muscle-name">
                        <div class="muscle-dot" style="background: #22c55e;"></div>
                        Hamstrings
                    </div>
                    <div class="bar-track">
                        <div class="bar-fill ham-bar" id="ham-bar" style="width: 60%;">60%</div>
                    </div>
                    <div style="font-size: 0.7rem; color: var(--muted); margin-top: 0.25rem;">Flexes knee joint</div>
                </div>
            </div>

            <div class="phase-indicator" id="phase">
                <strong>Deep Squat Position</strong> - Both muscles highly active!
            </div>

            <div class="joint-forces">
                <div class="joint-box">
                    <div class="joint-name">Hip Joint</div>
                    <div class="joint-action" id="hip-action">Hamstrings extend</div>
                </div>
                <div class="joint-box">
                    <div class="joint-name">Knee Joint</div>
                    <div class="joint-action" id="knee-action">Quads extend</div>
                </div>
            </div>

            <div class="result">
                <p><strong>The Paradox:</strong> Hamstrings FLEX the knee, yet they're highly active during squat EXTENSION. Why would an antagonist muscle work against the movement?</p>
            </div>

            <div class="insight">
                The hamstrings are bi-articular muscles crossing both hip and knee. During squats, they extend the hip while the quads extend the knee. Both are needed simultaneously - the hamstrings aren't fighting the movement, they're helping at the hip while the quads handle the knee.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#angle-slider').addEventListener('input', (e) => {
            this.squatAngle = parseInt(e.target.value);
            this.$('#angle-val').textContent = this.squatAngle;
            this.updateVisualization();
        });

        this.$('#squat-btn').addEventListener('click', () => this.animateSquat());

        this.updateVisualization();
    }

    updateVisualization() {
        const angle = this.squatAngle;

        this.$('#current-angle').textContent = angle + 'deg';

        const thighRotation = (180 - angle) / 2;
        const shinRotation = -(180 - angle) / 2;
        const torsoLean = Math.max(0, (90 - angle) * 0.3);

        this.$('#torso').style.transform = `rotate(${torsoLean}deg)`;
        this.$('#thigh').style.transform = `rotate(${thighRotation}deg)`;
        this.$('#shin').style.transform = `rotate(${shinRotation}deg)`;

        let quadActivation, hamActivation;

        if (angle <= 60) {
            quadActivation = 90;
            hamActivation = 80;
        } else if (angle <= 90) {
            quadActivation = 70 + (90 - angle) * 0.67;
            hamActivation = 60 + (90 - angle) * 0.67;
        } else if (angle <= 120) {
            quadActivation = 50 + (120 - angle) * 0.67;
            hamActivation = 40 + (120 - angle) * 0.67;
        } else {
            quadActivation = 30 + (180 - angle) * 0.33;
            hamActivation = 20 + (180 - angle) * 0.33;
        }

        this.$('#quad-bar').style.width = quadActivation + '%';
        this.$('#quad-bar').textContent = Math.round(quadActivation) + '%';
        this.$('#quad-pct').textContent = Math.round(quadActivation) + '%';

        this.$('#ham-bar').style.width = hamActivation + '%';
        this.$('#ham-bar').textContent = Math.round(hamActivation) + '%';
        this.$('#ham-pct').textContent = Math.round(hamActivation) + '%';

        const phase = this.$('#phase');
        if (angle <= 70) {
            phase.innerHTML = '<strong>Deep Squat</strong> - Maximum co-contraction! Both muscles at peak activation.';
        } else if (angle <= 110) {
            phase.innerHTML = '<strong>Parallel Position</strong> - High co-contraction continues.';
        } else if (angle <= 150) {
            phase.innerHTML = '<strong>Quarter Squat</strong> - Moderate muscle activation.';
        } else {
            phase.innerHTML = '<strong>Standing</strong> - Minimal activation needed.';
        }

        if (angle < 120) {
            this.$('#hip-action').textContent = 'Hamstrings extend';
            this.$('#knee-action').textContent = 'Quads extend';
        } else {
            this.$('#hip-action').textContent = 'Minimal force';
            this.$('#knee-action').textContent = 'Maintaining position';
        }
    }

    animateSquat() {
        if (this.animating) return;
        this.animating = true;
        this.$('#squat-btn').disabled = true;

        const slider = this.$('#angle-slider');
        let angle = 180;
        let direction = -1;

        const animate = () => {
            angle += direction * 3;

            if (angle <= 50) direction = 1;
            if (angle >= 180) {
                this.animating = false;
                this.$('#squat-btn').disabled = false;
                return;
            }

            slider.value = angle;
            this.squatAngle = angle;
            this.$('#angle-val').textContent = angle;
            this.updateVisualization();

            requestAnimationFrame(animate);
        };

        animate();
    }
}

customElements.define('lombard-paradox-simulator', LombardParadoxSimulator);

export { LombardParadoxSimulator };
