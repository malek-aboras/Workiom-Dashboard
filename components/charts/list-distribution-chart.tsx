"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ListDistribution } from "@/lib/types";
import { formatPercentage } from "@/lib/utils";

interface ListDistributionChartProps {
  data: ListDistribution[];
}

export default function ListDistributionChart({ data }: ListDistributionChartProps) {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
          <p className="font-semibold text-gray-900 mb-1">{data.list}</p>
          <div className="text-sm text-gray-700">
            <p>Executions: <span className="font-semibold">{data.count.toLocaleString()}</span></p>
            <p>Percentage: <span className="font-semibold">{formatPercentage(data.percentage, 1)}</span></p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Lists by Execution</CardTitle>
        <p className="text-sm text-gray-600">
          Most active workflows
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="list"
                angle={-45}
                textAnchor="end"
                height={120}
                tick={{ fill: "#6b7280", fontSize: 11 }}
                tickLine={{ stroke: "#d1d5db" }}
              />
              <YAxis
                tick={{ fill: "#6b7280", fontSize: 12 }}
                tickLine={{ stroke: "#d1d5db" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
