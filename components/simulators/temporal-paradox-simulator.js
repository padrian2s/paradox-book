import { SimulatorBase } from '../simulator-base.js';

class TemporalParadoxSimulator extends SimulatorBase {
    constructor() {
        super();
        this.animationInterval = null;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .scenario-container {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    min-height: 200px;
                }

                .timeline {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                    justify-content: center;
                    margin: 1rem 0;
                }

                .timeline-node {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 0.75rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    min-width: 90px;
                    text-align: center;
                    transition: all 0.3s ease;
                    border: 2px solid transparent;
                }

                .timeline-node.active {
                    border-color: var(--primary, #6366f1);
                    background: var(--primary, #6366f1);
                }

                .timeline-node.erased {
                    opacity: 0.3;
                    border-color: #dc2626;
                    text-decoration: line-through;
                }

                .timeline-node.paradox {
                    border-color: #dc2626;
                    animation: shake 0.5s ease-in-out infinite;
                }

                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-3px); }
                    75% { transform: translateX(3px); }
                }

                .node-icon {
                    font-size: 1.5rem;
                    margin-bottom: 0.25rem;
                }

                .node-label {
                    font-size: 0.7rem;
                    color: var(--text, #e2e8f0);
                }

                .arrow {
                    font-size: 1.25rem;
                    color: var(--primary, #6366f1);
                }

                .arrow.broken {
                    color: #dc2626;
                    text-decoration: line-through;
                }

                .question-panel {
                    text-align: center;
                    padding: 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .question-text {
                    font-size: 1.1rem;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                }

                .scenarios {
                    display: grid;
                    gap: 0.5rem;
                    margin-top: 1rem;
                }

                .scenario-example {
                    padding: 0.75rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    border-left: 3px solid var(--primary, #6366f1);
                    font-size: 0.875rem;
                }

                .scenario-example strong {
                    color: var(--text, #e2e8f0);
                }

                @media (max-width: 600px) {
                    .timeline-node {
                        min-width: 70px;
                        padding: 0.5rem;
                    }
                    .node-icon {
                        font-size: 1.25rem;
                    }
                }
            </style>

            <h4>Temporal Paradox Simulator</h4>
            <p style="color: var(--muted); margin-bottom: 1rem;">Success erases the reason for the mission.</p>

            <div class="controls">
                <button id="run-btn">Alter the Past</button>
                <button id="reset-btn">Reset Timeline</button>
            </div>

            <div class="scenario-container">
                <div class="timeline" id="timeline">
                    <div class="timeline-node" id="node-problem">
                        <span class="node-icon">&#x1F4A3;</span>
                        <span class="node-label">Problem Exists</span>
                    </div>
                    <span class="arrow" id="arrow1">&#x2192;</span>
                    <div class="timeline-node" id="node-decide">
                        <span class="node-icon">&#x1F914;</span>
                        <span class="node-label">You Decide to Fix</span>
                    </div>
                    <span class="arrow" id="arrow2">&#x2192;</span>
                    <div class="timeline-node" id="node-travel">
                        <span class="node-icon">&#x23F3;</span>
                        <span class="node-label">Time Travel</span>
                    </div>
                    <span class="arrow" id="arrow3">&#x2192;</span>
                    <div class="timeline-node" id="node-fix">
                        <span class="node-icon">&#x2705;</span>
                        <span class="node-label">Fix Problem</span>
                    </div>
                </div>

                <div class="question-panel" id="question-panel">
                    <div class="question-text" id="question-text">What happens when you succeed?</div>
                </div>
            </div>

            <div class="result" id="result">
                <p>Click "Alter the Past" to explore the paradox...</p>
            </div>

            <div class="scenarios">
                <div class="scenario-example">
                    <strong>Terminator Scenario:</strong> If you prevent Skynet, no one sends a terminator back, so no one knows to prevent Skynet.
                </div>
                <div class="scenario-example">
                    <strong>Disease Scenario:</strong> If you prevent a plague, future scientists never develop the time machine to prevent it.
                </div>
            </div>

            <div class="insight">
                The temporal paradox reveals a fundamental contradiction: successful time travel that changes the past removes the very motivation that led to the time travel in the first place.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#run-btn').addEventListener('click', () => this.runAnimation());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
    }

    runAnimation() {
        this.reset();
        const steps = [
            { node: 'node-problem', msg: 'A terrible problem exists in your timeline...' },
            { node: 'node-decide', msg: 'You decide you must go back and fix it...' },
            { node: 'node-travel', msg: 'You travel back in time...' },
            { node: 'node-fix', msg: 'SUCCESS! You fix the problem!' }
        ];

        let i = 0;
        this.animationInterval = setInterval(() => {
            if (i < steps.length) {
                this.$(`#${steps[i].node}`).classList.add('active');
                this.$('#result').innerHTML = `<p>${steps[i].msg}</p>`;
                i++;
            } else if (i === steps.length) {
                setTimeout(() => this.showParadox(), 500);
                clearInterval(this.animationInterval);
            }
        }, 1000);
    }

    showParadox() {
        this.$('#node-problem').classList.remove('active');
        this.$('#node-problem').classList.add('erased');
        this.$('#arrow1').classList.add('broken');

        setTimeout(() => {
            this.$('#node-decide').classList.remove('active');
            this.$('#node-decide').classList.add('erased');
            this.$('#arrow2').classList.add('broken');
        }, 500);

        setTimeout(() => {
            this.$('#node-travel').classList.remove('active');
            this.$('#node-travel').classList.add('erased');
            this.$('#arrow3').classList.add('broken');
        }, 1000);

        setTimeout(() => {
            this.$('#node-fix').classList.remove('active');
            this.$('#node-fix').classList.add('paradox');

            this.$('#question-text').textContent = 'WHO FIXED THE PROBLEM?';
            this.$('#question-text').style.color = '#dc2626';

            this.$('#result').innerHTML = `
                <p style="color: #dc2626;"><strong>PARADOX!</strong></p>
                <p>If the problem never existed, you never had a reason to travel back.</p>
                <p>If you never traveled back, the problem was never fixed.</p>
                <p>If the problem wasn't fixed, it exists... and you travel back to fix it...</p>
            `;
        }, 1500);
    }

    reset() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
        }
        const nodes = ['node-problem', 'node-decide', 'node-travel', 'node-fix'];
        nodes.forEach(n => {
            this.$(`#${n}`).classList.remove('active', 'erased', 'paradox');
        });
        ['arrow1', 'arrow2', 'arrow3'].forEach(a => {
            this.$(`#${a}`).classList.remove('broken');
        });
        this.$('#question-text').textContent = 'What happens when you succeed?';
        this.$('#question-text').style.color = 'var(--accent)';
        this.$('#result').innerHTML = '<p>Click "Alter the Past" to explore the paradox...</p>';
    }

    cleanup() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
        }
    }
}

customElements.define('temporal-paradox-simulator', TemporalParadoxSimulator);

export { TemporalParadoxSimulator };
