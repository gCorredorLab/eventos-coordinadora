/**
 * @project Eventos - Coordinadora
 * @file UpdatePlace.ts
 * @description Caso de uso para actualizar un lugar existente.
 * @verified SI
 * @status DONE
 * @unitTests SI
 * @unitTestsStatus PASSED
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Caso de uso para actualizar los datos de un lugar existente.
 */

/** @import dependencias */
import {Place} from "../../domain/entities/Place";
import {PlaceRepository} from "../interfaces/PlaceRepository";

/** @class UpdatePlace */
export class UpdatePlace {
  constructor(private placeRepository: PlaceRepository) {}

  /**
   * @method execute
   * @description Ejecuta la actualización de un lugar existente
   * @param {number} placeId - El ID del lugar a actualizar
   * @param {Omit<Place, "placeId">} placeData - Los nuevos datos del lugar
   * @returns {Promise<Place>} El lugar actualizado
   */
  async execute(placeId: number, placeData: Omit<Place, "placeId">): Promise<Place> {
    const place = new Place(
      placeId,
      placeData.placeUserCreateId,
      placeData.placeName,
      placeData.placeDescription,
      placeData.placeEmail,
      placeData.placePhone,
      placeData.placeAddress,
      placeData.placeLatitude,
      placeData.placeLongitude
    );
    return this.placeRepository.updatePlace(place);
  }
}
