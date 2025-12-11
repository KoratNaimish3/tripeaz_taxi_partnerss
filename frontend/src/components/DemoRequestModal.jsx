import { useState, useEffect, useRef } from "react";
import {
  X,
  User,
  Mail,
  Phone,
  Building,
  MessageSquare,
  CheckCircle,
  Loader2,
  Sparkles,
} from "lucide-react";
import anime from "animejs";

export default function DemoRequestModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const modalRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Lock body scroll when modal is open
      const originalOverflow = document.body.style.overflow;
      const originalOverflowX = document.body.style.overflowX;
      const originalOverflowY = document.body.style.overflowY;
      document.body.style.overflow = "hidden";
      document.body.style.overflowX = "hidden";
      document.body.style.overflowY = "hidden";

      // Reset form when modal opens
      setFormData({
        name: "",
        email: "",
        phone: "",
        businessType: "",
        message: "",
      });
      setValidationErrors({});
      setShowSuccess(false);

      // Animate modal entrance
      if (modalRef.current) {
        anime({
          targets: modalRef.current,
          opacity: [0, 1],
          scale: [0.9, 1],
          duration: 400,
          easing: "easeOutExpo",
        });
      }
      if (formRef.current) {
        anime({
          targets: formRef.current.children,
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 500,
          delay: anime.stagger(80),
          easing: "easeOutExpo",
        });
      }

      // Restore original overflow on cleanup
      return () => {
        document.body.style.overflow = originalOverflow || "";
        document.body.style.overflowX = originalOverflowX || "";
        document.body.style.overflowY = originalOverflowY || "";
      };
    } else {
      document.body.style.overflow = "";
      document.body.style.overflowX = "hidden";
      document.body.style.overflowY = "";
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      errors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!formData.businessType.trim()) {
      errors.businessType = "Please select your business type";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const existingRequests = localStorage.getItem("demoRequests");
      const requests = existingRequests ? JSON.parse(existingRequests) : [];

      const newRequest = {
        id: Date.now().toString(),
        ...formData,
        phone: formData.phone.replace(/\D/g, ""),
        isDemoRequest: true,
        submittedAt: new Date().toISOString(),
      };

      requests.push(newRequest);
      localStorage.setItem("demoRequests", JSON.stringify(requests));

      setShowSuccess(true);

      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          businessType: "",
          message: "",
        });
        setShowSuccess(false);
        onClose();
      }, 2500);
    } catch (error) {
      console.error("Error submitting demo request:", error);
      alert("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-x-hidden">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        ref={modalRef}
        className="relative w-full max-w-[540px] max-h-[95vh] overflow-hidden mx-auto"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "calc(100vw - 1.5rem)" }}
      >
        {/* Gradient Header */}
        <div className="relative bg-gradient-to-br from-brand-yellow via-yellow-400 to-brand-yellow p-6 sm:p-8 pb-8">
          <div className="absolute inset-0 bg-black/5"></div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-black transition-all duration-200 z-10"
            disabled={isSubmitting}
          >
            <X size={20} />
          </button>

          {/* Header Content */}
          <div className="relative z-10">
            <div className="flex items-center justify-center w-16 h-16 bg-white/30 backdrop-blur-sm rounded-2xl mb-4 mx-auto">
              <Sparkles className="text-black" size={32} />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-black text-center mb-2">
              Request a Demo
            </h2>
            <p className="text-black/80 text-center text-sm sm:text-base">
              Let's show you how we can transform your business
            </p>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white relative">
          {showSuccess ? (
            /* Success Message */
            <div className="p-12 sm:p-16 text-center">
              <div className="relative inline-flex mb-6">
                <div className="absolute inset-0 bg-green-100 rounded-full animate-ping"></div>
                <div className="relative w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle size={48} className="text-white" />
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Request Submitted!
              </h3>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                Thank you for your interest. Our team will contact you within 24 hours to schedule
                your personalized demo.
              </p>
              <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>You'll be redirected shortly...</span>
              </div>
            </div>
          ) : (
            /* Form */
            <form ref={formRef} onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
              {/* Name Field */}
              <div className="space-y-2">
                <label
                  htmlFor="demo-name"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User
                      size={18}
                      className={`transition-colors ${
                        validationErrors.name
                          ? "text-red-400"
                          : formData.name
                          ? "text-brand-yellow"
                          : "text-gray-400"
                      }`}
                    />
                  </div>
                  <input
                    type="text"
                    id="demo-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed box-border focus:bg-white focus:outline-none ${
                      validationErrors.name
                        ? "border-red-300 focus:border-red-400"
                        : "border-gray-200 focus:border-brand-yellow"
                    }`}
                    placeholder="John Doe"
                  />
                </div>
                {validationErrors.name && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    {validationErrors.name}
                  </p>
                )}
              </div>

              {/* Email & Phone Grid */}
              <div className="grid sm:grid-cols-2 gap-5">
                {/* Email */}
                <div className="space-y-2">
                  <label
                    htmlFor="demo-email"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail
                        size={18}
                        className={`transition-colors ${
                          validationErrors.email
                            ? "text-red-400"
                            : formData.email
                            ? "text-brand-yellow"
                            : "text-gray-400"
                        }`}
                      />
                    </div>
                    <input
                      type="email"
                      id="demo-email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed box-border focus:bg-white focus:outline-none ${
                        validationErrors.email
                          ? "border-red-300 focus:border-red-400"
                          : "border-gray-200 focus:border-brand-yellow"
                      }`}
                      placeholder="john@example.com"
                    />
                  </div>
                  {validationErrors.email && (
                    <p className="text-xs text-red-600 mt-1">{validationErrors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label
                    htmlFor="demo-phone"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Phone
                        size={18}
                        className={`transition-colors ${
                          validationErrors.phone
                            ? "text-red-400"
                            : formData.phone
                            ? "text-brand-yellow"
                            : "text-gray-400"
                        }`}
                      />
                    </div>
                    <input
                      type="tel"
                      id="demo-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed box-border focus:bg-white focus:outline-none ${
                        validationErrors.phone
                          ? "border-red-300 focus:border-red-400"
                          : "border-gray-200 focus:border-brand-yellow"
                      }`}
                      placeholder="9876543210"
                    />
                  </div>
                  {validationErrors.phone && (
                    <p className="text-xs text-red-600 mt-1">{validationErrors.phone}</p>
                  )}
                </div>
              </div>

              {/* Business Type */}
              <div className="space-y-2">
                <label
                  htmlFor="demo-business"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Business Type <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                    <Building
                      size={18}
                      className={`transition-colors ${
                        validationErrors.businessType
                          ? "text-red-400"
                          : formData.businessType
                          ? "text-brand-yellow"
                          : "text-gray-400"
                      }`}
                    />
                  </div>
                  <select
                    id="demo-business"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className={`w-full pl-12 pr-10 py-3.5 bg-gray-50 border-2 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed appearance-none cursor-pointer focus:bg-white focus:outline-none ${
                      validationErrors.businessType
                        ? "border-red-300 focus:border-red-400"
                        : "border-gray-200 focus:border-brand-yellow"
                    }`}
                  >
                    <option value="">Select business type</option>
                    <option value="driver">Individual Driver</option>
                    <option value="vendor">Taxi Vendor</option>
                    <option value="agent">Travel Agent</option>
                    <option value="fleet">Fleet Owner</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
                {validationErrors.businessType && (
                  <p className="text-xs text-red-600 mt-1">{validationErrors.businessType}</p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label
                  htmlFor="demo-message"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Message <span className="text-gray-400 text-xs font-normal">(Optional)</span>
                </label>
                <div className="relative group">
                  <div className="absolute top-3.5 left-4 pointer-events-none">
                    <MessageSquare
                      size={18}
                      className={`transition-colors ${
                        formData.message ? "text-brand-yellow" : "text-gray-400"
                      }`}
                    />
                  </div>
                  <textarea
                    id="demo-message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    rows={4}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl transition-all duration-200 resize-none disabled:opacity-50 disabled:cursor-not-allowed box-border focus:bg-white focus:border-brand-yellow focus:outline-none"
                    placeholder="Tell us about your business or specific requirements..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-brand-yellow to-yellow-400 text-black py-4 px-6 rounded-xl font-bold text-base hover:from-yellow-400 hover:to-brand-yellow transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Request</span>
                    <Sparkles size={18} />
                  </>
                )}
              </button>

              {/* Trust Note */}
              <p className="text-xs text-center text-gray-500 pt-2">
                🔒 Your information is secure and will never be shared
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}



