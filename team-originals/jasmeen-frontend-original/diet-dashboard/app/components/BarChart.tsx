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


type Recipe = {
  diet_type?: string;
  Diet_type?: string;
  protein?: number;
  carbs?: number;
  fat?: number;
  ["Protein(g)"]?: number;
  ["Carbs(g)"]?: number;
  ["Fat(g)"]?: number;
};

export default function BarChart({ data }: { data: Recipe[] }) {
  if (!Array.isArray(data) || data.length === 0) {
    return <p>No data available for the selected filters.</p>;
  }

  const summarized = summarizeByDietType(data);

  const labels = summarized.map((d) => d.diet_type);

  const protein = summarized.map((d) => d.avgProtein);
  const carbs = summarized.map((d) => d.avgCarbs);
  const fat = summarized.map((d) => d.avgFat);

  function summarizeByDietType(recipes: Recipe[]) {
    const groups: any = {};

    recipes.forEach((r: Recipe) => {
      const diet = r.diet_type ?? r.Diet_type;
      if (!diet) return;

      if (!groups[diet]) {
        groups[diet] = { protein: 0, carbs: 0, fat: 0, count: 0 };
      }

      groups[diet].protein += Number(r.protein ?? r["Protein(g)"] ?? 0);
      groups[diet].carbs += Number(r.carbs ?? r["Carbs(g)"] ?? 0);
      groups[diet].fat += Number(r.fat ?? r["Fat(g)"] ?? 0);
      groups[diet].count += 1;
    });

    return Object.entries(groups).map(([diet, info]: any) => ({
      diet_type: diet,
      avgProtein: info.protein / info.count,
      avgCarbs: info.carbs / info.count,
      avgFat: info.fat / info.count,
    }));
  }

  return (
    <Bar
      data={{
        labels,
        datasets: [
          {
            label: "Protein",
            data: protein,
            backgroundColor: "rgba(255, 99, 132, 0.6)",
          },
          {
            label: "Carbs",
            data: carbs,
            backgroundColor: "rgba(54, 162, 235, 0.6)",
          },
          {
            label: "Fat",
            data: fat,
            backgroundColor: "rgba(255, 206, 86, 0.6)",
          },
        ],
      }}
      options={{
        plugins: {
          legend: { display: true },
          title: {
            display: true,
            text: "Macronutrients by Diet Type",
            font: { size: 18, weight: "bold" },
            padding: { top: 10, bottom: 30 },
          },
        },
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            suggestedMax: Math.max(...protein, ...carbs, ...fat) + 20,
            ticks: { stepSize: 20 },
          },
        },
      }}
    />
  );
}
