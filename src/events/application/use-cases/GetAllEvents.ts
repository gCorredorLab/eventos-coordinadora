/**
 * @project Eventos - Coordinadora
 * @file GetAllEvents.ts
 * @description Caso de uso para obtener todos los evento.
 * @verified SI
 * @status DONE
 * @unitTests SI
 * @unitTestsStatus PASSED
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Caso de uso para obtener todos los evento.
 */

/** @import dependencias */
import {Event} from "../../domain/entities/Event";
import {EventRepository} from "../interfaces/EventRepository";

/** @class GetAllEvents */
export class GetAllEvents {
  constructor(private eventRepository: EventRepository) {}

  /**
   * @method execute
   * @description Ejecuta la obtención de todos los eventos
   * @returns {Promise<User[]>} Un array con todos los eventos
   */
  async execute(): Promise<Event[]> {
    return this.eventRepository.getAllEvents();
  }
}
