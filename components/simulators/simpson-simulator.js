/**
 * Simpson's Paradox Simulator
 * Demonstrates how a trend in subgroups can reverse when groups are combined
 */
import { SimulatorBase } from '../simulator-base.js';

class SimpsonSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .stat-box {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .stat-box h5 {
                    margin: 0 0 0.5rem 0;
                    font-size: 0.875rem;
                }

                .stat-box p {
                    margin: 0.25rem 0;
                    font-size: 0.875rem;
                    color: var(--text, #e2e8f0);
                }

                .tables-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .winner-label {
                    color: var(--accent, #f59e0b);
                    font-weight: bold;
                }

                .paradox-text {
                    color: #ef4444;
                    font-weight: bold;
                    font-size: 1.25rem;
                }

                @media (max-width: 768px) {
                    .tables-grid {
                        grid-template-columns: 1fr;
                        gap: 0.75rem;
                    }

                    .stat-box {
                        padding: 0.75rem;
                    }

                    .stat-box h5 {
                        font-size: 0.8rem;
                    }

                    .stat-box p {
                        font-size: 0.75rem;
                    }
                }
            </style>

            <h4>Medical Treatment Simulator</h4>
            <p style="color: var(--muted, #94a3b8); margin-bottom: 1rem;">Compare success rates of Treatment A vs B across two patient groups</p>

            <div class="controls">
                <button id="run-btn">Generate Example</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="tables-grid">
                <div class="stat-box">
                    <h5 style="color: var(--primary, #6366f1);">Group: Mild Cases</h5>
                    <p>Treatment A: <span id="mild-a">-</span></p>
                    <p>Treatment B: <span id="mild-b">-</span></p>
                    <p class="winner-label">Winner: <span id="mild-winner">-</span></p>
                </div>
                <div class="stat-box">
                    <h5 style="color: var(--secondary, #8b5cf6);">Group: Severe Cases</h5>
                    <p>Treatment A: <span id="severe-a">-</span></p>
                    <p>Treatment B: <span id="severe-b">-</span></p>
                    <p class="winner-label">Winner: <span id="severe-winner">-</span></p>
                </div>
                <div class="stat-box">
                    <h5 style="color: var(--accent, #f59e0b);">Combined Data</h5>
                    <p>Treatment A: <span id="total-a">-</span></p>
                    <p>Treatment B: <span id="total-b">-</span></p>
                    <p class="winner-label">Winner: <span id="total-winner">-</span></p>
                </div>
            </div>

            <div class="result" id="result-box" style="display: none;">
                <p class="paradox-text" id="paradox-text">PARADOX DETECTED!</p>
                <p id="explanation"></p>
            </div>

            <div class="insight">
                This paradox is why we must be careful with aggregated statistics. The lurking variable (case severity) determines which treatment gets assigned to whom.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#run-btn').addEventListener('click', () => this.runSimulation());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
    }

    runSimulation() {
        const mildA = { success: 81, total: 87 };
        const mildB = { success: 234, total: 270 };
        const severeA = { success: 192, total: 263 };
        const severeB = { success: 55, total: 80 };

        const totalA = { success: mildA.success + severeA.success, total: mildA.total + severeA.total };
        const totalB = { success: mildB.success + severeB.success, total: mildB.total + severeB.total };

        const pctMildA = (mildA.success / mildA.total * 100).toFixed(1);
        const pctMildB = (mildB.success / mildB.total * 100).toFixed(1);
        const pctSevereA = (severeA.success / severeA.total * 100).toFixed(1);
        const pctSevereB = (severeB.success / severeB.total * 100).toFixed(1);
        const pctTotalA = (totalA.success / totalA.total * 100).toFixed(1);
        const pctTotalB = (totalB.success / totalB.total * 100).toFixed(1);

        this.$('#mild-a').textContent = `${mildA.success}/${mildA.total} (${pctMildA}%)`;
        this.$('#mild-b').textContent = `${mildB.success}/${mildB.total} (${pctMildB}%)`;
        this.$('#mild-winner').textContent = parseFloat(pctMildA) > parseFloat(pctMildB) ? 'A' : 'B';

        this.$('#severe-a').textContent = `${severeA.success}/${severeA.total} (${pctSevereA}%)`;
        this.$('#severe-b').textContent = `${severeB.success}/${severeB.total} (${pctSevereB}%)`;
        this.$('#severe-winner').textContent = parseFloat(pctSevereA) > parseFloat(pctSevereB) ? 'A' : 'B';

        this.$('#total-a').textContent = `${totalA.success}/${totalA.total} (${pctTotalA}%)`;
        this.$('#total-b').textContent = `${totalB.success}/${totalB.total} (${pctTotalB}%)`;
        this.$('#total-winner').textContent = parseFloat(pctTotalA) > parseFloat(pctTotalB) ? 'A' : 'B';

        this.$('#result-box').style.display = 'block';
        this.$('#explanation').textContent =
            `Treatment A wins in BOTH subgroups (${pctMildA}% > ${pctMildB}% for mild, ${pctSevereA}% > ${pctSevereB}% for severe). ` +
            `But Treatment B wins overall (${pctTotalB}% > ${pctTotalA}%)! ` +
            `This happens because Treatment A was mostly given to severe cases (harder to treat).`;
    }

    reset() {
        ['mild-a', 'mild-b', 'severe-a', 'severe-b', 'total-a', 'total-b',
         'mild-winner', 'severe-winner', 'total-winner'].forEach(id => {
            this.$(`#${id}`).textContent = '-';
        });
        this.$('#result-box').style.display = 'none';
    }
}

customElements.define('simpson-simulator', SimpsonSimulator);

export { SimpsonSimulator };
