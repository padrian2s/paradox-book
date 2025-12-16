/**
 * Birthday Paradox Simulator
 * Demonstrates the surprising probability of shared birthdays in a group
 */
import { SimulatorBase } from '../simulator-base.js';

class BirthdaySimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .probability-bar {
                    height: 30px;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    overflow: hidden;
                    margin: 1rem 0;
                }

                .probability-fill {
                    height: 100%;
                    background: linear-gradient(90deg, var(--primary), var(--secondary));
                    transition: width 0.5s ease;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    padding-right: 0.5rem;
                    color: white;
                    font-weight: bold;
                }

                .people-grid {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    padding: 1rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .person {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    background: var(--primary, #6366f1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.75rem;
                    color: white;
                    font-weight: bold;
                }

                .person.highlight {
                    background: var(--accent, #f59e0b);
                    animation: pulse 1s infinite;
                }

                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.2); }
                }

                .simulation-results {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .sim-stat {
                    text-align: center;
                    padding: 0.5rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                }

                .sim-stat-value {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                }

                .sim-stat-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }
            </style>

            <h4>Birthday Probability Calculator</h4>

            <div class="controls">
                <div class="control-group">
                    <label>Number of People: <span id="people-val">23</span></label>
                    <input type="range" id="people" min="2" max="100" value="23">
                </div>
                <button id="simulate-btn">Run 1000 Simulations</button>
            </div>

            <div class="result">
                <p>Theoretical probability of shared birthday:</p>
                <div class="probability-bar">
                    <div class="probability-fill" id="prob-fill" style="width: 50.7%">50.7%</div>
                </div>
                <p id="explanation">With 23 people, there's a 50.7% chance that at least two share a birthday!</p>
            </div>

            <div class="simulation-results" id="sim-results" style="display: none;">
                <div class="sim-stat">
                    <div class="sim-stat-value" id="sim-matches">--</div>
                    <div class="sim-stat-label">Simulations with match</div>
                </div>
                <div class="sim-stat">
                    <div class="sim-stat-value" id="sim-percent">--</div>
                    <div class="sim-stat-label">Match rate</div>
                </div>
            </div>

            <div class="people-grid" id="people-grid"></div>

            <div class="insight">
                Our intuition fails because we think about OUR birthday matching, but the paradox is about ANY two people matching - there are n(n-1)/2 possible pairs!
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#people').addEventListener('input', () => this.updateProbability());
        this.$('#simulate-btn').addEventListener('click', () => this.runSimulations());

        this.updateProbability();
    }

    calculateProbability(n) {
        // Probability that all n people have different birthdays
        let pAllDifferent = 1;
        for (let i = 0; i < n; i++) {
            pAllDifferent *= (365 - i) / 365;
        }
        return 1 - pAllDifferent;
    }

    updateProbability() {
        const n = parseInt(this.$('#people').value);
        this.$('#people-val').textContent = n;

        const prob = this.calculateProbability(n) * 100;

        this.$('#prob-fill').style.width = prob + '%';
        this.$('#prob-fill').textContent = prob.toFixed(1) + '%';

        this.$('#explanation').textContent =
            `With ${n} people, there's a ${prob.toFixed(1)}% chance that at least two share a birthday!`;

        // Update people visualization
        this.updatePeopleGrid(n);
    }

    updatePeopleGrid(n) {
        const grid = this.$('#people-grid');
        grid.innerHTML = '';

        for (let i = 0; i < n; i++) {
            const person = document.createElement('div');
            person.className = 'person';
            person.textContent = i + 1;
            grid.appendChild(person);
        }
    }

    runSimulations() {
        const n = parseInt(this.$('#people').value);
        const simulations = 1000;
        let matches = 0;

        for (let sim = 0; sim < simulations; sim++) {
            const birthdays = new Set();
            let hasMatch = false;

            for (let i = 0; i < n; i++) {
                const birthday = Math.floor(Math.random() * 365);
                if (birthdays.has(birthday)) {
                    hasMatch = true;
                    break;
                }
                birthdays.add(birthday);
            }

            if (hasMatch) matches++;
        }

        const matchRate = (matches / simulations * 100).toFixed(1);

        this.$('#sim-results').style.display = 'grid';
        this.$('#sim-matches').textContent = matches;
        this.$('#sim-percent').textContent = matchRate + '%';

        // Highlight random pair
        const people = this.$$('.person');
        people.forEach(p => p.classList.remove('highlight'));
        if (n >= 2) {
            const idx1 = Math.floor(Math.random() * n);
            let idx2 = Math.floor(Math.random() * n);
            while (idx2 === idx1) idx2 = Math.floor(Math.random() * n);
            people[idx1].classList.add('highlight');
            people[idx2].classList.add('highlight');
        }
    }
}

customElements.define('birthday-simulator', BirthdaySimulator);

export { BirthdaySimulator };
