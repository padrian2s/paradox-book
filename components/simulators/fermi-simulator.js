/**
 * Fermi Paradox / Drake Equation Simulator
 * Estimates the number of communicative civilizations in our galaxy
 */
import { SimulatorBase } from '../simulator-base.js';

class FermiSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .equation-display {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                    margin-bottom: 1.5rem;
                    font-family: monospace;
                    font-size: 1.1rem;
                    color: var(--accent, #f59e0b);
                }

                .parameters-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                }

                .parameter-card {
                    background: var(--bg, #0f172a);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    border: 1px solid var(--muted, #94a3b8);
                }

                .parameter-card label {
                    display: block;
                    font-weight: bold;
                    color: var(--text, #e2e8f0);
                    margin-bottom: 0.25rem;
                }

                .parameter-card .description {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-bottom: 0.5rem;
                }

                .parameter-card input[type="range"] {
                    width: 100%;
                    margin: 0.5rem 0;
                }

                .parameter-value {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 0.875rem;
                }

                .parameter-value .current {
                    font-weight: bold;
                    color: var(--primary, #6366f1);
                    font-size: 1.1rem;
                }

                .parameter-value .range {
                    color: var(--muted, #94a3b8);
                }

                .civilization-viz {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 4px;
                    padding: 1rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                    min-height: 60px;
                    justify-content: center;
                }

                .civ-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: var(--primary, #6366f1);
                    animation: twinkle 2s ease-in-out infinite;
                }

                .civ-dot:nth-child(odd) {
                    animation-delay: 0.5s;
                }

                .civ-dot:nth-child(3n) {
                    animation-delay: 1s;
                }

                @keyframes twinkle {
                    0%, 100% { opacity: 0.4; transform: scale(0.8); }
                    50% { opacity: 1; transform: scale(1.2); }
                }

                .result-breakdown {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
                    gap: 0.5rem;
                    margin-top: 1rem;
                    padding: 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                }

                .breakdown-item {
                    text-align: center;
                }

                .breakdown-item .symbol {
                    font-size: 1.25rem;
                    font-weight: bold;
                    color: var(--primary, #6366f1);
                }

                .breakdown-item .value {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                }

                .presets {
                    display: flex;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                    margin-bottom: 1rem;
                }

                .presets button {
                    padding: 0.5rem 1rem;
                    font-size: 0.875rem;
                }

                .presets button.pessimistic {
                    background: #dc2626;
                }

                .presets button.optimistic {
                    background: #16a34a;
                }

                @media (max-width: 768px) {
                    .parameters-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>Drake Equation Calculator</h4>
            <p style="color: var(--muted); margin-bottom: 1rem;">Estimate the number of civilizations in our galaxy we could communicate with.</p>

            <div class="equation-display">
                N = R* x fp x ne x fl x fi x fc x L
            </div>

            <div class="presets">
                <button id="pessimistic-btn" class="pessimistic">Pessimistic</button>
                <button id="balanced-btn">Balanced</button>
                <button id="optimistic-btn" class="optimistic">Optimistic</button>
            </div>

            <div class="parameters-grid">
                <div class="parameter-card">
                    <label>R* - Star Formation Rate</label>
                    <div class="description">Stars formed per year in our galaxy</div>
                    <input type="range" id="drake-r" min="1" max="10" step="0.5" value="3">
                    <div class="parameter-value">
                        <span class="current" id="drake-r-val">3</span>
                        <span class="range">1 - 10 stars/year</span>
                    </div>
                </div>

                <div class="parameter-card">
                    <label>fp - Fraction with Planets</label>
                    <div class="description">Stars that have planetary systems</div>
                    <input type="range" id="drake-fp" min="1" max="100" value="50">
                    <div class="parameter-value">
                        <span class="current" id="drake-fp-val">50%</span>
                        <span class="range">1% - 100%</span>
                    </div>
                </div>

                <div class="parameter-card">
                    <label>ne - Earth-like Planets</label>
                    <div class="description">Planets per star that could support life</div>
                    <input type="range" id="drake-ne" min="0.1" max="5" step="0.1" value="2">
                    <div class="parameter-value">
                        <span class="current" id="drake-ne-val">2</span>
                        <span class="range">0.1 - 5 planets</span>
                    </div>
                </div>

                <div class="parameter-card">
                    <label>fl - Fraction with Life</label>
                    <div class="description">Suitable planets where life develops</div>
                    <input type="range" id="drake-fl" min="1" max="100" value="100">
                    <div class="parameter-value">
                        <span class="current" id="drake-fl-val">100%</span>
                        <span class="range">1% - 100%</span>
                    </div>
                </div>

                <div class="parameter-card">
                    <label>fi - Fraction with Intelligence</label>
                    <div class="description">Life-bearing planets that develop intelligence</div>
                    <input type="range" id="drake-fi" min="1" max="100" value="50">
                    <div class="parameter-value">
                        <span class="current" id="drake-fi-val">50%</span>
                        <span class="range">1% - 100%</span>
                    </div>
                </div>

                <div class="parameter-card">
                    <label>fc - Fraction Communicating</label>
                    <div class="description">Intelligent civilizations that develop detectable technology</div>
                    <input type="range" id="drake-fc" min="1" max="100" value="10">
                    <div class="parameter-value">
                        <span class="current" id="drake-fc-val">10%</span>
                        <span class="range">1% - 100%</span>
                    </div>
                </div>

                <div class="parameter-card">
                    <label>L - Civilization Lifespan</label>
                    <div class="description">Years a civilization remains detectable</div>
                    <input type="range" id="drake-l" min="100" max="100000" step="100" value="10000">
                    <div class="parameter-value">
                        <span class="current" id="drake-l-val">10,000</span>
                        <span class="range">100 - 100,000 years</span>
                    </div>
                </div>
            </div>

            <div class="result">
                <p>Estimated Communicative Civilizations:</p>
                <p><span class="result-value" id="drake-result">150</span></p>
                <p id="drake-formula" style="font-family: monospace; color: var(--muted);">N = 3 x 0.5 x 2 x 1 x 0.5 x 0.1 x 10000</p>
            </div>

            <div class="result-breakdown">
                <div class="breakdown-item">
                    <div class="symbol">R*</div>
                    <div class="value" id="bd-r">3</div>
                </div>
                <div class="breakdown-item">
                    <div class="symbol">x</div>
                    <div class="value"></div>
                </div>
                <div class="breakdown-item">
                    <div class="symbol">fp</div>
                    <div class="value" id="bd-fp">0.5</div>
                </div>
                <div class="breakdown-item">
                    <div class="symbol">x</div>
                    <div class="value"></div>
                </div>
                <div class="breakdown-item">
                    <div class="symbol">ne</div>
                    <div class="value" id="bd-ne">2</div>
                </div>
                <div class="breakdown-item">
                    <div class="symbol">x</div>
                    <div class="value"></div>
                </div>
                <div class="breakdown-item">
                    <div class="symbol">fl</div>
                    <div class="value" id="bd-fl">1</div>
                </div>
                <div class="breakdown-item">
                    <div class="symbol">x</div>
                    <div class="value"></div>
                </div>
                <div class="breakdown-item">
                    <div class="symbol">fi</div>
                    <div class="value" id="bd-fi">0.5</div>
                </div>
                <div class="breakdown-item">
                    <div class="symbol">x</div>
                    <div class="value"></div>
                </div>
                <div class="breakdown-item">
                    <div class="symbol">fc</div>
                    <div class="value" id="bd-fc">0.1</div>
                </div>
                <div class="breakdown-item">
                    <div class="symbol">x</div>
                    <div class="value"></div>
                </div>
                <div class="breakdown-item">
                    <div class="symbol">L</div>
                    <div class="value" id="bd-l">10000</div>
                </div>
            </div>

            <div class="civilization-viz" id="civ-viz"></div>

            <div class="insight">
                Even conservative estimates suggest thousands of civilizations. Yet we've detected nothing. This is the Fermi Paradox: "Where is everybody?"
            </div>
        `;
    }

    setupEventListeners() {
        const params = ['drake-r', 'drake-fp', 'drake-ne', 'drake-fl', 'drake-fi', 'drake-fc', 'drake-l'];
        params.forEach(id => {
            this.$(`#${id}`).addEventListener('input', () => this.calculate());
        });

        this.$('#pessimistic-btn').addEventListener('click', () => this.applyPreset('pessimistic'));
        this.$('#balanced-btn').addEventListener('click', () => this.applyPreset('balanced'));
        this.$('#optimistic-btn').addEventListener('click', () => this.applyPreset('optimistic'));

        this.calculate();
    }

    applyPreset(preset) {
        const presets = {
            pessimistic: { r: 1, fp: 20, ne: 0.5, fl: 10, fi: 1, fc: 1, l: 500 },
            balanced: { r: 3, fp: 50, ne: 2, fl: 100, fi: 50, fc: 10, l: 10000 },
            optimistic: { r: 7, fp: 100, ne: 4, fl: 100, fi: 100, fc: 50, l: 100000 }
        };

        const p = presets[preset];
        this.$('#drake-r').value = p.r;
        this.$('#drake-fp').value = p.fp;
        this.$('#drake-ne').value = p.ne;
        this.$('#drake-fl').value = p.fl;
        this.$('#drake-fi').value = p.fi;
        this.$('#drake-fc').value = p.fc;
        this.$('#drake-l').value = p.l;

        this.calculate();
    }

    calculate() {
        const R = parseFloat(this.$('#drake-r').value);
        const fp = parseFloat(this.$('#drake-fp').value) / 100;
        const ne = parseFloat(this.$('#drake-ne').value);
        const fl = parseFloat(this.$('#drake-fl').value) / 100;
        const fi = parseFloat(this.$('#drake-fi').value) / 100;
        const fc = parseFloat(this.$('#drake-fc').value) / 100;
        const L = parseFloat(this.$('#drake-l').value);

        const N = R * fp * ne * fl * fi * fc * L;

        this.$('#drake-r-val').textContent = R;
        this.$('#drake-fp-val').textContent = Math.round(fp * 100) + '%';
        this.$('#drake-ne-val').textContent = ne;
        this.$('#drake-fl-val').textContent = Math.round(fl * 100) + '%';
        this.$('#drake-fi-val').textContent = Math.round(fi * 100) + '%';
        this.$('#drake-fc-val').textContent = Math.round(fc * 100) + '%';
        this.$('#drake-l-val').textContent = L.toLocaleString();

        this.$('#drake-result').textContent = N < 1 ? N.toFixed(4) : Math.round(N).toLocaleString();
        this.$('#drake-formula').textContent =
            `N = ${R} x ${fp} x ${ne} x ${fl} x ${fi} x ${fc} x ${L}`;

        this.$('#bd-r').textContent = R;
        this.$('#bd-fp').textContent = fp;
        this.$('#bd-ne').textContent = ne;
        this.$('#bd-fl').textContent = fl;
        this.$('#bd-fi').textContent = fi;
        this.$('#bd-fc').textContent = fc;
        this.$('#bd-l').textContent = L.toLocaleString();

        this.updateVisualization(N);
    }

    updateVisualization(N) {
        const viz = this.$('#civ-viz');
        viz.innerHTML = '';

        const maxDots = 200;
        const numDots = Math.min(Math.max(Math.round(N), 0), maxDots);

        for (let i = 0; i < numDots; i++) {
            const dot = document.createElement('div');
            dot.className = 'civ-dot';
            dot.style.animationDelay = `${Math.random() * 2}s`;
            viz.appendChild(dot);
        }

        if (N > maxDots) {
            const overflow = document.createElement('div');
            overflow.style.cssText = 'width: 100%; text-align: center; color: var(--muted); font-size: 0.875rem; margin-top: 0.5rem;';
            overflow.textContent = `(showing ${maxDots} of ${Math.round(N).toLocaleString()} civilizations)`;
            viz.appendChild(overflow);
        }

        if (N < 1) {
            const msg = document.createElement('div');
            msg.style.cssText = 'width: 100%; text-align: center; color: var(--muted); font-size: 0.875rem;';
            msg.textContent = N < 0.01 ? 'We might be alone...' : 'Very few civilizations expected';
            viz.appendChild(msg);
        }
    }
}

customElements.define('fermi-simulator', FermiSimulator);

export { FermiSimulator };
