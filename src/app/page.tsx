import HeroSection from '@/components/HeroSection';
import ProblemSection from '@/components/ProblemSection';
import StrengthsSection from '@/components/StrengthsSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import ValueCalculator from '@/components/ValueCalculator';
import LiveStatsSection from '@/components/LiveStatsSection';
import TalentCategoriesSection from '@/components/TalentCategoriesSection';
import DownloadSection from '@/components/DownloadSection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <DownloadSection />
      <ProblemSection />
      <StrengthsSection />
      <HowItWorksSection />
      <ValueCalculator />
      <LiveStatsSection />
      <TalentCategoriesSection />
    </div>
  );
}