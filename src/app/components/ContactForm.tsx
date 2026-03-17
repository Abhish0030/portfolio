import { useEffect, useState } from "react";
import emailjs, { EmailJSResponseStatus } from "@emailjs/browser";
import { MagneticButton } from "./MagneticButton";
import { Mail, User, MessageSquare } from "lucide-react";

type FormState = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [needsReconnect, setNeedsReconnect] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const serviceId = import.meta.env.VITE_EMAIL_SERVICE_ID?.trim();
  const templateId = import.meta.env.VITE_EMAIL_TEMPLATE_ID?.trim();
  const publicKey = import.meta.env.VITE_EMAIL_PUBLIC_KEY?.trim();

  useEffect(() => {
    if (publicKey) {
      emailjs.init({
        publicKey,
      });
    }
  }, [publicKey]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setNeedsReconnect(false);

    if (!serviceId || !templateId || !publicKey) {
      setFormState("error");
      setErrorMessage("Email service is not configured correctly.");
      return;
    }

    setFormState("sending");

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          user_name: formData.name,
          from_name: formData.name,
          email: formData.email,
          user_email: formData.email,
          from_email: formData.email,
          reply_to: formData.email,
          message: formData.message,
          to_name: "Abhishek Singh",
        },
        {
          publicKey,
        }
      );

      setFormState("success");

      setTimeout(() => {
        setFormState("idle");
        setErrorMessage("");
        setNeedsReconnect(false);
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      }, 3000);
    } catch (error) {
      console.error(error);
      setFormState("error");
      if (error instanceof EmailJSResponseStatus) {
        const message = error.text || `EmailJS error ${error.status}`;
        setErrorMessage(message);
        if (message.toLowerCase().includes("gmail_api") || message.toLowerCase().includes("invalid grant")) {
          setNeedsReconnect(true);
        }
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
        if (error.message.toLowerCase().includes("gmail_api") || error.message.toLowerCase().includes("invalid grant")) {
          setNeedsReconnect(true);
        }
      } else {
        setErrorMessage("Unable to send message right now.");
      }
    }
  };

  const borderColor =
    formState === "success"
      ? "border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
      : formState === "error"
      ? "border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
      : "border-white/10";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">

        {/* Name */}
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
            disabled={formState === "sending"}
            className={`w-full bg-white/5 border ${borderColor} rounded-xl px-12 py-3 md:py-4 text-base text-white placeholder:text-white/40 focus:outline-none focus:border-violet-500/50 transition-all duration-300`}
          />
        </div>

        {/* Email */}
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="email"
            name="user_email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            disabled={formState === "sending"}
            className={`w-full bg-white/5 border ${borderColor} rounded-xl px-12 py-3 md:py-4 text-base text-white placeholder:text-white/40 focus:outline-none focus:border-violet-500/50 transition-all duration-300`}
          />
        </div>

        {/* Message */}
        <div className="relative">
          <MessageSquare className="absolute left-4 top-6 w-5 h-5 text-white/40" />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            required
            rows={5}
            disabled={formState === "sending"}
            className={`w-full bg-white/5 border ${borderColor} rounded-xl px-12 py-4 text-base text-white placeholder:text-white/40 focus:outline-none focus:border-violet-500/50 transition-all duration-300 resize-none`}
          />
        </div>
      </div>

      <MagneticButton
        type="submit"
        className={`w-full py-3 md:py-4 px-8 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-base md:text-lg text-white transition-all duration-300 ${
          formState === "sending"
            ? "opacity-70 cursor-not-allowed"
            : formState === "success"
            ? "bg-green-600"
            : "hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]"
        }`}
      >
        {formState === "idle" && "Send Message"}
        {formState === "sending" && "Sending..."}
        {formState === "success" && "✓ Message Sent!"}
        {formState === "error" && "Error - Try Again"}
      </MagneticButton>

      {formState === "error" && errorMessage ? (
        <div className="space-y-3">
          <p className="text-sm text-red-300/90">{errorMessage}</p>
          {needsReconnect ? (
            <div className="rounded-xl border border-amber-400/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-100/90">
              EmailJS Gmail access has expired. Reconnect the Gmail account in your EmailJS service settings, or use the direct email link below.
            </div>
          ) : null}
          <a
            href="mailto:singhabhishak2005@gmail.com"
            className="inline-flex rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 transition-colors hover:bg-white/10"
          >
            Email Me Directly
          </a>
        </div>
      ) : null}
    </form>
  );
}
