from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from tensorflow import keras
from keras.applications.inception_v3 import preprocess_input
from PIL import Image
import io
import numpy as np

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class_list = {0: 'beef_tartare', 1: 'chicken_curry', 2: 'chocolate_mousse', 3: 'french_toast', 4: 'fried_rice', 5: 'hot_dog', 6: 'ice_cream', 7: 'lasagna', 8: 'oysters', 9: 'pizza', 10: 'takoyaki'}
model = keras.models.load_model("app/api/trainedmodel_11class.hdf5")

@app.post("/api/")
async def predict(file: UploadFile = File(...)):
    if file.filename.split(".")[-1] not in ["jpg", "jpeg", "png"]:
        return {"err": "Invalid File Format"}
    img = Image.open(io.BytesIO(await file.read()))
    img = img.resize((299, 299), Image.ANTIALIAS)
    img = np.array(img)
    img = img.reshape((-1, 299, 299, 3))
    img = preprocess_input(img)
    prediction = model.predict(img)
    prediction = class_list[np.argmax(prediction)]
    words = prediction.split("_")
    item_name = map(lambda x: x[0].upper() + x[1:], words)
    prediction = " ".join(item_name)
    return {"prediction": prediction}