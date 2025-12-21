// app/api/list/route.js
import { NextResponse } from "next/server"
import connectMongo from "@/libs/mongoose"
import ShoppingItem from "@/models/ShoppingItem"
import { getToken } from "next-auth/jwt"

export async function GET(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token?.sub)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  await connectMongo()
  const items = await ShoppingItem.find({ user: token.sub }).sort({
    createdAt: -1,
  })
  return NextResponse.json(items)
}
