from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/recom_item")
async def recom_item():
    return {"message": "recom_item"}