// Placeholder building built from primitives. The component API
// (kind + grid position) is what GLTF models will drop into later.

interface Props {
  kind: string
  position: [number, number, number]
}

export function Building({ kind, position }: Props) {
  // Only one kind exists in Milestone 1; the switch is the contract.
  switch (kind) {
    case 'atelier':
    default:
      return (
        <group position={position}>
          <mesh castShadow position={[0, 0.28, 0]}>
            <boxGeometry args={[0.62, 0.56, 0.62]} />
            <meshStandardMaterial color="#e8e2d4" />
          </mesh>
          <mesh castShadow position={[0, 0.72, 0]}>
            <coneGeometry args={[0.5, 0.36, 4]} />
            <meshStandardMaterial color="#a05a3c" />
          </mesh>
        </group>
      )
  }
}
