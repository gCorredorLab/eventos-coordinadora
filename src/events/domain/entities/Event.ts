/**
 * @project Eventos - Coordinadora
 * @file Event.ts
 * @description Clase para entidad Event en el sistema.
 * @verified SI
 * @status DONE
 * @unitTests SI
 * @unitTestsStatus PASSED
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Clase para la estructura de un (event).
 * Contiene información sobre el evento, incluyendo su identificador, el usuario que lo creó, el lugar donde
 * se realiza, nombre, descripción y fecha del evento.
 */

/** @class Event */
export class Event {
  /**
   * @constructor
   * @description Crea una nueva instancia de la clase Event.
   * @param {number | null} eventId - Identificador único del evento.
   * @param {number} eventUserCreateId - Identificador del usuario que creó el evento.
   * @param {number} eventPlaceId - Identificador del lugar donde se realiza el evento.
   * @param {string} eventName - Nombre del evento.
   * @param {string | null} eventDescription - Descripción del evento.
   * @param {Date} eventDate - Fecha y hora en la que se llevará a cabo el evento.
   */
  constructor(
    public eventId: number | null,
    public eventUserCreateId: number,
    public eventPlaceId: number,
    public eventName: string,
    public eventDescription: string | null,
    public eventDate: Date
  ) {}
}
