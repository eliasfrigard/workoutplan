'use client'

import React from 'react'
import ExerciseSelector from "@/app/components/ExerciseSelector"

export default function Example() {
  const [exercises, setExercises] = React.useState([])
  
  React.useEffect(() => {
    async function fetchExercises() {
      const res = await fetch('/api/exercises')
      const data = await res.json()
      setExercises(data)
    }
    fetchExercises()
  }, [])

  const handleSelect = (id) => {
    const updatedExercises = exercises.map((exercise) => {
      if (exercise.id === id) {
        return { ...exercise, selected: !exercise.selected }
      }
      return exercise
    })

    setExercises(updatedExercises)
  }

  return (
    <div className='container mx-auto my-16'>
      <h1 className='text-4xl font-bold'>New Workout</h1>
      <ExerciseSelector toggleSelected={handleSelect} exercises={exercises} />
    </div>
  )
}
