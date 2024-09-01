/**
 * @project Eventos - Coordinadora
 * @file DeleteUser.ts
 * @description Caso de uso para eliminar un usuario por ID.
 * @verified SI
 * @status DONE
 * @unitTests SI
 * @unitTestsStatus PASSED
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Caso de uso para eliminar un usuario por su ID.
 */

/** @import dependencias */
import {UserRepository} from "../interfaces/UserRepository";

/** @class DeleteUser */
export class DeleteUser {
  constructor(private userRepository: UserRepository) {}

  /**
   * @method execute
   * @description Ejecuta la eliminación de un usuario por su ID
   * @param {number} userId - El ID del usuario a eliminar
   * @returns {Promise<void>}
   */
  async execute(userId: number): Promise<void> {
    await this.userRepository.deleteUser(userId);
  }
}
