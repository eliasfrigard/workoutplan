'use client'

// app/workouts/page.tsx
import WorkoutForm from '@/app/components/WorkoutForm'
import { useEffect, useState } from 'react'

export default function WorkoutsPage() {
  const [workouts, setWorkouts] = useState([])
  console.log('🚀 || WorkoutsPage || workouts:', workouts)
  
  useEffect(() => {
    async function fetchWorkouts() {
      const res = await fetch('/api/workouts')
      const data = await res.json()
      setWorkouts(data)
    }
    fetchWorkouts()
  }, [])

  return (
    <div>
      <h1>Workouts</h1>
      <WorkoutForm />
      <ul>
        {workouts.map((workout) => (
          <li key={workout.id}>
            Day: {workout.day} | Exercises: {workout.workoutExercises.length}
          </li>
        ))}
      </ul>
    </div>
  )
}
