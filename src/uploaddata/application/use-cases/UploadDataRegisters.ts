/**
 * @project Eventos - Coordinadora
 * @file UploadDataRegisters.ts
 * @description Caso de uso para realizar la carga masiva de registros.
 * @verified NO
 * @status DEVELOP
 * @unitTests NO
 * @unitTestsStatus PENDING
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Caso de uso para realizar la carga masiva de registros desde un archivo Excel.
 */

/** @import librerias */
import {Readable} from "stream";

/** @import dependencias */
import {IUploadDataService} from "../interfaces/IUploadDataService";
import {UploadDataResult} from "../../domain/entities/UploadDataResult";

/** @class UploadDataRegisters */
export class UploadDataRegisters {
  constructor(private bulkUploadService: IUploadDataService) {}

  /**
   * @method execute
   * @description Ejecuta la carga masiva de registros desde un archivo Excel
   * @param {Readable} file - El stream del archivo Excel a procesar
   * @returns {Promise<UploadDataResult>} El resultado de la operación de carga masiva
   */
  async execute(file: Readable): Promise<UploadDataResult> {
    const data = await this.bulkUploadService.processExcelFile(file);
    return this.bulkUploadService.uploadRegisters(data);
  }
}
