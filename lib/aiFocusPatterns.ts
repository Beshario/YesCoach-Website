/**
 * Which movement patterns serve each Focus choice, so the prompt lists only
 * the exercises a session of that focus can use. A focus the map does not know
 * (or none) keeps every pattern: the choice is never defaulted.
 */

const CORE = ['anti_extension', 'anti_lateral_flexion', 'anti_rotation', 'rotation', 'lateral_flexion', 'flexion']
const PUSH = ['bench_press', 'push_up', 'dip', 'handstand_push_up', 'overhead_press', 'elbow_extension', 'shoulder_abduction', 'shoulder_flexion', 'shoulder_horizontal_adduction']
const PULL = ['horizontal_pull', 'pull_up', 'lat_pulldown', 'elbow_flexion', 'shoulder_extension', 'shoulder_horizontal_abduction', 'scapular_elevation', 'upright_pull', 'back_extension', 'wrist_extension', 'wrist_flexion']
const LEGS = ['squat', 'lunge', 'split_squat', 'step_up', 'hinge', 'hip_thrust', 'hip_abduction', 'hip_adduction', 'hip_extension', 'hip_flexion', 'knee_extension', 'knee_flexion', 'ankle_plantarflexion']

/** Strength focus value (as in aiPrompt GROUPS) to its patterns. Core rides along with every focus. */
export const STRENGTH_FOCUS: Record<string, string[]> = {
  'Push (chest, shoulders, triceps)': [...PUSH, ...CORE],
  'Pull (back, biceps)': [...PULL, ...CORE],
  Legs: [...LEGS, ...CORE],
  'Upper body': [...PUSH, ...PULL, ...CORE],
  'Lower body': [...LEGS, ...CORE],
}

/** Mobility focus value to its patterns. */
export const MOBILITY_FOCUS: Record<string, string[]> = {
  'Lower back': ['spinal-extension-stretch', 'spinal-flexion-stretch', 'spinal-flow', 'thoracic-stretch', 'glute-stretch', 'hamstring-stretch', 'hip-flexor-stretch', 'hip-rotation-stretch', 'bird-dog', 'glute-bridges-dynamic', 'torso-twists'],
  Hips: ['adductor-stretch', 'glute-stretch', 'hamstring-stretch', 'hip-flexor-stretch', 'hip-rotation-stretch', 'it-band-stretch', 'quad-stretch', 'walking-quad-stretch', 'leg-swings', 'glute-bridges-dynamic', 'worlds-greatest-stretch', 'cuban-rotations'],
  Shoulders: ['shoulder-stretch', 'shoulder-circles', 'arm-swings', 'cuban-rotations', 'scapular-wall-slides', 'pec-stretch', 'lat-stretch', 'triceps-stretch', 'biceps-stretch', 'thoracic-stretch', 'neck-stretch'],
  'Desk posture': ['neck-stretch', 'pec-stretch', 'thoracic-stretch', 'shoulder-stretch', 'shoulder-circles', 'scapular-wall-slides', 'hip-flexor-stretch', 'spinal-extension-stretch', 'wrist-extensor-stretch', 'wrist-flexor-stretch', 'finger-flexor-stretch', 'biceps-stretch', 'lat-stretch'],
  'Knees and ankles': ['ankle-circles', 'calf-stretch', 'quad-stretch', 'walking-quad-stretch', 'toe-heel-walks', 'hamstring-stretch', 'it-band-stretch', 'leg-swings'],
}

/** Mobility focuses that suit the warm-up and cool-down of each strength focus. */
export const WARMUP_FOR_STRENGTH: Record<string, string[]> = {
  'Push (chest, shoulders, triceps)': ['Shoulders', 'Desk posture'],
  'Pull (back, biceps)': ['Shoulders', 'Lower back'],
  Legs: ['Hips', 'Knees and ankles'],
  'Upper body': ['Shoulders', 'Desk posture', 'Lower back'],
  'Lower body': ['Hips', 'Knees and ankles', 'Lower back'],
}
