import { SimulatorBase } from '../simulator-base.js';

class SuspenseParadoxSimulator extends SimulatorBase {
    constructor() {
        super();
        this.viewingHistory = [];
        this.currentStory = 0;
        this.stories = [
            {
                title: 'Titanic',
                icon: '🚢',
                setup: 'The ship is heading toward the iceberg...',
                outcome: 'The ship sinks. Jack dies.',
                knownOutcome: true,
                suspenseQuestion: 'Did you feel suspense watching this scene, even knowing what happens?'
            },
            {
                title: 'Romeo and Juliet',
                icon: '💔',
                setup: 'Romeo finds Juliet seemingly dead...',
                outcome: 'Both die tragically.',
                knownOutcome: true,
                suspenseQuestion: 'Even knowing the ending, did you feel tension in this moment?'
            },
            {
                title: 'Psycho',
                icon: '🚿',
                setup: 'Marion steps into the shower at the Bates Motel...',
                outcome: 'She is murdered.',
                knownOutcome: true,
                suspenseQuestion: 'On repeat viewings, does the shower scene still create anxiety?'
            },
            {
                title: 'The Empire Strikes Back',
                icon: '⚔️',
                setup: 'Darth Vader reveals the truth about Luke\'s father...',
                outcome: '"I am your father."',
                knownOutcome: true,
                suspenseQuestion: 'Even knowing the twist, do you feel anticipation in this scene?'
            },
            {
                title: 'Your Favorite Movie',
                icon: '🎬',
                setup: 'Think of a movie you have watched multiple times...',
                outcome: 'You know exactly how it ends.',
                knownOutcome: true,
                suspenseQuestion: 'Do you still feel suspense during tense scenes?'
            }
        ];
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .story-container {
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    padding: 1.5rem;
                    margin-top: 1rem;
                    text-align: center;
                }

                .story-icon {
                    font-size: 4rem;
                    margin-bottom: 1rem;
                }

                .story-title {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                    margin-bottom: 1rem;
                }

                .story-setup {
                    font-size: 1.1rem;
                    line-height: 1.6;
                    margin-bottom: 1rem;
                }

                .outcome-box {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    margin: 1rem 0;
                }

                .outcome-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-bottom: 0.5rem;
                }

                .outcome-text {
                    color: #ef4444;
                    font-weight: bold;
                }

                .known-badge {
                    display: inline-block;
                    background: rgba(239, 68, 68, 0.2);
                    color: #ef4444;
                    padding: 0.25rem 0.75rem;
                    border-radius: 1rem;
                    font-size: 0.75rem;
                    margin-top: 0.5rem;
                }

