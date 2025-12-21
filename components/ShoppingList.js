"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useSession } from "next-auth/react"
import ButtonSignin from "./ButtonSignin"

const ShoppingList = () => {
  const { data: session, status } = useSession()
  const [items, setItems] = useState([])
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (status === "authenticated") {
      fetchItems()
    } else {
      setItems([])
    }
  }, [status])

  const fetchItems = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await axios.get("/api/list/get")
      setItems(res.data || [])
    } catch (err) {
      console.error(err)
      setError("Failed to load items")
    } finally {
      setLoading(false)
    }
  }

  const handleAddItem = async (e) => {
    e.preventDefault()
    setError("")
    const value = text.trim()
    if (!value) {
      setError("Enter an item")
      return
    }

    setAdding(true)
    try {
      const res = await axios.post("/api/list/post", { text: value })
      setItems((prev) => [res.data, ...prev])
      setText("")
    } catch (err) {
      console.error(err)
      if (err?.response?.status === 409) setError("Item already exists")
      else if (err?.response?.status === 401) setError("Sign in to add items")
      else setError("Could not add item")
    } finally {
      setAdding(false)
    }
  }

  const handleDelete = async (id) => {
    setError("")
    const prev = items
    setItems(items.filter((i) => (i.id || i._id) !== id))
    try {
      await axios.delete(`/api/list/delete?id=${encodeURIComponent(id)}`)
    } catch (err) {
      console.error(err)
      setItems(prev)
      setError("Could not delete item")
    }
  }

  return (
    <section className="flex flex-col">
      {status !== "authenticated" ? (
        <div className="mb-4">
          <p className="mb-2">Sign in to manage your shopping list</p>
          <ButtonSignin text="Sign in" />
        </div>
      ) : (
        <>
          <form className="join mb-4" onSubmit={handleAddItem}>
            <label className="input validator join-item">
              <input
                type="text"
                placeholder="Green potatoes"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
                disabled={adding}
              />
            </label>
            <button
              type="submit"
              className="btn btn-neutral join-item"
              disabled={adding}
            >
              {adding ? "Adding..." : "+"}
            </button>
          </form>

          {error && <div className="text-sm text-red-500 mb-2">{error}</div>}

          <div id="container_div" className="flex flex-col gap-2">
            {loading ? (
              <div>Loading...</div>
            ) : items.length === 0 ? (
              <div className="text-sm text-muted">No items yet</div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id || item._id}
                  onClick={() => handleDelete(item.id || item._id)}
                  className="p-2 rounded border hover:bg-gray-100 cursor-pointer"
                  title="Click to delete"
                >
                  {item.text}
                </div>
              ))
            )}
          </div>
        </>
      )}
    </section>
  )
}

export default ShoppingList
