"use client"

import { useState } from "react"
import AddItemForm from "@/components/AddItemForm"
import axios from "axios"

export default function CartSection({ initialItems }) {
  const [items, setItems] = useState(initialItems)

  const handleDelete = async (itemId) => {
    console.log("Deleting item with ID:", itemId)
    // Optimistically remove from UI
    setItems(items.filter((item) => item._id !== itemId))

    try {
      await axios.delete("/api/list", { data: { itemId } })
    } catch (error) {
      // Revert on error
      setItems(initialItems)
      alert("Failed to delete item")
      console.error("Error: ", error)
    }
  }

  return (
    <>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Add item</legend>
        <AddItemForm />
      </fieldset>

      <div className="w-full max-w-xl space-y-2">
        {items.map((doc) => (
          <div
            key={doc._id}
            onClick={() => handleDelete(doc._id)}
            className="p-3 bg-base-200 rounded-lg cursor-pointer hover:bg-base-300 transition-colors"
          >
            {doc.item}
          </div>
        ))}
      </div>
    </>
  )
}
