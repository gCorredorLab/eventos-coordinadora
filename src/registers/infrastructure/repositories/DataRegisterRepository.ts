/**
 * @project Eventos - Coordinadora
 * @file PostgresRegisterRepository.ts
 * @description Implementación de DataRegisterRepository para PostgreSQL
 * @verified SI
 * @status DONE
 * @unitTests NO
 * @unitTestsStatus DEVELOP
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo implementa la interfaz RegisterRepository utilizando PostgreSQL como base de datos.
 * Utiliza la función `query` del módulo de configuración de postgres para ejecutar las consultas.
 */

/** @import dependencias */
import {query} from "../../../common/config/postgres";
import {Register} from "../../domain/entities/Register";
import {RegisterRepository} from "../../application/interfaces/RegisterRepository";

/** @class DataRegisterRepository */
export class DataRegisterRepository implements RegisterRepository {
  /**
   * @method createRegister
   * @description Crea un nuevo registro en la base de datos
   * @param {Register} register - El registro a crear
   * @returns {Promise<Register>} El registro creado con su ID asignado
   * @throws {Error} Si ocurre un error en la base de datos
   */
  async createRegister(register: Omit<Register, "registerId">): Promise<Register> {
    try {
      const result = await query(
        `INSERT INTO "registers" ("registerUserId", "registerEventId", "registerDate", "registerConfirmation")
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [register.registerUserId, register.registerEventId, register.registerDate, register.registerConfirmation]
      );

      return this.mapRegisterFromDatabase(result.rows[0]);
    } catch (error: any) {
      console.error("Error al crear el registro:", error);
      throw new Error("Ocurrió un error al crear el registro");
    }
  }

  /**
   * @method getAllRegisters
   * @description Obtiene todos los registros de la base de datos
   * @returns {Promise<Register[]>} Un array con todos los registros
   */
  async getAllRegisters(): Promise<Register[]> {
    const result = await query('SELECT * FROM "registers"');
    return result.rows.map(this.mapRegisterFromDatabase);
  }

  /**
   * @method getRegisterById
   * @description Obtiene un registro por su ID
   * @param {number} registerId - El ID del registro a buscar
   * @returns {Promise<Register | null>} El registro encontrado o null si no existe
   */
  async getRegisterById(registerId: number): Promise<Register | null> {
    const result = await query('SELECT * FROM "registers" WHERE "registerId" = $1', [registerId]);
    if (result.rows.length === 0) return null;
    return this.mapRegisterFromDatabase(result.rows[0]);
  }

  /**
   * @method updateRegister
   * @description Actualiza un registro existente
   * @param {Register} register - El registro con los datos actualizados
   * @returns {Promise<Register>} El registro actualizado
   * @throws {Error} Si el registro no se encuentra
   */
  async updateRegister(register: Register): Promise<Register> {
    const result = await query(
      `UPDATE "registers" SET "registerDate" = $1, "registerConfirmation" = $2
       WHERE "registerId" = $3
       RETURNING *`,
      [register.registerDate, register.registerConfirmation, register.registerId]
    );
    if (result.rows.length === 0) throw new Error("Register not found");
    return this.mapRegisterFromDatabase(result.rows[0]);
  }

  /**
   * @method deleteRegister
   * @description Elimina un registro de la base de datos
   * @param {number} registerId - El ID del registro a eliminar
   * @returns {Promise<void>}
   * @throws {Error} Si el registro no se encuentra
   */
  async deleteRegister(registerId: number): Promise<void> {
    const result = await query('DELETE FROM "registers" WHERE "registerId" = $1', [registerId]);
    if (result.rowCount === 0) throw new Error("Register not found");
  }

  /**
   * @method mapRegisterFromDatabase
   * @description Mapea los datos del registro desde la base de datos al modelo de la aplicación
   * @param {any} dbRegister - Los datos del registro como vienen de la base de datos
   * @returns {Register} El registro mapeado al modelo de la aplicación
   * @private
   */
  private mapRegisterFromDatabase(dbRegister: any): Register {
    return {
      registerId: dbRegister.registerId,
      registerUserId: dbRegister.registerUserId,
      registerEventId: dbRegister.registerEventId,
      registerDate: new Date(dbRegister.registerDate),
      registerConfirmation: dbRegister.registerConfirmation
    };
  }
}
