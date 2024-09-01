/**
 * @project Eventos - Coordinadora
 * @file dbConfig.ts
 * @description Configuración y manejo de la conexión a la base de datos PostgreSQL
 * @verified SI
 * @status DONE
 * @unitTests SI
 * @unitTestsStatus PASSED
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 */

/** @import librerias */
import dotenv from "dotenv";
import {Pool, QueryResult} from "pg";

/** @load variables de entorno */
dotenv.config();

/**
 * Crea una nueva instancia de Pool para gestionar la conexión a la base de datos
 */
export const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? "5432"),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

/**
 * Ejecuta una consulta SQL en la base de datos PostgreSQL
 * @param text La consulta SQL que se va a ejecutar
 * @param params Parámetros para la consulta SQL (opcional)
 * @returns Una promesa que resuelve el resultado de la consulta
 * @throws Error si la consulta falla
 */
export const query = async (text: string, params?: any[]): Promise<QueryResult> => {
  try {
    const result = await pool.query(text, params);
    return result;
  } catch (error: any) {
    console.error(`🚀 ---> dbConfig.ts ~ Error ejecutando la consulta - msg:`, error.message);
    console.error(`🚀 ---> dbConfig.ts ~ Error ejecutando la consulta - all:`, JSON.stringify(error, null, 2));
    throw new Error(`Error ejecutando la consulta: ${error.message}`);
  }
};

/** @note exporta el tipo Pool para su uso en otros archivos si es necesario */
export {Pool};
