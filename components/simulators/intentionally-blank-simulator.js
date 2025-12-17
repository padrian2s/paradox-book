import { SimulatorBase } from '../simulator-base.js';

class IntentionallyBlankSimulator extends SimulatorBase {
    constructor() {
        super();
        this.state = {
            hasText: true
        };
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .page-container {
                    background: var(--bg, #0f172a);
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    margin: 1rem 0;
                }

                .page {
                    background: white;
                    color: #1a1a1a;
                    width: 100%;
                    max-width: 400px;
                    aspect-ratio: 8.5/11;
                    margin: 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 0.25rem;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                    font-family: 'Times New Roman', serif;
                    font-size: 1rem;
                    position: relative;
                    transition: all 0.3s;
                }

                .page.truly-blank {
                    background: white;
                }

                .page-text {
                    text-align: center;
                    padding: 1rem;
                }

                .page-number {
                    position: absolute;
                    bottom: 1rem;
                    font-size: 0.875rem;
                }

                .analysis-box {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .truth-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 1rem;
                    font-size: 0.875rem;
                }

                .truth-table th, .truth-table td {
                    border: 1px solid var(--muted, #94a3b8);
                    padding: 0.5rem;
                    text-align: center;
                }

                .truth-table th {
                    background: var(--bg, #0f172a);
                }

                .true { color: #22c55e; }
                .false { color: #ef4444; }
                .paradox { color: var(--accent, #f59e0b); }

                .quote-section {
                    font-style: italic;
                    text-align: center;
                    margin: 1rem 0;
                    color: var(--muted, #94a3b8);
                }
            </style>

            <h4>The Blank Page Paradox</h4>

            <div class="controls">
                <button id="with-text-btn">Page WITH Text</button>
                <button id="without-text-btn">Truly Blank Page</button>
                <button id="analyze-btn">Analyze the Paradox</button>
            </div>

            <div class="page-container">
                <div class="page" id="page">
                    <div class="page-text" id="page-content">
                        This page intentionally left blank.
                    </div>
                    <div class="page-number">- 42 -</div>
                </div>
            </div>

            <div class="result">
                <p id="result-text">The statement "This page intentionally left blank" is self-refuting - its presence makes itself false.</p>
            </div>

            <div class="analysis-box" id="analysis" style="display: none;">
                <strong>Logical Analysis:</strong>
                <table class="truth-table">
                    <tr>
                        <th>Scenario</th>
                        <th>Page State</th>
                        <th>Statement Truth</th>
                        <th>Result</th>
                    </tr>
                    <tr>
                        <td>Text Present</td>
                        <td>Not Blank</td>
                        <td class="false">FALSE</td>
                        <td class="paradox">Self-Refuting</td>
                    </tr>
                    <tr>
                        <td>No Text</td>
                        <td>Blank</td>
                        <td class="true">TRUE*</td>
                        <td>*But unstatable!</td>
                    </tr>
                </table>
                <p style="font-size: 0.75rem; margin-top: 0.5rem;">
                    *If truly blank, the statement would be true - but cannot exist on the page to BE true!
                </p>
            </div>

            <div class="insight">
                This is a performative contradiction: the act of stating something contradicts what is stated. Similar to "I am not speaking" or "Ignore this sign." The statement can only be true if it doesn't exist!
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#with-text-btn').addEventListener('click', () => this.showWithText());
        this.$('#without-text-btn').addEventListener('click', () => this.showBlank());
        this.$('#analyze-btn').addEventListener('click', () => this.toggleAnalysis());
    }

    showWithText() {
        const page = this.$('#page');
        const content = this.$('#page-content');

        page.classList.remove('truly-blank');
        content.textContent = 'This page intentionally left blank.';
        content.style.visibility = 'visible';

        this.$('#result-text').innerHTML = `
            <span style="color: #ef4444;">PARADOX!</span><br>
            The page claims to be blank, but the claim itself is text on the page.<br>
            By stating it's blank, it becomes NOT blank, making the statement false.
        `;
    }

    showBlank() {
        const page = this.$('#page');
        const content = this.$('#page-content');

        page.classList.add('truly-blank');
        content.style.visibility = 'hidden';

        this.$('#result-text').innerHTML = `
            <span style="color: #22c55e;">Truly blank!</span><br>
            Now the page IS intentionally left blank...<br>
            But we can't SAY that without making it not blank!<br>
            <span style="color: var(--accent);">The truth cannot be expressed on the page itself.</span>
        `;
    }

    toggleAnalysis() {
        const el = this.$('#analysis');
        el.style.display = el.style.display === 'none' ? 'block' : 'none';
    }
}

customElements.define('intentionally-blank-simulator', IntentionallyBlankSimulator);

export { IntentionallyBlankSimulator };
