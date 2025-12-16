/**
 * Static Site Paradox Simulator
 * Static sites are "simpler" but often require more complex tooling than dynamic sites
 */
import { SimulatorBase } from '../simulator-base.js';

class StaticSiteSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .stack-display {
                    font-family: monospace;
                    font-size: 0.85rem;
                    background: var(--bg, #0f172a);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    min-height: 120px;
                    white-space: pre-wrap;
                    color: var(--text, #e2e8f0);
                    margin-top: 1rem;
                    line-height: 1.5;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .stat-box {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .stat-value {
                    font-size: 1.75rem;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                }

                .stat-value.simple {
                    color: #22c55e;
                }

                .stat-value.complex {
                    color: #ef4444;
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                .button-group {
                    display: flex;
                    gap: 0.5rem;
                }

                .button-group button.active {
                    background: var(--accent, #f59e0b);
                }

                @media (max-width: 600px) {
                    .button-group {
                        flex-direction: column;
                    }
                }
            </style>

            <h4>Complexity Comparison</h4>

            <div class="controls">
                <div class="button-group">
                    <button id="dynamic-btn">Dynamic Site</button>
                    <button id="static-btn">Static Site</button>
                </div>
            </div>

            <div class="stack-display" id="stack-display">
                Select a site type to see the tech stack...
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="deps-count">?</div>
                    <div class="stat-label">Dependencies</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="build-steps">?</div>
                    <div class="stat-label">Build Steps</div>
                </div>
            </div>

            <div class="result" id="result">
                <p>Which approach is actually "simpler"?</p>
            </div>

            <div class="insight">
                The paradox: tools meant to simplify often add layers of complexity. Sometimes the "old way" really was simpler.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#dynamic-btn').addEventListener('click', () => this.showStack('dynamic'));
        this.$('#static-btn').addEventListener('click', () => this.showStack('static'));
    }

    showStack(type) {
        const stacks = {
            dynamic: {
                deps: 3,
                build: 1,
                stack: `PHP/WordPress
└── Apache
    └── MySQL

Deploy: FTP upload`,
                result: `<p style="color: #22c55e;"><strong>Dynamic Site:</strong> 3 dependencies, 1 build step (none really).</p>
                <p>Upload files, done. Database included. Editing in production!</p>`
            },
            static: {
                deps: 847,
                build: 6,
                stack: `React + Gatsby
├── Node.js (v18+)
├── npm (847 packages)
│   ├── webpack
│   ├── babel
│   ├── postcss
│   ├── eslint
│   └── ...842 more
├── GraphQL
├── Sharp (image processing)
└── 12 Gatsby plugins

Deploy:
1. npm install (2 min)
2. npm run build (5 min)
3. CI/CD pipeline
4. CDN invalidation
5. DNS propagation
6. Hope nothing broke`,
                result: `<p style="color: #ef4444;"><strong>Static Site:</strong> 847 dependencies, 6+ build steps!</p>
                <p>But hey, it's "just static HTML" at the end...</p>`
            }
        };

        const data = stacks[type];

        this.$('#stack-display').textContent = data.stack;
        this.$('#deps-count').textContent = data.deps;
        this.$('#deps-count').className = 'stat-value ' + (type === 'dynamic' ? 'simple' : 'complex');
        this.$('#build-steps').textContent = data.build;
        this.$('#build-steps').className = 'stat-value ' + (type === 'dynamic' ? 'simple' : 'complex');
        this.$('#result').innerHTML = data.result;

        this.$('#dynamic-btn').classList.toggle('active', type === 'dynamic');
        this.$('#static-btn').classList.toggle('active', type === 'static');
    }
}

customElements.define('static-site-simulator', StaticSiteSimulator);

export { StaticSiteSimulator };
