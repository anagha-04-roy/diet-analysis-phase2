"""Simple end-to-end smoke test for the deployed Azure Function endpoints."""
from __future__ import annotations

import json
import sys
import time
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

BASE_URL = "https://diet-analysis-func01-d7fdd4awc3dacqew.canadacentral-01.azurewebsites.net/api"
ENDPOINTS = ["GetNutritionalInsights", "GetRecipes", "GetClusters"]


def check(endpoint: str) -> bool:
    url = f"{BASE_URL}/{endpoint}"
    started = time.perf_counter()
    try:
        request = Request(url, headers={"Accept": "application/json", "User-Agent": "DietDashboardIntegrationTest/1.0"})
        with urlopen(request, timeout=30) as response:
            payload = json.loads(response.read().decode("utf-8"))
            elapsed_ms = (time.perf_counter() - started) * 1000
            data = payload if isinstance(payload, list) else payload.get("data", [])
            print(f"PASS {endpoint}: HTTP {response.status}, {len(data)} records, {elapsed_ms:.1f} ms")
            return response.status == 200 and isinstance(data, list)
    except (HTTPError, URLError, TimeoutError, json.JSONDecodeError) as exc:
        print(f"FAIL {endpoint}: {exc}")
        return False


if __name__ == "__main__":
    success = all(check(name) for name in ENDPOINTS)
    sys.exit(0 if success else 1)
