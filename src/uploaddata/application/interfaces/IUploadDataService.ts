/**
 * @project Eventos - Coordinadora
 * @file IUploadDataService.ts
 * @description Interfaz que define las operaciones para el servicio de carga masiva
 * @verified NO
 * @status DEVELOP
 * @unitTests NO
 * @unitTestsStatus PENDING
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 */

/** @import librerias */
import {Readable} from "stream";

/** @import dependencias */
import {UploadDataResult} from "../../domain/entities/UploadDataResult";

/** @interface */
export interface IUploadDataService {
  /**
   * @method processExcelFile
   * @description Procesa un archivo Excel y lo convierte en un array de objetos
   * @param {Readable} file - El stream del archivo Excel a procesar
   * @returns {Promise<any[]>} Un array de objetos representando las filas del Excel
   */
  processExcelFile(file: Readable): Promise<any[]>;

  /**
   * @method uploadUsers
   * @description Realiza la carga masiva de usuarios
   * @param {any[]} data - Los datos de usuarios a cargar
   * @returns {Promise<UploadDataResult>} El resultado de la operación de carga masiva
   */
  uploadUsers(data: any[]): Promise<UploadDataResult>;

  /**
   * @method uploadPlaces
   * @description Realiza la carga masiva de lugares
   * @param {any[]} data - Los datos de lugares a cargar
   * @returns {Promise<UploadDataResult>} El resultado de la operación de carga masiva
   */
  uploadPlaces(data: any[]): Promise<UploadDataResult>;

  /**
   * @method uploadEvents
   * @description Realiza la carga masiva de eventos
   * @param {any[]} data - Los datos de eventos a cargar
   * @returns {Promise<UploadDataResult>} El resultado de la operación de carga masiva
   */
  uploadEvents(data: any[]): Promise<UploadDataResult>;

  /**
   * @method uploadRegisters
   * @description Realiza la carga masiva de registros
   * @param {any[]} data - Los datos de registros a cargar
   * @returns {Promise<UploadDataResult>} El resultado de la operación de carga masiva
   */
  uploadRegisters(data: any[]): Promise<UploadDataResult>;

  /**
   * @method uploadPlacesAndEvents
   * @description Realiza la carga masiva de lugares y eventos simultáneamente
   * @param {any[]} data - Los datos combinados de lugares y eventos a cargar
   * @returns {Promise<UploadDataResult>} El resultado de la operación de carga masiva
   */
  uploadPlacesAndEvents(data: any[]): Promise<UploadDataResult>;
}
