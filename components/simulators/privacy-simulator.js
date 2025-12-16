/**
 * Privacy Paradox Simulator
 * Demonstrates the gap between stated privacy values and actual behavior
 */
import { SimulatorBase } from '../simulator-base.js';

class PrivacySimulator extends SimulatorBase {
    constructor() {
        super();
        this.stats = { shared: 0, protected: 0, scenario: 0 };
        this.scenarios = [
            { icon: '📱', text: 'A free app wants access to your contacts, location, and browsing history.', reward: 'Free photo editing' },
            { icon: '🎁', text: 'Store offers 10% discount if you share your purchase history and email.', reward: '10% off next purchase' },
            { icon: '🎮', text: 'Game wants access to your friend list and will post on your behalf.', reward: 'Free premium features' },
            { icon: '📧', text: 'Newsletter promises exclusive content if you share your profile data.', reward: 'Exclusive articles' },
            { icon: '🏪', text: 'Grocery store tracks all purchases for personalized coupons.', reward: '$5 off groceries' },
            { icon: '🚗', text: 'Insurance offers lower rates if you install driving monitoring app.', reward: '15% rate reduction' }
        ];
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .privacy-scenario {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .scenario-card {
                    text-align: center;
                }

                .scenario-icon {
                    font-size: 3rem;
                    margin-bottom: 1rem;
                }

                .scenario-text {
                    margin-bottom: 1rem;
                    line-height: 1.5;
                }

                .scenario-reward {
                    color: #22c55e;
                    font-weight: bold;
                }

                .accept-btn {
                    background: #22c55e !important;
                }

                .decline-btn {
                    background: #6366f1 !important;
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
                    font-size: 1.25rem;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                @media (max-width: 768px) {
                    .stats-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }

                    .controls {
                        flex-direction: column;
                    }

                    .controls button {
                        width: 100%;
                    }
                }
            </style>

            <h4>Data Sharing Decision Game</h4>

            <div class="privacy-scenario">
                <div class="scenario-card">
                    <div class="scenario-icon" id="scenario-icon">📱</div>
                    <div class="scenario-text" id="scenario-text">A new app offers you a free service. It asks for access to your contacts, location, and browsing history.</div>
                    <div class="scenario-reward" id="scenario-reward">Reward: Free photo editing</div>
                </div>
            </div>

            <div class="controls" style="margin-top: 1rem;">
                <button id="accept-btn" class="accept-btn">Accept & Share Data</button>
                <button id="decline-btn" class="decline-btn">Decline & Protect Privacy</button>
                <button id="next-btn">Next Scenario</button>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="privacy-stated">High</div>
                    <div class="stat-label">Stated Privacy Value</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="privacy-shared">0</div>
                    <div class="stat-label">Data Shared</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="privacy-protected">0</div>
                    <div class="stat-label">Data Protected</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="privacy-paradox-pct">-</div>
                    <div class="stat-label">Paradox Score</div>
                </div>
            </div>

            <div class="result">
                <p id="privacy-result">Make choices to see if your behavior matches your stated values...</p>
            </div>

            <div class="insight">
                Studies show ~90% of people say privacy is important, but ~70% trade it for minor conveniences. The gap between stated preference and revealed preference is the paradox.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#accept-btn').addEventListener('click', () => this.privacyChoice('accept'));
        this.$('#decline-btn').addEventListener('click', () => this.privacyChoice('decline'));
        this.$('#next-btn').addEventListener('click', () => this.nextPrivacyScenario());

        this.nextPrivacyScenario();
    }

    privacyChoice(choice) {
        if (choice === 'accept') {
            this.stats.shared++;
        } else {
            this.stats.protected++;
        }

        this.$('#privacy-shared').textContent = this.stats.shared;
        this.$('#privacy-protected').textContent = this.stats.protected;

        const total = this.stats.shared + this.stats.protected;
        const shareRate = total > 0 ? Math.round((this.stats.shared / total) * 100) : 0;
        this.$('#privacy-paradox-pct').textContent = shareRate + '%';

        let result = '';
        if (shareRate > 60) {
            result = `PARADOX DETECTED: You share data ${shareRate}% of the time despite "valuing privacy." Your revealed preference differs from stated preference!`;
        } else if (shareRate > 30) {
            result = `Mixed behavior: ${shareRate}% sharing rate. You sometimes trade privacy for convenience - a common human pattern.`;
        } else {
            result = `Consistent: ${shareRate}% sharing rate. Your behavior matches your stated privacy values. You're in the minority!`;
        }
        this.$('#privacy-result').textContent = result;

        this.nextPrivacyScenario();
    }

    nextPrivacyScenario() {
        this.stats.scenario = (this.stats.scenario + 1) % this.scenarios.length;
        const s = this.scenarios[this.stats.scenario];
        this.$('#scenario-icon').textContent = s.icon;
        this.$('#scenario-text').textContent = s.text;
        this.$('#scenario-reward').textContent = 'Reward: ' + s.reward;
    }
}

customElements.define('privacy-simulator', PrivacySimulator);

export { PrivacySimulator };
