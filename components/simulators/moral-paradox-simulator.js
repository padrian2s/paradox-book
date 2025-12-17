import { SimulatorBase } from '../simulator-base.js';

class MoralParadoxSimulator extends SimulatorBase {
    constructor() {
        super();
        this.currentDilemma = 0;
        this.choices = [];
        this.dilemmas = [
            {
                title: 'The Trolley Problem',
                icon: '🚃',
                scenario: 'A trolley is heading toward five people. You can pull a lever to divert it to another track where it will kill one person.',
                optionA: { text: 'Pull the lever (kill 1, save 5)', principle: 'Utilitarian: Maximize total welfare' },
                optionB: { text: 'Do nothing (let 5 die)', principle: 'Deontological: Do not actively kill' },
                conflict: 'Duty not to kill vs. Duty to save lives'
            },
            {
                title: 'The Lying Promise',
                icon: '🤥',
                scenario: 'A murderer asks where your friend is hiding. Telling the truth will lead to their death.',
                optionA: { text: 'Lie to save your friend', principle: 'Consequentialist: Outcomes matter most' },
                optionB: { text: 'Tell the truth', principle: 'Kantian: Never lie, even to murderers' },
                conflict: 'Honesty vs. Protecting the innocent'
            },
            {
                title: 'The Heinz Dilemma',
                icon: '💊',
                scenario: 'Your spouse is dying. The only cure is overpriced by a greedy pharmacist. You cannot afford it legally.',
                optionA: { text: 'Steal the medicine', principle: 'Care ethics: Prioritize relationships' },
                optionB: { text: 'Obey the law', principle: 'Social contract: Laws bind us all' },
                conflict: 'Love and care vs. Justice and law'
            },
            {
                title: 'The Surgeon',
                icon: '👨‍⚕️',
                scenario: 'Five patients need organ transplants to survive. A healthy visitor could provide all five organs.',
                optionA: { text: 'Harvest organs (save 5)', principle: 'Utilitarian calculus: 5 > 1' },
                optionB: { text: 'Refuse (let 5 die)', principle: 'Rights-based: Cannot violate bodily autonomy' },
                conflict: 'Greatest good vs. Individual rights'
            },
            {
                title: 'Conflicting Duties',
                icon: '⚖️',
                scenario: 'You promised to meet a friend, but on the way you see a stranger having a medical emergency.',
                optionA: { text: 'Help the stranger', principle: 'Duty of rescue: Help those in need' },
                optionB: { text: 'Keep your promise', principle: 'Fidelity: Keep your word' },
                conflict: 'Promise-keeping vs. Beneficence'
            }
        ];
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .dilemma-container {
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    padding: 1.5rem;
                    margin-top: 1rem;
                }

                .dilemma-header {
                    text-align: center;
                    margin-bottom: 1.5rem;
                }

                .dilemma-icon {
                    font-size: 3rem;
                    margin-bottom: 0.5rem;
                }

                .dilemma-title {
                    font-size: 1.25rem;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                }

                .scenario-text {
                    text-align: center;
                    line-height: 1.6;
                    margin-bottom: 1.5rem;
                    padding: 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                }

                .options-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                }

                .option-card {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    border: 2px solid transparent;
                    transition: all 0.2s;
                }

