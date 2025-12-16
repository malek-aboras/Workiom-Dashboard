"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { QuotaMetrics, StatusDistribution } from "@/lib/types";
import { formatNumber, formatPercentage } from "@/lib/utils";

interface SummaryCardProps {
  quotaMetrics: QuotaMetrics;
  statusDistribution: StatusDistribution[];
  isExpanded: boolean;
  onToggle: () => void;
}

export default function SummaryCard({
  quotaMetrics,
  statusDistribution,
  isExpanded,
  onToggle,
}: SummaryCardProps) {
  const getQuotaColor = (percentage: number) => {
    if (percentage >= 90) return "text-red-600";
    if (percentage >= 70) return "text-yellow-600";
    return "text-green-600";
  };

  const statusConfig = {
    Success: { icon: CheckCircle2, variant: "success" as const, color: "text-green-600" },
    Failed: { icon: XCircle, variant: "error" as const, color: "text-red-600" },
    "Success with Warning": {
      icon: AlertCircle,
      variant: "warning" as const,
      color: "text-yellow-600",
    },
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Automation Executions
              </h3>
              <p className="text-sm text-gray-600">
                Track your execution quota usage
              </p>
            </div>
          </div>
        </div>

        {/* Quota Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Daily Quota */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Daily Quota</span>
              <span
                className={`text-sm font-semibold ${getQuotaColor(
                  quotaMetrics.dailyPercentage
                )}`}
              >
                {formatPercentage(quotaMetrics.dailyPercentage)} used
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
              <div
                className={`h-2.5 rounded-full transition-all ${
                  quotaMetrics.dailyPercentage >= 90
                    ? "bg-red-600"
                    : quotaMetrics.dailyPercentage >= 70
                    ? "bg-yellow-500"
                    : "bg-green-600"
                }`}
                style={{ width: `${Math.min(quotaMetrics.dailyPercentage, 100)}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>
                {formatNumber(quotaMetrics.dailyUsed)} of{" "}
                {formatNumber(quotaMetrics.dailyLimit)} executions
              </span>
              <span>{formatNumber(quotaMetrics.dailyRemaining)} remaining</span>
            </div>
          </div>

          {/* Monthly Quota */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Monthly Quota</span>
              <span
                className={`text-sm font-semibold ${getQuotaColor(
                  quotaMetrics.monthlyPercentage
                )}`}
              >
                {formatPercentage(quotaMetrics.monthlyPercentage)} used
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
              <div
                className={`h-2.5 rounded-full transition-all ${
                  quotaMetrics.monthlyPercentage >= 90
                    ? "bg-red-600"
                    : quotaMetrics.monthlyPercentage >= 70
                    ? "bg-yellow-500"
                    : "bg-green-600"
                }`}
                style={{ width: `${Math.min(quotaMetrics.monthlyPercentage, 100)}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>
                {formatNumber(quotaMetrics.monthlyUsed)} of{" "}
                {formatNumber(quotaMetrics.monthlyLimit)} executions
              </span>
              <span>{formatNumber(quotaMetrics.monthlyRemaining)} remaining</span>
            </div>
          </div>
        </div>

        {/* Status Breakdown */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Status Breakdown</h4>
          <div className="flex flex-wrap gap-3">
            {statusDistribution.map((status) => {
              const config = statusConfig[status.status];
              const Icon = config.icon;
              return (
                <div
                  key={status.status}
                  className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2"
                >
                  <Icon className={`w-4 h-4 ${config.color}`} />
                  <span className="text-sm font-medium text-gray-900">
                    {status.status}
                  </span>
                  <Badge variant={config.variant}>
                    {status.count.toLocaleString()} ({formatPercentage(status.percentage, 0)})
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>

        {/* View Details Button */}
        <Button
          onClick={onToggle}
          variant="outline"
          className="w-full"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4 mr-2" />
              Hide Details
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 mr-2" />
              View Detailed Analytics
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
