/**
 * @project Eventos - Coordinadora
 * @file UpdateRegister.ts
 * @description Caso de uso para actualizar un registro existente.
 * @verified SI
 * @status DONE
 * @unitTests SI
 * @unitTestsStatus PASSED
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Caso de uso para actualizar los datos de un registro existente.
 */

/** @import dependencias */
import {Register} from "../../domain/entities/Register";
import {RegisterRepository} from "../interfaces/RegisterRepository";

/** @class UpdateRegister */
export class UpdateRegister {
  constructor(private registerRepository: RegisterRepository) {}

  /**
   * @method execute
   * @description Ejecuta la actualización de un registro existente
   * @param {number} registerId - El ID del registro a actualizar
   * @param {Omit<Register, "registerId">} registerData - Los nuevos datos del registro
   * @returns {Promise<Register>} El registro actualizado
   */
  async execute(registerId: number, registerData: Omit<Register, "registerId">): Promise<Register> {
    const register = new Register(
      registerId,
      registerData.registerUserId,
      registerData.registerEventId,
      registerData.registerDate,
      registerData.registerConfirmation
    );
    return this.registerRepository.updateRegister(register);
  }
}
