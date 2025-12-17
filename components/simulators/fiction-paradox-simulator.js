import { SimulatorBase } from '../simulator-base.js';

class FictionParadoxSimulator extends SimulatorBase {
    constructor() {
        super();
        this.currentScene = 0;
        this.emotionLog = [];
        this.scenes = [
            {
                icon: '🎬',
                title: 'The Sacrifice',
                text: 'A beloved character sacrifices themselves to save others. You know this is fiction, yet...',
                emotion: 'sadness',
                emotionIcon: '😢'
            },
            {
                icon: '👻',
                title: 'The Jump Scare',
                text: 'The monster appears suddenly behind the protagonist. Your heart races...',
                emotion: 'fear',
                emotionIcon: '😨'
            },
            {
                icon: '💕',
                title: 'The Reunion',
                text: 'After years apart, the lovers finally embrace. A warmth spreads through you...',
                emotion: 'joy',
                emotionIcon: '🥹'
            },
            {
                icon: '😤',
                title: 'The Betrayal',
                text: 'The trusted ally reveals they were the villain all along. You feel outraged...',
                emotion: 'anger',
                emotionIcon: '😠'
            },
            {
                icon: '🎭',
                title: 'The Injustice',
                text: 'The innocent character is wrongly punished while the guilty goes free...',
                emotion: 'indignation',
                emotionIcon: '😤'
            }
        ];
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .scene-container {
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    padding: 1.5rem;
                    text-align: center;
                    margin-top: 1rem;
                }

                .scene-icon {
                    font-size: 4rem;
                    margin-bottom: 1rem;
                }

                .scene-title {
                    font-size: 1.25rem;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                    margin-bottom: 0.5rem;
                }

                .scene-text {
                    line-height: 1.6;
                    margin-bottom: 1rem;
                }

                .emotion-prompt {
                    color: var(--muted, #94a3b8);
                    margin-bottom: 1rem;
                }

                .emotion-buttons {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    justify-content: center;
                    margin-bottom: 1rem;
                }

                .emotion-btn {
                    background: var(--card, #1e293b) !important;
                    padding: 0.5rem 1rem !important;
                    font-size: 0.875rem !important;
                }

                .emotion-btn:hover {
                    background: var(--primary, #6366f1) !important;
                }

                .emotion-log {
                    display: flex;
                    gap: 0.25rem;
                    justify-content: center;
                    flex-wrap: wrap;
                    margin-top: 1rem;
                }

                .logged-emotion {
                    font-size: 1.5rem;
                }

                .stats-row {
                    display: flex;
                    justify-content: center;
                    gap: 2rem;
                    margin-top: 1rem;
                }

                .stat-item {
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
                }

                @media (max-width: 768px) {
                    .emotion-buttons {
                        flex-direction: column;
                    }

                    .emotion-btn {
                        width: 100%;
                    }
                }
            </style>

            <h4>Fictional Emotion Test</h4>

            <div class="scene-container">
                <div class="scene-icon" id="scene-icon">🎬</div>
                <div class="scene-title" id="scene-title">The Sacrifice</div>
                <div class="scene-text" id="scene-text">A beloved character sacrifices themselves to save others. You know this is fiction, yet...</div>
                <div class="emotion-prompt">Did you feel anything? Be honest.</div>
                <div class="emotion-buttons">
                    <button class="emotion-btn" data-response="yes">Yes, I felt it</button>
                    <button class="emotion-btn" data-response="slight">A little</button>
                    <button class="emotion-btn" data-response="no">Nothing at all</button>
                </div>
                <div class="emotion-log" id="emotion-log"></div>
            </div>

            <div class="controls" style="margin-top: 1rem; justify-content: center;">
                <button id="next-btn">Next Scene</button>
                <button id="reset-btn">Reset Test</button>
            </div>

            <div class="stats-row">
                <div class="stat-item">
                    <div class="stat-value" id="felt-count">0</div>
                    <div class="stat-label">Emotions Felt</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value" id="scene-count">0/5</div>
                    <div class="stat-label">Scenes Viewed</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value" id="paradox-score">-</div>
                    <div class="stat-label">Paradox Level</div>
                </div>
            </div>

            <div class="result">
                <p id="result-text">Experience fictional scenes and report your emotional responses...</p>
            </div>

            <div class="insight">
                The paradox: We know fictional characters do not exist, yet we cry at their deaths, fear for their safety, and rejoice at their victories. How can we have genuine emotions about things we know are not real?
            </div>
        `;
    }

    setupEventListeners() {
        this.$$('.emotion-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.recordEmotion(e.target.dataset.response));
        });
        this.$('#next-btn').addEventListener('click', () => this.nextScene());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
        this.updateDisplay();
    }

    recordEmotion(response) {
        const scene = this.scenes[this.currentScene];
        this.emotionLog.push({
            scene: scene.title,
            emotion: scene.emotion,
            icon: response === 'yes' ? scene.emotionIcon : (response === 'slight' ? '😐' : '😶'),
            felt: response
        });
        this.updateEmotionLog();
        this.updateStats();
        this.nextScene();
    }

    nextScene() {
        this.currentScene = (this.currentScene + 1) % this.scenes.length;
        this.updateDisplay();
    }

    updateDisplay() {
        const scene = this.scenes[this.currentScene];
        this.$('#scene-icon').textContent = scene.icon;
        this.$('#scene-title').textContent = scene.title;
        this.$('#scene-text').textContent = scene.text;
    }

    updateEmotionLog() {
        const log = this.$('#emotion-log');
        log.innerHTML = this.emotionLog.map(e =>
            `<span class="logged-emotion" title="${e.scene}: ${e.emotion}">${e.icon}</span>`
        ).join('');
    }

    updateStats() {
        const feltCount = this.emotionLog.filter(e => e.felt === 'yes' || e.felt === 'slight').length;
        const total = this.emotionLog.length;

        this.$('#felt-count').textContent = feltCount;
        this.$('#scene-count').textContent = `${total}/5`;

        if (total > 0) {
            const ratio = feltCount / total;
            let paradoxLevel = '-';
            let resultText = '';

            if (ratio >= 0.8) {
                paradoxLevel = 'HIGH';
                resultText = 'PARADOX CONFIRMED: You feel genuine emotions for fictional beings you know do not exist. Your emotional system does not distinguish fiction from reality.';
            } else if (ratio >= 0.4) {
                paradoxLevel = 'MODERATE';
                resultText = 'Partial paradox: You sometimes feel for fictional characters. Your emotions are partially engaged despite knowing it is fiction.';
            } else {
                paradoxLevel = 'LOW';
                resultText = 'Low emotional engagement with fiction. Either you are unusually rational, or you might be missing out on the joy of storytelling.';
            }

            this.$('#paradox-score').textContent = paradoxLevel;
            this.$('#paradox-score').style.color = ratio >= 0.6 ? '#ef4444' : '#22c55e';
            this.$('#result-text').textContent = resultText;
        }
    }

    reset() {
        this.currentScene = 0;
        this.emotionLog = [];
        this.$('#emotion-log').innerHTML = '';
        this.$('#felt-count').textContent = '0';
        this.$('#scene-count').textContent = '0/5';
        this.$('#paradox-score').textContent = '-';
        this.$('#result-text').textContent = 'Experience fictional scenes and report your emotional responses...';
        this.updateDisplay();
    }
}

customElements.define('fiction-paradox-simulator', FictionParadoxSimulator);

export { FictionParadoxSimulator };
