import { SimulatorBase } from '../simulator-base.js';

class HitlerMurderSimulator extends SimulatorBase {
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
                }

                .timeline {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    margin: 1rem 0;
                }

                .timeline-row {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                    justify-content: center;
                }

                .event-box {
                    padding: 0.75rem 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    text-align: center;
                    min-width: 120px;
                    transition: all 0.3s ease;
                    border: 2px solid transparent;
                }

                .event-box.active {
                    border-color: var(--primary, #6366f1);
                    background: var(--primary, #6366f1);
                }

                .event-box.success {
                    border-color: #22c55e;
                    background: #22c55e;
                }

                .event-box.erased {
                    opacity: 0.3;
                    text-decoration: line-through;
                    border-color: #dc2626;
                }

                .event-box.paradox {
                    border-color: #dc2626;
                    animation: pulse-red 1s infinite;
                }

                @keyframes pulse-red {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.4); }
                    50% { box-shadow: 0 0 0 10px rgba(220, 38, 38, 0); }
                }

                .event-icon {
                    font-size: 1.5rem;
                }

                .event-label {
                    font-size: 0.75rem;
                    margin-top: 0.25rem;
                    color: var(--text, #e2e8f0);
                }

                .arrow {
                    font-size: 1.25rem;
                    color: var(--primary, #6366f1);
                }

                .loop-indicator {
                    text-align: center;
                    font-size: 2rem;
                    color: var(--accent, #f59e0b);
                    margin: 0.5rem 0;
                }

                .logic-chain {
                    padding: 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .logic-step {
                    padding: 0.5rem 0;
                    border-bottom: 1px solid rgba(148, 163, 184, 0.2);
                    font-size: 0.875rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .logic-step:last-child {
                    border-bottom: none;
                }

                .logic-num {
                    width: 24px;
                    height: 24px;
                    background: var(--primary, #6366f1);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.75rem;
                    font-weight: bold;
                    flex-shrink: 0;
                }

                @media (max-width: 600px) {
                    .event-box {
                        min-width: 90px;
                        padding: 0.5rem;
                    }
                }
            </style>

            <h4>Hitler Murder Paradox</h4>
            <p style="color: var(--muted); margin-bottom: 1rem;">A specific instance of the temporal paradox applied to preventing historical atrocities.</p>

            <div class="controls">
                <button id="run-btn">Attempt Prevention</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="scenario-container">
                <div class="timeline">
                    <div class="timeline-row">
                        <div class="event-box" id="node-war">
                            <div class="event-icon">&#x1F4A3;</div>
                            <div class="event-label">WWII Happens</div>
                        </div>
                        <span class="arrow">&#x2192;</span>
                        <div class="event-box" id="node-know">
                            <div class="event-icon">&#x1F4DA;</div>
                            <div class="event-label">You Know History</div>
                        </div>
                        <span class="arrow">&#x2192;</span>
                        <div class="event-box" id="node-travel">
                            <div class="event-icon">&#x23F3;</div>
                            <div class="event-label">Travel to 1920s</div>
                        </div>
                    </div>
                    <div class="loop-indicator">&#x21B3;</div>
                    <div class="timeline-row">
                        <div class="event-box" id="node-prevent">
                            <div class="event-icon">&#x1F6AB;</div>
                            <div class="event-label">Prevent Rise</div>
                        </div>
                        <span class="arrow">&#x2192;</span>
                        <div class="event-box" id="node-result">
                            <div class="event-icon">&#x2753;</div>
                            <div class="event-label">Result?</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="result" id="result">
                <p>Click "Attempt Prevention" to see the logical chain...</p>
            </div>

            <div class="logic-chain" id="logic-chain" style="display: none;">
                <div class="logic-step"><span class="logic-num">1</span> If WWII never happens...</div>
                <div class="logic-step"><span class="logic-num">2</span> You never learn about it...</div>
                <div class="logic-step"><span class="logic-num">3</span> You have no reason to travel back...</div>
                <div class="logic-step"><span class="logic-num">4</span> You never prevent it...</div>
                <div class="logic-step"><span class="logic-num">5</span> So it happens after all...</div>
                <div class="logic-step"><span class="logic-num">&#x21BA;</span> Loop forever</div>
            </div>

            <div class="insight">
                This paradox illustrates why "fixing" history through time travel may be logically impossible. Successful prevention eliminates the motivation for prevention, creating an unresolvable causal loop.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#run-btn').addEventListener('click', () => this.runAnimation());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
    }

    runAnimation() {
        this.reset();
        const nodes = ['node-war', 'node-know', 'node-travel', 'node-prevent'];
        let i = 0;

        this.animationInterval = setInterval(() => {
            if (i < nodes.length) {
                this.$(`#${nodes[i]}`).classList.add('active');
                i++;
            } else if (i === nodes.length) {
                this.$('#node-result').classList.add('success');
                this.$('#node-result').querySelector('.event-icon').textContent = '\\u2705';
                this.$('#node-result').querySelector('.event-label').textContent = 'Success!';
                this.$('#result').innerHTML = '<p style="color: #22c55e;">You prevented the war! But wait...</p>';
                i++;
            } else {
                clearInterval(this.animationInterval);
                this.showParadox();
            }
        }, 800);
    }

    showParadox() {
        setTimeout(() => {
            this.$('#node-war').classList.remove('active');
            this.$('#node-war').classList.add('erased');
        }, 300);

        setTimeout(() => {
            this.$('#node-know').classList.remove('active');
            this.$('#node-know').classList.add('erased');
        }, 600);

        setTimeout(() => {
            this.$('#node-travel').classList.remove('active');
            this.$('#node-travel').classList.add('erased');
        }, 900);

        setTimeout(() => {
            this.$('#node-prevent').classList.remove('active');
            this.$('#node-prevent').classList.add('erased');
        }, 1200);

        setTimeout(() => {
            this.$('#node-result').classList.remove('success');
            this.$('#node-result').classList.add('paradox');
            this.$('#node-result').querySelector('.event-icon').textContent = '\\u1F300';
            this.$('#node-result').querySelector('.event-label').textContent = 'PARADOX';

            this.$('#logic-chain').style.display = 'block';

            this.$('#result').innerHTML = `
                <p style="color: #dc2626;"><strong>LOGICAL IMPOSSIBILITY!</strong></p>
                <p>By succeeding, you erase the very reason you traveled back in time.</p>
                <p>The event is both prevented and not prevented simultaneously.</p>
            `;
        }, 1500);
    }

    reset() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
        }
        const nodes = ['node-war', 'node-know', 'node-travel', 'node-prevent', 'node-result'];
        nodes.forEach(n => {
            this.$(`#${n}`).classList.remove('active', 'erased', 'success', 'paradox');
        });
        this.$('#node-result').querySelector('.event-icon').textContent = '\\u2753';
        this.$('#node-result').querySelector('.event-label').textContent = 'Result?';
        this.$('#logic-chain').style.display = 'none';
        this.$('#result').innerHTML = '<p>Click "Attempt Prevention" to see the logical chain...</p>';
    }

    cleanup() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
        }
    }
}

customElements.define('hitler-murder-simulator', HitlerMurderSimulator);

export { HitlerMurderSimulator };
