import React from 'react'
import type { Exercise } from '@/types'
import ExerciseComponent from '@/app/components/Exercise'

interface ExerciseSelectorProps {
  exercises: Exercise[]
  toggleSelected: (id: number) => void;
}

const ExerciseSelector: React.FC<ExerciseSelectorProps> = (props) => {
  return (
    <div>
      <h1>Exercise Selector</h1>

      <div className='grid grid-cols-3 gap-4'>
        {
          props.exercises.map((exercise) => (
            <ExerciseComponent 
              key={exercise.id} 
              id={exercise.id} 
              name={exercise.name}
              selected={exercise.selected}
              toggleSelected={props.toggleSelected}
            />
          ))
        }
      </div>
    </div>
  );
};

export default ExerciseSelector;