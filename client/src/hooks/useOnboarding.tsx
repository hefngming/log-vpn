import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getOnboardingState,
  saveOnboardingState,
  isOnboardingCompleted,
  markOnboardingCompleted,
  skipOnboarding,
  nextOnboardingStep,
  previousOnboardingStep,
  getCurrentOnboardingStep,
  ONBOARDING_STEPS,
  shouldShowOnboarding,
} from '@/lib/onboarding';

interface OnboardingContextType {
  isActive: boolean;
  currentStep: number;
  currentStepData: typeof ONBOARDING_STEPS[number] | null;
  totalSteps: number;
  isCompleted: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onSkip: () => void;
  onComplete: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Initialize onboarding state
    const completed = isOnboardingCompleted();
    setIsCompleted(completed);
    
    if (!completed && shouldShowOnboarding()) {
      setIsActive(true);
      const state = getOnboardingState();
      setCurrentStep(state.currentStep);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      const state = getOnboardingState();
      state.currentStep = newStep;
      state.lastUpdated = Date.now();
      saveOnboardingState(state);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      const state = getOnboardingState();
      state.currentStep = newStep;
      state.lastUpdated = Date.now();
      saveOnboardingState(state);
    }
  };

  const handleSkip = () => {
    skipOnboarding();
    setIsActive(false);
    setIsCompleted(true);
  };

  const handleComplete = () => {
    markOnboardingCompleted();
    setIsActive(false);
    setIsCompleted(true);
  };

  const currentStepData = getCurrentOnboardingStep();

  const value: OnboardingContextType = {
    isActive,
    currentStep,
    currentStepData,
    totalSteps: ONBOARDING_STEPS.length,
    isCompleted,
    onNext: handleNext,
    onPrevious: handlePrevious,
    onSkip: handleSkip,
    onComplete: handleComplete,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
}
