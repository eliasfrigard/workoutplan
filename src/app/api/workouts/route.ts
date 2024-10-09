'use server'

import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prismaClient'

export async function POST(req: NextRequest) {
  try {
    const { userId, day, exerciseIds } = await req.json()
    const workout = await prisma.workout.create({
      data: {
        userId,
        day: parseInt(day),
        workoutExercises: {
          create: exerciseIds.map((exerciseId: number) => ({ exerciseId })),
        },
      },
    })
    return NextResponse.json(workout, { status: 201 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to create workout' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const workouts = await prisma.workout.findMany({
      include: { workoutExercises: true },
    })
    return NextResponse.json(workouts, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to fetch workouts' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 })

  try {
    await prisma.workout.delete({
      where: { id: Number(id) },
    })
    return NextResponse.json({ message: 'Workout deleted' }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to delete workout' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, day, exerciseIds } = await req.json()
    const workout = await prisma.workout.update({
      where: { id },
      data: {
        day,
        workoutExercises: {
          set: exerciseIds.map((exerciseId: number) => ({ exerciseId })),
        },
      },
    })
    return NextResponse.json(workout, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to update workout' }, { status: 500 })
  }
}
