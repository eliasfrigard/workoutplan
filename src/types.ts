export type Exercise = {
  id: number
  name: string
  selected?: boolean
}

export type BodyPart = {
  id: number
  name: string
  exercises: Exercise[]
}

export type Workout = {
  day: number
  exercises: Exercise[]
}