                .question-section {
                    margin-top: 1.5rem;
                    padding-top: 1rem;
                    border-top: 1px solid var(--card, #1e293b);
                }

                .question-text {
                    margin-bottom: 1rem;
                    font-style: italic;
                }

                .response-buttons {
                    display: flex;
                    gap: 0.5rem;
                    justify-content: center;
                    flex-wrap: wrap;
                }

                .response-btn {
                    background: var(--card, #1e293b) !important;
                    padding: 0.5rem 1.5rem !important;
                }

                .response-btn:hover {
                    background: var(--primary, #6366f1) !important;
                }

                .yes-btn:hover {
                    background: #22c55e !important;
                }

                .no-btn:hover {
                    background: #ef4444 !important;
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
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                .progress-bar {
                    display: flex;
                    gap: 0.25rem;
                    justify-content: center;
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

                .progress-dot.yes {
                    background: #22c55e;
                }

                .progress-dot.no {
                    background: #ef4444;
                }

                @media (max-width: 768px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }

                    .response-buttons {
                        flex-direction: column;
                    }

                    .response-btn {
                        width: 100%;
                    }
                }
            </style>

            <h4>Repeat Viewing Suspense Test</h4>

            <div class="story-container">
                <div class="story-icon" id="story-icon">🚢</div>
                <div class="story-title" id="story-title">Titanic</div>
                <div class="story-setup" id="story-setup">The ship is heading toward the iceberg...</div>

                <div class="outcome-box">
                    <div class="outcome-label">YOU ALREADY KNOW:</div>
                    <div class="outcome-text" id="outcome-text">The ship sinks. Jack dies.</div>
                    <div class="known-badge">SPOILED</div>
                </div>

                <div class="question-section">
                    <div class="question-text" id="question-text">Did you feel suspense watching this scene, even knowing what happens?</div>
                    <div class="response-buttons">
                        <button class="response-btn yes-btn" id="yes-btn">Yes, I still felt suspense</button>
                        <button class="response-btn no-btn" id="no-btn">No, knowledge killed suspense</button>
                    </div>
                </div>

                <div class="progress-bar" id="progress-bar"></div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="yes-count">0</div>
                    <div class="stat-label">Felt Suspense</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="no-count">0</div>
                    <div class="stat-label">No Suspense</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="paradox-level">-</div>
                    <div class="stat-label">Paradox Level</div>
                </div>
            </div>

            <div class="result">
                <p id="result-text">Reflect on whether you feel suspense even when you know the outcome...</p>
            </div>

            <div class="controls" style="margin-top: 1rem; justify-content: center;">
                <button id="reset-btn">Start Over</button>
            </div>

            <div class="insight">
                The paradox: Suspense seems to require uncertainty about outcomes. Yet we feel genuine suspense rewatching movies we have seen before. If we already know what happens, why does our heart still race?
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#yes-btn').addEventListener('click', () => this.respond(true));
        this.$('#no-btn').addEventListener('click', () => this.respond(false));
        this.$('#reset-btn').addEventListener('click', () => this.reset());

        this.renderProgressBar();
        this.updateDisplay();
    }

    renderProgressBar() {
        const container = this.$('#progress-bar');
        container.innerHTML = this.stories.map((_, i) =>
            `<div class="progress-dot ${i === 0 ? 'current' : ''}" data-index="${i}"></div>`
        ).join('');
    }

    updateProgressBar() {
        const dots = this.$$('.progress-dot');
        dots.forEach((dot, i) => {
            dot.classList.remove('current', 'yes', 'no');
            if (i < this.viewingHistory.length) {
                dot.classList.add(this.viewingHistory[i] ? 'yes' : 'no');
            } else if (i === this.currentStory) {
                dot.classList.add('current');
            }
        });
    }

    respond(feltSuspense) {
        this.viewingHistory.push(feltSuspense);
        this.currentStory++;

        this.updateStats();
        this.updateProgressBar();

        if (this.currentStory < this.stories.length) {
            this.updateDisplay();
        } else {
            this.showResults();
        }
    }

    updateDisplay() {
        const story = this.stories[this.currentStory];
        this.$('#story-icon').textContent = story.icon;
        this.$('#story-title').textContent = story.title;
        this.$('#story-setup').textContent = story.setup;
        this.$('#outcome-text').textContent = story.outcome;
        this.$('#question-text').textContent = story.suspenseQuestion;
    }

    updateStats() {
        const yesCount = this.viewingHistory.filter(v => v).length;
        const noCount = this.viewingHistory.filter(v => !v).length;

        this.$('#yes-count').textContent = yesCount;
        this.$('#no-count').textContent = noCount;

        const total = this.viewingHistory.length;
        if (total > 0) {
            const ratio = yesCount / total;
            let level = '';

            if (ratio >= 0.8) {
                level = 'HIGH';
                this.$('#paradox-level').style.color = '#ef4444';
            } else if (ratio >= 0.5) {
                level = 'MODERATE';
                this.$('#paradox-level').style.color = '#f59e0b';
            } else {
                level = 'LOW';
                this.$('#paradox-level').style.color = '#22c55e';
            }

            this.$('#paradox-level').textContent = level;
        }
    }

    showResults() {
        const yesCount = this.viewingHistory.filter(v => v).length;
        const total = this.viewingHistory.length;
        const ratio = yesCount / total;

        let resultText = '';
        if (ratio >= 0.6) {
            resultText = 'PARADOX CONFIRMED: You feel genuine suspense even when you know the outcome. Your emotional system responds to narrative tension independently of cognitive knowledge. This challenges the idea that suspense requires uncertainty.';
        } else if (ratio >= 0.3) {
            resultText = 'Mixed results: You sometimes feel suspense with known outcomes. Your experience varies, which itself is interesting - what makes some stories retain suspense?';
        } else {
            resultText = 'Low paradox: For you, knowing the outcome does reduce suspense. You may be more cognitively driven in your emotional responses to stories.';
        }

        this.$('#result-text').textContent = resultText;
        this.$('#story-setup').textContent = 'Assessment complete!';
        this.$('#question-text').textContent = '';
        this.$('#yes-btn').style.display = 'none';
        this.$('#no-btn').style.display = 'none';
    }

    reset() {
        this.viewingHistory = [];
        this.currentStory = 0;

        this.$('#yes-count').textContent = '0';
        this.$('#no-count').textContent = '0';
        this.$('#paradox-level').textContent = '-';
        this.$('#yes-btn').style.display = '';
        this.$('#no-btn').style.display = '';
        this.$('#result-text').textContent = 'Reflect on whether you feel suspense even when you know the outcome...';

        this.renderProgressBar();
        this.updateDisplay();
    }
}

customElements.define('suspense-paradox-simulator', SuspenseParadoxSimulator);

export { SuspenseParadoxSimulator };
