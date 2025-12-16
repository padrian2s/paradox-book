/**
 * Blub Paradox Simulator
 * Demonstrates how programmers can see down but not up the language power spectrum
 */
import { SimulatorBase } from '../simulator-base.js';

class BlubSimulator extends SimulatorBase {
    constructor() {
        super();
        this.languages = [
            { id: 'assembly', name: 'Assembly', features: 'Manual memory, No abstraction' },
            { id: 'c', name: 'C', features: 'Pointers, No OOP' },
            { id: 'java', name: 'Java', features: 'OOP, Garbage Collection' },
            { id: 'python', name: 'Python', features: 'Dynamic typing, Metaprogramming' },
            { id: 'lisp', name: 'Lisp', features: 'Macros, Code as data' },
            { id: 'haskell', name: 'Haskell', features: 'Pure FP, Type inference' }
        ];
        this.results = {
            'assembly': 'From Assembly: Everything above looks like unnecessary abstraction. Why do you need OOP?',
            'c': 'From C: Assembly is tedious, but Java\'s garbage collection seems wasteful. What\'s functional programming even for?',
            'java': 'From Java: C and Assembly look primitive. But what\'s Lisp doing with macros that you can\'t even imagine?',
            'python': 'From Python: Java is verbose. But Haskell\'s type system and purity... why would you want that?',
            'lisp': 'From Lisp: Most languages lack macros and homoiconicity. But even Lispers miss Haskell\'s guarantees.',
            'haskell': 'From Haskell: You can see the flaws in everything below. But are there languages above even this?'
        };
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .blub-viz {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .language-spectrum {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .lang-level {
                    padding: 0.75rem 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.25rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    transition: all 0.3s;
                    border-left: 4px solid transparent;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }

                .lang-level.current {
                    background: #6366f1;
                    color: white;
                    border-left-color: #22c55e;
                }

                .lang-level.below {
                    opacity: 0.7;
                    border-left-color: #22c55e;
                }

                .lang-level.hidden-power {
                    opacity: 0.4;
                    border-left-color: #ef4444;
                }

                .lang-name {
                    font-weight: bold;
                    min-width: 150px;
                }

                .lang-features {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }

                .lang-level.current .lang-features {
                    color: rgba(255,255,255,0.8);
                }

                .blub-indicator {
                    font-size: 0.875rem;
                }

                .perspective-arrows {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 1rem;
                    font-size: 0.875rem;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }

                .arrow-down { color: #22c55e; }
                .arrow-up { color: #ef4444; }

                @media (max-width: 768px) {
                    .lang-level {
                        flex-direction: column;
                        align-items: flex-start;
                    }

                    .lang-name {
                        min-width: auto;
                    }
                }
            </style>

            <h4>Programming Language Power Spectrum</h4>

            <div class="blub-viz">
                <div class="language-spectrum" id="spectrum">
                    ${this.languages.map(lang => `
                        <div class="lang-level${lang.id === 'java' ? ' current' : lang.id === 'python' || lang.id === 'lisp' || lang.id === 'haskell' ? ' hidden-power' : ''}" data-lang="${lang.id}">
                            <span class="lang-name">${lang.name}${lang.id === 'java' ? ' (You are here)' : ''}</span>
                            <span class="lang-features">${lang.features}</span>
                            ${lang.id === 'java' ? '<span class="blub-indicator">👈 "Blub"</span>' : ''}
                        </div>
                    `).join('')}
                </div>
                <div class="perspective-arrows">
                    <div class="arrow-down">👀 Can see what's missing below</div>
                    <div class="arrow-up">🙈 Can't see what's missing above</div>
                </div>
            </div>

            <div class="controls" style="margin-top: 1rem;">
                <select id="blub-select">
                    <option value="assembly">View from Assembly</option>
                    <option value="c">View from C</option>
                    <option value="java" selected>View from Java</option>
                    <option value="python">View from Python</option>
                    <option value="lisp">View from Lisp</option>
                    <option value="haskell">View from Haskell</option>
                </select>
            </div>

            <div class="result">
                <p id="blub-result">From Java's perspective: C and Assembly look primitive (no GC, no OOP). But what's Lisp/Haskell doing that you can't even imagine?</p>
            </div>

            <div class="insight">
                Paul Graham's insight: You can't evaluate a language more powerful than your current one because you don't know what you're missing. This is why trying new paradigms matters.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#blub-select').addEventListener('change', () => this.changeBlubPerspective());
        this.changeBlubPerspective();
    }

    changeBlubPerspective() {
        const selected = this.$('#blub-select').value;
        const levels = this.$$('.lang-level');
        const langOrder = ['assembly', 'c', 'java', 'python', 'lisp', 'haskell'];
        const selectedIndex = langOrder.indexOf(selected);

        levels.forEach((level) => {
            level.classList.remove('current', 'below', 'hidden-power');
            const levelLang = level.getAttribute('data-lang');
            const levelIndex = langOrder.indexOf(levelLang);
            const langData = this.languages.find(l => l.id === levelLang);

            const nameEl = level.querySelector('.lang-name');
            const existingIndicator = level.querySelector('.blub-indicator');
            if (existingIndicator) existingIndicator.remove();

            if (levelIndex === selectedIndex) {
                level.classList.add('current');
                nameEl.textContent = langData.name + ' (You are here)';
                const indicator = document.createElement('span');
                indicator.className = 'blub-indicator';
                indicator.textContent = '👈 "Blub"';
                level.appendChild(indicator);
            } else if (levelIndex < selectedIndex) {
                level.classList.add('below');
                nameEl.textContent = langData.name;
            } else {
                level.classList.add('hidden-power');
                nameEl.textContent = langData.name;
            }
        });

        this.$('#blub-result').textContent = this.results[selected];
    }
}

customElements.define('blub-simulator', BlubSimulator);

export { BlubSimulator };
