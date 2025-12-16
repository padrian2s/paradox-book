/**
 * Tolerance Paradox Simulator
 * Demonstrates Popper's paradox of tolerance
 */
import { SimulatorBase } from '../simulator-base.js';

class ToleranceSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
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
                    color: var(--accent, #f59e0b);
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                .timeline-viz {
                    background: var(--bg, #0f172a);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .timeline-container {
                    display: flex;
                    gap: 2px;
                    height: 100px;
                    align-items: flex-end;
                }

                .timeline-bar {
                    flex: 1;
                    border-radius: 2px 2px 0 0;
                    min-width: 4px;
                    transition: height 0.3s;
                }

                .legend {
                    display: flex;
                    gap: 1rem;
                    margin-top: 0.5rem;
                    font-size: 0.75rem;
                    justify-content: center;
                    flex-wrap: wrap;
                }

                .legend-item {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                }

                .legend-color {
                    width: 12px;
                    height: 12px;
                    border-radius: 2px;
                }

                @media (max-width: 768px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>Society Tolerance Simulator</h4>

            <div class="controls">
                <div class="control-group">
                    <label>Tolerance Policy</label>
                    <select id="tolerance-policy">
                        <option value="unlimited">Unlimited Tolerance</option>
                        <option value="paradox" selected>Tolerant (Popper's Rule)</option>
                        <option value="low">Low Tolerance</option>
                    </select>
                </div>
                <button id="simulate-btn">Simulate 50 Years</button>
            </div>

            <div class="timeline-viz">
                <div class="timeline-container" id="timeline"></div>
                <div class="legend">
                    <div class="legend-item">
                        <div class="legend-color" style="background: #22c55e;"></div>
                        <span>Tolerant</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-color" style="background: #ef4444;"></div>
                        <span>Intolerant</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-color" style="background: var(--muted, #94a3b8);"></div>
                        <span>Neutral</span>
                    </div>
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="tolerance-final">0%</div>
                    <div class="stat-label">Society Tolerance (Final)</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="tolerance-intolerant">0%</div>
                    <div class="stat-label">Intolerant Population</div>
                </div>
            </div>

            <div class="result">
                <p id="tolerance-result">Select a policy and run the simulation.</p>
            </div>

            <div class="insight">
                Karl Popper: "If we extend unlimited tolerance even to those who are intolerant... then the tolerant will be destroyed, and tolerance with them."
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#simulate-btn').addEventListener('click', () => this.simulate());
        this.$('#tolerance-policy').addEventListener('change', () => this.simulate());
        this.simulate();
    }

    simulate() {
        const policy = this.$('#tolerance-policy').value;
        const timeline = this.$('#timeline');
        timeline.innerHTML = '';

        let tolerance = 90;
        let intolerant = 5;
        const history = [];

        for (let year = 0; year < 50; year++) {
            if (policy === 'unlimited') {
                intolerant = Math.min(95, intolerant * 1.08);
                tolerance = Math.max(5, 100 - intolerant);
            } else if (policy === 'paradox') {
                if (intolerant > 15) {
                    intolerant = Math.max(5, intolerant * 0.95);
                } else {
                    intolerant = Math.min(15, intolerant * 1.02);
                }
                tolerance = Math.max(70, 100 - intolerant);
            } else {
                intolerant = Math.max(2, intolerant * 0.9);
                tolerance = Math.max(30, 40 + Math.random() * 10);
            }

            history.push({ tolerance, intolerant });
        }

        history.forEach((h, i) => {
            const bar = document.createElement('div');
            bar.className = 'timeline-bar';
            bar.style.background = `linear-gradient(to top,
                #ef4444 ${h.intolerant}%,
                #22c55e ${h.intolerant}%,
                #22c55e ${h.tolerance}%,
                var(--muted, #94a3b8) ${h.tolerance}%)`;
            bar.style.height = '100%';
            bar.title = `Year ${i + 1}: Tolerance ${h.tolerance.toFixed(0)}%, Intolerant ${h.intolerant.toFixed(0)}%`;
            timeline.appendChild(bar);
        });

        const final = history[history.length - 1];
        this.$('#tolerance-final').textContent = final.tolerance.toFixed(0) + '%';
        this.$('#tolerance-final').style.color = final.tolerance > 60 ? '#22c55e' : '#ef4444';
        this.$('#tolerance-intolerant').textContent = final.intolerant.toFixed(0) + '%';

        const resultEl = this.$('#tolerance-result');
        if (policy === 'unlimited') {
            resultEl.innerHTML = '<span style="color: #ef4444;">Unlimited tolerance leads to its own destruction.</span> Intolerance grows unchecked.';
        } else if (policy === 'paradox') {
            resultEl.innerHTML = '<span style="color: #22c55e;">Popper\'s approach works!</span> Tolerance survives by not tolerating intolerance.';
        } else {
            resultEl.innerHTML = '<span style="color: var(--accent);">Low tolerance maintains order but limits freedom.</span> Everyone is suppressed.';
        }
    }
}

customElements.define('tolerance-simulator', ToleranceSimulator);

export { ToleranceSimulator };
