/**
 * Paradox of Voting Simulator
 */
import { SimulatorBase } from '../simulator-base.js';

class VotingParadoxSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}
                .calc { background: var(--card); padding: 1rem; border-radius: 0.5rem; margin: 0.5rem 0; }
                .equation { font-family: monospace; font-size: 1.1rem; }
            </style>
            <h4>Why Vote At All?</h4>
            <div class="calc">
                <p><strong>Expected benefit of voting:</strong></p>
                <p class="equation">E = P(decisive) × B - C</p>
                <p>P(decisive) = probability YOUR vote decides the election</p>
                <p>B = benefit if your candidate wins</p>
                <p>C = cost of voting (time, effort)</p>
            </div>
            <div class="controls">
                <button id="calc-btn">Calculate for US Election</button>
                <button id="why-btn">So Why Do We Vote?</button>
            </div>
            <div class="result" id="result"><p>Is it rational to spend time voting?</p></div>
            <div class="insight">This is sometimes called the Downs Paradox. Economists struggle to explain voting since individually it seems irrational. Yet democracy depends on people voting! The resolution may involve civic duty, expressive value, or social pressure.</div>
        `;
    }
    setupEventListeners() {
        this.$('#calc-btn').addEventListener('click', () => {
            this.$('#result').innerHTML = `<p><strong>US Presidential Election:</strong></p><p>P(decisive) ≈ 1 in 10 million (generous estimate)</p><p>B = $10,000 (value of preferred policies to you)</p><p>C = $20 (hour of your time)</p><p class="equation">E = (1/10,000,000) × $10,000 - $20</p><p class="equation">E = $0.001 - $20 = <strong>-$19.999</strong></p><p style="color:#ef4444">Expected value is deeply negative! Voting is "irrational."</p>`;
        });
        this.$('#why-btn').addEventListener('click', () => {
            this.$('#result').innerHTML = `<p><strong>Why people vote anyway:</strong></p><p>• <strong>Civic duty:</strong> Voting is intrinsically valuable</p><p>• <strong>Expressive:</strong> It feels good to participate</p><p>• <strong>Social:</strong> Others expect you to vote</p><p>• <strong>Group rationality:</strong> "If everyone thought like that..."</p><p>• <strong>Minimax regret:</strong> Avoiding "I could have made the difference"</p><p>The paradox shows rational choice theory has limits!</p>`;
        });
    }
}
customElements.define('voting-paradox-simulator', VotingParadoxSimulator);
export { VotingParadoxSimulator };
