/**
 * @project Eventos - Coordinadora
 * @file UpdateUser.test.ts
 * @description Pruebas unitarias para el caso de uso UpdateUser
 * @verified SI
 * @status DONE
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo contiene las pruebas unitarias para el caso de uso UpdateUser.
 * Se prueban diferentes escenarios de actualización de usuarios y el manejo de errores.
 */

/** @import dependencias */
import {UpdateUser} from "../application/use-cases/UpdateUser";
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

  async updateUser(user: User): Promise<User> {
    const index = this.users.findIndex((u) => u.userId === user.userId);
    if (index === -1) {
      throw new Error("User not found");
    }
    this.users[index] = user;
    return user;
  }

  async getUserById(userId: number): Promise<User | null> {
    return this.users.find((user) => user.userId === userId) || null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.userEmail === email) || null;
  }

  async createUser(user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }

  async deleteUser(userId: number): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }
}

describe("UpdateUser", () => {
  let updateUser: UpdateUser;
  let mockUserRepository: UserRepository;

  beforeEach(() => {
    mockUserRepository = new MockUserRepository();
    updateUser = new UpdateUser(mockUserRepository);
  });

  /**
   * @test Actualización exitosa de un usuario existente
   * @description Verifica que se pueda actualizar correctamente un usuario existente
   */
  it("should update an existing user successfully", async () => {
    const userId = 1;
    const updatedUserData = {
      userName: "John",
      userLastname: "Smith",
      userEmail: "john.smith@example.com",
      password: "newpassword123",
      userLatitude: 41.8781,
      userLongitude: -87.6298
    };

    const updatedUser = await updateUser.execute(userId, updatedUserData);

    expect(updatedUser).toBeDefined();
    expect(updatedUser.userId).toBe(userId);
    expect(updatedUser.userName).toBe(updatedUserData.userName);
    expect(updatedUser.userLastname).toBe(updatedUserData.userLastname);
    expect(updatedUser.userEmail).toBe(updatedUserData.userEmail);
    expect(updatedUser.password).toBe(updatedUserData.password);
    expect(updatedUser.userLatitude).toBe(updatedUserData.userLatitude);
    expect(updatedUser.userLongitude).toBe(updatedUserData.userLongitude);
  });

  /**
   * @test Llamada correcta al método updateUser del repositorio
   * @description Verifica que el método updateUser del repositorio sea llamado con los datos correctos
   */
  it("should call UserRepository.updateUser with correct data", async () => {
    const userId = 1;
    const updatedUserData = {
      userName: "John",
      userLastname: "Smith",
      userEmail: "john.smith@example.com",
      password: "newpassword123",
      userLatitude: 41.8781,
      userLongitude: -87.6298
    };

    const spy = jest.spyOn(mockUserRepository, "updateUser");

    await updateUser.execute(userId, updatedUserData);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        userId,
        ...updatedUserData
      })
    );
  });

  /**
   * @test Manejo de errores al actualizar un usuario no existente
   * @description Verifica que se lance un error al intentar actualizar un usuario que no existe
   */
  it("should throw an error when trying to update a non-existent user", async () => {
    const nonExistentUserId = 999;
    const updatedUserData = {
      userName: "John",
      userLastname: "Smith",
      userEmail: "john.smith@example.com",
      password: "newpassword123",
      userLatitude: 41.8781,
      userLongitude: -87.6298
    };

    jest.spyOn(mockUserRepository, "updateUser").mockRejectedValue(new Error("User not found"));

    await expect(updateUser.execute(nonExistentUserId, updatedUserData)).rejects.toThrow("User not found");
  });

  /**
   * @test Manejo de errores en la actualización de usuarios
   * @description Verifica que se manejen correctamente los errores cuando falla la actualización de un usuario
   */
  it("should throw an error if UserRepository.updateUser fails", async () => {
    const userId = 1;
    const updatedUserData = {
      userName: "John",
      userLastname: "Smith",
      userEmail: "john.smith@example.com",
      password: "newpassword123",
      userLatitude: 41.8781,
      userLongitude: -87.6298
    };

    jest.spyOn(mockUserRepository, "updateUser").mockRejectedValue(new Error("Database error"));

    await expect(updateUser.execute(userId, updatedUserData)).rejects.toThrow("Database error");
  });
});
