import { SimulatorBase } from '../simulator-base.js';

class HormesisSimulator extends SimulatorBase {
    constructor() {
        super();
        this.substances = [
            { name: 'Alcohol', icon: '&#x1F37A;', lowBenefit: 'Heart health', highHarm: 'Liver damage' },
            { name: 'Radiation', icon: '&#x2622;', lowBenefit: 'Cell repair stimulation', highHarm: 'DNA damage, cancer' },
            { name: 'Exercise', icon: '&#x1F3CB;', lowBenefit: 'Cardiovascular health', highHarm: 'Injury, immune suppression' },
            { name: 'Caffeine', icon: '&#x2615;', lowBenefit: 'Alertness, antioxidants', highHarm: 'Anxiety, heart issues' },
            { name: 'Fasting', icon: '&#x23F0;', lowBenefit: 'Autophagy, longevity', highHarm: 'Muscle loss, weakness' }
        ];
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .dose-control {
                    background: var(--bg, #0f172a);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .dose-slider-container {
                    margin-top: 0.5rem;
                }

                .dose-slider-container input[type="range"] {
                    width: 100%;
                    height: 8px;
                    -webkit-appearance: none;
                    background: linear-gradient(90deg, #22c55e 0%, #22c55e 30%, #f59e0b 30%, #f59e0b 50%, #ef4444 50%, #ef4444 100%);
                    border-radius: 4px;
                }

                .dose-labels {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.7rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                .response-curve {
                    background: var(--bg, #0f172a);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                    position: relative;
                    height: 200px;
                }

                .curve-svg {
                    width: 100%;
                    height: 100%;
                }

                .dose-marker {
                    position: absolute;
                    width: 4px;
                    height: 100%;
                    background: var(--accent, #f59e0b);
                    top: 0;
                    transition: left 0.3s;
                }

                .effect-display {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .effect-card {
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .effect-card.beneficial {
                    background: rgba(34, 197, 94, 0.2);
                    border: 1px solid #22c55e;
                }

                .effect-card.harmful {
                    background: rgba(239, 68, 68, 0.2);
                    border: 1px solid #ef4444;
                }

                .effect-card.neutral {
                    background: rgba(148, 163, 184, 0.2);
                    border: 1px solid var(--muted, #94a3b8);
                }

                .effect-value {
                    font-size: 2rem;
                    font-weight: bold;
                }

                .effect-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                .substance-selector {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin-top: 1rem;
                }

                .substance-btn {
                    padding: 0.5rem 1rem;
                    font-size: 0.875rem;
                    background: var(--card, #1e293b);
                    border: 1px solid var(--muted, #94a3b8);
                }

                .substance-btn.active {
                    background: var(--primary, #6366f1);
                    border-color: var(--primary, #6366f1);
                }

                .zone-indicator {
                    text-align: center;
                    padding: 0.75rem;
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                    font-weight: bold;
                }

                .zone-indicator.hormetic {
                    background: rgba(34, 197, 94, 0.2);
                    color: #22c55e;
                }

                .zone-indicator.toxic {
                    background: rgba(239, 68, 68, 0.2);
                    color: #ef4444;
                }

                .zone-indicator.none {
                    background: var(--bg, #0f172a);
                    color: var(--muted, #94a3b8);
                }

                @media (max-width: 768px) {
                    .effect-display {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>Dose-Response Curve</h4>
            <p style="color: var(--muted, #94a3b8); margin-bottom: 1rem;">Small doses can benefit while large doses harm. Adjust the dose to see the biphasic response.</p>

            <div class="substance-selector">
                ${this.substances.map((s, i) => `
                    <button class="substance-btn ${i === 0 ? 'active' : ''}" data-index="${i}">
                        ${s.icon} ${s.name}
                    </button>
                `).join('')}
            </div>

            <div class="dose-control">
                <label>Dose Level: <span id="dose-val">50</span>%</label>
                <div class="dose-slider-container">
                    <input type="range" id="dose-slider" min="0" max="100" value="50">
                    <div class="dose-labels">
                        <span>None</span>
                        <span>Low</span>
                        <span>Moderate</span>
                        <span>High</span>
                        <span>Extreme</span>
                    </div>
                </div>
            </div>

            <div class="response-curve">
                <svg class="curve-svg" viewBox="0 0 400 150" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style="stop-color:#94a3b8"/>
                            <stop offset="30%" style="stop-color:#22c55e"/>
                            <stop offset="50%" style="stop-color:#f59e0b"/>
                            <stop offset="100%" style="stop-color:#ef4444"/>
                        </linearGradient>
                    </defs>
                    <line x1="0" y1="75" x2="400" y2="75" stroke="var(--muted)" stroke-width="1" stroke-dasharray="4"/>
                    <text x="5" y="20" fill="var(--muted)" font-size="10">Beneficial</text>
                    <text x="5" y="145" fill="var(--muted)" font-size="10">Harmful</text>
                    <path d="M 0 75 Q 60 75, 100 45 Q 140 15, 180 45 Q 220 75, 280 100 Q 340 125, 400 140"
                          fill="none" stroke="url(#curveGradient)" stroke-width="3"/>
                    <circle id="dose-point" cx="200" cy="75" r="6" fill="var(--accent)"/>
                </svg>
            </div>

            <div class="zone-indicator none" id="zone-indicator">
                Adjust dose to see hormetic effect
            </div>

            <div class="effect-display">
                <div class="effect-card neutral" id="benefit-card">
                    <div class="effect-value" id="benefit-val">0%</div>
                    <div class="effect-label">Health Benefit</div>
                </div>
                <div class="effect-card neutral" id="harm-card">
                    <div class="effect-value" id="harm-val">0%</div>
                    <div class="effect-label">Health Harm</div>
                </div>
            </div>

            <div class="result" id="effect-description">
                <p>Select a substance and adjust the dose to see the hormetic response.</p>
            </div>

            <div class="insight">
                "The dose makes the poison" - Paracelsus. Many substances follow a J-shaped or U-shaped curve where low doses stimulate beneficial stress responses (hormesis) while high doses cause toxicity.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#dose-slider').addEventListener('input', (e) => {
            this.$('#dose-val').textContent = e.target.value;
            this.updateResponse();
        });

        this.$$('.substance-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.$$('.substance-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.updateResponse();
            });
        });

        this.updateResponse();
    }

    updateResponse() {
        const dose = parseInt(this.$('#dose-slider').value);
        const activeBtn = this.$('.substance-btn.active');
        const substanceIndex = parseInt(activeBtn.dataset.index);
        const substance = this.substances[substanceIndex];

        let benefit = 0;
        let harm = 0;

        if (dose < 10) {
            benefit = 0;
            harm = 0;
        } else if (dose < 35) {
            benefit = (dose - 10) * 3;
            harm = 0;
        } else if (dose < 55) {
            benefit = 75 - (dose - 35);
            harm = (dose - 35) * 2;
        } else {
            benefit = Math.max(0, 55 - (dose - 55) * 2);
            harm = 40 + (dose - 55) * 1.5;
        }

        benefit = Math.max(0, Math.min(100, benefit));
        harm = Math.max(0, Math.min(100, harm));

        this.$('#benefit-val').textContent = Math.round(benefit) + '%';
        this.$('#harm-val').textContent = Math.round(harm) + '%';

        const benefitCard = this.$('#benefit-card');
        const harmCard = this.$('#harm-card');

        benefitCard.className = 'effect-card ' + (benefit > 30 ? 'beneficial' : 'neutral');
        harmCard.className = 'effect-card ' + (harm > 30 ? 'harmful' : 'neutral');

        const point = this.$('#dose-point');
        const x = dose * 4;
        let y;
        if (dose < 35) {
            y = 75 - (benefit / 100) * 60;
        } else {
            y = 75 + (harm / 100) * 60;
        }
        point.setAttribute('cx', x);
        point.setAttribute('cy', y);

        const zone = this.$('#zone-indicator');
        const desc = this.$('#effect-description');

        if (dose < 10) {
            zone.className = 'zone-indicator none';
            zone.textContent = 'No effect zone';
            desc.innerHTML = `<p>At very low doses, <strong>${substance.name}</strong> has no significant effect.</p>`;
        } else if (dose < 45 && benefit > harm) {
            zone.className = 'zone-indicator hormetic';
            zone.textContent = 'Hormetic Zone - Net Benefit';
            desc.innerHTML = `<p><strong>${substance.name}</strong> at low doses: ${substance.lowBenefit}. The body's stress response provides net benefit.</p>`;
        } else {
            zone.className = 'zone-indicator toxic';
            zone.textContent = 'Toxic Zone - Net Harm';
            desc.innerHTML = `<p><strong>${substance.name}</strong> at high doses: ${substance.highHarm}. Benefits are overwhelmed by toxic effects.</p>`;
        }
    }
}

customElements.define('hormesis-simulator', HormesisSimulator);

export { HormesisSimulator };
