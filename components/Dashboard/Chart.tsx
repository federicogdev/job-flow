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
        color: theme === "dark" ? "white" : "black",
      },
      //
    },

    scales: {
      y: {
        grid: {
          color: theme === "dark" ? "#27272a" : "#d1d5db",
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
          color: theme === "dark" ? "#27272a" : "#d1d5db",
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
        backgroundColor: "rgba(2, 132, 199, 0.8)",
        borderColor: "rgba(2, 132, 199, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(2, 132, 199, 0.6)",
        hoverBorderColor: "rgba(2, 132, 199, 1)",
        data: Object.values(overview.byDay).map((day) => day.pending),
      },

      {
        label: "Interview",
        backgroundColor: "rgba(13, 148, 136, 0.8)",
        borderColor: "rgba(13, 148, 136, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(13, 148, 136, 0.6)",
        hoverBorderColor: "rgba(13, 148, 136, 1)",
        data: Object.values(overview.byDay).map((day) => day.interview),
      },
      {
        label: "Declined",
        backgroundColor: "rgba(225, 29, 72, 0.8)",
        borderColor: "rgba(225, 29, 72, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(225, 29, 72, 0.6)",
        hoverBorderColor: "rgba(225, 29, 72, 1)",
        data: Object.values(overview.byDay).map((day) => day.declined),
      },
    ],
  };

  return (
    <div className="w-full lg:col-span-2 relative lg:h-[80vh] h-[50vh] m-auto p-4 border border-gray-300 dark:border-zinc-800 rounded-md bg-gray-100 dark:bg-zinc-900">
      {/* @ts-ignore */}
      {overview?.byDay && <Bar data={data} options={chartOptions} />}
    </div>
  );
};

export default Chart;
