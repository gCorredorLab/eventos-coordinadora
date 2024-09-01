/**
 * @project Eventos - Coordinadora
 * @file DeleteEvent.test.ts
 * @description Pruebas unitarias para el caso de uso DeleteEvent
 * @verified SI
 * @status DONE
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo contiene las pruebas unitarias para el caso de uso DeleteEvent.
 * Se prueban diferentes escenarios de eliminación de eventos y el manejo de errores.
 */

/** @import dependencias */
import {DeleteEvent} from "../application/use-cases/DeleteEvent";
import {Event} from "../domain/entities/Event";
import {EventRepository} from "../application/interfaces/EventRepository";
import {Place} from "../../places/domain/entities/Place";

/** Implementación mock del EventRepository */
class MockEventRepository implements EventRepository {
  private events: Event[] = [
    {eventId: 1, eventUserCreateId: 1, eventPlaceId: 1, eventName: "Evento Test", eventDescription: "Descripción Test", eventDate: new Date()}
  ];

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
    } else {
      throw new Error("Event not found");
    }
  }

  async getAllEventNearby(
    range: number,
    latitude?: number,
    longitude?: number
  ): Promise<Array<{event: Event; place: Place; nearbyLocations: any[]}>> {
    return [];
  }
}

describe("DeleteEvent", () => {
  let deleteEvent: DeleteEvent;
  let mockEventRepository: EventRepository;

  beforeEach(() => {
    mockEventRepository = new MockEventRepository();
    deleteEvent = new DeleteEvent(mockEventRepository);
  });

  /**
   * @test Eliminación exitosa de un evento
   * @description Verifica que se pueda eliminar un evento existente por su ID
   */
  it("should delete an existing event successfully", async () => {
    const eventId = 1;
    await expect(deleteEvent.execute(eventId)).resolves.not.toThrow();
  });

  /**
   * @test Llamada correcta al método deleteEvent del repositorio
   * @description Verifica que el método deleteEvent del repositorio sea llamado con el ID correcto
   */
  it("should call EventRepository.deleteEvent with correct ID", async () => {
    const eventId = 1;
    const spy = jest.spyOn(mockEventRepository, "deleteEvent");

    await deleteEvent.execute(eventId);

    expect(spy).toHaveBeenCalledWith(eventId);
  });

  /**
   * @test Manejo de errores al eliminar un evento inexistente
   * @description Verifica que se manejen correctamente los errores cuando se intenta eliminar un evento que no existe
   */
  it("should throw an error if EventRepository.deleteEvent fails", async () => {
    const nonExistentEventId = 999;
    jest.spyOn(mockEventRepository, "deleteEvent").mockRejectedValue(new Error("Event not found"));

    await expect(deleteEvent.execute(nonExistentEventId)).rejects.toThrow("Event not found");
  });
});
