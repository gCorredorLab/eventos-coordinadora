/**
 * @project Eventos - Coordinadora
 * @file GetPlace.test.ts
 * @description Pruebas unitarias para el caso de uso GetPlace
 * @verified SI
 * @status DONE
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo contiene las pruebas unitarias para el caso de uso GetPlace.
 * Se prueban diferentes escenarios de obtención de lugares y el manejo de errores.
 */

/** @import dependencias */
import {GetPlace} from "../application/use-cases/GetPlace";
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
    }
  ];

  async getPlaceById(placeId: number): Promise<Place | null> {
    return this.places.find((place) => place.placeId === placeId) || null;
  }

  async getAllPlaces(): Promise<Place[]> {
    throw new Error("Method not implemented.");
  }

  async createPlace(place: Place): Promise<Place> {
    throw new Error("Method not implemented.");
  }

  async updatePlace(place: Place): Promise<Place> {
    throw new Error("Method not implemented.");
  }

  async deletePlace(placeId: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

describe("GetPlace", () => {
  let getPlace: GetPlace;
  let mockPlaceRepository: PlaceRepository;

  beforeEach(() => {
    mockPlaceRepository = new MockPlaceRepository();
    getPlace = new GetPlace(mockPlaceRepository);
  });

  /**
   * @test Obtención exitosa de un lugar existente
   * @description Verifica que se pueda obtener un lugar existente por su ID
   */
  it("should get an existing place successfully", async () => {
    const placeId = 1;
    const place = await getPlace.execute(placeId);

    expect(place).not.toBeNull();
    expect(place?.placeId).toBe(placeId);
    expect(place?.placeName).toBe("Auditorio Principal");
    expect(place?.placeDescription).toBe("Un gran auditorio para eventos.");
    expect(place?.placeEmail).toBe("auditorio@example.com");
    expect(place?.placePhone).toBe("123456789");
    expect(place?.placeAddress).toBe("123 Calle Principal");
    expect(place?.placeLatitude).toBe(40.7128);
    expect(place?.placeLongitude).toBe(-74.006);
  });

  /**
   * @test Intento de obtener un lugar no existente
   * @description Verifica que se devuelva null al intentar obtener un lugar que no existe
   */
  it("should return null for non-existent place", async () => {
    const nonExistentPlaceId = 999;
    const place = await getPlace.execute(nonExistentPlaceId);

    expect(place).toBeNull();
  });

  /**
   * @test Llamada correcta al método getPlaceById del repositorio
   * @description Verifica que el método getPlaceById del repositorio sea llamado con el ID correcto
   */
  it("should call PlaceRepository.getPlaceById with correct placeId", async () => {
    const placeId = 1;
    const spy = jest.spyOn(mockPlaceRepository, "getPlaceById");

    await getPlace.execute(placeId);

    expect(spy).toHaveBeenCalledWith(placeId);
  });

  /**
   * @test Manejo de errores en la obtención de lugares
   * @description Verifica que se manejen correctamente los errores cuando falla la obtención de un lugar
   */
  it("should throw an error if PlaceRepository.getPlaceById fails", async () => {
    const placeId = 1;
    jest.spyOn(mockPlaceRepository, "getPlaceById").mockRejectedValue(new Error("Database error"));

    await expect(getPlace.execute(placeId)).rejects.toThrow("Database error");
  });
});
