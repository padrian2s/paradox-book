/**
 * Grandfather Paradox Simulator
 * Demonstrates time travel paradox scenarios and resolutions
 */
import { SimulatorBase } from '../simulator-base.js';

class GrandfatherSimulator extends SimulatorBase {
    constructor() {
        super();
        this.currentScenario = null;
        this.animationFrame = null;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .scenario-buttons {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin-bottom: 1.5rem;
                }

                .scenario-buttons button {
                    flex: 1;
                    min-width: 150px;
                }

                .scenario-buttons button.active {
                    background: var(--accent, #f59e0b);
                }

                .timeline-container {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    min-height: 250px;
                    position: relative;
                    overflow: hidden;
                }

                .timeline {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin: 1rem 0;
                    flex-wrap: wrap;
                    justify-content: center;
                }

                .timeline-event {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 0.75rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    min-width: 100px;
                    text-align: center;
                    transition: all 0.3s;
                }

                .timeline-event.highlight {
                    background: var(--primary, #6366f1);
                    transform: scale(1.05);
                }

                .timeline-event.danger {
                    background: #dc2626;
                    animation: shake 0.5s ease-in-out;
                }

                .timeline-event.success {
                    background: #16a34a;
                }

                .timeline-event.warning {
                    background: var(--accent, #f59e0b);
                }

                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }

                .event-icon {
                    font-size: 2rem;
                    margin-bottom: 0.25rem;
                }

                .event-label {
                    font-size: 0.75rem;
                    color: var(--text, #e2e8f0);
                }

                .event-year {
                    font-size: 0.625rem;
                    color: var(--muted, #94a3b8);
                }

                .timeline-arrow {
                    font-size: 1.5rem;
                    color: var(--primary, #6366f1);
                }

                .timeline-arrow.broken {
                    color: #dc2626;
                    text-decoration: line-through;
                }

                .branch-container {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .branch {
                    padding: 0.75rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    border-left: 4px solid var(--primary, #6366f1);
                }

                .branch.alternate {
                    border-left-color: var(--accent, #f59e0b);
                    opacity: 0.9;
                }

                .branch-label {
                    font-size: 0.875rem;
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                    color: var(--text, #e2e8f0);
                }

                .paradox-loop {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 2rem;
                }

                .loop-diagram {
                    position: relative;
                    width: 200px;
                    height: 200px;
                }

                .loop-node {
                    position: absolute;
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: var(--card, #1e293b);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    border: 3px solid var(--primary, #6366f1);
                }

                .loop-node.error {
                    border-color: #dc2626;
                    animation: pulse-error 1s infinite;
                }

                @keyframes pulse-error {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.7); }
                    50% { box-shadow: 0 0 0 15px rgba(220, 38, 38, 0); }
                }

                .loop-arrow {
                    position: absolute;
                    color: var(--primary, #6366f1);
                    font-size: 1.5rem;
                }

                .scenario-description {
                    padding: 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                    font-size: 0.875rem;
                    line-height: 1.6;
                }

                .resolution-type {
                    display: inline-block;
                    padding: 0.25rem 0.75rem;
                    background: var(--primary, #6366f1);
                    border-radius: 1rem;
                    font-size: 0.75rem;
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                }

                @media (max-width: 768px) {
                    .scenario-buttons {
                        flex-direction: column;
                    }
                    .scenario-buttons button {
                        width: 100%;
                    }
                    .timeline-event {
                        min-width: 80px;
                        padding: 0.5rem;
                    }
                    .event-icon {
                        font-size: 1.5rem;
                    }
                }
            </style>

            <h4>Time Travel Scenario Simulator</h4>
            <p style="color: var(--muted); margin-bottom: 1rem;">Explore the grandfather paradox and its proposed resolutions.</p>

            <div class="scenario-buttons">
                <button id="standard-btn">Standard Timeline</button>
                <button id="paradox-btn">Paradox Attempt</button>
                <button id="multiverse-btn">Multiverse Solution</button>
                <button id="novikov-btn">Novikov Consistency</button>
            </div>

            <div class="timeline-container" id="timeline-container">
                <div id="timeline-viz">
                    <p style="text-align: center; color: var(--muted);">Select a scenario to see what happens...</p>
                </div>
            </div>

            <div class="result">
                <p id="result-text">Choose a time travel scenario above to explore the paradox.</p>
            </div>

            <div class="insight">
                Possible resolutions: self-consistency (you can't change what happened), many-worlds (you create a new timeline), or Novikov self-consistency principle (physics prevents paradoxes).
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#standard-btn').addEventListener('click', () => this.runScenario('standard'));
        this.$('#paradox-btn').addEventListener('click', () => this.runScenario('paradox'));
        this.$('#multiverse-btn').addEventListener('click', () => this.runScenario('multiverse'));
        this.$('#novikov-btn').addEventListener('click', () => this.runScenario('novikov'));
    }

    runScenario(scenario) {
        this.currentScenario = scenario;

        this.$$('.scenario-buttons button').forEach(btn => btn.classList.remove('active'));
        this.$(`#${scenario}-btn`).classList.add('active');

        const viz = this.$('#timeline-viz');
        const result = this.$('#result-text');

        switch (scenario) {
            case 'standard':
                viz.innerHTML = this.renderStandardTimeline();
                result.innerHTML = '<span style="color: #22c55e;">Normal causality: Your grandparents meet, your parents are born, you are born, and time flows forward.</span>';
                break;

            case 'paradox':
                viz.innerHTML = this.renderParadoxTimeline();
                result.innerHTML = '<span style="color: #dc2626;">Logical Contradiction: If you prevent your birth, who went back to prevent it? This creates an impossible causal loop!</span>';
                break;

            case 'multiverse':
                viz.innerHTML = this.renderMultiverseTimeline();
                result.innerHTML = '<span style="color: #22c55e;">Many-Worlds Solution: You create a new branch. Both timelines exist independently. No paradox!</span>';
                break;

            case 'novikov':
                viz.innerHTML = this.renderNovikovTimeline();
                result.innerHTML = '<span style="color: var(--accent);">Novikov Self-Consistency: Something always prevents you from changing the past. History is self-protecting.</span>';
                break;
        }
    }

    renderStandardTimeline() {
        return `
            <div class="scenario-description">
                <span class="resolution-type">STANDARD CAUSALITY</span>
                <p>Time flows in one direction. Events cause future events in a linear chain.</p>
            </div>
            <div class="timeline">
                <div class="timeline-event highlight">
                    <span class="event-icon">&#x1F46B;</span>
                    <span class="event-label">Grandparents Meet</span>
                    <span class="event-year">1950</span>
                </div>
                <span class="timeline-arrow">&#x2192;</span>
                <div class="timeline-event">
                    <span class="event-icon">&#x1F476;</span>
                    <span class="event-label">Parent Born</span>
                    <span class="event-year">1970</span>
                </div>
                <span class="timeline-arrow">&#x2192;</span>
                <div class="timeline-event">
                    <span class="event-icon">&#x1F9D2;</span>
                    <span class="event-label">You Born</span>
                    <span class="event-year">1995</span>
                </div>
                <span class="timeline-arrow">&#x2192;</span>
                <div class="timeline-event success">
                    <span class="event-icon">&#x1F9D1;</span>
                    <span class="event-label">You Exist</span>
                    <span class="event-year">2024</span>
                </div>
            </div>
        `;
    }

    renderParadoxTimeline() {
        return `
            <div class="scenario-description">
                <span class="resolution-type" style="background: #dc2626;">LOGICAL PARADOX</span>
                <p>Attempting to prevent your own existence creates an impossible contradiction.</p>
            </div>
            <div class="paradox-loop">
                <div class="loop-diagram">
                    <div class="loop-node" style="top: 0; left: 70px;">&#x1F9D1;</div>
                    <div class="loop-arrow" style="top: 60px; left: 130px; transform: rotate(45deg);">&#x2193;</div>
                    <div class="loop-node" style="top: 70px; right: 0;">&#x23F3;</div>
                    <div class="loop-arrow" style="top: 130px; right: 30px; transform: rotate(135deg);">&#x2193;</div>
                    <div class="loop-node error" style="bottom: 0; left: 70px;">&#x1F6AB;</div>
                    <div class="loop-arrow" style="bottom: 60px; left: 30px; transform: rotate(-135deg);">&#x2193;</div>
                    <div class="loop-node error" style="top: 70px; left: 0;">&#x2753;</div>
                    <div class="loop-arrow" style="top: 30px; left: 45px; transform: rotate(-45deg);">&#x2193;</div>
                </div>
            </div>
            <div class="timeline">
                <div class="timeline-event danger">
                    <span class="event-icon">&#x1F6AB;</span>
                    <span class="event-label">Prevent Meeting</span>
                    <span class="event-year">1950</span>
                </div>
                <span class="timeline-arrow broken">&#x2192;</span>
                <div class="timeline-event danger">
                    <span class="event-icon">&#x2753;</span>
                    <span class="event-label">Never Born</span>
                    <span class="event-year">???</span>
                </div>
                <span class="timeline-arrow broken">&#x2192;</span>
                <div class="timeline-event danger">
                    <span class="event-icon">&#x1F4A5;</span>
                    <span class="event-label">PARADOX!</span>
                    <span class="event-year">ERROR</span>
                </div>
            </div>
        `;
    }

    renderMultiverseTimeline() {
        return `
            <div class="scenario-description">
                <span class="resolution-type" style="background: #16a34a;">MANY-WORLDS INTERPRETATION</span>
                <p>Time travel creates a new branch of reality. The original timeline continues unaffected.</p>
            </div>
            <div class="branch-container">
                <div class="branch">
                    <div class="branch-label">&#x1F30D; Timeline A (Original)</div>
                    <div class="timeline" style="margin: 0.5rem 0;">
                        <div class="timeline-event" style="padding: 0.5rem; min-width: 70px;">
                            <span class="event-icon" style="font-size: 1.25rem;">&#x1F46B;</span>
                            <span class="event-label">Meet</span>
                        </div>
                        <span class="timeline-arrow">&#x2192;</span>
                        <div class="timeline-event" style="padding: 0.5rem; min-width: 70px;">
                            <span class="event-icon" style="font-size: 1.25rem;">&#x1F476;</span>
                            <span class="event-label">Parent</span>
                        </div>
                        <span class="timeline-arrow">&#x2192;</span>
                        <div class="timeline-event success" style="padding: 0.5rem; min-width: 70px;">
                            <span class="event-icon" style="font-size: 1.25rem;">&#x1F9D1;</span>
                            <span class="event-label">You</span>
                        </div>
                        <span class="timeline-arrow">&#x2192;</span>
                        <div class="timeline-event highlight" style="padding: 0.5rem; min-width: 70px;">
                            <span class="event-icon" style="font-size: 1.25rem;">&#x23F3;</span>
                            <span class="event-label">Travel</span>
                        </div>
                    </div>
                </div>
                <div style="text-align: center; color: var(--accent); font-size: 1.5rem;">&#x2935; Branch Point</div>
                <div class="branch alternate">
                    <div class="branch-label">&#x1F30E; Timeline B (New Branch)</div>
                    <div class="timeline" style="margin: 0.5rem 0;">
                        <div class="timeline-event warning" style="padding: 0.5rem; min-width: 70px;">
                            <span class="event-icon" style="font-size: 1.25rem;">&#x1F6AB;</span>
                            <span class="event-label">Prevented</span>
                        </div>
                        <span class="timeline-arrow">&#x2192;</span>
                        <div class="timeline-event" style="padding: 0.5rem; min-width: 70px;">
                            <span class="event-icon" style="font-size: 1.25rem;">&#x2205;</span>
                            <span class="event-label">No Parent</span>
                        </div>
                        <span class="timeline-arrow">&#x2192;</span>
                        <div class="timeline-event" style="padding: 0.5rem; min-width: 70px;">
                            <span class="event-icon" style="font-size: 1.25rem;">&#x2205;</span>
                            <span class="event-label">No You</span>
                        </div>
                        <span class="timeline-arrow">&#x2192;</span>
                        <div class="timeline-event success" style="padding: 0.5rem; min-width: 70px;">
                            <span class="event-icon" style="font-size: 1.25rem;">&#x1F9D1;</span>
                            <span class="event-label">Visitor</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderNovikovTimeline() {
        return `
            <div class="scenario-description">
                <span class="resolution-type" style="background: var(--accent);">NOVIKOV SELF-CONSISTENCY</span>
                <p>The laws of physics conspire to prevent paradoxes. Every attempt to change the past fails in some way.</p>
            </div>
            <div class="timeline">
                <div class="timeline-event highlight">
                    <span class="event-icon">&#x1F9D1;</span>
                    <span class="event-label">You Travel Back</span>
                    <span class="event-year">2024 &#x2192; 1950</span>
                </div>
                <span class="timeline-arrow">&#x2192;</span>
                <div class="timeline-event warning">
                    <span class="event-icon">&#x1F914;</span>
                    <span class="event-label">Attempt Change</span>
                    <span class="event-year">1950</span>
                </div>
                <span class="timeline-arrow">&#x2192;</span>
                <div class="timeline-event success">
                    <span class="event-icon">&#x1F3AF;</span>
                    <span class="event-label">Something Stops You</span>
                    <span class="event-year">1950</span>
                </div>
            </div>
            <div class="branch-container">
                <div class="branch">
                    <div class="branch-label">&#x26A0;&#xFE0F; Possible Prevention Mechanisms:</div>
                    <ul style="margin: 0.5rem 0; padding-left: 1.5rem; color: var(--muted); font-size: 0.875rem;">
                        <li>You slip and miss your chance</li>
                        <li>You realize the person you met wasn't actually your grandparent</li>
                        <li>Your actions inadvertently cause your grandparents to meet</li>
                        <li>Equipment malfunction at the critical moment</li>
                        <li>You were the stranger who introduced them all along!</li>
                    </ul>
                </div>
            </div>
            <div class="timeline" style="margin-top: 1rem;">
                <div class="timeline-event">
                    <span class="event-icon">&#x1F46B;</span>
                    <span class="event-label">They Meet Anyway</span>
                    <span class="event-year">1950</span>
                </div>
                <span class="timeline-arrow">&#x2192;</span>
                <div class="timeline-event">
                    <span class="event-icon">&#x1F476;</span>
                    <span class="event-label">Parent Born</span>
                    <span class="event-year">1970</span>
                </div>
                <span class="timeline-arrow">&#x2192;</span>
                <div class="timeline-event success">
                    <span class="event-icon">&#x267E;&#xFE0F;</span>
                    <span class="event-label">Consistent Loop</span>
                    <span class="event-year">Always</span>
                </div>
            </div>
        `;
    }

    cleanup() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }
}

customElements.define('grandfather-simulator', GrandfatherSimulator);

export { GrandfatherSimulator };
