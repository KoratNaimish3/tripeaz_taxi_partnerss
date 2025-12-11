import { useEffect, useRef } from "react";
import anime from "animejs";
import { MapPin, Shield, Bell, Car, Star, ArrowRight, Edit, CheckCircle } from "lucide-react";

export default function SolutionSection() {
  const sectionRef = useRef(null);
  const solutionsRef = useRef(null);
  const flowchartRef = useRef(null);

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

    if (solutionsRef.current) {
      anime({
        targets: solutionsRef.current.children,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        delay: anime.stagger(150, { start: 600 }),
        easing: "easeOutExpo",
      });
    }

    if (flowchartRef.current) {
      anime({
        targets: flowchartRef.current.children,
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 800,
        delay: anime.stagger(200, { start: 1200 }),
        easing: "easeOutElastic(1, .8)",
      });
    }
  }, []);

  const solutions = [
    {
      icon: MapPin,
      title: "Smart Lead-Matching",
      subtitle: "Location + Preferences",
      description:
        "AI-powered matching system connects drivers with the most relevant bookings based on location, preferences, and availability.",
      bgColor: "bg-green-100",
      iconBg: "bg-green-500",
      iconColor: "text-green-500",
    },
    {
      icon: Shield,
      title: "Fraud-Free Escrow",
      subtitle: "Secure Payments",
      description:
        "Built-in escrow system ensures secure transactions with verified payments, eliminating fraud and payment disputes.",
      bgColor: "bg-blue-100",
      iconBg: "bg-blue-500",
      iconColor: "text-blue-500",
    },
    {
      icon: Bell,
      title: "No Unwanted Calls",
      subtitle: "Only Relevant Notifications",
      description:
        "Smart notification system sends only relevant booking alerts, eliminating spam and unwanted interruptions.",
      bgColor: "bg-purple-100",
      iconBg: "bg-purple-500",
      iconColor: "text-purple-500",
    },
    {
      icon: Car,
      title: "Stuck Vehicle Solution",
      subtitle: "Idle Taxis Get Bookings",
      description:
        "Intelligent system identifies idle vehicles and connects them with nearby passengers, maximizing utilization.",
      bgColor: "bg-orange-100",
      iconBg: "bg-orange-500",
      iconColor: "text-orange-500",
    },
    {
      icon: Star,
      title: "Trust Layer",
      subtitle: "Ratings & Partner Score",
      description:
        "Comprehensive rating system builds trust with partner scores, reviews, and verified driver profiles.",
      bgColor: "bg-yellow-100",
      iconBg: "bg-yellow-500",
      iconColor: "text-yellow-500",
    },
  ];

  const flowchartSteps = [
    { step: "Post", icon: Edit, description: "Driver posts availability" },
    { step: "Smart Notify", icon: Bell, description: "AI matches & notifies" },
    { step: "Escrow", icon: Shield, description: "Secure payment setup" },
    { step: "Complete Duty", icon: CheckCircle, description: "Ride completion" },
    { step: "Rating", icon: Star, description: "Mutual feedback" },
  ];

  return (
    <section id="solutions" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef} className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
            A Smarter Way to{" "}
            <span className="text-brand-yellow">Share Taxi Leads</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform transforms the chaotic taxi lead-sharing process into a
            streamlined, secure, and profitable system.
          </p>
        </div>

        {/* Solutions Grid */}
        <div
          ref={solutionsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {solutions.map((solution, index) => {
            const IconComponent = solution.icon;
            return (
              <div
                key={index}
                className={`${solution.bgColor} rounded-lg p-8 hover:shadow-lg transition-all duration-300`}
                data-animation="fadeInUp"
              >
                {/* Icon in White Square */}
                <div className="mb-6 flex justify-center">
                  <div className={`w-20 h-20 ${solution.iconBg} rounded-lg flex items-center justify-center`}>
                    <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                      <IconComponent size={32} className={solution.iconColor} strokeWidth={1.5} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-black mb-2 text-center">
                  {solution.title}
                </h3>

                <p className="text-brand-yellow font-semibold text-center mb-4">
                  {solution.subtitle}
                </p>

                <p className="text-gray-600 text-center leading-relaxed mb-4">
                  {solution.description}
                </p>

                {/* Yellow Horizontal Underline */}
                <div className="mt-4 flex justify-center">
                  <div className="w-12 h-1 bg-brand-yellow rounded-full"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Flowchart Visual */}
        <div
          ref={flowchartRef}
          className="bg-gray-100 rounded-3xl p-8 lg:p-12"
        >
          <h3 className="text-3xl font-bold text-center text-black mb-12">
            How It Works
          </h3>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-2">
            {flowchartSteps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col lg:flex-row items-center"
                >
                  {/* Step Card */}
                  <div className="bg-yellow-50 border-2 border-brand-yellow rounded-lg p-6 min-w-[180px] text-center group hover:shadow-md transition-all duration-300">
                    <div className="mb-3 flex justify-center">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border-2 border-brand-yellow">
                        <StepIcon size={24} className="text-brand-yellow" strokeWidth={2} />
                      </div>
                    </div>
                    <h4 className="text-lg font-bold text-black mb-2">
                      {step.step}
                    </h4>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>

                  {/* Arrow */}
                  {index < flowchartSteps.length - 1 && (
                    <div className="hidden lg:block mx-2">
                      <ArrowRight size={24} className="text-brand-yellow" />
                    </div>
                  )}

                  {/* Mobile Arrow */}
                  {index < flowchartSteps.length - 1 && (
                    <div className="lg:hidden my-4">
                      <div className="w-8 h-8 bg-brand-yellow rounded-full flex items-center justify-center">
                        <ArrowRight size={16} className="text-black rotate-90" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16" data-animation="fadeInUp">
          <div className="bg-brand-yellow rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-black mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-black mb-6 opacity-80">
              Join thousands of drivers who have already made the switch to
              smarter lead sharing.
            </p>
            <button
              onClick={() => {
                const element = document.getElementById("pricing");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="bg-black text-brand-yellow px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
            >
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
