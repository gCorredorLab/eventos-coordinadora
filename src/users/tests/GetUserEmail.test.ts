/**
 * @project Eventos - Coordinadora
 * @file GetUserEmail.test.ts
 * @description Pruebas unitarias para el caso de uso GetUserEmail
 * @verified SI
 * @status DONE
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo contiene las pruebas unitarias para el caso de uso GetUserEmail.
 * Se prueban diferentes escenarios de obtención de usuarios por email y el manejo de errores.
 */

/** @import dependencias */
import {GetUserEmail} from "../application/use-cases/GetUserEmail";
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

  async getUserByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.userEmail === email) || null;
  }

  async getUserById(userId: number): Promise<User | null> {
    return this.users.find((user) => user.userId === userId) || null;
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

describe("GetUserEmail", () => {
  let getUserEmail: GetUserEmail;
  let mockUserRepository: UserRepository;

  beforeEach(() => {
    mockUserRepository = new MockUserRepository();
    getUserEmail = new GetUserEmail(mockUserRepository);
  });

  /**
   * @test Obtención exitosa de un usuario existente por email
   * @description Verifica que se pueda obtener un usuario existente por su email
   */
  it("should get an existing user successfully by email", async () => {
    const userEmail = "john@example.com";
    const user = await getUserEmail.execute(userEmail);

    expect(user).not.toBeNull();
    expect(user?.userId).toBe(1);
    expect(user?.userName).toBe("John");
    expect(user?.userLastname).toBe("Doe");
    expect(user?.userEmail).toBe(userEmail);
    expect(user?.password).toBe("password123");
    expect(user?.userLatitude).toBe(40.7128);
    expect(user?.userLongitude).toBe(-74.006);
  });

  /**
   * @test Intento de obtener un usuario con un email no existente
   * @description Verifica que se devuelva null al intentar obtener un usuario con un email que no existe
   */
  it("should return null for non-existent email", async () => {
    const nonExistentEmail = "nonexistent@example.com";
    const user = await getUserEmail.execute(nonExistentEmail);

    expect(user).toBeNull();
  });

  /**
   * @test Llamada correcta al método getUserByEmail del repositorio
   * @description Verifica que el método getUserByEmail del repositorio sea llamado con el email correcto
   */
  it("should call UserRepository.getUserByEmail with correct email", async () => {
    const userEmail = "john@example.com";
    const spy = jest.spyOn(mockUserRepository, "getUserByEmail");

    await getUserEmail.execute(userEmail);

    expect(spy).toHaveBeenCalledWith(userEmail);
  });

  /**
   * @test Manejo de errores en la obtención de usuarios por email
   * @description Verifica que se manejen correctamente los errores cuando falla la obtención de un usuario por email
   */
  it("should throw an error if UserRepository.getUserByEmail fails", async () => {
    const userEmail = "john@example.com";
    jest.spyOn(mockUserRepository, "getUserByEmail").mockRejectedValue(new Error("Database error"));

    await expect(getUserEmail.execute(userEmail)).rejects.toThrow("Database error");
  });
});
