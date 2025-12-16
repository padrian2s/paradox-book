/**
 * Base Simulator Component
 * Provides common functionality for all paradox simulators
 */
class SimulatorBase extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    disconnectedCallback() {
        this.cleanup();
    }

    // Override in subclasses
    render() {
        this.shadowRoot.innerHTML = this.getTemplate();
    }

    // Override in subclasses
    getTemplate() {
        return `<slot></slot>`;
    }

    // Override in subclasses
    setupEventListeners() {}

    // Override in subclasses
    cleanup() {}

    // Helper to get common styles
    getCommonStyles() {
        return `
            :host {
                display: block;
            }

            .controls {
                display: flex;
                flex-wrap: wrap;
                gap: 1rem;
                margin-bottom: 1rem;
            }

            .control-group {
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
            }

            .control-group label {
                font-size: 0.875rem;
                color: var(--muted, #94a3b8);
            }

            input[type="range"] {
                width: 150px;
                accent-color: var(--primary, #6366f1);
            }

            input[type="number"] {
                width: 100px;
                padding: 0.5rem;
                border: 1px solid var(--muted, #94a3b8);
                border-radius: 0.25rem;
                background: var(--card, #1e293b);
                color: var(--text, #e2e8f0);
            }

            select {
                padding: 0.5rem;
                border: 1px solid var(--muted, #94a3b8);
                border-radius: 0.25rem;
                background: var(--card, #1e293b);
                color: var(--text, #e2e8f0);
                cursor: pointer;
            }

            button {
                background: var(--primary, #6366f1);
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 0.5rem;
                cursor: pointer;
                font-size: 1rem;
                transition: all 0.2s;
            }

            button:hover {
                background: var(--secondary, #8b5cf6);
                transform: translateY(-1px);
            }

            button:active {
                transform: translateY(0);
            }

            .result {
                background: rgba(99, 102, 241, 0.1);
                border: 1px solid var(--primary, #6366f1);
                border-radius: 0.5rem;
                padding: 1rem;
                margin-top: 1rem;
            }

            .result-value {
                font-size: 2rem;
                font-weight: bold;
                color: var(--accent, #f59e0b);
            }

            .insight {
                background: rgba(245, 158, 11, 0.1);
                border-left: 3px solid var(--accent, #f59e0b);
                padding: 1rem;
                margin-top: 1rem;
                font-style: italic;
            }

            .visualization {
                margin-top: 1rem;
                min-height: 150px;
                position: relative;
            }

            canvas {
                width: 100%;
                border-radius: 0.5rem;
            }

            /* Mobile styles */
            @media (max-width: 768px) {
                .controls {
                    flex-direction: column;
                    gap: 0.75rem;
                }

                .controls button {
                    width: 100%;
                    padding: 0.875rem 1rem;
                    font-size: 0.9rem;
                }

                .control-group {
                    width: 100%;
                }

                input[type="range"] {
                    width: 100%;
                }

                input[type="number"],
                select {
                    width: 100%;
                    padding: 0.75rem;
                    font-size: 1rem;
                }

                .result {
                    padding: 0.4rem;
                    font-size: 0.8rem;
                }

                .result-value {
                    font-size: 1.5rem;
                }

                .insight {
                    padding: 0.4rem;
                    font-size: 0.75rem;
                    border-left: none;
                    border-top: 2px solid var(--accent, #f59e0b);
                }

                .result {
                    border-left: none;
                    border-top: 1px solid var(--primary, #6366f1);
                }
            }
        `;
    }

    // Helper to dispatch custom events
    dispatchSimulatorEvent(eventName, detail = {}) {
        this.dispatchEvent(new CustomEvent(eventName, {
            bubbles: true,
            composed: true,
            detail
        }));
    }

    // Helper to query elements in shadow DOM
    $(selector) {
        return this.shadowRoot.querySelector(selector);
    }

    $$(selector) {
        return this.shadowRoot.querySelectorAll(selector);
    }
}

export { SimulatorBase };
