import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Users, Zap, Heart } from "lucide-react";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/">
            <span className="text-xl font-bold text-foreground cursor-pointer">NASAYIM CLEAN</span>
          </Link>
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </nav>

      {/* Header */}
      <section className="py-12 bg-gradient-to-b from-primary/5 to-background">
        <div className="container text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">About NASAYIM CLEAN</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your trusted partner for professional cleaning and pest control services
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container max-w-3xl space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Story</h2>
            <p className="text-foreground mb-4">
              NASAYIM CLEAN was founded with a simple mission: to provide professional, reliable, and affordable cleaning and pest control services to businesses and homes across the UAE.
            </p>
            <p className="text-foreground mb-4">
              With years of experience in the industry, our team has developed a deep understanding of what it takes to maintain clean, healthy, and pest-free spaces. We combine traditional cleaning expertise with modern techniques and eco-friendly solutions.
            </p>
            <p className="text-foreground">
              Today, we're proud to serve hundreds of satisfied customers and continue to grow our reputation as the leading cleaning and pest control service provider in the region.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/50">
        <div className="container space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: Heart,
                title: "Customer Care",
                description: "Your satisfaction is our top priority"
              },
              {
                icon: Award,
                title: "Excellence",
                description: "We maintain the highest standards"
              },
              {
                icon: Zap,
                title: "Reliability",
                description: "You can count on us every time"
              },
              {
                icon: Users,
                title: "Teamwork",
                description: "Our strength is in our people"
              }
            ].map((value, idx) => (
              <Card key={idx} className="border-border text-center">
                <CardHeader>
                  <value.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <CardTitle className="text-foreground">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experienced professionals dedicated to your satisfaction
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Ahmed Al-Mansouri",
                role: "Founder & CEO",
                bio: "20+ years of experience in cleaning services"
              },
              {
                name: "Fatima Al-Mazrouei",
                role: "Operations Manager",
                bio: "Expert in service quality and customer satisfaction"
              },
              {
                name: "Mohammed Hassan",
                role: "Lead Technician",
                bio: "Specialist in pest control and sanitization"
              }
            ].map((member, idx) => (
              <Card key={idx} className="border-border">
                <CardHeader>
                  <div className="w-full h-40 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg mb-4"></div>
                  <CardTitle className="text-foreground">{member.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="font-semibold text-primary">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center space-y-8">
          <h2 className="text-3xl font-bold">Ready to Experience Our Service?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Contact us today and let us show you why we're the trusted choice
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary">
              Get in Touch
            </Button>
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
