import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Import the paradoxes data
const { categories, paradoxes } = await import(path.join(rootDir, 'data/paradoxes.js'));

const docsDir = path.join(rootDir, 'docs');
const paradoxesDir = path.join(docsDir, 'paradoxes');

// Category ID to folder name mapping
const categoryFolders = {
  mathematical: 'mathematical',
  physics: 'physics',
  social: 'social',
  technology: 'technology',
  scientific: 'scientific',
  probability: 'probability',
  infinity: 'infinity',
  advanced: 'advanced',
  behavior: 'behavior',
  economics: 'economics',
  philosophy: 'philosophy',
  decisions: 'decisions',
  quantum: 'quantum',
  logic: 'logic'
};

// Create category directories
for (const folder of Object.values(categoryFolders)) {
  const dir = path.join(paradoxesDir, folder);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Generate markdown for each paradox
function generateParadoxMarkdown(paradox) {
  const category = categories.find(c => c.id === paradox.category);
  const categoryTitle = category ? category.title : paradox.category;
  const points = typeof paradox.points === 'number' ? paradox.points : paradox.points;

  let content = `---
title: "${paradox.title.replace(/"/g, '\\"')}"
description: "${paradox.description.replace(/"/g, '\\"')}"
category: ${paradox.category}
source: ${paradox.source}
points: ${points}
simulator: ${paradox.simulator || 'null'}
---

# ${paradox.title}

<div class="paradox-meta">
  <span class="badge ${paradox.source}">${paradox.source === 'hn' ? 'Hacker News' : 'Wikipedia'}</span>
  <span class="points">${typeof points === 'number' ? points + ' points' : points}</span>
</div>

${paradox.description}

`;

  // Add simulator if available
  if (paradox.simulator) {
    content += `
## Interactive Simulator

<ClientOnly>
  <${paradox.simulator}></${paradox.simulator}>
</ClientOnly>

`;
  }

  content += `
## Category

This paradox belongs to the **${categoryTitle}** category.
`;

  return content;
}

// Generate sidebar config
function generateSidebarConfig() {
  const sidebar = {};

  for (const category of categories) {
    const categoryParadoxes = paradoxes.filter(p => p.category === category.id);
    const folder = categoryFolders[category.id];

    sidebar[category.id] = {
      text: category.title.replace(' Paradoxes', ''),
      collapsed: category.id !== 'mathematical',
      items: categoryParadoxes.map(p => ({
        text: p.title,
        link: `/paradoxes/${folder}/${p.id}`
      }))
    };
  }

  return sidebar;
}

// Write individual paradox pages
let count = 0;
for (const paradox of paradoxes) {
  const folder = categoryFolders[paradox.category];
  const filePath = path.join(paradoxesDir, folder, `${paradox.id}.md`);
  const content = generateParadoxMarkdown(paradox);
  fs.writeFileSync(filePath, content);
  count++;
}

console.log(`Generated ${count} paradox pages`);

// Generate category index pages
for (const category of categories) {
  const folder = categoryFolders[category.id];
  const categoryParadoxes = paradoxes.filter(p => p.category === category.id);

  let indexContent = `---
title: "${category.title}"
---

# ${category.title}

<div class="paradox-grid">
`;

  for (const p of categoryParadoxes) {
    const points = typeof p.points === 'number' ? p.points : p.points;
    indexContent += `
- [**${p.title}**](./${p.id}) - ${p.description.substring(0, 100)}...
`;
  }

  indexContent += `
</div>
`;

  fs.writeFileSync(path.join(paradoxesDir, folder, 'index.md'), indexContent);
}

console.log(`Generated ${categories.length} category index pages`);

// Generate main paradoxes index
let mainIndex = `---
title: All Paradoxes
---

# All Paradoxes

Explore ${paradoxes.length} interactive paradoxes organized by category.

`;

for (const category of categories) {
  const folder = categoryFolders[category.id];
  const categoryParadoxes = paradoxes.filter(p => p.category === category.id);

  mainIndex += `
## [${category.title}](./${folder}/)

`;

  for (const p of categoryParadoxes.slice(0, 5)) {
    mainIndex += `- [${p.title}](./${folder}/${p.id})\n`;
  }

  if (categoryParadoxes.length > 5) {
    mainIndex += `- *...and ${categoryParadoxes.length - 5} more*\n`;
  }
}

fs.writeFileSync(path.join(paradoxesDir, 'index.md'), mainIndex);

// Generate by-points page
const sortedByPoints = [...paradoxes].sort((a, b) => {
  const aPoints = typeof a.points === 'number' ? a.points : 0;
  const bPoints = typeof b.points === 'number' ? b.points : 0;
  return bPoints - aPoints;
});

let byPointsContent = `---
title: Paradoxes by Points
---

# Paradoxes by Points

All paradoxes ranked by popularity.

| Rank | Paradox | Category | Points |
|------|---------|----------|--------|
`;

sortedByPoints.forEach((p, i) => {
  const folder = categoryFolders[p.category];
  const points = typeof p.points === 'number' ? p.points : p.points;
  byPointsContent += `| ${i + 1} | [${p.title}](/paradoxes/${folder}/${p.id}) | ${p.category} | ${points} |\n`;
});

fs.writeFileSync(path.join(docsDir, 'by-points.md'), byPointsContent);

// Generate updated sidebar config for VitePress
const sidebarConfig = generateSidebarConfig();

const configUpdate = `// Auto-generated sidebar configuration
export const paradoxSidebar = ${JSON.stringify(Object.values(sidebarConfig), null, 2)};
`;

fs.writeFileSync(path.join(docsDir, '.vitepress', 'sidebar.generated.mts'), configUpdate);

console.log('Generated sidebar configuration');
console.log('Done!');
