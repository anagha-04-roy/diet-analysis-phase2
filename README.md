# Diet Analysis — Phase 2: Cloud Dashboard

Cloud-native dashboard visualizing nutritional insights from the All_Diets dataset, using Azure Functions and Azure Blob Storage.

## Architecture
- **Backend**: Azure Functions (Python) — reads dataset from Azure Blob Storage, processes with Pandas
- **Storage**: Azure Blob Storage (`dietanalysisstorage02`)
- **Frontend**: Dashboard displaying charts (bar, scatter, heatmap, pie) fetching live data from Function endpoints

## Live Endpoints
Live Azure Function URLs are shared privately with the team (not published here for security reasons, since our functions use anonymous auth).

## Backend Setup (Local Development)
1. Clone repo, checkout `anagha-backend` branch
2. Create virtual environment: `python -m venv .venv`
3. Activate: `.venv\Scripts\Activate.ps1`
4. Install dependencies: `pip install -r requirements.txt`
5. Add your own Azure Storage connection string to `local.settings.json`
6. Run locally: `func start --python`

## Team
- **Anagha** — Cloud Backend & Deployment (Azure Functions, Blob Storage)
- **Jasmeen** — Frontend Dashboard
- **Manya** — Integration & Documentation

## Deliverables
- Deployed Azure Function URLs (above)
- GitHub repo (this)
- Documentation PDF (in progress)