// Exact integration of exponential drag keeps inertia independent of refresh rate.
export function integrateMomentum(velocity: number, milliseconds: number) {
  const decay = Math.exp(-Math.max(0, milliseconds) / 180)
  return { velocity: velocity * decay, distance: velocity * .18 * (1 - decay) }
}
