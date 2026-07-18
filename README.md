# Diet Analysis - Phase 2 Cloud Dashboard

Cloud-native dashboard for the **All_Diets.csv** dataset. The final solution uses Azure Blob Storage for the live dataset, Azure Functions for Python/Pandas analysis, and Azure Static Web Apps for the public frontend.

## Team roles

- **Anagha Roy - Member A:** Azure resource group, Storage Account, Function App, blob dataset, deployed backend endpoints.
- **Jasmeen - Member B:** dashboard UI and initial chart work.
- **Manya Sethi - Member C:** integration, CORS/auth handling, end-to-end testing, final deployment setup, repository assembly, architecture, and documentation.

## Live backend endpoints

- `GET /api/GetNutritionalInsights`
- `GET /api/GetRecipes`
- `GET /api/GetRecipes?diet_type=vegan`
- `GET /api/GetClusters`

Base URL:

```text
https://diet-analysis-func01-d7fdd4awc3dacqew.canadacentral-01.azurewebsites.net
```

## Final dashboard features

- Fetches all three deployed Azure Function endpoints.
- Four meaningful visualizations: grouped bar, line, pie, and scatter.
- Diet, cuisine, and recipe-search filters.
- Refresh button and filtered CSV download.
- Function/API timing metadata measured in the browser; also supports backend-provided `execution_time_ms` metadata.
- Responsive layout, status indicator, error handling, and a clear CORS troubleshooting message.
- Demo mode for presentation/testing: add `?demo=1` to the frontend URL.

## Repository structure

```text
frontend/
  index.html
  staticwebapp.config.json
function_app.py
host.json
requirements.txt
docs/
  architecture-diagram.png
  architecture-diagram.svg
  dashboard-demo.png
  Project_Phase2_Cloud_Dashboard_Documentation.docx
  Project_Phase2_Cloud_Dashboard_Documentation.pdf
deployment/
  AZURE_STATIC_WEB_APP_STEPS.md
  CORS_AND_TESTING.md
  GIT_MERGE_STEPS.md
tests/
  integration_check.py
```

## Local frontend test

From the repository root:

```bash
python3 -m http.server 8080 --directory frontend
```

Open:

```text
http://localhost:8080
```

For a guaranteed visual preview without making API calls:

```text
http://localhost:8080/?demo=1
```

## Integration smoke test

```bash
python3 tests/integration_check.py
```

The script checks all three live endpoints, validates JSON, prints record counts, and reports request duration.

## Azure Static Web Apps deployment values

Use **Custom / No framework**:

- Branch: `main`
- App location: `/frontend`
- API location: leave blank
- Output location: leave blank

After Azure creates the Static Web App, copy its exact `https://...azurestaticapps.net` URL into the Function App CORS allowed-origins list.

## Required final evidence before submission

1. Azure resource group/resource list screenshot.
2. Blob container showing `All_Diets.csv`.
3. Each deployed Function endpoint returning JSON.
4. Static Web App overview showing the public URL.
5. Public dashboard with all four charts.
6. Browser DevTools Network tab showing successful frontend-to-backend requests.
7. GitHub `main` branch showing frontend, backend, docs, and workflow.
