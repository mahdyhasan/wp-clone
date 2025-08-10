'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingDown, Clock, AlertTriangle, Users, DollarSign, Target } from 'lucide-react';

const ProblemSection = () => {
  const problems = [
    {
      icon: Clock,
      title: "Long Hiring Delays",
      description: "Traditional hiring takes 3-6 months, slowing your growth and missing market opportunities.",
      stat: "3-6 months",
      color: "text-red-500"
    },
    {
      icon: DollarSign,
      title: "High Costs",
      description: "Local talent costs 3-4x more, draining your budget and limiting team expansion.",
      stat: "3-4x higher",
      color: "text-orange-500"
    },
    {
      icon: AlertTriangle,
      title: "Quality Risk",
      description: "Poor vetting leads to bad hires, costing time, money, and team morale.",
      stat: "30% failure rate",
      color: "text-yellow-500"
    },
    {
      icon: Users,
      title: "Limited Talent Pool",
      description: "Geographic restrictions limit access to the best global talent.",
      stat: "Local only",
      color: "text-blue-500"
    }
  ];

  return (
    <section className="py-20 bg-pastel-peach/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              The Problem We Solve
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Startups and SMEs face significant challenges when building elite teams. 
              These obstacles slow growth, increase costs, and create unnecessary risk.
            </p>
          </div>

          {/* Pain Points Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {problems.map((problem, index) => {
              const Icon = problem.icon;
              return (
                <Card key={index} className="bg-background/80 backdrop-blur-sm border-primary/20 hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 mx-auto mb-4 bg-pastel-blue rounded-full flex items-center justify-center">
                      <Icon className={`h-8 w-8 ${problem.color}`} />
                    </div>
                    <CardTitle className="text-lg font-semibold">{problem.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-2xl font-bold text-primary mb-2">{problem.stat}</div>
                    <p className="text-sm text-muted-foreground">{problem.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Impact Stats */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">70-80%</div>
                <div className="text-lg font-semibold mb-1">Cost Savings</div>
                <div className="text-sm text-muted-foreground">Compared to local hiring</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">7 Days</div>
                <div className="text-lg font-semibold mb-1">Average Time to Hire</div>
                <div className="text-sm text-muted-foreground">From need to onboard</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">95%</div>
                <div className="text-lg font-semibold mb-1">Success Rate</div>
                <div className="text-sm text-muted-foreground">Long-term placements</div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-8 text-center">
              <p className="text-lg text-muted-foreground mb-6">
                Don't let hiring challenges hold your business back. Transform your team building with Augmex.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  Start Saving Today
                </button>
                <button className="border border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-colors">
                  Learn How It Works
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;