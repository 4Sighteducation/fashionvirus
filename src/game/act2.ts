import type { Ally, Ledger, Repair, Whisper } from './types'

// ─── Allies — social capital, made into people. ───
// They join at milestones in Act 1 and are still there in Act 2.
// That is the entire point of them.

export const ALLIES: Ally[] = [
  {
    id: 'yan_rong',
    name: 'Yan Rong',
    threshold: 25,
    joinLine: 'Yan Rong starts a Tuesday mending class in the studio. You didn’t ask her to.',
    act2Line: 'Yan Rong’s Tuesday class has a waiting list. She has trained four teachers.',
  },
  {
    id: 'geography_teacher',
    name: 'The geography teacher',
    threshold: 45,
    joinLine: 'The geography teacher who once tagged you in a beach photo writes again — this time about her class’s repair project.',
    act2Line: 'The geography teacher brings a school group to the hub every term. They map where clothes go.',
  },
  {
    id: 'youth_ambassadors',
    name: 'The youth ambassadors',
    threshold: 65,
    joinLine: 'Six teenagers run your resale pop-up better than your retail team ever did. They call themselves the ambassadors.',
    act2Line: 'The ambassadors run three pop-ups now. Nobody in them has ever met you.',
  },
  {
    id: 'volunteer_corps',
    name: 'The volunteer corps',
    threshold: 85,
    joinLine: 'There is a waiting list to volunteer. Forty names. People want to be part of what you’re making.',
    act2Line: 'Saturday mornings, the yard fills with volunteers before the kettle has boiled.',
  },
]

export const allyById = (id: string): Ally => {
  const ally = ALLIES.find((a) => a.id === id)
  if (!ally) throw new Error(`Unknown ally: ${id}`)
  return ally
}

/** Low social capital in Act 2 reads as isolation — one line per year. */
export const ISOLATION_LINES = [
  'You make calls. Nobody returns them.',
  'The contractors quote full rate, cash up front. There is no goodwill to draw on.',
  'The consultation meeting is you, the consultant, and empty chairs.',
  'A local paper covers the repair work. Nobody local is quoted, because nobody local was involved.',
  'You do the work anyway. Alone is slower.',
]

// ─── Threshold whispers — peripheral, one line, easy to ignore. ───
// (Cards also carry their own whispers; these fire on ledger milestones.)

export const WHISPERS: Whisper[] = [
  {
    id: 'w-water',
    text: 'Someone posted a photo of the river below the dye house. The colour is this season’s.',
    when: (l) => l.water >= 1.5,
  },
  {
    id: 'w-labour',
    text: 'Yan Rong hasn’t been paid in full this month. She doesn’t mention it.',
    when: (l) => l.labour >= 60,
  },
  {
    id: 'w-waste',
    text: 'Nobody asks where the returns lorry goes on Thursdays.',
    when: (l) => l.waste >= 20,
  },
  {
    id: 'w-micro',
    text: 'A marine lab keeps emailing about fibres. PR says it’s niche.',
    when: (l) => l.microplastics >= 400,
  },
  {
    id: 'w-carbon',
    text: 'The freight bill doubled. You flew it anyway.',
    when: (l) => l.carbon >= 150,
  },
  {
    id: 'w-land',
    text: 'The satellite view of the sourcing region has changed since last year. Nobody at yours looks at satellite views.',
    when: (l) => l.land >= 20,
  },
  {
    id: 'w-novelty',
    text: 'The feed has moved on. You need a drop.',
    when: (_l, novelty) => novelty <= 15,
  },
  {
    id: 'w-water2',
    text: 'Four towns are on a hosepipe ban. The cotton isn’t.',
    when: (l) => l.water >= 3.5,
  },
  {
    id: 'w-labour2',
    text: 'The night shift has a night shift now.',
    when: (l) => l.labour >= 150,
  },
]

// ─── The repair vocabulary — Schumacher, made mechanical. ───
// Local, small-scale, appropriate, owned by the people using it.
// None of it is glamorous. All of it is slow.

