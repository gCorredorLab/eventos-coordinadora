/**
 * @project Eventos - Coordinadora
 * @file GetAllEventNearby.ts
 * @description Caso de uso para obtener todos los eventos con ubicaciones cercanas.
 * @verified NO
 * @status DEVELOP
 * @unitTests NO
 * @unitTestsStatus PENDING
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Caso de uso para obtener todos los eventos con sus ubicaciones cercanas.
 * Permite especificar un punto de referencia opcional para la búsqueda.
 */

/** @import dependencias */
import { Event } from "../../domain/entities/Event";
import { Place } from "../../../places/domain/entities/Place";
import { EventRepository } from "../interfaces/EventRepository";

/** @class GetAllEventNearby */
export class GetAllEventNearby {
  constructor(private eventRepository: EventRepository) {}

  /**
   * @method execute
   * @description Ejecuta la obtención de todos los eventos con ubicaciones cercanas
   * @param {number} range - El rango en metros para buscar ubicaciones cercanas
   * @param {number} [latitude] - Latitud opcional del punto de referencia para la búsqueda
   * @param {number} [longitude] - Longitud opcional del punto de referencia para la búsqueda
   * @returns {Promise<Array<{ event: Event, place: Place, nearbyLocations: any[] }>>}
   *          Un array con todos los eventos, sus lugares y ubicaciones cercanas
   */
  async execute(range: number, latitude?: number, longitude?: number): Promise<Array<{ event: Event, place: Place, nearbyLocations: any[] }>> {
    return this.eventRepository.getAllEventNearby(range, latitude, longitude);
  }
}
