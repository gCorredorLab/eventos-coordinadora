/**
 * @project Eventos - Coordinadora
 * @file templateDataTest.ts
 * @description Datos de plantilla en formato JSON para usuarios, lugares, eventos, registros y combinaciones de estos para pruebas.
 * @verified SI
 * @status DONE
 * @unitTests NO
 * @unitTestsStatus PROGRESS
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Data de prueba
 */

/**
 * @description Datos de ejemplo para la plantilla de usuarios.
 * Cada objeto en este array representa un usuario con atributos básicos como nombre, apellido, correo electrónico,
 * contraseña y coordenadas geográficas.
 */
export const userTemplateData = [
  {
    userName: "Guillermo",
    userLastname: "Corredor Soto",
    userEmail: "gcorredorlab@gmail.com",
    password: "Ab12345678*",
    userLatitude: 4.624335,
    userLongitude: -74.063644
  },
  {
    userName: "María",
    userLastname: "González",
    userEmail: "maria.gonzalez@email.com",
    password: "Ab12345678*",
    userLatitude: 4.651218,
    userLongitude: -74.055979
  },
  {
    userName: "Carlos",
    userLastname: "Rodríguez",
    userEmail: "carlos.rodriguez@email.com",
    password: "Ab12345678*",
    userLatitude: 4.676677,
    userLongitude: -74.04803
  },
  {
    userName: "Ana",
    userLastname: "Martínez",
    userEmail: "ana.martinez@email.com",
    password: "Ab12345678*",
    userLatitude: 4.698905,
    userLongitude: -74.030274
  },
  {
    userName: "Luis",
    userLastname: "Sánchez",
    userEmail: "luis.sanchez@email.com",
    password: "Ab12345678*",
    userLatitude: 4.62714,
    userLongitude: -74.081224
  }
];

