import { SimulatorBase } from '../simulator-base.js';

class TullockSimulator extends SimulatorBase {
    constructor() {
        super();
        this.state = {
            selectedExample: null
        };
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .tullock-viz {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .paradox-equation {
                    background: var(--card, #1e293b);
                    padding: 2rem;
                    border-radius: 0.5rem;
                    text-align: center;
                    margin-bottom: 1.5rem;
                }

                .equation-title {
                    color: var(--muted, #94a3b8);
                    margin-bottom: 1rem;
                }

                .equation {
                    font-size: 1.5rem;
                    font-weight: bold;
                    margin-bottom: 1rem;
                }

                .equation-parts {
                    display: flex;
                    justify-content: center;
                    gap: 2rem;
                    flex-wrap: wrap;
                }

                .equation-part {
                    text-align: center;
                }

                .part-value {
                    font-size: 2rem;
                    font-weight: bold;
                }

                .part-value.benefit {
                    color: #22c55e;
                }

                .part-value.cost {
                    color: #ef4444;
                }

                .part-value.ratio {
                    color: #f59e0b;
                }

                .part-label {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                }

                .examples-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 1rem;
                    margin-top: 1.5rem;
                }

                .example-card {
                    background: var(--card, #1e293b);
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: 2px solid transparent;
                }

                .example-card:hover {
                    border-color: var(--primary, #6366f1);
                }

                .example-card.selected {
                    border-color: #f59e0b;
                    background: rgba(245, 158, 11, 0.1);
                }

                .example-title {
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .example-stats {
                    margin-top: 1rem;
                }

                .example-stat {
                    display: flex;
                    justify-content: space-between;
                    padding: 0.5rem 0;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                    font-size: 0.875rem;
                }

                .example-stat:last-child {
                    border-bottom: none;
                }

                .stat-label {
                    color: var(--muted, #94a3b8);
                }

                .explanation-box {
                    background: var(--card, #1e293b);
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    margin-top: 1.5rem;
                }

                .explanation-title {
                    font-weight: bold;
                    color: var(--primary, #6366f1);
                    margin-bottom: 0.5rem;
                }

                .theories-list {
                    margin-top: 1rem;
                }

                .theory-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 0.75rem;
                    padding: 0.75rem 0;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                }

                .theory-item:last-child {
                    border-bottom: none;
                }

                .theory-number {
                    background: var(--primary, #6366f1);
                    color: white;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.75rem;
                    flex-shrink: 0;
                }

                @media (max-width: 600px) {
                    .equation-parts {
                        flex-direction: column;
                        gap: 1rem;
                    }
                }
            </style>

            <h4>The Puzzle of Political Influence</h4>
            <p style="margin-bottom: 1rem; color: var(--muted);">Gordon Tullock asked: Why is buying political influence so cheap?</p>

            <div class="controls">
                <button id="show-puzzle">The Puzzle</button>
                <button id="show-examples">Real Examples</button>
                <button id="show-theories">Theories</button>
            </div>

            <div class="tullock-viz">
                <div class="paradox-equation" id="equation-section">
                    <div class="equation-title">The Tullock Paradox</div>
                    <div class="equation">If lobbying is profitable, why isn't there MORE of it?</div>
                    <div class="equation-parts">
                        <div class="equation-part">
                            <div class="part-value benefit">$1B+</div>
                            <div class="part-label">Value of favorable legislation</div>
                        </div>
                        <div class="equation-part">
                            <div class="part-value" style="color: var(--muted);">vs</div>
                            <div class="part-label">&nbsp;</div>
                        </div>
                        <div class="equation-part">
                            <div class="part-value cost">$1-10M</div>
                            <div class="part-label">Typical lobbying spend</div>
                        </div>
                        <div class="equation-part">
                            <div class="part-value" style="color: var(--muted);">=</div>
                            <div class="part-label">&nbsp;</div>
                        </div>
                        <div class="equation-part">
                            <div class="part-value ratio">100-1000x</div>
                            <div class="part-label">Return on investment</div>
                        </div>
                    </div>
                </div>

                <div class="examples-grid" id="examples-section">
                    <div class="example-card" data-example="tariffs">
                        <div class="example-title">🏭 Steel Tariffs</div>
                        <p style="font-size: 0.875rem; color: var(--muted);">Industry spent millions to get billions in protection</p>
                        <div class="example-stats">
                            <div class="example-stat">
                                <span class="stat-label">Lobbying Cost</span>
                                <span style="color: #ef4444;">$5M</span>
                            </div>
                            <div class="example-stat">
                                <span class="stat-label">Tariff Value</span>
                                <span style="color: #22c55e;">$2.8B/year</span>
                            </div>
                            <div class="example-stat">
                                <span class="stat-label">ROI</span>
                                <span style="color: #f59e0b;">560x</span>
                            </div>
                        </div>
                    </div>

                    <div class="example-card" data-example="pharma">
                        <div class="example-title">💊 Drug Patents</div>
                        <p style="font-size: 0.875rem; color: var(--muted);">Pharma lobbying for patent extensions</p>
                        <div class="example-stats">
                            <div class="example-stat">
                                <span class="stat-label">Lobbying Cost</span>
                                <span style="color: #ef4444;">$30M</span>
                            </div>
                            <div class="example-stat">
                                <span class="stat-label">Extension Value</span>
                                <span style="color: #22c55e;">$10B+</span>
                            </div>
                            <div class="example-stat">
                                <span class="stat-label">ROI</span>
                                <span style="color: #f59e0b;">333x</span>
                            </div>
                        </div>
                    </div>

                    <div class="example-card" data-example="taxi">
                        <div class="example-title">🚕 Taxi Medallions</div>
                        <p style="font-size: 0.875rem; color: var(--muted);">Local lobbying to restrict competition</p>
                        <div class="example-stats">
                            <div class="example-stat">
                                <span class="stat-label">Lobbying Cost</span>
                                <span style="color: #ef4444;">$500K</span>
                            </div>
                            <div class="example-stat">
                                <span class="stat-label">Medallion Value</span>
                                <span style="color: #22c55e;">$1M each</span>
                            </div>
                            <div class="example-stat">
                                <span class="stat-label">ROI</span>
                                <span style="color: #f59e0b;">2000x+</span>
                            </div>
                        </div>
                    </div>

                    <div class="example-card" data-example="sugar">
                        <div class="example-title">🍬 Sugar Subsidies</div>
                        <p style="font-size: 0.875rem; color: var(--muted);">Agricultural lobbying for price supports</p>
                        <div class="example-stats">
                            <div class="example-stat">
                                <span class="stat-label">Lobbying Cost</span>
                                <span style="color: #ef4444;">$3M/year</span>
                            </div>
                            <div class="example-stat">
                                <span class="stat-label">Subsidy Value</span>
                                <span style="color: #22c55e;">$1.5B/year</span>
                            </div>
                            <div class="example-stat">
                                <span class="stat-label">ROI</span>
                                <span style="color: #f59e0b;">500x</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="explanation-box" id="theories-section" style="display: none;">
                    <div class="explanation-title">Why Isn't Influence More Expensive?</div>
                    <div class="theories-list">
                        <div class="theory-item">
                            <div class="theory-number">1</div>
                            <div>
                                <strong>Competition would attract entry</strong>
                                <p style="font-size: 0.875rem; color: var(--muted);">If bribing politicians were openly profitable, more would compete to bribe them, driving up prices. The low cost may reflect equilibrium in a hidden market.</p>
                            </div>
                        </div>
                        <div class="theory-item">
                            <div class="theory-number">2</div>
                            <div>
                                <strong>Politicians have ideological preferences</strong>
                                <p style="font-size: 0.875rem; color: var(--muted);">Money reinforces existing beliefs rather than changes votes. You're paying for access and prioritization, not policy reversal.</p>
                            </div>
                        </div>
                        <div class="theory-item">
                            <div class="theory-number">3</div>
                            <div>
                                <strong>Reputation and career concerns</strong>
                                <p style="font-size: 0.875rem; color: var(--muted);">Politicians who appear "bought" face electoral punishment. The implicit bribe includes post-office jobs, which aren't counted.</p>
                            </div>
                        </div>
                        <div class="theory-item">
                            <div class="theory-number">4</div>
                            <div>
                                <strong>Collective action problems</strong>
                                <p style="font-size: 0.875rem; color: var(--muted);">Industries that benefit diffusely can't coordinate lobbying. Concentrated interests beat dispersed ones even with less at stake.</p>
                            </div>
                        </div>
                        <div class="theory-item">
                            <div class="theory-number">5</div>
                            <div>
                                <strong>The real payment is hidden</strong>
                                <p style="font-size: 0.875rem; color: var(--muted);">Campaign contributions are just the tip. Revolving doors, speaking fees, family employment, and future favors are the real currency.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="result">
                <p id="result-text">Click an example to see the stunning returns on political investment. The paradox: why isn't everyone doing this?</p>
            </div>

            <div class="insight">
                Tullock's paradox suggests either (1) influence isn't as cheap as it looks because costs are hidden, (2) money buys access not outcomes, or (3) the market for influence is strangely inefficient. The paradox remains partially unsolved.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#show-puzzle').addEventListener('click', () => this.showPuzzle());
        this.$('#show-examples').addEventListener('click', () => this.showExamples());
        this.$('#show-theories').addEventListener('click', () => this.showTheories());

        this.$$('.example-card').forEach(card => {
            card.addEventListener('click', () => this.selectExample(card));
        });
    }

    showPuzzle() {
        this.$('#equation-section').style.display = 'block';
        this.$('#examples-section').style.display = 'none';
        this.$('#theories-section').style.display = 'none';
        this.$('#result-text').textContent = 'With returns of 100-1000x, rational actors should pour money into lobbying until returns normalize. Why don\'t they?';
    }

    showExamples() {
        this.$('#equation-section').style.display = 'none';
        this.$('#examples-section').style.display = 'grid';
        this.$('#theories-section').style.display = 'none';
        this.$('#result-text').textContent = 'Click an example to see the math. These aren\'t hypotheticals - they\'re documented cases of political ROI.';
    }

    showTheories() {
        this.$('#equation-section').style.display = 'none';
        this.$('#examples-section').style.display = 'none';
        this.$('#theories-section').style.display = 'block';
        this.$('#result-text').textContent = 'Economists have proposed multiple explanations. None fully resolves the paradox.';
    }

    selectExample(card) {
        this.$$('.example-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');

        const example = card.dataset.example;
        const explanations = {
            tariffs: 'Steel tariffs of 2002: The industry spent ~$5M lobbying and got tariffs worth ~$2.8B annually. Consumers paid higher prices, but diffuse costs are politically invisible.',
            pharma: 'Pharmaceutical companies routinely spend $20-30M lobbying for patent extensions worth billions. A single drug\'s extension can be worth $5B+ in continued monopoly pricing.',
            taxi: 'NYC taxi medallions were worth $1M+ each because of artificial supply restrictions. The lobbying cost to maintain this system was trivial compared to the wealth it protected.',
            sugar: 'US sugar policy costs consumers ~$3B/year in higher prices. Sugar producers spend ~$3M/year lobbying. The cost per producer is low; the cost per consumer is invisible.'
        };

        this.$('#result-text').innerHTML = explanations[example];
    }
}

customElements.define('tullock-simulator', TullockSimulator);

export { TullockSimulator };
