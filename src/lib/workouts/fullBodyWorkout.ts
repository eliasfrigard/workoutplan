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

  // TODO: Favor compound exercises.
  exercisesByBodyPart.forEach((bodyPart) => {
    const bodyPartExercises = exercisesByBodyPart[bodyPart.bodyPart]
    let exerciseIndex = 0

    // For each workout, assign an exercise from the current body part
    for (let i = 0; i < numberOfWorkouts; i++) {
      const workout = workouts[i]

      // Add exercise for this body part, rotating through available exercises
      if (workout.exercises.length < numberOfExercises) {
        workout.exercises.push(bodyPartExercises[exerciseIndex])
        exerciseIndex = (exerciseIndex + 1) % bodyPartExercises.length // Rotate through exercises
      }
    }
  })

  return workouts
}