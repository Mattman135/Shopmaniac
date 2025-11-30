import { NextResponse } from "next/server"
import connectMongo from "@/libs/mongoose"
import ListItem from "@/models/ListItem"
import User from "@/models/User"
import { auth } from "@/libs/auth"

export async function POST(req) {
  const session = await auth()

  await connectMongo()
  const body = await req.json()

  const user = await User.findById(session.user.id)

  const listItem = await ListItem.create({
    item: body.inputValue,
  })

  user.list.push(listItem._id)

  await user.save()

  return NextResponse.json({ success: true, listItem })
}

export async function GET(req) {
  await connectMongo()

  // 1. Get session from ShipFast auth
  const session = await auth()
  if (!session) {
    return Response.json({ error: "Not authenticated" }, { status: 401 })
  }

  // 2. Find the user in MongoDB
  const user = await User.findById(session.user.id)
  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 })
  }

  // 3. Query list items using user.list array of ObjectIds
  const items = await ListItem.find({
    _id: { $in: user.list },
  })

  console.log("Fetched items:", items)
  // 4. Return items as JSON
  return Response.json({ items })
}
