/**
 * Free Will Paradox Simulator
 */
import { SimulatorBase } from '../simulator-base.js';

class FreewillSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}
                .timeline { display: flex; align-items: center; justify-content: space-between; background: var(--bg); padding: 1rem; border-radius: 0.5rem; margin: 1rem 0; }
                .moment { text-align: center; padding: 0.5rem; }
                .moment.past { color: var(--muted); }
                .moment.present { color: var(--accent); font-weight: bold; }
                .moment.future { color: #22c55e; }
                .premise { background: var(--card); padding: 0.75rem; margin: 0.25rem 0; border-radius: 0.25rem; }
            </style>
            <h4>Divine Foreknowledge vs Free Will</h4>
            <div class="timeline">
                <div class="moment past">Eternity Past<br>God knows X</div>
                <div>→→→</div>
                <div class="moment present">Now<br>You choose?</div>
                <div>→→→</div>
                <div class="moment future">Future<br>X happens</div>
            </div>
            <div class="controls">
                <button id="argument-btn">The Argument</button>
                <button id="responses-btn">Responses</button>
            </div>
            <div id="analysis"></div>
            <div class="result" id="result"><p>If God already knows what you'll choose, is your choice really free?</p></div>
            <div class="insight">This is one of the oldest problems in philosophy of religion. Solutions include: God is outside time, foreknowledge doesn't cause events, or free will is compatible with determination.</div>
        `;
    }

    setupEventListeners() {
        this.$('#argument-btn').addEventListener('click', () => this.showArgument());
        this.$('#responses-btn').addEventListener('click', () => this.showResponses());
    }

    showArgument() {
        this.$('#analysis').innerHTML = `
            <div class="premise">1. God knows everything that will happen (omniscience)</div>
            <div class="premise">2. Yesterday, God knew you would choose X today</div>
            <div class="premise">3. God's knowledge cannot be wrong (infallibility)</div>
            <div class="premise">4. Therefore, you MUST choose X today</div>
            <div class="premise">5. If you must choose X, you couldn't choose otherwise</div>
            <div class="premise" style="border-left: 4px solid #ef4444;">6. Therefore, you don't have free will</div>
        `;
        this.$('#result').innerHTML = '<p style="color: #ef4444;">If God\'s past knowledge is fixed and infallible, the future seems equally fixed. Where is freedom?</p>';
    }

    showResponses() {
        this.$('#analysis').innerHTML = `
            <div class="premise" style="border-left: 4px solid #22c55e;">
                <strong>Boethian Solution:</strong> God is outside time. He doesn't "fore-know" but sees all time at once. His seeing doesn't cause your choice.
            </div>
            <div class="premise" style="border-left: 4px solid #3b82f6;">
                <strong>Molinist Solution:</strong> God has "middle knowledge" - He knows what you WOULD freely choose in any circumstance.
            </div>
            <div class="premise" style="border-left: 4px solid var(--accent);">
                <strong>Ockhamist Solution:</strong> God's past knowledge depends on your future choice, not vice versa. The future determines the past belief.
            </div>
            <div class="premise" style="border-left: 4px solid #8b5cf6;">
                <strong>Open Theism:</strong> God doesn't know future free choices because they're not yet determined.
            </div>
        `;
        this.$('#result').innerHTML = '<p>Each solution has trade-offs. The debate continues in philosophy of religion!</p>';
    }
}

customElements.define('freewill-simulator', FreewillSimulator);
export { FreewillSimulator };
