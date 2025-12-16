/**
 * Barbershop Paradox Simulator (Lewis Carroll)
 * If one of two simultaneous assumptions leads to a contradiction, is the other disproved?
 */
import { SimulatorBase } from '../simulator-base.js';

class BarbershopSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .shop-scene {
                    background: var(--bg, #0f172a);
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    margin: 1rem 0;
                }

                .barbers {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1rem;
                    margin-bottom: 1rem;
                }

                .barber {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .barber-icon {
                    font-size: 2rem;
                    margin-bottom: 0.5rem;
                }

                .barber-name {
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                }

                .rule-box {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    margin: 0.5rem 0;
                    border-left: 4px solid var(--primary, #6366f1);
                }

                .rule-box.key {
                    border-left-color: var(--accent, #f59e0b);
                }

                .logic-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 1rem 0;
                }

                .logic-table th, .logic-table td {
                    padding: 0.5rem;
                    border: 1px solid rgba(255,255,255,0.1);
                    text-align: center;
                }

                .logic-table th {
                    background: var(--card, #1e293b);
                }

                .logic-table td.true {
                    color: #22c55e;
                }

                .logic-table td.false {
                    color: #ef4444;
                }

                @media (max-width: 600px) {
                    .barbers {
                        grid-template-columns: 1fr;
                    }
                    .controls {
                        flex-direction: column;
                    }
                }
            </style>

            <h4>Carroll's Barbershop</h4>

            <div class="shop-scene">
                <div class="barbers">
                    <div class="barber">
                        <div class="barber-icon">person</div>
                        <div class="barber-name">Allen (A)</div>
                        <div>Goes out occasionally</div>
                    </div>
                    <div class="barber">
                        <div class="barber-icon">person</div>
                        <div class="barber-name">Brown (B)</div>
                        <div>Nervous disposition</div>
                    </div>
                    <div class="barber">
                        <div class="barber-icon">person</div>
                        <div class="barber-name">Carr (C)</div>
                        <div>Always in shop</div>
                    </div>
                </div>

                <div class="rule-box">
                    <strong>Rule 1:</strong> At least one barber must always be in the shop.
                </div>
                <div class="rule-box key">
                    <strong>Rule 2:</strong> If Carr goes out, Brown must go with him (to calm his nerves).
                </div>
                <div class="rule-box key">
                    <strong>Rule 3:</strong> If Allen goes out, Brown must stay in (someone must mind shop).
                </div>
            </div>

            <div class="controls">
                <button id="allen-out-btn">Allen Goes Out</button>
                <button id="carr-out-btn">Carr Goes Out</button>
                <button id="both-btn">Both Go Out?</button>
            </div>

            <div id="analysis"></div>

            <div class="result" id="result">
                <p>Can Carr ever leave the shop? Carroll argued this simple scenario contains a logical paradox.</p>
            </div>

            <div class="insight">
                Lewis Carroll (of Alice in Wonderland fame) used this to argue about logic. The paradox arises from the rule: "If one assumption (Allen out) makes another assumption (Carr out) lead to contradiction, does that prove Allen can't go out?" The answer reveals subtleties about conditional logic.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#allen-out-btn').addEventListener('click', () => this.analyze('allen'));
        this.$('#carr-out-btn').addEventListener('click', () => this.analyze('carr'));
        this.$('#both-btn').addEventListener('click', () => this.analyze('both'));
    }

    analyze(scenario) {
        const analysis = this.$('#analysis');
        const result = this.$('#result');

        if (scenario === 'allen') {
            analysis.innerHTML = `
                <div class="rule-box">
                    <h5>Allen goes out:</h5>
                    <p>Rule 3: If Allen out, Brown must stay IN</p>
                    <p>So Brown is IN the shop</p>
                    <p>Rule 1 is satisfied (Brown is there)</p>
                    <p style="color: #22c55e;"><strong>No problem! This is allowed.</strong></p>
                </div>
            `;
            result.innerHTML = `
                <p><strong>Allen can go out safely.</strong></p>
                <p>Brown stays in to mind the shop. Carr can be in or out (if in, fine; if out, Brown goes with... but wait, Brown must stay!)</p>
                <p>Actually, if Allen is out, and Carr tries to go out, Brown must BOTH stay (Rule 3) AND go (Rule 2). So Carr must stay too.</p>
            `;
        } else if (scenario === 'carr') {
            analysis.innerHTML = `
                <div class="rule-box">
                    <h5>Can Carr go out alone?</h5>
                    <p>Rule 2: If Carr out, Brown must go OUT with him</p>
                    <p>So both Brown and Carr are OUT</p>
                    <p>Rule 1: Someone must be IN</p>
                    <p>So Allen must stay IN</p>
                    <p style="color: #22c55e;"><strong>This works! Carr can go out (with Brown).</strong></p>
                </div>
            `;
            result.innerHTML = `
                <p><strong>Carr can go out!</strong></p>
                <p>Brown accompanies him, and Allen stays to mind the shop.</p>
                <p>All rules are satisfied.</p>
            `;
        } else {
            analysis.innerHTML = `
                <div class="rule-box" style="border-color: #ef4444;">
                    <h5>What if both Allen AND Carr try to go out?</h5>
                    <p>Allen out Rule 3: Brown must stay IN</p>
                    <p>Carr out Rule 2: Brown must go OUT</p>
                    <p style="color: #ef4444;"><strong>Brown must be both IN and OUT!</strong></p>
                    <p style="color: #ef4444;">CONTRADICTION!</p>
                </div>
                <div class="rule-box">
                    <h5>Carroll's Puzzle:</h5>
                    <p>Does this mean Carr can NEVER go out?</p>
                    <p>Carroll argued: "If Allen going out leads to contradiction when Carr goes out, then Carr can't go out."</p>
                    <p>But that's wrong! The contradiction only arises when BOTH go out.</p>
                </div>
            `;
            result.innerHTML = `
                <p><strong>The Resolution:</strong></p>
                <p>Carr CAN go out (see "Carr Goes Out" scenario).</p>
                <p>The error is thinking: "If A, then (if C then contradiction)" means "C is impossible."</p>
                <p>Actually, it just means A and C can't BOTH be true simultaneously.</p>
                <p>Carroll's paradox highlights how material conditionals in logic can be counterintuitive!</p>
            `;
        }
    }
}

customElements.define('barbershop-simulator', BarbershopSimulator);

export { BarbershopSimulator };
