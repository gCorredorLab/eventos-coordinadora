/**
 * @project Eventos - Coordinadora
 * @file GetUser.ts
 * @description Caso de uso para obtener un usuario por ID.
 * @verified SI
 * @status DONE
 * @unitTests NO
 * @unitTestsStatus DEVELOP
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Caso de uso para obtener un usuario por su ID.
 */

/** @import dependencias */
import {User} from "../../domain/entities/User";
import {UserRepository} from "../interfaces/UserRepository";

/** @class GetUser */
export class GetUser {
  constructor(private userRepository: UserRepository) {}

  /**
   * @method execute
   * @description Ejecuta la obtención de un usuario por su ID
   * @param {number} userId - El ID del usuario a obtener
   * @returns {Promise<User | null>} El usuario encontrado o null si no existe
   */
  async execute(userId: number): Promise<User | null> {
    return this.userRepository.getUserById(userId);
  }
}