export const REPAIRS: Repair[] = [
  {
    id: 'repair-hub',
    title: 'The repair hub',
    body: 'A neighbourhood workshop in the old showroom. Six benches, four machines, two of your former machinists teaching. Mends about 60 garments a week.',
    cost: 35,
    heals: { waste: 6, labour: 30 },
    indicator: 'Yan Rong runs the Tuesday class. Waiting list: three weeks.',
  },
  {
    id: 'bioremediation',
    title: 'Bioremediation',
    body: 'Reed beds and fungal treatment at the dye house outfall. Biology, on biology’s schedule. The consultant says twenty years and won’t promise that.',
    cost: 55,
    heals: { water: 1.2 },
    indicator: 'Dissolved oxygen at the outfall: up 4%. Nothing lives there yet.',
  },
  {
    id: 'land-rest',
    title: 'Land rest',
    body: 'Cap the dump site, fence it, plant nothing, let it be. Costs almost nothing but time — which is the one thing you can’t buy back.',
    cost: 8,
    heals: { land: 14, waste: 3 },
    indicator: 'Birch seedlings on the capped mound. Self-sown.',
  },
  {
    id: 'micro-mill',
    title: 'The micro-mill',
    body: 'A regional mill in a converted barn: eight compact looms, wool from hills you can see from the door, solar on the roof. Employs eleven people.',
    cost: 70,
    heals: { carbon: 90, labour: 25, microplastics: 120 },
    indicator: 'First bolt of cloth sold to a school uniform co-op.',
  },
  {
    id: 'skills',
    title: 'Skills transfer',
    body: 'Fund mending and pattern-cutting classes in six towns. Teaching repair compounds: everyone taught teaches someone.',
    cost: 20,
    heals: { waste: 5, labour: 20 },
    indicator: 'A student opened her own repair counter in the market.',
  },
  {
    id: 'commons',
    title: 'Commons ownership',
    body: 'Sign the infrastructure over — hub, mill, machines — to a community trust. It stops being yours. That is what makes it last.',
    cost: 45,
    heals: { labour: 35, waste: 5, land: 5 },
    indicator: 'The trust’s first AGM ran four hours. Nobody asked about you.',
  },
  // ── Community repairs — only exist if you built the community. ──
  {
    id: 'youth_programme',
    title: 'The youth programme',
    body: 'The ambassadors want to teach. Give them a budget, a room, and get out of the way. They reach people you never could.',
    cost: 12,
    heals: { labour: 25, waste: 4 },
    indicator: 'A sixteen-year-old explains garment lifecycles to a council committee. The committee listens.',
    requiresSocial: 45,
  },
  {
    id: 'volunteer_days',
    title: 'Volunteer restoration days',
    body: 'The waiting list becomes a workforce. Riverbank clearances, mending marathons, planting on the capped mound. You supply tools and tea.',
    cost: 5,
    heals: { waste: 5, land: 8, labour: 10, water: 0.3 },
    indicator: 'Two hundred people came on Saturday. It rained. They stayed.',
    requiresSocial: 65,
  },
]

/** What a repair actually costs: scaled up by damage, down by community.
 *  Below social 25 nobody shows up; at 100 volunteers take 40% off;
 *  the youth programme compounds it. */
export function repairCost(repair: Repair, damage: number, social: number, repairsChosen: string[]): number {
  const volunteers = social >= 25 ? 0.4 * (social / 100) : 0
  const communityDiscount = volunteers + (repairsChosen.includes('youth_programme') ? 0.1 : 0)
  return Math.max(2, Math.round(repair.cost * (1 + damage) * (1 - Math.min(0.5, communityDiscount))))
}

export const repairById = (id: string): Repair => {
  const repair = REPAIRS.find((r) => r.id === id)
  if (!repair) throw new Error(`Unknown repair: ${id}`)
  return repair
}

// ─── World-states — choices that changed the map, not just the numbers. ───

export const WORLD_STATES: Record<string, string> = {
  mill_town_dies: 'The mill town did not survive losing you. The chimney is cold; the school is for sale.',
  circular_theatre:
    'A hollow version of your resale idea runs in 900 stores. It recirculates almost nothing. Everyone believes it.',
  someone_worse: 'The shelf you refused was filled by someone worse. Six washes, then landfill.',
  whistleblower_blacklisted:
    'The building is safe. The woman who made it safe has not worked in the sector since.',
}

// ─── Damage & endings ───

/** Rough per-run ceiling for each ledger key across a dirty 12-turn run. */
export const LEDGER_CEILING: Ledger = {
  water: 4.5, // million litres
  carbon: 600, // tonnes
  waste: 70, // tonnes
  microplastics: 1000, // kg
  labour: 320, // thousand hours
  land: 55, // hectares
}

const WEIGHTS: Ledger = {
  water: 0.2,
  carbon: 0.18,
  waste: 0.18,
  microplastics: 0.14,
  labour: 0.2,
  land: 0.1,
}

