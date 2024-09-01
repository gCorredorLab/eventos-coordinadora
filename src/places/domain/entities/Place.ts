/**
 * @project Eventos - Coordinadora
 * @file Place.ts
 * @description Clase para entidad Place en el sistema
 * @verified SI
 * @status DONE
 * @unitTests SI
 * @unitTestsStatus PASSED
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Clase para la estructura de un lugar (Place).
 * Contiene información sobre el lugar, incluyendo su identificador, el usuario que lo creó.
 */

/** @class */
export class Place {
  /**
   * @constructor
   * @description Crea una instancia de la clase Place
   * @param {number | null} placeId - Identificador único del lugar.
   * @param {number} placeUserCreateId - Identificador del usuario que creó el lugar.
   * @param {string} placeName - Nombre del lugar.
   * @param {string | null} placeDescription - Descripción del lugar.
   * @param {string | null} placeEmail - Correo electrónico de contacto del lugar.
   * @param {string | null} placePhone - Número de teléfono del lugar.
   * @param {string | null} placeAddress - Dirección física del lugar.
   * @param {number} placeLatitude - Latitud geográfica del lugar.
   * @param {number} placeLongitude - Longitud geográfica del lugar.
   */
  constructor(
    public placeId: number | null,
    public placeUserCreateId: number,
    public placeName: string,
    public placeDescription: string | null,
    public placeEmail: string | null,
    public placePhone: string | null,
    public placeAddress: string | null,
    public placeLatitude: number,
    public placeLongitude: number
  ) {}
}

export type CreatePlaceDTO = Omit<Place, "placeId">;
