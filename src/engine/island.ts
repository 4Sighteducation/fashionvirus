// World-builder simulation engine — pure TypeScript.
// ZERO React or Three.js imports in this directory (architecture rule 1).

export const GRID_SIZE = 12

export type Terrain = 'water' | 'sand' | 'grass' | 'rock'

export type PollutionStage = 0 | 1 | 2

export interface Tile {
  x: number
  z: number
  terrain: Terrain
  /** Land height in world units; 0 for water. */
  height: number
  building: string | null
  pollutionStage: PollutionStage
}

/** Deterministic RNG (mulberry32) so playthroughs are reproducible. */
export function makeRng(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Generate the island: radial falloff plus seeded jitter.
 *  Water at the rim, sand at the shoreline, grass inland, rock outcrops. */
export function generateIsland(seed: number): Tile[][] {
  const rng = makeRng(seed)
  const half = (GRID_SIZE - 1) / 2

  // Pre-roll jitter per tile so the shape is stable for a given seed.
  const grid: Tile[][] = []
  for (let z = 0; z < GRID_SIZE; z++) {
    const row: Tile[] = []
    for (let x = 0; x < GRID_SIZE; x++) {
      const dx = (x - half) / half
      const dz = (z - half) / half
      const dist = Math.sqrt(dx * dx + dz * dz)
      const jitter = (rng() - 0.5) * 0.28
      const edge = dist + jitter

      let terrain: Terrain
      if (edge > 1.02) terrain = 'water'
      else if (edge > 0.86) terrain = 'sand'
      else if (rng() < 0.07) terrain = 'rock'
      else terrain = 'grass'

      const height =
        terrain === 'water'
          ? 0
          : terrain === 'sand'
            ? 0.12
            : terrain === 'rock'
              ? 0.42 + rng() * 0.14
              : 0.2 + rng() * 0.12

      row.push({ x, z, terrain, height, building: null, pollutionStage: 0 })
    }
    grid.push(row)
  }

  // One placeholder building on a central grass tile (Milestone 1).
  outer: for (let z = half | 0; z < GRID_SIZE; z++) {
    for (let x = half | 0; x < GRID_SIZE; x++) {
      if (grid[z][x].terrain === 'grass') {
        grid[z][x].building = 'atelier'
        break outer
      }
    }
  }

  return grid
}
