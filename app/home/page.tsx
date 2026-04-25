"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Gamepad2, Users, Trophy, MessageCircle } from "lucide-react";

interface AnimatedSectionProps {
  id: string;
  direction: "left" | "right";
  children: React.ReactNode;
  visibleElements: { [key: string]: boolean };
}

const AnimatedSection = ({
  id,
  direction,
  children,
  visibleElements,
}: AnimatedSectionProps) => (
  <div
    id={id}
    data-animate
    className={`transition-all duration-1000 ${
      visibleElements[id]
        ? "opacity-100 translate-x-0"
        : direction === "left"
          ? "opacity-0 -translate-x-12"
          : "opacity-0 translate-x-12"
    }`}
  >
    {children}
  </div>
);

export default function HomePage() {
  const [visibleElements, setVisibleElements] = useState<{
    [key: string]: boolean;
  }>({});

  const observerOptions = {
    threshold: 0.05,
    rootMargin: "0px 0px -50px 0px",
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleElements((prev) => ({
            ...prev,
            [entry.target.id]: true,
          }));
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [observerOptions]);

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center pt-20 pb-12 px-4">
        <div className="absolute inset-0 bg-linear-to-b from-green-900/10 via-black to-black -z-10" />

        <div className="max-w-4xl mx-auto text-center space-y-8">
          <AnimatedSection
            id="hero-title"
            direction="left"
            visibleElements={visibleElements}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-green-400 uppercase tracking-widest mb-4">
              GAME CONNECT
            </h1>
          </AnimatedSection>

          <AnimatedSection
            id="hero-subtitle"
            direction="right"
            visibleElements={visibleElements}
          >
            <p className="text-xl md:text-2xl text-gray-300 mb-4">
              The Ultimate Platform for Competitive Mobile Legends Players
            </p>
          </AnimatedSection>

          <AnimatedSection
            id="hero-desc"
            direction="left"
            visibleElements={visibleElements}
          >
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              Connect with pro players, find scrim opponents, build your dream
              team, and elevate your gameplay to the next level. Join thousands
              of competitive players in the most vibrant ML community.
            </p>
          </AnimatedSection>

          <AnimatedSection
            id="hero-cta"
            direction="right"
            visibleElements={visibleElements}
          >
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="px-8 py-3 bg-green-600 hover:bg-green-500 text-black font-bold rounded-lg uppercase tracking-widest transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/scrims"
                className="px-8 py-3 border-2 border-green-600 text-green-400 hover:bg-green-600/10 font-bold rounded-lg uppercase tracking-widest transition-colors"
              >
                Explore Scrims
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 py-20 space-y-32">
        {/* Feature 1 */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <AnimatedSection
            id="feature-1-text"
            direction="left"
            visibleElements={visibleElements}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Gamepad2 size={32} className="text-green-400" />
                <h2 className="text-3xl font-bold text-green-400">
                  Find Scrims
                </h2>
              </div>
              <p className="text-gray-300 text-lg">
                Discover scrim matches tailored to your rank and playstyle.
                Connect with teams that match your skill level and compete in
                real-time matches.
              </p>
              <Link
                href="/scrims"
                className="inline-block mt-4 text-green-400 hover:text-green-300 font-semibold transition-colors"
              >
                Browse Scrims →
              </Link>
            </div>
          </AnimatedSection>
          <AnimatedSection
            id="feature-1-image"
            direction="right"
            visibleElements={visibleElements}
          >
            <div className="bg-linear-to-br from-green-600/20 to-black border border-green-600/30 rounded-lg p-8 h-64 flex items-center justify-center">
              <Gamepad2 size={80} className="text-green-600/40" />
            </div>
          </AnimatedSection>
        </div>

        {/* Feature 2 */}
        <div className="grid md:grid-cols-2 gap-12 items-center md:auto-cols-max">
          <AnimatedSection
            id="feature-2-image"
            direction="left"
            visibleElements={visibleElements}
          >
            <div className="bg-linear-to-br from-green-600/20 to-black border border-green-600/30 rounded-lg p-8 h-64 flex items-center justify-center md:order-2">
              <Users size={80} className="text-green-600/40" />
            </div>
          </AnimatedSection>
          <AnimatedSection
            id="feature-2-text"
            direction="right"
            visibleElements={visibleElements}
          >
            <div className="space-y-4 md:order-1">
              <div className="flex items-center gap-3">
                <Users size={32} className="text-green-400" />
                <h2 className="text-3xl font-bold text-green-400">
                  Build Teams
                </h2>
              </div>
              <p className="text-gray-300 text-lg">
                Recruit talented players and form squads with complementary
                skills. Create your organization and dominate the competitive
                scene.
              </p>
              <Link
                href="/scrims"
                className="inline-block mt-4 text-green-400 hover:text-green-300 font-semibold transition-colors"
              >
                Find Players →
              </Link>
            </div>
          </AnimatedSection>
        </div>

        {/* Feature 3 */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <AnimatedSection
            id="feature-3-text"
            direction="left"
            visibleElements={visibleElements}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Trophy size={32} className="text-green-400" />
                <h2 className="text-3xl font-bold text-green-400">
                  Rise the Ranks
                </h2>
              </div>
              <p className="text-gray-300 text-lg">
                Track your progress, compete against top-tier opponents, and
                climb the ranks. Showcase your skills and build your
                professional profile.
              </p>
              <Link
                href="/profile"
                className="inline-block mt-4 text-green-400 hover:text-green-300 font-semibold transition-colors"
              >
                View Rankings →
              </Link>
            </div>
          </AnimatedSection>
          <AnimatedSection
            id="feature-3-image"
            direction="right"
            visibleElements={visibleElements}
          >
            <div className="bg-linear-to-br from-green-600/20 to-black border border-green-600/30 rounded-lg p-8 h-64 flex items-center justify-center">
              <Trophy size={80} className="text-green-600/40" />
            </div>
          </AnimatedSection>
        </div>

        {/* Feature 4 */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <AnimatedSection
            id="feature-4-image"
            direction="left"
            visibleElements={visibleElements}
          >
            <div className="bg-linear-to-br from-green-600/20 to-black border border-green-600/30 rounded-lg p-8 h-64 flex items-center justify-center md:order-2">
              <MessageCircle size={80} className="text-green-600/40" />
            </div>
          </AnimatedSection>
          <AnimatedSection
            id="feature-4-text"
            direction="right"
            visibleElements={visibleElements}
          >
            <div className="space-y-4 md:order-1">
              <div className="flex items-center gap-3">
                <MessageCircle size={32} className="text-green-400" />
                <h2 className="text-3xl font-bold text-green-400">
                  Connect & Chat
                </h2>
              </div>
              <p className="text-gray-300 text-lg">
                Communicate with teammates and opponents. Build relationships
                and foster a vibrant community of passionate players.
              </p>
              <Link
                href="/chat"
                className="inline-block mt-4 text-green-400 hover:text-green-300 font-semibold transition-colors"
              >
                Start Chatting →
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 py-20">
        <AnimatedSection
          id="cta-section"
          direction="left"
          visibleElements={visibleElements}
        >
          <div className="bg-linear-to-r from-green-600/20 to-black border border-green-600/30 rounded-lg p-12 text-center space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold text-green-400">
              Ready to Dominate?
            </h3>
            <p className="text-gray-300 text-lg">
              Join the competitive community and prove your skills. Whether
              you're looking for scrims, teams, or just connecting with
              like-minded players, we've got you covered.
            </p>
            <Link
              href="/signup"
              className="inline-block px-8 py-3 bg-green-600 hover:bg-green-500 text-black font-bold rounded-lg uppercase tracking-widest transition-colors"
            >
              Create Your Account
            </Link>
          </div>
        </AnimatedSection>
      </div>

      {/* Footer CTA */}
      <div className="border-t border-green-600/20 px-4 py-12 mt-20">
        <AnimatedSection
          id="footer-cta"
          direction="right"
          visibleElements={visibleElements}
        >
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <p className="text-gray-400">
              Join thousands of competitive players already using GAME CONNECT
            </p>
            <p className="text-sm text-gray-500">
              Competitive gaming starts here. Find scrims, build teams, elevate
              your gameplay.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
