/**
 * @project Eventos - Coordinadora
 * @file Register.test.ts
 * @description Pruebas unitarias para la entidad Register
 * @verified SI
 * @status DONE
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo contiene pruebas unitarias para la entidad Register.
 * Las pruebas verifican la correcta creación de instancias de la entidad Register con diferentes
 * combinaciones de parámetros, incluyendo la creación con todos los parámetros, con registerId nulo,
 * con valores indefinidos, y con parámetros parciales. También se prueba el manejo correcto
 * de objetos Date para la fecha del registro, y la aceptación de confirmaciones de registro.
 */

/** @import dependencias */
import {Register} from "../domain/entities/Register"; // Ajusta la ruta según la estructura de tu proyecto

describe("Register", () => {
  /** @test Crea una instancia de Register con todas las propiedades */
  it("should create a Register instance with all properties", () => {
    const registerId = 1;
    const registerUserId = 2;
    const registerEventId = 3;
    const registerDate = new Date("2024-12-01T10:00:00Z");
    const registerConfirmation = true;

    const register = new Register(registerId, registerUserId, registerEventId, registerDate, registerConfirmation);

    expect(register).toBeInstanceOf(Register);
    expect(register.registerId).toBe(registerId);
    expect(register.registerUserId).toBe(registerUserId);
    expect(register.registerEventId).toBe(registerEventId);
    expect(register.registerDate).toBe(registerDate);
    expect(register.registerConfirmation).toBe(registerConfirmation);
  });

  /** @test Crea una instancia de Register con registerId nulo */
  it("should create a Register instance with null registerId", () => {
    const register = new Register(null, 2, 3, new Date("2024-12-01T10:00:00Z"), true);

    expect(register).toBeInstanceOf(Register);
    expect(register.registerId).toBeNull();
  });

  /** @test Crea una instancia de Register con valores indefinidos para parámetros faltantes */
  it("should create a Register instance with undefined values for missing parameters", () => {
    // @ts-ignore
    const register = new Register();

    expect(register).toBeInstanceOf(Register);
    expect(register.registerId).toBeUndefined();
    expect(register.registerUserId).toBeUndefined();
    expect(register.registerEventId).toBeUndefined();
    expect(register.registerDate).toBeUndefined();
    expect(register.registerConfirmation).toBeUndefined();
  });

  /** @test Crea una instancia de Register con parámetros parciales */
  it("should create a Register instance with partial parameters", () => {
    // @ts-ignore
    const register = new Register(1, 2, 3);

    expect(register).toBeInstanceOf(Register);
    expect(register.registerId).toBe(1);
    expect(register.registerUserId).toBe(2);
    expect(register.registerEventId).toBe(3);
    expect(register.registerDate).toBeUndefined();
    expect(register.registerConfirmation).toBeUndefined();
  });

  /** @test Crea una instancia de Register y verifica que la fecha es un objeto Date */
  it("should handle Date objects correctly for registerDate", () => {
    const registerDate = new Date("2024-12-01T10:00:00Z");
    const register = new Register(1, 2, 3, registerDate, true);

    expect(register.registerDate).toBeInstanceOf(Date);
    expect(register.registerDate).toBe(registerDate);
  });

  /** @test Verifica que registerConfirmation maneja valores booleanos correctamente */
  it("should handle boolean values correctly for registerConfirmation", () => {
    const registerTrue = new Register(1, 2, 3, new Date(), true);
    const registerFalse = new Register(2, 3, 4, new Date(), false);

    expect(registerTrue.registerConfirmation).toBe(true);
    expect(registerFalse.registerConfirmation).toBe(false);
  });
});
