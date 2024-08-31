/**
 * @project Eventos - Coordinadora
 * @file UpdateEvent.ts
 * @description Caso de uso para actualizar un evento existente.
 * @verified SI
 * @status DONE
 * @unitTests NO
 * @unitTestsStatus DEVELOP
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Caso de uso para actualizar los datos de un evento.
 */

/** @import dependencias */
import {Event} from "../../domain/entities/Event";
import {EventRepository} from "../interfaces/EventRepository";

/** @class UpdateEvent */
export class UpdateEvent {
  constructor(private eventRepository: EventRepository) {}

  /**
   * @method execute
   * @description Ejecuta la actualización de un evento existente
   * @param {number} eventId - El ID del evento a actualizar
   * @param {Omit<Event, "eventId">} eventData - Los nuevos datos del evento
   * @returns {Promise<Event>} El evento actualizado
   */
  async execute(eventId: number, eventData: Omit<Event, "eventId">): Promise<Event> {
    const event = new Event(
      eventId,
      eventData.eventUserCreateId,
      eventData.eventPlaceId,
      eventData.eventName,
      eventData.eventDescription,
      eventData.eventDate
    );
    return this.eventRepository.updateEvent(event);
  }
}
