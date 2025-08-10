import HeroSection from '@/components/HeroSection';
import ProblemSection from '@/components/ProblemSection';
import StrengthsSection from '@/components/StrengthsSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import ValueCalculator from '@/components/ValueCalculator';
import LiveStatsSection from '@/components/LiveStatsSection';
import TalentCategoriesSection from '@/components/TalentCategoriesSection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ProblemSection />
      <StrengthsSection />
      <HowItWorksSection />
      <ValueCalculator />
      <LiveStatsSection />
      <TalentCategoriesSection />
    </div>
  );
}