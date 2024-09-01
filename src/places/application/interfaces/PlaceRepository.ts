/**
 * @project Eventos - Coordinadora
 * @file PlaceRepository.ts
 * @description Interfaz que define las operaciones de repositorio para la entidad Place
 * @verified SI
 * @status DONE
 * @unitTests SI
 * @unitTestsStatus PASSED
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 */

/** @import entidades */
import {Place} from "../../domain/entities/Place";

/** @interface */
export interface PlaceRepository {
  /**
   * @method createPlace
   * @description Crea un nuevo lugar en el sistema
   * @param {Place} place - El lugar a crear
   * @returns {Promise<Place>} El lugar creado con su ID asignado
   */
  createPlace(place: Place): Promise<Place>;

  /**
   * @method getAllPlaces
   * @description Obtiene todos los lugares del sistema
   * @returns {Promise<Place[]>} Un array con todos los lugares
   */
  getAllPlaces(): Promise<Place[]>;

  /**
   * @method getPlaceById
   * @description Obtiene un lugar por su ID
   * @param {number} placeId - El ID del lugar a buscar
   * @returns {Promise<Place | null>} El lugar encontrado o null si no existe
   */
  getPlaceById(placeId: number): Promise<Place | null>;

  /**
   * @method updatePlace
   * @description Actualiza un lugar existente
   * @param {Place} place - El lugar con los datos actualizados
   * @returns {Promise<Place>} El lugar actualizado
   */
  updatePlace(place: Place): Promise<Place>;

  /**
   * @method deletePlace
   * @description Elimina un lugar del sistema
   * @param {number} placeId - El ID del lugar a eliminar
   * @returns {Promise<void>}
   */
  deletePlace(placeId: number): Promise<void>;
}
