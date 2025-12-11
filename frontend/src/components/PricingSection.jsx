import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import anime from "animejs";
import { Check, Star, ArrowRight, Wallet } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function PricingSection() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const sectionRef = useRef(null);
  const pricingRef = useRef(null);
  const walletRef = useRef(null);

  const handleStartTrial = () => {
    if (isAuthenticated) {
      alert("You're already logged in! Welcome back.");
    } else {
      navigate("/signup");
    }
  };

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

    if (pricingRef.current) {
      anime({
        targets: pricingRef.current.children,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        delay: anime.stagger(200, { start: 600 }),
        easing: "easeOutExpo",
      });
    }

    if (walletRef.current) {
      anime({
        targets: walletRef.current,
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 800,
        delay: 1000,
        easing: "easeOutElastic(1, .8)",
      });
    }
  }, []);

  const plans = [
    {
      name: "Monthly Plan",
      price: "₹300",
      period: "/month",
      originalPrice: null,
      description: "Flexible monthly subscription",
      gst: "Including 18% GST",
      features: [
        "Upload leads",
        "Get trip",
        "Upload available for duty status",
        "24/7 support - Chatbot",
        "Call support (working hours only)",
        "Booking notification",
        "Community access",
        "Advance filters",
      ],
      cta: "Start Free Trial",
      popular: false,
      color: "border-gray-200",
      bgColor: "bg-white",
      badge: null,
    },
    {
      name: "Yearly Plan",
      price: "₹2,880",
      period: "/year",
      originalPrice: "₹3,600",
      description: "Best value with 20% discount",
      gst: "Including 18% GST",
      features: [
        "Upload leads",
        "Get trip",
        "Upload available for duty status",
        "24/7 support - Chatbot",
        "Call support (working hours only)",
        "Booking notification",
        "Community access",
        "Advance filters",
      ],
      cta: "Start Free Trial",
      popular: true,
      color: "border-brand-yellow",
      bgColor: "bg-yellow-50",
      badge: "Save 20%",
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef} className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
            Flexible Plans for{" "}
            <span className="text-brand-yellow">Every Partner</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Simple, affordable, and designed for growth. Start with 90 days free trial, no credit card required.
          </p>

          {/* Wallet Illustration */}
          <div ref={walletRef} className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-16 bg-gradient-to-r from-brand-yellow to-yellow-400 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-black font-bold text-2xl">₹</span>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-white font-bold text-sm">✓</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div ref={pricingRef} className="grid md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${plan.bgColor} border-2 ${plan.color}`}
              data-animation="fadeInUp"
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-brand-yellow text-black px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star size={14} className="fill-current" />
                    {plan.badge || "Most Popular"}
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-black mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center mb-2 gap-2">
                  {plan.originalPrice && (
                    <span className="text-2xl text-gray-400 line-through">
                      {plan.originalPrice}
                    </span>
                  )}
                  <span className="text-4xl font-bold text-black">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 ml-1">{plan.period}</span>
                </div>
                <p className="text-gray-600 mb-1">{plan.description}</p>
                <p className="text-sm text-brand-yellow font-semibold">{plan.gst}</p>
                <div className="mt-4 bg-green-50 border border-green-200 rounded-lg px-4 py-2 inline-block">
                  <p className="text-green-700 text-sm font-semibold">
                    ✓ 90 Days Free Trial (No Cost)
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-brand-yellow rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-black" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                onClick={handleStartTrial}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 ${
                  plan.popular
                    ? "bg-brand-yellow text-black hover:bg-yellow-400"
                    : "bg-black text-brand-yellow hover:bg-gray-800"
                }`}
              >
                {plan.cta}
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Custom B2B Packages */}
        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg mb-16">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-black mb-6">
              Custom B2B Packages Available
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              For vendors, agents, and fleet owners who need enterprise-level
              features and dedicated support.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black font-bold text-2xl">🏢</span>
                </div>
                <h4 className="font-bold text-black mb-2">Fleet Management</h4>
                <p className="text-gray-600 text-sm">
                  Manage multiple vehicles and drivers
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black font-bold text-2xl">📊</span>
                </div>
                <h4 className="font-bold text-black mb-2">
                  Advanced Analytics
                </h4>
                <p className="text-gray-600 text-sm">
                  Detailed reporting and insights
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black font-bold text-2xl">🎯</span>
                </div>
                <h4 className="font-bold text-black mb-2">Priority Support</h4>
                <p className="text-gray-600 text-sm">
                  Dedicated account manager
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                const element = document.getElementById("contact");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="bg-brand-yellow text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 mx-auto"
            >
              Contact Sales Team
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center" data-animation="fadeInUp">
          <div className="bg-gradient-to-r from-brand-yellow to-yellow-400 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-black mb-4">
              Ready to Choose Your Plan?
            </h3>
            <p className="text-black mb-6 opacity-90">
              Start with 90 days free trial - no credit card required. All plans include 18% GST.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleStartTrial}
                className="bg-black text-brand-yellow px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300"
              >
                Start Free Trial
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById("faq");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="border-2 border-black text-black px-6 py-3 rounded-lg font-semibold hover:bg-black hover:text-brand-yellow transition-all duration-300"
              >
                View FAQs
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



