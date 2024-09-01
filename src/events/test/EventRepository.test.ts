/**
 * @project Eventos - Coordinadora
 * @file EventRepository.test.ts
 * @description Pruebas unitarias para la implementación de EventRepository usando MockEventRepository
 * @verified SI
 * @status DONE
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo contiene pruebas unitarias para la implementación de la interfaz `EventRepository`
 * usando una implementación mock llamada `MockEventRepository`. Las pruebas verifican la funcionalidad
 * completa del repositorio, incluyendo la creación, obtención, actualización, eliminación y manejo
 * de eventos, así como la obtención de eventos con ubicaciones cercanas.
 */

/** @import dependencias necesarias */
import {Event} from "../domain/entities/Event";
import {Place} from "../../places/domain/entities/Place";
import {EventRepository} from "../application/interfaces/EventRepository";

/** @class MockEventRepository */
class MockEventRepository implements EventRepository {
  private events: Event[] = [];
  private places: Place[] = [];

  /**
   * @method createEvent
   * @description Crea un nuevo evento en el repositorio mock
   * @param {Event} event - El evento a crear
   * @returns {Promise<Event>} El evento creado con un ID asignado
   */
  async createEvent(event: Event): Promise<Event> {
    const newEvent = {...event, eventId: this.events.length + 1};
    this.events.push(newEvent);
    return newEvent;
  }

  /**
   * @method getAllEvents
   * @description Obtiene todos los eventos del repositorio mock
   * @returns {Promise<Event[]>} Un array con todos los eventos
   */
  async getAllEvents(): Promise<Event[]> {
    return this.events;
  }

  /**
   * @method getEventById
   * @description Obtiene un evento por su ID
   * @param {number} eventId - El ID del evento a buscar
   * @returns {Promise<Event | null>} El evento encontrado o null si no existe
   */
  async getEventById(eventId: number): Promise<Event | null> {
    return this.events.find((e) => e.eventId === eventId) || null;
  }

  /**
   * @method updateEvent
   * @description Actualiza un evento existente en el repositorio mock
   * @param {Event} event - El evento con los datos actualizados
   * @returns {Promise<Event>} El evento actualizado
   */
  async updateEvent(event: Event): Promise<Event> {
    const index = this.events.findIndex((e) => e.eventId === event.eventId);
    if (index !== -1) {
      this.events[index] = event;
      return event;
    }
    throw new Error("Event not found");
  }

  /**
   * @method deleteEvent
   * @description Elimina un evento del repositorio mock
   * @param {number} eventId - El ID del evento a eliminar
   * @returns {Promise<void>}
   */
  async deleteEvent(eventId: number): Promise<void> {
    const index = this.events.findIndex((e) => e.eventId === eventId);
    if (index !== -1) {
      this.events.splice(index, 1);
    }
  }

  /**
   * @method getAllEventNearby
   * @description Obtiene todos los eventos con sus ubicaciones cercanas
   * @param {number} range - El rango en metros para buscar ubicaciones cercanas
   * @param {number} [latitude] - Latitud opcional del punto de referencia para la búsqueda
   * @param {number} [longitude] - Longitud opcional del punto de referencia para la búsqueda
   * @returns {Promise<Array<{ event: Event, place: Place, nearbyLocations: any[] }>>}
   *          Una lista de eventos con sus lugares y ubicaciones cercanas
   */
  async getAllEventNearby(
    range: number,
    latitude?: number,
    longitude?: number
  ): Promise<Array<{event: Event; place: Place; nearbyLocations: any[]}>> {
    // Simulación de la obtención de eventos cercanos; en una implementación real, se calcularía la distancia y se filtrarían los eventos
    return this.events.map((event) => ({
      event,
      place: this.places.find((p) => p.placeId === event.eventPlaceId)!,
      nearbyLocations: [] // Simula la obtención de ubicaciones cercanas
    }));
  }
}

