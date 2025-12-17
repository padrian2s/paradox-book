import { SimulatorBase } from '../simulator-base.js';

class KavkaToxinSimulator extends SimulatorBase {
    constructor() {
        super();
        this.state = {
            phase: 'offer',
            intendsToDrink: null,
            actuallyDrank: null
        };
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .scenario-box {
                    background: var(--bg, #0f172a);
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    margin: 1rem 0;
                }

                .phase-indicator {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 1rem;
                }

                .phase {
                    padding: 0.5rem 1rem;
                    border-radius: 0.25rem;
                    font-size: 0.75rem;
                    background: var(--card, #1e293b);
                    opacity: 0.5;
                    flex: 1;
                    text-align: center;
                    margin: 0 0.25rem;
                }

                .phase.active {
                    opacity: 1;
                    border-bottom: 3px solid var(--primary, #6366f1);
                    font-weight: bold;
                }

                .toxin-display {
                    text-align: center;
                    padding: 2rem;
                }

                .toxin-icon {
                    font-size: 4rem;
                }

                .money-display {
                    font-size: 2rem;
                    color: #22c55e;
                    margin: 1rem 0;
                }

                .thought-bubble {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 1rem;
                    margin: 1rem auto;
                    max-width: 400px;
                    position: relative;
                    font-style: italic;
                }

                .thought-bubble:before {
                    content: '"';
                    font-size: 3rem;
                    position: absolute;
                    left: 10px;
                    top: -10px;
                    color: var(--muted, #94a3b8);
                }

                .choice-buttons {
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                    margin-top: 1rem;
                }

                .choice-btn {
                    padding: 1rem 2rem;
                    font-size: 1rem;
                }

                .choice-btn.drink {
                    background: #ef4444;
                }

                .choice-btn.dont-drink {
                    background: #22c55e;
                }

                @media (max-width: 768px) {
                    .choice-buttons {
                        flex-direction: column;
                    }
                }
            </style>

            <h4>Kavka's Toxin Puzzle</h4>

            <div class="scenario-box">
                <div class="phase-indicator">
                    <div class="phase active" id="phase-offer">1. The Offer</div>
                    <div class="phase" id="phase-midnight">2. Midnight</div>
                    <div class="phase" id="phase-morning">3. Next Morning</div>
                </div>

                <div class="toxin-display" id="display">
                    <div class="toxin-icon">&#129514;</div>
                    <div class="money-display">$1,000,000</div>
                    <p><strong>The Deal:</strong></p>
                    <p>A billionaire offers you $1 million if, at midnight tonight, you INTEND to drink this toxin tomorrow.</p>
                    <p>The toxin will make you sick for a day but cause no permanent harm.</p>
                    <p><em>You don't have to actually drink it - you just have to genuinely intend to at midnight.</em></p>
                </div>

                <div class="thought-bubble" id="thought">
                    Can I form a genuine intention to drink, knowing I don't have to follow through?
                </div>

                <div class="controls choice-buttons" id="choices">
                    <button class="choice-btn" id="try-intend-btn">Try to Intend</button>
                    <button class="choice-btn" id="analyze-btn">Analyze the Puzzle</button>
                </div>
            </div>

            <div class="result">
                <p id="result-text">This puzzle challenges our understanding of intention, rationality, and free will.</p>
            </div>

            <div class="insight">
                Gregory Kavka (1983): Can you intend to do something you know you won't do? If intentions require belief in action, and rational agents won't drink, then rational agents cannot form the intention - and cannot get the money!
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#try-intend-btn').addEventListener('click', () => this.tryToIntend());
        this.$('#analyze-btn').addEventListener('click', () => this.analyze());
    }

    setPhase(phase) {
        this.$$('.phase').forEach(p => p.classList.remove('active'));
        this.$(`#phase-${phase}`).classList.add('active');
    }

    tryToIntend() {
        this.setPhase('midnight');

        this.$('#display').innerHTML = `
            <div class="toxin-icon">&#128336;</div>
            <p><strong>Midnight arrives...</strong></p>
            <p>The billionaire's mind-reading device scans your intentions.</p>
        `;

        this.$('#thought').textContent = 'I intend to drink... but wait, I know I won\'t actually drink it tomorrow. Is this really an intention?';

        this.$('#choices').innerHTML = `
            <button class="choice-btn" id="genuine-btn">I genuinely intend to drink</button>
            <button class="choice-btn" id="fake-btn">I'm just pretending</button>
        `;

        this.$('#genuine-btn').addEventListener('click', () => this.genuineIntent());
        this.$('#fake-btn').addEventListener('click', () => this.fakeIntent());

        this.$('#result-text').textContent = 'At midnight, do you genuinely intend to drink? Remember: the money is already yours if you intend. You don\'t have to actually drink.';
    }

    genuineIntent() {
        this.setPhase('morning');

        this.$('#display').innerHTML = `
            <div class="toxin-icon">&#127749;</div>
            <div class="money-display">$1,000,000 received!</div>
            <p>It's morning. The money is in your account.</p>
            <p>Now... will you actually drink the toxin?</p>
        `;

        this.$('#thought').textContent = 'I have the money. There\'s absolutely no reason to drink now...';

        this.$('#choices').innerHTML = `
            <button class="choice-btn drink" id="drink-btn">Drink Anyway</button>
            <button class="choice-btn dont-drink" id="dont-drink-btn">Don't Drink</button>
        `;

        this.$('#drink-btn').addEventListener('click', () => this.drink());
        this.$('#dont-drink-btn').addEventListener('click', () => this.dontDrink());
    }

    fakeIntent() {
        this.$('#display').innerHTML = `
            <div class="toxin-icon">&#10060;</div>
            <div class="money-display" style="color: #ef4444;">$0</div>
            <p>The mind-reading device detects your insincerity.</p>
            <p>No genuine intention = No money.</p>
        `;

        this.$('#thought').textContent = 'I couldn\'t fool the machine. But could I have fooled myself?';
        this.$('#choices').innerHTML = '<button id="reset-btn">Try Again</button>';
        this.$('#reset-btn').addEventListener('click', () => location.reload());

        this.$('#result-text').innerHTML = `
            <span style="color: #ef4444;">You failed to form a genuine intention.</span><br>
            Knowing you wouldn't drink made it impossible to truly intend to drink.
        `;
    }

    drink() {
        this.$('#display').innerHTML = `
            <div class="toxin-icon">&#129326;</div>
            <div class="money-display">$1,000,000 + sick for a day</div>
            <p>You drank it! But... why?</p>
        `;

        this.$('#thought').textContent = 'I proved my intention was genuine by following through. But was that rational?';
        this.$('#choices').innerHTML = '<button id="reset-btn">Reset</button>';
        this.$('#reset-btn').addEventListener('click', () => location.reload());

        this.$('#result-text').innerHTML = `
            <span style="color: var(--accent);">You drank the toxin!</span><br>
            This made your intention "genuine" - but was it <em>rational</em> to drink when there was no benefit to doing so?
            Some argue only this approach allows genuine intention.
        `;
    }

    dontDrink() {
        this.$('#display').innerHTML = `
            <div class="toxin-icon">&#129321;</div>
            <div class="money-display">$1,000,000 (kept!)</div>
            <p>You didn't drink. You're healthy AND rich!</p>
        `;

        this.$('#thought').textContent = 'But if I always knew I wouldn\'t drink... was my "intention" ever real?';
        this.$('#choices').innerHTML = '<button id="reset-btn">Reset</button>';
        this.$('#reset-btn').addEventListener('click', () => location.reload());

        this.$('#result-text').innerHTML = `
            <span style="color: #22c55e;">THE PARADOX:</span><br>
            If you knew you'd never drink, how could your intention have been genuine?<br>
            Yet the machine accepted it. Does this mean intentions aren't about future actions?
        `;
    }

    analyze() {
        this.$('#display').innerHTML = `
            <div class="toxin-icon">&#129504;</div>
            <p><strong>The Deep Problem:</strong></p>
        `;

        this.$('#thought').innerHTML = `
            <strong>The paradox reveals a tension:</strong><br><br>
            1. Intentions seem to require believing you'll do the thing<br>
            2. Rational agents won't drink (no benefit)<br>
            3. So rational agents can't believe they'll drink<br>
            4. So rational agents can't genuinely intend to drink<br>
            5. So rational agents can't get the money!<br><br>
            <span style="color: var(--accent);">Rationality prevents you from getting the money that rationality says you should want!</span>
        `;

        this.$('#choices').innerHTML = '<button id="reset-btn">Start Scenario</button>';
        this.$('#reset-btn').addEventListener('click', () => location.reload());

        this.$('#result-text').innerHTML = `
            This puzzle suggests that <strong>pure rationality has limitations</strong>.<br>
            Sometimes being "rationally irrational" (committing to drink) pays off -
            but can a truly rational agent make such commitments?
        `;
    }
}

customElements.define('kavka-toxin-simulator', KavkaToxinSimulator);

export { KavkaToxinSimulator };
