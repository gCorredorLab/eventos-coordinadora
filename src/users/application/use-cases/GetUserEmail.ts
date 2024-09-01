/**
 * @project Eventos - Coordinadora
 * @file GetUserEmail.ts
 * @description Caso de uso para obtener un usuario por email.
 * @verified SI
 * @status DONE
 * @unitTests SI
 * @unitTestsStatus PASSED
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Caso de uso para obtener un usuario por su email.
 */

/** @import dependencias */
import {User} from "../../domain/entities/User";
import {UserRepository} from "../interfaces/UserRepository";

/** @class GetUserEmail */
export class GetUserEmail {
  constructor(private userRepository: UserRepository) {}

  /**
   * @method execute
   * @description Ejecuta la obtención de un usuario por su email
   * @param {string} userEmail - El email del usuario a obtener
   * @returns {Promise<User | null>} El usuario encontrado o null si no existe
   */
  async execute(userEmail: string): Promise<User | null> {
    return this.userRepository.getUserByEmail(userEmail);
  }
}
