/**
 * Interesting Number Paradox Simulator
 * Demonstrates that every positive integer is interesting
 */
import { SimulatorBase } from '../simulator-base.js';

class InterestingNumberSimulator extends SimulatorBase {
    constructor() {
        super();
        this.numberFacts = {
            1: ['First positive integer', 'Multiplicative identity', 'Only number that is its own factorial'],
            2: ['Only even prime', 'First prime number', 'Binary base'],
            3: ['First odd prime', 'Triangular number', 'Fibonacci number'],
            4: ['First composite', 'Only number = letters in its name', 'Square of 2'],
            5: ['Primes in a prime', 'Fibonacci number', 'Digits on a hand'],
            6: ['First perfect number', 'Triangular number', 'Factorial of 3'],
            7: ['Lucky number', 'Days in a week', 'Fourth prime'],
            8: ['First cube > 1', 'Fibonacci number', 'Bits in a byte'],
            9: ['First odd composite', 'Square of 3', 'Casting out nines'],
            10: ['Decimal base', 'Triangular number', 'Fingers on hands'],
            11: ['First repunit prime', 'Palindromic prime', 'Fifth Lucas number'],
            12: ['Dozen', 'Hours on clock face', 'Months in a year'],
            13: ['Unlucky number', 'Fibonacci number', 'Sixth prime'],
            17: ['Seventh prime', 'Only prime sum of 4 primes', 'Gauss-17-gon'],
            21: ['Fibonacci number', 'Triangular number', 'Blackjack target'],
            23: ['First prime factorial+1', 'Smallest number of sphere arrangements', 'Michael Jordan'],
            42: ['Answer to life (Hitchhiker\'s Guide)', 'Sum of first 6 positive even numbers', 'Catalan number'],
            69: ['Nice', 'Sum of its divisors = square', 'Strobogrammatic'],
            73: ['Sheldon\'s number', '21st prime (73 reversed)', 'Binary palindrome'],
            100: ['Square of 10', 'Percentage base', 'Boiling point of water (C)'],
            137: ['Fine-structure constant inverse (approx)', 'Prime number', 'Physics\' magic number'],
            420: ['You know why', 'Divisible by 1,2,3,4,5,6,7', 'Harshad number'],
            666: ['Number of the beast', 'Sum of first 36 positive integers', 'Triangular number'],
            1729: ['Hardy-Ramanujan number', 'Smallest taxicab number', 'Sum of two cubes two ways'],
            3435: ['Munchausen number', 'Self-descriptive in base 10', '3^3+4^4+3^3+5^5=3435'],
            8128: ['Fourth perfect number', 'Sum of divisors = itself', '2^6(2^7-1)'],
        };
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .interest-viz {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                    text-align: center;
                }

                .number-display {
                    font-size: 4rem;
                    font-weight: bold;
                    color: var(--primary, #6366f1);
                    margin-bottom: 1rem;
                    transition: transform 0.3s;
                }

                .number-display.animate {
                    transform: scale(1.1);
                }

                .interest-facts {
                    text-align: left;
                    max-width: 400px;
                    margin: 0 auto;
                }

                .fact {
                    padding: 0.5rem;
                    border-radius: 0.25rem;
                    margin-bottom: 0.25rem;
                    color: var(--text, #e2e8f0);
                    background: var(--card, #1e293b);
                }

                .fact.highlight {
                    background: rgba(99, 102, 241, 0.2);
                    border-left: 3px solid var(--primary, #6366f1);
                }

                .fact.conclusion {
                    margin-top: 1rem;
                    background: rgba(34, 197, 94, 0.2);
                    border-left: 3px solid #22c55e;
                }

                .random-section {
                    margin-top: 1.5rem;
                    padding-top: 1rem;
                    border-top: 1px solid var(--card, #1e293b);
                }

                .number-grid {
                    display: grid;
                    grid-template-columns: repeat(5, 1fr);
                    gap: 0.5rem;
                    margin-top: 1rem;
                }

                .number-btn {
                    background: var(--card, #1e293b);
                    border: 1px solid var(--muted, #94a3b8);
                    padding: 0.5rem;
                    border-radius: 0.25rem;
                    color: var(--text, #e2e8f0);
                    cursor: pointer;
                    transition: all 0.2s;
                    font-size: 0.875rem;
                }

                .number-btn:hover {
                    background: var(--primary, #6366f1);
                    border-color: var(--primary, #6366f1);
                }

                .number-btn.special {
                    border-color: var(--accent, #f59e0b);
                    color: var(--accent, #f59e0b);
                }

                @media (max-width: 600px) {
                    .number-display {
                        font-size: 3rem;
                    }
                    .number-grid {
                        grid-template-columns: repeat(4, 1fr);
                    }
                }
            </style>

            <h4>Number Interest Checker</h4>

            <div class="controls">
                <div class="control-group">
                    <label>Enter a number:</label>
                    <input type="number" id="interest-number" min="1" max="10000" value="42">
                </div>
                <button id="check-btn">Is It Interesting?</button>
                <button id="random-btn">Random Number</button>
            </div>

            <div class="interest-viz">
                <div class="number-display" id="number-display">42</div>
                <div class="interest-facts" id="interest-facts">
                    <div class="fact">Click "Is It Interesting?" to discover why this number is interesting...</div>
                </div>

                <div class="random-section">
                    <div style="color: var(--muted, #94a3b8); font-size: 0.875rem; margin-bottom: 0.5rem;">Try some famous numbers:</div>
                    <div class="number-grid" id="number-grid">
                        <button class="number-btn special">42</button>
                        <button class="number-btn">7</button>
                        <button class="number-btn special">1729</button>
                        <button class="number-btn">13</button>
                        <button class="number-btn special">137</button>
                        <button class="number-btn">69</button>
                        <button class="number-btn">73</button>
                        <button class="number-btn special">666</button>
                        <button class="number-btn">100</button>
                        <button class="number-btn special">420</button>
                    </div>
                </div>
            </div>

            <div class="result">
                <p id="interest-result">The paradox: If "uninteresting" numbers existed, the smallest would be interesting - a contradiction!</p>
            </div>

            <div class="insight">
                This is a "self-defeating" argument. The set of uninteresting numbers must be empty, or we immediately find an interesting member.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#check-btn').addEventListener('click', () => this.checkInteresting());
        this.$('#random-btn').addEventListener('click', () => this.randomNumber());
        this.$('#interest-number').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.checkInteresting();
        });

        this.$$('.number-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const num = parseInt(btn.textContent);
                this.$('#interest-number').value = num;
                this.checkInteresting();
            });
        });

        this.checkInteresting();
    }

    checkInteresting() {
        const num = parseInt(this.$('#interest-number').value) || 1;
        const display = this.$('#number-display');
        display.textContent = num;

        display.classList.add('animate');
        setTimeout(() => display.classList.remove('animate'), 300);

        const facts = this.numberFacts[num] || this.generateFacts(num);
        const factsHtml = facts.map(f => `<div class="fact highlight">&#10003; ${f}</div>`).join('');

        this.$('#interest-facts').innerHTML = factsHtml +
            `<div class="fact conclusion">
                <strong>Conclusion:</strong> ${num} is INTERESTING! (They all are.)
            </div>`;

        this.$('#interest-result').innerHTML =
            `Even if we couldn't find facts about ${num}, it would be interesting as "the smallest uninteresting number" - a contradiction!`;
    }

    generateFacts(n) {
        const facts = [];

        if (n % 2 === 0) facts.push('Even number');
        else facts.push('Odd number');

        let isPrime = n > 1;
        for (let i = 2; i * i <= n; i++) {
            if (n % i === 0) { isPrime = false; break; }
        }
        if (isPrime) facts.push('Prime number');

        const sqrt = Math.sqrt(n);
        if (sqrt === Math.floor(sqrt)) facts.push('Perfect square');

        const cbrt = Math.cbrt(n);
        if (cbrt === Math.floor(cbrt) && n > 1) facts.push('Perfect cube');

        const digitSum = String(n).split('').reduce((a, b) => a + parseInt(b), 0);
        facts.push(`Digit sum is ${digitSum}`);

        if (n % digitSum === 0) facts.push('Harshad number (divisible by digit sum)');

        const reversed = parseInt(String(n).split('').reverse().join(''));
        if (reversed === n && n > 9) facts.push('Palindrome number');

        const triangular = (8 * n + 1);
        const sqrtTriangular = Math.sqrt(triangular);
        if (sqrtTriangular === Math.floor(sqrtTriangular)) {
            facts.push('Triangular number');
        }

        const fibSet = new Set([1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765]);
        if (fibSet.has(n)) facts.push('Fibonacci number');

        if (facts.length < 3) {
            facts.push(`${this.ordinal(n)} positive integer`);
        }

        return facts;
    }

    ordinal(n) {
        const s = ['th', 'st', 'nd', 'rd'];
        const v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    }

    randomNumber() {
        const num = Math.floor(Math.random() * 9999) + 1;
        this.$('#interest-number').value = num;
        this.checkInteresting();
    }
}

customElements.define('interesting-number-simulator', InterestingNumberSimulator);

export { InterestingNumberSimulator };
