import { SimulatorBase } from '../simulator-base.js';

class FredkinSimulator extends SimulatorBase {
    constructor() {
        super();
        this.state = {
            similarity: 50,
            decisionTime: 0,
            importance: 50
        };
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .choice-viz {
                    background: var(--bg, #0f172a);
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    margin: 1rem 0;
                }

                .options-display {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 2rem;
                    margin: 1rem 0;
                }

                .option-box {
                    background: var(--card, #1e293b);
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    text-align: center;
                    min-width: 120px;
                    transition: all 0.3s;
                }

                .option-box.highlight {
                    border: 2px solid var(--primary, #6366f1);
                    transform: scale(1.05);
                }

                .option-icon {
                    font-size: 2.5rem;
                    margin-bottom: 0.5rem;
                }

                .vs-circle {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: var(--accent, #f59e0b);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                }

                .meters {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                    margin-top: 1.5rem;
                }

                .meter-box {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                }

                .meter-label {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                    margin-bottom: 0.5rem;
                }

                .meter-bar {
                    height: 20px;
                    background: var(--bg, #0f172a);
                    border-radius: 0.25rem;
                    overflow: hidden;
                }

                .meter-fill {
                    height: 100%;
                    transition: width 0.5s;
                    border-radius: 0.25rem;
                }

                .meter-value {
                    text-align: right;
                    font-size: 0.75rem;
                    margin-top: 0.25rem;
                    color: var(--muted, #94a3b8);
                }

                .graph-area {
                    margin-top: 1rem;
                    height: 150px;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    position: relative;
                    overflow: hidden;
                }

                .graph-line {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 100%;
                    background: linear-gradient(to right,
                        rgba(99, 102, 241, 0.3) 0%,
                        rgba(99, 102, 241, 0.8) 50%,
                        rgba(99, 102, 241, 0.3) 100%);
                    clip-path: polygon(0% 100%, 10% 90%, 30% 60%, 50% 10%, 70% 60%, 90% 90%, 100% 100%);
                }

                .graph-labels {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                .pointer {
                    position: absolute;
                    width: 2px;
                    height: 100%;
                    background: #ef4444;
                    transition: left 0.3s;
                }

                @media (max-width: 768px) {
                    .meters {
                        grid-template-columns: 1fr;
                    }
                    .options-display {
                        flex-direction: column;
                        gap: 1rem;
                    }
                }
            </style>

            <h4>Decision Time vs. Option Similarity</h4>

            <div class="controls">
                <div class="control-group">
                    <label>Option Similarity: <span id="sim-val">50</span>%</label>
                    <input type="range" id="similarity" min="0" max="100" value="50">
                </div>
                <button id="decide-btn">Try to Decide</button>
            </div>

            <div class="choice-viz">
                <div class="options-display">
                    <div class="option-box" id="option-a">
                        <div class="option-icon" id="icon-a">&#127828;</div>
                        <div id="label-a">Option A</div>
                    </div>
                    <div class="vs-circle">VS</div>
                    <div class="option-box" id="option-b">
                        <div class="option-icon" id="icon-b">&#127829;</div>
                        <div id="label-b">Option B</div>
                    </div>
                </div>

                <div class="meters">
                    <div class="meter-box">
                        <div class="meter-label">Decision Time</div>
                        <div class="meter-bar">
                            <div class="meter-fill" id="time-fill" style="width: 50%; background: linear-gradient(90deg, #22c55e, #f59e0b);"></div>
                        </div>
                        <div class="meter-value" id="time-value">Medium</div>
                    </div>
                    <div class="meter-box">
                        <div class="meter-label">Decision Importance</div>
                        <div class="meter-bar">
                            <div class="meter-fill" id="importance-fill" style="width: 50%; background: linear-gradient(90deg, #6366f1, #8b5cf6);"></div>
                        </div>
                        <div class="meter-value" id="importance-value">Medium</div>
                    </div>
                </div>

                <div class="graph-area">
                    <div class="graph-line"></div>
                    <div class="pointer" id="pointer" style="left: 50%;"></div>
                </div>
                <div class="graph-labels">
                    <span>Very Different</span>
                    <span>Decision Time</span>
                    <span>Very Similar</span>
                </div>
            </div>

            <div class="result">
                <p id="result-text">Adjust similarity to see how decision time changes inversely to importance.</p>
            </div>

            <div class="insight">
                Edward Fredkin: "The more equally attractive two alternatives seem, the harder it is to decide - yet the less the decision matters." We waste time on inconsequential choices!
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#similarity').addEventListener('input', () => this.updateDisplay());
        this.$('#decide-btn').addEventListener('click', () => this.simulateDecision());
        this.updateDisplay();
    }

    updateDisplay() {
        const similarity = parseInt(this.$('#similarity').value);
        this.$('#sim-val').textContent = similarity;

        const decisionTime = Math.pow(similarity / 100, 2) * 100;
        const importance = 100 - similarity;

        this.$('#time-fill').style.width = decisionTime + '%';
        this.$('#importance-fill').style.width = importance + '%';

        this.$('#pointer').style.left = similarity + '%';

        if (decisionTime < 30) {
            this.$('#time-value').textContent = 'Quick';
            this.$('#time-fill').style.background = '#22c55e';
        } else if (decisionTime < 70) {
            this.$('#time-value').textContent = 'Medium';
            this.$('#time-fill').style.background = 'linear-gradient(90deg, #22c55e, #f59e0b)';
        } else {
            this.$('#time-value').textContent = 'Agonizing';
            this.$('#time-fill').style.background = '#ef4444';
        }

        if (importance > 70) {
            this.$('#importance-value').textContent = 'High Stakes';
        } else if (importance > 30) {
            this.$('#importance-value').textContent = 'Medium';
        } else {
            this.$('#importance-value').textContent = 'Trivial';
        }

        if (similarity < 30) {
            this.$('#icon-a').textContent = '\uD83C\uDFE0';
            this.$('#icon-b').textContent = '\uD83C\uDFD5';
            this.$('#label-a').textContent = 'Buy House';
            this.$('#label-b').textContent = 'Go Camping';
        } else if (similarity < 60) {
            this.$('#icon-a').textContent = '\uD83C\uDF54';
            this.$('#icon-b').textContent = '\uD83C\uDF55';
            this.$('#label-a').textContent = 'Burger';
            this.$('#label-b').textContent = 'Pizza';
        } else if (similarity < 85) {
            this.$('#icon-a').textContent = '\uD83C\uDF7A';
            this.$('#icon-b').textContent = '\uD83C\uDF7B';
            this.$('#label-a').textContent = 'Beer A';
            this.$('#label-b').textContent = 'Beer B';
        } else {
            this.$('#icon-a').textContent = '\uD83D\uDD35';
            this.$('#icon-b').textContent = '\uD83D\uDD35';
            this.$('#label-a').textContent = 'Blue #1';
            this.$('#label-b').textContent = 'Blue #2';
        }
    }

    simulateDecision() {
        const similarity = parseInt(this.$('#similarity').value);
        const optionA = this.$('#option-a');
        const optionB = this.$('#option-b');

        optionA.classList.remove('highlight');
        optionB.classList.remove('highlight');

        const deliberationTime = Math.pow(similarity / 100, 2) * 3000 + 500;

        this.$('#result-text').innerHTML = '<span style="color: var(--accent);">Deliberating...</span>';

        setTimeout(() => {
            const choice = Math.random() > 0.5 ? 'A' : 'B';
            (choice === 'A' ? optionA : optionB).classList.add('highlight');

            const importance = 100 - similarity;
            let message;

            if (similarity > 80) {
                message = `<span style="color: #ef4444;">Spent ${(deliberationTime/1000).toFixed(1)}s deciding something that barely matters!</span><br>
                    The options were nearly identical - any choice was fine.`;
            } else if (similarity > 50) {
                message = `Took ${(deliberationTime/1000).toFixed(1)}s to decide. The choice has some importance (${importance.toFixed(0)}%).`;
            } else {
                message = `<span style="color: #22c55e;">Quick decision!</span> The options were different enough that one was clearly better.<br>
                    This decision mattered (${importance.toFixed(0)}% importance).`;
            }

            this.$('#result-text').innerHTML = message;
        }, deliberationTime);
    }
}

customElements.define('fredkin-simulator', FredkinSimulator);

export { FredkinSimulator };
