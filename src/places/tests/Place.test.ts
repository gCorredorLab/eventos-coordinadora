/**
 * @project Eventos - Coordinadora
 * @file Place.test.ts
 * @description Pruebas unitarias para la entidad Place
 * @verified SI
 * @status DONE
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo contiene pruebas unitarias para la entidad Place.
 * Las pruebas verifican la correcta creación de instancias de la entidad Place con diferentes
 * combinaciones de parámetros, incluyendo la creación con todos los parámetros, con placeId nulo,
 * con valores indefinidos, y con parámetros parciales. También se prueba el manejo de valores
 * de punto flotante para la latitud y longitud, y la aceptación de descripciones, correos,
 * teléfonos y direcciones nulas.
 */

/** @import dependencias */
import {Place} from "../domain/entities/Place"; // Ajusta la ruta según la estructura de tu proyecto

describe("Place", () => {
  /** @test Crea una instancia de Place con todas las propiedades */
  it("should create a Place instance with all properties", () => {
    const placeId = 1;
    const placeUserCreateId = 2;
    const placeName = "Auditorio Principal";
    const placeDescription = "Un auditorio grande para eventos.";
    const placeEmail = "contacto@auditorio.com";
    const placePhone = "+123456789";
    const placeAddress = "123 Calle Principal, Ciudad";
    const placeLatitude = 40.7128;
    const placeLongitude = -74.006;

    const place = new Place(
      placeId,
      placeUserCreateId,
      placeName,
      placeDescription,
      placeEmail,
      placePhone,
      placeAddress,
      placeLatitude,
      placeLongitude
    );

    expect(place).toBeInstanceOf(Place);
    expect(place.placeId).toBe(placeId);
    expect(place.placeUserCreateId).toBe(placeUserCreateId);
    expect(place.placeName).toBe(placeName);
    expect(place.placeDescription).toBe(placeDescription);
    expect(place.placeEmail).toBe(placeEmail);
    expect(place.placePhone).toBe(placePhone);
    expect(place.placeAddress).toBe(placeAddress);
    expect(place.placeLatitude).toBe(placeLatitude);
    expect(place.placeLongitude).toBe(placeLongitude);
  });

  /** @test Crea una instancia de Place con placeId nulo */
  it("should create a Place instance with null placeId", () => {
    const place = new Place(
      null,
      2,
      "Auditorio Principal",
      "Un auditorio grande para eventos.",
      "contacto@auditorio.com",
      "+123456789",
      "123 Calle Principal, Ciudad",
      40.7128,
      -74.006
    );

    expect(place).toBeInstanceOf(Place);
    expect(place.placeId).toBeNull();
  });

  /** @test Crea una instancia de Place con valores indefinidos para parámetros faltantes */
  it("should create a Place instance with undefined values for missing parameters", () => {
    // @ts-ignore
    const place = new Place();

    expect(place).toBeInstanceOf(Place);
    expect(place.placeId).toBeUndefined();
    expect(place.placeUserCreateId).toBeUndefined();
    expect(place.placeName).toBeUndefined();
    expect(place.placeDescription).toBeUndefined();
    expect(place.placeEmail).toBeUndefined();
    expect(place.placePhone).toBeUndefined();
    expect(place.placeAddress).toBeUndefined();
    expect(place.placeLatitude).toBeUndefined();
    expect(place.placeLongitude).toBeUndefined();
  });

  /** @test Crea una instancia de Place con parámetros parciales */
  it("should create a Place instance with partial parameters", () => {
    // @ts-ignore
    const place = new Place(1, 2, "Auditorio Principal");

    expect(place).toBeInstanceOf(Place);
    expect(place.placeId).toBe(1);
    expect(place.placeUserCreateId).toBe(2);
    expect(place.placeName).toBe("Auditorio Principal");
    expect(place.placeDescription).toBeUndefined();
    expect(place.placeEmail).toBeUndefined();
    expect(place.placePhone).toBeUndefined();
    expect(place.placeAddress).toBeUndefined();
    expect(place.placeLatitude).toBeUndefined();
    expect(place.placeLongitude).toBeUndefined();
  });

  /** @test Maneja valores de punto flotante para latitud y longitud */
  it("should handle floating point values for latitude and longitude", () => {
    const place = new Place(
      1,
      2,
      "Auditorio Principal",
      "Un auditorio grande para eventos.",
      "contacto@auditorio.com",
      "+123456789",
      "123 Calle Principal, Ciudad",
      51.5074,
      -0.1278
    );

    expect(place.placeLatitude).toBeCloseTo(51.5074, 4);
    expect(place.placeLongitude).toBeCloseTo(-0.1278, 4);
  });

  /** @test Verifica que placeDescription, placeEmail, placePhone y placeAddress pueden ser nulos */
  it("should allow placeDescription, placeEmail, placePhone, and placeAddress to be null", () => {
    const place = new Place(1, 2, "Auditorio Principal", null, null, null, null, 40.7128, -74.006);

    expect(place.placeDescription).toBeNull();
    expect(place.placeEmail).toBeNull();
    expect(place.placePhone).toBeNull();
    expect(place.placeAddress).toBeNull();
  });
});