export const placeTemplateData = [
  {
    placeUserCreateId: 1,
    placeName: "Parque Simón Bolívar",
    placeDescription: "Gran parque urbano",
    placeEmail: "parque.simon@bogota.gov.co",
    placePhone: "3001234567",
    placeAddress: "Calle 53 y Carrera 48",
    placeLatitude: 4.658383,
    placeLongitude: -74.09374
  },
  {
    placeUserCreateId: 2,
    placeName: "Teatro Colón",
    placeDescription: "Teatro histórico",
    placeEmail: "teatro.colon@cultura.gov.co",
    placePhone: "3009876543",
    placeAddress: "Calle 10 # 5-32",
    placeLatitude: 4.596848,
    placeLongitude: -74.074337
  },
  {
    placeUserCreateId: 3,
    placeName: "Museo Nacional",
    placeDescription: "Museo de historia y arte",
    placeEmail: "museo.nacional@museos.gov.co",
    placePhone: "3002345678",
    placeAddress: "Carrera 7 # 28-66",
    placeLatitude: 4.614795,
    placeLongitude: -74.069963
  },
  {
    placeUserCreateId: 4,
    placeName: "Monserrate",
    placeDescription: "Cerro emblemático",
    placeEmail: "monserrate@bogota.gov.co",
    placePhone: "3003456789",
    placeAddress: "Carrera 2 Este # 21-48",
    placeLatitude: 4.605833,
    placeLongitude: -74.056389
  },
  {
    placeUserCreateId: 5,
    placeName: "Jardín Botánico",
    placeDescription: "Jardín botánico de Bogotá",
    placeEmail: "jardin.botanico@bogota.gov.co",
    placePhone: "3004567890",
    placeAddress: "Calle 63 # 68-95",
    placeLatitude: 4.667802,
    placeLongitude: -74.102381
  },
  {
    placeUserCreateId: 1,
    placeName: "Plaza de Bolívar",
    placeDescription: "Plaza principal de Bogotá",
    placeEmail: "plaza.bolivar@bogota.gov.co",
    placePhone: "3005678901",
    placeAddress: "Calle 10 # 7-50",
    placeLatitude: 4.598056,
    placeLongitude: -74.075833
  },
  {
    placeUserCreateId: 2,
    placeName: "Biblioteca Luis Ángel Arango",
    placeDescription: "Biblioteca principal",
    placeEmail: "biblioteca.arango@banrep.gov.co",
    placePhone: "3006789012",
    placeAddress: "Calle 11 # 4-14",
    placeLatitude: 4.598735,
    placeLongitude: -74.073426
  },
  {
    placeUserCreateId: 3,
    placeName: "Planetario de Bogotá",
    placeDescription: "Centro astronómico",
    placeEmail: "planetario@idrd.gov.co",
    placePhone: "3007890123",
    placeAddress: "Calle 26B # 5-93",
    placeLatitude: 4.614432,
    placeLongitude: -74.07411
  },
  {
    placeUserCreateId: 4,
    placeName: "Maloka",
    placeDescription: "Centro interactivo de ciencia y tecnología",
    placeEmail: "info@maloka.org",
    placePhone: "3008901234",
    placeAddress: "Carrera 68D # 24A-51",
    placeLatitude: 4.656667,
    placeLongitude: -74.107778
  },
  {
    placeUserCreateId: 5,
    placeName: "Catedral de Sal",
    placeDescription: "Catedral subterránea de sal",
    placeEmail: "catedraldesal@zipaquira.gov.co",
    placePhone: "3009012345",
    placeAddress: "Zipaquirá",
    placeLatitude: 5.022544,
    placeLongitude: -74.00972
  },
  {
    placeUserCreateId: 1,
    placeName: "Museo del Oro",
    placeDescription: "Museo de orfebrería precolombina",
    placeEmail: "museo.oro@banrep.gov.co",
    placePhone: "3000123456",
    placeAddress: "Carrera 6 # 15-88",
    placeLatitude: 4.601611,
    placeLongitude: -74.071613
  },
  {
    placeUserCreateId: 2,
    placeName: "Parque de la 93",
    placeDescription: "Parque urbano y zona gastronómica",
    placeEmail: "parque93@bogota.gov.co",
    placePhone: "3001234567",
    placeAddress: "Calle 93 con Carrera 11",
    placeLatitude: 4.676227,
    placeLongitude: -74.048648
  },
  {
    placeUserCreateId: 3,
    placeName: "Centro Comercial Andino",
    placeDescription: "Centro comercial de lujo",
    placeEmail: "info@ccandino.com",
    placePhone: "3002345678",
    placeAddress: "Carrera 11 # 82-71",
    placeLatitude: 4.666389,
    placeLongitude: -74.053611
  },
  {
    placeUserCreateId: 4,
    placeName: "Estadio El Campín",
    placeDescription: "Estadio principal de fútbol",
    placeEmail: "elcampin@idrd.gov.co",
    placePhone: "3003456789",
    placeAddress: "Carrera 30 # 57-60",
    placeLatitude: 4.647778,
    placeLongitude: -74.075833
  },
  {
    placeUserCreateId: 5,
    placeName: "Parque Nacional",
    placeDescription: "Parque histórico",
    placeEmail: "parque.nacional@bogota.gov.co",
    placePhone: "3004567890",
    placeAddress: "Carrera 7 y Calle 39",
    placeLatitude: 4.624444,
    placeLongitude: -74.066944
  },
  {
    placeUserCreateId: 1,
    placeName: "Zona G",
    placeDescription: "Zona gastronómica",
    placeEmail: "zonag@bogota.gov.co",
    placePhone: "3005678901",
    placeAddress: "Calle 69 y Carrera 6",
    placeLatitude: 4.651944,
    placeLongitude: -74.058611
  },
  {
    placeUserCreateId: 2,
    placeName: "Usaquén",
    placeDescription: "Antiguo pueblo colonial",
    placeEmail: "usaquen@bogota.gov.co",
    placePhone: "3006789012",
    placeAddress: "Carrera 6 # 119b",
    placeLatitude: 4.692778,
    placeLongitude: -74.031944
  },
  {
    placeUserCreateId: 3,
    placeName: "La Candelaria",
    placeDescription: "Centro histórico",
    placeEmail: "candelaria@bogota.gov.co",
    placePhone: "3007890123",
    placeAddress: "Carrera 2 # 12b-41",
    placeLatitude: 4.596111,
    placeLongitude: -74.073889
  },
  {
    placeUserCreateId: 4,
    placeName: "Zona Rosa",
    placeDescription: "Zona de entretenimiento",
    placeEmail: "zonarosa@bogota.gov.co",
    placePhone: "3008901234",
    placeAddress: "Calle 82 y Carrera 13",
    placeLatitude: 4.6675,
    placeLongitude: -74.052778
  },
  {
    placeUserCreateId: 5,
    placeName: "Parque El Virrey",
    placeDescription: "Parque lineal",
    placeEmail: "parque.virrey@bogota.gov.co",
    placePhone: "3009012345",
    placeAddress: "Carrera 15 # 88-14",
    placeLatitude: 4.672778,
    placeLongitude: -74.056389
  }
];

