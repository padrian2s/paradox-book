/**
 * Radioactive Wildlife Paradox Simulator
 * Chernobyl exclusion zone is now a wildlife paradise
 */
import { SimulatorBase } from '../simulator-base.js';

class RadioactiveWildlifeSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .stat-box {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .stat-value {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                }

                .stat-label {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                }

                .radiation-high { color: #ef4444; }
                .radiation-medium { color: #f59e0b; }
                .radiation-low { color: #22c55e; }

                .animals-display {
                    margin-top: 1rem;
                    font-size: 2rem;
                    text-align: center;
                    min-height: 50px;
                }

                @media (max-width: 600px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>Chernobyl Ecosystem Simulator</h4>

            <div class="controls">
                <div class="control-group" style="width: 100%;">
                    <label>Years Since Evacuation: <span id="years-val">0</span></label>
                    <input type="range" id="years" min="0" max="40" value="0" style="width: 100%;">
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="radiation">100%</div>
                    <div class="stat-label">Radiation Level</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="wildlife">20%</div>
                    <div class="stat-label">Wildlife Population</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="species">10</div>
                    <div class="stat-label">Large Species</div>
                </div>
            </div>

            <div class="animals-display" id="animals">abandoned</div>

            <div class="result" id="result">
                <p>1986: Humans evacuate. Radiation at lethal levels.</p>
            </div>

            <div class="insight">
                Wolves, wild boar, deer, and even rare species like Przewalski's horses thrive in the zone. Human absence trumps radiation harm.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#years').addEventListener('input', () => this.update());
        this.update();
    }

    update() {
        const years = parseInt(this.$('#years').value);
        this.$('#years-val').textContent = years;

        const radiation = Math.max(5, 100 * Math.exp(-years * 0.05));
        const wildlife = Math.min(400, 20 + years * 10);
        const species = Math.min(60, 10 + years * 1.5);

        this.$('#radiation').textContent = radiation.toFixed(0) + '%';
        this.$('#wildlife').textContent = wildlife.toFixed(0) + '%';
        this.$('#species').textContent = species.toFixed(0);

        const radEl = this.$('#radiation');
        radEl.className = 'stat-value';
        if (radiation > 50) {
            radEl.classList.add('radiation-high');
        } else if (radiation > 20) {
            radEl.classList.add('radiation-medium');
        } else {
            radEl.classList.add('radiation-low');
        }

        this.$('#wildlife').style.color = '#22c55e';

        let animals = 'abandoned';
        if (years > 0) animals = 'mice rats';
        if (years > 5) animals = 'mice rats foxes boars';
        if (years > 10) animals = 'foxes boars deer wolves';
        if (years > 20) animals = 'foxes boars deer wolves eagles owls';
        if (years > 30) animals = 'wolves deer boars foxes eagles owls horses bison';

        this.$('#animals').textContent = animals;

        let explanation;
        if (years === 0) {
            explanation = '1986: Humans evacuate. Radiation at lethal levels. Wildlife flees or dies.';
        } else if (years < 10) {
            explanation = `${1986 + years}: Small animals return first. Radiation still high but decreasing.`;
        } else if (years < 25) {
            explanation = `${1986 + years}: Large mammals thrive. Wolf packs, wild boar, deer. Forest reclaims towns.`;
        } else {
            explanation = `${1986 + years}: Wildlife paradise. More biodiversity than before the disaster. Przewalski's horses introduced.`;
        }
        this.$('#result').innerHTML = '<p>' + explanation + '</p>';
    }
}

customElements.define('radioactive-wildlife-simulator', RadioactiveWildlifeSimulator);

export { RadioactiveWildlifeSimulator };
