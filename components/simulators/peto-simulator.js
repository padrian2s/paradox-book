/**
 * Peto's Paradox Simulator
 * Demonstrates how large animals have lower cancer rates despite more cells
 */
import { SimulatorBase } from '../simulator-base.js';

class PetoSimulator extends SimulatorBase {
    constructor() {
        super();
        this.animals = [
            { name: 'Mouse', cells: '10 billion', expected: 3, actual: 30, p53: 2, icon: '&#x1F401;' },
            { name: 'Human', cells: '37 trillion', expected: 12, actual: 25, p53: 2, icon: '&#x1F9D1;' },
            { name: 'Elephant', cells: '3 quadrillion', expected: 80, actual: 5, p53: 40, icon: '&#x1F418;' },
            { name: 'Blue Whale', cells: '10 quadrillion', expected: 99, actual: 2, p53: 60, icon: '&#x1F40B;' }
        ];
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .animals-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .animal-card {
                    background: var(--bg, #0f172a);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                    transition: transform 0.2s;
                }

                .animal-card:hover {
                    transform: scale(1.02);
                }

                .animal-icon {
                    font-size: 2.5rem;
                    margin-bottom: 0.5rem;
                }

                .animal-name {
                    font-weight: bold;
                    color: var(--primary, #6366f1);
                    margin-bottom: 0.5rem;
                }

                .animal-cells {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-bottom: 0.5rem;
                }

                .cancer-rates {
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                    font-size: 0.875rem;
                }

                .expected-rate {
                    color: #ef4444;
                }

                .actual-rate {
                    font-weight: bold;
                }

                .actual-rate.low {
                    color: #22c55e;
                }

                .actual-rate.high {
                    color: #ef4444;
                }

                .p53-info {
                    margin-top: 0.5rem;
                    padding: 0.5rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.25rem;
                    font-size: 0.75rem;
                }

                .p53-count {
                    color: var(--accent, #f59e0b);
                    font-weight: bold;
                }

                .comparison-viz {
                    margin-top: 1.5rem;
                    background: var(--bg, #0f172a);
                    padding: 1rem;
                    border-radius: 0.5rem;
                }

                .bar-comparison {
                    display: flex;
                    gap: 0.5rem;
                    margin-bottom: 0.5rem;
                }

                .bar-label {
                    width: 80px;
                    font-size: 0.75rem;
                    text-align: right;
                }

                .bar-container {
                    flex: 1;
                    height: 20px;
                    background: var(--card, #1e293b);
                    border-radius: 0.25rem;
                    overflow: hidden;
                }

                .bar-fill {
                    height: 100%;
                    transition: width 0.5s;
                    display: flex;
                    align-items: center;
                    padding-left: 0.5rem;
                    font-size: 0.7rem;
                    color: white;
                }

                .expected-bar {
                    background: #ef4444;
                }

                .actual-bar {
                    background: #22c55e;
                }
            </style>

            <h4>Cancer Risk Calculator</h4>
            <p style="color: var(--muted, #94a3b8); margin-bottom: 1rem;">Compare expected vs actual cancer rates based on body size.</p>

            <div class="animals-grid">
                ${this.animals.map(animal => `
                    <div class="animal-card">
                        <div class="animal-icon">${animal.icon}</div>
                        <div class="animal-name">${animal.name}</div>
                        <div class="animal-cells">${animal.cells} cells</div>
                        <div class="cancer-rates">
                            <div class="expected-rate">Expected: ${animal.expected}%</div>
                            <div class="actual-rate ${animal.actual < animal.expected ? 'low' : 'high'}">Actual: ${animal.actual}%</div>
                        </div>
                        <div class="p53-info">
                            p53 genes: <span class="p53-count">${animal.p53}</span>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="comparison-viz">
                <h5 style="margin-bottom: 1rem; color: var(--muted);">Elephant vs Mouse Cancer Paradox</h5>
                <div class="bar-comparison">
                    <span class="bar-label">Mouse Expected:</span>
                    <div class="bar-container">
                        <div class="bar-fill expected-bar" style="width: 3%;">3%</div>
                    </div>
                </div>
                <div class="bar-comparison">
                    <span class="bar-label">Mouse Actual:</span>
                    <div class="bar-container">
                        <div class="bar-fill" style="width: 30%; background: #ef4444;">30%+</div>
                    </div>
                </div>
                <div class="bar-comparison">
                    <span class="bar-label">Elephant Expected:</span>
                    <div class="bar-container">
                        <div class="bar-fill expected-bar" style="width: 80%;">80%+</div>
                    </div>
                </div>
                <div class="bar-comparison">
                    <span class="bar-label">Elephant Actual:</span>
                    <div class="bar-container">
                        <div class="bar-fill actual-bar" style="width: 5%;">~5%</div>
                    </div>
                </div>
            </div>

            <div class="result">
                <p>Elephants have <strong>20 copies</strong> of the p53 tumor suppressor gene. Humans have only <strong>2</strong>!</p>
            </div>

            <div class="insight">
                Large, long-lived animals evolved enhanced cancer suppression. This paradox is helping develop new cancer treatments for humans.
            </div>
        `;
    }

    setupEventListeners() {
    }
}

customElements.define('peto-simulator', PetoSimulator);

export { PetoSimulator };
