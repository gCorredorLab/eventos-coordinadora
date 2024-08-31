/**
 * @project Eventos - Coordinadora
 * @file User.ts
 * @description Clase para entidad User en el sistema.
 * @verified SI
 * @status DONE
 * @unitTests NO
 * @unitTestsStatus DEVELOP
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Clase para la estructura de un usuario (User).
 * Contiene información personal del usuario, incluyendo su identificador, nombre, apellido, correo electrónico,
 * contraseña y ubicación geográfica.
 */

/** @class User */
export class User {
  /**
   * @constructor
   * @description Crea una nueva instancia de la clase User.
   * @param {number | null} userId - Identificador único del usuario.
   * @param {string} userName - Nombre del usuario.
   * @param {string} userLastname - Apellido del usuario.
   * @param {string} userEmail - Correo electrónico del usuario.
   * @param {string} password - Contraseña del usuario
   * @param {number} userLatitude - Latitud de la ubicación geográfica del usuario.
   * @param {number} userLongitude - Longitud de la ubicación geográfica del usuario.
   */
  constructor(
    public userId: number | null,
    public userName: string,
    public userLastname: string,
    public userEmail: string,
    public password: string,
    public userLatitude: number,
    public userLongitude: number
  ) {}
}
