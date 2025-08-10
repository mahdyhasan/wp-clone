'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Code, 
  Palette, 
  Target, 
  Headphones, 
  Brain, 
  MessageSquare,
  ChevronRight,
  Users
} from 'lucide-react';

const TalentCategoriesSection = () => {
  const categories = [
    {
      icon: Code,
      title: "Software Developers",
      description: "Elite programmers skilled in React, Node.js, Python, Java, and more. Build robust applications with vetted talent.",
      color: "bg-pastel-blue",
      link: "/services/software-developers",
      stats: "200+ Active Developers"
    },
    {
      icon: Palette,
      title: "UI/UX Designers",
      description: "Creative designers who craft beautiful, user-friendly interfaces. Expert in Figma, Adobe Creative Suite, and modern design principles.",
      color: "bg-pastel-green",
      link: "/services/ui-ux-designers",
      stats: "80+ Design Experts"
    },
    {
      icon: Target,
      title: "Sales Professionals",
      description: "Results-driven sales experts with proven track records. From SDRs to Account Executives, we've got your sales covered.",
      color: "bg-pastel-peach",
      link: "/services/sales-professionals",
      stats: "150+ Sales Experts"
    },
    {
      icon: Headphones,
      title: "Customer Support",
      description: "Empathetic support specialists who enhance customer satisfaction. Multi-lingual, 24/7 availability available.",
      color: "bg-pastel-lilac",
      link: "/services/customer-support",
      stats: "120+ Support Agents"
    },
    {
      icon: Brain,
      title: "AI Specialists",
      description: "Cutting-edge AI/ML engineers and data scientists. Expert in TensorFlow, PyTorch, and advanced analytics.",
      color: "bg-pastel-mint",
      link: "/services/ai-specialists",
      stats: "60+ AI Experts"
    },
    {
      icon: MessageSquare,
      title: "Marketing Experts",
      description: "Digital marketing specialists who drive growth. SEO, content marketing, social media, and PPC experts.",
      color: "bg-pastel-lavender",
      link: "/services/marketing-experts",
      stats: "90+ Marketing Pros"
    },
    {
      icon: Users,
      title: "Project Managers",
      description: "Certified project managers who ensure timely delivery. Agile, Scrum, and PMP certified professionals.",
      color: "bg-pastel-pink",
      link: "/services/project-managers",
      stats: "70+ PM Experts"
    },
    {
      icon: Brain,
      title: "Data Analysts",
      description: "Data-driven analysts who turn insights into action. Expert in SQL, Python, R, and visualization tools.",
      color: "bg-pastel-yellow",
      link: "/services/data-analysts",
      stats: "85+ Data Experts"
    }
  ];

  return (
    <section className="py-20 bg-pastel-lavender/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Talent Categories
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We specialize in connecting you with elite talent across key business functions. 
              Each category represents a pool of thoroughly vetted professionals ready to contribute to your success.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card 
                  key={index} 
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-background/80 backdrop-blur-sm border-primary/20"
                >
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {category.description}
                    </p>
                    
                    <div className="text-xs font-medium text-primary mb-4">
                      {category.stats}
                    </div>
                    
                    <Link href={category.link}>
                      <Button variant="outline" size="sm" className="w-full group">
                        Learn More
                        <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-display font-bold mb-4">
                Don't See What You're Looking For?
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We're constantly expanding our talent pool. If you need specialized skills not listed above, 
                let us know and we'll source the perfect candidates for your unique requirements.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">48 Hours</div>
                <div className="text-sm text-muted-foreground">Average response time for custom requests</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">95%</div>
                <div className="text-sm text-muted-foreground">Success rate for specialized roles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Specialized skill categories available</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group">
                Request Custom Talent
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/services">
                  View All Services
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TalentCategoriesSection;