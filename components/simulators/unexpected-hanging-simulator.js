/**
 * Unexpected Hanging Paradox Simulator
 * A judge says you'll be hanged one day next week, and it will be a surprise
 */
import { SimulatorBase } from '../simulator-base.js';

class UnexpectedHangingSimulator extends SimulatorBase {
    constructor() {
        super();
        this.step = 0;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .days-container {
                    display: flex;
                    gap: 0.5rem;
                    justify-content: center;
                    margin: 1.5rem 0;
                    flex-wrap: wrap;
                }

                .day-box {
                    padding: 0.75rem 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    text-align: center;
                    min-width: 60px;
                    transition: all 0.3s;
                }

                .day-box.eliminated {
                    text-decoration: line-through;
                    opacity: 0.3;
                    background: #1f2937;
                }

                .day-box.current {
                    border: 2px solid var(--primary, #6366f1);
                    box-shadow: 0 0 10px rgba(99, 102, 241, 0.3);
                }

                .day-box.surprise {
                    border: 2px solid #ef4444;
                    background: rgba(239, 68, 68, 0.2);
                    animation: pulse 1s infinite;
                }

                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }

                .reasoning-box {
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    padding: 1rem;
                    margin: 1rem 0;
                    min-height: 60px;
                }

                .step-counter {
                    color: var(--muted, #94a3b8);
                    font-size: 0.875rem;
                    margin-bottom: 0.5rem;
                }
            </style>

            <h4>Prisoner's Reasoning Chain</h4>

            <div class="controls">
                <button id="reason-btn">Follow the Logic</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="days-container" id="days">
                <div class="day-box" data-day="0">Mon</div>
                <div class="day-box" data-day="1">Tue</div>
                <div class="day-box" data-day="2">Wed</div>
                <div class="day-box" data-day="3">Thu</div>
                <div class="day-box" data-day="4">Fri</div>
            </div>

            <div class="reasoning-box" id="reasoning">
                <div class="step-counter" id="step-counter">Step 0 of 6</div>
                <p id="reasoning-text">The judge says: "You will be hanged one day next week, and you won't know which day until the morning of."</p>
            </div>

            <div class="result" id="result">
                <p>Can Friday be the day? Can Thursday? Follow the prisoner's logic...</p>
            </div>

            <div class="insight">
                The prisoner reasons he can't be surprised, so he relaxes. Then Wednesday morning... SURPRISE! The paradox resolves itself.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#reason-btn').addEventListener('click', () => this.nextStep());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
    }

    nextStep() {
        this.step++;
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
        const dayBoxes = this.$$('.day-box');

        this.$('#step-counter').textContent = `Step ${this.step} of 6`;

        if (this.step === 1) {
            dayBoxes[4].classList.add('current');
            this.$('#reasoning-text').textContent =
                "Can it be Friday? If I survive until Thursday night, I'll KNOW it's Friday. That's not a surprise!";
        } else if (this.step === 2) {
            dayBoxes[4].classList.remove('current');
            dayBoxes[4].classList.add('eliminated');
            dayBoxes[3].classList.add('current');
            this.$('#reasoning-text').textContent =
                "Friday is eliminated. Can it be Thursday? If I survive until Wednesday night, Friday is ruled out, so I'll KNOW it's Thursday!";
        } else if (this.step === 3) {
            dayBoxes[3].classList.remove('current');
            dayBoxes[3].classList.add('eliminated');
            dayBoxes[2].classList.add('current');
            this.$('#reasoning-text').textContent =
                "Thursday is eliminated too. By the same logic, Wednesday is predictable if I reach Tuesday night...";
        } else if (this.step === 4) {
            dayBoxes[2].classList.remove('current');
            dayBoxes[2].classList.add('eliminated');
            dayBoxes[1].classList.add('eliminated');
            dayBoxes[0].classList.add('eliminated');
            this.$('#reasoning-text').textContent =
                "Continuing this reasoning: every day gets eliminated! The prisoner concludes: 'I can't be hanged because it can never be a surprise!'";
            this.$('#result').innerHTML = `
                <p style="color: var(--primary);">The prisoner goes to sleep Sunday night, certain he won't be hanged...</p>
            `;
        } else if (this.step === 5) {
            dayBoxes.forEach(box => box.classList.remove('eliminated', 'current'));
            dayBoxes[2].classList.add('surprise');
            this.$('#reasoning-text').textContent =
                "Wednesday morning: KNOCK KNOCK. 'Time for your hanging!' The prisoner is COMPLETELY SURPRISED!";
            this.$('#result').innerHTML = `
                <p style="color: #ef4444;"><strong>SURPRISE!</strong> The judge was right all along!</p>
                <p>The prisoner's "proof" that he couldn't be surprised was flawed - it assumed he could trust his own reasoning about the situation.</p>
            `;
        } else if (this.step >= 6) {
            this.$('#reasoning-text').textContent =
                "The paradox: by proving he couldn't be surprised, the prisoner created the conditions for being surprised. Self-defeating logic!";
            this.$('#result').innerHTML = `
                <p style="color: var(--accent);"><strong>The Meta-Paradox:</strong></p>
                <p>If the prisoner accepts he can be surprised, he can't be. If he concludes he can't be surprised, he can be!</p>
            `;
        }
    }

    reset() {
        this.step = 0;
        const dayBoxes = this.$$('.day-box');
        dayBoxes.forEach(box => box.classList.remove('eliminated', 'current', 'surprise'));

        this.$('#step-counter').textContent = 'Step 0 of 6';
        this.$('#reasoning-text').textContent =
            "The judge says: \"You will be hanged one day next week, and you won't know which day until the morning of.\"";
        this.$('#result').innerHTML = `
            <p>Can Friday be the day? Can Thursday? Follow the prisoner's logic...</p>
        `;
    }
}

customElements.define('unexpected-hanging-simulator', UnexpectedHangingSimulator);

export { UnexpectedHangingSimulator };
