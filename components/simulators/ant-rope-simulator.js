/**
 * Ant on a Rubber Rope Simulator
 * Demonstrates how an ant can reach the end of an infinitely stretching rope
 */
import { SimulatorBase } from '../simulator-base.js';

class AntRopeSimulator extends SimulatorBase {
    constructor() {
        super();
        this.antInterval = null;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .ant-rope {
                    position: relative;
                    height: 60px;
                    background: linear-gradient(90deg, #78350f, #a16207);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                    display: flex;
                    align-items: center;
                }

                .ant {
                    position: absolute;
                    font-size: 1.5rem;
                    left: 0;
                    transition: left 0.1s linear;
                }

                .rope-end {
                    position: absolute;
                    right: 10px;
                    color: white;
                    font-weight: bold;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
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
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                @media (max-width: 768px) {
                    .stats-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
            </style>

            <h4>Rubber Rope Race</h4>

            <div class="controls">
                <div class="control-group">
                    <label>Ant Speed: <span id="ant-speed-val">1</span> cm/s</label>
                    <input type="range" id="ant-speed" min="1" max="10" value="1">
                </div>
                <div class="control-group">
                    <label>Stretch Rate: <span id="rope-stretch-val">100</span> cm/s</label>
                    <input type="range" id="rope-stretch" min="10" max="500" value="100">
                </div>
                <button id="start-btn">Start</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="ant-rope">
                <div class="ant" id="ant-position">🐜</div>
                <div class="rope-end">END</div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="ant-progress">0%</div>
                    <div class="stat-label">Progress (%)</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="ant-distance">0 cm</div>
                    <div class="stat-label">Ant Position</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="rope-length">100 cm</div>
                    <div class="stat-label">Rope Length</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="ant-time">0s</div>
                    <div class="stat-label">Time Elapsed</div>
                </div>
            </div>

            <div class="result">
                <p id="ant-explanation">The ant's fractional progress = sum of 1/(1+k*stretch/speed). This harmonic series diverges, so the ant eventually reaches 100%!</p>
            </div>

            <div class="insight">
                Even though the rope grows infinitely, the ant's fractional progress follows a harmonic series that diverges to infinity. Math beats intuition!
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#ant-speed').addEventListener('input', () => this.updateLabels());
        this.$('#rope-stretch').addEventListener('input', () => this.updateLabels());
        this.$('#start-btn').addEventListener('click', () => this.startAntRace());
        this.$('#reset-btn').addEventListener('click', () => this.resetAntRace());
    }

    updateLabels() {
        this.$('#ant-speed-val').textContent = this.$('#ant-speed').value;
        this.$('#rope-stretch-val').textContent = this.$('#rope-stretch').value;
    }

    startAntRace() {
        if (this.antInterval) clearInterval(this.antInterval);

        const antSpeed = parseFloat(this.$('#ant-speed').value);
        const stretchRate = parseFloat(this.$('#rope-stretch').value);

        this.$('#ant-speed-val').textContent = antSpeed;
        this.$('#rope-stretch-val').textContent = stretchRate;

        let ropeLength = 100;
        let antPos = 0;
        let time = 0;

        this.antInterval = setInterval(() => {
            time++;

            antPos += antSpeed;

            const stretchFactor = (ropeLength + stretchRate) / ropeLength;
            antPos *= stretchFactor;
            ropeLength += stretchRate;

            const progress = (antPos / ropeLength) * 100;

            this.$('#ant-position').style.left = `${Math.min(progress, 95)}%`;
            this.$('#ant-progress').textContent = progress.toFixed(2) + '%';
            this.$('#ant-distance').textContent = Math.round(antPos) + ' cm';
            this.$('#rope-length').textContent = Math.round(ropeLength) + ' cm';
            this.$('#ant-time').textContent = time + 's';

            if (progress >= 100 || time > 10000) {
                clearInterval(this.antInterval);
                if (progress >= 100) {
                    this.$('#ant-explanation').textContent = `SUCCESS! The ant reached the end in ${time} seconds! The harmonic series wins!`;
                }
            }
        }, 50);
    }

    resetAntRace() {
        if (this.antInterval) clearInterval(this.antInterval);
        this.$('#ant-position').style.left = '0';
        this.$('#ant-progress').textContent = '0%';
        this.$('#ant-distance').textContent = '0 cm';
        this.$('#rope-length').textContent = '100 cm';
        this.$('#ant-time').textContent = '0s';
        this.$('#ant-explanation').textContent = "The ant's fractional progress = sum of 1/(1+k*stretch/speed). This harmonic series diverges, so the ant eventually reaches 100%!";
    }

    cleanup() {
        if (this.antInterval) clearInterval(this.antInterval);
    }
}

customElements.define('ant-rope-simulator', AntRopeSimulator);

export { AntRopeSimulator };
