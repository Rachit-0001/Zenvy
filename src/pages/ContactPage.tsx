import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";

const ContactPage = () => {
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      toast.success("Message sent!", { description: "We'll get back to you within 24 hours." });
      setSending(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
        <p className="text-muted-foreground max-w-md mx-auto">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold mb-2 block">Name</label>
              <Input placeholder="Your name" required className="rounded-lg" />
            </div>
            <div>
              <label className="text-sm font-semibold mb-2 block">Email</label>
              <Input type="email" placeholder="you@example.com" required className="rounded-lg" />
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold mb-2 block">Subject</label>
            <Input placeholder="How can we help?" required className="rounded-lg" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-2 block">Message</label>
            <Textarea placeholder="Tell us more..." rows={6} required className="rounded-lg resize-none" />
          </div>
          <Button type="submit" size="lg" className="w-full rounded-full" disabled={sending}>
            {sending ? "Sending..." : "Send Message"}
          </Button>
        </form>

        {/* Contact Info */}
        <div className="space-y-8 lg:pl-8">
          {[
            { icon: Mail, title: "Email", detail: "hello@zenvy.co" },
            { icon: MapPin, title: "Location", detail: "San Francisco, CA" },
            { icon: Clock, title: "Hours", detail: "Mon - Fri, 9am - 6pm PST" },
          ].map((info) => (
            <div key={info.title} className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <info.icon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-display font-semibold mb-1">{info.title}</h3>
                <p className="text-muted-foreground text-sm">{info.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
