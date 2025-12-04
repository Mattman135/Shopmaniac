import { getSEOTags } from "@/libs/seo"
import ButtonSignin from "@/components/ButtonSignin"

export const metadata = getSEOTags({ canonicalUrlRelative: "/" })

export default function Home() {
  return (
    <>
      <main className="min-h-screen p-12 pb-24 text-center" data-theme="dark">
        <section className="max-w-xl mx-auto space-y-8">
          <h1 className="text-3xl md:text-4xl font-extrabold">Shopmaniac 🥦</h1>

          <p className="text-lg leading-relaxed text-base-content/80">
            The simplest, most <span className="font-bold"> minimalistic </span>
            shopping list on the market—just what you{" "}
            <span className="font-bold"> need </span>, nothing more nothing
            less. Effortlessly create, manage, and check off your shopping list.
          </p>

          <img
            src="https://images.unsplash.com/photo-1518843875459-f738682238a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3484&q=80"
            alt="Vegetables"
            width={500}
            height={250}
            className="rounded-lg mx-auto"
          />

          <ButtonSignin extraStyle={`btn btn-primary btn-wide`} />
        </section>
      </main>
    </>
  )
}
