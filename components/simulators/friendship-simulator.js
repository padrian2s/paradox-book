/**
 * Friendship Paradox Simulator
 * Demonstrates that on average, your friends have more friends than you do
 */
import { SimulatorBase } from '../simulator-base.js';

class FriendshipSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .stat-box {
                    background: var(--bg, #0f172a);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .stat-value {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--primary, #6366f1);
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                .canvas-container {
                    margin-top: 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    overflow: hidden;
                }

                canvas {
                    display: block;
                    width: 100%;
                    height: auto;
                }

                .legend {
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                    margin-top: 0.5rem;
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }

                .legend-item {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                }

                .legend-dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                }

                .legend-dot.popular {
                    background: #6366f1;
                }

                .legend-dot.unpopular {
                    background: #ef4444;
                }

                @media (max-width: 600px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }

                    .stat-box {
                        padding: 0.75rem;
                    }

                    .stat-value {
                        font-size: 1.25rem;
                    }
                }
            </style>

            <h4>Social Network Simulator</h4>

            <div class="controls">
                <div class="control-group">
                    <label>Number of People</label>
                    <input type="number" id="people" value="20" min="5" max="50">
                </div>
                <div class="control-group">
                    <label>Connection Probability: <span id="prob-val">25%</span></label>
                    <input type="range" id="prob" min="10" max="60" value="25">
                </div>
                <button id="generate-btn">Generate Network</button>
            </div>

            <div class="canvas-container">
                <canvas id="network-canvas" width="600" height="300"></canvas>
            </div>

            <div class="legend">
                <div class="legend-item">
                    <div class="legend-dot popular"></div>
                    <span>Above avg friends</span>
                </div>
                <div class="legend-item">
                    <div class="legend-dot unpopular"></div>
                    <span>Below avg friends</span>
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="avg-friends">0</div>
                    <div class="stat-label">Avg Friends</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="avg-fof">0</div>
                    <div class="stat-label">Avg Friends-of-Friends</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="less-popular-pct">0%</div>
                    <div class="stat-label">People w/ Less Popular Friends</div>
                </div>
            </div>

            <div class="result">
                <p id="explanation">Generate a network to see the paradox in action!</p>
            </div>

            <div class="insight">
                This isn't just statistics - it affects your perception of social media. You see your popular friends' posts more, making everyone seem more social than you.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#prob').addEventListener('input', () => this.updateProbLabel());
        this.$('#generate-btn').addEventListener('click', () => this.generateNetwork());

        this.generateNetwork();
    }

    updateProbLabel() {
        const prob = this.$('#prob').value;
        this.$('#prob-val').textContent = prob + '%';
    }

    generateNetwork() {
        const n = parseInt(this.$('#people').value) || 20;
        const prob = parseFloat(this.$('#prob').value) / 100;
        this.$('#prob-val').textContent = (prob * 100) + '%';

        const adj = Array(n).fill(null).map(() => []);

        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                if (Math.random() < prob) {
                    adj[i].push(j);
                    adj[j].push(i);
                }
            }
        }

        const friendCounts = adj.map(a => a.length);
        const avgFriends = friendCounts.reduce((a, b) => a + b, 0) / n;

        let totalFoF = 0;
        let totalConnections = 0;
        for (let i = 0; i < n; i++) {
            for (const friend of adj[i]) {
                totalFoF += adj[friend].length;
                totalConnections++;
            }
        }
        const avgFoF = totalConnections > 0 ? totalFoF / totalConnections : 0;

        let lessPopular = 0;
        for (let i = 0; i < n; i++) {
            if (adj[i].length > 0) {
                const friendAvg = adj[i].reduce((sum, f) => sum + adj[f].length, 0) / adj[i].length;
                if (adj[i].length < friendAvg) lessPopular++;
            }
        }

        this.$('#avg-friends').textContent = avgFriends.toFixed(1);
        this.$('#avg-fof').textContent = avgFoF.toFixed(1);
        this.$('#less-popular-pct').textContent = Math.round(lessPopular / n * 100) + '%';

        this.$('#explanation').textContent =
            `Your friends have ${avgFoF.toFixed(1)} friends on average, while you have ${avgFriends.toFixed(1)}. ` +
            `${Math.round(lessPopular / n * 100)}% of people have friends more popular than themselves!`;

        this.drawNetwork(adj, friendCounts, avgFriends, n);
    }

    drawNetwork(adj, friendCounts, avgFriends, n) {
        const canvas = this.$('#network-canvas');
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#1e293b';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const radius = Math.min(cx, cy) - 40;

        const positions = [];
        for (let i = 0; i < n; i++) {
            const angle = (2 * Math.PI * i) / n - Math.PI / 2;
            positions.push({
                x: cx + radius * Math.cos(angle),
                y: cy + radius * Math.sin(angle)
            });
        }

        ctx.strokeStyle = 'rgba(99, 102, 241, 0.3)';
        ctx.lineWidth = 1;
        for (let i = 0; i < n; i++) {
            for (const j of adj[i]) {
                if (j > i) {
                    ctx.beginPath();
                    ctx.moveTo(positions[i].x, positions[i].y);
                    ctx.lineTo(positions[j].x, positions[j].y);
                    ctx.stroke();
                }
            }
        }

        const maxFriends = Math.max(...friendCounts, 1);
        for (let i = 0; i < n; i++) {
            const nodeSize = 5 + (friendCounts[i] / maxFriends) * 15;
            ctx.beginPath();
            ctx.arc(positions[i].x, positions[i].y, nodeSize, 0, Math.PI * 2);
            ctx.fillStyle = friendCounts[i] >= avgFriends ? '#6366f1' : '#ef4444';
            ctx.fill();
        }
    }
}

customElements.define('friendship-simulator', FriendshipSimulator);

export { FriendshipSimulator };
