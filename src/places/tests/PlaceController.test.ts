/**
 * @project Eventos - Coordinadora
 * @file PlaceController.test.ts
 * @description Pruebas unitarias para el controlador PlaceController
 * @verified SI
 * @status DONE
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo contiene pruebas unitarias para el controlador PlaceController,
 * que maneja las solicitudes relacionadas con la entidad Place. Las pruebas incluyen
 * la creación, obtención, actualización y eliminación de lugares. Se utilizan mocks
 * de los casos de uso para verificar que las solicitudes sean procesadas correctamente
 * y que el controlador maneje adecuadamente los códigos de estado y las respuestas.
 */

/** @import dependencias */
import {PlaceController} from "../infrastructure/controllers/PlaceController";
import {CreatePlace} from "../application/use-cases/CreatePlace";
import {GetAllPlaces} from "../application/use-cases/GetAllPlaces";
import {GetPlace} from "../application/use-cases/GetPlace";
import {UpdatePlace} from "../application/use-cases/UpdatePlace";
import {DeletePlace} from "../application/use-cases/DeletePlace";
import {Place} from "../domain/entities/Place";

/** @note Mock de FastifyReply */
const mockReply = () => {
  const res: any = {};
  res.code = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe("PlaceController", () => {
  let placeController: PlaceController;
  let mockCreatePlace: jest.Mocked<CreatePlace>;
  let mockGetAllPlaces: jest.Mocked<GetAllPlaces>;
  let mockGetPlace: jest.Mocked<GetPlace>;
  let mockUpdatePlace: jest.Mocked<UpdatePlace>;
  let mockDeletePlace: jest.Mocked<DeletePlace>;

  /** @beforeEach Prepara el entorno antes de cada prueba */
  beforeEach(() => {
    mockCreatePlace = {execute: jest.fn()} as any;
    mockGetAllPlaces = {execute: jest.fn()} as any;
    mockGetPlace = {execute: jest.fn()} as any;
    mockUpdatePlace = {execute: jest.fn()} as any;
    mockDeletePlace = {execute: jest.fn()} as any;

    placeController = new PlaceController(mockCreatePlace, mockGetAllPlaces, mockGetPlace, mockUpdatePlace, mockDeletePlace);
  });

  /** @test Crea un lugar y retorna el estado 201 */
  describe("createPlaceHandler", () => {
    it("should create a place and return 201 status", async () => {
      const mockPlace: Place = {
        placeId: 1,
        placeUserCreateId: 1,
        placeName: "Auditorio",
        placeDescription: "Un lugar para conferencias",
        placeEmail: "auditorio@example.com",
        placePhone: "123456789",
        placeAddress: "Calle Falsa 123",
        placeLatitude: 40.7128,
        placeLongitude: -74.006
      };

      mockCreatePlace.execute.mockResolvedValue(mockPlace);

      const req: any = {body: {...mockPlace, placeId: undefined}};
      const reply = mockReply();

      await placeController.createPlaceHandler(req, reply);

      expect(mockCreatePlace.execute).toHaveBeenCalledWith(req.body);
      expect(reply.code).toHaveBeenCalledWith(201);
      expect(reply.send).toHaveBeenCalledWith(mockPlace);
    });

    it("should return 500 status on error", async () => {
      mockCreatePlace.execute.mockRejectedValue(new Error("Database error"));

      const req: any = {body: {}};
      const reply = mockReply();

      await placeController.createPlaceHandler(req, reply);

      expect(reply.code).toHaveBeenCalledWith(500);
      expect(reply.send).toHaveBeenCalledWith({error: "Error al crear el lugar"});
    });
  });

  /** @test Obtiene todos los lugares y retorna el estado 200 */
  describe("getAllPlacesHandler", () => {
    it("should get all places and return 200 status", async () => {
      const mockPlaces: Place[] = [
        {
          placeId: 1,
          placeUserCreateId: 1,
          placeName: "Auditorio",
          placeDescription: "Un lugar para conferencias",
          placeEmail: "auditorio@example.com",
          placePhone: "123456789",
          placeAddress: "Calle Falsa 123",
          placeLatitude: 40.7128,
          placeLongitude: -74.006
        },
        {
          placeId: 2,
          placeUserCreateId: 2,
          placeName: "Teatro",
          placeDescription: "Un lugar para obras de teatro",
          placeEmail: "teatro@example.com",
          placePhone: "987654321",
          placeAddress: "Avenida Siempreviva 742",
          placeLatitude: 34.0522,
          placeLongitude: -118.2437
        }
      ];

      mockGetAllPlaces.execute.mockResolvedValue(mockPlaces);

      const req: any = {};
      const reply = mockReply();

      await placeController.getAllPlacesHandler(req, reply);

      expect(mockGetAllPlaces.execute).toHaveBeenCalled();
      expect(reply.send).toHaveBeenCalledWith(mockPlaces);
    });

    it("should return 500 status on error", async () => {
      mockGetAllPlaces.execute.mockRejectedValue(new Error("Database error"));

      const req: any = {};
      const reply = mockReply();

      await placeController.getAllPlacesHandler(req, reply);

      expect(reply.code).toHaveBeenCalledWith(500);
      expect(reply.send).toHaveBeenCalledWith({error: "Error al obtener los lugares"});
    });
  });

  /** @test Obtiene un lugar por ID y retorna el estado 200 */
  describe("getPlaceHandler", () => {
    it("should get a place by ID and return 200 status", async () => {
      const mockPlace: Place = {
        placeId: 1,
        placeUserCreateId: 1,
        placeName: "Auditorio",
        placeDescription: "Un lugar para conferencias",
        placeEmail: "auditorio@example.com",
        placePhone: "123456789",
        placeAddress: "Calle Falsa 123",
        placeLatitude: 40.7128,
        placeLongitude: -74.006
      };

      mockGetPlace.execute.mockResolvedValue(mockPlace);

      const req: any = {params: {placeId: "1"}};
      const reply = mockReply();

      await placeController.getPlaceHandler(req, reply);

      expect(mockGetPlace.execute).toHaveBeenCalledWith(1);
      expect(reply.send).toHaveBeenCalledWith(mockPlace);
    });

    it("should return 404 status when place is not found by ID", async () => {
      mockGetPlace.execute.mockResolvedValue(null);

      const req: any = {params: {placeId: "999"}};
      const reply = mockReply();

      await placeController.getPlaceHandler(req, reply);

      expect(reply.code).toHaveBeenCalledWith(404);
      expect(reply.send).toHaveBeenCalledWith({error: "Lugar no encontrado"});
    });

    it("should return 500 status on error when getting place by ID", async () => {
      mockGetPlace.execute.mockRejectedValue(new Error("Database error"));

      const req: any = {params: {placeId: "1"}};
      const reply = mockReply();

      await placeController.getPlaceHandler(req, reply);

      expect(reply.code).toHaveBeenCalledWith(500);
      expect(reply.send).toHaveBeenCalledWith({error: "Error al obtener el lugar"});
    });
  });

  /** @test Actualiza un lugar y retorna el estado 200 */
  describe("updatePlaceHandler", () => {
    it("should update a place and return 200 status", async () => {
      const mockPlace: Place = {
        placeId: 1,
        placeUserCreateId: 1,
        placeName: "Auditorio",
        placeDescription: "Auditorio actualizado",
        placeEmail: "auditorio@example.com",
        placePhone: "123456789",
        placeAddress: "Calle Falsa 123",
        placeLatitude: 40.7128,
        placeLongitude: -74.006
      };

      mockUpdatePlace.execute.mockResolvedValue(mockPlace);

      const req: any = {params: {placeId: "1"}, body: {...mockPlace, placeId: undefined}};
      const reply = mockReply();

      await placeController.updatePlaceHandler(req, reply);

      expect(mockUpdatePlace.execute).toHaveBeenCalledWith(1, req.body);
      expect(reply.send).toHaveBeenCalledWith(mockPlace);
    });

    it("should return 500 status on error when updating place", async () => {
      mockUpdatePlace.execute.mockRejectedValue(new Error("Database error"));

      const req: any = {params: {placeId: "1"}, body: {}};
      const reply = mockReply();

      await placeController.updatePlaceHandler(req, reply);

      expect(reply.code).toHaveBeenCalledWith(500);
      expect(reply.send).toHaveBeenCalledWith({error: "Error al actualizar el lugar"});
    });
  });

  /** @test Elimina un lugar y retorna el estado 204 */
  describe("deletePlaceHandler", () => {
    it("should delete a place and return 204 status", async () => {
      mockDeletePlace.execute.mockResolvedValue(undefined);

      const req: any = {params: {placeId: "1"}};
      const reply = mockReply();

      await placeController.deletePlaceHandler(req, reply);

      expect(mockDeletePlace.execute).toHaveBeenCalledWith(1);
      expect(reply.code).toHaveBeenCalledWith(204);
      expect(reply.send).toHaveBeenCalled();
    });

    it("should return 500 status on error when deleting place", async () => {
      mockDeletePlace.execute.mockRejectedValue(new Error("Database error"));

      const req: any = {params: {placeId: "1"}};
      const reply = mockReply();

      await placeController.deletePlaceHandler(req, reply);

      expect(reply.code).toHaveBeenCalledWith(500);
      expect(reply.send).toHaveBeenCalledWith({error: "Error al eliminar el lugar"});
    });
  });
});
