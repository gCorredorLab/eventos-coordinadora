/**
 * @project Eventos - Coordinadora
 * @file MapboxUtils.ts
 * @description Utilidades para interactuar con la API de Mapbox y realizar cálculos geoespaciales.
 * @verified SI
 * @status DONE
 * @unitTests NO
 * @unitTestsStatus PROGRESS
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Esta clase proporciona métodos para interactuar con la API de Mapbox, incluyendo la obtención
 * de ubicaciones cercanas y el cálculo de distancias utilizando la fórmula de Haversine.
 * Se requiere una clave de API válida de Mapbox para su funcionamiento.
 */

/** @import librerías */
import dotenv from "dotenv";
import axios from "axios";

/** @load variables de entorno */
dotenv.config();

export default class MapboxUtils {
  private apiKey: string;

  /**
   * @constructor
   * Inicializa la clase `MapboxUtils` con una clave API de Mapbox.
   * La clave API está hardcodeada, pero puede ser modificada para usar variables de entorno.
   */
  constructor() {
    this.apiKey = process.env.MAPBOX_API_KEY ?? "";
  }

  /**
   * @private
   * @function calculateDistance
   * @description Calcula la distancia entre dos puntos en la Tierra utilizando la fórmula de Haversine.
   * @param {number} lat1 - Latitud del primer punto.
   * @param {number} lon1 - Longitud del primer punto.
   * @param {number} lat2 - Latitud del segundo punto.
   * @param {number} lon2 - Longitud del segundo punto.
   * @returns {number} - La distancia entre los dos puntos en metros.
   */
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3; // Radio de la Tierra en metros
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // distancia en metros
  }

  /**
   * @async
   * @function getNearbyLocations
   * @description Obtiene ubicaciones cercanas utilizando la API de Mapbox y las filtra en función de la distancia desde un punto dado.
   * @param {number} latitude - Latitud del punto de referencia.
   * @param {number} longitude - Longitud del punto de referencia.
   * @param {number} range - Rango máximo en metros para filtrar las ubicaciones cercanas.
   * @returns {Promise<any[]>} - Promesa que resuelve en una lista de ubicaciones cercanas dentro del rango especificado.
   * @throws {Error} - Lanza un error si falla la solicitud a la API de Mapbox o si falta la clave API.
   */
  async getNearbyLocations(latitude: number, longitude: number, range: number): Promise<any[]> {
    if (!this.apiKey) {
      throw new Error("Mapbox access token is missing");
    }
    try {
      const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json`, {
        params: {
          access_token: this.apiKey,
          limit: 10,
          types: "poi",
          proximity: `${longitude},${latitude}`
        }
      });

      /** @note Filtra las ubicaciones basadas en la distancia dentro del rango especificado */
      return response.data.features
        .map((feature: any) => {
          const locationLatitude = feature.center[1];
          const locationLongitude = feature.center[0];
          const distance = this.calculateDistance(latitude, longitude, locationLatitude, locationLongitude);

          return {
            name: feature.text,
            category: feature.properties.category,
            distance: distance,
            latitude: locationLatitude,
            longitude: locationLongitude
          };
        })
        .filter((location: any) => location.distance <= range);
    } catch (error) {
      console.error("Error al obtener ubicaciones cercanas desde Mapbox:", error);
      throw new Error("No se pudo obtener las ubicaciones cercanas");
    }
  }
}
