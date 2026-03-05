// ============================================================================
// BASE DE DATOS DE EJERCICIOS (IGUAL QUE ANTES)
// ============================================================================

export const EXERCISE_DATABASE = {
  "weighted_pullup": {
    name: "Dominada Lastrada",
    category: "pull",
    trackWeight: true,
    trackReps: true,
    defaultSets: 5,
    defaultReps: "3-5",
    defaultRest: "3-4 min"
  },
  "pullup": {
    name: "Dominada",
    category: "pull",
    trackReps: true,
    defaultSets: 4,
    defaultReps: "8-12",
    defaultRest: "2 min"
  },
  "archer_pullup": {
    name: "Dominada Archer",
    category: "pull",
    trackReps: true,
    trackWeight: true,
    defaultSets: 4,
    defaultReps: "4-6 cada lado",
    defaultRest: "2.5 min"
  },
  "typewriter_pullup": {
    name: "Dominada Typewriter",
    category: "pull",
    trackReps: true,
    defaultSets: 3,
    defaultReps: "3-5",
    defaultRest: "2.5 min"
  },
  "wide_pullup": {
    name: "Dominada Wide Grip",
    category: "pull",
    trackReps: true,
    defaultSets: 3,
    defaultReps: "6-8",
    defaultRest: "2 min"
  },
  "chin_up": {
    name: "Dominada Chin-up",
    category: "pull",
    trackReps: true,
    defaultSets: 3,
    defaultReps: "6-8",
    defaultRest: "2 min"
  },
  "explosive_pullup": {
    name: "Dominada Explosiva",
    category: "pull",
    trackReps: true,
    trackWeight: true,
    defaultSets: 5,
    defaultReps: "3",
    defaultRest: "3 min"
  },
  "tempo_pullup": {
    name: "Dominada Tempo 3-0-3",
    category: "pull",
    trackReps: true,
    defaultSets: 4,
    defaultReps: "6-8",
    defaultRest: "2 min"
  },
  "weighted_negative": {
    name: "Dominada Negativa Pesada",
    category: "pull",
    trackWeight: true,
    trackReps: true,
    defaultSets: 2,
    defaultReps: "3",
    defaultRest: "2 min"
  },
  "muscle_up": {
    name: "Muscle Up",
    category: "pull",
    trackReps: true,
    trackWeight: true,
    defaultSets: 4,
    defaultReps: "2-4",
    defaultRest: "3 min"
  },
  "chest_to_bar": {
    name: "Chest to Bar Pull-up",
    category: "pull",
    trackReps: true,
    trackWeight: true,
    defaultSets: 4,
    defaultReps: "3-4",
    defaultRest: "3 min"
  },
  "front_lever_iso": {
    name: "Front Lever Isométrico",
    category: "skill",
    trackTime: true,
    trackVariant: true,
    variants: ["Tuck", "Adv Tuck", "Straddle", "Half Lay", "Full"],
    defaultSets: 5,
    defaultReps: "10-15seg",
    defaultRest: "2 min"
  },
  "front_lever_raises": {
    name: "Front Lever Raises",
    category: "skill",
    trackReps: true,
    trackVariant: true,
    variants: ["Tuck", "Adv Tuck", "Straddle", "Half Lay", "Full"],
    defaultSets: 4,
    defaultReps: "5",
    defaultRest: "2 min"
  },
  "lockoff_90": {
    name: "90° Lockoff Hold",
    category: "pull",
    trackTime: true,
    trackWeight: true,
    defaultSets: 4,
    defaultReps: "8-12seg cada brazo",
    defaultRest: "2 min"
  },
  "ring_row": {
    name: "Remo en Anillas",
    category: "pull",
    trackReps: true,
    defaultSets: 4,
    defaultReps: "8-10",
    defaultRest: "2 min"
  },
  "australian_row": {
    name: "Australian Row",
    category: "pull",
    trackReps: true,
    defaultSets: 3,
    defaultReps: "10",
    defaultRest: "90 seg"
  },
  "bicep_curl": {
    name: "Bicep Curl",
    category: "arms",
    trackReps: true,
    trackWeight: true,
    defaultSets: 3,
    defaultReps: "10-12",
    defaultRest: "90 seg"
  },
  "lateral_raise": {
    name: "Vuelos Laterales",
    category: "shoulders",
    trackReps: true,
    trackWeight: true,
    defaultSets: 3,
    defaultReps: "12-15",
    defaultRest: "90 seg"
  },
  "face_pull": {
    name: "Face Pulls",
    category: "shoulders",
    trackReps: true,
    defaultSets: 3,
    defaultReps: "15-20",
    defaultRest: "90 seg"
  },
  "hanging_leg_raise": {
    name: "Hanging Leg Raises",
    category: "core",
    trackReps: true,
    defaultSets: 3,
    defaultReps: "10-15",
    defaultRest: "90 seg"
  },
  "hanging_knee_raise": {
    name: "Hanging Knee Raises",
    category: "core",
    trackReps: true,
    defaultSets: 3,
    defaultReps: "10-15",
    defaultRest: "90 seg"
  },
  "plank": {
    name: "Plank",
    category: "core",
    trackTime: true,
    defaultSets: 3,
    defaultReps: "30-60seg",
    defaultRest: "60 seg"
  },
  "hollow_body_hold": {
    name: "Hollow Body Hold",
    category: "core",
    trackTime: true,
    defaultSets: 3,
    defaultReps: "30-45seg",
    defaultRest: "60 seg"
  },
  "hollow_rocks": {
    name: "Hollow Rocks",
    category: "core",
    trackReps: true,
    defaultSets: 3,
    defaultReps: "15-20",
    defaultRest: "60 seg"
  },
  "russian_twist": {
    name: "Russian Twists",
    category: "core",
    trackReps: true,
    trackWeight: true,
    defaultSets: 3,
    defaultReps: "20",
    defaultRest: "60 seg"
  },
  "ring_rollout": {
    name: "Ring Rollouts",
    category: "core",
    trackReps: true,
    defaultSets: 3,
    defaultReps: "8-10",
    defaultRest: "90 seg"
  },
  "l_sit": {
    name: "L-sit",
    category: "core",
    trackTime: true,
    defaultSets: 3,
    defaultReps: "20-30seg",
    defaultRest: "90 seg"
  },
  "side_plank": {
    name: "Side Plank",
    category: "core",
    trackTime: true,
    defaultSets: 2,
    defaultReps: "20-30seg cada lado",
    defaultRest: "60 seg"
  },
  "pistol_squat": {
    name: "Pistol Squat",
    category: "legs",
    trackReps: true,
    trackWeight: true,
    trackVariant: true,
    variants: ["Asistido", "Full BW", "Con 5kg", "Con 10kg", "Con 15kg"],
    defaultSets: 4,
    defaultReps: "5-8 cada pierna",
    defaultRest: "2 min"
  },
  "shrimp_squat": {
    name: "Shrimp Squat",
    category: "legs",
    trackReps: true,
    trackWeight: true,
    defaultSets: 3,
    defaultReps: "6-8 cada pierna",
    defaultRest: "2 min"
  },
  "nordic_curl": {
    name: "Nordic Hamstring Curl",
    category: "legs",
    trackReps: true,
    trackVariant: true,
    variants: ["Banda fuerte", "Banda ligera", "Solo excéntrico", "Full"],
    defaultSets: 3,
    defaultReps: "5-8",
    defaultRest: "2.5 min"
  },
  "bulgarian_split": {
    name: "Bulgarian Split Squat",
    category: "legs",
    trackReps: true,
    trackWeight: true,
    defaultSets: 3,
    defaultReps: "10-12 cada pierna",
    defaultRest: "90 seg"
  },
  "calf_raise": {
    name: "Single Leg Calf Raise",
    category: "legs",
    trackReps: true,
    defaultSets: 3,
    defaultReps: "15-20 cada pierna",
    defaultRest: "60 seg"
  },
  "bodyweight_squat": {
    name: "Bodyweight Squat",
    category: "legs",
    trackReps: true,
    defaultSets: 3,
    defaultReps: "15-20",
    defaultRest: "60 seg"
  },
  "lunge": {
    name: "Lunges",
    category: "legs",
    trackReps: true,
    trackWeight: true,
    defaultSets: 3,
    defaultReps: "10 cada pierna",
    defaultRest: "90 seg"
  },
  "box_jump": {
    name: "Box Jumps",
    category: "legs_plyo",
    trackReps: true,
    defaultSets: 5,
    defaultReps: "3-5",
    defaultRest: "2.5-3 min"
  },
  "broad_jump": {
    name: "Broad Jumps",
    category: "legs_plyo",
    trackReps: true,
    defaultSets: 4,
    defaultReps: "3-5",
    defaultRest: "2.5 min"
  },
  "jump_squat": {
    name: "Jump Squats",
    category: "legs_plyo",
    trackReps: true,
    trackWeight: true,
    defaultSets: 4,
    defaultReps: "8-10",
    defaultRest: "2 min"
  },
  "bounding": {
    name: "Bounding",
    category: "legs_plyo",
    trackReps: true,
    defaultSets: 3,
    defaultReps: "20-30m",
    defaultRest: "2 min"
  },
  "sprint": {
    name: "Sprints",
    category: "legs_plyo",
    trackReps: true,
    defaultSets: 5,
    defaultReps: "30-40m",
    defaultRest: "1.5-2 min"
  },
  "calf_jump": {
    name: "Calf Jumps",
    category: "legs_plyo",
    trackReps: true,
    defaultSets: 3,
    defaultReps: "15-20",
    defaultRest: "90 seg"
  },
  "running_easy": {
    name: "Running Fácil",
    category: "cardio",
    trackTime: true,
    defaultSets: 1,
    defaultReps: "20-30 min",
    defaultRest: "N/A"
  },
  "running_fartlek": {
    name: "Running Fartlek",
    category: "cardio",
    trackTime: true,
    defaultSets: 1,
    defaultReps: "30-40 min",
    defaultRest: "N/A"
  },
  "running_long": {
    name: "Running Largo",
    category: "cardio",
    trackTime: true,
    defaultSets: 1,
    defaultReps: "45-60 min",
    defaultRest: "N/A"
  },
  "scapular_pull": {
    name: "Scapular Pulls",
    category: "prehab",
    trackReps: true,
    defaultSets: 2,
    defaultReps: "8-10",
    defaultRest: "60 seg"
  },
  "dead_hang": {
    name: "Dead Hang",
    category: "prehab",
    trackTime: true,
    defaultSets: 2,
    defaultReps: "20-30seg",
    defaultRest: "60 seg"
  },
  "glute_bridge": {
    name: "Glute Bridge",
    category: "glutes",
    trackReps: true,
    defaultSets: 3,
    defaultReps: "15-20",
    defaultRest: "60 seg"
  },
  "hip_thrust": {
    name: "Hip Thrust",
    category: "glutes",
    trackReps: true,
    trackWeight: true,
    defaultSets: 3,
    defaultReps: "12-15",
    defaultRest: "90 seg"
  },
  "wrist_curl": {
    name: "Wrist Curls",
    category: "forearms",
    trackReps: true,
    trackWeight: true,
    defaultSets: 3,
    defaultReps: "15",
    defaultRest: "60 seg"
  }
};