/**
 * @project Eventos - Coordinadora
 * @file placeRoutes.ts
 * @description Definición de las rutas relacionadas con la entidad Place.
 * @verified SI
 * @status DONE
 * @unitTests NO
 * @unitTestsStatus DEVELOP
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Define las rutas relacionadas con los lugares, permitiendo la
 * creación, obtención, actualización y eliminación. Incluye autenticación JWT.
 */

/** Importación de dependencias */
import {FastifyInstance} from "fastify";
import {PlaceController} from "../../infrastructure/controllers/PlaceController";
import {DataPlaceRepository} from "../../infrastructure/repositories/DataPlaceRepository";
import {CreatePlace} from "../../application/use-cases/CreatePlace";
import {GetAllPlaces} from "../../application/use-cases/GetAllPlaces";
import {GetPlace} from "../../application/use-cases/GetPlace";
import {UpdatePlace} from "../../application/use-cases/UpdatePlace";
import {DeletePlace} from "../../application/use-cases/DeletePlace";

/** Definición de tipos para los parámetros de las rutas */
interface PlaceParams {
  placeId: string;
}

/** Inicialización del repositorio y casos de uso fuera de la función de rutas */
const placeRepository = new DataPlaceRepository();
const createPlace = new CreatePlace(placeRepository);
const getAllPlaces = new GetAllPlaces(placeRepository);
const getPlace = new GetPlace(placeRepository);
const updatePlace = new UpdatePlace(placeRepository);
const deletePlace = new DeletePlace(placeRepository);

/** Creación del controlador de lugares */
const placeController = new PlaceController(createPlace, getAllPlaces, getPlace, updatePlace, deletePlace);

/**
 * Función para definir y registrar las rutas de lugares
 * @param server Instancia del servidor Fastify
 */
export async function placeRoutes(server: FastifyInstance) {
  /** Configuración común para todas las rutas protegidas */
  const securityScheme = {
    security: [{bearerAuth: []}]
  };

  /** Ruta para crear un nuevo lugar */
  server.post(
    "/places",
    {
      schema: {
        description: "Crear un lugar",
        tags: ["Lugares"],
        body: {
          type: "object",
          required: [
            "placeUserCreateId",
            "placeName",
            "placeDescription",
            "placeEmail",
            "placePhone",
            "placeAddress",
            "placeLatitude",
            "placeLongitude"
          ],
          properties: {
            placeUserCreateId: {type: "number"},
            placeName: {type: "string"},
            placeDescription: {type: "string"},
            placeEmail: {type: "string", format: "email"},
            placePhone: {type: "string"},
            placeAddress: {type: "string"},
            placeLatitude: {type: "number"},
            placeLongitude: {type: "number"}
          }
        },
        response: {
          201: {
            description: "Successful response",
            type: "object",
            properties: {
              placeId: {type: "number"},
              placeUserCreateId: {type: "number"},
              placeName: {type: "string"},
              placeDescription: {type: "string"},
              placeEmail: {type: "string"},
              placePhone: {type: "string"},
              placeAddress: {type: "string"},
              placeLatitude: {type: "number"},
              placeLongitude: {type: "number"}
            }
          }
        },
        ...securityScheme
      }
    },
    placeController.createPlaceHandler.bind(placeController)
  );

  /** Ruta para obtener todos los lugares */
  server.get(
    "/places",
    {
      schema: {
        description: "Obtener todos los lugares",
        tags: ["Lugares"],
        response: {
          200: {
            description: "Successful response",
            type: "array",
            items: {
              type: "object",
              properties: {
                placeId: {type: "number"},
                placeUserCreateId: {type: "number"},
                placeName: {type: "string"},
                placeDescription: {type: "string"},
                placeEmail: {type: "string"},
                placePhone: {type: "string"},
                placeAddress: {type: "string"},
                placeLatitude: {type: "number"},
                placeLongitude: {type: "number"}
              }
            }
          }
        },
        ...securityScheme
      }
    },
    placeController.getAllPlacesHandler.bind(placeController)
  );

  /** Ruta para obtener un lugar por ID */
  server.get<{Params: PlaceParams}>(
    "/places/:placeId",
    {
      schema: {
        description: "Obtener un lugar por ID",
        tags: ["Lugares"],
        params: {
          type: "object",
          properties: {
            placeId: {type: "string"}
          }
        },
        response: {
          200: {
            description: "Successful response",
            type: "object",
            properties: {
              placeId: {type: "number"},
              placeUserCreateId: {type: "number"},
              placeName: {type: "string"},
              placeDescription: {type: "string"},
              placeEmail: {type: "string"},
              placePhone: {type: "string"},
              placeAddress: {type: "string"},
              placeLatitude: {type: "number"},
              placeLongitude: {type: "number"}
            }
          }
        },
        ...securityScheme
      }
    },
    placeController.getPlaceHandler.bind(placeController)
  );

  /** Ruta para actualizar un lugar */
  server.put<{Params: PlaceParams}>(
    "/places/:placeId",
    {
      schema: {
        description: "Actualizar un lugar",
        tags: ["Lugares"],
        params: {
          type: "object",
          properties: {
            placeId: {type: "string"}
          }
        },
        body: {
          type: "object",
          properties: {
            placeName: {type: "string"},
            placeDescription: {type: "string"},
            placeEmail: {type: "string", format: "email"},
            placePhone: {type: "string"},
            placeAddress: {type: "string"},
            placeLatitude: {type: "number"},
            placeLongitude: {type: "number"}
          }
        },
        response: {
          200: {
            description: "Successful response",
            type: "object",
            properties: {
              placeId: {type: "number"},
              placeUserCreateId: {type: "number"},
              placeName: {type: "string"},
              placeDescription: {type: "string"},
              placeEmail: {type: "string"},
              placePhone: {type: "string"},
              placeAddress: {type: "string"},
              placeLatitude: {type: "number"},
              placeLongitude: {type: "number"}
            }
          }
        },
        ...securityScheme
      }
    },
    placeController.updatePlaceHandler.bind(placeController)
  );

  /** Ruta para eliminar un lugar */
  server.delete<{Params: PlaceParams}>(
    "/places/:placeId",
    {
      schema: {
        description: "Eliminar un lugar",
        tags: ["Lugares"],
        params: {
          type: "object",
          properties: {
            placeId: {type: "string"}
          }
        },
        response: {
          204: {
            description: "Successful response",
            type: "null"
          }
        },
        ...securityScheme
      }
    },
    placeController.deletePlaceHandler.bind(placeController)
  );
}
