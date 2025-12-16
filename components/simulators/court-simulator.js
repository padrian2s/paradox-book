/**
 * Paradox of the Court Simulator
 * Law student agrees to pay teacher after winning first case
 */
import { SimulatorBase } from '../simulator-base.js';

class CourtSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .courtroom {
                    background: var(--bg, #0f172a);
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    margin: 1rem 0;
                }

                .parties {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                    margin-bottom: 1rem;
                }

                .party {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .party h5 {
                    color: var(--accent, #f59e0b);
                    margin-bottom: 0.5rem;
                }

                .agreement {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    border-left: 4px solid var(--primary, #6366f1);
                }

                .outcome-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                    margin: 1rem 0;
                }

                .outcome {
                    padding: 1rem;
                    border-radius: 0.5rem;
                    background: var(--card, #1e293b);
                }

                .outcome h5 {
                    margin-bottom: 0.5rem;
                }

                .outcome.teacher {
                    border: 2px solid #3b82f6;
                }

                .outcome.student {
                    border: 2px solid #22c55e;
                }

                .reasoning {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.5rem;
                }

                .paradox-highlight {
                    color: #ef4444;
                    font-weight: bold;
                }

                @media (max-width: 600px) {
                    .parties, .outcome-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>The Court Case</h4>

            <div class="courtroom">
                <div class="parties">
                    <div class="party">
                        <h5>Protagoras (Teacher)</h5>
                        <p>Suing for payment</p>
                    </div>
                    <div class="party">
                        <h5>Euathlus (Student)</h5>
                        <p>Has not yet won a case</p>
                    </div>
                </div>
                <div class="agreement">
                    <strong>The Agreement:</strong> Student pays teacher's fee AFTER (and only after) winning his first court case.
                </div>
            </div>

            <h4>The Arguments</h4>

            <div class="outcome-grid">
                <div class="outcome teacher">
                    <h5>Teacher's Argument:</h5>
                    <p>"If I win this case, Euathlus must pay by court order."</p>
                    <p>"If I lose, Euathlus has won his first case, so he must pay by our contract!"</p>
                    <p class="reasoning">Either way, I get paid!</p>
                </div>
                <div class="outcome student">
                    <h5>Student's Argument:</h5>
                    <p>"If I win this case, the court says I don't have to pay."</p>
                    <p>"If I lose, I still haven't won my first case, so by contract, I don't pay!"</p>
                    <p class="reasoning">Either way, I don't pay!</p>
                </div>
            </div>

            <div class="controls">
                <button id="teacher-wins-btn">Teacher Wins</button>
                <button id="student-wins-btn">Student Wins</button>
            </div>

            <div class="result" id="result">
                <p>Both arguments seem valid, but they lead to opposite conclusions!</p>
            </div>

            <div class="insight">
                This ancient paradox (Protagoras vs Euathlus) shows a conflict between legal judgment and contractual obligation. It asks: which takes precedence - a court ruling or a prior agreement? The paradox arises because the court case itself changes the conditions of the contract.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#teacher-wins-btn').addEventListener('click', () => this.showOutcome('teacher'));
        this.$('#student-wins-btn').addEventListener('click', () => this.showOutcome('student'));
    }

    showOutcome(winner) {
        const result = this.$('#result');

        if (winner === 'teacher') {
            result.innerHTML = `
                <h5>Court Rules: Teacher Wins</h5>
                <p><strong>Immediate effect:</strong> Student must pay (by court order).</p>
                <p><strong>But wait...</strong> The student has NOT won his first case!</p>
                <p><strong>By contract:</strong> He only pays AFTER winning his first case.</p>
                <p class="paradox-highlight">CONFLICT: Court says pay now. Contract says pay only after winning.</p>
                <p style="margin-top: 1rem;">Teacher is happy with court ruling, but student can argue contract isn't triggered yet.</p>
            `;
        } else {
            result.innerHTML = `
                <h5>Court Rules: Student Wins</h5>
                <p><strong>Immediate effect:</strong> Student doesn't pay (by court order).</p>
                <p><strong>But wait...</strong> The student has now WON his first case!</p>
                <p><strong>By contract:</strong> He must pay after winning his first case.</p>
                <p class="paradox-highlight">CONFLICT: Court says don't pay. Contract says pay now.</p>
                <p style="margin-top: 1rem;">Student is happy with court ruling, but teacher can argue contract is now triggered.</p>
            `;
        }
    }
}

customElements.define('court-simulator', CourtSimulator);

export { CourtSimulator };
