/**
 * Drinker Paradox Simulator
 * "There is someone in the pub such that if they are drinking, everyone is drinking"
 */
import { SimulatorBase } from '../simulator-base.js';

class DrinkerSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .stat-box {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .stat-value {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                }

                .stat-label {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                }

                .scene-display {
                    font-size: 2rem;
                    text-align: center;
                    margin: 1rem 0;
                    padding: 1rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                }

                @media (max-width: 600px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }
                    .controls {
                        flex-direction: column;
                    }
                }
            </style>

            <h4>Pub Logic</h4>

            <div class="controls">
                <button id="all-btn">Everyone Drinking</button>
                <button id="some-btn">Some Drinking</button>
                <button id="none-btn">Nobody Drinking</button>
                <button id="empty-btn">Empty Pub</button>
            </div>

            <div class="scene-display" id="scene">Choose a scenario...</div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="person">-</div>
                    <div class="stat-label">The Person</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="logic">-</div>
                    <div class="stat-label">Logic</div>
                </div>
            </div>

            <div class="result" id="result">
                <p>Choose a scenario to find "the person"...</p>
            </div>

            <div class="insight">
                The statement is ALWAYS true! It's a tautology. The trick is: "If P then Q" is true whenever P is false (vacuous truth). Pick any non-drinker: "If they drink, everyone drinks" is vacuously true because they DON'T drink!
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#all-btn').addEventListener('click', () => this.setScenario('all'));
        this.$('#some-btn').addEventListener('click', () => this.setScenario('some'));
        this.$('#none-btn').addEventListener('click', () => this.setScenario('none'));
        this.$('#empty-btn').addEventListener('click', () => this.setScenario('empty'));
    }

    setScenario(scenario) {
        const sceneEl = this.$('#scene');
        const personEl = this.$('#person');
        const logicEl = this.$('#logic');

        switch(scenario) {
            case 'all':
                sceneEl.textContent = 'drinking drinking drinking drinking drinking';
                personEl.textContent = 'Anyone';
                logicEl.textContent = 'Direct';
                this.$('#result').innerHTML = `
                    <p><strong>Everyone is drinking.</strong></p>
                    <p>Pick anyone: "If Alice is drinking, everyone is drinking."</p>
                    <p>Alice IS drinking, and everyone IS drinking. True!</p>
                    <p style="color: var(--accent);">The statement holds trivially.</p>
                `;
                break;
            case 'some':
                sceneEl.textContent = 'drinking drinking person drinking person';
                personEl.textContent = 'Non-drinker';
                logicEl.textContent = 'Vacuous';
                this.$('#result').innerHTML = `
                    <p><strong>Some drinking, some not.</strong></p>
                    <p style="color: var(--accent);">THE PARADOX in action!</p>
                    <p>Pick Bob who is NOT drinking.</p>
                    <p>"If Bob is drinking, everyone is drinking."</p>
                    <p>Bob is NOT drinking, so the "if" clause is FALSE.</p>
                    <p>"False implies anything" is TRUE in logic!</p>
                    <p>Statement holds via vacuous truth.</p>
                `;
                break;
            case 'none':
                sceneEl.textContent = 'person person person person person';
                personEl.textContent = 'Anyone';
                logicEl.textContent = 'Vacuous';
                this.$('#result').innerHTML = `
                    <p><strong>Nobody is drinking.</strong></p>
                    <p>Pick anyone: "If they are drinking, everyone is drinking."</p>
                    <p>They are NOT drinking. The condition is false.</p>
                    <p>"If false, then anything" is true!</p>
                    <p style="color: var(--accent);">Statement holds vacuously for all!</p>
                `;
                break;
            case 'empty':
                sceneEl.textContent = '(empty pub)';
                personEl.textContent = 'N/A';
                logicEl.textContent = 'Vacuous';
                this.$('#result').innerHTML = `
                    <p><strong>Empty pub - no one here!</strong></p>
                    <p>This is the trickiest case.</p>
                    <p>"There exists someone such that..." - but there's no one!</p>
                    <p>In classical logic, the statement is still true because:</p>
                    <p>"For all x, if x drinks then all drink" is vacuously true (no x exists).</p>
                    <p style="color: var(--accent);">Even with no people, the paradox holds!</p>
                `;
                break;
        }
    }
}

customElements.define('drinker-simulator', DrinkerSimulator);

export { DrinkerSimulator };
