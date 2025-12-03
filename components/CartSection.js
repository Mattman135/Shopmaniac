"use client"
import { useState } from "react"
import AddItemForm from "@/components/AddItemForm"

export default function CartSection({ initialItems }) {
  const [items, setItems] = useState(initialItems)

  return (
    <>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Add item</legend>
        <AddItemForm onItemAdded={(newItem) => setItems([...items, newItem])} />
      </fieldset>

      <div className="w-full max-w-xl space-y-2">
        {items.map((doc) => (
          <div
            key={doc._id}
            className="p-3 bg-base-200 rounded-lg hover:bg-base-300 transition"
          >
            {doc.item}
          </div>
        ))}
      </div>
    </>
  )
}
