/**
 * @project Eventos - Coordinadora
 * @file RegisterRepository.ts
 * @description Interfaz que define las operaciones de repositorio para la entidad Register
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
import {Register} from "../../domain/entities/Register";

/** @interface */
export interface RegisterRepository {
  /**
   * @method createRegister
   * @description Crea un nuevo registro en el sistema
   * @param {Register} register - El registro a crear
   * @returns {Promise<Register>} El registro creado con su ID asignado
   */
  createRegister(register: Register): Promise<Register>;

  /**
   * @method getAllRegisters
   * @description Obtiene todos los registros del sistema
   * @returns {Promise<Register[]>} Una lista con todos los registros
   */
  getAllRegisters(): Promise<Register[]>;

  /**
   * @method getRegisterById
   * @description Obtiene un registro por su ID
   * @param {number} registerId - El ID del registro a buscar
   * @returns {Promise<Register | null>} El registro encontrado o null si no existe
   */
  getRegisterById(registerId: number): Promise<Register | null>;

  /**
   * @method updateRegister
   * @description Actualiza un registro existente
   * @param {Register} register - El registro con los datos actualizados
   * @returns {Promise<Register>} El registro actualizado
   */
  updateRegister(register: Register): Promise<Register>;

  /**
   * @method deleteRegister
   * @description Elimina un registro del sistema
   * @param {number} registerId - El ID del registro a eliminar
   * @returns {Promise<void>}
   */
  deleteRegister(registerId: number): Promise<void>;
}
