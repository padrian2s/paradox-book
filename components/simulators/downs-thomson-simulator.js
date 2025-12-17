import { SimulatorBase } from '../simulator-base.js';

class DownsThomsonSimulator extends SimulatorBase {
    constructor() {
        super();
        this.state = {
            roadLanes: 4,
            transitQuality: 50,
            drivers: 80,
            transitRiders: 20
        };
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .traffic-viz {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .city-display {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.5rem;
                    margin-bottom: 1.5rem;
                }

                .transport-section {
                    background: var(--card, #1e293b);
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                }

                .section-title {
                    font-weight: bold;
                    margin-bottom: 1rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .road-visual {
                    position: relative;
                    height: 100px;
                    background: #374151;
                    border-radius: 0.25rem;
                    overflow: hidden;
                    margin-bottom: 1rem;
                }

                .lane {
                    position: absolute;
                    left: 0;
                    right: 0;
                    height: 20px;
                    border-bottom: 2px dashed rgba(255,255,255,0.3);
                }

                .cars-container {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    flex-wrap: wrap;
                    align-content: center;
                    justify-content: center;
                    gap: 2px;
                    padding: 5px;
                }

                .car {
                    font-size: 0.875rem;
                }

                .transit-visual {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 1rem;
                }

                .transit-icon {
                    font-size: 2.5rem;
                }

                .transit-people {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 2px;
                }

                .person {
                    font-size: 0.75rem;
                }

                .stats-row {
                    display: flex;
                    justify-content: space-between;
                    padding: 0.5rem 0;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                    font-size: 0.875rem;
                }

                .stats-row:last-child {
                    border-bottom: none;
                }

                .stat-label {
                    color: var(--muted, #94a3b8);
                }

                .stat-value {
                    font-weight: bold;
                }

                .stat-value.good {
                    color: #22c55e;
                }

                .stat-value.bad {
                    color: #ef4444;
                }

                .stat-value.neutral {
                    color: #f59e0b;
                }

                .equilibrium-display {
                    background: var(--card, #1e293b);
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .equilibrium-title {
                    font-weight: bold;
                    margin-bottom: 1rem;
                    color: var(--primary, #6366f1);
                }

                .time-comparison {
                    display: flex;
                    justify-content: space-around;
                    text-align: center;
                }

                .time-box {
                    padding: 1rem;
                }

                .time-value {
                    font-size: 2rem;
                    font-weight: bold;
                }

                .time-label {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                }

                @media (max-width: 600px) {
                    .city-display {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>City Transport Simulation</h4>
            <p style="margin-bottom: 1rem; color: var(--muted);">See how adding roads affects traffic when public transit exists.</p>

            <div class="controls">
                <div class="control-group">
                    <label>Road Lanes: <span id="lanes-val">4</span></label>
                    <input type="range" id="road-lanes" min="2" max="8" value="4">
                </div>
                <div class="control-group">
                    <label>Transit Quality: <span id="transit-val">50</span>%</label>
                    <input type="range" id="transit-quality" min="20" max="100" value="50">
                </div>
                <button id="add-lane">Add Lane (+1)</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="traffic-viz">
                <div class="city-display">
                    <div class="transport-section">
                        <div class="section-title">🚗 Roads</div>
                        <div class="road-visual" id="road-visual">
                            <div id="cars-container" class="cars-container"></div>
                        </div>
                        <div class="stats-row">
                            <span class="stat-label">Lanes</span>
                            <span class="stat-value" id="lanes-display">4</span>
                        </div>
                        <div class="stats-row">
                            <span class="stat-label">Drivers</span>
                            <span class="stat-value" id="drivers-display">80</span>
                        </div>
                        <div class="stats-row">
                            <span class="stat-label">Congestion</span>
                            <span class="stat-value bad" id="congestion-display">High</span>
                        </div>
                        <div class="stats-row">
                            <span class="stat-label">Travel Time</span>
                            <span class="stat-value" id="drive-time">45 min</span>
                        </div>
                    </div>

                    <div class="transport-section">
                        <div class="section-title">🚌 Public Transit</div>
                        <div class="transit-visual">
                            <div class="transit-icon">🚌</div>
                            <div class="transit-people" id="transit-people"></div>
                        </div>
                        <div class="stats-row">
                            <span class="stat-label">Quality</span>
                            <span class="stat-value" id="quality-display">Medium</span>
                        </div>
                        <div class="stats-row">
                            <span class="stat-label">Riders</span>
                            <span class="stat-value" id="riders-display">20</span>
                        </div>
                        <div class="stats-row">
                            <span class="stat-label">Frequency</span>
                            <span class="stat-value" id="frequency-display">Every 15 min</span>
                        </div>
                        <div class="stats-row">
                            <span class="stat-label">Travel Time</span>
                            <span class="stat-value" id="transit-time">40 min</span>
                        </div>
                    </div>
                </div>

                <div class="equilibrium-display">
                    <div class="equilibrium-title">Downs-Thomson Equilibrium</div>
                    <p style="margin-bottom: 1rem; font-size: 0.875rem; color: var(--muted);">Travel times equalize as people switch modes. Better roads = more drivers = same congestion!</p>
                    <div class="time-comparison">
                        <div class="time-box">
                            <div class="time-value" id="equilibrium-drive" style="color: #3b82f6;">45</div>
                            <div class="time-label">Driving (min)</div>
                        </div>
                        <div class="time-box">
                            <div class="time-value" style="font-size: 1.5rem; color: var(--muted);">≈</div>
                            <div class="time-label">Equilibrium</div>
                        </div>
                        <div class="time-box">
                            <div class="time-value" id="equilibrium-transit" style="color: #22c55e;">40</div>
                            <div class="time-label">Transit (min)</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="result">
                <p id="result-text">Add lanes to see the paradox: more road capacity attracts more drivers until congestion returns to equilibrium with transit time.</p>
            </div>

            <div class="insight">
                The Downs-Thomson Paradox explains why adding highway lanes rarely reduces congestion long-term. The equilibrium travel time for cars equals the door-to-door time by public transit. Improve roads? People switch from transit. Improve transit? People switch from cars. The key is making transit better, not roads bigger.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#road-lanes').addEventListener('input', () => this.updateSimulation());
        this.$('#transit-quality').addEventListener('input', () => this.updateSimulation());
        this.$('#add-lane').addEventListener('click', () => this.addLane());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
        this.updateSimulation();
    }

    updateSimulation() {
        const lanes = parseInt(this.$('#road-lanes').value);
        const transitQuality = parseInt(this.$('#transit-quality').value);

        this.$('#lanes-val').textContent = lanes;
        this.$('#transit-val').textContent = transitQuality;
        this.$('#lanes-display').textContent = lanes;

        const transitTime = 60 - (transitQuality * 0.35);
        const baseCapacity = lanes * 25;

        const totalCommuters = 100;
        let drivers = Math.min(95, Math.max(30, baseCapacity * 0.8 + (100 - transitQuality) * 0.3));
        drivers = Math.round(drivers);
        const riders = totalCommuters - drivers;

        const congestion = drivers / baseCapacity;
        const driveTime = 20 + (congestion * 40);

        this.state.drivers = drivers;
        this.state.transitRiders = riders;

        this.$('#drivers-display').textContent = drivers;
        this.$('#riders-display').textContent = riders;

        this.renderCars(drivers, lanes);
        this.renderTransitPeople(riders);

        let congestionLevel, congestionClass;
        if (congestion < 0.6) {
            congestionLevel = 'Low';
            congestionClass = 'good';
        } else if (congestion < 0.85) {
            congestionLevel = 'Medium';
            congestionClass = 'neutral';
        } else {
            congestionLevel = 'High';
            congestionClass = 'bad';
        }

        this.$('#congestion-display').textContent = congestionLevel;
        this.$('#congestion-display').className = `stat-value ${congestionClass}`;

        this.$('#drive-time').textContent = Math.round(driveTime) + ' min';
        this.$('#transit-time').textContent = Math.round(transitTime) + ' min';

        this.$('#equilibrium-drive').textContent = Math.round(driveTime);
        this.$('#equilibrium-transit').textContent = Math.round(transitTime);

        let qualityLabel;
        if (transitQuality < 40) {
            qualityLabel = 'Poor';
        } else if (transitQuality < 70) {
            qualityLabel = 'Medium';
        } else {
            qualityLabel = 'Good';
        }
        this.$('#quality-display').textContent = qualityLabel;

        const frequency = Math.round(30 - (transitQuality * 0.2));
        this.$('#frequency-display').textContent = `Every ${frequency} min`;

        this.updateExplanation(lanes, driveTime, transitTime, congestion);
    }

    renderCars(count, lanes) {
        const container = this.$('#cars-container');
        const carCount = Math.min(count, 50);
        container.innerHTML = Array(carCount).fill('🚗').join('');
    }

    renderTransitPeople(count) {
        const container = this.$('#transit-people');
        const personCount = Math.min(count, 30);
        container.innerHTML = Array(personCount).fill('👤').join('');
    }

    addLane() {
        const slider = this.$('#road-lanes');
        const current = parseInt(slider.value);
        if (current < 8) {
            slider.value = current + 1;
            this.updateSimulation();
            this.$('#result-text').innerHTML = `<strong style="color: #f59e0b;">Lane added!</strong> Watch how more drivers appear to fill the new capacity. This is "induced demand" - better roads attract more driving until congestion returns.`;
        }
    }

    updateExplanation(lanes, driveTime, transitTime, congestion) {
        const diff = Math.abs(driveTime - transitTime);
        let text;

        if (diff < 5) {
            text = `<strong style="color: #22c55e;">EQUILIBRIUM:</strong> Driving (${Math.round(driveTime)} min) ≈ Transit (${Math.round(transitTime)} min). People have no incentive to switch modes. This is the Downs-Thomson equilibrium.`;
        } else if (driveTime < transitTime) {
            text = `Driving (${Math.round(driveTime)} min) is faster than transit (${Math.round(transitTime)} min). More people will switch to driving until times equalize.`;
        } else {
            text = `Transit (${Math.round(transitTime)} min) is faster than driving (${Math.round(driveTime)} min). More people will switch to transit until times equalize.`;
        }

        if (lanes >= 7) {
            text += ' <strong style="color: #ef4444;">Despite many lanes, congestion persists because more capacity induced more driving!</strong>';
        }

        this.$('#result-text').innerHTML = text;
    }

    reset() {
        this.$('#road-lanes').value = 4;
        this.$('#transit-quality').value = 50;
        this.updateSimulation();
    }
}

customElements.define('downs-thomson-simulator', DownsThomsonSimulator);

export { DownsThomsonSimulator };
