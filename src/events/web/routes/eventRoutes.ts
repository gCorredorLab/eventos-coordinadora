/**
 * @project Eventos - Coordinadora
 * @file eventRoutes.ts
 * @description Definición de las rutas relacionadas con la entidad Event.
 * @verified SI
 * @status DONE
 * @unitTests NO
 * @unitTestsStatus DEVELOP
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Define las rutas relacionadas con los eventos, permitiendo la
 * creación, obtención, actualización y eliminación. Incluye autenticación JWT.
 */

/** @import dependencias */
import {FastifyInstance} from "fastify";
import {EventController} from "../../infrastructure/controllers/EventController";
import {DataEventRepository} from "../../infrastructure/repositories/DataEventRepository";
import {CreateEvent} from "../../application/use-cases/CreateEvent";
import {GetAllEvents} from "../../application/use-cases/GetAllEvents";
import {GetEvent} from "../../application/use-cases/GetEvent";
import {UpdateEvent} from "../../application/use-cases/UpdateEvent";
import {DeleteEvent} from "../../application/use-cases/DeleteEvent";
import {GetAllEventNearby} from "../../application/use-cases/GetAllEventNearby";

/** Definición de tipos para los parámetros de las rutas */
interface EventParams {
  eventId: string;
}

/** Inicialización del repositorio y casos de uso fuera de la función de rutas */
const eventRepository = new DataEventRepository();
const createEvent = new CreateEvent(eventRepository);
const getAllEvents = new GetAllEvents(eventRepository);
const getEvent = new GetEvent(eventRepository);
const updateEvent = new UpdateEvent(eventRepository);
const deleteEvent = new DeleteEvent(eventRepository);
const getAllEventNearby = new GetAllEventNearby(eventRepository);

/** Creación del controlador de eventos */
const eventController = new EventController(createEvent, getAllEvents, getEvent, updateEvent, deleteEvent, getAllEventNearby);

/**
 * Función para definir y registrar las rutas de eventos
 * @param server Instancia del servidor Fastify
 */
