'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronRight, Users, Code, Headphones, MessageSquare, Brain, Target } from 'lucide-react';

const HeroSection = () => {
  const [selectedTalent, setSelectedTalent] = useState('');

  const talentOptions = [
    { value: 'developers', label: 'Software Developers', icon: Code },
    { value: 'sales', label: 'Sales Professionals', icon: Target },
    { value: 'support', label: 'Customer Support', icon: Headphones },
    { value: 'ai', label: 'AI Specialists', icon: Brain },
    { value: 'marketing', label: 'Marketing Experts', icon: MessageSquare },
    { value: 'design', label: 'Designers', icon: Users },
  ];

  const getCtaText = () => {
    if (!selectedTalent) return 'Get Started';
    const talent = talentOptions.find(t => t.value === selectedTalent);
    return `Find ${talent?.label}`;
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pastel-blue via-pastel-green to-pastel-peach">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-pastel-lilac rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-pastel-mint rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pastel-yellow rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6 leading-tight">
            Build Elite Remote Teams Fast
            <span className="block text-primary mt-2">Save 70-80% Costs</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Hire vetted software developers, sales, support & AI talent in days.
          </p>

          {/* Interactive Talent Selector */}
          <Card className="max-w-2xl mx-auto mb-12 bg-background/80 backdrop-blur-sm border-primary/20">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold mb-2">What kind of talent do you need?</h3>
                <p className="text-sm text-muted-foreground">Select your talent type to get started</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {talentOptions.map((option) => {
                  const Icon = option.icon;
                  const isSelected = selectedTalent === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => setSelectedTalent(option.value)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                        isSelected
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <Icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <span className="text-sm font-medium">{option.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group" asChild>
                  <Link href="/contact">
                    {getCtaText()}
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/services">
                    View All Services
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>100+ Companies Served</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>500+ Talents Onboarded</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Avg. 7 Days to Hire</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;