/**
 * Onboarding Module
 * Manages user onboarding flow and tutorial state
 */

const ONBOARDING_KEY = 'log-vpn-onboarding';
const ONBOARDING_COMPLETED_KEY = 'log-vpn-onboarding-completed';

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  target?: string; // CSS selector for the element to highlight
  position?: 'top' | 'bottom' | 'left' | 'right';
  action?: string; // Optional action to take
}

export interface OnboardingState {
  currentStep: number;
  completed: boolean;
  skipped: boolean;
  lastUpdated: number;
}

// Define onboarding steps
export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 'login',
    title: '登录账号',
    description: '首先，使用你的邮箱和密码登录 Log VPN 账号。如果还没有账号，可以点击"注册"创建新账号。',
    target: '[data-onboarding="login-form"]',
    position: 'bottom',
  },
  {
    id: 'select-node',
    title: '选择节点',
    description: '登录后，你可以在节点列表中选择一个高速节点。选择离你最近的节点通常能获得更好的速度。',
    target: '[data-onboarding="node-list"]',
    position: 'left',
  },
  {
    id: 'connect',
    title: '连接节点',
    description: '选择好节点后，点击"连接"按钮即可连接到该节点。连接成功后，你的流量将通过该节点转发。',
    target: '[data-onboarding="connect-button"]',
    position: 'top',
  },
  {
    id: 'traffic-stats',
    title: '查看流量统计',
    description: '在流量统计页面，你可以实时查看当前的流量使用情况、连接状态和网络速度。',
    target: '[data-onboarding="traffic-stats"]',
    position: 'left',
  },
  {
    id: 'settings',
    title: '配置设置',
    description: '在设置页面，你可以配置自动连接、开机启动、代理模式等高级选项。根据你的需求进行自定义配置。',
    target: '[data-onboarding="settings"]',
    position: 'left',
  },
];

/**
 * Get current onboarding state
 */
export function getOnboardingState(): OnboardingState {
  try {
    const stored = localStorage.getItem(ONBOARDING_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading onboarding state:', error);
  }

  return {
    currentStep: 0,
    completed: false,
    skipped: false,
    lastUpdated: Date.now(),
  };
}

/**
 * Save onboarding state
 */
export function saveOnboardingState(state: OnboardingState): void {
  try {
    localStorage.setItem(ONBOARDING_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving onboarding state:', error);
  }
}

/**
 * Check if onboarding is completed
 */
export function isOnboardingCompleted(): boolean {
  try {
    const completed = localStorage.getItem(ONBOARDING_COMPLETED_KEY);
    return completed === 'true';
  } catch (error) {
    console.error('Error checking onboarding completion:', error);
    return false;
  }
}

/**
 * Mark onboarding as completed
 */
export function markOnboardingCompleted(): void {
  try {
    localStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
    const state = getOnboardingState();
    state.completed = true;
    state.lastUpdated = Date.now();
    saveOnboardingState(state);
  } catch (error) {
    console.error('Error marking onboarding as completed:', error);
  }
}

/**
 * Skip onboarding
 */
export function skipOnboarding(): void {
  try {
    localStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
    const state = getOnboardingState();
    state.skipped = true;
    state.completed = true;
    state.lastUpdated = Date.now();
    saveOnboardingState(state);
  } catch (error) {
    console.error('Error skipping onboarding:', error);
  }
}

/**
 * Move to next onboarding step
 */
export function nextOnboardingStep(): void {
  const state = getOnboardingState();
  if (state.currentStep < ONBOARDING_STEPS.length - 1) {
    state.currentStep++;
    state.lastUpdated = Date.now();
    saveOnboardingState(state);
  } else {
    markOnboardingCompleted();
  }
}

/**
 * Move to previous onboarding step
 */
export function previousOnboardingStep(): void {
  const state = getOnboardingState();
  if (state.currentStep > 0) {
    state.currentStep--;
    state.lastUpdated = Date.now();
    saveOnboardingState(state);
  }
}

/**
 * Reset onboarding
 */
export function resetOnboarding(): void {
  try {
    localStorage.removeItem(ONBOARDING_KEY);
    localStorage.removeItem(ONBOARDING_COMPLETED_KEY);
  } catch (error) {
    console.error('Error resetting onboarding:', error);
  }
}

/**
 * Get current onboarding step
 */
export function getCurrentOnboardingStep(): OnboardingStep | null {
  const state = getOnboardingState();
  if (state.currentStep < ONBOARDING_STEPS.length) {
    return ONBOARDING_STEPS[state.currentStep];
  }
  return null;
}

/**
 * Get progress percentage
 */
export function getOnboardingProgress(): number {
  const state = getOnboardingState();
  return Math.round((state.currentStep / ONBOARDING_STEPS.length) * 100);
}

/**
 * Check if should show onboarding
 */
export function shouldShowOnboarding(): boolean {
  return !isOnboardingCompleted();
}
