/**
 * Hydrostatic Paradox Simulator
 * Pressure at bottom depends only on height, not container shape
 */
import { SimulatorBase } from '../simulator-base.js';

class HydrostaticSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .containers {
                    display: flex;
                    justify-content: space-around;
                    align-items: flex-end;
                    margin-top: 1rem;
                    padding: 1rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    min-height: 120px;
                }

                .container {
                    border: 2px solid var(--muted, #94a3b8);
                    position: relative;
                    overflow: hidden;
                }

                .water {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: linear-gradient(to top, #1d4ed8, #3b82f6);
                    transition: height 0.3s;
                }

                .wide-container {
                    width: 60px;
                    height: 80px;
                }

                .narrow-container {
                    width: 20px;
                    height: 80px;
                }

                .funnel-container {
                    width: 40px;
                    height: 80px;
                    clip-path: polygon(30% 0, 70% 0, 100% 100%, 0 100%);
                }

                .container-labels {
                    display: flex;
                    justify-content: space-around;
                    margin-top: 0.5rem;
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }
            </style>

            <h4>Pressure Comparison</h4>

            <div class="controls">
                <div class="control-group" style="width: 100%;">
                    <label>Water Height: <span id="height-val">10</span>m</label>
                    <input type="range" id="height" min="1" max="30" value="10" style="width: 100%;">
                </div>
            </div>

            <div class="containers">
                <div class="container wide-container">
                    <div class="water" id="water-wide"></div>
                </div>
                <div class="container narrow-container">
                    <div class="water" id="water-narrow"></div>
                </div>
                <div class="container funnel-container">
                    <div class="water" id="water-funnel"></div>
                </div>
            </div>
            <div class="container-labels">
                <span>Wide Tank</span>
                <span>Narrow Tube</span>
                <span>Funnel</span>
            </div>

            <div class="result">
                <p>Bottom pressure: <span class="result-value" id="pressure">98</span> kPa</p>
                <p style="color: var(--accent, #f59e0b); font-weight: bold;">SAME for all shapes!</p>
            </div>

            <div class="insight">
                This seems wrong - the wide tank has more water! But pressure only depends on depth (P = pgh). The container walls support the extra weight.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#height').addEventListener('input', () => this.update());
        this.update();
    }

    update() {
        const h = parseInt(this.$('#height').value);
        this.$('#height-val').textContent = h;

        const pressure = (h * 9.8).toFixed(0);
        this.$('#pressure').textContent = pressure;

        const waterHeight = (h / 30) * 100;
        this.$('#water-wide').style.height = waterHeight + '%';
        this.$('#water-narrow').style.height = waterHeight + '%';
        this.$('#water-funnel').style.height = waterHeight + '%';
    }
}

customElements.define('hydrostatic-simulator', HydrostaticSimulator);

export { HydrostaticSimulator };
