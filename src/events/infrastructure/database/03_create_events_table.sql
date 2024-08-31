-- Eliminar las tablas si existen
DROP TABLE IF EXISTS "events";

-- Crear la tabla de eventos
CREATE TABLE "events" (
    "eventId" SERIAL PRIMARY KEY,
    "eventUserCreateId" INTEGER REFERENCES "users"("userId") ON DELETE CASCADE,
    "eventPlaceId" INTEGER REFERENCES "places"("placeId") ON DELETE CASCADE,
    "eventName" VARCHAR(255) NOT NULL,
    "eventDescription" TEXT,
    "eventDate" TIMESTAMP NOT NULL
);
