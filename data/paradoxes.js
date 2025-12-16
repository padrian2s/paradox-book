/**
 * Paradoxes Data
 * Edit this file to add, modify, or remove paradoxes
 * Each paradox has: id, title, points, description, category, simulator (optional)
 */

export const categories = [
    { id: 'mathematical', title: 'Mathematical & Statistical Paradoxes' },
    { id: 'physics', title: 'Physics Paradoxes' },
    { id: 'probability', title: 'Probability Paradoxes' },
    { id: 'social', title: 'Social & Behavioral Paradoxes' },
    { id: 'technology', title: 'Technology Paradoxes' },
    { id: 'philosophy', title: 'Philosophy Paradoxes' },
    { id: 'economics', title: 'Economics Paradoxes' },
    { id: 'logic', title: 'Logic Paradoxes' },
    { id: 'decision', title: 'Decision Theory Paradoxes' },
    { id: 'game', title: 'Game Theory Paradoxes' }
];

export const paradoxes = [
    // Mathematical & Statistical
    {
        id: 'potato',
        title: 'Potato Paradox',
        points: 559,
        description: '100 lbs of potatoes that are 99% water. After drying to 98% water, they weigh only 50 lbs. A 1% change causes a 50% weight loss!',
        category: 'mathematical',
        simulator: 'potato-simulator'
    },
    {
        id: 'simpson',
        title: "Simpson's Paradox",
        points: 370,
        description: 'A trend appears in several groups but disappears or reverses when groups are combined. A treatment can look better in every subgroup but worse overall!',
        category: 'mathematical',
        simulator: 'simpson-simulator'
    },
    {
        id: 'st-petersburg',
        title: 'St. Petersburg Paradox',
        points: 144,
        description: 'A casino game with infinite expected value. Yet nobody would pay more than a few dollars to play it. Why?',
        category: 'mathematical',
        simulator: 'stpetersburg-simulator'
    },
    {
        id: 'braess',
        title: "Braess' Paradox",
        points: 98,
        description: 'Adding a road to a traffic network can make everyone\'s commute WORSE. Counter-intuitively, removing roads can improve traffic.',
        category: 'mathematical',
        simulator: 'braess-simulator'
    },
    {
        id: 'coastline',
        title: 'Coastline Paradox',
        points: 120,
        description: 'The measured length of a coastline depends on the ruler used. Smaller rulers give longer measurements - approaching infinity!',
        category: 'mathematical',
        simulator: 'coastline-simulator'
    },
    {
        id: 'hilbert',
        title: "Hilbert's Hotel",
        points: 95,
        description: 'A hotel with infinite rooms is full, yet can always accommodate more guests. Infinity plus one equals infinity!',
        category: 'mathematical',
        simulator: 'hilbert-simulator'
    },
    {
        id: 'interesting-number',
        title: 'Interesting Number Paradox',
        points: 32,
        description: 'Every natural number is interesting. Proof: If not, the smallest uninteresting number would be interesting by being the smallest!',
        category: 'mathematical',
        simulator: 'interesting-number-simulator'
    },
    {
        id: 'ant-rope',
        title: 'Ant on a Rubber Rope',
        points: 78,
        description: 'An ant crawls on an infinitely stretching rope. Despite the rope growing faster than the ant walks, the ant will eventually reach the end!',
        category: 'mathematical',
        simulator: 'ant-rope-simulator'
    },
    {
        id: 'triangle',
        title: 'Missing Square Puzzle',
        points: 65,
        description: 'Rearrange pieces of a triangle and a square appears or disappears. Where does the extra area come from?',
        category: 'mathematical',
        simulator: 'triangle-simulator'
    },

    // Probability
    {
        id: 'birthday',
        title: 'Birthday Paradox',
        points: 86,
        description: 'In a group of just 23 people, there\'s a 50% chance two share a birthday. With 70 people, it\'s 99.9%!',
        category: 'probability',
        simulator: 'birthday-simulator'
    },
    {
        id: 'monty-hall',
        title: 'Monty Hall Problem',
        points: 'Classic',
        description: 'You pick a door. The host opens another revealing a goat. Should you switch? Yes! Switching wins 2/3 of the time.',
        category: 'probability',
        simulator: 'monty-hall-simulator'
    },
    {
        id: 'two-envelopes',
        title: 'Two Envelopes Paradox',
        points: 43,
        description: 'Two envelopes contain money, one double the other. You pick one. Should you switch? The math says yes - forever!',
        category: 'probability',
        simulator: 'two-envelopes-simulator'
    },
    {
        id: 'berkson',
        title: "Berkson's Paradox",
        points: 87,
        description: 'Selection bias creates spurious negative correlations. Why do attractive people seem less nice? It\'s the selection!',
        category: 'probability',
        simulator: 'berkson-simulator'
    },
    {
        id: 'boy-girl',
        title: 'Boy or Girl Paradox',
        points: 55,
        description: 'A family has two children. One is a boy. What\'s the probability both are boys? It depends on how you learned this information!',
        category: 'probability',
        simulator: 'boy-girl-simulator'
    },
    {
        id: 'envelope',
        title: 'Exchange Paradox',
        points: 48,
        description: 'You have an envelope with money. You can switch for another that has either half or double. Should you always switch?',
        category: 'probability',
        simulator: 'envelope-simulator'
    },

    // Physics
    {
        id: 'fermi',
        title: 'Fermi Paradox',
        points: 223,
        description: 'The universe is vast and old. Where is everybody? The apparent contradiction between lack of evidence for extraterrestrial civilizations.',
        category: 'physics',
        simulator: 'fermi-simulator'
    },
    {
        id: 'grandfather',
        title: 'Grandfather Paradox',
        points: 154,
        description: 'If you travel back in time and prevent your grandfather from meeting your grandmother, you could never be born to travel back...',
        category: 'physics',
        simulator: 'grandfather-simulator'
    },
    {
        id: 'olbers',
        title: "Olbers' Paradox",
        points: 264,
        description: 'If the universe is infinite with infinite stars, why is the night sky dark? The answer involves the finite age of the universe.',
        category: 'physics',
        simulator: 'olbers-simulator'
    },
    {
        id: 'twin',
        title: 'Twin Paradox',
        points: 0,
        description: 'One twin travels at near light speed. When they reunite, the traveler is younger. Both see the other\'s clock running slow!',
        category: 'physics',
        simulator: null
    },
    {
        id: 'tea-leaf',
        title: 'Tea Leaf Paradox',
        points: 42,
        description: 'When you stir tea, the leaves gather in the center at the bottom, not at the edges. Einstein explained this in 1926!',
        category: 'physics',
        simulator: 'tea-leaf-simulator'
    },
    {
        id: 'golf-ball',
        title: 'Golf Ball Paradox',
        points: 38,
        description: 'Why do golf balls have dimples? Rough surfaces create less drag than smooth ones - counterintuitive aerodynamics!',
        category: 'physics',
        simulator: 'golf-ball-simulator'
    },
    {
        id: 'ladder',
        title: 'Ladder Paradox',
        points: 72,
        description: 'A ladder fits in a barn due to length contraction when moving fast. But from the ladder\'s view, the barn is shorter!',
        category: 'physics',
        simulator: 'ladder-simulator'
    },
    {
        id: 'pancake',
        title: 'Pancake Paradox',
        points: 35,
        description: 'Why are the first pancakes always worst? The pan needs to reach thermal equilibrium - science explains kitchen wisdom!',
        category: 'physics',
        simulator: 'pancake-simulator'
    },

    // Social & Behavioral
    {
        id: 'friendship',
        title: 'Friendship Paradox',
        points: 288,
        description: 'On average, your friends have more friends than you do. It\'s not you being unpopular - it\'s math!',
        category: 'social',
        simulator: 'friendship-simulator'
    },
    {
        id: 'jevons',
        title: 'Jevons Paradox',
        points: 98,
        description: 'Making something more efficient often increases total consumption. Better fuel efficiency → more driving → more gas used.',
        category: 'social',
        simulator: 'jevons-simulator'
    },
    {
        id: 'tolerance',
        title: 'Tolerance Paradox',
        points: 147,
        description: 'If a society is tolerant of intolerance, the intolerant will eventually destroy tolerance. Should we tolerate intolerance?',
        category: 'social',
        simulator: null
    },
    {
        id: 'abilene',
        title: 'Abilene Paradox',
        points: 11,
        description: 'A group collectively decides on a course of action that is counter to the preferences of all individuals in the group.',
        category: 'social',
        simulator: 'abilene-simulator'
    },
    {
        id: 'choice',
        title: 'Paradox of Choice',
        points: 54,
        description: 'More options lead to less satisfaction. With too many choices, we become paralyzed and less happy with any decision.',
        category: 'social',
        simulator: null
    },
    {
        id: 'stockdale',
        title: 'Stockdale Paradox',
        points: 89,
        description: 'You must maintain unwavering faith you will prevail, while confronting the brutal facts of your reality.',
        category: 'social',
        simulator: 'stockdale-simulator'
    },
    {
        id: 'service-recovery',
        title: 'Service Recovery Paradox',
        points: 67,
        description: 'Customers who experience a problem that gets well resolved become more loyal than those who never had a problem!',
        category: 'social',
        simulator: 'service-recovery-simulator'
    },
    {
        id: 'waiting',
        title: 'Waiting Paradox',
        points: 45,
        description: 'The longer you\'ve waited for a bus, the longer you\'re likely to have to wait. Past waiting doesn\'t predict arrival!',
        category: 'social',
        simulator: 'waiting-simulator'
    },
    {
        id: 'region-beta',
        title: 'Region-Beta Paradox',
        points: 58,
        description: 'Sometimes mild problems persist longer than severe ones because they don\'t trigger coping mechanisms.',
        category: 'social',
        simulator: 'region-beta-simulator'
    },

    // Technology
    {
        id: 'moravec',
        title: "Moravec's Paradox",
        points: 155,
        description: 'Hard problems are easy for AI (chess, math), while easy tasks are hard (walking, recognizing faces). What\'s intuitive for us is hard for machines.',
        category: 'technology',
        simulator: null
    },
    {
        id: 'automation',
        title: 'Automation Paradox',
        points: 19,
        description: 'The more reliable automated systems become, the less prepared humans are when they fail. Automation breeds complacency.',
        category: 'technology',
        simulator: 'automation-simulator'
    },
    {
        id: 'python',
        title: 'Python Paradox',
        points: 148,
        description: 'Companies using Python attract better programmers, not because Python is best, but because choosing Python signals openness to doing things right.',
        category: 'technology',
        simulator: null
    },
    {
        id: 'blub',
        title: 'Blub Paradox',
        points: 82,
        description: 'Programmers can recognize languages less powerful than theirs, but not more powerful ones. You can\'t see what you don\'t know.',
        category: 'technology',
        simulator: 'blub-simulator'
    },
    {
        id: 'privacy',
        title: 'Privacy Paradox',
        points: 63,
        description: 'People claim to value privacy but readily give away personal data. Our stated preferences don\'t match our behavior.',
        category: 'technology',
        simulator: 'privacy-simulator'
    },
    {
        id: 'preparedness',
        title: 'Preparedness Paradox',
        points: 56,
        description: 'When disaster preparation works, people think the preparation was unnecessary. Success makes prevention seem pointless.',
        category: 'technology',
        simulator: 'preparedness-simulator'
    },

    // Philosophy
    {
        id: 'ship-theseus',
        title: 'Ship of Theseus',
        points: 10,
        description: 'If you replace every plank of a ship over time, is it still the same ship? What about the ship rebuilt from old planks?',
        category: 'philosophy',
        simulator: 'ship-theseus-simulator'
    },
    {
        id: 'zeno',
        title: "Zeno's Paradox",
        points: 47,
        description: 'To reach a destination, you must first go halfway, then half of that... infinitely. Motion is impossible! (But calculus saves us.)',
        category: 'philosophy',
        simulator: 'zeno-simulator'
    },

    // Economics
    {
        id: 'thrift',
        title: 'Paradox of Thrift',
        points: 6,
        description: 'If everyone saves more during a recession, total savings may actually decrease because spending and income fall.',
        category: 'economics',
        simulator: 'thrift-simulator'
    },
    {
        id: 'dollar-auction',
        title: 'Dollar Auction Paradox',
        points: 6,
        description: 'An auction where the second-highest bidder also pays. Rational bidding leads to paying more than a dollar for a dollar!',
        category: 'economics',
        simulator: 'dollar-auction-simulator'
    },

    // Logic
    {
        id: 'liar',
        title: "Liar's Paradox",
        points: 4,
        description: '"This statement is false." If true, it\'s false. If false, it\'s true. Self-reference creates logical paradox.',
        category: 'logic',
        simulator: 'liar-simulator'
    },
    {
        id: 'russell',
        title: "Russell's Paradox",
        points: 15,
        description: 'Does the set of all sets that don\'t contain themselves contain itself? If yes, then no. If no, then yes.',
        category: 'logic',
        simulator: 'russell-simulator'
    },
    {
        id: 'sorites',
        title: 'Sorites Paradox',
        points: 59,
        description: 'How many grains make a heap? Remove one from a heap - still a heap. Repeat until one grain. When did it stop being a heap?',
        category: 'logic',
        simulator: null
    },
    {
        id: 'ross',
        title: "Ross's Paradox",
        points: 28,
        description: 'If you may post a letter, does it follow you may post or burn it? Modal logic shows that permissions don\'t combine as expected.',
        category: 'logic',
        simulator: 'ross-simulator'
    },

    // Decision Theory
    {
        id: 'newcomb',
        title: "Newcomb's Paradox",
        points: 112,
        description: 'A predictor has predicted your choice. One box or two? Game theory and free will clash in this decision puzzle.',
        category: 'decision',
        simulator: 'newcomb-simulator'
    },
    {
        id: 'ellsberg',
        title: 'Ellsberg Paradox',
        points: 76,
        description: 'People prefer known risks over unknown risks, violating expected utility theory. Ambiguity aversion affects decisions.',
        category: 'decision',
        simulator: 'ellsberg-simulator'
    },
    {
        id: 'necktie',
        title: 'Necktie Paradox',
        points: 41,
        description: 'Two people bet on whose necktie is more expensive. Both think they have an advantage - but both can\'t be right!',
        category: 'decision',
        simulator: 'necktie-simulator'
    },

    // Game Theory
    {
        id: 'parrondo',
        title: "Parrondo's Paradox",
        points: 95,
        description: 'Two losing games can combine into a winning strategy. Sometimes alternating between bad choices creates good outcomes!',
        category: 'game',
        simulator: 'parrondo-simulator'
    }
];

// Helper function to get paradoxes by category
export function getParadoxesByCategory(categoryId) {
    return paradoxes.filter(p => p.category === categoryId);
}

// Helper function to get all paradoxes sorted by points
export function getParadoxesByPoints(descending = true) {
    return [...paradoxes].sort((a, b) => {
        const aPoints = typeof a.points === 'number' ? a.points : 0;
        const bPoints = typeof b.points === 'number' ? b.points : 0;
        return descending ? bPoints - aPoints : aPoints - bPoints;
    });
}

// Helper function to search paradoxes
export function searchParadoxes(query) {
    const lowerQuery = query.toLowerCase();
    return paradoxes.filter(p =>
        p.title.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery)
    );
}
