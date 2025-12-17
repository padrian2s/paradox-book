import { SimulatorBase } from '../simulator-base.js';

class NihilismParadoxSimulator extends SimulatorBase {
    constructor() {
        super();
        this.statements = [
            { text: 'Nothing has meaning', analysis: 'But this statement itself claims to mean something!' },
            { text: 'All beliefs are false', analysis: 'Including this belief? Then it refutes itself.' },
            { text: 'Truth does not exist', analysis: 'Is that true? If so, truth exists.' },
            { text: 'Language is meaningless', analysis: 'You used language to communicate that "meaning".' },
            { text: 'Values are illusions', analysis: 'You seem to value telling us this truth.' },
            { text: 'Knowledge is impossible', analysis: 'How do you know that?' }
        ];
        this.currentIndex = 0;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .nihilism-viz {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .statement-card {
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    padding: 2rem;
                    text-align: center;
                    margin-bottom: 1rem;
                }

                .nihilist-claim {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--primary, #6366f1);
                    margin-bottom: 1rem;
                    font-style: italic;
                }

                .self-refutation {
                    background: rgba(239, 68, 68, 0.1);
                    border: 1px solid #ef4444;
                    border-radius: 0.5rem;
                    padding: 1rem;
                    color: #ef4444;
                    display: none;
                }

                .self-refutation.visible {
                    display: block;
                }

                .logic-diagram {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.5rem;
                    margin-top: 1rem;
                }

                .logic-step {
                    background: var(--card, #1e293b);
                    padding: 0.75rem 1.5rem;
                    border-radius: 0.25rem;
                    position: relative;
                }

                .logic-step.contradiction {
                    background: rgba(239, 68, 68, 0.2);
                    border: 1px solid #ef4444;
                }

                .logic-arrow {
                    color: var(--muted, #94a3b8);
                    font-size: 1.5rem;
                }

                .snake-eating-tail {
                    font-size: 4rem;
                    text-align: center;
                    margin: 1rem 0;
                    animation: spin 10s linear infinite;
                }

                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                .statement-nav {
                    display: flex;
                    justify-content: center;
                    gap: 0.5rem;
                    margin-top: 1rem;
                }

                .nav-dot {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: var(--card, #1e293b);
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .nav-dot.active {
                    background: var(--primary, #6366f1);
                }

                @media (max-width: 600px) {
                    .nihilist-claim {
                        font-size: 1.25rem;
                    }
                    .snake-eating-tail {
                        font-size: 3rem;
                    }
                }
            </style>

            <h4>Self-Refuting Statements</h4>

            <div class="nihilism-viz">
                <div class="statement-card">
                    <div class="nihilist-claim" id="claim">"Nothing has meaning"</div>
                    <button id="analyze-btn">Analyze This Claim</button>
                </div>

                <div class="self-refutation" id="refutation">
                    <div class="logic-diagram">
                        <div class="logic-step">If this statement is meaningful...</div>
                        <div class="logic-arrow">Then something has meaning (this statement)</div>
                        <div class="logic-step contradiction">Which contradicts the claim!</div>
                    </div>
                    <p id="analysis" style="margin-top: 1rem;"></p>
                </div>

                <div class="snake-eating-tail" id="ouroboros" style="display: none;">&#128013;</div>

                <div class="statement-nav" id="nav">
                </div>
            </div>

            <div class="controls" style="margin-top: 1rem;">
                <button id="prev-btn">Previous</button>
                <button id="next-btn">Next Statement</button>
            </div>

            <div class="result">
                <p id="nihilism-result">Explore different nihilistic claims and see how they refute themselves through their own assertion.</p>
            </div>

            <div class="insight">
                This is the performative contradiction: The act of asserting nihilism presupposes the very things nihilism denies - meaning, truth, and value.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#analyze-btn').addEventListener('click', () => this.analyzeStatement());
        this.$('#prev-btn').addEventListener('click', () => this.navigate(-1));
        this.$('#next-btn').addEventListener('click', () => this.navigate(1));
        this.renderNav();
        this.updateDisplay();
    }

    renderNav() {
        const nav = this.$('#nav');
        nav.innerHTML = this.statements.map((_, i) =>
            `<div class="nav-dot${i === this.currentIndex ? ' active' : ''}" data-index="${i}"></div>`
        ).join('');

        nav.querySelectorAll('.nav-dot').forEach(dot => {
            dot.addEventListener('click', () => {
                this.currentIndex = parseInt(dot.dataset.index);
                this.updateDisplay();
            });
        });
    }

    updateDisplay() {
        const statement = this.statements[this.currentIndex];
        this.$('#claim').textContent = `"${statement.text}"`;
        this.$('#refutation').classList.remove('visible');
        this.$('#ouroboros').style.display = 'none';
        this.$('#analysis').textContent = '';

        this.$$('.nav-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === this.currentIndex);
        });
    }

    analyzeStatement() {
        const statement = this.statements[this.currentIndex];
        this.$('#refutation').classList.add('visible');
        this.$('#analysis').textContent = statement.analysis;
        this.$('#ouroboros').style.display = 'block';

        this.$('#nihilism-result').innerHTML = `<strong style="color: #ef4444;">SELF-REFUTATION DETECTED!</strong> The claim "${statement.text}" undermines itself by being a meaningful assertion about the absence of meaning.`;
    }

    navigate(direction) {
        this.currentIndex = (this.currentIndex + direction + this.statements.length) % this.statements.length;
        this.updateDisplay();
    }
}

customElements.define('nihilism-paradox-simulator', NihilismParadoxSimulator);

export { NihilismParadoxSimulator };
