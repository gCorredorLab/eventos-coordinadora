/**
 * @project Eventos - Coordinadora
 * @file GetEvent.ts
 * @description Caso de uso para obtener un evento por ID.
 * @verified SI
 * @status DONE
 * @unitTests SI
 * @unitTestsStatus PASSED
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Caso de uso para obtener un evento por su ID.
 */

/** @import dependencias */
import {Event} from "../../domain/entities/Event";
import {EventRepository} from "../interfaces/EventRepository";

/** @class GetEvent */
export class GetEvent {
  constructor(private eventRepository: EventRepository) {}

  /**
   * @method execute
   * @description Ejecuta la obtención de un evento por su ID
   * @param {number} eventId - El ID del evento a obtener
   * @returns {Promise<Event | null>} El evento encontrado o null si no existe
   */
  async execute(eventId: number): Promise<Event | null> {
    return this.eventRepository.getEventById(eventId);
  }
}
