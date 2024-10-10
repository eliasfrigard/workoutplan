import React from 'react'
import type { BodyPart } from '@/types'
import ExerciseComponent from '@/app/components/Exercise'

interface ExerciseSelectorProps {
  bodyParts: BodyPart[]
  toggleSelected: (id: number, bodyPartId: number) => void
}

const ExerciseSelector: React.FC<ExerciseSelectorProps> = (props) => {
  return (
    <div className='container w-full flex flex-col gap-8'>
      <h1>Exercise Selector</h1>

      {
        props.bodyParts.map((bodyPart) => (
          <div key={bodyPart.id} className='flex flex-col gap-6'>
            <h2 className='text-3xl font-bold'>{bodyPart.name}</h2>
            <div className='h-[1px] w-full bg-slate-950 rounded-full opacity-20' />
            <div className='grid grid-cols-3 gap-4'>
              {
                bodyPart.exercises.map((exercise) => (
                  <ExerciseComponent 
                    key={exercise.id} 
                    id={exercise.id}
                    bodyPartId={bodyPart.id}
                    name={exercise.name}
                    selected={exercise.selected}
                    toggleSelected={props.toggleSelected}
                  />
                ))
              }
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default ExerciseSelector
