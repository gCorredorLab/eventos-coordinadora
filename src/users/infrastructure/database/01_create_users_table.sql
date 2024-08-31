-- Eliminar las tablas si existen
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
