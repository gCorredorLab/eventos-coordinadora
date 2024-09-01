/**
 * @project Eventos - Coordinadora
 * @file PlaceController.ts
 * @description Controlador para manejar las solicitudes relacionadas con la entidad Place.
 * @verified SI
 * @status DONE
 * @unitTests SI
 * @unitTestsStatus PASSED
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este controlador maneja las solicitudes HTTP relacionadas con los lugares,
 * incluyendo la creación, obtención, actualización y eliminación de lugares.
 */

/** @import dependencias */
import {FastifyRequest, FastifyReply} from "fastify";
import {Place} from "../../domain/entities/Place";
import {CreatePlace} from "../../application/use-cases/CreatePlace";
import {GetAllPlaces} from "../../application/use-cases/GetAllPlaces";
import {GetPlace} from "../../application/use-cases/GetPlace";
import {UpdatePlace} from "../../application/use-cases/UpdatePlace";
import {DeletePlace} from "../../application/use-cases/DeletePlace";

/** Definición de tipos para los parámetros de las rutas */
interface PlaceParams {
  placeId: string;
}

/** @class PlaceController */
export class PlaceController {
  constructor(
    private createPlace: CreatePlace,
    private getAllPlaces: GetAllPlaces,
    private getPlace: GetPlace,
    private updatePlace: UpdatePlace,
    private deletePlace: DeletePlace
  ) {}

  /**
   * @method createPlaceHandler
   * @description Maneja la creación de un nuevo lugar
   * @param {FastifyRequest} req - La solicitud HTTP
   * @param {FastifyReply} reply - La respuesta HTTP
   * @returns {Promise<void>}
   */
  async createPlaceHandler(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const placeData = req.body as Omit<Place, "placeId">;
      const place = await this.createPlace.execute(placeData);
      reply.code(201).send(place);
    } catch (error) {
      reply.code(500).send({error: "Error al crear el lugar"});
    }
  }

  /**
   * @method getAllPlaceHandler
   * @description Maneja la obtención de todos los lugares
   * @param {FastifyRequest} req - La solicitud HTTP
   * @param {FastifyReply} reply - La respuesta HTTP
   * @returns {Promise<void>}
   */
  async getAllPlacesHandler(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const places = await this.getAllPlaces.execute();
      reply.send(places);
    } catch (error) {
      reply.code(500).send({error: "Error al obtener los lugares"});
    }
  }

  /**
   * @method getPlaceHandler
   * @description Maneja la obtención de un lugar por ID
   * @param {FastifyRequest<{Params: PlaceParams}>} req - La solicitud HTTP con los parámetros tipados
   * @param {FastifyReply} reply - La respuesta HTTP
   * @returns {Promise<void>}
   */
  async getPlaceHandler(req: FastifyRequest<{Params: PlaceParams}>, reply: FastifyReply): Promise<void> {
    try {
      const placeId = Number(req.params.placeId);
      const place = await this.getPlace.execute(placeId);
      if (place) {
        reply.send(place);
      } else {
        reply.code(404).send({error: "Lugar no encontrado"});
      }
    } catch (error) {
      reply.code(500).send({error: "Error al obtener el lugar"});
    }
  }

  /**
   * @method updatePlaceHandler
   * @description Maneja la actualización de un lugar existente
   * @param {FastifyRequest<{Params: PlaceParams}>} req - La solicitud HTTP con los parámetros tipados
   * @param {FastifyReply} reply - La respuesta HTTP
   * @returns {Promise<void>}
   */
  async updatePlaceHandler(req: FastifyRequest<{Params: PlaceParams}>, reply: FastifyReply): Promise<void> {
    try {
      const placeId = Number(req.params.placeId);
      const placeData = req.body as Omit<Place, "placeId">;
      const updatedPlace = await this.updatePlace.execute(placeId, placeData);
      reply.send(updatedPlace);
    } catch (error) {
      reply.code(500).send({error: "Error al actualizar el lugar"});
    }
  }

  /**
   * @method deletePlaceHandler
   * @description Maneja la eliminación de un lugar por ID
   * @param {FastifyRequest<{Params: PlaceParams}>} req - La solicitud HTTP con los parámetros tipados
   * @param {FastifyReply} reply - La respuesta HTTP
   * @returns {Promise<void>}
   */
  async deletePlaceHandler(req: FastifyRequest<{Params: PlaceParams}>, reply: FastifyReply): Promise<void> {
    try {
      const placeId = Number(req.params.placeId);
      await this.deletePlace.execute(placeId);
      reply.code(204).send();
    } catch (error) {
      reply.code(500).send({error: "Error al eliminar el lugar"});
    }
  }
}
