import { SimulatorBase } from '../simulator-base.js';

class MeatParadoxSimulator extends SimulatorBase {
    constructor() {
        super();
        this.responses = { care: 0, eat: 0 };
        this.currentQuestion = 0;
        this.questions = [
            { type: 'care', text: 'Animals can feel pain and suffering.', icon: '🐄' },
            { type: 'eat', text: 'I eat meat regularly (at least weekly).', icon: '🍔' },
            { type: 'care', text: 'Factory farming conditions concern me.', icon: '🏭' },
            { type: 'eat', text: 'I would find it difficult to give up meat.', icon: '🥩' },
            { type: 'care', text: 'Animals deserve ethical treatment.', icon: '🐷' },
            { type: 'eat', text: 'Meat is an important part of my diet.', icon: '🍗' },
            { type: 'care', text: 'I feel uncomfortable when I think about slaughterhouses.', icon: '🐑' },
            { type: 'eat', text: 'I rarely think about where my meat comes from.', icon: '🍖' }
        ];
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .question-container {
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    padding: 1.5rem;
                    text-align: center;
                    margin-top: 1rem;
                }

                .question-icon {
                    font-size: 3rem;
                    margin-bottom: 1rem;
                }

                .question-text {
                    font-size: 1.1rem;
                    margin-bottom: 1.5rem;
                    line-height: 1.5;
                }

                .likert-scale {
                    display: flex;
                    justify-content: center;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                }

                .likert-btn {
                    background: var(--card, #1e293b) !important;
                    padding: 0.5rem 1rem !important;
                    font-size: 0.875rem !important;
                    min-width: 100px;
                }

                .likert-btn:hover {
                    background: var(--primary, #6366f1) !important;
                }

                .progress-bar {
                    background: var(--card, #1e293b);
                    height: 8px;
                    border-radius: 4px;
                    margin-top: 1rem;
                    overflow: hidden;
                }

                .progress-fill {
                    background: var(--primary, #6366f1);
                    height: 100%;
                    transition: width 0.3s;
                }

                .meter-container {
                    margin-top: 1.5rem;
                }

                .meter-labels {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-bottom: 0.5rem;
                }

                .meter {
                    background: linear-gradient(to right, #22c55e, #eab308, #ef4444);
                    height: 20px;
                    border-radius: 10px;
                    position: relative;
                }

                .meter-indicator {
                    position: absolute;
                    top: -5px;
                    width: 4px;
                    height: 30px;
                    background: white;
                    border-radius: 2px;
                    transition: left 0.3s;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
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
                    color: var(--accent, #f59e0b);
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                @media (max-width: 768px) {
                    .likert-scale {
                        flex-direction: column;
                    }

                    .likert-btn {
                        width: 100%;
                    }

                    .stats-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>Meat Paradox Assessment</h4>

            <div class="question-container">
                <div class="question-icon" id="q-icon">🐄</div>
                <div class="question-text" id="q-text">Animals can feel pain and suffering.</div>
                <div class="likert-scale">
                    <button class="likert-btn" data-value="2">Strongly Agree</button>
                    <button class="likert-btn" data-value="1">Agree</button>
                    <button class="likert-btn" data-value="0">Neutral</button>
                    <button class="likert-btn" data-value="-1">Disagree</button>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" id="progress" style="width: 0%"></div>
                </div>
            </div>

            <div class="meter-container">
                <div class="meter-labels">
                    <span>Consistent</span>
                    <span>Cognitive Dissonance</span>
                    <span>High Paradox</span>
                </div>
                <div class="meter">
                    <div class="meter-indicator" id="meter-indicator" style="left: 0%"></div>
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="care-score">0</div>
                    <div class="stat-label">Animal Concern</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="eat-score">0</div>
                    <div class="stat-label">Meat Attachment</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="dissonance">-</div>
                    <div class="stat-label">Dissonance Level</div>
                </div>
            </div>

            <div class="result">
                <p id="result-text">Answer the questions to measure your meat paradox level...</p>
            </div>

            <div class="controls" style="margin-top: 1rem; justify-content: center;">
                <button id="reset-btn">Start Over</button>
            </div>

            <div class="insight">
                Studies show most meat eaters care about animal welfare yet continue consuming meat. This cognitive dissonance is resolved through moral disengagement: denial, dissociation, or perceived necessity.
            </div>
        `;
    }

    setupEventListeners() {
        this.$$('.likert-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.answer(parseInt(e.target.dataset.value)));
        });
        this.$('#reset-btn').addEventListener('click', () => this.reset());
    }

    answer(value) {
        const q = this.questions[this.currentQuestion];
        if (q.type === 'care') {
            this.responses.care += value;
        } else {
            this.responses.eat += value;
        }

        this.currentQuestion++;

        if (this.currentQuestion < this.questions.length) {
            this.updateQuestion();
        } else {
            this.showResults();
        }

        this.updateProgress();
    }

    updateQuestion() {
        const q = this.questions[this.currentQuestion];
        this.$('#q-icon').textContent = q.icon;
        this.$('#q-text').textContent = q.text;
    }

    updateProgress() {
        const progress = (this.currentQuestion / this.questions.length) * 100;
        this.$('#progress').style.width = progress + '%';

        const careNorm = Math.max(0, this.responses.care) / 8;
        const eatNorm = Math.max(0, this.responses.eat) / 8;

        this.$('#care-score').textContent = Math.round(careNorm * 100);
        this.$('#eat-score').textContent = Math.round(eatNorm * 100);

        const dissonance = careNorm * eatNorm;
        const meterPos = Math.min(95, dissonance * 100);
        this.$('#meter-indicator').style.left = meterPos + '%';
    }

    showResults() {
        const careNorm = Math.max(0, this.responses.care) / 8;
        const eatNorm = Math.max(0, this.responses.eat) / 8;
        const dissonance = careNorm * eatNorm;

        let level = '';
        let result = '';

        if (dissonance > 0.5) {
            level = 'HIGH';
            result = 'STRONG MEAT PARADOX: You care significantly about animals AND eat meat regularly. You likely use psychological strategies to reduce this dissonance.';
        } else if (dissonance > 0.25) {
            level = 'MODERATE';
            result = 'Moderate paradox detected. Some tension exists between your values and behavior regarding animal consumption.';
        } else if (careNorm < 0.3 && eatNorm > 0.5) {
            level = 'LOW';
            result = 'Consistent carnivore: You eat meat without much concern for animal welfare. No paradox, but perhaps worth reflection.';
        } else if (careNorm > 0.5 && eatNorm < 0.3) {
            level = 'LOW';
            result = 'Consistent ethics: Your behavior aligns with your values. You care about animals and limit meat consumption.';
        } else {
            level = 'LOW';
            result = 'Low dissonance detected. Your attitudes about animals and meat consumption are relatively consistent.';
        }

        this.$('#dissonance').textContent = level;
        this.$('#dissonance').style.color = dissonance > 0.5 ? '#ef4444' : '#22c55e';
        this.$('#result-text').textContent = result;

        this.$('#q-text').textContent = 'Assessment complete. Click "Start Over" to retake.';
        this.$('#q-icon').textContent = dissonance > 0.5 ? '🤔' : '✓';
        this.$$('.likert-btn').forEach(btn => btn.style.display = 'none');
    }

    reset() {
        this.responses = { care: 0, eat: 0 };
        this.currentQuestion = 0;
        this.$('#progress').style.width = '0%';
        this.$('#care-score').textContent = '0';
        this.$('#eat-score').textContent = '0';
        this.$('#dissonance').textContent = '-';
        this.$('#meter-indicator').style.left = '0%';
        this.$('#result-text').textContent = 'Answer the questions to measure your meat paradox level...';
        this.$$('.likert-btn').forEach(btn => btn.style.display = '');
        this.updateQuestion();
    }
}

customElements.define('meat-paradox-simulator', MeatParadoxSimulator);

export { MeatParadoxSimulator };
