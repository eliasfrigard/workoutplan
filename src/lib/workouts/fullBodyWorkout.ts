import type { Workout, Exercise } from '@/types'

export const fullBodyWorkout = ({
  exercisesByBodyPart,
  numberOfWorkouts,
  numberOfExercises
} : {
  exercisesByBodyPart: {
    bodyPart: string
    exercises: Exercise[]
  }[]
  numberOfWorkouts: number
  numberOfExercises: number
}): Workout[] => {
  const workouts: Workout[] = Array.from({ length: numberOfWorkouts }, (_, index) => ({
    day: index + 1,
    exercises: []
  }))

  exercisesByBodyPart.forEach((bodyPart) => {
    const exercises = bodyPart.exercises
    let exerciseIndex = 0

    for (let i = 0; i < numberOfWorkouts; i++) {
      const workout = workouts[i]

      if (workout.exercises.length < numberOfExercises) {
        const exerciseToAdd = exercises[exerciseIndex]

        if (!workout.exercises.some(e => e.id === exerciseToAdd.id)) {
          workout.exercises.push(exerciseToAdd)
          exerciseIndex = (exerciseIndex + 1) % exercises.length
        }
      }
    }
  })

  return workouts
}