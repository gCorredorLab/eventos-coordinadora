/**
 * @project Eventos - Coordinadora
 * @file RegisterController.ts
 * @description Controlador para manejar las solicitudes relacionadas con la entidad Register.
 * @verified SI
 * @status DONE
 * @created 29/8/2024
 * @note
 *
 * Este controlador maneja las solicitudes HTTP relacionadas con los registros,
 * incluyendo la creación, obtención, actualización y eliminación de registros.
 */

/** @import dependencias */
import {FastifyRequest, FastifyReply} from "fastify";
import {Register} from "../../domain/entities/Register";
import {CreateRegister} from "../../application/use-cases/CreateRegister";
import {GetAllRegisters} from "../../application/use-cases/GetAllRegisters";
import {GetRegister} from "../../application/use-cases/GetRegister";
import {UpdateRegister} from "../../application/use-cases/UpdateRegister";
import {DeleteRegister} from "../../application/use-cases/DeleteRegister";

/** Definición de tipos para los parámetros de las rutas */
interface RegisterParams {
  registerId: string;
}

/** @class RegisterController */
export class RegisterController {
  constructor(
    private createRegister: CreateRegister,
    private getAllRegisters: GetAllRegisters,
    private getRegister: GetRegister,
    private updateRegister: UpdateRegister,
    private deleteRegister: DeleteRegister
  ) {}

  /**
   * @method createRegisterHandler
   * @description Maneja la creación de un nuevo registro
   * @param {FastifyRequest} req - La solicitud HTTP
   * @param {FastifyReply} reply - La respuesta HTTP
   * @returns {Promise<void>}
   */
  async createRegisterHandler(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const registerData = req.body as Omit<Register, "registerId">;
      const register = await this.createRegister.execute(registerData);
      reply.code(201).send(register);
    } catch (error) {
      reply.code(500).send({error: "Error al crear el registro"});
    }
  }

  /**
   * @method getAllRegisterHandler
   * @description Maneja la obtención de todos los registros
   * @param {FastifyRequest} req - La solicitud HTTP
   * @param {FastifyReply} reply - La respuesta HTTP
   * @returns {Promise<void>}
   */
  async getAllRegistersHandler(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const registers = await this.getAllRegisters.execute();
      reply.send(registers);
    } catch (error) {
      reply.code(500).send({error: "Error al obtener los registros"});
    }
  }

  /**
   * @method getRegisterHandler
   * @description Maneja la obtención de un registro por ID
   * @param {FastifyRequest<{Params: RegisterParams}>} req - La solicitud HTTP con los parámetros tipados
   * @param {FastifyReply} reply - La respuesta HTTP
   * @returns {Promise<void>}
   */
  async getRegisterHandler(req: FastifyRequest<{Params: RegisterParams}>, reply: FastifyReply): Promise<void> {
    try {
      const registerId = Number(req.params.registerId);
      const register = await this.getRegister.execute(registerId);
      if (register) {
        reply.send(register);
      } else {
        reply.code(404).send({error: "Registro no encontrado"});
      }
    } catch (error) {
      reply.code(500).send({error: "Error al obtener el registro"});
    }
  }

  /**
   * @method updateRegisterHandler
   * @description Maneja la actualización de un registro existente
   * @param {FastifyRequest<{Params: RegisterParams}>} req - La solicitud HTTP con los parámetros tipados
   * @param {FastifyReply} reply - La respuesta HTTP
   * @returns {Promise<void>}
   */
  async updateRegisterHandler(req: FastifyRequest<{Params: RegisterParams}>, reply: FastifyReply): Promise<void> {
    try {
      const registerId = Number(req.params.registerId);
      const registerData = req.body as Omit<Register, "registerId">;
      const updatedRegister = await this.updateRegister.execute(registerId, registerData);
      reply.send(updatedRegister);
    } catch (error) {
      reply.code(500).send({error: "Error al actualizar el registro"});
    }
  }

  /**
   * @method deleteRegisterHandler
   * @description Maneja la eliminación de un registro por ID
   * @param {FastifyRequest<{Params: RegisterParams}>} req - La solicitud HTTP con los parámetros tipados
   * @param {FastifyReply} reply - La respuesta HTTP
   * @returns {Promise<void>}
   */
  async deleteRegisterHandler(req: FastifyRequest<{Params: RegisterParams}>, reply: FastifyReply): Promise<void> {
    try {
      const registerId = Number(req.params.registerId);
      await this.deleteRegister.execute(registerId);
      reply.code(204).send();
    } catch (error) {
      reply.code(500).send({error: "Error al eliminar el registro"});
    }
  }
}
