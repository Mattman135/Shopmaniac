"use client"

import axios from "axios"
import { useRouter } from "next/navigation"

export default function ItemsList({ items }) {
  const router = useRouter()

  const handleDelete = async (id) => {
    await axios.delete(`/api/list`, { id })
    router.refresh() // reload server data
  }

  return (
    <div className="w-full space-y-2 mt-4">
      {items.map((item) => (
        <div
          key={item._id}
          className="p-3 bg-base-200 rounded cursor-pointer hover:bg-base-300"
          onClick={() => handleDelete(item._id)}
        >
          {item.item}
        </div>
      ))}
    </div>
  )
}
