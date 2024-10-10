'use client'

import React from 'react'
import ExerciseSelector from "@/app/components/ExerciseSelector"

export default function Example() {
  const [exercises, setExercises] = React.useState([])
  const [bodyParts, setBodyParts] = React.useState([])
  
  React.useEffect(() => {
    async function fetchExercises() {
      const res = await fetch('/api/exercises')
      const data = await res.json()
      setExercises(data)
    }

    async function fetchBodyParts() {
      const res = await fetch('/api/bodyparts')
      const data = await res.json()
      setBodyParts(data)
    }

    fetchExercises()
    fetchBodyParts()
  }, [])

  const handleSelect = (id, bodyPartId) => {
    const updatedExercises = bodyParts.map((bodyPart) => {
      if (bodyPart.id === bodyPartId) {
        return {
          ...bodyPart,
          exercises: bodyPart.exercises.map((exercise) => {
            if (exercise.id === id) {
              return { ...exercise, selected: !exercise.selected }
            }
            return exercise
          })
        }
      }
      return bodyPart
    })

    setBodyParts(updatedExercises)
  }

  return (
    <div className='container mx-auto my-16'>
      <h1 className='text-4xl font-bold'>New Workout</h1>
      <ExerciseSelector toggleSelected={handleSelect} bodyParts={bodyParts} />
    </div>
  )
}
