/**
 * ParadoxCard Web Component
 * A reusable card component for displaying paradoxes with their simulators
 */
class ParadoxCard extends HTMLElement {
    static get observedAttributes() {
        return ['title', 'points', 'description', 'category'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    get title() {
        return this.getAttribute('title') || 'Untitled Paradox';
    }

    get points() {
        return this.getAttribute('points') || '0';
    }

    get description() {
        return this.getAttribute('description') || '';
    }

    get category() {
        return this.getAttribute('category') || '';
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    margin-bottom: 2rem;
                }

                .paradox-card {
                    background: var(--card, #1e293b);
                    border-radius: 1rem;
                    padding: 1.5rem;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
                }

                .header {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                    margin-bottom: 0.5rem;
                }

                h3 {
                    color: var(--primary, #6366f1);
                    font-size: 1.25rem;
                    margin: 0;
                }

                .points {
                    background: var(--accent, #f59e0b);
                    color: var(--bg, #0f172a);
                    font-size: 0.75rem;
                    padding: 0.25rem 0.5rem;
                    border-radius: 9999px;
                    font-weight: bold;
                }

                .description {
                    color: var(--muted, #94a3b8);
                    margin-bottom: 1rem;
                    line-height: 1.5;
                }

                .simulator-container {
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    padding: 1.5rem;
                    margin-top: 1rem;
                }

                ::slotted([slot="simulator-title"]) {
                    color: var(--secondary, #8b5cf6);
                    margin-bottom: 1rem;
                    font-size: 1.1rem;
                }

                /* Mobile styles */
                @media (max-width: 768px) {
                    .paradox-card {
                        padding: 0.5rem;
                        margin-bottom: 0.75rem;
                        border-radius: 0.5rem;
                    }

                    h3 {
                        font-size: 1rem;
                    }

                    .description {
                        font-size: 0.875rem;
                    }

                    .simulator-container {
                        padding: 0.5rem;
                    }
                }

                @media (max-width: 480px) {
                    h3 {
                        font-size: 0.95rem;
                    }
                }
            </style>

            <div class="paradox-card">
                <div class="header">
                    <h3>${this.title}</h3>
                    <span class="points">${this.points} pts</span>
                </div>
                <p class="description">${this.description}</p>
                <div class="simulator-container">
                    <slot name="simulator-title"></slot>
                    <slot name="simulator"></slot>
                </div>
            </div>
        `;
    }
}

customElements.define('paradox-card', ParadoxCard);

export { ParadoxCard };
