/**
 * @project Eventos - Coordinadora
 * @file PostgresEventRepository.ts
 * @description Implementación de DataEventRepository para PostgreSQL
 * @verified SI
 * @status DONE
 * @unitTests NO
 * @unitTestsStatus DEVELOP
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo implementa la interfaz EventRepository utilizando PostgreSQL como base de datos.
 * Utiliza la función `query` del módulo de configuración de postgres para ejecutar las consultas.
 */

/** @import dependencias */
import {query} from "../../../common/config/postgres";
import {Event} from "../../domain/entities/Event";
import {EventRepository} from "../../application/interfaces/EventRepository";

/** @class DataEventRepository */
export class DataEventRepository implements EventRepository {
  /**
   * @method createEvent
   * @description Crea un nuevo evento en la base de datos
   * @param {Event} event - El evento a crear
   * @returns {Promise<Event>} El evento creado con su ID asignado
   * @throws {Error} Si ocurre un error en la base de datos
   */
  async createEvent(event: Event): Promise<Event> {
    try {
      const result = await query(
        `INSERT INTO "events" ("eventUserCreateId", "eventPlaceId", "eventName", "eventDescription", "eventDate")
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [event.eventUserCreateId, event.eventPlaceId, event.eventName, event.eventDescription, event.eventDate]
      );

      return this.mapEventFromDatabase(result.rows[0]);
    } catch (error: any) {
      console.error("Error al crear el evento:", error);
      throw new Error("Ocurrió un error al crear el evento");
    }
  }

  /**
   * @method getAllEvents
   * @description Obtiene todos los eventos de la base de datos
   * @returns {Promise<Event[]>} Un array con todos los eventos
   */
  async getAllEvents(): Promise<Event[]> {
    const result = await query('SELECT * FROM "events"');
    return result.rows.map(this.mapEventFromDatabase);
  }

  /**
   * @method getEventById
   * @description Obtiene un evento por su ID
   * @param {number} eventId - El ID del evento a buscar
   * @returns {Promise<Event | null>} El evento encontrado o null si no existe
   */
  async getEventById(eventId: number): Promise<Event | null> {
    const result = await query('SELECT * FROM "events" WHERE "eventId" = $1', [eventId]);
    if (result.rows.length === 0) return null;
    return this.mapEventFromDatabase(result.rows[0]);
  }

  /**
   * @method updateEvent
   * @description Actualiza un evento existente
   * @param {Event} event - El evento con los datos actualizados
   * @returns {Promise<Event>} El evento actualizado
   * @throws {Error} Si el evento no se encuentra
   */
  async updateEvent(event: Event): Promise<Event> {
    const result = await query(
      `UPDATE "events" SET "eventName" = $1, "eventDescription" = $2, "eventDate" = $3
       WHERE "eventId" = $4
       RETURNING *`,
      [event.eventName, event.eventDescription, event.eventDate, event.eventId]
    );
    if (result.rows.length === 0) throw new Error("Event not found");
    return this.mapEventFromDatabase(result.rows[0]);
  }

  /**
   * @method deleteEvent
   * @description Elimina un evento de la base de datos
   * @param {number} eventId - El ID del evento a eliminar
   * @returns {Promise<void>}
   * @throws {Error} Si el evento no se encuentra
   */
  async deleteEvent(eventId: number): Promise<void> {
    const result = await query('DELETE FROM "events" WHERE "eventId" = $1', [eventId]);
    if (result.rowCount === 0) throw new Error("Event not found");
  }

  /**
   * @method mapEventFromDatabase
   * @description Mapea los datos del evento desde la base de datos al modelo de la aplicación
   * @param {any} dbEvent - Los datos del evento como vienen de la base de datos
   * @returns {Event} El evento mapeado al modelo de la aplicación
   * @private
   */
  private mapEventFromDatabase(dbEvent: any): Event {
    return {
      eventId: dbEvent.eventId,
      eventUserCreateId: dbEvent.eventUserCreateId,
      eventPlaceId: dbEvent.eventPlaceId,
      eventName: dbEvent.eventName,
      eventDescription: dbEvent.eventDescription,
      eventDate: new Date(dbEvent.eventDate)
    };
  }
}
