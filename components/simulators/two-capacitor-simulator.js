/**
 * Two Capacitor Paradox Simulator
 * Connect a charged capacitor to an empty one - energy is lost! Where does it go?
 */
import { SimulatorBase } from '../simulator-base.js';

class TwoCapacitorSimulator extends SimulatorBase {
    constructor() {
        super();
        this.connected = false;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .capacitor-viz {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 1rem;
                    margin: 1.5rem 0;
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                }

                .capacitor {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.5rem;
                }

                .cap-box {
                    width: 80px;
                    height: 100px;
                    border: 3px solid var(--muted, #94a3b8);
                    border-radius: 0.5rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    overflow: hidden;
                    background: var(--card, #1e293b);
                }

                .cap-charge {
                    background: linear-gradient(180deg, #3b82f6, #1d4ed8);
                    transition: height 0.5s ease;
                }

                .cap-voltage {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                }

                .cap-label {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                }

                .wire-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.5rem;
                }

                .wire {
                    width: 60px;
                    height: 4px;
                    background: var(--muted, #94a3b8);
                    transition: background 0.3s;
                }

                .wire.active {
                    background: var(--accent, #f59e0b);
                    box-shadow: 0 0 10px rgba(245, 158, 11, 0.5);
                }

                .switch-icon {
                    font-size: 1.5rem;
                    color: var(--muted, #94a3b8);
                }

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
                    color: var(--text, #e2e8f0);
                }

                .stat-value.lost {
                    color: #ef4444;
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                @media (max-width: 600px) {
                    .capacitor-viz {
                        flex-direction: column;
                    }
                    .wire-container {
                        transform: rotate(90deg);
                    }
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>Energy Conservation Paradox</h4>

            <div class="controls">
                <button id="connect-btn">Connect Capacitors</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="capacitor-viz">
                <div class="capacitor">
                    <div class="cap-box">
                        <div class="cap-charge" id="cap1-charge" style="height: 100%;"></div>
                    </div>
                    <div class="cap-voltage" id="cap1-v">10V</div>
                    <div class="cap-label">Capacitor 1</div>
                </div>

                <div class="wire-container">
                    <div class="switch-icon" id="switch-icon">&#x23FB;</div>
                    <div class="wire" id="wire"></div>
                </div>

                <div class="capacitor">
                    <div class="cap-box">
                        <div class="cap-charge" id="cap2-charge" style="height: 0%;"></div>
                    </div>
                    <div class="cap-voltage" id="cap2-v">0V</div>
                    <div class="cap-label">Capacitor 2</div>
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="energy-before">50 J</div>
                    <div class="stat-label">Energy Before</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="energy-after">50 J</div>
                    <div class="stat-label">Energy After</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="energy-lost">0 J</div>
                    <div class="stat-label">Energy Lost!</div>
                </div>
            </div>

            <div class="result" id="result">
                <p>Two identical capacitors: one charged to 10V, one empty. What happens when we connect them?</p>
            </div>

            <div class="insight">
                The "missing" energy is dissipated as heat in the wire resistance, or radiated as electromagnetic waves!
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#connect-btn').addEventListener('click', () => this.connect());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
    }

    connect() {
        if (this.connected) return;
        this.connected = true;

        this.$('#cap1-v').textContent = '5V';
        this.$('#cap2-v').textContent = '5V';
        this.$('#cap1-charge').style.height = '50%';
        this.$('#cap2-charge').style.height = '50%';
        this.$('#wire').classList.add('active');
        this.$('#switch-icon').textContent = '⚡';

        this.$('#energy-after').textContent = '25 J';
        this.$('#energy-lost').textContent = '25 J!';
        this.$('#energy-lost').classList.add('lost');

        this.$('#result').innerHTML = `
            <p><strong>Half the energy vanished!</strong></p>
            <p>Before: E = 1/2 CV<sup>2</sup> = 1/2 × 1F × 10V<sup>2</sup> = <span style="color: var(--primary);">50 J</span></p>
            <p>After: E = 2 × 1/2 CV<sup>2</sup> = 2 × 1/2 × 1F × 5V<sup>2</sup> = <span style="color: #ef4444;">25 J</span></p>
            <p style="color: var(--accent);">Where did 25 J go?</p>
        `;
    }

    reset() {
        this.connected = false;

        this.$('#cap1-v').textContent = '10V';
        this.$('#cap2-v').textContent = '0V';
        this.$('#cap1-charge').style.height = '100%';
        this.$('#cap2-charge').style.height = '0%';
        this.$('#wire').classList.remove('active');
        this.$('#switch-icon').textContent = '⏻';

        this.$('#energy-before').textContent = '50 J';
        this.$('#energy-after').textContent = '50 J';
        this.$('#energy-lost').textContent = '0 J';
        this.$('#energy-lost').classList.remove('lost');

        this.$('#result').innerHTML = `
            <p>Two identical capacitors: one charged to 10V, one empty. What happens when we connect them?</p>
        `;
    }
}

customElements.define('two-capacitor-simulator', TwoCapacitorSimulator);

export { TwoCapacitorSimulator };
