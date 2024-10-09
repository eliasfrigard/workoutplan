'use client'

// app/workouts/page.tsx
import { useEffect, useState } from 'react'

export default function ExercisesPage() {
  const [execises, setExercises] = useState([])
  
  useEffect(() => {
    async function fetchExercises() {
      const res = await fetch('/api/exercises')
      const data = await res.json()
      setExercises(data)
    }
    fetchExercises()
  }, [])

  return (
    <div className='container mx-auto flex flex-col justify-center items-center gap-8 py-8'>
      <h1 className='font-bold text-4xl'>Execises</h1>
      <div className='container mx-auto w-full flex flex-col gap-6'>
        {execises.map((exercise) => (
          <div className='w-full h-16 rounded shadow text-white bg-slate-700 bg-opacity-90  hover:bg-opacity-80 active:scale-105 duration-100 cursor-pointer flex justify-center items-center' key={exercise.id}>
            <p className='font-bold text-xl'>{exercise.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
