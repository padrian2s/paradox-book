import { SimulatorBase } from '../simulator-base.js';

class MortonForkSimulator extends SimulatorBase {
    constructor() {
        super();
        this.examples = [
            {
                name: 'Medieval Tax Collection',
                premise1: 'You live lavishly',
                conclusion1: 'You can afford high taxes',
                premise2: 'You live frugally',
                conclusion2: 'You must have savings to tax',
                finalConclusion: 'Either way: PAY MORE TAXES!',
                context: 'Cardinal Morton\'s original dilemma for collecting taxes from nobles'
            },
            {
                name: 'Job Interview',
                premise1: 'You have long experience',
                conclusion1: 'You\'re overqualified/expensive',
                premise2: 'You have little experience',
                conclusion2: 'You\'re underqualified',
                finalConclusion: 'Either way: REJECTED!',
                context: 'The catch-22 faced by job seekers'
            },
            {
                name: 'Whistleblower',
                premise1: 'You stayed quiet',
                conclusion1: 'You\'re complicit',
                premise2: 'You spoke up earlier',
                conclusion2: 'Why didn\'t you stop it?',
                finalConclusion: 'Either way: YOU\'RE TO BLAME!',
                context: 'The impossible position of those who witness wrongdoing'
            },
            {
                name: 'Defendant\'s Silence',
                premise1: 'You remain silent',
                conclusion1: 'You must be hiding something',
                premise2: 'You speak up',
                conclusion2: 'Anything you say can be used against you',
                finalConclusion: 'Either way: LOOKS GUILTY!',
                context: 'The paradox of legal self-defense'
            }
        ];
        this.currentExample = 0;
        this.revealed = false;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .fork-viz {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .fork-title {
                    font-size: 1.25rem;
                    font-weight: bold;
                    color: var(--primary, #6366f1);
                    text-align: center;
                    margin-bottom: 1rem;
                }

                .fork-diagram {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                }

                .fork-choice {
                    display: flex;
                    gap: 2rem;
                    justify-content: center;
                    width: 100%;
                }

                .prong {
                    flex: 1;
                    max-width: 200px;
                    text-align: center;
                }

                .prong-premise {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    margin-bottom: 0.5rem;
                    cursor: pointer;
                    transition: all 0.3s;
                    border: 2px solid transparent;
                }

                .prong-premise:hover {
                    border-color: var(--primary, #6366f1);
                }

                .prong-premise.selected {
                    border-color: var(--primary, #6366f1);
                    background: rgba(99, 102, 241, 0.2);
                }

                .prong-arrow {
                    font-size: 1.5rem;
                    color: var(--muted, #94a3b8);
                    opacity: 0;
                    transition: opacity 0.3s;
                }

                .prong-arrow.visible {
                    opacity: 1;
                }

                .prong-conclusion {
                    background: rgba(239, 68, 68, 0.2);
                    border: 1px solid #ef4444;
                    padding: 1rem;
                    border-radius: 0.5rem;
                    color: #ef4444;
                    opacity: 0;
                    transition: opacity 0.3s;
                }

                .prong-conclusion.visible {
                    opacity: 1;
                }

                .fork-merge {
                    width: 100%;
                    text-align: center;
                    margin-top: 1rem;
                }

                .merge-arrow {
                    font-size: 2rem;
                    color: var(--muted, #94a3b8);
                    opacity: 0;
                    transition: opacity 0.3s;
                }

                .merge-arrow.visible {
                    opacity: 1;
                }

                .final-conclusion {
                    background: rgba(239, 68, 68, 0.3);
                    border: 2px solid #ef4444;
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    font-weight: bold;
                    font-size: 1.25rem;
                    color: #ef4444;
                    opacity: 0;
                    transition: opacity 0.3s;
                }

                .final-conclusion.visible {
                    opacity: 1;
                }

                .context {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                    font-style: italic;
                    text-align: center;
                    margin-top: 1rem;
                }

                .example-nav {
                    display: flex;
                    justify-content: center;
                    gap: 0.5rem;
                    margin-bottom: 1rem;
                }

                .example-btn {
                    padding: 0.5rem 0.75rem;
                    font-size: 0.7rem;
                    background: var(--card, #1e293b) !important;
                }

                .example-btn.active {
                    background: var(--primary, #6366f1) !important;
                }

                @media (max-width: 600px) {
                    .fork-choice {
                        flex-direction: column;
                        gap: 1rem;
                    }
                    .prong {
                        max-width: 100%;
                    }
                    .example-nav {
                        flex-wrap: wrap;
                    }
                }
            </style>

            <h4>Choose Your Path (It Doesn't Matter)</h4>

            <div class="fork-viz">
                <div class="example-nav" id="example-nav">
                </div>

                <div class="fork-title" id="fork-title">Medieval Tax Collection</div>

                <div class="fork-diagram">
                    <div class="fork-choice">
                        <div class="prong">
                            <div class="prong-premise" id="premise1" data-prong="1">You live lavishly</div>
                            <div class="prong-arrow" id="arrow1">&#8595;</div>
                            <div class="prong-conclusion" id="conclusion1">You can afford high taxes</div>
                        </div>
                        <div class="prong">
                            <div class="prong-premise" id="premise2" data-prong="2">You live frugally</div>
                            <div class="prong-arrow" id="arrow2">&#8595;</div>
                            <div class="prong-conclusion" id="conclusion2">You must have savings to tax</div>
                        </div>
                    </div>

                    <div class="fork-merge">
                        <div class="merge-arrow" id="merge-arrow">&#8595; &#8595;</div>
                        <div class="final-conclusion" id="final-conclusion">Either way: PAY MORE TAXES!</div>
                    </div>
                </div>

                <div class="context" id="context">Cardinal Morton's original dilemma for collecting taxes from nobles</div>
            </div>

            <div class="controls" style="margin-top: 1rem;">
                <button id="reveal-btn">Reveal the Fork</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="result">
                <p id="fork-result">Click on either premise to see how contradictory observations lead to the same conclusion.</p>
            </div>

            <div class="insight">
                Morton's Fork is a false dilemma where all paths lead to the same predetermined conclusion. It's a rhetorical trap where the appearance of choice masks inevitability.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#premise1').addEventListener('click', () => this.selectProng(1));
        this.$('#premise2').addEventListener('click', () => this.selectProng(2));
        this.$('#reveal-btn').addEventListener('click', () => this.revealFork());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
        this.renderExampleNav();
        this.updateDisplay();
    }

    renderExampleNav() {
        const nav = this.$('#example-nav');
        nav.innerHTML = this.examples.map((e, i) =>
            `<button class="example-btn${i === this.currentExample ? ' active' : ''}" data-index="${i}">${e.name}</button>`
        ).join('');

        nav.querySelectorAll('.example-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.currentExample = parseInt(btn.dataset.index);
                this.revealed = false;
                this.updateExampleNav();
                this.updateDisplay();
                this.reset();
            });
        });
    }

    updateExampleNav() {
        this.$$('.example-btn').forEach((btn, i) => {
            btn.classList.toggle('active', i === this.currentExample);
        });
    }

    updateDisplay() {
        const example = this.examples[this.currentExample];
        this.$('#fork-title').textContent = example.name;
        this.$('#premise1').textContent = example.premise1;
        this.$('#premise2').textContent = example.premise2;
        this.$('#conclusion1').textContent = example.conclusion1;
        this.$('#conclusion2').textContent = example.conclusion2;
        this.$('#final-conclusion').textContent = example.finalConclusion;
        this.$('#context').textContent = example.context;
    }

    selectProng(prong) {
        this.$$('.prong-premise').forEach(p => p.classList.remove('selected'));
        this.$(`#premise${prong}`).classList.add('selected');
        this.$(`#arrow${prong}`).classList.add('visible');
        this.$(`#conclusion${prong}`).classList.add('visible');

        setTimeout(() => {
            this.$('#merge-arrow').classList.add('visible');
            this.$('#final-conclusion').classList.add('visible');

            this.$('#fork-result').innerHTML = `<strong style="color: #ef4444;">THE FORK!</strong> Whether you chose "${this.examples[this.currentExample][`premise${prong}`]}" or the opposite, the conclusion is the same!`;
        }, 500);
    }

    revealFork() {
        this.$$('.prong-arrow').forEach(a => a.classList.add('visible'));
        this.$$('.prong-conclusion').forEach(c => c.classList.add('visible'));
        this.$('#merge-arrow').classList.add('visible');
        this.$('#final-conclusion').classList.add('visible');

        this.$('#fork-result').innerHTML = `<strong style="color: #ef4444;">MORTON'S FORK REVEALED!</strong> Both contradictory premises lead to the exact same conclusion. There is no escape.`;
    }

    reset() {
        this.$$('.prong-premise').forEach(p => p.classList.remove('selected'));
        this.$$('.prong-arrow').forEach(a => a.classList.remove('visible'));
        this.$$('.prong-conclusion').forEach(c => c.classList.remove('visible'));
        this.$('#merge-arrow').classList.remove('visible');
        this.$('#final-conclusion').classList.remove('visible');
        this.$('#fork-result').textContent = 'Click on either premise to see how contradictory observations lead to the same conclusion.';
    }
}

customElements.define('morton-fork-simulator', MortonForkSimulator);

export { MortonForkSimulator };
