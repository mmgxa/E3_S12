<div align="center">

# Session 12

</div>

In this session, we deploy a FastAPI backend that hosts an ONNX model to Lambda using AWS SAM along with an API Gateway. The frontend is made with Next.JS and is hosted on Vercel. 

## Tools used
- ONNX
- FastAPI
- Next.JS
- Shadcn UI
- AWS SAM

## Local Deployment

Install pre-requisites via

```
pip install --no-cache-dir -r requirements-local.txt
```
Convert the `resnet` model to ONNX via:
```
python convert.py
```

Run the server locally via:

```
python server.py
```




Create the Next.JS app via:
```

npx create-next-app@latest frontend
```

Then install dependencies via:
```
cd frontend
npm i next-themes
npx shadcn-ui@latest init
npx shadcn-ui@latest add input
npx shadcn-ui@latest add button
```

To run the server, type
```
npm run dev
```


## SAM

After installing the SAM CLI, initialize the project
```
sam init --name emlo_s12 --app-template hello-world-lambda-image  --architecture x86_64 --package-type Image --base-image amazon/python3.10-base  --no-tracing --no-application-insights
```

Then, edit `template.yaml`, `requirements.txt`, `app.py`, and `Dockerfile`.

Build the image via:

```
sam build
```

Then deploy via:

```
sam deploy --stack-name emlov3-s12-1 --capabilities "CAPABILITY_IAM" --no-confirm-changeset --no-disable-rollback
```
