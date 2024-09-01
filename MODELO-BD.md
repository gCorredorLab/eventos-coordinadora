# Modelo relacional de la base de datos


## 1. Entidades y Atributos
Users (users)

userId (PK): Identificador único del usuario.
userName: Nombre del usuario.
userLastname: Apellido del usuario.
userEmail: Correo electrónico del usuario (único).
password: Contraseña del usuario.
userLatitude: Latitud de la ubicación del usuario.
userLongitude: Longitud de la ubicación del usuario.
Places (places)

placeId (PK): Identificador único del lugar.
placeUserCreateId (FK): Referencia al usuario que creó el lugar (users.userId).
placeName: Nombre del lugar.
placeDescription: Descripción del lugar.
placeEmail: Correo electrónico del lugar.
placePhone: Teléfono del lugar.
placeAddress: Dirección del lugar.
placeLatitude: Latitud de la ubicación del lugar.
placeLongitude: Longitud de la ubicación del lugar.
Events (events)

eventId (PK): Identificador único del evento.
eventUserCreateId (FK): Referencia al usuario que creó el evento (users.userId).
eventPlaceId (FK): Referencia al lugar donde se realiza el evento (places.placeId).
eventName: Nombre del evento.
eventDescription: Descripción del evento.
eventDate: Fecha y hora del evento.
Registers (registers)

registerId (PK): Identificador único del registro.
registerUserId (FK): Referencia al usuario que se registra en el evento (users.userId).
registerEventId (FK): Referencia al evento al que se registra el usuario (events.eventId).
registerDate: Fecha y hora del registro.
registerConfirmation: Confirmación de la asistencia al evento (booleano).

## 2. Relaciones entre las Entidades
Users y Places: Relación uno a muchos, donde un usuario puede crear varios lugares (users.userId → places.placeUserCreateId).

Users y Events: Relación uno a muchos, donde un usuario puede crear varios eventos (users.userId → events.eventUserCreateId).

Places y Events: Relación uno a muchos, donde un lugar puede albergar varios eventos (places.placeId → events.eventPlaceId).

Users y Registers: Relación uno a muchos, donde un usuario puede registrarse en varios eventos (users.userId → registers.registerUserId).

Events y Registers: Relación uno a muchos, donde un evento puede tener varios registros de usuarios (events.eventId → registers.registerEventId).

## Diagrama Relacional Simplificado

Users
+---------------+
| userId (PK)   |
| userName      |
| userLastname  |
| userEmail     |
| password      |
| userLatitude  |
| userLongitude |
+---------------+
      |
      | 1
      |    
      +<----------------------------------+
      |                                   |
      v                                   |
+---------------+                         |
| placeUserCreateId (FK)                  |
| placeId (PK)                            |
| placeName                               |
| placeDescription                        |
| placeEmail                              |
| placePhone                              |
| placeAddress                            |
| placeLatitude                           |
| placeLongitude                          |
+-----------------------------------------+
      |                                   |
      | 1                                 |
      |                                   |
      +<----------------------------------+
      |                                   |
      v                                   |
+---------------+                         |
| eventUserCreateId (FK)                  |
| eventPlaceId (FK)                       |
| eventId (PK)                            |
| eventName                               |
| eventDescription                        |
| eventDate                               |
+-----------------------------------------+
      |
      | 1
      |
      +<----------------------------------+
      |                                   |
      v                                   |
+---------------+                         |
| registerUserId (FK)                     |
| registerEventId (FK)                    |
| registerId (PK)                         |
| registerDate                            |
| registerConfirmation                    |
+-----------------------------------------+
## Notas:
Clave Primaria (PK): Indicada con PK.
Clave Foránea (FK): Indicada con FK.

Cada tabla tiene una relación de uno a muchos con las tablas relacionadas a través de sus claves foráneas.
Con este modelo se puede entender cómo están conectadas las tablas y cómo se pueden realizar las consultas entre ellas en la base de datos relacional.
