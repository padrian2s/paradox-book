import { SimulatorBase } from '../simulator-base.js';

class GrainMilletSimulator extends SimulatorBase {
    constructor() {
        super();
        this.grainCount = 1;
        this.audioContext = null;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .grain-display {
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    padding: 2rem;
                    margin: 1rem 0;
                    text-align: center;
                    min-height: 150px;
                    position: relative;
                }

                .grain-visual {
                    font-size: 2rem;
                    margin-bottom: 1rem;
                    line-height: 1.5;
                    word-break: break-all;
                }

                .grain-count {
                    font-size: 3rem;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                }

                .sound-meter {
                    margin-top: 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    overflow: hidden;
                    height: 30px;
                    position: relative;
                }

                .sound-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #22c55e, #eab308, #ef4444);
                    transition: width 0.3s;
                    width: 0%;
                }

                .sound-label {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-weight: bold;
                    font-size: 0.875rem;
                    color: white;
                    text-shadow: 0 0 4px black;
                }

                .multiplier-buttons {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    justify-content: center;
                    margin-bottom: 1rem;
                }

                .multiplier-buttons button {
                    min-width: 80px;
                    font-size: 0.875rem;
                    padding: 0.5rem 1rem;
                }

                .stats-row {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .stat-box {
                    background: var(--card, #1e293b);
                    padding: 0.75rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .stat-value {
                    font-size: 1.25rem;
                    font-weight: bold;
                    color: var(--primary, #6366f1);
                }

                .stat-label {
                    font-size: 0.7rem;
                    color: var(--muted, #94a3b8);
                }

                @media (max-width: 600px) {
                    .stats-row {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>Grain of Millet Experiment</h4>
            <p style="color: var(--muted); margin-bottom: 1rem;">Drop grains and observe when sound emerges from silence.</p>

            <div class="multiplier-buttons">
                <button id="add-1">+1</button>
                <button id="add-10">+10</button>
                <button id="add-100">+100</button>
                <button id="add-1000">+1,000</button>
                <button id="add-10000">+10,000</button>
            </div>

            <div class="grain-display">
                <div class="grain-visual" id="grain-visual">*</div>
                <div class="grain-count" id="grain-count">1 grain</div>
            </div>

            <div class="sound-meter">
                <div class="sound-fill" id="sound-fill"></div>
                <span class="sound-label" id="sound-label">Silent</span>
            </div>

            <div class="stats-row">
                <div class="stat-box">
                    <div class="stat-value" id="individual-sound">0 dB</div>
                    <div class="stat-label">Per Grain</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="total-sound">0 dB</div>
                    <div class="stat-label">Combined</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="threshold">No</div>
                    <div class="stat-label">Audible?</div>
                </div>
            </div>

            <div class="controls">
                <button id="drop-btn">Drop Grains</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="result" id="result">
                <p>One grain makes no detectable sound. How many before you hear something?</p>
            </div>

            <div class="insight">
                Zeno's paradox: If one grain makes zero sound, then any number should make zero (0 + 0 + 0 = 0). But we hear many grains! The resolution: Each grain makes a tiny sound below our hearing threshold. Combined, they cross the threshold. "Nothing" actually meant "too small to perceive."
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#add-1').addEventListener('click', () => this.addGrains(1));
        this.$('#add-10').addEventListener('click', () => this.addGrains(10));
        this.$('#add-100').addEventListener('click', () => this.addGrains(100));
        this.$('#add-1000').addEventListener('click', () => this.addGrains(1000));
        this.$('#add-10000').addEventListener('click', () => this.addGrains(10000));
        this.$('#drop-btn').addEventListener('click', () => this.dropGrains());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
    }

    addGrains(count) {
        this.grainCount = Math.min(this.grainCount + count, 100000);
        this.updateDisplay();
    }

    updateDisplay() {
        const count = this.grainCount;
        const countText = count.toLocaleString() + (count === 1 ? ' grain' : ' grains');
        this.$('#grain-count').textContent = countText;

        let visual = '';
        const displayCount = Math.min(count, 100);
        for (let i = 0; i < displayCount; i++) {
            visual += '* ';
        }
        if (count > 100) {
            visual += '...';
        }
        this.$('#grain-visual').textContent = visual || '*';

        const perGrainDb = 0.001;
        const totalDb = Math.log10(count) * 10;
        const threshold = 20;
        const audible = totalDb >= threshold;

        this.$('#individual-sound').textContent = perGrainDb.toFixed(3) + ' dB';
        this.$('#total-sound').textContent = totalDb.toFixed(1) + ' dB';
        this.$('#threshold').textContent = audible ? 'Yes!' : 'No';
        this.$('#threshold').style.color = audible ? '#22c55e' : '#ef4444';

        const soundPercent = Math.min((totalDb / 60) * 100, 100);
        this.$('#sound-fill').style.width = soundPercent + '%';

        let label = 'Silent';
        if (totalDb >= 50) label = 'Loud!';
        else if (totalDb >= 30) label = 'Audible';
        else if (totalDb >= 20) label = 'Barely Audible';
        else if (totalDb >= 10) label = 'Sub-threshold';
        this.$('#sound-label').textContent = label;
    }

    dropGrains() {
        const count = this.grainCount;
        const totalDb = Math.log10(count) * 10;
        const audible = totalDb >= 20;

        if (audible) {
            this.$('#result').innerHTML = `
                <p style="color: #22c55e;"><strong>You hear it!</strong></p>
                <p>${count.toLocaleString()} grains produce ${totalDb.toFixed(1)} dB - above the ~20 dB hearing threshold.</p>
                <p>Each grain contributes a tiny amount of sound energy. Many tiny amounts sum to something perceptible.</p>
            `;
        } else {
            this.$('#result').innerHTML = `
                <p style="color: #ef4444;"><strong>Silence...</strong></p>
                <p>${count.toLocaleString()} grains produce only ${totalDb.toFixed(1)} dB - below the ~20 dB hearing threshold.</p>
                <p>Add more grains to cross the threshold!</p>
            `;
        }

        this.playSound(totalDb);
    }

    playSound(db) {
        try {
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }

            const volume = Math.min(Math.max((db - 10) / 50, 0), 1);
            if (volume <= 0) return;

            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.frequency.value = 800 + Math.random() * 400;
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(volume * 0.3, this.audioContext.currentTime);
            gainNode.gain.exponentialDecayTo = volume * 0.01;

            oscillator.start();
            oscillator.stop(this.audioContext.currentTime + 0.1);
        } catch (e) {
        }
    }

    reset() {
        this.grainCount = 1;
        this.updateDisplay();
        this.$('#result').innerHTML = `<p>One grain makes no detectable sound. How many before you hear something?</p>`;
    }
}

customElements.define('grain-millet-simulator', GrainMilletSimulator);

export { GrainMilletSimulator };
