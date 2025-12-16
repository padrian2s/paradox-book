export const categories = [
    { id: 'mathematical', title: 'Mathematical & Statistical Paradoxes' },
    { id: 'physics', title: 'Physics Paradoxes' },
    { id: 'social', title: 'Social & Behavioral Paradoxes' },
    { id: 'technology', title: 'Technology Paradoxes' },
    { id: 'scientific', title: 'Scientific Paradoxes' },
    { id: 'probability', title: 'Probability Paradoxes' },
    { id: 'infinity', title: 'Infinity & Sets Paradoxes' },
    { id: 'advanced', title: 'Advanced Probability Paradoxes' },
    { id: 'behavior', title: 'Identity & Behavior Paradoxes' },
    { id: 'economics', title: 'Economics Paradoxes' },
    { id: 'philosophy', title: 'Philosophy Paradoxes' },
    { id: 'decisions', title: 'Decision Theory Paradoxes' },
    { id: 'quantum', title: 'Quantum & Self-Reference Paradoxes' },
    { id: 'logic', title: 'Logic Paradoxes' }
];

export const paradoxes = [
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
        description: 'A game with INFINITE expected value, yet no rational person would pay much to play. Flip coins until tails - win $2^n where n is the number of flips.',
        category: 'mathematical',
        simulator: 'stpetersburg-simulator'
    },
    {
        id: 'braess',
        title: "Braess' Paradox",
        points: 98,
        description: 'Adding a new road to a traffic network can actually INCREASE travel time for everyone. Removing roads can sometimes improve traffic!',
        category: 'mathematical',
        simulator: 'braess-simulator'
    },
    {
        id: 'fermi',
        title: 'Fermi Paradox',
        points: 223,
        description: 'Given the high probability of alien civilizations, why have we found no evidence of them? The universe should be teeming with life!',
        category: 'physics',
        simulator: 'fermi-simulator'
    },
    {
        id: 'grandfather',
        title: 'Grandfather Paradox',
        points: 154,
        description: "If you travel back in time and prevent your grandparents from meeting, you'd never be born - so you couldn't have traveled back!",
        category: 'physics',
        simulator: 'grandfather-simulator'
    },
    {
        id: 'olbers',
        title: "Olbers' Paradox",
        points: 264,
        description: "If the universe is infinite and eternal, why isn't the night sky blazingly bright? Every line of sight should hit a star eventually.",
        category: 'physics',
        simulator: 'olbers-simulator'
    },
    {
        id: 'friendship',
        title: 'Friendship Paradox',
        points: 288,
        description: 'On average, your friends have more friends than you do. This is a mathematical certainty!',
        category: 'social',
        simulator: 'friendship-simulator'
    },
    {
        id: 'jevons',
        title: 'Jevons Paradox',
        points: 98,
        description: 'Increasing efficiency in resource use often leads to INCREASED total consumption, not decreased!',
        category: 'social',
        simulator: 'jevons-simulator'
    },
    {
        id: 'waiting',
        title: 'Waiting Time Paradox',
        points: 345,
        description: "If buses arrive every 10 minutes on average, your expected wait is NOT 5 minutes - it's longer!",
        category: 'social',
        simulator: 'waiting-simulator'
    },
    {
        id: 'moravec',
        title: "Moravec's Paradox",
        points: 155,
        description: 'Tasks easy for humans (walking, face recognition) are hard for computers. Tasks hard for humans (chess, math) are easy for computers!',
        category: 'technology',
        simulator: 'moravec-simulator'
    },
    {
        id: 'tog',
        title: "Tog's Paradox",
        points: 260,
        description: "Users believe they're faster with keyboard shortcuts, but studies show mouse users are often faster. The feeling of speed doesn't match reality!",
        category: 'technology',
        simulator: 'tog-simulator'
    },
    {
        id: 'solow',
        title: 'Solow Paradox',
        points: 97,
        description: '"You can see the computer age everywhere but in the productivity statistics." Despite massive IT investment, productivity gains have been disappointing.',
        category: 'technology',
        simulator: 'solow-simulator'
    },
    {
        id: 'peto',
        title: "Peto's Paradox",
        points: 142,
        description: "Large animals like elephants should have much higher cancer rates (more cells = more chances for cancer), but they don't!",
        category: 'scientific',
        simulator: 'peto-simulator'
    },
    {
        id: 'efficient-market',
        title: 'Efficient Market Paradox',
        points: 95,
        description: "If markets are perfectly efficient, there's no point analyzing stocks. But if nobody analyzes, markets can't be efficient!",
        category: 'scientific',
        simulator: 'efficient-market-simulator'
    },
    {
        id: 'tolerance',
        title: 'Tolerance Paradox',
        points: 147,
        description: 'A tolerant society must be intolerant of intolerance, otherwise the intolerant will destroy tolerance itself.',
        category: 'scientific',
        simulator: 'tolerance-simulator'
    },
    {
        id: 'birthday',
        title: 'Birthday Paradox',
        points: 86,
        description: "In a room of just 23 people, there's a 50% chance two share a birthday. With 70 people, it's 99.9% certain!",
        category: 'probability',
        simulator: 'birthday-simulator'
    },
    {
        id: 'monty-hall',
        title: 'Monty Hall Problem',
        points: 'Classic',
        description: 'Pick a door. The host opens another door showing a goat. Should you switch? YES - switching gives you 2/3 odds!',
        category: 'probability',
        simulator: 'monty-hall-simulator'
    },
    {
        id: 'berkson',
        title: "Berkson's Paradox",
        points: 87,
        description: "Selection bias creates false correlations. Among Hollywood actors, talent and attractiveness seem negatively correlated - but only because you need at least one to get selected!",
        category: 'probability',
        simulator: 'berkson-simulator'
    },
    {
        id: 'zeno',
        title: "Zeno's Paradox",
        points: 47,
        description: 'To reach a destination, you must first travel half the distance, then half of what remains, forever. How can you complete infinite steps?',
        category: 'infinity',
        simulator: 'zeno-simulator'
    },
    {
        id: 'coastline',
        title: 'Coastline Paradox',
        points: 63,
        description: 'The length of a coastline depends on the ruler size! Smaller rulers reveal more detail, making the coast infinitely long.',
        category: 'infinity',
        simulator: 'coastline-simulator'
    },
    {
        id: 'hilbert',
        title: "Hilbert's Hotel",
        points: 60,
        description: 'A hotel with infinite rooms, all full, can still accommodate infinitely many new guests!',
        category: 'infinity',
        simulator: 'hilbert-simulator'
    },
    {
        id: 'two-envelopes',
        title: 'Two Envelopes Paradox',
        points: 43,
        description: "Two envelopes - one has twice as much money. You pick one. Should you switch? The math says always switch... but that can't be right!",
        category: 'advanced',
        simulator: 'two-envelopes-simulator'
    },
    {
        id: 'boy-girl',
        title: 'Boy/Girl Paradox',
        points: 8,
        description: '"I have two children. At least one is a boy." What\'s the probability both are boys? Intuition says 1/2, but it\'s 1/3!',
        category: 'advanced',
        simulator: 'boy-girl-simulator'
    },
    {
        id: 'ant-rope',
        title: 'Ant on a Rubber Rope',
        points: 9,
        description: 'An ant crawls 1 cm/s on a rubber rope that stretches 1 km/s. Will it ever reach the end? Impossibly, YES!',
        category: 'advanced',
        simulator: 'ant-rope-simulator'
    },
    {
        id: 'ladder',
        title: 'Ladder Paradox',
        points: 31,
        description: "A 20-foot ladder moves at 0.9c. Can it fit in a 10-foot garage? From the garage's view: YES. From the ladder's view: the garage is even SHORTER! Both are correct!",
        category: 'advanced',
        simulator: 'ladder-simulator'
    },
    {
        id: 'tea-leaf',
        title: 'Tea Leaf Paradox',
        points: 12,
        description: 'When you stir tea, why do the leaves gather in the CENTER, not the edges? Centrifugal force should push them out!',
        category: 'advanced',
        simulator: 'tea-leaf-simulator'
    },
    {
        id: 'russell',
        title: "Russell's Paradox",
        points: 15,
        description: "Consider the set of all sets that don't contain themselves. Does it contain itself? If yes, then no. If no, then yes!",
        category: 'advanced',
        simulator: 'russell-simulator'
    },
    {
        id: 'necktie',
        title: 'Necktie Paradox',
        points: 5,
        description: "Two men bet their neckties: whoever has the cheaper one wins both. Each reasons: \"I might lose mine, but could win a more expensive one!\" Both think they have the advantage!",
        category: 'advanced',
        simulator: 'necktie-simulator'
    },
    {
        id: 'service-recovery',
        title: 'Service Recovery Paradox',
        points: 7,
        description: 'Customers who experience a service failure and then get excellent recovery are MORE satisfied than customers who never had a problem!',
        category: 'advanced',
        simulator: 'service-recovery-simulator'
    },
    {
        id: 'ship-theseus',
        title: 'Ship of Theseus',
        points: 10,
        description: 'If you replace every plank of a ship one by one, is the final ship the same ship? What if you build a new ship from the old planks?',
        category: 'behavior',
        simulator: 'ship-theseus-simulator'
    },
    {
        id: 'abilene',
        title: 'Abilene Paradox',
        points: 11,
        description: 'A group collectively decides on something no individual member actually wants, because everyone assumes others want it.',
        category: 'behavior',
        simulator: 'abilene-simulator'
    },
    {
        id: 'stockdale',
        title: 'Stockdale Paradox',
        points: 23,
        description: 'You must maintain unwavering faith you will prevail AND confront the brutal facts of your reality. Pure optimists died first in POW camps.',
        category: 'behavior',
        simulator: 'stockdale-simulator'
    },
    {
        id: 'triangle',
        title: 'Triangle Dissection Paradox',
        points: 15,
        description: 'Cut a triangle into pieces and rearrange them into the "same" shape - but with an extra square! Where does the extra area come from?',
        category: 'behavior',
        simulator: 'triangle-simulator'
    },
    {
        id: 'dollar-auction',
        title: 'Dollar Auction Paradox',
        points: 6,
        description: 'An auction where ALL bidders pay their bids, but only the winner gets the prize. Rational players get trapped into bidding far more than the prize is worth!',
        category: 'economics',
        simulator: 'dollar-auction-simulator'
    },
    {
        id: 'thrift',
        title: 'Paradox of Thrift',
        points: 6,
        description: 'If everyone saves more during a recession, aggregate demand falls, making the recession worse. Individual prudence becomes collective disaster.',
        category: 'economics',
        simulator: 'thrift-simulator'
    },
    {
        id: 'automation',
        title: 'Automation Paradox',
        points: 19,
        description: 'The more reliable automation becomes, the less humans practice manual operation. When rare failures occur, humans are unprepared - making failures catastrophic.',
        category: 'economics',
        simulator: 'automation-simulator'
    },
    {
        id: 'preparedness',
        title: 'Preparedness Paradox',
        points: 6,
        description: 'When disaster preparation works, nothing bad happens - making the preparation look like an overreaction. Y2K is often mocked, but massive effort prevented real problems.',
        category: 'economics',
        simulator: 'preparedness-simulator'
    },
    {
        id: 'blub',
        title: 'Blub Paradox',
        points: 19,
        description: "Programmers can look \"down\" at less powerful languages and see what's missing, but can't look \"up\" at more powerful languages and see what they're missing.",
        category: 'philosophy',
        simulator: 'blub-simulator'
    },
    {
        id: 'privacy',
        title: 'Privacy Paradox',
        points: 11,
        description: 'People claim to value privacy highly but consistently fail to act on it, sharing personal data freely despite knowing the risks.',
        category: 'philosophy',
        simulator: 'privacy-simulator'
    },
    {
        id: 'golf-ball',
        title: 'Golf Ball Paradox',
        points: 9,
        description: 'Dimpled golf balls fly farther than smooth ones. Counter-intuitively, surface roughness REDUCES drag by creating a turbulent boundary layer.',
        category: 'philosophy',
        simulator: 'golf-ball-simulator'
    },
    {
        id: 'pancake',
        title: 'Pancake Paradox',
        points: 8,
        description: 'The first pancake is always bad because you need to cook one to calibrate the pan temperature. Some systems require failure to achieve success.',
        category: 'philosophy',
        simulator: 'pancake-simulator'
    },
    {
        id: 'newcomb',
        title: "Newcomb's Paradox",
        points: 5,
        description: "A predictor who is almost always right offers two boxes. Box A has $1,000 (visible). Box B has either $1M or $0, depending on whether the predictor thought you'd take one box or both.",
        category: 'decisions',
        simulator: 'newcomb-simulator'
    },
    {
        id: 'parrondo',
        title: "Parrondo's Paradox",
        points: 4,
        description: 'Two losing gambling strategies can be combined to create a winning strategy! By alternating between them, you can come out ahead.',
        category: 'decisions',
        simulator: 'parrondo-simulator'
    },
    {
        id: 'ellsberg',
        title: 'Ellsberg Paradox',
        points: 4,
        description: "People prefer known risks over unknown risks, even when the expected values are identical. We're ambiguity-averse, not just risk-averse.",
        category: 'decisions',
        simulator: 'ellsberg-simulator'
    },
    {
        id: 'region-beta',
        title: 'Region-Beta Paradox',
        points: 5,
        description: "We often recover FASTER from intense negative events than mild ones. Severe trauma triggers coping mechanisms; minor annoyances don't.",
        category: 'decisions',
        simulator: 'region-beta-simulator'
    },
    {
        id: 'liar',
        title: "Liar's Paradox",
        points: 4,
        description: '"This sentence is false." If it\'s true, then it\'s false. If it\'s false, then it\'s true. 2,500 years old and still unsolved.',
        category: 'quantum',
        simulator: 'liar-simulator'
    },
    {
        id: 'ross-littlewood',
        title: 'Ross-Littlewood Paradox',
        points: 4,
        description: 'Add 10 balls to a vase, remove 1. Repeat infinitely before noon. How many balls at noon? Mathematically: ZERO!',
        category: 'quantum',
        simulator: 'ross-simulator'
    },
    {
        id: 'interesting-number',
        title: 'Interesting Number Paradox',
        points: 4,
        description: 'Every positive integer is interesting. Proof: The smallest uninteresting integer would be interesting for being the smallest!',
        category: 'quantum',
        simulator: 'interesting-number-simulator'
    },
    {
        id: 'paradoxical-intention',
        title: 'Paradoxical Intention',
        points: 4,
        description: 'Try to do what you fear. Insomniac? Try to stay awake. Anxious about blushing? Try to blush more. The paradoxical effort often solves the problem.',
        category: 'quantum',
        simulator: 'envelope-simulator'
    },
    {
        id: 'french',
        title: 'French Paradox',
        points: 3,
        description: 'The French eat rich food, butter, cheese, and drink wine - yet have lower heart disease rates than Americans. How can a high-fat diet be heart-healthy?',
        category: 'logic',
        simulator: 'french-paradox-simulator'
    },
    {
        id: 'buttered-cat',
        title: 'Buttered Cat Paradox',
        points: 3,
        description: "Cats always land on their feet. Buttered toast always lands butter-side down. What happens if you strap toast (butter up) to a cat's back?",
        category: 'logic',
        simulator: 'buttered-cat-simulator'
    },
    {
        id: 'raven',
        title: 'Raven Paradox',
        points: 3,
        description: 'To confirm "All ravens are black," seeing a black raven helps. But logically, seeing a green apple (non-black, non-raven) should also confirm it!',
        category: 'logic',
        simulator: 'raven-simulator'
    },
    {
        id: 'bell-theorem',
        title: "Bell's Theorem Paradox",
        points: 3,
        description: 'Quantum correlations violate classical probability rules. Measurements on entangled particles show results that are mathematically impossible under classical assumptions.',
        category: 'logic',
        simulator: 'bells-theorem-simulator'
    },
    {
        id: '2fa-backup',
        title: '2FA Backup Paradox',
        points: 3,
        description: 'Two-factor authentication needs backups for when you lose your device. But secure backups defeat the purpose of 2FA!',
        category: 'logic',
        simulator: 'twofa-backup-simulator'
    },
    {
        id: 'meritocracy',
        title: 'Paradox of Meritocracy',
        points: 3,
        description: 'Organizations that explicitly embrace meritocracy often become less fair. Believing the system is fair makes people less vigilant about bias.',
        category: 'logic',
        simulator: 'meritocracy-simulator'
    },
    {
        id: 'transparency',
        title: 'Transparency Paradox',
        points: 3,
        description: "More workplace transparency can backfire. When employees know they're being watched, they hide creative work and avoid risks.",
        category: 'logic',
        simulator: 'transparency-simulator'
    },
    {
        id: 'gender-equality',
        title: 'Gender-Equality Paradox',
        points: 3,
        description: 'Countries with more gender equality have fewer women in STEM. More freedom amplifies rather than eliminates gender differences in career preferences.',
        category: 'logic',
        simulator: 'gender-equality-simulator'
    },
    {
        id: 'aggregator',
        title: 'Aggregator Paradox',
        points: 3,
        description: "Platforms that aggregate content to serve users better eventually control that content. The aggregator's power to distribute becomes power over creation.",
        category: 'logic',
        simulator: 'aggregator-simulator'
    },
    {
        id: 'radioactive-wildlife',
        title: 'Radioactive Wildlife Paradox',
        points: 3,
        description: 'The Chernobyl exclusion zone is now a wildlife paradise. The absence of humans is better for animals than the presence of radiation is harmful.',
        category: 'logic',
        simulator: 'radioactive-wildlife-simulator'
    },
    {
        id: 'black-hole-info',
        title: 'Black Hole Information Paradox',
        points: 96,
        description: 'Information cannot be destroyed, but black holes seem to destroy everything. Where does the information go when a black hole evaporates?',
        category: 'physics',
        simulator: 'black-hole-simulator'
    },
    {
        id: 'archer',
        title: "Archer's Paradox",
        points: 276,
        description: "An arrow must flex around the bow handle to hit a target it's not initially pointed at!",
        category: 'physics',
        simulator: 'archer-simulator'
    },
    {
        id: 'hydrostatic',
        title: 'Hydrostatic Paradox',
        points: 4,
        description: 'Pressure at the bottom depends only on height, not container shape. A narrow tube exerts the same pressure as a wide tank!',
        category: 'physics',
        simulator: 'hydrostatic-simulator'
    },
    {
        id: 'faint-sun',
        title: 'Faint Sun Paradox',
        points: 15,
        description: 'The early Sun was 30% dimmer, yet Earth had liquid water. It should have been frozen!',
        category: 'physics',
        simulator: 'faint-sun-simulator'
    },
    {
        id: 'epr',
        title: 'EPR Paradox',
        points: 5,
        description: 'Measuring one entangled particle instantly affects another light-years away - "spooky action at a distance."',
        category: 'physics',
        simulator: 'epr-simulator'
    },
    {
        id: 'heat-death',
        title: 'Heat Death Paradox',
        points: 5,
        description: "If the universe were infinitely old, it would have reached maximum entropy. Why hasn't it?",
        category: 'physics',
        simulator: 'heat-death-simulator'
    },
    {
        id: 'banach-tarski',
        title: 'Banach-Tarski Paradox',
        points: 97,
        description: 'A sphere can be decomposed into pieces and reassembled into TWO identical spheres! Mathematical duplication!',
        category: 'physics',
        simulator: 'banach-tarski-simulator'
    },
    {
        id: 'two-capacitor',
        title: 'Two Capacitor Paradox',
        points: 438,
        description: 'Connect a charged capacitor to an empty one. Energy is lost! Where does it go?',
        category: 'physics',
        simulator: 'two-capacitor-simulator'
    },
    {
        id: 'python',
        title: 'Python Paradox',
        points: 148,
        description: "If a company uses a \"hard\" language, they'll get better programmers - those who learn for passion, not just jobs.",
        category: 'technology',
        simulator: 'python-paradox-simulator'
    },
    {
        id: 'static-site',
        title: 'Static Site Paradox',
        points: 546,
        description: 'Static sites are "simpler" but often require more complex tooling than dynamic sites!',
        category: 'technology',
        simulator: 'static-site-simulator'
    },
    {
        id: 'open-source',
        title: 'Open Source Paradox',
        points: 368,
        description: 'Companies give away code for free, yet make billions. How does giving away your product make money?',
        category: 'technology',
        simulator: 'opensource-simulator'
    },
    {
        id: 'captcha',
        title: 'Captcha Paradox',
        points: 13,
        description: 'CAPTCHAs designed to stop bots now train AI to be better at solving them!',
        category: 'technology',
        simulator: 'captcha-simulator'
    },
    {
        id: 'generative-ai',
        title: 'Generative AI Paradox',
        points: 5,
        description: 'What AI can create, it may not understand. LLMs generate sophisticated text without comprehension.',
        category: 'technology',
        simulator: 'generative-ai-simulator'
    },
    {
        id: 'ai-deskilling',
        title: 'AI Deskilling Paradox',
        points: 4,
        description: 'As AI handles more tasks, humans lose skills. But when AI fails, we need those skills most!',
        category: 'technology',
        simulator: 'ai-deskilling-simulator'
    },
    {
        id: 'miserable-programmer',
        title: 'Miserable Programmer Paradox',
        points: 154,
        description: 'The most productive programmers are often the most miserable - they see all the problems others miss.',
        category: 'technology',
        simulator: 'miserable-programmer-simulator'
    },
    {
        id: 'vibe-coding',
        title: 'Vibe Coding Paradox',
        points: 'NEW',
        description: 'AI removes friction from coding, but friction was where we decided what mattered. AI amplifies both excellence and dysfunction.',
        category: 'technology',
        simulator: 'vibe-coding-simulator'
    },
    {
        id: 'sleeping-beauty',
        title: 'Sleeping Beauty Paradox',
        points: 77,
        description: 'Sleeping Beauty is woken and asked the probability the coin was heads. Is it 1/2 or 1/3?',
        category: 'social',
        simulator: 'sleeping-beauty-simulator'
    },
    {
        id: 'unexpected-hanging',
        title: 'Unexpected Hanging Paradox',
        points: 77,
        description: 'A judge says: "You\'ll be hanged one day next week, and it will be a surprise." Can this ever be true?',
        category: 'social',
        simulator: 'unexpected-hanging-simulator'
    },
    {
        id: 'choice',
        title: 'Paradox of Choice',
        points: 54,
        description: 'More options should make us happier, but too many choices leads to anxiety and regret.',
        category: 'social',
        simulator: 'choice-simulator'
    },
    {
        id: 'willpower',
        title: 'Willpower Paradox',
        points: 91,
        description: 'People with more self-control use it less. They structure life to avoid temptation.',
        category: 'social',
        simulator: 'willpower-simulator'
    },
    {
        id: 'hedonism',
        title: 'Paradox of Hedonism',
        points: 10,
        description: 'Directly pursuing pleasure often leads to unhappiness. Happiness is a byproduct, not a goal.',
        category: 'social',
        simulator: 'hedonism-simulator'
    },
    {
        id: 'dating-app',
        title: 'Dating App Paradox',
        points: 251,
        description: 'Apps designed to help you find love make it harder. Infinite options = impossible choices.',
        category: 'social',
        simulator: 'dating-app-simulator'
    },
    {
        id: 'hispanic',
        title: 'Hispanic Paradox',
        points: 24,
        description: 'Hispanic Americans live longer than white Americans despite lower income and healthcare access.',
        category: 'social',
        simulator: 'hispanic-simulator'
    },
    {
        id: 'violence',
        title: 'Violence Paradox',
        points: 25,
        description: 'Despite news coverage, violence has dramatically declined over human history. We live in the most peaceful era ever.',
        category: 'social',
        simulator: 'violence-simulator'
    },
    {
        id: 'sorites',
        title: 'Sorites Paradox',
        points: 59,
        description: 'Remove one grain from a heap and it\'s still a heap. But repeat enough times and you have no heap. When does it stop being a heap?',
        category: 'logic',
        simulator: 'sorites-simulator'
    },
    {
        id: 'dome',
        title: 'Dome Paradox',
        points: 10,
        description: 'A ball balanced on a special dome can spontaneously start moving without any external cause, challenging Newtonian determinism.',
        category: 'logic',
        simulator: 'dome-simulator'
    },
    {
        id: 'bootstrap',
        title: 'Bootstrap Paradox',
        points: 10,
        description: "In time travel, information or objects exist without ever being created. Who composed Beethoven's symphonies if you gave them to him?",
        category: 'logic',
        simulator: 'bootstrap-simulator'
    },
    {
        id: 'bonini',
        title: "Bonini's Paradox",
        points: 88,
        description: 'As a model becomes more complete and realistic, it becomes harder to understand. A perfect model is as complex as reality itself.',
        category: 'logic',
        simulator: 'bonini-simulator'
    },
    {
        id: 'polanyi',
        title: "Polanyi's Paradox",
        points: 88,
        description: '"We know more than we can tell." Much human knowledge is tacit and cannot be explicitly stated - which is why many skills are hard to automate.',
        category: 'logic',
        simulator: 'polanyi-simulator'
    },
    {
        id: 'grelling-nelson',
        title: 'Grelling-Nelson Paradox',
        points: 7,
        description: 'Is "heterological" (a word that doesn\'t describe itself) heterological? If yes, then no. If no, then yes.',
        category: 'logic',
        simulator: 'grelling-simulator'
    },
    {
        id: 'curry',
        title: "Curry's Paradox",
        points: 23,
        description: '"If this sentence is true, then Santa exists." This seemingly absurd conditional can prove anything!',
        category: 'logic',
        simulator: 'curry-simulator'
    },
    {
        id: 'berry',
        title: 'Berry Paradox',
        points: 9,
        description: '"The smallest integer not definable in under sixty letters" - but that phrase has fewer than sixty letters!',
        category: 'logic',
        simulator: 'berry-simulator'
    },
    {
        id: 'allais',
        title: 'Allais Paradox',
        points: 5,
        description: 'Human choices in gambles systematically violate expected utility theory. Certainty has disproportionate psychological weight.',
        category: 'logic',
        simulator: 'allais-simulator'
    },
    {
        id: 'inventor',
        title: "Inventor's Paradox",
        points: 5,
        description: 'Sometimes it\'s easier to solve a more general problem than a specific one. The extra generality provides more angles of attack.',
        category: 'logic',
        simulator: 'inventors-simulator'
    },
    {
        id: 'drinker',
        title: 'Drinker Paradox',
        points: 4,
        description: '"There is someone in the pub such that if they are drinking, everyone is drinking." This bizarre statement is always true!',
        category: 'logic',
        simulator: 'drinker-simulator'
    },
    {
        id: 'commuting',
        title: 'Commuting Paradox',
        points: 140,
        description: "People with long commutes report lower life satisfaction, yet millions choose to commute. The extra income doesn't compensate for lost time.",
        category: 'economics',
        simulator: 'commuting-simulator'
    },
    {
        id: 'free-time',
        title: 'Free-Time Paradox',
        points: 257,
        description: 'Americans have more free time than ever but feel more rushed. Higher income people have less leisure but feel less busy.',
        category: 'economics',
        simulator: 'free-time-simulator'
    },
    {
        id: 'eligible-bachelor',
        title: 'Eligible Bachelor Paradox',
        points: 94,
        description: 'Why do all the good partners seem taken? Selection bias and market dynamics create a dating pool where eligible partners are rare.',
        category: 'economics',
        simulator: 'bachelor-simulator'
    },
    {
        id: 'deming',
        title: 'Deming Paradox',
        points: 283,
        description: "Operationally rigorous companies often aren't nice places to work. The practices that make companies efficient can make them unpleasant.",
        category: 'economics',
        simulator: 'deming-simulator'
    },
    {
        id: 'karl-popper',
        title: 'Karl Popper Paradox',
        points: 147,
        description: 'A tolerant society cannot tolerate intolerance. Unlimited tolerance leads to the disappearance of tolerance itself.',
        category: 'economics',
        simulator: 'popper-simulator'
    },
    {
        id: 'clothesline',
        title: 'Clothesline Paradox',
        points: 12,
        description: 'When you dry clothes on a clothesline instead of a dryer, GDP goes DOWN. Our economic metrics punish efficiency!',
        category: 'economics',
        simulator: 'clothesline-simulator'
    },
    {
        id: 'obesity-hunger',
        title: 'Obesity-Hunger Paradox',
        points: 13,
        description: 'Poor people often face both hunger AND obesity. Cheap foods are calorie-dense but nutrient-poor.',
        category: 'economics',
        simulator: 'obesity-hunger-simulator'
    },
    {
        id: 'low-birth-weight',
        title: 'Low Birth-Weight Paradox',
        points: 4,
        description: 'Low birth weight babies of smokers have BETTER survival rates than low birth weight babies of non-smokers!',
        category: 'economics',
        simulator: 'low-birth-weight-simulator'
    },
    {
        id: 'full-fat',
        title: 'Full-Fat Paradox',
        points: 5,
        description: 'Full-fat dairy may be healthier than low-fat. Despite more saturated fat, whole milk drinkers have lower diabetes risk.',
        category: 'economics',
        simulator: 'full-fat-simulator'
    },
    {
        id: 'elephant-brain',
        title: 'Elephant Brain Paradox',
        points: 5,
        description: "Elephants have 3x more neurons than humans. Why aren't they smarter? Their neurons are mostly in the cerebellum, not the cortex.",
        category: 'economics',
        simulator: 'elephant-brain-simulator'
    },
    {
        id: 'catch-22',
        title: 'Catch-22',
        points: 85,
        description: 'A soldier who wants to be declared insane to avoid combat is deemed not insane for that very reason. You need something that can only be had by not needing it.',
        category: 'logic',
        simulator: 'catch22-simulator'
    },
    {
        id: 'barber',
        title: 'Barber Paradox',
        points: 72,
        description: 'A barber shaves all and only those men who do not shave themselves. Does he shave himself? If yes, then no. If no, then yes.',
        category: 'logic',
        simulator: 'barber-simulator'
    },
    {
        id: 'crocodile',
        title: 'Crocodile Dilemma',
        points: 45,
        description: 'A crocodile steals a child and promises to return it if the father correctly guesses what the crocodile will do. The father guesses "You will not return my child."',
        category: 'logic',
        simulator: 'crocodile-simulator'
    },
    {
        id: 'court',
        title: 'Paradox of the Court',
        points: 38,
        description: 'A law student agrees to pay his teacher after winning his first case. The teacher sues - if the student wins, he must pay. If he loses, he still must pay!',
        category: 'logic',
        simulator: 'court-simulator'
    },
    {
        id: 'epimenides',
        title: 'Epimenides Paradox',
        points: 52,
        description: 'A Cretan says: "All Cretans are liars." If true, then the Cretan is lying, so it\'s false. If false, then some Cretans tell truth, which is consistent.',
        category: 'logic',
        simulator: 'epimenides-simulator'
    },
    {
        id: 'card',
        title: 'Card Paradox',
        points: 28,
        description: '"The next statement is true. The previous statement is false." Neither sentence is self-referential, yet together they create a paradox.',
        category: 'logic',
        simulator: 'card-simulator'
    },
    {
        id: 'pinocchio',
        title: 'Pinocchio Paradox',
        points: 65,
        description: 'What happens if Pinocchio says "My nose grows now"? If true, his nose shouldn\'t grow. If false, it should grow, making it true!',
        category: 'logic',
        simulator: 'pinocchio-simulator'
    },
    {
        id: 'quine',
        title: "Quine's Paradox",
        points: 41,
        description: '"Yields a falsehood when appended to its own quotation" yields a falsehood when appended to its own quotation. Paradoxical without self-reference!',
        category: 'logic',
        simulator: 'quine-simulator'
    },
    {
        id: 'opposite-day',
        title: 'Opposite Day',
        points: 33,
        description: '"It is opposite day today." If true, then it\'s NOT opposite day. But if it\'s NOT opposite day, the statement could be true!',
        category: 'logic',
        simulator: 'opposite-day-simulator'
    },
    {
        id: 'barbershop',
        title: 'Barbershop Paradox',
        points: 25,
        description: 'Lewis Carroll\'s paradox: If one of two simultaneous assumptions leads to a contradiction, the other is also disproved - but this leads to paradox!',
        category: 'logic',
        simulator: 'barbershop-simulator'
    },
    {
        id: 'lottery',
        title: 'Lottery Paradox',
        points: 42,
        description: 'It\'s reasonable to believe any single ticket will lose, but unreasonable to believe NO ticket will win. Yet believing each loses implies believing none wins!',
        category: 'logic',
        simulator: 'lottery-simulator'
    },
    {
        id: 'tortoise-achilles',
        title: 'What the Tortoise Said to Achilles',
        points: 55,
        description: 'Carroll\'s paradox: If a premise needs justification that it leads to a conclusion, we need infinite premises. Inference rules can\'t themselves be premises.',
        category: 'logic',
        simulator: 'tortoise-achilles-simulator'
    },
    {
        id: 'knower',
        title: 'Knower Paradox',
        points: 28,
        description: '"This sentence is not known." If you know it, it\'s false (so you don\'t know it). If you don\'t know it, it might be true - but then is it knowable?',
        category: 'logic',
        simulator: 'knower-simulator'
    },
    {
        id: 'no-no',
        title: 'No-No Paradox',
        points: 22,
        description: 'Sentence A: "B is not true." Sentence B: "A is not true." Neither directly self-referential, yet together they\'re paradoxical.',
        category: 'logic',
        simulator: 'nono-simulator'
    },
    {
        id: 'yablo',
        title: 'Yablo\'s Paradox',
        points: 35,
        description: 'An infinite sequence where each sentence says "all following sentences are false." No self-reference, yet still paradoxical!',
        category: 'logic',
        simulator: 'yablo-simulator'
    },
    {
        id: 'richard',
        title: 'Richard\'s Paradox',
        points: 30,
        description: 'We can define a decimal that differs from every definable decimal - but that definition itself defines it! A paradox of definability.',
        category: 'logic',
        simulator: 'richard-simulator'
    },
    {
        id: 'socrates-knowledge',
        title: 'I Know That I Know Nothing',
        points: 48,
        description: 'Socrates\' famous claim: If he knows nothing, how does he know that? But if he knows something (that he knows nothing), then he doesn\'t know nothing!',
        category: 'philosophy',
        simulator: 'socrates-simulator'
    },
    {
        id: 'omnipotence',
        title: 'Omnipotence Paradox',
        points: 85,
        description: 'Can God create a stone so heavy even He cannot lift it? Either answer limits omnipotence - a classic theological paradox.',
        category: 'philosophy',
        simulator: 'omnipotence-simulator'
    },
    {
        id: 'free-will',
        title: 'Paradox of Free Will',
        points: 72,
        description: 'If God knows in advance what you\'ll decide, how can your choice be free? Divine foreknowledge seems incompatible with libertarian free will.',
        category: 'philosophy',
        simulator: 'freewill-simulator'
    },
    {
        id: 'problem-evil',
        title: 'Problem of Evil',
        points: 95,
        description: 'If God is omnipotent, omniscient, and good, why does evil exist? Any two seem compatible, but all three together create the Epicurean paradox.',
        category: 'philosophy',
        simulator: 'evil-simulator'
    },
    {
        id: 'preface',
        title: 'Preface Paradox',
        points: 32,
        description: 'An author believes each statement in their book is correct, yet also believes at least one must be wrong. Both beliefs seem rational, yet contradict!',
        category: 'logic',
        simulator: 'preface-simulator'
    },
    {
        id: 'moore',
        title: 'Moore\'s Paradox',
        points: 38,
        description: '"It\'s raining, but I don\'t believe it\'s raining." Not a logical contradiction, yet absurd to assert. What makes it paradoxical?',
        category: 'philosophy',
        simulator: 'moore-simulator'
    },
    {
        id: 'meno',
        title: 'Meno\'s Paradox',
        points: 45,
        description: 'You can\'t search for what you know (you already have it) or what you don\'t know (you won\'t recognize it). So how is learning possible?',
        category: 'philosophy',
        simulator: 'meno-simulator'
    },
    {
        id: 'fitch',
        title: 'Fitch\'s Paradox',
        points: 40,
        description: 'If all truths are knowable, then all truths are known! The modest claim that truths CAN be known implies the radical claim that they ARE known.',
        category: 'logic',
        simulator: 'fitch-simulator'
    },
    {
        id: 'goodman-grue',
        title: 'Goodman\'s Paradox',
        points: 52,
        description: 'Define "grue": green if observed before 2100, blue after. All evidence for "emeralds are green" equally supports "emeralds are grue"!',
        category: 'logic',
        simulator: 'grue-simulator'
    },
    {
        id: 'burali-forti',
        title: 'Burali-Forti Paradox',
        points: 35,
        description: 'If ordinal numbers formed a set, that set would have an ordinal number - one that is both in the set and greater than all ordinals in it!',
        category: 'infinity',
        simulator: 'burali-forti-simulator'
    },
    {
        id: 'cantor',
        title: 'Cantor\'s Paradox',
        points: 55,
        description: 'The set of all sets would contain its own power set. But power sets are always larger than their original sets. Contradiction!',
        category: 'infinity',
        simulator: 'cantor-simulator'
    },
    {
        id: 'galileo',
        title: 'Galileo\'s Paradox',
        points: 48,
        description: 'Most integers are NOT perfect squares, yet there are exactly as many perfect squares as integers! Both can be paired one-to-one.',
        category: 'infinity',
        simulator: 'galileo-simulator'
    },
    {
        id: 'thomson-lamp',
        title: 'Thomson\'s Lamp',
        points: 42,
        description: 'A lamp is toggled on/off at times 1, 1/2, 1/4, 1/8... After 2 minutes (infinite toggles), is it on or off?',
        category: 'infinity',
        simulator: 'thomson-lamp-simulator'
    },
    {
        id: 'grandi-series',
        title: 'Grandi\'s Series',
        points: 38,
        description: 'What is 1 - 1 + 1 - 1 + 1 - 1...? Grouping differently gives 0, 1, or 1/2. All seem valid!',
        category: 'infinity',
        simulator: 'grandi-simulator'
    },
    {
        id: 'gabriel-horn',
        title: 'Gabriel\'s Horn',
        points: 65,
        description: 'A trumpet shape with FINITE volume but INFINITE surface area. You can fill it with paint, but never paint its surface!',
        category: 'infinity',
        simulator: 'gabriel-horn-simulator'
    },
    {
        id: 'coin-rotation',
        title: 'Coin Rotation Paradox',
        points: 32,
        description: 'Roll a coin around an identical coin. It makes TWO full rotations while traversing ONE circumference. Where does the extra rotation come from?',
        category: 'mathematical',
        simulator: 'coin-rotation-simulator'
    },
    {
        id: 'bertrand-box',
        title: 'Bertrand\'s Box Paradox',
        points: 45,
        description: 'Three boxes with 2 coins each: GG, SS, GS. You draw gold. What\'s the probability the other coin is gold? Not 1/2!',
        category: 'probability',
        simulator: 'bertrand-box-simulator'
    },
    {
        id: 'bertrand-random',
        title: 'Bertrand\'s Paradox',
        points: 55,
        description: 'What\'s the probability a random chord in a circle is longer than the side of an inscribed triangle? Answer: 1/2, 1/3, or 1/4 depending on how you define "random"!',
        category: 'probability',
        simulator: 'bertrand-random-simulator'
    },
    {
        id: 'false-positive',
        title: 'False Positive Paradox',
        points: 72,
        description: 'A 99% accurate test says you have a rare disease. The chance you actually have it? Often less than 50%! Base rates matter.',
        category: 'probability',
        simulator: 'false-positive-simulator'
    },
    {
        id: 'intransitive-dice',
        title: 'Intransitive Dice',
        points: 58,
        description: 'Die A usually beats B, B usually beats C, but C usually beats A! Rock-paper-scissors with probability.',
        category: 'probability',
        simulator: 'intransitive-dice-simulator'
    },
    {
        id: 'three-prisoners',
        title: 'Three Prisoners Problem',
        points: 48,
        description: 'Of three prisoners, one will be freed. A asks the guard to name another who will die. After learning B will die, should A\'s hopes change?',
        category: 'probability',
        simulator: 'three-prisoners-simulator'
    },
    {
        id: 'will-rogers',
        title: 'Will Rogers Phenomenon',
        points: 35,
        description: 'Moving one person from Group A to Group B can raise the average of BOTH groups! How is this possible?',
        category: 'mathematical',
        simulator: 'will-rogers-simulator'
    },
    {
        id: 'all-horses',
        title: 'All Horses Are the Same Color',
        points: 42,
        description: 'A flawed induction proof seems to show all horses are the same color. Where exactly does the logic fail?',
        category: 'mathematical',
        simulator: 'all-horses-simulator'
    },
    {
        id: 'arrow',
        title: 'Arrow\'s Impossibility Theorem',
        points: 88,
        description: 'No voting system can satisfy all fairness criteria simultaneously. Democracy is mathematically impossible to perfect!',
        category: 'decisions',
        simulator: 'arrow-simulator'
    },
    {
        id: 'condorcet',
        title: 'Condorcet Paradox',
        points: 62,
        description: 'Majority prefers A to B, B to C, and C to A! Group preferences can be cyclic even when individual preferences are not.',
        category: 'decisions',
        simulator: 'condorcet-simulator'
    },
    {
        id: 'prisoner-dilemma',
        title: 'Prisoner\'s Dilemma',
        points: 125,
        description: 'Two rational prisoners will both confess, even though both staying silent is better for each. Individual rationality produces collective irrationality.',
        category: 'decisions',
        simulator: 'prisoner-dilemma-simulator'
    },
    {
        id: 'buridan-ass',
        title: 'Buridan\'s Ass',
        points: 52,
        description: 'A donkey equally hungry and thirsty, placed exactly between food and water, would starve - unable to make a rational choice between equal options.',
        category: 'decisions',
        simulator: 'buridan-simulator'
    },
    {
        id: 'paradox-voting',
        title: 'Paradox of Voting',
        points: 45,
        description: 'The cost of voting exceeds any single vote\'s expected impact. Why do rational people vote at all?',
        category: 'decisions',
        simulator: 'voting-paradox-simulator'
    },
    {
        id: 'irresistible-force',
        title: 'Irresistible Force Paradox',
        points: 70,
        description: 'What happens when an unstoppable force meets an immovable object?',
        category: 'physics',
        simulator: 'irresistible-force-simulator'
    },
    {
        id: 'moving-rows',
        title: 'Moving Rows Paradox (Zeno)',
        points: 65,
        description: 'Zeno\'s paradox about relative motion - time passes twice as fast from one perspective.',
        category: 'physics',
        simulator: 'moving-rows-simulator'
    },
    {
        id: 'grain-millet',
        title: 'Grain of Millet',
        points: 60,
        description: 'A single grain makes no sound, yet 10,000 grains make noise - how can many nothings become something?',
        category: 'physics',
        simulator: 'grain-millet-simulator'
    },
    {
        id: 'aristotle-wheel',
        title: 'Aristotle\'s Wheel Paradox',
        points: 75,
        description: 'Two concentric circles travel different distances but complete rotation together.',
        category: 'physics',
        simulator: 'aristotle-wheel-simulator'
    },
    {
        id: 'feynman-sprinkler',
        title: 'Feynman Sprinkler',
        points: 80,
        description: 'When a sprinkler sucks in water, which direction does it spin?',
        category: 'physics',
        simulator: 'feynman-sprinkler-simulator'
    },
    {
        id: 'algol',
        title: 'Algol Paradox',
        points: 70,
        description: 'In binary star systems, the less massive star appears older, contradicting stellar evolution.',
        category: 'scientific',
        simulator: 'algol-simulator'
    },
    {
        id: 'gzk',
        title: 'GZK Paradox',
        points: 75,
        description: 'Cosmic rays with energies exceeding theoretical limits have been detected.',
        category: 'scientific',
        simulator: 'gzk-simulator'
    },
    {
        id: 'youth-paradox',
        title: 'Paradox of Youth',
        points: 70,
        description: 'Young stars exist near the galactic center where star formation should be impossible.',
        category: 'scientific',
        simulator: 'youth-paradox-simulator'
    },
    {
        id: 'dalembert',
        title: 'D\'Alembert\'s Paradox',
        points: 75,
        description: 'Ideal fluids exert no force on objects - contradicting real experience.',
        category: 'physics',
        simulator: 'dalembert-simulator'
    },
    {
        id: 'bentley',
        title: 'Bentley\'s Paradox',
        points: 70,
        description: 'In Newtonian gravity, an infinite uniform universe would collapse to a single point.',
        category: 'scientific',
        simulator: 'bentley-simulator'
    },
    {
        id: 'diamond-water',
        title: 'Diamond-Water Paradox',
        points: 80,
        description: 'Water is essential but cheap, diamonds are useless but expensive. Why do we value non-essentials more than necessities?',
        category: 'economics',
        simulator: 'diamond-water-simulator'
    },
    {
        id: 'giffen',
        title: 'Giffen Good Paradox',
        points: 75,
        description: 'When bread prices rise, poor people buy MORE bread, violating the law of demand. Necessity trumps economics.',
        category: 'economics',
        simulator: 'giffen-simulator'
    },
    {
        id: 'easterlin',
        title: 'Easterlin Paradox',
        points: 80,
        description: 'Above basic needs, more money does not increase happiness. Wealth and well-being diverge beyond a threshold.',
        category: 'economics',
        simulator: 'easterlin-simulator'
    },
    {
        id: 'leontief',
        title: 'Leontief Paradox',
        points: 65,
        description: 'US exports were more labor-intensive than imports, contradicting comparative advantage theory.',
        category: 'economics',
        simulator: 'leontief-simulator'
    },
    {
        id: 'lucas-paradox',
        title: 'Lucas Paradox',
        points: 70,
        description: 'Capital does not flow from rich to poor countries as economic theory predicts. Money stays where money is.',
        category: 'economics',
        simulator: 'lucas-paradox-simulator'
    },
    {
        id: 'downs-thomson',
        title: 'Downs-Thomson Paradox',
        points: 75,
        description: 'Building more roads can increase traffic congestion. More capacity invites more drivers until equilibrium.',
        category: 'social',
        simulator: 'downs-thomson-simulator'
    },
    {
        id: 'tullock',
        title: 'Tullock Paradox',
        points: 70,
        description: 'Politicians are surprisingly cheap to bribe relative to the value they provide. Why is influence so underpriced?',
        category: 'social',
        simulator: 'tullock-simulator'
    },
    {
        id: 'prosperity-paradox',
        title: 'Prosperity Paradox',
        points: 70,
        description: 'Successful generations often raise children who consume rather than create. Abundance breeds complacency.',
        category: 'social',
        simulator: 'prosperity-paradox-simulator'
    },
    {
        id: 'demographic-economic',
        title: 'Demographic-Economic Paradox',
        points: 75,
        description: 'Wealthier nations have fewer children despite being able to afford more. Prosperity reduces fertility.',
        category: 'social',
        simulator: 'demographic-economic-simulator'
    },
    {
        id: 'mandeville',
        title: "Mandeville's Paradox",
        points: 75,
        description: 'Private vices like greed and vanity can produce public benefits like economic growth. Vice fuels prosperity.',
        category: 'economics',
        simulator: 'mandeville-simulator'
    },
    {
        id: 'fiction-paradox',
        title: 'Paradox of Fiction',
        points: 75,
        description: 'We feel real emotions for fictional characters we know don\'t exist.',
        category: 'philosophy',
        simulator: 'fiction-paradox-simulator'
    },
    {
        id: 'meat-paradox',
        title: 'Meat Paradox',
        points: 70,
        description: 'People claim to care about animals yet continue eating meat.',
        category: 'behavior',
        simulator: 'meat-paradox-simulator'
    },
    {
        id: 'ironic-process',
        title: 'Ironic Process Theory',
        points: 75,
        description: 'Trying NOT to think about something makes you think about it more.',
        category: 'behavior',
        simulator: 'ironic-process-simulator'
    },
    {
        id: 'sad-clown',
        title: 'Sad Clown Paradox',
        points: 70,
        description: 'Comedians often suffer from depression despite making others happy.',
        category: 'behavior',
        simulator: 'sad-clown-simulator'
    },
    {
        id: 'solomon-paradox',
        title: 'Solomon\'s Paradox',
        points: 75,
        description: 'People give wiser advice to others than they take themselves.',
        category: 'behavior',
        simulator: 'solomon-paradox-simulator'
    },
    {
        id: 'hedgehog-dilemma',
        title: 'Hedgehog\'s Dilemma',
        points: 70,
        description: 'The closer we get to others, the more we hurt each other.',
        category: 'philosophy',
        simulator: 'hedgehog-dilemma-simulator'
    },
    {
        id: 'analysis-paradox',
        title: 'Paradox of Analysis',
        points: 65,
        description: 'A correct analysis must be identical to what\'s analyzed, making it uninformative.',
        category: 'philosophy',
        simulator: 'analysis-paradox-simulator'
    },
    {
        id: 'suspense-paradox',
        title: 'Paradox of Suspense',
        points: 70,
        description: 'We feel suspense watching familiar stories even knowing the outcome.',
        category: 'behavior',
        simulator: 'suspense-paradox-simulator'
    },
    {
        id: 'self-absorption',
        title: 'Self-Absorption Paradox',
        points: 65,
        description: 'High self-awareness correlates with both distress AND well-being.',
        category: 'behavior',
        simulator: 'self-absorption-simulator'
    },
    {
        id: 'moral-paradox',
        title: 'Moral Paradox',
        points: 70,
        description: 'Different moral imperatives can logically conflict with each other.',
        category: 'philosophy',
        simulator: 'moral-paradox-simulator'
    },
    {
        id: 'rule-following',
        title: 'Rule-Following Paradox',
        points: 70,
        description: 'No rule can determine its own application (Wittgenstein)',
        category: 'philosophy',
        simulator: 'rule-following-simulator'
    },
    {
        id: 'mere-addition',
        title: 'Mere Addition Paradox',
        points: 75,
        description: 'Adding happy lives can lead to worse outcomes (Parfit)',
        category: 'philosophy',
        simulator: 'mere-addition-simulator'
    },
    {
        id: 'nihilism-paradox',
        title: 'Nihilism Paradox',
        points: 70,
        description: 'Claiming nothing has meaning is itself a meaningful claim',
        category: 'philosophy',
        simulator: 'nihilism-paradox-simulator'
    },
    {
        id: 'motivation-crowding',
        title: 'Motivation Crowding',
        points: 70,
        description: 'External rewards can reduce intrinsic motivation',
        category: 'behavior',
        simulator: 'motivation-crowding-simulator'
    },
    {
        id: 'morton-fork',
        title: 'Morton\'s Fork',
        points: 65,
        description: 'Contradictory observations lead to the same conclusion',
        category: 'logic',
        simulator: 'morton-fork-simulator'
    },
    {
        id: 'wollheim',
        title: 'Wollheim\'s Paradox',
        points: 65,
        description: 'A democrat can advocate for policies they personally oppose',
        category: 'philosophy',
        simulator: 'wollheim-simulator'
    },
    {
        id: 'proebsting',
        title: 'Proebsting\'s Paradox',
        points: 70,
        description: 'Kelly criterion gambling can still lead to ruin',
        category: 'probability',
        simulator: 'proebsting-simulator'
    },
    {
        id: 'chainstore',
        title: 'Chainstore Paradox',
        points: 70,
        description: 'Game theory predicts irrational behavior in chainstore entry game',
        category: 'economics',
        simulator: 'chainstore-simulator'
    },
    {
        id: 'antitrust',
        title: 'Antitrust Paradox',
        points: 65,
        description: 'Antitrust enforcement can raise prices it\'s meant to lower',
        category: 'economics',
        simulator: 'antitrust-simulator'
    },
    {
        id: 'arrow-info',
        title: 'Arrow Information Paradox',
        points: 70,
        description: 'To sell information, you must reveal it, but then why pay?',
        category: 'economics',
        simulator: 'arrow-info-simulator'
    }
];

export function getParadoxesByCategory(categoryId) {
    return paradoxes.filter(p => p.category === categoryId);
}

export function getParadoxesByPoints(descending = true) {
    return [...paradoxes].sort((a, b) => {
        const aPoints = typeof a.points === 'number' ? a.points : 0;
        const bPoints = typeof b.points === 'number' ? b.points : 0;
        return descending ? bPoints - aPoints : aPoints - bPoints;
    });
}

export function searchParadoxes(query) {
    const lowerQuery = query.toLowerCase();
    return paradoxes.filter(p =>
        p.title.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery)
    );
}
