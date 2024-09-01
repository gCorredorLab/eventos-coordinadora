/**
 * @project Eventos - Coordinadora
 * @file uploadDataRoutes.ts
 * @description Definición de rutas para la carga masiva de datos
 * @verified NO
 * @status DEVELOP
 * @unitTests NO
 * @unitTestsStatus PENDING
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo contiene las definiciones de rutas para la carga masiva de usuarios, lugares, eventos,
 * y combinaciones de lugares y eventos. Incluye configuración Swagger para documentación de la API.
 */

/** @import librerias */
import {FastifyInstance} from "fastify";

/** @import dependencias */
import {UploadDataController} from "../../infrastructure/controllers/UploadDataController";
import {
  downloadUserTemplateHandler,
  downloadPlaceTemplateHandler,
  downloadEventTemplateHandler,
  downloadRegisterTemplateHandler,
  downloadPlaceAndEventTemplateHandler
} from "../../../common/utils/templateExcel";

/**
 * @function uploadDataRoutes
 * @description Configura las rutas para la carga masiva de datos
 * @param {FastifyInstance} server - Instancia del servidor Fastify
 * @param {UploadDataController} controller - Controlador para la carga masiva
 */
export function uploadDataRoutes(server: FastifyInstance, controller: UploadDataController) {

  /** Ruta para descargar plantilla de usuarios */
  server.get("/upload-data/templates/users", {
    schema: {
      description: "Descargar plantilla Excel para carga masiva de usuarios",
      tags: ["Formatos carga masiva"],
      response: {
        200: {
          description: "Archivo Excel de plantilla para usuarios",
          type: "string",
          format: "binary"
        }
      }
    },
    handler: downloadUserTemplateHandler
  });

  /** Ruta para descargar plantilla de lugares */
  server.get("/upload-data/templates/places", {
    schema: {
      description: "Descargar plantilla Excel para carga masiva de lugares",
      tags: ["Formatos carga masiva"],
      response: {
        200: {
          description: "Archivo Excel de plantilla para lugares",
          type: "string",
          format: "binary"
        }
      }
    },
    handler: downloadPlaceTemplateHandler
  });

  /** Ruta para descargar plantilla de eventos */
  server.get("/upload-data/templates/events", {
    schema: {
      description: "Descargar plantilla Excel para carga masiva de eventos",
      tags: ["Formatos carga masiva"],
      response: {
        200: {
          description: "Archivo Excel de plantilla para eventos",
          type: "string",
          format: "binary"
        }
      }
    },
    handler: downloadEventTemplateHandler
  });

  /** Ruta para descargar plantilla de registros */
  server.get("/upload-data/templates/registers", {
    schema: {
      description: "Descargar plantilla Excel para carga masiva de registros",
      tags: ["Formatos carga masiva"],
      response: {
        200: {
          description: "Archivo Excel de plantilla para registros",
          type: "string",
          format: "binary"
        }
      }
    },
    handler: downloadRegisterTemplateHandler
  });

  /** Ruta para descargar plantilla de lugares y eventos */
  server.get("/upload-data/templates/places-and-events", {
    schema: {
      description: "Descargar plantilla Excel para carga masiva combinada de lugares y eventos",
      tags: ["Formatos carga masiva"],
      response: {
        200: {
          description: "Archivo Excel de plantilla combinada para lugares y eventos",
          type: "string",
          format: "binary"
        }
      }
    },
    handler: downloadPlaceAndEventTemplateHandler
  });

  /** Ruta para subir usuarios */
  server.post("/upload-data/users", {
    schema: {
      description: "Carga masiva de usuarios desde un archivo Excel",
      tags: ["Upload carga masiva"],
      consumes: ["multipart/form-data"],
      response: {
        200: {
          description: "Resultado de la carga masiva",
          type: "object",
          properties: {
            successCount: {type: "number"},
            failureCount: {type: "number"},
            errors: {type: "array", items: {type: "string"}}
          }
        }
      }
    },
    handler: controller.uploadUsers.bind(controller)
  });

  /** Ruta para subir lugares */
  server.post("/upload-data/places", {
    schema: {
      description: "Carga masiva de lugares desde un archivo Excel",
      tags: ["Upload carga masiva"],
      consumes: ["multipart/form-data"],
      response: {
        200: {
          description: "Resultado de la carga masiva",
          type: "object",
          properties: {
            successCount: {type: "number"},
            failureCount: {type: "number"},
            errors: {type: "array", items: {type: "string"}}
          }
        }
      }
    },
    handler: controller.uploadPlaces.bind(controller)
  });

  /** Ruta para subir eventos */
  server.post("/upload-data/events", {
    schema: {
      description: "Carga masiva de eventos desde un archivo Excel",
      tags: ["Upload carga masiva"],
      consumes: ["multipart/form-data"],
      response: {
        200: {
          description: "Resultado de la carga masiva",
          type: "object",
          properties: {
            successCount: {type: "number"},
            failureCount: {type: "number"},
            errors: {type: "array", items: {type: "string"}}
          }
        }
      }
    },
    handler: controller.uploadEvents.bind(controller)
  });

  /** Ruta para subir registros */
  server.post("/upload-data/registers", {
    schema: {
      description: "Carga masiva de registros desde un archivo Excel",
      tags: ["Upload carga masiva"],
      consumes: ["multipart/form-data"],
      response: {
        200: {
          description: "Resultado de la carga masiva",
          type: "object",
          properties: {
            successCount: {type: "number"},
            failureCount: {type: "number"},
            errors: {type: "array", items: {type: "string"}}
          }
        }
      }
    },
    handler: controller.uploadRegisters.bind(controller)
  });

  /** Ruta para subir lugares y eventos */
  server.post("/upload-data/places-and-events", {
    schema: {
      description: "Carga masiva de lugares y eventos desde un archivo Excel",
      tags: ["Upload carga masiva"],
      consumes: ["multipart/form-data"],
      response: {
        200: {
          description: "Resultado de la carga masiva",
          type: "object",
          properties: {
            successCount: {type: "number"},
            failureCount: {type: "number"},
            errors: {type: "array", items: {type: "string"}}
          }
        }
      }
    },
    handler: controller.uploadPlacesAndEvents.bind(controller)
  });
}
