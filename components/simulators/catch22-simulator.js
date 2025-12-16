/**
 * Catch-22 Simulator
 * A situation where you need something that can only be had by not needing it
 */
import { SimulatorBase } from '../simulator-base.js';

class Catch22Simulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .scenario-box {
                    background: var(--bg, #0f172a);
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    margin: 1rem 0;
                    border-left: 4px solid var(--accent, #f59e0b);
                }

                .scenario-title {
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                    margin-bottom: 0.5rem;
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

                .logic-step.paradox {
                    background: rgba(239, 68, 68, 0.2);
                    border: 1px solid #ef4444;
                }

                .arrow {
                    color: var(--accent, #f59e0b);
                    font-size: 1.2rem;
                }

                @media (max-width: 600px) {
                    .controls {
                        flex-direction: column;
                    }
                }
            </style>

            <h4>Catch-22 Explorer</h4>

            <div class="controls">
                <button id="soldier-btn">Soldier (Original)</button>
                <button id="job-btn">Job Experience</button>
                <button id="credit-btn">Credit Score</button>
                <button id="insurance-btn">Insurance</button>
            </div>

            <div class="scenario-box" id="scenario">
                <div class="scenario-title">Choose a scenario...</div>
                <p>Select a Catch-22 situation to explore</p>
            </div>

            <div class="logic-chain" id="logic-chain"></div>

            <div class="result" id="result">
                <p>Each scenario demonstrates a circular trap where the solution requires what can only be obtained by having already solved it.</p>
            </div>

            <div class="insight">
                Named after Joseph Heller's 1961 novel. Catch-22 situations are self-reinforcing bureaucratic or logical traps. They appear everywhere: job markets, healthcare, finance, and law.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#soldier-btn').addEventListener('click', () => this.showScenario('soldier'));
        this.$('#job-btn').addEventListener('click', () => this.showScenario('job'));
        this.$('#credit-btn').addEventListener('click', () => this.showScenario('credit'));
        this.$('#insurance-btn').addEventListener('click', () => this.showScenario('insurance'));
    }

    showScenario(type) {
        const scenarios = {
            soldier: {
                title: 'The Original Catch-22',
                desc: 'A soldier wants to be declared insane to avoid dangerous combat missions.',
                steps: [
                    { text: 'Soldier wants to avoid combat', paradox: false },
                    { text: 'Asks to be declared insane', paradox: false },
                    { text: 'But wanting to avoid danger is SANE', paradox: true },
                    { text: 'Therefore he cannot be declared insane', paradox: false },
                    { text: 'Only truly insane (who don\'t ask) could be grounded', paradox: true }
                ],
                result: 'The only way to be grounded for insanity is to be truly insane - but truly insane people don\'t know to ask!'
            },
            job: {
                title: 'Entry-Level Job Paradox',
                desc: 'A graduate needs a job but all jobs require experience.',
                steps: [
                    { text: 'Graduate needs a job', paradox: false },
                    { text: 'All jobs require 2+ years experience', paradox: false },
                    { text: 'Experience requires having had a job', paradox: true },
                    { text: 'Can\'t get job without experience', paradox: false },
                    { text: 'Can\'t get experience without job', paradox: true }
                ],
                result: 'The entry-level position requiring experience is perhaps the most common modern Catch-22.'
            },
            credit: {
                title: 'Credit Score Catch-22',
                desc: 'You need credit to build credit, but no one will give you credit without credit history.',
                steps: [
                    { text: 'Need to build credit score', paradox: false },
                    { text: 'Apply for credit card', paradox: false },
                    { text: 'Denied: no credit history', paradox: true },
                    { text: 'Need credit card to build history', paradox: false },
                    { text: 'Need history to get credit card', paradox: true }
                ],
                result: 'Banks want proof you can handle credit, but the only proof comes from having been given credit.'
            },
            insurance: {
                title: 'Health Insurance Paradox',
                desc: 'You need insurance for treatment, but pre-existing conditions prevent getting insurance.',
                steps: [
                    { text: 'Person has health condition', paradox: false },
                    { text: 'Needs insurance for treatment', paradox: false },
                    { text: 'Denied for pre-existing condition', paradox: true },
                    { text: 'Condition worsens without treatment', paradox: false },
                    { text: 'Even harder to get insured now', paradox: true }
                ],
                result: 'Those who need insurance most are often those least able to obtain it.'
            }
        };

        const s = scenarios[type];
        this.$('#scenario').innerHTML = `
            <div class="scenario-title">${s.title}</div>
            <p>${s.desc}</p>
        `;

        this.$('#logic-chain').innerHTML = s.steps.map((step, i) => `
            ${i > 0 ? '<div class="arrow">↓</div>' : ''}
            <div class="logic-step ${step.paradox ? 'paradox' : ''}">
                ${step.text}
            </div>
        `).join('');

        this.$('#result').innerHTML = `<p><strong>The Catch:</strong> ${s.result}</p>`;
    }
}

customElements.define('catch22-simulator', Catch22Simulator);

export { Catch22Simulator };
