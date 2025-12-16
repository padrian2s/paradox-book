import { SimulatorBase } from '../simulator-base.js';

class IrresistibleForceSimulator extends SimulatorBase {
    constructor() {
        super();
        this.collisionState = 'ready';
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .arena {
                    height: 150px;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    position: relative;
                    margin: 1rem 0;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .force {
                    position: absolute;
                    left: 20px;
                    width: 60px;
                    height: 60px;
                    background: linear-gradient(135deg, #ef4444, #dc2626);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    transition: left 1s ease-in-out;
                    box-shadow: 0 0 20px rgba(239, 68, 68, 0.5);
                }

                .force.moving {
                    left: calc(50% - 60px);
                }

                .object {
                    position: absolute;
                    right: calc(50% - 60px);
                    width: 60px;
                    height: 60px;
                    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                    border-radius: 0.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
                }

                .collision-effect {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    width: 0;
                    height: 0;
                    background: radial-gradient(circle, #fbbf24, transparent);
                    border-radius: 50%;
                    opacity: 0;
                    transition: all 0.5s ease-out;
                }

                .collision-effect.active {
                    width: 200px;
                    height: 200px;
                    opacity: 0.8;
                }

                .labels {
                    display: flex;
                    justify-content: space-between;
                    padding: 0 20px;
                    margin-bottom: 0.5rem;
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                }

                .scenario-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .scenario-card {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    transition: all 0.2s;
                    border: 2px solid transparent;
                }

                .scenario-card:hover {
                    border-color: var(--primary, #6366f1);
                }

                .scenario-card.active {
                    border-color: var(--accent, #f59e0b);
                }

                .scenario-title {
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                    color: var(--text, #e2e8f0);
                }

                .scenario-desc {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                }
            </style>

            <h4>Collision Simulator</h4>

            <div class="labels">
                <span>Unstoppable Force</span>
                <span>Immovable Object</span>
            </div>

            <div class="arena">
                <div class="force" id="force">&#x1F4A5;</div>
                <div class="object" id="object">&#x1F9F1;</div>
                <div class="collision-effect" id="collision"></div>
            </div>

            <div class="controls">
                <button id="collide-btn">Collide!</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="result" id="result">
                <p>What happens when an unstoppable force meets an immovable object?</p>
            </div>

            <div class="scenario-grid">
                <div class="scenario-card" id="scenario-logical" data-scenario="logical">
                    <div class="scenario-title">Logical Resolution</div>
                    <div class="scenario-desc">They cannot coexist. If one exists, the other cannot by definition.</div>
                </div>
                <div class="scenario-card" id="scenario-pass" data-scenario="pass">
                    <div class="scenario-title">Pass Through</div>
                    <div class="scenario-desc">The force passes through the object without interaction.</div>
                </div>
                <div class="scenario-card" id="scenario-annihilation" data-scenario="annihilation">
                    <div class="scenario-title">Mutual Annihilation</div>
                    <div class="scenario-desc">Both concepts cancel each other out.</div>
                </div>
            </div>

            <div class="insight">
                The paradox is linguistic, not physical. An "unstoppable force" and "immovable object" are mutually exclusive by definition. In a universe with one, the other cannot exist. The question itself is meaningless in physical terms.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#collide-btn').addEventListener('click', () => this.collide());
        this.$('#reset-btn').addEventListener('click', () => this.reset());

        this.$$('.scenario-card').forEach(card => {
            card.addEventListener('click', (e) => this.selectScenario(e.currentTarget.dataset.scenario));
        });
    }

    collide() {
        if (this.collisionState !== 'ready') return;
        this.collisionState = 'colliding';

        const force = this.$('#force');
        const collision = this.$('#collision');

        force.classList.add('moving');

        setTimeout(() => {
            collision.classList.add('active');

            this.$('#result').innerHTML = `
                <p style="color: var(--accent);"><strong>PARADOX!</strong></p>
                <p>The scenario is self-contradictory. In a universe where an unstoppable force exists, nothing can be truly immovable. In a universe with an immovable object, nothing can be truly unstoppable.</p>
            `;
        }, 1000);
    }

    selectScenario(scenario) {
        this.$$('.scenario-card').forEach(card => card.classList.remove('active'));
        this.$(`#scenario-${scenario}`).classList.add('active');

        const explanations = {
            logical: `<p><strong>Logical Resolution:</strong> The two concepts are mutually exclusive absolutes. If an unstoppable force exists, then by definition no object can be immovable. If an immovable object exists, then no force can be unstoppable. The paradox reveals a flaw in our language, not physics.</p>`,
            pass: `<p><strong>Pass Through:</strong> Some suggest the force could pass through the object like a neutrino through matter - no collision occurs. But this means the object wasn't truly "in the way" to begin with.</p>`,
            annihilation: `<p><strong>Mutual Annihilation:</strong> Perhaps both would be converted to energy, as neither property (unstoppability or immovability) can be preserved while the other exists.</p>`
        };

        this.$('#result').innerHTML = explanations[scenario];
    }

    reset() {
        this.collisionState = 'ready';
        const force = this.$('#force');
        const collision = this.$('#collision');

        force.classList.remove('moving');
        collision.classList.remove('active');

        this.$$('.scenario-card').forEach(card => card.classList.remove('active'));

        this.$('#result').innerHTML = `<p>What happens when an unstoppable force meets an immovable object?</p>`;
    }
}

customElements.define('irresistible-force-simulator', IrresistibleForceSimulator);

export { IrresistibleForceSimulator };
