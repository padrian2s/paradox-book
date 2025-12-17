import { SimulatorBase } from '../simulator-base.js';

class BentleySimulator extends SimulatorBase {
    constructor() {
        super();
        this.universeType = 'finite';
        this.animating = false;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .universe-view {
                    background: #000;
                    border-radius: 0.5rem;
                    padding: 2rem;
                    margin: 1rem 0;
                    position: relative;
                    height: 200px;
                    overflow: hidden;
                }

                .star-field {
                    position: absolute;
                    inset: 0;
                }

                .star {
                    position: absolute;
                    background: #fbbf24;
                    border-radius: 50%;
                    transition: all 1.5s ease-in-out;
                }

                .gravity-arrows {
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                    opacity: 0;
                    transition: opacity 0.5s;
                }

                .gravity-arrows.visible {
                    opacity: 1;
                }

                .gravity-arrow {
                    position: absolute;
                    color: #ef4444;
                    font-size: 1.2rem;
                }

                .center-point {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    width: 10px;
                    height: 10px;
                    background: #ef4444;
                    border-radius: 50%;
                    opacity: 0;
                    transition: all 1s;
                    box-shadow: 0 0 20px #ef4444;
                }

                .center-point.visible {
                    opacity: 1;
                }

                .center-point.collapsed {
                    width: 40px;
                    height: 40px;
                    box-shadow: 0 0 50px #ef4444;
                }

                .model-selector {
                    display: flex;
                    gap: 0.5rem;
                    margin-bottom: 1rem;
                }

                .model-selector button {
                    flex: 1;
                }

                .model-selector button.active {
                    background: var(--accent, #f59e0b);
                }

                .force-diagram {
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    padding: 1rem;
                    margin-top: 1rem;
                }

                .force-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin: 0.5rem 0;
                    font-size: 0.875rem;
                }

                .force-label {
                    color: var(--muted, #94a3b8);
                }

                .force-value {
                    font-weight: bold;
                }

                .equation {
                    text-align: center;
                    font-family: serif;
                    font-size: 1.25rem;
                    margin: 1rem 0;
                    padding: 1rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                }

                .newton-tabs {
                    display: flex;
                    gap: 0.5rem;
                    margin-top: 1rem;
                }

                .newton-tabs button {
                    flex: 1;
                    font-size: 0.8rem;
                }

                .newton-tabs button.active {
                    background: var(--primary, #6366f1);
                }
            </style>

            <h4>Bentley's Paradox</h4>
            <p style="color: var(--muted); margin-bottom: 1rem;">In Newtonian gravity, an infinite uniform universe has a problem...</p>

            <div class="model-selector">
                <button id="finite-btn" class="active">Finite Universe</button>
                <button id="infinite-btn">Infinite Universe</button>
            </div>

            <div class="universe-view" id="universe">
                <div class="star-field" id="star-field"></div>
                <div class="gravity-arrows" id="gravity-arrows">
                    <span class="gravity-arrow" style="top: 30%; left: 30%;">&#x2198;</span>
                    <span class="gravity-arrow" style="top: 30%; right: 30%;">&#x2199;</span>
                    <span class="gravity-arrow" style="bottom: 30%; left: 30%;">&#x2197;</span>
                    <span class="gravity-arrow" style="bottom: 30%; right: 30%;">&#x2196;</span>
                    <span class="gravity-arrow" style="top: 50%; left: 20%;">&#x2192;</span>
                    <span class="gravity-arrow" style="top: 50%; right: 20%;">&#x2190;</span>
                    <span class="gravity-arrow" style="top: 20%; left: 50%;">&#x2193;</span>
                    <span class="gravity-arrow" style="bottom: 20%; left: 50%;">&#x2191;</span>
                </div>
                <div class="center-point" id="center-point"></div>
            </div>

            <div class="controls">
                <button id="calculate-btn">Calculate Gravity</button>
                <button id="evolve-btn">Evolve System</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="equation">
                F = G * m<sub>1</sub> * m<sub>2</sub> / r<sup>2</sup>
            </div>

            <div class="force-diagram">
                <div class="force-row">
                    <span class="force-label">Force from left half:</span>
                    <span class="force-value" id="force-left">-</span>
                </div>
                <div class="force-row">
                    <span class="force-label">Force from right half:</span>
                    <span class="force-value" id="force-right">-</span>
                </div>
                <div class="force-row">
                    <span class="force-label">Net force:</span>
                    <span class="force-value" id="force-net" style="color: var(--accent);">-</span>
                </div>
            </div>

            <div class="newton-tabs">
                <button id="tab-problem" class="active">The Problem</button>
                <button id="tab-newton">Newton's Fix</button>
                <button id="tab-modern">Modern Solution</button>
            </div>

            <div class="result" id="result">
                <p><strong>The Setup:</strong> Consider an infinite universe uniformly filled with matter. What gravitational force acts on any point?</p>
            </div>

            <div class="insight">
                Bentley wrote to Newton about this in 1692. If the universe is infinite and uniform, the gravitational pull is infinite from all directions - but should cancel? Actually, the math is undefined (divergent integrals). Newton's response: God keeps the stars in place. Modern physics: The universe is expanding, not static.
            </div>
        `;
    }

    connectedCallback() {
        super.connectedCallback();
        this.generateStars();
    }

    setupEventListeners() {
        this.$('#finite-btn').addEventListener('click', () => this.setModel('finite'));
        this.$('#infinite-btn').addEventListener('click', () => this.setModel('infinite'));
        this.$('#calculate-btn').addEventListener('click', () => this.calculate());
        this.$('#evolve-btn').addEventListener('click', () => this.evolve());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
        this.$('#tab-problem').addEventListener('click', () => this.showTab('problem'));
        this.$('#tab-newton').addEventListener('click', () => this.showTab('newton'));
        this.$('#tab-modern').addEventListener('click', () => this.showTab('modern'));
    }

    generateStars() {
        const field = this.$('#star-field');
        field.innerHTML = '';

        const count = this.universeType === 'infinite' ? 50 : 20;

        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.width = (2 + Math.random() * 4) + 'px';
            star.style.height = star.style.width;
            star.dataset.origLeft = star.style.left;
            star.dataset.origTop = star.style.top;
            field.appendChild(star);
        }
    }

    setModel(type) {
        this.universeType = type;
        this.$$('.model-selector button').forEach(btn => btn.classList.remove('active'));
        this.$(`#${type}-btn`).classList.add('active');
        this.reset();
        this.generateStars();
    }

    calculate() {
        this.$('#gravity-arrows').classList.add('visible');

        if (this.universeType === 'finite') {
            this.$('#force-left').textContent = 'F_L (finite)';
            this.$('#force-right').textContent = 'F_R (finite)';
            this.$('#force-net').textContent = 'F_net toward center';

            this.$('#result').innerHTML = `
                <p><strong>Finite Universe:</strong> Gravitational forces are well-defined. Net force pulls everything toward the center of mass.</p>
                <p>Result: The universe would collapse into a single point!</p>
            `;
        } else {
            this.$('#force-left').textContent = 'INFINITY';
            this.$('#force-left').style.color = '#ef4444';
            this.$('#force-right').textContent = 'INFINITY';
            this.$('#force-right').style.color = '#ef4444';
            this.$('#force-net').textContent = 'UNDEFINED';

            this.$('#result').innerHTML = `
                <p><strong>Infinite Universe Paradox:</strong></p>
                <p>The integral for gravitational force diverges! Both "halves" of the universe exert infinite force.</p>
                <p>Infinity minus infinity is undefined. The problem has no mathematical solution in classical physics.</p>
            `;
        }
    }

    evolve() {
        if (this.animating) return;
        this.animating = true;

        const stars = this.$$('.star');
        const centerPoint = this.$('#center-point');

        centerPoint.classList.add('visible');

        stars.forEach(star => {
            const left = parseFloat(star.dataset.origLeft);
            const top = parseFloat(star.dataset.origTop);

            const newLeft = 50 + (left - 50) * 0.1;
            const newTop = 50 + (top - 50) * 0.1;

            star.style.left = newLeft + '%';
            star.style.top = newTop + '%';
        });

        setTimeout(() => {
            centerPoint.classList.add('collapsed');

            this.$('#result').innerHTML = `
                <p style="color: #ef4444;"><strong>GRAVITATIONAL COLLAPSE!</strong></p>
                <p>Without expansion or rotation, a uniform matter distribution must collapse. This is why Newton needed divine intervention, and why modern cosmology requires either:</p>
                <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
                    <li>An expanding universe (Hubble)</li>
                    <li>A cosmological constant (Einstein's "biggest blunder")</li>
                    <li>Dark energy</li>
                </ul>
            `;
        }, 1500);
    }

    showTab(tab) {
        this.$$('.newton-tabs button').forEach(btn => btn.classList.remove('active'));
        this.$(`#tab-${tab}`).classList.add('active');

        const explanations = {
            problem: `<p><strong>The Setup:</strong> Consider an infinite universe uniformly filled with matter. What gravitational force acts on any point?</p>`,
            newton: `<p><strong>Newton's Response (1692):</strong> Newton acknowledged the problem but invoked divine intervention. He argued that God placed the stars in perfect positions to achieve exact balance, preventing collapse.</p><p>This was unsatisfying - any tiny perturbation would destroy the balance.</p>`,
            modern: `<p><strong>Modern Resolution:</strong></p><p>1. <strong>The universe is expanding</strong> - matter isn't static, so the paradox doesn't apply.</p><p>2. <strong>General Relativity</strong> handles infinite matter distributions differently than Newtonian gravity.</p><p>3. <strong>The cosmological principle</strong> + expansion = stable (or accelerating) universe without collapse.</p>`
        };

        this.$('#result').innerHTML = explanations[tab];
    }

    reset() {
        this.animating = false;

        this.$('#gravity-arrows').classList.remove('visible');
        this.$('#center-point').classList.remove('visible', 'collapsed');

        this.$('#force-left').textContent = '-';
        this.$('#force-left').style.color = '';
        this.$('#force-right').textContent = '-';
        this.$('#force-right').style.color = '';
        this.$('#force-net').textContent = '-';

        const stars = this.$$('.star');
        stars.forEach(star => {
            star.style.left = star.dataset.origLeft;
            star.style.top = star.dataset.origTop;
        });

        this.$('#result').innerHTML = `<p><strong>The Setup:</strong> Consider an infinite universe uniformly filled with matter. What gravitational force acts on any point?</p>`;
    }
}

customElements.define('bentley-simulator', BentleySimulator);

export { BentleySimulator };
