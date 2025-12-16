/**
 * Gabriel's Horn Simulator
 */
import { SimulatorBase } from '../simulator-base.js';

class GabrielHornSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}
                .horn { text-align: center; font-size: 3rem; margin: 1rem 0; }
                .calc { background: var(--card); padding: 1rem; border-radius: 0.5rem; margin: 0.5rem 0; font-family: monospace; }
            </style>
            <h4>Torricelli's Trumpet</h4>
            <div class="horn">📯 → → → → → ∞</div>
            <p style="text-align: center;">Rotate y = 1/x around x-axis, from x=1 to infinity</p>
            <div class="controls">
                <button id="volume-btn">Calculate Volume</button>
                <button id="surface-btn">Calculate Surface Area</button>
            </div>
            <div id="calcs"></div>
            <div class="result" id="result"><p>A shape extending infinitely... what are its volume and surface area?</p></div>
            <div class="insight">Gabriel's horn shows our intuitions fail with infinity. You could fill it with π cubic units of paint, but you'd need infinitely much paint to cover its surface. Finite inside, infinite outside!</div>
        `;
    }
    setupEventListeners() {
        this.$('#volume-btn').addEventListener('click', () => {
            this.$('#calcs').innerHTML = `<div class="calc">V = π ∫₁^∞ (1/x)² dx = π ∫₁^∞ 1/x² dx = π [-1/x]₁^∞ = π(0 - (-1)) = <strong style="color: #22c55e;">π ≈ 3.14 (FINITE!)</strong></div>`;
            this.$('#result').innerHTML = '<p style="color: #22c55e;">The volume is exactly π cubic units - finite!</p>';
        });
        this.$('#surface-btn').addEventListener('click', () => {
            this.$('#calcs').innerHTML = `<div class="calc">A = 2π ∫₁^∞ (1/x)√(1 + 1/x⁴) dx > 2π ∫₁^∞ 1/x dx = 2π [ln x]₁^∞ = <strong style="color: #ef4444;">∞ (INFINITE!)</strong></div>`;
            this.$('#result').innerHTML = '<p style="color: #ef4444;">The surface area is infinite! The horn tapers too slowly.</p>';
        });
    }
}
customElements.define('gabriel-horn-simulator', GabrielHornSimulator);
export { GabrielHornSimulator };