export const eventTemplateData = [
  {
    eventUserCreateId: 1,
    eventPlaceId: 1,
    eventName: "Concierto en el Parque",
    eventDescription: "Gran concierto al aire libre",
    eventDate: "2024-09-15T19:00:00"
  },
  {
    eventUserCreateId: 2,
    eventPlaceId: 2,
    eventName: "Obra de teatro clásica",
    eventDescription: "Representación de Romeo y Julieta",
    eventDate: "2024-10-01T20:00:00"
  },
  {
    eventUserCreateId: 3,
    eventPlaceId: 3,
    eventName: "Exposición de arte moderno",
    eventDescription: "Muestra de artistas contemporáneos",
    eventDate: "2024-09-20T10:00:00"
  },
  {
    eventUserCreateId: 4,
    eventPlaceId: 4,
    eventName: "Carrera de ascenso a Monserrate",
    eventDescription: "Competencia deportiva",
    eventDate: "2024-11-05T07:00:00"
  },
  {
    eventUserCreateId: 5,
    eventPlaceId: 5,
    eventName: "Festival de las flores",
    eventDescription: "Exhibición floral anual",
    eventDate: "2024-08-10T09:00:00"
  },
  {
    eventUserCreateId: 1,
    eventPlaceId: 6,
    eventName: "Celebración del Día de la Independencia",
    eventDescription: "Evento patriótico",
    eventDate: "2024-07-20T11:00:00"
  },
  {
    eventUserCreateId: 2,
    eventPlaceId: 7,
    eventName: "Feria del libro",
    eventDescription: "Evento literario anual",
    eventDate: "2024-04-25T10:00:00"
  },
  {
    eventUserCreateId: 3,
    eventPlaceId: 8,
    eventName: "Noche de estrellas",
    eventDescription: "Observación astronómica",
    eventDate: "2024-12-15T21:00:00"
  },
  {
    eventUserCreateId: 4,
    eventPlaceId: 9,
    eventName: "Exposición de tecnología",
    eventDescription: "Muestra de avances tecnológicos",
    eventDate: "2024-06-01T09:00:00"
  },
  {
    eventUserCreateId: 5,
    eventPlaceId: 10,
    eventName: "Tour guiado en la Catedral de Sal",
    eventDescription: "Recorrido especial nocturno",
    eventDate: "2024-10-31T19:00:00"
  },
  {
    eventUserCreateId: 1,
    eventPlaceId: 11,
    eventName: "Exhibición de orfebrería precolombina",
    eventDescription: "Muestra especial de piezas únicas",
    eventDate: "2024-03-15T10:00:00"
  },
  {
    eventUserCreateId: 2,
    eventPlaceId: 12,
    eventName: "Festival gastronómico",
    eventDescription: "Degustación de comida local",
    eventDate: "2024-05-20T12:00:00"
  },
  {
    eventUserCreateId: 3,
    eventPlaceId: 13,
    eventName: "Desfile de moda",
    eventDescription: "Presentación de diseñadores locales",
    eventDate: "2024-09-30T18:00:00"
  },
  {
    eventUserCreateId: 4,
    eventPlaceId: 14,
    eventName: "Partido de fútbol benéfico",
    eventDescription: "Evento deportivo solidario",
    eventDate: "2024-11-20T15:00:00"
  },
  {
    eventUserCreateId: 5,
    eventPlaceId: 15,
    eventName: "Picnic familiar",
    eventDescription: "Día de actividades al aire libre",
    eventDate: "2024-07-01T11:00:00"
  },
  {
    eventUserCreateId: 1,
    eventPlaceId: 16,
    eventName: "Cena gourmet",
    eventDescription: "Experiencia culinaria de alto nivel",
    eventDate: "2024-08-25T20:00:00"
  },
  {
    eventUserCreateId: 2,
    eventPlaceId: 17,
    eventName: "Mercado de pulgas",
    eventDescription: "Venta de artículos vintage y artesanías",
    eventDate: "2024-06-15T09:00:00"
  },
  {
    eventUserCreateId: 3,
    eventPlaceId: 18,
    eventName: "Tour histórico",
    eventDescription: "Recorrido por el centro histórico",
    eventDate: "2024-04-10T10:00:00"
  },
  {
    eventUserCreateId: 4,
    eventPlaceId: 19,
    eventName: "Fiesta de Halloween",
    eventDescription: "Celebración temática",
    eventDate: "2024-10-31T21:00:00"
  },
  {
    eventUserCreateId: 5,
    eventPlaceId: 20,
    eventName: "Yoga en el parque",
    eventDescription: "Clase gratuita de yoga",
    eventDate: "2024-05-05T07:00:00"
  },
  {
    eventUserCreateId: 1,
    eventPlaceId: 1,
    eventName: "Festival de música electrónica",
    eventDescription: "Evento musical de 12 horas",
    eventDate: "2024-12-01T18:00:00"
  },
  {
    eventUserCreateId: 2,
    eventPlaceId: 2,
    eventName: "Monólogo de comedia",
    eventDescription: "Show de stand-up comedy",
    eventDate: "2024-09-10T21:00:00"
  },
  {
    eventUserCreateId: 3,
    eventPlaceId: 3,
    eventName: "Taller de pintura",
    eventDescription: "Clase magistral con artista reconocido",
    eventDate: "2024-07-05T14:00:00"
  },
  {
    eventUserCreateId: 4,
    eventPlaceId: 4,
    eventName: "Caminata ecológica",
    eventDescription: "Recorrido por senderos naturales",
    eventDate: "2024-06-20T08:00:00"
  },
  {
    eventUserCreateId: 5,
    eventPlaceId: 5,
    eventName: "Exposición de orquídeas",
    eventDescription: "Muestra de especies exóticas",
    eventDate: "2024-03-01T10:00:00"
  },
  {
    eventUserCreateId: 1,
    eventPlaceId: 6,
    eventName: "Conmemoración histórica",
    eventDescription: "Recreación de evento histórico",
    eventDate: "2024-08-07T11:00:00"
  },
  {
    eventUserCreateId: 2,
    eventPlaceId: 7,
    eventName: "Conferencia de autor",
    eventDescription: "Charla con escritor bestseller",
    eventDate: "2024-11-15T18:00:00"
  },
  {
    eventUserCreateId: 3,
    eventPlaceId: 8,
    eventName: "Lanzamiento de cohete modelo",
    eventDescription: "Evento educativo de ciencia",
    eventDate: "2024-05-30T16:00:00"
  },
  {
    eventUserCreateId: 4,
    eventPlaceId: 9,
    eventName: "Hackathon",
    eventDescription: "Competencia de programación",
    eventDate: "2024-10-10T09:00:00"
  },
  {
    eventUserCreateId: 5,
    eventPlaceId: 10,
    eventName: "Concierto de música clásica",
    eventDescription: "Orquesta sinfónica en la Catedral",
    eventDate: "2024-12-20T20:00:00"
  },
  {
    eventUserCreateId: 1,
    eventPlaceId: 11,
    eventName: "Noche de museo",
    eventDescription: "Visita nocturna con eventos especiales",
    eventDate: "2024-05-18T19:00:00"
  },
  {
    eventUserCreateId: 2,
    eventPlaceId: 12,
    eventName: "Feria de emprendimiento",
    eventDescription: "Exposición de startups locales",
    eventDate: "2024-09-05T10:00:00"
  },
  {
    eventUserCreateId: 3,
    eventPlaceId: 13,
    eventName: "Black Friday",
    eventDescription: "Evento de compras con descuentos",
    eventDate: "2024-11-29T00:00:00"
  },
  {
    eventUserCreateId: 4,
    eventPlaceId: 14,
    eventName: "Torneo de fútbol amateur",
    eventDescription: "Competencia deportiva local",
    eventDate: "2024-08-15T09:00:00"
  },
  {
    eventUserCreateId: 5,
    eventPlaceId: 15,
    eventName: "Festival de cometas",
    eventDescription: "Exhibición de cometas artísticas",
    eventDate: "2024-07-25T13:00:00"
  },
  {
    eventUserCreateId: 1,
    eventPlaceId: 16,
    eventName: "Cata de vinos",
    eventDescription: "Degustación de vinos internacionales",
    eventDate: "2024-04-05T19:00:00"
  },
  {
    eventUserCreateId: 2,
    eventPlaceId: 17,
    eventName: "Feria de adopción de mascotas",
    eventDescription: "Evento de adopción responsable",
    eventDate: "2024-06-30T10:00:00"
  },
  {
    eventUserCreateId: 3,
    eventPlaceId: 18,
    eventName: "Tour de grafiti",
    eventDescription: "Recorrido por el arte urbano",
    eventDate: "2024-03-20T15:00:00"
  },
  {
    eventUserCreateId: 4,
    eventPlaceId: 19,
    eventName: "Fiesta de Año Nuevo",
    eventDescription: "Celebración de fin de año",
    eventDate: "2024-12-31T22:00:00"
  },
  {
    eventUserCreateId: 5,
    eventPlaceId: 20,
    eventName: "Maratón de Bogotá",
    eventDescription: "Carrera anual por la ciudad",
    eventDate: "2024-10-28T06:00:00"
  },
  {
    eventUserCreateId: 1,
    eventPlaceId: 1,
    eventName: "Picnic nocturno",
    eventDescription: "Cena bajo las estrellas",
    eventDate: "2024-07-15T20:00:00"
  },
  {
    eventUserCreateId: 2,
    eventPlaceId: 2,
    eventName: "Festival de cine independiente",
    eventDescription: "Muestra de películas locales",
    eventDate: "2024-08-20T17:00:00"
  },
  {
    eventUserCreateId: 3,
    eventPlaceId: 3,
    eventName: "Exposición fotográfica",
    eventDescription: "Muestra de fotógrafos emergentes",
    eventDate: "2024-06-10T11:00:00"
  },
  {
    eventUserCreateId: 4,
    eventPlaceId: 4,
    eventName: "Competencia de ciclismo de montaña",
    eventDescription: "Carrera en terreno difícil",
    eventDate: "2024-09-25T08:00:00"
  },
  {
    eventUserCreateId: 5,
    eventPlaceId: 5,
    eventName: "Taller de jardinería",
    eventDescription: "Aprende a cultivar tu propio jardín",
    eventDate: "2024-04-15T10:00:00"
  },
  {
    eventUserCreateId: 1,
    eventPlaceId: 6,
    eventName: "Desfile militar",
    eventDescription: "Exhibición de fuerzas armadas",
    eventDate: "2024-08-08T10:00:00"
  },
  {
    eventUserCreateId: 2,
    eventPlaceId: 7,
    eventName: "Club de lectura",
    eventDescription: "Discusión de libro del mes",
    eventDate: "2024-05-25T18:00:00"
  },
  {
    eventUserCreateId: 3,
    eventPlaceId: 8,
    eventName: "Observación de eclipse lunar",
    eventDescription: "Evento astronómico especial",
    eventDate: "2024-10-15T23:00:00"
  },
  {
    eventUserCreateId: 4,
    eventPlaceId: 9,
    eventName: "Feria de ciencias",
    eventDescription: "Exhibición de proyectos escolares",
    eventDate: "2024-11-10T09:00:00"
  },
  {
    eventUserCreateId: 5,
    eventPlaceId: 10,
    eventName: "Concierto de rock",
    eventDescription: "Presentación de bandas locales",
    eventDate: "2024-07-30T20:00:00"
  }
];

