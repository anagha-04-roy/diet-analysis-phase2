"use client";

import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ data }: { data: any[] }) {
  // ⭐ If filtered data is empty, show message
  if (!Array.isArray(data) || data.length === 0) {
    return <p>No data available for the selected filters.</p>;
  }

  // ⭐ Count recipes per diet type
  const counts: Record<string, number> = {};

  data.forEach((item) => {
    const diet = item.Diet_type ?? item.diet_type;
    if (!diet) return;
    counts[diet] = (counts[diet] || 0) + 1;
  });

  const labels = Object.keys(counts);
  const values = Object.values(counts);

  // ⭐ If counts are empty (e.g., filtered to a diet with no recipes)
  if (labels.length === 0) {
    return <p>No data available for the selected filters.</p>;
  }

  return (
    <Pie
      data={{
        labels,
        datasets: [
          {
            label: "Recipe Count",
            data: values,
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
            ],
          },
        ],
      }}
      options={{
        plugins: {
          legend: { display: true },
          title: {
            display: true,
            text: "Recipe Distribution by Diet Type",
            font: { size: 18, weight: "bold" },
            padding: { top: 10, bottom: 20 },
          },
        },
      }}
    />
  );
}
