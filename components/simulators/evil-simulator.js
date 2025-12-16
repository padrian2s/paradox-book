/**
 * Problem of Evil Simulator
 */
import { SimulatorBase } from '../simulator-base.js';

class EvilSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}
                .attributes { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 1rem 0; }
                .attr { background: var(--card); padding: 1rem; border-radius: 0.5rem; text-align: center; }
                .attr.active { border: 2px solid #22c55e; }
                .attr.conflict { border: 2px solid #ef4444; }
                .evil-box { background: var(--bg); padding: 1rem; border-radius: 0.5rem; text-align: center; margin: 1rem 0; font-size: 1.2rem; color: #ef4444; }
            </style>
            <h4>The Epicurean Paradox</h4>
            <div class="attributes">
                <div class="attr" id="omni">Omnipotent<br><small>Can do anything</small></div>
                <div class="attr" id="omnis">Omniscient<br><small>Knows everything</small></div>
                <div class="attr" id="good">All-Good<br><small>Wants no evil</small></div>
            </div>
            <div class="evil-box">Yet evil exists in the world</div>
            <div class="controls">
                <button id="logical-btn">Logical Problem</button>
                <button id="theodicy-btn">Theodicies</button>
            </div>
            <div id="analysis"></div>
            <div class="result" id="result"><p>Can these three attributes coexist with evil?</p></div>
            <div class="insight">The problem of evil is perhaps the strongest argument against classical theism. Theodicies (defenses of God) include: free will defense, soul-making theodicy, and skeptical theism.</div>
        `;
    }

    setupEventListeners() {
        this.$('#logical-btn').addEventListener('click', () => this.showLogical());
        this.$('#theodicy-btn').addEventListener('click', () => this.showTheodicy());
    }

    showLogical() {
        this.$('#omni').classList.add('conflict');
        this.$('#omnis').classList.add('conflict');
        this.$('#good').classList.add('conflict');
        this.$('#analysis').innerHTML = `
            <p><strong>If God is omnipotent:</strong> He CAN eliminate evil</p>
            <p><strong>If God is omniscient:</strong> He KNOWS about all evil</p>
            <p><strong>If God is all-good:</strong> He WANTS to eliminate evil</p>
            <p style="color: #ef4444; font-weight: bold;">→ Evil should not exist. But it does!</p>
            <p><strong>Therefore:</strong> God lacks at least one attribute, or doesn't exist.</p>
        `;
        this.$('#result').innerHTML = '<p style="color: #ef4444;">The logical problem: these premises seem mutually inconsistent with the existence of evil.</p>';
    }

    showTheodicy() {
        this.$('#omni').className = 'attr active';
        this.$('#omnis').className = 'attr active';
        this.$('#good').className = 'attr active';
        this.$('#analysis').innerHTML = `
            <p><strong>Free Will Defense:</strong> Evil results from free choices. A world with free will and evil may be better than one without either.</p>
            <p><strong>Soul-Making:</strong> Suffering enables growth, virtue, and character that couldn't exist otherwise.</p>
            <p><strong>Greater Good:</strong> Some evils are necessary for greater goods we may not understand.</p>
            <p><strong>Skeptical Theism:</strong> We can't expect to understand God's reasons. Absence of apparent reason ≠ absence of reason.</p>
        `;
        this.$('#result').innerHTML = '<p>Philosophers debate whether any theodicy fully succeeds. The evidential problem of evil (from the amount and distribution of suffering) remains challenging.</p>';
    }
}

customElements.define('evil-simulator', EvilSimulator);
export { EvilSimulator };
