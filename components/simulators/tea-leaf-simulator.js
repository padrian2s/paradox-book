/**
 * Tea Leaf Paradox Simulator
 * Demonstrates Einstein's explanation of secondary flow in rotating fluids
 */
import { SimulatorBase } from '../simulator-base.js';

class TeaLeafSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .tea-cup-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 2rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .tea-cup {
                    width: 200px;
                    height: 200px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #78350f 0%, #92400e 100%);
                    position: relative;
                    overflow: hidden;
                    border: 8px solid #57534e;
                }

                .tea-surface {
                    position: absolute;
                    inset: 10px;
                    border-radius: 50%;
                    background: radial-gradient(circle, #854d0e 0%, #713f12 100%);
                }

                .tea-leaves {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    align-items: center;
                }

                .leaf {
                    position: absolute;
                    width: 6px;
                    height: 6px;
                    background: #15803d;
                    border-radius: 50%;
                    transition: all 2s ease-out;
                }

                .tea-cup.stirring .tea-surface {
                    animation: rotate 1s linear infinite;
                }

                @keyframes rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            </style>

            <h4>Einstein's Tea Cup</h4>

            <div class="controls">
                <button id="stir-btn">Stir Tea</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="tea-cup-container">
                <div class="tea-cup" id="tea-cup">
                    <div class="tea-surface" id="tea-surface"></div>
                    <div class="tea-leaves" id="tea-leaves"></div>
                </div>
            </div>

            <div class="result">
                <p id="tea-explanation">The rotating water creates a SECONDARY flow: faster at top (lower pressure) -> water curves down at edges -> along bottom toward center -> carries leaves inward!</p>
            </div>

            <div class="insight">
                Einstein used this to explain river erosion and why river bends get more extreme. The same physics explains why tea leaves cluster at the center.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#stir-btn').addEventListener('click', () => this.stirTea());
        this.$('#reset-btn').addEventListener('click', () => this.resetTea());
        this.resetTea();
    }

    resetTea() {
        const leaves = this.$('#tea-leaves');
        leaves.innerHTML = '';
        this.$('#tea-cup').classList.remove('stirring');

        for (let i = 0; i < 30; i++) {
            const leaf = document.createElement('div');
            leaf.className = 'leaf';
            const angle = Math.random() * Math.PI * 2;
            const radius = 30 + Math.random() * 50;
            leaf.style.left = (100 + Math.cos(angle) * radius) + 'px';
            leaf.style.top = (100 + Math.sin(angle) * radius) + 'px';
            leaves.appendChild(leaf);
        }
    }

    stirTea() {
        this.$('#tea-cup').classList.add('stirring');

        setTimeout(() => {
            const leafElements = this.$('#tea-leaves').querySelectorAll('.leaf');
            leafElements.forEach(leaf => {
                const centerOffset = (Math.random() - 0.5) * 30;
                leaf.style.left = (100 + centerOffset) + 'px';
                leaf.style.top = (100 + centerOffset) + 'px';
            });
        }, 500);

        setTimeout(() => {
            this.$('#tea-cup').classList.remove('stirring');
        }, 3000);
    }
}

customElements.define('tea-leaf-simulator', TeaLeafSimulator);

export { TeaLeafSimulator };
