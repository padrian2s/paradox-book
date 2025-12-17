import { SimulatorBase } from '../simulator-base.js';

class SecondWindSimulator extends SimulatorBase {
    constructor() {
        super();
        this.hours = 0;
        this.animationInterval = null;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .simulation-container {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                }

                .clock-display {
                    text-align: center;
                    margin-bottom: 1rem;
                }

                .time {
                    font-size: 2.5rem;
                    font-weight: bold;
                    color: var(--primary, #6366f1);
                }

                .awake-hours {
                    font-size: 0.875rem;
                    color: var(--muted);
                }

                .energy-meter {
                    margin: 1rem 0;
                }

                .meter-label {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.75rem;
                    color: var(--muted);
                    margin-bottom: 0.25rem;
                }

                .meter-track {
                    height: 30px;
                    background: var(--card, #1e293b);
                    border-radius: 4px;
                    overflow: hidden;
                    position: relative;
                }

                .meter-fill {
                    height: 100%;
                    transition: all 0.5s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    font-size: 0.875rem;
                }

                .person-display {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 1rem;
                    gap: 1rem;
                }

                .person {
                    font-size: 4rem;
                    transition: all 0.3s ease;
                }

                .person.tired {
                    filter: grayscale(50%);
                    transform: rotate(-10deg);
                }

                .person.alert {
                    animation: bounce 0.5s ease infinite;
                }

                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }

                .status-badge {
                    padding: 0.5rem 1rem;
                    border-radius: 1rem;
                    font-size: 0.875rem;
                    font-weight: bold;
                }

                .phase-timeline {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 1rem;
                    padding: 0.5rem;
                    background: var(--card);
                    border-radius: 0.5rem;
                    position: relative;
                }

                .phase {
                    text-align: center;
                    padding: 0.5rem;
                    font-size: 0.7rem;
                    flex: 1;
                    border-right: 1px solid var(--muted);
                    opacity: 0.5;
                    transition: all 0.3s ease;
                }

                .phase:last-child {
                    border-right: none;
                }

                .phase.current {
                    opacity: 1;
                    background: rgba(99, 102, 241, 0.2);
                }

                .phase-icon {
                    font-size: 1.25rem;
                    margin-bottom: 0.25rem;
                }

                .science-box {
                    margin-top: 1rem;
                    padding: 1rem;
                    background: var(--card);
                    border-radius: 0.5rem;
                }

                .science-title {
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                    margin-bottom: 0.5rem;
                }

                .science-text {
                    font-size: 0.875rem;
                    color: var(--muted);
                    line-height: 1.5;
                }

                @media (max-width: 600px) {
                    .phase {
                        font-size: 0.6rem;
                        padding: 0.25rem;
                    }
                    .phase-icon {
                        font-size: 1rem;
                    }
                }
            </style>

            <h4>Second Wind Paradox</h4>
            <p style="color: var(--muted); margin-bottom: 1rem;">Stay awake long enough, and you may suddenly feel MORE alert.</p>

            <div class="controls">
                <button id="simulate-btn">Simulate Sleep Deprivation</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="simulation-container">
                <div class="clock-display">
                    <div class="time" id="time-display">7:00 AM</div>
                    <div class="awake-hours" id="awake-hours">Hours awake: 0</div>
                </div>

                <div class="person-display">
                    <div class="person" id="person-icon">&#x1F9D1;</div>
                    <div class="status-badge" id="status-badge" style="background: #22c55e;">Well Rested</div>
                </div>

                <div class="energy-meter">
                    <div class="meter-label">
                        <span>Alertness Level</span>
                        <span id="energy-percent">100%</span>
                    </div>
                    <div class="meter-track">
                        <div class="meter-fill" id="energy-fill" style="width: 100%; background: linear-gradient(90deg, #22c55e, #16a34a);">Alert</div>
                    </div>
                </div>

                <div class="phase-timeline">
                    <div class="phase current" id="phase-1">
                        <div class="phase-icon">&#x2600;&#xFE0F;</div>
                        <div>Morning</div>
                        <div>Alert</div>
                    </div>
                    <div class="phase" id="phase-2">
                        <div class="phase-icon">&#x1F31E;</div>
                        <div>Afternoon</div>
                        <div>Dip</div>
                    </div>
                    <div class="phase" id="phase-3">
                        <div class="phase-icon">&#x1F319;</div>
                        <div>Night</div>
                        <div>Tired</div>
                    </div>
                    <div class="phase" id="phase-4">
                        <div class="phase-icon">&#x1F31A;</div>
                        <div>Late Night</div>
                        <div>Exhausted</div>
                    </div>
                    <div class="phase" id="phase-5">
                        <div class="phase-icon">&#x2728;</div>
                        <div>Early AM</div>
                        <div>SECOND WIND!</div>
                    </div>
                </div>
            </div>

            <div class="result" id="result">
                <p>Click "Simulate Sleep Deprivation" to see the paradox in action.</p>
            </div>

            <div class="science-box">
                <div class="science-title">The Science Behind It:</div>
                <div class="science-text">
                    <strong>Circadian rhythm override:</strong> Your body's internal clock can temporarily boost alertness, even when sleep-deprived.<br><br>
                    <strong>Cortisol surge:</strong> Stress hormones spike as a survival mechanism.<br><br>
                    <strong>Adenosine resistance:</strong> Your brain temporarily ignores the "sleepy" chemical.<br><br>
                    <strong>Warning:</strong> This is a false sense of energy. Cognitive performance is still impaired!
                </div>
            </div>

            <div class="insight">
                The second wind is your body's emergency reserve, not a sign you don't need sleep. It's an evolutionary adaptation for survival situations. Relying on it regularly causes serious health consequences.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#simulate-btn').addEventListener('click', () => this.runSimulation());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
    }

