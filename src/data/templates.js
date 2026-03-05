// ============================================================================
// TEMPLATE BASE PARA DÍAS (se usa para copiar a semanas 2-8)
// ============================================================================

const BASE_WEEK_TEMPLATE = {
  monday: {
    name: "Heavy Pull Day",
    type: "heavy",
    duration: "65-75 min",
    warmup: [
      "Jump rope: 3 min",
      "Círculos hombros: 15 adelante + 15 atrás",
      "Band pull-aparts: 2x20",
      "Face pulls: 2x15",
      "Dislocaciones: 2x10",
      "Rotaciones externas: 2x15",
      "Dead hang: 2x20-30seg",
      "Scapular pulls: 2x10",
      "Dominadas: 2x5 @ 60%"
    ],
    exercises: [
      { exerciseId: "weighted_pullup", sets: 5, reps: "3-5", rest: "3-4 min", notes: "Fuerza máxima. Si 5x5 → +2.5kg" },
      { exerciseId: "muscle_up", sets: 4, reps: "2-4", rest: "3 min", notes: "O Chest to bar" },
      { exerciseId: "front_lever_iso", sets: 5, reps: "10-15seg", rest: "2 min", notes: "Variante más difícil" },
      { exerciseId: "weighted_negative", sets: 2, reps: "3", rest: "2 min", notes: "Opcional - 5seg bajada" }
    ],
    prehab: ["Face pulls: 3x15", "Dead hang: 1x máx", "Band pull-aparts: 2x20"]
  },
  tuesday: {
    name: "Medium Volume Day",
    type: "medium",
    duration: "60-70 min",
    warmup: [
      "Movilidad: 4 min",
      "Band pull-aparts: 2x15",
      "Scapular pulls: 2x8"
    ],
    exercises: [
      { exerciseId: "archer_pullup", sets: 4, reps: "4-6 cada lado", rest: "2.5 min" },
      { exerciseId: "typewriter_pullup", sets: 3, reps: "3-5", rest: "2.5 min" },
      { exerciseId: "ring_row", sets: 4, reps: "8-10", rest: "2 min" },
      { exerciseId: "wide_pullup", sets: 3, reps: "6-8", rest: "2 min" },
      { exerciseId: "bicep_curl", sets: 3, reps: "10-12", rest: "90 seg" },
      { exerciseId: "lateral_raise", sets: 3, reps: "12-15", rest: "90 seg" }
    ],
    prehab: ["Face pulls: 2x20", "Rotaciones externas: 2x15"]
  },
  wednesday: {
    name: "Active Recovery + Piernas",
    type: "recovery",
    duration: "PM: 55-65 min",
    sessions: {
      am: {
        name: "Running (opcional)",
        exercises: [
          { exerciseId: "running_easy", sets: 1, reps: "20-30 min" }
        ]
      },
      pm: {
        name: "Recovery + Piernas",
        warmup: ["Movilidad: 4 min", "Scapular: 2x8"],
        exercises: [
          { exerciseId: "pullup", sets: 5, reps: "5", rest: "2-3 min", notes: "50-60% esfuerzo" },
          { exerciseId: "pistol_squat", sets: 4, reps: "5-8 cada pierna", rest: "2 min" },
          { exerciseId: "shrimp_squat", sets: 3, reps: "6-8 cada pierna", rest: "2 min" },
          { exerciseId: "nordic_curl", sets: 3, reps: "5-8", rest: "2.5 min" },
          { exerciseId: "bulgarian_split", sets: 3, reps: "10-12 cada pierna", rest: "90 seg" },
          { exerciseId: "calf_raise", sets: 3, reps: "15-20 cada pierna", rest: "60 seg" }
        ],
        glutes: ["Hip Thrust unilateral: 3x12-15", "Superman: 3x30-45seg"]
      }
    }
  },
  thursday: {
    name: "Heavy Explosive Day",
    type: "heavy",
    duration: "65-75 min",
    warmup: [
      "Jump rope: 3 min",
      "Movilidad: 5 min",
      "Band work: 4 min"
    ],
    exercises: [
      { exerciseId: "explosive_pullup", sets: 5, reps: "3", rest: "3 min", notes: "Chest-to-bar" },
      { exerciseId: "lockoff_90", sets: 4, reps: "8-12seg cada brazo", rest: "2 min" },
      { exerciseId: "front_lever_raises", sets: 4, reps: "5", rest: "2 min" },
      { exerciseId: "weighted_pullup", sets: 3, reps: "5", rest: "3 min", notes: "85% Lunes" }
    ],
    prehab: ["Face pulls: 3x15", "Band pull-aparts: 3x20", "YTW: 2x10"]
  },
  friday: {
    name: "Medium Hypertrophy + Aesthetics",
    type: "medium",
    duration: "65-75 min",
    warmup: ["Movilidad: 5 min", "Band work: 3 min"],
    exercises: [
      { exerciseId: "tempo_pullup", sets: 4, reps: "6-8", rest: "2 min", notes: "3-0-3" },
      { exerciseId: "australian_row", sets: 4, reps: "10", rest: "90 seg" },
      { exerciseId: "lateral_raise", sets: 4, reps: "12-15", rest: "90 seg" },
      { exerciseId: "front_lever_iso", sets: 3, reps: "15-20seg", rest: "90 seg" },
      { exerciseId: "face_pull", sets: 3, reps: "20", rest: "90 seg" }
    ],
    abs: [
      { exerciseId: "hanging_leg_raise", sets: 3, reps: "10-15", rest: "90 seg" },
      { exerciseId: "ring_rollout", sets: 3, reps: "8-10", rest: "90 seg" },
      { exerciseId: "hollow_body_hold", sets: 3, reps: "30-45seg", rest: "60 seg" },
      { exerciseId: "russian_twist", sets: 3, reps: "20", rest: "60 seg" }
    ]
  },
  saturday: {
    name: "Active Recovery",
    type: "recovery",
    duration: "PM: 35-45 min",
    sessions: {
      am: {
        name: "Running (opcional)",
        exercises: [
          { exerciseId: "running_fartlek", sets: 1, reps: "30-40 min" }
        ]
      },
      pm: {
        name: "GTG + Movilidad",
        gtg: "Cada 1.5-2h: 2-3 dominadas perfectas. Total: 20-30",
        mobility: [
          "Shoulder dislocations: 3x10",
          "Hip CARs: 2x5",
          "Cat-cow: 3x10"
        ]
      }
    }
  },
  sunday: {
    name: "Piernas Explosivas / Running",
    type: "legs",
    duration: "55-65 min",
    alternate: "Alterna: Pliométrico o Running largo",
    plyometric: {
      warmup: ["Jump rope: 3 min", "Leg swings: 2x12", "Build-up sprints: 3x30m"],
      exercises: [
        { exerciseId: "box_jump", sets: 5, reps: "3-5", rest: "2.5-3 min" },
        { exerciseId: "broad_jump", sets: 4, reps: "3-5", rest: "2.5 min" },
        { exerciseId: "jump_squat", sets: 4, reps: "8-10", rest: "2 min" },
        { exerciseId: "bounding", sets: 3, reps: "20-30m", rest: "2 min" },
        { exerciseId: "sprint", sets: 5, reps: "30-40m", rest: "1.5-2 min" },
        { exerciseId: "calf_jump", sets: 3, reps: "15-20", rest: "90 seg" }
      ],
      glutes: ["Hip Thrust: 3x12-15", "Glute bridge iso: 2x30seg"]
    },
    running: {
      exercises: [
        { exerciseId: "running_long", sets: 1, reps: "45-60 min" }
      ]
    }
  }
};

