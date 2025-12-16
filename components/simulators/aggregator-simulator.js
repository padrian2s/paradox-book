/**
 * Aggregator Paradox Simulator
 * Platforms that aggregate content eventually control that content
 */
import { SimulatorBase } from '../simulator-base.js';

class AggregatorSimulator extends SimulatorBase {
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

                .power-high { color: #ef4444; }
                .power-medium { color: #f59e0b; }
                .power-low { color: #22c55e; }

                @media (max-width: 600px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>Platform Power Simulator</h4>

            <div class="controls">
                <div class="control-group" style="width: 100%;">
                    <label>Platform Maturity: <span id="maturity-val">1</span> years</label>
                    <input type="range" id="maturity" min="1" max="20" value="1" style="width: 100%;">
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="creators">1,000</div>
                    <div class="stat-label">Content Creators</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="power">10%</div>
                    <div class="stat-label">Platform Power</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="revenue">50%</div>
                    <div class="stat-label">Creator Revenue Share</div>
                </div>
            </div>

            <div class="result" id="result">
                <p>Year 1: Platform attracts creators by offering better distribution than alternatives.</p>
            </div>

            <div class="insight">
                Google, Facebook, Amazon all followed this pattern: aggregate to serve users, become essential, dictate terms to creators.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#maturity').addEventListener('input', () => this.update());
        this.update();
    }

    update() {
        const years = parseInt(this.$('#maturity').value);
        this.$('#maturity-val').textContent = years;

        const creators = Math.floor(1000 * Math.pow(1.5, years));
        const power = Math.min(95, 10 + years * 4.5);
        const revenue = Math.max(15, 50 - years * 2);

        this.$('#creators').textContent = creators.toLocaleString();
        this.$('#power').textContent = power.toFixed(0) + '%';
        this.$('#revenue').textContent = revenue.toFixed(0) + '%';

        const powerEl = this.$('#power');
        powerEl.className = 'stat-value';
        if (power > 70) {
            powerEl.classList.add('power-high');
        } else if (power > 40) {
            powerEl.classList.add('power-medium');
        } else {
            powerEl.classList.add('power-low');
        }

        const revenueEl = this.$('#revenue');
        revenueEl.className = 'stat-value';
        if (revenue < 25) {
            revenueEl.classList.add('power-high');
        } else if (revenue < 40) {
            revenueEl.classList.add('power-medium');
        } else {
            revenueEl.classList.add('power-low');
        }

        let explanation;
        if (years <= 3) {
            explanation = `Year ${years}: Platform attracts creators with generous terms. "We're just helping you reach audiences!"`;
        } else if (years <= 8) {
            explanation = `Year ${years}: Platform becomes dominant. Creators depend on it. Terms start shifting in platform's favor.`;
        } else if (years <= 15) {
            explanation = `Year ${years}: Platform controls discovery. Creators must pay for visibility. Revenue share drops.`;
        } else {
            explanation = `Year ${years}: Platform IS the market. Take it or leave it. Creators are commoditized suppliers.`;
        }
        this.$('#result').innerHTML = '<p>' + explanation + '</p>';
    }
}

customElements.define('aggregator-simulator', AggregatorSimulator);

export { AggregatorSimulator };
