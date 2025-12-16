/**
 * Tog's Paradox Simulator
 * Users believe keyboard shortcuts are faster, but mouse is often quicker
 */
import { SimulatorBase } from '../simulator-base.js';

class TogSimulator extends SimulatorBase {
    constructor() {
        super();
        this.mode = null;
        this.targetIndex = 0;
        this.targets = [];
        this.startTime = 0;
        this.mouseTime = null;
        this.keyboardTime = null;
        this.keyHandler = null;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .test-instructions {
                    color: var(--muted, #94a3b8);
                    margin-bottom: 1rem;
                    font-size: 0.875rem;
                }

                .arena {
                    height: 250px;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    grid-template-rows: repeat(3, 1fr);
                    gap: 0.5rem;
                    padding: 0.5rem;
                }

                .arena-btn {
                    background: var(--card, #1e293b);
                    border: 2px solid var(--muted, #94a3b8);
                    color: var(--text, #e2e8f0);
                    font-size: 1.5rem;
                    font-weight: bold;
                    cursor: pointer;
                    border-radius: 0.5rem;
                    transition: all 0.1s;
                }

                .arena-btn.highlight {
                    background: var(--primary, #6366f1);
                    border-color: var(--accent, #f59e0b);
                }

                .arena-btn:hover {
                    transform: scale(1.02);
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 0.5rem;
                    margin: 1rem 0;
                }

                .stat-box {
                    background: var(--card, #1e293b);
                    padding: 0.75rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .stat-value {
                    font-size: 1.25rem;
                    font-weight: bold;
                    color: var(--primary, #6366f1);
                }

                .stat-label {
                    font-size: 0.625rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                @media (max-width: 600px) {
                    .arena {
                        height: 200px;
                    }
                    .arena-btn {
                        font-size: 1.25rem;
                    }
                    .stats-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
            </style>

            <h4>Keyboard vs Mouse Speed Test</h4>
            <p class="test-instructions">Test your speed: Click the highlighted targets or use keyboard shortcuts (1-9).</p>

            <div class="controls">
                <button id="mouse-btn">Start Mouse Test</button>
                <button id="keyboard-btn">Start Keyboard Test (use 1-9)</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="arena" id="arena"></div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="mouse-time">-</div>
                    <div class="stat-label">Mouse Time</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="keyboard-time">-</div>
                    <div class="stat-label">Keyboard Time</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="mouse-feel">-</div>
                    <div class="stat-label">Mouse Felt</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="keyboard-feel">-</div>
                    <div class="stat-label">Keyboard Felt</div>
                </div>
            </div>

            <div class="result">
                <p id="result-text">Run both tests to compare!</p>
            </div>

            <div class="insight">
                Keyboard shortcuts feel faster because they require conscious attention. Mouse movements are automatic, making them feel "passive" - but they're often quicker!
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#mouse-btn').addEventListener('click', () => this.startTest('mouse'));
        this.$('#keyboard-btn').addEventListener('click', () => this.startTest('keyboard'));
        this.$('#reset-btn').addEventListener('click', () => this.reset());
    }

    startTest(mode) {
        this.mode = mode;
        this.targetIndex = 0;
        this.targets = Array.from({ length: 9 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);

        const arena = this.$('#arena');
        arena.innerHTML = '';

        for (let i = 1; i <= 9; i++) {
            const btn = document.createElement('button');
            btn.textContent = i;
            btn.className = 'arena-btn';
            btn.dataset.num = i;
            btn.addEventListener('click', () => this.handleClick(i));
            arena.appendChild(btn);
        }

        this.highlightTarget();
        this.startTime = performance.now();

        if (mode === 'keyboard') {
            this.keyHandler = (e) => this.handleKey(e);
            document.addEventListener('keydown', this.keyHandler);
        }
    }

    highlightTarget() {
        const arena = this.$('#arena');
        const buttons = arena.querySelectorAll('.arena-btn');

        buttons.forEach(btn => {
            btn.classList.remove('highlight');
        });

        if (this.targetIndex < this.targets.length) {
            const targetNum = this.targets[this.targetIndex];
            const targetBtn = Array.from(buttons).find(b => parseInt(b.dataset.num) === targetNum);
            if (targetBtn) {
                targetBtn.classList.add('highlight');
            }
        }
    }

    handleClick(num) {
        if (this.mode !== 'mouse') return;
        if (num === this.targets[this.targetIndex]) {
            this.targetIndex++;
            if (this.targetIndex >= this.targets.length) {
                this.endTest();
            } else {
                this.highlightTarget();
            }
        }
    }

    handleKey(e) {
        if (this.mode !== 'keyboard') return;
        const num = parseInt(e.key);
        if (num >= 1 && num <= 9 && num === this.targets[this.targetIndex]) {
            this.targetIndex++;
            if (this.targetIndex >= this.targets.length) {
                document.removeEventListener('keydown', this.keyHandler);
                this.endTest();
            } else {
                this.highlightTarget();
            }
        }
    }

    endTest() {
        const elapsed = ((performance.now() - this.startTime) / 1000).toFixed(2);

        if (this.mode === 'mouse') {
            this.mouseTime = elapsed;
            this.$('#mouse-time').textContent = elapsed + 's';
            this.$('#mouse-feel').textContent = 'Slow?';
        } else {
            this.keyboardTime = elapsed;
            this.$('#keyboard-time').textContent = elapsed + 's';
            this.$('#keyboard-feel').textContent = 'Fast?';
        }

        this.mode = null;
        this.updateResult();
    }

    updateResult() {
        if (this.mouseTime && this.keyboardTime) {
            const result = this.$('#result-text');
            const mouseFaster = parseFloat(this.mouseTime) < parseFloat(this.keyboardTime);

            if (mouseFaster) {
                const diff = (parseFloat(this.keyboardTime) - parseFloat(this.mouseTime)).toFixed(2);
                result.innerHTML = `<span style="color: #22c55e;">PARADOX CONFIRMED!</span> Mouse was ${diff}s faster, but keyboard probably FELT faster!`;
            } else {
                result.innerHTML = 'Keyboard was faster this time. Try again - the paradox often appears with complex menu navigation.';
            }
        }
    }

    reset() {
        if (this.keyHandler) {
            document.removeEventListener('keydown', this.keyHandler);
        }
        this.mode = null;
        this.mouseTime = null;
        this.keyboardTime = null;
        this.$('#arena').innerHTML = '';
        this.$('#mouse-time').textContent = '-';
        this.$('#keyboard-time').textContent = '-';
        this.$('#mouse-feel').textContent = '-';
        this.$('#keyboard-feel').textContent = '-';
        this.$('#result-text').textContent = 'Run both tests to compare!';
    }

    cleanup() {
        if (this.keyHandler) {
            document.removeEventListener('keydown', this.keyHandler);
        }
    }
}

customElements.define('tog-simulator', TogSimulator);

export { TogSimulator };
