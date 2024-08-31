/**
 * @project Eventos - Coordinadora
 * @file PostgresUserRepository.ts
 * @description Implementación de DataUserRepository para PostgreSQL
 * @verified SI
 * @status DONE
 * @unitTests NO
 * @unitTestsStatus DEVELOP
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Esta clase implementa la interfaz UserRepository utilizando PostgreSQL como base de datos.
 * Utiliza la función query del módulo de configuración de postgres para ejecutar las consultas.
 */

/** @import dependencias */
import {query} from "../../../common/config/postgres";
import {User} from "../../domain/entities/User";
import {UserRepository} from "../../application/interfaces/UserRepository";
import bcrypt from "bcryptjs";

/** @class DataUserRepository */
export class DataUserRepository implements UserRepository {
  /**
   * @method createUser
   * @description Crea un nuevo usuario en la base de datos con la contraseña hasheada
   * @param {User} user - El usuario a crear
   * @returns {Promise<User>} El usuario creado con su ID asignado (sin incluir la contraseña)
   * @throws {Error} Si el email ya existe o si ocurre un error en la base de datos
   */
  async createUser(user: User): Promise<User> {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      const result = await query(
        `INSERT INTO "users" ("userName", "userLastname", "userEmail", "password", "userLatitude", "userLongitude")
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING "userId", "userName", "userLastname", "userEmail", "userLatitude", "userLongitude"`,
        [user.userName, user.userLastname, user.userEmail, hashedPassword, user.userLatitude, user.userLongitude]
      );

      return {
        ...result.rows[0],
        userLatitude: parseFloat(result.rows[0].userLatitude),
        userLongitude: parseFloat(result.rows[0].userLongitude)
      };
    } catch (error: any) {
      if (error.code === "23505") {
        throw new Error("Un usuario con este correo electrónico ya existe");
      }
      throw new Error("Ocurrió un error al crear el usuario");
    }
  }

  /**
   * @method getAllUsers
   * @description Obtiene todos los usuarios de la base de datos
   * @returns {Promise<User[]>} Un array con todos los usuarios
   */
  async getAllUsers(): Promise<User[]> {
    const result = await query(
      `SELECT "userId", "userName", "userLastname", "userEmail", "userLatitude", "userLongitude"
         FROM "users"`
    );
    return result.rows.map(this.mapUserFromDatabase);
  }

  /**
   * @method getUserById
   * @description Obtiene un usuario por su ID
   * @param {number} userId - El ID del usuario a buscar
   * @returns {Promise<User | null>} El usuario encontrado o null si no existe
   */
  async getUserById(userId: number): Promise<User | null> {
    const result = await query(
      `SELECT "userId", "userName", "userLastname", "userEmail", "password", "userLatitude", "userLongitude"
       FROM "users" WHERE "userId" = $1`,
      [userId]
    );
    if (result.rows.length === 0) return null;
    return this.mapUserFromDatabase(result.rows[0]);
  }

  /**
   * @method getUserByEmail
   * @description Obtiene un usuario por su email
   * @param {string} userEmail - El email del usuario a buscar
   * @returns {Promise<User | null>} El usuario encontrado o null si no existe
   */
  async getUserByEmail(userEmail: string): Promise<User | null> {
    const result = await query(
      `SELECT "userId", "userName", "userLastname", "userEmail", "password", "userLatitude", "userLongitude"
       FROM "users" WHERE "userEmail" = $1`,
      [userEmail]
    );
    if (result.rows.length === 0) return null;
    return this.mapUserFromDatabase(result.rows[0]);
  }

  /**
   * @method updateUser
   * @description Actualiza un usuario existente
   * @param {User} user - El usuario con los datos actualizados
   * @returns {Promise<User>} El usuario actualizado
   */
  async updateUser(user: User): Promise<User> {
    const result = await query(
      `UPDATE "users"
     SET "userName" = $1, "userLastname" = $2, "userLatitude" = $3, "userLongitude" = $4
     WHERE "userId" = $5
     RETURNING "userId", "userName", "userLastname", "userEmail", "userLatitude", "userLongitude"`,
      [user.userName, user.userLastname, user.userLatitude, user.userLongitude, user.userId]
    );
    if (result.rows.length === 0) throw new Error("User not found");
    return this.mapUserFromDatabase(result.rows[0]);
  }

  /**
   * @method deleteUser
   * @description Elimina un usuario de la base de datos
   * @param {number} userId - El ID del usuario a eliminar
   * @returns {Promise<void>}
   */
  async deleteUser(userId: number): Promise<void> {
    const result = await query('DELETE FROM "users" WHERE "userId" = $1', [userId]);
    if (result.rowCount === 0) throw new Error("User not found");
  }

  /**
   * @method mapUserFromDatabase
   * @description Mapea los datos del usuario desde la base de datos al modelo de la aplicación
   * @param {any} dbUser - Los datos del usuario como vienen de la base de datos
   * @returns {User} El usuario mapeado al modelo de la aplicación
   * @private
   */
  private mapUserFromDatabase(dbUser: any): User {
    return {
      userId: dbUser.userId,
      userName: dbUser.userName,
      userLastname: dbUser.userLastname,
      userEmail: dbUser.userEmail,
      password: dbUser.password,
      userLatitude: parseFloat(dbUser.userLatitude),
      userLongitude: parseFloat(dbUser.userLongitude)
    };
  }
}
