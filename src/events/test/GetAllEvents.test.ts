/**
 * @project Eventos - Coordinadora
 * @file GetAllEvents.test.ts
 * @description Pruebas unitarias para el caso de uso GetAllEvents
 * @verified SI
 * @status DONE
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo contiene las pruebas unitarias para el caso de uso GetAllEvents.
 * Se prueban diferentes escenarios de obtención de todos los eventos.
 */

/** @import dependencias */
import { GetAllEvents } from "../application/use-cases/GetAllEvents";
import { Event } from "../domain/entities/Event";
import { EventRepository } from "../application/interfaces/EventRepository";
import { Place } from "../../places/domain/entities/Place";

/** Implementación mock del EventRepository */
class MockEventRepository implements EventRepository {
  private events: Event[] = [
    { eventId: 1, eventUserCreateId: 1, eventPlaceId: 1, eventName: "Concierto de Rock", eventDescription: "Gran concierto al aire libre", eventDate: new Date("2024-09-15T19:00:00") },
    { eventId: 2, eventUserCreateId: 2, eventPlaceId: 2, eventName: "Exposición de Arte", eventDescription: "Muestra de artistas locales", eventDate: new Date("2024-10-01T10:00:00") }
  ];

  async getAllEvents(): Promise<Event[]> {
    return this.events;
  }

  async createEvent(event: Event): Promise<Event> {
    throw new Error("Method not implemented.");
  }

  async getEventById(eventId: number): Promise<Event | null> {
    throw new Error("Method not implemented.");
  }

  async updateEvent(event: Event): Promise<Event> {
    throw new Error("Method not implemented.");
  }

  async deleteEvent(eventId: number): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async getAllEventNearby(range: number, latitude?: number, longitude?: number): Promise<Array<{ event: Event; place: Place; nearbyLocations: any[] }>> {
    throw new Error("Method not implemented.");
  }
}

describe("GetAllEvents", () => {
  let getAllEvents: GetAllEvents;
  let mockEventRepository: EventRepository;

  beforeEach(() => {
    mockEventRepository = new MockEventRepository();
    getAllEvents = new GetAllEvents(mockEventRepository);
  });

  /**
   * @test Obtención de todos los eventos
   * @description Verifica que se puedan obtener todos los eventos correctamente
   */
  it("should get all events successfully", async () => {
    const result = await getAllEvents.execute();

    expect(result).toHaveLength(2);
    expect(result[0].eventName).toBe("Concierto de Rock");
    expect(result[1].eventName).toBe("Exposición de Arte");
  });

  /**
   * @test Llamada correcta al método getAllEvents del repositorio
   * @description Verifica que el método getAllEvents del repositorio sea llamado correctamente
   */
  it("should call EventRepository.getAllEvents", async () => {
    const spy = jest.spyOn(mockEventRepository, "getAllEvents");

    await getAllEvents.execute();

    expect(spy).toHaveBeenCalled();
  });

  /**
   * @test Manejo de errores
   * @description Verifica que se manejen correctamente los errores del repositorio
   */
  it("should throw an error if EventRepository.getAllEvents fails", async () => {
    jest.spyOn(mockEventRepository, "getAllEvents").mockRejectedValue(new Error("Database error"));

    await expect(getAllEvents.execute()).rejects.toThrow("Database error");
  });

  /**
   * @test Retorno de un array vacío
   * @description Verifica que se maneje correctamente el caso de no haber eventos
   */
  it("should return an empty array when there are no events", async () => {
    jest.spyOn(mockEventRepository, "getAllEvents").mockResolvedValue([]);

    const result = await getAllEvents.execute();

    expect(result).toEqual([]);
  });
});
