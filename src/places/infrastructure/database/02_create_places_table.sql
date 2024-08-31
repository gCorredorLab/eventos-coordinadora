-- Eliminar las tablas si existen
DROP TABLE IF EXISTS "places";

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
