/**
 * Vibe Coding Paradox Simulator
 * Demonstrates how AI amplifies both excellence and dysfunction
 */
import { SimulatorBase } from '../simulator-base.js';

class VibeCodingSimulator extends SimulatorBase {
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
                    background: var(--bg, #0f172a);
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

                .scenario-viz {
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    padding: 1.5rem;
                    margin-top: 1rem;
                }

                .scenario-comparison {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                }

                .scenario-option {
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    padding: 1rem;
                    text-align: center;
                    border: 2px solid transparent;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .scenario-option:hover {
                    border-color: var(--primary, #6366f1);
                }

                .scenario-option.selected {
                    border-color: var(--accent, #f59e0b);
                }

                .scenario-icon {
                    font-size: 2.5rem;
                    margin-bottom: 0.5rem;
                }

                .scenario-title {
                    font-weight: bold;
                    margin-bottom: 0.25rem;
                }

                .scenario-desc {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }

                .amplification-viz {
                    margin-top: 1.5rem;
                    padding: 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                }

                .amp-arrow {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                    font-size: 1.25rem;
                }

                .amp-input, .amp-output {
                    padding: 0.5rem 1rem;
                    border-radius: 0.25rem;
                    font-weight: bold;
                }

                .amp-input {
                    background: rgba(99, 102, 241, 0.2);
                }

                .amp-output {
                    background: rgba(245, 158, 11, 0.2);
                }

                @media (max-width: 768px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }

                    .scenario-comparison {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>System Ownership Test</h4>

            <div class="scenario-viz">
                <div class="scenario-comparison">
                    <div class="scenario-option" id="owned-option" data-type="owned">
                        <div class="scenario-icon">&#x1F3D7;</div>
                        <div class="scenario-title">Your Own System</div>
                        <div class="scenario-desc">You built it. You understand it. You have standards.</div>
                    </div>
                    <div class="scenario-option" id="inherited-option" data-type="inherited">
                        <div class="scenario-icon">&#x1F4E6;</div>
                        <div class="scenario-title">Inherited Codebase</div>
                        <div class="scenario-desc">1,100 lines of mystery. Deadline is tomorrow.</div>
                    </div>
                </div>

                <div class="amplification-viz" id="amp-viz" style="display: none;">
                    <div class="amp-arrow">
                        <span class="amp-input" id="amp-input">Input</span>
                        <span>&#x2192; AI &#x2192;</span>
                        <span class="amp-output" id="amp-output">Output</span>
                    </div>
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="vibe-friction">-</div>
                    <div class="stat-label">Friction Removed</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="vibe-quality">-</div>
                    <div class="stat-label">Code Quality</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="vibe-outcome">-</div>
                    <div class="stat-label">AI Effect</div>
                </div>
            </div>

            <div class="result">
                <p id="vibe-result"><strong>The Paradox:</strong> A 1,100-line React component needs fixing. Refactor properly = 2 hours. AI patch = 5 minutes. Which do you choose?</p>
            </div>

            <div class="insight">
                "Computers are amplifiers." AI doesn't improve broken systems - it scales dysfunction silently with clean, well-formatted code.
            </div>
        `;
    }

    setupEventListeners() {
        this.$$('.scenario-option').forEach(option => {
            option.addEventListener('click', () => {
                this.$$('.scenario-option').forEach(o => o.classList.remove('selected'));
                option.classList.add('selected');
                this.updateScenario(option.dataset.type);
            });
        });
    }

    updateScenario(type) {
        this.$('#amp-viz').style.display = 'block';

        if (type === 'owned') {
            this.$('#vibe-friction').textContent = 'High';
            this.$('#vibe-quality').textContent = 'Improved';
            this.$('#vibe-quality').style.color = '#22c55e';
            this.$('#vibe-outcome').textContent = 'Amplifies Care';
            this.$('#vibe-outcome').style.color = '#22c55e';

            this.$('#amp-input').textContent = 'Intent + Standards';
            this.$('#amp-input').style.background = 'rgba(34, 197, 94, 0.2)';
            this.$('#amp-output').textContent = 'Quality at Scale';
            this.$('#amp-output').style.background = 'rgba(34, 197, 94, 0.2)';

            this.$('#vibe-result').innerHTML = '<p style="color: var(--primary);"><strong>Your system:</strong> You have intentional constraints and standards. AI-generated code either aligns with them or gets caught immediately. AI amplifies your care and intent.</p>';
        } else {
            this.$('#vibe-friction').textContent = 'Very High';
            this.$('#vibe-quality').textContent = 'Unchanged';
            this.$('#vibe-quality').style.color = '#ef4444';
            this.$('#vibe-outcome').textContent = 'Scales Dysfunction';
            this.$('#vibe-outcome').style.color = '#ef4444';

            this.$('#amp-input').textContent = 'Chaos + Deadline';
            this.$('#amp-input').style.background = 'rgba(239, 68, 68, 0.2)';
            this.$('#amp-output').textContent = 'Formatted Chaos';
            this.$('#amp-output').style.background = 'rgba(239, 68, 68, 0.2)';

            this.$('#vibe-result').innerHTML = '<p style="color: #ef4444;"><strong>Inherited mess:</strong> AI becomes a shield against cognitive overload. You ship "beautifully formatted, semantically named dysfunction." The cost of caring exceeds the cost of being correct.</p>';
        }
    }
}

customElements.define('vibe-coding-simulator', VibeCodingSimulator);

export { VibeCodingSimulator };
