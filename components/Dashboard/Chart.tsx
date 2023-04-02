import useOverview from "@/hooks/useOverview";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { format } from "date-fns";
import { useTheme } from "next-themes";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
interface Props {}

const Chart = (props: Props) => {
  const { data: overview, isLoading, error } = useOverview();
  const { theme } = useTheme();
  const chartOptions = {
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Last Week Job Applications",
      },
      //
    },

    scales: {
      y: {
        grid: {
          // display: false,
          color: theme === "dark" ? "#3f3f46" : "#d1d5db",
          borderDash: [3],
        },
        suggestedMin: 0,
        ticks: {
          precision: 1,
        },
      },
      x: {
        grid: {
          display: false,
          color: theme === "dark" ? "#3f3f46" : "#d1d5db",
        },
      },
    },

    maintainAspectRatio: false,
    responsive: true,
  };

  const data = overview?.byDay && {
    labels: Object.keys(overview.byDay).map((day) =>
      format(new Date(day), "EEEE")
    ),
    datasets: [
      {
        label: "Pending",
        backgroundColor: "rgba(96, 165, 250, 0.8)",
        borderColor: "rgba(96, 165, 250, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(96, 165, 250, 0.6)",
        hoverBorderColor: "rgba(96, 165, 250, 1)",
        data: Object.values(overview.byDay).map((day) => day.pending),
      },

      {
        label: "Interview",
        backgroundColor: "rgba(74, 222, 128, 0.8)",
        borderColor: "rgba(74, 222, 128, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(74, 222, 128, 0.6)",
        hoverBorderColor: "rgba(74, 222, 128, 1)",
        data: Object.values(overview.byDay).map((day) => day.interview),
      },
      {
        label: "Declined",
        backgroundColor: "rgba(248, 113, 113, 0.8)",
        borderColor: "rgba(248, 113, 113, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(248, 113, 113, 0.6)",
        hoverBorderColor: "rgba(248, 113, 113, 1)",
        data: Object.values(overview.byDay).map((day) => day.declined),
      },
    ],
  };

  return (
    <div className="w-full lg:col-span-2 relative lg:h-[80vh] h-[50vh] m-auto p-4 border border-gray-300 dark:border-zinc-700 rounded-lg bg-gray-50 dark:bg-zinc-900">
      {/* @ts-ignore */}
      {overview?.byDay && <Bar data={data} options={chartOptions} />}
    </div>
  );
};

export default Chart;
