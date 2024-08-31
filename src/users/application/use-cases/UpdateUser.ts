/**
 * @project Eventos - Coordinadora
 * @file UpdateUser.ts
 * @description Caso de uso para actualizar un usuario existente.
 * @verified SI
 * @status DONE
 * @unitTests NO
 * @unitTestsStatus DEVELOP
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Caso de uso para actualizar un usuario.
 */

/** @import dependencias */
import {User} from "../../domain/entities/User";
import {UserRepository} from "../interfaces/UserRepository";

/** @class UpdateUser */
export class UpdateUser {
  constructor(private userRepository: UserRepository) {}

  /**
   * @method execute
   * @description Ejecuta la actualización de un usuario existente
   * @param {number} userId - El ID del usuario a actualizar
   * @param {Omit<User, "userId">} userData - Los nuevos datos del usuario
   * @returns {Promise<User>} El usuario actualizado
   */
  async execute(userId: number, userData: Omit<User, "userId">): Promise<User> {
    const user = new User(
      userId,
      userData.userName,
      userData.userLastname,
      userData.userEmail,
      userData.password,
      userData.userLatitude,
      userData.userLongitude
    );
    return this.userRepository.updateUser(user);
  }
}
