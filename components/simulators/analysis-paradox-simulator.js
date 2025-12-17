import { SimulatorBase } from '../simulator-base.js';

class AnalysisParadoxSimulator extends SimulatorBase {
    constructor() {
        super();
        this.examples = [
            {
                concept: 'Bachelor',
                analysis: 'An unmarried adult male',
                icon: '👨',
                explanation: 'If "bachelor" simply MEANS "unmarried adult male," then saying so tells us nothing new - we already knew that!'
            },
            {
                concept: 'Knowledge',
                analysis: 'Justified true belief',
                icon: '🧠',
                explanation: 'If "knowledge" is IDENTICAL to "justified true belief," the analysis is trivial. If not identical, it might be wrong.'
            },
            {
                concept: 'Water',
                analysis: 'H2O',
                icon: '💧',
                explanation: 'Is "water is H2O" informative? It was a scientific discovery! But if water JUST IS H2O, how was it ever unknown?'
            },
            {
                concept: 'Brother',
                analysis: 'Male sibling',
                icon: '👦',
                explanation: 'Anyone who knows what "brother" means already knows it means male sibling. So what information does the analysis provide?'
            },
            {
                concept: 'Truth',
                analysis: 'Correspondence with reality',
                icon: '✓',
                explanation: 'If truth just IS correspondence with reality, we learned nothing. If it is not, the analysis fails.'
            }
        ];
        this.currentExample = 0;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .analysis-container {
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    padding: 1.5rem;
                    margin-top: 1rem;
                }

                .concept-display {
                    text-align: center;
                    margin-bottom: 1.5rem;
                }

                .concept-icon {
                    font-size: 4rem;
                    margin-bottom: 0.5rem;
                }

                .concept-word {
                    font-size: 2rem;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                }

                .analysis-equation {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                    margin: 2rem 0;
                    flex-wrap: wrap;
                }

                .equation-box {
                    background: var(--card, #1e293b);
                    padding: 1rem 1.5rem;
                    border-radius: 0.5rem;
                    font-size: 1.1rem;
                }

                .equals-sign {
                    font-size: 2rem;
                    color: var(--primary, #6366f1);
                }

                .question-mark {
                    font-size: 2rem;
                    color: #ef4444;
                    animation: pulse 1.5s infinite;
                }

                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }

                .paradox-branches {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                    margin-top: 1.5rem;
                }

                .branch {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    transition: all 0.2s;
                    border: 2px solid transparent;
                }

                .branch:hover {
                    border-color: var(--primary, #6366f1);
                }

                .branch.selected {
                    border-color: var(--accent, #f59e0b);
                }

                .branch-title {
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                    color: var(--accent, #f59e0b);
                }

                .branch-desc {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                }

                .branch-result {
                    margin-top: 0.5rem;
                    font-size: 0.875rem;
                    color: #ef4444;
                    font-style: italic;
                }

                .explanation-box {
                    background: rgba(245, 158, 11, 0.1);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                    display: none;
                }

                .explanation-box.visible {
                    display: block;
                }

                .nav-dots {
                    display: flex;
                    justify-content: center;
                    gap: 0.5rem;
                    margin-top: 1rem;
                }

                .nav-dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: var(--muted, #94a3b8);
                    cursor: pointer;
                }

                .nav-dot.active {
                    background: var(--primary, #6366f1);
                }

                @media (max-width: 768px) {
                    .paradox-branches {
                        grid-template-columns: 1fr;
                    }

                    .analysis-equation {
                        flex-direction: column;
                    }
                }
            </style>

            <h4>The Analysis Trap</h4>

            <div class="analysis-container">
                <div class="concept-display">
                    <div class="concept-icon" id="concept-icon">👨</div>
                    <div class="concept-word" id="concept-word">Bachelor</div>
                </div>

                <div class="analysis-equation">
                    <div class="equation-box" id="concept-box">Bachelor</div>
                    <div class="equals-sign">=</div>
                    <div class="equation-box" id="analysis-box">Unmarried adult male</div>
                    <div class="question-mark">?</div>
                </div>

                <div class="paradox-branches">
                    <div class="branch" id="branch-identical">
                        <div class="branch-title">If Identical...</div>
                        <div class="branch-desc">The concept and analysis mean the exact same thing</div>
                        <div class="branch-result">Then the analysis is TRIVIAL and uninformative!</div>
                    </div>
                    <div class="branch" id="branch-different">
                        <div class="branch-title">If Different...</div>
                        <div class="branch-desc">The analysis adds something new to the concept</div>
                        <div class="branch-result">Then the analysis is INCORRECT - it changes the meaning!</div>
                    </div>
                </div>

                <div class="explanation-box" id="explanation">
                    If "bachelor" simply MEANS "unmarried adult male," then saying so tells us nothing new - we already knew that!
                </div>

                <div class="nav-dots" id="nav-dots"></div>
            </div>

            <div class="controls" style="margin-top: 1rem; justify-content: center;">
                <button id="prev-btn">Previous</button>
                <button id="next-btn">Next Example</button>
                <button id="reveal-btn">Reveal Paradox</button>
            </div>

            <div class="result">
                <p id="result-text">Click on each horn of the dilemma, or click "Reveal Paradox" to see the full explanation...</p>
            </div>

            <div class="insight">
                G.E. Moore's paradox of analysis: A correct philosophical analysis must be synonymous with what it analyzes (or it is wrong), but then it cannot be informative (since it just repeats the same meaning). Analysis seems impossible!
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#branch-identical').addEventListener('click', () => this.selectBranch('identical'));
        this.$('#branch-different').addEventListener('click', () => this.selectBranch('different'));
        this.$('#reveal-btn').addEventListener('click', () => this.reveal());
        this.$('#prev-btn').addEventListener('click', () => this.navigate(-1));
        this.$('#next-btn').addEventListener('click', () => this.navigate(1));

        this.renderNavDots();
        this.updateDisplay();
    }

    renderNavDots() {
        const container = this.$('#nav-dots');
        container.innerHTML = this.examples.map((_, i) =>
            `<div class="nav-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></div>`
        ).join('');

        container.querySelectorAll('.nav-dot').forEach(dot => {
            dot.addEventListener('click', (e) => {
                this.currentExample = parseInt(e.target.dataset.index);
                this.updateDisplay();
            });
        });
    }

    navigate(direction) {
        this.currentExample = (this.currentExample + direction + this.examples.length) % this.examples.length;
        this.updateDisplay();
    }

    updateDisplay() {
        const example = this.examples[this.currentExample];

        this.$('#concept-icon').textContent = example.icon;
        this.$('#concept-word').textContent = example.concept;
        this.$('#concept-box').textContent = example.concept;
        this.$('#analysis-box').textContent = example.analysis;
        this.$('#explanation').textContent = example.explanation;
        this.$('#explanation').classList.remove('visible');

        this.$('#branch-identical').classList.remove('selected');
        this.$('#branch-different').classList.remove('selected');

        this.$$('.nav-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === this.currentExample);
        });

        this.$('#result-text').textContent = 'Click on each horn of the dilemma, or click "Reveal Paradox" to see the full explanation...';
    }

    selectBranch(branch) {
        this.$('#branch-identical').classList.remove('selected');
        this.$('#branch-different').classList.remove('selected');
        this.$('#branch-' + branch).classList.add('selected');

        if (branch === 'identical') {
            this.$('#result-text').textContent = 'If the analysis is identical to the concept, it tells us nothing we did not already know. It is trivially true but uninformative.';
        } else {
            this.$('#result-text').textContent = 'If the analysis differs from the concept, it is not capturing what the concept actually means. It may be false or incomplete.';
        }
    }

    reveal() {
        this.$('#explanation').classList.add('visible');
        this.$('#branch-identical').classList.add('selected');
        this.$('#branch-different').classList.add('selected');
        this.$('#result-text').textContent = 'THE PARADOX: Both horns lead to problems. Any analysis is either trivially true or possibly false. Philosophy seems stuck!';
    }
}

customElements.define('analysis-paradox-simulator', AnalysisParadoxSimulator);

export { AnalysisParadoxSimulator };
