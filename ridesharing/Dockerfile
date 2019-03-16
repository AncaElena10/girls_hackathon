FROM python:3.6

COPY requirements.txt /ride-sharing/

RUN apt-get update
RUN apt-get install python3-pip -y
RUN pip3 install pipenv
RUN pip3 install -r /ride-sharing/requirements.txt

COPY . /ride-sharing
