"use client";

import { useState, useMemo } from "react";
import { getAutomationData } from "@/lib/data-generator";
import {
  calculateQuotaMetrics,
  calculateStatusDistribution,
  calculateDailyTrends,
  calculateAppDistribution,
  calculateListDistribution,
} from "@/lib/analytics";
import SummaryCard from "@/components/summary-card";
import HistoricalTrendsChart from "@/components/charts/historical-trends-chart";
import AppDistributionChart from "@/components/charts/app-distribution-chart";
import ListDistributionChart from "@/components/charts/list-distribution-chart";
import StatusDistributionChart from "@/components/charts/status-distribution-chart";
import ExecutionsTable from "@/components/executions-table";

export default function AutomationExecutionsDashboard() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [timeRange, setTimeRange] = useState("30");

  // Get automation data
  const data = useMemo(() => getAutomationData(), []);

  // Calculate metrics
  const quotaMetrics = useMemo(() => calculateQuotaMetrics(data), [data]);
  const statusDistribution = useMemo(
    () => calculateStatusDistribution(data),
    [data]
  );
  const dailyTrends = useMemo(
    () => calculateDailyTrends(data, parseInt(timeRange)),
    [data, timeRange]
  );
  const appDistribution = useMemo(
    () => calculateAppDistribution(data),
    [data]
  );
  const listDistribution = useMemo(
    () => calculateListDistribution(data),
    [data]
  );

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <SummaryCard
        quotaMetrics={quotaMetrics}
        statusDistribution={statusDistribution}
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
      />

      {/* Detailed Analytics - Shown when expanded */}
      {isExpanded && (
        <div className="space-y-6 animate-in fade-in duration-500">
          {/* Historical Trends */}
          <HistoricalTrendsChart
            data={dailyTrends}
            timeRange={timeRange}
            onTimeRangeChange={setTimeRange}
          />

          {/* Distribution Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AppDistributionChart data={appDistribution} />
            <StatusDistributionChart data={statusDistribution} />
          </div>

          {/* List Distribution */}
          <ListDistributionChart data={listDistribution} />

          {/* Detailed Table */}
          <ExecutionsTable data={data} />
        </div>
      )}
    </div>
  );
}
