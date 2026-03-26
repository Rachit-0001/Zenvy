import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import brandStory from "@/assets/brand-story.jpg";
import heroCoffee from "@/assets/hero-coffee.jpg";

const AboutPage = () => (
  <div>
    {/* Hero */}
    <section className="relative h-[50vh] min-h-[400px] flex items-center">
      <div className="absolute inset-0">
        <img src={heroCoffee} alt="About Zenvy" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-foreground/40" />
      </div>
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-4">About Zenvy</h1>
        <p className="text-primary-foreground/90 text-lg max-w-lg mx-auto">Coffee for the curious. Fuel for the focused.</p>
      </div>
    </section>

    {/* Story */}
    <section className="container mx-auto px-4 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-accent font-body text-sm font-semibold tracking-widest uppercase mb-3 block">Our Mission</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">Brewed With Purpose</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Zenvy started in a small studio apartment where two friends — a designer and a developer — 
            realized their best work happened over great coffee. Not just any coffee, but the kind that 
            made you feel calm, focused, and ready to create.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We set out to build a coffee brand for the modern creative professional. Every bean is 
            ethically sourced, every roast is optimized for smooth energy without the crash, and every 
            bag is packed with intention.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Today, Zenvy fuels thousands of creators, students, and professionals around the world. 
            Our mission remains simple: make coffee that helps you do your best work.
          </p>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-elevated">
          <img src={brandStory} alt="Zenvy brand story" className="w-full h-full object-cover" loading="lazy" width={800} height={600} />
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="bg-secondary/40 py-24">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-3xl font-bold text-center mb-16">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { title: "Quality First", desc: "Single-origin beans, small-batch roasting, and rigorous quality control." },
            { title: "Sustainability", desc: "Eco-friendly packaging, fair trade partnerships, and carbon-conscious shipping." },
            { title: "Community", desc: "Building a global community of focused, creative, and intentional people." },
          ].map(v => (
            <div key={v.title} className="text-center p-8 bg-background rounded-2xl shadow-soft">
              <h3 className="font-display font-semibold text-xl mb-3">{v.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="container mx-auto px-4 py-24 text-center">
      <h2 className="font-display text-3xl font-bold mb-4">Ready to fuel your focus?</h2>
      <p className="text-muted-foreground mb-8">Explore our collection and find your perfect blend.</p>
      <Link to="/collections">
        <Button size="lg" className="rounded-full px-8">
          Shop Now <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </Link>
    </section>
  </div>
);

export default AboutPage;
