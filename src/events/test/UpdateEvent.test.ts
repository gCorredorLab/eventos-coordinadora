/**
 * @project Eventos - Coordinadora
 * @file UpdateEvent.test.ts
 * @description Pruebas unitarias para el caso de uso UpdateEvent
 * @verified SI
 * @status DONE
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo contiene las pruebas unitarias para el caso de uso UpdateEvent.
 * Se prueban diferentes escenarios de actualización de un evento.
 */

/** @import dependencias */
import { UpdateEvent } from "../application/use-cases/UpdateEvent";
import { Event } from "../domain/entities/Event";
import { EventRepository } from "../application/interfaces/EventRepository";
import { Place } from "../../places/domain/entities/Place";

/** Implementación mock del EventRepository */
class MockEventRepository implements EventRepository {
  private events: Event[] = [
    { eventId: 1, eventUserCreateId: 1, eventPlaceId: 1, eventName: "Concierto de Rock", eventDescription: "Gran concierto al aire libre", eventDate: new Date("2024-09-15T19:00:00") },
    { eventId: 2, eventUserCreateId: 2, eventPlaceId: 2, eventName: "Exposición de Arte", eventDescription: "Muestra de artistas locales", eventDate: new Date("2024-10-01T10:00:00") }
  ];

  async updateEvent(event: Event): Promise<Event> {
    const index = this.events.findIndex(e => e.eventId === event.eventId);
    if (index === -1) {
      throw new Error("Event not found");
    }
    this.events[index] = event;
    return event;
  }

  async getAllEvents(): Promise<Event[]> {
    throw new Error("Method not implemented.");
  }

  async getEventById(eventId: number): Promise<Event | null> {
    throw new Error("Method not implemented.");
  }

  async createEvent(event: Event): Promise<Event> {
    throw new Error("Method not implemented.");
  }

  async deleteEvent(eventId: number): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async getAllEventNearby(range: number, latitude?: number, longitude?: number): Promise<Array<{ event: Event; place: Place; nearbyLocations: any[] }>> {
    throw new Error("Method not implemented.");
  }
}

describe("UpdateEvent", () => {
  let updateEvent: UpdateEvent;
  let mockEventRepository: EventRepository;

  beforeEach(() => {
    mockEventRepository = new MockEventRepository();
    updateEvent = new UpdateEvent(mockEventRepository);
  });

  /**
   * @test Actualización exitosa de un evento
   * @description Verifica que se pueda actualizar correctamente un evento existente
   */
  it("should update an existing event successfully", async () => {
    const eventId = 1;
    const updatedEventData = {
      eventUserCreateId: 1,
      eventPlaceId: 1,
      eventName: "Concierto de Rock Actualizado",
      eventDescription: "Gran concierto al aire libre con artistas invitados",
      eventDate: new Date("2024-09-16T20:00:00")
    };

    const result = await updateEvent.execute(eventId, updatedEventData);

    expect(result).toBeDefined();
    expect(result.eventId).toBe(eventId);
    expect(result.eventName).toBe(updatedEventData.eventName);
    expect(result.eventDescription).toBe(updatedEventData.eventDescription);
    expect(result.eventDate).toEqual(updatedEventData.eventDate);
  });

  /**
   * @test Llamada correcta al método updateEvent del repositorio
   * @description Verifica que el método updateEvent del repositorio sea llamado con los datos correctos
   */
  it("should call EventRepository.updateEvent with correct data", async () => {
    const eventId = 2;
    const updatedEventData = {
      eventUserCreateId: 2,
      eventPlaceId: 2,
      eventName: "Exposición de Arte Moderna",
      eventDescription: "Muestra actualizada de artistas contemporáneos",
      eventDate: new Date("2024-10-02T11:00:00")
    };

    const spy = jest.spyOn(mockEventRepository, "updateEvent");

    await updateEvent.execute(eventId, updatedEventData);

    expect(spy).toHaveBeenCalledWith(expect.objectContaining({
      eventId: eventId,
      ...updatedEventData
    }));
  });

  /**
   * @test Manejo de errores cuando el evento no existe
   * @description Verifica que se maneje correctamente el error cuando se intenta actualizar un evento que no existe
   */
  it("should throw an error when updating a non-existent event", async () => {
    const nonExistentEventId = 999;
    const updatedEventData = {
      eventUserCreateId: 1,
      eventPlaceId: 1,
      eventName: "Evento Inexistente",
      eventDescription: "Este evento no existe",
      eventDate: new Date()
    };

    jest.spyOn(mockEventRepository, "updateEvent").mockRejectedValue(new Error("Event not found"));

    await expect(updateEvent.execute(nonExistentEventId, updatedEventData)).rejects.toThrow("Event not found");
  });

  /**
   * @test Manejo de errores del repositorio
   * @description Verifica que se manejen correctamente los errores generales del repositorio
   */
  it("should handle repository errors", async () => {
    const eventId = 1;
    const updatedEventData = {
      eventUserCreateId: 1,
      eventPlaceId: 1,
      eventName: "Evento con Error",
      eventDescription: "Este evento causará un error",
      eventDate: new Date()
    };

    jest.spyOn(mockEventRepository, "updateEvent").mockRejectedValue(new Error("Database error"));

    await expect(updateEvent.execute(eventId, updatedEventData)).rejects.toThrow("Database error");
  });
});
