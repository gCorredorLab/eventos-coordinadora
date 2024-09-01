/**
 * @project Eventos - Coordinadora
 * @file UserRepository.ts
 * @description Interfaz que define las operaciones de repositorio para la entidad User
 * @verified SI
 * @status DONE
 * @unitTests SI
 * @unitTestsStatus PASSED
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 */

/** @import entidades */
import {User} from "../../domain/entities/User";

/** @interface */
export interface UserRepository {
  /**
   * @method createUser
   * @description Crea un nuevo usuario en el sistema
   * @param {User} user - El usuario a crear
   * @returns {Promise<User>} El usuario creado con su ID asignado
   */
  createUser(user: User): Promise<User>;

  /**
   * @method getAllUsers
   * @description Obtiene todos los usuarios del sistema
   * @returns {Promise<User[]>} Un array con todos los usuarios
   */
  getAllUsers(): Promise<User[]>;

  /**
   * @method getUserById
   * @description Obtiene un usuario por su ID
   * @param {number} userId - El ID del usuario a buscar
   * @returns {Promise<User | null>} El usuario encontrado o null si no existe
   */
  getUserById(userId: number): Promise<User | null>;

  /**
   * @method getUserByEmail
   * @description Obtiene un usuario por su email
   * @param {string} userEmail - El email del usuario a buscar
   * @returns {Promise<User | null>} El usuario encontrado o null si no existe
   */
  getUserByEmail(userEmail: string): Promise<User | null>;

  /**
   * @method updateUser
   * @description Actualiza un usuario existente
   * @param {User} user - El usuario con los datos actualizados
   * @returns {Promise<User>} El usuario actualizado
   */
  updateUser(user: User): Promise<User>;

  /**
   * @method deleteUser
   * @description Elimina un usuario del sistema
   * @param {number} userId - El ID del usuario a eliminar
   * @returns {Promise<void>}
   */
  deleteUser(userId: number): Promise<void>;
}
