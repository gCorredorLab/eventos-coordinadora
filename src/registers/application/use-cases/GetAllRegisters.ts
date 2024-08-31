/**
 * @project Eventos - Coordinadora
 * @file GetAllRegisters.ts
 * @description Caso de uso para obtener todos los registro.
 * @verified SI
 * @status DONE
 * @unitTests NO
 * @unitTestsStatus DEVELOP
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Caso de uso para obtener todos los registro.
 */

/** @import dependencias */
import {Register} from "../../domain/entities/Register";
import {RegisterRepository} from "../interfaces/RegisterRepository";

/** @class GetAllRegisters */
export class GetAllRegisters {
  constructor(private registerRepository: RegisterRepository) {}

  /**
   * @method execute
   * @description Ejecuta la obtención de todos los registro
   * @returns {Promise<User[]>} Un array con todos los registro
   */
  async execute(): Promise<Register[]> {
    return this.registerRepository.getAllRegisters();
  }
}
