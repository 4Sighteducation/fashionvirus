import { useMemo } from 'react'
import { GRID_SIZE, generateIsland } from '../engine/island'
import { Building } from './Building'

const TERRAIN_COLOURS: Record<string, string> = {
  sand: '#d8c8a0',
  grass: '#7fa86a',
  rock: '#9a9488',
}

interface Props {
  seed: number
}

/** Read-only visualisation of the generated grid (architecture rule 2). */
export function Island({ seed }: Props) {
  const grid = useMemo(() => generateIsland(seed), [seed])
  const half = (GRID_SIZE - 1) / 2

  return (
    <group>
      {grid.flat().map((tile) => {
        if (tile.terrain === 'water') return null
        const wx = tile.x - half
        const wz = tile.z - half
        return (
          <group key={`${tile.x}-${tile.z}`}>
            <mesh castShadow receiveShadow position={[wx, tile.height / 2, wz]}>
              <boxGeometry args={[0.98, tile.height, 0.98]} />
              <meshStandardMaterial color={TERRAIN_COLOURS[tile.terrain]} />
            </mesh>
            {tile.building && (
              <Building kind={tile.building} position={[wx, tile.height, wz]} />
            )}
          </group>
        )
      })}

      {/* The sea — one plane under everything. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#6d9bb5" />
      </mesh>
    </group>
  )
}
