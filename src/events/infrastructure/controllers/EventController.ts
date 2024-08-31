/**
 * @project Eventos - Coordinadora
 * @file EventController.ts
 * @description Controlador para manejar las solicitudes relacionadas con la entidad Event.
 * @verified SI
 * @status DONE
 * @created 29/8/2024
 * @note
 *
 * Este controlador maneja las solicitudes HTTP relacionadas con los eventos,
 * incluyendo la creación, obtención, actualización y eliminación de eventos.
 */

/** @import dependencias */
import {FastifyRequest, FastifyReply} from "fastify";
import {Event} from "../../domain/entities/Event";
import {CreateEvent} from "../../application/use-cases/CreateEvent";
import {GetAllEvents} from "../../application/use-cases/GetAllEvents";
import {GetEvent} from "../../application/use-cases/GetEvent";
import {UpdateEvent} from "../../application/use-cases/UpdateEvent";
import {DeleteEvent} from "../../application/use-cases/DeleteEvent";

/** Definición de tipos para los parámetros de las rutas */
interface EventParams {
  eventId: string;
}

/** @class EventController */
export class EventController {
  constructor(
    private createEvent: CreateEvent,
    private getAllEvents: GetAllEvents,
    private getEvent: GetEvent,
    private updateEvent: UpdateEvent,
    private deleteEvent: DeleteEvent
  ) {}

  /**
   * @method createEventHandler
   * @description Maneja la creación de un nuevo evento
   * @param {FastifyRequest} req - La solicitud HTTP
   * @param {FastifyReply} reply - La respuesta HTTP
   * @returns {Promise<void>}
   */
  async createEventHandler(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const eventData = req.body as Omit<Event, "eventId">;
      const event = await this.createEvent.execute(eventData);
      reply.code(201).send(event);
    } catch (error) {
      reply.code(500).send({error: "Error al crear el evento"});
    }
  }

  /**
   * @method getAllEventHandler
   * @description Maneja la obtención de todos los eventos
   * @param {FastifyRequest} req - La solicitud HTTP
   * @param {FastifyReply} reply - La respuesta HTTP
   * @returns {Promise<void>}
   */
  async getAllEventsHandler(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const events = await this.getAllEvents.execute();
      reply.send(events);
    } catch (error) {
      reply.code(500).send({error: "Error al obtener los eventos"});
    }
  }

  /**
   * @method getEventHandler
   * @description Maneja la obtención de un evento por ID
   * @param {FastifyRequest<{Params: EventParams}>} req - La solicitud HTTP con los parámetros tipados
   * @param {FastifyReply} reply - La respuesta HTTP
   * @returns {Promise<void>}
   */
  async getEventHandler(req: FastifyRequest<{Params: EventParams}>, reply: FastifyReply): Promise<void> {
    try {
      const eventId = Number(req.params.eventId);
      const event = await this.getEvent.execute(eventId);
      if (event) {
        reply.send(event);
      } else {
        reply.code(404).send({error: "Evento no encontrado"});
      }
    } catch (error) {
      reply.code(500).send({error: "Error al obtener el evento"});
    }
  }

  /**
   * @method updateEventHandler
   * @description Maneja la actualización de un evento existente
   * @param {FastifyRequest<{Params: EventParams}>} req - La solicitud HTTP con los parámetros tipados
   * @param {FastifyReply} reply - La respuesta HTTP
   * @returns {Promise<void>}
   */
  async updateEventHandler(req: FastifyRequest<{Params: EventParams}>, reply: FastifyReply): Promise<void> {
    try {
      const eventId = Number(req.params.eventId);
      const eventData = req.body as Omit<Event, "eventId">;
      const updatedEvent = await this.updateEvent.execute(eventId, eventData);
      reply.send(updatedEvent);
    } catch (error) {
      reply.code(500).send({error: "Error al actualizar el evento"});
    }
  }

  /**
   * @method deleteEventHandler
   * @description Maneja la eliminación de un evento por ID
   * @param {FastifyRequest<{Params: EventParams}>} req - La solicitud HTTP con los parámetros tipados
   * @param {FastifyReply} reply - La respuesta HTTP
   * @returns {Promise<void>}
   */
  async deleteEventHandler(req: FastifyRequest<{Params: EventParams}>, reply: FastifyReply): Promise<void> {
    try {
      const eventId = Number(req.params.eventId);
      await this.deleteEvent.execute(eventId);
      reply.code(204).send();
    } catch (error) {
      reply.code(500).send({error: "Error al eliminar el evento"});
    }
  }
}
