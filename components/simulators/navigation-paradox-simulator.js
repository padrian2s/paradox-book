import { SimulatorBase } from '../simulator-base.js';

class NavigationParadoxSimulator extends SimulatorBase {
    constructor() {
        super();
        this.ships = [];
        this.collisionCount = 0;
        this.animationFrame = null;
        this.isRunning = false;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .ocean-container {
                    padding: 1rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                }

                .ocean {
                    width: 100%;
                    height: 250px;
                    background: linear-gradient(180deg, #1e3a5f 0%, #0c1929 100%);
                    border-radius: 0.5rem;
                    position: relative;
                    overflow: hidden;
                }

                .ship {
                    position: absolute;
                    font-size: 1.5rem;
                    transition: transform 0.1s linear;
                }

                .ship.collision {
                    animation: flash-red 0.3s ease-in-out;
                }

                @keyframes flash-red {
                    0%, 100% { filter: none; }
                    50% { filter: drop-shadow(0 0 10px #dc2626); }
                }

                .lane {
                    position: absolute;
                    height: 2px;
                    width: 100%;
                    background: rgba(148, 163, 184, 0.2);
                }

                .precision-indicator {
                    position: absolute;
                    bottom: 10px;
                    left: 10px;
                    padding: 0.5rem;
                    background: rgba(0,0,0,0.5);
                    border-radius: 0.25rem;
                    font-size: 0.75rem;
                }

                .mode-buttons {
                    display: flex;
                    gap: 0.5rem;
                    margin-bottom: 1rem;
                }

                .mode-buttons button {
                    flex: 1;
                }

                .mode-buttons button.active {
                    background: var(--accent, #f59e0b);
                }

                .stats-row {
                    display: flex;
                    justify-content: space-around;
                    margin-top: 1rem;
                }

                .stat {
                    text-align: center;
                    padding: 0.75rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    min-width: 100px;
                }

                .stat-value {
                    font-size: 1.5rem;
                    font-weight: bold;
                }

                .stat-label {
                    font-size: 0.7rem;
                    color: var(--muted);
                }

                .explanation-box {
                    margin-top: 1rem;
                    padding: 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                }

                .explanation-title {
                    font-weight: bold;
                    color: var(--accent);
                    margin-bottom: 0.5rem;
                }

                .explanation-text {
                    font-size: 0.875rem;
                    color: var(--muted);
                    line-height: 1.5;
                }

                @media (max-width: 600px) {
                    .ocean {
                        height: 200px;
                    }
                    .mode-buttons {
                        flex-direction: column;
                    }
                }
            </style>

            <h4>Navigation Paradox</h4>
            <p style="color: var(--muted); margin-bottom: 1rem;">Precise navigation concentrates traffic in narrow lanes.</p>

            <div class="mode-buttons">
                <button id="imprecise-btn" class="active">Imprecise Navigation (Old)</button>
                <button id="precise-btn">Precise GPS (Modern)</button>
            </div>

            <div class="controls">
                <button id="start-btn">Start Simulation</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="ocean-container">
                <div class="ocean" id="ocean">
                    <div class="lane" style="top: 25%;"></div>
                    <div class="lane" style="top: 50%;"></div>
                    <div class="lane" style="top: 75%;"></div>
                    <div class="precision-indicator" id="precision-indicator">Mode: Imprecise</div>
                </div>

                <div class="stats-row">
                    <div class="stat">
                        <div class="stat-value" id="ship-count">0</div>
                        <div class="stat-label">Ships</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value" id="collision-count" style="color: #dc2626;">0</div>
                        <div class="stat-label">Near Misses</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value" id="spread-value">High</div>
                        <div class="stat-label">Path Spread</div>
                    </div>
                </div>
            </div>

            <div class="result" id="result">
                <p>Select a navigation mode and click "Start Simulation" to compare.</p>
            </div>

            <div class="explanation-box">
                <div class="explanation-title">Why Does Precision Cause Problems?</div>
                <div class="explanation-text">
                    With imprecise navigation, ships spread naturally across a wide area.
                    With GPS precision, every ship follows the exact same "optimal" path,
                    concentrating all traffic in narrow corridors. More ships in less space = more collision risk.
                </div>
            </div>

            <div class="insight">
                This paradox appears in aviation (TCAS), shipping lanes, and even hiking trails. When everyone finds the "best" path, that path becomes congested and dangerous.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#imprecise-btn').addEventListener('click', () => this.setMode('imprecise'));
        this.$('#precise-btn').addEventListener('click', () => this.setMode('precise'));
        this.$('#start-btn').addEventListener('click', () => this.startSimulation());
        this.$('#reset-btn').addEventListener('click', () => this.reset());

        this.mode = 'imprecise';
    }

    setMode(mode) {
        this.mode = mode;
        this.reset();

        this.$('#imprecise-btn').classList.toggle('active', mode === 'imprecise');
        this.$('#precise-btn').classList.toggle('active', mode === 'precise');

        this.$('#precision-indicator').textContent = mode === 'precise' ? 'Mode: GPS Precise' : 'Mode: Imprecise';
        this.$('#spread-value').textContent = mode === 'precise' ? 'Low' : 'High';
        this.$('#spread-value').style.color = mode === 'precise' ? '#dc2626' : '#22c55e';
    }

    startSimulation() {
        this.reset();
        this.isRunning = true;

        const ocean = this.$('#ocean');
        const lanePositions = [25, 50, 75];

        for (let i = 0; i < 12; i++) {
            const ship = document.createElement('div');
            ship.className = 'ship';
            ship.textContent = '\\u26F5';

            let yPos;
            if (this.mode === 'precise') {
                const laneIndex = i % 3;
                yPos = lanePositions[laneIndex] + (Math.random() - 0.5) * 3;
            } else {
                yPos = 15 + Math.random() * 70;
            }

            ship.style.top = yPos + '%';
            ship.style.left = '-30px';

            ocean.appendChild(ship);

            this.ships.push({
                element: ship,
                x: -30,
                y: yPos,
                speed: 0.3 + Math.random() * 0.2,
                delay: i * 500
            });
        }

        this.$('#ship-count').textContent = this.ships.length;

        setTimeout(() => this.animate(), 100);
    }

    animate() {
        if (!this.isRunning) return;

        const now = Date.now();

        this.ships.forEach((ship, i) => {
            if (now > ship.delay) {
                ship.x += ship.speed;
                ship.element.style.left = ship.x + 'px';

                this.ships.forEach((other, j) => {
                    if (i !== j && now > other.delay) {
                        const dx = Math.abs(ship.x - other.x);
                        const dy = Math.abs(ship.y - other.y);

                        if (dx < 25 && dy < 5 && !ship.collided) {
                            ship.collided = true;
                            this.collisionCount++;
                            this.$('#collision-count').textContent = this.collisionCount;
                            ship.element.classList.add('collision');
                            other.element.classList.add('collision');

                            setTimeout(() => {
                                ship.element.classList.remove('collision');
                                other.element.classList.remove('collision');
                            }, 300);
                        }
                    }
                });
            }
        });

        const allDone = this.ships.every(s => s.x > 350);
        if (!allDone) {
            this.animationFrame = requestAnimationFrame(() => this.animate());
        } else {
            this.showResults();
        }
    }

    showResults() {
        const mode = this.mode;
        if (mode === 'precise') {
            this.$('#result').innerHTML = `
                <p style="color: #dc2626;"><strong>High Collision Risk!</strong></p>
                <p>Precise navigation concentrated all ${this.ships.length} ships into narrow lanes.</p>
                <p>Near misses: ${this.collisionCount}. Everyone following the same "optimal" route creates danger.</p>
            `;
        } else {
            this.$('#result').innerHTML = `
                <p style="color: #22c55e;"><strong>Natural Spread!</strong></p>
                <p>Imprecise navigation spread ships across the ocean naturally.</p>
                <p>Near misses: ${this.collisionCount}. The "sloppiness" actually provides safety margins.</p>
            `;
        }
    }

    reset() {
        this.isRunning = false;
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }

        const ocean = this.$('#ocean');
        this.ships.forEach(s => s.element.remove());
        this.ships = [];
        this.collisionCount = 0;

        this.$('#ship-count').textContent = '0';
        this.$('#collision-count').textContent = '0';
        this.$('#result').innerHTML = '<p>Select a navigation mode and click "Start Simulation" to compare.</p>';
    }

    cleanup() {
        this.isRunning = false;
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }
}

customElements.define('navigation-paradox-simulator', NavigationParadoxSimulator);

export { NavigationParadoxSimulator };
