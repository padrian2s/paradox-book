/**
 * 2FA Backup Paradox Simulator
 * Security vs recoverability trade-off
 */
import { SimulatorBase } from '../simulator-base.js';

class TwofaBackupSimulator extends SimulatorBase {
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
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                }

                .security-high { color: #22c55e; }
                .security-medium { color: #f59e0b; }
                .security-low { color: #ef4444; }

                @media (max-width: 600px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>Security Trade-off Calculator</h4>

            <div class="controls">
                <div class="control-group">
                    <label>Backup Method:</label>
                    <select id="backup-method">
                        <option value="none">No Backup</option>
                        <option value="codes">Printed Backup Codes</option>
                        <option value="email">Email Recovery</option>
                        <option value="sms">SMS Recovery</option>
                        <option value="hardware">Second Hardware Key</option>
                    </select>
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="security">100%</div>
                    <div class="stat-label">Security Level</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="recovery">0%</div>
                    <div class="stat-label">Recovery Chance</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="effective">50%</div>
                    <div class="stat-label">Effective Protection</div>
                </div>
            </div>

            <div class="result" id="result">
                <p id="explanation">Without backups: Maximum security, but lose access if device is lost.</p>
            </div>

            <div class="insight">
                Perfect security and perfect recoverability are mutually exclusive. Every backup method introduces a potential attack vector.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#backup-method').addEventListener('change', () => this.calculate());
        this.calculate();
    }

    calculate() {
        const method = this.$('#backup-method').value;
        let security, recovery, explanation;

        switch(method) {
            case 'none':
                security = 100;
                recovery = 0;
                explanation = 'Maximum security, but lose your device = lose access forever. No backup means no weakness, but also no recovery.';
                break;
            case 'codes':
                security = 70;
                recovery = 80;
                explanation = 'Backup codes are just passwords on paper. Anyone who finds them bypasses your 2FA entirely. Store them in a safe?';
                break;
            case 'email':
                security = 40;
                recovery = 95;
                explanation = 'Email recovery means your email is now a single point of failure. Compromise email = compromise everything.';
                break;
            case 'sms':
                security = 30;
                recovery = 90;
                explanation = 'SMS is vulnerable to SIM swapping attacks. Attackers can port your number and receive your codes.';
                break;
            case 'hardware':
                security = 90;
                recovery = 70;
                explanation = 'A second hardware key maintains security but costs money, and you still need to store it somewhere safe.';
                break;
        }

        const effective = (security * 0.5 + recovery * 0.5);

        this.$('#security').textContent = security + '%';
        this.$('#recovery').textContent = recovery + '%';
        this.$('#effective').textContent = effective.toFixed(0) + '%';
        this.$('#explanation').textContent = explanation;

        const secEl = this.$('#security');
        secEl.className = 'stat-value';
        if (security >= 70) {
            secEl.classList.add('security-high');
        } else if (security >= 40) {
            secEl.classList.add('security-medium');
        } else {
            secEl.classList.add('security-low');
        }
    }
}

customElements.define('twofa-backup-simulator', TwofaBackupSimulator);

export { TwofaBackupSimulator };
