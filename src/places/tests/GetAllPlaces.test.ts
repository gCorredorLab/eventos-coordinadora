/**
 * @project Eventos - Coordinadora
 * @file GetAllPlaces.test.ts
 * @description Pruebas unitarias para el caso de uso GetAllPlaces
 * @verified SI
 * @status DONE
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo contiene las pruebas unitarias para el caso de uso GetAllPlaces.
 * Se prueban diferentes escenarios de obtención de todos los lugares y el manejo de errores.
 */

/** @import dependencias */
import {GetAllPlaces} from "../application/use-cases/GetAllPlaces";
import {Place} from "../domain/entities/Place";
import {PlaceRepository} from "../application/interfaces/PlaceRepository";

/** Implementación mock del PlaceRepository */
class MockPlaceRepository implements PlaceRepository {
  private places: Place[] = [
    {
      placeId: 1,
      placeUserCreateId: 1,
      placeName: "Auditorio Principal",
      placeDescription: "Un gran auditorio para eventos.",
      placeEmail: "auditorio@example.com",
      placePhone: "123456789",
      placeAddress: "123 Calle Principal",
      placeLatitude: 40.7128,
      placeLongitude: -74.006
    },
    {
      placeId: 2,
      placeUserCreateId: 2,
      placeName: "Teatro Nacional",
      placeDescription: "Un teatro histórico en la ciudad.",
      placeEmail: "teatro@example.com",
      placePhone: "987654321",
      placeAddress: "456 Calle Secundaria",
      placeLatitude: 34.0522,
      placeLongitude: -118.2437
    }
  ];

  async getAllPlaces(): Promise<Place[]> {
    return this.places;
  }

  async createPlace(place: Place): Promise<Place> {
    throw new Error("Method not implemented.");
  }

  async getPlaceById(placeId: number): Promise<Place | null> {
    throw new Error("Method not implemented.");
  }

  async updatePlace(place: Place): Promise<Place> {
    throw new Error("Method not implemented.");
  }

  async deletePlace(placeId: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

describe("GetAllPlaces", () => {
  let getAllPlaces: GetAllPlaces;
  let mockPlaceRepository: PlaceRepository;

  beforeEach(() => {
    mockPlaceRepository = new MockPlaceRepository();
    getAllPlaces = new GetAllPlaces(mockPlaceRepository);
  });

  /**
   * @test Obtención exitosa de todos los lugares
   * @description Verifica que se puedan obtener todos los lugares registrados
   */
  it("should get all places successfully", async () => {
    const places = await getAllPlaces.execute();

    expect(places).not.toBeNull();
    expect(places.length).toBe(2);
    expect(places[0].placeName).toBe("Auditorio Principal");
    expect(places[1].placeName).toBe("Teatro Nacional");
  });

  /**
   * @test Llamada correcta al método getAllPlaces del repositorio
   * @description Verifica que el método getAllPlaces del repositorio sea llamado correctamente
   */
  it("should call PlaceRepository.getAllPlaces", async () => {
    const spy = jest.spyOn(mockPlaceRepository, "getAllPlaces");

    await getAllPlaces.execute();

    expect(spy).toHaveBeenCalled();
  });

  /**
   * @test Manejo de errores en la obtención de todos los lugares
   * @description Verifica que se manejen correctamente los errores cuando falla la obtención de todos los lugares
   */
  it("should throw an error if PlaceRepository.getAllPlaces fails", async () => {
    jest.spyOn(mockPlaceRepository, "getAllPlaces").mockRejectedValue(new Error("Database error"));

    await expect(getAllPlaces.execute()).rejects.toThrow("Database error");
  });
});
