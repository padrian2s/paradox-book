import { SimulatorBase } from '../simulator-base.js';

class CValueSimulator extends SimulatorBase {
    constructor() {
        super();
        this.organisms = [
            { name: 'Human', dna: 3.2, complexity: 95, icon: '&#x1F9D1;' },
            { name: 'Onion', dna: 16.3, complexity: 25, icon: '&#x1F9C5;' },
            { name: 'Salamander', dna: 32, complexity: 55, icon: '&#x1F98E;' },
            { name: 'Amoeba', dna: 670, complexity: 5, icon: '&#x1F9EB;' },
            { name: 'Fruit Fly', dna: 0.14, complexity: 45, icon: '&#x1FAB0;' },
            { name: 'Lungfish', dna: 130, complexity: 50, icon: '&#x1F41F;' },
            { name: 'Mouse', dna: 2.7, complexity: 75, icon: '&#x1F401;' },
            { name: 'Rice', dna: 0.43, complexity: 20, icon: '&#x1F33E;' }
        ];
        this.selectedOrganism = null;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .organisms-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                    gap: 0.75rem;
                    margin-top: 1rem;
                }

                .organism-card {
                    background: var(--bg, #0f172a);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.2s;
                    border: 2px solid transparent;
                }

                .organism-card:hover {
                    transform: scale(1.02);
                    border-color: var(--primary, #6366f1);
                }

                .organism-card.selected {
                    border-color: var(--accent, #f59e0b);
                    background: rgba(245, 158, 11, 0.1);
                }

                .organism-icon {
                    font-size: 2rem;
                    margin-bottom: 0.5rem;
                }

                .organism-name {
                    font-weight: bold;
                    color: var(--primary, #6366f1);
                    font-size: 0.875rem;
                }

                .organism-dna {
                    font-size: 0.75rem;
                    color: var(--accent, #f59e0b);
                    margin-top: 0.25rem;
                }

                .comparison-chart {
                    background: var(--bg, #0f172a);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    margin-top: 1.5rem;
                }

                .bar-row {
                    display: flex;
                    align-items: center;
                    margin-bottom: 0.75rem;
                    gap: 0.5rem;
                }

                .bar-label {
                    width: 80px;
                    font-size: 0.75rem;
                    text-align: right;
                    color: var(--muted, #94a3b8);
                }

                .bar-container {
                    flex: 1;
                    height: 24px;
                    background: var(--card, #1e293b);
                    border-radius: 4px;
                    overflow: hidden;
                    position: relative;
                }

                .bar-fill {
                    height: 100%;
                    border-radius: 4px;
                    transition: width 0.5s ease;
                    display: flex;
                    align-items: center;
                    padding-left: 0.5rem;
                    font-size: 0.7rem;
                    color: white;
                    font-weight: bold;
                }

                .bar-dna {
                    background: linear-gradient(90deg, #6366f1, #8b5cf6);
                }

                .bar-complexity {
                    background: linear-gradient(90deg, #f59e0b, #eab308);
                }

                .chart-title {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                    margin-bottom: 1rem;
                    text-align: center;
                }

                .legend {
                    display: flex;
                    justify-content: center;
                    gap: 1.5rem;
                    margin-top: 1rem;
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

                @media (max-width: 768px) {
                    .organisms-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
            </style>

            <h4>Genome Size vs Complexity</h4>
            <p style="color: var(--muted, #94a3b8); margin-bottom: 1rem;">Click organisms to compare. More DNA does not mean more complexity!</p>

            <div class="organisms-grid">
                ${this.organisms.map((org, i) => `
                    <div class="organism-card" data-index="${i}">
                        <div class="organism-icon">${org.icon}</div>
                        <div class="organism-name">${org.name}</div>
                        <div class="organism-dna">${org.dna} Gb</div>
                    </div>
                `).join('')}
            </div>

            <div class="comparison-chart">
                <div class="chart-title">Genome Size (billions of base pairs)</div>
                <div id="dna-bars"></div>
                <div class="chart-title" style="margin-top: 1rem;">Organismal Complexity (relative)</div>
                <div id="complexity-bars"></div>
                <div class="legend">
                    <div class="legend-item">
                        <div class="legend-color" style="background: linear-gradient(90deg, #6366f1, #8b5cf6);"></div>
                        <span>DNA Amount</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-color" style="background: linear-gradient(90deg, #f59e0b, #eab308);"></div>
                        <span>Complexity</span>
                    </div>
                </div>
            </div>

            <div class="result" id="result-area">
                <p><strong>The Paradox:</strong> An onion has 5x more DNA than a human, and an amoeba has 200x more!</p>
            </div>

            <div class="insight">
                Most genomic DNA consists of non-coding sequences, transposable elements, and repetitive DNA. Gene count and regulatory complexity matter more than raw genome size.
            </div>
        `;
    }

    setupEventListeners() {
        const cards = this.$$('.organism-card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const index = parseInt(card.dataset.index);
                this.selectOrganism(index, card);
            });
        });

        this.renderBars();
    }

    selectOrganism(index, card) {
        this.$$('.organism-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');

        const org = this.organisms[index];
        const human = this.organisms[0];

        const ratio = (org.dna / human.dna).toFixed(1);
        const comparison = org.dna > human.dna
            ? `${org.name} has <strong>${ratio}x MORE DNA</strong> than humans`
            : `${org.name} has <strong>${(human.dna / org.dna).toFixed(1)}x LESS DNA</strong> than humans`;

        const complexityNote = org.complexity < human.complexity
            ? `yet is far less complex`
            : org.complexity > human.complexity
                ? `and is similarly complex`
                : `with comparable complexity`;

        this.$('#result-area').innerHTML = `<p>${comparison}, ${complexityNote}.</p>`;
    }

    renderBars() {
        const maxDna = Math.max(...this.organisms.map(o => o.dna));
        const dnaBars = this.$('#dna-bars');
        const complexityBars = this.$('#complexity-bars');

        const displayOrgs = ['Human', 'Onion', 'Amoeba', 'Fruit Fly'];
        const filtered = this.organisms.filter(o => displayOrgs.includes(o.name));

        dnaBars.innerHTML = filtered.map(org => `
            <div class="bar-row">
                <div class="bar-label">${org.name}</div>
                <div class="bar-container">
                    <div class="bar-fill bar-dna" style="width: ${Math.min((org.dna / maxDna) * 100, 100)}%;">
                        ${org.dna} Gb
                    </div>
                </div>
            </div>
        `).join('');

        complexityBars.innerHTML = filtered.map(org => `
            <div class="bar-row">
                <div class="bar-label">${org.name}</div>
                <div class="bar-container">
                    <div class="bar-fill bar-complexity" style="width: ${org.complexity}%;">
                        ${org.complexity}%
                    </div>
                </div>
            </div>
        `).join('');
    }
}

customElements.define('c-value-simulator', CValueSimulator);

export { CValueSimulator };
