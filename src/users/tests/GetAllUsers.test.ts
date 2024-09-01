/**
 * @project Eventos - Coordinadora
 * @file GetAllUsers.test.ts
 * @description Pruebas unitarias para el caso de uso GetAllUsers
 * @verified SI
 * @status DONE
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo contiene las pruebas unitarias para el caso de uso GetAllUsers.
 * Se prueban diferentes escenarios de obtención de todos los usuarios y el manejo de errores.
 */

/** @import dependencias */
import {GetAllUsers} from "../application/use-cases/GetAllUsers";
import {User} from "../domain/entities/User";
import {UserRepository} from "../application/interfaces/UserRepository";

/** Implementación mock del UserRepository */
class MockUserRepository implements UserRepository {
  private users: User[] = [
    {
      userId: 1,
      userName: "John",
      userLastname: "Doe",
      userEmail: "john@example.com",
      password: "password123",
      userLatitude: 40.7128,
      userLongitude: -74.006
    },
    {
      userId: 2,
      userName: "Jane",
      userLastname: "Doe",
      userEmail: "jane@example.com",
      password: "password456",
      userLatitude: 34.0522,
      userLongitude: -118.2437
    }
  ];

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }

  async getUserById(userId: number): Promise<User | null> {
    throw new Error("Method not implemented.");
  }

  async getUserByEmail(email: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }

  async createUser(user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }

  async updateUser(user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }

  async deleteUser(userId: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

describe("GetAllUsers", () => {
  let getAllUsers: GetAllUsers;
  let mockUserRepository: UserRepository;

  beforeEach(() => {
    mockUserRepository = new MockUserRepository();
    getAllUsers = new GetAllUsers(mockUserRepository);
  });

  /**
   * @test Obtención exitosa de todos los usuarios
   * @description Verifica que se puedan obtener todos los usuarios registrados
   */
  it("should get all users successfully", async () => {
    const users = await getAllUsers.execute();

    expect(users).not.toBeNull();
    expect(users.length).toBe(2);
    expect(users[0].userName).toBe("John");
    expect(users[1].userName).toBe("Jane");
  });

  /**
   * @test Llamada correcta al método getAllUsers del repositorio
   * @description Verifica que el método getAllUsers del repositorio sea llamado correctamente
   */
  it("should call UserRepository.getAllUsers", async () => {
    const spy = jest.spyOn(mockUserRepository, "getAllUsers");

    await getAllUsers.execute();

    expect(spy).toHaveBeenCalled();
  });

  /**
   * @test Manejo de errores en la obtención de todos los usuarios
   * @description Verifica que se manejen correctamente los errores cuando falla la obtención de todos los usuarios
   */
  it("should throw an error if UserRepository.getAllUsers fails", async () => {
    jest.spyOn(mockUserRepository, "getAllUsers").mockRejectedValue(new Error("Database error"));

    await expect(getAllUsers.execute()).rejects.toThrow("Database error");
  });
});
