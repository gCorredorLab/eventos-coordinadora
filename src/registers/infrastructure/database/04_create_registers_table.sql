-- Eliminar las tablas si existen
DROP TABLE IF EXISTS "registers";

-- Crear la tabla de registers
CREATE TABLE "registers" (
    "registerId" SERIAL PRIMARY KEY,
    "registerUserId" INTEGER REFERENCES "users"("userId") ON DELETE CASCADE,
    "registerEventId" INTEGER REFERENCES "events"("eventId") ON DELETE CASCADE,
    "registerDate" TIMESTAMP NOT NULL,
    "registerConfirmation" BOOLEAN NOT NULL
);
