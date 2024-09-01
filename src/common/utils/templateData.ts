/**
 * @project Eventos - Coordinadora
 * @file templateData.ts
 * @description Datos de plantilla en formato JSON para usuarios, lugares, eventos, registros y combinaciones de estos.
 * @verified SI
 * @status DONE
 * @unitTests NO
 * @unitTestsStatus PROGRESS
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo contiene datos de ejemplo que se utilizan como plantillas para la importación de usuarios, lugares,
 * eventos y registros en la aplicación. Estos datos se exportan y son utilizados en los handlers para generar
 * archivos Excel de muestra que los usuarios pueden descargar y completar.
 */

/**
 * @description Datos de ejemplo para la plantilla de usuarios.
 * Cada objeto en este array representa un usuario con atributos básicos como nombre, apellido, correo electrónico,
 * contraseña y coordenadas geográficas.
 */
export const userTemplateData = [
  {
    userName: "John", // Nombre del usuario
    userLastname: "Doe", // Apellido del usuario
    userEmail: "john.doe@example.com", // Correo electrónico del usuario
    password: "password123", // Contraseña del usuario
    userLatitude: 40.7128, // Latitud del usuario (por ejemplo, para geolocalización)
    userLongitude: -74.006 // Longitud del usuario
  }
];

/**
 * @description Datos de ejemplo para la plantilla de lugares.
 * Cada objeto en este array representa un lugar con atributos como nombre, descripción, correo electrónico,
 * teléfono, dirección y coordenadas geográficas.
 */
export const placeTemplateData = [
  {
    placeName: "Lugar Ejemplo", // Nombre del lugar
    placeDescription: "Descripción del lugar", // Descripción del lugar
    placeEmail: "lugar@ejemplo.com", // Correo electrónico del lugar
    placePhone: "1234567890", // Teléfono de contacto del lugar
    placeAddress: "123 Calle Ejemplo", // Dirección física del lugar
    placeLatitude: 40.7128, // Latitud del lugar
    placeLongitude: -74.006, // Longitud del lugar
    placeUserCreateId: 1 // ID del usuario que creó el lugar
  }
];

/**
 * @description Datos de ejemplo para la plantilla de eventos.
 * Cada objeto en este array representa un evento con atributos como nombre, descripción, fecha,
 * ID del usuario que creó el evento, y ID del lugar donde se realiza.
 */
export const eventTemplateData = [
  {
    eventName: "Evento Ejemplo", // Nombre del evento
    eventDescription: "Descripción del evento", // Descripción del evento
    eventDate: "2024-12-31T23:59:59", // Fecha y hora del evento
    eventUserCreateId: 1, // ID del usuario que creó el evento
    eventPlaceId: 1 // ID del lugar donde se llevará a cabo el evento
  }
];

/**
 * @description Datos de ejemplo para la plantilla de registros.
 * Cada objeto en este array representa un registro de un usuario en un evento con atributos como
 * ID del usuario, ID del evento, fecha del registro, y confirmación de asistencia.
 */
export const registerTemplateData = [
  {
    registerUserId: 1, // ID del usuario que se registra
    registerEventId: 1, // ID del evento en el que se registra
    registerDate: "2024-12-31T23:59:59", // Fecha y hora del registro
    registerConfirmation: false // Confirmación de asistencia (verdadero o falso)
  }
];

/**
 * @description Datos de ejemplo para una plantilla combinada de lugares y eventos.
 * Cada objeto en este array representa tanto un lugar como un evento, permitiendo la importación combinada.
 */
export const placeAndEventTemplateData = [
  {
    eventName: "Evento Ejemplo", // Nombre del evento
    eventDescription: "Descripción del evento", // Descripción del evento
    eventDate: "2024-12-31T23:59:59", // Fecha y hora del evento
    eventUserCreateId: 1, // ID del usuario que creó el evento
    placeName: "Lugar Ejemplo", // Nombre del lugar
    placeDescription: "Descripción del lugar", // Descripción del lugar
    placeEmail: "lugar@ejemplo.com", // Correo electrónico del lugar
    placePhone: "1234567890", // Teléfono de contacto del lugar
    placeAddress: "123 Calle Ejemplo", // Dirección física del lugar
    placeLatitude: 40.7128, // Latitud del lugar
    placeLongitude: -74.006, // Longitud del lugar
    placeUserCreateId: 1 // ID del usuario que creó el lugar
  }
];
