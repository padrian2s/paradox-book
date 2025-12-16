/**
 * Grelling-Nelson Paradox Simulator
 * Is "heterological" heterological?
 */
import { SimulatorBase } from '../simulator-base.js';

class GrellingSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .word-buttons {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin-bottom: 1rem;
                }

                .word-buttons button {
                    flex: 1;
                    min-width: 100px;
                }

                .word-buttons button.danger {
                    background: #ef4444;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    margin: 1rem 0;
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
                    color: var(--primary, #6366f1);
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                .definitions {
                    padding: 1rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin: 1rem 0;
                }

                .definition {
                    padding: 0.75rem;
                    margin: 0.5rem 0;
                    background: var(--card, #1e293b);
                    border-radius: 0.25rem;
                    font-size: 0.875rem;
                }

                .definition-term {
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                }

                .examples-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    margin: 1rem 0;
                }

                .example-box {
                    padding: 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                }

                .example-title {
                    font-weight: bold;
                    font-size: 0.875rem;
                    margin-bottom: 0.5rem;
                }

                .example-title.auto {
                    color: #22c55e;
                }

                .example-title.hetero {
                    color: #ef4444;
                }

                .example-list {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }

                .paradox-loop {
                    text-align: center;
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin: 1rem 0;
                }

                .loop-text {
                    font-size: 1rem;
                    line-height: 1.8;
                }

                .loop-arrow {
                    font-size: 1.5rem;
                    color: #ef4444;
                    margin: 0.5rem 0;
                }
            </style>

            <h4>Word Classification</h4>

            <div class="definitions">
                <div class="definition">
                    <span class="definition-term">Autological:</span> A word that describes itself (e.g., "short" is short)
                </div>
                <div class="definition">
                    <span class="definition-term">Heterological:</span> A word that does NOT describe itself (e.g., "long" is not long)
                </div>
            </div>

            <div class="word-buttons">
                <button id="short-btn">Short</button>
                <button id="long-btn">Long</button>
                <button id="english-btn">English</button>
                <button id="hetero-btn" class="danger">Heterological</button>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="grell-word">-</div>
                    <div class="stat-label">Word</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="grell-type">-</div>
                    <div class="stat-label">Classification</div>
                </div>
            </div>

            <div class="result" id="grell-result">
                <p>Click a word to classify it...</p>
            </div>

            <div class="examples-grid">
                <div class="example-box">
                    <div class="example-title auto">Autological Examples</div>
                    <div class="example-list">
                        "short" - is short<br>
                        "English" - is English<br>
                        "unhyphenated" - is unhyphenated<br>
                        "pentasyllabic" - has 5 syllables
                    </div>
                </div>
                <div class="example-box">
                    <div class="example-title hetero">Heterological Examples</div>
                    <div class="example-list">
                        "long" - is not long<br>
                        "German" - is not German<br>
                        "hyphenated" - is not hyphenated<br>
                        "monosyllabic" - not 1 syllable
                    </div>
                </div>
            </div>

            <div class="insight">
                Like Russell's paradox for sets, Grelling-Nelson shows that self-reference in natural language creates unavoidable contradictions.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#short-btn').addEventListener('click', () => this.classifyWord('short'));
        this.$('#long-btn').addEventListener('click', () => this.classifyWord('long'));
        this.$('#english-btn').addEventListener('click', () => this.classifyWord('english'));
        this.$('#hetero-btn').addEventListener('click', () => this.classifyWord('heterological'));
    }

    classifyWord(word) {
        this.$('#grell-word').textContent = word;

        if (word === 'short') {
            this.$('#grell-type').textContent = 'Autological';
            this.$('#grell-type').style.color = '#22c55e';
            this.$('#grell-result').innerHTML = '<p style="color: #22c55e;">"Short" is a short word - it describes itself!</p>';
        } else if (word === 'long') {
            this.$('#grell-type').textContent = 'Heterological';
            this.$('#grell-type').style.color = '#ef4444';
            this.$('#grell-result').innerHTML = '<p>"Long" is not a long word - it doesn\'t describe itself.</p>';
        } else if (word === 'english') {
            this.$('#grell-type').textContent = 'Autological';
            this.$('#grell-type').style.color = '#22c55e';
            this.$('#grell-result').innerHTML = '<p style="color: #22c55e;">"English" is an English word - it describes itself!</p>';
        } else {
            this.$('#grell-type').textContent = 'PARADOX';
            this.$('#grell-type').style.color = '#ef4444';
            this.$('#grell-result').innerHTML = `
                <div class="paradox-loop">
                    <div class="loop-text">
                        If "heterological" <strong>IS</strong> heterological...<br>
                        <span class="loop-arrow">&#x2193;</span><br>
                        Then it describes itself, so it's <strong>autological</strong>.<br>
                        <span class="loop-arrow">&#x2193;</span><br>
                        But if it's <strong>NOT</strong> heterological...<br>
                        <span class="loop-arrow">&#x2193;</span><br>
                        Then it doesn't describe itself, so it <strong>IS</strong> heterological!<br>
                        <span class="loop-arrow" style="font-size: 2rem;">&#x1F4A5;</span><br>
                        <strong style="color: #ef4444;">CONTRADICTION!</strong>
                    </div>
                </div>
            `;
        }
    }
}

customElements.define('grelling-simulator', GrellingSimulator);

export { GrellingSimulator };
