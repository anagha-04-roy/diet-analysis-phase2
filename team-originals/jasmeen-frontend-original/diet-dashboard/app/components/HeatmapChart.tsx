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

export default function HeatmapChart({ data }: { data: any[] }) {
    if (!Array.isArray(data) || data.length === 0) {
    return <p>No data available for the selected filters.</p>;
  }
    const labels = ["Protein", "Carbs", "Fat"];
    const averages = [
        data.reduce((a, b) => a + b["Protein(g)"], 0) / data.length,
        data.reduce((a, b) => a + b["Carbs(g)"], 0) / data.length,
        data.reduce((a, b) => a + b["Fat(g)"], 0) / data.length,
    ];

    return (
        <Bar
        data={{
            labels,
            datasets: [
            {
                label: "Average Nutrients",
                data: averages,
                backgroundColor: [
                "rgba(255, 99, 132, 0.7)",
                "rgba(54, 162, 235, 0.7)",
                "rgba(255, 206, 86, 0.7)",
                ],
            },
            ],
        }}
        options={{
            indexAxis: "y",
        }}
        />
    );
    }
