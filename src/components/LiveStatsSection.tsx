'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, TrendingUp, Clock, DollarSign, Globe, Award } from 'lucide-react';

const LiveStatsSection = () => {
  const [animatedStats, setAnimatedStats] = useState({
    companies: 0,
    talents: 0,
    daysToHire: 0,
    costSavings: 0,
    countries: 0,
    satisfaction: 0
  });

  const targetStats = {
    companies: 127,
    talents: 543,
    daysToHire: 7,
    costSavings: 75,
    countries: 25,
    satisfaction: 98
  };

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    const animate = () => {
      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic

        setAnimatedStats({
          companies: Math.round(targetStats.companies * easeProgress),
          talents: Math.round(targetStats.talents * easeProgress),
          daysToHire: Math.round(targetStats.daysToHire * easeProgress),
          costSavings: Math.round(targetStats.costSavings * easeProgress),
          countries: Math.round(targetStats.countries * easeProgress),
          satisfaction: Math.round(targetStats.satisfaction * easeProgress)
        });

        if (step >= steps) {
          clearInterval(timer);
        }
      }, interval);
    };

    // Start animation when component is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById('live-stats-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      icon: Users,
      value: animatedStats.companies,
      label: "Companies Served",
      suffix: "+",
      color: "bg-pastel-blue",
      textColor: "text-blue-600"
    },
    {
      icon: Users,
      value: animatedStats.talents,
      label: "Talents Onboarded",
      suffix: "+",
      color: "bg-pastel-green",
      textColor: "text-green-600"
    },
    {
      icon: Clock,
      value: animatedStats.daysToHire,
      label: "Avg. Days to Hire",
      suffix: "",
      color: "bg-pastel-peach",
      textColor: "text-orange-600"
    },
    {
      icon: DollarSign,
      value: animatedStats.costSavings,
      label: "Cost Savings",
      suffix: "%",
      color: "bg-pastel-lilac",
      textColor: "text-purple-600"
    },
    {
      icon: Globe,
      value: animatedStats.countries,
      label: "Countries Served",
      suffix: "+",
      color: "bg-pastel-mint",
      textColor: "text-teal-600"
    },
    {
      icon: Award,
      value: animatedStats.satisfaction,
      label: "Client Satisfaction",
      suffix: "%",
      color: "bg-pastel-yellow",
      textColor: "text-yellow-600"
    }
  ];

  return (
    <section id="live-stats-section" className="py-20 bg-gradient-to-br from-pastel-blue/20 via-pastel-green/20 to-pastel-peach/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Our Impact by Numbers
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're proud of the tangible results we've delivered for our clients. 
              These numbers represent real businesses transformed through elite remote teams.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="bg-background/80 backdrop-blur-sm border-primary/20 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 mx-auto mb-4 ${stat.color} rounded-full flex items-center justify-center`}>
                      <Icon className={`h-6 w-6 ${stat.textColor}`} />
                    </div>
                    <div className={`text-3xl font-bold mb-2 ${stat.textColor}`}>
                      {stat.value}{stat.suffix}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Impact Story */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-display font-bold mb-4">
                  Transforming Businesses Worldwide
                </h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Since our founding, we've helped companies from startups to Fortune 500s 
                    build elite remote teams that drive innovation and growth.
                  </p>
                  <p>
                    Our clients have collectively saved over $50 million in hiring costs 
                    while accessing talent that was previously out of reach.
                  </p>
                  <p>
                    With an average retention rate of 95%, our placements don't just fill positions—
                    they become long-term contributors to our clients' success.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-pastel-blue/30 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Total Cost Savings</span>
                    <span className="text-2xl font-bold text-blue-600">$50M+</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Across all client engagements since inception
                  </div>
                </div>
                
                <div className="bg-pastel-green/30 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Time Saved</span>
                    <span className="text-2xl font-bold text-green-600">15,000+</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Days saved compared to traditional hiring methods
                  </div>
                </div>
                
                <div className="bg-pastel-peach/30 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Projects Delivered</span>
                    <span className="text-2xl font-bold text-orange-600">2,500+</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Successful project completions by our talent
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 text-center">
              <h3 className="text-xl font-semibold mb-4">
                Ready to Add Your Success Story?
              </h3>
              <p className="text-muted-foreground mb-6">
                Join hundreds of companies that have transformed their business with Augmex.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  Start Your Journey
                </button>
                <button className="border border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-colors">
                  Read Success Stories
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveStatsSection;