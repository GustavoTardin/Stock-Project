import NavBar from "./Navbar";

export default function Header(){
  return (
    <header>
      <div className="py-8 px-12 text-4xl bg-slate-900"><strong>M</strong>ARCA DA EMPRESA</div>
      <section className="flex items-center bg-darkBlueDetails">
        <NavBar />
      </section>
    </header>
  )
}