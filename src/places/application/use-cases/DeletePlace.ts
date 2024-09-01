/**
 * @project Eventos - Coordinadora
 * @file DeletePlace.ts
 * @description Caso de uso para eliminar un lugar por ID.
 * @verified SI
 * @status DONE
 * @unitTests SI
 * @unitTestsStatus PASSED
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Caso de uso para eliminar un lugar por su ID.
 */

/** @import dependencias */
import {PlaceRepository} from "../interfaces/PlaceRepository";

/** @class DeletePlace */
export class DeletePlace {
  constructor(private placeRepository: PlaceRepository) {}

  /**
   * @method execute
   * @description Ejecuta la eliminación de un lugar por su ID
   * @param {number} placeId - El ID del lugar a eliminar
   * @returns {Promise<void>}
   */
  async execute(placeId: number): Promise<void> {
    await this.placeRepository.deletePlace(placeId);
  }
}
