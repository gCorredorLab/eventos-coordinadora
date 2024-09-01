/**
 * @project Eventos - Coordinadora
 * @file CreateEvent.ts
 * @description Caso de uso para crear un nuevo evento.
 * @verified SI
 * @status DONE
 * @unitTests SI
 * @unitTestsStatus PASSED
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Caso de uso para crear un nuevo evento.
 */

/** @import dependencias */
import {Event} from "../../domain/entities/Event";
import {EventRepository} from "../interfaces/EventRepository";

/** @class CreateEvent */
export class CreateEvent {
  constructor(private eventRepository: EventRepository) {}

  /**
   * @method execute
   * @description Ejecuta la creación de un nuevo evento
   * @param {Omit<Event, "eventId">} eventData - Los datos del evento a crear, sin el ID
   * @returns {Promise<Event>} El evento creado
   */
  async execute(eventData: Omit<Event, "eventId">): Promise<Event> {
    const event = new Event(
      null,
      eventData.eventUserCreateId,
      eventData.eventPlaceId,
      eventData.eventName,
      eventData.eventDescription,
      eventData.eventDate
    );
    return this.eventRepository.createEvent(event);
  }
}
