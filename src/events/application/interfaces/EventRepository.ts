/**
 * @project Eventos - Coordinadora
 * @file EventRepository.ts
 * @description Interfaz que define las operaciones de repositorio para la entidad Event
 * @verified SI
 * @status DONE
 * @unitTests NO
 * @unitTestsStatus DEVELOP
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 */

/** @import entidades */
import {Event} from "../../domain/entities/Event";

/** @interface */
export interface EventRepository {
  /**
   * @method createEvent
   * @description Crea un nuevo evento en el sistema
   * @param {Event} event - El evento a crear
   * @returns {Promise<Event>} El evento creado con su ID asignado
   */
  createEvent(event: Event): Promise<Event>;

  /**
   * @method getAllEvents
   * @description Obtiene todos los eventos del sistema
   * @returns {Promise<Event[]>} Una lista con todos los eventos
   */
  getAllEvents(): Promise<Event[]>;

  /**
   * @method getEventById
   * @description Obtiene un evento por su ID
   * @param {number} eventId - El ID del evento a buscar
   * @returns {Promise<Event | null>} El evento encontrado o null si no existe
   */
  getEventById(eventId: number): Promise<Event | null>;

  /**
   * @method updateEvent
   * @description Actualiza un evento existente
   * @param {Event} event - El evento con los datos actualizados
   * @returns {Promise<Event>} El evento actualizado
   */
  updateEvent(event: Event): Promise<Event>;

  /**
   * @method deleteEvent
   * @description Elimina un evento del sistema
   * @param {number} eventId - El ID del evento a eliminar
   * @returns {Promise<void>}
   */
  deleteEvent(eventId: number): Promise<void>;
}
