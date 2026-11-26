import { Vector3 } from 'three'

// Fixed-step Verlet rope: pinned root, gravity and iterative distance constraints.
export function createHangingRope(length, segments = 24) {
  const spacing = length / segments
  const points = Array.from({ length: segments + 1 }, (_, i) => new Vector3(0, -i * spacing, 0))
  const previous = points.map(p => p.clone())
  const delta = new Vector3()
  function step(dt = 1 / 120) {
    for (let i = 1; i < points.length; i++) {
      const p = points[i], oldX = p.x, oldY = p.y, oldZ = p.z
      p.x += (p.x - previous[i].x) * .984
      p.y += (p.y - previous[i].y) * .984 - 6 * dt * dt
      p.z += (p.z - previous[i].z) * .984
      previous[i].set(oldX, oldY, oldZ)
    }
    for (let pass = 0; pass < 24; pass++) {
      points[0].set(0, 0, 0)
      for (let i = 0; i < segments; i++) {
        delta.subVectors(points[i + 1], points[i])
        const distance = delta.length()
        if (!distance) continue
        delta.multiplyScalar((distance - spacing) / distance)
        if (i === 0) points[i + 1].sub(delta)
        else { points[i].addScaledVector(delta, .5); points[i + 1].addScaledVector(delta, -.5) }
      }
    }
    points[0].set(0, 0, 0)
  }
  function brush(from, to, anchor, radius = .26) {
    const dx = to.x - from.x, dy = to.y - from.y, squared = dx * dx + dy * dy
    if (squared < .000001) return
    for (let i = 1; i < points.length; i++) {
      const p = points[i], x = p.x + anchor.x, y = p.y + anchor.y
      const t = Math.max(0, Math.min(1, ((x - from.x) * dx + (y - from.y) * dy) / squared))
      const distance = Math.hypot(x - from.x - t * dx, y - from.y - t * dy)
      if (distance >= radius) continue
      const weight = (1 - distance / radius) ** 2
      const force = Math.min(.009, Math.sqrt(squared) * .055) * weight * (1 - .45 * (i / segments) ** 2)
      const speed = Math.sqrt(squared)
      previous[i].x -= dx / speed * force
      previous[i].y -= dy / speed * force * .35
    }
  }
  return { points, previous, step, brush, spacing }
}
