/**
 * @project Eventos - Coordinadora
 * @file DeleteEvent.ts
 * @description Caso de uso para eliminar un evento por ID.
 * @verified SI
 * @status DONE
 * @unitTests SI
 * @unitTestsStatus PASSED
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Caso de uso para eliminar un evento por su ID.
 */

/** @import dependencias */
import {EventRepository} from "../interfaces/EventRepository";

/** @class DeleteEvent */
export class DeleteEvent {
  constructor(private eventRepository: EventRepository) {}

  /**
   * @method execute
   * @description Ejecuta la eliminación de un evento por su ID
   * @param {number} eventId - El ID del evento a eliminar
   * @returns {Promise<void>}
   */
  async execute(eventId: number): Promise<void> {
    await this.eventRepository.deleteEvent(eventId);
  }
}
