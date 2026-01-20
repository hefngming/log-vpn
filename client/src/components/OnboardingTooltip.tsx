import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, X, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OnboardingStep, ONBOARDING_STEPS, getOnboardingProgress } from '@/lib/onboarding';

interface OnboardingTooltipProps {
  step: OnboardingStep;
  stepIndex: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  onSkip: () => void;
  onClose: () => void;
}

export function OnboardingTooltip({
  step,
  stepIndex,
  totalSteps,
  onNext,
  onPrevious,
  onSkip,
  onClose,
}: OnboardingTooltipProps) {
  const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [arrowPosition, setArrowPosition] = useState<string>('bottom');
  const [, setArrowPos] = useState<string>('bottom');

  useEffect(() => {
    if (step.target) {
      const element = document.querySelector(step.target) as HTMLElement | null;
      if (element) {
        const rect = element.getBoundingClientRect();
        const tooltipWidth = 320;
        const tooltipHeight = 200;
        const offset = 16;

        let top = 0;
        let left = 0;
        let position = step.position || 'bottom';

        switch (position) {
          case 'top':
            top = rect.top - tooltipHeight - offset;
            left = rect.left + rect.width / 2 - tooltipWidth / 2;
            setArrowPos('bottom');
            break;
          case 'bottom':
            top = rect.bottom + offset;
            left = rect.left + rect.width / 2 - tooltipWidth / 2;
            setArrowPos('top');
            break;
          case 'left':
            top = rect.top + rect.height / 2 - tooltipHeight / 2;
            left = rect.left - tooltipWidth - offset;
            setArrowPos('right');
            break;
          case 'right':
            top = rect.top + rect.height / 2 - tooltipHeight / 2;
            left = rect.right + offset;
            setArrowPos('left');
            break;
        }

        // Ensure tooltip stays within viewport
        if (left < 0) left = 16;
        if (left + tooltipWidth > window.innerWidth) left = window.innerWidth - tooltipWidth - 16;
        if (top < 0) top = 16;
        if (top + tooltipHeight > window.innerHeight) top = window.innerHeight - tooltipHeight - 16;

        setPosition({ top, left });

        // Highlight the target element
        (element as HTMLElement).style.boxShadow = '0 0 0 9999px rgba(0, 0, 0, 0.7)';
        (element as HTMLElement).style.borderRadius = '8px';
        (element as HTMLElement).style.position = 'relative';
        (element as HTMLElement).style.zIndex = '9998';

        return () => {
          (element as HTMLElement).style.boxShadow = '';
          (element as HTMLElement).style.zIndex = '';
        };
      }
    }
  }, [step.target, step.position]);

  const progress = getOnboardingProgress();

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[9997] pointer-events-none"
        style={{
          background: 'rgba(0, 0, 0, 0.5)',
        }}
      />

      {/* Tooltip */}
      <div
        className="fixed z-[9999] bg-white rounded-lg shadow-2xl p-6 max-w-sm"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              步骤 {stepIndex + 1} / {totalSteps}
            </p>
          </div>
          <button
            onClick={onClose}
            className="ml-2 p-1 hover:bg-secondary rounded-md transition-colors"
            aria-label="关闭"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {step.description}
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-secondary rounded-full h-2 mb-6">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={onSkip}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <SkipForward className="w-4 h-4" />
            跳过
          </button>

          <div className="flex gap-2">
            {stepIndex > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={onPrevious}
                className="gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                上一步
              </Button>
            )}

            {stepIndex < totalSteps - 1 ? (
              <Button
                size="sm"
                onClick={onNext}
                className="gap-1"
              >
                下一步
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={onNext}
              >
                完成
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
