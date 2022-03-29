from io import BytesIO
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io

from pydantic import conint

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/")
async def predict(file: UploadFile = File(...)):
    if file.filename.split(".")[-1] not in ["jpg", "jpeg", "png"]:
        return {"err": "Invalid File Format"}
    img = Image.open(io.BytesIO(await file.read()))
    prediction = "abc"
    return {"prediction": prediction}