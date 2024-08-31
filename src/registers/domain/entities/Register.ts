/**
 * @project Eventos - Coordinadora
 * @file Register.ts
 * @description Clase para entidad Register en el sistema
 * @verified SI
 * @status DONE
 * @unitTests NO
 * @unitTestsStatus DEVELOP
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Clase para la estructura de un registro (Register).
 * Contiene información para las inscripciones de usuarios a eventos específicos.
 */

/** @class */
export class Register {
  /**
   * @constructor
   * @description Crea una instancia de la clase Register
   * @param {number | null} registerId - Identificador único del registro.
   * @param {number} registerUserId - Identificador del usuario que se registra al evento.
   * @param {number} registerEventId - Identificador del evento al que el usuario se registra.
   * @param {Date} registerDate - Fecha y hora del registro.
   * @param {boolean} registerConfirmation - Indica si el registro ha sido confirmado.
   */
  constructor(
    public registerId: number | null,
    public registerUserId: number,
    public registerEventId: number,
    public registerDate: Date,
    public registerConfirmation: boolean
  ) {}
}
