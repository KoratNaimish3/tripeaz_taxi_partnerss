import { useEffect, useRef } from "react";
import anime from "animejs";
import { ArrowRight, Play } from "lucide-react";
import { useDemoModal } from "../context/DemoModalContext";
import HeroMap from "./HeroMap";

export default function HeroSection() {
  const heroRef = useRef(null);
  const mapRef = useRef(null);
  const { openModal } = useDemoModal();

  useEffect(() => {
    // Animate hero content
    if (heroRef.current) {
      anime({
        targets: heroRef.current.children,
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 1000,
        delay: anime.stagger(200),
        easing: "easeOutExpo",
      });
    }

    // Animate map
    if (mapRef.current) {
      anime({
        targets: mapRef.current,
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 1200,
        delay: 800,
        easing: "easeOutExpo",
      });
    }
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50 to-yellow-50"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23facc15' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div ref={heroRef} className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-7xl font-bold text-black mb-6 leading-tight">
              One Platform.{" "}
              <span className="text-brand-yellow">Zero Chaos.</span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
              India's first dedicated taxi lead-sharing platform – eliminating
              WhatsApp chaos, frauds, and mismatched bookings.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="https://whatsapp.com/channel/0029Vb5mWKIDZ4LUWB8IMW0M"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-yellow text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Join the Network
                <ArrowRight size={20} />
              </a>

              <button
                onClick={openModal}
                className="border-2 border-brand-yellow text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brand-yellow transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Play size={20} />
                Request Demo
              </button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-yellow">2.5K+</div>
                <div className="text-gray-600">Gujarat Drivers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-yellow">25+</div>
                <div className="text-gray-600">Gujarat Cities</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-yellow">95%</div>
                <div className="text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right Content - Map Visualization */}
          <div className="relative" ref={mapRef}>
            <HeroMap />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-brand-yellow rounded-full flex justify-center">
          <div className="w-1 h-3 bg-brand-yellow rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}

