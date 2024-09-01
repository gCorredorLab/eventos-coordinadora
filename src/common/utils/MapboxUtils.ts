/** @import librerias */
import dotenv from "dotenv";
import axios from "axios";

/** @load variables de entorno */
dotenv.config();

export default class MapboxUtils {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.MAPBOX_API_KEY ?? "";
  }

  async getNearbyLocations(latitude: number, longitude: number, range: number): Promise<any[]> {
    try {
      const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json`, {
        params: {
          access_token: this.apiKey,
          limit: 10,
          types: "poi",
          radius: range
        }
      });

      return response.data.features.map((feature: any) => ({
        name: feature.text,
        category: feature.properties.category,
        distance: feature.properties.distance,
        latitude: feature.center[1],
        longitude: feature.center[0]
      }));
    } catch (error) {
      console.error("Error fetching nearby locations from Mapbox:", error);
      throw new Error("Failed to fetch nearby locations");
    }
  }
}
