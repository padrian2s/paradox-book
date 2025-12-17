import { SimulatorBase } from '../simulator-base.js';

class SelfAbsorptionSimulator extends SimulatorBase {
    constructor() {
        super();
        this.responses = [];
        this.currentQuestion = 0;
        this.questions = [
            { text: 'I frequently examine my own thoughts and feelings.', type: 'awareness' },
            { text: 'I often worry about what others think of me.', type: 'rumination' },
            { text: 'I understand why I react the way I do.', type: 'insight' },
            { text: 'I dwell on my mistakes for a long time.', type: 'rumination' },
            { text: 'I can accurately predict my emotional responses.', type: 'insight' },
            { text: 'I spend a lot of time thinking about myself.', type: 'awareness' },
            { text: 'I am overly critical of myself.', type: 'rumination' },
            { text: 'Self-reflection helps me grow as a person.', type: 'insight' }
        ];
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .assessment-container {
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    padding: 1.5rem;
                    margin-top: 1rem;
                }

                .question-number {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                    margin-bottom: 0.5rem;
                }

                .question-text {
                    font-size: 1.1rem;
                    line-height: 1.6;
                    margin-bottom: 1.5rem;
                    text-align: center;
                }

                .likert-scale {
                    display: flex;
                    justify-content: center;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                }

                .likert-btn {
                    background: var(--card, #1e293b) !important;
                    padding: 0.75rem 1rem !important;
                    font-size: 0.875rem !important;
                    flex: 1;
                    min-width: 80px;
                }

                .likert-btn:hover {
                    background: var(--primary, #6366f1) !important;
                }

                .progress-container {
                    margin-top: 1.5rem;
                }

                .progress-bar {
                    background: var(--card, #1e293b);
                    height: 8px;
                    border-radius: 4px;
                    overflow: hidden;
                }

                .progress-fill {
                    height: 100%;
                    background: var(--primary, #6366f1);
                    transition: width 0.3s;
                }

                .results-container {
                    display: none;
                }

                .results-container.visible {
                    display: block;
                }

                .dual-meter {
                    margin-top: 1.5rem;
                }

                .meter-row {
                    margin-bottom: 1rem;
                }

                .meter-label {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.875rem;
                    margin-bottom: 0.25rem;
                }

                .meter-bar {
                    background: var(--card, #1e293b);
                    height: 24px;
                    border-radius: 12px;
                    overflow: hidden;
                }

                .meter-fill {
                    height: 100%;
                    border-radius: 12px;
                    transition: width 0.5s;
                }

                .insight-fill {
                    background: linear-gradient(to right, #22c55e, #84cc16);
                }

                .rumination-fill {
                    background: linear-gradient(to right, #ef4444, #f97316);
                }

                .paradox-zone {
                    background: var(--card, #1e293b);
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    margin-top: 1.5rem;
                    text-align: center;
                }

                .paradox-title {
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                    margin-bottom: 0.5rem;
                }

                .quadrant-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 0.5rem;
                    margin-top: 1rem;
                }

                .quadrant {
                    padding: 0.75rem;
                    border-radius: 0.5rem;
                    font-size: 0.75rem;
                    text-align: center;
                }

                .q-distressed {
                    background: rgba(239, 68, 68, 0.2);
                    border: 1px solid #ef4444;
                }

                .q-wellbeing {
                    background: rgba(34, 197, 94, 0.2);
                    border: 1px solid #22c55e;
                }

                .q-disengaged {
                    background: rgba(148, 163, 184, 0.2);
                    border: 1px solid #94a3b8;
                }

                .q-active {
                    border-width: 3px;
                }

                .your-marker {
                    font-size: 1.5rem;
                }

                @media (max-width: 768px) {
                    .likert-scale {
                        flex-direction: column;
                    }

                    .likert-btn {
                        width: 100%;
                    }
                }
            </style>

            <h4>Self-Awareness Assessment</h4>

            <div class="assessment-container" id="assessment">
                <div class="question-number" id="q-number">Question 1 of 8</div>
                <div class="question-text" id="q-text">I frequently examine my own thoughts and feelings.</div>

                <div class="likert-scale">
                    <button class="likert-btn" data-value="1">Strongly Disagree</button>
                    <button class="likert-btn" data-value="2">Disagree</button>
                    <button class="likert-btn" data-value="3">Neutral</button>
                    <button class="likert-btn" data-value="4">Agree</button>
                    <button class="likert-btn" data-value="5">Strongly Agree</button>
                </div>

                <div class="progress-container">
                    <div class="progress-bar">
                        <div class="progress-fill" id="progress" style="width: 0%"></div>
                    </div>
                </div>
            </div>

            <div class="results-container" id="results">
                <div class="dual-meter">
                    <div class="meter-row">
                        <div class="meter-label">
                            <span>Insight (Growth-oriented awareness)</span>
                            <span id="insight-value">0%</span>
                        </div>
                        <div class="meter-bar">
                            <div class="meter-fill insight-fill" id="insight-meter" style="width: 0%"></div>
                        </div>
                    </div>
                    <div class="meter-row">
                        <div class="meter-label">
                            <span>Rumination (Distress-oriented focus)</span>
                            <span id="rumination-value">0%</span>
                        </div>
                        <div class="meter-bar">
                            <div class="meter-fill rumination-fill" id="rumination-meter" style="width: 0%"></div>
                        </div>
                    </div>
                </div>

                <div class="paradox-zone">
                    <div class="paradox-title">The Self-Absorption Paradox Map</div>
                    <div class="quadrant-grid">
                        <div class="quadrant q-wellbeing" id="q-topleft">
                            <strong>HIGH INSIGHT</strong><br>
                            <strong>LOW RUMINATION</strong><br>
                            Well-being
                        </div>
                        <div class="quadrant q-distressed" id="q-topright">
                            <strong>HIGH INSIGHT</strong><br>
                            <strong>HIGH RUMINATION</strong><br>
                            Paradox Zone
                        </div>
                        <div class="quadrant q-disengaged" id="q-bottomleft">
                            <strong>LOW INSIGHT</strong><br>
                            <strong>LOW RUMINATION</strong><br>
                            Disengaged
                        </div>
                        <div class="quadrant q-distressed" id="q-bottomright">
                            <strong>LOW INSIGHT</strong><br>
                            <strong>HIGH RUMINATION</strong><br>
                            Distress
                        </div>
                    </div>
                </div>
            </div>

            <div class="result">
                <p id="result-text">Answer the questions to discover your self-awareness profile...</p>
            </div>

            <div class="controls" style="margin-top: 1rem; justify-content: center;">
                <button id="reset-btn">Start Over</button>
            </div>

            <div class="insight">
                Research shows self-awareness is NOT uniformly good or bad. "Insight" (understanding yourself) predicts well-being, while "rumination" (obsessing over yourself) predicts distress. Both involve self-focus - the paradox is they lead to opposite outcomes.
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
        this.responses.push({ type: q.type, value });

        this.currentQuestion++;
        const progress = (this.currentQuestion / this.questions.length) * 100;
        this.$('#progress').style.width = progress + '%';

        if (this.currentQuestion < this.questions.length) {
            this.updateQuestion();
        } else {
            this.showResults();
        }
    }

    updateQuestion() {
        const q = this.questions[this.currentQuestion];
        this.$('#q-number').textContent = `Question ${this.currentQuestion + 1} of ${this.questions.length}`;
        this.$('#q-text').textContent = q.text;
    }

    showResults() {
        this.$('#assessment').style.display = 'none';
        this.$('#results').classList.add('visible');

        const insightResponses = this.responses.filter(r => r.type === 'insight');
        const ruminationResponses = this.responses.filter(r => r.type === 'rumination');
        const awarenessResponses = this.responses.filter(r => r.type === 'awareness');

        const insightScore = insightResponses.reduce((sum, r) => sum + r.value, 0) / (insightResponses.length * 5) * 100;
        const ruminationScore = ruminationResponses.reduce((sum, r) => sum + r.value, 0) / (ruminationResponses.length * 5) * 100;
        const awarenessScore = awarenessResponses.reduce((sum, r) => sum + r.value, 0) / (awarenessResponses.length * 5) * 100;

        this.$('#insight-value').textContent = Math.round(insightScore) + '%';
        this.$('#insight-meter').style.width = insightScore + '%';
        this.$('#rumination-value').textContent = Math.round(ruminationScore) + '%';
        this.$('#rumination-meter').style.width = ruminationScore + '%';

        this.$$('.quadrant').forEach(q => q.classList.remove('q-active'));

        let quadrant = '';
        let resultText = '';

        const highInsight = insightScore > 60;
        const highRumination = ruminationScore > 60;

        if (highInsight && !highRumination) {
            quadrant = 'q-topleft';
            resultText = 'HEALTHY SELF-AWARENESS: High insight without excessive rumination. You reflect on yourself in growth-oriented ways. This is the ideal pattern.';
        } else if (highInsight && highRumination) {
            quadrant = 'q-topright';
            resultText = 'PARADOX ZONE: You have both insight AND rumination. High self-awareness correlates with both well-being AND distress for you. The same self-focus brings both benefits and costs.';
        } else if (!highInsight && highRumination) {
            quadrant = 'q-bottomright';
            resultText = 'DISTRESS PATTERN: High rumination without the benefits of insight. You focus on yourself but in unproductive, anxiety-generating ways.';
        } else {
            quadrant = 'q-bottomleft';
            resultText = 'DISENGAGED: Low self-focus overall. You may avoid both the benefits of insight and the costs of rumination.';
        }

        this.$('#' + quadrant).classList.add('q-active');
        this.$('#' + quadrant).innerHTML = this.$('#' + quadrant).innerHTML + '<div class="your-marker">YOU</div>';
        this.$('#result-text').textContent = resultText;
    }

    reset() {
        this.responses = [];
        this.currentQuestion = 0;

        this.$('#assessment').style.display = 'block';
        this.$('#results').classList.remove('visible');
        this.$('#progress').style.width = '0%';
        this.$('#q-number').textContent = 'Question 1 of 8';
        this.$('#q-text').textContent = this.questions[0].text;
        this.$('#result-text').textContent = 'Answer the questions to discover your self-awareness profile...';

        this.$$('.quadrant').forEach(q => {
            q.classList.remove('q-active');
            const marker = q.querySelector('.your-marker');
            if (marker) marker.remove();
        });
    }
}

customElements.define('self-absorption-simulator', SelfAbsorptionSimulator);

export { SelfAbsorptionSimulator };
