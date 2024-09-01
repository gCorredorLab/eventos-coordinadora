/**
 * @project Eventos - Coordinadora
 * @file fastify-swagger.d.ts
 * @description Extensión del esquema de Fastify para incluir propiedades adicionales en la definición de rutas
 * @verified SI
 * @status DONE
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo extiende la interfaz FastifySchema para incluir propiedades adicionales
 * que permiten una mejor documentación y estructura de las rutas en Fastify.
 * Las propiedades adicionales incluyen `description`, `tags`, `summary` y una estructura
 * detallada para `response` que permite definir descripciones, tipos y propiedades para
 * diferentes códigos de estado HTTP.
 */

/** @import dependencias */
import "fastify";
import {FastifySchema} from "fastify";

/** @module Extensión de FastifySchema */
declare module "fastify" {
  interface FastifySchema {
    /** @property {string} [description] - Descripción de la ruta para propósitos de documentación */
    description?: string;

    /** @property {string[]} [tags] - Etiquetas asociadas con la ruta, útiles para categorizar las rutas en la documentación */
    tags?: string[];

    /** @property {string} [summary] - Resumen corto de la ruta */
    summary?: string;

    /** @property {object} [response] - Definición de las respuestas posibles para diferentes códigos de estado HTTP */
    response?: {
      /**
       * @property {object} [statusCode] - Definición de la respuesta para un código de estado específico
       * @property {string} [statusCode.description] - Descripción de la respuesta para el código de estado
       * @property {string} [statusCode.type] - Tipo de datos de la respuesta (por ejemplo, `object`, `string`)
       * @property {object} [statusCode.properties] - Propiedades esperadas en la respuesta, definidas como un objeto de pares clave-valor
       */
      [statusCode: number]: {
        description?: string;
        type?: string;
        properties?: Record<string, unknown>;
      };
    };
  }
}
