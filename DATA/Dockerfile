FROM python:3.9.13

WORKDIR /app

COPY ./requirements.txt .

RUN /usr/local/bin/python -m pip install --upgrade pip

RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY ./app/* ./

EXPOSE 8000

CMD ["uvicorn", "--host", "0.0.0.0", "--port", "8000", "main:app"]
