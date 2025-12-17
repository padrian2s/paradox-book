import { SimulatorBase } from '../simulator-base.js';

class IcarusParadoxSimulator extends SimulatorBase {
    constructor() {
        super();
        this.state = {
            companyType: 'craftsman',
            year: 0,
            success: 50,
            rigidity: 0,
            marketFit: 100,
            phase: 'growth'
        };
        this.archetypes = {
            craftsman: {
                name: 'The Craftsman',
                strength: 'Quality & Engineering',
                weakness: 'Becomes obsessed with perfection, ignores market',
                trajectory: 'Tinkerer'
            },
            builder: {
                name: 'The Builder',
                strength: 'Growth & Expansion',
                weakness: 'Overexpands, loses focus, bureaucracy',
                trajectory: 'Imperialist'
            },
            pioneer: {
                name: 'The Pioneer',
                strength: 'Innovation & R&D',
                weakness: 'Chases moonshots, ignores profitable core',
                trajectory: 'Escapist'
            },
            salesman: {
                name: 'The Salesman',
                strength: 'Marketing & Sales',
                weakness: 'Style over substance, loses quality',
                trajectory: 'Drifter'
            }
        };
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .company-viz {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .archetype-select {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                    gap: 0.75rem;
                    margin-bottom: 1.5rem;
                }

                .archetype-btn {
                    padding: 0.75rem;
                    background: var(--card, #1e293b);
                    border: 2px solid transparent;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    text-align: center;
                    transition: all 0.2s;
                }

                .archetype-btn:hover {
                    border-color: var(--primary, #6366f1);
                }

                .archetype-btn.selected {
                    border-color: #22c55e;
                    background: rgba(34, 197, 94, 0.1);
                }

                .archetype-name {
                    font-weight: bold;
                    font-size: 0.875rem;
                }

                .archetype-trait {
                    font-size: 0.7rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                .trajectory-display {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    margin-bottom: 1rem;
                }

                .trajectory-arrow {
                    font-size: 1.5rem;
                    color: var(--muted, #94a3b8);
                }

                .trajectory-box {
                    text-align: center;
                    padding: 0.5rem 1rem;
                    border-radius: 0.25rem;
                }

                .trajectory-box.success { background: rgba(34, 197, 94, 0.2); border: 1px solid #22c55e; }
                .trajectory-box.danger { background: rgba(239, 68, 68, 0.2); border: 1px solid #ef4444; }

                .metrics-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    margin: 1rem 0;
                }

                .metric-card {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                }

                .metric-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-bottom: 0.5rem;
                }

                .metric-bar {
                    height: 12px;
                    background: var(--bg, #0f172a);
                    border-radius: 6px;
                    overflow: hidden;
                }

                .metric-fill {
                    height: 100%;
                    transition: width 0.5s, background 0.5s;
                }

                .metric-fill.success { background: linear-gradient(90deg, #22c55e, #16a34a); }
                .metric-fill.warning { background: linear-gradient(90deg, #f59e0b, #d97706); }
                .metric-fill.danger { background: linear-gradient(90deg, #ef4444, #dc2626); }

                .metric-value {
                    text-align: right;
                    font-size: 0.875rem;
                    margin-top: 0.25rem;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .stat-box {
                    background: var(--card, #1e293b);
                    padding: 1rem;
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
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                @media (max-width: 600px) {
                    .trajectory-display {
                        flex-direction: column;
                        gap: 0.5rem;
                    }
                    .trajectory-arrow {
                        transform: rotate(90deg);
                    }
                }
            </style>

            <h4>Company Trajectory Simulator</h4>
            <p style="margin-bottom: 1rem; color: var(--muted);">Select a company archetype and watch how its greatest strength becomes its fatal flaw.</p>

            <div class="company-viz">
                <div class="archetype-select">
                    <div class="archetype-btn selected" data-type="craftsman">
                        <div class="archetype-name">Craftsman</div>
                        <div class="archetype-trait">Quality Focus</div>
                    </div>
                    <div class="archetype-btn" data-type="builder">
                        <div class="archetype-name">Builder</div>
                        <div class="archetype-trait">Growth Focus</div>
                    </div>
                    <div class="archetype-btn" data-type="pioneer">
                        <div class="archetype-name">Pioneer</div>
                        <div class="archetype-trait">Innovation Focus</div>
                    </div>
                    <div class="archetype-btn" data-type="salesman">
                        <div class="archetype-name">Salesman</div>
                        <div class="archetype-trait">Marketing Focus</div>
                    </div>
                </div>

                <div class="trajectory-display">
                    <div class="trajectory-box success">
                        <div style="font-weight: bold;" id="strength-name">The Craftsman</div>
                        <div style="font-size: 0.75rem;" id="strength-trait">Quality & Engineering</div>
                    </div>
                    <div class="trajectory-arrow">→</div>
                    <div class="trajectory-box danger">
                        <div style="font-weight: bold;" id="weakness-name">The Tinkerer</div>
                        <div style="font-size: 0.75rem;" id="weakness-trait">Ignores market needs</div>
                    </div>
                </div>

                <div class="metrics-grid">
                    <div class="metric-card">
                        <div class="metric-label">Success / Market Position</div>
                        <div class="metric-bar">
                            <div class="metric-fill success" id="success-fill" style="width: 50%"></div>
                        </div>
                        <div class="metric-value" id="success-value">50%</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-label">Organizational Rigidity</div>
                        <div class="metric-bar">
                            <div class="metric-fill success" id="rigidity-fill" style="width: 0%"></div>
                        </div>
                        <div class="metric-value" id="rigidity-value">0%</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-label">Market Fit</div>
                        <div class="metric-bar">
                            <div class="metric-fill success" id="fit-fill" style="width: 100%"></div>
                        </div>
                        <div class="metric-value" id="fit-value">100%</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-label">Adaptability</div>
                        <div class="metric-bar">
                            <div class="metric-fill success" id="adapt-fill" style="width: 100%"></div>
                        </div>
                        <div class="metric-value" id="adapt-value">100%</div>
                    </div>
                </div>
            </div>

            <div class="controls">
                <button id="advance-btn">Advance 5 Years</button>
                <button id="disrupt-btn">Market Disruption!</button>
                <button id="reset-btn">Reset Company</button>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="year-num">0</div>
                    <div class="stat-label">Year</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="phase-name">Growth</div>
                    <div class="stat-label">Phase</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="peak-year">-</div>
                    <div class="stat-label">Peak Year</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="fate">Active</div>
                    <div class="stat-label">Status</div>
                </div>
            </div>

            <div class="result">
                <p id="icarus-result">Select an archetype and advance time to see how success breeds the seeds of failure.</p>
            </div>

            <div class="insight">
                The Icarus Paradox: Companies fail not despite their strengths, but because of them. Success leads to specialization, which becomes rigidity, which prevents adaptation to change.
            </div>
        `;
    }

    setupEventListeners() {
        this.$$('.archetype-btn').forEach(btn => {
            btn.addEventListener('click', () => this.selectArchetype(btn.dataset.type));
        });
        this.$('#advance-btn').addEventListener('click', () => this.advanceTime());
        this.$('#disrupt-btn').addEventListener('click', () => this.marketDisruption());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
        this.updateDisplay();
    }

    selectArchetype(type) {
        this.state.companyType = type;
        this.$$('.archetype-btn').forEach(btn => btn.classList.remove('selected'));
        this.$(`.archetype-btn[data-type="${type}"]`).classList.add('selected');

        const arch = this.archetypes[type];
        this.$('#strength-name').textContent = arch.name;
        this.$('#strength-trait').textContent = arch.strength;
        this.$('#weakness-name').textContent = 'The ' + arch.trajectory;
        this.$('#weakness-trait').textContent = arch.weakness.split(',')[0];

        if (this.state.year === 0) {
            this.$('#icarus-result').textContent = `${arch.name}: "${arch.strength}" is your competitive advantage. But beware - it will become "${arch.weakness}"`;
        }
    }

    advanceTime() {
        this.state.year += 5;

        if (this.state.phase === 'growth') {
            this.state.success = Math.min(95, this.state.success + 15);
            this.state.rigidity += 20;

            if (this.state.success >= 80) {
                this.state.phase = 'peak';
                this.$('#peak-year').textContent = this.state.year;
            }
        } else if (this.state.phase === 'peak') {
            this.state.rigidity += 15;
            this.state.marketFit = Math.max(0, this.state.marketFit - 10);

            if (this.state.rigidity >= 70) {
                this.state.phase = 'decline';
            }
        } else if (this.state.phase === 'decline') {
            this.state.success = Math.max(0, this.state.success - 15);
            this.state.marketFit = Math.max(0, this.state.marketFit - 15);

            if (this.state.success <= 20) {
                this.state.phase = 'crisis';
            }
        }

        this.updateDisplay();
        this.updateNarrative();

        this.dispatchSimulatorEvent('icarus-advanced', {
            year: this.state.year,
            phase: this.state.phase
        });
    }

    marketDisruption() {
        this.state.marketFit = Math.max(0, this.state.marketFit - 40);
        const adaptability = 100 - this.state.rigidity;

        if (adaptability < 30) {
            this.state.success = Math.max(0, this.state.success - 30);
            this.$('#icarus-result').innerHTML = '<strong style="color: #ef4444;">DISRUPTION DISASTER!</strong> Too rigid to adapt. The company\'s core strength is now a liability.';
            this.state.phase = 'crisis';
        } else if (adaptability < 60) {
            this.state.success = Math.max(0, this.state.success - 15);
            this.$('#icarus-result').innerHTML = '<strong style="color: #f59e0b;">STRUGGLING!</strong> Adapting slowly. Rigidity from past success is hampering response.';
        } else {
            this.state.success = Math.max(0, this.state.success - 5);
            this.$('#icarus-result').innerHTML = '<strong style="color: #22c55e;">ADAPTING!</strong> Still flexible enough to pivot. But success will bring rigidity...';
        }

        this.updateDisplay();
    }

    updateNarrative() {
        const arch = this.archetypes[this.state.companyType];

        if (this.state.phase === 'growth') {
            this.$('#icarus-result').textContent = `Year ${this.state.year}: ${arch.strength} drives growth! But specialization is increasing...`;
        } else if (this.state.phase === 'peak') {
            this.$('#icarus-result').innerHTML = `<strong style="color: #f59e0b;">PEAK SUCCESS!</strong> Market leader! But the company is becoming "The ${arch.trajectory}" - ${arch.weakness}`;
        } else if (this.state.phase === 'decline') {
            this.$('#icarus-result').innerHTML = `<strong style="color: #ef4444;">DECLINE!</strong> ${arch.weakness}. The very strength that built the company is now destroying it.`;
        } else if (this.state.phase === 'crisis') {
            this.$('#icarus-result').innerHTML = `<strong style="color: #ef4444;">CRISIS!</strong> Like Icarus, flying too close to the sun. ${arch.name} became The ${arch.trajectory} and fell.`;
            this.$('#fate').textContent = 'Failed';
            this.$('#fate').style.color = '#ef4444';
        }
    }

    updateDisplay() {
        this.$('#success-fill').style.width = this.state.success + '%';
        this.$('#success-value').textContent = this.state.success + '%';
        this.$('#success-fill').className = 'metric-fill ' + (this.state.success > 60 ? 'success' : this.state.success > 30 ? 'warning' : 'danger');

        this.$('#rigidity-fill').style.width = this.state.rigidity + '%';
        this.$('#rigidity-value').textContent = this.state.rigidity + '%';
        this.$('#rigidity-fill').className = 'metric-fill ' + (this.state.rigidity < 40 ? 'success' : this.state.rigidity < 70 ? 'warning' : 'danger');

        this.$('#fit-fill').style.width = this.state.marketFit + '%';
        this.$('#fit-value').textContent = this.state.marketFit + '%';
        this.$('#fit-fill').className = 'metric-fill ' + (this.state.marketFit > 60 ? 'success' : this.state.marketFit > 30 ? 'warning' : 'danger');

        const adaptability = 100 - this.state.rigidity;
        this.$('#adapt-fill').style.width = adaptability + '%';
        this.$('#adapt-value').textContent = adaptability + '%';
        this.$('#adapt-fill').className = 'metric-fill ' + (adaptability > 60 ? 'success' : adaptability > 30 ? 'warning' : 'danger');

        this.$('#year-num').textContent = this.state.year;
        this.$('#phase-name').textContent = this.state.phase.charAt(0).toUpperCase() + this.state.phase.slice(1);
    }

    reset() {
        this.state = {
            companyType: this.state.companyType,
            year: 0,
            success: 50,
            rigidity: 0,
            marketFit: 100,
            phase: 'growth'
        };
        this.$('#peak-year').textContent = '-';
        this.$('#fate').textContent = 'Active';
        this.$('#fate').style.color = 'var(--primary, #6366f1)';
        this.selectArchetype(this.state.companyType);
        this.updateDisplay();
    }
}

customElements.define('icarus-paradox-simulator', IcarusParadoxSimulator);

export { IcarusParadoxSimulator };
