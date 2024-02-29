import swaggerJSDoc from "swagger-jsdoc";
import { glob } from 'glob';

import { version } from '../../package.json';

// Specify the base directories for routes and component schemas
const routesBaseDir = 'src/routes';
const componentSchemasBaseDir = 'src/swagger-component-schemas';

// Create a function to get all files recursively from a directory
const getAllFiles = (baseDir: string, pattern: string): string[] => {
  return glob.sync(`${baseDir}/**/${pattern}`);
};

export function swaggerOptionsConfig(port: string) {

  const options: swaggerJSDoc.Options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "REST api docs",
        description: 'GVC Confirmation Services Documentation',
        version
      },
      servers: [
        {
          url: `http://localhost:${port}`
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