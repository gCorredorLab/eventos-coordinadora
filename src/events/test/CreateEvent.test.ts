/**
 * @project Eventos - Coordinadora
 * @file CreateEvent.test.ts
 * @description Pruebas unitarias para el caso de uso CreateEvent
 * @verified SI
 * @status DONE
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo contiene las pruebas unitarias para el caso de uso CreateEvent.
 * Se prueban diferentes escenarios de creación de eventos y el manejo de errores.
 */

/** @import dependencias */
import {CreateEvent} from "../application/use-cases/CreateEvent";
import {Event} from "../domain/entities/Event";
import {EventRepository} from "../application/interfaces/EventRepository";
import {Place} from "../../places/domain/entities/Place";

/** Implementación mock del EventRepository */
class MockEventRepository implements EventRepository {
  private events: Event[] = [];

  async createEvent(event: Event): Promise<Event> {
    const newEvent = {...event, eventId: this.events.length + 1};
    this.events.push(newEvent);
    return newEvent;
  }

  async getAllEvents(): Promise<Event[]> {
    return this.events;
  }

  async getEventById(eventId: number): Promise<Event | null> {
    return this.events.find((event) => event.eventId === eventId) || null;
  }

  async updateEvent(event: Event): Promise<Event> {
    const index = this.events.findIndex((e) => e.eventId === event.eventId);
    if (index !== -1) {
      this.events[index] = event;
      return event;
    }
    throw new Error("Event not found");
  }

  async deleteEvent(eventId: number): Promise<void> {
    const index = this.events.findIndex((event) => event.eventId === eventId);
    if (index !== -1) {
      this.events.splice(index, 1);
    }
  }

  async getAllEventNearby(
    range: number,
    latitude?: number,
    longitude?: number
  ): Promise<Array<{event: Event; place: Place; nearbyLocations: any[]}>> {
    // Para este mock, simplemente devolveremos un array vacío
    // En una implementación real, esto buscaría eventos cercanos basados en los parámetros
    return [];
  }
}

describe("CreateEvent", () => {
  let createEvent: CreateEvent;
  let mockEventRepository: EventRepository;

  beforeEach(() => {
    mockEventRepository = new MockEventRepository();
    createEvent = new CreateEvent(mockEventRepository);
  });

  /**
   * @test Creación exitosa de un nuevo evento
   * @description Verifica que se pueda crear un nuevo evento con todos los campos requeridos
   */
  it("should create a new event successfully", async () => {
    const eventData = {
      eventUserCreateId: 1,
      eventPlaceId: 1,
      eventName: "Concierto de Rock",
      eventDescription: "Un gran concierto de rock en vivo",
      eventDate: new Date("2024-12-31T20:00:00")
    };

    const createdEvent = await createEvent.execute(eventData);

    expect(createdEvent).toBeDefined();
    expect(createdEvent.eventId).toBeDefined();
    expect(createdEvent.eventUserCreateId).toBe(eventData.eventUserCreateId);
    expect(createdEvent.eventPlaceId).toBe(eventData.eventPlaceId);
    expect(createdEvent.eventName).toBe(eventData.eventName);
    expect(createdEvent.eventDescription).toBe(eventData.eventDescription);
    expect(createdEvent.eventDate).toEqual(eventData.eventDate);
  });

  /**
   * @test Llamada correcta al método createEvent del repositorio
   * @description Verifica que el método createEvent del repositorio sea llamado con los datos correctos
   */
  it("should call EventRepository.createEvent with correct data", async () => {
    const eventData = {
      eventUserCreateId: 2,
      eventPlaceId: 2,
      eventName: "Conferencia de Tecnología",
      eventDescription: "Una conferencia sobre las últimas tendencias tecnológicas",
      eventDate: new Date("2025-06-15T09:00:00")
    };

    const spy = jest.spyOn(mockEventRepository, "createEvent");

    await createEvent.execute(eventData);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        eventId: null,
        ...eventData
      })
    );
  });

  /**
   * @test Manejo de errores en la creación de eventos
   * @description Verifica que se manejen correctamente los errores cuando falla la creación de un evento
   */
  it("should throw an error if EventRepository.createEvent fails", async () => {
    const eventData = {
      eventUserCreateId: 3,
      eventPlaceId: 3,
      eventName: "Festival de Cine",
      eventDescription: "Un festival de cine independiente",
      eventDate: new Date("2025-09-20T18:00:00")
    };

    jest.spyOn(mockEventRepository, "createEvent").mockRejectedValue(new Error("Database error"));

    await expect(createEvent.execute(eventData)).rejects.toThrow("Database error");
  });
});
