import { SimulatorBase } from '../simulator-base.js';

class DalembertSimulator extends SimulatorBase {
    constructor() {
        super();
        this.fluidType = 'ideal';
        this.animating = false;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .fluid-tank {
                    background: linear-gradient(180deg,
                        rgba(59, 130, 246, 0.1) 0%,
                        rgba(59, 130, 246, 0.3) 100%);
                    border: 2px solid var(--primary, #6366f1);
                    border-radius: 0.5rem;
                    padding: 2rem;
                    margin: 1rem 0;
                    position: relative;
                    height: 180px;
                    overflow: hidden;
                }

                .flow-lines {
                    position: absolute;
                    inset: 0;
                    overflow: hidden;
                }

                .flow-line {
                    position: absolute;
                    height: 2px;
                    background: rgba(59, 130, 246, 0.5);
                    left: -50px;
                    animation: flow 2s linear infinite;
                }

                @keyframes flow {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(100% + 100px)); }
                }

                .object {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    width: 60px;
                    height: 60px;
                    background: var(--card, #1e293b);
                    border: 3px solid var(--muted, #94a3b8);
                    border-radius: 50%;
                    z-index: 2;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .force-arrow {
                    position: absolute;
                    left: calc(50% + 40px);
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: 2rem;
                    color: #ef4444;
                    opacity: 0;
                    transition: opacity 0.3s;
                }

                .force-arrow.visible {
                    opacity: 1;
                }

                .force-label {
                    position: absolute;
                    left: calc(50% + 80px);
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: 0.875rem;
                    color: #ef4444;
                    opacity: 0;
                    transition: opacity 0.3s;
                }

                .force-label.visible {
                    opacity: 1;
                }

                .streamlines-label {
                    position: absolute;
                    bottom: 10px;
                    left: 10px;
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }

                .fluid-selector {
                    display: flex;
                    gap: 0.5rem;
                    margin-bottom: 1rem;
                }

                .fluid-selector button {
                    flex: 1;
                }

                .fluid-selector button.active {
                    background: var(--accent, #f59e0b);
                }

                .comparison-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .comparison-card {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                }

                .comparison-title {
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                    font-size: 0.875rem;
                }

                .comparison-item {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.8rem;
                    margin: 0.25rem 0;
                    color: var(--muted, #94a3b8);
                }

                .comparison-value {
                    font-weight: bold;
                }

                .drag-meter {
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    padding: 1rem;
                    margin-top: 1rem;
                }

                .drag-bar {
                    height: 20px;
                    background: var(--card, #1e293b);
                    border-radius: 0.25rem;
                    overflow: hidden;
                }

                .drag-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #22c55e, #ef4444);
                    transition: width 0.5s;
                    width: 0%;
                }
            </style>

            <h4>D'Alembert's Paradox</h4>
            <p style="color: var(--muted); margin-bottom: 1rem;">In ideal (inviscid) fluid theory, objects experience ZERO drag. But that can't be right!</p>

            <div class="fluid-selector">
                <button id="ideal-btn" class="active">Ideal Fluid (Theory)</button>
                <button id="real-btn">Real Fluid (Reality)</button>
            </div>

            <div class="fluid-tank">
                <div class="flow-lines" id="flow-lines">
                    <div class="flow-line" style="top: 20%; width: 80px; animation-delay: 0s;"></div>
                    <div class="flow-line" style="top: 35%; width: 60px; animation-delay: 0.3s;"></div>
                    <div class="flow-line" style="top: 50%; width: 70px; animation-delay: 0.6s;"></div>
                    <div class="flow-line" style="top: 65%; width: 65px; animation-delay: 0.9s;"></div>
                    <div class="flow-line" style="top: 80%; width: 75px; animation-delay: 1.2s;"></div>
                </div>
                <div class="object">&#x26AB;</div>
                <div class="force-arrow" id="force-arrow">&#x2192;</div>
                <div class="force-label" id="force-label">Drag Force</div>
                <div class="streamlines-label">Flow direction &#x2192;</div>
            </div>

            <div class="drag-meter">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span>Drag Force</span>
                    <span id="drag-value">0 N</span>
                </div>
                <div class="drag-bar">
                    <div class="drag-fill" id="drag-fill"></div>
                </div>
            </div>

            <div class="comparison-grid">
                <div class="comparison-card">
                    <div class="comparison-title" style="color: var(--primary);">Ideal Fluid</div>
                    <div class="comparison-item">
                        <span>Viscosity</span>
                        <span class="comparison-value">0</span>
                    </div>
                    <div class="comparison-item">
                        <span>Boundary Layer</span>
                        <span class="comparison-value">None</span>
                    </div>
                    <div class="comparison-item">
                        <span>Wake</span>
                        <span class="comparison-value">Symmetric</span>
                    </div>
                    <div class="comparison-item">
                        <span>Drag</span>
                        <span class="comparison-value" style="color: #22c55e;">ZERO</span>
                    </div>
                </div>
                <div class="comparison-card">
                    <div class="comparison-title" style="color: var(--accent);">Real Fluid</div>
                    <div class="comparison-item">
                        <span>Viscosity</span>
                        <span class="comparison-value">Non-zero</span>
                    </div>
                    <div class="comparison-item">
                        <span>Boundary Layer</span>
                        <span class="comparison-value">Yes</span>
                    </div>
                    <div class="comparison-item">
                        <span>Wake</span>
                        <span class="comparison-value">Asymmetric</span>
                    </div>
                    <div class="comparison-item">
                        <span>Drag</span>
                        <span class="comparison-value" style="color: #ef4444;">Non-zero</span>
                    </div>
                </div>
            </div>

            <div class="result" id="result">
                <p><strong>The Paradox:</strong> D'Alembert proved mathematically that a body moving through an ideal (inviscid, incompressible) fluid experiences zero net force. The pressure on the front and back perfectly cancel!</p>
                <p>But we know objects experience drag in real fluids. Where does the math go wrong?</p>
            </div>

            <div class="insight">
                The resolution took 150 years! Real fluids have viscosity, creating a boundary layer where the no-slip condition applies. This leads to flow separation, asymmetric wakes, and pressure drag. D'Alembert's math was correct - for a fluid that doesn't exist.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#ideal-btn').addEventListener('click', () => this.setFluid('ideal'));
        this.$('#real-btn').addEventListener('click', () => this.setFluid('real'));
    }

    setFluid(type) {
        this.fluidType = type;

        this.$$('.fluid-selector button').forEach(btn => btn.classList.remove('active'));
        this.$(`#${type}-btn`).classList.add('active');

        const arrow = this.$('#force-arrow');
        const label = this.$('#force-label');
        const dragFill = this.$('#drag-fill');
        const dragValue = this.$('#drag-value');

        if (type === 'ideal') {
            arrow.classList.remove('visible');
            label.classList.remove('visible');
            dragFill.style.width = '0%';
            dragValue.textContent = '0 N';

            this.$('#result').innerHTML = `
                <p><strong>Ideal Fluid Result:</strong> In potential flow theory, the fluid streamlines close symmetrically behind the object.</p>
                <p>The pressure distribution is fore-aft symmetric: high pressure at the front equals high pressure at the back. Net force = 0!</p>
                <p style="color: #22c55e;">D'Alembert's mathematics gives: <strong>Drag = 0</strong></p>
            `;
        } else {
            arrow.classList.add('visible');
            label.classList.add('visible');
            dragFill.style.width = '70%';
            dragValue.textContent = '~50 N';

            this.$('#result').innerHTML = `
                <p><strong>Real Fluid Result:</strong> Viscosity creates a boundary layer. At high velocities, this layer separates, creating a turbulent wake.</p>
                <p>The wake has LOW pressure. Front has HIGH pressure. This asymmetry creates drag!</p>
                <p style="color: #ef4444;">Reality shows: <strong>Drag > 0</strong></p>
                <p>The "paradox" revealed that ideal fluid theory, while mathematically elegant, misses the crucial physics of real flows.</p>
            `;
        }
    }
}

customElements.define('dalembert-simulator', DalembertSimulator);

export { DalembertSimulator };
