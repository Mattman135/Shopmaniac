// app/api/list/delete/route.js
import { NextResponse } from "next/server"
import connectMongo from "@/libs/mongoose"
import ShoppingItem from "@/models/ShoppingItem"
import { getToken } from "next-auth/jwt"

export async function DELETE(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token?.sub)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const url = new URL(req.url)
  const id = url.searchParams.get("id")
  if (!id)
    return NextResponse.json(
      { error: "id query param required" },
      { status: 400 }
    )

  await connectMongo()

  const item = await ShoppingItem.findById(id)
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 })
  if (String(item.user) !== String(token.sub))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  await ShoppingItem.findByIdAndDelete(id)
  return new NextResponse(null, { status: 204 })
}
