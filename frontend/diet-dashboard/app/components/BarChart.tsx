"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function BarChart({ data }: { data: any[] }) {
  const labels = data.map((d) => d.Diet_type);
  const protein = data.map((d) => d["Protein(g)"]);

  return (
    <Bar
      data={{
        labels,
        datasets: [
          {
            label: "Protein (g)",
            data: protein,
            backgroundColor: "rgba(255, 99, 132, 0.6)",
          },
        ],
      }}
    />
  );
}
