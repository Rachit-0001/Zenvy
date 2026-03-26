import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Award, Truck, Leaf, Zap, ChevronRight, Star, Mail } from "lucide-react";
import heroCoffee from "@/assets/hero-coffee.jpg";
import bestsellerCoffee from "@/assets/bestseller-coffee.jpg";
import brandStory from "@/assets/brand-story.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Index = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts(8).then(p => { setProducts(p); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center">
        <div className="absolute inset-0">
          <img src={heroCoffee} alt="Zenvy coffee lifestyle" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-foreground/30" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl">
            <h1 className="font-display text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
              Fuel Your Focus ☕
            </h1>
            <p className="text-primary-foreground/90 text-lg md:text-xl mb-8 font-body leading-relaxed">
              Premium coffee crafted for clarity, energy, and productivity.
            </p>
            <Link to="/collections">
              <Button size="lg" className="rounded-full px-8 text-base font-body">
                Shop Now <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Our Products</h2>
          <p className="text-muted-foreground max-w-md mx-auto">Carefully sourced, expertly roasted, designed for your best work.</p>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1,2,3,4].map(i => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-muted rounded-lg mb-4" />
                <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                <div className="h-4 bg-muted rounded w-1/4" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 bg-secondary/30 rounded-2xl">
            <p className="text-muted-foreground text-lg mb-2">No products found</p>
            <p className="text-sm text-muted-foreground">Tell the chat what products you'd like to add!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Why Choose Us */}
      <section className="bg-secondary/40 py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-16">Why Choose Zenvy</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Award, title: "Premium Quality Beans", desc: "Ethically sourced from the world's finest coffee regions." },
              { icon: Truck, title: "Fast Shipping", desc: "Roasted fresh and delivered to your door in 2-3 days." },
              { icon: Leaf, title: "Eco-Friendly Packaging", desc: "100% recyclable and compostable packaging materials." },
              { icon: Zap, title: "Designed for Productivity", desc: "Optimized roast profiles for sustained focus and energy." },
            ].map((item) => (
              <div key={item.title} className="text-center p-8 rounded-2xl bg-background shadow-soft">
                <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-accent/10 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Seller */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="rounded-2xl overflow-hidden shadow-elevated">
            <img src={bestsellerCoffee} alt="Zenvy Focus Blend" className="w-full h-full object-cover" loading="lazy" width={800} height={800} />
          </div>
          <div>
            <span className="text-accent font-body text-sm font-semibold tracking-widest uppercase mb-3 block">Best Seller</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">The Focus Blend</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Our signature blend combines single-origin Ethiopian and Colombian beans, 
              medium-roasted to perfection. Rich chocolate and citrus notes provide a smooth, 
              energizing cup that keeps you in the zone for hours.
            </p>
            <Link to="/collections">
              <Button size="lg" className="rounded-full px-8">
                Shop Now <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-secondary/40 py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-16">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "— Customer Review", text: "No reviews yet. Be the first to share your experience!" },
              { name: "— Customer Review", text: "No reviews yet. Be the first to share your experience!" },
              { name: "— Customer Review", text: "No reviews yet. Be the first to share your experience!" },
            ].map((review, i) => (
              <div key={i} className="bg-background p-8 rounded-2xl shadow-soft">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 text-muted" />)}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 italic">"{review.text}"</p>
                <p className="font-display font-semibold text-sm">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-accent font-body text-sm font-semibold tracking-widest uppercase mb-3 block">Our Story</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">Brewed for the Modern Mind</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Zenvy was born from a simple idea: coffee should do more than just wake you up. 
              It should fuel your creativity, sharpen your focus, and fit seamlessly into your 
              daily ritual.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              We partner with sustainable farms, roast in small batches, and obsess over 
              every detail — because your morning cup deserves nothing less.
            </p>
            <Link to="/about">
              <Button variant="outline" className="rounded-full px-8">
                Learn More <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-elevated">
            <img src={brandStory} alt="Zenvy brand story" className="w-full h-full object-cover" loading="lazy" width={800} height={600} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-secondary/40 py-24">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-16">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {[
              { q: "How long does shipping take?", a: "We ship within 24 hours and most orders arrive in 2-3 business days." },
              { q: "What makes your coffee special?", a: "We source single-origin beans from sustainable farms and roast in small batches for maximum freshness and flavor." },
              { q: "Do you offer a subscription?", a: "Yes! Save 15% with our monthly coffee subscription. Never run out of your favorite blend." },
              { q: "What's your return policy?", a: "We offer a 30-day satisfaction guarantee. If you're not happy, we'll make it right." },
              { q: "Is your packaging eco-friendly?", a: "Absolutely. All our packaging is 100% recyclable and compostable." },
            ].map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-background rounded-xl px-6 border-none shadow-soft">
                <AccordionTrigger className="font-display font-semibold text-left hover:no-underline">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-xl mx-auto text-center">
          <Mail className="w-10 h-10 mx-auto mb-6 text-accent" />
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Join the Zenvy Club</h2>
          <p className="text-muted-foreground mb-8">Get exclusive offers, brewing tips, and early access to new blends.</p>
          <form className="flex gap-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 rounded-full border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <Button type="submit" className="rounded-full px-8">Subscribe</Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Index;
