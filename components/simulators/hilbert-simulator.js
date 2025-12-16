/**
 * Hilbert's Hotel Simulator
 * Demonstrates that a full infinite hotel can accommodate new guests
 */
import { SimulatorBase } from '../simulator-base.js';

class HilbertSimulator extends SimulatorBase {
    constructor() {
        super();
        this.ops = 0;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .hilbert-hotel {
                    padding: 1rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .hilbert-rooms {
                    display: flex;
                    gap: 4px;
                    overflow-x: auto;
                    padding: 1rem 0;
                }

                .hilbert-room {
                    min-width: 40px;
                    height: 50px;
                    background: var(--primary, #6366f1);
                    border-radius: 4px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.7rem;
                    transition: all 0.3s;
                }

                .hilbert-room.moving {
                    animation: roomShift 0.5s ease;
                }

                .hilbert-room .room-num {
                    font-weight: bold;
                    color: white;
                }

                .hilbert-room .guest {
                    font-size: 1rem;
                }

                .hilbert-info {
                    display: flex;
                    justify-content: space-around;
                    color: var(--muted, #94a3b8);
                    font-size: 0.875rem;
                }

                @keyframes roomShift {
                    0% { transform: translateX(0); }
                    50% { transform: translateX(10px); background: var(--accent, #f59e0b); }
                    100% { transform: translateX(0); }
                }

                .animation-message {
                    margin-top: 1rem;
                    padding: 1rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    min-height: 60px;
                }

                @media (max-width: 768px) {
                    .controls {
                        flex-direction: column;
                    }

                    .hilbert-room {
                        min-width: 32px;
                        height: 42px;
                        font-size: 0.6rem;
                    }

                    .hilbert-room .guest {
                        font-size: 0.85rem;
                    }

                    .hilbert-info {
                        flex-direction: column;
                        gap: 0.25rem;
                        text-align: center;
                    }
                }
            </style>

            <h4>Infinite Hotel Manager</h4>

            <div class="controls">
                <button id="add-one-btn">+1 Guest Arrives</button>
                <button id="add-infinite-btn">+Infinity Guests Arrive</button>
                <button id="reset-btn">Reset Hotel</button>
            </div>

            <div class="hilbert-hotel">
                <div class="hilbert-rooms" id="rooms"></div>
                <div class="hilbert-info">
                    <span>Rooms: Infinity</span>
                    <span>Occupied: <span id="occupied">Infinity</span></span>
                    <span>Vacant: <span id="vacant">0</span></span>
                </div>
            </div>

            <div class="animation-message">
                <p id="message">The Grand Hotel is full. Every room has a guest.</p>
            </div>

            <div class="result">
                <p>Operations performed: <span id="ops">0</span></p>
            </div>

            <div class="insight">
                This demonstrates that Infinity + 1 = Infinity and Infinity + Infinity = Infinity. Countable infinities have surprising properties that defy our finite intuition.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#add-one-btn').addEventListener('click', () => this.addOne());
        this.$('#add-infinite-btn').addEventListener('click', () => this.addInfinite());
        this.$('#reset-btn').addEventListener('click', () => this.reset());

        this.reset();
    }

    renderRooms() {
        const container = this.$('#rooms');
        container.innerHTML = '';

        for (let i = 1; i <= 15; i++) {
            const room = document.createElement('div');
            room.className = 'hilbert-room';
            room.innerHTML = `<span class="room-num">${i}</span><span class="guest">&#128100;</span>`;
            container.appendChild(room);
        }

        const ellipsis = document.createElement('div');
        ellipsis.className = 'hilbert-room';
        ellipsis.innerHTML = '<span>...</span><span>Infinity</span>';
        container.appendChild(ellipsis);
    }

    reset() {
        this.ops = 0;
        this.$('#ops').textContent = '0';
        this.$('#occupied').textContent = 'Infinity';
        this.$('#vacant').textContent = '0';
        this.$('#message').textContent = 'The Grand Hotel is full. Every room has a guest.';
        this.renderRooms();
    }

    addOne() {
        this.ops++;
        this.$('#ops').textContent = this.ops;
        this.$('#message').innerHTML =
            'A new guest arrives! <br>Solution: Move guest n to room n+1. Room 1 is now free!';

        const rooms = this.$$('.hilbert-room');
        rooms.forEach(r => r.classList.add('moving'));
        setTimeout(() => rooms.forEach(r => r.classList.remove('moving')), 500);
    }

    addInfinite() {
        this.ops++;
        this.$('#ops').textContent = this.ops;
        this.$('#message').innerHTML =
            'Infinitely many new guests arrive! <br>Solution: Move guest n to room 2n. All odd rooms are now free!';

        const rooms = this.$$('.hilbert-room');
        rooms.forEach(r => r.classList.add('moving'));
        setTimeout(() => rooms.forEach(r => r.classList.remove('moving')), 500);
    }
}

customElements.define('hilbert-simulator', HilbertSimulator);

export { HilbertSimulator };
