/**
 * @project Eventos - Coordinadora
 * @file CreateUser.ts
 * @description Caso de uso para crear un nuevo usuario.
 * @verified SI
 * @status DONE
 * @unitTests NO
 * @unitTestsStatus DEVELOP
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Caso de uso para crear un nuevo usuario.
 */

/** @import dependencias */
import {User} from "../../domain/entities/User";
import {UserRepository} from "../interfaces/UserRepository";

/** @class CreateUser */
export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  /**
   * @method execute
   * @description Ejecuta la creación de un nuevo usuario
   * @param {Omit<User, "userId">} userData - Los datos del usuario a crear, sin el ID
   * @returns {Promise<User>} El usuario creado
   */
  async execute(userData: Omit<User, "userId">): Promise<User> {
    const user = new User(
      null,
      userData.userName,
      userData.userLastname,
      userData.userEmail,
      userData.password,
      userData.userLatitude,
      userData.userLongitude
    );
    return this.userRepository.createUser(user);
  }
}
