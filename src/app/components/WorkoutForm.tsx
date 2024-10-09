import { useEffect, useState } from 'react'

export default function WorkoutForm({ existingWorkout }: { existingWorkout?: { id: number; day: string; exerciseIds: number[] } }) {
  const [day, setDay] = useState(existingWorkout?.day || '')
  const [exerciseIds, setExerciseIds] = useState(existingWorkout?.exerciseIds || [])
  const [exercises, setExercises] = useState([]) // State to hold exercises

  // Fetch available exercises on component mount
  useEffect(() => {
    async function fetchExercises() {
      const res = await fetch('/api/exercises') // Adjust to your API
      const data = await res.json()
      setExercises(data)
    }

    fetchExercises()
  }, [])

  // Function to handle exercise selection
  const handleExerciseChange = (exerciseId: number) => {
    setExerciseIds((prev) => {
      if (prev.includes(exerciseId)) {
        // Remove exercise if already selected
        return prev.filter((id) => id !== exerciseId)
      } else {
        // Add exercise if not selected
        return [...prev, exerciseId]
      }
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const method = existingWorkout ? 'PATCH' : 'POST'
    const url = existingWorkout ? `/api/workouts?id=${existingWorkout.id}` : '/api/workouts'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ day, exerciseIds, userId: 1 }),
    })

    if (res.ok) {
      console.log('Workout saved!')
    } else {
      console.error('Error saving workout')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Day</label>
      <input type="text" value={day} onChange={(e) => setDay(e.target.value)} />

      <label>Exercises</label>
      <div>
        {exercises.map((exercise) => (
          <div key={exercise.id}>
            <input
              type="checkbox"
              id={`exercise-${exercise.id}`}
              checked={exerciseIds.includes(exercise.id)}
              onChange={() => handleExerciseChange(exercise.id)}
            />
            <label htmlFor={`exercise-${exercise.id}`}>{exercise.name}</label>
          </div>
        ))}
      </div>

      <button type="submit">{existingWorkout ? 'Update' : 'Create'} Workout</button>
    </form>
  )
}
