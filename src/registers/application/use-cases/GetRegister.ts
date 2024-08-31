/**
 * @project Eventos - Coordinadora
 * @file GetRegister.ts
 * @description Caso de uso para obtener un registro por ID.
 * @verified SI
 * @status DONE
 * @unitTests NO
 * @unitTestsStatus DEVELOP
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Caso de uso para obtener un registro por su ID.
 */

/** @import dependencias */
import {Register} from "../../domain/entities/Register";
import {RegisterRepository} from "../interfaces/RegisterRepository";

/** @class GetRegister */
export class GetRegister {
  constructor(private registerRepository: RegisterRepository) {}

  /**
   * @method execute
   * @description Ejecuta la obtención de un registro por su ID
   * @param {number} registerId - El ID del registro a obtener
   * @returns {Promise<Register | null>} El registro encontrado o null si no existe
   */
  async execute(registerId: number): Promise<Register | null> {
    return this.registerRepository.getRegisterById(registerId);
  }
}
