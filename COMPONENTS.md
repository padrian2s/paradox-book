# Structura Componentelor Paradox

## Structura Proiectului

```
paradox/
├── index.html            # HTML principal (curat, minimal)
├── main.js               # Logica aplicației
├── css/
│   └── styles.css        # Stiluri globale
├── components/
│   ├── paradox-card.js   # Componenta card pentru paradoxuri
│   ├── simulator-base.js # Clasa de bază pentru simulatoare
│   └── simulators/       # Simulatoare individuale
│       ├── potato-simulator.js
│       ├── birthday-simulator.js
│       └── monty-hall-simulator.js
└── data/
    └── paradoxes.js      # Date paradoxuri (ușor de editat)
```

## Cum să adaugi un paradox nou

### 1. Adaugă datele în `data/paradoxes.js`

```javascript
{
    id: 'my-paradox',           // ID unic
    title: 'My New Paradox',    // Titlu
    points: 100,                // Puncte (număr sau string)
    description: 'Description', // Descriere scurtă
    category: 'mathematical',   // Categorie existentă
    simulator: null             // sau 'my-simulator' dacă ai unul
}
```

### 2. (Opțional) Creează un simulator

Creează fișier nou în `components/simulators/my-simulator.js`:

```javascript
import { SimulatorBase } from '../simulator-base.js';

class MySimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}
                /* Stiluri specifice aici */
            </style>

            <h4>Titlu Simulator</h4>

            <div class="controls">
                <button id="run-btn">Run</button>
            </div>

            <div class="result" id="result">
                <!-- Rezultate -->
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#run-btn').addEventListener('click', () => this.run());
    }

    run() {
        // Logica simulatorului
        this.$('#result').innerHTML = 'Done!';
    }
}

customElements.define('my-simulator', MySimulator);
export { MySimulator };
```

### 3. Importă simulatorul în `main.js`

```javascript
import './components/simulators/my-simulator.js';
```

### 4. Actualizează datele paradoxului

```javascript
{
    id: 'my-paradox',
    simulator: 'my-simulator'  // Numele custom element-ului
}
```

## Componente disponibile

### `<paradox-card>`
Card wrapper cu titlu, puncte, descriere și slot pentru simulator.

Atribute:
- `title` - Titlul paradoxului
- `points` - Punctele
- `description` - Descrierea
- `category` - Categoria

### `SimulatorBase`
Clasă de bază pentru simulatoare. Oferă:
- `getCommonStyles()` - Stiluri CSS comune
- `$(selector)` - Query selector în shadow DOM
- `$$(selector)` - Query selector all
- `dispatchSimulatorEvent(name, detail)` - Dispatch custom events

## Rulare

Deschide `index.html` într-un server local (necesar pentru ES modules):

```bash
# Python
python -m http.server 8000

# Node.js
npx serve

# VS Code
# Folosește extensia "Live Server"
```

## Note

- Fișierul `index-old.html` este versiunea originală (monolit), păstrată ca referință
- `index.html` este noua versiune componentizată
- Simulatoarele folosesc Shadow DOM pentru izolarea stilurilor
- Datele sunt centralizate în `data/paradoxes.js`
