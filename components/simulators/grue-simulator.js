/**
 * Goodman's Grue Paradox Simulator
 */
import { SimulatorBase } from '../simulator-base.js';

class GrueSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}
                .emeralds { display: flex; gap: 1rem; justify-content: center; margin: 1rem 0; flex-wrap: wrap; }
                .emerald { width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
                .emerald.green { background: #22c55e; }
                .emerald.blue { background: #3b82f6; }
                .emerald.grue { background: linear-gradient(135deg, #22c55e 50%, #3b82f6 50%); }
                .definition { background: var(--card); padding: 1rem; border-radius: 0.5rem; margin: 0.5rem 0; }
                .timeline { display: flex; justify-content: space-between; background: var(--bg); padding: 1rem; border-radius: 0.5rem; margin: 1rem 0; }
            </style>
            <h4>Green vs Grue</h4>
            <div class="emeralds" id="emeralds">
                <div class="emerald green">diamond</div>
                <div class="emerald green">diamond</div>
                <div class="emerald green">diamond</div>
                <div class="emerald green">diamond</div>
                <div class="emerald green">diamond</div>
            </div>
            <div class="definition">
                <strong>GREEN:</strong> Reflects light at ~520nm wavelength
            </div>
            <div class="definition" style="border-left: 4px solid var(--accent);">
                <strong>GRUE:</strong> GREEN if examined before year 2100, BLUE if examined after
            </div>
            <div class="timeline">
                <div>Past observations<br><small>All green (and grue!)</small></div>
                <div style="color: var(--accent);">→ 2100 →</div>
                <div>Future predictions<br><small>Green? Or blue?</small></div>
            </div>
            <div class="controls">
                <button id="evidence-btn">The Evidence</button>
                <button id="paradox-btn">The Paradox</button>
            </div>
            <div class="result" id="result"><p>Every emerald we've observed has been green. What color will future emeralds be?</p></div>
            <div class="insight">Goodman's paradox challenges the idea that induction is straightforward. Why do we project "green" into the future but not "grue"? What makes some predicates "projectible" and others not?</div>
        `;
    }

    setupEventListeners() {
        this.$('#evidence-btn').addEventListener('click', () => this.showEvidence());
        this.$('#paradox-btn').addEventListener('click', () => this.showParadox());
    }

    showEvidence() {
        this.$('#result').innerHTML = `
            <p><strong>Our evidence (all observed before 2100):</strong></p>
            <p>Emerald 1: Green ✓ (also GRUE ✓)</p>
            <p>Emerald 2: Green ✓ (also GRUE ✓)</p>
            <p>Emerald 3: Green ✓ (also GRUE ✓)</p>
            <p>...</p>
            <p>Every observed emerald is BOTH green AND grue!</p>
            <p style="color: #22c55e;">The evidence equally supports both hypotheses.</p>
        `;
    }

    showParadox() {
        this.$('#emeralds').innerHTML = `
            <div class="emerald green">diamond</div>
            <div class="emerald green">diamond</div>
            <div class="emerald green">diamond</div>
            <div class="emerald grue">?</div>
            <div class="emerald grue">?</div>
        `;
        this.$('#result').innerHTML = `
            <p><strong>Two competing predictions:</strong></p>
            <p style="color: #22c55e;"><strong>H1 (green):</strong> Future emeralds will be green</p>
            <p style="color: #3b82f6;"><strong>H2 (grue):</strong> Future emeralds will be blue (since examined after 2100)</p>
            <p style="margin-top: 1rem;"><strong>The paradox:</strong></p>
            <p>Both hypotheses are equally supported by ALL past evidence!</p>
            <p>Why do we confidently predict green rather than blue?</p>
            <p style="color: #ef4444;">Our preference for "green" over "grue" can't be justified by evidence alone.</p>
            <p>There must be something ELSE that makes "green" a better predicate for induction.</p>
        `;
    }
}

customElements.define('grue-simulator', GrueSimulator);
export { GrueSimulator };
