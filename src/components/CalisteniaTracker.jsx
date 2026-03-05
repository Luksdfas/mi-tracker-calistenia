import React, { useState, useEffect } from 'react';
import { 
  Calendar, TrendingUp, Dumbbell, Target, Award, ChevronRight, ChevronLeft, 
  Check, X, Plus, Minus, Clock, Flame, Activity, BarChart3, Edit2, Save, 
  Copy, Trash2, Database, Settings, ArrowRight, Eye, EyeOff, Menu, XCircle,
  PlusCircle, FileText, PlayCircle, PauseCircle, CheckCircle, Circle
} from 'lucide-react';

import { EXERCISE_DATABASE } from '../data/exerciseDatabase';
import { generateAllWeeks } from '../data/templates';
import { supabase } from '../lib/supabase';

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

const CalisteniaTrackerPro = () => {
  const [mesocycles, setMesocycles] = useState([]);
  const [currentMesocycleId, setCurrentMesocycleId] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [currentDay, setCurrentDay] = useState('monday');
  const [view, setView] = useState('mesocycles');
  const [exerciseDatabase, setExerciseDatabase] = useState(EXERCISE_DATABASE);
  const [editMode, setEditMode] = useState(false);
  const [showWarmup, setShowWarmup] = useState(false);
  const [sessionType, setSessionType] = useState('pm');
  const [editingExercise, setEditingExercise] = useState(null);

  // Cargar datos al iniciar la app
  useEffect(() => {
    loadData();
  }, []);

const loadData = async () => {
    // Si no hay sesión (modo local), usa localStorage
    if (!session?.user?.id) {
      const savedMesocycles = localStorage.getItem('calistenia_mesocycles');
      if (savedMesocycles) setMesocycles(JSON.parse(savedMesocycles));
      return;
    }

    try {
      // Buscar datos en la nube
      const { data, error } = await supabase
        .from('user_data')
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      if (data) {
        setMesocycles(data.mesocycles || []);
        if (data.mesocycles?.length > 0) setCurrentMesocycleId(data.mesocycles[0].id);
        
        // Cargar ejercicios personalizados si los hay
        if (Object.keys(data.exercises || {}).length > 0) {
          setExerciseDatabase(data.exercises);
        }
      } else {
        // Si es usuario nuevo, crea su registro en la base de datos
        await supabase.from('user_data').insert([
          { user_id: session.user.id, mesocycles: [], exercises: EXERCISE_DATABASE }
        ]);
      }
    } catch (error) {
      console.error('Error cargando de Supabase:', error);
    }
  };

const saveMesocycles = async (data) => {
    setMesocycles(data); // Actualiza la pantalla rápido
    
    if (session?.user?.id) {
      // Guarda en la nube
      await supabase
        .from('user_data')
        .update({ mesocycles: data })
        .eq('user_id', session.user.id);
    } else {
      // Guarda en local si no hay internet o sesión
      localStorage.setItem('calistenia_mesocycles', JSON.stringify(data));
    }
  };

const saveExerciseDatabase = async (data) => {
    setExerciseDatabase(data);
    
    if (session?.user?.id) {
      await supabase
        .from('user_data')
        .update({ exercises: data })
        .eq('user_id', session.user.id);
    }
  };

  const createNewMesocycle = () => {
    const newMesocycle = {
      id: `meso_${Date.now()}`,
      name: `Mesociclo ${mesocycles.length + 1}`,
      startDate: new Date().toISOString(),
      status: 'active',
      weeks: generateAllWeeks(),
      workoutData: {},
      completedDays: {}
    };
    
    const updated = [...mesocycles, newMesocycle];
    saveMesocycles(updated);
    setCurrentMesocycleId(newMesocycle.id);
    setView('calendar');
  };

  const duplicateMesocycle = (mesocycleId) => {
    const original = mesocycles.find(m => m.id === mesocycleId);
    if (!original) return;
    
    const duplicate = {
      ...JSON.parse(JSON.stringify(original)),
      id: `meso_${Date.now()}`,
      name: `${original.name} (Copia)`,
      startDate: new Date().toISOString(),
      status: 'active',
      workoutData: {},
      completedDays: {}
    };
    
    const updated = [...mesocycles, duplicate];
    saveMesocycles(updated);
    setCurrentMesocycleId(duplicate.id);
  };

  const deleteMesocycle = (mesocycleId) => {
    if (!window.confirm('¿Eliminar este mesociclo?')) return;
    
    const updated = mesocycles.filter(m => m.id !== mesocycleId);
    saveMesocycles(updated);
    
    if (currentMesocycleId === mesocycleId && updated.length > 0) {
      setCurrentMesocycleId(updated[0].id);
    } else if (updated.length === 0) {
      setCurrentMesocycleId(null);
      setView('mesocycles');
    }
  };

  const getCurrentMesocycle = () => {
    return mesocycles.find(m => m.id === currentMesocycleId);
  };

  const toggleDayCompleted = (weekNum, dayName) => {
    const meso = getCurrentMesocycle();
    if (!meso) return;
    
    const key = `w${weekNum}-${dayName}`;
    const newCompletedDays = { ...meso.completedDays };
    
    if (newCompletedDays[key]) {
      delete newCompletedDays[key];
    } else {
      newCompletedDays[key] = {
        completed: true,
        date: new Date().toISOString()
      };
    }
    
    const updated = mesocycles.map(m =>
      m.id === currentMesocycleId
        ? { ...m, completedDays: newCompletedDays }
        : m
    );
    saveMesocycles(updated);
  };

  const updateWorkoutData = (exerciseId, setIndex, field, value) => {
    const meso = getCurrentMesocycle();
    if (!meso) return;
    
    const key = `w${currentWeek}-${currentDay}-${exerciseId}`;
    const newWorkoutData = { ...meso.workoutData };
    
    if (!newWorkoutData[key]) {
      newWorkoutData[key] = { sets: [] };
    }
    
    if (!newWorkoutData[key].sets[setIndex]) {
      newWorkoutData[key].sets[setIndex] = {};
    }
    
    newWorkoutData[key].sets[setIndex][field] = value;
    newWorkoutData[key].sets[setIndex].completed = true;
    newWorkoutData[key].sets[setIndex].date = new Date().toISOString();
    
    const updated = mesocycles.map(m => 
      m.id === currentMesocycleId 
        ? { ...m, workoutData: newWorkoutData }
        : m
    );
    saveMesocycles(updated);
  };

  const updateDayExercise = (weekNum, dayName, exerciseIndex, updates) => {
    const meso = getCurrentMesocycle();
    if (!meso) return;
    
    const newWeeks = { ...meso.weeks };
    const week = newWeeks[weekNum];
    if (!week?.days?.[dayName]) return;
    
    const day = week.days[dayName];
    
    if (day.sessions) {
      const session = sessionType === 'am' ? day.sessions.am : day.sessions.pm;
      if (!session?.exercises?.[exerciseIndex]) return;
      session.exercises[exerciseIndex] = { ...session.exercises[exerciseIndex], ...updates };
    } else {
      if (!day.exercises?.[exerciseIndex]) return;
      day.exercises[exerciseIndex] = { ...day.exercises[exerciseIndex], ...updates };
    }
    
    const updated = mesocycles.map(m =>
      m.id === currentMesocycleId ? { ...m, weeks: newWeeks } : m
    );
    saveMesocycles(updated);
  };

  const addExerciseToDay = (weekNum, dayName, exerciseId) => {
    const meso = getCurrentMesocycle();
    if (!meso) return;
    
    const exercise = exerciseDatabase[exerciseId];
    if (!exercise) return;
    
    const newExercise = {
      exerciseId,
      sets: exercise.defaultSets || 3,
      reps: exercise.defaultReps || "8-12",
      rest: exercise.defaultRest || "2 min",
      notes: ""
    };
    
    const newWeeks = { ...meso.weeks };
    const week = newWeeks[weekNum];
    if (!week?.days?.[dayName]) return;
    
    const day = week.days[dayName];
    
    if (day.sessions) {
      const session = sessionType === 'am' ? day.sessions.am : day.sessions.pm;
      if (!session.exercises) session.exercises = [];
      session.exercises.push(newExercise);
    } else {
      if (!day.exercises) day.exercises = [];
      day.exercises.push(newExercise);
    }
    
    const updated = mesocycles.map(m =>
      m.id === currentMesocycleId ? { ...m, weeks: newWeeks } : m
    );
    saveMesocycles(updated);
  };

  const removeExerciseFromDay = (weekNum, dayName, exerciseIndex) => {
    const meso = getCurrentMesocycle();
    if (!meso) return;
    
    const newWeeks = { ...meso.weeks };
    const week = newWeeks[weekNum];
    if (!week?.days?.[dayName]) return;
    
    const day = week.days[dayName];
    
    if (day.sessions) {
      const session = sessionType === 'am' ? day.sessions.am : day.sessions.pm;
      if (session.exercises) session.exercises.splice(exerciseIndex, 1);
    } else {
      if (day.exercises) day.exercises.splice(exerciseIndex, 1);
    }
    
    const updated = mesocycles.map(m =>
      m.id === currentMesocycleId ? { ...m, weeks: newWeeks } : m
    );
    saveMesocycles(updated);
  };

  const addNewExercise = (exerciseData) => {
    const id = exerciseData.name.toLowerCase().replace(/\s+/g, '_');
    const newDb = { ...exerciseDatabase, [id]: exerciseData };
    saveExerciseDatabase(newDb);
  };

  const getWorkoutData = (exerciseId) => {
    const meso = getCurrentMesocycle();
    if (!meso) return { sets: [] };
    
    const key = `w${currentWeek}-${currentDay}-${exerciseId}`;
    return meso.workoutData[key] || { sets: [] };
  };

  const isDayCompleted = (weekNum, dayName) => {
    const meso = getCurrentMesocycle();
    if (!meso) return false;
    
    const key = `w${weekNum}-${dayName}`;
    return !!meso.completedDays?.[key];
  };

  const getWeekProgress = (weekNum) => {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const completed = days.filter(day => isDayCompleted(weekNum, day)).length;
    return Math.round((completed / days.length) * 100);
  };

  // ============================================================================
  // RENDERIZADO
  // ============================================================================

  const renderMesocyclesView = () => {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-800">Mesociclos</h2>
          <button
            onClick={createNewMesocycle}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            <PlusCircle size={20} />
            Nuevo Mesociclo
          </button>
        </div>

        {mesocycles.length === 0 ? (
          <div className="text-center py-12">
            <Dumbbell size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No tienes mesociclos aún
            </h3>
            <p className="text-gray-600 mb-6">
              Crea tu primer mesociclo con las 9 semanas del programa
            </p>
            <button
              onClick={createNewMesocycle}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Crear Primer Mesociclo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mesocycles.map(meso => {
              const totalProgress = Object.keys(meso.weeks).reduce((acc, weekNum) => {
                return acc + getWeekProgress(parseInt(weekNum));
              }, 0) / Object.keys(meso.weeks).length;
              
              const daysCompleted = Object.keys(meso.completedDays || {}).length;
              
              return (
                <div
                  key={meso.id}
                  className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {meso.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {new Date(meso.startDate).toLocaleDateString('es-ES')}
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      meso.status === 'active' 
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {meso.status === 'active' ? 'Activo' : 'Completado'}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Progreso</span>
                      <span className="font-bold text-gray-800">{Math.round(totalProgress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${totalProgress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>{daysCompleted} días</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame size={16} />
                      <span>9 semanas</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setCurrentMesocycleId(meso.id);
                        setView('calendar');
                      }}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                    >
                      Abrir
                    </button>
                    <button
                      onClick={() => duplicateMesocycle(meso.id)}
                      className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                      title="Duplicar"
                    >
                      <Copy size={20} />
                    </button>
                    <button
                      onClick={() => deleteMesocycle(meso.id)}
                      className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                      title="Eliminar"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const renderCalendarView = () => {
    const meso = getCurrentMesocycle();
    if (!meso) return <div>No hay mesociclo seleccionado</div>;
    
    const week = meso.weeks[currentWeek];
    if (!week) return <div>Semana no encontrada</div>;
    
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const dayNames = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => setCurrentWeek(Math.max(0, currentWeek - 1))}
            disabled={currentWeek === 0}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="text-center flex-1">
            <h2 className="text-2xl font-bold text-gray-800">
              {week.name}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {week.description}
            </p>
            <div className="mt-3 max-w-md mx-auto">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${getWeekProgress(currentWeek)}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {getWeekProgress(currentWeek)}% completado
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setCurrentWeek(Math.min(8, currentWeek + 1))}
            disabled={currentWeek === 8}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="mb-6 flex items-center gap-2 justify-center flex-wrap">
          {Object.keys(meso.weeks).map(weekNum => (
            <button
              key={weekNum}
              onClick={() => setCurrentWeek(parseInt(weekNum))}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                currentWeek === parseInt(weekNum)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              S{weekNum}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {days.map((day, idx) => {
            const dayData = week.days?.[day];
            if (!dayData) return null;
            
            const completed = isDayCompleted(currentWeek, day);
            const exerciseCount = dayData.exercises?.length || 
                                 dayData.sessions?.pm?.exercises?.length || 0;
            
            return (
              <div
                key={day}
                onClick={() => {
                  setCurrentDay(day);
                  setView('workout');
                }}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg ${
                  completed
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 bg-white hover:border-blue-400'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">{dayNames[idx]}</h3>
                    <p className="text-sm text-gray-600 mt-1">{dayData.name}</p>
                  </div>
                  {completed ? (
                    <div className="bg-green-500 rounded-full p-1">
                      <Check size={16} className="text-white" />
                    </div>
                  ) : (
                    <div className="bg-gray-200 rounded-full p-1">
                      <Circle size={16} className="text-gray-400" />
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-3">
                  <Clock size={14} />
                  <span>{dayData.duration || "N/A"}</span>
                </div>
                
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                  <Dumbbell size={14} />
                  <span>{exerciseCount} ejercicios</span>
                </div>
                
                <div className={`mt-3 inline-block px-2 py-1 rounded text-xs font-medium ${
                  dayData.type === 'heavy' ? 'bg-red-100 text-red-700' :
                  dayData.type === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  dayData.type === 'recovery' ? 'bg-green-100 text-green-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {dayData.type === 'heavy' ? '🔥 Heavy' :
                   dayData.type === 'medium' ? '💪 Medium' :
                   dayData.type === 'recovery' ? '🧘 Recovery' :
                   '🦵 Legs'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderWorkoutView = () => {
    const meso = getCurrentMesocycle();
    if (!meso) return <div>No hay mesociclo</div>;
    
    const week = meso.weeks[currentWeek];
    if (!week) return <div>Semana no encontrada</div>;
    
    const dayData = week.days?.[currentDay];
    if (!dayData) return <div>Día no encontrado</div>;
    
    const dayNames = {
      monday: 'Lunes', tuesday: 'Martes', wednesday: 'Miércoles',
      thursday: 'Jueves', friday: 'Viernes', saturday: 'Sábado', sunday: 'Domingo'
    };
    
    const isDayComplete = isDayCompleted(currentWeek, currentDay);
    
    const getExercises = () => {
      if (dayData.sessions) {
        const session = sessionType === 'am' ? dayData.sessions.am : dayData.sessions.pm;
        return session?.exercises || [];
      }
      return dayData.exercises || [];
    };
    
    const exercises = getExercises();
    
    const renderExercise = (exercise, index) => {
      const exerciseInfo = exerciseDatabase[exercise.exerciseId];
      if (!exerciseInfo) return null;
      
      const workoutData = getWorkoutData(exercise.exerciseId);
      const totalSets = exercise.sets || 3;
      const isEditing = editingExercise === index;
      
      return (
        <div key={`${exercise.exerciseId}-${index}`} className="mb-6 p-4 bg-white rounded-xl border-2 border-gray-200">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-2">
                  <select
                    value={exercise.exerciseId}
                    onChange={(e) => {
                      const newExercise = exerciseDatabase[e.target.value];
                      updateDayExercise(currentWeek, currentDay, index, {
                        exerciseId: e.target.value,
                        sets: newExercise.defaultSets,
                        reps: newExercise.defaultReps,
                        rest: newExercise.defaultRest
                      });
                    }}
                    className="w-full px-3 py-2 border-2 border-blue-300 rounded-lg font-bold"
                  >
                    {Object.entries(exerciseDatabase).map(([id, ex]) => (
                      <option key={id} value={id}>{ex.name}</option>
                    ))}
                  </select>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-xs text-gray-600">Sets</label>
                      <input
                        type="number"
                        value={totalSets}
                        onChange={(e) => updateDayExercise(currentWeek, currentDay, index, { sets: parseInt(e.target.value) })}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600">Reps</label>
                      <input
                        type="text"
                        value={exercise.reps}
                        onChange={(e) => updateDayExercise(currentWeek, currentDay, index, { reps: e.target.value })}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600">Descanso</label>
                      <input
                        type="text"
                        value={exercise.rest}
                        onChange={(e) => updateDayExercise(currentWeek, currentDay, index, { rest: e.target.value })}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </div>
                  </div>
                  
                  <input
                    type="text"
                    placeholder="Notas..."
                    value={exercise.notes || ''}
                    onChange={(e) => updateDayExercise(currentWeek, currentDay, index, { notes: e.target.value })}
                    className="w-full px-2 py-1 border rounded text-sm"
                  />
                </div>
              ) : (
                <>
                  <h4 className="font-bold text-gray-800 text-lg">{exerciseInfo.name}</h4>
                  <div className="flex flex-wrap gap-2 mt-2 text-sm text-gray-600">
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      {totalSets} series
                    </span>
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      {exercise.reps} reps
                    </span>
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      {exercise.rest}
                    </span>
                  </div>
                  {exercise.notes && (
                    <p className="mt-2 text-sm text-gray-600 italic">💡 {exercise.notes}</p>
                  )}
                </>
              )}
            </div>
            
            {editMode && (
              <div className="flex gap-1 ml-2">
                <button
                  onClick={() => setEditingExercise(isEditing ? null : index)}
                  className={`p-1 rounded ${
                    isEditing ? 'bg-blue-600 text-white' : 'text-blue-600 hover:bg-blue-50'
                  }`}
                  title={isEditing ? "Guardar" : "Editar"}
                >
                  {isEditing ? <Save size={16} /> : <Edit2 size={16} />}
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('¿Eliminar ejercicio?')) {
                      removeExerciseFromDay(currentWeek, currentDay, index);
                    }
                  }}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                  title="Eliminar"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          </div>

          {!isEditing && (
            <div className="space-y-2">
              {[...Array(totalSets)].map((_, setIndex) => {
                const setData = workoutData.sets[setIndex] || {};
                
                return (
                  <div key={setIndex} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg flex-wrap">
                    <span className="font-medium text-gray-700 w-20">Serie {setIndex + 1}</span>
                    
                    {exerciseInfo.trackWeight && (
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          step="0.5"
                          placeholder="kg"
                          value={setData.weight || ''}
                          onChange={(e) => updateWorkoutData(exercise.exerciseId, setIndex, 'weight', e.target.value)}
                          className="w-16 px-2 py-1 border rounded text-center text-sm"
                        />
                        <span className="text-xs text-gray-500">kg</span>
                      </div>
                    )}
                    
                    {exerciseInfo.trackReps && (
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          placeholder="reps"
                          value={setData.reps || ''}
                          onChange={(e) => updateWorkoutData(exercise.exerciseId, setIndex, 'reps', e.target.value)}
                          className="w-16 px-2 py-1 border rounded text-center text-sm"
                        />
                        <span className="text-xs text-gray-500">reps</span>
                      </div>
                    )}
                    
                    {exerciseInfo.trackTime && (
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          placeholder="seg"
                          value={setData.time || ''}
                          onChange={(e) => updateWorkoutData(exercise.exerciseId, setIndex, 'time', e.target.value)}
                          className="w-16 px-2 py-1 border rounded text-center text-sm"
                        />
                        <span className="text-xs text-gray-500">seg</span>
                      </div>
                    )}
                    
                    {exerciseInfo.trackVariant && (
                      <select
                        value={setData.variant || ''}
                        onChange={(e) => updateWorkoutData(exercise.exerciseId, setIndex, 'variant', e.target.value)}
                        className="px-2 py-1 border rounded text-sm"
                      >
                        <option value="">Variante...</option>
                        {exerciseInfo.variants.map(v => (
                          <option key={v} value={v}>{v}</option>
                        ))}
                      </select>
                    )}
                    
                    <button
                      onClick={() => {
                        const newData = { ...meso.workoutData };
                        const key = `w${currentWeek}-${currentDay}-${exercise.exerciseId}`;
                        if (!newData[key]) newData[key] = { sets: [] };
                        if (!newData[key].sets[setIndex]) newData[key].sets[setIndex] = {};
                        newData[key].sets[setIndex].completed = !newData[key].sets[setIndex].completed;
                        
                        const updated = mesocycles.map(m =>
                          m.id === currentMesocycleId
                            ? { ...m, workoutData: newData }
                            : m
                        );
                        saveMesocycles(updated);
                      }}
                      className={`ml-auto p-2 rounded-lg transition-colors ${
                        setData.completed
                          ? 'bg-green-500 hover:bg-green-600'
                          : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    >
                      <Check size={16} className={setData.completed ? 'text-white' : 'text-gray-600'} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
    };
    
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => setView('calendar')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <ChevronLeft size={20} />
            Volver
          </button>
          
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                {dayNames[currentDay]}
              </h2>
              <p className="text-lg text-gray-600 mt-1">{dayData.name}</p>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => toggleDayCompleted(currentWeek, currentDay)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  isDayComplete
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {isDayComplete ? <CheckCircle size={20} /> : <Circle size={20} />}
                {isDayComplete ? 'Completado' : 'Marcar completo'}
              </button>
              
              <button
                onClick={() => {
                  setEditMode(!editMode);
                  setEditingExercise(null);
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  editMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {editMode ? 'Terminar edición' : 'Editar día'}
              </button>
              
              <div className={`px-4 py-2 rounded-lg font-medium ${
                dayData.type === 'heavy' ? 'bg-red-100 text-red-700' :
                dayData.type === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                dayData.type === 'recovery' ? 'bg-green-100 text-green-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {dayData.type === 'heavy' ? '🔥' :
                 dayData.type === 'medium' ? '💪' :
                 dayData.type === 'recovery' ? '🧘' : '🦵'}
              </div>
            </div>
          </div>
        </div>

        {dayData.sessions && (
          <div className="mb-6 flex gap-2">
            <button
              onClick={() => setSessionType('am')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium ${
                sessionType === 'am'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Sesión AM
            </button>
            <button
              onClick={() => setSessionType('pm')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium ${
                sessionType === 'pm'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Sesión PM
            </button>
          </div>
        )}

        {dayData.warmup && !dayData.sessions && (
          <div className="mb-6">
            <button
              onClick={() => setShowWarmup(!showWarmup)}
              className="w-full flex items-center justify-between p-4 bg-orange-50 border-2 border-orange-200 rounded-xl hover:bg-orange-100"
            >
              <div className="flex items-center gap-2">
                <Flame className="text-orange-600" size={24} />
                <span className="font-bold text-orange-900">Calentamiento</span>
              </div>
              <ChevronRight
                size={20}
                className={`transform transition-transform ${showWarmup ? 'rotate-90' : ''}`}
              />
            </button>
            
            {showWarmup && (
              <div className="mt-2 p-4 bg-white border-2 border-gray-200 rounded-xl">
                <ul className="space-y-2">
                  {dayData.warmup.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">•</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {exercises.map((ex, idx) => renderExercise(ex, idx))}
        
        {editMode && (
          <div className="mt-6 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
            <h4 className="font-bold text-blue-900 mb-3">Añadir ejercicio</h4>
            <select
              onChange={(e) => {
                if (e.target.value) {
                  addExerciseToDay(currentWeek, currentDay, e.target.value);
                  e.target.value = '';
                }
              }}
              className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg"
            >
              <option value="">Selecciona...</option>
              {Object.entries(exerciseDatabase).map(([id, ex]) => (
                <option key={id} value={id}>{ex.name}</option>
              ))}
            </select>
          </div>
        )}
        
        {dayData.sessions?.pm?.gtg && sessionType === 'pm' && (
          <div className="mt-6 p-4 bg-green-50 rounded-xl">
            <h5 className="font-bold text-green-900 mb-2">🎯 GTG Protocol</h5>
            <p className="text-sm text-gray-700">{dayData.sessions.pm.gtg}</p>
          </div>
        )}
        
        {dayData.abs && !dayData.sessions && (
          <div className="mt-6">
            <h4 className="text-xl font-bold mb-4 text-pink-600">🔥 Abdomen</h4>
            {dayData.abs.map((ex, idx) => renderExercise(ex, idx))}
          </div>
        )}
        
        {dayData.prehab && (
          <div className="mt-6 p-4 bg-yellow-50 rounded-xl">
            <h5 className="font-bold text-yellow-900 mb-2">🛡️ Prehab</h5>
            <ul className="space-y-1">
              {dayData.prehab.map((item, idx) => (
                <li key={idx} className="text-sm text-gray-700">• {item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  const renderProgressView = () => {
    const meso = getCurrentMesocycle();
    if (!meso) return <div>No hay mesociclo</div>;
    
    const weightedPullupData = [];
    for (let week = 0; week <= 8; week++) {
      const key = `w${week}-monday-weighted_pullup`;
      const data = meso.workoutData[key];
      if (data?.sets?.length > 0) {
        const weights = data.sets.map(s => parseFloat(s.weight) || 0).filter(w => w > 0);
        if (weights.length > 0) {
          weightedPullupData.push({ week, weight: Math.max(...weights) });
        }
      }
    }

    const frontLeverData = [];
    for (let week = 0; week <= 8; week++) {
      const key = `w${week}-monday-front_lever_iso`;
      const data = meso.workoutData[key];
      if (data?.sets?.length > 0) {
        const variant = data.sets[0]?.variant || 'N/A';
        const maxTime = Math.max(...data.sets.map(s => parseFloat(s.time) || 0));
        frontLeverData.push({ week, variant, time: maxTime });
      }
    }

    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => setView('calendar')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <ChevronLeft size={20} />
            Volver
          </button>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-6">📈 Progreso</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-xl border-2 border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="text-blue-600" />
              Dominada Lastrada
            </h3>
            
            {weightedPullupData.length > 0 ? (
              <div>
                <div className="mb-4">
                  <p className="text-sm text-gray-600">Peso máximo</p>
                  <p className="text-4xl font-bold text-blue-600">
                    {weightedPullupData[weightedPullupData.length - 1].weight} kg
                  </p>
                </div>
                
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {weightedPullupData.map(d => (
                    <div key={d.week} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-600">Semana {d.week}</span>
                      <span className="font-bold text-gray-800">{d.weight} kg</span>
                    </div>
                  ))}
                </div>
                
                {weightedPullupData.length > 1 && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      📊 +{(weightedPullupData[weightedPullupData.length - 1].weight - weightedPullupData[0].weight).toFixed(1)} kg
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">Sin datos</p>
            )}
          </div>

          <div className="p-6 bg-white rounded-xl border-2 border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Target className="text-purple-600" />
              Front Lever
            </h3>
            
            {frontLeverData.length > 0 ? (
              <div>
                <div className="mb-4">
                  <p className="text-sm text-gray-600">Variante actual</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {frontLeverData[frontLeverData.length - 1].variant}
                  </p>
                  <p className="text-lg text-gray-600 mt-1">
                    {frontLeverData[frontLeverData.length - 1].time}seg
                  </p>
                </div>
                
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {frontLeverData.map(d => (
                    <div key={d.week} className="p-2 bg-gray-50 rounded">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">S{d.week}</span>
                        <span className="font-bold text-gray-800">{d.time}seg</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{d.variant}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">Sin datos</p>
            )}
          </div>

          <div className="p-6 bg-white rounded-xl border-2 border-gray-200 md:col-span-2">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Activity className="text-green-600" />
              Completitud Semanal
            </h3>
            
            <div className="grid grid-cols-3 md:grid-cols-9 gap-2">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(week => {
                const progress = getWeekProgress(week);
                return (
                  <div key={week} className="text-center">
                    <div className="mb-2 text-xs text-gray-600 font-medium">S{week}</div>
                    <div className="w-full bg-gray-200 rounded-full h-20">
                      <div
                        className={`rounded-full h-full transition-all ${
                          progress === 100 ? 'bg-green-500' :
                          progress >= 70 ? 'bg-blue-500' :
                          progress >= 40 ? 'bg-yellow-500' :
                          progress > 0 ? 'bg-orange-500' :
                          'bg-gray-200'
                        }`}
                        style={{ height: `${progress}%` }}
                      />
                    </div>
                    <div className="mt-1 text-xs font-bold text-gray-700">
                      {progress}%
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderExerciseDatabaseView = () => {
    const categories = {
      pull: "Dominadas", skill: "Skills", arms: "Brazos", shoulders: "Hombros",
      core: "Core", legs: "Piernas", legs_plyo: "Pliométrico", glutes: "Glúteos",
      forearms: "Antebrazos", prehab: "Prehab", cardio: "Cardio"
    };

    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showAddExercise, setShowAddExercise] = useState(false);
    const [newExercise, setNewExercise] = useState({
      name: '', category: 'pull', trackWeight: false, trackReps: true,
      trackTime: false, defaultSets: 3, defaultReps: '8-12', defaultRest: '2 min'
    });

    const filteredExercises = Object.entries(exerciseDatabase).filter(([id, ex]) => 
      selectedCategory === 'all' || ex.category === selectedCategory
    );

    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-800">Ejercicios</h2>
          <button
            onClick={() => setShowAddExercise(!showAddExercise)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={20} />
            Nuevo
          </button>
        </div>

        {showAddExercise && (
          <div className="mb-6 p-6 bg-white rounded-xl border-2 border-blue-200">
            <h3 className="text-xl font-bold mb-4">Añadir Ejercicio</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nombre"
                value={newExercise.name}
                onChange={(e) => setNewExercise({...newExercise, name: e.target.value})}
                className="px-4 py-2 border-2 rounded-lg"
              />
              <select
                value={newExercise.category}
                onChange={(e) => setNewExercise({...newExercise, category: e.target.value})}
                className="px-4 py-2 border-2 rounded-lg"
              >
                {Object.entries(categories).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
              
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newExercise.trackWeight}
                    onChange={(e) => setNewExercise({...newExercise, trackWeight: e.target.checked})}
                  />
                  <span>Peso</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newExercise.trackReps}
                    onChange={(e) => setNewExercise({...newExercise, trackReps: e.target.checked})}
                  />
                  <span>Reps</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newExercise.trackTime}
                    onChange={(e) => setNewExercise({...newExercise, trackTime: e.target.checked})}
                  />
                  <span>Tiempo</span>
                </label>
              </div>
              
              <div className="md:col-span-2 flex gap-2">
                <button
                  onClick={() => {
                    if (newExercise.name) {
                      addNewExercise(newExercise);
                      setNewExercise({
                        name: '', category: 'pull', trackWeight: false, trackReps: true,
                        trackTime: false, defaultSets: 3, defaultReps: '8-12', defaultRest: '2 min'
                      });
                      setShowAddExercise(false);
                    }
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Guardar
                </button>
                <button
                  onClick={() => setShowAddExercise(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6 flex gap-2 flex-wrap">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg font-medium ${
              selectedCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Todos ({Object.keys(exerciseDatabase).length})
          </button>
          {Object.entries(categories).map(([key, label]) => {
            const count = Object.values(exerciseDatabase).filter(ex => ex.category === key).length;
            return (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  selectedCategory === key ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {label} ({count})
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExercises.map(([id, exercise]) => (
            <div key={id} className="p-4 bg-white rounded-xl border-2 border-gray-200">
              <h4 className="font-bold text-gray-800 mb-2">{exercise.name}</h4>
              <div className="flex flex-wrap gap-1 mb-2">
                {exercise.trackWeight && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">Peso</span>
                )}
                {exercise.trackReps && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">Reps</span>
                )}
                {exercise.trackTime && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded">Tiempo</span>
                )}
              </div>
              <div className="text-xs text-gray-600">
                <p>{exercise.defaultSets} sets × {exercise.defaultReps}</p>
                <p>Descanso: {exercise.defaultRest}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="bg-white border-b-2 border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Dumbbell className="text-blue-600" size={28} />
              <h1 className="text-xl font-bold text-gray-800">Calistenia Tracker Pro</h1>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setView('mesocycles')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  view === 'mesocycles' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <FileText size={20} className="inline mr-2" />
                Mesociclos
              </button>
              
              {currentMesocycleId && (
                <>
                  <button
                    onClick={() => setView('calendar')}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      view === 'calendar' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <Calendar size={20} className="inline mr-2" />
                    Calendario
                  </button>
                  
                  <button
                    onClick={() => setView('progress')}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      view === 'progress' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <BarChart3 size={20} className="inline mr-2" />
                    Progreso
                  </button>
                </>
              )}
              
              <button
                onClick={() => setView('exercises')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  view === 'exercises' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <Database size={20} className="inline mr-2" />
                Ejercicios
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {view === 'mesocycles' && renderMesocyclesView()}
        {view === 'calendar' && renderCalendarView()}
        {view === 'workout' && renderWorkoutView()}
        {view === 'progress' && renderProgressView()}
        {view === 'exercises' && renderExerciseDatabaseView()}
      </main>
    </div>
  );
};

export default CalisteniaTrackerPro;