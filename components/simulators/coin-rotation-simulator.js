/**
 * Coin Rotation Paradox Simulator
 */
import { SimulatorBase } from '../simulator-base.js';

class CoinRotationSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}
                .coins { display: flex; justify-content: center; gap: 2rem; margin: 1rem 0; align-items: center; }
                .coin { width: 60px; height: 60px; border-radius: 50%; background: var(--accent); display: flex; align-items: center; justify-content: center; font-weight: bold; color: var(--bg); }
                .coin.moving { transition: transform 0.5s; }
            </style>
            <h4>Rolling Coin Puzzle</h4>
            <div class="coins">
                <div class="coin">A</div>
                <div class="coin moving" id="rolling">B</div>
            </div>
            <div class="controls">
                <button id="roll-btn">Roll B Around A</button>
                <button id="explain-btn">Explain</button>
            </div>
            <div class="result" id="result"><p>Coin B rolls around stationary coin A (same size). How many rotations does B make?</p></div>
            <div class="insight">Intuition says 1 rotation (one circumference traveled). But the answer is 2! One rotation from rolling, plus one from orbiting around A. This appeared on the 1982 SAT and caused controversy!</div>
        `;
    }
    setupEventListeners() {
        let rotation = 0;
        this.$('#roll-btn').addEventListener('click', () => {
            rotation += 720;
            this.$('#rolling').style.transform = `rotate(${rotation}deg)`;
            this.$('#result').innerHTML = '<p style="color: var(--accent);">B makes <strong>TWO</strong> full rotations!</p>';
        });
        this.$('#explain-btn').addEventListener('click', () => {
            this.$('#result').innerHTML = `
                <p><strong>Two sources of rotation:</strong></p>
                <p>1. <strong>Rolling:</strong> B rolls one circumference distance = 1 rotation</p>
                <p>2. <strong>Orbiting:</strong> B goes around A once = 1 additional rotation</p>
                <p>Total: 1 + 1 = <strong>2 rotations</strong></p>
                <p>If B rolled in a straight line for the same distance, it would rotate once. But rolling in a circle adds an extra rotation!</p>
            `;
        });
    }
}
customElements.define('coin-rotation-simulator', CoinRotationSimulator);
export { CoinRotationSimulator };
