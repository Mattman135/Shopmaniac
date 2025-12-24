import { NextResponse } from "next/server"
import connectMongo from "@/libs/mongoose"
import ShoppingItem from "@/models/ShoppingItem"
import { auth } from "@/libs/auth"

export async function DELETE(req) {
  const session = await auth()
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const url = new URL(req.url)
  const id = url.searchParams.get("id")

  await connectMongo()

  const item = await ShoppingItem.findById(id)
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 })
  if (String(item.user) !== String(session.user.id))
    // Use session.user.id
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  await ShoppingItem.findByIdAndDelete(id)
  return new NextResponse(null, { status: 204 })
}
