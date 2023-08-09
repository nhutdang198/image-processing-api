# Image Processing API

# Pre-requisites

- Install [Node.js](https://nodejs.org/en/)

# Getting started

- Clone the repository

```
git clone  https://github.com/nhutdang198/image-processing-api.git
```

- Install dependencies

```
cd image-processing-api
npm install
```

- .env file

```
create .env file from .env.example
can use my free redis host in .env.example
```

- Start development

```
npm run start:dev
```

- Build the project

```
npm run build
```

- Testing

```
npm run test
```

- API endpoints

```
http://localhost:3000/images
```

- Image filenames

```
encenadaport
fjord.jpg
icelandwaterfall.jpg
palmtunnel.jpg
santamonica.jpg
```

- NPM script

| Npm Script  | Description                                |
| ----------- | ------------------------------------------ |
| `start`     | Runs build and runs node on dist/index.js. |
| `start:dev` | start application in development mode      |
| `build`     | build project to dist/ folder              |
| `test`      | Runs build and runs tests                  |
| `lint`      | Runs TSLint on project files               |
| `prettier`  | Runs prettier on project files             |
