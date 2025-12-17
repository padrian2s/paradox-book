import { SimulatorBase } from '../simulator-base.js';

class GlucoseParadoxSimulator extends SimulatorBase {
    constructor() {
        super();
        this.glucoseUptake = 30;
        this.glycogenStored = 0;
        this.directPathway = 0;
        this.indirectPathway = 0;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .liver-diagram {
                    background: linear-gradient(135deg, #7c2d12 0%, #9a3412 50%, #7c2d12 100%);
                    border-radius: 0.5rem;
                    padding: 1.5rem;
                    margin-top: 1rem;
                    position: relative;
                    min-height: 200px;
                }

                .liver-shape {
                    background: #dc2626;
                    width: 180px;
                    height: 120px;
                    border-radius: 60% 40% 50% 50%;
                    margin: 0 auto;
                    position: relative;
                    box-shadow: inset -10px -10px 30px rgba(0,0,0,0.3);
                }

                .glycogen-fill {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: linear-gradient(180deg, #fbbf24, #f59e0b);
                    border-radius: 0 0 50% 50%;
                    transition: height 0.5s;
                }

                .pathway-arrows {
                    display: flex;
                    justify-content: space-around;
                    margin-top: 1rem;
                }

                .pathway {
                    text-align: center;
                    padding: 0.5rem;
                    border-radius: 0.5rem;
                    background: var(--bg, #0f172a);
                    min-width: 120px;
                }

                .pathway-name {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-bottom: 0.25rem;
                }

                .pathway-value {
                    font-size: 1.25rem;
                    font-weight: bold;
                }

                .direct-pathway { color: #3b82f6; }
                .indirect-pathway { color: #22c55e; }

                .molecule-flow {
                    display: flex;
                    justify-content: center;
                    gap: 0.5rem;
                    margin-top: 1rem;
                    flex-wrap: wrap;
                }

                .molecule {
                    padding: 0.25rem 0.5rem;
                    border-radius: 0.25rem;
                    font-size: 0.7rem;
                    font-weight: bold;
                }

                .glucose { background: #fbbf24; color: #1f2937; }
                .pyruvate { background: #a855f7; color: white; }
                .lactate { background: #ec4899; color: white; }
                .glycogen { background: #f59e0b; color: #1f2937; }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 0.75rem;
                    margin-top: 1rem;
                }

                .stat-box {
                    background: var(--bg, #0f172a);
                    padding: 0.75rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .stat-value {
                    font-size: 1.25rem;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                }

                .stat-label {
                    font-size: 0.65rem;
                    color: var(--muted, #94a3b8);
                }

                .comparison-chart {
                    background: var(--bg, #0f172a);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .bar-row {
                    margin-bottom: 0.75rem;
                }

                .bar-label {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.75rem;
                    margin-bottom: 0.25rem;
                }

                .bar-track {
                    height: 24px;
                    background: var(--card, #1e293b);
                    border-radius: 4px;
                    overflow: hidden;
                }

                .bar-fill {
                    height: 100%;
                    display: flex;
                    align-items: center;
                    padding-left: 0.5rem;
                    font-size: 0.7rem;
                    color: white;
                    font-weight: bold;
                    transition: width 0.5s;
                }

                .expected-bar { background: linear-gradient(90deg, #3b82f6, #2563eb); }
                .actual-bar { background: linear-gradient(90deg, #f59e0b, #d97706); }

                .glycogen-counter {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: white;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
                }

                @media (max-width: 768px) {
                    .stats-grid {
                        grid-template-columns: repeat(3, 1fr);
                    }

                    .stat-value {
                        font-size: 1rem;
                    }
                }
            </style>

            <h4>Liver Glycogen Storage</h4>
            <p style="color: var(--muted, #94a3b8); margin-bottom: 1rem;">Adjust glucose intake and see how the liver stores more glycogen than direct uptake can explain.</p>

            <div class="controls">
                <div class="control-group">
                    <label>Glucose Intake: <span id="glucose-val">30</span>g</label>
                    <input type="range" id="glucose-slider" min="10" max="100" value="30">
                </div>
                <button id="process-btn">Process Glucose</button>
            </div>

            <div class="liver-diagram">
                <div class="liver-shape">
                    <div class="glycogen-fill" id="glycogen-fill" style="height: 0%;"></div>
                    <div class="glycogen-counter" id="glycogen-counter">0g</div>
                </div>
            </div>

            <div class="pathway-arrows">
                <div class="pathway">
                    <div class="pathway-name">Direct Pathway</div>
                    <div class="pathway-value direct-pathway" id="direct-val">0g</div>
                    <div style="font-size: 0.6rem; color: var(--muted);">Glucose -> Glycogen</div>
                </div>
                <div class="pathway">
                    <div class="pathway-name">Indirect Pathway</div>
                    <div class="pathway-value indirect-pathway" id="indirect-val">0g</div>
                    <div style="font-size: 0.6rem; color: var(--muted);">Via Lactate/Pyruvate</div>
                </div>
            </div>

            <div class="molecule-flow">
                <span class="molecule glucose">Glucose</span>
                <span style="color: var(--muted);">-></span>
                <span class="molecule pyruvate">Pyruvate</span>
                <span style="color: var(--muted);">-></span>
                <span class="molecule lactate">Lactate</span>
                <span style="color: var(--muted);">-></span>
                <span class="molecule glycogen">Glycogen</span>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="uptake-val">0g</div>
                    <div class="stat-label">Direct Liver Uptake</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="stored-val">0g</div>
                    <div class="stat-label">Total Glycogen Stored</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="ratio-val">0x</div>
                    <div class="stat-label">Paradox Ratio</div>
                </div>
            </div>

            <div class="comparison-chart">
                <div class="bar-row">
                    <div class="bar-label">
                        <span>Expected (Direct Only)</span>
                        <span id="expected-pct">0g</span>
                    </div>
                    <div class="bar-track">
                        <div class="bar-fill expected-bar" id="expected-bar" style="width: 0%;"></div>
                    </div>
                </div>
                <div class="bar-row">
                    <div class="bar-label">
                        <span>Actual Glycogen Stored</span>
                        <span id="actual-pct">0g</span>
                    </div>
                    <div class="bar-track">
                        <div class="bar-fill actual-bar" id="actual-bar" style="width: 0%;"></div>
                    </div>
                </div>
            </div>

            <div class="result" id="result-area">
                <p>Click "Process Glucose" to see the paradox in action.</p>
            </div>

            <div class="insight">
                The liver's direct glucose uptake accounts for only ~30% of glycogen synthesis. The rest comes from "gluconeogenesis" using lactate and amino acids from peripheral tissues - creating glycogen from non-glucose precursors. This indirect pathway was discovered by J.D. McGarry.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#glucose-slider').addEventListener('input', (e) => {
            this.$('#glucose-val').textContent = e.target.value;
            this.glucoseUptake = parseInt(e.target.value);
        });

        this.$('#process-btn').addEventListener('click', () => this.processGlucose());
    }

    processGlucose() {
        const glucose = this.glucoseUptake;

        this.directPathway = glucose * 0.25;

        this.indirectPathway = glucose * 0.45;

        this.glycogenStored = this.directPathway + this.indirectPathway;

        this.animateStorage();
    }

    animateStorage() {
        const targetFill = Math.min((this.glycogenStored / 70) * 100, 100);

        this.$('#glycogen-fill').style.height = targetFill + '%';
        this.$('#glycogen-counter').textContent = this.glycogenStored.toFixed(1) + 'g';

        this.$('#direct-val').textContent = this.directPathway.toFixed(1) + 'g';
        this.$('#indirect-val').textContent = this.indirectPathway.toFixed(1) + 'g';

        this.$('#uptake-val').textContent = this.directPathway.toFixed(1) + 'g';
        this.$('#stored-val').textContent = this.glycogenStored.toFixed(1) + 'g';

        const ratio = this.glycogenStored / this.directPathway;
        this.$('#ratio-val').textContent = ratio.toFixed(1) + 'x';

        const maxBar = Math.max(this.directPathway, this.glycogenStored);
        this.$('#expected-bar').style.width = (this.directPathway / maxBar) * 100 + '%';
        this.$('#actual-bar').style.width = (this.glycogenStored / maxBar) * 100 + '%';
        this.$('#expected-pct').textContent = this.directPathway.toFixed(1) + 'g';
        this.$('#actual-pct').textContent = this.glycogenStored.toFixed(1) + 'g';

        const result = this.$('#result-area');
        result.innerHTML = `
            <p><strong>The Paradox:</strong> From ${this.glucoseUptake}g glucose intake, direct liver uptake was only ${this.directPathway.toFixed(1)}g,
            yet the liver stored ${this.glycogenStored.toFixed(1)}g of glycogen - <strong>${ratio.toFixed(1)}x more</strong> than direct uptake alone can explain!</p>
            <p style="margin-top: 0.5rem; font-size: 0.875rem; color: var(--muted);">
                The extra ${this.indirectPathway.toFixed(1)}g came via the indirect pathway through peripheral tissue metabolism.
            </p>
        `;
    }
}

customElements.define('glucose-paradox-simulator', GlucoseParadoxSimulator);

export { GlucoseParadoxSimulator };
