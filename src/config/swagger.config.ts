import swaggerJSDoc from "swagger-jsdoc";
import { glob } from 'glob';

import { version } from '../../package.json';

// Specify the base directories for routes and component schemas
const routesBaseDir = 'src/routes';
const componentSchemasBaseDir = 'src/swaggerSchemas';

// Create a function to get all files recursively from a directory
const getAllFiles = (baseDir: string, pattern: string): string[] => {
  return glob.sync(`${baseDir}/**/${pattern}`);
};

export function swaggerOptionsConfig(port: string, url: string) {

  let _url = `${url}/api`;

  const options: swaggerJSDoc.Options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "RESTful API for GVC Confirmation App",
        description: 'GVC Confirmation Services Documentation',
        version
      },
      servers: [
        {
          url: _url
        }
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: [...getAllFiles(routesBaseDir, '*.ts'), ...getAllFiles(componentSchemasBaseDir, '*.ts')],
  };

  return options;

}