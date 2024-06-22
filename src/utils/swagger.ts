import swaggerAutogen from 'swagger-autogen';
import app from '../app';

const doc = {
    info : {
        title: "TODOS API DOCS",
        describtion: "TODOS API DOCS",
    },
    host: "https://l1lgnn6z-3000.euw.devtunnels.ms/api/",
    basePath: "/",
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
}

const outputFile = './src/docs/swagger.json';

const routes = [
    './src/routes/auth.route.ts',
];

swaggerAutogen(outputFile, routes, doc);