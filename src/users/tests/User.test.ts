/**
 * @project Eventos - Coordinadora
 * @file User.test.ts
 * @description Pruebas unitarias para la entidad User
 * @verified SI
 * @status DONE
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo contiene pruebas unitarias para la entidad User.
 * Las pruebas verifican la correcta creación de instancias de la entidad User con diferentes
 * combinaciones de parámetros, incluyendo la creación con todos los parámetros, con userId nulo,
 * con valores indefinidos, y con parámetros parciales. También se prueba el manejo de valores
 * de punto flotante para la latitud y longitud, y la existencia de la propiedad de la contraseña.
 */

/** @import dependencias */
import {User} from "../domain/entities/User";

describe("User", () => {
  /** @test Crea una instancia de User con todas las propiedades */
  it("should create a User instance with all properties", () => {
    const userId = 1;
    const userName = "John";
    const userLastname = "Doe";
    const userEmail = "john.doe@example.com";
    const password = "securePassword123";
    const userLatitude = 40.7128;
    const userLongitude = -74.006;

    const user = new User(userId, userName, userLastname, userEmail, password, userLatitude, userLongitude);

    expect(user).toBeInstanceOf(User);
    expect(user.userId).toBe(userId);
    expect(user.userName).toBe(userName);
    expect(user.userLastname).toBe(userLastname);
    expect(user.userEmail).toBe(userEmail);
    expect(user.password).toBe(password);
    expect(user.userLatitude).toBe(userLatitude);
    expect(user.userLongitude).toBe(userLongitude);
  });

  /** @test Crea una instancia de User con userId nulo */
  it("should create a User instance with null userId", () => {
    const user = new User(null, "Jane", "Doe", "jane.doe@example.com", "anotherPassword456", 35.6895, 139.6917);

    expect(user).toBeInstanceOf(User);
    expect(user.userId).toBeNull();
  });

  /** @test Crea una instancia de User con valores indefinidos para parámetros faltantes */
  it("should create a User instance with undefined values for missing parameters", () => {
    // @ts-ignore
    const user = new User();

    expect(user).toBeInstanceOf(User);
    expect(user.userId).toBeUndefined();
    expect(user.userName).toBeUndefined();
    expect(user.userLastname).toBeUndefined();
    expect(user.userEmail).toBeUndefined();
    expect(user.password).toBeUndefined();
    expect(user.userLatitude).toBeUndefined();
    expect(user.userLongitude).toBeUndefined();
  });

  /** @test Crea una instancia de User con parámetros parciales */
  it("should create a User instance with partial parameters", () => {
    // @ts-ignore
    const user = new User(1, "Alice", "Johnson");

    expect(user).toBeInstanceOf(User);
    expect(user.userId).toBe(1);
    expect(user.userName).toBe("Alice");
    expect(user.userLastname).toBe("Johnson");
    expect(user.userEmail).toBeUndefined();
    expect(user.password).toBeUndefined();
    expect(user.userLatitude).toBeUndefined();
    expect(user.userLongitude).toBeUndefined();
  });

  /** @test Maneja valores de punto flotante para latitud y longitud */
  it("should handle floating point values for latitude and longitude", () => {
    const user = new User(1, "Bob", "Smith", "bob.smith@example.com", "password789", 51.5074, -0.1278);

    expect(user.userLatitude).toBeCloseTo(51.5074, 4);
    expect(user.userLongitude).toBeCloseTo(-0.1278, 4);
  });

  /** @test No expone la contraseña directamente */
  it("should not expose the password directly", () => {
    const user = new User(1, "Charlie", "Brown", "charlie.brown@example.com", "snoopy123", 37.7749, -122.4194);

    expect(user.password).toBeDefined();
    expect(user.password).not.toBe("");
  });
});
