"use client";

import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export default function ScatterChart({ data }: { data: any[] }) {
    if (!Array.isArray(data) || data.length === 0) {
    return <p>No data available for the selected filters.</p>;
  }
    const points = data.map((d) => ({
        x: d["Protein(g)"],
        y: d["Carbs(g)"],
    }));

    return (
        <Scatter
        data={{
            datasets: [
            {
                label: "Protein vs Carbs",
                data: points,
                backgroundColor: "rgba(54, 162, 235, 0.7)",
            },
            ],
        }}
        />
    );
    }
