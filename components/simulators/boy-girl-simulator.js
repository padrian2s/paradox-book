/**
 * Boy/Girl Paradox Simulator
 * Demonstrates the probability paradox: P(both boys | at least one boy) = 1/3
 */
import { SimulatorBase } from '../simulator-base.js';

class BoyGirlSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .families-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 4px;
                    padding: 1rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                    max-height: 200px;
                    overflow-y: auto;
                }

                .family {
                    padding: 2px 4px;
                    border-radius: 2px;
                    font-size: 0.75rem;
                    background: var(--card, #1e293b);
                    color: var(--text, #e2e8f0);
                }

                .family.both-boys {
                    background: var(--primary, #6366f1);
                    color: white;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
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

                .stat-value.theoretical {
                    color: #22c55e;
                }

                @media (max-width: 768px) {
                    .families-container {
                        max-height: 150px;
                        padding: 0.75rem;
                    }

                    .stats-grid {
                        grid-template-columns: repeat(2, 1fr);
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

            <h4>Two-Child Family Simulator</h4>

            <div class="controls">
                <button id="simulate-btn">Simulate 1000 Families</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="families-container" id="boygirl-families"></div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="bg-total">0</div>
                    <div class="stat-label">Families with 1+ Boy</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="bg-both">0</div>
                    <div class="stat-label">Both Boys</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="bg-pct">0%</div>
                    <div class="stat-label">P(Both Boys | 1+ Boy)</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value theoretical">33.3%</div>
                    <div class="stat-label">Theoretical</div>
                </div>
            </div>

            <div class="result">
                <p>Possible families: BB, BG, GB, GG. Given "at least one boy," GG is eliminated. Of BB, BG, GB, only BB has both boys = 1/3.</p>
            </div>

            <div class="insight">
                Compare to: "My OLDER child is a boy" - P(both boys) = 1/2. The phrasing completely changes the answer!
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#simulate-btn').addEventListener('click', () => this.simulateBoyGirl(1000));
        this.$('#reset-btn').addEventListener('click', () => this.resetBoyGirl());
    }

    simulateBoyGirl(n) {
        const container = this.$('#boygirl-families');
        container.innerHTML = '';

        let atLeastOneBoy = 0;
        let bothBoys = 0;

        for (let i = 0; i < n; i++) {
            const child1 = Math.random() < 0.5 ? 'B' : 'G';
            const child2 = Math.random() < 0.5 ? 'B' : 'G';

            if (child1 === 'B' || child2 === 'B') {
                atLeastOneBoy++;
                if (child1 === 'B' && child2 === 'B') {
                    bothBoys++;
                }

                if (i < 200) {
                    const family = document.createElement('span');
                    family.textContent = child1 + child2;
                    family.className = 'family';
                    if (child1 === 'B' && child2 === 'B') {
                        family.classList.add('both-boys');
                    }
                    container.appendChild(family);
                }
            }
        }

        this.$('#bg-total').textContent = atLeastOneBoy;
        this.$('#bg-both').textContent = bothBoys;
        this.$('#bg-pct').textContent = (bothBoys / atLeastOneBoy * 100).toFixed(1) + '%';
    }

    resetBoyGirl() {
        this.$('#boygirl-families').innerHTML = '';
        this.$('#bg-total').textContent = '0';
        this.$('#bg-both').textContent = '0';
        this.$('#bg-pct').textContent = '0%';
    }
}

customElements.define('boy-girl-simulator', BoyGirlSimulator);

export { BoyGirlSimulator };
