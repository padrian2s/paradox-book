import { SimulatorBase } from '../simulator-base.js';

class ProsperityParadoxSimulator extends SimulatorBase {
    constructor() {
        super();
        this.state = {
            generation: 1,
            wealth: 50,
            hardship: 80,
            drive: 90,
            achievement: 40
        };
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .prosperity-viz {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .cycle-display {
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    margin-bottom: 2rem;
                    flex-wrap: wrap;
                    gap: 1rem;
                }

                .generation-box {
                    background: var(--card, #1e293b);
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    text-align: center;
                    min-width: 120px;
                    transition: all 0.3s ease;
                    border: 2px solid transparent;
                }

                .generation-box.active {
                    border-color: var(--primary, #6366f1);
                    background: rgba(99, 102, 241, 0.1);
                }

                .gen-icon {
                    font-size: 2.5rem;
                    margin-bottom: 0.5rem;
                }

                .gen-label {
                    font-weight: bold;
                    margin-bottom: 0.25rem;
                }

                .gen-trait {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                }

                .cycle-arrow {
                    font-size: 1.5rem;
                    color: var(--muted, #94a3b8);
                }

                .metrics-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                }

                .metric-card {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                }

                .metric-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 0.5rem;
                }

                .metric-name {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                }

                .metric-value {
                    font-weight: bold;
                }

                .metric-bar {
                    height: 8px;
                    background: rgba(255,255,255,0.1);
                    border-radius: 4px;
                    overflow: hidden;
                }

                .metric-fill {
                    height: 100%;
                    border-radius: 4px;
                    transition: width 0.5s ease;
                }

                .metric-fill.wealth {
                    background: linear-gradient(90deg, #22c55e, #16a34a);
                }

                .metric-fill.hardship {
                    background: linear-gradient(90deg, #ef4444, #dc2626);
                }

                .metric-fill.drive {
                    background: linear-gradient(90deg, #f59e0b, #d97706);
                }

                .metric-fill.achievement {
                    background: linear-gradient(90deg, #6366f1, #4f46e5);
                }

                .quote-box {
                    background: var(--card, #1e293b);
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    margin-top: 1.5rem;
                    border-left: 3px solid var(--primary, #6366f1);
                }

                .quote-text {
                    font-style: italic;
                    font-size: 1.125rem;
                    margin-bottom: 0.5rem;
                }

                .quote-attribution {
                    color: var(--muted, #94a3b8);
                    font-size: 0.875rem;
                }

                .history-section {
                    margin-top: 1.5rem;
                }

                .history-title {
                    font-weight: bold;
                    margin-bottom: 1rem;
                    color: var(--primary, #6366f1);
                }

                .history-item {
                    display: flex;
                    gap: 1rem;
                    padding: 0.75rem 0;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                }

                .history-icon {
                    font-size: 1.25rem;
                }

                .history-content {
                    flex: 1;
                }

                .history-label {
                    font-weight: bold;
                    font-size: 0.875rem;
                }

                .history-desc {
                    font-size: 0.8rem;
                    color: var(--muted, #94a3b8);
                }

                @media (max-width: 600px) {
                    .cycle-display {
                        flex-direction: column;
                    }
                    .cycle-arrow {
                        transform: rotate(90deg);
                    }
                }
            </style>

            <h4>The Generational Wealth Cycle</h4>
            <p style="margin-bottom: 1rem; color: var(--muted);">Hard times create strong people. Strong people create good times. Good times create weak people...</p>

            <div class="controls">
                <button id="next-gen">Advance Generation</button>
                <button id="reset-btn">Reset Cycle</button>
                <button id="show-history">Historical Examples</button>
            </div>

            <div class="prosperity-viz">
                <div class="cycle-display">
                    <div class="generation-box active" id="gen1">
                        <div class="gen-icon">👷</div>
                        <div class="gen-label">Generation 1</div>
                        <div class="gen-trait">Builders</div>
                    </div>
                    <div class="cycle-arrow">→</div>
                    <div class="generation-box" id="gen2">
                        <div class="gen-icon">👔</div>
                        <div class="gen-label">Generation 2</div>
                        <div class="gen-trait">Maintainers</div>
                    </div>
                    <div class="cycle-arrow">→</div>
                    <div class="generation-box" id="gen3">
                        <div class="gen-icon">🎉</div>
                        <div class="gen-label">Generation 3</div>
                        <div class="gen-trait">Consumers</div>
                    </div>
                    <div class="cycle-arrow">→</div>
                    <div class="generation-box" id="gen4">
                        <div class="gen-icon">😰</div>
                        <div class="gen-label">Generation 4</div>
                        <div class="gen-trait">Strugglers</div>
                    </div>
                </div>

                <div class="metrics-grid">
                    <div class="metric-card">
                        <div class="metric-header">
                            <span class="metric-name">Inherited Wealth</span>
                            <span class="metric-value" id="wealth-val">50%</span>
                        </div>
                        <div class="metric-bar">
                            <div class="metric-fill wealth" id="wealth-bar" style="width: 50%"></div>
                        </div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-header">
                            <span class="metric-name">Experienced Hardship</span>
                            <span class="metric-value" id="hardship-val">80%</span>
                        </div>
                        <div class="metric-bar">
                            <div class="metric-fill hardship" id="hardship-bar" style="width: 80%"></div>
                        </div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-header">
                            <span class="metric-name">Ambition & Drive</span>
                            <span class="metric-value" id="drive-val">90%</span>
                        </div>
                        <div class="metric-bar">
                            <div class="metric-fill drive" id="drive-bar" style="width: 90%"></div>
                        </div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-header">
                            <span class="metric-name">New Achievement</span>
                            <span class="metric-value" id="achieve-val">40%</span>
                        </div>
                        <div class="metric-bar">
                            <div class="metric-fill achievement" id="achieve-bar" style="width: 40%"></div>
                        </div>
                    </div>
                </div>

                <div class="quote-box" id="quote-section">
                    <div class="quote-text" id="quote-text">"Shirtsleeves to shirtsleeves in three generations."</div>
                    <div class="quote-attribution" id="quote-attr">- American proverb</div>
                </div>

                <div class="history-section" id="history-section" style="display: none;">
                    <div class="history-title">Historical Patterns</div>
                    <div class="history-item">
                        <div class="history-icon">🏛️</div>
                        <div class="history-content">
                            <div class="history-label">Roman Empire</div>
                            <div class="history-desc">Early Romans: disciplined, frugal, militaristic. Late Romans: decadent, entitled, outsourced defense.</div>
                        </div>
                    </div>
                    <div class="history-item">
                        <div class="history-icon">💰</div>
                        <div class="history-content">
                            <div class="history-label">Vanderbilt Fortune</div>
                            <div class="history-desc">Cornelius built $100B empire. By 1973, when 120 heirs met, not one was a millionaire.</div>
                        </div>
                    </div>
                    <div class="history-item">
                        <div class="history-icon">👑</div>
                        <div class="history-content">
                            <div class="history-label">Ibn Khaldun's Theory</div>
                            <div class="history-desc">14th century historian: Desert tribes conquer soft city-dwellers, become soft themselves in 3-4 generations, are conquered.</div>
                        </div>
                    </div>
                    <div class="history-item">
                        <div class="history-icon">🏭</div>
                        <div class="history-content">
                            <div class="history-label">Carnegie's Warning</div>
                            <div class="history-desc">"The parent who leaves his son enormous wealth generally deadens the talents and energies of the son."</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="result">
                <p id="result-text">Click "Advance Generation" to watch the cycle unfold. Each generation's conditions shape the next.</p>
            </div>

            <div class="insight">
                The paradox: Success contains the seeds of its own destruction. Parents who struggle to give their children "everything" may inadvertently deprive them of the hardship that forged their own character.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#next-gen').addEventListener('click', () => this.advanceGeneration());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
        this.$('#show-history').addEventListener('click', () => this.toggleHistory());
    }

    advanceGeneration() {
        this.state.generation = (this.state.generation % 4) + 1;

        this.$$('.generation-box').forEach(box => box.classList.remove('active'));
        this.$(`#gen${this.state.generation}`).classList.add('active');

        const generations = {
            1: {
                wealth: 20,
                hardship: 90,
                drive: 95,
                achievement: 30,
                quote: '"I started with nothing. Failure was not an option."',
                attr: '- First generation entrepreneur',
                result: '<strong>Generation 1: The Builders.</strong> Poverty and hardship create intense drive. They sacrifice everything to build something from nothing.'
            },
            2: {
                wealth: 70,
                hardship: 40,
                drive: 70,
                achievement: 80,
                quote: '"I watched my parents struggle. I will not let their sacrifice be in vain."',
                attr: '- Second generation',
                result: '<strong>Generation 2: The Maintainers.</strong> They remember the struggle, inherited the work ethic, and expand what was built. Peak wealth creation.'
            },
            3: {
                wealth: 95,
                hardship: 10,
                drive: 35,
                achievement: 60,
                quote: '"Why should I struggle when there\'s enough for everyone?"',
                attr: '- Third generation heir',
                result: '<strong style="color: #f59e0b;">Generation 3: The Consumers.</strong> Born into comfort, never experienced want. They consume rather than create. Wealth begins declining.'
            },
            4: {
                wealth: 40,
                hardship: 70,
                drive: 60,
                achievement: 25,
                quote: '"We\'ve lost most of what grandfather built. It\'s time to rebuild."',
                attr: '- Fourth generation',
                result: '<strong style="color: #ef4444;">Generation 4: The Strugglers.</strong> The fortune is depleted. Hardship returns. The cycle prepares to repeat.'
            }
        };

        const gen = generations[this.state.generation];

        this.animateMetric('wealth', gen.wealth);
        this.animateMetric('hardship', gen.hardship);
        this.animateMetric('drive', gen.drive);
        this.animateMetric('achievement', gen.achievement);

        this.$('#quote-text').textContent = gen.quote;
        this.$('#quote-attr').textContent = gen.attr;
        this.$('#result-text').innerHTML = gen.result;
    }

    animateMetric(name, value) {
        this.$(`#${name}-val`).textContent = value + '%';
        this.$(`#${name}-bar`).style.width = value + '%';
    }

    toggleHistory() {
        const section = this.$('#history-section');
        section.style.display = section.style.display === 'none' ? 'block' : 'none';
    }

    reset() {
        this.state.generation = 1;
        this.$$('.generation-box').forEach(box => box.classList.remove('active'));
        this.$('#gen1').classList.add('active');

        this.animateMetric('wealth', 20);
        this.animateMetric('hardship', 90);
        this.animateMetric('drive', 95);
        this.animateMetric('achievement', 30);

        this.$('#quote-text').textContent = '"Shirtsleeves to shirtsleeves in three generations."';
        this.$('#quote-attr').textContent = '- American proverb';
        this.$('#result-text').textContent = 'Click "Advance Generation" to watch the cycle unfold. Each generation\'s conditions shape the next.';
    }
}

customElements.define('prosperity-paradox-simulator', ProsperityParadoxSimulator);

export { ProsperityParadoxSimulator };
