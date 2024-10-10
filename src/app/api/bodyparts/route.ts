'use server'

import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prismaClient'

export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json()
    const bodyPart = await prisma.bodyPart.create({
      data: {
        name
      },
    })
    return NextResponse.json(bodyPart, { status: 201 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to create execise' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const bodyParts = await prisma.bodyPart.findMany({
      include: {
        bodyPartExercises: {
          include: {
            exercise: true,
          },
        },
      }
    })

    const result = bodyParts.map(bodyPart => ({
      id: bodyPart.id,
      name: bodyPart.name,
      exercises: bodyPart.bodyPartExercises.map(bpExercise => bpExercise.exercise),
    }))

    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to fetch bodyParts' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 })

  try {
    await prisma.bodyPart.delete({
      where: { id: Number(id) },
    })
    return NextResponse.json({ message: 'bodyPart deleted' }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to delete bodyPart' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { name, id } = await req.json()
    const bodyPart = await prisma.bodyPart.update({
      where: { id },
      data: {
        name,
      },
    })
    return NextResponse.json(bodyPart, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to update bodyPart' }, { status: 500 })
  }
}
