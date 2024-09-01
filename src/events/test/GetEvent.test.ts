/**
 * @project Eventos - Coordinadora
 * @file GetEvent.test.ts
 * @description Pruebas unitarias para el caso de uso GetEvent
 * @verified SI
 * @status DONE
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo contiene las pruebas unitarias para el caso de uso GetEvent.
 * Se prueban diferentes escenarios de obtención de un evento por ID.
 */

/** @import dependencias */
import { GetEvent } from "../application/use-cases/GetEvent";
import { Event } from "../domain/entities/Event";
import { EventRepository } from "../application/interfaces/EventRepository";
import { Place } from "../../places/domain/entities/Place";

/** Implementación mock del EventRepository */
class MockEventRepository implements EventRepository {
  private events: Event[] = [
    { eventId: 1, eventUserCreateId: 1, eventPlaceId: 1, eventName: "Concierto de Rock", eventDescription: "Gran concierto al aire libre", eventDate: new Date("2024-09-15T19:00:00") },
    { eventId: 2, eventUserCreateId: 2, eventPlaceId: 2, eventName: "Exposición de Arte", eventDescription: "Muestra de artistas locales", eventDate: new Date("2024-10-01T10:00:00") }
  ];

  async getEventById(eventId: number): Promise<Event | null> {
    return this.events.find(event => event.eventId === eventId) || null;
  }

  async getAllEvents(): Promise<Event[]> {
    throw new Error("Method not implemented.");
  }

  async createEvent(event: Event): Promise<Event> {
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

describe("GetEvent", () => {
  let getEvent: GetEvent;
  let mockEventRepository: EventRepository;

  beforeEach(() => {
    mockEventRepository = new MockEventRepository();
    getEvent = new GetEvent(mockEventRepository);
  });

  /**
   * @test Obtención exitosa de un evento por ID
   * @description Verifica que se pueda obtener correctamente un evento existente por su ID
   */
  it("should get an existing event by ID successfully", async () => {
    const eventId = 1;
    const result = await getEvent.execute(eventId);

    expect(result).not.toBeNull();
    expect(result?.eventId).toBe(eventId);
    expect(result?.eventName).toBe("Concierto de Rock");
  });

  /**
   * @test Obtención de un evento que no existe
   * @description Verifica que se devuelva null cuando se busca un evento que no existe
   */
  it("should return null for a non-existent event ID", async () => {
    const nonExistentEventId = 999;
    const result = await getEvent.execute(nonExistentEventId);

    expect(result).toBeNull();
  });

  /**
   * @test Llamada correcta al método getEventById del repositorio
   * @description Verifica que el método getEventById del repositorio sea llamado con el ID correcto
   */
  it("should call EventRepository.getEventById with correct ID", async () => {
    const eventId = 2;
    const spy = jest.spyOn(mockEventRepository, "getEventById");

    await getEvent.execute(eventId);

    expect(spy).toHaveBeenCalledWith(eventId);
  });

  /**
   * @test Manejo de errores
   * @description Verifica que se manejen correctamente los errores del repositorio
   */
  it("should throw an error if EventRepository.getEventById fails", async () => {
    const eventId = 1;
    jest.spyOn(mockEventRepository, "getEventById").mockRejectedValue(new Error("Database error"));

    await expect(getEvent.execute(eventId)).rejects.toThrow("Database error");
  });
});
