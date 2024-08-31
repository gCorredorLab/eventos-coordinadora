/**
 * @project Eventos - Coordinadora
 * @file PostgresPlaceRepository.ts
 * @description Implementación de DataPlaceRepository para PostgreSQL
 * @verified SI
 * @status DONE
 * @unitTests NO
 * @unitTestsStatus DEVELOP
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Esta clase implementa la interfaz PlaceRepository utilizando PostgreSQL como base de datos.
 * Utiliza la función query del módulo de configuración de postgres para ejecutar las consultas.
 */

/** @import dependencias */
import {query} from "../../../common/config/postgres";
import {Place} from "../../domain/entities/Place";
import {PlaceRepository} from "../../application/interfaces/PlaceRepository";

/** @class DataPlaceRepository */
export class DataPlaceRepository implements PlaceRepository {
  /**
   * @method createPlace
   * @description Crea un nuevo lugar en la base de datos
   * @param {Place} place - El lugar a crear
   * @returns {Promise<Place>} El lugar creado con su ID asignado
   * @throws {Error} Si ocurre un error en la base de datos
   */
  async createPlace(place: Place): Promise<Place> {
    try {
      const result = await query(
        `INSERT INTO "places" ("placeUserCreateId", "placeName", "placeDescription", "placeEmail", "placePhone", "placeAddress", "placeLatitude", "placeLongitude")
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING *`,
        [
          place.placeUserCreateId,
          place.placeName,
          place.placeDescription,
          place.placeEmail,
          place.placePhone,
          place.placeAddress,
          place.placeLatitude,
          place.placeLongitude
        ]
      );

      return this.mapPlaceFromDatabase(result.rows[0]);
    } catch (error: any) {
      console.error("Error al crear el lugar:", error);
      throw new Error("Ocurrió un error al crear el lugar");
    }
  }

  /**
   * @method getAllPlaces
   * @description Obtiene todos los lugares de la base de datos
   * @returns {Promise<Place[]>} Un array con todos los lugares
   */
  async getAllPlaces(): Promise<Place[]> {
    const result = await query('SELECT * FROM "places"');
    return result.rows.map(this.mapPlaceFromDatabase);
  }

  /**
   * @method getPlaceById
   * @description Obtiene un lugar por su ID
   * @param {number} placeId - El ID del lugar a buscar
   * @returns {Promise<Place | null>} El lugar encontrado o null si no existe
   */
  async getPlaceById(placeId: number): Promise<Place | null> {
    const result = await query('SELECT * FROM "places" WHERE "placeId" = $1', [placeId]);
    if (result.rows.length === 0) return null;
    return this.mapPlaceFromDatabase(result.rows[0]);
  }

  /**
   * @method updatePlace
   * @description Actualiza un lugar existente
   * @param {Place} place - El lugar con los datos actualizados
   * @returns {Promise<Place>} El lugar actualizado
   */
  async updatePlace(place: Place): Promise<Place> {
    const result = await query(
      `UPDATE "places" SET "placeName" = $1, "placeDescription" = $2, "placeEmail" = $3, "placePhone" = $4,
       "placeAddress" = $5, "placeLatitude" = $6, "placeLongitude" = $7
       WHERE "placeId" = $8
       RETURNING *`,
      [
        place.placeName,
        place.placeDescription,
        place.placeEmail,
        place.placePhone,
        place.placeAddress,
        place.placeLatitude,
        place.placeLongitude,
        place.placeId
      ]
    );
    if (result.rows.length === 0) throw new Error("Place not found");
    return this.mapPlaceFromDatabase(result.rows[0]);
  }

  /**
   * @method deletePlace
   * @description Elimina un lugar de la base de datos
   * @param {number} placeId - El ID del lugar a eliminar
   * @returns {Promise<void>}
   */
  async deletePlace(placeId: number): Promise<void> {
    const result = await query('DELETE FROM "places" WHERE "placeId" = $1', [placeId]);
    if (result.rowCount === 0) throw new Error("Place not found");
  }

  /**
   * @method mapPlaceFromDatabase
   * @description Mapea los datos del lugar desde la base de datos al modelo de la aplicación
   * @param {any} dbPlace - Los datos del lugar como vienen de la base de datos
   * @returns {Place} El lugar mapeado al modelo de la aplicación
   * @private
   */
  private mapPlaceFromDatabase(dbPlace: any): Place {
    return {
      placeId: dbPlace.placeId,
      placeUserCreateId: dbPlace.placeUserCreateId,
      placeName: dbPlace.placeName,
      placeDescription: dbPlace.placeDescription,
      placeEmail: dbPlace.placeEmail,
      placePhone: dbPlace.placePhone,
      placeAddress: dbPlace.placeAddress,
      placeLatitude: parseFloat(dbPlace.placeLatitude),
      placeLongitude: parseFloat(dbPlace.placeLongitude)
    };
  }
}
