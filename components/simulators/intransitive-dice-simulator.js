/**
 * Intransitive Dice Simulator
 */
import { SimulatorBase } from '../simulator-base.js';

class IntransitiveDiceSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}
                .dice { display: flex; justify-content: center; gap: 2rem; margin: 1rem 0; }
                .die { background: var(--card); padding: 1rem; border-radius: 0.5rem; text-align: center; }
                .die-name { font-size: 1.5rem; font-weight: bold; margin-bottom: 0.5rem; }
                .matchup { background: var(--bg); padding: 1rem; border-radius: 0.5rem; margin: 0.5rem 0; text-align: center; }
            </style>
            <h4>Non-Transitive Dice</h4>
            <div class="dice">
                <div class="die" style="color: #ef4444;"><div class="die-name">A</div>2,2,4,4,9,9</div>
                <div class="die" style="color: #22c55e;"><div class="die-name">B</div>1,1,6,6,8,8</div>
                <div class="die" style="color: #3b82f6;"><div class="die-name">C</div>3,3,5,5,7,7</div>
            </div>
            <div class="controls">
                <button id="ab-btn">A vs B</button>
                <button id="bc-btn">B vs C</button>
                <button id="ca-btn">C vs A</button>
            </div>
            <div class="matchup" id="matchup"></div>
            <div class="result" id="result"><p>Which die is "best"? Try all matchups!</p></div>
            <div class="insight">A beats B, B beats C, but C beats A! Like rock-paper-scissors with dice. Let your opponent pick first and you can always find a better die. Invented by Bradley Efron.</div>
        `;
    }
    setupEventListeners() {
        this.$('#ab-btn').addEventListener('click', () => {
            this.$('#matchup').innerHTML = '<span style="color:#ef4444">A</span> vs <span style="color:#22c55e">B</span>: A wins 5/9 of the time';
            this.$('#result').innerHTML = '<p style="color: #ef4444;"><strong>A beats B</strong> (56%)</p>';
        });
        this.$('#bc-btn').addEventListener('click', () => {
            this.$('#matchup').innerHTML = '<span style="color:#22c55e">B</span> vs <span style="color:#3b82f6">C</span>: B wins 5/9 of the time';
            this.$('#result').innerHTML = '<p style="color: #22c55e;"><strong>B beats C</strong> (56%)</p>';
        });
        this.$('#ca-btn').addEventListener('click', () => {
            this.$('#matchup').innerHTML = '<span style="color:#3b82f6">C</span> vs <span style="color:#ef4444">A</span>: C wins 5/9 of the time';
            this.$('#result').innerHTML = '<p style="color: #3b82f6;"><strong>C beats A</strong> (56%) — THE CYCLE COMPLETES!</p>';
        });
    }
}
customElements.define('intransitive-dice-simulator', IntransitiveDiceSimulator);
export { IntransitiveDiceSimulator };
