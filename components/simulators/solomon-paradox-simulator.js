import { SimulatorBase } from '../simulator-base.js';

class SolomonParadoxSimulator extends SimulatorBase {
    constructor() {
        super();
        this.currentScenario = 0;
        this.selfAdvice = [];
        this.otherAdvice = [];
        this.scenarios = [
            {
                icon: '💔',
                situation: 'Your partner has been distant lately and you are worried about the relationship.',
                selfPrompt: 'What would you do in this situation?',
                otherPrompt: 'What advice would you give a friend in this situation?',
                wisdomIndicators: {
                    poor: ['ignore it', 'get angry', 'assume the worst'],
                    good: ['communicate', 'have a conversation', 'ask them', 'understand']
                }
            },
            {
                icon: '💼',
                situation: 'You have been offered a risky but exciting new job opportunity.',
                selfPrompt: 'How would you approach this decision?',
                otherPrompt: 'What would you tell a friend facing this choice?',
                wisdomIndicators: {
                    poor: ['stay safe', 'too risky', 'just take it'],
                    good: ['weigh pros and cons', 'consider values', 'reflect', 'long-term']
                }
            },
            {
                icon: '😤',
                situation: 'A colleague has repeatedly taken credit for your work.',
                selfPrompt: 'How would you handle this?',
                otherPrompt: 'What advice would you give someone else dealing with this?',
                wisdomIndicators: {
                    poor: ['confront angrily', 'just ignore', 'complain'],
                    good: ['document', 'professional conversation', 'speak to manager', 'calmly address']
                }
            }
        ];
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .scenario-container {
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    padding: 1.5rem;
                    margin-top: 1rem;
                }

                .scenario-icon {
                    font-size: 3rem;
                    text-align: center;
                    margin-bottom: 1rem;
                }

                .scenario-text {
                    text-align: center;
                    line-height: 1.6;
                    margin-bottom: 1.5rem;
                }

                .advice-section {
                    margin-bottom: 1.5rem;
                }

                .advice-label {
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .self-label {
                    color: #f59e0b;
                }

                .other-label {
                    color: #22c55e;
                }

                textarea {
                    width: 100%;
                    padding: 0.75rem;
                    border: 1px solid var(--muted, #94a3b8);
                    border-radius: 0.5rem;
                    background: var(--card, #1e293b);
                    color: var(--text, #e2e8f0);
                    resize: vertical;
                    min-height: 80px;
                    font-family: inherit;
                }

                .comparison-view {
                    display: none;
                    margin-top: 1rem;
                }

                .comparison-view.visible {
                    display: block;
                }

                .comparison-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                }

                .comparison-box {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                }

                .comparison-title {
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                    font-size: 0.875rem;
                }

                .self-box .comparison-title {
                    color: #f59e0b;
                }

                .other-box .comparison-title {
                    color: #22c55e;
                }

                .wisdom-score {
                    text-align: center;
                    padding: 1rem;
                    margin-top: 1rem;
                }

                .score-value {
                    font-size: 2.5rem;
                    font-weight: bold;
                }

                .score-label {
                    color: var(--muted, #94a3b8);
                    font-size: 0.875rem;
                }

                .progress-dots {
                    display: flex;
                    justify-content: center;
                    gap: 0.5rem;
                    margin-top: 1rem;
                }

                .dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: var(--muted, #94a3b8);
                }

                .dot.active {
                    background: var(--primary, #6366f1);
                }

                .dot.completed {
                    background: #22c55e;
                }

                @media (max-width: 768px) {
                    .comparison-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>Self vs Other Advice Comparison</h4>

            <div class="scenario-container">
                <div class="scenario-icon" id="scenario-icon">💔</div>
                <div class="scenario-text" id="scenario-text">Your partner has been distant lately and you are worried about the relationship.</div>

                <div class="advice-section" id="self-section">
                    <div class="advice-label self-label">
                        <span>🪞</span> <span id="self-prompt">What would you do in this situation?</span>
                    </div>
                    <textarea id="self-input" placeholder="Write your approach..."></textarea>
                </div>

                <div class="advice-section" id="other-section" style="display: none;">
                    <div class="advice-label other-label">
                        <span>👥</span> <span id="other-prompt">What advice would you give a friend in this situation?</span>
                    </div>
                    <textarea id="other-input" placeholder="Write your advice..."></textarea>
                </div>

                <div class="comparison-view" id="comparison">
                    <div class="comparison-grid">
                        <div class="comparison-box self-box">
                            <div class="comparison-title">Your Own Approach</div>
                            <div id="self-display"></div>
                        </div>
                        <div class="comparison-box other-box">
                            <div class="comparison-title">Your Advice to Others</div>
                            <div id="other-display"></div>
                        </div>
                    </div>
                    <div class="wisdom-score">
                        <div class="score-value" id="wisdom-gap">-</div>
                        <div class="score-label">Wisdom Gap (Other advice tends to be wiser)</div>
                    </div>
                </div>

                <div class="progress-dots" id="progress-dots">
                    <div class="dot active"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>

            <div class="controls" style="margin-top: 1rem; justify-content: center;">
                <button id="next-btn">Next Step</button>
                <button id="reset-btn">Start Over</button>
            </div>

            <div class="result">
                <p id="result-text">First, write how YOU would handle this situation...</p>
            </div>

            <div class="insight">
                King Solomon was renowned for his wise judgments for others, yet made poor decisions in his own life. Research by Igor Grossmann found people reason more wisely about others' problems because emotional distance allows for broader perspective-taking.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#next-btn').addEventListener('click', () => this.nextStep());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
        this.phase = 'self';
    }

    nextStep() {
        if (this.phase === 'self') {
            const selfText = this.$('#self-input').value.trim();
            if (!selfText) {
                this.$('#result-text').textContent = 'Please write your approach first.';
                return;
            }
            this.selfAdvice.push(selfText);
            this.$('#self-section').style.display = 'none';
            this.$('#other-section').style.display = 'block';
            this.$('#result-text').textContent = 'Now imagine a friend came to you with this same problem. What would you tell them?';
            this.phase = 'other';
        } else if (this.phase === 'other') {
            const otherText = this.$('#other-input').value.trim();
            if (!otherText) {
                this.$('#result-text').textContent = 'Please write your advice first.';
                return;
            }
            this.otherAdvice.push(otherText);
            this.showComparison();
            this.phase = 'compare';
        } else if (this.phase === 'compare') {
            this.currentScenario++;
            if (this.currentScenario < this.scenarios.length) {
                this.loadNextScenario();
            } else {
                this.showFinalResults();
            }
        }
    }

    showComparison() {
        this.$('#other-section').style.display = 'none';
        this.$('#comparison').classList.add('visible');

        const selfText = this.selfAdvice[this.selfAdvice.length - 1];
        const otherText = this.otherAdvice[this.otherAdvice.length - 1];

        this.$('#self-display').textContent = selfText;
        this.$('#other-display').textContent = otherText;

        const scenario = this.scenarios[this.currentScenario];
        const selfScore = this.calculateWisdom(selfText, scenario.wisdomIndicators);
        const otherScore = this.calculateWisdom(otherText, scenario.wisdomIndicators);
        const gap = otherScore - selfScore;

        let gapText = '';
        if (gap > 0) {
            gapText = '+' + gap + ' WISER';
            this.$('#wisdom-gap').style.color = '#22c55e';
        } else if (gap < 0) {
            gapText = gap + ' (Self was wiser!)';
            this.$('#wisdom-gap').style.color = '#f59e0b';
        } else {
            gapText = 'EQUAL';
            this.$('#wisdom-gap').style.color = 'var(--muted)';
        }
        this.$('#wisdom-gap').textContent = gapText;

        this.updateProgressDots();

        if (gap > 0) {
            this.$('#result-text').textContent = 'PARADOX DETECTED: Your advice to others was wiser than what you would do yourself. This is Solomon\'s Paradox in action.';
        } else {
            this.$('#result-text').textContent = 'Interesting! Your self-advice was equally or more wise. You may have good self-distance.';
        }
    }

    calculateWisdom(text, indicators) {
        const lower = text.toLowerCase();
        let score = 0;

        indicators.good.forEach(term => {
            if (lower.includes(term)) score += 2;
        });

        indicators.poor.forEach(term => {
            if (lower.includes(term)) score -= 1;
        });

        if (text.length > 100) score += 1;
        if (text.length > 200) score += 1;

        return score;
    }

    loadNextScenario() {
        const scenario = this.scenarios[this.currentScenario];

        this.$('#scenario-icon').textContent = scenario.icon;
        this.$('#scenario-text').textContent = scenario.situation;
        this.$('#self-prompt').textContent = scenario.selfPrompt;
        this.$('#other-prompt').textContent = scenario.otherPrompt;

        this.$('#self-input').value = '';
        this.$('#other-input').value = '';
        this.$('#self-section').style.display = 'block';
        this.$('#other-section').style.display = 'none';
        this.$('#comparison').classList.remove('visible');

        this.phase = 'self';
        this.updateProgressDots();
        this.$('#result-text').textContent = 'New scenario. Write how YOU would handle this...';
    }

    updateProgressDots() {
        const dots = this.$$('.dot');
        dots.forEach((dot, i) => {
            dot.classList.remove('active', 'completed');
            if (i < this.currentScenario) {
                dot.classList.add('completed');
            } else if (i === this.currentScenario) {
                dot.classList.add('active');
            }
        });
    }

    showFinalResults() {
        let totalGap = 0;
        for (let i = 0; i < this.scenarios.length; i++) {
            const selfScore = this.calculateWisdom(this.selfAdvice[i], this.scenarios[i].wisdomIndicators);
            const otherScore = this.calculateWisdom(this.otherAdvice[i], this.scenarios[i].wisdomIndicators);
            totalGap += (otherScore - selfScore);
        }

        const avgGap = totalGap / this.scenarios.length;

        if (avgGap > 1) {
            this.$('#result-text').textContent = 'SOLOMON\'S PARADOX CONFIRMED: Across all scenarios, your advice to others was consistently wiser than your self-advice. You demonstrate the universal human tendency to reason better about others\' problems.';
        } else if (avgGap > 0) {
            this.$('#result-text').textContent = 'Mild Solomon effect detected. You showed somewhat wiser reasoning when advising others compared to yourself.';
        } else {
            this.$('#result-text').textContent = 'Low Solomon effect. You maintain similar wisdom levels for self and others - a sign of good self-distancing ability.';
        }

        this.$('#wisdom-gap').textContent = avgGap > 0 ? 'CONFIRMED' : 'MILD';
        this.$('#next-btn').textContent = 'Complete';
        this.$('#next-btn').disabled = true;
    }

    reset() {
        this.currentScenario = 0;
        this.selfAdvice = [];
        this.otherAdvice = [];
        this.phase = 'self';

        const scenario = this.scenarios[0];
        this.$('#scenario-icon').textContent = scenario.icon;
        this.$('#scenario-text').textContent = scenario.situation;
        this.$('#self-prompt').textContent = scenario.selfPrompt;
        this.$('#other-prompt').textContent = scenario.otherPrompt;

        this.$('#self-input').value = '';
        this.$('#other-input').value = '';
        this.$('#self-section').style.display = 'block';
        this.$('#other-section').style.display = 'none';
        this.$('#comparison').classList.remove('visible');
        this.$('#wisdom-gap').textContent = '-';
        this.$('#next-btn').textContent = 'Next Step';
        this.$('#next-btn').disabled = false;
        this.$('#result-text').textContent = 'First, write how YOU would handle this situation...';

        this.updateProgressDots();
    }
}

customElements.define('solomon-paradox-simulator', SolomonParadoxSimulator);

export { SolomonParadoxSimulator };
