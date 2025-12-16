/**
 * Main Application Logic
 * Initializes components, handles navigation, and manages views
 */
import { paradoxes, categories, getParadoxesByCategory, getParadoxesByPoints } from './data/paradoxes.js';

// Import components
import './components/paradox-card.js';

// Import all simulators
import './components/simulators/potato-simulator.js';
import './components/simulators/birthday-simulator.js';
import './components/simulators/monty-hall-simulator.js';
import './components/simulators/simpson-simulator.js';
import './components/simulators/stpetersburg-simulator.js';
import './components/simulators/braess-simulator.js';
import './components/simulators/coastline-simulator.js';
import './components/simulators/hilbert-simulator.js';
import './components/simulators/interesting-number-simulator.js';
import './components/simulators/ant-rope-simulator.js';
import './components/simulators/triangle-simulator.js';
import './components/simulators/two-envelopes-simulator.js';
import './components/simulators/berkson-simulator.js';
import './components/simulators/boy-girl-simulator.js';
import './components/simulators/envelope-simulator.js';
import './components/simulators/fermi-simulator.js';
import './components/simulators/grandfather-simulator.js';
import './components/simulators/olbers-simulator.js';
import './components/simulators/tea-leaf-simulator.js';
import './components/simulators/golf-ball-simulator.js';
import './components/simulators/ladder-simulator.js';
import './components/simulators/pancake-simulator.js';
import './components/simulators/friendship-simulator.js';
import './components/simulators/jevons-simulator.js';
import './components/simulators/abilene-simulator.js';
import './components/simulators/stockdale-simulator.js';
import './components/simulators/service-recovery-simulator.js';
import './components/simulators/waiting-simulator.js';
import './components/simulators/region-beta-simulator.js';
import './components/simulators/automation-simulator.js';
import './components/simulators/blub-simulator.js';
import './components/simulators/privacy-simulator.js';
import './components/simulators/preparedness-simulator.js';
import './components/simulators/ship-theseus-simulator.js';
import './components/simulators/zeno-simulator.js';
import './components/simulators/thrift-simulator.js';
import './components/simulators/dollar-auction-simulator.js';
import './components/simulators/liar-simulator.js';
import './components/simulators/russell-simulator.js';
import './components/simulators/ross-simulator.js';
import './components/simulators/newcomb-simulator.js';
import './components/simulators/ellsberg-simulator.js';
import './components/simulators/necktie-simulator.js';
import './components/simulators/parrondo-simulator.js';

class ParadoxApp {
    constructor() {
        this.currentView = 'categories';
        this.init();
    }

    init() {
        this.renderNavigation();
        this.renderCategorySections();
        this.renderAllParadoxesSection();
        this.updateParadoxCount();
        this.setupEventListeners();
    }

    renderNavigation() {
        const nav = document.querySelector('nav');
        nav.innerHTML = categories.map(cat =>
            `<a href="#${cat.id}">${cat.title.replace(/ Paradoxes?$/, '')}</a>`
        ).join('');
    }

    renderCategorySections() {
        const main = document.querySelector('main');
        const sectionsHtml = categories.map(cat => {
            const categoryParadoxes = getParadoxesByCategory(cat.id);
            if (categoryParadoxes.length === 0) return '';
            return `
                <section id="${cat.id}" class="category-section">
                    <h2 class="category-title">${cat.title}</h2>
                    ${categoryParadoxes.map(p => this.renderParadoxCard(p)).join('')}
                </section>
            `;
        }).join('');

        main.innerHTML = sectionsHtml + '<section id="all-paradoxes"><div id="sorted-paradoxes-container"></div></section>';
    }

    renderParadoxCard(paradox) {
        const pointsDisplay = typeof paradox.points === 'number' ? `${paradox.points} pts` : paradox.points;

        if (paradox.simulator) {
            return `
                <paradox-card
                    id="card-${paradox.id}"
                    title="${this.escapeHtml(paradox.title)}"
                    points="${pointsDisplay}"
                    description="${this.escapeHtml(paradox.description)}"
                    category="${paradox.category}">
                    <${paradox.simulator} slot="simulator"></${paradox.simulator}>
                </paradox-card>
            `;
        }

        // For paradoxes without a simulator component, render a placeholder
        return `
            <paradox-card
                id="card-${paradox.id}"
                title="${this.escapeHtml(paradox.title)}"
                points="${pointsDisplay}"
                description="${this.escapeHtml(paradox.description)}"
                category="${paradox.category}">
                <div slot="simulator" class="placeholder-simulator">
                    <p style="color: var(--muted); text-align: center; padding: 2rem;">
                        Interactive simulator coming soon!<br>
                        <small>Add a simulator component for this paradox in components/simulators/</small>
                    </p>
                </div>
            </paradox-card>
        `;
    }

