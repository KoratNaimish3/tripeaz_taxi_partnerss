import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQSection() {
  const sectionRef = useRef(null);
  const faqRef = useRef(null);
  const [openFAQ, setOpenFAQ] = useState(null);

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

    if (faqRef.current) {
      anime({
        targets: faqRef.current.children,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        delay: anime.stagger(100, { start: 600 }),
        easing: "easeOutExpo",
      });
    }
  }, []);

  const faqs = [
    {
      question: "How does Tripeaz Taxi Partners work?",
      answer:
        "Tripeaz Taxi Partners is a smart lead-sharing platform that connects drivers with relevant booking requests. Drivers post their availability, our AI matches them with nearby passengers, and secure escrow ensures safe transactions. It's like having a personal booking assistant that works 24/7.",
    },
    {
      question: "How are payments secured?",
      answer:
        "We use a built-in escrow system that holds payments securely until the ride is completed. This eliminates fraud and ensures both drivers and passengers are protected. All transactions are encrypted and processed through secure payment gateways with bank-grade security.",
    },
    {
      question: "Can I cancel or upgrade plans anytime?",
      answer:
        "Yes! You can upgrade, downgrade, or cancel your plan at any time. There are no long-term contracts or cancellation fees. Changes take effect immediately, and you'll only pay for the time you use each plan.",
    },
    {
      question: "How do I join as a vendor or agent?",
      answer:
        "Vendors and agents can join through our custom B2B packages. Simply contact our sales team through the contact form, and we'll set up a personalized plan based on your fleet size and requirements. We offer dedicated support and advanced features for business users.",
    },
    {
      question: "Is my data secure on the platform?",
      answer:
        "Absolutely. We use 256-bit SSL encryption, comply with data protection regulations, and never share your personal information with third parties. Your location data is only used for matching purposes and is deleted after the ride is completed.",
    },
    {
      question: "What if I have technical issues?",
      answer:
        "We provide 24/7 customer support through multiple channels - in-app chat, WhatsApp, email, and phone. Premium users get priority support with faster response times. Our technical team is always ready to help resolve any issues quickly.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef} className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
            Frequently Asked{" "}
            <span className="text-brand-yellow">Questions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Got questions? We've got answers. Find everything you need to know
            about Tripeaz Taxi Partners.
          </p>

          {/* Question Mark Illustration */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-brand-yellow to-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                <HelpCircle size={32} className="text-black" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-white font-bold text-xs">?</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div ref={faqRef} className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
              data-animation="fadeInUp"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-black pr-4">
                  {faq.question}
                </h3>
                <div
                  className={`w-8 h-8 bg-brand-yellow rounded-full flex items-center justify-center transition-transform duration-300 ${
                    openFAQ === index ? "rotate-180" : ""
                  }`}
                >
                  <ChevronDown size={16} className="text-black" />
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openFAQ === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-8 pb-6">
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16" data-animation="fadeInUp">
          <div className="bg-gradient-to-r from-gray-50 to-yellow-50 rounded-2xl p-8 border-2 border-brand-yellow">
            <h3 className="text-2xl font-bold text-black mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our support team is here to help you 24/7. Get in touch and we'll
              answer any questions you have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  const element = document.getElementById("contact");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="bg-brand-yellow text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105"
              >
                Contact Support
              </button>
              <button className="border-2 border-brand-yellow text-black px-8 py-3 rounded-lg font-semibold hover:bg-brand-yellow transition-all duration-300">
                WhatsApp Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



