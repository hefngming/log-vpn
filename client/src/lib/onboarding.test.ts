import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  getOnboardingState,
  saveOnboardingState,
  isOnboardingCompleted,
  markOnboardingCompleted,
  skipOnboarding,
  nextOnboardingStep,
  previousOnboardingStep,
  getCurrentOnboardingStep,
  resetOnboarding,
  getOnboardingProgress,
  shouldShowOnboarding,
  ONBOARDING_STEPS,
} from './onboarding';

describe('Onboarding Module', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    // Clean up after each test
    localStorage.clear();
  });

  describe('getOnboardingState', () => {
    it('should return default state when no state is saved', () => {
      const state = getOnboardingState();
      expect(state.currentStep).toBe(0);
      expect(state.completed).toBe(false);
      expect(state.skipped).toBe(false);
    });

    it('should return saved state', () => {
      const testState = {
        currentStep: 2,
        completed: false,
        skipped: false,
        lastUpdated: Date.now(),
      };
      saveOnboardingState(testState);
      const state = getOnboardingState();
      expect(state.currentStep).toBe(2);
    });
  });

  describe('saveOnboardingState', () => {
    it('should save state to localStorage', () => {
      const testState = {
        currentStep: 1,
        completed: false,
        skipped: false,
        lastUpdated: Date.now(),
      };
      saveOnboardingState(testState);
      const state = getOnboardingState();
      expect(state.currentStep).toBe(1);
    });
  });

  describe('isOnboardingCompleted', () => {
    it('should return false when not completed', () => {
      expect(isOnboardingCompleted()).toBe(false);
    });

    it('should return true when marked as completed', () => {
      markOnboardingCompleted();
      expect(isOnboardingCompleted()).toBe(true);
    });
  });

  describe('markOnboardingCompleted', () => {
    it('should mark onboarding as completed', () => {
      markOnboardingCompleted();
      expect(isOnboardingCompleted()).toBe(true);
    });

    it('should set completed flag in state', () => {
      markOnboardingCompleted();
      const state = getOnboardingState();
      expect(state.completed).toBe(true);
    });
  });

  describe('skipOnboarding', () => {
    it('should mark onboarding as skipped', () => {
      skipOnboarding();
      const state = getOnboardingState();
      expect(state.skipped).toBe(true);
      expect(state.completed).toBe(true);
    });
  });

  describe('nextOnboardingStep', () => {
    it('should advance to next step', () => {
      nextOnboardingStep();
      const state = getOnboardingState();
      expect(state.currentStep).toBe(1);
    });

    it('should mark as completed on last step', () => {
      // Move to last step
      for (let i = 0; i < ONBOARDING_STEPS.length; i++) {
        nextOnboardingStep();
      }
      expect(isOnboardingCompleted()).toBe(true);
    });
  });

  describe('previousOnboardingStep', () => {
    it('should go back to previous step', () => {
      nextOnboardingStep();
      nextOnboardingStep();
      previousOnboardingStep();
      const state = getOnboardingState();
      expect(state.currentStep).toBe(1);
    });

    it('should not go below step 0', () => {
      previousOnboardingStep();
      const state = getOnboardingState();
      expect(state.currentStep).toBe(0);
    });
  });

  describe('getCurrentOnboardingStep', () => {
    it('should return current step data', () => {
      const step = getCurrentOnboardingStep();
      expect(step).toBeDefined();
      expect(step?.id).toBe('login');
    });

    it('should return null when completed', () => {
      markOnboardingCompleted();
      const step = getCurrentOnboardingStep();
      expect(step).toBeNull();
    });
  });

  describe('resetOnboarding', () => {
    it('should reset onboarding state', () => {
      markOnboardingCompleted();
      resetOnboarding();
      expect(isOnboardingCompleted()).toBe(false);
    });
  });

  describe('getOnboardingProgress', () => {
    it('should return 0 at start', () => {
      const progress = getOnboardingProgress();
      expect(progress).toBe(0);
    });

    it('should return 100 when completed', () => {
      markOnboardingCompleted();
      const progress = getOnboardingProgress();
      expect(progress).toBe(100);
    });

    it('should return progress percentage', () => {
      nextOnboardingStep();
      nextOnboardingStep();
      const progress = getOnboardingProgress();
      expect(progress).toBeGreaterThan(0);
      expect(progress).toBeLessThan(100);
    });
  });

  describe('shouldShowOnboarding', () => {
    it('should return true when not completed', () => {
      expect(shouldShowOnboarding()).toBe(true);
    });

    it('should return false when completed', () => {
      markOnboardingCompleted();
      expect(shouldShowOnboarding()).toBe(false);
    });
  });

  describe('ONBOARDING_STEPS', () => {
    it('should have all required steps', () => {
      expect(ONBOARDING_STEPS.length).toBe(5);
    });

    it('should have correct step IDs', () => {
      const ids = ONBOARDING_STEPS.map(s => s.id);
      expect(ids).toEqual(['login', 'select-node', 'connect', 'traffic-stats', 'settings']);
    });

    it('should have title and description for each step', () => {
      ONBOARDING_STEPS.forEach(step => {
        expect(step.title).toBeDefined();
        expect(step.description).toBeDefined();
        expect(step.title.length).toBeGreaterThan(0);
        expect(step.description.length).toBeGreaterThan(0);
      });
    });
  });
});
