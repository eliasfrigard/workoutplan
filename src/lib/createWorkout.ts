import type { Exercise } from '@/types'

interface LocalExercise {
  id: number
  name: string
  selected: boolean
  bodyPart: string
}

interface WorkoutProps {
  exercises: LocalExercise[]
}

interface BodyPartExecises {
  bodyPart: string
  exercises: Exercise[]
}

const mapExercisesToBodyPart = (exercises: LocalExercise[]): BodyPartExecises[] => {
  const bodyPartExercises = exercises.reduce((acc, exercise) => {
    if (!acc[exercise.bodyPart]) {
      acc[exercise.bodyPart] = []
    }
    acc[exercise.bodyPart].push(exercise)
    return acc
  }, {} as Record<string, LocalExercise[]>); // Explicitly define the type for clarity

  return Object.entries(bodyPartExercises).map(([bodyPart, exercises]) => ({
    bodyPart,
    exercises,
  }));
}

const createWorkout: React.FC<WorkoutProps> = ({
  exercises
}) => {
  const workouts = []
  const numberOfWorkouts = 6
  const exercisesPerWorkout = 6

  // Group exercises by body part.
  const bodyPartExercises = mapExercisesToBodyPart(exercises)

  // If the number of workouts is equal to the number of body parts, create a workout for each body part.
  if (numberOfWorkouts === bodyPartExercises.length) {
    for (const bodyPart of bodyPartExercises) {
      const workout = {
        bodyPart: bodyPart.bodyPart,
        exercises: bodyPart.exercises.slice(0, exercisesPerWorkout)
      }
      workouts.push(workout)
    }
  }

  // If the number of workouts is less than the number of body parts,
  // then each workout should contain bodyParts divided by the number of workouts amount of body parts per workout.
  if (numberOfWorkouts < bodyPartExercises.length) {
    
  }

  return workouts
}

export default createWorkout
