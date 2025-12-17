import { SimulatorBase } from '../simulator-base.js';

class AirConditioningSimulator extends SimulatorBase {
    constructor() {
        super();
        this.acUnits = 1;
        this.animationInterval = null;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .simulation-area {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                }

                .scene {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    height: 200px;
                    padding: 1rem;
                    background: linear-gradient(180deg, #1e3a5f 0%, #0f172a 100%);
                    border-radius: 0.5rem;
                    position: relative;
                    overflow: hidden;
                }

                .sun {
                    position: absolute;
                    top: 10px;
                    right: 20px;
                    font-size: 2.5rem;
                    transition: all 0.5s ease;
                }

                .building {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 80px;
                    background: var(--card, #1e293b);
                    border-radius: 4px 4px 0 0;
                    height: 120px;
                    position: relative;
                }

                .building-label {
                    font-size: 0.6rem;
                    color: var(--text);
                    text-align: center;
                    padding: 0.25rem;
                }

                .ac-unit {
                    width: 20px;
                    height: 15px;
                    background: #94a3b8;
                    margin: 2px;
                    border-radius: 2px;
                    position: relative;
                }

                .heat-wave {
                    position: absolute;
                    right: -15px;
                    top: 2px;
                    font-size: 0.75rem;
                    opacity: 0;
                    animation: heat-emit 1s infinite;
                }

                @keyframes heat-emit {
                    0% { opacity: 0; transform: translateX(0); }
                    50% { opacity: 1; }
                    100% { opacity: 0; transform: translateX(10px); }
                }

                .ac-units-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 2px;
                    padding: 5px;
                    justify-content: center;
                }

                .thermometer {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 0.5rem;
                }

                .thermo-display {
                    font-size: 1.5rem;
                    font-weight: bold;
                    transition: color 0.3s ease;
                }

                .thermo-label {
                    font-size: 0.7rem;
                    color: var(--muted);
                }

                .stats-panel {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .stat-box {
                    padding: 0.75rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .stat-value {
                    font-size: 1.25rem;
                    font-weight: bold;
                    color: var(--primary, #6366f1);
                }

                .stat-label {
                    font-size: 0.7rem;
                    color: var(--muted);
                    margin-top: 0.25rem;
                }

                .cycle-diagram {
                    margin-top: 1rem;
                    padding: 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                }

                .cycle-title {
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                    margin-bottom: 0.5rem;
                    text-align: center;
                }

                .cycle-flow {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                    font-size: 0.875rem;
                }

                .cycle-step {
                    padding: 0.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.25rem;
                    text-align: center;
                }

                .cycle-arrow {
                    color: var(--primary, #6366f1);
                }

                @media (max-width: 600px) {
                    .stats-panel {
                        grid-template-columns: 1fr;
                    }
                    .building {
                        width: 60px;
                        height: 100px;
                    }
                }
            </style>

            <h4>Air Conditioning Paradox</h4>
            <p style="color: var(--muted); margin-bottom: 1rem;">Cooling inside heats outside even more.</p>

            <div class="controls">
                <div class="control-group">
                    <label>AC Units: <span id="ac-count">1</span></label>
                    <input type="range" id="ac-slider" min="1" max="10" value="1">
                </div>
                <button id="simulate-btn">See the Effect</button>
            </div>

            <div class="simulation-area">
                <div class="scene">
                    <div class="sun" id="sun">&#x2600;&#xFE0F;</div>

                    <div class="building">
                        <div class="building-label">Indoor</div>
                        <div class="thermometer">
                            <div class="thermo-display" id="indoor-temp" style="color: #22c55e;">72F</div>
                            <div class="thermo-label">Cool</div>
                        </div>
                    </div>

                    <div class="building" style="height: 140px;">
                        <div class="building-label">AC Units</div>
                        <div class="ac-units-container" id="ac-container">
                            <div class="ac-unit"><span class="heat-wave">&#x1F525;</span></div>
                        </div>
                    </div>

                    <div class="building">
                        <div class="building-label">Outdoor</div>
                        <div class="thermometer">
                            <div class="thermo-display" id="outdoor-temp" style="color: #f59e0b;">85F</div>
                            <div class="thermo-label">Hot</div>
                        </div>
                    </div>
                </div>

                <div class="stats-panel">
                    <div class="stat-box">
                        <div class="stat-value" id="energy-use">1x</div>
                        <div class="stat-label">Energy Used</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-value" id="heat-released">1.3x</div>
                        <div class="stat-label">Heat Released Outside</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-value" id="net-effect">+0.3</div>
                        <div class="stat-label">Net Heat Added</div>
                    </div>
                </div>
            </div>

            <div class="result" id="result">
                <p>For every unit of heat removed from inside, MORE than one unit is released outside.</p>
                <p>This is due to the energy needed to run the AC itself.</p>
            </div>

            <div class="cycle-diagram">
                <div class="cycle-title">The Vicious Cycle</div>
                <div class="cycle-flow">
                    <div class="cycle-step">Hot Day</div>
                    <span class="cycle-arrow">&#x2192;</span>
                    <div class="cycle-step">Use AC</div>
                    <span class="cycle-arrow">&#x2192;</span>
                    <div class="cycle-step">Emit Heat + CO2</div>
                    <span class="cycle-arrow">&#x2192;</span>
                    <div class="cycle-step">Climate Warms</div>
                    <span class="cycle-arrow">&#x2192;</span>
                    <div class="cycle-step">Hotter Days</div>
                    <span class="cycle-arrow">&#x21BA;</span>
                </div>
            </div>

            <div class="insight">
                Air conditioning creates a tragedy of the commons: individually rational cooling decisions collectively make the planet hotter, requiring even more cooling.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#ac-slider').addEventListener('input', (e) => this.updateACUnits(parseInt(e.target.value)));
        this.$('#simulate-btn').addEventListener('click', () => this.runSimulation());
        this.updateACUnits(1);
    }

    updateACUnits(count) {
        this.acUnits = count;
        this.$('#ac-count').textContent = count;

        const container = this.$('#ac-container');
        container.innerHTML = '';

        for (let i = 0; i < count; i++) {
            const unit = document.createElement('div');
            unit.className = 'ac-unit';
            unit.innerHTML = '<span class="heat-wave">&#x1F525;</span>';
            container.appendChild(unit);
        }

        this.updateStats();
    }

    updateStats() {
        const energyMultiplier = this.acUnits;
        const heatReleased = this.acUnits * 1.3;
        const netHeat = heatReleased - this.acUnits + (this.acUnits * 0.3);

        this.$('#energy-use').textContent = energyMultiplier + 'x';
        this.$('#heat-released').textContent = heatReleased.toFixed(1) + 'x';
        this.$('#net-effect').textContent = '+' + (this.acUnits * 0.3).toFixed(1);

        const baseOutdoor = 85;
        const outdoorTemp = baseOutdoor + (this.acUnits * 0.5);
        this.$('#outdoor-temp').textContent = Math.round(outdoorTemp) + 'F';

        if (outdoorTemp > 90) {
            this.$('#outdoor-temp').style.color = '#dc2626';
        } else if (outdoorTemp > 87) {
            this.$('#outdoor-temp').style.color = '#f59e0b';
        } else {
            this.$('#outdoor-temp').style.color = '#f59e0b';
        }

        const sunScale = 1 + (this.acUnits * 0.05);
        this.$('#sun').style.transform = `scale(${sunScale})`;
    }

    runSimulation() {
        let step = 0;
        const maxSteps = 10;

        if (this.animationInterval) {
            clearInterval(this.animationInterval);
        }

        this.animationInterval = setInterval(() => {
            if (step < maxSteps) {
                this.acUnits = Math.min(10, this.acUnits + 1);
                this.$('#ac-slider').value = this.acUnits;
                this.updateACUnits(this.acUnits);

                this.$('#result').innerHTML = `
                    <p style="color: var(--accent);"><strong>Getting hotter outside!</strong></p>
                    <p>More AC needed... which makes it even hotter...</p>
                    <p>Urban heat island effect: ${this.acUnits * 0.5}F added to local temperature.</p>
                `;

                step++;
            } else {
                clearInterval(this.animationInterval);
                this.$('#result').innerHTML = `
                    <p style="color: #dc2626;"><strong>Maximum AC - Maximum Heat!</strong></p>
                    <p>Cities with heavy AC use can be 5-10F hotter than surrounding areas.</p>
                    <p>Global AC emissions may add 0.5C to global warming by 2100.</p>
                `;
            }
        }, 500);
    }

    cleanup() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
        }
    }
}

customElements.define('air-conditioning-simulator', AirConditioningSimulator);

export { AirConditioningSimulator };