// Función para generar todas las 9 semanas
export const generateAllWeeks = () => {
  const weeks = {};
  
  // Semana 0 - Adaptación (diferente)
  weeks[0] = {
    name: "Semana 0: Adaptación",
    phase: "adaptation",
    description: "Tomar ritmo, tests iniciales",
    days: {
      monday: {
        name: "Test + Adaptación",
        type: "heavy",
        duration: "60-75 min",
        warmup: ["Jump rope: 3 min", "Círculos brazos: 15+15", "Band work: 4 min", "Dead hang: 2x20seg", "Scapular: 2x8", "Dominadas: 2x3"],
        exercises: [
          { exerciseId: "weighted_pullup", sets: 3, reps: "5", rest: "3 min", notes: "Test 3RM primero, luego 50% peso" },
          { exerciseId: "australian_row", sets: 3, reps: "8", rest: "2 min" },
          { exerciseId: "scapular_pull", sets: 3, reps: "10", rest: "90 seg" },
          { exerciseId: "dead_hang", sets: 3, reps: "20-30seg", rest: "90 seg" },
          { exerciseId: "face_pull", sets: 2, reps: "15", rest: "90 seg" }
        ],
        prehab: ["Band pull-aparts: 2x20", "Rotaciones: 2x15", "Wrist: 2 min"]
      },
      tuesday: {
        name: "Volumen Ligero",
        type: "medium",
        duration: "50-60 min",
        warmup: ["Movilidad: 5 min", "Band: 2x15", "Scapular: 2x8"],
        exercises: [
          { exerciseId: "wide_pullup", sets: 4, reps: "5", rest: "2 min" },
          { exerciseId: "australian_row", sets: 3, reps: "10", rest: "2 min" },
          { exerciseId: "chin_up", sets: 3, reps: "6", rest: "2 min" },
          { exerciseId: "bicep_curl", sets: 3, reps: "10", rest: "90 seg" },
          { exerciseId: "lateral_raise", sets: 3, reps: "12", rest: "90 seg" },
          { exerciseId: "hollow_body_hold", sets: 3, reps: "20seg", rest: "60 seg" }
        ]
      },
      wednesday: {
        name: "Recovery + Piernas Intro",
        type: "recovery",
        duration: "PM: 45-55 min",
        sessions: {
          am: {
            name: "Running (opcional)",
            exercises: [{ exerciseId: "running_easy", sets: 1, reps: "15-20 min" }]
          },
          pm: {
            name: "Recovery + Piernas",
            warmup: ["Movilidad: 5 min"],
            exercises: [
              { exerciseId: "pullup", sets: 5, reps: "3", rest: "2 min", notes: "50% esfuerzo" },
              { exerciseId: "bodyweight_squat", sets: 3, reps: "15", rest: "90 seg" },
              { exerciseId: "lunge", sets: 3, reps: "8 cada pierna", rest: "90 seg" },
              { exerciseId: "pistol_squat", sets: 3, reps: "5 cada pierna", rest: "2 min", notes: "Asistido" },
              { exerciseId: "glute_bridge", sets: 3, reps: "15", rest: "60 seg" },
              { exerciseId: "calf_raise", sets: 3, reps: "15", rest: "60 seg" }
            ]
          }
        }
      },
      thursday: {
        name: "Fuerza Ligera",
        type: "heavy",
        duration: "50-60 min",
        warmup: ["Jump rope: 3 min", "Movilidad: 5 min", "Band: 4 min"],
        exercises: [
          { exerciseId: "weighted_pullup", sets: 4, reps: "4", rest: "3 min", notes: "70% del test" },
          { exerciseId: "chest_to_bar", sets: 3, reps: "3", rest: "2.5 min" },
          { exerciseId: "dead_hang", sets: 3, reps: "30seg", rest: "90 seg" },
          { exerciseId: "wrist_curl", sets: 3, reps: "15", rest: "60 seg" },
          { exerciseId: "front_lever_iso", sets: 4, reps: "8-10seg", rest: "2 min", notes: "Variante test" }
        ]
      },
      friday: {
        name: "Tempo + Core",
        type: "medium",
        duration: "50-60 min",
        warmup: ["Movilidad: 5 min", "Band: 3 min"],
        exercises: [
          { exerciseId: "tempo_pullup", sets: 3, reps: "5", rest: "2 min" },
          { exerciseId: "australian_row", sets: 3, reps: "10", rest: "2 min" },
          { exerciseId: "lateral_raise", sets: 3, reps: "12", rest: "90 seg" },
          { exerciseId: "bicep_curl", sets: 3, reps: "10", rest: "90 seg" },
          { exerciseId: "hanging_knee_raise", sets: 3, reps: "10", rest: "90 seg" },
          { exerciseId: "plank", sets: 3, reps: "30seg", rest: "60 seg" },
          { exerciseId: "hollow_rocks", sets: 2, reps: "15", rest: "60 seg" }
        ]
      },
      saturday: {
        name: "Recovery Activo",
        type: "recovery",
        duration: "PM: 30-40 min",
        sessions: {
          am: {
            name: "Running (opcional)",
            exercises: [{ exerciseId: "running_easy", sets: 1, reps: "20-25 min" }]
          },
          pm: {
            name: "GTG + Movilidad",
            gtg: "Cada 1-2h: 2 dominadas. Total: 15-20",
            mobility: ["Shoulder dislocations: 3x10", "Wrist prep: 5 min"]
          }
        }
      },
      sunday: {
        name: "Piernas Explosivas Intro",
        type: "legs",
        duration: "50-60 min",
        warmup: ["Jump rope: 3 min", "Leg swings: 2x10", "Build-ups: 3x20m"],
        exercises: [
          { exerciseId: "box_jump", sets: 4, reps: "3", rest: "2.5 min", notes: "Altura baja" },
          { exerciseId: "broad_jump", sets: 3, reps: "3", rest: "2 min" },
          { exerciseId: "jump_squat", sets: 3, reps: "8", rest: "2 min" },
          { exerciseId: "bounding", sets: 2, reps: "20m", rest: "2 min" },
          { exerciseId: "sprint", sets: 3, reps: "30m", rest: "90 seg", notes: "80%" },
          { exerciseId: "glute_bridge", sets: 3, reps: "12", rest: "60 seg" }
        ]
      }
    }
  };
  
  // Semanas 1-3: Acumulación
  [1, 2, 3].forEach(weekNum => {
    weeks[weekNum] = {
      name: `Semana ${weekNum}: Acumulación`,
      phase: "accumulation",
      description: weekNum === 1 ? "Progresión conservadora" : 
                   weekNum === 2 ? "Incremento gradual" : "Pico de volumen",
      days: JSON.parse(JSON.stringify(BASE_WEEK_TEMPLATE)) // Deep copy
    };
  });
  
  // Semana 4: Deload
  weeks[4] = {
    name: "Semana 4: Deload",
    phase: "deload",
    description: "Recuperación - Volumen -40%",
    days: JSON.parse(JSON.stringify(BASE_WEEK_TEMPLATE))
  };
  
  // Semanas 5-7: Intensificación
  [5, 6, 7].forEach(weekNum => {
    weeks[weekNum] = {
      name: `Semana ${weekNum}: Intensificación`,
      phase: "intensification",
      description: weekNum === 5 ? "Intensificación inicial" :
                   weekNum === 6 ? "Intensificación media" : "Pico intensificación",
      days: JSON.parse(JSON.stringify(BASE_WEEK_TEMPLATE))
    };
  });
  
  // Semana 8: Deload + Test
  weeks[8] = {
    name: "Semana 8: Deload + Test",
    phase: "test",
    description: "Recuperación + Tests finales",
    days: JSON.parse(JSON.stringify(BASE_WEEK_TEMPLATE))
  };
  
  return weeks;
};
