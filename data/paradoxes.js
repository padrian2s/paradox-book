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
