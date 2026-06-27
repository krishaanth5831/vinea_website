import {
  Nav,
  Hero,
  Problem,
  Product,
  Capabilities,
  Ribbon,
  RaaS,
  Market,
  Roadmap,
  About,
  Contact,
  Footer,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Product />
        <Capabilities />
        <Ribbon />
        <RaaS />
        <Market />
        <Roadmap />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
