/**
 * Service Recovery Paradox Simulator
 * Demonstrates that customers with resolved problems can be MORE satisfied
 */
import { SimulatorBase } from '../simulator-base.js';

class ServiceRecoverySimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .service-viz {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .customer-group {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .customer-group h5 {
                    width: 180px;
                    margin: 0;
                    font-size: 0.875rem;
                    color: var(--text, #e2e8f0);
                }

                .satisfaction-bar {
                    flex: 1;
                    height: 24px;
                    background: var(--card, #1e293b);
                    border-radius: 0.25rem;
                    overflow: hidden;
                }

                .bar-fill {
                    height: 100%;
                    background: var(--primary, #6366f1);
                    transition: width 0.5s ease;
                }

                .bar-fill.poor {
                    background: #ef4444;
                }

                .bar-fill.excellent {
                    background: #22c55e;
                }

                .customer-group span {
                    width: 50px;
                    text-align: right;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 1rem;
                    margin-top: 1rem;
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
                    color: var(--accent, #f59e0b);
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                @media (max-width: 768px) {
                    .service-viz {
                        padding: 1rem;
                    }

                    .customer-group {
                        flex-direction: column;
                        align-items: stretch;
                        gap: 0.25rem;
                    }

                    .customer-group h5 {
                        width: 100%;
                        font-size: 0.75rem;
                    }

                    .satisfaction-bar {
                        height: 20px;
                    }

                    .customer-group span {
                        width: 100%;
                        text-align: left;
                        font-size: 0.875rem;
                    }

                    .stats-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 0.5rem;
                    }

                    .stat-box {
                        padding: 0.5rem;
                    }

                    .stat-value {
                        font-size: 1.25rem;
                    }
                }
            </style>

            <h4>Customer Satisfaction Simulator</h4>

            <div class="controls">
                <div class="control-group">
                    <label>Recovery Quality: <span id="recovery-quality-val">80</span>%</label>
                    <input type="range" id="recovery-quality" min="0" max="100" value="80">
                </div>
                <button id="simulate-btn">Simulate 100 Customers</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="service-viz">
                <div class="customer-group">
                    <h5>No Problem</h5>
                    <div class="satisfaction-bar">
                        <div class="bar-fill" id="no-problem-bar" style="width: 75%"></div>
                    </div>
                    <span id="no-problem-score">75%</span>
                </div>
                <div class="customer-group">
                    <h5>Problem + Poor Recovery</h5>
                    <div class="satisfaction-bar">
                        <div class="bar-fill poor" id="poor-recovery-bar" style="width: 30%"></div>
                    </div>
                    <span id="poor-recovery-score">30%</span>
                </div>
                <div class="customer-group">
                    <h5>Problem + Great Recovery</h5>
                    <div class="satisfaction-bar">
                        <div class="bar-fill excellent" id="great-recovery-bar" style="width: 85%"></div>
                    </div>
                    <span id="great-recovery-score">85%</span>
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="srv-no-problem">0</div>
                    <div class="stat-label">No Problem</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="srv-poor">0</div>
                    <div class="stat-label">Poor Recovery</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="srv-great">0</div>
                    <div class="stat-label">Great Recovery</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="srv-paradox">-</div>
                    <div class="stat-label">Paradox Effect</div>
                </div>
            </div>

            <div class="result">
                <p id="service-result">The paradox occurs when recovery satisfaction exceeds baseline satisfaction. This creates loyal customers from failures!</p>
            </div>

            <div class="insight">
                Studies show that customers who experience a problem and receive excellent service recovery often become more loyal than those who never had a problem at all.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#recovery-quality').addEventListener('input', () => this.updateRecovery());
        this.$('#simulate-btn').addEventListener('click', () => this.simulateService());
        this.$('#reset-btn').addEventListener('click', () => this.resetService());
    }

    updateRecovery() {
        const quality = this.$('#recovery-quality').value;
        this.$('#recovery-quality-val').textContent = quality;
    }

    simulateService() {
        const recoveryQuality = parseInt(this.$('#recovery-quality').value);

        let noProblemTotal = 0, poorRecoveryTotal = 0, greatRecoveryTotal = 0;
        let noProblemCount = 0, poorCount = 0, greatCount = 0;

        for (let i = 0; i < 100; i++) {
            const hadProblem = Math.random() < 0.3;

            if (!hadProblem) {
                const satisfaction = 70 + Math.random() * 10;
                noProblemTotal += satisfaction;
                noProblemCount++;
            } else {
                const goodRecovery = Math.random() * 100 < recoveryQuality;
                if (goodRecovery) {
                    const satisfaction = 80 + Math.random() * 15;
                    greatRecoveryTotal += satisfaction;
                    greatCount++;
                } else {
                    const satisfaction = 20 + Math.random() * 20;
                    poorRecoveryTotal += satisfaction;
                    poorCount++;
                }
            }
        }

        const noProblemAvg = noProblemCount > 0 ? (noProblemTotal / noProblemCount).toFixed(0) : 0;
        const poorAvg = poorCount > 0 ? (poorRecoveryTotal / poorCount).toFixed(0) : 0;
        const greatAvg = greatCount > 0 ? (greatRecoveryTotal / greatCount).toFixed(0) : 0;

        this.$('#no-problem-bar').style.width = noProblemAvg + '%';
        this.$('#no-problem-score').textContent = noProblemAvg + '%';
        this.$('#poor-recovery-bar').style.width = poorAvg + '%';
        this.$('#poor-recovery-score').textContent = poorAvg + '%';
        this.$('#great-recovery-bar').style.width = greatAvg + '%';
        this.$('#great-recovery-score').textContent = greatAvg + '%';

        this.$('#srv-no-problem').textContent = noProblemCount;
        this.$('#srv-poor').textContent = poorCount;
        this.$('#srv-great').textContent = greatCount;

        const paradoxEffect = greatAvg > noProblemAvg;
        this.$('#srv-paradox').textContent = paradoxEffect ? 'Yes!' : 'No';
        this.$('#srv-paradox').style.color = paradoxEffect ? '#22c55e' : '#ef4444';

        if (paradoxEffect) {
            this.$('#service-result').innerHTML =
                `<strong style="color: #22c55e;">PARADOX CONFIRMED!</strong> Customers with problems + great recovery (${greatAvg}%) are MORE satisfied than those with no problems (${noProblemAvg}%)!`;
        } else {
            this.$('#service-result').innerHTML =
                `No paradox this time. Baseline satisfaction (${noProblemAvg}%) beats recovery satisfaction (${greatAvg}%). Try increasing recovery quality!`;
        }
    }

    resetService() {
        this.$('#no-problem-bar').style.width = '75%';
        this.$('#no-problem-score').textContent = '75%';
        this.$('#poor-recovery-bar').style.width = '30%';
        this.$('#poor-recovery-score').textContent = '30%';
        this.$('#great-recovery-bar').style.width = '85%';
        this.$('#great-recovery-score').textContent = '85%';
        this.$('#srv-no-problem').textContent = '0';
        this.$('#srv-poor').textContent = '0';
        this.$('#srv-great').textContent = '0';
        this.$('#srv-paradox').textContent = '-';
        this.$('#srv-paradox').style.color = '';
        this.$('#service-result').textContent = 'The paradox occurs when recovery satisfaction exceeds baseline satisfaction. This creates loyal customers from failures!';
    }
}

customElements.define('service-recovery-simulator', ServiceRecoverySimulator);

export { ServiceRecoverySimulator };
