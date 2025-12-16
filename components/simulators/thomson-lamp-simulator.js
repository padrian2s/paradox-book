/**
 * Thomson's Lamp Simulator
 */
import { SimulatorBase } from '../simulator-base.js';

class ThomsonLampSimulator extends SimulatorBase {
    constructor() { super(); this.running = false; }
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}
                .lamp { font-size: 4rem; text-align: center; margin: 1rem 0; }
                .timeline { background: var(--bg); padding: 1rem; border-radius: 0.5rem; margin: 1rem 0; font-family: monospace; font-size: 0.9rem; }
            </style>
            <h4>Infinite Switching</h4>
            <div class="lamp" id="lamp">lightbulb</div>
            <div class="timeline" id="timeline">t=0: ON | t=1: OFF | t=1.5: ON | t=1.75: OFF | t=1.875: ON | ...</div>
            <div class="controls">
                <button id="run-btn">Run Supertask</button>
                <button id="question-btn">At t=2?</button>
            </div>
            <div class="result" id="result"><p>The lamp switches at t=1, 1.5, 1.75, 1.875... (infinite times before t=2)</p></div>
            <div class="insight">Thomson's lamp (1954) is a supertask paradox. The sequence has no last term, so asking "what state at t=2?" may be meaningless - or require extending our concept of "state."</div>
        `;
    }
    setupEventListeners() {
        this.$('#run-btn').addEventListener('click', () => this.runDemo());
        this.$('#question-btn').addEventListener('click', () => {
            this.$('#result').innerHTML = `
                <p><strong>At t=2, is the lamp ON or OFF?</strong></p>
                <p style="color: #ef4444;">Neither answer seems right!</p>
                <p>• Not ON: because every "on" is followed by "off"</p>
                <p>• Not OFF: because every "off" is followed by "on"</p>
                <p>The sequence never settles. The state at t=2 is undefined by the process itself.</p>
            `;
        });
    }
    runDemo() {
        const lamp = this.$('#lamp');
        let on = true;
        let count = 0;
        const flash = () => {
            if (count++ > 10) { lamp.textContent = '???'; return; }
            lamp.style.color = on ? '#fbbf24' : '#64748b';
            on = !on;
            setTimeout(flash, 300 / (count + 1));
        };
        flash();
    }
}
customElements.define('thomson-lamp-simulator', ThomsonLampSimulator);
export { ThomsonLampSimulator };
