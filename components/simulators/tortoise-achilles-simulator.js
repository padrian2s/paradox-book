/**
 * What the Tortoise Said to Achilles Simulator
 */
import { SimulatorBase } from '../simulator-base.js';

class TortoiseAchillesSimulator extends SimulatorBase {
    constructor() {
        super();
        this.step = 0;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}
                .dialogue { background: var(--bg); padding: 1rem; border-radius: 0.5rem; margin: 1rem 0; max-height: 300px; overflow-y: auto; }
                .line { padding: 0.5rem; margin: 0.25rem 0; border-radius: 0.25rem; }
                .achilles { background: rgba(59, 130, 246, 0.2); border-left: 3px solid #3b82f6; }
                .tortoise { background: rgba(34, 197, 94, 0.2); border-left: 3px solid #22c55e; }
                .premise { background: var(--card); padding: 0.75rem; margin: 0.25rem 0; border-radius: 0.25rem; font-family: monospace; }
            </style>
            <h4>Carroll's Infinite Regress</h4>
            <div class="premise"><strong>A:</strong> Things equal to the same thing are equal to each other.</div>
            <div class="premise"><strong>B:</strong> The two sides of this triangle are equal to the same thing.</div>
            <div class="premise"><strong>Z:</strong> Therefore, the two sides are equal to each other.</div>
            <div class="controls">
                <button id="next-btn">Next Step</button>
                <button id="reset-btn">Reset</button>
            </div>
            <div class="dialogue" id="dialogue"></div>
            <div class="result" id="result"><p>Achilles tries to convince the Tortoise to accept Z from A and B...</p></div>
            <div class="insight">Carroll showed that inference rules (like modus ponens) can't be treated as premises. If they could, we'd need another rule to apply them, leading to infinite regress. Rules of inference must be accepted, not proven.</div>
        `;
    }

    setupEventListeners() {
        this.$('#next-btn').addEventListener('click', () => this.nextStep());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
    }

    nextStep() {
        this.step++;
        const dialogue = this.$('#dialogue');
        const steps = [
            { speaker: 'tortoise', text: '"I accept A and B. But why must I accept Z?"' },
            { speaker: 'achilles', text: '"Because IF A and B are true, THEN Z must be true! Call this C."' },
            { speaker: 'tortoise', text: '"Very well. I now accept A, B, and C. But why must I accept Z?"' },
            { speaker: 'achilles', text: '"Because if A, B, AND C are true, then Z follows! Call this D."' },
            { speaker: 'tortoise', text: '"I accept A, B, C, and D. But why must I accept Z?"' },
            { speaker: 'achilles', text: '"...Because if A, B, C, D are true... call this E..."' },
            { speaker: 'tortoise', text: '"I see where this is going. And we\'ll need F, G, H..."' },
        ];

        if (this.step <= steps.length) {
            const s = steps[this.step - 1];
            dialogue.innerHTML += `<div class="line ${s.speaker}">${s.text}</div>`;
            dialogue.scrollTop = dialogue.scrollHeight;
        }

        if (this.step >= steps.length) {
            this.$('#result').innerHTML = `<p style="color: #ef4444;"><strong>Infinite Regress!</strong> Each new premise needs another premise to connect it. The Tortoise will never be forced to accept Z by logic alone.</p>`;
        }
    }

    reset() {
        this.step = 0;
        this.$('#dialogue').innerHTML = '';
        this.$('#result').innerHTML = '<p>Achilles tries to convince the Tortoise to accept Z from A and B...</p>';
    }
}

customElements.define('tortoise-achilles-simulator', TortoiseAchillesSimulator);
export { TortoiseAchillesSimulator };
