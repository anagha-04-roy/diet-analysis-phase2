# Manya's Git Merge and Repository Assembly Steps

These commands are written for macOS Terminal.

## 1. Accept the GitHub collaborator invitation

Open GitHub notifications or the invitation email and select **Accept invitation**.

## 2. Clone and create your integration branch

```bash
cd ~/Desktop
git clone https://github.com/anagha-04-roy/diet-analysis-phase2.git
cd diet-analysis-phase2
git fetch origin
git checkout main
git pull origin main
git checkout -b manya-integration
```

## 3. Merge both teammates' branches

```bash
git merge origin/anagha-backend
git merge origin/jasmeen-frontend
```

If Git reports a README conflict, keep the final combined README from this package. Do not delete either teammate's source code until the final frontend is verified.

## 4. Add the completed Member C files

Copy these items from `Member_C_Submission_Package` into the cloned repository:

- Copy `frontend/` to the repository root as `frontend-final/` **or** replace the existing frontend after making a backup.
- Copy `docs/` to `docs/`.
- Copy `deployment/` to `deployment/`.
- Copy `tests/` to `tests/`.
- Replace the root `README.md` with the completed README.

Recommended final layout:

```text
function_app.py
host.json
requirements.txt
frontend/
  dashboard/          # existing teammate frontend may remain here
frontend-final/
  index.html          # deploy this folder
  staticwebapp.config.json
docs/
deployment/
tests/
README.md
```

If you use `frontend-final`, set Azure Static Web Apps **App location** and **Output location** to `/frontend-final`.

## 5. Review and push

```bash
git status
git add .
git commit -m "Complete frontend-backend integration and Phase 2 documentation"
git push -u origin manya-integration
```

## 6. Merge to main

On GitHub:

1. Open the repository.
2. Select **Compare & pull request** for `manya-integration`.
3. Base branch: `main`.
4. Confirm the file list contains backend, frontend, docs, and tests.
5. Select **Create pull request**.
6. Select **Merge pull request** and **Confirm merge**.

Then verify the `main` branch before deploying the Static Web App.
