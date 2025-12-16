/**
 * Bootstrap Paradox Simulator
 * Information exists without ever being created
 */
import { SimulatorBase } from '../simulator-base.js';

class BootstrapSimulator extends SimulatorBase {
    constructor() {
        super();
        this.animationInterval = null;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .loop-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 1rem;
                    margin: 1.5rem 0;
                    flex-wrap: wrap;
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                }

                .loop-node {
                    padding: 1rem;
                    background: var(--card, #1e293b);
                    border: 2px solid var(--muted, #94a3b8);
                    border-radius: 0.5rem;
                    text-align: center;
                    min-width: 120px;
                    transition: all 0.3s ease;
                }

                .loop-node.active {
                    border-color: var(--primary, #6366f1);
                    background: var(--primary, #6366f1);
                    transform: scale(1.05);
                }

                .node-icon {
                    font-size: 1.5rem;
                    margin-bottom: 0.25rem;
                }

                .node-label {
                    font-size: 0.75rem;
                    color: var(--text, #e2e8f0);
                }

                .loop-arrow {
                    font-size: 2rem;
                    color: var(--primary, #6366f1);
                }

                .question-box {
                    text-align: center;
                    padding: 1.5rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    margin: 1rem 0;
                }

                .question-text {
                    font-size: 1.25rem;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                }

                .examples-container {
                    margin-top: 1rem;
                }

                .example {
                    padding: 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    margin: 0.5rem 0;
                    border-left: 3px solid var(--primary, #6366f1);
                }

                .example-title {
                    font-weight: bold;
                    color: var(--text, #e2e8f0);
                    margin-bottom: 0.25rem;
                }

                .example-desc {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                }

                @media (max-width: 600px) {
                    .loop-container {
                        flex-direction: column;
                    }
                    .loop-arrow {
                        transform: rotate(90deg);
                    }
                }
            </style>

            <h4>Causal Loop</h4>

            <div class="controls">
                <button id="run-btn">Travel Through Time</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="loop-container">
                <div class="loop-node" id="node-you">
                    <div class="node-icon">&#x1F9D1;</div>
                    <div class="node-label">You (has symphony)</div>
                </div>
                <div class="loop-arrow">&#x2192;</div>
                <div class="loop-node" id="node-past">
                    <div class="node-icon">&#x1F3B9;</div>
                    <div class="node-label">Young Beethoven</div>
                </div>
                <div class="loop-arrow">&#x2192;</div>
                <div class="loop-node" id="node-future">
                    <div class="node-icon">&#x1F4DC;</div>
                    <div class="node-label">Published Work</div>
                </div>
                <div class="loop-arrow">&#x2192;</div>
                <div class="loop-node" id="node-find">
                    <div class="node-icon">&#x1F50D;</div>
                    <div class="node-label">You Find It</div>
                </div>
            </div>

            <div class="question-box">
                <div class="question-text" id="question-text">Who originally composed the symphony?</div>
            </div>

            <div class="result" id="boot-result">
                <p>Click "Travel Through Time" to see the paradox unfold...</p>
            </div>

            <div class="examples-container">
                <div class="example">
                    <div class="example-title">Doctor Who: The Shepherd's Boy</div>
                    <div class="example-desc">The Doctor learns Beethoven's music, travels back, and teaches it to young Beethoven. Who composed it?</div>
                </div>
                <div class="example">
                    <div class="example-title">Terminator: John Connor</div>
                    <div class="example-desc">Kyle Reese is sent back by John Connor and becomes John's father. Who sent Kyle originally?</div>
                </div>
            </div>

            <div class="insight">
                The information exists in a closed loop with no origin - a genuine ontological paradox. Unlike the grandfather paradox, bootstrap paradoxes are logically consistent but causally mysterious.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#run-btn').addEventListener('click', () => this.runAnimation());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
    }

    runAnimation() {
        this.reset();
        const nodes = ['node-you', 'node-past', 'node-future', 'node-find'];
        let i = 0;

        this.animationInterval = setInterval(() => {
            nodes.forEach(n => this.$(`#${n}`).classList.remove('active'));

            if (i < nodes.length) {
                this.$(`#${nodes[i]}`).classList.add('active');
                i++;
            } else {
                clearInterval(this.animationInterval);

                nodes.forEach(n => this.$(`#${n}`).classList.add('active'));

                this.$('#question-text').innerHTML = 'The loop has no beginning!';
                this.$('#question-text').style.color = '#ef4444';

                this.$('#boot-result').innerHTML = `
                    <p style="color: var(--accent);"><strong>PARADOX!</strong> The symphony exists in a closed causal loop:</p>
                    <p>You give it to Beethoven &#x2192; He publishes it &#x2192; You find it &#x2192; You give it to Beethoven...</p>
                    <p>The symphony was never <em>created</em> - it simply <em>exists</em>. There is no original composer.</p>
                `;
            }
        }, 800);
    }

    reset() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
        }

        const nodes = ['node-you', 'node-past', 'node-future', 'node-find'];
        nodes.forEach(n => this.$(`#${n}`).classList.remove('active'));

        this.$('#question-text').textContent = 'Who originally composed the symphony?';
        this.$('#question-text').style.color = 'var(--accent)';
        this.$('#boot-result').innerHTML = '<p>Click "Travel Through Time" to see the paradox unfold...</p>';
    }

    cleanup() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
        }
    }
}

customElements.define('bootstrap-simulator', BootstrapSimulator);

export { BootstrapSimulator };
