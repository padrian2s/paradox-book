import { SimulatorBase } from '../simulator-base.js';

class MovingRowsSimulator extends SimulatorBase {
    constructor() {
        super();
        this.animating = false;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .stadium {
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    padding: 1rem;
                    margin: 1rem 0;
                    position: relative;
                }

                .row {
                    display: flex;
                    justify-content: center;
                    gap: 4px;
                    margin: 8px 0;
                    transition: transform 1.5s ease-in-out;
                }

                .block {
                    width: 40px;
                    height: 40px;
                    border-radius: 4px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    font-size: 0.875rem;
                }

                .row-a .block {
                    background: var(--primary, #6366f1);
                }

                .row-b .block {
                    background: var(--accent, #f59e0b);
                }

                .row-c .block {
                    background: #22c55e;
                }

                .row-label {
                    position: absolute;
                    left: 10px;
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }

                .row-a-label { top: 25px; }
                .row-b-label { top: 73px; }
                .row-c-label { top: 121px; }

                .row-a.moved { transform: translateX(0); }
                .row-b.moved { transform: translateX(-88px); }
                .row-c.moved { transform: translateX(88px); }

                .counter-display {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .counter-box {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .counter-value {
                    font-size: 1.5rem;
                    font-weight: bold;
                }

                .counter-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }

                .perspective-tabs {
                    display: flex;
                    gap: 0.5rem;
                    margin-bottom: 1rem;
                }

                .perspective-tabs button {
                    flex: 1;
                    font-size: 0.875rem;
                }

                .perspective-tabs button.active {
                    background: var(--accent, #f59e0b);
                }
            </style>

            <h4>Zeno's Moving Rows</h4>
            <p style="color: var(--muted); margin-bottom: 1rem;">Three rows of blocks: A is stationary, B moves left, C moves right at equal speeds.</p>

            <div class="perspective-tabs">
                <button id="perspective-ground" class="active">Ground View</button>
                <button id="perspective-b">From Row B</button>
                <button id="perspective-c">From Row C</button>
            </div>

            <div class="stadium">
                <span class="row-label row-a-label">A (stationary)</span>
                <span class="row-label row-b-label">B (moves left)</span>
                <span class="row-label row-c-label">C (moves right)</span>

                <div class="row row-a" id="row-a">
                    <div class="block">A1</div>
                    <div class="block">A2</div>
                    <div class="block">A3</div>
                    <div class="block">A4</div>
                </div>
                <div class="row row-b" id="row-b">
                    <div class="block">B1</div>
                    <div class="block">B2</div>
                    <div class="block">B3</div>
                    <div class="block">B4</div>
                </div>
                <div class="row row-c" id="row-c">
                    <div class="block">C1</div>
                    <div class="block">C2</div>
                    <div class="block">C3</div>
                    <div class="block">C4</div>
                </div>
            </div>

            <div class="controls">
                <button id="move-btn">Move Rows</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="counter-display">
                <div class="counter-box">
                    <div class="counter-value" id="b-passes-a" style="color: var(--primary);">0</div>
                    <div class="counter-label">B passes A blocks</div>
                </div>
                <div class="counter-box">
                    <div class="counter-value" id="b-passes-c" style="color: #22c55e;">0</div>
                    <div class="counter-label">B passes C blocks</div>
                </div>
                <div class="counter-box">
                    <div class="counter-value" id="time-units" style="color: var(--accent);">0</div>
                    <div class="counter-label">Time Units</div>
                </div>
            </div>

            <div class="result" id="result">
                <p>Watch what happens when the rows move past each other.</p>
            </div>

            <div class="insight">
                Zeno argued: B passes 2 A-blocks in 2 time units, but passes 4 C-blocks in the same time. If passing one block = one time unit, then 2 = 4! The resolution: Zeno confused absolute and relative motion. Time doesn't depend on how many objects you pass.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#move-btn').addEventListener('click', () => this.move());
        this.$('#reset-btn').addEventListener('click', () => this.reset());

        this.$('#perspective-ground').addEventListener('click', () => this.setPerspective('ground'));
        this.$('#perspective-b').addEventListener('click', () => this.setPerspective('b'));
        this.$('#perspective-c').addEventListener('click', () => this.setPerspective('c'));
    }

    setPerspective(perspective) {
        this.$$('.perspective-tabs button').forEach(btn => btn.classList.remove('active'));
        this.$(`#perspective-${perspective}`).classList.add('active');

        const explanations = {
            ground: `<p><strong>Ground perspective:</strong> B moves left at speed v, C moves right at speed v. Both pass 2 A-blocks in time t.</p>`,
            b: `<p><strong>From B's perspective:</strong> A moves right at speed v (passes 2 blocks). But C moves right at speed 2v (passes 4 blocks)! Same time, different distances - this is relative velocity.</p>`,
            c: `<p><strong>From C's perspective:</strong> A moves left at speed v (passes 2 blocks). But B moves left at speed 2v (passes 4 blocks)! Relative motion doubles the apparent speed.</p>`
        };

        this.$('#result').innerHTML = explanations[perspective];
    }

    move() {
        if (this.animating) return;
        this.animating = true;

        this.$('#row-b').classList.add('moved');
        this.$('#row-c').classList.add('moved');

        let bPassesA = 0;
        let bPassesC = 0;
        let time = 0;

        const interval = setInterval(() => {
            time++;
            bPassesA = Math.min(time, 2);
            bPassesC = Math.min(time * 2, 4);

            this.$('#b-passes-a').textContent = bPassesA;
            this.$('#b-passes-c').textContent = bPassesC;
            this.$('#time-units').textContent = time;

            if (time >= 2) {
                clearInterval(interval);
                this.$('#result').innerHTML = `
                    <p style="color: var(--accent);"><strong>The Paradox:</strong></p>
                    <p>In 2 time units, B passed 2 A-blocks but 4 C-blocks!</p>
                    <p>Zeno thought this meant 2 time units = 4 time units (contradiction!).</p>
                    <p><strong>Resolution:</strong> The number of blocks passed depends on relative speed, not time. B and C approach each other at 2v, so they pass blocks twice as fast relative to each other.</p>
                `;
            }
        }, 750);
    }

    reset() {
        this.animating = false;

        this.$('#row-b').classList.remove('moved');
        this.$('#row-c').classList.remove('moved');

        this.$('#b-passes-a').textContent = '0';
        this.$('#b-passes-c').textContent = '0';
        this.$('#time-units').textContent = '0';

        this.$('#result').innerHTML = `<p>Watch what happens when the rows move past each other.</p>`;
    }
}

customElements.define('moving-rows-simulator', MovingRowsSimulator);

export { MovingRowsSimulator };
