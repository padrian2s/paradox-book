/**
 * Miserable Programmer Paradox Simulator
 * Demonstrates how awareness of code problems correlates with unhappiness
 */
import { SimulatorBase } from '../simulator-base.js';

class MiserableProgrammerSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .stat-box {
                    background: var(--bg, #0f172a);
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

                .programmer-viz {
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    padding: 1.5rem;
                    margin-top: 1rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 2rem;
                    flex-wrap: wrap;
                }

                .programmer-face {
                    font-size: 5rem;
                    transition: all 0.3s;
                }

                .bug-cloud {
                    position: relative;
                    width: 200px;
                    height: 150px;
                }

                .bug {
                    position: absolute;
                    font-size: 1.5rem;
                    transition: opacity 0.3s;
                    animation: float 3s ease-in-out infinite;
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }

                .code-sample {
                    background: var(--card, #1e293b);
                    border-radius: 0.25rem;
                    padding: 1rem;
                    font-family: monospace;
                    font-size: 0.75rem;
                    margin-top: 1rem;
                    overflow-x: auto;
                }

                .code-problem {
                    color: #ef4444;
                    text-decoration: underline wavy #ef4444;
                }

                .code-ok {
                    color: #22c55e;
                }

                @media (max-width: 768px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }

                    .programmer-viz {
                        flex-direction: column;
                    }

                    .programmer-face {
                        font-size: 4rem;
                    }
                }
            </style>

            <h4>Awareness vs Happiness</h4>

            <div class="controls">
                <div class="control-group">
                    <label>Code Awareness: <span id="misery-val">50</span>%</label>
                    <input type="range" id="misery-a" min="0" max="100" value="50">
                </div>
            </div>

            <div class="programmer-viz">
                <div class="programmer-face" id="face">&#x1F610;</div>
                <div class="bug-cloud" id="bug-cloud">
                    <span class="bug" style="top: 10%; left: 10%; animation-delay: 0s;">&#x1F41B;</span>
                    <span class="bug" style="top: 30%; left: 60%; animation-delay: 0.5s;">&#x1F41B;</span>
                    <span class="bug" style="top: 60%; left: 30%; animation-delay: 1s;">&#x1F41B;</span>
                    <span class="bug" style="top: 20%; left: 80%; animation-delay: 1.5s;">&#x1F41B;</span>
                    <span class="bug" style="top: 70%; left: 70%; animation-delay: 2s;">&#x1F41B;</span>
                    <span class="bug" style="top: 50%; left: 10%; animation-delay: 0.3s;">&#x1F41B;</span>
                    <span class="bug" style="top: 80%; left: 50%; animation-delay: 0.8s;">&#x1F41B;</span>
                </div>
            </div>

            <div class="code-sample" id="code-sample">
                <span class="code-ok">function processData(data) {</span><br>
                &nbsp;&nbsp;<span id="line1">const result = data.map(x => x * 2);</span><br>
                &nbsp;&nbsp;<span id="line2">return result;</span><br>
                <span class="code-ok">}</span>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="misery-bugs">50</div>
                    <div class="stat-label">Bugs You See</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="misery-happy">&#x1F610;</div>
                    <div class="stat-label">Happiness</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="misery-prod">Medium</div>
                    <div class="stat-label">Productivity</div>
                </div>
            </div>

            <div class="result">
                <p id="misery-result">You see some issues but maintain reasonable happiness.</p>
            </div>

            <div class="insight">
                The paradox: Expert programmers are often less happy because they see all the technical debt, security holes, and architectural flaws that novices blissfully ignore.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#misery-a').addEventListener('input', () => this.updateMisery());
        this.updateMisery();
    }

    updateMisery() {
        const awareness = parseInt(this.$('#misery-a').value);
        const bugsVisible = Math.floor(awareness * 1.5);

        this.$('#misery-val').textContent = awareness;
        this.$('#misery-bugs').textContent = bugsVisible;

        let face, prod, result;
        if (awareness > 80) {
            face = '&#x1F62B;';
            prod = 'Very High';
            result = 'You see EVERYTHING wrong. The codebase haunts your dreams. But your fixes are masterful.';
        } else if (awareness > 60) {
            face = '&#x1F61F;';
            prod = 'High';
            result = 'You notice race conditions, memory leaks, and security holes others miss. It\'s exhausting.';
        } else if (awareness > 40) {
            face = '&#x1F610;';
            prod = 'Medium';
            result = 'You see some issues but maintain reasonable happiness.';
        } else {
            face = '&#x1F60A;';
            prod = 'Low';
            result = 'Blissful ignorance! The code works (you think). Life is good.';
        }

        this.$('#face').innerHTML = face;
        this.$('#misery-happy').innerHTML = face;
        this.$('#misery-prod').textContent = prod;
        this.$('#misery-result').textContent = result;

        const bugs = this.$$('.bug');
        bugs.forEach((bug, i) => {
            const threshold = (i + 1) * 14;
            bug.style.opacity = awareness >= threshold ? '1' : '0.2';
        });

        const line1 = this.$('#line1');
        const line2 = this.$('#line2');

        if (awareness > 60) {
            line1.className = 'code-problem';
            line1.innerHTML = 'const result = data.map(x => x * 2); // No null check!';
        } else {
            line1.className = 'code-ok';
            line1.innerHTML = 'const result = data.map(x => x * 2);';
        }

        if (awareness > 80) {
            line2.className = 'code-problem';
            line2.innerHTML = 'return result; // No error handling, no logging, no validation...';
        } else {
            line2.className = 'code-ok';
            line2.innerHTML = 'return result;';
        }
    }
}

customElements.define('miserable-programmer-simulator', MiserableProgrammerSimulator);

export { MiserableProgrammerSimulator };
