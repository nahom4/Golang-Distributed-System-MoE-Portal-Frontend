import React from "react";
import "../styles/home.css";
import {Header} from '../components/Header';
import { HeroSection } from "../components/HeroSection";
import { FeaturesSection } from "../components/FeaturesSection";
import {Footer} from '../components/Footer';
export default function Home() {
  return (
    <div className="education-container">
      <Header />
      <main className="pt-16">
        <HeroSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}
