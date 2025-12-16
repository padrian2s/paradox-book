/**
 * Hispanic Paradox Simulator
 * Hispanic Americans live longer despite lower income and healthcare access
 */
import { SimulatorBase } from '../simulator-base.js';

class HispanicSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .comparison-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    margin: 1rem 0;
                }

                .demo-card {
                    padding: 1.5rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .demo-card.highlight {
                    border: 2px solid var(--accent, #f59e0b);
                }

                .demo-title {
                    font-weight: bold;
                    margin-bottom: 1rem;
                    color: var(--text, #e2e8f0);
                }

                .demo-stat {
                    margin: 0.75rem 0;
                }

                .stat-value {
                    font-size: 1.5rem;
                    font-weight: bold;
                }

                .stat-value.income {
                    color: var(--primary, #6366f1);
                }

                .stat-value.life {
                    color: #22c55e;
                }

                .stat-value.life.lower {
                    color: var(--muted, #94a3b8);
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }

                .paradox-highlight {
                    margin: 1.5rem 0;
                    padding: 1rem;
                    background: rgba(245, 158, 11, 0.1);
                    border: 1px solid var(--accent, #f59e0b);
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .paradox-text {
                    font-size: 1.25rem;
                    color: var(--accent, #f59e0b);
                }

                .factors-list {
                    margin-top: 1rem;
                }

                .factor {
                    display: flex;
                    align-items: flex-start;
                    gap: 0.75rem;
                    padding: 0.75rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    margin: 0.5rem 0;
                }

                .factor-icon {
                    font-size: 1.25rem;
                }

                .factor-content {
                    flex: 1;
                }

                .factor-title {
                    font-weight: bold;
                    font-size: 0.875rem;
                    color: var(--text, #e2e8f0);
                }

                .factor-desc {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                @media (max-width: 600px) {
                    .comparison-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>Health Outcomes Comparison</h4>

            <div class="comparison-grid">
                <div class="demo-card">
                    <div class="demo-title">White Americans</div>
                    <div class="demo-stat">
                        <div class="stat-value income">$74k</div>
                        <div class="stat-label">Median Household Income</div>
                    </div>
                    <div class="demo-stat">
                        <div class="stat-value life lower">78.8 yrs</div>
                        <div class="stat-label">Life Expectancy</div>
                    </div>
                </div>
                <div class="demo-card highlight">
                    <div class="demo-title">Hispanic Americans</div>
                    <div class="demo-stat">
                        <div class="stat-value income">$52k</div>
                        <div class="stat-label">Median Household Income</div>
                    </div>
                    <div class="demo-stat">
                        <div class="stat-value life">81.8 yrs</div>
                        <div class="stat-label">Life Expectancy</div>
                    </div>
                </div>
            </div>

            <div class="paradox-highlight">
                <div class="paradox-text">30% less income, but 3 years longer life!</div>
            </div>

            <div class="result">
                <p>The Hispanic Paradox: Despite lower socioeconomic status, Hispanic Americans have better health outcomes than expected. This contradicts the well-established link between wealth and health.</p>
            </div>

            <div class="factors-list">
                <div style="font-weight: bold; margin-bottom: 0.5rem; color: var(--text);">Possible Explanations:</div>

                <div class="factor">
                    <div class="factor-icon">&#x1F46A;</div>
                    <div class="factor-content">
                        <div class="factor-title">Family Support Networks</div>
                        <div class="factor-desc">Strong extended family ties provide social support and care for elderly</div>
                    </div>
                </div>

                <div class="factor">
                    <div class="factor-icon">&#x1F957;</div>
                    <div class="factor-content">
                        <div class="factor-title">Traditional Diet</div>
                        <div class="factor-desc">Less processed food, more beans, rice, vegetables, and home cooking</div>
                    </div>
                </div>

                <div class="factor">
                    <div class="factor-icon">&#x2708;&#xFE0F;</div>
                    <div class="factor-content">
                        <div class="factor-title">Healthy Immigrant Effect</div>
                        <div class="factor-desc">Immigrants tend to be healthier than average; self-selection bias</div>
                    </div>
                </div>

                <div class="factor">
                    <div class="factor-icon">&#x1F69A;</div>
                    <div class="factor-content">
                        <div class="factor-title">Salmon Bias</div>
                        <div class="factor-desc">Some return to home countries when ill, removing deaths from US statistics</div>
                    </div>
                </div>
            </div>

            <div class="insight">
                The paradox suggests that money isn't everything for health. Community, diet, and lifestyle factors may outweigh the advantages of higher income in certain contexts.
            </div>
        `;
    }

    setupEventListeners() {
    }
}

customElements.define('hispanic-simulator', HispanicSimulator);

export { HispanicSimulator };
