import azure.functions as func
import logging
import pandas as pd
import io
import json
import os
from azure.storage.blob import BlobServiceClient

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

@app.route(route="GetNutritionalInsights")
def GetNutritionalInsights(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Processing nutritional insights request.')

    try:
        connect_str = os.environ["AzureWebJobsStorage"]
        container_name = "datasets"
        blob_name = "All_Diets.csv"

        blob_service_client = BlobServiceClient.from_connection_string(connect_str)
        container_client = blob_service_client.get_container_client(container_name)
        blob_client = container_client.get_blob_client(blob_name)

        stream = blob_client.download_blob().readall()
        df = pd.read_csv(io.BytesIO(stream))

        df.fillna(df.mean(numeric_only=True), inplace=True)

        avg_macros = (
            df.groupby("Diet_type")[["Protein(g)", "Carbs(g)", "Fat(g)"]]
            .mean()
            .reset_index()
        )

        result = avg_macros.to_dict(orient="records")

        return func.HttpResponse(
            json.dumps(result, indent=4),
            mimetype="application/json",
            status_code=200
        )

    except Exception as e:
        logging.error(f"Error: {e}")
        return func.HttpResponse(
            json.dumps({"error": str(e)}),
            mimetype="application/json",
            status_code=500
        )
    
@app.route(route="GetRecipes")
def GetRecipes(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Processing recipes request.')

    try:
        connect_str = os.environ["AzureWebJobsStorage"]
        container_name = "datasets"
        blob_name = "All_Diets.csv"

        blob_service_client = BlobServiceClient.from_connection_string(connect_str)
        container_client = blob_service_client.get_container_client(container_name)
        blob_client = container_client.get_blob_client(blob_name)

        stream = blob_client.download_blob().readall()
        df = pd.read_csv(io.BytesIO(stream))
        df.fillna(df.mean(numeric_only=True), inplace=True)

        diet_filter = req.params.get('diet_type')
        if diet_filter:
            df = df[df['Diet_type'].str.lower() == diet_filter.lower()]

        recipes = df[['Diet_type', 'Recipe_name', 'Cuisine_type',
                      'Protein(g)', 'Carbs(g)', 'Fat(g)']].head(50).to_dict(orient='records')

        return func.HttpResponse(
            json.dumps(recipes, indent=4),
            mimetype="application/json",
            status_code=200
        )

    except Exception as e:
        logging.error(f"Error: {e}")
        return func.HttpResponse(
            json.dumps({"error": str(e)}),
            mimetype="application/json",
            status_code=500
        )


@app.route(route="GetClusters")
def GetClusters(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Processing clusters request.')

    try:
        connect_str = os.environ["AzureWebJobsStorage"]
        container_name = "datasets"
        blob_name = "All_Diets.csv"

        blob_service_client = BlobServiceClient.from_connection_string(connect_str)
        container_client = blob_service_client.get_container_client(container_name)
        blob_client = container_client.get_blob_client(blob_name)

        stream = blob_client.download_blob().readall()
        df = pd.read_csv(io.BytesIO(stream))
        df.fillna(df.mean(numeric_only=True), inplace=True)

        clusters = (
            df.groupby("Cuisine_type")
            .agg(
                recipe_count=("Recipe_name", "count"),
                avg_protein=("Protein(g)", "mean"),
                avg_carbs=("Carbs(g)", "mean"),
                avg_fat=("Fat(g)", "mean"),
            )
            .reset_index()
            .to_dict(orient="records")
        )

        return func.HttpResponse(
            json.dumps(clusters, indent=4),
            mimetype="application/json",
            status_code=200
        )

    except Exception as e:
        logging.error(f"Error: {e}")
        return func.HttpResponse(
            json.dumps({"error": str(e)}),
            mimetype="application/json",
            status_code=500
        )