export const registerTemplateData = [
  {
    registerUserId: 1,
    registerEventId: 1,
    registerDate: "2024-12-31T23:59:59",
    registerConfirmation: false
  },
  {
    registerUserId: 1,
    registerEventId: 1,
    registerDate: "2024-09-10T10:00:00",
    registerConfirmation: true
  },
  {
    registerUserId: 2,
    registerEventId: 1,
    registerDate: "2024-09-11T11:00:00",
    registerConfirmation: true
  },
  {
    registerUserId: 3,
    registerEventId: 1,
    registerDate: "2024-09-12T12:00:00",
    registerConfirmation: false
  },
  {
    registerUserId: 4,
    registerEventId: 2,
    registerDate: "2024-09-25T09:00:00",
    registerConfirmation: true
  },
  {
    registerUserId: 5,
    registerEventId: 2,
    registerDate: "2024-09-26T10:00:00",
    registerConfirmation: true
  },
  {
    registerUserId: 1,
    registerEventId: 3,
    registerDate: "2024-09-15T14:00:00",
    registerConfirmation: true
  },
  {
    registerUserId: 2,
    registerEventId: 3,
    registerDate: "2024-09-16T15:00:00",
    registerConfirmation: false
  },
  {
    registerUserId: 3,
    registerEventId: 4,
    registerDate: "2024-10-30T08:00:00",
    registerConfirmation: true
  },
  {
    registerUserId: 4,
    registerEventId: 4,
    registerDate: "2024-10-31T09:00:00",
    registerConfirmation: true
  },
  {
    registerUserId: 5,
    registerEventId: 5,
    registerDate: "2024-08-05T11:00:00",
    registerConfirmation: true
  },
  {
    registerUserId: 1,
    registerEventId: 6,
    registerDate: "2024-07-15T13:00:00",
    registerConfirmation: true
  },
  {
    registerUserId: 2,
    registerEventId: 7,
    registerDate: "2024-04-20T10:00:00",
    registerConfirmation: true
  },
  {
    registerUserId: 3,
    registerEventId: 8,
    registerDate: "2024-12-10T20:00:00",
    registerConfirmation: false
  },
  {
    registerUserId: 4,
    registerEventId: 9,
    registerDate: "2024-05-28T11:00:00",
    registerConfirmation: true
  },
  {
    registerUserId: 5,
    registerEventId: 10,
    registerDate: "2024-10-25T18:00:00",
    registerConfirmation: true
  },
  {
    registerUserId: 1,
    registerEventId: 11,
    registerDate: "2024-03-10T09:00:00",
    registerConfirmation: true
  },
  {
    registerUserId: 2,
    registerEventId: 12,
    registerDate: "2024-05-15T13:00:00",
    registerConfirmation: true
  },
  {
    registerUserId: 3,
    registerEventId: 13,
    registerDate: "2024-09-25T17:00:00",
    registerConfirmation: true
  },
  {
    registerUserId: 4,
    registerEventId: 14,
    registerDate: "2024-11-15T14:00:00",
    registerConfirmation: false
  },
  {
    registerUserId: 5,
    registerEventId: 15,
    registerDate: "2024-06-28T10:00:00",
    registerConfirmation: true
  },
  {
    registerUserId: 1,
    registerEventId: 16,
    registerDate: "2024-08-20T19:00:00",
    registerConfirmation: true
  },
  {
    registerUserId: 2,
    registerEventId: 17,
    registerDate: "2024-06-10T08:00:00",
    registerConfirmation: true
  },
  {
    registerUserId: 3,
    registerEventId: 18,
    registerDate: "2024-04-05T09:00:00",
    registerConfirmation: true
  },
  {
    registerUserId: 4,
    registerEventId: 19,
    registerDate: "2024-10-25T20:00:00",
    registerConfirmation: true
  },
  {
    registerUserId: 5,
    registerEventId: 20,
    registerDate: "2024-05-01T06:00:00",
    registerConfirmation: false
  },
  {
    registerUserId: 1,
    registerEventId: 21,
    registerDate: "2024-11-25T17:00:00",
    registerConfirmation: true
  },
  {
    registerUserId: 2,
    registerEventId: 22,
    registerDate: "2024-09-05T20:00:00",
    registerConfirmation: true
  },
  {
    registerUserId: 3,
    registerEventId: 23,
    registerDate: "2024-07-01T13:00:00",
    registerConfirmation: true
  },
  {
    registerUserId: 4,
    registerEventId: 24,
    registerDate: "2024-06-15T07:00:00",
    registerConfirmation: true
  },
  {
    registerUserId: 5,
    registerEventId: 25,
    registerDate: "2024-02-25T09:00:00",
    registerConfirmation: true
  },
  {
    registerUserId: 1,
    registerEventId: 26,
    registerDate: "2024-08-02T10:00:00",
    registerConfirmation: false
  },
  {
    registerUserId: 2,
    registerEventId: 27,
    registerDate: "2024-11-10T17:00:00",
    registerConfirmation: true
  },
  {
    registerUserId: 3,
    registerEventId: 28,
    registerDate: "2024-05-25T15:00:00",
    registerConfirmation: true
  },
  {
    registerUserId: 4,
    registerEventId: 29,
    registerDate: "2024-10-05T08:00:00",
    registerConfirmation: true
  },
  {
    registerUserId: 5,
    registerEventId: 30,
    registerDate: "2024-12-15T19:00:00",
    registerConfirmation: true
  },
  {
    registerUserId: 1,
    registerEventId: 31,
    registerDate: "2024-05-13T18:00:00",
    registerConfirmation: true
  },
  {
    registerUserId: 2,
    registerEventId: 32,
    registerDate: "2024-09-01T09:00:00",
    registerConfirmation: false
  },
  {
    registerUserId: 3,
    registerEventId: 33,
    registerDate: "2024-11-24T23:00:00",
    registerConfirmation: true
  },
  {
    registerUserId: 4,
    registerEventId: 34,
    registerDate: "2024-08-10T08:00:00",
    registerConfirmation: true
  },
  {
    registerUserId: 5,
    registerEventId: 35,
    registerDate: "2024-07-20T12:00:00",
    registerConfirmation: true
  },
  {
    registerUserId: 1,
    registerEventId: 36,
    registerDate: "2024-04-01T18:00:00",
    registerConfirmation: true
  },
  {
    registerUserId: 2,
    registerEventId: 37,
    registerDate: "2024-06-25T09:00:00",
    registerConfirmation: true
  },
  {
    registerUserId: 3,
    registerEventId: 38,
    registerDate: "2024-03-15T14:00:00",
    registerConfirmation: false
  },
  {
    registerUserId: 4,
    registerEventId: 39,
    registerDate: "2024-12-25T21:00:00",
    registerConfirmation: true
  },
  {
    registerUserId: 5,
    registerEventId: 40,
    registerDate: "2024-10-23T05:00:00",
    registerConfirmation: true
  },
  {
    registerUserId: 1,
    registerEventId: 41,
    registerDate: "2024-07-10T19:00:00",
    registerConfirmation: true
  },
  {
    registerUserId: 2,
    registerEventId: 42,
    registerDate: "2024-08-15T16:00:00",
    registerConfirmation: true
  },
  {
    registerUserId: 3,
    registerEventId: 43,
    registerDate: "2024-06-05T10:00:00",
    registerConfirmation: true
  },
  {
    registerUserId: 4,
    registerEventId: 44,
    registerDate: "2024-09-20T07:00:00",
    registerConfirmation: false
  },
  {
    registerUserId: 5,
    registerEventId: 45,
    registerDate: "2024-04-10T09:00:00",
    registerConfirmation: true
  },
  {
    registerUserId: 1,
    registerEventId: 46,
    registerDate: "2024-08-03T09:00:00",
    registerConfirmation: true
  },
  {
    registerUserId: 2,
    registerEventId: 47,
    registerDate: "2024-05-20T17:00:00",
    registerConfirmation: true
  },
  {
    registerUserId: 3,
    registerEventId: 48,
    registerDate: "2024-10-10T22:00:00",
    registerConfirmation: true
  },
  {
    registerUserId: 4,
    registerEventId: 49,
    registerDate: "2024-11-05T08:00:00",
    registerConfirmation: true
  },
  {
    registerUserId: 5,
    registerEventId: 50,
    registerDate: "2024-07-25T19:00:00",
    registerConfirmation: false
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
