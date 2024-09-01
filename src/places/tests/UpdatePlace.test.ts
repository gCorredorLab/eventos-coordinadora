/**
 * @project Eventos - Coordinadora
 * @file UpdatePlace.test.ts
 * @description Pruebas unitarias para el caso de uso UpdatePlace
 * @verified SI
 * @status DONE
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo contiene las pruebas unitarias para el caso de uso UpdatePlace.
 * Se prueban diferentes escenarios de actualización de lugares y el manejo de errores.
 */

/** @import dependencias */
import {UpdatePlace} from "../application/use-cases/UpdatePlace";
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

  async updatePlace(place: Place): Promise<Place> {
    const index = this.places.findIndex((p) => p.placeId === place.placeId);
    if (index === -1) {
      throw new Error("Place not found");
    }
    this.places[index] = place;
    return place;
  }

  async getPlaceById(placeId: number): Promise<Place | null> {
    return this.places.find((place) => place.placeId === placeId) || null;
  }

  async getAllPlaces(): Promise<Place[]> {
    throw new Error("Method not implemented.");
  }

  async createPlace(place: Place): Promise<Place> {
    throw new Error("Method not implemented.");
  }

  async deletePlace(placeId: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

describe("UpdatePlace", () => {
  let updatePlace: UpdatePlace;
  let mockPlaceRepository: PlaceRepository;

  beforeEach(() => {
    mockPlaceRepository = new MockPlaceRepository();
    updatePlace = new UpdatePlace(mockPlaceRepository);
  });

  /**
   * @test Actualización exitosa de un lugar existente
   * @description Verifica que se pueda actualizar correctamente un lugar existente
   */
  it("should update an existing place successfully", async () => {
    const placeId = 1;
    const updatedPlaceData = {
      placeUserCreateId: 1,
      placeName: "Auditorio Renovado",
      placeDescription: "Auditorio renovado con nuevas instalaciones.",
      placeEmail: "nuevoauditorio@example.com",
      placePhone: "987654321",
      placeAddress: "456 Calle Secundaria",
      placeLatitude: 34.0522,
      placeLongitude: -118.2437
    };

    const updatedPlace = await updatePlace.execute(placeId, updatedPlaceData);

    expect(updatedPlace).toBeDefined();
    expect(updatedPlace.placeId).toBe(placeId);
    expect(updatedPlace.placeName).toBe(updatedPlaceData.placeName);
    expect(updatedPlace.placeDescription).toBe(updatedPlaceData.placeDescription);
    expect(updatedPlace.placeEmail).toBe(updatedPlaceData.placeEmail);
    expect(updatedPlace.placePhone).toBe(updatedPlaceData.placePhone);
    expect(updatedPlace.placeAddress).toBe(updatedPlaceData.placeAddress);
    expect(updatedPlace.placeLatitude).toBe(updatedPlaceData.placeLatitude);
    expect(updatedPlace.placeLongitude).toBe(updatedPlaceData.placeLongitude);
  });

  /**
   * @test Llamada correcta al método updatePlace del repositorio
   * @description Verifica que el método updatePlace del repositorio sea llamado con los datos correctos
   */
  it("should call PlaceRepository.updatePlace with correct data", async () => {
    const placeId = 1;
    const updatedPlaceData = {
      placeUserCreateId: 1,
      placeName: "Auditorio Renovado",
      placeDescription: "Auditorio renovado con nuevas instalaciones.",
      placeEmail: "nuevoauditorio@example.com",
      placePhone: "987654321",
      placeAddress: "456 Calle Secundaria",
      placeLatitude: 34.0522,
      placeLongitude: -118.2437
    };

    const spy = jest.spyOn(mockPlaceRepository, "updatePlace");

    await updatePlace.execute(placeId, updatedPlaceData);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        placeId,
        ...updatedPlaceData
      })
    );
  });

  /**
   * @test Manejo de errores al actualizar un lugar no existente
   * @description Verifica que se lance un error al intentar actualizar un lugar que no existe
   */
  it("should throw an error when trying to update a non-existent place", async () => {
    const nonExistentPlaceId = 999;
    const updatedPlaceData = {
      placeUserCreateId: 1,
      placeName: "Auditorio Renovado",
      placeDescription: "Auditorio renovado con nuevas instalaciones.",
      placeEmail: "nuevoauditorio@example.com",
      placePhone: "987654321",
      placeAddress: "456 Calle Secundaria",
      placeLatitude: 34.0522,
      placeLongitude: -118.2437
    };

    jest.spyOn(mockPlaceRepository, "updatePlace").mockRejectedValue(new Error("Place not found"));

    await expect(updatePlace.execute(nonExistentPlaceId, updatedPlaceData)).rejects.toThrow("Place not found");
  });

  /**
   * @test Manejo de errores en la actualización de lugares
   * @description Verifica que se manejen correctamente los errores cuando falla la actualización de un lugar
   */
  it("should throw an error if PlaceRepository.updatePlace fails", async () => {
    const placeId = 1;
    const updatedPlaceData = {
      placeUserCreateId: 1,
      placeName: "Auditorio Renovado",
      placeDescription: "Auditorio renovado con nuevas instalaciones.",
      placeEmail: "nuevoauditorio@example.com",
      placePhone: "987654321",
      placeAddress: "456 Calle Secundaria",
      placeLatitude: 34.0522,
      placeLongitude: -118.2437
    };

    jest.spyOn(mockPlaceRepository, "updatePlace").mockRejectedValue(new Error("Database error"));

    await expect(updatePlace.execute(placeId, updatedPlaceData)).rejects.toThrow("Database error");
  });
});
