export type AutomationStatus = "Success" | "Failed" | "Success with Warning";

export interface AutomationExecution {
  automationId: string;
  automationName: string;
  automationAppName: string;
  automationListName: string;
  automationExecutionDateTime: Date;
  automationStatus: AutomationStatus;
}

export interface DailyExecutionCount {
  date: string;
  count: number;
  success: number;
  failed: number;
  warning: number;
}

export interface AppDistribution {
  app: string;
  count: number;
  percentage: number;
}

export interface ListDistribution {
  list: string;
  count: number;
  percentage: number;
}

export interface StatusDistribution {
  status: AutomationStatus;
  count: number;
  percentage: number;
}

export interface QuotaMetrics {
  dailyUsed: number;
  dailyLimit: number;
  dailyPercentage: number;
  dailyRemaining: number;
  monthlyUsed: number;
  monthlyLimit: number;
  monthlyPercentage: number;
  monthlyRemaining: number;
}

export interface TimeRange {
  label: string;
  value: string;
  days: number;
}
