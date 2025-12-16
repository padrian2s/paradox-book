/**
 * Prisoner's Dilemma Simulator
 */
import { SimulatorBase } from '../simulator-base.js';

class PrisonerDilemmaSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}
                .matrix { display: grid; grid-template-columns: auto 1fr 1fr; gap: 2px; margin: 1rem 0; background: var(--muted); }
                .cell { background: var(--card); padding: 0.75rem; text-align: center; }
                .cell.header { background: var(--bg); font-weight: bold; }
                .cell.highlight { background: rgba(239, 68, 68, 0.3); }
            </style>
            <h4>Payoff Matrix (Years in Prison)</h4>
            <div class="matrix" id="matrix">
                <div class="cell header"></div><div class="cell header">B: Silent</div><div class="cell header">B: Confess</div>
                <div class="cell header">A: Silent</div><div class="cell">A:1, B:1</div><div class="cell">A:10, B:0</div>
                <div class="cell header">A: Confess</div><div class="cell">A:0, B:10</div><div class="cell highlight">A:5, B:5</div>
            </div>
            <div class="controls">
                <button id="rational-btn">Rational Analysis</button>
                <button id="paradox-btn">The Paradox</button>
            </div>
            <div class="result" id="result"><p>Two prisoners can't communicate. Each must choose: stay silent or confess?</p></div>
            <div class="insight">The prisoner's dilemma models situations where individual rationality leads to collective harm: arms races, climate change, resource depletion. Cooperation requires overcoming the temptation to defect!</div>
        `;
    }
    setupEventListeners() {
        this.$('#rational-btn').addEventListener('click', () => {
            this.$('#result').innerHTML = `<p><strong>A's reasoning:</strong></p><p>If B stays silent: I get 0 (confess) vs 1 (silent) → Confess better</p><p>If B confesses: I get 5 (confess) vs 10 (silent) → Confess better</p><p style="color:var(--accent)">Confessing is ALWAYS better regardless of B's choice!</p><p>B reasons identically. Both confess.</p>`;
        });
        this.$('#paradox-btn').addEventListener('click', () => {
            this.$('#result').innerHTML = `<p style="color:#ef4444"><strong>The Paradox:</strong></p><p>Both confess → Both get 5 years</p><p>Both silent → Both get 1 year</p><p>Rational individual choices (confess, confess) produce WORSE outcome than "irrational" cooperation (silent, silent)!</p><p>Individual rationality ≠ Collective rationality</p>`;
        });
    }
}
customElements.define('prisoner-dilemma-simulator', PrisonerDilemmaSimulator);
export { PrisonerDilemmaSimulator };
