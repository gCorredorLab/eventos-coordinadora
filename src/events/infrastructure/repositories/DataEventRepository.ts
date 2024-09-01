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
 * Incluye funcionalidad para obtener eventos cercanos utilizando Mapbox.
 */

/** @import dependencias */
import {query} from "../../../common/config/postgres";
import {Event} from "../../domain/entities/Event";
import {Place} from "../../../places/domain/entities/Place";
import {EventRepository} from "../../application/interfaces/EventRepository";
import MapboxUtils from "../../../common/utils/MapboxUtils";

/** @class DataEventRepository */
export class DataEventRepository implements EventRepository {
  private mapboxUtils: MapboxUtils;

  constructor() {
    this.mapboxUtils = new MapboxUtils();
  }

  /**
   * @method createEvent
   * @description Crea un nuevo evento en la base de datos
   * @param {Event} event - El evento a crear
   * @returns {Promise<Event>} El evento creado con su ID asignado
   * @throws {Error} Si ocurre un error en la base de datos
   */
  async createEvent(event: Omit<Event, "eventId">): Promise<Event> {
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
    try {
      const result = await query('SELECT * FROM "events"');
      return result.rows.map(this.mapEventFromDatabase);
    } catch (error) {
      console.error("Error al obtener todos los eventos:", error);
      throw new Error("Ocurrió un error al obtener todos los eventos");
    }
  }

  /**
   * @method getEventById
   * @description Obtiene un evento por su ID
   * @param {number} eventId - El ID del evento a buscar
   * @returns {Promise<Event | null>} El evento encontrado o null si no existe
   */
  async getEventById(eventId: number): Promise<Event | null> {
    try {
      const result = await query('SELECT * FROM "events" WHERE "eventId" = $1', [eventId]);
      if (result.rows.length === 0) return null;
      return this.mapEventFromDatabase(result.rows[0]);
    } catch (error) {
      console.error(`Error al obtener el evento con ID ${eventId}:`, error);
      throw new Error(`Ocurrió un error al obtener el evento con ID ${eventId}`);
    }
  }

  /**
   * @method updateEvent
   * @description Actualiza un evento existente
   * @param {Event} event - El evento con los datos actualizados
   * @returns {Promise<Event>} El evento actualizado
   * @throws {Error} Si el evento no se encuentra
   */
  async updateEvent(event: Event): Promise<Event> {
    try {
      const result = await query(
        `UPDATE "events" SET "eventName" = $1, "eventDescription" = $2, "eventDate" = $3
         WHERE "eventId" = $4
         RETURNING *`,
        [event.eventName, event.eventDescription, event.eventDate, event.eventId]
      );
      if (result.rows.length === 0) throw new Error("Event not found");
      return this.mapEventFromDatabase(result.rows[0]);
    } catch (error) {
      console.error(`Error al actualizar el evento con ID ${event.eventId}:`, error);
      throw new Error(`Ocurrió un error al actualizar el evento con ID ${event.eventId}`);
    }
  }

  /**
   * @method deleteEvent
   * @description Elimina un evento de la base de datos
   * @param {number} eventId - El ID del evento a eliminar
   * @returns {Promise<void>}
   * @throws {Error} Si el evento no se encuentra
   */
  async deleteEvent(eventId: number): Promise<void> {
    try {
      const result = await query('DELETE FROM "events" WHERE "eventId" = $1', [eventId]);
      if (result.rowCount === 0) throw new Error("Event not found");
    } catch (error) {
      console.error(`Error al eliminar el evento con ID ${eventId}:`, error);
      throw new Error(`Ocurrió un error al eliminar el evento con ID ${eventId}`);
    }
  }

  /**
   * @method getAllEventNearby
   * @description Obtiene todos los eventos con sus ubicaciones cercanas
   * @param {number} range - El rango en metros para buscar ubicaciones cercanas
   * @param {number} [latitude] - Latitud opcional del punto de referencia
   * @param {number} [longitude] - Longitud opcional del punto de referencia
   * @returns {Promise<Array<{ event: Event, place: Place, nearbyLocations: any[] }>>}
   * @throws {Error} Si ocurre un error al obtener los eventos o las ubicaciones cercanas
   */
  async getAllEventNearby(
    range: number,
    latitude?: number,
    longitude?: number
  ): Promise<Array<{event: Event; place: Place; nearbyLocations: any[]}>> {
    try {
      const result = await query(`
        SELECT e.*, p.*
        FROM "events" e
        JOIN "places" p ON e."eventPlaceId" = p."placeId"
      `);

      const eventsWithPlaces = result.rows.map((row) => ({
        event: this.mapEventFromDatabase(row),
        place: this.mapPlaceFromDatabase(row)
      }));

      const eventsWithNearbyLocations = await Promise.all(
        eventsWithPlaces.map(async ({event, place}) => {
          const eventLatitude = place.placeLatitude;
          const eventLongitude = place.placeLongitude;
          const nearbyLocations = await this.mapboxUtils.getNearbyLocations(eventLatitude, eventLongitude, range);
          return {event, place, nearbyLocations};
        })
      );

      return eventsWithNearbyLocations;
    } catch (error) {
      console.error("Error al obtener eventos con ubicaciones cercanas:", error);
      throw new Error("Ocurrió un error al obtener eventos con ubicaciones cercanas");
    }
  }

  async getAttendanceByDayOfWeek(): Promise<Record<string, number>> {
    try {
      const result = await query(`
        SELECT
          EXTRACT(DOW FROM e."eventDate") as day_of_week,
          COUNT(r."registerId") as attendance
        FROM
          "events" e
        LEFT JOIN
          "registers" r ON e."eventId" = r."registerEventId"
        WHERE
          r."registerConfirmation" = true
        GROUP BY
          EXTRACT(DOW FROM e."eventDate")
        ORDER BY
          day_of_week
      `);

      const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const attendanceByDay = daysOfWeek.reduce(
        (acc, day) => {
          acc[day] = 0;
          return acc;
        },
        {} as Record<string, number>
      );

      result.rows.forEach((row) => {
        attendanceByDay[daysOfWeek[row.day_of_week]] = parseInt(row.attendance);
      });

      return attendanceByDay;
    } catch (error) {
      console.error("Error al calcular la asistencia por día de la semana:", error);
      throw new Error("Ocurrió un error al calcular la asistencia por día de la semana");
    }
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

  /**
   * @method mapPlaceFromDatabase
   * @description Mapea los datos del lugar desde la base de datos al modelo de la aplicación
   * @param {any} dbPlace - Los datos del lugar como vienen de la base de datos
   * @returns {Place} El lugar mapeado al modelo de la aplicación
   * @private
   */
  private mapPlaceFromDatabase(dbPlace: any): Place {
    return {
      placeId: dbPlace.placeId,
      placeUserCreateId: dbPlace.placeUserCreateId,
      placeName: dbPlace.placeName,
      placeDescription: dbPlace.placeDescription,
      placeEmail: dbPlace.placeEmail,
      placePhone: dbPlace.placePhone,
      placeAddress: dbPlace.placeAddress,
      placeLatitude: dbPlace.placeLatitude,
      placeLongitude: dbPlace.placeLongitude
    };
  }
}
