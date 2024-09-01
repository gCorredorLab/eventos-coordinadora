/**
 * @project Eventos - Coordinadora
 * @file GetAllEventNearby.test.ts
 * @description Pruebas unitarias para el caso de uso GetAllEventNearby
 * @verified SI
 * @status DONE
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo contiene las pruebas unitarias para el caso de uso GetAllEventNearby.
 * Se prueban diferentes escenarios de búsqueda de eventos cercanos y el manejo de parámetros opcionales.
 */

import {GetAllEventNearby} from "../application/use-cases/GetAllEventNearby";
import {Event} from "../domain/entities/Event";
import {Place} from "../../places/domain/entities/Place";
import {EventRepository} from "../application/interfaces/EventRepository";

// Mock del EventRepository
class MockEventRepository implements EventRepository {
  async getAllEventNearby(
    range: number,
    latitude?: number,
    longitude?: number
  ): Promise<Array<{event: Event; place: Place; nearbyLocations: any[]}>> {
    // Simulamos algunos eventos cercanos
    return [
      {
        event: {
          eventId: 1,
          eventUserCreateId: 1,
          eventPlaceId: 1,
          eventName: "Concierto en el Parque",
          eventDescription: "Gran concierto al aire libre",
          eventDate: new Date("2024-09-15T19:00:00")
        },
        place: {
          placeId: 1,
          placeUserCreateId: 1,
          placeName: "Parque Central",
          placeDescription: "Parque principal de la ciudad",
          placeEmail: "parque@ejemplo.com",
          placePhone: "1234567890",
          placeAddress: "Calle Principal 123",
          placeLatitude: 4.6097,
          placeLongitude: -74.0817
        },
        nearbyLocations: [
          {name: "Restaurante Cercano", distance: 200, latitude: 4.6098, longitude: -74.0819},
          {name: "Estacionamiento Público", distance: 300, latitude: 4.6095, longitude: -74.0815}
        ]
      }
    ];
  }

  // Implementaciones vacías para los otros métodos del EventRepository
  async createEvent(event: Event): Promise<Event> {
    throw new Error("Method not implemented.");
  }
  async getAllEvents(): Promise<Event[]> {
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
}

describe("GetAllEventNearby", () => {
  let getAllEventNearby: GetAllEventNearby;
  let mockEventRepository: EventRepository;

  beforeEach(() => {
    mockEventRepository = new MockEventRepository();
    getAllEventNearby = new GetAllEventNearby(mockEventRepository);
  });

  it("should get nearby events successfully", async () => {
    const range = 1000;
    const result = await getAllEventNearby.execute(range);

    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].event.eventName).toBe("Concierto en el Parque");
    expect(result[0].place.placeName).toBe("Parque Central");
    expect(result[0].nearbyLocations.length).toBe(2);
  });

  it("should call repository with correct parameters", async () => {
    const range = 1000;
    const latitude = 4.6097;
    const longitude = -74.0817;

    const spy = jest.spyOn(mockEventRepository, "getAllEventNearby");

    await getAllEventNearby.execute(range, latitude, longitude);

    expect(spy).toHaveBeenCalledWith(range, latitude, longitude);
  });

  // Puedes agregar más pruebas aquí según sea necesario
});
