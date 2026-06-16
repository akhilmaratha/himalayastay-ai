import React from "react";
import AboutHero from "../../components/about/AboutHero";
import OurStory from "../../components/about/OurStory";
import OurMission from "../../components/about/OurMission";
import HimalayanDifference from "../../components/about/HimalayanDifference";
import TeamSection from "../../components/about/TeamSection";
import CallToAction from "../../components/about/CallToAction";

export default function AboutPage() {
  return (
    <div className="grow">
      <AboutHero />
      <OurStory />
      <OurMission />
      <HimalayanDifference />
      <TeamSection />
      <CallToAction />
    </div>
  );
}
