import { SimulatorBase } from '../simulator-base.js';

class GrayParadoxSimulator extends SimulatorBase {
    constructor() {
        super();
        this.speed = 0;
        this.animationFrame = null;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .ocean-scene {
                    background: linear-gradient(180deg, #0c4a6e 0%, #164e63 50%, #0f172a 100%);
                    border-radius: 0.5rem;
                    padding: 1rem;
                    position: relative;
                    height: 200px;
                    overflow: hidden;
                    margin-top: 1rem;
                }

                .dolphin {
                    position: absolute;
                    left: 10%;
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: 3rem;
                    transition: left 0.5s ease;
                }

                .speed-indicator {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: rgba(0,0,0,0.5);
                    padding: 0.5rem 1rem;
                    border-radius: 0.25rem;
                    font-size: 1.25rem;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                }

                .wake-lines {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                }

                .wake-line {
                    position: absolute;
                    height: 2px;
                    background: linear-gradient(90deg, rgba(255,255,255,0.5), transparent);
                    animation: wake 1s linear infinite;
                }

                @keyframes wake {
                    from { transform: translateX(0); opacity: 0.5; }
                    to { transform: translateX(-100px); opacity: 0; }
                }

                .power-comparison {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    margin-top: 1.5rem;
                }

                .power-box {
                    background: var(--bg, #0f172a);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .power-value {
                    font-size: 1.5rem;
                    font-weight: bold;
                }

                .power-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                .expected { color: #ef4444; }
                .actual { color: #22c55e; }

                .explanation-cards {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .explanation-card {
                    background: var(--bg, #0f172a);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    border-left: 3px solid var(--primary, #6366f1);
                }

                .explanation-card h5 {
                    color: var(--primary, #6366f1);
                    margin-bottom: 0.5rem;
                    font-size: 0.875rem;
                }

                .explanation-card p {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }

                @media (max-width: 768px) {
                    .power-comparison {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>Dolphin Swimming Efficiency</h4>
            <p style="color: var(--muted, #94a3b8); margin-bottom: 1rem;">Set dolphin speed and see the power paradox.</p>

            <div class="controls">
                <div class="control-group">
                    <label>Speed: <span id="speed-val">20</span> mph</label>
                    <input type="range" id="speed-slider" min="5" max="35" value="20">
                </div>
                <button id="swim-btn">Swim!</button>
            </div>

            <div class="ocean-scene">
                <div class="dolphin" id="dolphin">&#x1F42C;</div>
                <div class="speed-indicator"><span id="current-speed">0</span> mph</div>
                <div class="wake-lines" id="wake-container"></div>
            </div>

            <div class="power-comparison">
                <div class="power-box">
                    <div class="power-value expected" id="expected-power">0</div>
                    <div class="power-label">Expected Power Needed (Watts)</div>
                </div>
                <div class="power-box">
                    <div class="power-value actual" id="actual-power">0</div>
                    <div class="power-label">Available Muscle Power (Watts)</div>
                </div>
            </div>

            <div class="result" id="paradox-result">
                <p>Adjust speed and click "Swim!" to see the paradox.</p>
            </div>

            <div class="explanation-cards">
                <div class="explanation-card">
                    <h5>Laminar Flow</h5>
                    <p>Dolphins maintain smooth water flow, reducing drag by up to 90%.</p>
                </div>
                <div class="explanation-card">
                    <h5>Skin Flexibility</h5>
                    <p>Their skin dampens turbulence that would slow them down.</p>
                </div>
                <div class="explanation-card">
                    <h5>Tail Efficiency</h5>
                    <p>The tail fin generates thrust with minimal energy loss.</p>
                </div>
            </div>

            <div class="insight">
                Sir James Gray calculated in 1936 that dolphins should need 7x more muscle power than they have. The resolution: dolphins are hydrodynamically perfect, maintaining laminar flow that rigid models can't achieve.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#speed-slider').addEventListener('input', (e) => {
            this.$('#speed-val').textContent = e.target.value;
        });

        this.$('#swim-btn').addEventListener('click', () => this.simulate());
    }

    simulate() {
        const speed = parseInt(this.$('#speed-slider').value);
        const dolphin = this.$('#dolphin');
        const wakeContainer = this.$('#wake-container');

        wakeContainer.innerHTML = '';

        const expectedPower = Math.round(Math.pow(speed, 3) * 2.5);
        const actualPower = Math.round(speed * 45);

        this.$('#expected-power').textContent = expectedPower.toLocaleString();
        this.$('#actual-power').textContent = actualPower.toLocaleString();
        this.$('#current-speed').textContent = speed;

        const positions = [10, 30, 50, 70, 85];
        let posIndex = 0;

        const animate = () => {
            dolphin.style.left = positions[posIndex] + '%';

            if (posIndex < positions.length - 1) {
                const numWakes = Math.floor(speed / 10);
                for (let i = 0; i < numWakes; i++) {
                    const wake = document.createElement('div');
                    wake.className = 'wake-line';
                    wake.style.left = (positions[posIndex] - 5) + '%';
                    wake.style.top = (45 + Math.random() * 10) + '%';
                    wake.style.width = (20 + Math.random() * 30) + 'px';
                    wakeContainer.appendChild(wake);
                    setTimeout(() => wake.remove(), 1000);
                }
            }

            posIndex++;
            if (posIndex < positions.length) {
                setTimeout(animate, 400);
            }
        };

        dolphin.style.left = '10%';
        posIndex = 0;
        setTimeout(animate, 100);

        const deficit = expectedPower - actualPower;
        const ratio = (expectedPower / actualPower).toFixed(1);

        this.$('#paradox-result').innerHTML = `
            <p>At <strong>${speed} mph</strong>, a dolphin would need <strong>${expectedPower.toLocaleString()}W</strong> based on standard drag calculations,
            but only has <strong>${actualPower.toLocaleString()}W</strong> available - a gap of <strong>${ratio}x</strong>!</p>
        `;
    }

    cleanup() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }
}

customElements.define('gray-paradox-simulator', GrayParadoxSimulator);

export { GrayParadoxSimulator };
