/**
 * Polanyi's Paradox Simulator
 * "We know more than we can tell" - tacit knowledge that can't be explicitly stated
 */
import { SimulatorBase } from '../simulator-base.js';

class PolanyiSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .skill-buttons {
                    display: flex;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                }

                .skill-buttons button {
                    flex: 1;
                    min-width: 100px;
                }

                .skill-buttons button.active {
                    background: var(--accent, #f59e0b);
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1rem;
                    margin: 1.5rem 0;
                }

                .stat-box {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .stat-value {
                    font-size: 1.25rem;
                    font-weight: bold;
                    color: var(--text, #e2e8f0);
                }

                .stat-value.easy {
                    color: #22c55e;
                }

                .stat-value.hard {
                    color: #ef4444;
                }

                .stat-value.medium {
                    color: #f59e0b;
                }

                .stat-label {
                    font-size: 0.7rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                .skill-viz {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 1rem;
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin: 1rem 0;
                }

                .skill-icon {
                    font-size: 3rem;
                    transition: transform 0.3s;
                }

                .skill-icon:hover {
                    transform: scale(1.1);
                }

                .knowledge-type {
                    text-align: center;
                    padding: 0.75rem;
                    border-radius: 0.5rem;
                    font-size: 0.875rem;
                }

                .knowledge-type.tacit {
                    background: rgba(139, 92, 246, 0.2);
                    border: 1px solid #8b5cf6;
                    color: #a78bfa;
                }

                .knowledge-type.explicit {
                    background: rgba(34, 197, 94, 0.2);
                    border: 1px solid #22c55e;
                    color: #22c55e;
                }

                @media (max-width: 600px) {
                    .skill-buttons {
                        flex-direction: column;
                    }
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>Tacit Knowledge Analysis</h4>

            <div class="controls skill-buttons">
                <button id="bike-btn">Riding a Bike</button>
                <button id="face-btn">Recognizing Faces</button>
                <button id="chess-btn">Playing Chess</button>
            </div>

            <div class="skill-viz">
                <div class="skill-icon" id="skill-icon">&#x2753;</div>
                <div class="knowledge-type tacit" id="knowledge-type">Select a skill to analyze</div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="human-ability">-</div>
                    <div class="stat-label">Human Ability</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="can-explain">-</div>
                    <div class="stat-label">Can Explain How?</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="automate-ease">-</div>
                    <div class="stat-label">Automation Difficulty</div>
                </div>
            </div>

            <div class="result" id="result">
                <p>Select a skill to see how tacit vs explicit knowledge affects automation...</p>
            </div>

            <div class="insight">
                This explains Moravec's Paradox: we can automate "hard" tasks (chess, math) but not "easy" ones (walking, catching a ball). Explicit knowledge is programmable; tacit knowledge isn't.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#bike-btn').addEventListener('click', () => this.setSkill('bike'));
        this.$('#face-btn').addEventListener('click', () => this.setSkill('face'));
        this.$('#chess-btn').addEventListener('click', () => this.setSkill('chess'));
    }

    setSkill(skill) {
        const skills = {
            bike: {
                icon: '\u{1F6B4}',
                human: 'Easy',
                humanClass: 'easy',
                explain: 'Very Hard',
                explainClass: 'hard',
                automate: 'Very Hard',
                automateClass: 'hard',
                knowledgeType: 'Mostly Tacit Knowledge',
                knowledgeClass: 'tacit',
                result: `<p><strong>Riding a bicycle</strong> - You can do it, but can you explain HOW?</p>
                    <p style="color: var(--accent);">Try explaining the micro-adjustments for balance. Lean angle vs speed? Counter-steering? The knowledge is in your body, not your words.</p>
                    <p>This tacit knowledge took evolution millions of years to develop. Robots still struggle with basic balance.</p>`
            },
            face: {
                icon: '\u{1F9D1}',
                human: 'Instant',
                humanClass: 'easy',
                explain: 'Impossible',
                explainClass: 'hard',
                automate: 'Hard (until DL)',
                automateClass: 'medium',
                knowledgeType: 'Pure Tacit Knowledge',
                knowledgeClass: 'tacit',
                result: `<p><strong>Recognizing faces</strong> - You recognize thousands of faces instantly, but cannot articulate how.</p>
                    <p>"I know it's them" is not an algorithm. What features? What proportions? You can't say.</p>
                    <p style="color: var(--accent);">Deep learning finally cracked this by learning implicitly, like humans do - through examples, not rules.</p>`
            },
            chess: {
                icon: '\u{265F}',
                human: 'Hard',
                humanClass: 'hard',
                explain: 'Possible',
                explainClass: 'easy',
                automate: 'Easy',
                automateClass: 'easy',
                knowledgeType: 'Mostly Explicit Knowledge',
                knowledgeClass: 'explicit',
                result: `<p><strong>Playing chess</strong> - Considered "intellectual" but highly automatable!</p>
                    <p>Chess has explicit rules. We CAN explain strategy: control center, develop pieces, protect king.</p>
                    <p style="color: #22c55e;">Computers mastered it in the 1990s because the knowledge is formalizable.</p>
                    <p style="color: var(--accent);">The paradox: "hard" tasks are often easier to automate than "easy" ones!</p>`
            }
        };

        const s = skills[skill];

        this.$('#skill-icon').textContent = s.icon;
        this.$('#human-ability').textContent = s.human;
        this.$('#human-ability').className = 'stat-value ' + s.humanClass;
        this.$('#can-explain').textContent = s.explain;
        this.$('#can-explain').className = 'stat-value ' + s.explainClass;
        this.$('#automate-ease').textContent = s.automate;
        this.$('#automate-ease').className = 'stat-value ' + s.automateClass;
        this.$('#knowledge-type').textContent = s.knowledgeType;
        this.$('#knowledge-type').className = 'knowledge-type ' + s.knowledgeClass;
        this.$('#result').innerHTML = s.result;

        this.$$('.skill-buttons button').forEach(btn => btn.classList.remove('active'));
        this.$(`#${skill}-btn`).classList.add('active');
    }
}

customElements.define('polanyi-simulator', PolanyiSimulator);

export { PolanyiSimulator };
