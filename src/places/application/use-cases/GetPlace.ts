/**
 * @project Eventos - Coordinadora
 * @file GetPlace.ts
 * @description Caso de uso para obtener un lugar por ID.
 * @verified SI
 * @status DONE
 * @unitTests SI
 * @unitTestsStatus PASSED
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Caso de uso para obtener un lugar por su ID.
 */

/** @import dependencias */
import {Place} from "../../domain/entities/Place";
import {PlaceRepository} from "../interfaces/PlaceRepository";

/** @class GetPlace */
export class GetPlace {
  constructor(private placeRepository: PlaceRepository) {}

  /**
   * @method execute
   * @description Ejecuta la obtención de un lugar por su ID
   * @param {number} placeId - El ID del lugar a obtener
   * @returns {Promise<Place | null>} El lugar encontrado o null si no existe
   */
  async execute(placeId: number): Promise<Place | null> {
    return this.placeRepository.getPlaceById(placeId);
  }
}
