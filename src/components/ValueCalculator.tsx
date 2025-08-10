'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, TrendingDown, Clock, Users, DollarSign, CheckCircle } from 'lucide-react';

const ValueCalculator = () => {
  const [teamSize, setTeamSize] = useState(5);
  const [region, setRegion] = useState('us');
  const [roles, setRoles] = useState<string[]>(['developer']);
  const [results, setResults] = useState<any>(null);

  const roleOptions = [
    { value: 'developer', label: 'Software Developer', localCost: 120000, remoteCost: 36000 },
    { value: 'designer', label: 'UI/UX Designer', localCost: 90000, remoteCost: 27000 },
    { value: 'sales', label: 'Sales Professional', localCost: 80000, remoteCost: 24000 },
    { value: 'support', label: 'Customer Support', localCost: 50000, remoteCost: 15000 },
    { value: 'ai', label: 'AI Specialist', localCost: 150000, remoteCost: 45000 },
    { value: 'marketing', label: 'Marketing Expert', localCost: 70000, remoteCost: 21000 },
  ];

  const regionMultipliers = {
    us: 1.0,
    uk: 0.8,
    eu: 0.85,
    ca: 0.9,
    au: 1.1,
  };

  const calculateSavings = () => {
    let totalLocalCost = 0;
    let totalRemoteCost = 0;
    let roleBreakdown = [];

    for (const roleValue of roles) {
      const role = roleOptions.find(r => r.value === roleValue);
      if (role) {
        const multiplier = regionMultipliers[region as keyof typeof regionMultipliers];
        const localCost = (role.localCost * multiplier) * (teamSize / roles.length);
        const remoteCost = (role.remoteCost * multiplier) * (teamSize / roles.length);
        
        totalLocalCost += localCost;
        totalRemoteCost += remoteCost;
        
        roleBreakdown.push({
          name: role.label,
          localCost: localCost,
          remoteCost: remoteCost,
          savings: localCost - remoteCost
        });
      }
    }

    const totalSavings = totalLocalCost - totalRemoteCost;
    const savingsPercentage = (totalSavings / totalLocalCost) * 100;
    const timeSavings = 90; // Days saved compared to traditional hiring

    setResults({
      totalLocalCost,
      totalRemoteCost,
      totalSavings,
      savingsPercentage,
      timeSavings,
      roleBreakdown
    });
  };

  const toggleRole = (roleValue: string) => {
    setRoles(prev => 
      prev.includes(roleValue) 
        ? prev.filter(r => r !== roleValue)
        : [...prev, roleValue]
    );
  };

  return (
    <section className="py-20 bg-pastel-yellow/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Value Calculator
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              See how much you can save by building your remote team with Augmex. 
              Adjust the parameters below to calculate your potential savings.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <Card className="bg-background/80 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Team Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Team Size */}
                <div className="space-y-2">
                  <Label htmlFor="teamSize">Team Size</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="teamSize"
                      type="range"
                      min="1"
                      max="50"
                      value={teamSize}
                      onChange={(e) => setTeamSize(parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <div className="w-16 text-center font-semibold">
                      {teamSize}
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>1 person</span>
                    <span>50 people</span>
                  </div>
                </div>

                {/* Region */}
                <div className="space-y-2">
                  <Label htmlFor="region">Your Region</Label>
                  <Select value={region} onValueChange={setRegion}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="eu">European Union</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Roles */}
                <div className="space-y-2">
                  <Label>Team Roles</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {roleOptions.map((role) => (
                      <button
                        key={role.value}
                        onClick={() => toggleRole(role.value)}
                        className={`p-3 rounded-lg border-2 text-left transition-all ${
                          roles.includes(role.value)
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle 
                            className={`h-4 w-4 ${
                              roles.includes(role.value) ? 'text-primary' : 'text-muted-foreground'
                            }`} 
                          />
                          <span className="text-sm font-medium">{role.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calculate Button */}
                <Button 
                  onClick={calculateSavings} 
                  className="w-full" 
                  size="lg"
                  disabled={roles.length === 0}
                >
                  Calculate My Savings
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="space-y-6">
              {results ? (
                <>
                  {/* Summary Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-pastel-green/50 border-green-200">
                      <CardContent className="p-4 text-center">
                        <DollarSign className="h-8 w-8 mx-auto mb-2 text-green-600" />
                        <div className="text-2xl font-bold text-green-700">
                          ${(results.totalSavings / 1000).toFixed(0)}K
                        </div>
                        <div className="text-sm text-green-600">Annual Savings</div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-pastel-blue/50 border-blue-200">
                      <CardContent className="p-4 text-center">
                        <TrendingDown className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                        <div className="text-2xl font-bold text-blue-700">
                          {results.savingsPercentage.toFixed(0)}%
                        </div>
                        <div className="text-sm text-blue-600">Cost Reduction</div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-pastel-peach/50 border-orange-200">
                      <CardContent className="p-4 text-center">
                        <Clock className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                        <div className="text-2xl font-bold text-orange-700">
                          {results.timeSavings}
                        </div>
                        <div className="text-sm text-orange-600">Days Saved</div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-pastel-lilac/50 border-purple-200">
                      <CardContent className="p-4 text-center">
                        <Users className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                        <div className="text-2xl font-bold text-purple-700">
                          {teamSize}
                        </div>
                        <div className="text-sm text-purple-600">Team Members</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Detailed Breakdown */}
                  <Card className="bg-background/80 backdrop-blur-sm border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-lg">Cost Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        {results.roleBreakdown.map((role: any, index: number) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                            <div>
                              <div className="font-medium">{role.name}</div>
                              <div className="text-sm text-muted-foreground">
                                ${(role.localCost / 1000).toFixed(0)}K → ${(role.remoteCost / 1000).toFixed(0)}K
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-green-600">
                                -${(role.savings / 1000).toFixed(0)}K
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {((role.savings / role.localCost) * 100).toFixed(0)}%
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">Total Annual Cost:</span>
                          <span className="text-lg">
                            <span className="line-through text-muted-foreground">
                              ${(results.totalLocalCost / 1000).toFixed(0)}K
                            </span>
                            <span className="ml-2 text-green-600">
                              ${(results.totalRemoteCost / 1000).toFixed(0)}K
                            </span>
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* CTA */}
                  <Card className="bg-gradient-to-r from-pastel-blue to-pastel-green border-primary/20">
                    <CardContent className="p-6 text-center">
                      <h3 className="text-xl font-bold mb-2">Ready to Start Saving?</h3>
                      <p className="text-muted-foreground mb-4">
                        Let's build your elite remote team and unlock these savings.
                      </p>
                      <Button size="lg" className="w-full">
                        Get Started Today
                      </Button>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card className="bg-background/80 backdrop-blur-sm border-primary/20 h-full flex items-center justify-center">
                  <CardContent className="text-center p-8">
                    <Calculator className="h-16 w-16 mx-auto mb-4 text-primary opacity-50" />
                    <h3 className="text-xl font-semibold mb-2">Calculate Your Savings</h3>
                    <p className="text-muted-foreground">
                      Configure your team above and click "Calculate My Savings" to see your potential cost savings.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueCalculator;