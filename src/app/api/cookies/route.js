import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function POST(req) {
  try {
    const body = await req.json();
    const { messages, userId, userName } = body;
    cookies().set('curateit-jwt', messages)
    cookies().set('userId', userId)
    cookies().set('userName', userName)
    
    return NextResponse.json(true);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export async function DELETE(req) {
  try {
    cookies().delete('curateit-jwt')
    cookies().delete('userId')
    cookies().delete('userName')
    cookies().delete('curateittoken')

    return NextResponse.json(true);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
};