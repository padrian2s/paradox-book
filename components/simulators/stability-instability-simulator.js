import { SimulatorBase } from '../simulator-base.js';

class StabilityInstabilitySimulator extends SimulatorBase {
    constructor() {
        super();
        this.state = {
            nuclearPowers: true,
            conflicts: []
        };
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .world-viz {
                    background: var(--bg, #0f172a);
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    margin: 1rem 0;
                }

                .conflict-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .conflict-zone {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .conflict-zone h5 {
                    margin: 0 0 0.5rem 0;
                    color: var(--accent, #f59e0b);
                }

                .conflict-type {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }

                .risk-bar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin: 1rem 0;
                }

                .risk-meter {
                    flex: 1;
                    height: 20px;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    margin: 0 1rem;
                    overflow: hidden;
                }

                .risk-fill {
                    height: 100%;
                    border-radius: 0.5rem;
                    transition: width 0.5s, background 0.5s;
                }

                .nuclear-status {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 1.5rem;
                }

                .nuke-icon {
                    font-size: 2rem;
                }

                .stats-row {
                    display: flex;
                    justify-content: space-around;
                    margin-top: 1rem;
                    text-align: center;
                }

                .stat {
                    padding: 0.5rem;
                }

                .stat-value {
                    font-size: 1.5rem;
                    font-weight: bold;
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }

                @media (max-width: 768px) {
                    .conflict-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>Nuclear Deterrence Simulation</h4>

            <div class="controls">
                <button id="with-nukes-btn">World WITH Nukes</button>
                <button id="without-nukes-btn">World WITHOUT Nukes</button>
            </div>

            <div class="world-viz">
                <div class="nuclear-status">
                    <span class="nuke-icon" id="nuke-icon">&#9762;</span>
                    <span id="nuke-status">Nuclear weapons exist between major powers</span>
                </div>

                <div class="risk-bar">
                    <span>Major War</span>
                    <div class="risk-meter">
                        <div class="risk-fill" id="major-war-risk" style="width: 5%; background: #22c55e;"></div>
                    </div>
                    <span id="major-war-pct">5%</span>
                </div>

                <div class="risk-bar">
                    <span>Minor Conflicts</span>
                    <div class="risk-meter">
                        <div class="risk-fill" id="minor-conflict-risk" style="width: 60%; background: #f59e0b;"></div>
                    </div>
                    <span id="minor-conflict-pct">60%</span>
                </div>

                <div class="conflict-grid" id="conflicts">
                    <div class="conflict-zone">
                        <h5>Proxy War A</h5>
                        <div class="conflict-type">Limited engagement under nuclear umbrella</div>
                    </div>
                    <div class="conflict-zone">
                        <h5>Border Skirmish B</h5>
                        <div class="conflict-type">Conventional forces only</div>
                    </div>
                </div>

                <div class="stats-row">
                    <div class="stat">
                        <div class="stat-value" id="deaths" style="color: #f59e0b;">50K</div>
                        <div class="stat-label">Annual Conflict Deaths</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value" id="major-wars" style="color: #22c55e;">0</div>
                        <div class="stat-label">Major Power Wars</div>
                    </div>
                </div>
            </div>

            <div class="result">
                <p id="result-text">Nuclear deterrence prevents major wars but enables minor conflicts. Click to compare scenarios.</p>
            </div>

            <div class="insight">
                "The stability-instability paradox" (Glenn Snyder): Nuclear weapons make total war unthinkable, but this very stability allows powers to engage in limited conflicts without fear of escalation to nuclear war.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#with-nukes-btn').addEventListener('click', () => this.showWithNukes());
        this.$('#without-nukes-btn').addEventListener('click', () => this.showWithoutNukes());
    }

    showWithNukes() {
        this.$('#nuke-icon').textContent = '\u2622';
        this.$('#nuke-status').textContent = 'Nuclear weapons exist between major powers';

        this.$('#major-war-risk').style.width = '5%';
        this.$('#major-war-risk').style.background = '#22c55e';
        this.$('#major-war-pct').textContent = '5%';

        this.$('#minor-conflict-risk').style.width = '70%';
        this.$('#minor-conflict-risk').style.background = '#f59e0b';
        this.$('#minor-conflict-pct').textContent = '70%';

        this.$('#conflicts').innerHTML = `
            <div class="conflict-zone">
                <h5>Proxy War</h5>
                <div class="conflict-type">Major powers fight through allies</div>
            </div>
            <div class="conflict-zone">
                <h5>Border Skirmish</h5>
                <div class="conflict-type">Limited conventional engagement</div>
            </div>
            <div class="conflict-zone">
                <h5>Cyber Warfare</h5>
                <div class="conflict-type">Below nuclear threshold</div>
            </div>
            <div class="conflict-zone">
                <h5>Economic Warfare</h5>
                <div class="conflict-type">Sanctions and trade wars</div>
            </div>
        `;

        this.$('#deaths').textContent = '50K';
        this.$('#deaths').style.color = '#f59e0b';
        this.$('#major-wars').textContent = '0';
        this.$('#major-wars').style.color = '#22c55e';

        this.$('#result-text').innerHTML = `
            <span style="color: #22c55e;">No major power wars</span> but
            <span style="color: #f59e0b;">many proxy conflicts</span>.<br>
            Nuclear umbrella makes limited aggression "safe" - the paradox in action.
        `;
    }

    showWithoutNukes() {
        this.$('#nuke-icon').textContent = '\u2714';
        this.$('#nuke-status').textContent = 'No nuclear weapons (hypothetical)';

        this.$('#major-war-risk').style.width = '40%';
        this.$('#major-war-risk').style.background = '#ef4444';
        this.$('#major-war-pct').textContent = '40%';

        this.$('#minor-conflict-risk').style.width = '30%';
        this.$('#minor-conflict-risk').style.background = '#22c55e';
        this.$('#minor-conflict-pct').textContent = '30%';

        this.$('#conflicts').innerHTML = `
            <div class="conflict-zone">
                <h5>WORLD WAR III</h5>
                <div class="conflict-type" style="color: #ef4444;">Full conventional war between major powers</div>
            </div>
            <div class="conflict-zone">
                <h5>Regional War</h5>
                <div class="conflict-type">Direct great power intervention</div>
            </div>
        `;

        this.$('#deaths').textContent = '10M+';
        this.$('#deaths').style.color = '#ef4444';
        this.$('#major-wars').textContent = '1-2';
        this.$('#major-wars').style.color = '#ef4444';

        this.$('#result-text').innerHTML = `
            <span style="color: #ef4444;">Major wars possible</span> but
            <span style="color: #22c55e;">fewer proxy conflicts</span>.<br>
            Without nuclear deterrence, major powers might directly confront each other.
        `;
    }
}

customElements.define('stability-instability-simulator', StabilityInstabilitySimulator);

export { StabilityInstabilitySimulator };
