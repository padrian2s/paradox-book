/**
 * Sleeping Beauty Paradox Simulator
 * Sleeping Beauty is woken and asked the probability the coin was heads. Is it 1/2 or 1/3?
 */
import { SimulatorBase } from '../simulator-base.js';

class SleepingBeautySimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .experiment-viz {
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    padding: 1.5rem;
                    margin: 1rem 0;
                }

                .timeline {
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    margin-bottom: 1rem;
                }

                .day {
                    text-align: center;
                    padding: 0.5rem 1rem;
                    border-radius: 0.5rem;
                    background: var(--card, #1e293b);
                }

                .day-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }

                .day-icon {
                    font-size: 1.5rem;
                    margin: 0.25rem 0;
                }

                .coin-result {
                    font-size: 1.25rem;
                    font-weight: bold;
                    text-align: center;
                    margin: 1rem 0;
                    padding: 0.5rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                }

                .view-buttons {
                    display: flex;
                    gap: 0.5rem;
                    margin-top: 1rem;
                }

                .view-buttons button {
                    flex: 1;
                }

                .view-buttons button.halfer {
                    background: var(--primary, #6366f1);
                }

                .view-buttons button.thirder {
                    background: var(--accent, #f59e0b);
                }

                .probability-display {
                    display: flex;
                    justify-content: center;
                    gap: 2rem;
                    margin: 1rem 0;
                }

                .prob-option {
                    text-align: center;
                    padding: 1rem;
                    border-radius: 0.5rem;
                    background: var(--card, #1e293b);
                    min-width: 80px;
                }

                .prob-value {
                    font-size: 2rem;
                    font-weight: bold;
                }

                .prob-value.halfer {
                    color: var(--primary, #6366f1);
                }

                .prob-value.thirder {
                    color: var(--accent, #f59e0b);
                }

                .prob-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }
            </style>

            <h4>The Experiment</h4>

            <div class="controls">
                <button id="run-btn">Run Experiment</button>
            </div>

            <div class="experiment-viz">
                <div class="timeline">
                    <div class="day">
                        <div class="day-label">Sunday</div>
                        <div class="day-icon">&#x1FA99;</div>
                        <div class="day-label">Coin Flip</div>
                    </div>
                    <div class="day">
                        <div class="day-label">Monday</div>
                        <div class="day-icon">&#x1F634;</div>
                        <div class="day-label">Wake #1</div>
                    </div>
                    <div class="day" id="tuesday">
                        <div class="day-label">Tuesday</div>
                        <div class="day-icon">&#x2753;</div>
                        <div class="day-label">Wake #2?</div>
                    </div>
                </div>

                <div class="coin-result" id="coin-result">
                    <strong>Setup:</strong> Heads = wake Monday only. Tails = wake Monday AND Tuesday (memory wiped).
                </div>
            </div>

            <div class="probability-display">
                <div class="prob-option">
                    <div class="prob-value halfer">1/2</div>
                    <div class="prob-label">Halfer View</div>
                </div>
                <div class="prob-option">
                    <div class="prob-value thirder">1/3</div>
                    <div class="prob-label">Thirder View</div>
                </div>
            </div>

            <div class="view-buttons">
                <button id="halfer-btn" class="halfer">I'm a Halfer (1/2)</button>
                <button id="thirder-btn" class="thirder">I'm a Thirder (1/3)</button>
            </div>

            <div class="result" id="result">
                <p>When Beauty wakes up, what probability should she assign to "the coin landed heads"?</p>
            </div>

            <div class="insight">
                Philosophers still debate this! Both 1/2 and 1/3 have valid arguments. It depends on how you interpret "probability" and "credence."
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#run-btn').addEventListener('click', () => this.runExperiment());
        this.$('#halfer-btn').addEventListener('click', () => this.showView('halfer'));
        this.$('#thirder-btn').addEventListener('click', () => this.showView('thirder'));
    }

    runExperiment() {
        const isHeads = Math.random() > 0.5;
        const tuesday = this.$('#tuesday');

        if (isHeads) {
            tuesday.querySelector('.day-icon').textContent = '(asleep)';
            tuesday.style.opacity = '0.4';
            this.$('#coin-result').innerHTML = `<strong>Coin is: HEADS</strong> - Beauty wakes only on Monday`;
        } else {
            tuesday.querySelector('.day-icon').textContent = '(woken)';
            tuesday.style.opacity = '1';
            this.$('#coin-result').innerHTML = `<strong>Coin is: TAILS</strong> - Beauty wakes Monday AND Tuesday`;
        }

        this.$('#result').innerHTML = `
            <p>Beauty wakes up (she doesn't know if it's Monday or Tuesday).</p>
            <p>She is asked: <strong>"What is the probability the coin landed HEADS?"</strong></p>
            <p style="color: var(--accent);">What should she answer?</p>
        `;
    }

    showView(view) {
        if (view === 'halfer') {
            this.$('#result').innerHTML = `
                <p style="color: var(--primary);"><strong>Halfer Argument (P = 1/2):</strong></p>
                <p>The coin was fair - 50/50. Being woken doesn't give new information about the coin flip.</p>
                <p>Beauty knew she would be woken regardless of the outcome. Her credence should match the objective probability: <strong>1/2</strong>.</p>
            `;
        } else {
            this.$('#result').innerHTML = `
                <p style="color: var(--accent);"><strong>Thirder Argument (P = 1/3):</strong></p>
                <p>There are 3 possible "awakening events": Monday-Heads, Monday-Tails, Tuesday-Tails.</p>
                <p>She's in one of these 3 equally likely situations. Only 1 of 3 is Heads.</p>
                <p>Therefore P(Heads) = <strong>1/3</strong>.</p>
            `;
        }
    }
}

customElements.define('sleeping-beauty-simulator', SleepingBeautySimulator);

export { SleepingBeautySimulator };
