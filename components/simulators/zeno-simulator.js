/**
 * Zeno's Paradox Simulator
 * Demonstrates how infinite steps can complete in finite time
 */
import { SimulatorBase } from '../simulator-base.js';

class ZenoSimulator extends SimulatorBase {
    constructor() {
        super();
        this.zenoInterval = null;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .zeno-track {
                    position: relative;
                    height: 100px;
                    background: linear-gradient(to right, #22c55e 0%, #f59e0b 100%);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                    overflow: hidden;
                }

                .zeno-runner {
                    position: absolute;
                    bottom: 10px;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    transition: left 0.3s ease-out;
                    z-index: 2;
                }

                .zeno-runner.achilles {
                    background: #6366f1;
                    left: 0;
                }

                .zeno-runner.tortoise {
                    background: #78350f;
                    left: 20%;
                }

                .zeno-markers {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                }

                .zeno-marker {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    width: 2px;
                    background: rgba(255, 255, 255, 0.5);
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .stat-box {
                    text-align: center;
                    padding: 0.75rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                }

                .stat-value {
                    font-size: 1.25rem;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }

                @media (max-width: 768px) {
                    .stats-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 0.5rem;
                    }

                    .stat-box {
                        padding: 0.5rem;
                    }

                    .stat-value {
                        font-size: 1rem;
                    }

                    .stat-label {
                        font-size: 0.65rem;
                    }

                    .zeno-runner {
                        width: 24px;
                        height: 24px;
                        font-size: 0.75rem;
                    }
                }
            </style>

            <h4>Achilles and the Tortoise</h4>

            <div class="controls">
                <div class="control-group">
                    <label>Tortoise Head Start: <span id="headstart-val">10</span>m</label>
                    <input type="range" id="headstart" min="1" max="50" value="10">
                </div>
                <div class="control-group">
                    <label>Speed Ratio (Achilles/Tortoise): <span id="ratio-val">10</span>x</label>
                    <input type="range" id="ratio" min="2" max="20" value="10">
                </div>
                <button id="start-btn">Start Race</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="zeno-track">
                <div class="zeno-runner achilles" id="achilles">A</div>
                <div class="zeno-runner tortoise" id="tortoise">T</div>
                <div class="zeno-markers" id="markers"></div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="steps">0</div>
                    <div class="stat-label">Steps Taken</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="distance">0m</div>
                    <div class="stat-label">Distance Covered</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="remaining">10m</div>
                    <div class="stat-label">Gap Remaining</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="catchup">11.11m</div>
                    <div class="stat-label">Catch-up Point</div>
                </div>
            </div>

            <div class="result">
                <p id="explanation">Each step halves the gap but never closes it... yet the infinite series 1/2 + 1/4 + 1/8 + ... = 1. Infinite steps, finite time!</p>
            </div>

            <div class="insight">
                Resolution: Infinite processes CAN complete in finite time. The sum of an infinite geometric series can be finite.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#headstart').addEventListener('input', () => this.updateLabels());
        this.$('#ratio').addEventListener('input', () => this.updateLabels());
        this.$('#start-btn').addEventListener('click', () => this.runZeno());
        this.$('#reset-btn').addEventListener('click', () => this.resetZeno());

        this.updateLabels();
    }

    updateLabels() {
        const headStart = parseFloat(this.$('#headstart').value);
        const ratio = parseFloat(this.$('#ratio').value);

        this.$('#headstart-val').textContent = headStart;
        this.$('#ratio-val').textContent = ratio;

        const catchupPoint = headStart * ratio / (ratio - 1);
        this.$('#catchup').textContent = catchupPoint.toFixed(2) + 'm';
        this.$('#remaining').textContent = headStart + 'm';
    }

    runZeno() {
        if (this.zenoInterval) clearInterval(this.zenoInterval);

        const headStart = parseFloat(this.$('#headstart').value);
        const ratio = parseFloat(this.$('#ratio').value);

        this.$('#headstart-val').textContent = headStart;
        this.$('#ratio-val').textContent = ratio;

        const catchupPoint = headStart * ratio / (ratio - 1);
        this.$('#catchup').textContent = catchupPoint.toFixed(2) + 'm';

        let achillesPos = 0;
        let tortoisePos = headStart;
        let steps = 0;
        const markers = this.$('#markers');
        markers.innerHTML = '';

        this.zenoInterval = setInterval(() => {
            steps++;
            const gap = tortoisePos - achillesPos;

            if (gap < 0.001 || steps > 50) {
                clearInterval(this.zenoInterval);
                this.zenoInterval = null;
                this.$('#explanation').textContent =
                    `After ${steps} steps, Achilles catches the tortoise! The infinite series converges to a finite value.`;
                return;
            }

            // Achilles runs to where tortoise was
            achillesPos = tortoisePos;
            // Tortoise moves forward
            tortoisePos += gap / ratio;

            // Update positions (scale to percentage of track)
            const maxPos = catchupPoint * 1.2;
            this.$('#achilles').style.left = (achillesPos / maxPos * 90) + '%';
            this.$('#tortoise').style.left = (tortoisePos / maxPos * 90) + '%';

            // Add marker
            const marker = document.createElement('div');
            marker.className = 'zeno-marker';
            marker.style.left = (achillesPos / maxPos * 90) + '%';
            markers.appendChild(marker);

            this.$('#steps').textContent = steps;
            this.$('#distance').textContent = achillesPos.toFixed(4) + 'm';
            this.$('#remaining').textContent = (tortoisePos - achillesPos).toFixed(6) + 'm';
        }, 300);
    }

    resetZeno() {
        if (this.zenoInterval) {
            clearInterval(this.zenoInterval);
            this.zenoInterval = null;
        }
        this.$('#achilles').style.left = '0';
        this.$('#tortoise').style.left = '20%';
        this.$('#markers').innerHTML = '';
        this.$('#steps').textContent = '0';
        this.$('#distance').textContent = '0m';

        const headStart = parseFloat(this.$('#headstart').value);
        this.$('#remaining').textContent = headStart + 'm';

        this.$('#explanation').textContent =
            'Each step halves the gap but never closes it... yet the infinite series 1/2 + 1/4 + 1/8 + ... = 1. Infinite steps, finite time!';
    }

    cleanup() {
        if (this.zenoInterval) {
            clearInterval(this.zenoInterval);
            this.zenoInterval = null;
        }
    }
}

customElements.define('zeno-simulator', ZenoSimulator);

export { ZenoSimulator };
