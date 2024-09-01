/**
 * @project Eventos - Coordinadora
 * @file CreatePlace.test.ts
 * @description Pruebas unitarias para el caso de uso CreatePlace
 * @verified SI
 * @status DONE
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo contiene las pruebas unitarias para el caso de uso CreatePlace.
 * Se prueban diferentes escenarios de creación de lugares y el manejo de errores.
 */

/** @import dependencias */
import {CreatePlace} from "../application/use-cases/CreatePlace";
import {Place} from "../domain/entities/Place";
import {PlaceRepository} from "../application/interfaces/PlaceRepository";

/** Implementación mock del PlaceRepository */
class MockPlaceRepository implements PlaceRepository {
  private places: Place[] = [];

  async createPlace(place: Place): Promise<Place> {
    const newPlace = {...place, placeId: this.places.length + 1};
    this.places.push(newPlace);
    return newPlace;
  }

  async getAllPlaces(): Promise<Place[]> {
    return this.places;
  }

  async getPlaceById(placeId: number): Promise<Place | null> {
    return this.places.find((place) => place.placeId === placeId) || null;
  }

  async updatePlace(place: Place): Promise<Place> {
    const index = this.places.findIndex((p) => p.placeId === place.placeId);
    if (index !== -1) {
      this.places[index] = place;
      return place;
    }
    throw new Error("Place not found");
  }

  async deletePlace(placeId: number): Promise<void> {
    const index = this.places.findIndex((place) => place.placeId === placeId);
    if (index !== -1) {
      this.places.splice(index, 1);
    }
  }
}

describe("CreatePlace", () => {
  let createPlace: CreatePlace;
  let mockPlaceRepository: PlaceRepository;

  beforeEach(() => {
    mockPlaceRepository = new MockPlaceRepository();
    createPlace = new CreatePlace(mockPlaceRepository);
  });

  /**
   * @test Creación exitosa de un nuevo lugar
   * @description Verifica que se pueda crear un nuevo lugar con todos los campos requeridos
   */
  it("should create a new place successfully", async () => {
    const placeData = {
      placeUserCreateId: 1,
      placeName: "Auditorio Principal",
      placeDescription: "Un gran auditorio para eventos.",
      placeEmail: "auditorio@example.com",
      placePhone: "123456789",
      placeAddress: "123 Calle Principal",
      placeLatitude: 40.7128,
      placeLongitude: -74.006
    };

    const createdPlace = await createPlace.execute(placeData);

    expect(createdPlace).toBeDefined();
    expect(createdPlace.placeId).toBeDefined();
    expect(createdPlace.placeUserCreateId).toBe(placeData.placeUserCreateId);
    expect(createdPlace.placeName).toBe(placeData.placeName);
    expect(createdPlace.placeDescription).toBe(placeData.placeDescription);
    expect(createdPlace.placeEmail).toBe(placeData.placeEmail);
    expect(createdPlace.placePhone).toBe(placeData.placePhone);
    expect(createdPlace.placeAddress).toBe(placeData.placeAddress);
    expect(createdPlace.placeLatitude).toBe(placeData.placeLatitude);
    expect(createdPlace.placeLongitude).toBe(placeData.placeLongitude);
  });

  /**
   * @test Llamada correcta al método createPlace del repositorio
   * @description Verifica que el método createPlace del repositorio sea llamado con los datos correctos
   */
  it("should call PlaceRepository.createPlace with correct data", async () => {
    const placeData = {
      placeUserCreateId: 2,
      placeName: "Teatro Nacional",
      placeDescription: "Un teatro histórico en la ciudad.",
      placeEmail: "teatro@example.com",
      placePhone: "987654321",
      placeAddress: "456 Calle Secundaria",
      placeLatitude: 51.5074,
      placeLongitude: -0.1278
    };

    const spy = jest.spyOn(mockPlaceRepository, "createPlace");

    await createPlace.execute(placeData);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        placeId: null,
        ...placeData
      })
    );
  });

  /**
   * @test Manejo de errores en la creación de lugares
   * @description Verifica que se manejen correctamente los errores cuando falla la creación de un lugar
   */
  it("should throw an error if PlaceRepository.createPlace fails", async () => {
    const placeData = {
      placeUserCreateId: 3,
      placeName: "Centro de Convenciones",
      placeDescription: "Un moderno centro de convenciones.",
      placeEmail: "centroconv@example.com",
      placePhone: "555555555",
      placeAddress: "789 Avenida Central",
      placeLatitude: 48.8566,
      placeLongitude: 2.3522
    };

    jest.spyOn(mockPlaceRepository, "createPlace").mockRejectedValue(new Error("Database error"));

    await expect(createPlace.execute(placeData)).rejects.toThrow("Database error");
  });
});
