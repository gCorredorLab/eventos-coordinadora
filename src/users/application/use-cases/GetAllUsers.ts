/**
 * @project Eventos - Coordinadora
 * @file GetAllUsers.ts
 * @description Caso de uso para obtener todos los usuarios del sistema
 * @verified SI
 * @status DONE
 * @unitTests SI
 * @unitTestsStatus PASSED
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Caso de uso para obtener todos los usuarios registrados.
 */

/** @import dependencias */
import {User} from "../../domain/entities/User";
import {UserRepository} from "../interfaces/UserRepository";

/** @class GetAllUsers */
export class GetAllUsers {
  constructor(private userRepository: UserRepository) {}

  /**
   * @method execute
   * @description Ejecuta la obtención de todos los usuarios
   * @returns {Promise<User[]>} Un array con todos los usuarios
   */
  async execute(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }
}
