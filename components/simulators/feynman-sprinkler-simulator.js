import { SimulatorBase } from '../simulator-base.js';

class FeynmanSprinklerSimulator extends SimulatorBase {
    constructor() {
        super();
        this.mode = 'normal';
        this.spinning = false;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .tank {
                    background: linear-gradient(180deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.3) 100%);
                    border: 2px solid var(--primary, #6366f1);
                    border-radius: 0.5rem;
                    padding: 2rem;
                    margin: 1rem 0;
                    position: relative;
                    height: 200px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .sprinkler {
                    position: relative;
                    width: 100px;
                    height: 100px;
                }

                .sprinkler-hub {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 20px;
                    height: 20px;
                    background: var(--card, #1e293b);
                    border: 2px solid var(--muted, #94a3b8);
                    border-radius: 50%;
                    z-index: 2;
                }

                .sprinkler-arms {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 80px;
                    height: 80px;
                    transition: transform 0.1s linear;
                }

                .arm {
                    position: absolute;
                    width: 35px;
                    height: 8px;
                    background: var(--muted, #94a3b8);
                    border-radius: 4px;
                }

                .arm-1 {
                    top: 50%;
                    right: 50%;
                    transform: translateY(-50%);
                    transform-origin: right center;
                }

                .arm-2 {
                    top: 50%;
                    left: 50%;
                    transform: translateY(-50%) rotate(180deg);
                    transform-origin: left center;
                }

                .nozzle {
                    position: absolute;
                    width: 12px;
                    height: 12px;
                    background: var(--accent, #f59e0b);
                    border-radius: 2px;
                }

                .nozzle-1 {
                    top: 50%;
                    left: 0;
                    transform: translateY(-50%) rotate(-30deg);
                }

                .nozzle-2 {
                    top: 50%;
                    right: 0;
                    transform: translateY(-50%) rotate(150deg);
                }

                .water-stream {
                    position: absolute;
                    width: 40px;
                    height: 6px;
                    background: linear-gradient(90deg, rgba(59, 130, 246, 0.8), transparent);
                    border-radius: 3px;
                    opacity: 0;
                    transition: opacity 0.3s;
                }

                .water-stream.visible {
                    opacity: 1;
                }

                .stream-1 {
                    top: 35%;
                    left: -45px;
                    transform: rotate(-20deg);
                }

                .stream-2 {
                    top: 35%;
                    right: -45px;
                    transform: rotate(200deg);
                }

                .stream-1.reverse {
                    left: auto;
                    right: -10px;
                    transform: rotate(160deg);
                    background: linear-gradient(270deg, rgba(59, 130, 246, 0.8), transparent);
                }

                .stream-2.reverse {
                    right: auto;
                    left: -10px;
                    transform: rotate(-20deg);
                    background: linear-gradient(270deg, rgba(59, 130, 246, 0.8), transparent);
                }

                .mode-indicator {
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    background: var(--card, #1e293b);
                    padding: 0.5rem 1rem;
                    border-radius: 0.25rem;
                    font-size: 0.875rem;
                }

                .rotation-indicator {
                    position: absolute;
                    bottom: 10px;
                    right: 10px;
                    font-size: 2rem;
                }

                .mode-buttons {
                    display: flex;
                    gap: 0.5rem;
                    justify-content: center;
                    margin-bottom: 1rem;
                }

                .mode-buttons button {
                    flex: 1;
                }

                .mode-buttons button.active {
                    background: var(--accent, #f59e0b);
                }

                .theory-cards {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .theory-card {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                    cursor: pointer;
                    border: 2px solid transparent;
                    transition: all 0.2s;
                }

                .theory-card:hover {
                    border-color: var(--primary, #6366f1);
                }

                .theory-card.selected {
                    border-color: var(--accent, #f59e0b);
                }

                .theory-icon {
                    font-size: 1.5rem;
                    margin-bottom: 0.5rem;
                }

                .theory-label {
                    font-size: 0.875rem;
                }
            </style>

            <h4>Feynman Sprinkler Experiment</h4>
            <p style="color: var(--muted); margin-bottom: 1rem;">A normal sprinkler spins when expelling water. What happens when it sucks water in?</p>

            <div class="mode-buttons">
                <button id="mode-normal" class="active">Normal (Expel)</button>
                <button id="mode-reverse">Reverse (Suck)</button>
            </div>

            <div class="tank">
                <div class="mode-indicator" id="mode-label">Expelling Water</div>
                <div class="sprinkler">
                    <div class="sprinkler-arms" id="arms">
                        <div class="arm arm-1">
                            <div class="nozzle nozzle-1"></div>
                        </div>
                        <div class="arm arm-2">
                            <div class="nozzle nozzle-2"></div>
                        </div>
                        <div class="water-stream stream-1" id="stream-1"></div>
                        <div class="water-stream stream-2" id="stream-2"></div>
                    </div>
                    <div class="sprinkler-hub"></div>
                </div>
                <div class="rotation-indicator" id="rotation">-</div>
            </div>

            <div class="controls">
                <button id="start-btn">Start Pump</button>
                <button id="stop-btn">Stop</button>
            </div>

            <div class="theory-cards">
                <div class="theory-card" id="theory-opposite" data-theory="opposite">
                    <div class="theory-icon">&#x21BA;</div>
                    <div class="theory-label">Spins Opposite</div>
                </div>
                <div class="theory-card" id="theory-same" data-theory="same">
                    <div class="theory-icon">&#x21BB;</div>
                    <div class="theory-label">Spins Same</div>
                </div>
                <div class="theory-card" id="theory-none" data-theory="none">
                    <div class="theory-icon">&#x23F8;</div>
                    <div class="theory-label">Doesn't Spin</div>
                </div>
            </div>

            <div class="result" id="result">
                <p>Select a mode and start the pump to see what happens!</p>
            </div>

            <div class="insight">
                Feynman experimented with this at Princeton and famously exploded a carboy! The answer: the reverse sprinkler barely moves or doesn't spin at all. The momentum analysis is subtle - water entering doesn't push the nozzles the way exiting water does.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#mode-normal').addEventListener('click', () => this.setMode('normal'));
        this.$('#mode-reverse').addEventListener('click', () => this.setMode('reverse'));
        this.$('#start-btn').addEventListener('click', () => this.start());
        this.$('#stop-btn').addEventListener('click', () => this.stop());

        this.$$('.theory-card').forEach(card => {
            card.addEventListener('click', (e) => this.selectTheory(e.currentTarget.dataset.theory));
        });
    }

    setMode(mode) {
        this.mode = mode;
        this.stop();

        this.$$('.mode-buttons button').forEach(btn => btn.classList.remove('active'));
        this.$(`#mode-${mode}`).classList.add('active');

        this.$('#mode-label').textContent = mode === 'normal' ? 'Expelling Water' : 'Sucking Water';

        const stream1 = this.$('#stream-1');
        const stream2 = this.$('#stream-2');

        if (mode === 'reverse') {
            stream1.classList.add('reverse');
            stream2.classList.add('reverse');
        } else {
            stream1.classList.remove('reverse');
            stream2.classList.remove('reverse');
        }
    }

    start() {
        if (this.spinning) return;
        this.spinning = true;

        this.$('#stream-1').classList.add('visible');
        this.$('#stream-2').classList.add('visible');

        const arms = this.$('#arms');
        const rotation = this.$('#rotation');

        if (this.mode === 'normal') {
            let angle = 0;
            this.spinInterval = setInterval(() => {
                angle += 5;
                arms.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
            }, 50);
            rotation.textContent = '&#x21BB;';

            this.$('#result').innerHTML = `
                <p style="color: var(--accent);"><strong>Spinning clockwise!</strong></p>
                <p>When water exits the nozzles, it pushes back on the sprinkler (Newton's 3rd law), causing rotation opposite to the water flow direction.</p>
            `;
        } else {
            rotation.textContent = '~';

            this.$('#result').innerHTML = `
                <p style="color: var(--primary);"><strong>Almost no rotation!</strong></p>
                <p>The reverse sprinkler barely moves. The momentum of incoming water is complex:</p>
                <ul style="text-align: left; margin-top: 0.5rem;">
                    <li>Water accelerates as it enters the nozzle</li>
                    <li>But this is balanced by pressure forces</li>
                    <li>The net torque is approximately zero</li>
                </ul>
                <p>This puzzled physicists for decades, including Feynman himself!</p>
            `;
        }
    }

    stop() {
        this.spinning = false;

        if (this.spinInterval) {
            clearInterval(this.spinInterval);
        }

        this.$('#stream-1').classList.remove('visible');
        this.$('#stream-2').classList.remove('visible');
        this.$('#arms').style.transform = 'translate(-50%, -50%) rotate(0deg)';
        this.$('#rotation').textContent = '-';
    }

    selectTheory(theory) {
        this.$$('.theory-card').forEach(card => card.classList.remove('selected'));
        this.$(`#theory-${theory}`).classList.add('selected');

        const explanations = {
            opposite: `<p><strong>Theory: Spins Opposite</strong></p><p>Intuition says if water exits and spins one way, water entering should spin the other way. This seems logical but is wrong!</p>`,
            same: `<p><strong>Theory: Spins Same</strong></p><p>Some argue the momentum of incoming water should spin it the same direction. Also incorrect!</p>`,
            none: `<p><strong>Theory: Doesn't Spin (Correct!)</strong></p><p>The reverse sprinkler essentially doesn't spin. The momentum transfer is balanced by internal pressure forces. Feynman's experiments confirmed this - it might wobble slightly but doesn't sustain rotation.</p>`
        };

        this.$('#result').innerHTML = explanations[theory];
    }

    cleanup() {
        if (this.spinInterval) {
            clearInterval(this.spinInterval);
        }
    }
}

customElements.define('feynman-sprinkler-simulator', FeynmanSprinklerSimulator);

export { FeynmanSprinklerSimulator };
