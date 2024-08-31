/**
 * @project Eventos - Coordinadora
 * @file registerRoutes.ts
 * @description Definición de las rutas relacionadas con la entidad Register.
 * @verified SI
 * @status DONE
 * @unitTests NO
 * @unitTestsStatus DEVELOP
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Define las rutas relacionadas con los registros, permitiendo la
 * creación, obtención, actualización y eliminación. Incluye autenticación JWT.
 */

/** @import dependencias */
import {FastifyInstance} from "fastify";
import {RegisterController} from "../../infrastructure/controllers/RegisterController";
import {DataRegisterRepository} from "../../infrastructure/repositories/DataRegisterRepository";
import {CreateRegister} from "../../application/use-cases/CreateRegister";
import {GetAllRegisters} from "../../application/use-cases/GetAllRegisters";
import {GetRegister} from "../../application/use-cases/GetRegister";
import {UpdateRegister} from "../../application/use-cases/UpdateRegister";
import {DeleteRegister} from "../../application/use-cases/DeleteRegister";

/** Definición de tipos para los parámetros de las rutas */
interface RegisterParams {
  registerId: string;
}

/** Inicialización del repositorio y casos de uso fuera de la función de rutas */
const registerRepository = new DataRegisterRepository();
const createRegister = new CreateRegister(registerRepository);
const getAllRegisters = new GetAllRegisters(registerRepository);
const getRegister = new GetRegister(registerRepository);
const updateRegister = new UpdateRegister(registerRepository);
const deleteRegister = new DeleteRegister(registerRepository);

/** Creación del controlador de registro */
const registerController = new RegisterController(createRegister, getAllRegisters, getRegister, updateRegister, deleteRegister);

/**
 * Función para definir y registrar las rutas de registro
 * @param server Instancia del servidor Fastify
 */
export async function registerRoutes(server: FastifyInstance) {
  /** Configuración común para todas las rutas protegidas */
  const securityScheme = {
    security: [{bearerAuth: []}]
  };

  /** Ruta para crear un nuevo registro */
  server.post(
    "/registers",
    {
      schema: {
        description: "Crear un nuevo registro a un evento",
        tags: ["Registro a eventos"],
        body: {
          type: "object",
          required: ["registerUserId", "registerEventId", "registerDate", "registerConfirmation"],
          properties: {
            registerUserId: {type: "number"},
            registerEventId: {type: "number"},
            registerDate: {type: "string", format: "date-time"},
            registerConfirmation: {type: "boolean"}
          }
        },
        response: {
          201: {
            description: "Successful response",
            type: "object",
            properties: {
              registerId: {type: "number"},
              registerUserId: {type: "number"},
              registerEventId: {type: "number"},
              registerDate: {type: "string", format: "date-time"},
              registerConfirmation: {type: "boolean"}
            }
          }
        },
        ...securityScheme
      }
    },
    registerController.createRegisterHandler.bind(registerController)
  );

  /** Ruta para obtener todos los registros */
  server.get(
    "/registers",
    {
      schema: {
        description: "Obtener todos los registro a un evento",
        tags: ["Registro a eventos"],
        response: {
          200: {
            description: "Successful response",
            type: "array",
            items: {
              type: "object",
              properties: {
                registerId: {type: "number"},
                registerUserId: {type: "number"},
                registerEventId: {type: "number"},
                registerDate: {type: "string", format: "date-time"},
                registerConfirmation: {type: "boolean"}
              }
            }
          }
        },
        ...securityScheme
      }
    },
    registerController.getAllRegistersHandler.bind(registerController)
  );

  /** Ruta para obtener un registro por ID */
  server.get<{Params: RegisterParams}>(
    "/registers/:registerId",
    {
      schema: {
        description: "Obtener un registro a un evento por ID",
        tags: ["Registro a eventos"],
        params: {
          type: "object",
          properties: {
            registerId: {type: "string"}
          }
        },
        response: {
          200: {
            description: "Successful response",
            type: "object",
            properties: {
              registerId: {type: "number"},
              registerUserId: {type: "number"},
              registerEventId: {type: "number"},
              registerDate: {type: "string", format: "date-time"},
              registerConfirmation: {type: "boolean"}
            }
          }
        },
        ...securityScheme
      }
    },
    registerController.getRegisterHandler.bind(registerController)
  );

  /** Ruta para actualizar un registro */
  server.put<{Params: RegisterParams}>(
    "/registers/:registerId",
    {
      schema: {
        description: "Actualizar un registro a un evento",
        tags: ["Registro a eventos"],
        params: {
          type: "object",
          properties: {
            registerId: {type: "string"}
          }
        },
        body: {
          type: "object",
          properties: {
            registerDate: {type: "string", format: "date-time"},
            registerConfirmation: {type: "boolean"}
          }
        },
        response: {
          200: {
            description: "Successful response",
            type: "object",
            properties: {
              registerId: {type: "number"},
              registerUserId: {type: "number"},
              registerEventId: {type: "number"},
              registerDate: {type: "string", format: "date-time"},
              registerConfirmation: {type: "boolean"}
            }
          }
        },
        ...securityScheme
      }
    },
    registerController.updateRegisterHandler.bind(registerController)
  );

  /** Ruta para eliminar un registro */
  server.delete<{Params: RegisterParams}>(
    "/registers/:registerId",
    {
      schema: {
        description: "Eliminar un registro a un evento",
        tags: ["Registro a eventos"],
        params: {
          type: "object",
          properties: {
            registerId: {type: "string"}
          }
        },
        response: {
          204: {
            description: "Successful response",
            type: "null"
          }
        },
        ...securityScheme
      }
    },
    registerController.deleteRegisterHandler.bind(registerController)
  );
}
