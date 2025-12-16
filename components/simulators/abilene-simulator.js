/**
 * Abilene Paradox Simulator
 * Demonstrates group decision-making where no one wants the outcome
 */
import { SimulatorBase } from '../simulator-base.js';

class AbileneSimulator extends SimulatorBase {
    constructor() {
        super();
        this.members = ['dad', 'mom', 'son', 'daughter'];
        this.icons = { dad: '👨', mom: '👩', son: '👦', daughter: '👧' };
        this.names = { dad: 'Dad', mom: 'Mom', son: 'Son', daughter: 'Daughter' };
        this.prefs = {
            dad: { thinks: 'Stay home', says: "Let's go to Abilene!" },
            mom: { thinks: 'Stay home', says: "Sounds great!" },
            son: { thinks: 'Stay home', says: "Sure, why not?" },
            daughter: { thinks: 'Stay home', says: "I'm in!" }
        };
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .abilene-viz {
                    display: flex;
                    justify-content: space-around;
                    padding: 2rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                    flex-wrap: wrap;
                    gap: 1rem;
                }

                .family-member {
                    text-align: center;
                    padding: 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    min-width: 100px;
                }

                .member-icon {
                    font-size: 2.5rem;
                }

                .member-name {
                    font-weight: bold;
                    margin: 0.5rem 0;
                    color: var(--text, #e2e8f0);
                }

                .member-thought, .member-says {
                    font-size: 0.875rem;
                    padding: 0.25rem;
                    border-radius: 0.25rem;
                    margin-top: 0.25rem;
                }

                .member-thought {
                    background: #fef3c7;
                    color: #92400e;
                }

                .member-says {
                    background: #dbeafe;
                    color: #1e40af;
                }

                .scenario-desc {
                    margin-bottom: 1rem;
                    color: var(--muted, #94a3b8);
                }

                @media (max-width: 768px) {
                    .abilene-viz {
                        padding: 1rem;
                        gap: 0.5rem;
                    }

                    .family-member {
                        padding: 0.5rem;
                        min-width: 70px;
                        flex: 1;
                    }

                    .member-icon {
                        font-size: 1.75rem;
                    }

                    .member-name {
                        font-size: 0.75rem;
                    }

                    .member-thought, .member-says {
                        font-size: 0.65rem;
                        padding: 0.15rem;
                    }
                }
            </style>

            <h4>Group Decision Simulator</h4>
            <p class="scenario-desc">A family is deciding whether to drive to Abilene (4 hours in the heat) or stay home. What does each person REALLY want?</p>

            <div class="abilene-viz">
                ${this.members.map(m => `
                    <div class="family-member" id="member-${m}">
                        <div class="member-icon">${this.icons[m]}</div>
                        <div class="member-name">${this.names[m]}</div>
                        <div class="member-thought" id="${m}-thought">💭 ?</div>
                        <div class="member-says" id="${m}-says">🗣️ ?</div>
                    </div>
                `).join('')}
            </div>

            <div class="controls" style="margin-top: 1rem;">
                <button id="reveal-btn">Reveal True Preferences</button>
                <button id="new-btn">New Scenario</button>
            </div>

            <div class="result">
                <p id="abilene-result">Click "Reveal True Preferences" to see what everyone actually wants vs. what they say...</p>
            </div>

            <div class="insight">
                This happens in workplaces constantly: meetings no one wants, projects everyone privately doubts, consensus that serves no one.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#reveal-btn').addEventListener('click', () => this.revealPreferences());
        this.$('#new-btn').addEventListener('click', () => this.simulateAbilene());
    }

    simulateAbilene() {
        this.members.forEach(m => {
            this.$(`#${m}-thought`).textContent = '💭 ?';
            this.$(`#${m}-says`).textContent = '🗣️ ?';
        });
        this.$('#abilene-result').textContent = 'Click "Reveal True Preferences" to see what everyone actually wants vs. what they say...';
    }

    revealPreferences() {
        this.members.forEach(m => {
            this.$(`#${m}-thought`).textContent = '💭 ' + this.prefs[m].thinks;
            this.$(`#${m}-says`).textContent = '🗣️ ' + this.prefs[m].says;
        });

        this.$('#abilene-result').innerHTML =
            '<strong style="color: #ef4444;">PARADOX REVEALED!</strong> Everyone wants to stay home, but everyone says "Let\'s go!" They all suffer through a miserable trip that nobody wanted.';
    }
}

customElements.define('abilene-simulator', AbileneSimulator);

export { AbileneSimulator };
