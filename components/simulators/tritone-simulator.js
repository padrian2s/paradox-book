import { SimulatorBase } from '../simulator-base.js';

class TritoneSimulator extends SimulatorBase {
    constructor() {
        super();
        this.audioContext = null;
        this.currentOscillators = [];
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .audio-container {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                }

                .tone-pair {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 2rem;
                    padding: 2rem;
                }

                .tone-box {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    background: var(--card, #1e293b);
                    border: 3px solid var(--primary, #6366f1);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                }

                .tone-box.playing {
                    background: var(--primary, #6366f1);
                    box-shadow: 0 0 30px rgba(99, 102, 241, 0.5);
                    animation: pulse-tone 0.5s ease-in-out infinite;
                }

                @keyframes pulse-tone {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }

                .tone-label {
                    font-size: 1.5rem;
                    font-weight: bold;
                }

                .tone-note {
                    font-size: 0.75rem;
                    color: var(--muted);
                }

                .direction-arrow {
                    font-size: 3rem;
                    color: var(--muted);
                    transition: all 0.3s ease;
                }

                .direction-arrow.ascending {
                    color: #22c55e;
                    animation: bounce-up 0.5s infinite;
                }

                .direction-arrow.descending {
                    color: #dc2626;
                    animation: bounce-down 0.5s infinite;
                }

                @keyframes bounce-up {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }

                @keyframes bounce-down {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(10px); }
                }

                .vote-container {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .vote-btn {
                    padding: 1rem 2rem;
                    font-size: 1rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .vote-btn.ascending {
                    background: #22c55e;
                }

                .vote-btn.descending {
                    background: #dc2626;
                }

                .results-panel {
                    margin-top: 1rem;
                    padding: 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                }

                .results-title {
                    font-weight: bold;
                    text-align: center;
                    margin-bottom: 0.5rem;
                }

                .results-bar {
                    display: flex;
                    height: 30px;
                    border-radius: 4px;
                    overflow: hidden;
                }

                .bar-section {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.75rem;
                    font-weight: bold;
                    transition: width 0.5s ease;
                }

                .bar-section.ascending {
                    background: #22c55e;
                }

                .bar-section.descending {
                    background: #dc2626;
                }

                .explanation-box {
                    margin-top: 1rem;
                    padding: 1rem;
                    background: var(--card);
                    border-radius: 0.5rem;
                }

                .explanation-title {
                    font-weight: bold;
                    color: var(--accent);
                    margin-bottom: 0.5rem;
                }

                .explanation-text {
                    font-size: 0.875rem;
                    color: var(--muted);
                    line-height: 1.5;
                }

                .note-info {
                    font-size: 0.75rem;
                    color: var(--muted);
                    text-align: center;
                    margin-top: 0.5rem;
                }

                @media (max-width: 600px) {
                    .tone-pair {
                        gap: 1rem;
                    }
                    .tone-box {
                        width: 80px;
                        height: 80px;
                    }
                    .vote-container {
                        flex-direction: column;
                    }
                }
            </style>

            <h4>Tritone Paradox</h4>
            <p style="color: var(--muted); margin-bottom: 1rem;">The same tones sound ascending to some, descending to others.</p>

            <div class="controls">
                <button id="play-btn">Play Tritone Pair</button>
                <button id="stop-btn">Stop</button>
            </div>

            <div class="audio-container">
                <div class="tone-pair">
                    <div class="tone-box" id="tone1">
                        <span class="tone-label">C</span>
                        <span class="tone-note">First Tone</span>
                    </div>
                    <div class="direction-arrow" id="direction-arrow">&#x2194;</div>
                    <div class="tone-box" id="tone2">
                        <span class="tone-label">F#</span>
                        <span class="tone-note">Second Tone</span>
                    </div>
                </div>
                <div class="note-info">Tritone: exactly half an octave apart (6 semitones)</div>

                <div class="vote-container">
                    <button class="vote-btn ascending" id="vote-up">&#x2191; Sounds Ascending</button>
                    <button class="vote-btn descending" id="vote-down">&#x2193; Sounds Descending</button>
                </div>

                <div class="results-panel">
                    <div class="results-title">How People Typically Hear This:</div>
                    <div class="results-bar">
                        <div class="bar-section ascending" id="ascending-bar" style="width: 50%;">~50%</div>
                        <div class="bar-section descending" id="descending-bar" style="width: 50%;">~50%</div>
                    </div>
                </div>
            </div>

            <div class="result" id="result">
                <p>Click "Play Tritone Pair" to hear the paradox, then vote on what you hear.</p>
            </div>

            <div class="explanation-box">
                <div class="explanation-title">Why Does This Happen?</div>
                <div class="explanation-text">
                    The tritone (C to F#) is exactly half an octave - maximally ambiguous.
                    Your brain must decide if F# is "above" or "below" C.
                    This decision depends on your native language, dialect, and early musical exposure.
                    People from different regions consistently hear it differently!
                </div>
            </div>

            <div class="insight">
                Discovered by Diana Deutsch in 1986. The tritone paradox reveals that pitch perception isn't purely physical - it's shaped by culture and language. There's no "correct" answer; both perceptions are equally valid.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#play-btn').addEventListener('click', () => this.playTritone());
        this.$('#stop-btn').addEventListener('click', () => this.stopSound());
        this.$('#vote-up').addEventListener('click', () => this.registerVote('ascending'));
        this.$('#vote-down').addEventListener('click', () => this.registerVote('descending'));
    }

    playTritone() {
        this.stopSound();

        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();

            this.$('#tone1').classList.add('playing');

            const osc1 = this.audioContext.createOscillator();
            const gain1 = this.audioContext.createGain();
            osc1.frequency.value = 261.63;
            osc1.type = 'sine';
            gain1.gain.value = 0.3;
            osc1.connect(gain1);
            gain1.connect(this.audioContext.destination);
            osc1.start();

            this.currentOscillators.push({ osc: osc1, gain: gain1 });

            setTimeout(() => {
                gain1.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.1);
                this.$('#tone1').classList.remove('playing');

                setTimeout(() => {
                    this.$('#tone2').classList.add('playing');

                    const osc2 = this.audioContext.createOscillator();
                    const gain2 = this.audioContext.createGain();
                    osc2.frequency.value = 369.99;
                    osc2.type = 'sine';
                    gain2.gain.value = 0.3;
                    osc2.connect(gain2);
                    gain2.connect(this.audioContext.destination);
                    osc2.start();

                    this.currentOscillators.push({ osc: osc2, gain: gain2 });

                    setTimeout(() => {
                        gain2.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.1);
                        this.$('#tone2').classList.remove('playing');

                        this.$('#result').innerHTML = `
                            <p style="color: var(--accent);"><strong>What did you hear?</strong></p>
                            <p>Did the second tone (F#) sound HIGHER or LOWER than the first (C)?</p>
                            <p>Vote above to see how your perception compares!</p>
                        `;
                    }, 700);
                }, 200);
            }, 700);

        } catch (e) {
            this.$('#result').innerHTML = `
                <p style="color: #dc2626;">Audio not supported in this browser.</p>
                <p>The tritone paradox involves playing C followed by F# - some hear it as going up, others as going down!</p>
            `;
        }
    }

    registerVote(direction) {
        const arrow = this.$('#direction-arrow');

        if (direction === 'ascending') {
            arrow.textContent = '\\u2191';
            arrow.className = 'direction-arrow ascending';
            this.$('#ascending-bar').style.width = '55%';
            this.$('#ascending-bar').textContent = 'You + ~50%';
            this.$('#descending-bar').style.width = '45%';
            this.$('#descending-bar').textContent = '~45%';

            this.$('#result').innerHTML = `
                <p style="color: #22c55e;"><strong>You heard ASCENDING!</strong></p>
                <p>You perceived F# as higher than C. About half of listeners agree with you.</p>
                <p>This may relate to your linguistic background and pitch patterns in your native language.</p>
            `;
        } else {
            arrow.textContent = '\\u2193';
            arrow.className = 'direction-arrow descending';
            this.$('#descending-bar').style.width = '55%';
            this.$('#descending-bar').textContent = 'You + ~50%';
            this.$('#ascending-bar').style.width = '45%';
            this.$('#ascending-bar').textContent = '~45%';

            this.$('#result').innerHTML = `
                <p style="color: #dc2626;"><strong>You heard DESCENDING!</strong></p>
                <p>You perceived F# as lower than C. About half of listeners agree with you.</p>
                <p>This may relate to your linguistic background and pitch patterns in your native language.</p>
            `;
        }
    }

    stopSound() {
        this.currentOscillators.forEach(({ osc, gain }) => {
            try {
                gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.05);
                setTimeout(() => osc.stop(), 50);
            } catch (e) {}
        });
        this.currentOscillators = [];

        this.$('#tone1').classList.remove('playing');
        this.$('#tone2').classList.remove('playing');
    }

    cleanup() {
        this.stopSound();
        if (this.audioContext) {
            this.audioContext.close();
        }
    }
}

customElements.define('tritone-simulator', TritoneSimulator);

export { TritoneSimulator };
