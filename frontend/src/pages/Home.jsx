import { useEffect, useRef } from "react";
import anime from "animejs";
import HeroSection from "../components/HeroSection";
import ProblemSection from "../components/ProblemSection";
import SolutionSection from "../components/SolutionSection";
import TrustSectionNew from "../components/TrustSectionNew";
import PricingSection from "../components/PricingSection";
import FAQSection from "../components/FAQSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import DemoRequestModal from "../components/DemoRequestModal";
import { useDemoModal } from "../context/DemoModalContext";
import BlogsPage from "./BlogsPage";

export default function Home() {
  const containerRef = useRef(null);
  const { isOpen, closeModal } = useDemoModal();

  useEffect(() => {
    // Initialize animations when component mounts
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target;
            const animationType = target.dataset.animation;

            switch (animationType) {
              case "fadeInUp":
                anime({
                  targets: target,
                  opacity: [0, 1],
                  translateY: [30, 0],
                  duration: 800,
                  easing: "easeOutExpo",
                });
                break;
              case "slideInLeft":
                anime({
                  targets: target,
                  opacity: [0, 1],
                  translateX: [-50, 0],
                  duration: 800,
                  easing: "easeOutExpo",
                });
                break;
              case "slideInRight":
                anime({
                  targets: target,
                  opacity: [0, 1],
                  translateX: [50, 0],
                  duration: 800,
                  easing: "easeOutExpo",
                });
                break;
              case "scaleIn":
                anime({
                  targets: target,
                  opacity: [0, 1],
                  scale: [0.8, 1],
                  duration: 600,
                  easing: "easeOutExpo",
                });
                break;
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all elements with animation data attributes
    const animatedElements = document.querySelectorAll("[data-animation]");
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Handle hash scrolling when component mounts or hash changes
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      // Wait for the DOM to be fully rendered
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-white overflow-x-hidden w-full"
    >
      <Navigation />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <TrustSectionNew />
      {/* <BlogsPage/> */}
      {/* <PricingSection /> */}
      <FAQSection />
      <ContactSection />
      <Footer />
      <DemoRequestModal isOpen={isOpen} onClose={closeModal} />
    </div>
  );
}



