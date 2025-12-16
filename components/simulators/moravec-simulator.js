/**
 * Moravec's Paradox Simulator
 * Demonstrates how easy tasks for humans are hard for AI and vice versa
 */
import { SimulatorBase } from '../simulator-base.js';

class MoravecSimulator extends SimulatorBase {
    constructor() {
        super();
        this.tasks = [
            { name: 'Walking on uneven terrain', humanDiff: 10, aiDiff: 95 },
            { name: 'Recognizing faces', humanDiff: 20, aiDiff: 70 },
            { name: 'Understanding sarcasm', humanDiff: 30, aiDiff: 85 },
            { name: 'Common sense reasoning', humanDiff: 50, aiDiff: 70 },
            { name: 'Chess (grandmaster level)', humanDiff: 85, aiDiff: 5 },
            { name: 'Complex calculations', humanDiff: 90, aiDiff: 3 },
            { name: 'Searching billions of records', humanDiff: 95, aiDiff: 2 }
        ];
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .moravec-chart {
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    padding: 1rem;
                    margin-top: 1rem;
                }

                .moravec-row {
                    display: grid;
                    grid-template-columns: 180px 1fr;
                    gap: 0.5rem;
                    align-items: center;
                    padding: 0.5rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.25rem;
                    margin-bottom: 0.5rem;
                }

                .moravec-label {
                    font-size: 0.875rem;
                }

                .moravec-bars {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .moravec-bar {
                    height: 16px;
                    border-radius: 3px;
                    display: flex;
                    align-items: center;
                    padding-left: 0.5rem;
                    font-size: 0.7rem;
                    color: white;
                    transition: width 0.5s;
                }

                .moravec-human {
                    background: linear-gradient(90deg, #22c55e, #84cc16);
                }

                .moravec-ai {
                    background: linear-gradient(90deg, #6366f1, #8b5cf6);
                }

                .legend {
                    display: flex;
                    gap: 1.5rem;
                    justify-content: center;
                    margin-top: 1rem;
                    font-size: 0.875rem;
                }

                .legend-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .legend-color {
                    width: 16px;
                    height: 16px;
                    border-radius: 3px;
                }

                .evolution-note {
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    padding: 1rem;
                    margin-top: 1rem;
                    text-align: center;
                }

                .years-label {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-bottom: 0.5rem;
                }

                .evolution-bar {
                    height: 30px;
                    background: linear-gradient(90deg,
                        #22c55e 0%,
                        #22c55e 99.9%,
                        #6366f1 99.9%,
                        #6366f1 100%);
                    border-radius: 0.25rem;
                    position: relative;
                }

                .evolution-marker {
                    position: absolute;
                    right: 0;
                    top: -5px;
                    bottom: -5px;
                    width: 3px;
                    background: #f59e0b;
                }

                .evolution-text {
                    font-size: 0.875rem;
                    margin-top: 0.5rem;
                }

                @media (max-width: 768px) {
                    .moravec-row {
                        grid-template-columns: 1fr;
                        gap: 0.25rem;
                    }

                    .moravec-label {
                        font-weight: bold;
                        font-size: 0.8rem;
                        color: var(--accent, #f59e0b);
                    }

                    .moravec-bar {
                        font-size: 0.65rem;
                        height: 14px;
                    }
                }
            </style>

            <h4>Human vs AI Task Difficulty</h4>
            <p style="color: var(--muted, #94a3b8); margin-bottom: 1rem;">Compare the relative difficulty of tasks for humans vs AI systems.</p>

            <div class="moravec-chart">
                ${this.tasks.map(task => `
                    <div class="moravec-row">
                        <span class="moravec-label">${task.name}</span>
                        <div class="moravec-bars">
                            <div class="moravec-bar moravec-human" style="width: ${task.humanDiff}%;">
                                Human: ${task.humanDiff < 50 ? 'Easy' : task.humanDiff < 80 ? 'Medium' : 'Hard'}
                            </div>
                            <div class="moravec-bar moravec-ai" style="width: ${task.aiDiff}%;">
                                AI: ${task.aiDiff < 20 ? 'Trivial' : task.aiDiff < 50 ? 'Easy' : task.aiDiff < 80 ? 'Medium' : 'Hard'}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="legend">
                <div class="legend-item">
                    <div class="legend-color" style="background: linear-gradient(90deg, #22c55e, #84cc16);"></div>
                    <span>Human Difficulty</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background: linear-gradient(90deg, #6366f1, #8b5cf6);"></div>
                    <span>AI Difficulty</span>
                </div>
            </div>

            <div class="evolution-note">
                <div class="years-label">
                    <span>4 billion years ago</span>
                    <span>Today</span>
                </div>
                <div class="evolution-bar">
                    <div class="evolution-marker"></div>
                </div>
                <div class="evolution-text">
                    <span style="color: #22c55e;">Sensorimotor skills</span> evolved over billions of years.<br>
                    <span style="color: #6366f1;">Abstract reasoning</span> is only ~100,000 years old.
                </div>
            </div>

            <div class="result">
                <p id="moravec-explanation">Evolution spent billions of years optimizing sensorimotor skills. Abstract thinking is new and inefficient - but easily automated!</p>
            </div>

            <div class="insight">
                This is why self-driving cars are harder than chess-playing AI. Moving through the physical world requires solving problems evolution already solved for us.
            </div>
        `;
    }

    setupEventListeners() {
    }
}

customElements.define('moravec-simulator', MoravecSimulator);

export { MoravecSimulator };
