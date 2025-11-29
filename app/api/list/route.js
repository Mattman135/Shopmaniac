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
  console.log("User found:", user)

  const listItem = await ListItem.create({
    item: body.inputValue,
  })

  user.list.push(listItem._id)

  await user.save()

  console.log("Updated list:", user.list)

  return NextResponse.json({ success: true, listItem })
}
