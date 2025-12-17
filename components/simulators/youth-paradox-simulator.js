import { SimulatorBase } from '../simulator-base.js';

class YouthParadoxSimulator extends SimulatorBase {
    constructor() {
        super();
        this.viewMode = 'overview';
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .galaxy-view {
                    background: radial-gradient(ellipse at center,
                        rgba(251, 191, 36, 0.3) 0%,
                        rgba(251, 191, 36, 0.1) 20%,
                        #000 60%);
                    border-radius: 0.5rem;
                    padding: 2rem;
                    margin: 1rem 0;
                    position: relative;
                    height: 220px;
                    overflow: hidden;
                }

                .galactic-center {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    width: 40px;
                    height: 40px;
                    background: radial-gradient(circle, #fbbf24, #b45309);
                    border-radius: 50%;
                    box-shadow: 0 0 50px rgba(251, 191, 36, 0.8);
                    z-index: 2;
                }

                .black-hole-label {
                    position: absolute;
                    left: 50%;
                    top: calc(50% + 35px);
                    transform: translateX(-50%);
                    font-size: 0.7rem;
                    color: var(--muted, #94a3b8);
                    white-space: nowrap;
                }

                .young-stars {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    width: 120px;
                    height: 120px;
                }

                .young-star {
                    position: absolute;
                    width: 8px;
                    height: 8px;
                    background: #60a5fa;
                    border-radius: 50%;
                    box-shadow: 0 0 10px #60a5fa;
                }

                .forbidden-zone {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    width: 150px;
                    height: 150px;
                    border: 2px dashed rgba(239, 68, 68, 0.5);
                    border-radius: 50%;
                }

                .zone-label {
                    position: absolute;
                    bottom: 10px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(239, 68, 68, 0.2);
                    padding: 0.25rem 0.5rem;
                    border-radius: 0.25rem;
                    font-size: 0.7rem;
                    color: #ef4444;
                    white-space: nowrap;
                }

                .tidal-forces {
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                }

                .tidal-arrow {
                    position: absolute;
                    color: #ef4444;
                    font-size: 1.5rem;
                    opacity: 0.6;
                }

                .info-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .info-card {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .info-value {
                    font-size: 1.25rem;
                    font-weight: bold;
                }

                .info-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }

                .theory-tabs {
                    display: flex;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                    margin-top: 1rem;
                }

                .theory-tabs button {
                    flex: 1;
                    min-width: 100px;
                    font-size: 0.8rem;
                    padding: 0.5rem;
                }

                .theory-tabs button.active {
                    background: var(--accent, #f59e0b);
                }
            </style>

            <h4>Galactic Center Stars</h4>
            <p style="color: var(--muted); margin-bottom: 1rem;">Young stars orbit within light-hours of the supermassive black hole - where no stars should form.</p>

            <div class="galaxy-view">
                <div class="forbidden-zone">
                    <span class="zone-label">Tidal Disruption Zone</span>
                </div>
                <div class="galactic-center"></div>
                <div class="black-hole-label">Sagittarius A* (4M solar masses)</div>
                <div class="young-stars" id="stars">
                    <div class="young-star" style="top: 20%; left: 30%;"></div>
                    <div class="young-star" style="top: 40%; left: 70%;"></div>
                    <div class="young-star" style="top: 60%; left: 25%;"></div>
                    <div class="young-star" style="top: 75%; left: 65%;"></div>
                    <div class="young-star" style="top: 35%; left: 50%;"></div>
                </div>
                <div class="tidal-forces" id="tidal">
                    <span class="tidal-arrow" style="top: 30%; left: 25%;">&#x2190;</span>
                    <span class="tidal-arrow" style="top: 30%; right: 25%;">&#x2192;</span>
                    <span class="tidal-arrow" style="bottom: 30%; left: 25%;">&#x2190;</span>
                    <span class="tidal-arrow" style="bottom: 30%; right: 25%;">&#x2192;</span>
                </div>
            </div>

            <div class="info-grid">
                <div class="info-card">
                    <div class="info-value" style="color: #60a5fa;">~100</div>
                    <div class="info-label">Young Stars Found</div>
                </div>
                <div class="info-card">
                    <div class="info-value" style="color: var(--accent);">6-10 Myr</div>
                    <div class="info-label">Star Ages</div>
                </div>
                <div class="info-card">
                    <div class="info-value" style="color: #ef4444;">~0.01 pc</div>
                    <div class="info-label">Distance to Sgr A*</div>
                </div>
                <div class="info-card">
                    <div class="info-value" style="color: var(--primary);">Impossible?</div>
                    <div class="info-label">In-situ Formation</div>
                </div>
            </div>

            <div class="theory-tabs">
                <button id="theory-problem" class="active">The Problem</button>
                <button id="theory-disk">Disk Migration</button>
                <button id="theory-cluster">Cluster Inspiral</button>
                <button id="theory-insitu">In-situ Formation</button>
            </div>

            <div class="result" id="result">
                <p><strong>The Paradox:</strong> Star formation requires gas clouds to collapse under gravity. But near a supermassive black hole, tidal forces are so strong they should rip apart any gas cloud before it can collapse into a star.</p>
                <p>Yet we observe young, massive stars (the "S-stars") orbiting just light-hours from Sagittarius A*!</p>
            </div>

            <div class="insight">
                These stars can't have formed where we see them, and they're too young to have migrated from far away. The leading theories involve accretion disk instabilities or inspiraling star clusters - but none fully explain all observations.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#theory-problem').addEventListener('click', () => this.showTheory('problem'));
        this.$('#theory-disk').addEventListener('click', () => this.showTheory('disk'));
        this.$('#theory-cluster').addEventListener('click', () => this.showTheory('cluster'));
        this.$('#theory-insitu').addEventListener('click', () => this.showTheory('insitu'));
    }

    showTheory(theory) {
        this.$$('.theory-tabs button').forEach(btn => btn.classList.remove('active'));
        this.$(`#theory-${theory}`).classList.add('active');

        const explanations = {
            problem: `
                <p><strong>The Paradox:</strong> Star formation requires gas clouds to collapse under gravity. But near a supermassive black hole, tidal forces are so strong they should rip apart any gas cloud before it can collapse into a star.</p>
                <p>Yet we observe young, massive stars (the "S-stars") orbiting just light-hours from Sagittarius A*!</p>
            `,
            disk: `
                <p><strong>Disk Migration Theory:</strong></p>
                <p>Stars formed in a massive accretion disk around Sgr A* and migrated inward. The disk would need to be dense enough to fragment and form stars despite tidal forces.</p>
                <p>Problem: Explains the disk-like orbits of some stars, but not the randomly-oriented S-stars.</p>
            `,
            cluster: `
                <p><strong>Cluster Inspiral Theory:</strong></p>
                <p>A dense star cluster formed farther out and spiraled inward due to dynamical friction. The cluster was tidally disrupted, depositing young stars near the black hole.</p>
                <p>Problem: Requires a very massive cluster that should have left other observable traces.</p>
            `,
            insitu: `
                <p><strong>In-situ Formation:</strong></p>
                <p>Perhaps our understanding of star formation is incomplete. Under extreme conditions (high density, strong magnetic fields), stars might form even in hostile tidal environments.</p>
                <p>This challenges fundamental assumptions about how gas clouds collapse into stars.</p>
            `
        };

        this.$('#result').innerHTML = explanations[theory];
    }
}

customElements.define('youth-paradox-simulator', YouthParadoxSimulator);

export { YouthParadoxSimulator };
