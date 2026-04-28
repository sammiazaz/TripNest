import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: { name, email, passwordHash: hashed },
    });
    return NextResponse.json({ user: { id: user.id, email: user.email } });
  } catch {
    return new NextResponse('Email already exists', { status: 400 });
  }
}