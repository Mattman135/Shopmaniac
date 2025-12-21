// app/api/list/add/route.js
import { NextResponse } from "next/server"
import connectMongo from "@/libs/mongoose"
import ShoppingItem from "@/models/ShoppingItem"
import { getToken } from "next-auth/jwt"

export async function POST(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token?.sub)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const text = (body.text || "").trim()
  if (!text)
    return NextResponse.json({ error: "Item text required" }, { status: 400 })

  await connectMongo()

  try {
    const item = await ShoppingItem.create({ user: token.sub, text })
    return NextResponse.json(item)
  } catch (err) {
    // Duplicate
    if (err?.code === 11000) {
      return NextResponse.json(
        { error: "Item already exists" },
        { status: 409 }
      )
    }
    console.error(err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
