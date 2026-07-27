import { newGame, reduce, pressureLevel } from '../src/game/engine.ts'
import { cardById } from '../src/game/cards.ts'

function run(thesis: 'integrity' | 'growth', picks: string) {
  let s = newGame()
  s = reduce(s, { type: 'start' })
  s = reduce(s, {
    type: 'setup_brand',
    brand: { name: 'Test Co', paletteId: 'ink_bone', avatarId: 'monogram', thesis },
  })
  let pings = 0
  let desk = 0
  for (let i = 0; i < 8; i++) {
    if (!s.currentCardId || s.phase !== 'act1') break
    const card = cardById(s.currentCardId)
    const open = card.choices.filter((c) => !c.requiresSocial || s.social >= c.requiresSocial)
    let id = open[0]?.id ?? card.choices[0].id
    if (picks === 'integrity') {
      id = [...open].sort((a, b) => (b.surface.social || 0) - (a.surface.social || 0))[0].id
    } else {
      id = [...open].sort((a, b) => (b.surface.cash || 0) - (a.surface.cash || 0))[0].id
    }
    s = reduce(s, { type: 'choose', choiceId: id })
    if (s.pendingPing) {
      pings++
      const opt = s.pendingPing.options[0].id
      s = reduce(s, { type: 'resolve_ping', optionId: opt })
    }
    if (!s.deskActionUsed && s.phase === 'act1' && s.turn > 1) {
      const actId = picks === 'integrity' ? (s.cash >= 4 ? 'repair_clinic' : 'sit_tight') : 'teaser'
      s = reduce(s, { type: 'desk_action', actionId: actId })
      desk++
    }
  }
  return {
    thesis,
    turn: s.turn,
    cash: Math.round(s.cash),
    social: Math.round(s.social),
    novelty: Math.round(s.novelty),
    heat: Math.round(s.heat),
    decay: s.noveltyDecay,
    pings,
    desk,
    pressure: pressureLevel(s.fuses),
    allies: s.allies.length,
  }
}

console.log(JSON.stringify({ integrity: run('integrity', 'integrity'), growth: run('growth', 'growth') }, null, 2))