    runSimulation() {
        this.reset();
        this.hours = 0;

        this.animationInterval = setInterval(() => {
            this.hours++;
            this.updateDisplay();

            if (this.hours >= 24) {
                clearInterval(this.animationInterval);
            }
        }, 300);
    }

    updateDisplay() {
        const hour = (7 + this.hours) % 24;
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        this.$('#time-display').textContent = `${displayHour}:00 ${ampm}`;
        this.$('#awake-hours').textContent = `Hours awake: ${this.hours}`;

        let energy, status, color, personClass;

        if (this.hours <= 4) {
            energy = 100 - this.hours * 5;
            status = 'Alert';
            color = '#22c55e';
            personClass = '';
            this.setPhase(1);
        } else if (this.hours <= 8) {
            energy = 80 - (this.hours - 4) * 10;
            status = 'Afternoon Dip';
            color = '#84cc16';
            personClass = '';
            this.setPhase(2);
        } else if (this.hours <= 14) {
            energy = 40 - (this.hours - 8) * 5;
            status = 'Getting Tired';
            color = '#f59e0b';
            personClass = 'tired';
            this.setPhase(3);
        } else if (this.hours <= 18) {
            energy = Math.max(10, 10 - (this.hours - 14) * 2);
            status = 'Exhausted';
            color = '#dc2626';
            personClass = 'tired';
            this.setPhase(4);
        } else {
            energy = 10 + (this.hours - 18) * 12;
            status = 'SECOND WIND!';
            color = '#8b5cf6';
            personClass = 'alert';
            this.setPhase(5);

            this.$('#result').innerHTML = `
                <p style="color: #8b5cf6;"><strong>SECOND WIND ACTIVATED!</strong></p>
                <p>After ${this.hours} hours awake, you suddenly feel more alert!</p>
                <p>Your circadian rhythm has kicked in, releasing cortisol and temporarily suppressing adenosine.</p>
                <p style="color: var(--muted); font-size: 0.875rem;">Warning: This is borrowed energy. A crash is coming, and cognitive impairment remains.</p>
            `;
        }

        energy = Math.max(5, Math.min(100, energy));

        this.$('#energy-fill').style.width = energy + '%';
        this.$('#energy-fill').style.background = color;
        this.$('#energy-fill').textContent = status;
        this.$('#energy-percent').textContent = energy + '%';

        this.$('#status-badge').textContent = status;
        this.$('#status-badge').style.background = color;

        const person = this.$('#person-icon');
        person.className = 'person ' + personClass;

        if (this.hours < 18) {
            this.$('#result').innerHTML = `
                <p>Hour ${this.hours}: ${status}</p>
                <p>Energy level: ${energy}%</p>
            `;
        }
    }

    setPhase(num) {
        for (let i = 1; i <= 5; i++) {
            this.$(`#phase-${i}`).classList.toggle('current', i === num);
        }
    }

    reset() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
        }
        this.hours = 0;

        this.$('#time-display').textContent = '7:00 AM';
        this.$('#awake-hours').textContent = 'Hours awake: 0';
        this.$('#energy-fill').style.width = '100%';
        this.$('#energy-fill').style.background = 'linear-gradient(90deg, #22c55e, #16a34a)';
        this.$('#energy-fill').textContent = 'Alert';
        this.$('#energy-percent').textContent = '100%';
        this.$('#status-badge').textContent = 'Well Rested';
        this.$('#status-badge').style.background = '#22c55e';
        this.$('#person-icon').className = 'person';
        this.setPhase(1);
        this.$('#result').innerHTML = '<p>Click "Simulate Sleep Deprivation" to see the paradox in action.</p>';
    }

    cleanup() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
        }
    }
}

customElements.define('second-wind-simulator', SecondWindSimulator);

export { SecondWindSimulator };
