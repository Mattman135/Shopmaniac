import connectMongo from "@/libs/mongoose"
import ButtonLogout from "@/components/ButtonLogout"
import ListItem from "@/models/ListItem"
import CartSection from "@/components/CartSection"

export const dynamic = "force-dynamic"
// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page

export default async function Dashboard() {
  await connectMongo()
  const items = await ListItem.find({}).lean()

  const serializedItems = items.map((item) => ({
    _id: item._id.toString(),
    item: item.item,
  }))

  return (
    <main className="min-h-screen p-8 pb-24">
      <section className="max-w-xl mx-auto space-y-8 flex flex-col items-center">
        <ButtonLogout />
        <h1 className="text-3xl md:text-2xl font-extrabold">Your cart</h1>
        <CartSection initialItems={serializedItems} />
      </section>
    </main>
  )
}
