/**
 * Violence Paradox Simulator
 * Violence has dramatically declined but we perceive it as increasing
 */
import { SimulatorBase } from '../simulator-base.js';

class ViolenceSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .era-selector {
                    width: 100%;
                }

                .era-selector select {
                    width: 100%;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    margin: 1rem 0;
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
                    color: var(--primary, #6366f1);
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                .timeline-viz {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin: 1rem 0;
                }

                .timeline-bar {
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-around;
                    height: 150px;
                    padding: 0 1rem;
                }

                .era-bar {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 60px;
                }

                .bar-fill {
                    width: 40px;
                    background: linear-gradient(to top, #ef4444, #f59e0b);
                    border-radius: 4px 4px 0 0;
                    transition: height 0.5s ease;
                }

                .bar-fill.current {
                    background: linear-gradient(to top, #22c55e, #4ade80);
                }

                .bar-label {
                    margin-top: 0.5rem;
                    font-size: 0.625rem;
                    color: var(--muted, #94a3b8);
                    text-align: center;
                }

                .bar-value {
                    font-size: 0.75rem;
                    font-weight: bold;
                    color: var(--text, #e2e8f0);
                    margin-bottom: 0.25rem;
                }

                .perception-box {
                    margin-top: 1rem;
                    padding: 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .perception-title {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                    margin-bottom: 0.5rem;
                }

                .perception-value {
                    font-size: 1.25rem;
                    font-weight: bold;
                }
            </style>

            <h4>Violence Through History</h4>

            <div class="controls">
                <div class="control-group era-selector">
                    <label>Select Era</label>
                    <select id="violence-era">
                        <option value="tribal">Tribal Era (prehistory)</option>
                        <option value="medieval">Medieval Period</option>
                        <option value="1900">Early 1900s</option>
                        <option value="now" selected>Today</option>
                    </select>
                </div>
            </div>

            <div class="timeline-viz">
                <div class="timeline-bar">
                    <div class="era-bar">
                        <div class="bar-value">15%</div>
                        <div class="bar-fill" style="height: 100%;"></div>
                        <div class="bar-label">Tribal</div>
                    </div>
                    <div class="era-bar">
                        <div class="bar-value">3%</div>
                        <div class="bar-fill" style="height: 20%;"></div>
                        <div class="bar-label">Medieval</div>
                    </div>
                    <div class="era-bar">
                        <div class="bar-value">1.5%</div>
                        <div class="bar-fill" style="height: 10%;"></div>
                        <div class="bar-label">1900s</div>
                    </div>
                    <div class="era-bar">
                        <div class="bar-value">0.7%</div>
                        <div class="bar-fill current" style="height: 5%;"></div>
                        <div class="bar-label">Today</div>
                    </div>
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="viol-rate">0.7%</div>
                    <div class="stat-label">Death by Violence</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="viol-feel">High</div>
                    <div class="stat-label">Perceived Violence</div>
                </div>
            </div>

            <div class="perception-box">
                <div class="perception-title">Why does violence feel more prevalent today?</div>
                <div class="perception-value" id="perception-reason">24/7 news cycle amplifies rare events</div>
            </div>

            <div class="result" id="violence-result">
                <p>Despite constant news coverage of violence, we live in the most peaceful era in human history. The rate of death by violence has dropped over 95% from prehistoric times.</p>
            </div>

            <div class="insight">
                Steven Pinker: "The past was a bloodbath." Our ancestors were far more likely to die violently than we are. Media saturation creates the illusion that violence is increasing.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#violence-era').addEventListener('change', () => this.updateViolence());
        this.updateViolence();
    }

    updateViolence() {
        const era = this.$('#violence-era').value;
        const data = {
            tribal: {
                rate: '15%',
                feel: 'Normal',
                feelColor: 'var(--muted)',
                reason: 'Constant tribal warfare was just life',
                result: 'In prehistoric societies, an estimated 15% of people died violently. Warfare, blood feuds, and raids were constant threats.'
            },
            medieval: {
                rate: '3%',
                feel: 'Normal',
                feelColor: 'var(--muted)',
                reason: 'Public executions and wars were common entertainment',
                result: 'Medieval Europe saw regular warfare, public executions, and normalized violence. Murder rates were 30-50x higher than today.'
            },
            1900: {
                rate: '1.5%',
                feel: 'Concerning',
                feelColor: 'var(--accent)',
                reason: 'Two world wars shaped perception',
                result: 'Despite two world wars, the overall violence rate continued its long decline. Most people lived peacefully between the wars.'
            },
            now: {
                rate: '0.7%',
                feel: 'High',
                feelColor: '#ef4444',
                reason: '24/7 news cycle amplifies rare events',
                result: 'We live in the most peaceful era in human history, but perceive more violence due to media saturation. Every tragic event is broadcast globally.'
            }
        };

        const d = data[era];
        this.$('#viol-rate').textContent = d.rate;
        this.$('#viol-feel').textContent = d.feel;
        this.$('#viol-feel').style.color = d.feelColor;
        this.$('#perception-reason').textContent = d.reason;
        this.$('#violence-result').innerHTML = `<p>${d.result}</p>`;
    }
}

customElements.define('violence-simulator', ViolenceSimulator);

export { ViolenceSimulator };
