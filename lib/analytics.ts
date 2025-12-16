import { format, startOfDay, subDays, isToday, startOfMonth } from "date-fns";
import {
  AutomationExecution,
  DailyExecutionCount,
  AppDistribution,
  ListDistribution,
  StatusDistribution,
  QuotaMetrics,
} from "./types";

const DAILY_LIMIT = 10000;
const MONTHLY_LIMIT = 100000;

export function calculateQuotaMetrics(
  data: AutomationExecution[]
): QuotaMetrics {
  const today = startOfDay(new Date());
  const monthStart = startOfMonth(new Date());

  const dailyExecutions = data.filter((item) =>
    isToday(item.automationExecutionDateTime)
  ).length;

  const monthlyExecutions = data.filter(
    (item) => item.automationExecutionDateTime >= monthStart
  ).length;

  return {
    dailyUsed: dailyExecutions,
    dailyLimit: DAILY_LIMIT,
    dailyPercentage: (dailyExecutions / DAILY_LIMIT) * 100,
    dailyRemaining: DAILY_LIMIT - dailyExecutions,
    monthlyUsed: monthlyExecutions,
    monthlyLimit: MONTHLY_LIMIT,
    monthlyPercentage: (monthlyExecutions / MONTHLY_LIMIT) * 100,
    monthlyRemaining: MONTHLY_LIMIT - monthlyExecutions,
  };
}

export function calculateStatusDistribution(
  data: AutomationExecution[]
): StatusDistribution[] {
  const total = data.length;
  const statusCounts: Record<string, number> = {
    Success: 0,
    Failed: 0,
    "Success with Warning": 0,
  };

  data.forEach((item) => {
    statusCounts[item.automationStatus]++;
  });

  return Object.entries(statusCounts).map(([status, count]) => ({
    status: status as any,
    count,
    percentage: (count / total) * 100,
  }));
}

export function calculateDailyTrends(
  data: AutomationExecution[],
  days: number = 30
): DailyExecutionCount[] {
  const today = startOfDay(new Date());
  const dailyMap = new Map<string, DailyExecutionCount>();

  // Initialize all days
  for (let i = days - 1; i >= 0; i--) {
    const date = subDays(today, i);
    const dateKey = format(date, "yyyy-MM-dd");
    dailyMap.set(dateKey, {
      date: dateKey,
      count: 0,
      success: 0,
      failed: 0,
      warning: 0,
    });
  }

  // Count executions per day
  data.forEach((item) => {
    const dateKey = format(startOfDay(item.automationExecutionDateTime), "yyyy-MM-dd");
    const dayData = dailyMap.get(dateKey);

    if (dayData) {
      dayData.count++;
      if (item.automationStatus === "Success") {
        dayData.success++;
      } else if (item.automationStatus === "Failed") {
        dayData.failed++;
      } else {
        dayData.warning++;
      }
    }
  });

  return Array.from(dailyMap.values());
}

export function calculateAppDistribution(
  data: AutomationExecution[]
): AppDistribution[] {
  const total = data.length;
  const appCounts = new Map<string, number>();

  data.forEach((item) => {
    const count = appCounts.get(item.automationAppName) || 0;
    appCounts.set(item.automationAppName, count + 1);
  });

  return Array.from(appCounts.entries())
    .map(([app, count]) => ({
      app,
      count,
      percentage: (count / total) * 100,
    }))
    .sort((a, b) => b.count - a.count);
}

export function calculateListDistribution(
  data: AutomationExecution[]
): ListDistribution[] {
  const total = data.length;
  const listCounts = new Map<string, number>();

  data.forEach((item) => {
    const count = listCounts.get(item.automationListName) || 0;
    listCounts.set(item.automationListName, count + 1);
  });

  return Array.from(listCounts.entries())
    .map(([list, count]) => ({
      list,
      count,
      percentage: (count / total) * 100,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10); // Top 10 lists
}
