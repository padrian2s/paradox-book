/**
 * Open Source Paradox Simulator
 * Companies give away code for free, yet make billions
 */
import { SimulatorBase } from '../simulator-base.js';

class OpenSourceSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

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

                .model-examples {
                    margin-top: 1rem;
                    padding: 1rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                }

                .example-company {
                    display: flex;
                    justify-content: space-between;
                    padding: 0.5rem 0;
                    border-bottom: 1px solid var(--muted, #94a3b8);
                    font-size: 0.875rem;
                }

                .example-company:last-child {
                    border-bottom: none;
                }

                .company-name {
                    color: var(--text, #e2e8f0);
                }

                .company-revenue {
                    color: var(--accent, #f59e0b);
                    font-weight: bold;
                }
            </style>

            <h4>Business Model Explorer</h4>

            <div class="controls">
                <div class="control-group">
                    <label>Business Model</label>
                    <select id="oss-model">
                        <option value="support">Support/Consulting</option>
                        <option value="saas">SaaS (Hosted)</option>
                        <option value="opencore">Open Core</option>
                        <option value="dual">Dual Licensing</option>
                    </select>
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="oss-free">100%</div>
                    <div class="stat-label">Code Free</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="oss-rev">Services</div>
                    <div class="stat-label">Revenue Source</div>
                </div>
            </div>

            <div class="result" id="oss-result">
                <p>Red Hat model: Code is free, expertise is valuable.</p>
            </div>

            <div class="model-examples" id="model-examples">
                <div class="example-company">
                    <span class="company-name">Red Hat</span>
                    <span class="company-revenue">$3.4B/year</span>
                </div>
                <div class="example-company">
                    <span class="company-name">Canonical (Ubuntu)</span>
                    <span class="company-revenue">$200M/year</span>
                </div>
            </div>

            <div class="insight">
                The paradox: Giving away your product creates more value than selling it. Users become contributors, and the ecosystem multiplies value.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#oss-model').addEventListener('change', () => this.updateModel());
        this.updateModel();
    }

    updateModel() {
        const model = this.$('#oss-model').value;
        const data = {
            support: {
                free: '100%',
                rev: 'Services',
                desc: 'Red Hat: Code free, expertise costs. Enterprise support, training, and consulting.',
                examples: [
                    { name: 'Red Hat', revenue: '$3.4B/year' },
                    { name: 'Canonical (Ubuntu)', revenue: '$200M/year' }
                ]
            },
            saas: {
                free: '100%',
                rev: 'Hosting',
                desc: 'GitLab/GitHub: Run yourself free, or pay us to host and manage it.',
                examples: [
                    { name: 'GitHub', revenue: '$1B+/year' },
                    { name: 'GitLab', revenue: '$500M/year' }
                ]
            },
            opencore: {
                free: '80%',
                rev: 'Premium',
                desc: 'Elastic: Core free, advanced features (security, monitoring) paid.',
                examples: [
                    { name: 'Elastic', revenue: '$1.2B/year' },
                    { name: 'MongoDB', revenue: '$1.6B/year' }
                ]
            },
            dual: {
                free: '100%*',
                rev: 'Licenses',
                desc: 'MySQL: Free for open source, commercial license for proprietary use.',
                examples: [
                    { name: 'MySQL (Oracle)', revenue: 'Part of $40B' },
                    { name: 'Qt', revenue: '$100M+/year' }
                ]
            }
        };

        const d = data[model];
        this.$('#oss-free').textContent = d.free;
        this.$('#oss-rev').textContent = d.rev;
        this.$('#oss-result').innerHTML = `<p>${d.desc}</p>`;

        this.$('#model-examples').innerHTML = d.examples.map(e => `
            <div class="example-company">
                <span class="company-name">${e.name}</span>
                <span class="company-revenue">${e.revenue}</span>
            </div>
        `).join('');
    }
}

customElements.define('opensource-simulator', OpenSourceSimulator);

export { OpenSourceSimulator };
