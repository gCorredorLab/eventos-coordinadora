/**
 * @project Eventos - Coordinadora
 * @file templateHandlers.ts
 * @description Handlers para descargar plantillas en formato Excel para usuarios, lugares, eventos y combinaciones de estos.
 * @verified SI
 * @status DONE
 * @unitTests NO
 * @unitTestsStatus PROGRESS
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo define los handlers que permiten a los usuarios descargar plantillas en formato Excel.
 * Cada plantilla corresponde a un conjunto de datos (usuarios, lugares, eventos, o una combinación de estos)
 * que puede ser importado en la aplicación. Estos handlers son utilizados por las rutas de descarga.
 */

/** @import librerías */
import {FastifyRequest, FastifyReply} from "fastify";
import * as XLSX from "xlsx";
import {userTemplateData, placeTemplateData, eventTemplateData, registerTemplateData, placeAndEventTemplateData} from "./templateData";

/**
 * @function downloadUserTemplateHandler
 * @description Handler para descargar la plantilla de usuarios en formato Excel.
 * @param {FastifyRequest} request - La solicitud HTTP de Fastify.
 * @param {FastifyReply} reply - La respuesta HTTP de Fastify.
 * @returns {Promise<void>} - Retorna una promesa que se resuelve cuando se envía el archivo Excel.
 * @note Este handler genera un archivo Excel que contiene la estructura necesaria para importar usuarios.
 */
export async function downloadUserTemplateHandler(request: FastifyRequest, reply: FastifyReply) {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(userTemplateData);

  XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
  const buffer = XLSX.write(workbook, {type: "buffer", bookType: "xlsx"});

  reply
    .header("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    .header("Content-Disposition", "attachment; filename=user_import_template.xlsx")
    .send(buffer);
}

/**
 * @function downloadPlaceTemplateHandler
 * @description Handler para descargar la plantilla de lugares en formato Excel.
 * @param {FastifyRequest} request - La solicitud HTTP de Fastify.
 * @param {FastifyReply} reply - La respuesta HTTP de Fastify.
 * @returns {Promise<void>} - Retorna una promesa que se resuelve cuando se envía el archivo Excel.
 * @note Este handler genera un archivo Excel que contiene la estructura necesaria para importar lugares.
 */
export async function downloadPlaceTemplateHandler(request: FastifyRequest, reply: FastifyReply) {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(placeTemplateData);

  XLSX.utils.book_append_sheet(workbook, worksheet, "Places");
  const buffer = XLSX.write(workbook, {type: "buffer", bookType: "xlsx"});

  reply
    .header("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    .header("Content-Disposition", "attachment; filename=place_import_template.xlsx")
    .send(buffer);
}

/**
 * @function downloadEventTemplateHandler
 * @description Handler para descargar la plantilla de eventos en formato Excel.
 * @param {FastifyRequest} request - La solicitud HTTP de Fastify.
 * @param {FastifyReply} reply - La respuesta HTTP de Fastify.
 * @returns {Promise<void>} - Retorna una promesa que se resuelve cuando se envía el archivo Excel.
 * @note Este handler genera un archivo Excel que contiene la estructura necesaria para importar eventos.
 */
export async function downloadEventTemplateHandler(request: FastifyRequest, reply: FastifyReply) {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(eventTemplateData);

  XLSX.utils.book_append_sheet(workbook, worksheet, "Events");
  const buffer = XLSX.write(workbook, {type: "buffer", bookType: "xlsx"});

  reply
    .header("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    .header("Content-Disposition", "attachment; filename=event_import_template.xlsx")
    .send(buffer);
}

/**
 * @function downloadRegisterTemplateHandler
 * @description Handler para descargar la plantilla de registros en formato Excel.
 * @param {FastifyRequest} request - La solicitud HTTP de Fastify.
 * @param {FastifyReply} reply - La respuesta HTTP de Fastify.
 * @returns {Promise<void>} - Retorna una promesa que se resuelve cuando se envía el archivo Excel.
 * @note Este handler genera un archivo Excel que contiene la estructura necesaria para importar registros.
 */
export async function downloadRegisterTemplateHandler(request: FastifyRequest, reply: FastifyReply) {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(registerTemplateData);

  XLSX.utils.book_append_sheet(workbook, worksheet, "Registers");
  const buffer = XLSX.write(workbook, {type: "buffer", bookType: "xlsx"});

  reply
    .header("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    .header("Content-Disposition", "attachment; filename=register_import_template.xlsx")
    .send(buffer);
}

/**
 * @function downloadPlaceAndEventTemplateHandler
 * @description Handler para descargar la plantilla combinada de eventos y lugares en formato Excel.
 * @param {FastifyRequest} request - La solicitud HTTP de Fastify.
 * @param {FastifyReply} reply - La respuesta HTTP de Fastify.
 * @returns {Promise<void>} - Retorna una promesa que se resuelve cuando se envía el archivo Excel.
 * @note Este handler genera un archivo Excel que contiene la estructura necesaria para importar tanto eventos como lugares en una sola plantilla.
 */
export async function downloadPlaceAndEventTemplateHandler(request: FastifyRequest, reply: FastifyReply) {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(placeAndEventTemplateData);

  XLSX.utils.book_append_sheet(workbook, worksheet, "Events and Places");
  const buffer = XLSX.write(workbook, {type: "buffer", bookType: "xlsx"});

  reply
    .header("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    .header("Content-Disposition", "attachment; filename=event_and_place_import_template.xlsx")
    .send(buffer);
}
