/**
 * Free-Time Paradox Simulator
 * Americans have more free time than ever but feel more rushed
 */
import { SimulatorBase } from '../simulator-base.js';

class FreeTimeSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .income-buttons {
                    display: flex;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                }

                .income-buttons button {
                    flex: 1;
                    min-width: 120px;
                }

                .income-buttons button.active {
                    background: var(--accent, #f59e0b);
                }

                .comparison-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1.5rem;
                    margin: 1.5rem 0;
                }

                .metric-card {
                    background: var(--card, #1e293b);
                    padding: 1.25rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .metric-label {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                    margin-bottom: 0.5rem;
                }

                .metric-value {
                    font-size: 1.75rem;
                    font-weight: bold;
                    color: var(--text, #e2e8f0);
                }

                .metric-value.actual {
                    color: #22c55e;
                }

                .metric-value.perceived {
                    color: #ef4444;
                }

                .paradox-bar {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin: 1rem 0;
                    padding: 1rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                }

                .bar-label {
                    min-width: 80px;
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                }

                .bar-container {
                    flex: 1;
                    height: 24px;
                    background: var(--card, #1e293b);
                    border-radius: 12px;
                    overflow: hidden;
                }

                .bar-fill {
                    height: 100%;
                    transition: width 0.5s;
                    border-radius: 12px;
                }

                .bar-fill.time {
                    background: linear-gradient(90deg, #22c55e, #3b82f6);
                }

                .bar-fill.busy {
                    background: linear-gradient(90deg, #f59e0b, #ef4444);
                }

                @media (max-width: 600px) {
                    .comparison-grid {
                        grid-template-columns: 1fr;
                    }
                    .income-buttons {
                        flex-direction: column;
                    }
                }
            </style>

            <h4>Time Perception by Income</h4>

            <div class="controls income-buttons">
                <button id="low-btn">Low Income</button>
                <button id="mid-btn">Middle Income</button>
                <button id="high-btn">High Income</button>
            </div>

            <div class="comparison-grid">
                <div class="metric-card">
                    <div class="metric-label">Actual Free Time</div>
                    <div class="metric-value actual" id="actual-time">-</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Perceived Busyness</div>
                    <div class="metric-value perceived" id="perceived-busy">-</div>
                </div>
            </div>

            <div class="paradox-bar">
                <div class="bar-label">Free Time</div>
                <div class="bar-container">
                    <div class="bar-fill time" id="time-bar" style="width: 0%;"></div>
                </div>
            </div>

            <div class="paradox-bar">
                <div class="bar-label">Feels Busy</div>
                <div class="bar-container">
                    <div class="bar-fill busy" id="busy-bar" style="width: 0%;"></div>
                </div>
            </div>

            <div class="result" id="result">
                <p>Select an income level to see the paradox...</p>
            </div>

            <div class="insight">
                "Being busy" has become a status symbol. Wealth buys the option to be busy - having "no time" signals importance.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#low-btn').addEventListener('click', () => this.setIncome('low'));
        this.$('#mid-btn').addEventListener('click', () => this.setIncome('mid'));
        this.$('#high-btn').addEventListener('click', () => this.setIncome('high'));
    }

    setIncome(level) {
        const data = {
            low: {
                actual: '38 hrs/week',
                perceived: 'Very Busy',
                timeBar: 85,
                busyBar: 90,
                result: `<p><strong>Low-income workers</strong> often have multiple jobs or unpredictable schedules.</p>
                    <p style="color: var(--accent);">Despite having MORE measurable free hours, they feel constantly rushed and stressed.</p>
                    <p>Why? Unpredictability is exhausting. Waiting for shift schedules, uncertain income, and lack of control create chronic stress.</p>`
            },
            mid: {
                actual: '35 hrs/week',
                perceived: 'Busy',
                timeBar: 75,
                busyBar: 75,
                result: `<p><strong>Middle class</strong> juggles work, family, and aspirational activities.</p>
                    <p>Free time becomes another thing to optimize. "Quality time" pressure makes leisure feel like work.</p>
                    <p style="color: var(--accent);">Guilt about not being "productive" during downtime.</p>`
            },
            high: {
                actual: '30 hrs/week',
                perceived: 'Moderate',
                timeBar: 60,
                busyBar: 40,
                result: `<p><strong>High earners</strong> work longer hours but report LESS time pressure.</p>
                    <p style="color: var(--accent);">The paradox: they have less free time but feel less busy!</p>
                    <p>Why? "Being busy" is a choice that signals importance. Control over schedule matters more than hours available.</p>`
            }
        };

        const d = data[level];
        this.$('#actual-time').textContent = d.actual;
        this.$('#perceived-busy').textContent = d.perceived;
        this.$('#time-bar').style.width = d.timeBar + '%';
        this.$('#busy-bar').style.width = d.busyBar + '%';
        this.$('#result').innerHTML = d.result;

        this.$$('.income-buttons button').forEach(btn => btn.classList.remove('active'));
        this.$(`#${level}-btn`).classList.add('active');
    }
}

customElements.define('free-time-simulator', FreeTimeSimulator);

export { FreeTimeSimulator };
