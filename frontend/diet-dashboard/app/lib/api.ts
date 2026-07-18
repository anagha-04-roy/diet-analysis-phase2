export async function getInsights() {
  try {
    const res = await fetch(
      "https://diet-analysis-func01-d7fdd4awc3dacqew.canadacentral-01.azurewebsites.net/api/GetNutritionalInsights"
    );

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Error fetching insights:", err);
    return null; 
  }
}

export async function getRecipes() {
  try {
    const res = await fetch(
      "https://diet-analysis-func01-d7fdd4awc3dacqew.canadacentral-01.azurewebsites.net/api/GetRecipes"
    );

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Error fetching recipes:", err);
    return null;
  }
}

export async function getClusters() {
  try {
    const res = await fetch(
      "https://diet-analysis-func01-d7fdd4awc3dacqew.canadacentral-01.azurewebsites.net/api/GetClusters"
    );

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Error fetching clusters:", err);
    return null;
  }
}