    renderAllParadoxesSection() {
        // This will be populated when user switches to "By Points" view
    }

    updateParadoxCount() {
        const countEl = document.getElementById('paradox-count');
        if (countEl) {
            countEl.textContent = `${paradoxes.length} Paradoxes`;
        }
    }

    setupEventListeners() {
        // View toggle buttons
        document.getElementById('view-categories')?.addEventListener('click', () => this.showCategories());
        document.getElementById('view-points')?.addEventListener('click', () => this.showByPoints());
        document.getElementById('sort-order')?.addEventListener('change', () => this.updatePointsSort());
    }

    showCategories() {
        this.currentView = 'categories';
        document.getElementById('view-categories')?.classList.add('active');
        document.getElementById('view-points')?.classList.remove('active');
        document.getElementById('sort-order').style.display = 'none';

        document.querySelectorAll('.category-section').forEach(s => s.style.display = '');
        document.getElementById('all-paradoxes').style.display = 'none';
    }

    showByPoints() {
        this.currentView = 'points';
        document.getElementById('view-categories')?.classList.remove('active');
        document.getElementById('view-points')?.classList.add('active');
        document.getElementById('sort-order').style.display = 'inline-block';

        document.querySelectorAll('.category-section').forEach(s => s.style.display = 'none');
        document.getElementById('all-paradoxes').style.display = 'block';

        this.buildSortedView();
    }

    buildSortedView() {
        const container = document.getElementById('sorted-paradoxes-container');
        const sortOrder = document.getElementById('sort-order').value;
        const sorted = getParadoxesByPoints(sortOrder === 'desc');

        container.innerHTML = sorted.map((p, index) => {
            const pointsDisplay = typeof p.points === 'number' ? `${p.points} pts` : p.points;
            return `
                <div class="sorted-item" onclick="app.scrollToCard('card-${p.id}')" style="
                    background: var(--card);
                    border-radius: 0.75rem;
                    padding: 1.25rem;
                    margin-bottom: 1rem;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    cursor: pointer;
                    transition: all 0.2s;
                    border: 2px solid transparent;
                " onmouseover="this.style.borderColor='var(--primary)'" onmouseout="this.style.borderColor='transparent'">
                    <div style="
                        background: var(--primary);
                        color: white;
                        width: 45px;
                        height: 45px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-weight: bold;
                        font-size: 1rem;
                        flex-shrink: 0;
                    ">#${index + 1}</div>
                    <div style="flex: 1; min-width: 0;">
                        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.25rem;">
                            <span style="font-weight: bold; color: var(--text); font-size: 1.1rem;">${this.escapeHtml(p.title)}</span>
                            <span style="background: var(--accent); color: var(--bg); padding: 0.2rem 0.6rem; border-radius: 9999px; font-size: 0.8rem; font-weight: bold;">${pointsDisplay}</span>
                        </div>
                        <p style="color: var(--muted); font-size: 0.875rem; margin: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${this.escapeHtml(p.description)}</p>
                    </div>
                    <div style="color: var(--primary); font-size: 1.5rem;">→</div>
                </div>
            `;
        }).join('');
    }

    scrollToCard(cardId) {
        this.showCategories();
        setTimeout(() => {
            const card = document.getElementById(cardId);
            if (card) {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                card.style.boxShadow = '0 0 0 3px var(--accent)';
                setTimeout(() => {
                    card.style.boxShadow = '';
                }, 2000);
            }
        }, 100);
    }

    updatePointsSort() {
        if (this.currentView === 'points') {
            this.buildSortedView();
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize app when DOM is ready
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new ParadoxApp();
});

// Export for global access (needed for onclick handlers)
window.app = app;
