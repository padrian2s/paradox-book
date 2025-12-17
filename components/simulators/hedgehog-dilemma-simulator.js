import { SimulatorBase } from '../simulator-base.js';

class HedgehogDilemmaSimulator extends SimulatorBase {
    constructor() {
        super();
        this.hedgehogs = [];
        this.animationFrame = null;
        this.targetDistance = 50;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .simulation-container {
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    padding: 1rem;
                    margin-top: 1rem;
                }

                .canvas-container {
                    position: relative;
                    width: 100%;
                    height: 200px;
                    background: linear-gradient(to bottom, #1e3a5f 0%, #0f172a 100%);
                    border-radius: 0.5rem;
                    overflow: hidden;
                }

                .hedgehog {
                    position: absolute;
                    font-size: 2.5rem;
                    transition: left 0.3s ease-out;
                    top: 50%;
                    transform: translateY(-50%);
                }

                .hedgehog.hurt {
                    animation: shake 0.2s;
                }

                @keyframes shake {
                    0%, 100% { transform: translateY(-50%) rotate(0deg); }
                    25% { transform: translateY(-50%) rotate(-5deg); }
                    75% { transform: translateY(-50%) rotate(5deg); }
                }

                .pain-indicator {
                    position: absolute;
                    font-size: 1rem;
                    opacity: 0;
                    transition: opacity 0.3s;
                }

                .pain-indicator.visible {
                    opacity: 1;
                }

                .distance-label {
                    position: absolute;
                    bottom: 10px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(0,0,0,0.5);
                    padding: 0.25rem 0.5rem;
                    border-radius: 0.25rem;
                    font-size: 0.875rem;
                }

                .slider-container {
                    margin-top: 1rem;
                    text-align: center;
                }

                .slider-label {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-bottom: 0.5rem;
                }

                input[type="range"] {
                    width: 100%;
                }

                .meters-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .meter-box {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .meter-value {
                    font-size: 1.5rem;
                    font-weight: bold;
                }

                .meter-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                .warmth-color { color: #f59e0b; }
                .pain-color { color: #ef4444; }
                .balance-color { color: #22c55e; }

                .zone-indicator {
                    text-align: center;
                    margin-top: 1rem;
                    padding: 0.5rem;
                    border-radius: 0.25rem;
                    font-weight: bold;
                }

                .cold-zone { background: rgba(59, 130, 246, 0.2); color: #3b82f6; }
                .optimal-zone { background: rgba(34, 197, 94, 0.2); color: #22c55e; }
                .pain-zone { background: rgba(239, 68, 68, 0.2); color: #ef4444; }

                @media (max-width: 768px) {
                    .meters-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>Hedgehog Closeness Simulator</h4>

            <div class="simulation-container">
                <div class="canvas-container" id="canvas">
                    <div class="hedgehog" id="hedgehog1" style="left: 30%;">🦔</div>
                    <div class="hedgehog" id="hedgehog2" style="left: 60%;">🦔</div>
                    <div class="pain-indicator" id="pain1" style="left: 35%; top: 30%;">💔</div>
                    <div class="pain-indicator" id="pain2" style="left: 55%; top: 30%;">💔</div>
                    <div class="distance-label" id="distance-label">Distance: 50%</div>
                </div>

                <div class="slider-container">
                    <div class="slider-label">
                        <span>Far Apart (Cold)</span>
                        <span>Close Together</span>
                    </div>
                    <input type="range" id="distance-slider" min="0" max="100" value="50">
                </div>
            </div>

            <div class="meters-grid">
                <div class="meter-box">
                    <div class="meter-value warmth-color" id="warmth-value">50%</div>
                    <div class="meter-label">Warmth / Connection</div>
                </div>
                <div class="meter-box">
                    <div class="meter-value pain-color" id="pain-value">25%</div>
                    <div class="meter-label">Pain / Hurt</div>
                </div>
                <div class="meter-box">
                    <div class="meter-value balance-color" id="balance-value">62%</div>
                    <div class="meter-label">Net Wellbeing</div>
                </div>
            </div>

            <div class="zone-indicator optimal-zone" id="zone-indicator">
                OPTIMAL ZONE: Warm enough without too much pain
            </div>

            <div class="controls" style="margin-top: 1rem; justify-content: center;">
                <button id="find-optimal">Find Optimal Distance</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="result">
                <p id="result-text">Adjust the slider to explore the tension between intimacy and pain...</p>
            </div>

            <div class="insight">
                Schopenhauer's hedgehog dilemma: On a cold night, hedgehogs huddle for warmth but their spines hurt each other. They must find the distance that provides warmth with minimal pain - a metaphor for human intimacy.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#distance-slider').addEventListener('input', (e) => this.updateSimulation(parseInt(e.target.value)));
        this.$('#find-optimal').addEventListener('click', () => this.findOptimal());
        this.$('#reset-btn').addEventListener('click', () => this.reset());

        this.updateSimulation(50);
    }

    updateSimulation(closeness) {
        const h1 = this.$('#hedgehog1');
        const h2 = this.$('#hedgehog2');

        const centerGap = 40 - (closeness * 0.35);
        h1.style.left = (50 - centerGap / 2) + '%';
        h2.style.left = (50 + centerGap / 2) + '%';

        const warmth = closeness;
        const pain = closeness > 50 ? Math.pow((closeness - 50) / 50, 2) * 100 : 0;
        const wellbeing = warmth - pain;

        this.$('#warmth-value').textContent = Math.round(warmth) + '%';
        this.$('#pain-value').textContent = Math.round(pain) + '%';
        this.$('#balance-value').textContent = Math.round(Math.max(0, wellbeing)) + '%';

        this.$('#distance-label').textContent = 'Closeness: ' + closeness + '%';

        const pain1 = this.$('#pain1');
        const pain2 = this.$('#pain2');

        if (pain > 20) {
            pain1.classList.add('visible');
            pain2.classList.add('visible');
            h1.classList.add('hurt');
            h2.classList.add('hurt');
        } else {
            pain1.classList.remove('visible');
            pain2.classList.remove('visible');
            h1.classList.remove('hurt');
            h2.classList.remove('hurt');
        }

        const zoneEl = this.$('#zone-indicator');
        zoneEl.classList.remove('cold-zone', 'optimal-zone', 'pain-zone');

        if (closeness < 30) {
            zoneEl.classList.add('cold-zone');
            zoneEl.textContent = 'COLD ZONE: Safe from pain, but lonely and cold';
            this.$('#result-text').textContent = 'Too distant. The hedgehogs are safe from each other\'s spines but feel isolated and cold.';
        } else if (closeness > 70) {
            zoneEl.classList.add('pain-zone');
            zoneEl.textContent = 'PAIN ZONE: Close but hurting each other';
            this.$('#result-text').textContent = 'Too close! The hedgehogs feel warmth but their spines cause significant pain.';
        } else {
            zoneEl.classList.add('optimal-zone');
            zoneEl.textContent = 'OPTIMAL ZONE: Warm enough without too much pain';
            this.$('#result-text').textContent = 'The sweet spot! Enough closeness for warmth with manageable discomfort. This is the human challenge in relationships.';
        }

        this.$('#balance-value').style.color = wellbeing > 40 ? '#22c55e' : (wellbeing > 0 ? '#f59e0b' : '#ef4444');
    }

    findOptimal() {
        let currentValue = parseInt(this.$('#distance-slider').value);
        const targetValue = 55;

        const animate = () => {
            if (currentValue < targetValue) {
                currentValue++;
            } else if (currentValue > targetValue) {
                currentValue--;
            }

            this.$('#distance-slider').value = currentValue;
            this.updateSimulation(currentValue);

            if (currentValue !== targetValue) {
                requestAnimationFrame(animate);
            }
        };

        animate();
    }

    reset() {
        this.$('#distance-slider').value = 50;
        this.updateSimulation(50);
    }
}

customElements.define('hedgehog-dilemma-simulator', HedgehogDilemmaSimulator);

export { HedgehogDilemmaSimulator };
