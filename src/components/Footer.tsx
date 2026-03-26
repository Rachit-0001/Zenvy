import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook } from "lucide-react";

export const Footer = () => (
  <footer className="border-t bg-secondary/30">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <h3 className="font-display text-2xl font-bold mb-3">Zenvy</h3>
          <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
            Premium coffee crafted for clarity, energy, and productivity. Fuel your focus, every single day.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {[
              { label: "Home", to: "/" },
              { label: "Shop", to: "/collections" },
              { label: "About", to: "/about" },
              { label: "Contact", to: "/contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-foreground transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Follow Us</h4>
          <div className="flex gap-4">
            <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-foreground transition-colors"><Instagram className="h-5 w-5" /></a>
            <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-foreground transition-colors"><Twitter className="h-5 w-5" /></a>
            <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-foreground transition-colors"><Facebook className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
      <div className="border-t mt-12 pt-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Zenvy. All rights reserved.
      </div>
    </div>
  </footer>
);
