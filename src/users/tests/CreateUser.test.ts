/**
 * @project Eventos - Coordinadora
 * @file CreateUser.test.ts
 * @description Pruebas unitarias para el caso de uso CreateUser
 * @verified SI
 * @status DONE
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo contiene las pruebas unitarias para el caso de uso CreateUser.
 * Se prueban diferentes escenarios de creación de usuarios y el manejo de errores.
 */

/** @import dependencias */
import {CreateUser} from "../application/use-cases/CreateUser";
import {User} from "../domain/entities/User";
import {UserRepository} from "../application/interfaces/UserRepository";

/** Implementación mock del UserRepository */
class MockUserRepository implements UserRepository {
  private users: User[] = [];

  async createUser(user: User): Promise<User> {
    const newUser = {...user, userId: this.users.length + 1};
    this.users.push(newUser);
    return newUser;
  }

  async getUserById(userId: number): Promise<User | null> {
    return this.users.find((user) => user.userId === userId) || null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.userEmail === email) || null;
  }

  async updateUser(user: User): Promise<User> {
    const index = this.users.findIndex((u) => u.userId === user.userId);
    if (index !== -1) {
      this.users[index] = user;
      return user;
    }
    throw new Error("User not found");
  }

  async deleteUser(userId: number): Promise<void> {
    const index = this.users.findIndex((user) => user.userId === userId);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }
}

describe("CreateUser", () => {
  let createUser: CreateUser;
  let mockUserRepository: UserRepository;

  beforeEach(() => {
    mockUserRepository = new MockUserRepository();
    createUser = new CreateUser(mockUserRepository);
  });

  /**
   * @test Creación exitosa de un nuevo usuario
   * @description Verifica que se pueda crear un nuevo usuario con todos los campos requeridos
   */
  it("should create a new user successfully", async () => {
    const userData = {
      userName: "John",
      userLastname: "Doe",
      userEmail: "john.doe@example.com",
      password: "password123",
      userLatitude: 40.7128,
      userLongitude: -74.006
    };

    const createdUser = await createUser.execute(userData);

    expect(createdUser).toBeDefined();
    expect(createdUser.userId).toBeDefined();
    expect(createdUser.userName).toBe(userData.userName);
    expect(createdUser.userLastname).toBe(userData.userLastname);
    expect(createdUser.userEmail).toBe(userData.userEmail);
    expect(createdUser.password).toBe(userData.password);
    expect(createdUser.userLatitude).toBe(userData.userLatitude);
    expect(createdUser.userLongitude).toBe(userData.userLongitude);
  });

  /**
   * @test Llamada correcta al método createUser del repositorio
   * @description Verifica que el método createUser del repositorio sea llamado con los datos correctos
   */
  it("should call UserRepository.createUser with correct data", async () => {
    const userData = {
      userName: "Jane",
      userLastname: "Smith",
      userEmail: "jane.smith@example.com",
      password: "securepass456",
      userLatitude: 51.5074,
      userLongitude: -0.1278
    };

    const spy = jest.spyOn(mockUserRepository, "createUser");

    await createUser.execute(userData);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: null,
        ...userData
      })
    );
  });

  /**
   * @test Manejo de errores en la creación de usuarios
   * @description Verifica que se manejen correctamente los errores cuando falla la creación de un usuario
   */
  it("should throw an error if UserRepository.createUser fails", async () => {
    const userData = {
      userName: "Error",
      userLastname: "User",
      userEmail: "error.user@example.com",
      password: "failpass789",
      userLatitude: 48.8566,
      userLongitude: 2.3522
    };

    jest.spyOn(mockUserRepository, "createUser").mockRejectedValue(new Error("Database error"));

    await expect(createUser.execute(userData)).rejects.toThrow("Database error");
  });
});
