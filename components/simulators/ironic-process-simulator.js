import { SimulatorBase } from '../simulator-base.js';

class IronicProcessSimulator extends SimulatorBase {
    constructor() {
        super();
        this.thoughtCount = 0;
        this.timerInterval = null;
        this.timeRemaining = 30;
        this.targetThought = 'white bear';
        this.isRunning = false;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .experiment-container {
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    padding: 1.5rem;
                    text-align: center;
                    margin-top: 1rem;
                }

                .bear-icon {
                    font-size: 5rem;
                    margin-bottom: 1rem;
                    filter: grayscale(100%) brightness(2);
                }

                .instruction {
                    font-size: 1.25rem;
                    margin-bottom: 1rem;
                    color: var(--accent, #f59e0b);
                    font-weight: bold;
                }

                .timer {
                    font-size: 3rem;
                    font-weight: bold;
                    color: var(--primary, #6366f1);
                    margin: 1rem 0;
                }

                .thought-counter {
                    margin-top: 1rem;
                }

                .counter-label {
                    color: var(--muted, #94a3b8);
                    margin-bottom: 0.5rem;
                }

                .counter-value {
                    font-size: 2.5rem;
                    font-weight: bold;
                    color: #ef4444;
                }

                .ring-btn {
                    background: #ef4444 !important;
                    font-size: 1.1rem !important;
                    padding: 1rem 2rem !important;
                    margin-top: 1rem;
                }

                .ring-btn:hover {
                    background: #dc2626 !important;
                }

                .ring-btn:disabled {
                    background: var(--muted, #94a3b8) !important;
                    cursor: not-allowed;
                }

                .thought-log {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.25rem;
                    justify-content: center;
                    margin-top: 1rem;
                    min-height: 2rem;
                }

                .thought-mark {
                    font-size: 1.25rem;
                }

                .phase-indicator {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .phase {
                    padding: 0.5rem 1rem;
                    border-radius: 0.25rem;
                    background: var(--card, #1e293b);
                    font-size: 0.875rem;
                }

                .phase.active {
                    background: var(--primary, #6366f1);
                }

                .stats-row {
                    display: flex;
                    justify-content: center;
                    gap: 2rem;
                    margin-top: 1rem;
                }

                .stat-item {
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
                }

                @media (max-width: 768px) {
                    .bear-icon {
                        font-size: 3rem;
                    }

                    .timer {
                        font-size: 2rem;
                    }
                }
            </style>

            <h4>White Bear Suppression Experiment</h4>

            <div class="experiment-container">
                <div class="bear-icon">🐻‍❄️</div>
                <div class="instruction" id="instruction">Do NOT think about a white bear for 30 seconds</div>
                <div class="timer" id="timer">30</div>
                <div class="thought-counter">
                    <div class="counter-label">Times you thought about it:</div>
                    <div class="counter-value" id="thought-count">0</div>
                </div>
                <button class="ring-btn" id="ring-btn" disabled>I Thought About It!</button>
                <div class="thought-log" id="thought-log"></div>
            </div>

            <div class="phase-indicator">
                <div class="phase" id="phase-suppress">Suppression Phase</div>
                <div class="phase" id="phase-express">Expression Phase</div>
            </div>

            <div class="controls" style="margin-top: 1rem; justify-content: center;">
                <button id="start-btn">Start Experiment</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="stats-row">
                <div class="stat-item">
                    <div class="stat-value" id="suppress-count">-</div>
                    <div class="stat-label">Suppression Thoughts</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value" id="express-count">-</div>
                    <div class="stat-label">Expression Thoughts</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value" id="rebound-effect">-</div>
                    <div class="stat-label">Rebound Effect</div>
                </div>
            </div>

            <div class="result">
                <p id="result-text">Click "Start Experiment" to begin the classic white bear thought suppression study...</p>
            </div>

            <div class="insight">
                Daniel Wegner's 1987 study found that trying to suppress a thought makes it more likely to return - the "ironic rebound effect." The monitoring process that checks if we are thinking the forbidden thought actually keeps it accessible.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#start-btn').addEventListener('click', () => this.startExperiment());
        this.$('#ring-btn').addEventListener('click', () => this.recordThought());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
    }

    startExperiment() {
        this.isRunning = true;
        this.thoughtCount = 0;
        this.timeRemaining = 30;
        this.$('#thought-count').textContent = '0';
        this.$('#thought-log').innerHTML = '';
        this.$('#ring-btn').disabled = false;
        this.$('#start-btn').disabled = true;
        this.$('#phase-suppress').classList.add('active');
        this.$('#phase-express').classList.remove('active');
        this.$('#instruction').textContent = 'Do NOT think about a white bear for 30 seconds';

        this.timerInterval = setInterval(() => this.tick(), 1000);
    }

    tick() {
        this.timeRemaining--;
        this.$('#timer').textContent = this.timeRemaining;

        if (this.timeRemaining <= 0) {
            clearInterval(this.timerInterval);
            this.endPhase();
        }
    }

    recordThought() {
        if (!this.isRunning) return;

        this.thoughtCount++;
        this.$('#thought-count').textContent = this.thoughtCount;

        const mark = document.createElement('span');
        mark.className = 'thought-mark';
        mark.textContent = '🐻‍❄️';
        this.$('#thought-log').appendChild(mark);
    }

    endPhase() {
        const phase = this.$('#phase-suppress').classList.contains('active') ? 'suppress' : 'express';

        if (phase === 'suppress') {
            this.suppressCount = this.thoughtCount;
            this.$('#suppress-count').textContent = this.suppressCount;

            this.thoughtCount = 0;
            this.timeRemaining = 30;
            this.$('#thought-count').textContent = '0';
            this.$('#thought-log').innerHTML = '';
            this.$('#timer').textContent = '30';

            this.$('#phase-suppress').classList.remove('active');
            this.$('#phase-express').classList.add('active');
            this.$('#instruction').textContent = 'Now THINK about a white bear freely for 30 seconds';

            this.timerInterval = setInterval(() => this.tick(), 1000);
        } else {
            this.expressCount = this.thoughtCount;
            this.$('#express-count').textContent = this.expressCount;
            this.showResults();
        }
    }

    showResults() {
        this.isRunning = false;
        this.$('#ring-btn').disabled = true;
        this.$('#start-btn').disabled = false;

        let rebound = '-';
        let result = '';

        if (this.suppressCount > 0 && this.expressCount >= this.suppressCount) {
            const ratio = this.expressCount / Math.max(1, this.suppressCount);
            if (ratio >= 1.5) {
                rebound = 'STRONG';
                result = 'IRONIC REBOUND CONFIRMED: Suppression backfired! When allowed to think freely, the suppressed thought came back even stronger.';
            } else {
                rebound = 'MODERATE';
                result = 'Moderate rebound effect. Suppression made the thought somewhat more persistent.';
            }
        } else if (this.suppressCount === 0) {
            rebound = 'N/A';
            result = 'Impressive suppression! Either you have extraordinary mental control, or perhaps you were not fully engaged with the task.';
        } else {
            rebound = 'LOW';
            result = 'Low rebound effect. Suppression did not significantly increase intrusive thoughts in your case.';
        }

        this.$('#rebound-effect').textContent = rebound;
        this.$('#rebound-effect').style.color = rebound === 'STRONG' ? '#ef4444' : '#22c55e';
        this.$('#result-text').textContent = result;
        this.$('#instruction').textContent = 'Experiment complete!';
    }

    reset() {
        clearInterval(this.timerInterval);
        this.isRunning = false;
        this.thoughtCount = 0;
        this.timeRemaining = 30;
        this.suppressCount = undefined;
        this.expressCount = undefined;

        this.$('#timer').textContent = '30';
        this.$('#thought-count').textContent = '0';
        this.$('#thought-log').innerHTML = '';
        this.$('#ring-btn').disabled = true;
        this.$('#start-btn').disabled = false;
        this.$('#phase-suppress').classList.remove('active');
        this.$('#phase-express').classList.remove('active');
        this.$('#suppress-count').textContent = '-';
        this.$('#express-count').textContent = '-';
        this.$('#rebound-effect').textContent = '-';
        this.$('#instruction').textContent = 'Do NOT think about a white bear for 30 seconds';
        this.$('#result-text').textContent = 'Click "Start Experiment" to begin the classic white bear thought suppression study...';
    }
}

customElements.define('ironic-process-simulator', IronicProcessSimulator);

export { IronicProcessSimulator };
