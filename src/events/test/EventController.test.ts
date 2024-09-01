/**
 * @project Eventos - Coordinadora
 * @file EventController.test.ts
 * @description Pruebas unitarias para EventController
 * @verified NO
 * @status DEVELOP
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo contiene las pruebas unitarias para el EventController.
 * Se prueban todos los métodos del controlador, simulando las solicitudes y respuestas HTTP.
 */

import {EventController} from "../infrastructure/controllers/EventController";
import {CreateEvent} from "../application/use-cases/CreateEvent";
import {GetAllEvents} from "../application/use-cases/GetAllEvents";
import {GetEvent} from "../application/use-cases/GetEvent";
import {UpdateEvent} from "../application/use-cases/UpdateEvent";
import {DeleteEvent} from "../application/use-cases/DeleteEvent";
import {GetAllEventNearby} from "../application/use-cases/GetAllEventNearby";
import {Event} from "../domain/entities/Event";
import { Place } from '../../places/domain/entities/Place';
import {FastifyRequest, FastifyReply} from "fastify";
import { EventRepository } from '../application/interfaces/EventRepository';

// Definición de interfaces necesarias
interface EventParams {
  eventId: string;
}

interface NearbyQueryString {
  range?: string;
  latitude?: string;
  longitude?: string;
}

// Mock del EventRepository
const mockEventRepository: jest.Mocked<EventRepository> = {
  createEvent: jest.fn(),
  getAllEvents: jest.fn(),
  getEventById: jest.fn(),
  updateEvent: jest.fn(),
  deleteEvent: jest.fn(),
  getAllEventNearby: jest.fn(),
};

