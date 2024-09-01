/**
 * @project Eventos - Coordinadora
 * @file PlaceRepository.test.ts
 * @description Pruebas unitarias para la implementación de PlaceRepository usando MockPlaceRepository
 * @verified SI
 * @status DONE
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo contiene pruebas unitarias para la implementación de la interfaz PlaceRepository
 * usando una implementación mock llamada MockPlaceRepository. Las pruebas verifican la funcionalidad
 * completa del repositorio, incluyendo la creación, obtención, actualización, eliminación y manejo
 * de lugares.
 */

/** @import dependencias */
import {Place} from "../domain/entities/Place";
import {PlaceRepository} from "../application/interfaces/PlaceRepository";

/** @class MockPlaceRepository */
class MockPlaceRepository implements PlaceRepository {
  private places: Place[] = [];

  /**
   * @method createPlace
   * @description Crea un nuevo lugar en el repositorio mock
   * @param {Place} place - El lugar a crear
   * @returns {Promise<Place>} El lugar creado con un ID asignado
   */
  async createPlace(place: Place): Promise<Place> {
    const newPlace = {...place, placeId: this.places.length + 1};
    this.places.push(newPlace);
    return newPlace;
  }

  /**
   * @method getAllPlaces
   * @description Obtiene todos los lugares del repositorio mock
   * @returns {Promise<Place[]>} Un array con todos los lugares
   */
  async getAllPlaces(): Promise<Place[]> {
    return this.places;
  }

  /**
   * @method getPlaceById
   * @description Obtiene un lugar por su ID
   * @param {number} placeId - El ID del lugar a buscar
   * @returns {Promise<Place | null>} El lugar encontrado o null si no existe
   */
  async getPlaceById(placeId: number): Promise<Place | null> {
    return this.places.find((p) => p.placeId === placeId) || null;
  }

  /**
   * @method updatePlace
   * @description Actualiza un lugar existente en el repositorio mock
   * @param {Place} place - El lugar con los datos actualizados
   * @returns {Promise<Place>} El lugar actualizado
   */
  async updatePlace(place: Place): Promise<Place> {
    const index = this.places.findIndex((p) => p.placeId === place.placeId);
    if (index !== -1) {
      this.places[index] = place;
      return place;
    }
    throw new Error("Place not found");
  }

  /**
   * @method deletePlace
   * @description Elimina un lugar del repositorio mock
   * @param {number} placeId - El ID del lugar a eliminar
   * @returns {Promise<void>}
   */
  async deletePlace(placeId: number): Promise<void> {
    const index = this.places.findIndex((p) => p.placeId === placeId);
    if (index !== -1) {
      this.places.splice(index, 1);
    }
  }
}

describe("PlaceRepository", () => {
  let repository: PlaceRepository;

  /** @beforeEach Prepara el entorno antes de cada prueba */
  beforeEach(() => {
    repository = new MockPlaceRepository();
  });

  /** @test Crea un lugar */
  it("should create a place", async () => {
    const place = new Place(null, 1, "Auditorio", "Un gran auditorio", "auditorio@example.com", "123456789", "123 Calle Principal", 40.7128, -74.006);
    const createdPlace = await repository.createPlace(place);
    expect(createdPlace.placeId).toBeDefined();
    expect(createdPlace.placeName).toBe("Auditorio");
    expect(createdPlace.placeDescription).toBe("Un gran auditorio");
  });

  /** @test Obtiene un lugar por su ID */
  it("should get a place by id", async () => {
    const place = new Place(null, 1, "Teatro", "Teatro antiguo", "teatro@example.com", "987654321", "456 Calle Secundaria", 51.5074, -0.1278);
    const createdPlace = await repository.createPlace(place);
    const fetchedPlace = await repository.getPlaceById(createdPlace.placeId!);
    expect(fetchedPlace).toEqual(createdPlace);
  });

  /** @test Retorna null para un ID de lugar inexistente */
  it("should return null for non-existent place id", async () => {
    const fetchedPlace = await repository.getPlaceById(999);
    expect(fetchedPlace).toBeNull();
  });

  /** @test Actualiza un lugar */
  it("should update a place", async () => {
    const place = new Place(null, 1, "Biblioteca", "Biblioteca central", "biblio@example.com", "555555555", "789 Calle Tercera", 48.8566, 2.3522);
    const createdPlace = await repository.createPlace(place);
    const updatedPlace = new Place(
      createdPlace.placeId,
      1,
      "Biblioteca",
      "Biblioteca renovada",
      "biblio@example.com",
      "555555555",
      "789 Calle Tercera",
      48.8566,
      2.3522
    );
    const result = await repository.updatePlace(updatedPlace);
    expect(result.placeDescription).toBe("Biblioteca renovada");
  });

  /** @test Lanza un error al intentar actualizar un lugar inexistente */
  it("should throw an error when updating non-existent place", async () => {
    const nonExistentPlace = new Place(999, 1, "Lugar Fantasma", "Este lugar no existe", "ghost@example.com", "000000000", "Calle Fantasma", 0, 0);
    await expect(repository.updatePlace(nonExistentPlace)).rejects.toThrow("Place not found");
  });

  /** @test Elimina un lugar */
  it("should delete a place", async () => {
    const place = new Place(null, 1, "Estadio", "Estadio nacional", "estadio@example.com", "333333333", "123 Avenida Central", 35.6762, 139.6503);
    const createdPlace = await repository.createPlace(place);
    await repository.deletePlace(createdPlace.placeId!);
    const fetchedPlace = await repository.getPlaceById(createdPlace.placeId!);
    expect(fetchedPlace).toBeNull();
  });

  /** @test Obtiene todos los lugares */
  it("should get all places", async () => {
    await repository.createPlace(new Place(null, 1, "Lugar1", "Descripción1", "lugar1@example.com", "111111111", "Calle 1", 1, 1));
    await repository.createPlace(new Place(null, 2, "Lugar2", "Descripción2", "lugar2@example.com", "222222222", "Calle 2", 2, 2));
    const allPlaces = await repository.getAllPlaces();
    expect(allPlaces.length).toBe(2);
    expect(allPlaces[0].placeName).toBe("Lugar1");
    expect(allPlaces[1].placeName).toBe("Lugar2");
  });
});
