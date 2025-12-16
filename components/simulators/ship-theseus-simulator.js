/**
 * Ship of Theseus Simulator
 * Demonstrates the paradox of identity through plank replacement
 */
import { SimulatorBase } from '../simulator-base.js';

class ShipTheseusSimulator extends SimulatorBase {
    constructor() {
        super();
        this.state = { planksReplaced: 0, totalPlanks: 8 };
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .ship-viz {
                    display: flex;
                    justify-content: space-around;
                    padding: 2rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                    flex-wrap: wrap;
                    gap: 2rem;
                }

                .ship-container {
                    text-align: center;
                }

                .ship-label {
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                    color: var(--text, #e2e8f0);
                }

                .ship {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    padding: 1rem;
                    background: linear-gradient(180deg, #0c4a6e 0%, #0369a1 100%);
                    border-radius: 0.5rem;
                    min-height: 200px;
                    width: 120px;
                }

                .plank {
                    height: 20px;
                    border-radius: 2px;
                    transition: all 0.3s;
                }

                .plank.original {
                    background: #92400e;
                }

                .plank.new {
                    background: #fbbf24;
                }

                .ship-identity {
                    margin-top: 0.5rem;
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
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
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                @media (max-width: 768px) {
                    .ship-viz {
                        flex-direction: column;
                        align-items: center;
                        padding: 1rem;
                        gap: 1.5rem;
                    }

                    .stats-grid {
                        grid-template-columns: repeat(3, 1fr);
                        gap: 0.5rem;
                    }

                    .stat-box {
                        padding: 0.5rem;
                    }

                    .stat-value {
                        font-size: 1.25rem;
                    }
                }
            </style>

            <h4>Identity Replacement Simulator</h4>

            <div class="controls">
                <button id="replace-btn">Replace Next Plank</button>
                <button id="replace-all-btn">Replace All</button>
                <button id="reset-btn">Reset Ship</button>
            </div>

            <div class="ship-viz">
                <div class="ship-container">
                    <div class="ship-label">Original Ship</div>
                    <div class="ship" id="ship-original">
                        <div class="plank original" data-plank="1"></div>
                        <div class="plank original" data-plank="2"></div>
                        <div class="plank original" data-plank="3"></div>
                        <div class="plank original" data-plank="4"></div>
                        <div class="plank original" data-plank="5"></div>
                        <div class="plank original" data-plank="6"></div>
                        <div class="plank original" data-plank="7"></div>
                        <div class="plank original" data-plank="8"></div>
                    </div>
                    <div class="ship-identity" id="original-identity">100% Original</div>
                </div>
                <div class="ship-container">
                    <div class="ship-label">Rebuilt Ship (from old planks)</div>
                    <div class="ship" id="ship-rebuilt"></div>
                    <div class="ship-identity" id="rebuilt-identity">0% Complete</div>
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="planks-replaced">0</div>
                    <div class="stat-label">Planks Replaced</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="original-pct">100%</div>
                    <div class="stat-label">Original Material</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="ship-question">Same Ship?</div>
                    <div class="stat-label">The Question</div>
                </div>
            </div>

            <div class="result">
                <p id="theseus-result">Start replacing planks to explore the paradox of identity...</p>
            </div>

            <div class="insight">
                This paradox applies to everything: your body replaces cells, companies change employees, code gets refactored. At what point does something become "different"?
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#replace-btn').addEventListener('click', () => this.replacePlank());
        this.$('#replace-all-btn').addEventListener('click', () => this.replaceAllPlanks());
        this.$('#reset-btn').addEventListener('click', () => this.resetShip());
    }

    replacePlank() {
        if (this.state.planksReplaced >= this.state.totalPlanks) return;

        this.state.planksReplaced++;
        const planks = this.$$('#ship-original .plank');
        const plank = planks[this.state.planksReplaced - 1];
        plank.classList.remove('original');
        plank.classList.add('new');

        const rebuiltShip = this.$('#ship-rebuilt');
        const oldPlank = document.createElement('div');
        oldPlank.className = 'plank original';
        rebuiltShip.appendChild(oldPlank);

        this.updateDisplay();
    }

    replaceAllPlanks() {
        while (this.state.planksReplaced < this.state.totalPlanks) {
            this.replacePlank();
        }
    }

    resetShip() {
        this.state.planksReplaced = 0;
        const planks = this.$$('#ship-original .plank');
        planks.forEach(p => {
            p.classList.add('original');
            p.classList.remove('new');
        });
        this.$('#ship-rebuilt').innerHTML = '';
        this.updateDisplay();
    }

    updateDisplay() {
        const pct = Math.round((1 - this.state.planksReplaced / this.state.totalPlanks) * 100);
        this.$('#planks-replaced').textContent = this.state.planksReplaced;
        this.$('#original-pct').textContent = pct + '%';
        this.$('#original-identity').textContent = pct + '% Original';
        this.$('#rebuilt-identity').textContent =
            Math.round(this.state.planksReplaced / this.state.totalPlanks * 100) + '% Complete';

        let question = 'Same Ship?';
        let result = 'Keep replacing planks to see the paradox unfold...';

        if (this.state.planksReplaced === this.state.totalPlanks) {
            question = 'Which is real?';
            result = 'The original ship has 0% original material. The rebuilt ship has 100% original material. Which is the "Ship of Theseus"?';
        } else if (this.state.planksReplaced > this.state.totalPlanks / 2) {
            question = 'Maybe...?';
            result = `With only ${pct}% original material remaining, is this still the same ship?`;
        }

        this.$('#ship-question').textContent = question;
        this.$('#theseus-result').textContent = result;
    }
}

customElements.define('ship-theseus-simulator', ShipTheseusSimulator);

export { ShipTheseusSimulator };
