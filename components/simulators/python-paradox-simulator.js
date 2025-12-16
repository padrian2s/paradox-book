/**
 * Python Paradox Simulator
 * Demonstrates how "harder" languages attract more passionate programmers
 */
import { SimulatorBase } from '../simulator-base.js';

class PythonParadoxSimulator extends SimulatorBase {
    constructor() {
        super();
        this.languages = {
            java: { pool: 'Large', passion: '40%', quality: 'Medium', desc: 'Many learn for jobs, not love.' },
            python: { pool: 'Large', passion: '60%', quality: 'Medium-High', desc: 'Popular but also loved by hobbyists.' },
            haskell: { pool: 'Small', passion: '95%', quality: 'Very High', desc: 'Only enthusiasts bother - they\'re exceptional!' },
            rust: { pool: 'Medium', passion: '90%', quality: 'High', desc: 'Hard enough to filter, popular enough to attract.' }
        };
    }

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

                .language-viz {
                    display: flex;
                    gap: 0.5rem;
                    margin-top: 1rem;
                    flex-wrap: wrap;
                }

                .lang-bar {
                    flex: 1;
                    min-width: 100px;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    padding: 1rem;
                    text-align: center;
                    transition: all 0.3s;
                    cursor: pointer;
                    border: 2px solid transparent;
                }

                .lang-bar:hover {
                    border-color: var(--primary, #6366f1);
                }

                .lang-bar.selected {
                    border-color: var(--accent, #f59e0b);
                    background: rgba(99, 102, 241, 0.2);
                }

                .lang-name {
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                }

                .passion-meter {
                    height: 60px;
                    width: 20px;
                    background: var(--card, #1e293b);
                    border-radius: 0.25rem;
                    margin: 0.5rem auto;
                    position: relative;
                    overflow: hidden;
                }

                .passion-fill {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: linear-gradient(to top, #ef4444, #f59e0b, #22c55e);
                    transition: height 0.3s;
                }

                @media (max-width: 768px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }

                    .language-viz {
                        flex-direction: column;
                    }

                    .lang-bar {
                        min-width: auto;
                    }
                }
            </style>

            <h4>Language Choice Effect</h4>

            <div class="language-viz">
                <div class="lang-bar selected" data-lang="java">
                    <div class="lang-name">Java</div>
                    <div class="passion-meter"><div class="passion-fill" style="height: 40%;"></div></div>
                    <div style="font-size: 0.75rem; color: var(--muted);">Popular, Required</div>
                </div>
                <div class="lang-bar" data-lang="python">
                    <div class="lang-name">Python</div>
                    <div class="passion-meter"><div class="passion-fill" style="height: 60%;"></div></div>
                    <div style="font-size: 0.75rem; color: var(--muted);">Easy, Growing</div>
                </div>
                <div class="lang-bar" data-lang="haskell">
                    <div class="lang-name">Haskell</div>
                    <div class="passion-meter"><div class="passion-fill" style="height: 95%;"></div></div>
                    <div style="font-size: 0.75rem; color: var(--muted);">Hard, Niche</div>
                </div>
                <div class="lang-bar" data-lang="rust">
                    <div class="lang-name">Rust</div>
                    <div class="passion-meter"><div class="passion-fill" style="height: 90%;"></div></div>
                    <div style="font-size: 0.75rem; color: var(--muted);">Hard, Growing</div>
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="lang-pool">Large</div>
                    <div class="stat-label">Candidate Pool</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="lang-passion">40%</div>
                    <div class="stat-label">Passion-Driven</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="lang-quality">Medium</div>
                    <div class="stat-label">Avg Quality</div>
                </div>
            </div>

            <div class="result">
                <p id="lang-result">Java: Large pool but many learn just for jobs.</p>
            </div>

            <div class="insight">
                The paradox: Using a "hard" language may shrink your candidate pool, but dramatically increases the quality of applicants who apply.
            </div>
        `;
    }

    setupEventListeners() {
        this.$$('.lang-bar').forEach(bar => {
            bar.addEventListener('click', (e) => {
                this.$$('.lang-bar').forEach(b => b.classList.remove('selected'));
                bar.classList.add('selected');
                this.updateDisplay(bar.dataset.lang);
            });
        });
    }

    updateDisplay(lang) {
        const data = this.languages[lang];
        this.$('#lang-pool').textContent = data.pool;
        this.$('#lang-passion').textContent = data.passion;
        this.$('#lang-quality').textContent = data.quality;
        this.$('#lang-result').textContent = data.desc;
    }
}

customElements.define('python-paradox-simulator', PythonParadoxSimulator);

export { PythonParadoxSimulator };
