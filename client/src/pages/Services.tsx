import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Clock, DollarSign } from "lucide-react";
import { Link } from "wouter";

export default function Services() {
  const services = [
    {
      category: "Cleaning Services",
      description: "Professional cleaning for all types of spaces",
      items: [
        {
          name: "Office Cleaning",
          description: "Complete office cleaning including desks, floors, and common areas",
          price: "$250",
          duration: "3 hours",
          features: ["Daily or weekly", "Eco-friendly products", "Flexible scheduling"]
        },
        {
          name: "Residential Cleaning",
          description: "Thorough home cleaning service for residential properties",
          price: "$180",
          duration: "2-3 hours",
          features: ["Deep cleaning", "Customizable packages", "Professional staff"]
        },
        {
          name: "Commercial Cleaning",
          description: "Large-scale cleaning for commercial buildings and facilities",
          price: "$400+",
          duration: "4-6 hours",
          features: ["24/7 availability", "Bulk discounts", "Equipment included"]
        }
      ]
    },
    {
      category: "Pest Control",
      description: "Comprehensive pest prevention and elimination",
      items: [
        {
          name: "General Pest Control",
          description: "Treatment for common household pests",
          price: "$320",
          duration: "2 hours",
          features: ["Safe for families", "Guaranteed results", "Follow-up visits"]
        },
        {
          name: "Termite Treatment",
          description: "Specialized termite prevention and elimination",
          price: "$450",
          duration: "3 hours",
          features: ["Preventive barrier", "Annual inspection", "Warranty included"]
        },
        {
          name: "Rodent Control",
          description: "Effective rodent prevention and removal",
          price: "$280",
          duration: "2 hours",
          features: ["Trapping service", "Exclusion work", "Monitoring included"]
        }
      ]
    },
    {
      category: "Sanitization Services",
      description: "Deep cleaning and disinfection for maximum hygiene",
      items: [
        {
          name: "Deep Sanitization",
          description: "Comprehensive disinfection of all surfaces",
          price: "$450",
          duration: "4 hours",
          features: ["Hospital-grade disinfectants", "All surfaces covered", "Certified staff"]
        },
        {
          name: "Post-Construction Cleaning",
          description: "Specialized cleaning after construction or renovation",
          price: "$500+",
          duration: "5-8 hours",
          features: ["Dust removal", "Final polish", "Quality inspection"]
        },
        {
          name: "Biohazard Cleanup",
          description: "Professional cleanup and disinfection services",
          price: "Custom quote",
          duration: "Varies",
          features: ["24/7 emergency", "Certified technicians", "Discreet service"]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <span className="text-xl font-bold text-foreground">NASAYIM CLEAN</span>
            </div>
          </Link>
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </nav>

      {/* Header */}
      <section className="py-12 bg-gradient-to-b from-primary/5 to-background">
        <div className="container text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Our Services</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive cleaning and pest control solutions for every need
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container space-y-20">
          {services.map((serviceGroup, idx) => (
            <div key={idx} className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">{serviceGroup.category}</h2>
                <p className="text-muted-foreground">{serviceGroup.description}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {serviceGroup.items.map((service, sidx) => (
                  <Card key={sidx} className="border-border hover:shadow-lg transition-shadow flex flex-col">
                    <CardHeader>
                      <CardTitle className="text-foreground">{service.name}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-primary" />
                          <span className="font-bold text-foreground">{service.price}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          <span className="text-foreground">{service.duration}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {service.features.map((feature, fidx) => (
                          <div key={fidx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Link href="/contact">
                        <Button className="w-full gap-2 mt-4">
                          Book Now
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted/50">
        <div className="container text-center space-y-8">
          <h2 className="text-3xl font-bold text-foreground">Need a Custom Package?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Contact us for personalized service packages tailored to your specific needs
          </p>
          <Link href="/contact">
            <Button size="lg">Get Custom Quote</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 border-t border-border py-12">
        <div className="container text-center text-sm text-muted-foreground">
          <p>&copy; 2026 NASAYIM CLEAN. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
