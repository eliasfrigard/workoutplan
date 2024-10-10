'use client'

import React from 'react'
import ExerciseSelector from "@/app/components/ExerciseSelector"
import Input from "@/app/components/Input"

import createWorkout from '@/lib/createWorkout'

export default function Example() {
  const [bodyParts, setBodyParts] = React.useState([])
  
  React.useEffect(() => {
    async function fetchBodyParts() {
      const res = await fetch('/api/bodyparts')
      const data = await res.json()

      // Set all to selected true initlaially
      data.forEach((bodyPart) => {
        bodyPart.exercises.forEach((exercise) => {
          exercise.selected = true
        })
      })

      setBodyParts(data)
    }

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

  const submitWorkout = () => {
    const selectedExercises = bodyParts.reduce((acc, bodyPart) => {
      const selected = bodyPart.exercises
        .filter((exercise) => exercise.selected)
        .map((exercise) => ({
          ...exercise,
          bodyPart: bodyPart.name, // Add the bodyPartId to the exercise
        }))
      return [...acc, ...selected]
    }, [])
  
    createWorkout({ exercises: selectedExercises })
  }  

  return (
    <div className='container mx-auto my-16 flex flex-col gap-10 justify-center items-center'>
      <h1 className='text-5xl font-bold'>New Workout</h1>

      <div className='flex flex-col gap-6 bg-slate-100 p-6 rounded-lg w-full'>
        <h2 className='text-3xl font-bold'>Configuration</h2>
        <div className='h-[1px] w-full bg-slate-950 rounded-full opacity-10' />

        <div className='grid grid-cols-2 gap-6'>
          <Input label='Workout Name' description='A descriptive name for the workout.' />
          <Input label='Workout Days' description='Which days you would like to plan your workout.' />
          <Input label='Workout Sessions' description='The number of sessions you would like during the week.' />
          <Input label='Workout Start' description='Which day should your workout start?' />
          <Input label='Exercise Count' description='How many exercises per workout?' />
        </div>
        
      </div>

      <ExerciseSelector toggleSelected={handleSelect} bodyParts={bodyParts} />

      <button onClick={submitWorkout} className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'>
        Create Workout
      </button>
    </div>
  )
}
