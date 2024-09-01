/**
 * @project Eventos - Coordinadora
 * @file UploadDataController.ts
 * @description Controlador para manejar las solicitudes de carga masiva de datos.
 * @verified NO
 * @status DEVELOP
 * @unitTests NO
 * @unitTestsStatus PENDING
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este controlador maneja las solicitudes HTTP relacionadas con la carga masiva de usuarios, lugares, eventos,
 * y combinaciones de lugares y eventos.
 */

/** @import librerias */
import {FastifyRequest, FastifyReply} from "fastify";
import {MultipartFile} from "@fastify/multipart";
import {Readable} from "stream";

/** @import dependencias */
import {UploadDataUsers} from "../../application/use-cases/UploadDataUsers";
import {UploadDataPlaces} from "../../application/use-cases/UploadDataPlaces";
import {UploadDataEvents} from "../../application/use-cases/UploadDataEvents";
import {UploadDataRegisters} from "../../application/use-cases/UploadDataRegisters";
import {UploadDataPlacesAndEvents} from "../../application/use-cases/UploadDataPlacesAndEvents";

/** @class UploadDataController */
export class UploadDataController {
  constructor(
    private bulkUploadUsers: UploadDataUsers,
    private bulkUploadPlaces: UploadDataPlaces,
    private bulkUploadEvents: UploadDataEvents,
    private bulkUploadRegisters: UploadDataRegisters,
    private bulkUploadPlacesAndEvents: UploadDataPlacesAndEvents
  ) {}

  /**
   * @method uploadUsers
   * @description Maneja la carga masiva de usuarios
   * @param {FastifyRequest} request - La solicitud HTTP
   * @param {FastifyReply} reply - La respuesta HTTP
   * @returns {Promise<void>}
   */
  async uploadUsers(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const file = await request.file();
      if (!file) {
        return reply.code(400).send({error: "No se ha proporcionado ningún archivo"});
      }
      console.log("File received:", file.filename);
      const readable = await this.processUploadedFile(file);
      const result = await this.bulkUploadUsers.execute(readable);
      reply.code(200).send(result);
    } catch (error) {
      console.error("Error en uploadUsers:", error);
      reply.code(500).send({error: "Error interno del servidor al procesar la carga de usuarios"});
    }
  }

  /**
   * @method uploadPlaces
   * @description Maneja la carga masiva de lugares
   * @param {FastifyRequest} request - La solicitud HTTP
   * @param {FastifyReply} reply - La respuesta HTTP
   * @returns {Promise<void>}
   */
  async uploadPlaces(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const file = await request.file();
      if (!file) {
        return reply.code(400).send({error: "No se ha proporcionado ningún archivo"});
      }
      const readable = await this.processUploadedFile(file);
      const result = await this.bulkUploadPlaces.execute(readable);
      reply.code(200).send(result);
    } catch (error) {
      console.error("Error en uploadPlaces:", error);
      reply.code(500).send({error: "Error interno del servidor al procesar la carga de lugares"});
    }
  }

  /**
   * @method uploadEvents
   * @description Maneja la carga masiva de eventos
   * @param {FastifyRequest} request - La solicitud HTTP
   * @param {FastifyReply} reply - La respuesta HTTP
   * @returns {Promise<void>}
   */
  async uploadEvents(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const file = await request.file();
      if (!file) {
        return reply.code(400).send({error: "No se ha proporcionado ningún archivo"});
      }
      const readable = await this.processUploadedFile(file);
      const result = await this.bulkUploadEvents.execute(readable);
      reply.code(200).send(result);
    } catch (error) {
      console.error("Error en uploadEvents:", error);
      reply.code(500).send({error: "Error interno del servidor al procesar la carga de eventos"});
    }
  }

  /**
   * @method uploadRegisters
   * @description Maneja la carga masiva de registros
   * @param {FastifyRequest} request - La solicitud HTTP
   * @param {FastifyReply} reply - La respuesta HTTP
   * @returns {Promise<void>}
   */
  async uploadRegisters(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const file = await request.file();
      if (!file) {
        return reply.code(400).send({error: "No se ha proporcionado ningún archivo"});
      }
      const readable = await this.processUploadedFile(file);
      const result = await this.bulkUploadRegisters.execute(readable);
      reply.code(200).send(result);
    } catch (error) {
      console.error("Error en uploadRegisters:", error);
      reply.code(500).send({error: "Error interno del servidor al procesar la carga de registros"});
    }
  }

  /**
   * @method uploadPlacesAndEvents
   * @description Maneja la carga masiva simultánea de lugares y eventos
   * @param {FastifyRequest} request - La solicitud HTTP
   * @param {FastifyReply} reply - La respuesta HTTP
   * @returns {Promise<void>}
   */
  async uploadPlacesAndEvents(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const file = await request.file();
      if (!file) {
        return reply.code(400).send({error: "No se ha proporcionado ningún archivo"});
      }
      const readable = await this.processUploadedFile(file);
      const result = await this.bulkUploadPlacesAndEvents.execute(readable);
      reply.code(200).send(result);
    } catch (error) {
      console.error("Error en uploadPlacesAndEvents:", error);
      reply.code(500).send({error: "Error interno del servidor al procesar la carga de lugares y eventos"});
    }
  }

  /**
   * @method processUploadedFile
   * @description Procesa el archivo subido y lo convierte en un Readable
   * @param {MultipartFile} file - El archivo subido
   * @returns {Promise<Readable>} El contenido del archivo como un Readable
   * @private
   */
  private async processUploadedFile(file: MultipartFile): Promise<Readable> {
    const buffer = await file.toBuffer();
    return Readable.from(buffer);
  }
}