describe('EventController', () => {
  let eventController: EventController;
  let mockCreateEvent: CreateEvent;
  let mockGetAllEvents: GetAllEvents;
  let mockGetEvent: GetEvent;
  let mockUpdateEvent: UpdateEvent;
  let mockDeleteEvent: DeleteEvent;
  let mockGetAllEventNearby: GetAllEventNearby;

  beforeEach(() => {
    mockCreateEvent = new CreateEvent(mockEventRepository);
    mockGetAllEvents = new GetAllEvents(mockEventRepository);
    mockGetEvent = new GetEvent(mockEventRepository);
    mockUpdateEvent = new UpdateEvent(mockEventRepository);
    mockDeleteEvent = new DeleteEvent(mockEventRepository);
    mockGetAllEventNearby = new GetAllEventNearby(mockEventRepository);

    eventController = new EventController(
      mockCreateEvent,
      mockGetAllEvents,
      mockGetEvent,
      mockUpdateEvent,
      mockDeleteEvent,
      mockGetAllEventNearby
    );
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restaurar console.error después de cada prueba
    jest.restoreAllMocks();
  });

  describe('createEventHandler', () => {
    it('should create an event and return 201 status', async () => {
      const mockEvent: Event = {
        eventId: 1,
        eventName: 'Test Event',
        eventDescription: 'Test Description',
        eventDate: new Date(),
        eventUserCreateId: 1,
        eventPlaceId: 1
      };
      jest.spyOn(mockCreateEvent, 'execute').mockResolvedValue(mockEvent);

      const mockRequest = {
        body: { ...mockEvent, eventId: undefined }
      } as FastifyRequest;
      const mockReply = {
        code: jest.fn().mockReturnThis(),
        send: jest.fn()
      } as unknown as FastifyReply;

      await eventController.createEventHandler(mockRequest, mockReply);

      expect(mockReply.code).toHaveBeenCalledWith(201);
      expect(mockReply.send).toHaveBeenCalledWith(mockEvent);
    });

    it('should handle errors and return 500 status', async () => {
      jest.spyOn(mockCreateEvent, 'execute').mockRejectedValue(new Error('Database error'));

      const mockRequest = {
        body: {}
      } as FastifyRequest;
      const mockReply = {
        code: jest.fn().mockReturnThis(),
        send: jest.fn()
      } as unknown as FastifyReply;

      await eventController.createEventHandler(mockRequest, mockReply);

      expect(mockReply.code).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({ error: "Error al crear el evento" });
    });

    it('should handle errors and return 500 status', async () => {
      jest.spyOn(mockCreateEvent, 'execute').mockRejectedValue(new Error('Database error'));

      const mockRequest = {
        body: {}
      } as FastifyRequest;
      const mockReply = {
        code: jest.fn().mockReturnThis(),
        send: jest.fn()
      } as unknown as FastifyReply;

      await eventController.createEventHandler(mockRequest, mockReply);

      expect(console.error).toHaveBeenCalledWith("Error in createEventHandler:", expect.any(Error));
      expect(mockReply.code).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({ error: "Error al crear el evento" });
    });
  });

  describe('getAllEventsHandler', () => {
    it('should return all events', async () => {
      const mockEvents: Event[] = [
        { eventId: 1, eventName: 'Event 1', eventDescription: 'Desc 1', eventDate: new Date(), eventUserCreateId: 1, eventPlaceId: 1 },
        { eventId: 2, eventName: 'Event 2', eventDescription: 'Desc 2', eventDate: new Date(), eventUserCreateId: 2, eventPlaceId: 2 }
      ];
      jest.spyOn(mockGetAllEvents, 'execute').mockResolvedValue(mockEvents);

      const mockRequest = {} as FastifyRequest;
      const mockReply = {
        send: jest.fn()
      } as unknown as FastifyReply;

      await eventController.getAllEventsHandler(mockRequest, mockReply);

      expect(mockReply.send).toHaveBeenCalledWith(mockEvents);
    });

    it('should handle errors and return 500 status', async () => {
      jest.spyOn(mockGetAllEvents, 'execute').mockRejectedValue(new Error('Database error'));

      const mockRequest = {} as FastifyRequest;
      const mockReply = {
        code: jest.fn().mockReturnThis(),
        send: jest.fn()
      } as unknown as FastifyReply;

      await eventController.getAllEventsHandler(mockRequest, mockReply);

      expect(mockReply.code).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({ error: "Error al obtener los eventos" });
    });
  });

  describe('getEventHandler', () => {
    it('should return an event when it exists', async () => {
      const mockEvent: Event = {
        eventId: 1,
        eventName: 'Test Event',
        eventDescription: 'Test Description',
        eventDate: new Date(),
        eventUserCreateId: 1,
        eventPlaceId: 1
      };
      jest.spyOn(mockGetEvent, 'execute').mockResolvedValue(mockEvent);

      const mockRequest = {
        params: { eventId: '1' }
      } as unknown as FastifyRequest<{ Params: EventParams }>;
      const mockReply = {
        send: jest.fn()
      } as unknown as FastifyReply;

      await eventController.getEventHandler(mockRequest, mockReply);

      expect(mockReply.send).toHaveBeenCalledWith(mockEvent);
    });

    it('should return 404 when event does not exist', async () => {
      jest.spyOn(mockGetEvent, 'execute').mockResolvedValue(null);

      const mockRequest = {
        params: { eventId: '999' }
      } as unknown as FastifyRequest<{ Params: EventParams }>;
      const mockReply = {
        code: jest.fn().mockReturnThis(),
        send: jest.fn()
      } as unknown as FastifyReply;

      await eventController.getEventHandler(mockRequest, mockReply);

      expect(mockReply.code).toHaveBeenCalledWith(404);
      expect(mockReply.send).toHaveBeenCalledWith({ error: "Evento no encontrado" });
    });
  });

  describe('updateEventHandler', () => {
    it('should update an event and return it', async () => {
      const mockUpdatedEvent: Event = {
        eventId: 1,
        eventName: 'Updated Event',
        eventDescription: 'Updated Description',
        eventDate: new Date(),
        eventUserCreateId: 1,
        eventPlaceId: 1
      };
      jest.spyOn(mockUpdateEvent, 'execute').mockResolvedValue(mockUpdatedEvent);

      const mockRequest = {
        params: { eventId: '1' },
        body: { ...mockUpdatedEvent, eventId: undefined }
      } as unknown as FastifyRequest<{ Params: EventParams }>;
      const mockReply = {
        send: jest.fn()
      } as unknown as FastifyReply;

      await eventController.updateEventHandler(mockRequest, mockReply);

      expect(mockReply.send).toHaveBeenCalledWith(mockUpdatedEvent);
    });

    it('should handle errors and return 500 status', async () => {
      jest.spyOn(mockUpdateEvent, 'execute').mockRejectedValue(new Error('Database error'));

      const mockRequest = {
        params: { eventId: '1' },
        body: {}
      } as unknown as FastifyRequest<{ Params: EventParams }>;
      const mockReply = {
        code: jest.fn().mockReturnThis(),
        send: jest.fn()
      } as unknown as FastifyReply;

      await eventController.updateEventHandler(mockRequest, mockReply);

      expect(mockReply.code).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({ error: "Error al actualizar el evento" });
    });
  });

  describe('deleteEventHandler', () => {
    it('should delete an event and return 204 status', async () => {
      jest.spyOn(mockDeleteEvent, 'execute').mockResolvedValue();

      const mockRequest = {
        params: { eventId: '1' }
      } as unknown as FastifyRequest<{ Params: EventParams }>;
      const mockReply = {
        code: jest.fn().mockReturnThis(),
        send: jest.fn()
      } as unknown as FastifyReply;

      await eventController.deleteEventHandler(mockRequest, mockReply);

      expect(mockReply.code).toHaveBeenCalledWith(204);
      expect(mockReply.send).toHaveBeenCalled();
    });

    it('should handle errors and return 500 status', async () => {
      jest.spyOn(mockDeleteEvent, 'execute').mockRejectedValue(new Error('Database error'));

      const mockRequest = {
        params: { eventId: '1' }
      } as unknown as FastifyRequest<{ Params: EventParams }>;
      const mockReply = {
        code: jest.fn().mockReturnThis(),
        send: jest.fn()
      } as unknown as FastifyReply;

      await eventController.deleteEventHandler(mockRequest, mockReply);

      expect(mockReply.code).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({ error: "Error al eliminar el evento" });
    });
  });

  describe('getAllEventNearbyHandler', () => {
    it('should return nearby events', async () => {
      const mockNearbyEvents: Array<{ event: Event, place: Place, nearbyLocations: any[] }> = [{
        event: { eventId: 1, eventName: 'Nearby Event', eventDescription: 'Desc', eventDate: new Date(), eventUserCreateId: 1, eventPlaceId: 1 },
        place: { placeId: 1, placeName: 'Nearby Place', placeDescription: 'Desc', placeEmail: 'email@example.com', placePhone: '1234567890', placeAddress: 'Address', placeLatitude: 0, placeUserCreateId: 1, placeLongitude: 0 },
        nearbyLocations: []
      }];
      jest.spyOn(mockGetAllEventNearby, 'execute').mockResolvedValue(mockNearbyEvents);

      const mockRequest = {
        query: { range: '1000', latitude: '4.6097', longitude: '-74.0817' }
      } as unknown as FastifyRequest<{Querystring: NearbyQueryString}>;
      const mockReply = {
        send: jest.fn()
      } as unknown as FastifyReply;

      await eventController.getAllEventNearbyHandler(mockRequest, mockReply);

      expect(mockGetAllEventNearby.execute).toHaveBeenCalledWith(1000, 4.6097, -74.0817);
      expect(mockReply.send).toHaveBeenCalledWith(mockNearbyEvents);
    });

    it('should handle invalid range parameter', async () => {
      const mockRequest = {
        query: { range: 'invalid' }
      } as unknown as FastifyRequest<{Querystring: NearbyQueryString}>;
      const mockReply = {
        code: jest.fn().mockReturnThis(),
        send: jest.fn()
      } as unknown as FastifyReply;

      await eventController.getAllEventNearbyHandler(mockRequest, mockReply);

      expect(mockReply.code).toHaveBeenCalledWith(400);
      expect(mockReply.send).toHaveBeenCalledWith({ error: "El rango debe ser un número positivo" });
    });

    it('should handle errors and return 500 status', async () => {
      jest.spyOn(mockGetAllEventNearby, 'execute').mockRejectedValue(new Error('Database error'));

      const mockRequest = {
        query: { range: '1000', latitude: '4.6097', longitude: '-74.0817' }
      } as unknown as FastifyRequest<{Querystring: NearbyQueryString}>;
      const mockReply = {
        code: jest.fn().mockReturnThis(),
        send: jest.fn()
      } as unknown as FastifyReply;

      await eventController.getAllEventNearbyHandler(mockRequest, mockReply);

      expect(mockReply.code).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({ error: "Error al obtener los eventos con ubicaciones cercanas" });
    });
  });
});
