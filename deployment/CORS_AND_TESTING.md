# CORS, Authentication, and End-to-End Testing

## Authentication

The current Azure Functions use anonymous HTTP authorization. The frontend therefore does not send a function key or bearer token.

## CORS requirement

A browser blocks cross-domain JavaScript requests unless the Function App allows the frontend origin. Add the exact Azure Static Web App URL to the Function App allowed-origins list.

Portal path:

```text
Function App → API → CORS → Allowed Origins
```

Azure CLI alternative:

```bash
az functionapp cors add \
  --resource-group YOUR_RESOURCE_GROUP \
  --name diet-analysis-func01 \
  --allowed-origins https://YOUR-STATIC-APP.azurestaticapps.net
```

For local testing, temporarily add:

```text
http://localhost:8080
```

Use specific origins instead of `*` for the final submission.

## End-to-end test checklist

1. Open the public Static Web App URL.
2. Open browser DevTools → Network.
3. Select **Refresh data**.
4. Confirm requests to:
   - `GetNutritionalInsights`
   - `GetRecipes`
   - `GetClusters`
5. Confirm each request returns JSON and a successful status.
6. Select `Vegan` or `Keto`; confirm the recipe request includes `?diet_type=...`.
7. Confirm the charts and recipe table update.
8. Search for a recipe term and verify filtering.
9. Select **Download CSV** and verify the filtered file downloads.
10. Capture screenshots for the documentation PDF.

## Common failures

### `Failed to fetch` in the browser

Most likely cause: the Static Web App URL is missing from Function App CORS.

### Endpoint opens directly but dashboard cannot fetch it

Direct browser navigation does not prove CORS is configured. Check the Network and Console tabs from the frontend origin.

### Dashboard is blank after deployment

Confirm Azure Static Web Apps points to the folder containing `index.html`, and verify the generated GitHub Actions run succeeded.
