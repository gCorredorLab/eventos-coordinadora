/**
 * @project Eventos - Coordinadora
 * @file GetUser.test.ts
 * @description Pruebas unitarias para el caso de uso GetUser
 * @verified SI
 * @status DONE
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo contiene las pruebas unitarias para el caso de uso GetUser.
 * Se prueban diferentes escenarios de obtención de usuarios y el manejo de errores.
 */

/** @import dependencias */
import {GetUser} from "../application/use-cases/GetUser";
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
    }
  ];

  async getUserById(userId: number): Promise<User | null> {
    return this.users.find((user) => user.userId === userId) || null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.userEmail === email) || null;
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

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }
}

describe("GetUser", () => {
  let getUser: GetUser;
  let mockUserRepository: UserRepository;

  beforeEach(() => {
    mockUserRepository = new MockUserRepository();
    getUser = new GetUser(mockUserRepository);
  });

  /**
   * @test Obtención exitosa de un usuario existente
   * @description Verifica que se pueda obtener un usuario existente por su ID
   */
  it("should get an existing user successfully", async () => {
    const userId = 1;
    const user = await getUser.execute(userId);

    expect(user).not.toBeNull();
    expect(user?.userId).toBe(userId);
    expect(user?.userName).toBe("John");
    expect(user?.userLastname).toBe("Doe");
    expect(user?.userEmail).toBe("john@example.com");
    expect(user?.password).toBe("password123");
    expect(user?.userLatitude).toBe(40.7128);
    expect(user?.userLongitude).toBe(-74.006);
  });

  /**
   * @test Intento de obtener un usuario no existente
   * @description Verifica que se devuelva null al intentar obtener un usuario que no existe
   */
  it("should return null for non-existent user", async () => {
    const nonExistentUserId = 999;
    const user = await getUser.execute(nonExistentUserId);

    expect(user).toBeNull();
  });

  /**
   * @test Llamada correcta al método getUserById del repositorio
   * @description Verifica que el método getUserById del repositorio sea llamado con el ID correcto
   */
  it("should call UserRepository.getUserById with correct userId", async () => {
    const userId = 1;
    const spy = jest.spyOn(mockUserRepository, "getUserById");

    await getUser.execute(userId);

    expect(spy).toHaveBeenCalledWith(userId);
  });

  /**
   * @test Manejo de errores en la obtención de usuarios
   * @description Verifica que se manejen correctamente los errores cuando falla la obtención de un usuario
   */
  it("should throw an error if UserRepository.getUserById fails", async () => {
    const userId = 1;
    jest.spyOn(mockUserRepository, "getUserById").mockRejectedValue(new Error("Database error"));

    await expect(getUser.execute(userId)).rejects.toThrow("Database error");
  });
});
