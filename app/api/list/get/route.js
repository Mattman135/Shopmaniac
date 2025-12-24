import { NextResponse } from "next/server"
import connectMongo from "@/libs/mongoose"
import ShoppingItem from "@/models/ShoppingItem"
import { auth } from "@/libs/auth"

export async function GET(req) {
  const session = await auth()
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  await connectMongo()
  const items = await ShoppingItem.find({ user: session.user.id }).sort({
    createdAt: -1,
  })
  return NextResponse.json(items)
}
