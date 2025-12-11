import { useEffect, useRef } from "react";
import anime from "animejs";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    if (footerRef.current) {
      anime({
        targets: footerRef.current.children,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        delay: anime.stagger(100),
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

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  const quickLinks = [
    { name: "Home", href: "hero" },
    { name: "Features", href: "solutions" },
    { name: "Pricing", href: "pricing" },
    { name: "Contact", href: "contact" },
    { name: "Privacy Policy", href: "#" },
  ];

  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={footerRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
        >
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-brand-yellow rounded-lg flex items-center justify-center mr-3">
                <span className="text-black font-bold text-xl">T</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  Tripeaz Taxi Partners
                </h3>
                <p className="text-gray-400 text-sm">Trusted Network</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              India's first dedicated taxi lead-sharing platform. Connecting
              drivers, vendors, and agents for a smarter, more profitable taxi
              industry.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="tel:+919103774717"
                className="flex items-center gap-3 hover:text-brand-yellow transition-colors duration-200"
              >
                <Phone size={16} className="text-brand-yellow" />
                <span className="text-gray-300 hover:text-brand-yellow">+91 9103774717</span>
              </a>
              <a
                href="mailto:support@taxiwalepartners.com"
                className="flex items-center gap-3 hover:text-brand-yellow transition-colors duration-200"
              >
                <Mail size={16} className="text-brand-yellow" />
                <span className="text-gray-300 hover:text-brand-yellow">
                  support@taxiwalepartners.com
                </span>
              </a>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-brand-yellow" />
                <span className="text-gray-300">
                  Rajkot, Gujarat, India
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-300 hover:text-brand-yellow transition-colors duration-200 text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Follow Us</h4>
            <div className="flex gap-4 mb-6">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-brand-yellow hover:text-black transition-all duration-300 transform hover:scale-110"
                    aria-label={social.label}
                  >
                    <IconComponent size={18} />
                  </a>
                );
              })}
            </div>

            {/* Newsletter Signup */}
            <div>
              <h5 className="text-sm font-semibold text-white mb-3">
                Stay Updated
              </h5>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-yellow focus:border-transparent text-sm"
                />
                <button className="bg-brand-yellow text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200 text-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © 2025 Tripeaz Taxi Partners – A brand associated with{" "}
                <a
                  href="https://wolfrontechnologies.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-yellow hover:text-yellow-400 transition-colors"
                >
                  Wolfron Technologies LLP
                </a>
                .
              </p>
            </div>

            {/* Wolfron Logo */}
            <a
              href="https://wolfrontechnologies.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-6 h-6 bg-brand-yellow rounded flex items-center justify-center">
                <span className="text-black font-bold text-xs">W</span>
              </div>
              <span className="text-gray-400 text-sm">
                Wolfron Technologies LLP
              </span>
            </a>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Trusted by 10K+ Partners</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}



