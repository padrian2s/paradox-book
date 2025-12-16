/**
 * Lottery Paradox Simulator
 */
import { SimulatorBase } from '../simulator-base.js';

class LotterySimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}
                .tickets { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.5rem; margin: 1rem 0; }
                .ticket { background: var(--card); padding: 0.5rem; border-radius: 0.25rem; text-align: center; font-size: 0.8rem; }
                .ticket.winner { background: var(--accent); color: var(--bg); }
                .belief-box { background: var(--bg); padding: 1rem; border-radius: 0.5rem; margin: 0.5rem 0; }
                .belief-box.conflict { border: 2px solid #ef4444; }
            </style>
            <h4>Lottery with 1000 Tickets</h4>
            <div class="tickets" id="tickets"></div>
            <div class="controls">
                <button id="individual-btn">Belief About Each Ticket</button>
                <button id="collective-btn">Belief About All Tickets</button>
            </div>
            <div id="beliefs"></div>
            <div class="result" id="result"><p>One ticket will win. Is it rational to believe of each ticket that it will lose?</p></div>
            <div class="insight">The paradox: For each ticket, it's 99.9% likely to lose, so believing it loses is rational. But believing ALL lose contradicts knowing one wins. Rational individual beliefs create an irrational collective belief!</div>
        `;
    }

    setupEventListeners() {
        this.renderTickets();
        this.$('#individual-btn').addEventListener('click', () => this.showIndividual());
        this.$('#collective-btn').addEventListener('click', () => this.showCollective());
    }

    renderTickets() {
        let html = '';
        for (let i = 1; i <= 20; i++) {
            html += `<div class="ticket">#${i}</div>`;
        }
        html += `<div class="ticket">...</div>`;
        html += `<div class="ticket">#999</div>`;
        html += `<div class="ticket winner">#1000 (Winner)</div>`;
        this.$('#tickets').innerHTML = html;
    }

    showIndividual() {
        this.$('#beliefs').innerHTML = `
            <div class="belief-box">
                <p><strong>For ticket #1:</strong> P(lose) = 99.9% → Rational to believe it loses</p>
                <p><strong>For ticket #2:</strong> P(lose) = 99.9% → Rational to believe it loses</p>
                <p><strong>For ticket #n:</strong> P(lose) = 99.9% → Rational to believe it loses</p>
                <p style="color: #22c55e;">Each individual belief is well-justified!</p>
            </div>
        `;
        this.$('#result').innerHTML = `<p>Each belief is rational given the 0.1% chance of winning. We have 1000 justified beliefs.</p>`;
    }

    showCollective() {
        this.$('#beliefs').innerHTML = `
            <div class="belief-box conflict">
                <p><strong>Belief 1:</strong> Ticket #1 will lose ✓</p>
                <p><strong>Belief 2:</strong> Ticket #2 will lose ✓</p>
                <p><strong>...</strong></p>
                <p><strong>Belief 1000:</strong> Ticket #1000 will lose ✓</p>
                <p><strong>Combined:</strong> ALL tickets will lose ✗</p>
                <p style="color: #ef4444;">But we KNOW one ticket wins!</p>
            </div>
        `;
        this.$('#result').innerHTML = `<p style="color: #ef4444;"><strong>Paradox!</strong> Each belief is rational, but their conjunction is irrational. Rational closure fails!</p>`;
    }
}

customElements.define('lottery-simulator', LotterySimulator);
export { LotterySimulator };
