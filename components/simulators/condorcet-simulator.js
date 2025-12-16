/**
 * Condorcet Paradox Simulator
 */
import { SimulatorBase } from '../simulator-base.js';

class CondorcetSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}
                .voters { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 1rem 0; }
                .voter { background: var(--card); padding: 1rem; border-radius: 0.5rem; }
                .cycle { text-align: center; font-size: 1.5rem; margin: 1rem 0; }
            </style>
            <h4>Cyclic Majority Preferences</h4>
            <div class="voters">
                <div class="voter"><strong>Voter 1:</strong><br>A > B > C</div>
                <div class="voter"><strong>Voter 2:</strong><br>B > C > A</div>
                <div class="voter"><strong>Voter 3:</strong><br>C > A > B</div>
            </div>
            <div class="controls">
                <button id="pairwise-btn">Pairwise Majorities</button>
            </div>
            <div class="cycle" id="cycle"></div>
            <div class="result" id="result"><p>Each voter has consistent preferences. What does the group prefer?</p></div>
            <div class="insight">Condorcet (1785) showed democratic majorities can be irrational even when all individuals are rational. There is no "will of the people" - just conflicting individual wills aggregated imperfectly.</div>
        `;
    }
    setupEventListeners() {
        this.$('#pairwise-btn').addEventListener('click', () => {
            this.$('#cycle').innerHTML = 'A beats B (2-1) → B beats C (2-1) → C beats A (2-1) → ???';
            this.$('#result').innerHTML = `<p><strong>A vs B:</strong> Voters 1,3 prefer A. Majority: A wins.</p><p><strong>B vs C:</strong> Voters 1,2 prefer B. Majority: B wins.</p><p><strong>C vs A:</strong> Voters 2,3 prefer C. Majority: C wins.</p><p style="color:#ef4444">A>B>C>A — A CYCLE! No Condorcet winner exists.</p>`;
        });
    }
}
customElements.define('condorcet-simulator', CondorcetSimulator);
export { CondorcetSimulator };
