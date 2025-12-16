/**
 * Barber Paradox Simulator
 * A barber shaves all and only those who do not shave themselves
 */
import { SimulatorBase } from '../simulator-base.js';

class BarberSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .town-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 0.5rem;
                    margin: 1rem 0;
                }

                .person {
                    background: var(--card, #1e293b);
                    padding: 0.75rem;
                    border-radius: 0.5rem;
                    text-align: center;
                    font-size: 0.8rem;
                }

                .person.self-shaver {
                    border: 2px solid #22c55e;
                }

                .person.barber-customer {
                    border: 2px solid var(--accent, #f59e0b);
                }

                .person.barber {
                    border: 2px solid #ef4444;
                    background: rgba(239, 68, 68, 0.2);
                }

                .person-icon {
                    font-size: 1.5rem;
                    margin-bottom: 0.25rem;
                }

                .logic-box {
                    background: var(--bg, #0f172a);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    margin: 1rem 0;
                }

                .logic-line {
                    padding: 0.5rem;
                    margin: 0.25rem 0;
                    border-radius: 0.25rem;
                }

                .logic-line.contradiction {
                    background: rgba(239, 68, 68, 0.2);
                    border-left: 3px solid #ef4444;
                }

                .legend {
                    display: flex;
                    gap: 1rem;
                    flex-wrap: wrap;
                    margin: 1rem 0;
                    font-size: 0.875rem;
                }

                .legend-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .legend-color {
                    width: 16px;
                    height: 16px;
                    border-radius: 4px;
                }

                @media (max-width: 600px) {
                    .town-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
            </style>

            <h4>The Town's Shaving Rule</h4>

            <div class="legend">
                <div class="legend-item">
                    <div class="legend-color" style="background: #22c55e;"></div>
                    <span>Shaves himself</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background: var(--accent, #f59e0b);"></div>
                    <span>Shaved by barber</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background: #ef4444;"></div>
                    <span>The Barber (??)</span>
                </div>
            </div>

            <div class="town-grid" id="town"></div>

            <div class="controls">
                <button id="shaves-btn">Barber Shaves Himself</button>
                <button id="not-shaves-btn">Barber Doesn't Shave</button>
            </div>

            <div class="logic-box" id="logic">
                <p>The barber shaves <strong>all and only</strong> those men who do not shave themselves.</p>
                <p>Click a button to see what happens when we decide about the barber...</p>
            </div>

            <div class="result" id="result">
                <p>Who shaves the barber?</p>
            </div>

            <div class="insight">
                This is Bertrand Russell's popularization of his set-theoretic paradox. It shows that the rule "shaves all and only those who don't shave themselves" is logically impossible - no such barber can exist!
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#shaves-btn').addEventListener('click', () => this.analyzeBarber(true));
        this.$('#not-shaves-btn').addEventListener('click', () => this.analyzeBarber(false));
        this.renderTown();
    }

    renderTown() {
        const townspeople = [
            { name: 'Tom', selfShaves: true },
            { name: 'Dick', selfShaves: false },
            { name: 'Harry', selfShaves: true },
            { name: 'Bob', selfShaves: false },
            { name: 'Jim', selfShaves: false },
            { name: 'Bill', selfShaves: true },
            { name: 'Joe', selfShaves: false },
            { name: 'BARBER', selfShaves: null }
        ];

        this.$('#town').innerHTML = townspeople.map(p => {
            let cls = 'person';
            if (p.name === 'BARBER') cls += ' barber';
            else if (p.selfShaves) cls += ' self-shaver';
            else cls += ' barber-customer';

            const shaveStatus = p.name === 'BARBER' ? '???' :
                (p.selfShaves ? 'Shaves self' : 'Barber shaves');

            return `
                <div class="${cls}">
                    <div class="person-icon">${p.name === 'BARBER' ? 'scissors' : 'person'}</div>
                    <div>${p.name}</div>
                    <div style="font-size: 0.7rem; color: var(--muted);">${shaveStatus}</div>
                </div>
            `;
        }).join('');
    }

    analyzeBarber(shavesHimself) {
        const logic = this.$('#logic');
        const result = this.$('#result');

        if (shavesHimself) {
            logic.innerHTML = `
                <div class="logic-line">Suppose: <strong>The barber SHAVES himself</strong></div>
                <div class="logic-line">Rule: Barber shaves ONLY those who DON'T shave themselves</div>
                <div class="logic-line contradiction">But if he shaves himself, he's NOT someone who doesn't shave himself</div>
                <div class="logic-line contradiction">So the barber should NOT shave him (but the barber IS him!)</div>
                <div class="logic-line contradiction"><strong>CONTRADICTION!</strong></div>
            `;
            result.innerHTML = `
                <p style="color: #ef4444;"><strong>Contradiction!</strong></p>
                <p>If the barber shaves himself, then by the rule, he shouldn't shave himself (because he only shaves those who DON'T shave themselves).</p>
            `;
        } else {
            logic.innerHTML = `
                <div class="logic-line">Suppose: <strong>The barber DOESN'T shave himself</strong></div>
                <div class="logic-line">Rule: Barber shaves ALL those who don't shave themselves</div>
                <div class="logic-line contradiction">If he doesn't shave himself, he IS one who doesn't shave himself</div>
                <div class="logic-line contradiction">So the barber MUST shave him (but the barber IS him!)</div>
                <div class="logic-line contradiction"><strong>CONTRADICTION!</strong></div>
            `;
            result.innerHTML = `
                <p style="color: #ef4444;"><strong>Contradiction!</strong></p>
                <p>If the barber doesn't shave himself, then by the rule, he must shave himself (because he shaves ALL those who don't shave themselves).</p>
            `;
        }
    }
}

customElements.define('barber-simulator', BarberSimulator);

export { BarberSimulator };
