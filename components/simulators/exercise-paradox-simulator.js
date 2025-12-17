import { SimulatorBase } from '../simulator-base.js';

class ExerciseParadoxSimulator extends SimulatorBase {
    constructor() {
        super();
        this.lifestyles = [
            {
                name: 'Hadza Hunter-Gatherer',
                icon: '&#x1F3F9;',
                activity: 'Hunt/gather 6-8 hrs daily',
                steps: 15000,
                exerciseCalories: 800,
                totalCalories: 2600,
                bmr: 1800
            },
            {
                name: 'Office Worker',
                icon: '&#x1F4BB;',
                activity: 'Desk job, sedentary',
                steps: 3000,
                exerciseCalories: 150,
                totalCalories: 2400,
                bmr: 1800
            },
            {
                name: 'Marathon Runner',
                icon: '&#x1F3C3;',
                activity: 'Train 2+ hours daily',
                steps: 25000,
                exerciseCalories: 1200,
                totalCalories: 2800,
                bmr: 1800
            },
            {
                name: 'Farmer',
                icon: '&#x1F468;&#x200D;&#x1F33E;',
                activity: 'Manual labor 8 hrs',
                steps: 12000,
                exerciseCalories: 700,
                totalCalories: 2550,
                bmr: 1800
            }
        ];
        this.selectedIndex = 0;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .lifestyle-selector {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
                    gap: 0.75rem;
                    margin-top: 1rem;
                }

                .lifestyle-card {
                    background: var(--bg, #0f172a);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                    cursor: pointer;
                    border: 2px solid transparent;
                    transition: all 0.2s;
                }

                .lifestyle-card:hover {
                    border-color: var(--primary, #6366f1);
                }

                .lifestyle-card.selected {
                    border-color: var(--accent, #f59e0b);
                    background: rgba(245, 158, 11, 0.1);
                }

                .lifestyle-icon {
                    font-size: 2rem;
                    margin-bottom: 0.5rem;
                }

                .lifestyle-name {
                    font-weight: bold;
                    font-size: 0.875rem;
                    color: var(--primary, #6366f1);
                }

                .lifestyle-activity {
                    font-size: 0.7rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                .calorie-comparison {
                    background: var(--bg, #0f172a);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    margin-top: 1.5rem;
                }

                .calorie-bar-container {
                    margin-bottom: 1rem;
                }

                .calorie-label {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.75rem;
                    margin-bottom: 0.25rem;
                }

                .calorie-bar {
                    height: 30px;
                    background: var(--card, #1e293b);
                    border-radius: 4px;
                    overflow: hidden;
                    display: flex;
                }

                .bar-segment {
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.7rem;
                    color: white;
                    font-weight: bold;
                    transition: width 0.5s;
                }

                .bmr-segment {
                    background: linear-gradient(90deg, #6366f1, #8b5cf6);
                }

                .exercise-segment {
                    background: linear-gradient(90deg, #22c55e, #16a34a);
                }

                .neat-segment {
                    background: linear-gradient(90deg, #f59e0b, #d97706);
                }

                .comparison-note {
                    text-align: center;
                    padding: 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .comparison-value {
                    font-size: 2rem;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                }

                .legend {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1rem;
                    margin-top: 0.5rem;
                    justify-content: center;
                    font-size: 0.75rem;
                }

                .legend-item {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                }

                .legend-color {
                    width: 12px;
                    height: 12px;
                    border-radius: 2px;
                }

                .stats-row {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 0.5rem;
                    margin-top: 1rem;
                }

                .stat-box {
                    background: var(--bg, #0f172a);
                    padding: 0.75rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .stat-value {
                    font-size: 1.25rem;
                    font-weight: bold;
                    color: var(--primary, #6366f1);
                }

                .stat-label {
                    font-size: 0.65rem;
                    color: var(--muted, #94a3b8);
                }

                @media (max-width: 768px) {
                    .lifestyle-selector {
                        grid-template-columns: repeat(2, 1fr);
                    }

                    .stats-row {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>Daily Energy Expenditure Comparison</h4>
            <p style="color: var(--muted, #94a3b8); margin-bottom: 1rem;">Select lifestyles to compare. Despite vastly different activity levels, total calories are surprisingly similar.</p>

            <div class="lifestyle-selector">
                ${this.lifestyles.map((l, i) => `
                    <div class="lifestyle-card ${i === 0 ? 'selected' : ''}" data-index="${i}">
                        <div class="lifestyle-icon">${l.icon}</div>
                        <div class="lifestyle-name">${l.name}</div>
                        <div class="lifestyle-activity">${l.activity}</div>
                    </div>
                `).join('')}
            </div>

            <div class="calorie-comparison" id="comparison-area">
                <div class="calorie-bar-container">
                    <div class="calorie-label">
                        <span id="bar1-name">Hadza Hunter-Gatherer</span>
                        <span id="bar1-total">2,600 cal</span>
                    </div>
                    <div class="calorie-bar">
                        <div class="bar-segment bmr-segment" id="bar1-bmr" style="width: 69%;">BMR</div>
                        <div class="bar-segment exercise-segment" id="bar1-ex" style="width: 31%;">Activity</div>
                    </div>
                </div>
                <div class="calorie-bar-container">
                    <div class="calorie-label">
                        <span id="bar2-name">Office Worker</span>
                        <span id="bar2-total">2,400 cal</span>
                    </div>
                    <div class="calorie-bar">
                        <div class="bar-segment bmr-segment" id="bar2-bmr" style="width: 75%;">BMR</div>
                        <div class="bar-segment exercise-segment" id="bar2-ex" style="width: 6%;">Activity</div>
                        <div class="bar-segment neat-segment" id="bar2-neat" style="width: 19%;">NEAT</div>
                    </div>
                </div>
            </div>

            <div class="legend">
                <div class="legend-item">
                    <div class="legend-color" style="background: #6366f1;"></div>
                    <span>BMR (Base Metabolism)</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background: #22c55e;"></div>
                    <span>Exercise/Activity</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background: #f59e0b;"></div>
                    <span>NEAT (Fidgeting, etc.)</span>
                </div>
            </div>

            <div class="comparison-note">
                <p style="color: var(--muted); font-size: 0.875rem;">Calorie Difference</p>
                <div class="comparison-value" id="calorie-diff">200</div>
                <p style="color: var(--muted); font-size: 0.75rem;">Only <span id="diff-pct">8%</span> difference despite <span id="activity-diff">5x</span> activity difference!</p>
            </div>

            <div class="stats-row">
                <div class="stat-box">
                    <div class="stat-value" id="steps1">15,000</div>
                    <div class="stat-label" id="steps1-label">Hadza Steps</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="steps2">3,000</div>
                    <div class="stat-label" id="steps2-label">Office Steps</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="step-ratio">5x</div>
                    <div class="stat-label">Activity Ratio</div>
                </div>
            </div>

            <div class="result">
                <p><strong>The Paradox:</strong> Hunter-gatherers walk 5x more but burn only ~8% more calories. The body compensates by reducing other energy expenditure!</p>
            </div>

            <div class="insight">
                Herman Pontzer's "Constrained Energy Model": Total daily energy expenditure is constrained. When activity increases, the body reduces energy spent on other functions (inflammation, stress responses, reproduction) to maintain a stable total.
            </div>
        `;
    }

    setupEventListeners() {
        this.$$('.lifestyle-card').forEach(card => {
            card.addEventListener('click', () => {
                const index = parseInt(card.dataset.index);
                this.selectLifestyle(index, card);
            });
        });

        this.updateComparison(0, 1);
    }

    selectLifestyle(index, card) {
        const currentSelected = this.$$('.lifestyle-card.selected');
        if (currentSelected.length >= 2) {
            currentSelected[0].classList.remove('selected');
        }
        card.classList.add('selected');

        const selected = Array.from(this.$$('.lifestyle-card.selected'))
            .map(c => parseInt(c.dataset.index));

        if (selected.length === 2) {
            this.updateComparison(selected[0], selected[1]);
        }
    }

    updateComparison(idx1, idx2) {
        const l1 = this.lifestyles[idx1];
        const l2 = this.lifestyles[idx2];

        const maxCal = Math.max(l1.totalCalories, l2.totalCalories);

        this.$('#bar1-name').textContent = l1.name;
        this.$('#bar1-total').textContent = l1.totalCalories.toLocaleString() + ' cal';
        const bmr1Pct = (l1.bmr / l1.totalCalories) * 100;
        const ex1Pct = (l1.exerciseCalories / l1.totalCalories) * 100;
        this.$('#bar1-bmr').style.width = bmr1Pct + '%';
        this.$('#bar1-ex').style.width = ex1Pct + '%';

        this.$('#bar2-name').textContent = l2.name;
        this.$('#bar2-total').textContent = l2.totalCalories.toLocaleString() + ' cal';
        const bmr2Pct = (l2.bmr / l2.totalCalories) * 100;
        const ex2Pct = (l2.exerciseCalories / l2.totalCalories) * 100;
        const neat2 = l2.totalCalories - l2.bmr - l2.exerciseCalories;
        const neat2Pct = (neat2 / l2.totalCalories) * 100;
        this.$('#bar2-bmr').style.width = bmr2Pct + '%';
        this.$('#bar2-ex').style.width = ex2Pct + '%';
        this.$('#bar2-neat').style.width = neat2Pct + '%';
        this.$('#bar2-neat').style.display = neat2 > 0 ? 'flex' : 'none';

        const calDiff = Math.abs(l1.totalCalories - l2.totalCalories);
        const avgCal = (l1.totalCalories + l2.totalCalories) / 2;
        const diffPct = ((calDiff / avgCal) * 100).toFixed(0);

        const activityRatio = (Math.max(l1.steps, l2.steps) / Math.min(l1.steps, l2.steps)).toFixed(1);

        this.$('#calorie-diff').textContent = calDiff;
        this.$('#diff-pct').textContent = diffPct + '%';
        this.$('#activity-diff').textContent = activityRatio + 'x';

        this.$('#steps1').textContent = l1.steps.toLocaleString();
        this.$('#steps1-label').textContent = l1.name.split(' ')[0] + ' Steps';
        this.$('#steps2').textContent = l2.steps.toLocaleString();
        this.$('#steps2-label').textContent = l2.name.split(' ')[0] + ' Steps';
        this.$('#step-ratio').textContent = activityRatio + 'x';
    }
}

customElements.define('exercise-paradox-simulator', ExerciseParadoxSimulator);

export { ExerciseParadoxSimulator };
