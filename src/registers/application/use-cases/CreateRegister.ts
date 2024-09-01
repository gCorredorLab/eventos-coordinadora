/**
 * @project Eventos - Coordinadora
 * @file CreateRegister.ts
 * @description Caso de uso para crear un nuevo registro.
 * @verified SI
 * @status DONE
 * @unitTests SI
 * @unitTestsStatus PASSED
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Caso de uso para crear un nuevo registro en el sistema.
 */

/** @import dependencias */
import {Register} from "../../domain/entities/Register";
import {RegisterRepository} from "../interfaces/RegisterRepository";

/** @class CreateRegister */
export class CreateRegister {
  constructor(private registerRepository: RegisterRepository) {}

  /**
   * @method execute
   * @description Ejecuta la creación de un nuevo registro
   * @param {Omit<Register, "registerId">} registerData - Los datos del registro a crear, sin el ID
   * @returns {Promise<Register>} El registro creado
   */
  async execute(registerData: Omit<Register, "registerId">): Promise<Register> {
    const register = new Register(
      null,
      registerData.registerUserId,
      registerData.registerEventId,
      registerData.registerDate,
      registerData.registerConfirmation
    );
    return this.registerRepository.createRegister(register);
  }
}