/** 0 (clean) .. 1 (wasteworld). */
export function damageScore(ledger: Ledger): number {
  let score = 0
  for (const key of Object.keys(WEIGHTS) as (keyof Ledger)[]) {
    score += WEIGHTS[key] * Math.min(1, ledger[key] / LEDGER_CEILING[key])
  }
  return Math.min(1, score)
}

/** Which ledger key dominates the damage — picks the Act 2 scene. */
export function dominantDamage(ledger: Ledger): keyof Ledger {
  let worst: keyof Ledger = 'waste'
  let worstRatio = -1
  for (const key of Object.keys(LEDGER_CEILING) as (keyof Ledger)[]) {
    const ratio = ledger[key] / LEDGER_CEILING[key]
    if (ratio > worstRatio) {
      worstRatio = ratio
      worst = key
    }
  }
  return worst
}

export function act2Scene(ledger: Ledger, damage: number, social = 0): string {
  if (damage < 0.3) {
    // The clean world with people in it is a different picture from
    // the clean world without them.
    return social >= 50 ? '/assets/scenes/b1-repair-hub.png' : '/assets/scenes/b2-living-river.png'
  }
  const scenes: Record<keyof Ledger, string> = {
    water: '/assets/scenes/a2-dye-river.png',
    waste: '/assets/scenes/a1-textile-mountain.png',
    labour: '/assets/scenes/a7-company-town.png',
    land: '/assets/scenes/a5-dry-reservoir.png',
    carbon: '/assets/scenes/a4-bale-port.png',
    microplastics: '/assets/scenes/a4-bale-port.png',
  }
  return scenes[dominantDamage(ledger)]
}

export interface Ending {
  headline: string
  sub: string
  register: 'clean' | 'hard' | 'bleak' | 'folded'
  /** The social axis: did anyone stand with you at the end? */
  held: boolean
}

/** Not a happy ending — a different one. Damage decides the world;
 *  social capital decides whether you face it alone. */
export function ending(cashK: number, damage: number, folded: boolean, social = 0): Ending {
  const money =
    cashK >= 1000 ? `£${(cashK / 1000).toFixed(1)} million` : `£${Math.max(0, Math.round(cashK))},000`
  const held = social >= 50

  if (folded) {
    return held
      ? {
          headline: 'The label folds. The people don’t.',
          sub: 'The stock is in a warehouse somewhere, still wrapped. The Tuesday class still runs. The things you built that were never for sale are still standing.',
          register: 'folded',
          held,
        }
      : {
          headline: 'The label folds.',
          sub: 'No awards, no exposé, no epilogue. The stock is in a warehouse somewhere, still wrapped.',
          register: 'folded',
          held,
        }
  }
  if (damage < 0.3) {
    return held
      ? {
          headline: `You made ${money}. The river still runs — and you are not alone.`,
          sub: 'You slowed the collapse. You never made your community pay for your growth, and they know it. Some zones never needed repairing, because you never broke them. What you built that mattered is not on the balance sheet.',
          register: 'clean',
          held,
        }
      : {
          headline: `You made ${money}. The river still runs.`,
          sub: 'You stayed small. Your competitors ate your lunch and poisoned theirs. Some zones never needed repairing, because you never broke them.',
          register: 'clean',
          held,
        }
  }
  if (damage < 0.6) {
    return held
      ? {
          headline: `You made ${money}. The repair has hands.`,
          sub: 'Not all of it comes back. But the hubs are staffed, the classes are full, and the work continues whether or not you are watching. Repair is still hard. You are not alone in it.',
          register: 'hard',
          held,
        }
      : {
          headline: `You made ${money}. Some of it will come back.`,
          sub: 'Not all of it. The repairs you funded are working, slowly, at the speed of biology and apprenticeship. The rest is what the word "legacy" actually means.',
          register: 'hard',
          held,
        }
  }
  return held
    ? {
        headline: `You made ${money}. The river will take two hundred years. People are staying anyway.`,
        sub: 'The damage outruns anything you can fund. What is left is the community you kept — pockets of resilience in a world you broke. They didn’t stay for the brand.',
        register: 'bleak',
        held,
      }
    : {
        headline: `You made ${money}. The river will take two hundred years.`,
        sub: 'The repairs you could afford fixed almost nothing. The kingfisher does not come back in your lifetime. This world is now the game.',
        register: 'bleak',
        held,
      }
}
