import { useEffect, useRef } from "react";
import anime from "animejs";
import {
  MessageCircle,
  Clock,
  Shield,
  Phone,
  Car,
  AlertTriangle,
} from "lucide-react";

export default function ProblemSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    if (sectionRef.current) {
      anime({
        targets: sectionRef.current.children,
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 800,
        delay: anime.stagger(200),
        easing: "easeOutExpo",
      });
    }

    if (cardsRef.current) {
      anime({
        targets: cardsRef.current.children,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        delay: anime.stagger(150, { start: 600 }),
        easing: "easeOutExpo",
      });
    }
  }, []);

  const problems = [
    {
      icon: MessageCircle,
      title: "WhatsApp Group Chaos",
      description:
        "Drivers drowning in endless message threads, missing important leads while scrolling through irrelevant chats.",
      bgColor: "bg-red-500",
      cornerIcon: MessageCircle,
    },
    {
      icon: Clock,
      title: "Lost Opportunities",
      description:
        "Critical booking requests slip through the cracks in chaotic group chats, leading to missed revenue.",
      bgColor: "bg-orange-500",
      cornerIcon: Clock,
    },
    {
      icon: Shield,
      title: "Frauds & Scams",
      description:
        "No verification system leads to fake bookings, payment frauds, and wasted time on non-existent rides.",
      bgColor: "bg-red-600",
      cornerIcon: Shield,
    },
    {
      icon: Phone,
      title: "Unwanted Calls & Messages",
      description:
        "Constant spam calls and irrelevant notifications disrupt drivers' work and personal time.",
      bgColor: "bg-purple-500",
      cornerIcon: Phone,
    },
    {
      icon: Car,
      title: "Stuck Vehicles, No System Help",
      description:
        "Idle taxis with no booking system to connect them with nearby passengers efficiently.",
      bgColor: "bg-gray-600",
      cornerIcon: Car,
    },
    {
      icon: AlertTriangle,
      title: "Booking Mismatch Problem",
      description:
        "Poor matching leads to wrong pickups, customer complaints, and damaged reputation.",
      bgColor: "bg-amber-700",
      cornerIcon: AlertTriangle,
    },
  ];

  return (
    <section id="problems" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef} className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
            The Reality <span className="text-brand-yellow">Today</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every day, thousands of taxi drivers face these challenges that cost
            them time, money, and opportunities.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {problems.map((problem, index) => {
            const IconComponent = problem.icon;
            const CornerIconComponent = problem.cornerIcon;
            return (
              <div
                key={index}
                className="relative bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 overflow-visible"
                data-animation="fadeInUp"
              >
                {/* Top-right Yellow Corner Icon */}
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-brand-yellow rounded-full flex items-center justify-center shadow-md z-10 border-2 border-white">
                  <CornerIconComponent size={18} className="text-black" />
                </div>

                {/* Colored Square with Icon */}
                <div className="mb-6">
                  <div
                    className={`w-20 h-20 ${problem.bgColor} rounded-lg flex items-center justify-center mx-auto`}
                  >
                    <IconComponent size={40} className="text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-black mb-3 text-center">
                  {problem.title}
                </h3>

                <p className="text-gray-600 text-center leading-relaxed mb-4">
                  {problem.description}
                </p>

                {/* Red Horizontal Line */}
                <div className="mt-4 flex justify-center">
                  <div className="w-12 h-1 bg-red-500 rounded-full"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16" data-animation="fadeInUp">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-black mb-4">
              Tired of These Problems?
            </h3>
            <p className="text-gray-600 mb-6">
              There's a better way. See how we solve each of these challenges
              with our smart platform.
            </p>
            <button
              onClick={() => {
                const element = document.getElementById("solutions");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="bg-brand-yellow text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105"
            >
              See Our Solutions
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
