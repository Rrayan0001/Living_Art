import React from "react";
import WelcomeScreen from "@/components/WelcomeScreen";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <WelcomeScreen />
      <Header />
      <main>
        <Hero />
        <About />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
