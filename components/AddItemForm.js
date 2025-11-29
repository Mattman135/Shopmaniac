"use client"
import { useState } from "react"
import axios from "axios"

export default function AddItemForm() {
  const [inputValue, setInputValue] = useState("")

  const handleSubmit = async () => {
    if (!inputValue.trim()) return

    const data = await axios.post("/api/list", { inputValue })
    console.log(data.data)

    setInputValue("") // clear input after save
  }

  return (
    <div className="join">
      <input
        type="text"
        className="input join-item"
        placeholder="Write here..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className="btn join-item" type="button" onClick={handleSubmit}>
        +
      </button>
    </div>
  )
}
