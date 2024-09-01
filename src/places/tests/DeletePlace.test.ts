/**
 * @project Eventos - Coordinadora
 * @file DeletePlace.test.ts
 * @description Pruebas unitarias para el caso de uso DeletePlace
 * @verified SI
 * @status DONE
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo contiene las pruebas unitarias para el caso de uso DeletePlace.
 * Se prueban diferentes escenarios de eliminación de lugares y el manejo de errores.
 */

/** @import dependencias */
import {DeletePlace} from "../application/use-cases/DeletePlace";
import {Place} from "../domain/entities/Place";
import {PlaceRepository} from "../application/interfaces/PlaceRepository";

/** Implementación mock del PlaceRepository */
class MockPlaceRepository implements PlaceRepository {
  private places: Place[] = [
    {
      placeId: 1,
      placeUserCreateId: 1,
      placeName: "Auditorio Principal",
      placeDescription: "Un gran auditorio",
      placeEmail: "auditorio@example.com",
      placePhone: "123456789",
      placeAddress: "123 Calle Principal",
      placeLatitude: 40.7128,
      placeLongitude: -74.006
    }
  ];

  async deletePlace(placeId: number): Promise<void> {
    const index = this.places.findIndex((place) => place.placeId === placeId);
    if (index === -1) {
      throw new Error("Place not found");
    }
    this.places.splice(index, 1);
  }

  async createPlace(place: Place): Promise<Place> {
    throw new Error("Method not implemented.");
  }

  async getAllPlaces(): Promise<Place[]> {
    return this.places;
  }

  async getPlaceById(placeId: number): Promise<Place | null> {
    return this.places.find((place) => place.placeId === placeId) || null;
  }

  async updatePlace(place: Place): Promise<Place> {
    throw new Error("Method not implemented.");
  }
}

describe("DeletePlace", () => {
  let deletePlace: DeletePlace;
  let mockPlaceRepository: PlaceRepository;

  beforeEach(() => {
    mockPlaceRepository = new MockPlaceRepository();
    deletePlace = new DeletePlace(mockPlaceRepository);
  });

  /**
   * @test Eliminación exitosa de un lugar
   * @description Verifica que se pueda eliminar un lugar existente por su ID
   */
  it("should delete a place successfully", async () => {
    const placeId = 1;
    await expect(deletePlace.execute(placeId)).resolves.not.toThrow();
  });

  /**
   * @test Llamada correcta al método deletePlace del repositorio
   * @description Verifica que el método deletePlace del repositorio sea llamado con el ID correcto
   */
  it("should call PlaceRepository.deletePlace with correct placeId", async () => {
    const placeId = 1;
    const spy = jest.spyOn(mockPlaceRepository, "deletePlace");

    await deletePlace.execute(placeId);

    expect(spy).toHaveBeenCalledWith(placeId);
  });

  /**
   * @test Manejo de errores en la eliminación de lugares
   * @description Verifica que se manejen correctamente los errores cuando falla la eliminación de un lugar
   */
  it("should throw an error if PlaceRepository.deletePlace fails", async () => {
    const placeId = 999; // ID de lugar que no existe
    jest.spyOn(mockPlaceRepository, "deletePlace").mockRejectedValue(new Error("Place not found"));

    await expect(deletePlace.execute(placeId)).rejects.toThrow("Place not found");
  });

  /**
   * @test Intento de eliminar un lugar inexistente
   * @description Verifica el comportamiento cuando se intenta eliminar un lugar que no existe
   */
  it("should handle attempt to delete non-existent place", async () => {
    const nonExistentPlaceId = 2;

    /** Modificamos el mock para que lance un error cuando el lugar no existe */
    jest.spyOn(mockPlaceRepository, "deletePlace").mockImplementation(async (placeId) => {
      if (placeId !== 1) {
        throw new Error("Place not found");
      }
    });

    await expect(deletePlace.execute(nonExistentPlaceId)).rejects.toThrow("Place not found");
  });
});
