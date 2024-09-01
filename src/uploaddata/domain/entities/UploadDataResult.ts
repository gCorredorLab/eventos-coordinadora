/**
 * @project Eventos - Coordinadora
 * @file UploadDataResult.ts
 * @description Interfaz para el resultado de una operación de carga masiva.
 * @verified NO
 * @status DEVELOP
 * @unitTests NO
 * @unitTestsStatus PENDING
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Esta interfaz define la estructura del resultado de una operación de carga masiva,
 * incluyendo el conteo de éxitos, fallos y los errores encontrados durante el proceso.
 */

/** @interface UploadDataResult */
export interface UploadDataResult {
  /**
   * @property successCount
   * @description Número de registros que se cargaron exitosamente.
   * @type {number}
   */
  successCount: number;

  /**
   * @property failureCount
   * @description Número de registros que fallaron durante la carga.
   * @type {number}
   */
  failureCount: number;

  /**
   * @property errors
   * @description Array de mensajes de error para los registros que fallaron.
   * @type {string[]}
   */
  errors: string[];
}
