/**
 * @project Eventos - Coordinadora
 * @file RegisterController.test.ts
 * @description Pruebas unitarias para el controlador RegisterController
 * @verified SI
 * @status DONE
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo contiene pruebas unitarias para el controlador RegisterController,
 * que maneja las solicitudes relacionadas con la entidad Register. Las pruebas incluyen
 * la creación, obtención, actualización y eliminación de registros. Se utilizan mocks
 * de los casos de uso para verificar que las solicitudes sean procesadas correctamente
 * y que el controlador maneje adecuadamente los códigos de estado y las respuestas.
 */

/** @import dependencias */
import {RegisterController} from "../infrastructure/controllers/RegisterController";
import {CreateRegister} from "../application/use-cases/CreateRegister";
import {GetAllRegisters} from "../application/use-cases/GetAllRegisters";
import {GetRegister} from "../application/use-cases/GetRegister";
import {UpdateRegister} from "../application/use-cases/UpdateRegister";
import {DeleteRegister} from "../application/use-cases/DeleteRegister";
import {Register} from "../domain/entities/Register";

/** @note Mock de FastifyReply */
const mockReply = () => {
  const res: any = {};
  res.code = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe("RegisterController", () => {
  let registerController: RegisterController;
  let mockCreateRegister: jest.Mocked<CreateRegister>;
  let mockGetAllRegisters: jest.Mocked<GetAllRegisters>;
  let mockGetRegister: jest.Mocked<GetRegister>;
  let mockUpdateRegister: jest.Mocked<UpdateRegister>;
  let mockDeleteRegister: jest.Mocked<DeleteRegister>;

  /** @beforeEach Prepara el entorno antes de cada prueba */
  beforeEach(() => {
    mockCreateRegister = {execute: jest.fn()} as any;
    mockGetAllRegisters = {execute: jest.fn()} as any;
    mockGetRegister = {execute: jest.fn()} as any;
    mockUpdateRegister = {execute: jest.fn()} as any;
    mockDeleteRegister = {execute: jest.fn()} as any;

    registerController = new RegisterController(mockCreateRegister, mockGetAllRegisters, mockGetRegister, mockUpdateRegister, mockDeleteRegister);
  });

  /** @test Crea un registro y retorna el estado 201 */
  describe("createRegisterHandler", () => {
    it("should create a register and return 201 status", async () => {
      const mockRegister: Register = {
        registerId: 1,
        registerUserId: 1,
        registerEventId: 1,
        registerDate: new Date("2024-09-15T10:00:00Z"),
        registerConfirmation: true
      };

      mockCreateRegister.execute.mockResolvedValue(mockRegister);

      const req: any = {body: {...mockRegister, registerId: undefined}};
      const reply = mockReply();

      await registerController.createRegisterHandler(req, reply);

      expect(mockCreateRegister.execute).toHaveBeenCalledWith(req.body);
      expect(reply.code).toHaveBeenCalledWith(201);
      expect(reply.send).toHaveBeenCalledWith(mockRegister);
    });

    it("should return 500 status on error", async () => {
      mockCreateRegister.execute.mockRejectedValue(new Error("Database error"));

      const req: any = {body: {}};
      const reply = mockReply();

      await registerController.createRegisterHandler(req, reply);

      expect(reply.code).toHaveBeenCalledWith(500);
      expect(reply.send).toHaveBeenCalledWith({error: "Error al crear el registro"});
    });
  });

  /** @test Obtiene todos los registros y retorna el estado 200 */
  describe("getAllRegistersHandler", () => {
    it("should get all registers and return 200 status", async () => {
      const mockRegisters: Register[] = [
        {
          registerId: 1,
          registerUserId: 1,
          registerEventId: 1,
          registerDate: new Date("2024-09-15T10:00:00Z"),
          registerConfirmation: true
        },
        {
          registerId: 2,
          registerUserId: 2,
          registerEventId: 2,
          registerDate: new Date("2024-10-20T20:00:00Z"),
          registerConfirmation: false
        }
      ];

      mockGetAllRegisters.execute.mockResolvedValue(mockRegisters);

      const req: any = {};
      const reply = mockReply();

      await registerController.getAllRegistersHandler(req, reply);

      expect(mockGetAllRegisters.execute).toHaveBeenCalled();
      expect(reply.send).toHaveBeenCalledWith(mockRegisters);
    });

    it("should return 500 status on error", async () => {
      mockGetAllRegisters.execute.mockRejectedValue(new Error("Database error"));

      const req: any = {};
      const reply = mockReply();

      await registerController.getAllRegistersHandler(req, reply);

      expect(reply.code).toHaveBeenCalledWith(500);
      expect(reply.send).toHaveBeenCalledWith({error: "Error al obtener los registros"});
    });
  });

  /** @test Obtiene un registro por ID y retorna el estado 200 */
  describe("getRegisterHandler", () => {
    it("should get a register by ID and return 200 status", async () => {
      const mockRegister: Register = {
        registerId: 1,
        registerUserId: 1,
        registerEventId: 1,
        registerDate: new Date("2024-09-15T10:00:00Z"),
        registerConfirmation: true
      };

      mockGetRegister.execute.mockResolvedValue(mockRegister);

      const req: any = {params: {registerId: "1"}};
      const reply = mockReply();

      await registerController.getRegisterHandler(req, reply);

      expect(mockGetRegister.execute).toHaveBeenCalledWith(1);
      expect(reply.send).toHaveBeenCalledWith(mockRegister);
    });

    it("should return 404 status when register is not found by ID", async () => {
      mockGetRegister.execute.mockResolvedValue(null);

      const req: any = {params: {registerId: "999"}};
      const reply = mockReply();

      await registerController.getRegisterHandler(req, reply);

      expect(reply.code).toHaveBeenCalledWith(404);
      expect(reply.send).toHaveBeenCalledWith({error: "Registro no encontrado"});
    });

    it("should return 500 status on error when getting register by ID", async () => {
      mockGetRegister.execute.mockRejectedValue(new Error("Database error"));

      const req: any = {params: {registerId: "1"}};
      const reply = mockReply();

      await registerController.getRegisterHandler(req, reply);

      expect(reply.code).toHaveBeenCalledWith(500);
      expect(reply.send).toHaveBeenCalledWith({error: "Error al obtener el registro"});
    });
  });

  /** @test Actualiza un registro y retorna el estado 200 */
  describe("updateRegisterHandler", () => {
    it("should update a register and return 200 status", async () => {
      const mockRegister: Register = {
        registerId: 1,
        registerUserId: 1,
        registerEventId: 1,
        registerDate: new Date("2024-09-15T10:00:00Z"),
        registerConfirmation: true
      };

      mockUpdateRegister.execute.mockResolvedValue(mockRegister);

      const req: any = {params: {registerId: "1"}, body: {...mockRegister, registerId: undefined}};
      const reply = mockReply();

      await registerController.updateRegisterHandler(req, reply);

      expect(mockUpdateRegister.execute).toHaveBeenCalledWith(1, req.body);
      expect(reply.send).toHaveBeenCalledWith(mockRegister);
    });

    it("should return 500 status on error when updating register", async () => {
      mockUpdateRegister.execute.mockRejectedValue(new Error("Database error"));

      const req: any = {params: {registerId: "1"}, body: {}};
      const reply = mockReply();

      await registerController.updateRegisterHandler(req, reply);

      expect(reply.code).toHaveBeenCalledWith(500);
      expect(reply.send).toHaveBeenCalledWith({error: "Error al actualizar el registro"});
    });
  });

  /** @test Elimina un registro y retorna el estado 204 */
  describe("deleteRegisterHandler", () => {
    it("should delete a register and return 204 status", async () => {
      mockDeleteRegister.execute.mockResolvedValue(undefined);

      const req: any = {params: {registerId: "1"}};
      const reply = mockReply();

      await registerController.deleteRegisterHandler(req, reply);

      expect(mockDeleteRegister.execute).toHaveBeenCalledWith(1);
      expect(reply.code).toHaveBeenCalledWith(204);
      expect(reply.send).toHaveBeenCalled();
    });

    it("should return 500 status on error when deleting register", async () => {
      mockDeleteRegister.execute.mockRejectedValue(new Error("Database error"));

      const req: any = {params: {registerId: "1"}};
      const reply = mockReply();

      await registerController.deleteRegisterHandler(req, reply);

      expect(reply.code).toHaveBeenCalledWith(500);
      expect(reply.send).toHaveBeenCalledWith({error: "Error al eliminar el registro"});
    });
  });
});
