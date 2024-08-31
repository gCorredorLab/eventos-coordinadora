/**
 * @project Eventos - Coordinadora
 * @file GetAllPlaces.ts
 * @description Caso de uso para obtener todos los lugares.
 * @verified SI
 * @status DONE
 * @unitTests NO
 * @unitTestsStatus DEVELOP
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Caso de uso para obtener todos los lugares.
 */

/** @import dependencias */
import {Place} from "../../domain/entities/Place";
import {PlaceRepository} from "../interfaces/PlaceRepository";

/** @class GetAllPlaces */
export class GetAllPlaces {
  constructor(private placeRepository: PlaceRepository) {}

  /**
   * @method execute
   * @description Ejecuta la obtención de todos los lugares
   * @returns {Promise<User[]>} Un array con todos los lugares
   */
  async execute(): Promise<Place[]> {
    return this.placeRepository.getAllPlaces();
  }
}
