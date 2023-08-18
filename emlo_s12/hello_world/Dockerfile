FROM public.ecr.aws/lambda/python:3.10

COPY app.py requirements.txt imagenet_classes.txt resnetv2_50.onnx ./

RUN python3.10 -m pip install -r requirements.txt -t .

# Command can be overwritten by providing a different command in the template directly.
CMD ["app.handler"]
