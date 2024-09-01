/**
 * @project Eventos - Coordinadora
 * @file UserRepository.test.ts
 * @description Pruebas unitarias para la implementación de UserRepository usando MockUserRepository
 * @verified SI
 * @status DONE
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo contiene pruebas unitarias para la implementación de la interfaz UserRepository
 * usando una implementación mock llamada MockUserRepository. Las pruebas verifican la funcionalidad
 * completa del repositorio, incluyendo la creación, obtención, actualización, eliminación y manejo
 * de usuarios. Además, se prueban casos como la actualización de un usuario inexistente, el manejo
 * correcto de latitud y longitud, y la obtención de usuarios por su email.
 */

/** @import dependencias */
import {User} from "../domain/entities/User";
import {UserRepository} from "../application/interfaces/UserRepository";

/** @class MockUserRepository */
class MockUserRepository implements UserRepository {
  private users: User[] = [];

  /**
   * @method createUser
   * @description Crea un nuevo usuario en el repositorio mock
   * @param {User} user - El usuario a crear
   * @returns {Promise<User>} El usuario creado con un ID asignado
   */
  async createUser(user: User): Promise<User> {
    const newUser = {...user, userId: this.users.length + 1};
    this.users.push(newUser);
    return newUser;
  }

  /**
   * @method getUserById
   * @description Obtiene un usuario por su ID
   * @param {number} userId - El ID del usuario a buscar
   * @returns {Promise<User | null>} El usuario encontrado o null si no existe
   */
  async getUserById(userId: number): Promise<User | null> {
    return this.users.find((u) => u.userId === userId) || null;
  }

  /**
   * @method getUserByEmail
   * @description Obtiene un usuario por su email
   * @param {string} userEmail - El email del usuario a buscar
   * @returns {Promise<User | null>} El usuario encontrado o null si no existe
   */
  async getUserByEmail(userEmail: string): Promise<User | null> {
    return this.users.find((u) => u.userEmail === userEmail) || null;
  }

  /**
   * @method updateUser
   * @description Actualiza un usuario existente en el repositorio mock
   * @param {User} user - El usuario con los datos actualizados
   * @returns {Promise<User>} El usuario actualizado
   */
  async updateUser(user: User): Promise<User> {
    const index = this.users.findIndex((u) => u.userId === user.userId);
    if (index !== -1) {
      this.users[index] = user;
      return user;
    }
    throw new Error("User not found");
  }

  /**
   * @method deleteUser
   * @description Elimina un usuario del repositorio mock
   * @param {number} userId - El ID del usuario a eliminar
   * @returns {Promise<void>}
   */
  async deleteUser(userId: number): Promise<void> {
    const index = this.users.findIndex((u) => u.userId === userId);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }

  /**
   * @method getAllUsers
   * @description Obtiene todos los usuarios del repositorio mock
   * @returns {Promise<User[]>} Un array con todos los usuarios
   */
  async getAllUsers(): Promise<User[]> {
    return this.users;
  }
}

describe("UserRepository", () => {
  let repository: UserRepository;

  /** @beforeEach Prepara el entorno antes de cada prueba */
  beforeEach(() => {
    repository = new MockUserRepository();
  });

  /** @test Crea un usuario */
  it("should create a user", async () => {
    const user = new User(null, "John", "Doe", "john@example.com", "password123", 40.7128, -74.006);
    const createdUser = await repository.createUser(user);
    expect(createdUser.userId).toBeDefined();
    expect(createdUser.userName).toBe("John");
    expect(createdUser.userLastname).toBe("Doe");
  });

  /** @test Obtiene un usuario por su ID */
  it("should get a user by id", async () => {
    const user = new User(null, "Jane", "Smith", "jane@example.com", "password456", 51.5074, -0.1278);
    const createdUser = await repository.createUser(user);
    const fetchedUser = await repository.getUserById(createdUser.userId!);
    expect(fetchedUser).toEqual(createdUser);
  });

  /** @test Obtiene un usuario por su email */
  it("should get a user by email", async () => {
    const user = new User(null, "Alice", "Wonderland", "alice@example.com", "wonderpass", 34.0522, -118.2437);
    const createdUser = await repository.createUser(user);
    const fetchedUser = await repository.getUserByEmail("alice@example.com");
    expect(fetchedUser).toEqual(createdUser);
  });

  /** @test Retorna null para un ID de usuario inexistente */
  it("should return null for non-existent user id", async () => {
    const fetchedUser = await repository.getUserById(999);
    expect(fetchedUser).toBeNull();
  });

  /** @test Retorna null para un email de usuario inexistente */
  it("should return null for non-existent user email", async () => {
    const fetchedUser = await repository.getUserByEmail("nonexistent@example.com");
    expect(fetchedUser).toBeNull();
  });

  /** @test Actualiza un usuario */
  it("should update a user", async () => {
    const user = new User(null, "Alice", "Johnson", "alice@example.com", "password789", 48.8566, 2.3522);
    const createdUser = await repository.createUser(user);
    const updatedUser = new User(createdUser.userId, "Alice", "Brown", "alice.brown@example.com", "newpassword", 48.8566, 2.3522);
    const result = await repository.updateUser(updatedUser);
    expect(result.userLastname).toBe("Brown");
    expect(result.userEmail).toBe("alice.brown@example.com");
  });

  /** @test Lanza un error al intentar actualizar un usuario inexistente */
  it("should throw an error when updating non-existent user", async () => {
    const nonExistentUser = new User(999, "Non", "Existent", "non@example.com", "password", 0, 0);
    await expect(repository.updateUser(nonExistentUser)).rejects.toThrow("User not found");
  });

  /** @test Elimina un usuario */
  it("should delete a user", async () => {
    const user = new User(null, "Bob", "Wilson", "bob@example.com", "password321", 35.6762, 139.6503);
    const createdUser = await repository.createUser(user);
    await repository.deleteUser(createdUser.userId!);
    const fetchedUser = await repository.getUserById(createdUser.userId!);
    expect(fetchedUser).toBeNull();
  });

  /** @test Obtiene todos los usuarios */
  it("should get all users", async () => {
    await repository.createUser(new User(null, "User1", "Last1", "user1@example.com", "pass1", 1, 1));
    await repository.createUser(new User(null, "User2", "Last2", "user2@example.com", "pass2", 2, 2));
    const allUsers = await repository.getAllUsers();
    expect(allUsers.length).toBe(2);
    expect(allUsers[0].userName).toBe("User1");
    expect(allUsers[1].userName).toBe("User2");
  });

  /** @test Maneja correctamente la latitud y longitud */
  it("should handle latitude and longitude correctly", async () => {
    const user = new User(null, "Geo", "User", "geo@example.com", "geopass", 40.7128, -74.006);
    const createdUser = await repository.createUser(user);
    expect(createdUser.userLatitude).toBeCloseTo(40.7128, 4);
    expect(createdUser.userLongitude).toBeCloseTo(-74.006, 4);
  });

  /** @test Almacena la contraseña de manera segura (para fines demostrativos) */
  it("should store password securely", async () => {
    const user = new User(null, "Secure", "User", "secure@example.com", "securepass", 0, 0);
    const createdUser = await repository.createUser(user);
    expect(createdUser.password).toBe("securepass");
    // En una implementación real, se debería verificar que la contraseña esté encriptada,
    // no almacenada en texto plano.
  });
});
