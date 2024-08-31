/**
 * @project Eventos - Coordinadora
 * @file DeleteRegister.ts
 * @description Caso de uso para eliminar un registro por ID.
 * @verified SI
 * @status DONE
 * @unitTests NO
 * @unitTestsStatus DEVELOP
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Caso de uso para eliminar un registro por su ID.
 */

/** @import dependencias */
import {RegisterRepository} from "../interfaces/RegisterRepository";

/** @class DeleteRegister */
export class DeleteRegister {
  constructor(private registerRepository: RegisterRepository) {}

  /**
   * @method execute
   * @description Ejecuta la eliminación de un registro por su ID
   * @param {number} registerId - El ID del registro a eliminar
   * @returns {Promise<void>}
   */
  async execute(registerId: number): Promise<void> {
    await this.registerRepository.deleteRegister(registerId);
  }
}
