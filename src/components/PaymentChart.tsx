"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface PaymentChartProps {
  data: {
    month: string;
    rent: number;
    bond: number;
    utility: number;
  }[];
}

export default function PaymentChart({ data }: PaymentChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <p className="text-xs font-medium text-slate-400">No payment history yet.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-52">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 0, left: -25, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 11 }}
            dy={5}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 11 }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            cursor={{ fill: "#f8fafc" }}
            contentStyle={{
              borderRadius: "10px",
              border: "none",
              fontSize: "12px",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
            }}
            formatter={(value: unknown) => [`$${Number(value).toLocaleString()}`, undefined]}
          />
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: "11px", paddingBottom: "10px" }}
          />
          <Bar dataKey="rent" name="Rent" stackId="a" fill="#8b5cf6" radius={[0, 0, 0, 0]} maxBarSize={22} />
          <Bar dataKey="bond" name="Bond" stackId="a" fill="#0ea5e9" radius={[0, 0, 0, 0]} maxBarSize={22} />
          <Bar dataKey="utility" name="Utility" stackId="a" fill="#f59e0b" radius={[3, 3, 0, 0]} maxBarSize={22} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
