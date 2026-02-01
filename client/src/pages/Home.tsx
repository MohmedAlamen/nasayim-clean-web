import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, CheckCircle2, Users, Zap, Award, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">NASAYIM CLEAN</span>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/services">
              <a className="text-foreground hover:text-primary transition-colors">Services</a>
            </Link>
            <Link href="/about">
              <a className="text-foreground hover:text-primary transition-colors">About</a>
            </Link>
            <Link href="/contact">
              <a className="text-foreground hover:text-primary transition-colors">Contact</a>
            </Link>
            <Link href="/login">
              <Button>Staff Login</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-primary/5 to-background">
        <div className="container text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              Your Trusted Partner for
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold text-primary">
              Cleaning & Pest Control
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional cleaning and pest control services that keep your spaces fresh, clean, and pest-free. Serving businesses and homes with excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/contact">
              <Button size="lg" className="gap-2">
                Book Service Now
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline">
                View Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-background">
        <div className="container space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive cleaning and pest control solutions tailored to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Sparkles,
                title: "Professional Cleaning",
                description: "Office, residential, and commercial cleaning services with attention to detail"
              },
              {
                icon: Zap,
                title: "Pest Control",
                description: "Effective pest prevention and elimination for a safe, healthy environment"
              },
              {
                icon: Award,
                title: "Sanitization",
                description: "Deep cleaning and disinfection services for maximum hygiene"
              }
            ].map((service, idx) => (
              <Card key={idx} className="border-border hover:shadow-lg transition-shadow">
                <CardHeader>
                  <service.icon className="w-8 h-8 text-primary mb-2" />
                  <CardTitle className="text-foreground">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center pt-8">
            <Link href="/services">
              <Button variant="outline" size="lg">
                Explore All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-muted/50">
        <div className="container space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Why Choose NASAYIM CLEAN</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're committed to delivering exceptional service quality
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              "Professional and trained technicians",
              "Eco-friendly cleaning solutions",
              "24/7 customer support",
              "Competitive pricing",
              "Fast and reliable service",
              "Satisfaction guaranteed"
            ].map((reason, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-foreground font-medium">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Contact us today for a free quote and let us help keep your space clean and pest-free
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary">
                Get Free Quote
              </Button>
            </Link>
            <a href="https://wa.me/971501234567" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                WhatsApp Us
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 border-t border-border py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-foreground mb-4">NASAYIM CLEAN</h3>
              <p className="text-sm text-muted-foreground">Professional cleaning and pest control services</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/services"><a className="hover:text-primary">Cleaning</a></Link></li>
                <li><Link href="/services"><a className="hover:text-primary">Pest Control</a></Link></li>
                <li><Link href="/services"><a className="hover:text-primary">Sanitization</a></Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about"><a className="hover:text-primary">About Us</a></Link></li>
                <li><Link href="/contact"><a className="hover:text-primary">Contact</a></Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Email: info@nasayim.com</li>
                <li>Phone: +971 50 123 4567</li>
                <li>Dubai, UAE</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 NASAYIM CLEAN. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
