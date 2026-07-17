"use client";
import { getInsights, getRecipes, getClusters } from "./lib/api";
import { useState } from "react";
import BarChart from "./components/BarChart";
import ScatterChart from "./components/ScatterChart";
import HeatmapChart from "./components/HeatmapChart";
import PieChart from "./components/PieChart";
//import ExecutionTime from "./components/ExecutionTime";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [search, setSearch] = useState<string>("");
  const [dietFilter, setDietFilter] = useState<string>("All Diet Types");


  const filteredData = Array.isArray(data)
    ?data.filter((item: any) => {
        const diet = (item.Diet_type ?? item.diet_type)?.toLowerCase();
        if (!diet) return false;

        const filter = dietFilter.toLowerCase();

        const matchesSearch = diet.includes(search.toLowerCase());
        const matchesFilter =
          dietFilter === "All Diet Types" || diet === filter;

        return matchesSearch && matchesFilter;
      })
    : null;

  return (
    <main className="bg-pink-50 text-black flex min-h-screen justify-center items-center">
      <div className="max-w-3xl w-full p-6 m-6 bg-white rounded-3xl shadow-md">
        <h1 className="text-3xl bg-purple-50 rounded-2xl border border-purple-300 font-bold text-center mb-8">
          Nutritional Insights
        </h1>

        {/* EXPLORE NUTRITIONAL INSIGHTS */}
        <div className="mb-6 border border-pink-300 rounded-2xl p-4 bg-pink-50">
          <h2 className="text-xl font-semibold mb-4">Explore Nutritional Insights</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* BAR CHART */}
            <div className="bg-white p-4 border border-pink-300 rounded-xl shadow">
              <h3 className="font-semibold mb-2">Bar Chart</h3>
              <p className="text-sm text-gray-600">Average macronutrient content by diet type</p>
              {Array.isArray(filteredData) && <BarChart data={filteredData} />}
            </div>

            {/* SCATTER */}
            <div className="bg-white border border-pink-300 p-4 rounded-xl shadow">
              <h3 className="font-semibold mb-2">Scatter Plot</h3>
              <p className="text-sm text-gray-600">Nutrient relationships</p>
              {Array.isArray(data) && <ScatterChart data={data} />}
            </div>

            {/* HEATMAP */}
            <div className="bg-white border border-pink-300 p-4 rounded-xl shadow">
              <h3 className="font-semibold mb-2">Heatmap</h3>
              <p className="text-sm text-gray-600">Nutrient correlations</p>
              {Array.isArray(data) && <HeatmapChart data={data} />}
            </div>

            {/* PIE */}
            <div className="bg-white border border-pink-300 p-4 rounded-xl shadow">
              <h3 className="font-semibold mb-2">Pie Chart</h3>
              <p className="text-sm text-gray-600">Recipe distribution by diet type</p>
              {Array.isArray(data) && <PieChart data={data} />}
            </div>
            
          </div>
        </div>

        {/* FILTERS */}
        <div className="mb-6 border border-blue-300 rounded-2xl p-4 bg-blue-50">
          <h2 className="text-xl font-semibold mb-2">Filters and Data Interaction</h2>
          <div className="flex flex-wrap gap-3">
            <input
              type="text"
              placeholder="Search by Diet Type"
              className="border border-blue-300 rounded-xl px-3 py-2 text-sm bg-white flex-1"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="border border-blue-300 rounded-xl px-3 py-2 text-sm bg-blue-400 text-white hover:bg-blue-500"
              value={dietFilter}
              onChange={(e) => setDietFilter(e.target.value)}
            >
              <option>All Diet Types</option>
              <option>Vegan</option>
              <option>Keto</option>
              <option>Dash</option>
              <option>Paleo</option>
              <option>Mediterranean</option>
            </select>
          </div>
        </div>

        {/* API BUTTONS */}
        <div className="mb-2 border border-purple-300 rounded-2xl p-4 bg-purple-50">
          <h2 className="text-xl font-semibold mb-3">API Data Interaction</h2>
          <div className="flex flex-wrap gap-3">
            <button
              className="bg-pink-400 text-white px-4 py-2 rounded-xl text-sm hover:bg-pink-500"
              onClick={async () => setData(await getInsights())}
            >
              Get Nutritional Insights
            </button>

            <button
              className="bg-blue-400 text-white px-4 py-2 rounded-xl text-sm hover:bg-blue-500"
              onClick={async () => setData(await getRecipes())}
            >
              Get Recipes
            </button>

            <button
              className="bg-purple-400 text-white px-4 py-2 rounded-xl text-sm hover:bg-purple-500"
              onClick={async () => setData(await getClusters())}
            >
              Get Clusters
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
