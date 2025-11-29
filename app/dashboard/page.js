import ButtonAccount from "@/components/ButtonAccount"
import AddItemForm from "@/components/AddItemForm"

export const dynamic = "force-dynamic"

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default async function Dashboard() {
  return (
    <main className="min-h-screen p-8 pb-24">
      <section className="max-w-xl mx-auto space-y-8 flex flex-col items-center">
        <ButtonAccount />
        <h1 className="text-3xl md:text-2xl font-extrabold">Your cart</h1>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Add item</legend>
          <AddItemForm />
        </fieldset>
      </section>
    </main>
  )
}
