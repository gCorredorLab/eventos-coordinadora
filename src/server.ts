/**
 * @project Eventos - Coordinadora
 * @file server.ts
 * @description Configuración y puesta en marcha del servidor Fastify, incluyendo la integración con Swagger para la documentación de la API.
 * @verified SI
 * @status DONE
 * @unitTests NO
 * @unitTestsStatus DEVELOP
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo establece el servidor Fastify, carga las variables de entorno necesarias, y configura Swagger y Swagger UI
 * para la documentación de la API. También gestiona la puesta en marcha del servidor y maneja posibles errores durante el arranque.
 */

/** @import librerias */
import {config} from "dotenv";
import Fastify from "fastify";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import jwt from "@fastify/jwt";
import multipart from "@fastify/multipart";

/** @import dependencias usuarios */
import {authRoutes} from "./users/web/routes/authRoutes";
import {registerUserRoute, userRoutes} from "./users/web/routes/userRoutes";
import {DataUserRepository} from "./users/infrastructure/repositories/DataUserRepository";

/** @import dependencias place, event y register */
import {placeRoutes} from "./places/web/routes/placeRoutes";
import {eventRoutes} from "./events/web/routes/eventRoutes";
import {registerRoutes} from "./registers/web/routes/registerRoutes";
import {DataPlaceRepository} from "./places/infrastructure/repositories/DataPlaceRepository";
import {DataEventRepository} from "./events/infrastructure/repositories/DataEventRepository";
import {DataRegisterRepository} from "./registers/infrastructure/repositories/DataRegisterRepository";

/** @import dependencias bulk upload */
import {uploadDataRoutes} from "./uploaddata/web/routes/uploadDataRoutes";
import {UploadDataController} from "./uploaddata/infrastructure/controllers/UploadDataController";
import {ExcelUploadDataService} from "./uploaddata/infrastructure/services/ExcelBulkUploadService";
import {UploadDataUsers} from "./uploaddata/application/use-cases/UploadDataUsers";
import {UploadDataPlaces} from "./uploaddata/application/use-cases/UploadDataPlaces";
import {UploadDataEvents} from "./uploaddata/application/use-cases/UploadDataEvents";
import {UploadDataRegisters} from "./uploaddata/application/use-cases/UploadDataRegisters";
import {UploadDataPlacesAndEvents} from "./uploaddata/application/use-cases/UploadDataPlacesAndEvents";

/** Carga de variables de entorno */
config();

/** Creación de la instancia del servidor Fastify */
const server = Fastify();

/** Para manejar cargas de archivos en solicitudes HTTP */
server.register(multipart, {
  limits: {
    fieldNameSize: 100, // Max field name size in bytes
    fieldSize: 100, // Max field value size in bytes
    fields: 10, // Max number of non-file fields
    fileSize: 1000000, // For multipart forms, the max file size in bytes
    files: 1, // Max number of file fields
    headerPairs: 2000 // Max number of header key=>value pairs
  }
});

/** Configuración del plugin JWT */
server.register(jwt, {
  secret: process.env.JWT_SECRET ?? "your-secret-key"
});

/**
 * Configuración de Swagger para la generación de la documentación de la API
 */
server.register(swagger, {
  openapi: {
    info: {
      title: "Coordinadora Eventos API",
      description: "API RESTful para gestionar eventos",
      version: "1.0.0"
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT ?? 3000}`
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  }
});

/**
 * Configuración de Swagger UI para la visualización de la documentación en un navegador web
 */
server.register(swaggerUI, {
  routePrefix: "/documentation",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false
  },
  staticCSP: true,
  transformStaticCSP: (header) => header
});

/** Inicialización de los repositorios */
const userRepository = new DataUserRepository();
const placeRepository = new DataPlaceRepository();
const eventRepository = new DataEventRepository();
const registerRepository = new DataRegisterRepository();

/** Inicialización de servicios y controlador para carga masiva */
const bulkUploadService = new ExcelUploadDataService(userRepository, placeRepository, eventRepository, registerRepository);

/** Inicialización de los casos de uso de carga masiva */
const bulkUploadUsers = new UploadDataUsers(bulkUploadService);
const bulkUploadPlaces = new UploadDataPlaces(bulkUploadService);
const bulkUploadEvents = new UploadDataEvents(bulkUploadService);
const bulkUploadRegisters = new UploadDataRegisters(bulkUploadService);
const bulkUploadPlacesAndEvents = new UploadDataPlacesAndEvents(bulkUploadService);

/** Inicialización del controlador de carga masiva */
const bulkUploadController = new UploadDataController(
  bulkUploadUsers,
  bulkUploadPlaces,
  bulkUploadEvents,
  bulkUploadRegisters,
  bulkUploadPlacesAndEvents
);

/**
 * Registro de rutas
 * Todas las rutas se registran después de la configuración de Swagger para asegurar
 * que se incluyan en la documentación.
 */
server.register(async (instance) => {
  /** Rutas de carga masiva (no protegidas) */
  uploadDataRoutes(instance, bulkUploadController);

  /** Rutas no protegidas */
  authRoutes(instance, userRepository);

  /** Ruta de registro de usuario (no protegida) */
  registerUserRoute(instance);

  /** Rutas protegidas */
  instance.register(async (protectedRoutes) => {
    protectedRoutes.addHook("onRequest", async (request, reply) => {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.send(err);
      }
    });
    userRoutes(protectedRoutes);
    placeRoutes(protectedRoutes);
    eventRoutes(protectedRoutes);
    registerRoutes(protectedRoutes);
  });
});

/**
 * Función para iniciar el servidor
 */
const start = async () => {
  try {
    /** Espera a que todos los plugins (incluido Swagger) estén listos */
    await server.ready();

    /** Inicia el servidor en el puerto especificado */
    const address = await server.listen({
      port: Number(process.env.PORT) || 3000,
      host: "0.0.0.0"
    });

    console.log(`🚀 ---> Server running at ${address}`);
    console.log(`📚 ---> Swagger documentation available at ${address}/documentation`);
  } catch (err: any) {
    server.log.error(`🚀 ---> Error al iniciar el servidor:`, err.message);
    /** Finaliza el proceso en caso de error */
    process.exit(1);
  }
};

/** Llamada a la función para iniciar el servidor */
start();
