/**
 * Ladder Paradox Simulator
 * Demonstrates relativistic length contraction and the relativity of simultaneity
 */
import { SimulatorBase } from '../simulator-base.js';

class LadderSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .ladder-viz {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                    padding: 1rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .frame-view h5 {
                    text-align: center;
                    color: var(--accent, #f59e0b);
                    margin-bottom: 0.5rem;
                }

                .garage-frame {
                    position: relative;
                    height: 100px;
                    background: var(--card, #1e293b);
                    border: 3px dashed var(--muted, #94a3b8);
                    border-radius: 0.5rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    overflow: hidden;
                }

                .garage-box {
                    background: var(--muted, #94a3b8);
                    padding: 0.5rem;
                    border-radius: 0.25rem;
                    text-align: center;
                    margin-bottom: 0.5rem;
                }

                .ladder-box {
                    background: var(--primary, #6366f1);
                    padding: 0.5rem;
                    border-radius: 0.25rem;
                    text-align: center;
                    transition: width 0.3s;
                }

                .ladder-box.ladder-rest {
                    width: 100%;
                }

                .verdict {
                    text-align: center;
                    margin-top: 0.5rem;
                    font-weight: bold;
                }

                .verdict.fits {
                    color: #22c55e;
                }

                .verdict.no-fit {
                    color: #ef4444;
                }

                @media (max-width: 600px) {
                    .ladder-viz {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>Relativistic Length Contraction</h4>

            <div class="controls">
                <div class="control-group">
                    <label>Velocity: <span id="ladder-v-val">0.90</span>c</label>
                    <input type="range" id="ladder-v" min="0" max="99" value="90">
                </div>
            </div>

            <div class="ladder-viz">
                <div class="frame-view">
                    <h5>Garage's Frame</h5>
                    <div class="garage-frame">
                        <div class="garage-box">Garage: 10 ft</div>
                        <div class="ladder-box" id="ladder-garage-frame">Ladder: <span id="ladder-contracted">5.6</span> ft</div>
                    </div>
                    <p class="verdict fits" id="garage-verdict">Ladder fits!</p>
                </div>
                <div class="frame-view">
                    <h5>Ladder's Frame</h5>
                    <div class="garage-frame">
                        <div class="garage-box" id="garage-contracted-box">Garage: <span id="garage-contracted">4.4</span> ft</div>
                        <div class="ladder-box ladder-rest">Ladder: 20 ft</div>
                    </div>
                    <p class="verdict no-fit" id="ladder-verdict">Ladder doesn't fit!</p>
                </div>
            </div>

            <div class="result">
                <p>Lorentz factor gamma = <span id="ladder-gamma">2.29</span></p>
                <p id="ladder-explanation">Both frames are correct! The resolution: "fitting" depends on simultaneity. The ladder's ends don't enter/exit at the same time in both frames.</p>
            </div>

            <div class="insight">
                This paradox demonstrates that simultaneity is relative. Events that are simultaneous in one frame aren't simultaneous in another.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#ladder-v').addEventListener('input', () => this.updateLadder());
        this.updateLadder();
    }

    updateLadder() {
        const v = parseFloat(this.$('#ladder-v').value) / 100;
        this.$('#ladder-v-val').textContent = v.toFixed(2);

        const gamma = 1 / Math.sqrt(1 - v * v);
        const ladderContracted = 20 / gamma;
        const garageContracted = 10 / gamma;

        this.$('#ladder-gamma').textContent = gamma.toFixed(2);
        this.$('#ladder-contracted').textContent = ladderContracted.toFixed(1);
        this.$('#garage-contracted').textContent = garageContracted.toFixed(1);

        const ladderWidth = Math.min(100, (ladderContracted / 10) * 100);
        this.$('#ladder-garage-frame').style.width = ladderWidth + '%';

        if (ladderContracted <= 10) {
            this.$('#garage-verdict').textContent = 'Ladder fits!';
            this.$('#garage-verdict').className = 'verdict fits';
        } else {
            this.$('#garage-verdict').textContent = "Ladder doesn't fit!";
            this.$('#garage-verdict').className = 'verdict no-fit';
        }
    }
}

customElements.define('ladder-simulator', LadderSimulator);

export { LadderSimulator };
