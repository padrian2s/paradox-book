/**
 * Russell's Paradox Simulator
 * Demonstrates the barber's dilemma: a barber who shaves everyone who doesn't shave themselves
 */
import { SimulatorBase } from '../simulator-base.js';

class RussellSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .russell-viz {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 2rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                    position: relative;
                }

                .set-container {
                    display: flex;
                    gap: 2rem;
                    justify-content: center;
                }

                .set-circle {
                    width: 180px;
                    height: 180px;
                    border: 3px dashed var(--muted, #94a3b8);
                    border-radius: 50%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 1rem;
                    transition: all 0.3s;
                }

                .set-circle.highlight {
                    border-color: #ef4444;
                    background: rgba(239, 68, 68, 0.1);
                }

                .set-label {
                    font-size: 0.75rem;
                    text-align: center;
                    color: var(--muted, #94a3b8);
                    margin-bottom: 0.5rem;
                }

                .set-members {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 4px;
                    justify-content: center;
                }

                .member {
                    font-size: 1.5rem;
                }

                .barber-icon {
                    font-size: 3rem;
                    margin-top: 1rem;
                    transition: all 0.3s;
                }

                .barber-icon.confused {
                    animation: shake 0.5s infinite;
                }

                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px) rotate(-5deg); }
                    75% { transform: translateX(5px) rotate(5deg); }
                }

                @media (max-width: 600px) {
                    .set-container {
                        flex-direction: column;
                        gap: 1rem;
                    }
                    .set-circle {
                        width: 140px;
                        height: 140px;
                    }
                }
            </style>

            <h4>The Barber's Dilemma</h4>
            <p style="margin-bottom: 1rem; color: var(--muted, #94a3b8);">A barber shaves everyone who doesn't shave themselves. Does the barber shave himself?</p>

            <div class="controls">
                <button id="btn-yes">Yes, he shaves himself</button>
                <button id="btn-no">No, he doesn't</button>
                <button id="btn-reset">Reset</button>
            </div>

            <div class="russell-viz">
                <div class="set-container">
                    <div class="set-circle" id="set-self">
                        <div class="set-label">People who shave themselves</div>
                        <div class="set-members" id="self-members">
                            <span class="member">👤</span>
                            <span class="member">👤</span>
                        </div>
                    </div>
                    <div class="set-circle" id="set-barber">
                        <div class="set-label">People shaved by barber</div>
                        <div class="set-members" id="barber-members">
                            <span class="member">👤</span>
                            <span class="member">👤</span>
                        </div>
                    </div>
                </div>
                <div class="barber-icon" id="barber-icon">💈</div>
            </div>

            <div class="result">
                <p id="russell-result">Click a button to explore the paradox...</p>
            </div>

            <div class="insight">
                This paradox shook the foundations of set theory and mathematics. It led to the development of axiomatic set theory to avoid such contradictions.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#btn-yes').addEventListener('click', () => this.russellYes());
        this.$('#btn-no').addEventListener('click', () => this.russellNo());
        this.$('#btn-reset').addEventListener('click', () => this.russellReset());
    }

    russellYes() {
        this.$('#russell-result').innerHTML =
            '<strong style="color: #ef4444;">CONTRADICTION!</strong> If he shaves himself, he\'s someone who shaves themselves. But the barber only shaves those who DON\'T shave themselves!';
        this.$('#barber-icon').classList.add('confused');
        this.$('#set-self').classList.add('highlight');
        this.$('#self-members').innerHTML = '<span class="member">💈</span>';
    }

    russellNo() {
        this.$('#russell-result').innerHTML =
            '<strong style="color: #ef4444;">CONTRADICTION!</strong> If he doesn\'t shave himself, then by the rule, the barber MUST shave him... but he IS the barber!';
        this.$('#barber-icon').classList.add('confused');
        this.$('#set-barber').classList.add('highlight');
        this.$('#barber-members').innerHTML = '<span class="member">💈</span>';
    }

    russellReset() {
        this.$('#russell-result').textContent = 'Click a button to explore the paradox...';
        this.$('#barber-icon').classList.remove('confused');
        this.$('#set-self').classList.remove('highlight');
        this.$('#set-barber').classList.remove('highlight');
        this.$('#self-members').innerHTML = '<span class="member">👤</span><span class="member">👤</span>';
        this.$('#barber-members').innerHTML = '<span class="member">👤</span><span class="member">👤</span>';
    }
}

customElements.define('russell-simulator', RussellSimulator);

export { RussellSimulator };
