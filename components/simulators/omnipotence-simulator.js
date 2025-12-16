/**
 * Omnipotence Paradox Simulator
 */
import { SimulatorBase } from '../simulator-base.js';

class OmnipotenceSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}
                .question { background: var(--bg); padding: 1.5rem; border-radius: 0.5rem; text-align: center; font-size: 1.2rem; margin: 1rem 0; }
                .answer-box { background: var(--card); padding: 1rem; border-radius: 0.5rem; margin: 0.5rem 0; }
                .answer-box.problem { border-left: 4px solid #ef4444; }
                .rock { font-size: 3rem; text-align: center; margin: 1rem 0; }
            </style>
            <h4>The Paradox of the Stone</h4>
            <div class="question">Can God create a stone so heavy that even He cannot lift it?</div>
            <div class="rock">stone</div>
            <div class="controls">
                <button id="yes-btn">Yes, He Can</button>
                <button id="no-btn">No, He Cannot</button>
                <button id="resolve-btn">Resolutions</button>
            </div>
            <div id="analysis"></div>
            <div class="result" id="result"><p>Either answer seems to limit omnipotence...</p></div>
            <div class="insight">This paradox has generated rich theological and philosophical debate. Most resolutions argue that omnipotence means "able to do all logically possible things" - and self-contradictory tasks aren't truly "things."</div>
        `;
    }

    setupEventListeners() {
        this.$('#yes-btn').addEventListener('click', () => this.analyze('yes'));
        this.$('#no-btn').addEventListener('click', () => this.analyze('no'));
        this.$('#resolve-btn').addEventListener('click', () => this.analyze('resolve'));
    }

    analyze(mode) {
        const analysis = this.$('#analysis');
        if (mode === 'yes') {
            analysis.innerHTML = `
                <div class="answer-box problem">
                    <h5>If YES (God can create such a stone):</h5>
                    <p>Then the stone exists</p>
                    <p>God cannot lift this stone</p>
                    <p style="color: #ef4444;"><strong>God is NOT omnipotent</strong> (can't lift something)</p>
                </div>
            `;
            this.$('#result').innerHTML = '<p style="color: #ef4444;">Creating the stone limits God\'s power to lift. Omnipotence is compromised!</p>';
        } else if (mode === 'no') {
            analysis.innerHTML = `
                <div class="answer-box problem">
                    <h5>If NO (God cannot create such a stone):</h5>
                    <p>There's something God cannot do</p>
                    <p>Namely: create this particular stone</p>
                    <p style="color: #ef4444;"><strong>God is NOT omnipotent</strong> (can't create something)</p>
                </div>
            `;
            this.$('#result').innerHTML = '<p style="color: #ef4444;">Inability to create limits God\'s power. Omnipotence is compromised!</p>';
        } else {
            analysis.innerHTML = `
                <div class="answer-box" style="border-left: 4px solid #22c55e;">
                    <h5>Philosophical Resolutions:</h5>
                    <p><strong>1. Logical Limits:</strong> Omnipotence = doing all <em>logically possible</em> things. "Stone God can't lift" is logically incoherent for an omnipotent being.</p>
                    <p><strong>2. Temporal Solution:</strong> God can create the stone AND then lift it by choosing to limit and unlimit His power.</p>
                    <p><strong>3. Rejection:</strong> The question is meaningless, like "Can God create a married bachelor?"</p>
                    <p><strong>4. Yes, Both:</strong> Some say God can do even the logically impossible—human logic doesn't constrain God.</p>
                </div>
            `;
            this.$('#result').innerHTML = '<p>Most philosophers argue the paradox rests on a confused notion of omnipotence. True omnipotence doesn\'t require doing the logically impossible.</p>';
        }
    }
}

customElements.define('omnipotence-simulator', OmnipotenceSimulator);
export { OmnipotenceSimulator };
