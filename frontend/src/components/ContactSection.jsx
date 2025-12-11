import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import anime from "animejs";
import { Phone, Mail, MessageCircle, Send, Headphones } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function ContactSection() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const supportRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

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

    if (formRef.current) {
      anime({
        targets: formRef.current,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        delay: 600,
        easing: "easeOutExpo",
      });
    }

    if (supportRef.current) {
      anime({
        targets: supportRef.current.children,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        delay: anime.stagger(150, { start: 1000 }),
        easing: "easeOutExpo",
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", phone: "", email: "", message: "" });
    alert("Thank you for your message! We'll get back to you soon.");
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      details: "+91 9103774717",
      link: "tel:+919103774717",
      description: "Call us for immediate assistance",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Mail,
      title: "Email Support",
      details: "support@taxiwalepartners.com",
      link: "mailto:support@taxiwalepartners.com",
      description: "Send us an email anytime",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Support",
      details: "+91 9103774717",
      link: "https://wa.me/919103774717",
      description: "Quick chat support via WhatsApp",
      color: "from-green-600 to-green-700",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef} className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
            We're Here to <span className="text-brand-yellow">Support You</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Need help? Our team is available 24/7 for drivers, vendors, and
            agents. Get in touch and we'll help you succeed.
          </p>

          {/* Support Agent Illustration */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-brand-yellow to-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                <Headphones size={32} className="text-black" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-white font-bold text-sm">24/7</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div ref={formRef} className="bg-white rounded-3xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-black mb-6">Get in Touch</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all duration-200"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all duration-200"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-yellow text-black py-3 px-6 rounded-lg font-semibold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Send Message
                <Send size={16} />
              </button>
            </form>
          </div>

          {/* Contact Methods */}
          <div ref={supportRef} className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-black mb-6">
                Contact Methods
              </h3>
              <div className="space-y-6">
                {contactMethods.map((method, index) => {
                  const IconComponent = method.icon;
                  return (
                    <a
                      key={index}
                      href={method.link}
                      target={method.link.startsWith("http") ? "_blank" : "_self"}
                      rel={method.link.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="block bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                      data-animation="fadeInUp"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-12 h-12 bg-gradient-to-br ${method.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                        >
                          <IconComponent size={20} className="text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-black mb-1">
                            {method.title}
                          </h4>
                          <p className="text-brand-yellow font-semibold mb-2 hover:text-yellow-400 transition-colors">
                            {method.details}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {method.description}
                          </p>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* WhatsApp Support Button */}
            <a
              href="https://wa.me/919103774717"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-green-500 rounded-2xl p-6 text-white hover:bg-green-600 transition-colors duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                  <MessageCircle size={24} className="text-green-500" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">
                    Quick WhatsApp Support
                  </h4>
                  <p className="text-green-100 mb-3">
                    Get instant help via WhatsApp
                  </p>
                  <div className="bg-white text-green-500 px-4 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-200 inline-block">
                    Chat Now
                  </div>
                </div>
              </div>
            </a>

            {/* Support Hours */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-brand-yellow">
              <h4 className="font-bold text-black mb-3">Support Hours</h4>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span className="font-semibold">24/7</span>
                </div>
                <div className="flex justify-between">
                  <span>Weekends:</span>
                  <span className="font-semibold">24/7</span>
                </div>
                <div className="flex justify-between">
                  <span>Holidays:</span>
                  <span className="font-semibold">24/7</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-green-700 text-sm font-semibold">
                  ✓ We're always here to help you succeed!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16" data-animation="fadeInUp">
          <div className="bg-brand-yellow rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-black mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-black mb-6 opacity-90">
              Join thousands of drivers who have already transformed their
              business with Tripeaz Taxi Partners.
            </p>
            <button
              onClick={handleStartTrial}
              className="bg-black text-brand-yellow px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
            >
              Start Your Free Trial
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}



