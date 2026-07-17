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
  const labels = data.map((d) => d.Diet_type);
  const fat = data.map((d) => d["Fat(g)"]);

  return (
    <Pie
      data={{
        labels,
        datasets: [
          {
            label: "Fat (g)",
            data: fat,
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
    />
  );
}
