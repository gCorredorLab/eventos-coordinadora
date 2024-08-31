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

/** Importación de dependencias */
import {config} from "dotenv";
import Fastify from "fastify";

/** Carga de variables de entorno */
config();

/** Creación de la instancia del servidor Fastify */
const server = Fastify();

server.get("/", async (request, reply) => {
  return {hello: "Hola Eventos Coordinadora"};
});

/**
 * Función para iniciar el servidor
 */
const start = async () => {
  try {
    /** Espera a que todos los plugins estén listos */
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
