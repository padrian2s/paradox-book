/**
 * Main Application Logic
 * Initializes components, handles navigation, and manages views
 */
import { paradoxes, categories, getParadoxesByCategory, getParadoxesByPoints } from './data/paradoxes.js';

// Import components
import './components/paradox-card.js';

// Import all simulators
import './components/simulators/abilene-simulator.js';
import './components/simulators/aggregator-simulator.js';
import './components/simulators/ai-deskilling-simulator.js';
import './components/simulators/air-conditioning-simulator.js';
import './components/simulators/algol-simulator.js';
import './components/simulators/all-horses-simulator.js';
import './components/simulators/allais-simulator.js';
import './components/simulators/analysis-paradox-simulator.js';
import './components/simulators/ant-rope-simulator.js';
import './components/simulators/antitrust-simulator.js';
import './components/simulators/archer-simulator.js';
import './components/simulators/aristotle-wheel-simulator.js';
import './components/simulators/arrow-info-simulator.js';
import './components/simulators/arrow-simulator.js';
import './components/simulators/automation-simulator.js';
import './components/simulators/bachelor-simulator.js';
import './components/simulators/banach-tarski-simulator.js';
import './components/simulators/banknote-simulator.js';
import './components/simulators/barber-simulator.js';
import './components/simulators/barbershop-simulator.js';
import './components/simulators/bells-theorem-simulator.js';
import './components/simulators/bentley-simulator.js';
import './components/simulators/berkson-simulator.js';
import './components/simulators/berry-simulator.js';
import './components/simulators/bertrand-box-simulator.js';
import './components/simulators/bertrand-econ-simulator.js';
import './components/simulators/bertrand-random-simulator.js';
import './components/simulators/birthday-simulator.js';
import './components/simulators/black-hole-simulator.js';
import './components/simulators/blub-simulator.js';
import './components/simulators/boltzmann-brain-simulator.js';
import './components/simulators/bonini-simulator.js';
import './components/simulators/bootstrap-simulator.js';
import './components/simulators/boy-girl-simulator.js';
import './components/simulators/braess-simulator.js';
import './components/simulators/burali-forti-simulator.js';
import './components/simulators/buridan-simulator.js';
import './components/simulators/buttered-cat-simulator.js';
import './components/simulators/c-value-simulator.js';
import './components/simulators/cantor-simulator.js';
import './components/simulators/captcha-simulator.js';
import './components/simulators/card-simulator.js';
import './components/simulators/catch22-simulator.js';
import './components/simulators/chainstore-simulator.js';
import './components/simulators/choice-simulator.js';
import './components/simulators/clothesline-simulator.js';
import './components/simulators/coastline-simulator.js';
import './components/simulators/coin-rotation-simulator.js';
import './components/simulators/commuting-simulator.js';
import './components/simulators/condorcet-simulator.js';
import './components/simulators/court-simulator.js';
import './components/simulators/crocodile-simulator.js';
import './components/simulators/curry-simulator.js';
import './components/simulators/dalembert-simulator.js';
import './components/simulators/dating-app-simulator.js';
import './components/simulators/deaton-simulator.js';
import './components/simulators/deming-simulator.js';
import './components/simulators/democracy-paradox-simulator.js';
import './components/simulators/demographic-economic-simulator.js';
import './components/simulators/diamond-water-simulator.js';
import './components/simulators/dollar-auction-simulator.js';
import './components/simulators/dome-simulator.js';
import './components/simulators/double-slit-simulator.js';
import './components/simulators/downs-thomson-simulator.js';
import './components/simulators/drinker-simulator.js';
import './components/simulators/easterlin-simulator.js';
import './components/simulators/edgeworth-simulator.js';
import './components/simulators/efficient-market-simulator.js';
import './components/simulators/elephant-brain-simulator.js';
import './components/simulators/ellsberg-simulator.js';
import './components/simulators/enrichment-paradox-simulator.js';
import './components/simulators/envelope-simulator.js';
import './components/simulators/epimenides-simulator.js';
import './components/simulators/epr-simulator.js';
import './components/simulators/european-paradox-simulator.js';
import './components/simulators/evil-simulator.js';
import './components/simulators/exercise-paradox-simulator.js';
import './components/simulators/faint-sun-simulator.js';
import './components/simulators/false-positive-simulator.js';
import './components/simulators/fenno-simulator.js';
import './components/simulators/fermi-simulator.js';
import './components/simulators/feynman-sprinkler-simulator.js';
import './components/simulators/fiction-paradox-simulator.js';
import './components/simulators/fitch-simulator.js';
import './components/simulators/fredkin-simulator.js';
import './components/simulators/free-time-simulator.js';
import './components/simulators/freedom-paradox-simulator.js';
import './components/simulators/freewill-simulator.js';
import './components/simulators/french-paradox-simulator.js';
import './components/simulators/friendship-simulator.js';
import './components/simulators/full-fat-simulator.js';
import './components/simulators/gabriel-horn-simulator.js';
import './components/simulators/galileo-simulator.js';
import './components/simulators/gender-equality-simulator.js';
import './components/simulators/generative-ai-simulator.js';
import './components/simulators/gibbs-simulator.js';
import './components/simulators/gibson-simulator.js';
import './components/simulators/giffen-simulator.js';
import './components/simulators/glucose-paradox-simulator.js';
import './components/simulators/golf-ball-simulator.js';
import './components/simulators/grain-millet-simulator.js';
import './components/simulators/grandfather-simulator.js';
import './components/simulators/grandi-simulator.js';
import './components/simulators/gray-paradox-simulator.js';
import './components/simulators/grelling-simulator.js';
import './components/simulators/grossman-stiglitz-simulator.js';
import './components/simulators/grue-simulator.js';
import './components/simulators/gzk-simulator.js';
import './components/simulators/heat-death-simulator.js';
import './components/simulators/hedgehog-dilemma-simulator.js';
import './components/simulators/hedonism-simulator.js';
import './components/simulators/hilbert-simulator.js';
import './components/simulators/hispanic-simulator.js';
import './components/simulators/hitler-murder-simulator.js';
import './components/simulators/hormesis-simulator.js';
import './components/simulators/hydrostatic-simulator.js';
import './components/simulators/icarus-paradox-simulator.js';
import './components/simulators/intentionally-blank-simulator.js';
import './components/simulators/interesting-number-simulator.js';
import './components/simulators/intransitive-dice-simulator.js';
import './components/simulators/inventors-simulator.js';
import './components/simulators/ironic-process-simulator.js';
import './components/simulators/irresistible-force-simulator.js';
import './components/simulators/jevons-simulator.js';
import './components/simulators/kavka-toxin-simulator.js';
import './components/simulators/knower-simulator.js';
import './components/simulators/ladder-simulator.js';
import './components/simulators/lek-paradox-simulator.js';
import './components/simulators/leontief-simulator.js';
import './components/simulators/levinthal-simulator.js';
import './components/simulators/liar-simulator.js';
import './components/simulators/liberal-paradox-simulator.js';
import './components/simulators/lombard-paradox-simulator.js';
import './components/simulators/loschmidt-simulator.js';
import './components/simulators/lottery-simulator.js';
import './components/simulators/low-birth-weight-simulator.js';
import './components/simulators/lucas-paradox-simulator.js';
import './components/simulators/mandeville-simulator.js';
import './components/simulators/maxwell-demon-simulator.js';
import './components/simulators/meat-paradox-simulator.js';
import './components/simulators/meno-simulator.js';
import './components/simulators/mere-addition-simulator.js';
import './components/simulators/meritocracy-simulator.js';
import './components/simulators/miserable-programmer-simulator.js';
import './components/simulators/monty-hall-simulator.js';
import './components/simulators/moore-simulator.js';
import './components/simulators/moral-paradox-simulator.js';
import './components/simulators/moravec-simulator.js';
import './components/simulators/morton-fork-simulator.js';
import './components/simulators/motivation-crowding-simulator.js';
import './components/simulators/moving-rows-simulator.js';
import './components/simulators/mpemba-simulator.js';
import './components/simulators/navigation-paradox-simulator.js';
import './components/simulators/necktie-simulator.js';
import './components/simulators/newcomb-simulator.js';
import './components/simulators/nihilism-paradox-simulator.js';
import './components/simulators/no-show-simulator.js';
import './components/simulators/nono-simulator.js';
import './components/simulators/obesity-hunger-simulator.js';
import './components/simulators/observer-effect-simulator.js';
import './components/simulators/olbers-simulator.js';
import './components/simulators/omnipotence-simulator.js';
import './components/simulators/opensource-simulator.js';
import './components/simulators/opposite-day-simulator.js';
import './components/simulators/pancake-simulator.js';
import './components/simulators/parrondo-simulator.js';
import './components/simulators/pesticide-paradox-simulator.js';
import './components/simulators/peto-simulator.js';
import './components/simulators/pinocchio-simulator.js';
import './components/simulators/plankton-paradox-simulator.js';
import './components/simulators/plenty-paradox-simulator.js';
import './components/simulators/polanyi-simulator.js';
import './components/simulators/popper-simulator.js';
import './components/simulators/potato-simulator.js';
import './components/simulators/predestination-simulator.js';
import './components/simulators/preface-simulator.js';
import './components/simulators/preparedness-simulator.js';
import './components/simulators/prevention-paradox-simulator.js';
import './components/simulators/prisoner-dilemma-simulator.js';
import './components/simulators/privacy-simulator.js';
import './components/simulators/proebsting-simulator.js';
import './components/simulators/progress-paradox-simulator.js';
import './components/simulators/prosperity-paradox-simulator.js';
import './components/simulators/python-paradox-simulator.js';
import './components/simulators/quantum-zeno-simulator.js';
import './components/simulators/quine-simulator.js';
import './components/simulators/radioactive-wildlife-simulator.js';
import './components/simulators/raven-simulator.js';
import './components/simulators/region-beta-simulator.js';
import './components/simulators/richard-simulator.js';
import './components/simulators/ross-simulator.js';
import './components/simulators/rule-following-simulator.js';
import './components/simulators/russell-simulator.js';
import './components/simulators/sad-clown-simulator.js';
import './components/simulators/schrodinger-cat-simulator.js';
import './components/simulators/scitovsky-simulator.js';
import './components/simulators/second-wind-simulator.js';
import './components/simulators/self-absorption-simulator.js';
import './components/simulators/service-recovery-simulator.js';
import './components/simulators/ship-theseus-simulator.js';
import './components/simulators/simpson-simulator.js';
import './components/simulators/sleeping-beauty-simulator.js';
import './components/simulators/socrates-simulator.js';
import './components/simulators/solomon-paradox-simulator.js';
import './components/simulators/solow-simulator.js';
import './components/simulators/sorites-simulator.js';
import './components/simulators/stability-instability-simulator.js';
import './components/simulators/static-site-simulator.js';
import './components/simulators/stockdale-simulator.js';
import './components/simulators/stpetersburg-simulator.js';
import './components/simulators/suspense-paradox-simulator.js';
import './components/simulators/tea-leaf-simulator.js';
import './components/simulators/temporal-paradox-simulator.js';
import './components/simulators/thomson-lamp-simulator.js';
import './components/simulators/three-prisoners-simulator.js';
import './components/simulators/thrift-simulator.js';
import './components/simulators/tog-simulator.js';
import './components/simulators/tolerance-simulator.js';
import './components/simulators/tortoise-achilles-simulator.js';
import './components/simulators/transparency-simulator.js';
import './components/simulators/triangle-simulator.js';
import './components/simulators/tritone-simulator.js';
import './components/simulators/tullock-simulator.js';
import './components/simulators/twin-paradox-simulator.js';
import './components/simulators/two-capacitor-simulator.js';
import './components/simulators/two-envelopes-simulator.js';
import './components/simulators/twofa-backup-simulator.js';
import './components/simulators/unexpected-hanging-simulator.js';
import './components/simulators/vibe-coding-simulator.js';
import './components/simulators/violence-simulator.js';
import './components/simulators/voting-paradox-simulator.js';
import './components/simulators/waiting-simulator.js';
import './components/simulators/white-horse-simulator.js';
import './components/simulators/will-rogers-simulator.js';
import './components/simulators/willpower-simulator.js';
import './components/simulators/wollheim-simulator.js';
import './components/simulators/yablo-simulator.js';
import './components/simulators/youth-paradox-simulator.js';
import './components/simulators/zeno-simulator.js';

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
