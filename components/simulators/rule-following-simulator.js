import { SimulatorBase } from '../simulator-base.js';

class RuleFollowingSimulator extends SimulatorBase {
    constructor() {
        super();
        this.sequence = [2, 4, 6, 8];
        this.interpretations = [
            { name: 'Add 2', rule: (n, i) => 2 + (i * 2), next: () => this.sequence[this.sequence.length - 1] + 2 },
            { name: 'Even numbers', rule: (n, i) => (i + 1) * 2, next: () => this.sequence[this.sequence.length - 1] + 2 },
            { name: 'Add 2 until 10, then add 4', rule: (n, i) => i < 4 ? 2 + (i * 2) : 10 + ((i - 4) * 4), next: () => this.sequence.length < 5 ? this.sequence[this.sequence.length - 1] + 2 : this.sequence[this.sequence.length - 1] + 4 },
            { name: 'Powers pattern', rule: (n, i) => i < 4 ? 2 + (i * 2) : Math.pow(2, i - 2), next: () => this.sequence.length < 5 ? this.sequence[this.sequence.length - 1] + 2 : Math.pow(2, this.sequence.length - 2) }
        ];
        this.currentInterpretation = 0;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .rule-viz {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .sequence-display {
                    display: flex;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                    margin-bottom: 1rem;
                }

                .seq-number {
                    width: 50px;
                    height: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    font-size: 1.25rem;
                    font-weight: bold;
                    color: var(--primary, #6366f1);
                }

                .seq-number.predicted {
                    background: rgba(99, 102, 241, 0.3);
                    border: 2px dashed var(--primary, #6366f1);
                }

                .interpretation-list {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    margin-top: 1rem;
                }

                .interpretation {
                    padding: 0.75rem 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.25rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    cursor: pointer;
                    transition: all 0.3s;
                    border-left: 4px solid transparent;
                }

                .interpretation:hover {
                    background: rgba(99, 102, 241, 0.2);
                }

                .interpretation.active {
                    border-left-color: var(--primary, #6366f1);
                    background: rgba(99, 102, 241, 0.2);
                }

                .interpretation-name {
                    font-weight: bold;
                }

                .interpretation-prediction {
                    color: var(--accent, #f59e0b);
                    font-size: 0.875rem;
                }

                .question-mark {
                    font-size: 2rem;
                    color: var(--accent, #f59e0b);
                    text-align: center;
                    padding: 1rem;
                }

                @media (max-width: 600px) {
                    .seq-number {
                        width: 40px;
                        height: 40px;
                        font-size: 1rem;
                    }
                }
            </style>

            <h4>The Sequence: What Comes Next?</h4>

            <div class="rule-viz">
                <div class="sequence-display" id="sequence-display">
                    <div class="seq-number">2</div>
                    <div class="seq-number">4</div>
                    <div class="seq-number">6</div>
                    <div class="seq-number">8</div>
                    <div class="seq-number predicted" id="next-number">?</div>
                </div>

                <p>Multiple rules fit the same data perfectly:</p>

                <div class="interpretation-list" id="interpretations">
                </div>
            </div>

            <div class="controls" style="margin-top: 1rem;">
                <button id="extend-btn">Extend Sequence</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="result">
                <p id="rule-result">Click on different interpretations to see how the same sequence can follow completely different rules. Each rule perfectly explains the existing data!</p>
            </div>

            <div class="insight">
                Wittgenstein's point: No finite set of examples can uniquely determine a rule. Any sequence is compatible with infinitely many rules. So how do we ever "follow" rules correctly?
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#extend-btn').addEventListener('click', () => this.extendSequence());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
        this.renderInterpretations();
    }

    renderInterpretations() {
        const container = this.$('#interpretations');
        container.innerHTML = this.interpretations.map((interp, i) => `
            <div class="interpretation${i === this.currentInterpretation ? ' active' : ''}" data-index="${i}">
                <span class="interpretation-name">${interp.name}</span>
                <span class="interpretation-prediction">Next: ${interp.next()}</span>
            </div>
        `).join('');

        container.querySelectorAll('.interpretation').forEach(el => {
            el.addEventListener('click', () => this.selectInterpretation(parseInt(el.dataset.index)));
        });

        this.updatePrediction();
    }

    selectInterpretation(index) {
        this.currentInterpretation = index;
        this.$$('.interpretation').forEach((el, i) => {
            el.classList.toggle('active', i === index);
        });
        this.updatePrediction();

        const interp = this.interpretations[index];
        this.$('#rule-result').innerHTML = `<strong>Rule: "${interp.name}"</strong><br>This rule fits all existing numbers perfectly. But if extended, different rules predict different next values!`;
    }

    updatePrediction() {
        const interp = this.interpretations[this.currentInterpretation];
        this.$('#next-number').textContent = interp.next();
    }

    extendSequence() {
        const interp = this.interpretations[this.currentInterpretation];
        const nextVal = interp.next();
        this.sequence.push(nextVal);

        const display = this.$('#sequence-display');
        const newNum = document.createElement('div');
        newNum.className = 'seq-number';
        newNum.textContent = nextVal;
        display.insertBefore(newNum, this.$('#next-number'));

        this.interpretations.forEach(i => {
            i.next = () => {
                if (i.name === 'Add 2') return this.sequence[this.sequence.length - 1] + 2;
                if (i.name === 'Even numbers') return (this.sequence.length + 1) * 2;
                if (i.name === 'Add 2 until 10, then add 4') return this.sequence.length < 5 ? this.sequence[this.sequence.length - 1] + 2 : this.sequence[this.sequence.length - 1] + 4;
                if (i.name === 'Powers pattern') return this.sequence.length < 5 ? this.sequence[this.sequence.length - 1] + 2 : Math.pow(2, this.sequence.length - 2);
                return this.sequence[this.sequence.length - 1] + 2;
            };
        });

        this.renderInterpretations();

        if (this.sequence.length >= 5) {
            this.$('#rule-result').innerHTML = `<strong style="color: #ef4444;">THE PARADOX!</strong> Different rules now predict different futures. Which rule were you "really" following? The past data cannot tell us!`;
        }
    }

    reset() {
        this.sequence = [2, 4, 6, 8];
        this.currentInterpretation = 0;

        const display = this.$('#sequence-display');
        display.innerHTML = `
            <div class="seq-number">2</div>
            <div class="seq-number">4</div>
            <div class="seq-number">6</div>
            <div class="seq-number">8</div>
            <div class="seq-number predicted" id="next-number">?</div>
        `;

        this.interpretations = [
            { name: 'Add 2', rule: (n, i) => 2 + (i * 2), next: () => this.sequence[this.sequence.length - 1] + 2 },
            { name: 'Even numbers', rule: (n, i) => (i + 1) * 2, next: () => this.sequence[this.sequence.length - 1] + 2 },
            { name: 'Add 2 until 10, then add 4', rule: (n, i) => i < 4 ? 2 + (i * 2) : 10 + ((i - 4) * 4), next: () => this.sequence.length < 5 ? this.sequence[this.sequence.length - 1] + 2 : this.sequence[this.sequence.length - 1] + 4 },
            { name: 'Powers pattern', rule: (n, i) => i < 4 ? 2 + (i * 2) : Math.pow(2, i - 2), next: () => this.sequence.length < 5 ? this.sequence[this.sequence.length - 1] + 2 : Math.pow(2, this.sequence.length - 2) }
        ];

        this.renderInterpretations();
        this.$('#rule-result').textContent = 'Click on different interpretations to see how the same sequence can follow completely different rules. Each rule perfectly explains the existing data!';
    }
}

customElements.define('rule-following-simulator', RuleFollowingSimulator);

export { RuleFollowingSimulator };
