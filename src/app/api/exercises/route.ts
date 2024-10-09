'use server'

import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prismaClient'

export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json()
    const exercise = await prisma.exercise.create({
      data: {
        name
      },
    })
    return NextResponse.json(exercise, { status: 201 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to create execise' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const exercises = await prisma.exercise.findMany({})
    return NextResponse.json(exercises, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to fetch exercises' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 })

  try {
    await prisma.exercise.delete({
      where: { id: Number(id) },
    })
    return NextResponse.json({ message: 'Exercise deleted' }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to delete exercise' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { name, id } = await req.json()
    const exercise = await prisma.exercise.update({
      where: { id },
      data: {
        name,
      },
    })
    return NextResponse.json(exercise, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to update exercise' }, { status: 500 })
  }
}
