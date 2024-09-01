/**
 * @project Eventos - Coordinadora
 * @file UserController.test.ts
 * @description Pruebas unitarias para el controlador UserController
 * @verified SI
 * @status DONE
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo contiene pruebas unitarias para el controlador UserController,
 * que maneja las solicitudes relacionadas con la entidad User. Las pruebas incluyen
 * la creación, obtención por ID y email, actualización y eliminación de usuarios.
 * Se utilizan mocks de los casos de uso para verificar que las solicitudes sean
 * procesadas correctamente y que el controlador maneje adecuadamente los códigos
 * de estado y las respuestas.
 */

/** @import dependencias */
import {UserController} from "../infrastructure/controllers/UserController";
import {CreateUser} from "../application/use-cases/CreateUser";
import {GetAllUsers} from "../application/use-cases/GetAllUsers";
import {GetUser} from "../application/use-cases/GetUser";
import {GetUserEmail} from "../application/use-cases/GetUserEmail";
import {UpdateUser} from "../application/use-cases/UpdateUser";
import {DeleteUser} from "../application/use-cases/DeleteUser";
import {User} from "../domain/entities/User";

/** @note Mock de FastifyReply */
const mockReply = () => {
  const res: any = {};
  res.code = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe("UserController", () => {
  let userController: UserController;
  let mockCreateUser: jest.Mocked<CreateUser>;
  let mockGetAllUsers: jest.Mocked<GetAllUsers>;
  let mockGetUser: jest.Mocked<GetUser>;
  let mockGetUserEmail: jest.Mocked<GetUserEmail>;
  let mockUpdateUser: jest.Mocked<UpdateUser>;
  let mockDeleteUser: jest.Mocked<DeleteUser>;

  /** @beforeEach Prepara el entorno antes de cada prueba */
  beforeEach(() => {
    mockCreateUser = {execute: jest.fn()} as any;
    mockGetAllUsers = {execute: jest.fn()} as any;
    mockGetUser = {execute: jest.fn()} as any;
    mockGetUserEmail = {execute: jest.fn()} as any;
    mockUpdateUser = {execute: jest.fn()} as any;
    mockDeleteUser = {execute: jest.fn()} as any;

    userController = new UserController(mockCreateUser, mockGetAllUsers, mockGetUser, mockGetUserEmail, mockUpdateUser, mockDeleteUser);
  });

  /** @test Crea un usuario y retorna el estado 201 */
  describe("createUserHandler", () => {
    it("should create a user and return 201 status", async () => {
      const mockUser: User = {
        userId: 1,
        userName: "John",
        userLastname: "Doe",
        userEmail: "john@example.com",
        password: "password123",
        userLatitude: 40.7128,
        userLongitude: -74.006
      };

      mockCreateUser.execute.mockResolvedValue(mockUser);

      const req: any = {body: {...mockUser, userId: undefined}};
      const reply = mockReply();

      await userController.createUserHandler(req, reply);

      expect(mockCreateUser.execute).toHaveBeenCalledWith(req.body);
      expect(reply.code).toHaveBeenCalledWith(201);
      expect(reply.send).toHaveBeenCalledWith(mockUser);
    });

    it("should return 500 status on error", async () => {
      mockCreateUser.execute.mockRejectedValue(new Error("Database error"));

      const req: any = {body: {}};
      const reply = mockReply();

      await userController.createUserHandler(req, reply);

      expect(reply.code).toHaveBeenCalledWith(500);
      expect(reply.send).toHaveBeenCalledWith({error: "Error al crear el usuario"});
    });
  });

  /** @test Obtiene un usuario por ID y retorna el estado 200 */
  describe("getUserHandler", () => {
    it("should get a user by ID and return 200 status", async () => {
      const mockUser: User = {
        userId: 1,
        userName: "John",
        userLastname: "Doe",
        userEmail: "john@example.com",
        password: "password123",
        userLatitude: 40.7128,
        userLongitude: -74.006
      };

      mockGetUser.execute.mockResolvedValue(mockUser);

      const req: any = {params: {userId: "1"}};
      const reply = mockReply();

      await userController.getUserHandler(req, reply);

      expect(mockGetUser.execute).toHaveBeenCalledWith(1);
      expect(reply.send).toHaveBeenCalledWith(mockUser);
    });

    it("should return 404 status when user is not found by ID", async () => {
      mockGetUser.execute.mockResolvedValue(null);

      const req: any = {params: {userId: "999"}};
      const reply = mockReply();

      await userController.getUserHandler(req, reply);

      expect(reply.code).toHaveBeenCalledWith(404);
      expect(reply.send).toHaveBeenCalledWith({error: "Usuario no encontrado"});
    });

    it("should return 500 status on error when getting user by ID", async () => {
      mockGetUser.execute.mockRejectedValue(new Error("Database error"));

      const req: any = {params: {userId: "1"}};
      const reply = mockReply();

      await userController.getUserHandler(req, reply);

      expect(reply.code).toHaveBeenCalledWith(500);
      expect(reply.send).toHaveBeenCalledWith({error: "Error al obtener el usuario"});
    });
  });

  /** @test Obtiene un usuario por email y retorna el estado 200 */
  describe("getUserEmailHandler", () => {
    it("should get a user by email and return 200 status", async () => {
      const mockUser: User = {
        userId: 1,
        userName: "John",
        userLastname: "Doe",
        userEmail: "john@example.com",
        password: "password123",
        userLatitude: 40.7128,
        userLongitude: -74.006
      };

      mockGetUserEmail.execute.mockResolvedValue(mockUser);

      const req: any = {params: {userEmail: "john@example.com"}};
      const reply = mockReply();

      await userController.getUserEmailHandler(req, reply);

      expect(mockGetUserEmail.execute).toHaveBeenCalledWith("john@example.com");
      expect(reply.send).toHaveBeenCalledWith(mockUser);
    });

    it("should return 404 status when user is not found by email", async () => {
      mockGetUserEmail.execute.mockResolvedValue(null);

      const req: any = {params: {userEmail: "nonexistent@example.com"}};
      const reply = mockReply();

      await userController.getUserEmailHandler(req, reply);

      expect(reply.code).toHaveBeenCalledWith(404);
      expect(reply.send).toHaveBeenCalledWith({error: "Usuario no encontrado"});
    });

    it("should return 500 status on error when getting user by email", async () => {
      mockGetUserEmail.execute.mockRejectedValue(new Error("Database error"));

      const req: any = {params: {userEmail: "john@example.com"}};
      const reply = mockReply();

      await userController.getUserEmailHandler(req, reply);

      expect(reply.code).toHaveBeenCalledWith(500);
      expect(reply.send).toHaveBeenCalledWith({error: "Error al obtener el usuario"});
    });
  });

  /** @test Actualiza un usuario y retorna el estado 200 */
  describe("updateUserHandler", () => {
    it("should update a user and return 200 status", async () => {
      const mockUser: User = {
        userId: 1,
        userName: "John",
        userLastname: "Doe",
        userEmail: "john@example.com",
        password: "password123",
        userLatitude: 40.7128,
        userLongitude: -74.006
      };

      mockUpdateUser.execute.mockResolvedValue(mockUser);

      const req: any = {params: {userId: "1"}, body: {...mockUser, userId: undefined}};
      const reply = mockReply();

      await userController.updateUserHandler(req, reply);

      expect(mockUpdateUser.execute).toHaveBeenCalledWith(1, req.body);
      expect(reply.send).toHaveBeenCalledWith(mockUser);
    });

    it("should return 500 status on error when updating user", async () => {
      mockUpdateUser.execute.mockRejectedValue(new Error("Database error"));

      const req: any = {params: {userId: "1"}, body: {}};
      const reply = mockReply();

      await userController.updateUserHandler(req, reply);

      expect(reply.code).toHaveBeenCalledWith(500);
      expect(reply.send).toHaveBeenCalledWith({error: "Error al actualizar el usuario"});
    });
  });

  /** @test Elimina un usuario y retorna el estado 204 */
  describe("deleteUserHandler", () => {
    it("should delete a user and return 204 status", async () => {
      mockDeleteUser.execute.mockResolvedValue(undefined);

      const req: any = {params: {userId: "1"}};
      const reply = mockReply();

      await userController.deleteUserHandler(req, reply);

      expect(mockDeleteUser.execute).toHaveBeenCalledWith(1);
      expect(reply.code).toHaveBeenCalledWith(204);
      expect(reply.send).toHaveBeenCalled();
    });

    it("should return 500 status on error when deleting user", async () => {
      mockDeleteUser.execute.mockRejectedValue(new Error("Database error"));

      const req: any = {params: {userId: "1"}};
      const reply = mockReply();

      await userController.deleteUserHandler(req, reply);

      expect(reply.code).toHaveBeenCalledWith(500);
      expect(reply.send).toHaveBeenCalledWith({error: "Error al eliminar el usuario"});
    });
  });
});
