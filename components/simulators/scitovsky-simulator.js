import { SimulatorBase } from '../simulator-base.js';

class ScitovskySimulator extends SimulatorBase {
    constructor() {
        super();
        this.state = {
            personABefore: { apples: 10, oranges: 5 },
            personBBefore: { apples: 5, oranges: 10 },
            personAAfter: { apples: 5, oranges: 10 },
            personBAfter: { apples: 10, oranges: 5 },
            scenario: 'trade'
        };
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .welfare-viz {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .scenario-tabs {
                    display: flex;
                    gap: 0.5rem;
                    margin-bottom: 1.5rem;
                }

                .scenario-tab {
                    flex: 1;
                    padding: 0.75rem;
                    background: var(--card, #1e293b);
                    border: 2px solid transparent;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    text-align: center;
                    font-size: 0.875rem;
                }

                .scenario-tab:hover { border-color: var(--primary, #6366f1); }
                .scenario-tab.active { border-color: #22c55e; background: rgba(34, 197, 94, 0.1); }

                .states-container {
                    display: grid;
                    grid-template-columns: 1fr auto 1fr;
                    gap: 1rem;
                    align-items: center;
                }

                .state-box {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                }

                .state-title {
                    text-align: center;
                    font-weight: bold;
                    margin-bottom: 1rem;
                    padding-bottom: 0.5rem;
                    border-bottom: 1px solid var(--muted, #94a3b8);
                }

                .person-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.5rem;
                    margin: 0.25rem 0;
                    background: var(--bg, #0f172a);
                    border-radius: 0.25rem;
                }

                .person-name {
                    font-weight: bold;
                    font-size: 0.875rem;
                }

                .goods-display {
                    display: flex;
                    gap: 0.75rem;
                    font-size: 0.75rem;
                }

                .good-item {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                }

                .arrow-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.5rem;
                }

                .change-arrow {
                    font-size: 2rem;
                    color: var(--primary, #6366f1);
                }

                .comparison-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    margin-top: 1.5rem;
                }

                .comparison-card {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .comparison-card.pass { border: 2px solid #22c55e; }
                .comparison-card.fail { border: 2px solid #ef4444; }

                .comparison-title {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-bottom: 0.5rem;
                }

                .comparison-result {
                    font-size: 1.25rem;
                    font-weight: bold;
                }

                .verdict-box {
                    margin-top: 1.5rem;
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .verdict-box.paradox {
                    background: rgba(239, 68, 68, 0.1);
                    border: 2px solid #ef4444;
                }

                .verdict-box.clear {
                    background: rgba(34, 197, 94, 0.1);
                    border: 2px solid #22c55e;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
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
                    color: var(--primary, #6366f1);
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                @media (max-width: 600px) {
                    .states-container {
                        grid-template-columns: 1fr;
                    }
                    .arrow-container {
                        flex-direction: row;
                    }
                    .change-arrow {
                        transform: rotate(90deg);
                    }
                    .scenario-tabs {
                        flex-direction: column;
                    }
                }
            </style>

            <h4>Social Welfare Criteria Test</h4>
            <p style="margin-bottom: 1rem; color: var(--muted);">The Kaldor-Hicks criteria can recommend a change AND its reversal. Both directions pass the "improvement" test!</p>

            <div class="welfare-viz">
                <div class="scenario-tabs">
                    <div class="scenario-tab active" data-scenario="trade">Simple Trade</div>
                    <div class="scenario-tab" data-scenario="policy">Policy Change</div>
                    <div class="scenario-tab" data-scenario="paradox">Full Paradox</div>
                </div>

                <div class="states-container">
                    <div class="state-box">
                        <div class="state-title">State X (Before)</div>
                        <div class="person-row">
                            <span class="person-name">Person A</span>
                            <div class="goods-display">
                                <div class="good-item">🍎 <span id="ax-apples">10</span></div>
                                <div class="good-item">🍊 <span id="ax-oranges">5</span></div>
                            </div>
                        </div>
                        <div class="person-row">
                            <span class="person-name">Person B</span>
                            <div class="goods-display">
                                <div class="good-item">🍎 <span id="bx-apples">5</span></div>
                                <div class="good-item">🍊 <span id="bx-oranges">10</span></div>
                            </div>
                        </div>
                    </div>

                    <div class="arrow-container">
                        <div class="change-arrow">→</div>
                        <button id="test-btn" style="font-size: 0.75rem; padding: 0.5rem;">Test Criteria</button>
                    </div>

                    <div class="state-box">
                        <div class="state-title">State Y (After)</div>
                        <div class="person-row">
                            <span class="person-name">Person A</span>
                            <div class="goods-display">
                                <div class="good-item">🍎 <span id="ay-apples">5</span></div>
                                <div class="good-item">🍊 <span id="ay-oranges">10</span></div>
                            </div>
                        </div>
                        <div class="person-row">
                            <span class="person-name">Person B</span>
                            <div class="goods-display">
                                <div class="good-item">🍎 <span id="by-apples">10</span></div>
                                <div class="good-item">🍊 <span id="by-oranges">5</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="comparison-grid">
                    <div class="comparison-card" id="kaldor-card">
                        <div class="comparison-title">Kaldor Criterion (X→Y)</div>
                        <div class="comparison-result" id="kaldor-result">?</div>
                        <div style="font-size: 0.7rem; color: var(--muted);">Winners could compensate losers</div>
                    </div>
                    <div class="comparison-card" id="hicks-card">
                        <div class="comparison-title">Hicks Criterion (Y→X)</div>
                        <div class="comparison-result" id="hicks-result">?</div>
                        <div style="font-size: 0.7rem; color: var(--muted);">Losers couldn't bribe winners to stay</div>
                    </div>
                </div>

                <div class="verdict-box clear" id="verdict-box">
                    <div id="verdict-text">Select a scenario and click "Test Criteria" to see the paradox in action.</div>
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="total-x">30</div>
                    <div class="stat-label">Total Goods (X)</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="total-y">30</div>
                    <div class="stat-label">Total Goods (Y)</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="paradox-status">No</div>
                    <div class="stat-label">Paradox Present</div>
                </div>
            </div>

            <div class="result">
                <p id="scitovsky-result">The Scitovsky Paradox shows that standard welfare criteria can recommend a change and simultaneously recommend reversing that change!</p>
            </div>

            <div class="insight">
                This paradox undermines cost-benefit analysis. If criteria approve both a policy and its reversal, how can we ever say one state is "better" than another?
            </div>
        `;
    }

    setupEventListeners() {
        this.$$('.scenario-tab').forEach(tab => {
            tab.addEventListener('click', () => this.selectScenario(tab.dataset.scenario));
        });
        this.$('#test-btn').addEventListener('click', () => this.testCriteria());
        this.updateDisplay();
    }

    selectScenario(scenario) {
        this.state.scenario = scenario;
        this.$$('.scenario-tab').forEach(tab => tab.classList.remove('active'));
        this.$(`.scenario-tab[data-scenario="${scenario}"]`).classList.add('active');

        if (scenario === 'trade') {
            this.state.personABefore = { apples: 10, oranges: 5 };
            this.state.personBBefore = { apples: 5, oranges: 10 };
            this.state.personAAfter = { apples: 5, oranges: 10 };
            this.state.personBAfter = { apples: 10, oranges: 5 };
        } else if (scenario === 'policy') {
            this.state.personABefore = { apples: 8, oranges: 8 };
            this.state.personBBefore = { apples: 7, oranges: 7 };
            this.state.personAAfter = { apples: 12, oranges: 3 };
            this.state.personBAfter = { apples: 3, oranges: 12 };
        } else if (scenario === 'paradox') {
            this.state.personABefore = { apples: 10, oranges: 2 };
            this.state.personBBefore = { apples: 2, oranges: 10 };
            this.state.personAAfter = { apples: 2, oranges: 10 };
            this.state.personBAfter = { apples: 10, oranges: 2 };
        }

        this.updateDisplay();
        this.$('#kaldor-result').textContent = '?';
        this.$('#hicks-result').textContent = '?';
        this.$('#kaldor-card').className = 'comparison-card';
        this.$('#hicks-card').className = 'comparison-card';
        this.$('#verdict-box').className = 'verdict-box clear';
        this.$('#verdict-text').textContent = 'Click "Test Criteria" to evaluate welfare change.';
        this.$('#paradox-status').textContent = 'No';
        this.$('#paradox-status').style.color = 'var(--primary, #6366f1)';
    }

    testCriteria() {
        const utilityA_X = this.state.personABefore.apples + this.state.personABefore.oranges * 1.2;
        const utilityB_X = this.state.personBBefore.apples * 1.2 + this.state.personBBefore.oranges;
        const utilityA_Y = this.state.personAAfter.apples + this.state.personAAfter.oranges * 1.2;
        const utilityB_Y = this.state.personBAfter.apples * 1.2 + this.state.personBAfter.oranges;

        const totalX = utilityA_X + utilityB_X;
        const totalY = utilityA_Y + utilityB_Y;

        const kaldorPass = totalY >= totalX;
        const hicksPass = totalX >= totalY;

        this.$('#kaldor-result').textContent = kaldorPass ? 'PASS' : 'FAIL';
        this.$('#kaldor-card').className = 'comparison-card ' + (kaldorPass ? 'pass' : 'fail');

        this.$('#hicks-result').textContent = hicksPass ? 'PASS' : 'FAIL';
        this.$('#hicks-card').className = 'comparison-card ' + (hicksPass ? 'pass' : 'fail');

        const isParadox = kaldorPass && hicksPass && this.state.scenario === 'paradox';

        if (isParadox) {
            this.$('#verdict-box').className = 'verdict-box paradox';
            this.$('#verdict-text').innerHTML = '<strong style="color: #ef4444;">SCITOVSKY PARADOX!</strong> Both X→Y and Y→X pass the criteria. The change is recommended AND reversing it is recommended!';
            this.$('#paradox-status').textContent = 'Yes!';
            this.$('#paradox-status').style.color = '#ef4444';
        } else if (kaldorPass && !hicksPass) {
            this.$('#verdict-box').className = 'verdict-box clear';
            this.$('#verdict-text').innerHTML = '<strong style="color: #22c55e;">CLEAR IMPROVEMENT!</strong> Y is unambiguously better than X by Scitovsky criteria.';
        } else if (!kaldorPass && hicksPass) {
            this.$('#verdict-box').className = 'verdict-box clear';
            this.$('#verdict-text').innerHTML = '<strong style="color: #22c55e;">CLEAR DECLINE!</strong> X is unambiguously better than Y.';
        } else {
            this.$('#verdict-box').className = 'verdict-box clear';
            this.$('#verdict-text').textContent = 'Results are ambiguous. Try the "Full Paradox" scenario to see the contradiction.';
        }

        this.$('#scitovsky-result').textContent = `Kaldor test (can winners compensate losers?): ${kaldorPass ? 'Yes' : 'No'}. Hicks test (can losers bribe to prevent?): ${hicksPass ? 'No' : 'Yes'}.`;

        this.dispatchSimulatorEvent('scitovsky-tested', {
            kaldorPass,
            hicksPass,
            isParadox
        });
    }

    updateDisplay() {
        this.$('#ax-apples').textContent = this.state.personABefore.apples;
        this.$('#ax-oranges').textContent = this.state.personABefore.oranges;
        this.$('#bx-apples').textContent = this.state.personBBefore.apples;
        this.$('#bx-oranges').textContent = this.state.personBBefore.oranges;

        this.$('#ay-apples').textContent = this.state.personAAfter.apples;
        this.$('#ay-oranges').textContent = this.state.personAAfter.oranges;
        this.$('#by-apples').textContent = this.state.personBAfter.apples;
        this.$('#by-oranges').textContent = this.state.personBAfter.oranges;

        const totalX = this.state.personABefore.apples + this.state.personABefore.oranges +
                       this.state.personBBefore.apples + this.state.personBBefore.oranges;
        const totalY = this.state.personAAfter.apples + this.state.personAAfter.oranges +
                       this.state.personBAfter.apples + this.state.personBAfter.oranges;

        this.$('#total-x').textContent = totalX;
        this.$('#total-y').textContent = totalY;
    }
}

customElements.define('scitovsky-simulator', ScitovskySimulator);

export { ScitovskySimulator };
