"use client";
import Hero from "./components/Landing/Hero/Hero";
import ClientOnly from "./components/ClientOnly";
export default function Home() {
  return (
    <>
      <ClientOnly>
        <Hero />
      </ClientOnly>
    </>
  );
}
