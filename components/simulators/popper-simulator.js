/**
 * Karl Popper Paradox Simulator
 * A tolerant society cannot tolerate intolerance
 */
import { SimulatorBase } from '../simulator-base.js';

class PopperSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .choice-buttons {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 1rem;
                }

                .choice-buttons button {
                    flex: 1;
                }

                .choice-buttons button.active-tolerate {
                    background: #ef4444;
                }

                .choice-buttons button.active-reject {
                    background: #22c55e;
                }

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

                .society-viz {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin: 1rem 0;
                    text-align: center;
                }

                .population {
                    font-size: 2rem;
                    margin: 1rem 0;
                    line-height: 1.5;
                }

                .timeline {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 1rem;
                    padding-top: 1rem;
                    border-top: 1px solid var(--muted, #94a3b8);
                }

                .timeline-step {
                    text-align: center;
                    flex: 1;
                }

                .timeline-icon {
                    font-size: 1.5rem;
                }

                .timeline-label {
                    font-size: 0.625rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                @media (max-width: 600px) {
                    .choice-buttons {
                        flex-direction: column;
                    }
                }
            </style>

            <h4>Tolerance Dilemma</h4>

            <div class="choice-buttons">
                <button id="tolerate-btn">Tolerate Intolerance</button>
                <button id="reject-btn">Reject Intolerance</button>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="pop-action">-</div>
                    <div class="stat-label">Action</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="pop-outcome">-</div>
                    <div class="stat-label">Long-term Outcome</div>
                </div>
            </div>

            <div class="society-viz" id="society-viz">
                <div style="color: var(--muted);">What should a tolerant society do?</div>
                <div class="population" id="population">&#x1F465; &#x1F465; &#x1F465; &#x1F465; &#x1F465;</div>
            </div>

            <div class="result" id="popper-result">
                <p>Choose an approach to see the consequences...</p>
            </div>

            <div class="insight">
                Popper: "We should claim the right to suppress the intolerant if necessary. In the name of tolerance, we should claim the right not to tolerate the intolerant."
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#tolerate-btn').addEventListener('click', () => this.setChoice('tolerate'));
        this.$('#reject-btn').addEventListener('click', () => this.setChoice('reject'));
    }

    setChoice(choice) {
        this.$('#tolerate-btn').classList.remove('active-tolerate');
        this.$('#reject-btn').classList.remove('active-reject');

        if (choice === 'tolerate') {
            this.$('#tolerate-btn').classList.add('active-tolerate');
            this.$('#pop-action').textContent = 'Allow all';
            this.$('#pop-action').style.color = '#ef4444';
            this.$('#pop-outcome').textContent = 'Loss';
            this.$('#pop-outcome').style.color = '#ef4444';

            this.$('#society-viz').innerHTML = `
                <div style="color: #ef4444;">Over time, the intolerant gain power...</div>
                <div class="population">\u{1F608} \u{1F608} \u{1F608} \u{1F608} \u{1F608}</div>
                <div class="timeline">
                    <div class="timeline-step">
                        <div class="timeline-icon">\u{1F465}</div>
                        <div class="timeline-label">Start: Tolerant</div>
                    </div>
                    <div class="timeline-step">
                        <div class="timeline-icon">\u{1F465}\u{1F608}</div>
                        <div class="timeline-label">Intolerant grow</div>
                    </div>
                    <div class="timeline-step">
                        <div class="timeline-icon">\u{1F608}\u{1F608}\u{1F608}</div>
                        <div class="timeline-label">Dominate</div>
                    </div>
                </div>
            `;

            this.$('#popper-result').innerHTML = '<p style="color: #ef4444;">If we extend unlimited tolerance to those who are intolerant, they will eventually destroy tolerance. The tolerant will be dominated by the intolerant.</p>';
        } else {
            this.$('#reject-btn').classList.add('active-reject');
            this.$('#pop-action').textContent = 'Set limits';
            this.$('#pop-action').style.color = '#22c55e';
            this.$('#pop-outcome').textContent = 'Preserved';
            this.$('#pop-outcome').style.color = '#22c55e';

            this.$('#society-viz').innerHTML = `
                <div style="color: #22c55e;">Tolerance is preserved through vigilance...</div>
                <div class="population">\u{1F465} \u{1F465} \u{1F465} \u{1F465} \u{1F465}</div>
                <div class="timeline">
                    <div class="timeline-step">
                        <div class="timeline-icon">\u{1F465}</div>
                        <div class="timeline-label">Start: Tolerant</div>
                    </div>
                    <div class="timeline-step">
                        <div class="timeline-icon">\u{1F6AB}</div>
                        <div class="timeline-label">Reject intolerance</div>
                    </div>
                    <div class="timeline-step">
                        <div class="timeline-icon">\u{1F465}</div>
                        <div class="timeline-label">Tolerance preserved</div>
                    </div>
                </div>
            `;

            this.$('#popper-result').innerHTML = '<p style="color: var(--accent);">A tolerant society must be intolerant of intolerance - not through suppression of speech, but by refusing to engage with intolerant arguments in good faith.</p>';
        }
    }
}

customElements.define('popper-simulator', PopperSimulator);

export { PopperSimulator };
