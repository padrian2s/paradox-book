/**
 * Bonini's Paradox Simulator
 * As a model becomes more complete, it becomes harder to understand
 */
import { SimulatorBase } from '../simulator-base.js';

class BoniniSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    margin: 1.5rem 0;
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
                    color: var(--text, #e2e8f0);
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                .tradeoff-viz {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin: 1rem 0;
                }

                .bar-group {
                    margin-bottom: 1rem;
                }

                .bar-group:last-child {
                    margin-bottom: 0;
                }

                .bar-label {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.875rem;
                    margin-bottom: 0.25rem;
                }

                .bar-label-text {
                    color: var(--muted, #94a3b8);
                }

                .bar-label-value {
                    color: var(--text, #e2e8f0);
                    font-weight: bold;
                }

                .bar-container {
                    height: 20px;
                    background: var(--card, #1e293b);
                    border-radius: 10px;
                    overflow: hidden;
                }

                .bar-fill {
                    height: 100%;
                    transition: width 0.4s ease;
                    border-radius: 10px;
                }

                .bar-fill.accuracy {
                    background: linear-gradient(90deg, #22c55e, #3b82f6);
                }

                .bar-fill.understanding {
                    background: linear-gradient(90deg, #8b5cf6, #6366f1);
                }

                .sweet-spot {
                    text-align: center;
                    margin-top: 1rem;
                    padding: 0.5rem;
                    border-radius: 0.5rem;
                    font-size: 0.875rem;
                    transition: all 0.3s;
                }

                .sweet-spot.optimal {
                    background: rgba(34, 197, 94, 0.2);
                    border: 1px solid #22c55e;
                    color: #22c55e;
                }

                .sweet-spot.suboptimal {
                    background: rgba(239, 68, 68, 0.2);
                    border: 1px solid #ef4444;
                    color: #ef4444;
                }
            </style>

            <h4>Model Complexity Tradeoff</h4>

            <div class="controls">
                <div class="control-group">
                    <label>Model Detail Level: <span id="detail-val">50%</span></label>
                    <input type="range" id="detail-slider" min="0" max="100" value="50">
                </div>
            </div>

            <div class="tradeoff-viz">
                <div class="bar-group">
                    <div class="bar-label">
                        <span class="bar-label-text">Accuracy</span>
                        <span class="bar-label-value" id="accuracy-val">Medium</span>
                    </div>
                    <div class="bar-container">
                        <div class="bar-fill accuracy" id="accuracy-bar" style="width: 50%;"></div>
                    </div>
                </div>

                <div class="bar-group">
                    <div class="bar-label">
                        <span class="bar-label-text">Understandability</span>
                        <span class="bar-label-value" id="understand-val">Medium</span>
                    </div>
                    <div class="bar-container">
                        <div class="bar-fill understanding" id="understand-bar" style="width: 50%;"></div>
                    </div>
                </div>

                <div class="sweet-spot optimal" id="sweet-spot">
                    Balanced model - useful approximation
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="usefulness">Medium</div>
                    <div class="stat-label">Practical Usefulness</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="insight">Medium</div>
                    <div class="stat-label">Insight Generated</div>
                </div>
            </div>

            <div class="result" id="result">
                <p>The usefulness of a model depends on finding the right balance between accuracy and simplicity.</p>
            </div>

            <div class="insight">
                "All models are wrong, but some are useful." - George Box. A perfect 1:1 map of a city is the city itself - useless for navigation.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#detail-slider').addEventListener('input', () => this.calculate());
        this.calculate();
    }

    calculate() {
        const detail = parseInt(this.$('#detail-slider').value);
        this.$('#detail-val').textContent = detail + '%';

        const accuracy = detail;
        const understanding = 100 - detail;

        this.$('#accuracy-bar').style.width = accuracy + '%';
        this.$('#understand-bar').style.width = understanding + '%';

        let accuracyLabel, understandLabel, usefulness, insight, result, sweetSpotClass, sweetSpotText;

        if (detail < 30) {
            accuracyLabel = 'Low';
            understandLabel = 'High';
            usefulness = 'Limited';
            insight = 'Quick';
            sweetSpotClass = 'suboptimal';
            sweetSpotText = 'Too simple - missing important details';
            result = `<p>Simple model: easy to understand but potentially misleading.</p>
                <p style="color: var(--accent);">May miss critical factors that affect predictions.</p>`;
        } else if (detail < 70) {
            accuracyLabel = 'Medium';
            understandLabel = 'Medium';
            usefulness = 'High';
            insight = 'Deep';
            sweetSpotClass = 'optimal';
            sweetSpotText = 'Sweet spot - useful approximation!';
            result = `<p style="color: #22c55e;"><strong>Balanced model:</strong> captures essential dynamics while remaining interpretable.</p>
                <p>This is where most useful models live - accurate enough to be predictive, simple enough to be actionable.</p>`;
        } else if (detail < 90) {
            accuracyLabel = 'High';
            understandLabel = 'Low';
            usefulness = 'Moderate';
            insight = 'Limited';
            sweetSpotClass = 'suboptimal';
            sweetSpotText = 'Complex - hard to interpret and debug';
            result = `<p style="color: var(--accent);"><strong>Complex model:</strong> more accurate but harder to understand.</p>
                <p>Black-box territory. You can't explain why it makes predictions.</p>
                <p>Debugging becomes nearly impossible.</p>`;
        } else {
            accuracyLabel = 'Perfect';
            understandLabel = 'None';
            usefulness = 'Useless';
            insight = 'None';
            sweetSpotClass = 'suboptimal';
            sweetSpotText = 'As complex as reality - completely useless!';
            result = `<p style="color: #ef4444;"><strong>Perfect model:</strong> as complex as reality itself!</p>
                <p>A 1:1 scale map of a city IS the city. It takes as long to read as to walk.</p>
                <p style="color: var(--accent);">This is Bonini's Paradox: perfect accuracy = zero usefulness.</p>`;
        }

        this.$('#accuracy-val').textContent = accuracyLabel;
        this.$('#understand-val').textContent = understandLabel;
        this.$('#usefulness').textContent = usefulness;
        this.$('#insight').textContent = insight;
        this.$('#sweet-spot').textContent = sweetSpotText;
        this.$('#sweet-spot').className = 'sweet-spot ' + sweetSpotClass;
        this.$('#result').innerHTML = result;
    }
}

customElements.define('bonini-simulator', BoniniSimulator);

export { BoniniSimulator };