/**
 * @describe Grupo de pruebas para `EventRepository` usando `MockEventRepository`
 */
describe("EventRepository", () => {
  let repository: EventRepository;

  /** @beforeEach Prepara el entorno antes de cada prueba */
  beforeEach(() => {
    repository = new MockEventRepository();
  });

  /** @test Crea un evento */
  it("should create an event", async () => {
    const event = new Event(null, 1, 1, "Conferencia", "Una conferencia sobre tecnología", new Date("2024-12-01T10:00:00Z"));
    const createdEvent = await repository.createEvent(event);
    expect(createdEvent.eventId).toBeDefined();
    expect(createdEvent.eventName).toBe("Conferencia");
    expect(createdEvent.eventDescription).toBe("Una conferencia sobre tecnología");
  });

  /** @test Obtiene un evento por su ID */
  it("should get an event by id", async () => {
    const event = new Event(null, 1, 1, "Taller", "Un taller práctico", new Date("2024-12-02T10:00:00Z"));
    const createdEvent = await repository.createEvent(event);
    const fetchedEvent = await repository.getEventById(createdEvent.eventId!);
    expect(fetchedEvent).toEqual(createdEvent);
  });

  /** @test Retorna null para un ID de evento inexistente */
  it("should return null for non-existent event id", async () => {
    const fetchedEvent = await repository.getEventById(999);
    expect(fetchedEvent).toBeNull();
  });

  /** @test Actualiza un evento */
  it("should update an event", async () => {
    const event = new Event(null, 1, 1, "Seminario", "Un seminario académico", new Date("2024-12-03T10:00:00Z"));
    const createdEvent = await repository.createEvent(event);
    const updatedEvent = new Event(createdEvent.eventId, 1, 1, "Seminario", "Un seminario académico avanzado", new Date("2024-12-03T10:00:00Z"));
    const result = await repository.updateEvent(updatedEvent);
    expect(result.eventDescription).toBe("Un seminario académico avanzado");
  });

  /** @test Lanza un error al intentar actualizar un evento inexistente */
  it("should throw an error when updating non-existent event", async () => {
    const nonExistentEvent = new Event(999, 1, 1, "Evento Fantasma", "Este evento no existe", new Date("2024-12-04T10:00:00Z"));
    await expect(repository.updateEvent(nonExistentEvent)).rejects.toThrow("Event not found");
  });

  /** @test Elimina un evento */
  it("should delete an event", async () => {
    const event = new Event(null, 1, 1, "Reunión", "Una reunión de negocios", new Date("2024-12-05T10:00:00Z"));
    const createdEvent = await repository.createEvent(event);
    await repository.deleteEvent(createdEvent.eventId!);
    const fetchedEvent = await repository.getEventById(createdEvent.eventId!);
    expect(fetchedEvent).toBeNull();
  });

  /** @test Obtiene todos los eventos */
  it("should get all events", async () => {
    await repository.createEvent(new Event(null, 1, 1, "Evento1", "Descripción1", new Date("2024-12-06T10:00:00Z")));
    await repository.createEvent(new Event(null, 1, 1, "Evento2", "Descripción2", new Date("2024-12-07T10:00:00Z")));
    const allEvents = await repository.getAllEvents();
    expect(allEvents.length).toBe(2);
    expect(allEvents[0].eventName).toBe("Evento1");
    expect(allEvents[1].eventName).toBe("Evento2");
  });

  /** @test Obtiene todos los eventos cercanos con sus lugares */
  it("should get all events nearby with places", async () => {
    // Añade eventos y lugares de ejemplo
    await repository.createEvent(new Event(null, 1, 1, "Evento Cercano", "Un evento cercano", new Date("2024-12-08T10:00:00Z")));
    const nearbyEvents = await repository.getAllEventNearby(5000, 40.7128, -74.006);
    expect(nearbyEvents.length).toBeGreaterThanOrEqual(1);
  });
});
