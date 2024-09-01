/**
 * @project Eventos - Coordinadora
 * @file userRoutes.ts
 * @description Definición de las rutas relacionadas con la entidad User.
 * @verified SI
 * @status DONE
 * @unitTests NO
 * @unitTestsStatus DEVELOP
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Define las rutas relacionadas con los usuarios, permitiendo la
 * creación, obtención, actualización y eliminación.
 */

/** @import dependencias */
import {FastifyInstance, FastifyRequest, FastifyReply} from "fastify";
import {UserController} from "../../infrastructure/controllers/UserController";
import {DataUserRepository} from "../../infrastructure/repositories/DataUserRepository";
import {CreateUser} from "../../application/use-cases/CreateUser";
import {GetAllUsers} from "../../application/use-cases/GetAllUsers";
import {GetUser} from "../../application/use-cases/GetUser";
import {GetUserEmail} from "../../application/use-cases/GetUserEmail";
import {UpdateUser} from "../../application/use-cases/UpdateUser";
import {DeleteUser} from "../../application/use-cases/DeleteUser";

/** Definición de tipos para los parámetros de las rutas */
interface UserParams {
  userId: string;
  userEmail: string;
}

/** Inicialización del repositorio y casos de uso fuera de la función de rutas */
const userRepository = new DataUserRepository();
const createUser = new CreateUser(userRepository);
const getAllUsers = new GetAllUsers(userRepository);
const getUser = new GetUser(userRepository);
const getUserEmail = new GetUserEmail(userRepository);
const updateUser = new UpdateUser(userRepository);
const deleteUser = new DeleteUser(userRepository);

/** Creación del controlador de usuario */
const userController = new UserController(createUser, getAllUsers, getUser, getUserEmail, updateUser, deleteUser);

/**
 * Manejador para la creación de un nuevo usuario
 * @param request Solicitud Fastify
 * @param reply Respuesta Fastify
 */
export const createUserHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  return userController.createUserHandler(request, reply);
};

/**
 * Función para registrar la ruta de creación de usuario (registro)
 * @param server Instancia del servidor Fastify
 */
export function registerUserRoute(server: FastifyInstance) {
  server.post(
    "/register",
    {
      schema: {
        description: "Registrar un nuevo usuario",
        tags: ["Registro de usuarios"],
        body: {
          type: "object",
          required: ["userName", "userLastname", "userEmail", "password", "userLatitude", "userLongitude"],
          properties: {
            userName: {type: "string"},
            userLastname: {type: "string"},
            userEmail: {type: "string", format: "email"},
            password: {type: "string"},
            userLatitude: {type: "number"},
            userLongitude: {type: "number"}
          }
        },
        response: {
          201: {
            description: "Usuario registrado exitosamente",
            type: "object",
            properties: {
              userId: {type: "string"},
              userName: {type: "string"},
              userLastname: {type: "string"},
              userEmail: {type: "string"},
              userLatitude: {type: "number"},
              userLongitude: {type: "number"}
            }
          }
        }
      }
    },
    createUserHandler
  );
}

/**
 * Función para definir y registrar las rutas de usuario
 * @param server Instancia del servidor Fastify
 */
export async function userRoutes(server: FastifyInstance) {
  /** Configuración común para todas las rutas protegidas */
  const securityScheme = {
    security: [{bearerAuth: []}]
  };

  /** Ruta para obtener todos los usuarios */
  server.get(
    "/users",
    {
      schema: {
        description: "Obtener todos los usuarios",
        tags: ["Usuarios"],
        response: {
          200: {
            description: "Successful response",
            type: "array",
            items: {
              type: "object",
              properties: {
                userId: {type: "number"},
                userName: {type: "string"},
                userLastname: {type: "string"},
                userEmail: {type: "string"},
                userLatitude: {type: "number"},
                userLongitude: {type: "number"}
              }
            }
          }
        },
        ...securityScheme
      }
    },
    userController.getAllUsersHandler.bind(userController)
  );

  /** Ruta para obtener un usuario por ID */
  server.get<{Params: UserParams}>(
    "/users/:userId",
    {
      schema: {
        description: "Obtener un usuario por ID",
        tags: ["Usuarios"],
        params: {
          type: "object",
          properties: {
            userId: {type: "string"}
          }
        },
        response: {
          200: {
            description: "Successful response",
            type: "object",
            properties: {
              userId: {type: "number"},
              userName: {type: "string"},
              userLastname: {type: "string"},
              userEmail: {type: "string"},
              userLatitude: {type: "number"},
              userLongitude: {type: "number"}
            }
          }
        },
        ...securityScheme
      }
    },
    (request, reply) => userController.getUserHandler(request, reply)
  );

  /** Ruta para obtener un usuario por email */
  server.get<{Params: UserParams}>(
    "/users/email/:userEmail",
    {
      schema: {
        description: "Obtener un usuario por email",
        tags: ["Usuarios"],
        params: {
          type: "object",
          properties: {
            userEmail: {type: "string"}
          }
        },
        response: {
          200: {
            description: "Successful response",
            type: "object",
            properties: {
              userId: {type: "number"},
              userName: {type: "string"},
              userLastname: {type: "string"},
              userEmail: {type: "string"},
              userLatitude: {type: "number"},
              userLongitude: {type: "number"}
            }
          }
        },
        ...securityScheme
      }
    },
    (request, reply) => userController.getUserEmailHandler(request, reply)
  );

  /** Ruta para actualizar un usuario */
  server.put<{Params: UserParams}>(
    "/users/:userId",
    {
      schema: {
        description: "Actualizar un usuario",
        tags: ["Usuarios"],
        params: {
          type: "object",
          properties: {
            userId: {type: "string"}
          }
        },
        body: {
          type: "object",
          properties: {
            userName: {type: "string"},
            userLastname: {type: "string"},
            userLatitude: {type: "number"},
            userLongitude: {type: "number"}
          }
        },
        response: {
          200: {
            description: "Successful response",
            type: "object",
            properties: {
              userId: {type: "number"},
              userName: {type: "string"},
              userLastname: {type: "string"},
              userEmail: {type: "string"},
              userLatitude: {type: "number"},
              userLongitude: {type: "number"}
            }
          }
        },
        ...securityScheme
      }
    },
    (request, reply) => userController.updateUserHandler(request, reply)
  );

  /** Ruta para eliminar un usuario */
  server.delete<{Params: UserParams}>(
    "/users/:userId",
    {
      schema: {
        description: "Eliminar un usuario",
        tags: ["Usuarios"],
        params: {
          type: "object",
          properties: {
            userId: {type: "string"}
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
    (request, reply) => userController.deleteUserHandler(request, reply)
  );
}
