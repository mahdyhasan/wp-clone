'use client';

import { Card, CardContent } from '@/components/ui/card';
import { 
  Zap, 
  Shield, 
  DollarSign, 
  Headphones, 
  Cpu, 
  Users,
  TrendingUp,
  Award
} from 'lucide-react';

const StrengthsSection = () => {
  const strengths = [
    {
      icon: Zap,
      title: "Lightning Speed",
      description: "From requirement to onboarded talent in just 7 days, not months. Accelerate your growth without delays.",
      color: "bg-pastel-blue"
    },
    {
      icon: Shield,
      title: "Quality Vetted",
      description: "Rigorous 5-stage vetting process ensures only top 3% of candidates make it through.",
      color: "bg-pastel-green"
    },
    {
      icon: DollarSign,
      title: "Cost Efficient",
      description: "Save 70-80% compared to local hiring while maintaining or improving quality standards.",
      color: "bg-pastel-peach"
    },
    {
      icon: Headphones,
      title: "Expert Support",
      description: "Dedicated account managers and 24/7 support ensure smooth integration and success.",
      color: "bg-pastel-lilac"
    },
    {
      icon: Cpu,
      title: "Tech-Enabled",
      description: "AI-powered matching and streamlined processes powered by cutting-edge technology.",
      color: "bg-pastel-mint"
    },
    {
      icon: Users,
      title: "Global Talent",
      description: "Access to elite talent from across the globe, not limited by geographic boundaries.",
      color: "bg-pastel-lavender"
    },
    {
      icon: TrendingUp,
      title: "Scalable Solutions",
      description: "Easily scale your team up or down based on project needs and business cycles.",
      color: "bg-pastel-pink"
    },
    {
      icon: Award,
      title: "Proven Track Record",
      description: "Trusted by 100+ companies with 500+ successful placements and 95% retention rate.",
      color: "bg-pastel-yellow"
    }
  ];

  return (
    <section className="py-20 bg-pastel-green/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Why Augmex is Different
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We combine cutting-edge technology with human expertise to deliver exceptional results 
              that traditional hiring simply cannot match.
            </p>
          </div>

          {/* Strengths Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {strengths.map((strength, index) => {
              const Icon = strength.icon;
              return (
                <Card 
                  key={index} 
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-background/80 backdrop-blur-sm border-primary/20"
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 ${strength.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">
                      {strength.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {strength.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
              <h3 className="text-2xl font-display font-bold mb-4">
                Ready to Experience the Augmex Difference?
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                Join hundreds of companies that have transformed their hiring process and built elite remote teams.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  Schedule a Consultation
                </button>
                <button className="border border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-colors">
                  View Case Studies
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StrengthsSection;