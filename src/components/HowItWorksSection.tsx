'use client';

import { Card, CardContent } from '@/components/ui/card';
import { 
  FileText, 
  Search, 
  UserCheck, 
  Headphones,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      step: 1,
      icon: FileText,
      title: "Share Your Team Needs",
      description: "Tell us about your project requirements, team structure, and ideal candidate profile. We'll schedule a quick consultation to understand your goals.",
      duration: "15-30 minutes",
      color: "bg-pastel-blue"
    },
    {
      step: 2,
      icon: Search,
      title: "We Source & Vet Elite Talent",
      description: "Our AI-powered system matches your requirements with our global talent pool. Each candidate undergoes rigorous technical and cultural vetting.",
      duration: "2-3 days",
      color: "bg-pastel-green"
    },
    {
      step: 3,
      icon: UserCheck,
      title: "Interview & Onboard in Days",
      description: "Review curated shortlist, conduct interviews, and select your ideal candidates. We handle all onboarding paperwork and logistics.",
      duration: "3-5 days",
      color: "bg-pastel-peach"
    },
    {
      step: 4,
      icon: Headphones,
      title: "Ongoing Support & Success",
      description: "Enjoy dedicated account management, regular check-ins, and 24/7 support. We ensure seamless integration and long-term success.",
      duration: "Continuous",
      color: "bg-pastel-lilac"
    }
  ];

  return (
    <section className="py-20 bg-pastel-mint/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our streamlined process gets you from talent need to onboarded team members in just 7 days, 
              not months. Here's how we make it happen:
            </p>
          </div>

          {/* Timeline Steps */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-pastel-blue via-pastel-green to-pastel-peach hidden lg:block"></div>

            <div className="space-y-12">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isEven = index % 2 === 1;
                
                return (
                  <div key={step.step} className="relative lg:flex lg:items-center">
                    {/* Step Number Circle */}
                    <div className="flex justify-center lg:justify-start lg:w-1/2 mb-4 lg:mb-0">
                      <div className="flex items-center">
                        <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center z-10 border-4 border-background shadow-lg`}>
                          <Icon className="h-8 w-8 text-primary" />
                        </div>
                        <div className="ml-4 lg:hidden">
                          <div className="text-sm font-semibold text-primary">Step {step.step}</div>
                          <div className="text-xs text-muted-foreground">{step.duration}</div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`lg:w-1/2 ${isEven ? 'lg:order-first lg:text-right lg:pr-8' : 'lg:pl-8'}`}>
                      <Card className="bg-background/80 backdrop-blur-sm border-primary/20 hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="hidden lg:flex items-center justify-center mb-2">
                            <div className="text-sm font-semibold text-primary">Step {step.step}</div>
                            <div className="mx-2">•</div>
                            <div className="text-xs text-muted-foreground">{step.duration}</div>
                          </div>
                          <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                          <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Arrow for mobile */}
                    {index < steps.length - 1 && (
                      <div className="flex justify-center lg:hidden mt-4">
                        <ArrowRight className="h-6 w-6 text-primary" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Process Summary */}
          <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">7 Days</div>
                <div className="text-lg font-semibold mb-1">Total Process</div>
                <div className="text-sm text-muted-foreground">From need to onboarded</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">95%</div>
                <div className="text-lg font-semibold mb-1">Success Rate</div>
                <div className="text-sm text-muted-foreground">Client satisfaction</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-lg font-semibold mb-1">Support</div>
                <div className="text-sm text-muted-foreground">Dedicated assistance</div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 text-center">
              <h3 className="text-2xl font-display font-bold mb-4">
                Ready to Build Your Dream Team?
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                Start your journey with Augmex today and experience the future of remote team building.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  Start Your Project
                </button>
                <button className="border border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-colors">
                  Download Process Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;