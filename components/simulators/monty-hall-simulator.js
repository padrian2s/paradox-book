/**
 * Monty Hall Problem Simulator
 * The classic game show probability puzzle
 */
import { SimulatorBase } from '../simulator-base.js';

class MontyHallSimulator extends SimulatorBase {
    constructor() {
        super();
        this.carPosition = 0;
        this.selectedDoor = null;
        this.openedDoor = null;
        this.gamePhase = 'select'; // select, switch, reveal
        this.stats = { stay: { wins: 0, total: 0 }, switch: { wins: 0, total: 0 } };
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .doors-container {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                    margin: 2rem 0;
                }

                .door {
                    width: 100px;
                    height: 150px;
                    background: linear-gradient(180deg, #78350f, #451a03);
                    border: 4px solid #92400e;
                    border-radius: 0.5rem 0.5rem 0 0;
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s;
                    position: relative;
                }

                .door:hover:not(.opened):not(.disabled) {
                    transform: scale(1.05);
                    box-shadow: 0 0 20px rgba(99, 102, 241, 0.5);
                }

                .door.selected {
                    border-color: var(--primary, #6366f1);
                    box-shadow: 0 0 20px rgba(99, 102, 241, 0.5);
                }

                .door.opened {
                    background: var(--card, #1e293b);
                    cursor: default;
                }

                .door.disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                .door-number {
                    font-size: 2rem;
                    font-weight: bold;
                    color: #fbbf24;
                }

                .door-content {
                    font-size: 3rem;
                    display: none;
                }

                .door.opened .door-content {
                    display: block;
                }

                .door.opened .door-number {
                    display: none;
                }

                .door-handle {
                    position: absolute;
                    right: 10px;
                    top: 50%;
                    width: 8px;
                    height: 20px;
                    background: #fbbf24;
                    border-radius: 2px;
                }

                .game-status {
                    text-align: center;
                    font-size: 1.25rem;
                    margin: 1rem 0;
                    color: var(--text, #e2e8f0);
                }

                .action-buttons {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                    margin: 1rem 0;
                }

                .action-buttons button {
                    padding: 1rem 2rem;
                }

                .action-buttons button.switch-btn {
                    background: var(--accent, #f59e0b);
                }

                .stats-container {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                    margin-top: 1.5rem;
                }

                .stat-card {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .stat-title {
                    color: var(--muted, #94a3b8);
                    margin-bottom: 0.5rem;
                }

                .stat-rate {
                    font-size: 2rem;
                    font-weight: bold;
                }

                .stat-rate.stay {
                    color: var(--primary, #6366f1);
                }

                .stat-rate.switch {
                    color: var(--accent, #f59e0b);
                }

                .stat-detail {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                }
            </style>

            <h4>The Three Doors Game</h4>
            <p style="color: var(--muted); margin-bottom: 1rem;">Pick a door, then decide: stay or switch?</p>

            <div class="doors-container" id="doors">
                <div class="door" data-door="0">
                    <span class="door-number">1</span>
                    <span class="door-content" id="door-content-0"></span>
                    <div class="door-handle"></div>
                </div>
                <div class="door" data-door="1">
                    <span class="door-number">2</span>
                    <span class="door-content" id="door-content-1"></span>
                    <div class="door-handle"></div>
                </div>
                <div class="door" data-door="2">
                    <span class="door-number">3</span>
                    <span class="door-content" id="door-content-2"></span>
                    <div class="door-handle"></div>
                </div>
            </div>

            <div class="game-status" id="status">Click a door to make your selection!</div>

            <div class="action-buttons" id="actions" style="display: none;">
                <button id="stay-btn">Stay with Door <span id="stay-door">1</span></button>
                <button id="switch-btn" class="switch-btn">Switch to Door <span id="switch-door">2</span></button>
            </div>

            <div class="controls" style="justify-content: center;">
                <button id="reset-btn">New Game</button>
                <button id="simulate-btn">Run 100 Simulations</button>
            </div>

            <div class="stats-container">
                <div class="stat-card">
                    <div class="stat-title">Stay Strategy</div>
                    <div class="stat-rate stay" id="stay-rate">0%</div>
                    <div class="stat-detail" id="stay-detail">0 / 0 wins</div>
                </div>
                <div class="stat-card">
                    <div class="stat-title">Switch Strategy</div>
                    <div class="stat-rate switch" id="switch-rate">0%</div>
                    <div class="stat-detail" id="switch-detail">0 / 0 wins</div>
                </div>
            </div>

            <div class="insight">
                Switching wins 2/3 of the time! When you first pick, you have 1/3 chance of being right. Monty's reveal gives you information - if your first choice was wrong (2/3 chance), switching always wins.
            </div>
        `;
    }

    setupEventListeners() {
        this.$$('.door').forEach(door => {
            door.addEventListener('click', () => this.selectDoor(parseInt(door.dataset.door)));
        });

        this.$('#stay-btn').addEventListener('click', () => this.makeChoice(false));
        this.$('#switch-btn').addEventListener('click', () => this.makeChoice(true));
        this.$('#reset-btn').addEventListener('click', () => this.resetGame());
        this.$('#simulate-btn').addEventListener('click', () => this.runSimulations());

        this.resetGame();
    }

    resetGame() {
        this.carPosition = Math.floor(Math.random() * 3);
        this.selectedDoor = null;
        this.openedDoor = null;
        this.gamePhase = 'select';

        // Reset door visuals
        this.$$('.door').forEach((door, i) => {
            door.classList.remove('selected', 'opened', 'disabled');
            this.$(`#door-content-${i}`).textContent = '';
        });

        this.$('#actions').style.display = 'none';
        this.$('#status').textContent = 'Click a door to make your selection!';
    }

    selectDoor(doorIndex) {
        if (this.gamePhase !== 'select') return;

        this.selectedDoor = doorIndex;
        this.gamePhase = 'switch';

        // Highlight selected door
        this.$$('.door').forEach((door, i) => {
            door.classList.toggle('selected', i === doorIndex);
        });

        // Monty opens a door with a goat
        const availableDoors = [0, 1, 2].filter(d => d !== this.selectedDoor && d !== this.carPosition);
        this.openedDoor = availableDoors[Math.floor(Math.random() * availableDoors.length)];

        // Open the door
        const openedDoorEl = this.$(`[data-door="${this.openedDoor}"]`);
        openedDoorEl.classList.add('opened');
        this.$(`#door-content-${this.openedDoor}`).textContent = '🐐';

        // Calculate switch door
        const switchDoor = [0, 1, 2].find(d => d !== this.selectedDoor && d !== this.openedDoor);

        // Update UI
        this.$('#stay-door').textContent = this.selectedDoor + 1;
        this.$('#switch-door').textContent = switchDoor + 1;
        this.$('#actions').style.display = 'flex';
        this.$('#status').textContent = `Door ${this.openedDoor + 1} has a goat! Do you stay or switch?`;
    }

    makeChoice(switchDoor) {
        if (this.gamePhase !== 'switch') return;

        const finalDoor = switchDoor ?
            [0, 1, 2].find(d => d !== this.selectedDoor && d !== this.openedDoor) :
            this.selectedDoor;

        const won = finalDoor === this.carPosition;

        // Update stats
        const strategy = switchDoor ? 'switch' : 'stay';
        this.stats[strategy].total++;
        if (won) this.stats[strategy].wins++;

        // Reveal all doors
        this.$$('.door').forEach((door, i) => {
            door.classList.add('opened');
            this.$(`#door-content-${i}`).textContent = i === this.carPosition ? '🚗' : '🐐';
        });

        // Update status
        this.$('#status').textContent = won ?
            `You won the car! ${switchDoor ? 'Switching' : 'Staying'} was the right choice!` :
            `You got a goat! ${switchDoor ? 'Switching' : 'Staying'} didn't work this time.`;

        this.$('#actions').style.display = 'none';
        this.gamePhase = 'reveal';

        this.updateStats();
    }

    updateStats() {
        const stayRate = this.stats.stay.total > 0 ?
            (this.stats.stay.wins / this.stats.stay.total * 100).toFixed(1) : '0';
        const switchRate = this.stats.switch.total > 0 ?
            (this.stats.switch.wins / this.stats.switch.total * 100).toFixed(1) : '0';

        this.$('#stay-rate').textContent = stayRate + '%';
        this.$('#switch-rate').textContent = switchRate + '%';
        this.$('#stay-detail').textContent = `${this.stats.stay.wins} / ${this.stats.stay.total} wins`;
        this.$('#switch-detail').textContent = `${this.stats.switch.wins} / ${this.stats.switch.total} wins`;
    }

    runSimulations() {
        for (let i = 0; i < 100; i++) {
            const carPos = Math.floor(Math.random() * 3);
            const firstChoice = Math.floor(Math.random() * 3);

            // Stay strategy
            this.stats.stay.total++;
            if (firstChoice === carPos) this.stats.stay.wins++;

            // Switch strategy (always wins unless first choice was correct)
            this.stats.switch.total++;
            if (firstChoice !== carPos) this.stats.switch.wins++;
        }

        this.updateStats();
        this.$('#status').textContent = 'Ran 100 simulations! Check the stats below.';
    }
}

customElements.define('monty-hall-simulator', MontyHallSimulator);

export { MontyHallSimulator };
