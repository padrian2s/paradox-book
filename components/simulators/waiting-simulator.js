/**
 * Waiting Time / Bus Paradox Simulator
 * Demonstrates the inspection paradox - you're more likely to arrive during a long gap
 */
import { SimulatorBase } from '../simulator-base.js';

class WaitingSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .stat-box {
                    background: var(--bg, #0f172a);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .stat-value {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--primary, #6366f1);
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                .bus-viz {
                    height: 80px;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    position: relative;
                    overflow: hidden;
                    margin-top: 1rem;
                }

                .timeline {
                    position: absolute;
                    top: 50%;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: var(--muted, #94a3b8);
                }

                .bus-marker {
                    position: absolute;
                    top: 30%;
                    width: 20px;
                    height: 30px;
                    background: var(--primary, #6366f1);
                    border-radius: 4px;
                    transform: translateX(-50%);
                }

                @media (max-width: 600px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }

                    .stat-box {
                        padding: 0.75rem;
                    }

                    .stat-value {
                        font-size: 1.25rem;
                    }
                }
            </style>

            <h4>Bus Stop Simulator</h4>

            <div class="controls">
                <div class="control-group">
                    <label>Average Interval (min)</label>
                    <input type="number" id="interval" value="10" min="1" max="60">
                </div>
                <div class="control-group">
                    <label>Variability (0=exact, 100=random): <span id="variance-val">70%</span></label>
                    <input type="range" id="variance" min="0" max="100" value="70">
                </div>
                <div class="control-group">
                    <label>Simulations</label>
                    <input type="number" id="sims" value="1000" min="100" max="10000">
                </div>
                <button id="simulate-btn">Simulate Arrivals</button>
            </div>

            <div class="bus-viz" id="bus-viz">
                <div class="timeline"></div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="expected">5 min</div>
                    <div class="stat-label">Naive Expectation</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="actual">7.5 min</div>
                    <div class="stat-label">Actual Avg Wait</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="ratio">1.5x</div>
                    <div class="stat-label">Longer Than Expected</div>
                </div>
            </div>

            <div class="result">
                <p id="explanation">You're more likely to arrive during a LONG gap than a short one. The average gap you experience is longer than the average gap between buses.</p>
            </div>

            <div class="insight">
                This is called the "inspection paradox" - you're sampling intervals proportional to their length. It explains why buses seem late!
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#variance').addEventListener('input', () => this.updateVarianceLabel());
        this.$('#simulate-btn').addEventListener('click', () => this.simulate());

        this.simulate();
    }

    updateVarianceLabel() {
        const variance = this.$('#variance').value;
        this.$('#variance-val').textContent = variance + '%';
    }

    simulate() {
        const interval = parseFloat(this.$('#interval').value) || 10;
        const variance = parseFloat(this.$('#variance').value) / 100;
        const numSims = parseInt(this.$('#sims').value) || 1000;

        this.$('#variance-val').textContent = (variance * 100) + '%';

        const arrivals = [0];
        let time = 0;
        while (time < 10000) {
            const gap = variance > 0 ?
                -interval * Math.log(Math.random()) * variance + interval * (1 - variance) :
                interval;
            time += Math.max(0.1, gap);
            arrivals.push(time);
        }

        let totalWait = 0;
        for (let i = 0; i < numSims; i++) {
            const arrivalTime = Math.random() * (arrivals[arrivals.length - 2]);
            for (const busTime of arrivals) {
                if (busTime >= arrivalTime) {
                    totalWait += (busTime - arrivalTime);
                    break;
                }
            }
        }

        const avgWait = totalWait / numSims;
        const expected = interval / 2;
        const ratio = avgWait / expected;

        this.$('#expected').textContent = expected.toFixed(1) + ' min';
        this.$('#actual').textContent = avgWait.toFixed(1) + ' min';
        this.$('#actual').style.color = avgWait > expected ? '#ef4444' : '#22c55e';
        this.$('#ratio').textContent = ratio.toFixed(2) + 'x';

        this.drawBusVisualization(arrivals);
    }

    drawBusVisualization(arrivals) {
        const viz = this.$('#bus-viz');
        viz.innerHTML = '<div class="timeline"></div>';

        const displayArrivals = arrivals.slice(0, 20);
        const maxTime = displayArrivals[displayArrivals.length - 1];

        displayArrivals.forEach((t) => {
            const left = (t / maxTime) * 100;
            const marker = document.createElement('div');
            marker.className = 'bus-marker';
            marker.style.left = left + '%';
            marker.title = `Bus at ${t.toFixed(1)} min`;
            viz.appendChild(marker);
        });
    }
}

customElements.define('waiting-simulator', WaitingSimulator);

export { WaitingSimulator };
