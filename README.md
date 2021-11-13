# Covid-19 Tracker

### Using docker
- For DEV
  - Run with container
    > <code>docker build -t react-docker-dev:v1.0.0 -f Dockerfile.dev .</code><br>
    > <code>docker run -it -p 3000:80/tcp --name react-dev -v $(pwd):/code react-docker-dev:v1.0.0</code>
  - Run with compose
    > <code>docker-compose -f docker-compose-local.yml up</code>

- For PROD
  - Run with container
    > <code>docker build -t react-docker-prod:v1.0.0 -f Dockerfile.prod .</code><br>
    > <code>docker run -it -p 3000:80/tcp --name react-prod react-docker-prod:v1.0.0</code>
  - Run with compose
    > <code>docker-compose up</code>