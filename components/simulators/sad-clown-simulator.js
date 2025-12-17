import { SimulatorBase } from '../simulator-base.js';

class SadClownSimulator extends SimulatorBase {
    constructor() {
        super();
        this.comedians = [
            { name: 'Robin Williams', public: 95, private: 25, quote: 'I think the saddest people always try their hardest to make people happy.' },
            { name: 'Jim Carrey', public: 90, private: 35, quote: 'I wish everyone could get rich and famous so they can see that is not the answer.' },
            { name: 'Richard Pryor', public: 88, private: 30, quote: 'There was a time in my life when I thought I had everything - millions of dollars, mansions, cars... But I was lonely.' },
            { name: 'Chris Farley', public: 92, private: 28, quote: 'The pressure to keep being funny was immense.' },
            { name: 'Maria Bamford', public: 85, private: 40, quote: 'I have had dark thoughts... Comedy became my therapy.' },
            { name: 'Gary Gulman', public: 82, private: 45, quote: 'Depression does not care about your success.' }
        ];
        this.currentIndex = 0;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .comedian-card {
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    padding: 1.5rem;
                    margin-top: 1rem;
                }

                .comedian-header {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 1rem;
                }

                .mask-icon {
                    font-size: 3rem;
                }

                .comedian-name {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                }

                .meters-container {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.5rem;
                    margin: 1.5rem 0;
                }

                .meter-group {
                    text-align: center;
                }

                .meter-label {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                    margin-bottom: 0.5rem;
                }

                .meter-bar {
                    height: 20px;
                    background: var(--card, #1e293b);
                    border-radius: 10px;
                    overflow: hidden;
                }

                .meter-fill {
                    height: 100%;
                    border-radius: 10px;
                    transition: width 0.5s;
                }

                .public-fill {
                    background: linear-gradient(to right, #22c55e, #84cc16);
                }

                .private-fill {
                    background: linear-gradient(to right, #6366f1, #8b5cf6);
                }

                .meter-value {
                    font-size: 1.25rem;
                    font-weight: bold;
                    margin-top: 0.5rem;
                }

                .quote-box {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    font-style: italic;
                    border-left: 3px solid var(--accent, #f59e0b);
                }

                .paradox-visual {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    margin-top: 1rem;
                    font-size: 2rem;
                }

                .gap-indicator {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                    margin-top: 1rem;
                }

                .gap-value {
                    font-size: 2rem;
                    font-weight: bold;
                    color: #ef4444;
                }

                .gap-label {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
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
                    transition: all 0.2s;
                }

                .nav-dot.active {
                    background: var(--primary, #6366f1);
                    transform: scale(1.2);
                }

                @media (max-width: 768px) {
                    .meters-container {
                        grid-template-columns: 1fr;
                    }

                    .comedian-header {
                        flex-direction: column;
                        text-align: center;
                    }
                }
            </style>

            <h4>The Mask They Wear</h4>

            <div class="comedian-card">
                <div class="comedian-header">
                    <div class="mask-icon">🎭</div>
                    <div class="comedian-name" id="comedian-name">Robin Williams</div>
                </div>

                <div class="meters-container">
                    <div class="meter-group">
                        <div class="meter-label">Public Persona (Joy Given)</div>
                        <div class="meter-bar">
                            <div class="meter-fill public-fill" id="public-meter" style="width: 95%"></div>
                        </div>
                        <div class="meter-value" id="public-value" style="color: #22c55e;">95%</div>
                    </div>
                    <div class="meter-group">
                        <div class="meter-label">Private Reality (Inner State)</div>
                        <div class="meter-bar">
                            <div class="meter-fill private-fill" id="private-meter" style="width: 25%"></div>
                        </div>
                        <div class="meter-value" id="private-value" style="color: #8b5cf6;">25%</div>
                    </div>
                </div>

                <div class="paradox-visual">
                    <span>😂</span>
                    <span style="color: var(--muted);">→</span>
                    <span id="mask-emoji">🎭</span>
                    <span style="color: var(--muted);">→</span>
                    <span>😔</span>
                </div>

                <div class="gap-indicator">
                    <div class="gap-value" id="gap-value">70%</div>
                    <div class="gap-label">Paradox Gap (Public vs Private)</div>
                </div>

                <div class="quote-box" id="quote-box">
                    "I think the saddest people always try their hardest to make people happy."
                </div>

                <div class="nav-dots" id="nav-dots"></div>
            </div>

            <div class="controls" style="margin-top: 1rem; justify-content: center;">
                <button id="prev-btn">Previous</button>
                <button id="next-btn">Next</button>
            </div>

            <div class="result">
                <p id="result-text">Explore the disconnect between the joy comedians bring and their inner struggles...</p>
            </div>

            <div class="insight">
                Research suggests comedians have higher rates of depression and anxiety. Theories include: humor as a coping mechanism developed in childhood, the emotional toll of performing happiness, and selection bias - those who suffer may be drawn to comedy.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#prev-btn').addEventListener('click', () => this.navigate(-1));
        this.$('#next-btn').addEventListener('click', () => this.navigate(1));

        this.renderNavDots();
        this.updateDisplay();
    }

    renderNavDots() {
        const container = this.$('#nav-dots');
        container.innerHTML = this.comedians.map((_, i) =>
            `<div class="nav-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></div>`
        ).join('');

        container.querySelectorAll('.nav-dot').forEach(dot => {
            dot.addEventListener('click', (e) => {
                this.currentIndex = parseInt(e.target.dataset.index);
                this.updateDisplay();
            });
        });
    }

    navigate(direction) {
        this.currentIndex = (this.currentIndex + direction + this.comedians.length) % this.comedians.length;
        this.updateDisplay();
    }

    updateDisplay() {
        const comedian = this.comedians[this.currentIndex];

        this.$('#comedian-name').textContent = comedian.name;
        this.$('#public-meter').style.width = comedian.public + '%';
        this.$('#public-value').textContent = comedian.public + '%';
        this.$('#private-meter').style.width = comedian.private + '%';
        this.$('#private-value').textContent = comedian.private + '%';

        const gap = comedian.public - comedian.private;
        this.$('#gap-value').textContent = gap + '%';
        this.$('#gap-value').style.color = gap > 50 ? '#ef4444' : '#f59e0b';

        this.$('#quote-box').textContent = '"' + comedian.quote + '"';

        this.$$('.nav-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === this.currentIndex);
        });

        let resultText = '';
        if (gap >= 60) {
            resultText = 'SEVERE PARADOX: The immense gap between public joy and private pain illustrates the tragic irony of the sad clown.';
        } else if (gap >= 40) {
            resultText = 'Significant paradox: A notable disconnect exists between the happiness they create and their inner experience.';
        } else {
            resultText = 'Moderate paradox: Some gap between public persona and private reality, but more aligned than typical.';
        }
        this.$('#result-text').textContent = resultText;
    }
}

customElements.define('sad-clown-simulator', SadClownSimulator);

export { SadClownSimulator };