export async function eventRoutes(server: FastifyInstance) {
  /** Configuración común para todas las rutas protegidas */
  const securityScheme = {
    security: [{bearerAuth: []}]
  };

  /** Ruta para crear un nuevo evento */
  server.post(
    "/events",
    {
      schema: {
        description: "Crear un evento",
        tags: ["Eventos"],
        body: {
          type: "object",
          required: ["eventUserCreateId", "eventPlaceId", "eventName", "eventDescription", "eventDate"],
          properties: {
            eventUserCreateId: {type: "number"},
            eventPlaceId: {type: "number"},
            eventName: {type: "string"},
            eventDescription: {type: "string"},
            eventDate: {type: "string", format: "date-time"}
          }
        },
        response: {
          201: {
            description: "Successful response",
            type: "object",
            properties: {
              eventId: {type: "number"},
              eventUserCreateId: {type: "number"},
              eventPlaceId: {type: "number"},
              eventName: {type: "string"},
              eventDescription: {type: "string"},
              eventDate: {type: "string", format: "date-time"}
            }
          }
        },
        ...securityScheme
      }
    },
    eventController.createEventHandler.bind(eventController)
  );

  /** Ruta para obtener todos los eventos */
  server.get(
    "/events",
    {
      schema: {
        description: "Obtener todos los eventos",
        tags: ["Eventos"],
        response: {
          200: {
            description: "Successful response",
            type: "array",
            items: {
              type: "object",
              properties: {
                eventId: {type: "number"},
                eventUserCreateId: {type: "number"},
                eventPlaceId: {type: "number"},
                eventName: {type: "string"},
                eventDescription: {type: "string"},
                eventDate: {type: "string", format: "date-time"}
              }
            }
          }
        },
        ...securityScheme
      }
    },
    eventController.getAllEventsHandler.bind(eventController)
  );

  /** Ruta para obtener un evento por ID */
  server.get<{Params: EventParams}>(
    "/events/:eventId",
    {
      schema: {
        description: "Obtener un evento por ID",
        tags: ["Eventos"],
        params: {
          type: "object",
          properties: {
            eventId: {type: "string"}
          }
        },
        response: {
          200: {
            description: "Successful response",
            type: "object",
            properties: {
              eventId: {type: "number"},
              eventUserCreateId: {type: "number"},
              eventPlaceId: {type: "number"},
              eventName: {type: "string"},
              eventDescription: {type: "string"},
              eventDate: {type: "string", format: "date-time"}
            }
          }
        },
        ...securityScheme
      }
    },
    eventController.getEventHandler.bind(eventController)
  );

  /** Ruta para actualizar un evento */
  server.put<{Params: EventParams}>(
    "/events/:eventId",
    {
      schema: {
        description: "Actualizar un evento",
        tags: ["Eventos"],
        params: {
          type: "object",
          properties: {
            eventId: {type: "string"}
          }
        },
        body: {
          type: "object",
          properties: {
            eventName: {type: "string"},
            eventDescription: {type: "string"},
            eventDate: {type: "string", format: "date-time"}
          }
        },
        response: {
          200: {
            description: "Successful response",
            type: "object",
            properties: {
              eventId: {type: "number"},
              eventUserCreateId: {type: "number"},
              eventPlaceId: {type: "number"},
              eventName: {type: "string"},
              eventDescription: {type: "string"},
              eventDate: {type: "string", format: "date-time"}
            }
          }
        },
        ...securityScheme
      }
    },
    eventController.updateEventHandler.bind(eventController)
  );

  /** Ruta para eliminar un evento */
  server.delete<{Params: EventParams}>(
    "/events/:eventId",
    {
      schema: {
        description: "Eliminar un evento",
        tags: ["Eventos"],
        params: {
          type: "object",
          properties: {
            eventId: {type: "string"}
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
    eventController.deleteEventHandler.bind(eventController)
  );

  /** Ruta para obtener eventos con ubicaciones cercanas */
  server.get<{Querystring: {range?: string; latitude?: string; longitude?: string}}>(
    "/events/nearby",
    {
      schema: {
        description: "Obtener eventos con ubicaciones cercanas",
        tags: ["Eventos"],
        querystring: {
          type: "object",
          properties: {
            range: {type: "string", description: "Rango en metros para buscar ubicaciones cercanas"},
            latitude: {type: "string", description: "Latitud del punto de referencia"},
            longitude: {type: "string", description: "Longitud del punto de referencia"}
          }
        },
        response: {
          200: {
            description: "Successful response",
            type: "array",
            items: {
              type: "object",
              properties: {
                event: {
                  type: "object",
                  properties: {
                    eventId: {type: "number"},
                    eventUserCreateId: {type: "number"},
                    eventPlaceId: {type: "number"},
                    eventName: {type: "string"},
                    eventDescription: {type: "string"},
                    eventDate: {type: "string", format: "date-time"}
                  }
                },
                place: {
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
                },
                nearbyLocations: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: {type: "string"},
                      distance: {type: "number"},
                      latitude: {type: "number"},
                      longitude: {type: "number"}
                    }
                  }
                }
              }
            }
          }
        },
        ...securityScheme
      }
    },
    eventController.getAllEventNearbyHandler.bind(eventController)
  );

  /** Ruta para obtener la asistencia por día de la semana */
  server.get(
    "/events/attendance-by-day",
    {
      schema: {
        description: "Obtener la asistencia a eventos por día de la semana",
        tags: ["Eventos"],
        response: {
          200: {
            description: "Successful response",
            type: "object",
            properties: {
              Sunday: {type: "number"},
              Monday: {type: "number"},
              Tuesday: {type: "number"},
              Wednesday: {type: "number"},
              Thursday: {type: "number"},
              Friday: {type: "number"},
              Saturday: {type: "number"}
            }
          }
        },
        ...securityScheme
      }
    },
    async (request, reply) => {
      try {
        const attendanceByDay = await eventRepository.getAttendanceByDayOfWeek();
        reply.send(attendanceByDay);
      } catch (error) {
        console.error("Error al obtener la asistencia por día:", error);
        reply.code(500).send({error: "Error al obtener la asistencia por día"});
      }
    }
  );
}
