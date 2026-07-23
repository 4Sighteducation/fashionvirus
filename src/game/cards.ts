import type { Card } from './types'

// Card corpus converted from docs/fashion-virus-30-cards.md (Karen's 30 seeds).
// Conversion notes:
//  - rev and cap fold into one cash pool (£k) for the PoC
//  - share / sentiment / followers fold into heat and novelty
//  - hidden effects use real units: M litres, t CO₂e, t waste, kg fibres,
//    thousand poverty-wage hours, hectares
// First-pass balance; tune in playtesting.

export const CARDS: Card[] = [
  // ─────────────────────────── MATERIALS (7) ───────────────────────────
  {
    id: 'dye_signature_colour',
    category: 'materials',
    stage: 1,
    title: 'The signature colour',
    body: 'The dye house sends swatches. The reactive crimson is extraordinary — it photographs like nothing else and will sell itself. The low-impact alternative is softer, chalkier.',
    depth: 'The colour is achieved with heavy metals; the wastewater is untreated. The mill has been fined twice — both fines cheaper than treatment.',
    art: 'extreme close-up of liquid crimson dye rippling in a steel vat, glossy surface reflection, jewel-like saturation',
    choices: [
      {
        id: 'saturated',
        label: 'Take the saturated colour',
        surface: { heat: 12, cash: 8 },
        hidden: { water: 2 },
        fuses: ['toxic_discharge'],
        whisper: 'The river below the mill is running an unusual colour this week.',
      },
      {
        id: 'low_impact',
        label: 'The low-impact dye',
        surface: { heat: 3, cash: -2 },
        hidden: { water: 0.4 },
      },
    ],
  },
  {
    id: 'leather_sourcing',
    category: 'materials',
    stage: 1,
    title: 'Leather',
    body: "Your bestseller needs leather. One tannery's price you can't ignore; vegetable-tanned costs triple; the synthetic will be called plastic.",
    depth: 'Chromium salts in the water table; cattle on newly cleared land. Nobody in the chain will confirm provenance, and nobody is asking.',
    art: 'a single exquisite tan leather jacket on a wooden hanger against raw concrete, soft window light',
    choices: [
      {
        id: 'chrome',
        label: 'Cheap chrome leather',
        surface: { cash: 14 },
        hidden: { water: 1.5, land: 40, carbon: 90 },
        fuses: ['supply_chain_opacity'],
      },
      {
        id: 'veg_tanned',
        label: 'Vegetable-tanned, traceable',
        surface: { cash: -7, heat: 6 },
        hidden: { carbon: 20 },
      },
      {
        id: 'synthetic',
        label: 'The synthetic',
        surface: { cash: 9, heat: -4 },
        hidden: { microplastics: 300 },
      },
    ],
  },
  {
    id: 'polyester_blend',
    category: 'materials',
    stage: 1,
    title: 'The blend',
    body: 'Virgin polyester is cheap, drapes beautifully, never creases. Recycled costs more and the colour varies. Organic cotton costs more still — and drinks water.',
    art: 'bolts of flowing fabric mid-air in a studio, frozen in motion, silvery drape catching light',
    choices: [
      {
        id: 'virgin',
        label: 'Virgin polyester',
        surface: { cash: 7 },
        hidden: { microplastics: 800, carbon: 60 },
        whisper: "A customer emails: the fabric feels 'a bit plasticky'. You archive it.",
      },
      {
        id: 'recycled',
        label: 'Recycled polyester',
        surface: { cash: 2, heat: 4 },
        hidden: { microplastics: 500 },
      },
      {
        id: 'organic_cotton',
        label: 'Organic cotton',
        surface: { cash: -3, heat: 8 },
        hidden: { water: 2.6, land: 15 },
      },
    ],
  },
  {
    id: 'viscose_forest',
    category: 'materials',
    stage: 1,
    title: 'Plant-based',
    body: 'A viscose supplier offers a silk-soft feel at a cotton price. "Plant-based," the brochure says, over a photograph of leaves.',
    depth: 'The pulp is dissolved with carbon disulphide. Workers at the plant report neurological symptoms. The forest in the brochure is not the forest being cut.',
    art: 'silk-like sage-green fabric cascading over a plinth, botanical shadow play on the backdrop',
    choices: [
      {
        id: 'take_it',
        label: 'Take it',
        surface: { cash: 10, heat: 6 },
        hidden: { land: 25, water: 1 },
        fuses: ['supply_chain_opacity'],
      },
      {
        id: 'lyocell',
        label: 'Certified closed-loop lyocell instead',
        surface: { cash: -3, heat: 4 },
      },
    ],
  },
  {
    id: 'sandblasted_denim',
    category: 'materials',
    stage: 2,
    title: 'The worn-in look',
    body: 'The distressed finish is the look of the season. Sandblasting delivers it at scale for pennies. Laser finishing needs new machinery.',
    art: 'perfectly faded denim jeans laid flat, sculptural creases, dust motes in a shaft of light',
    choices: [
      {
        id: 'sandblast',
        label: 'Sandblast',
        surface: { cash: 12, heat: 9 },
        hidden: { labour: 40 },
        fuses: ['worker_grievance', 'sandblast'],
        whisper: "A finishing-house invoice includes a line for 'respiratory PPE'. It is very small.",
      },
      {
        id: 'laser',
        label: 'Invest in laser finishing',
        surface: { cash: -24 },
      },
    ],
  },
  {
    id: 'angora_moment',
    category: 'materials',
    stage: 2,
    title: 'The angora moment',
    body: 'A single knit goes viral — the softness is the story. Angora at volume is suddenly very available and very cheap.',
    depth: 'The volume price exists because the fibre is plucked, not sheared. There is footage. It has not surfaced. Yet.',
    art: 'an impossibly soft pale knit sweater on a stone surface, single strand of fibre lifting in air',
    choices: [
      {
        id: 'scale_knit',
        label: 'Scale the knit',
        surface: { cash: 15, heat: 14 },
        fuses: ['undisclosed_animal_research'],
      },
      {
        id: 'lambswool',
        label: 'Switch to brushed lambswool, keep the silhouette',
        surface: { cash: 3 },
      },
    ],
  },
  {
    id: 'deadstock_find',
    category: 'materials',
    stage: 1,
    title: 'The deadstock find',
    // "Sometimes the decent thing pays" — deliberately no downside.
    body: 'A mill closure floods the market with gorgeous deadstock fabric — limited, characterful, effectively free of new impact. But quantities are fixed: no reorders, ever.',
    art: 'shelves of assorted vintage fabric rolls in unrepeatable colours, archive-room stillness',
    choices: [
      {
        id: 'build_on_deadstock',
        label: 'Build a collection on deadstock',
        surface: { heat: 8, cash: 5, novelty: 10 },
      },
      {
        id: 'pass',
        label: 'Pass; you need repeatable supply',
        surface: {},
      },
    ],
  },

  // ─────────────────────────── MANUFACTURING (6) ───────────────────────────
  {
    id: 'offshore_decision',
    category: 'manufacturing',
    stage: 1,
    title: 'The agent’s price',
    body: 'An agent offers a unit price a third of what you pay now. The factory is accredited. The photographs look clean.',
    depth: 'The accreditation covers the primary site. Overflow is subcontracted to unaudited units during peak season — which is most of the year.',
    art: 'a pristine factory floor of white sewing stations receding in one-point perspective, empty of people',
    choices: [
      {
        id: 'sign',
        label: 'Sign',
        surface: { cash: 22, heat: 8 },
        hidden: { labour: 180, carbon: 140 },
        fuses: ['supply_chain_opacity'],
        whisper: 'Your agent is slow to answer which factory made the last run.',
      },
      {
        id: 'visit_first',
        label: 'Visit the factory yourself first — costs the turn',
        surface: { cash: -3 },
        kind: 'inspect',
      },
      {
        id: 'stay_local',
        label: 'Stay local, small-batch',
        surface: { cash: -1, heat: 5 },
        hidden: { carbon: 15 },
      },
    ],
  },
  {
    id: 'piecework_pay',
    category: 'manufacturing',
    stage: 1,
    title: 'Piecework',
    character: 'Li Pengjian',
    body: 'Li Pengjian proposes paying per garment. Productivity jumps. He mentions, in passing, that Yan Rong and Yao Lin — older, slower, the best work in the building — will earn less.',
    art: 'two tin cups of tea steaming on a workbench beside folded garments, warm side light',
    choices: [
      {
        id: 'piecework',
        label: 'Switch to piecework',
        surface: { cash: 11 },
        hidden: { labour: 60 },
        fuses: ['worker_grievance'],
        whisper: 'Li Pengjian asks whether you might meet the workers to discuss the pay structure.',
      },
      {
        id: 'tea',
        // The World Factory card: the decent thing pays more.
        label: 'Meet the workers; offer them tea',
        surface: { cash: 13, heat: 3 },
        reaction: 'Yan Rong shows you a seam technique you have never seen. You keep the pay structure and gain a design.',
      },
      {
        id: 'raise_pay',
        label: 'Simply raise pay a little',
        surface: { cash: 3 },
      },
    ],
  },
  {
    id: 'the_deadline',
    category: 'manufacturing',
    stage: 2,
    title: 'The deadline',
    body: 'The retailer moves your delivery date up three weeks. Miss it and lose the account. The factory says it’s possible — "with overtime."',
    art: 'a loading bay at dusk, sealed boxes stacked to the ceiling, one strip light flickering',
    choices: [
      {
        id: 'overtime',
        label: 'Take the overtime',
        surface: { cash: 16, heat: 8 },
        hidden: { labour: 90 },
        fuses: ['worker_grievance'],
      },
      {
        id: 'partial',
        label: 'Negotiate a partial delivery',
        surface: { cash: 6, heat: -3 },
      },
      {
        id: 'refuse',
        label: 'Refuse; lose the account',
        surface: { cash: -12, heat: -10 },
      },
    ],
  },
  {
    id: 'air_freight',
    category: 'manufacturing',
    stage: 2,
    title: 'The sea or the sky',
    body: 'Sea freight lands the drop three weeks after the campaign breaks. Air lands it on time. Nobody will ever see the difference.',
    art: 'aircraft cargo hold interior stacked with shrink-wrapped garment cartons, cold blue light',
    choices: [
      {
        id: 'fly',
        label: 'Fly it',
        surface: { cash: -9, heat: 8 },
        hidden: { carbon: 340 },
      },
      {
        id: 'sea',
        label: 'Move the campaign, ship by sea',
        surface: { heat: -6, novelty: -12 },
        hidden: { carbon: 18 },
      },
    ],
  },
  {
    id: 'the_audit',
    category: 'manufacturing',
    stage: 2,
    title: 'The audit',
    body: 'A buyer requires a social audit of your supply chain. Your agent offers to "arrange the paperwork" for a fee. A genuine audit costs five times more and might find things.',
    art: 'a thick document bound in white, embossed cover, on a glass desk — pristine, unopened',
    choices: [
      {
        id: 'paperwork',
        label: 'Arrange the paperwork',
        surface: { cash: -4 },
        fuses: ['supply_chain_opacity'],
        reaction: 'The deal proceeds. The document is beautiful.',
      },
      {
        id: 'real_audit',
        // Reveals all currently planted fuses to the player.
        label: 'Commission the real audit',
        surface: { cash: -20 },
        kind: 'audit',
      },
    ],
  },
  {
    id: 'factory_fire_warning',
    category: 'manufacturing',
    stage: 3,
    title: 'One exit',
    body: 'A worker at a subcontracted unit writes to you directly. The building has one exit. She has attached a photograph. She has cc’d nobody.',
    art: 'a phone face-down on a marble desk beside an espresso, notification light glowing',
    choices: [
      {
        id: 'forward',
        label: 'Forward to the agent; move on',
        surface: {},
        fuses: ['worker_grievance', 'worker_grievance'],
        whisper: 'You never hear back about the email.',
      },
      {
        id: 'halt',
        label: 'Halt production; audit the site',
        surface: { cash: -90, novelty: -20 },
      },
    ],
  },

  // ─────────────────────────── VOLUME — the novelty trap (4) ───────────────────────────
  {
    id: 'novelty_pressure',
    category: 'volume',
    stage: 1,
    title: 'When’s the next drop?',
    body: 'Engagement is falling. The comments are one sentence, over and over: when’s the next drop? Your collection is four weeks old. Four weeks is a long time.',
    art: 'a phone screen glow on a dark bedroom ceiling at 2am',
    choices: [
      {
        id: 'micro_drops',
        label: 'Weekly micro-drops',
        surface: { novelty: 40, cash: 18, heat: 10 },
        hidden: { waste: 12, carbon: 80 },
        whisper: "Warehouse flags last month's stock hasn't moved. You approve a markdown.",
      },
      {
        id: 'hold',
        label: 'Hold: two collections a year',
        surface: { novelty: -10, cash: -4, heat: -6 },
      },
      {
        id: 'repair_resale',
        label: 'Launch repair & resale instead',
        surface: { novelty: 12, cash: -6, heat: 7 },
      },
    ],
  },
  {
    id: 'the_collab',
    category: 'volume',
    stage: 2,
    title: 'The collab',
    body: 'A streetwear label wants a collab: limited run, midnight release, resale prices guaranteed to triple. Pure hype, engineered scarcity.',
    art: 'a queue of expensive trainers and umbrellas on wet pavement before dawn, shopfront light',
    choices: [
      {
        id: 'do_the_drop',
        label: 'Do the drop',
        surface: { heat: 20, novelty: 30, cash: 25 },
        hidden: { waste: 8, carbon: 40 },
      },
      {
        id: 'decline_collab',
        label: 'Decline; protect the main line',
        surface: { heat: -4 },
      },
    ],
  },
  {
    id: 'size_run_gamble',
    category: 'volume',
    stage: 2,
    title: 'The size run',
    body: 'Data says cutting the extended size range lifts margin 8% — fewer patterns, cleaner racks. The customers it cuts are loyal and vocal.',
    art: 'a rail of identical garments in graded sizes, one empty hanger at the end',
    choices: [
      {
        id: 'cut_range',
        label: 'Cut the range',
        surface: { cash: 9 },
        fuses: ['greenwashing_claim'],
      },
      {
        id: 'keep_range',
        label: 'Keep full range; eat the margin',
        surface: { cash: -5, heat: 5 },
      },
    ],
  },
  {
    id: 'fashion_week',
    category: 'volume',
    stage: 3,
    title: 'Fashion week',
    body: 'A slot opens at fashion week. The show is 12 minutes long, costs a fortune, and is the industry’s front page.',
    art: 'an empty runway one hour before the show, rows of white chairs, a single spotlight warming up',
    choices: [
      {
        id: 'stage_show',
        label: 'Stage the show',
        surface: { heat: 25, cash: -80 },
        hidden: { carbon: 60 },
      },
      {
        id: 'digital',
        label: 'Digital presentation instead',
        surface: { heat: 8, cash: -15 },
        hidden: { carbon: 4 },
      },
    ],
  },

  // ─────────────────────────── FUNDING (4) ───────────────────────────
  {
    id: 'hedge_fund_offer',
    category: 'funding',
    stage: 1,
    title: 'The term sheet',
    character: 'Marcus Vaile, Halloran Capital',
    body: 'Halloran Capital offers £500,000. Marcus Vaile has circled for months. Generous terms, fast money, no board seat. He’d like an answer by Friday.',
    depth: "Halloran's second fund — not on the website — majority-backs a contract research organisation with three open welfare investigations. Nothing illegal. Nothing anyone has noticed. Yet.",
    art: 'a fountain pen resting on an unsigned term sheet, heavy paper, low golden side light',
    choices: [
      {
        id: 'take_money',
        label: 'Take the money',
        surface: { cash: 500, heat: 5 },
        fuses: ['undisclosed_animal_research'],
        whisper: 'A follower replies to your announcement with a single question mark. It gets 40 likes.',
      },
      {
        id: 'decline_fund',
        label: 'Decline; grow on revenue',
        surface: { heat: -4 },
      },
    ],
  },
  {
    id: 'growth_pressure',
    category: 'funding',
    stage: 2,
    title: 'Thursday’s board meeting',
    body: 'The board meeting is Thursday. They want 40% growth. They have not asked how.',
    art: 'an empty boardroom, long walnut table, twelve chairs, city haze through floor-to-ceiling glass',
    choices: [
      {
        id: 'promise_40',
        label: 'Promise 40%',
        surface: { cash: 80, novelty: 25, heat: 10 },
        hidden: { labour: 120, carbon: 200 },
        fuses: ['worker_grievance'],
      },
      {
        id: 'truth_12',
        label: 'Offer the truth: 12%, sustainably',
        surface: { cash: -40, heat: -6 },
      },
    ],
  },
  {
    id: 'the_bank_covenant',
    category: 'funding',
    stage: 2,
    title: 'The covenant',
    // Mechanically raises novelty decay for the rest of the run —
    // the system tightening, Wiener made visible.
    body: 'Your working-capital facility is up for renewal. The bank offers better terms if you hit quarterly revenue covenants — a ratchet that rewards constant growth.',
    art: "a bank's brass plaque beside a revolving door, reflections of hurrying figures",
    choices: [
      {
        id: 'ratchet',
        label: 'Take the ratchet',
        surface: { cash: 60, novelty: 15 },
        decayDelta: 4,
        reaction: 'The terms are excellent. The quarter never ends now.',
      },
      {
        id: 'renew_flat',
        label: 'Renew flat; keep flexibility',
        surface: { cash: 20 },
      },
    ],
  },
  {
    id: 'green_bond',
    category: 'funding',
    stage: 3,
    title: 'The green bond',
    body: 'An ESG fund offers cheap capital against sustainability KPIs. The KPIs, on inspection, are ones you already meet.',
    art: 'a glass award trophy engraved with a leaf motif, catching green-tinted light on a white shelf',
    choices: [
      {
        id: 'change_nothing',
        label: 'Take it and change nothing',
        surface: { cash: 150, heat: 4 },
        fuses: ['greenwashing_claim'],
      },
      {
        id: 'raise_the_bar',
        label: 'Take it and actually raise the bar',
        surface: { cash: 60, heat: 2 },
        hidden: { carbon: -80, microplastics: -200 },
      },
      {
        id: 'decline_bond',
        label: 'Decline',
        surface: {},
      },
    ],
  },

  // ─────────────────────────── MARKETING (5) ───────────────────────────
  {
    id: 'greenwash_campaign',
    category: 'marketing',
    stage: 2,
    title: 'The Conscious Collection',
    body: 'Your agency proposes "The Conscious Collection": eight styles, recycled content, earth-toned campaign, a hang tag with a leaf. Two percent of output. The campaign runs across everything.',
    art: 'a kraft-paper hang tag with an embossed leaf, on a linen background, artfully lit',
    choices: [
      {
        id: 'launch_it',
        label: 'Launch it',
        surface: { heat: 20, cash: -11 },
        hidden: { waste: 2 },
        fuses: ['greenwashing_claim'],
        whisper: 'A sustainability blogger posts a thread. It has 200 views.',
      },
      {
        id: 'reformulate',
        label: 'Actually reformulate the main line',
        surface: { heat: 2, cash: -100 },
        hidden: { microplastics: -400, carbon: -80 },
      },
      {
        id: 'say_nothing',
        label: 'Say nothing',
        surface: {},
      },
    ],
  },
  {
    id: 'influencer_seeding',
    category: 'marketing',
    stage: 1,
    title: 'The seeding list',
    body: 'Send product to 200 influencers. Most will bin it. Twelve will post. Two will make it explode.',
    art: 'a tower of identical unopened courier boxes in a bright hallway, one open with tissue paper spilling',
    choices: [
      {
        id: 'seed_wide',
        label: 'Seed widely',
        surface: { heat: 18, novelty: 28, cash: -12 },
        hidden: { waste: 3, carbon: 12 },
        whisper: "180 parcels are never opened. You don't know this.",
      },
      {
        id: 'seed_narrow',
        label: "Seed narrowly, to people who'll wear it",
        surface: { heat: 7, novelty: 2, cash: -3 },
        hidden: { carbon: 2 },
      },
    ],
  },
  {
    id: 'the_takedown',
    category: 'marketing',
    stage: 2,
    title: 'The takedown',
    body: "A small journalist publishes a piece on your subcontracting. It's accurate. Legal says a cease-and-desist would probably work — she can't afford to fight it.",
    art: 'a printed news article on a desk, a red pen resting across it, unsigned letterhead beneath',
    choices: [
      {
        id: 'send_letter',
        label: 'Send the letter',
        surface: { heat: 2 },
        fuses: ['supply_chain_opacity', 'supply_chain_opacity'],
        whisper: 'The article quietly disappears. Its author does not.',
      },
      {
        id: 'respond_honestly',
        label: 'Respond publicly, honestly',
        surface: { heat: -4 },
        clearsFuses: ['supply_chain_opacity'],
        reaction: 'It costs you a news cycle. It buys you a witness.',
      },
      {
        id: 'ignore_it',
        label: 'Ignore it',
        surface: { heat: -2 },
      },
    ],
  },
  {
    id: 'ai_models',
    category: 'marketing',
    stage: 2,
    title: 'Generated',
    body: "Generated models cut campaign costs 70% — no shoots, no fees, infinite diversity on demand. The photographers and models you've used since the bedroom years are on the other side of that saving.",
    art: 'a studio cyclorama, lighting rig on, no one in the room, a coffee cup left on an apple box',
    choices: [
      {
        id: 'go_generated',
        label: 'Go generated',
        surface: { cash: 14, heat: 4 },
        fuses: ['worker_grievance'],
      },
      {
        id: 'keep_human',
        label: 'Keep human shoots',
        surface: { cash: -10, heat: 1 },
      },
    ],
  },
  {
    id: 'documentary_request',
    category: 'marketing',
    stage: 3,
    title: 'The documentary',
    // This card reads the fuse state — the hidden machinery made tangible.
    body: 'A respected filmmaker requests access for a documentary on your supply chain. Full access, no editorial control. Decline and the film happens anyway — about the industry, with your logo in the b-roll.',
    art: 'a broadcast camera on a tripod facing an empty interview chair, softbox glow',
    choices: [
      {
        id: 'grant_access',
        label: 'Grant access',
        surface: {},
        kind: 'documentary_grant',
      },
      {
        id: 'decline_access',
        label: 'Decline',
        surface: { heat: -2 },
        kind: 'documentary_decline',
      },
    ],
  },

  // ─────────────────────────── END OF LIFE (4) ───────────────────────────
  {
    id: 'unsold_stock',
    category: 'endoflife',
    stage: 2,
    title: '40,000 units',
    body: 'The warehouse holds 40,000 units of last season. Discounting damages the brand. Donating raises questions about why you made them. There is a third option nobody puts in writing.',
    depth: 'The "disposal contractor" incinerates. Standard practice, entirely legal, completely undocumented — and the reason your brand holds its price.',
    art: 'shrink-wrapped garment pallets in a dark warehouse aisle, one bay door open to white light',
    choices: [
      {
        id: 'dispose',
        label: 'Dispose quietly',
        surface: { cash: -2 },
        hidden: { waste: 30, carbon: 120 },
        fuses: ['greenwashing_claim'],
        whisper: "An invoice arrives from a contractor whose name you don't recognise.",
      },
      {
        id: 'discount',
        label: 'Deep discount',
        surface: { cash: 6, heat: -12 },
      },
      {
        id: 'take_back',
        label: 'Take-back & recycle programme',
        surface: { cash: -14, heat: 9 },
        hidden: { waste: 4 },
      },
    ],
  },
  {
    id: 'returns_policy',
    category: 'endoflife',
    stage: 2,
    title: 'Free returns',
    body: 'Free returns lift conversion 30%. Customers order three sizes and keep one.',
    depth: "A significant share of returns are never resold — processing costs more than the item is worth. They are baled and exported, and what happens next is somebody else's country.",
    art: 'a returns conveyor of open parcels and spilling tissue, receding into industrial gloom',
    choices: [
      {
        id: 'free_forever',
        label: 'Free returns forever',
        surface: { cash: 21, heat: 13 },
        hidden: { waste: 18, carbon: 70 },
        fuses: ['greenwashing_claim'],
      },
      {
        id: 'paid_returns',
        label: 'Paid returns, better sizing tools',
        surface: { cash: -1, heat: -3 },
        hidden: { waste: 2 },
      },
    ],
  },
  {
    id: 'export_offer',
    category: 'endoflife',
    stage: 3,
    title: 'The broker',
    body: 'A broker offers to take all surplus textile — yours and your returns stream — for export as "second-hand goods." Cash positive. Warehouse solved. Papers in order.',
    art: 'shipping containers in fog, doors sealed, customs stamps fresh, gulls on the top edge',
    choices: [
      {
        id: 'sign_contract',
        label: 'Sign the contract',
        surface: {},
        recurring: { cash: 11, hidden: { waste: 30 } },
        fuses: ['greenwashing_claim', 'greenwashing_claim'],
        whisper: "A geography teacher tags you in a photo of a beach. You don't open it.",
        reaction: 'The warehouse empties. £11k a turn, ongoing.',
      },
      {
        id: 'sorting_op',
        label: 'Decline; fund a sorting & resale operation',
        surface: { cash: -32 },
        hidden: { waste: 5 },
      },
    ],
  },
  {
    id: 'rental_pivot',
    category: 'endoflife',
    stage: 3,
    title: 'The rental pivot',
    // The late-game counterweight — proof a cleaner model can also be a business.
    body: 'Your data team models a rental subscription for the premium line: lower volume, higher margin per garment, deep customer lock-in — and a fraction of the footprint. The board calls it "brand dilution."',
    art: 'a garment bag on a doorstep at dawn, reused shipping tag with many previous addresses visible',
    choices: [
      {
        id: 'launch_rental',
        label: 'Launch rental',
        surface: { cash: -50, novelty: 8 },
        recurring: { cash: 8, hidden: { carbon: -20 } },
        reaction: 'Month two: the same coat, its third renter, still perfect.',
      },
      {
        id: 'kill_it',
        label: 'Kill it',
        surface: {},
      },
    ],
  },

  // ─────────────────────────── DILEMMA CARDS — no clean answer ───────────────────────────
  // From docs/fashion-virus-dilemma-cards.md. Values against values;
  // depth complicates rather than resolves; refusal has consequences too.
  {
    id: 'd_mill_town',
    category: 'manufacturing',
    stage: 2,
    title: 'The mill town',
    body: 'Your longest-standing supplier — the dye house from your first collection — fails its effluent test badly. The village has 300 jobs and this mill. You are 60% of its order book.',
    depth: 'The mill owner shows you the books. Remediation genuinely works — but only if you commit publicly, which ties your brand to the pollution story if it fails.',
    art: 'a terraced village street at dusk, mill chimney at its end, lights on in half the windows',
    choices: [
      {
        id: 'cut_off',
        label: 'Cut them off immediately',
        surface: { cash: -8, heat: 2 },
        hidden: { water: -0.3 },
        worldStates: ['mill_town_dies'],
        reaction: 'The river begins to recover within the year. The town does not.',
      },
      {
        id: 'fund_remediation',
        label: 'Stay and fund remediation over two years',
        surface: { cash: -45 },
        recurring: { cash: -4, turns: 6 },
        fuses: ['toxic_discharge'],
        reaction: 'You commit publicly. Your name is on the mill gate now, for better or worse.',
      },
      {
        id: 'taper_quietly',
        label: 'Quietly taper orders and say nothing',
        surface: {},
        fuses: ['supply_chain_opacity'],
        whisper: "The mill's Christmas shutdown starts in October this year.",
      },
    ],
  },
  {
    id: 'd_no_clean_fabric',
    category: 'materials',
    stage: 1,
    title: 'Three quotes',
    body: 'The new line needs a base fabric. Three quotes on the desk. There is no fourth option.',
    depth: "A lifecycle analyst's memo: \"Each option externalises a different cost onto a different place. The question is not which is clean. The question is which harm you choose to own.\"",
    art: 'three fabric swatches pinned side by side on a studio wall, morning light, entirely neutral',
    choices: [
      {
        id: 'organic',
        label: 'Organic cotton',
        surface: { heat: 6, cash: -5 },
        hidden: { water: 2.6, land: 15 },
      },
      {
        id: 'recycled_poly',
        label: 'Recycled polyester',
        surface: { heat: 3 },
        hidden: { microplastics: 500 },
      },
      {
        id: 'viscose',
        label: 'Conventional viscose',
        surface: { cash: 4 },
        hidden: { land: 20, water: 0.5 },
      },
    ],
  },
  {
    id: 'd_overtime_petition',
    category: 'manufacturing',
    stage: 2,
    title: 'The petition',
    character: 'Li Pengjian',
    body: 'You move to cap hours at the factory after the deadline crunch. Li Pengjian brings you a petition — signed by 140 workers — against the cap. Peak-season overtime is school fees, medicine, remittances. "They are asking you not to protect them."',
    depth: 'Yan Rong, privately: "The young ones want the hours. I am tired. Both things are true."',
    art: 'a folded paper petition on a workbench, many signatures visible as marks, not readable',
    choices: [
      {
        id: 'impose_cap',
        label: 'Impose the cap anyway',
        surface: { cash: -6 },
        hidden: { labour: -20 },
        reaction: "The cap holds. The remittances don't.",
      },
      {
        id: 'safeguards',
        label: 'Keep overtime, add safeguards',
        surface: { cash: -2 },
        hidden: { labour: 30 },
        fuses: ['worker_grievance'],
      },
      {
        id: 'raise_base',
        label: "Raise base pay so overtime isn't needed",
        surface: { cash: -22 },
        recurring: { cash: -5 },
        decayDelta: 2,
        reaction: 'Unit economics now depend on selling more. The trap, seen from the other side.',
      },
    ],
  },
  {
    id: 'd_dirty_money',
    category: 'funding',
    stage: 2,
    title: 'Dirty money, clean purpose',
    body: "A fast-fashion conglomerate — everything you're supposedly against — offers £400k for a 10% stake in your repair-and-resale arm. Their money would take circular fashion mainstream through their 900 stores. Your name stays off it.",
    depth: 'Their sustainability director, off the record: "I have a real budget for exactly three years, then I\'m replaced. Use me or don\'t."',
    art: 'two coffee cups on a glass table between facing chairs, one branded lanyard just out of focus',
    choices: [
      {
        id: 'take_it',
        label: 'Take it',
        surface: { cash: 400 },
        recurring: { hidden: { waste: -4 } },
        fuses: ['greenwashing_claim'],
        reaction: 'Circular rails appear in 900 stores. Your name is nowhere on them.',
      },
      {
        id: 'decline_conglomerate',
        label: 'Decline',
        surface: {},
        worldStates: ['circular_theatre'],
      },
    ],
  },
  {
    id: 'd_whistleblower',
    category: 'manufacturing',
    stage: 3,
    title: "The whistleblower's choice",
    body: 'The worker who emailed about the single exit writes again. An audit is scheduled. If you act on her photograph, the subcontractor will know exactly who talked. She asks you to wait until she finds other work. The building is still the building.',
    depth: 'The fire-safety engineer\'s report: "Probability of incident: low per month. Not zero. Cumulative."',
    art: 'an inbox on a dark screen, one unread message, cursor hovering — nothing else lit',
    choices: [
      {
        id: 'act_now',
        label: 'Act now',
        surface: { cash: -40 },
        clearsFuses: ['worker_grievance', 'worker_grievance'],
        worldStates: ['whistleblower_blacklisted'],
        reaction: 'The building is made safe in a month. She is never hired in the sector again.',
      },
      {
        id: 'wait',
        label: 'Wait, as she asks',
        surface: {},
        fuses: ['worker_grievance', 'worker_grievance'],
        whisper: 'Another month. The building is still the building.',
      },
      {
        id: 'payroll_first',
        label: 'Move her family onto your payroll first, then act',
        surface: { cash: -15 },
        fuses: ['worker_grievance'],
        reaction: 'Two months of risk, then she is out, and the audit lands.',
      },
    ],
  },
  {
    id: 'd_access_or_purity',
    category: 'volume',
    stage: 2,
    title: 'Access or purity',
    body: 'Your sustainable line works — at £120 a garment. A buyer for a value chain offers to license a simplified version at £15: heavier polyester blend, offshore production, but genuinely durable and repairable. "Sustainability that only the rich can buy isn\'t sustainability. It\'s positioning."',
    depth: 'Lifecycle data: the £15 durable blend, worn for years, can out-perform the £120 organic piece worn twice. Ownership behaviour, not fibre, dominates the footprint.',
    art: 'two identical white shirts on one rail, price tags turned away',
    choices: [
      {
        id: 'license_it',
        label: 'License it',
        surface: { heat: 8 },
        recurring: { cash: 30, hidden: { carbon: 50, microplastics: 80 } },
        reaction: '400,000 people can now afford a garment built to last.',
      },
      {
        id: 'refuse_license',
        label: 'Refuse; protect the standard',
        surface: { heat: 4 },
        hidden: { waste: 10 },
        worldStates: ['someone_worse'],
      },
    ],
  },
  {
    id: 'd_the_recall',
    category: 'endoflife',
    stage: 2,
    title: 'The recall',
    body: 'A dye batch in 60,000 shipped garments shows trace contamination — well under the legal limit, above your own published standard. Nobody outside the lab knows. A recall is ruinous; silence is a bet.',
    depth: 'Toxicologist: "At these levels, risk is negligible. Reputationally, \'negligible\' has never once survived a headline." The recall protects trust by generating waste.',
    art: 'a single folded garment in a specimen bag on a lab bench, fluorescent light',
    choices: [
      {
        id: 'full_recall',
        label: 'Full public recall',
        surface: { cash: -120, heat: -15 },
        hidden: { carbon: 180, waste: 45 },
        reaction: 'The letters go out under your signature. Honest, and enormous.',
      },
      {
        id: 'say_nothing',
        label: 'Quietly fix the process, say nothing',
        surface: {},
        fuses: ['greenwashing_claim'],
        whisper: 'The lab tech who ran the batch orders nothing from your site again.',
      },
      {
        id: 'voluntary_returns',
        label: 'Offer voluntary returns without stating why',
        surface: { cash: -30, heat: -4 },
        hidden: { waste: 10 },
      },
    ],
  },

  // ─────────────────────────── CRISIS CARDS — fire on tags ───────────────────────────
  {
    id: 'c_expose',
    category: 'marketing',
    stage: 2,
    crisis: { tags: ['supply_chain_opacity', 'worker_grievance'], count: 3 },
    title: 'Yasmin Ade is calling',
    character: 'Yasmin Ade',
    body: 'A journalist has spent four months on your supply chain. She has documents, payslips, photographs. She is offering you a right of reply before Sunday.',
    depth: 'Everything in her file is true. You know it is true because you decided it.',
    choices: [
      {
        id: 'deny',
        label: 'Deny everything — lawyer up',
        surface: { cash: -25, heat: -10 },
        fuses: ['greenwashing_claim'],
        reaction: 'The story runs anyway. Your denial is the headline.',
      },
      {
        id: 'pr',
        label: 'Crisis PR — pledge an inquiry',
        surface: { cash: -40, heat: -4 },
        fuses: ['greenwashing_claim'],
        reaction: 'The inquiry is announced. Its findings are due after the news cycle ends.',
      },
      {
        id: 'confess',
        label: 'Answer her questions honestly',
        surface: { heat: -15, novelty: -10 },
        clearsFuses: ['supply_chain_opacity'],
        reaction: 'The piece is devastating and fair. Three suppliers cut you off. One customer writes: thank you.',
      },
    ],
  },
  {
    id: 'c_fishkill',
    category: 'materials',
    stage: 2,
    crisis: { tags: ['toxic_discharge'], count: 1 },
    title: 'The river ran crimson',
    body: 'A photo is trending: the river below your dye house, running your signature colour, dead fish at the outfall. Your name is not attached. Yet.',
    depth: 'The dye house serves four brands. The crimson is only yours.',
    choices: [
      {
        id: 'distance',
        label: '"We are reviewing our suppliers"',
        surface: { cash: -8, heat: -5 },
        fuses: ['greenwashing_claim'],
      },
      {
        id: 'switch_quietly',
        label: 'Switch dye houses quietly',
        surface: { cash: -12 },
        hidden: { water: 0.5 },
        reaction: 'The new dye house is two rivers east.',
      },
      {
        id: 'fund_cleanup',
        label: 'Own it — fund the cleanup',
        surface: { cash: -30, heat: 2 },
        clearsFuses: ['toxic_discharge'],
      },
    ],
  },
  {
    id: 'c_fire',
    category: 'manufacturing',
    stage: 3,
    crisis: { tags: ['worker_grievance'], count: 3 },
    title: 'The fire',
    body: 'A blaze on the third floor of a subcontracted unit, 2am, during the rush shift. Eleven injured. The fire doors were chained. Your agent is not answering his phone.',
    depth: 'The chains were on the doors because of the unit price. The rush shift existed because of the deadline you set.',
    choices: [
      {
        id: 'relocate',
        label: 'Cut ties, relocate production',
        surface: { cash: -30, heat: -8 },
        fuses: ['supply_chain_opacity'],
        reaction: 'The order book barely notices. The eleven do.',
      },
      {
        id: 'compensate',
        label: 'Compensate the injured, fix the building',
        surface: { cash: -60, heat: -3 },
        clearsFuses: ['worker_grievance'],
      },
      {
        id: 'statement',
        label: '"Our thoughts are with those affected"',
        surface: { cash: -5, heat: -12 },
        fuses: ['greenwashing_claim'],
      },
    ],
  },
  {
    id: 'c_boycott',
    category: 'marketing',
    stage: 3,
    crisis: { tags: ['greenwashing_claim'], count: 3 },
    title: '#WearTheTruth',
    body: 'The receipts thread has 40k retweets: your pledges next to your practice, side by side, dated. A boycott is organising. It is very, very shareable.',
    depth: 'Every screenshot in the thread is real. The organisers include two of your earliest customers.',
    choices: [
      {
        id: 'ride_it',
        label: 'Ride it out — say nothing',
        surface: { novelty: -20, heat: -12 },
      },
      {
        id: 'rebrand',
        label: 'Rebrand — new name, new story',
        surface: { cash: -45, novelty: -6 },
        fuses: ['greenwashing_claim'],
        reaction: 'The internet finds the paperwork in nine days.',
      },
      {
        id: 'reform',
        label: 'Publish everything, set real targets',
        surface: { cash: -35, heat: 4, novelty: -8 },
        clearsFuses: ['greenwashing_claim', 'greenwashing_claim'],
      },
    ],
  },
  {
    id: 'c_fund_story',
    category: 'funding',
    stage: 2,
    crisis: { tags: ['undisclosed_animal_research'], count: 1 },
    title: 'Follow the money',
    body: "A finance blog has mapped your backers. Your 'conscious brand' is part-financed by a fund with three open animal-welfare investigations — and the angora footage just surfaced beside it.",
    depth: 'You knew. It cost one click to know, the day you signed. You did not click.',
    choices: [
      {
        id: 'buyout',
        label: 'Buy the stake back',
        surface: { cash: -80 },
        clearsFuses: ['undisclosed_animal_research'],
        reaction: 'The fund makes 60% in eighteen months. The story dies.',
      },
      {
        id: 'shrug',
        label: '"Investors do not set our values"',
        surface: { heat: -10 },
        fuses: ['greenwashing_claim'],
      },
    ],
  },
  {
    id: 'c_silicosis',
    category: 'manufacturing',
    stage: 3,
    crisis: { tags: ['sandblast'], count: 1 },
    title: 'The diagnosis',
    body: 'Three finishing-house workers, all under forty, diagnosed with silicosis. A law firm is assembling a claim. The worn-in look is in the photographs, on the rail, in the claim.',
    depth: 'Silicosis is incurable and entirely preventable. The laser-finishing quote is still in your inbox.',
    choices: [
      {
        id: 'settle_nda',
        label: 'Settle quietly, NDAs all round',
        surface: { cash: -45 },
        fuses: ['greenwashing_claim'],
      },
      {
        id: 'liability',
        label: 'Accept liability, fund treatment, ban the process',
        surface: { cash: -65, heat: 3 },
        clearsFuses: ['worker_grievance'],
      },
    ],
  },
]

export const cardById = (id: string): Card => {
  const card = CARDS.find((c) => c.id === id)
  if (!card) throw new Error(`Unknown card: ${id}`)
  return card
}

/** Human-readable fuse names — used by the real audit and the reveal. */
export const FUSE_LABELS: Record<string, string> = {
  toxic_discharge: 'untreated dye discharge',
  supply_chain_opacity: 'unaudited subcontracting',
  worker_grievance: 'wage and safety grievances',
  undisclosed_animal_research: 'a backer’s undisclosed animal research',
  greenwashing_claim: 'claims your practice does not support',
  sandblast: 'sandblasted finishing',
}
