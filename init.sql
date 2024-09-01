-- Conectar a la base de datos por defecto
\c postgres

-- Eliminar la base de datos si existe
DROP DATABASE IF EXISTS db_coordinadora_eventos;

-- Crear la base de datos
CREATE DATABASE db_coordinadora_eventos;

-- Conectar a la base de datos
\c db_coordinadora_eventos

-- Eliminar las tablas si existen (en orden inverso debido a las dependencias)
DROP TABLE IF EXISTS "registers";
DROP TABLE IF EXISTS "events";
DROP TABLE IF EXISTS "places";
DROP TABLE IF EXISTS "users";

-- Crear la tabla de usuarios
CREATE TABLE "users" (
    "userId" SERIAL PRIMARY KEY,
    "userName" VARCHAR(255) NOT NULL,
    "userLastname" VARCHAR(255) NOT NULL,
    "userEmail" VARCHAR(255) UNIQUE NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "userLatitude" DECIMAL(9, 6) NOT NULL,
    "userLongitude" DECIMAL(9, 6) NOT NULL
);

-- Crear la tabla de lugares
CREATE TABLE "places" (
    "placeId" SERIAL PRIMARY KEY,
    "placeUserCreateId" INTEGER REFERENCES "users"("userId") ON DELETE CASCADE,
    "placeName" VARCHAR(255) NOT NULL,
    "placeDescription" TEXT,
    "placeEmail" VARCHAR(255),
    "placePhone" VARCHAR(20),
    "placeAddress" VARCHAR(255),
    "placeLatitude" DECIMAL(9, 6) NOT NULL,
    "placeLongitude" DECIMAL(9, 6) NOT NULL
);

-- Crear la tabla de eventos
CREATE TABLE "events" (
    "eventId" SERIAL PRIMARY KEY,
    "eventUserCreateId" INTEGER REFERENCES "users"("userId") ON DELETE CASCADE,
    "eventPlaceId" INTEGER REFERENCES "places"("placeId") ON DELETE CASCADE,
    "eventName" VARCHAR(255) NOT NULL,
    "eventDescription" TEXT,
    "eventDate" TIMESTAMP NOT NULL
);

-- Crear la tabla de registers
CREATE TABLE "registers" (
    "registerId" SERIAL PRIMARY KEY,
    "registerUserId" INTEGER REFERENCES "users"("userId") ON DELETE CASCADE,
    "registerEventId" INTEGER REFERENCES "events"("eventId") ON DELETE CASCADE,
    "registerDate" TIMESTAMP NOT NULL,
    "registerConfirmation" BOOLEAN NOT NULL
);