                .option-card:hover {
                    border-color: var(--primary, #6366f1);
                }

                .option-card.selected-a {
                    border-color: #22c55e;
                    background: rgba(34, 197, 94, 0.1);
                }

                .option-card.selected-b {
                    border-color: #8b5cf6;
                    background: rgba(139, 92, 246, 0.1);
                }

                .option-text {
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                }

                .option-principle {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    font-style: italic;
                }

                .conflict-box {
                    margin-top: 1rem;
                    padding: 1rem;
                    background: rgba(239, 68, 68, 0.1);
                    border: 1px solid #ef4444;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .conflict-label {
                    font-size: 0.75rem;
                    color: #ef4444;
                    margin-bottom: 0.25rem;
                }

                .conflict-text {
                    font-weight: bold;
                }

                .progress-dots {
                    display: flex;
                    justify-content: center;
                    gap: 0.5rem;
                    margin-top: 1rem;
                }

                .progress-dot {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: var(--muted, #94a3b8);
                }

                .progress-dot.current {
                    background: var(--primary, #6366f1);
                }

                .progress-dot.completed {
                    background: #22c55e;
                }

                .summary-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .summary-box {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .summary-value {
                    font-size: 2rem;
                    font-weight: bold;
                }

                .summary-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }

                @media (max-width: 768px) {
                    .options-grid {
                        grid-template-columns: 1fr;
                    }

                    .summary-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>Moral Conflict Explorer</h4>

            <div class="dilemma-container">
                <div class="dilemma-header">
                    <div class="dilemma-icon" id="dilemma-icon">🚃</div>
                    <div class="dilemma-title" id="dilemma-title">The Trolley Problem</div>
                </div>

                <div class="scenario-text" id="scenario-text">
                    A trolley is heading toward five people. You can pull a lever to divert it to another track where it will kill one person.
                </div>

                <div class="options-grid">
                    <div class="option-card" id="option-a">
                        <div class="option-text" id="option-a-text">Pull the lever (kill 1, save 5)</div>
                        <div class="option-principle" id="option-a-principle">Utilitarian: Maximize total welfare</div>
                    </div>
                    <div class="option-card" id="option-b">
                        <div class="option-text" id="option-b-text">Do nothing (let 5 die)</div>
                        <div class="option-principle" id="option-b-principle">Deontological: Do not actively kill</div>
                    </div>
                </div>

                <div class="conflict-box">
                    <div class="conflict-label">THE MORAL PARADOX</div>
                    <div class="conflict-text" id="conflict-text">Duty not to kill vs. Duty to save lives</div>
                </div>

                <div class="progress-dots" id="progress-dots"></div>
            </div>

            <div class="summary-grid">
                <div class="summary-box">
                    <div class="summary-value" id="consequentialist-count" style="color: #22c55e;">0</div>
                    <div class="summary-label">Consequentialist Choices</div>
                </div>
                <div class="summary-box">
                    <div class="summary-value" id="deontological-count" style="color: #8b5cf6;">0</div>
                    <div class="summary-label">Deontological Choices</div>
                </div>
            </div>

            <div class="controls" style="margin-top: 1rem; justify-content: center;">
                <button id="next-btn">Next Dilemma</button>
                <button id="reset-btn">Start Over</button>
            </div>

            <div class="result">
                <p id="result-text">Choose between the conflicting moral imperatives. Both options follow valid ethical principles, yet they contradict each other.</p>
            </div>

            <div class="insight">
                The moral paradox: Different ethical frameworks (utilitarianism, deontology, virtue ethics, care ethics) can all be internally consistent yet recommend contradictory actions. There is no meta-ethical principle to decide between them without begging the question.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#option-a').addEventListener('click', () => this.selectOption('a'));
        this.$('#option-b').addEventListener('click', () => this.selectOption('b'));
        this.$('#next-btn').addEventListener('click', () => this.nextDilemma());
        this.$('#reset-btn').addEventListener('click', () => this.reset());

        this.renderProgressDots();
        this.updateDisplay();
    }

    renderProgressDots() {
        const container = this.$('#progress-dots');
        container.innerHTML = this.dilemmas.map((_, i) =>
            `<div class="progress-dot ${i === 0 ? 'current' : ''}" data-index="${i}"></div>`
        ).join('');
    }

    updateProgressDots() {
        const dots = this.$$('.progress-dot');
        dots.forEach((dot, i) => {
            dot.classList.remove('current', 'completed');
            if (i < this.choices.length) {
                dot.classList.add('completed');
            } else if (i === this.currentDilemma) {
                dot.classList.add('current');
            }
        });
    }

    selectOption(option) {
        this.$('#option-a').classList.remove('selected-a', 'selected-b');
        this.$('#option-b').classList.remove('selected-a', 'selected-b');

        if (option === 'a') {
            this.$('#option-a').classList.add('selected-a');
            this.choices[this.currentDilemma] = 'consequentialist';
        } else {
            this.$('#option-b').classList.add('selected-b');
            this.choices[this.currentDilemma] = 'deontological';
        }

        this.updateCounts();

        const dilemma = this.dilemmas[this.currentDilemma];
        this.$('#result-text').textContent = `You chose based on ${option === 'a' ? dilemma.optionA.principle : dilemma.optionB.principle}. But the other choice is also ethically defensible! This is the paradox: valid moral reasoning leads to contradictory conclusions.`;
    }

    updateCounts() {
        const conseq = this.choices.filter(c => c === 'consequentialist').length;
        const deont = this.choices.filter(c => c === 'deontological').length;

        this.$('#consequentialist-count').textContent = conseq;
        this.$('#deontological-count').textContent = deont;
    }

    nextDilemma() {
        if (this.currentDilemma < this.dilemmas.length - 1) {
            this.currentDilemma++;
            this.updateDisplay();
            this.updateProgressDots();
        } else {
            this.showSummary();
        }
    }

    updateDisplay() {
        const dilemma = this.dilemmas[this.currentDilemma];

        this.$('#dilemma-icon').textContent = dilemma.icon;
        this.$('#dilemma-title').textContent = dilemma.title;
        this.$('#scenario-text').textContent = dilemma.scenario;
        this.$('#option-a-text').textContent = dilemma.optionA.text;
        this.$('#option-a-principle').textContent = dilemma.optionA.principle;
        this.$('#option-b-text').textContent = dilemma.optionB.text;
        this.$('#option-b-principle').textContent = dilemma.optionB.principle;
        this.$('#conflict-text').textContent = dilemma.conflict;

        this.$('#option-a').classList.remove('selected-a', 'selected-b');
        this.$('#option-b').classList.remove('selected-a', 'selected-b');

        if (this.choices[this.currentDilemma]) {
            if (this.choices[this.currentDilemma] === 'consequentialist') {
                this.$('#option-a').classList.add('selected-a');
            } else {
                this.$('#option-b').classList.add('selected-b');
            }
        }

        this.$('#result-text').textContent = 'Choose between the conflicting moral imperatives. Both options follow valid ethical principles, yet they contradict each other.';
    }

    showSummary() {
        const conseq = this.choices.filter(c => c === 'consequentialist').length;
        const deont = this.choices.filter(c => c === 'deontological').length;
        const total = this.choices.length;

        let resultText = '';
        if (conseq > deont) {
            resultText = `MORAL PROFILE: You lean consequentialist (${conseq}/${total}). You prioritize outcomes over rules. But you still made deontological choices sometimes - because different situations call for different principles. This inconsistency IS the paradox.`;
        } else if (deont > conseq) {
            resultText = `MORAL PROFILE: You lean deontological (${deont}/${total}). You prioritize duties and rules over outcomes. But you still made consequentialist choices sometimes - because different situations call for different principles. This inconsistency IS the paradox.`;
        } else {
            resultText = `MORAL PROFILE: Evenly split between consequentialist and deontological reasoning. You see merit in both frameworks, which perfectly illustrates the paradox: both are valid, yet incompatible.`;
        }

        this.$('#result-text').textContent = resultText;
        this.$('#next-btn').textContent = 'Complete';
        this.$('#next-btn').disabled = true;
    }

    reset() {
        this.currentDilemma = 0;
        this.choices = [];

        this.$('#consequentialist-count').textContent = '0';
        this.$('#deontological-count').textContent = '0';
        this.$('#next-btn').textContent = 'Next Dilemma';
        this.$('#next-btn').disabled = false;

        this.renderProgressDots();
        this.updateDisplay();
    }
}

customElements.define('moral-paradox-simulator', MoralParadoxSimulator);

export { MoralParadoxSimulator };
