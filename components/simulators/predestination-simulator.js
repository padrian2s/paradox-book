import { SimulatorBase } from '../simulator-base.js';

class PredestinationSimulator extends SimulatorBase {
    constructor() {
        super();
        this.currentStep = 0;
        this.animationInterval = null;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .timeline-container {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    min-height: 200px;
                    position: relative;
                }

                .loop-diagram {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                }

                .timeline-row {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                    justify-content: center;
                }

                .event-node {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 0.75rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    min-width: 100px;
                    text-align: center;
                    transition: all 0.3s ease;
                    border: 2px solid transparent;
                }

                .event-node.active {
                    border-color: var(--primary, #6366f1);
                    background: var(--primary, #6366f1);
                    transform: scale(1.05);
                }

                .event-node.paradox {
                    border-color: var(--accent, #f59e0b);
                    animation: pulse 1.5s infinite;
                }

                @keyframes pulse {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.4); }
                    50% { box-shadow: 0 0 0 10px rgba(245, 158, 11, 0); }
                }

                .event-icon {
                    font-size: 1.5rem;
                    margin-bottom: 0.25rem;
                }

                .event-label {
                    font-size: 0.75rem;
                    color: var(--text, #e2e8f0);
                }

                .arrow {
                    font-size: 1.5rem;
                    color: var(--primary, #6366f1);
                }

                .loop-arrow {
                    font-size: 2rem;
                    color: var(--accent, #f59e0b);
                    margin: 0.5rem 0;
                }

                .scenario-box {
                    padding: 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .scenario-title {
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                    margin-bottom: 0.5rem;
                }

                .scenario-desc {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                    line-height: 1.5;
                }

                @media (max-width: 600px) {
                    .event-node {
                        min-width: 80px;
                        padding: 0.5rem;
                    }
                    .event-icon {
                        font-size: 1.25rem;
                    }
                }
            </style>

            <h4>Predestination Paradox</h4>
            <p style="color: var(--muted); margin-bottom: 1rem;">Your attempt to prevent an event causes it to happen.</p>

            <div class="controls">
                <button id="run-btn">Run Time Loop</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="timeline-container">
                <div class="loop-diagram" id="loop-diagram">
                    <div class="timeline-row">
                        <div class="event-node" id="node-event">
                            <span class="event-icon">&#x1F4A5;</span>
                            <span class="event-label">Event Occurs</span>
                        </div>
                        <span class="arrow">&#x2192;</span>
                        <div class="event-node" id="node-learn">
                            <span class="event-icon">&#x1F4D6;</span>
                            <span class="event-label">You Learn of It</span>
                        </div>
                        <span class="arrow">&#x2192;</span>
                        <div class="event-node" id="node-travel">
                            <span class="event-icon">&#x23F3;</span>
                            <span class="event-label">Travel Back</span>
                        </div>
                    </div>
                    <div class="loop-arrow">&#x21B3;</div>
                    <div class="timeline-row">
                        <div class="event-node" id="node-prevent">
                            <span class="event-icon">&#x1F6AB;</span>
                            <span class="event-label">Try to Prevent</span>
                        </div>
                        <span class="arrow">&#x2192;</span>
                        <div class="event-node" id="node-cause">
                            <span class="event-icon">&#x26A0;&#xFE0F;</span>
                            <span class="event-label">Accidentally Cause It</span>
                        </div>
                    </div>
                    <div class="loop-arrow">&#x21B0;</div>
                </div>
            </div>

            <div class="result" id="result">
                <p>Click "Run Time Loop" to see the paradox unfold...</p>
            </div>

            <div class="scenario-box">
                <div class="scenario-title">Classic Example: Oedipus</div>
                <div class="scenario-desc">
                    The prophecy says Oedipus will kill his father. His parents send him away to prevent this.
                    Being raised elsewhere, Oedipus doesn't recognize his father when they meet years later
                    and kills him in a fight. The prevention attempt caused the prophecy to come true.
                </div>
            </div>

            <div class="insight">
                In predestination paradoxes, the future is fixed. Any attempt to change it is already part of how events unfold. You were always destined to try - and fail.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#run-btn').addEventListener('click', () => this.runAnimation());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
    }

    runAnimation() {
        this.reset();
        const nodes = ['node-event', 'node-learn', 'node-travel', 'node-prevent', 'node-cause'];
        let i = 0;

        this.animationInterval = setInterval(() => {
            if (i > 0) {
                this.$(`#${nodes[i-1]}`).classList.remove('active');
                this.$(`#${nodes[i-1]}`).classList.add('paradox');
            }

            if (i < nodes.length) {
                this.$(`#${nodes[i]}`).classList.add('active');
                this.updateResult(i);
                i++;
            } else {
                clearInterval(this.animationInterval);
                nodes.forEach(n => {
                    this.$(`#${n}`).classList.remove('active');
                    this.$(`#${n}`).classList.add('paradox');
                });
                this.$('#result').innerHTML = `
                    <p style="color: var(--accent);"><strong>CLOSED LOOP!</strong></p>
                    <p>Your attempt to prevent the event WAS the cause of the event.</p>
                    <p>The loop has no beginning - it simply exists, self-causing and self-fulfilling.</p>
                `;
            }
        }, 1000);
    }

    updateResult(step) {
        const messages = [
            'A disaster occurs in the past...',
            'In the future, you learn about this tragic event...',
            'You travel back in time to prevent it...',
            'You try to stop it from happening...',
            'But your actions accidentally CAUSE the very event!'
        ];
        this.$('#result').innerHTML = `<p>${messages[step]}</p>`;
    }

    reset() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
        }
        const nodes = ['node-event', 'node-learn', 'node-travel', 'node-prevent', 'node-cause'];
        nodes.forEach(n => {
            this.$(`#${n}`).classList.remove('active', 'paradox');
        });
        this.$('#result').innerHTML = '<p>Click "Run Time Loop" to see the paradox unfold...</p>';
    }

    cleanup() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
        }
    }
}

customElements.define('predestination-simulator', PredestinationSimulator);

export { PredestinationSimulator };
