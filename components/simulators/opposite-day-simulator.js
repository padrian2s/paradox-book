/**
 * Opposite Day Paradox Simulator
 * "It is opposite day today"
 */
import { SimulatorBase } from '../simulator-base.js';

class OppositeDaySimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .day-display {
                    background: var(--bg, #0f172a);
                    padding: 2rem;
                    border-radius: 0.5rem;
                    text-align: center;
                    margin: 1rem 0;
                }

                .day-type {
                    font-size: 2rem;
                    font-weight: bold;
                    margin-bottom: 1rem;
                }

                .day-type.normal {
                    color: #22c55e;
                }

                .day-type.opposite {
                    color: var(--accent, #f59e0b);
                }

                .day-type.paradox {
                    color: #ef4444;
                }

                .statement {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    font-size: 1.2rem;
                    margin: 1rem 0;
                }

                .logic-chain {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    margin: 1rem 0;
                }

                .logic-step {
                    background: var(--card, #1e293b);
                    padding: 0.75rem;
                    border-radius: 0.5rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .logic-step.flip {
                    background: rgba(245, 158, 11, 0.2);
                    border-left: 3px solid var(--accent);
                }

                .logic-step.contradiction {
                    background: rgba(239, 68, 68, 0.2);
                    border-left: 3px solid #ef4444;
                }

                @media (max-width: 600px) {
                    .controls {
                        flex-direction: column;
                    }
                }
            </style>

            <h4>Opposite Day Declaration</h4>

            <div class="day-display">
                <div class="day-type" id="day-type">???</div>
                <div class="statement" id="statement">"It is opposite day today."</div>
            </div>

            <div class="controls">
                <button id="true-btn">Statement is TRUE</button>
                <button id="false-btn">Statement is FALSE</button>
                <button id="meta-btn">Meta Analysis</button>
            </div>

            <div class="logic-chain" id="logic"></div>

            <div class="result" id="result">
                <p>On opposite day, everything means its opposite. But what about the declaration itself?</p>
            </div>

            <div class="insight">
                The Opposite Day paradox is a playful version of the Liar's paradox. If it's opposite day, statements mean their opposite - so "it's opposite day" would mean "it's NOT opposite day." The self-referential nature creates the paradox!
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#true-btn').addEventListener('click', () => this.analyze('true'));
        this.$('#false-btn').addEventListener('click', () => this.analyze('false'));
        this.$('#meta-btn').addEventListener('click', () => this.analyze('meta'));
    }

    analyze(mode) {
        const dayType = this.$('#day-type');
        const logic = this.$('#logic');
        const result = this.$('#result');

        if (mode === 'true') {
            dayType.className = 'day-type opposite';
            dayType.textContent = 'OPPOSITE DAY';

            logic.innerHTML = `
                <div class="logic-step">1. Assume "It is opposite day" is TRUE</div>
                <div class="logic-step">2. So it IS opposite day right now</div>
                <div class="logic-step flip">3. On opposite day, statements mean their opposite</div>
                <div class="logic-step flip">4. So "It is opposite day" MEANS "It is NOT opposite day"</div>
                <div class="logic-step contradiction">5. So it's actually NOT opposite day!</div>
                <div class="logic-step contradiction">6. CONTRADICTION with assumption!</div>
            `;

            result.innerHTML = `
                <p style="color: #ef4444;"><strong>Paradox!</strong></p>
                <p>If it's opposite day, then the statement "it's opposite day" means the opposite, so it's NOT opposite day.</p>
            `;
        } else if (mode === 'false') {
            dayType.className = 'day-type normal';
            dayType.textContent = 'NORMAL DAY';

            logic.innerHTML = `
                <div class="logic-step">1. Assume "It is opposite day" is FALSE</div>
                <div class="logic-step">2. So it's a normal day</div>
                <div class="logic-step">3. On normal days, statements mean what they say</div>
                <div class="logic-step">4. The statement says "It is opposite day"</div>
                <div class="logic-step">5. We said it's false, so it's NOT opposite day</div>
                <div class="logic-step" style="color: #22c55e;">6. CONSISTENT! No paradox here.</div>
            `;

            result.innerHTML = `
                <p style="color: #22c55e;"><strong>No paradox!</strong></p>
                <p>If the statement is simply false, we have a normal day where someone incorrectly claimed it was opposite day. Perfectly consistent!</p>
            `;
        } else {
            dayType.className = 'day-type paradox';
            dayType.textContent = 'UNDECIDABLE';

            logic.innerHTML = `
                <div class="logic-step">The paradox arises from DECLARING opposite day</div>
                <div class="logic-step flip">If declared truly on its face, the rule inverts the declaration</div>
                <div class="logic-step">Solution 1: The declaration is exempt from inversion</div>
                <div class="logic-step">Solution 2: Opposite day can never be declared, only known</div>
                <div class="logic-step">Solution 3: It's a performative contradiction</div>
            `;

            result.innerHTML = `
                <p><strong>The Meta-Problem:</strong></p>
                <p>Opposite day works fine for EVERYTHING ELSE - just not for declaring opposite day itself.</p>
                <p>Like the Liar's Paradox, the problem is self-reference. The rule about opposites applies to its own declaration.</p>
                <p>Real "opposite day" games solve this by having an external authority declare it, not a self-referential statement.</p>
            `;
        }
    }
}

customElements.define('opposite-day-simulator', OppositeDaySimulator);

export { OppositeDaySimulator };
