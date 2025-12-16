/**
 * Yablo's Paradox Simulator
 */
import { SimulatorBase } from '../simulator-base.js';

class YabloSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}
                .sequence { background: var(--bg); padding: 1rem; border-radius: 0.5rem; margin: 1rem 0; max-height: 250px; overflow-y: auto; }
                .sent { padding: 0.5rem; margin: 0.25rem 0; background: var(--card); border-radius: 0.25rem; font-family: monospace; }
                .sent.highlight { border-left: 4px solid var(--accent); }
                .sent.false { border-left: 4px solid #ef4444; opacity: 0.7; }
            </style>
            <h4>The Infinite Sequence</h4>
            <div class="sequence" id="sequence"></div>
            <div class="controls">
                <button id="assume-btn">Assume S1 is TRUE</button>
                <button id="trace-btn">Trace the Logic</button>
                <button id="reset-btn">Reset</button>
            </div>
            <div class="result" id="result"><p>Each sentence says ALL following sentences are false. No sentence refers to itself!</p></div>
            <div class="insight">Yablo's paradox is remarkable: it creates a paradox without any self-reference or circularity. Each sentence only talks about sentences that come AFTER it. Yet together they're inconsistent. This challenges the idea that self-reference is the root of semantic paradoxes.</div>
        `;
    }

    setupEventListeners() {
        this.renderSequence();
        this.$('#assume-btn').addEventListener('click', () => this.assume());
        this.$('#trace-btn').addEventListener('click', () => this.trace());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
    }

    renderSequence() {
        let html = '';
        for (let i = 1; i <= 8; i++) {
            html += `<div class="sent" id="s${i}">S${i}: "All sentences after S${i} are false"</div>`;
        }
        html += '<div class="sent">S9: "All sentences after S9 are false"</div>';
        html += '<div class="sent">... (infinite)</div>';
        this.$('#sequence').innerHTML = html;
    }

    assume() {
        this.$('#s1').classList.add('highlight');
        this.$('#result').innerHTML = `
            <p><strong>Assume S1 is TRUE.</strong></p>
            <p>S1 says: "All of S2, S3, S4, ... are FALSE"</p>
            <p>So S2 is false, S3 is false, S4 is false, ...</p>
            <p>Now look at S2 (which is false)...</p>
        `;
    }

    trace() {
        for (let i = 2; i <= 8; i++) {
            this.$(`#s${i}`).classList.add('false');
        }
        this.$('#result').innerHTML = `
            <p><strong>If S1 is TRUE, then S2 is FALSE.</strong></p>
            <p>S2 says: "All sentences after S2 are false"</p>
            <p>S2 is false, so NOT all sentences after S2 are false</p>
            <p>So at least one of S3, S4, S5, ... is TRUE</p>
            <p style="color: #ef4444;"><strong>But S1 said ALL of them are false!</strong></p>
            <p style="color: #ef4444;">Contradiction! S1 cannot be true.</p>
            <p>By similar reasoning, NO sentence can be true.</p>
            <p>But if all are false, S1 is false, so some after it is true...</p>
            <p style="color: #ef4444;"><strong>PARADOX with no self-reference!</strong></p>
        `;
    }

    reset() {
        this.renderSequence();
        this.$('#result').innerHTML = '<p>Each sentence says ALL following sentences are false. No sentence refers to itself!</p>';
    }
}

customElements.define('yablo-simulator', YabloSimulator);
export { YabloSimulator };
