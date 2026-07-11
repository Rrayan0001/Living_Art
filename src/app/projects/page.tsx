import React from "react";
import WelcomeScreen from "@/components/WelcomeScreen";
import Header from "@/components/Header";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

export default function ProjectsPage() {
  return (
    <>
      {/* Welcome Screen Preloader */}
      <WelcomeScreen />

      {/* Sticky Navigation Header */}
      <Header />

      {/* Main Content with Spacer to avoid navbar overlap */}
      <main style={{ paddingTop: "180px", minHeight: "100vh" }}>
        <Gallery showAll={true} />
      </main>

      {/* Standalone Brand Footer */}
      <Footer />
    </>
  );
}
