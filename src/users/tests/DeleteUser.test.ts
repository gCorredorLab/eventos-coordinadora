/**
 * @project Eventos - Coordinadora
 * @file DeleteUser.test.ts
 * @description Pruebas unitarias para el caso de uso DeleteUser
 * @verified SI
 * @status DONE
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo contiene las pruebas unitarias para el caso de uso DeleteUser.
 * Se prueban diferentes escenarios de eliminación de usuarios y el manejo de errores.
 */

/** @import dependencias */
import {DeleteUser} from "../application/use-cases/DeleteUser";
import {User} from "../domain/entities/User";
import {UserRepository} from "../application/interfaces/UserRepository";

/** Implementación mock del UserRepository */
class MockUserRepository implements UserRepository {
  private users: User[] = [
    {userId: 1, userName: "John", userLastname: "Doe", userEmail: "john@example.com", password: "password", userLatitude: 0, userLongitude: 0}
  ];

  async deleteUser(userId: number): Promise<void> {
    const index = this.users.findIndex((user) => user.userId === userId);
    if (index === -1) {
      throw new Error("User not found");
    }
    this.users.splice(index, 1);
  }

  async createUser(user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }

  async getUserById(userId: number): Promise<User | null> {
    return this.users.find((user) => user.userId === userId) || null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.userEmail === email) || null;
  }

  async updateUser(user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }
}

describe("DeleteUser", () => {
  let deleteUser: DeleteUser;
  let mockUserRepository: UserRepository;

  beforeEach(() => {
    mockUserRepository = new MockUserRepository();
    deleteUser = new DeleteUser(mockUserRepository);
  });

  /**
   * @test Eliminación exitosa de un usuario
   * @description Verifica que se pueda eliminar un usuario existente por su ID
   */
  it("should delete a user successfully", async () => {
    const userId = 1;
    await expect(deleteUser.execute(userId)).resolves.not.toThrow();
  });

  /**
   * @test Llamada correcta al método deleteUser del repositorio
   * @description Verifica que el método deleteUser del repositorio sea llamado con el ID correcto
   */
  it("should call UserRepository.deleteUser with correct userId", async () => {
    const userId = 1;
    const spy = jest.spyOn(mockUserRepository, "deleteUser");

    await deleteUser.execute(userId);

    expect(spy).toHaveBeenCalledWith(userId);
  });

  /**
   * @test Manejo de errores en la eliminación de usuarios
   * @description Verifica que se manejen correctamente los errores cuando falla la eliminación de un usuario
   */
  it("should throw an error if UserRepository.deleteUser fails", async () => {
    const userId = 999; // ID de usuario que no existe
    jest.spyOn(mockUserRepository, "deleteUser").mockRejectedValue(new Error("User not found"));

    await expect(deleteUser.execute(userId)).rejects.toThrow("User not found");
  });

  /**
   * @test Intento de eliminar un usuario inexistente
   * @description Verifica el comportamiento cuando se intenta eliminar un usuario que no existe
   */
  it("should handle attempt to delete non-existent user", async () => {
    const nonExistentUserId = 2;

    /** Modificamos el mock para que lance un error cuando el usuario no existe */
    jest.spyOn(mockUserRepository, "deleteUser").mockImplementation(async (userId) => {
      if (userId !== 1) {
        throw new Error("User not found");
      }
    });

    await expect(deleteUser.execute(nonExistentUserId)).rejects.toThrow("User not found");
  });
});
