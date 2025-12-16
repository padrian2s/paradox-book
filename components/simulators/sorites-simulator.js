/**
 * Sorites Paradox Simulator
 * When does a heap stop being a heap?
 */
import { SimulatorBase } from '../simulator-base.js';

class SoritesSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .heap-viz {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin: 1rem 0;
                    text-align: center;
                    min-height: 150px;
                }

                .grain-container {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 2px;
                    max-width: 300px;
                    margin: 0 auto;
                }

                .grain {
                    width: 8px;
                    height: 8px;
                    background: linear-gradient(135deg, #f59e0b, #d97706);
                    border-radius: 50%;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    margin: 1rem 0;
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
                    color: var(--primary, #6366f1);
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                .classification {
                    font-size: 2rem;
                    margin: 1rem 0;
                }

                .boundary-markers {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 0.5rem;
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }

                .slider-container {
                    width: 100%;
                }

                .slider-container input[type="range"] {
                    width: 100%;
                }
            </style>

            <h4>Heap Builder</h4>

            <div class="controls">
                <div class="control-group slider-container">
                    <label>Grains: <span id="sorites-val">1000</span></label>
                    <input type="range" id="sorites-n" min="0" max="1000" value="1000">
                    <div class="boundary-markers">
                        <span>0</span>
                        <span>250</span>
                        <span>500</span>
                        <span>750</span>
                        <span>1000</span>
                    </div>
                </div>
            </div>

            <div class="heap-viz">
                <div class="classification" id="sorites-status">Heap</div>
                <div class="grain-container" id="grain-container"></div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="sorites-grains">1000</div>
                    <div class="stat-label">Grains</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="sorites-percent">100%</div>
                    <div class="stat-label">Of Original</div>
                </div>
            </div>

            <div class="result" id="sorites-result">
                <p>At what exact point does a heap cease to be a heap?</p>
            </div>

            <div class="insight">
                Vague predicates have no sharp boundary. The paradox shows that our language contains inherent vagueness - there's no single grain that makes the difference.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#sorites-n').addEventListener('input', () => this.updateSorites());
        this.updateSorites();
    }

    updateSorites() {
        const n = parseInt(this.$('#sorites-n').value);
        this.$('#sorites-val').textContent = n;
        this.$('#sorites-grains').textContent = n;
        this.$('#sorites-percent').textContent = Math.round(n / 10) + '%';

        let status, statusColor, result;

        if (n >= 500) {
            status = 'Heap';
            statusColor = '#22c55e';
            result = '<p>Clearly a heap with ' + n + ' grains.</p>';
        } else if (n >= 100) {
            status = 'Heap?';
            statusColor = 'var(--accent)';
            result = '<p>Getting smaller... but still probably a heap?</p>';
        } else if (n >= 20) {
            status = 'Pile?';
            statusColor = '#f59e0b';
            result = '<p style="color: var(--accent);">Is this a heap or just a pile?</p>';
        } else if (n >= 5) {
            status = 'Few grains';
            statusColor = '#ef4444';
            result = '<p style="color: var(--accent);">Surely not a heap anymore... but when did it stop?</p>';
        } else {
            status = 'Not a heap';
            statusColor = '#ef4444';
            result = '<p>Definitely not a heap. But which removal made the difference?</p>';
        }

        this.$('#sorites-status').textContent = status;
        this.$('#sorites-status').style.color = statusColor;
        this.$('#sorites-result').innerHTML = result;

        this.renderGrains(n);
    }

    renderGrains(count) {
        const container = this.$('#grain-container');
        const displayCount = Math.min(count, 200);
        const grainHtml = '<div class="grain"></div>'.repeat(displayCount);
        container.innerHTML = grainHtml;

        if (count > 200) {
            container.innerHTML += `<div style="width: 100%; text-align: center; color: var(--muted); font-size: 0.75rem; margin-top: 0.5rem;">...and ${count - 200} more</div>`;
        }
    }
}

customElements.define('sorites-simulator', SoritesSimulator);

export { SoritesSimulator };
