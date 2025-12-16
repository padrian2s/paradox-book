/**
 * Golf Ball Paradox Simulator
 * Demonstrates how dimples reduce drag by creating turbulent boundary layer
 */
import { SimulatorBase } from '../simulator-base.js';

class GolfBallSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .golf-viz {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .ball-comparison {
                    display: flex;
                    justify-content: space-around;
                    gap: 2rem;
                    flex-wrap: wrap;
                }

                .ball-demo {
                    text-align: center;
                    padding: 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    min-width: 150px;
                }

                .ball-surface {
                    font-weight: bold;
                    margin-bottom: 1rem;
                }

                .airflow-lines {
                    height: 80px;
                    position: relative;
                    margin: 1rem 0;
                }

                .flow-line {
                    height: 2px;
                    position: absolute;
                    left: 10%;
                    width: 80%;
                }

                .flow-line.laminar {
                    background: linear-gradient(90deg, #3b82f6, #3b82f6 60%, transparent 60%);
                }

                .flow-line.laminar:nth-child(1) { top: 20%; }
                .flow-line.laminar:nth-child(2) { top: 60%; }

                .flow-line.turbulent {
                    background: linear-gradient(90deg, #3b82f6, #22c55e);
                }

                .flow-line.turbulent:nth-child(1) { top: 20%; }
                .flow-line.turbulent:nth-child(2) { top: 60%; }

                .wake {
                    position: absolute;
                    right: 5%;
                    top: 50%;
                    transform: translateY(-50%);
                    border-radius: 50%;
                }

                .wake.large {
                    width: 40px;
                    height: 40px;
                    background: rgba(239, 68, 68, 0.3);
                    border: 2px dashed #ef4444;
                }

                .wake.small {
                    width: 20px;
                    height: 20px;
                    background: rgba(34, 197, 94, 0.3);
                    border: 2px dashed #22c55e;
                }

                .ball-stats {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                }
            </style>

            <h4>Aerodynamic Comparison</h4>

            <div class="golf-viz">
                <div class="ball-comparison">
                    <div class="ball-demo smooth-ball">
                        <div class="ball-surface">Smooth</div>
                        <div class="airflow-lines" id="smooth-airflow">
                            <div class="flow-line laminar"></div>
                            <div class="flow-line laminar"></div>
                            <div class="wake large"></div>
                        </div>
                        <div class="ball-stats">
                            <div>Drag: <strong>High</strong></div>
                            <div>Distance: <strong id="smooth-dist">180 yds</strong></div>
                        </div>
                    </div>
                    <div class="ball-demo dimpled-ball">
                        <div class="ball-surface">Dimpled</div>
                        <div class="airflow-lines" id="dimpled-airflow">
                            <div class="flow-line turbulent"></div>
                            <div class="flow-line turbulent"></div>
                            <div class="wake small"></div>
                        </div>
                        <div class="ball-stats">
                            <div>Drag: <strong>Low</strong></div>
                            <div>Distance: <strong id="dimpled-dist">280 yds</strong></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="controls" style="margin-top: 1rem;">
                <div class="control-group">
                    <label>Club Speed: <span id="club-speed-val">100</span> mph</label>
                    <input type="range" id="club-speed" min="60" max="120" value="100">
                </div>
                <button id="animate-btn">Animate Shot</button>
            </div>

            <div class="result">
                <p id="golf-result">Dimples create turbulence that keeps airflow attached longer, reducing the wake (low pressure zone) behind the ball. Less wake = less drag = more distance.</p>
            </div>

            <div class="insight">
                This principle applies beyond golf: shark skin, airplane wings, and swimsuits all use controlled roughness to reduce drag.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#club-speed').addEventListener('input', () => this.updateGolfDistance());
        this.$('#animate-btn').addEventListener('click', () => this.animateGolfShot());
        this.updateGolfDistance();
    }

    updateGolfDistance() {
        const speed = parseInt(this.$('#club-speed').value);
        this.$('#club-speed-val').textContent = speed;

        const smoothDist = Math.round(speed * 1.8);
        const dimpledDist = Math.round(speed * 2.8);

        this.$('#smooth-dist').textContent = smoothDist + ' yds';
        this.$('#dimpled-dist').textContent = dimpledDist + ' yds';
    }

    animateGolfShot() {
        this.$('#golf-result').innerHTML =
            '<strong>Shot comparison:</strong> The dimpled ball travels ~55% farther because its turbulent boundary layer delays flow separation, creating a smaller wake and less pressure drag.';
    }
}

customElements.define('golf-ball-simulator', GolfBallSimulator);

export { GolfBallSimulator };
