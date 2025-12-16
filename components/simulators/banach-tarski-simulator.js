/**
 * Banach-Tarski Paradox Simulator
 * A sphere can be decomposed and reassembled into TWO identical spheres
 */
import { SimulatorBase } from '../simulator-base.js';

class BanachTarskiSimulator extends SimulatorBase {
    constructor() {
        super();
        this.duplicated = false;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .sphere-viz {
                    display: flex;
                    justify-content: center;
                    gap: 3rem;
                    margin: 2rem 0;
                    min-height: 100px;
                    align-items: center;
                }

                .sphere {
                    font-size: 4rem;
                    transition: all 0.5s ease;
                }

                .sphere.original {
                    color: #3b82f6;
                }

                .sphere.duplicate {
                    opacity: 0;
                    transform: scale(0);
                }

                .sphere.duplicate.visible {
                    opacity: 1;
                    transform: scale(1);
                }

                .sphere.splitting {
                    animation: split 1s ease-in-out;
                }

                @keyframes split {
                    0% { transform: scale(1); }
                    50% { transform: scale(0.5) rotate(180deg); filter: blur(2px); }
                    100% { transform: scale(1); }
                }

                .pieces {
                    display: flex;
                    gap: 0.25rem;
                    justify-content: center;
                    margin: 1rem 0;
                    opacity: 0;
                    transition: opacity 0.3s;
                }

                .pieces.visible {
                    opacity: 1;
                }

                .piece {
                    width: 20px;
                    height: 20px;
                    background: linear-gradient(135deg, #6366f1, #8b5cf6);
                    border-radius: 50% 30% 50% 30%;
                    animation: wiggle 0.5s ease-in-out infinite;
                }

                .piece:nth-child(2) { animation-delay: 0.1s; }
                .piece:nth-child(3) { animation-delay: 0.2s; }
                .piece:nth-child(4) { animation-delay: 0.3s; }
                .piece:nth-child(5) { animation-delay: 0.4s; }

                @keyframes wiggle {
                    0%, 100% { transform: rotate(-5deg); }
                    50% { transform: rotate(5deg); }
                }

                .arrow {
                    font-size: 2rem;
                    color: var(--muted, #94a3b8);
                    opacity: 0;
                    transition: opacity 0.3s;
                }

                .arrow.visible {
                    opacity: 1;
                }
            </style>

            <h4>Sphere Duplication</h4>

            <div class="controls">
                <button id="run-btn">Decompose & Reassemble</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="sphere-viz">
                <span class="sphere original" id="sphere1">&#x1F535;</span>
                <span class="arrow" id="arrow">&#x27A1;</span>
                <span class="sphere duplicate" id="sphere2">&#x1F535;</span>
            </div>

            <div class="pieces" id="pieces">
                <div class="piece"></div>
                <div class="piece"></div>
                <div class="piece"></div>
                <div class="piece"></div>
                <div class="piece"></div>
            </div>

            <div class="result" id="result">
                <p>Using the Axiom of Choice, we can cut a sphere into 5 non-measurable pieces and rearrange them into 2 identical spheres!</p>
            </div>

            <div class="insight">
                This only works with mathematical "non-measurable sets" - you can't do this with physical matter! The pieces have no defined volume.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#run-btn').addEventListener('click', () => this.run());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
    }

    run() {
        if (this.duplicated) return;
        this.duplicated = true;

        const sphere1 = this.$('#sphere1');
        const sphere2 = this.$('#sphere2');
        const pieces = this.$('#pieces');
        const arrow = this.$('#arrow');

        sphere1.classList.add('splitting');
        pieces.classList.add('visible');

        setTimeout(() => {
            pieces.classList.remove('visible');
            arrow.classList.add('visible');
            sphere2.classList.add('visible');
            sphere1.classList.remove('splitting');

            this.$('#result').innerHTML = `
                <p style="color: var(--accent);"><strong>ONE sphere became TWO identical spheres!</strong></p>
                <p>The 5 pieces were rotated and translated (no stretching!) to form 2 complete spheres.</p>
                <p>Total volume doubled from nothing. Math allows this; physics forbids it.</p>
            `;
        }, 1000);
    }

    reset() {
        this.duplicated = false;

        this.$('#sphere1').classList.remove('splitting');
        this.$('#sphere2').classList.remove('visible');
        this.$('#pieces').classList.remove('visible');
        this.$('#arrow').classList.remove('visible');

        this.$('#result').innerHTML = `
            <p>Using the Axiom of Choice, we can cut a sphere into 5 non-measurable pieces and rearrange them into 2 identical spheres!</p>
        `;
    }
}

customElements.define('banach-tarski-simulator', BanachTarskiSimulator);

export { BanachTarskiSimulator };
