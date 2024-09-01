/**
 * @project Eventos - Coordinadora
 * @file EventController.ts
 * @description Controlador para manejar las solicitudes relacionadas con la entidad Event.
 * @verified SI
 * @status DONE
 * @unitTests SI
 * @unitTestsStatus PASSED
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este controlador maneja las solicitudes HTTP relacionadas con los eventos,
 * incluyendo la creación, obtención, actualización y eliminación de eventos,
 * así como la obtención de eventos cercanos a una ubicación específica.
 */

/** @import dependencias */
import { FastifyRequest, FastifyReply } from "fastify";
import { Event } from "../../domain/entities/Event";
import { CreateEvent } from "../../application/use-cases/CreateEvent";
import { GetAllEvents } from "../../application/use-cases/GetAllEvents";
import { GetEvent } from "../../application/use-cases/GetEvent";
import { UpdateEvent } from "../../application/use-cases/UpdateEvent";
import { DeleteEvent } from "../../application/use-cases/DeleteEvent";
import { GetAllEventNearby } from "../../application/use-cases/GetAllEventNearby";

/** Definición de tipos para los parámetros de las rutas */
interface EventParams {
  eventId: string;
}

interface NearbyQueryString {
  range?: string;
  latitude?: string;
  longitude?: string;
}

/** @class EventController */
export class EventController {
  constructor(
    private createEvent: CreateEvent,
    private getAllEvents: GetAllEvents,
    private getEvent: GetEvent,
    private updateEvent: UpdateEvent,
    private deleteEvent: DeleteEvent,
    private getAllEventNearby: GetAllEventNearby
  ) {}

  /**
   * @method createEventHandler
   * @description Maneja la creación de un nuevo evento
   * @param {FastifyRequest} request - La solicitud HTTP
   * @param {FastifyReply} reply - La respuesta HTTP
   * @returns {Promise<void>}
   */
  async createEventHandler(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const eventData = request.body as Omit<Event, "eventId">;
      const event = await this.createEvent.execute(eventData);
      reply.code(201).send(event);
    } catch (error) {
      console.error("Error in createEventHandler:", error);
      reply.code(500).send({ error: "Error al crear el evento" });
    }
  }

  /**
   * @method getAllEventsHandler
   * @description Maneja la obtención de todos los eventos
   * @param {FastifyRequest} request - La solicitud HTTP
   * @param {FastifyReply} reply - La respuesta HTTP
   * @returns {Promise<void>}
   */
  async getAllEventsHandler(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const events = await this.getAllEvents.execute();
      reply.send(events);
    } catch (error) {
      console.error("Error in getAllEventsHandler:", error);
      reply.code(500).send({ error: "Error al obtener los eventos" });
    }
  }

  /**
   * @method getEventHandler
   * @description Maneja la obtención de un evento por ID
   * @param {FastifyRequest<{Params: EventParams}>} request - La solicitud HTTP con los parámetros tipados
   * @param {FastifyReply} reply - La respuesta HTTP
   * @returns {Promise<void>}
   */
  async getEventHandler(request: FastifyRequest<{Params: EventParams}>, reply: FastifyReply): Promise<void> {
    try {
      const eventId = Number(request.params.eventId);
      const event = await this.getEvent.execute(eventId);
      if (event) {
        reply.send(event);
      } else {
        reply.code(404).send({ error: "Evento no encontrado" });
      }
    } catch (error) {
      console.error("Error in getEventHandler:", error);
      reply.code(500).send({ error: "Error al obtener el evento" });
    }
  }

  /**
   * @method updateEventHandler
   * @description Maneja la actualización de un evento existente
   * @param {FastifyRequest<{Params: EventParams}>} request - La solicitud HTTP con los parámetros tipados
   * @param {FastifyReply} reply - La respuesta HTTP
   * @returns {Promise<void>}
   */
  async updateEventHandler(request: FastifyRequest<{Params: EventParams}>, reply: FastifyReply): Promise<void> {
    try {
      const eventId = Number(request.params.eventId);
      const eventData = request.body as Omit<Event, "eventId">;
      const updatedEvent = await this.updateEvent.execute(eventId, eventData);
      reply.send(updatedEvent);
    } catch (error) {
      console.error("Error in updateEventHandler:", error);
      reply.code(500).send({ error: "Error al actualizar el evento" });
    }
  }

  /**
   * @method deleteEventHandler
   * @description Maneja la eliminación de un evento por ID
   * @param {FastifyRequest<{Params: EventParams}>} request - La solicitud HTTP con los parámetros tipados
   * @param {FastifyReply} reply - La respuesta HTTP
   * @returns {Promise<void>}
   */
  async deleteEventHandler(request: FastifyRequest<{Params: EventParams}>, reply: FastifyReply): Promise<void> {
    try {
      const eventId = Number(request.params.eventId);
      await this.deleteEvent.execute(eventId);
      reply.code(204).send();
    } catch (error) {
      console.error("Error in deleteEventHandler:", error);
      reply.code(500).send({ error: "Error al eliminar el evento" });
    }
  }

  /**
   * @method getAllEventNearbyHandler
   * @description Maneja la obtención de todos los eventos con ubicaciones cercanas
   * @param {FastifyRequest<{Querystring: NearbyQueryString}>} request - La solicitud HTTP con los parámetros de consulta tipados
   * @param {FastifyReply} reply - La respuesta HTTP
   * @returns {Promise<void>}
   */
  async getAllEventNearbyHandler(
    request: FastifyRequest<{Querystring: NearbyQueryString}>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const { range: rangeStr, latitude: latStr, longitude: lonStr } = request.query;
      let range: number = 1000; // Default value
      let latitude: number | undefined;
      let longitude: number | undefined;

      if (rangeStr) {
        range = Number(rangeStr);
        if (isNaN(range) || range <= 0) {
          reply.code(400).send({ error: "El rango debe ser un número positivo" });
          return;
        }
      }

      if (latStr && lonStr) {
        latitude = Number(latStr);
        longitude = Number(lonStr);
        if (isNaN(latitude) || isNaN(longitude)) {
          reply.code(400).send({ error: "La latitud y longitud deben ser números válidos" });
          return;
        }
      }

      const eventsWithNearbyLocations = await this.getAllEventNearby.execute(range, latitude, longitude);
      reply.send(eventsWithNearbyLocations);
    } catch (error) {
      console.error("Error in getAllEventNearbyHandler:", error);
      reply.code(500).send({ error: "Error al obtener los eventos con ubicaciones cercanas" });
    }
  }
}
