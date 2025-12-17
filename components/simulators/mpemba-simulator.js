/**
 * Mpemba Effect Simulator
 * Hot water can freeze faster than cold water under certain conditions
 */
import { SimulatorBase } from '../simulator-base.js';

class MpembaSimulator extends SimulatorBase {
    constructor() {
        super();
        this.isRunning = false;
        this.hotTemp = 90;
        this.coldTemp = 30;
        this.animationId = null;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .experiment-container {
                    display: flex;
                    justify-content: space-around;
                    gap: 2rem;
                    margin-top: 1rem;
                    flex-wrap: wrap;
                }

                .beaker {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                    min-width: 150px;
                }

                .beaker-visual {
                    width: 100px;
                    height: 120px;
                    margin: 0 auto;
                    border: 3px solid var(--muted, #94a3b8);
                    border-top: none;
                    border-radius: 0 0 10px 10px;
                    position: relative;
                    overflow: hidden;
                }

                .water {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 90%;
                    transition: background 0.5s;
                }

                .hot-water {
                    background: linear-gradient(180deg, #ef4444 0%, #f97316 100%);
                }

                .cold-water {
                    background: linear-gradient(180deg, #3b82f6 0%, #06b6d4 100%);
                }

                .frozen {
                    background: linear-gradient(180deg, #e0f2fe 0%, #bae6fd 100%) !important;
                }

                .steam {
                    position: absolute;
                    top: -20px;
                    left: 50%;
                    transform: translateX(-50%);
                    font-size: 1.5rem;
                    opacity: 0;
                    transition: opacity 0.3s;
                }

                .steam.visible {
                    opacity: 0.7;
                    animation: steam 1s infinite;
                }

                @keyframes steam {
                    0%, 100% { transform: translateX(-50%) translateY(0); }
                    50% { transform: translateX(-50%) translateY(-5px); }
                }

                .temp-display {
                    font-size: 2rem;
                    font-weight: bold;
                    margin-top: 1rem;
                }

                .temp-hot { color: #ef4444; }
                .temp-cold { color: #3b82f6; }
                .temp-frozen { color: #06b6d4; }

                .status {
                    font-size: 0.9rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.5rem;
                }

                .freezer-display {
                    margin-top: 1rem;
                    padding: 1rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .freezer-temp {
                    font-size: 1.5rem;
                    color: #06b6d4;
                }

                .progress-container {
                    margin-top: 1rem;
                }

                .progress-row {
                    display: flex;
                    align-items: center;
                    margin-bottom: 0.5rem;
                    gap: 1rem;
                }

                .progress-label {
                    width: 80px;
                    font-size: 0.8rem;
                }

                .progress-bar {
                    flex: 1;
                    height: 20px;
                    background: var(--card, #1e293b);
                    border-radius: 0.25rem;
                    overflow: hidden;
                }

                .progress-fill {
                    height: 100%;
                    transition: width 0.1s;
                }

                .hot-progress { background: linear-gradient(90deg, #ef4444, #f97316); }
                .cold-progress { background: linear-gradient(90deg, #3b82f6, #06b6d4); }

                .factors-list {
                    margin-top: 1rem;
                    padding: 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                }

                .factor {
                    display: flex;
                    justify-content: space-between;
                    padding: 0.25rem 0;
                    font-size: 0.85rem;
                    border-bottom: 1px solid var(--bg, #0f172a);
                }

                .factor:last-child {
                    border-bottom: none;
                }

                @media (max-width: 600px) {
                    .experiment-container {
                        flex-direction: column;
                        align-items: center;
                    }
                }
            </style>

            <h4>Hot vs Cold Water Freezing Race</h4>

            <div class="experiment-container">
                <div class="beaker">
                    <div style="margin-bottom: 0.5rem; font-weight: bold;">Hot Water</div>
                    <div class="beaker-visual">
                        <div class="water hot-water" id="hot-water"></div>
                        <div class="steam visible" id="steam">&#x2668;</div>
                    </div>
                    <div class="temp-display temp-hot" id="hot-temp">90C</div>
                    <div class="status" id="hot-status">Steaming</div>
                </div>

                <div class="beaker">
                    <div style="margin-bottom: 0.5rem; font-weight: bold;">Cold Water</div>
                    <div class="beaker-visual">
                        <div class="water cold-water" id="cold-water"></div>
                    </div>
                    <div class="temp-display temp-cold" id="cold-temp">30C</div>
                    <div class="status" id="cold-status">Cool</div>
                </div>
            </div>

            <div class="freezer-display">
                <div>Freezer Temperature</div>
                <div class="freezer-temp">-20C</div>
            </div>

            <div class="progress-container">
                <div class="progress-row">
                    <div class="progress-label" style="color: #ef4444;">Hot Water</div>
                    <div class="progress-bar">
                        <div class="progress-fill hot-progress" id="hot-progress" style="width: 0%"></div>
                    </div>
                </div>
                <div class="progress-row">
                    <div class="progress-label" style="color: #3b82f6;">Cold Water</div>
                    <div class="progress-bar">
                        <div class="progress-fill cold-progress" id="cold-progress" style="width: 0%"></div>
                    </div>
                </div>
            </div>

            <div class="controls">
                <button id="start-btn">Start Freezing</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="factors-list">
                <div style="font-weight: bold; margin-bottom: 0.5rem;">Why Hot Water Can Freeze Faster:</div>
                <div class="factor">
                    <span>Evaporation</span>
                    <span style="color: var(--accent);">Less mass to freeze</span>
                </div>
                <div class="factor">
                    <span>Convection</span>
                    <span style="color: var(--accent);">Better heat transfer</span>
                </div>
                <div class="factor">
                    <span>Dissolved Gases</span>
                    <span style="color: var(--accent);">Expelled by heating</span>
                </div>
                <div class="factor">
                    <span>Supercooling</span>
                    <span style="color: var(--accent);">Cold water more prone</span>
                </div>
            </div>

            <div class="result" id="result">
                <p>Both containers go into a -20C freezer. Which freezes first?</p>
                <p>Intuition says the cold water should win...</p>
            </div>

            <div class="insight">
                The Mpemba effect is real but not fully understood. It depends on many factors: container shape, dissolved gases, evaporation, convection currents. Under the right conditions, hot water consistently freezes faster - defying our intuition about heat transfer.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#start-btn').addEventListener('click', () => this.startFreezing());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
    }

    startFreezing() {
        if (this.isRunning) return;
        this.isRunning = true;

        this.hotTemp = 90;
        this.coldTemp = 30;

        const mpembaFactor = 1.15;
        let hotFrozen = false;
        let coldFrozen = false;

        const freeze = () => {
            if (this.hotTemp > 0) {
                const hotCoolingRate = 0.8 * mpembaFactor;
                this.hotTemp -= hotCoolingRate;
                this.hotTemp = Math.max(0, this.hotTemp);
            }

            if (this.coldTemp > 0) {
                const coldCoolingRate = 0.6;
                this.coldTemp -= coldCoolingRate;
                this.coldTemp = Math.max(0, this.coldTemp);
            }

            this.$('#hot-temp').textContent = Math.round(this.hotTemp) + 'C';
            this.$('#cold-temp').textContent = Math.round(this.coldTemp) + 'C';

            const hotProgress = ((90 - this.hotTemp) / 90) * 100;
            const coldProgress = ((30 - this.coldTemp) / 30) * 100;

            this.$('#hot-progress').style.width = hotProgress + '%';
            this.$('#cold-progress').style.width = coldProgress + '%';

            if (this.hotTemp > 60) {
                this.$('#steam').classList.add('visible');
            } else {
                this.$('#steam').classList.remove('visible');
            }

            if (this.hotTemp <= 50 && this.hotTemp > 0) {
                this.$('#hot-status').textContent = 'Cooling rapidly';
            }

            if (this.coldTemp <= 15 && this.coldTemp > 0) {
                this.$('#cold-status').textContent = 'Supercooling...';
            }

            if (this.hotTemp <= 0 && !hotFrozen) {
                hotFrozen = true;
                this.$('#hot-water').classList.add('frozen');
                this.$('#hot-temp').classList.remove('temp-hot');
                this.$('#hot-temp').classList.add('temp-frozen');
                this.$('#hot-status').textContent = 'FROZEN!';

                if (!coldFrozen) {
                    this.$('#result').innerHTML = `
                        <p style="color: var(--accent);"><strong>Hot water froze first!</strong></p>
                        <p>The Mpemba Effect in action! Despite starting 60 degrees hotter, it froze first.</p>
                        <p>Evaporation, convection, and reduced dissolved gases gave it an advantage.</p>
                    `;
                }
            }

            if (this.coldTemp <= 0 && !coldFrozen) {
                coldFrozen = true;
                this.$('#cold-water').classList.add('frozen');
                this.$('#cold-temp').classList.remove('temp-cold');
                this.$('#cold-temp').classList.add('temp-frozen');
                this.$('#cold-status').textContent = 'FROZEN!';
            }

            if (hotFrozen && coldFrozen) {
                this.isRunning = false;
                return;
            }

            this.animationId = requestAnimationFrame(freeze);
        };

        freeze();
    }

    reset() {
        cancelAnimationFrame(this.animationId);
        this.isRunning = false;
        this.hotTemp = 90;
        this.coldTemp = 30;

        this.$('#hot-temp').textContent = '90C';
        this.$('#cold-temp').textContent = '30C';
        this.$('#hot-temp').classList.add('temp-hot');
        this.$('#hot-temp').classList.remove('temp-frozen');
        this.$('#cold-temp').classList.add('temp-cold');
        this.$('#cold-temp').classList.remove('temp-frozen');

        this.$('#hot-water').classList.remove('frozen');
        this.$('#cold-water').classList.remove('frozen');

        this.$('#steam').classList.add('visible');

        this.$('#hot-status').textContent = 'Steaming';
        this.$('#cold-status').textContent = 'Cool';

        this.$('#hot-progress').style.width = '0%';
        this.$('#cold-progress').style.width = '0%';

        this.$('#result').innerHTML = `
            <p>Both containers go into a -20C freezer. Which freezes first?</p>
            <p>Intuition says the cold water should win...</p>
        `;
    }

    cleanup() {
        cancelAnimationFrame(this.animationId);
    }
}

customElements.define('mpemba-simulator', MpembaSimulator);

export { MpembaSimulator };
