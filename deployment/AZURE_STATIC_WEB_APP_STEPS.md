# Deploy the Final Dashboard to Azure Static Web Apps

## Portal method

1. Sign in to Azure Portal.
2. Search for **Static Web Apps**.
3. Select **Create**.
4. Choose the same subscription and preferably the existing project resource group.
5. Enter a name such as `diet-analysis-dashboard`.
6. Plan type: **Free**.
7. Source: **GitHub**.
8. Select the GitHub organization/account, repository `diet-analysis-phase2`, and branch `main`.
9. Build preset: **Custom**.
10. App location: `/frontend` (or `/frontend-final` if you used that folder name).
11. API location: leave blank because the API is already a separate Function App.
12. Output location: use the same static folder, `/frontend` (or `/frontend-final`).
13. Select **Review + create**, then **Create**.
14. Open the Static Web App resource and wait for the GitHub Actions deployment to finish.
15. Copy the generated public URL ending in `.azurestaticapps.net`.

## Immediately configure CORS

The frontend and Function App are on different domains. Add the exact Static Web App origin to the Function App:

1. Open Function App `diet-analysis-func01`.
2. Go to **API → CORS**.
3. Add the exact origin, for example:

```text
https://your-generated-name.azurestaticapps.net
```

4. Do not include a trailing slash.
5. Save.
6. Refresh the public dashboard.

## Final deployment verification

- Status pill says **Live Azure data connected**.
- All four charts contain data.
- Timing cards show milliseconds.
- Diet filter changes the recipe API query.
- Cuisine and search filters update the table/charts.
- Browser DevTools Network tab shows HTTP 200 for all three endpoints.
