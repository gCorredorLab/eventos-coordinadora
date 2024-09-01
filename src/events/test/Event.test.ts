/**
 * @project Eventos - Coordinadora
 * @file Event.test.ts
 * @description Pruebas unitarias para la entidad Event
 * @verified SI
 * @status DONE
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo contiene pruebas unitarias para la entidad Event.
 * Las pruebas verifican la correcta creación de instancias de la entidad Event con diferentes
 * combinaciones de parámetros, incluyendo la creación con todos los parámetros, con eventId nulo,
 * con valores indefinidos, y con parámetros parciales. También se prueba el manejo correcto
 * de objetos Date para la fecha del evento, y la aceptación de descripciones nulas.
 */

/** @import dependencias */
import {Event} from "../domain/entities/Event";

describe("Event", () => {
  /** @test Crea una instancia de Event con todas las propiedades */
  it("should create an Event instance with all properties", () => {
    const eventId = 1;
    const eventUserCreateId = 2;
    const eventPlaceId = 3;
    const eventName = "Conferencia Tech";
    const eventDescription = "Una conferencia sobre tecnología.";
    const eventDate = new Date("2024-12-01T10:00:00Z");

    const event = new Event(eventId, eventUserCreateId, eventPlaceId, eventName, eventDescription, eventDate);

    expect(event).toBeInstanceOf(Event);
    expect(event.eventId).toBe(eventId);
    expect(event.eventUserCreateId).toBe(eventUserCreateId);
    expect(event.eventPlaceId).toBe(eventPlaceId);
    expect(event.eventName).toBe(eventName);
    expect(event.eventDescription).toBe(eventDescription);
    expect(event.eventDate).toBe(eventDate);
  });

  /** @test Crea una instancia de Event con eventId nulo */
  it("should create an Event instance with null eventId", () => {
    const event = new Event(null, 2, 3, "Conferencia Tech", "Una conferencia sobre tecnología.", new Date("2024-12-01T10:00:00Z"));

    expect(event).toBeInstanceOf(Event);
    expect(event.eventId).toBeNull();
  });

  /** @test Crea una instancia de Event con valores indefinidos para parámetros faltantes */
  it("should create an Event instance with undefined values for missing parameters", () => {
    // @ts-ignore
    const event = new Event();

    expect(event).toBeInstanceOf(Event);
    expect(event.eventId).toBeUndefined();
    expect(event.eventUserCreateId).toBeUndefined();
    expect(event.eventPlaceId).toBeUndefined();
    expect(event.eventName).toBeUndefined();
    expect(event.eventDescription).toBeUndefined();
    expect(event.eventDate).toBeUndefined();
  });

  /** @test Crea una instancia de Event con parámetros parciales */
  it("should create an Event instance with partial parameters", () => {
    // @ts-ignore
    const event = new Event(1, 2, 3);

    expect(event).toBeInstanceOf(Event);
    expect(event.eventId).toBe(1);
    expect(event.eventUserCreateId).toBe(2);
    expect(event.eventPlaceId).toBe(3);
    expect(event.eventName).toBeUndefined();
    expect(event.eventDescription).toBeUndefined();
    expect(event.eventDate).toBeUndefined();
  });

  /** @test Crea una instancia de Event y verifica que la fecha es un objeto Date */
  it("should handle Date objects correctly for eventDate", () => {
    const eventDate = new Date("2024-12-01T10:00:00Z");
    const event = new Event(1, 2, 3, "Conferencia Tech", "Una conferencia sobre tecnología.", eventDate);

    expect(event.eventDate).toBeInstanceOf(Date);
    expect(event.eventDate).toBe(eventDate);
  });

  /** @test Verifica que eventDescription puede ser nulo */
  it("should allow eventDescription to be null", () => {
    const event = new Event(1, 2, 3, "Conferencia Tech", null, new Date("2024-12-01T10:00:00Z"));

    expect(event.eventDescription).toBeNull();
  });
});
