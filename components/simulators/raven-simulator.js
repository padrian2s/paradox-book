/**
 * Raven Paradox Simulator
 * Demonstrates how a green apple can "confirm" that all ravens are black
 */
import { SimulatorBase } from '../simulator-base.js';

class RavenSimulator extends SimulatorBase {
    constructor() {
        super();
        this.stats = { ravens: 0, apples: 0 };
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

                .observation-viz {
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    padding: 1.5rem;
                    margin-top: 1rem;
                    text-align: center;
                }

                .observation-icon {
                    font-size: 4rem;
                    margin-bottom: 1rem;
                    transition: transform 0.3s;
                }

                .observation-icon.observed {
                    animation: pop 0.3s ease-out;
                }

                @keyframes pop {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.2); }
                    100% { transform: scale(1); }
                }

                .logic-box {
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    padding: 1rem;
                    margin-top: 1rem;
                    font-family: monospace;
                    font-size: 0.875rem;
                    text-align: left;
                }

                .logic-line {
                    margin: 0.25rem 0;
                }

                .logic-equivalent {
                    color: #22c55e;
                }

                .observation-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 0.5rem;
                    margin-top: 1rem;
                }

                .observed-item {
                    font-size: 1.5rem;
                    padding: 0.5rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.25rem;
                }

                @media (max-width: 768px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }

                    .controls {
                        flex-direction: column;
                    }
                }
            </style>

            <h4>Evidence Confirmation Explorer</h4>

            <div class="controls">
                <button id="see-raven">See Black Raven</button>
                <button id="see-apple">See Green Apple</button>
                <button id="see-white">See White Bird</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="observation-viz">
                <div class="observation-icon" id="current-obs">&#x2753;</div>
                <div id="obs-collection" class="observation-grid"></div>
            </div>

            <div class="logic-box">
                <div class="logic-line">Hypothesis: "All ravens are black"</div>
                <div class="logic-line logic-equivalent">Logically equivalent: "All non-black things are non-ravens"</div>
                <div class="logic-line" style="margin-top: 0.5rem; color: var(--muted);">Both statements are logically the same!</div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="raven-ravens">0</div>
                    <div class="stat-label">Black Ravens Seen</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="raven-apples">0</div>
                    <div class="stat-label">Green Apples Seen</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="raven-confidence">0%</div>
                    <div class="stat-label">Confidence Level</div>
                </div>
            </div>

            <div class="result">
                <p id="raven-result">Observe objects to build evidence for "All ravens are black"</p>
            </div>

            <div class="insight">
                The logical equivalence of "All ravens are black" and "All non-black things are non-ravens" creates this paradox. Both observations technically confirm the hypothesis!
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#see-raven').addEventListener('click', () => this.observe('raven'));
        this.$('#see-apple').addEventListener('click', () => this.observe('apple'));
        this.$('#see-white').addEventListener('click', () => this.observe('white'));
        this.$('#reset-btn').addEventListener('click', () => this.reset());
    }

    observe(type) {
        const obsIcon = this.$('#current-obs');
        const collection = this.$('#obs-collection');

        obsIcon.classList.remove('observed');
        void obsIcon.offsetWidth;
        obsIcon.classList.add('observed');

        if (type === 'raven') {
            obsIcon.innerHTML = '&#x1F426;';
            this.stats.ravens++;

            const item = document.createElement('span');
            item.className = 'observed-item';
            item.innerHTML = '&#x1F426;';
            collection.appendChild(item);

            this.$('#raven-result').innerHTML = '<strong>Black raven observed!</strong> This directly confirms "All ravens are black." Strong evidence!';
        } else if (type === 'apple') {
            obsIcon.innerHTML = '&#x1F34F;';
            this.stats.apples++;

            const item = document.createElement('span');
            item.className = 'observed-item';
            item.innerHTML = '&#x1F34F;';
            collection.appendChild(item);

            this.$('#raven-result').innerHTML = '<strong>Green apple observed!</strong> This is non-black AND non-raven, confirming "All non-black things are non-ravens" - logically equivalent to our hypothesis! <em>But does it really help?</em>';
        } else {
            obsIcon.innerHTML = '&#x1F54A;';
            this.$('#raven-result').innerHTML = '<strong>White bird observed!</strong> Is it a raven? If yes, hypothesis FALSIFIED! If no, it\'s irrelevant. You\'d need to check...';
        }

        this.$('#raven-ravens').textContent = this.stats.ravens;
        this.$('#raven-apples').textContent = this.stats.apples;

        const confidence = Math.min(99, this.stats.ravens * 10 + this.stats.apples * 0.0001);
        this.$('#raven-confidence').textContent = confidence.toFixed(2) + '%';
    }

    reset() {
        this.stats = { ravens: 0, apples: 0 };
        this.$('#raven-ravens').textContent = '0';
        this.$('#raven-apples').textContent = '0';
        this.$('#raven-confidence').textContent = '0%';
        this.$('#current-obs').innerHTML = '&#x2753;';
        this.$('#obs-collection').innerHTML = '';
        this.$('#raven-result').textContent = 'Observe objects to build evidence for "All ravens are black"';
    }
}

customElements.define('raven-simulator', RavenSimulator);

export { RavenSimulator };
