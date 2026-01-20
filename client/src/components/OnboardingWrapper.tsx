import React from 'react';
import { OnboardingProvider, useOnboarding } from '@/hooks/useOnboarding';
import { OnboardingTooltip } from './OnboardingTooltip';

function OnboardingContent() {
  const {
    isActive,
    currentStep,
    currentStepData,
    totalSteps,
    onNext,
    onPrevious,
    onSkip,
    onComplete,
  } = useOnboarding();

  if (!isActive || !currentStepData) {
    return null;
  }

  return (
    <OnboardingTooltip
      step={currentStepData}
      stepIndex={currentStep}
      totalSteps={totalSteps}
      onNext={onNext}
      onPrevious={onPrevious}
      onSkip={onSkip}
      onClose={onComplete}
    />
  );
}

export function OnboardingWrapper({ children }: { children: React.ReactNode }) {
  return (
    <OnboardingProvider>
      <>
        {children}
        <OnboardingContent />
      </>
    </OnboardingProvider>
  );
}
