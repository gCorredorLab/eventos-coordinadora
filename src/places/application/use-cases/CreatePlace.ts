/**
 * @project Eventos - Coordinadora
 * @file CreatePlace.ts
 * @description Caso de uso para crear un nuevo lugar.
 * @verified SI
 * @status DONE
 * @unitTests SI
 * @unitTestsStatus PASSED
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Caso de uso para crear un nuevo lugar en el sistema.
 */

/** @import dependencias */
import {Place} from "../../domain/entities/Place";
import {PlaceRepository} from "../interfaces/PlaceRepository";

/** @class CreatePlace */
export class CreatePlace {
  constructor(private placeRepository: PlaceRepository) {}

  /**
   * @method execute
   * @description Ejecuta la creación de un nuevo lugar
   * @param {Omit<Place, "placeId">} placeData - Los datos del lugar a crear, sin el ID
   * @returns {Promise<Place>} El lugar creado
   */
  async execute(placeData: Omit<Place, "placeId">): Promise<Place> {
    const place = new Place(
      null,
      placeData.placeUserCreateId,
      placeData.placeName,
      placeData.placeDescription,
      placeData.placeEmail,
      placeData.placePhone,
      placeData.placeAddress,
      placeData.placeLatitude,
      placeData.placeLongitude
    );
    return this.placeRepository.createPlace(place);
  }
}
