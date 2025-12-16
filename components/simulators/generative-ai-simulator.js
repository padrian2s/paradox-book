/**
 * Generative AI Paradox Simulator
 * Demonstrates how AI can create without understanding
 */
import { SimulatorBase } from '../simulator-base.js';

class GenerativeAISimulator extends SimulatorBase {
    constructor() {
        super();
        this.examples = [
            { type: 'poem', output: '"Shall I compare thee to a summer\'s day? Thou art more lovely and more temperate..."', question: 'Does it feel the warmth of summer or the beauty of love?' },
            { type: 'code', output: 'function quickSort(arr) { if (arr.length <= 1) return arr; ... }', question: 'Does it understand why divide-and-conquer works?' },
            { type: 'story', output: '"The old man sat by the fire, remembering his youth..."', question: 'Has it ever felt nostalgia or the weight of years?' },
            { type: 'music', output: '[Generates a melancholic melody in A minor]', question: 'Does it experience sadness when composing sad music?' }
        ];
        this.currentExample = 0;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .stat-box {
                    background: var(--bg, #0f172a);
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .stat-value {
                    font-size: 2rem;
                    margin-bottom: 0.5rem;
                }

                .stat-label {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                }

                .output-box {
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    padding: 1.5rem;
                    margin-top: 1rem;
                    font-family: Georgia, serif;
                    font-style: italic;
                    line-height: 1.6;
                    border-left: 3px solid var(--primary, #6366f1);
                }

                .question-box {
                    margin-top: 1rem;
                    padding: 1rem;
                    background: rgba(239, 68, 68, 0.1);
                    border-radius: 0.5rem;
                    color: #fca5a5;
                    text-align: center;
                }

                .creation-indicator {
                    color: #22c55e;
                }

                .understanding-indicator {
                    color: #f59e0b;
                }

                @media (max-width: 768px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>Creation vs Understanding</h4>

            <div class="controls">
                <button id="create-btn">Ask to Create</button>
                <button id="explain-btn">Ask to Explain</button>
                <button id="next-btn">Next Example</button>
            </div>

            <div class="output-box" id="output-box">
                Click "Ask to Create" to see AI generate sophisticated content...
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value creation-indicator" id="ai-create">-</div>
                    <div class="stat-label">Creation Ability</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value understanding-indicator" id="ai-understand">-</div>
                    <div class="stat-label">Understanding</div>
                </div>
            </div>

            <div class="question-box" id="question-box" style="display: none;">
            </div>

            <div class="result">
                <p id="ai-paradox-result">Can produce Shakespeare-quality prose, but does it "know" what it means?</p>
            </div>

            <div class="insight">
                The paradox: Creation and understanding may be separable. AI can produce outputs indistinguishable from human work without any inner experience of meaning.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#create-btn').addEventListener('click', () => this.create());
        this.$('#explain-btn').addEventListener('click', () => this.explain());
        this.$('#next-btn').addEventListener('click', () => this.nextExample());
    }

    create() {
        const example = this.examples[this.currentExample];
        this.$('#output-box').textContent = example.output;
        this.$('#ai-create').textContent = 'Excellent';
        this.$('#ai-understand').textContent = '?';
        this.$('#question-box').style.display = 'none';
        this.$('#ai-paradox-result').textContent = 'AI can create sophisticated content. But does creation require understanding?';
    }

    explain() {
        const example = this.examples[this.currentExample];
        this.$('#ai-understand').textContent = 'Maybe?';
        this.$('#question-box').style.display = 'block';
        this.$('#question-box').textContent = example.question;
        this.$('#ai-paradox-result').textContent = 'AI can explain its output, but is that understanding or pattern matching?';
    }

    nextExample() {
        this.currentExample = (this.currentExample + 1) % this.examples.length;
        this.$('#output-box').textContent = 'Click "Ask to Create" to see the next example...';
        this.$('#ai-create').textContent = '-';
        this.$('#ai-understand').textContent = '-';
        this.$('#question-box').style.display = 'none';
        this.$('#ai-paradox-result').textContent = `Example ${this.currentExample + 1} of ${this.examples.length}: ${['Poetry', 'Code', 'Storytelling', 'Music'][this.currentExample]}`;
    }
}

customElements.define('generative-ai-simulator', GenerativeAISimulator);

export { GenerativeAISimulator };
