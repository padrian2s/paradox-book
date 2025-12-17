/**
 * Schrodinger's Cat Simulator
 * Cat in superposition of alive and dead until observed
 */
import { SimulatorBase } from '../simulator-base.js';

class SchrodingerCatSimulator extends SimulatorBase {
    constructor() {
        super();
        this.boxOpen = false;
        this.observed = false;
        this.superpositionInterval = null;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .experiment-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-top: 1rem;
                }

                .box {
                    width: 200px;
                    height: 150px;
                    background: var(--card, #1e293b);
                    border: 3px solid var(--muted, #94a3b8);
                    border-radius: 0.5rem;
                    position: relative;
                    overflow: hidden;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .box:hover {
                    border-color: var(--primary, #6366f1);
                }

                .box-lid {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 30px;
                    background: var(--muted, #94a3b8);
                    transition: transform 0.5s;
                    transform-origin: top;
                    z-index: 2;
                }

                .box.open .box-lid {
                    transform: rotateX(-120deg);
                }

                .box-interior {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                    padding-top: 30px;
                }

                .cat-state {
                    font-size: 4rem;
                    transition: all 0.3s;
                }

                .superposition {
                    animation: flicker 0.2s infinite;
                }

                @keyframes flicker {
                    0%, 49% { content: "cat-alive"; }
                    50%, 100% { content: "cat-dead"; }
                }

                .superposition-text {
                    animation: textFlicker 0.2s infinite;
                }

                @keyframes textFlicker {
                    0%, 49% { opacity: 1; }
                    50%, 100% { opacity: 0.5; }
                }

                .state-display {
                    margin-top: 1rem;
                    padding: 1rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    text-align: center;
                    min-width: 250px;
                }

                .wavefunction {
                    font-family: monospace;
                    font-size: 1.1rem;
                    color: var(--accent, #f59e0b);
                    margin: 0.5rem 0;
                }

                .probability-display {
                    display: flex;
                    justify-content: space-around;
                    margin-top: 1rem;
                }

                .prob-item {
                    text-align: center;
                }

                .prob-value {
                    font-size: 1.5rem;
                    font-weight: bold;
                }

                .prob-label {
                    font-size: 0.8rem;
                    color: var(--muted, #94a3b8);
                }

                .alive { color: #22c55e; }
                .dead { color: #ef4444; }

                .components {
                    display: flex;
                    gap: 1rem;
                    margin-top: 1rem;
                    flex-wrap: wrap;
                    justify-content: center;
                }

                .component {
                    background: var(--card, #1e293b);
                    padding: 0.5rem 1rem;
                    border-radius: 0.25rem;
                    font-size: 0.8rem;
                }

                @media (max-width: 600px) {
                    .box {
                        width: 160px;
                        height: 120px;
                    }

                    .cat-state {
                        font-size: 3rem;
                    }
                }
            </style>

            <h4>Quantum Superposition Experiment</h4>

            <div class="components">
                <div class="component">&#x2622; Radioactive atom</div>
                <div class="component">&#x1F9EA; Geiger counter</div>
                <div class="component">&#x1F52B; Poison trigger</div>
                <div class="component">&#x1F408; Cat</div>
            </div>

            <div class="experiment-container">
                <div class="box" id="box">
                    <div class="box-lid"></div>
                    <div class="box-interior">
                        <div class="cat-state" id="cat">&#x1F408;</div>
                    </div>
                </div>

                <div class="state-display">
                    <div id="state-text">Box is closed</div>
                    <div class="wavefunction" id="wavefunction">|cat> = |alive> + |dead></div>
                    <div class="probability-display">
                        <div class="prob-item">
                            <div class="prob-value alive" id="alive-prob">50%</div>
                            <div class="prob-label">Alive</div>
                        </div>
                        <div class="prob-item">
                            <div class="prob-value dead" id="dead-prob">50%</div>
                            <div class="prob-label">Dead</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="controls" style="justify-content: center; margin-top: 1rem;">
                <button id="observe-btn">Open Box</button>
                <button id="reset-btn">New Experiment</button>
            </div>

            <div class="result" id="result">
                <p>The cat exists in a superposition of alive AND dead states.</p>
                <p>Click "Open Box" to collapse the wavefunction and observe the outcome.</p>
            </div>

            <div class="insight">
                Until observed, the cat is in both states simultaneously. Observation doesn't just reveal reality - it creates a definite outcome from quantum possibilities. This challenges our notion of objective reality independent of measurement.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#observe-btn').addEventListener('click', () => this.observe());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
        this.$('#box').addEventListener('click', () => this.observe());
    }

    connectedCallback() {
        super.connectedCallback();
        this.startSuperposition();
    }

    startSuperposition() {
        const cat = this.$('#cat');
        let isAlive = true;

        this.superpositionInterval = setInterval(() => {
            if (!this.observed) {
                cat.textContent = isAlive ? '\u{1F408}' : '\u{1F480}';
                isAlive = !isAlive;
            }
        }, 150);
    }

    observe() {
        if (this.observed) return;
        this.observed = true;

        clearInterval(this.superpositionInterval);

        const box = this.$('#box');
        const cat = this.$('#cat');
        const isAlive = Math.random() > 0.5;

        box.classList.add('open');

        setTimeout(() => {
            cat.textContent = isAlive ? '\u{1F408}' : '\u{1F480}';
            cat.classList.remove('superposition');

            this.$('#state-text').textContent = 'Wavefunction collapsed!';
            this.$('#wavefunction').textContent = isAlive ? '|cat> = |alive>' : '|cat> = |dead>';

            this.$('#alive-prob').textContent = isAlive ? '100%' : '0%';
            this.$('#dead-prob').textContent = isAlive ? '0%' : '100%';

            this.$('#result').innerHTML = isAlive
                ? `<p style="color: #22c55e;"><strong>The cat is ALIVE!</strong></p>
                   <p>The radioactive atom did not decay. The wavefunction collapsed to the alive state.</p>
                   <p>Before observation, both outcomes were equally real.</p>`
                : `<p style="color: #ef4444;"><strong>The cat is DEAD!</strong></p>
                   <p>The radioactive atom decayed, triggering the poison. The wavefunction collapsed to the dead state.</p>
                   <p>Before observation, both outcomes were equally real.</p>`;
        }, 500);
    }

    reset() {
        this.observed = false;
        clearInterval(this.superpositionInterval);

        const box = this.$('#box');
        const cat = this.$('#cat');

        box.classList.remove('open');
        cat.classList.add('superposition');

        this.$('#state-text').textContent = 'Box is closed';
        this.$('#wavefunction').textContent = '|cat> = |alive> + |dead>';
        this.$('#alive-prob').textContent = '50%';
        this.$('#dead-prob').textContent = '50%';

        this.$('#result').innerHTML = `
            <p>The cat exists in a superposition of alive AND dead states.</p>
            <p>Click "Open Box" to collapse the wavefunction and observe the outcome.</p>
        `;

        this.startSuperposition();
    }

    cleanup() {
        clearInterval(this.superpositionInterval);
    }
}

customElements.define('schrodinger-cat-simulator', SchrodingerCatSimulator);

export { SchrodingerCatSimulator };
