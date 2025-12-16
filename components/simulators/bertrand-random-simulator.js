/**
 * Bertrand's Paradox Simulator
 */
import { SimulatorBase } from '../simulator-base.js';

class BertrandRandomSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}
                .circle { width: 150px; height: 150px; border: 3px solid var(--accent); border-radius: 50%; margin: 1rem auto; position: relative; }
                .methods { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; margin: 1rem 0; }
                .method { background: var(--card); padding: 0.75rem; border-radius: 0.5rem; text-align: center; font-size: 0.9rem; cursor: pointer; }
                .method:hover { border: 2px solid var(--accent); }
            </style>
            <h4>Random Chord in a Circle</h4>
            <div class="circle"></div>
            <p style="text-align: center;">What's P(chord longer than inscribed triangle's side)?</p>
            <div class="methods">
                <div class="method" id="m1">Method 1<br><strong>Random Endpoints</strong></div>
                <div class="method" id="m2">Method 2<br><strong>Random Radius</strong></div>
                <div class="method" id="m3">Method 3<br><strong>Random Midpoint</strong></div>
            </div>
            <div class="result" id="result"><p>Three valid ways to pick a "random chord" give three different answers!</p></div>
            <div class="insight">Bertrand's paradox (1889) shows that "random" is ambiguous without specifying the probability distribution. The same question has multiple valid answers depending on how randomness is defined!</div>
        `;
    }
    setupEventListeners() {
        this.$('#m1').addEventListener('click', () => {
            this.$('#result').innerHTML = `<p><strong>Method 1:</strong> Fix one point, random second point on circle.</p><p>Favorable arc = 1/3 of circle</p><p style="color: var(--accent);"><strong>P = 1/3</strong></p>`;
        });
        this.$('#m2').addEventListener('click', () => {
            this.$('#result').innerHTML = `<p><strong>Method 2:</strong> Pick random direction, random point on radius.</p><p>Chord > side if midpoint in inner half of radius</p><p style="color: var(--accent);"><strong>P = 1/2</strong></p>`;
        });
        this.$('#m3').addEventListener('click', () => {
            this.$('#result').innerHTML = `<p><strong>Method 3:</strong> Random point in circle as chord midpoint.</p><p>Chord > side if midpoint within r/2 of center</p><p>Area ratio = (1/2)² = 1/4</p><p style="color: var(--accent);"><strong>P = 1/4</strong></p>`;
        });
    }
}
customElements.define('bertrand-random-simulator', BertrandRandomSimulator);
export { BertrandRandomSimulator };
