import { SimulatorBase } from '../simulator-base.js';

class DemocracyParadoxSimulator extends SimulatorBase {
    constructor() {
        super();
        this.state = {
            year: 1,
            democracyHealth: 100,
            phase: 'stable'
        };
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .timeline {
                    background: var(--bg, #0f172a);
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    margin: 1rem 0;
                }

                .phase-indicator {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 1rem;
                }

                .phase {
                    padding: 0.5rem 1rem;
                    border-radius: 0.25rem;
                    font-size: 0.75rem;
                    background: var(--card, #1e293b);
                    opacity: 0.5;
                }

                .phase.active {
                    opacity: 1;
                    font-weight: bold;
                }

                .phase.stable { border-bottom: 3px solid #22c55e; }
                .phase.crisis { border-bottom: 3px solid #f59e0b; }
                .phase.election { border-bottom: 3px solid var(--primary, #6366f1); }
                .phase.authoritarian { border-bottom: 3px solid #ef4444; }

                .democracy-meter {
                    height: 24px;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    overflow: hidden;
                    margin: 1rem 0;
                }

                .democracy-fill {
                    height: 100%;
                    transition: width 0.5s, background 0.5s;
                    border-radius: 0.5rem;
                }

                .event-log {
                    max-height: 150px;
                    overflow-y: auto;
                    font-size: 0.875rem;
                    border: 1px solid var(--muted, #94a3b8);
                    border-radius: 0.5rem;
                    padding: 0.5rem;
                }

                .event {
                    padding: 0.25rem 0;
                    border-bottom: 1px solid var(--card, #1e293b);
                }

                .event:last-child {
                    border-bottom: none;
                }

                .event.warning { color: #f59e0b; }
                .event.danger { color: #ef4444; }
                .event.neutral { color: var(--muted, #94a3b8); }

                @media (max-width: 768px) {
                    .phase-indicator {
                        flex-wrap: wrap;
                        gap: 0.5rem;
                    }
                    .phase {
                        flex: 1 1 40%;
                        text-align: center;
                    }
                }
            </style>

            <h4>Democracy Under Stress</h4>

            <div class="controls">
                <button id="next-btn">Next Year</button>
                <button id="crisis-btn">Trigger Crisis</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="timeline">
                <div class="phase-indicator">
                    <div class="phase stable active" id="phase-stable">Stable Democracy</div>
                    <div class="phase crisis" id="phase-crisis">Crisis</div>
                    <div class="phase election" id="phase-election">Fateful Election</div>
                    <div class="phase authoritarian" id="phase-auth">End of Democracy</div>
                </div>

                <strong>Democracy Health: <span id="health-value">100%</span></strong>
                <div class="democracy-meter">
                    <div class="democracy-fill" id="health-fill" style="width: 100%; background: #22c55e;"></div>
                </div>

                <strong>Year <span id="year">1</span> Events:</strong>
                <div class="event-log" id="events">
                    <div class="event neutral">Democracy functioning normally.</div>
                </div>
            </div>

            <div class="result">
                <p id="result-text">A functioning democracy can vote itself out of existence. Click "Trigger Crisis" to see how.</p>
            </div>

            <div class="insight">
                "Democracy is the only system that permits its own abolition by those who use it." The paradox is that protecting democracy may require limiting some democratic choices.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#next-btn').addEventListener('click', () => this.nextYear());
        this.$('#crisis-btn').addEventListener('click', () => this.triggerCrisis());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
    }

    updatePhase(phase) {
        this.state.phase = phase;
        this.$$('.phase').forEach(el => el.classList.remove('active'));
        this.$(`#phase-${phase === 'authoritarian' ? 'auth' : phase}`).classList.add('active');
    }

    addEvent(text, type = 'neutral') {
        const events = this.$('#events');
        const event = document.createElement('div');
        event.className = `event ${type}`;
        event.textContent = `Year ${this.state.year}: ${text}`;
        events.insertBefore(event, events.firstChild);
    }

    updateHealth() {
        const health = Math.max(0, this.state.democracyHealth);
        this.$('#health-value').textContent = health + '%';
        const fill = this.$('#health-fill');
        fill.style.width = health + '%';
        fill.style.background = health > 60 ? '#22c55e' : health > 30 ? '#f59e0b' : '#ef4444';
    }

    nextYear() {
        if (this.state.phase === 'authoritarian') {
            this.$('#result-text').innerHTML = '<span style="color: #ef4444;">Democracy has ended. Reset to try again.</span>';
            return;
        }

        this.state.year++;
        this.$('#year').textContent = this.state.year;

        if (this.state.phase === 'stable') {
            this.state.democracyHealth = Math.min(100, this.state.democracyHealth + 2);
            this.addEvent('Normal democratic processes continue.', 'neutral');
        } else if (this.state.phase === 'crisis') {
            this.state.democracyHealth -= 10;
            const events = [
                'Economic hardship increases support for radical candidates.',
                'Trust in institutions continues to decline.',
                'Populist rhetoric intensifies.'
            ];
            this.addEvent(events[Math.floor(Math.random() * events.length)], 'warning');

            if (this.state.democracyHealth <= 50) {
                this.updatePhase('election');
                this.addEvent('ELECTION: Anti-democratic candidate on ballot!', 'danger');
            }
        } else if (this.state.phase === 'election') {
            this.state.democracyHealth -= 20;
            this.addEvent('Voters democratically elect authoritarian leader.', 'danger');
            this.updatePhase('authoritarian');
            this.$('#result-text').innerHTML = `
                <span style="color: #ef4444;">PARADOX REALIZED!</span><br>
                Democracy voted itself out of existence. The people freely chose to end freedom.
            `;
        }

        this.updateHealth();
    }

    triggerCrisis() {
        if (this.state.phase !== 'stable') return;

        this.updatePhase('crisis');
        this.state.democracyHealth -= 20;
        this.addEvent('CRISIS: Economic collapse / Security threat emerges!', 'danger');
        this.updateHealth();
        this.$('#result-text').textContent = 'Crisis mode: Democracy is vulnerable. Keep clicking "Next Year" to see the progression.';
    }

    reset() {
        this.state = { year: 1, democracyHealth: 100, phase: 'stable' };
        this.$('#year').textContent = '1';
        this.$('#events').innerHTML = '<div class="event neutral">Democracy functioning normally.</div>';
        this.updatePhase('stable');
        this.updateHealth();
        this.$('#result-text').textContent = 'A functioning democracy can vote itself out of existence. Click "Trigger Crisis" to see how.';
    }
}

customElements.define('democracy-paradox-simulator', DemocracyParadoxSimulator);

export { DemocracyParadoxSimulator };
