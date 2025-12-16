/**
 * Region-Beta Paradox Simulator
 * Demonstrates how we often recover FASTER from intense negative events than mild ones
 */
import { SimulatorBase } from '../simulator-base.js';

class RegionBetaSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .region-beta-viz {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                    text-align: center;
                }

                .event-display {
                    margin-bottom: 1.5rem;
                }

                .event-icon {
                    font-size: 3rem;
                }

                .event-label {
                    font-weight: bold;
                    margin-top: 0.5rem;
                    color: var(--text, #e2e8f0);
                }

                .recovery-display {
                    margin-bottom: 1.5rem;
                }

                .recovery-label {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                    margin-bottom: 0.5rem;
                }

                .recovery-bar {
                    width: 100%;
                    height: 30px;
                    background: var(--card, #1e293b);
                    border-radius: 0.25rem;
                    overflow: hidden;
                }

                .recovery-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #22c55e, #f59e0b, #ef4444);
                    transition: width 0.5s;
                }

                .recovery-time {
                    margin-top: 0.5rem;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                }

                .coping-display {
                    margin-top: 1rem;
                }

                .coping-label {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                    margin-bottom: 0.5rem;
                }

                .coping-list {
                    display: flex;
                    justify-content: center;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                }

                .coping-item {
                    padding: 0.25rem 0.75rem;
                    background: var(--card, #1e293b);
                    border-radius: 1rem;
                    font-size: 0.875rem;
                    transition: all 0.3s;
                }

                .coping-item.active {
                    background: #22c55e;
                    color: white;
                }

                .coping-item.inactive {
                    opacity: 0.4;
                }

                .severity-graph {
                    margin-top: 1.5rem;
                    padding: 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                }

                .graph-container {
                    position: relative;
                    height: 120px;
                    margin-top: 0.5rem;
                }

                .graph-line {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 100%;
                }

                .graph-line svg {
                    width: 100%;
                    height: 100%;
                }

                .graph-marker {
                    position: absolute;
                    width: 12px;
                    height: 12px;
                    background: var(--accent, #f59e0b);
                    border-radius: 50%;
                    transform: translate(-50%, 50%);
                    transition: left 0.3s, bottom 0.3s;
                    box-shadow: 0 0 10px var(--accent, #f59e0b);
                }

                .graph-labels {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.5rem;
                }

                .axis-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    text-align: center;
                    margin-top: 0.25rem;
                }

                @media (max-width: 600px) {
                    .region-beta-viz {
                        padding: 1rem;
                    }
                    .event-icon {
                        font-size: 2.5rem;
                    }
                }
            </style>

            <h4>Recovery Time Simulator</h4>

            <div class="controls">
                <div class="control-group">
                    <label>Event Severity: <span id="severity-val">50</span>%</label>
                    <input type="range" id="severity-slider" min="0" max="100" value="50">
                </div>
            </div>

            <div class="region-beta-viz">
                <div class="event-display">
                    <div class="event-icon" id="event-icon">😟</div>
                    <div class="event-label" id="event-label">Moderate Setback</div>
                </div>

                <div class="recovery-display">
                    <div class="recovery-label">Recovery Time</div>
                    <div class="recovery-bar">
                        <div class="recovery-fill" id="recovery-fill" style="width: 60%"></div>
                    </div>
                    <div class="recovery-time" id="recovery-time">~2-3 months</div>
                </div>

                <div class="coping-display">
                    <div class="coping-label">Coping Mechanisms Triggered</div>
                    <div class="coping-list" id="coping-list">
                        <span class="coping-item inactive" data-index="0">Therapy</span>
                        <span class="coping-item inactive" data-index="1">Support</span>
                        <span class="coping-item inactive" data-index="2">Meaning</span>
                    </div>
                </div>

                <div class="severity-graph">
                    <div class="recovery-label">Recovery Time vs Event Severity</div>
                    <div class="graph-container">
                        <div class="graph-line">
                            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                                <polyline
                                    points="0,70 25,80 50,90 75,95 85,60 100,50"
                                    fill="none"
                                    stroke="var(--primary, #6366f1)"
                                    stroke-width="2"
                                    vector-effect="non-scaling-stroke"
                                />
                            </svg>
                        </div>
                        <div class="graph-marker" id="graph-marker"></div>
                    </div>
                    <div class="graph-labels">
                        <span>Minor</span>
                        <span>Moderate</span>
                        <span>Severe</span>
                        <span>Major</span>
                    </div>
                    <div class="axis-label">Event Severity</div>
                </div>
            </div>

            <div class="result">
                <p id="region-beta-result">Adjust severity to see how recovery time changes non-linearly...</p>
            </div>

            <div class="insight">
                "Psychological immune system" kicks in for major events. A bad grade might bother you for weeks, but failing completely triggers rationalization and recovery.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#severity-slider').addEventListener('input', () => this.update());
        this.update();
    }

    update() {
        const severity = parseInt(this.$('#severity-slider').value);
        this.$('#severity-val').textContent = severity;

        let icon, label, recoveryPct, recoveryTime, copingActive;

        if (severity < 25) {
            icon = '😐'; label = 'Minor Annoyance';
            recoveryPct = 30; recoveryTime = '~2 weeks';
            copingActive = 0;
        } else if (severity < 50) {
            icon = '😟'; label = 'Moderate Setback';
            recoveryPct = 60; recoveryTime = '~2-3 months';
            copingActive = 0;
        } else if (severity < 75) {
            icon = '😢'; label = 'Significant Problem';
            recoveryPct = 80; recoveryTime = '~3-6 months';
            copingActive = 1;
        } else {
            icon = '😭'; label = 'Major Trauma';
            recoveryPct = 50; recoveryTime = '~1-2 months';
            copingActive = 3;
        }

        this.$('#event-icon').textContent = icon;
        this.$('#event-label').textContent = label;
        this.$('#recovery-fill').style.width = recoveryPct + '%';
        this.$('#recovery-time').textContent = recoveryTime;

        const copingItems = this.$$('.coping-item');
        copingItems.forEach((item, i) => {
            item.classList.toggle('active', i < copingActive);
            item.classList.toggle('inactive', i >= copingActive);
        });

        const marker = this.$('#graph-marker');
        const markerX = severity;
        let markerY;
        if (severity < 25) {
            markerY = 30 + (severity / 25) * 10;
        } else if (severity < 50) {
            markerY = 40 + ((severity - 25) / 25) * 10;
        } else if (severity < 75) {
            markerY = 50 + ((severity - 50) / 25) * 45;
        } else {
            markerY = 95 - ((severity - 75) / 25) * 45;
        }
        marker.style.left = markerX + '%';
        marker.style.bottom = (100 - markerY) + '%';

        if (severity >= 75) {
            this.$('#region-beta-result').innerHTML =
                '<strong style="color: #22c55e;">PARADOX!</strong> Major events trigger coping mechanisms (therapy, support, meaning-making) that speed recovery. Minor annoyances just linger!';
        } else if (severity >= 50) {
            this.$('#region-beta-result').textContent =
                'Moderate problems: Not bad enough to trigger full coping response, so recovery takes longer.';
        } else {
            this.$('#region-beta-result').textContent =
                'Minor issues persist because they don\'t seem worth addressing. The "psychological immune system" doesn\'t activate.';
        }
    }
}

customElements.define('region-beta-simulator', RegionBetaSimulator);

export { RegionBetaSimulator };
