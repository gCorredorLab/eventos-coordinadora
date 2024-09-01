/**
 * @project Eventos - Coordinadora
 * @file PostgresQuery.test.ts
 * @description Pruebas unitarias para la función de consulta a PostgreSQL
 * @verified SI
 * @status DONE
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo contiene pruebas unitarias para la función `query` que interactúa con una base de datos PostgreSQL.
 * Las pruebas verifican que la función se ejecute correctamente, incluyendo la correcta ejecución de consultas
 * y el manejo adecuado de errores cuando una consulta falla. Para realizar estas pruebas, se utiliza un mock de la clase `Pool` de `pg`.
 */

/** @import librerías */
import {Pool} from "pg";

/** @import dependencias necesarias */
import {query} from "../config/dbConfig";

/** @mock Mock de la clase `Pool` de `pg` para las pruebas */
jest.mock("pg", () => {
  const mPool = {
    query: jest.fn() // Mock de la función query
  };
  return {Pool: jest.fn(() => mPool)};
});

/**
 * @describe Grupo de pruebas para la función `query` de PostgreSQL
 */
describe("Postgres query function", () => {
  let pool: any;
  let consoleErrorMock: jest.SpyInstance;

  /**
   * @beforeAll Inicializa el pool de conexiones de PostgreSQL antes de ejecutar las pruebas
   */
  beforeAll(() => {
    pool = new Pool();
  });

  /**
   * @beforeEach Mock de la función `console.error` antes de cada prueba
   */
  beforeEach(() => {
    consoleErrorMock = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  /**
   * @afterEach Limpia los mocks después de cada prueba
   */
  afterEach(() => {
    jest.clearAllMocks();
    consoleErrorMock.mockRestore();
  });

  /**
   * @test Verifica que la consulta se ejecute correctamente
   */
  it("should execute query successfully", async () => {
    const mockQueryResult = {rows: [{id: 1, name: "test"}]};
    pool.query.mockResolvedValueOnce(mockQueryResult);

    const result = await query("SELECT * FROM users WHERE id = $1", [1]);

    expect(result).toEqual(mockQueryResult);
    expect(pool.query).toHaveBeenCalledWith("SELECT * FROM users WHERE id = $1", [1]);
  });

  /**
   * @test Verifica que se lance un error cuando la consulta falle
   */
  it("should throw an error when the query fails", async () => {
    const mockError = new Error("Database error");
    pool.query.mockRejectedValueOnce(mockError);

    await expect(query("SELECT * FROM users WHERE id = $1", [1])).rejects.toThrow("Error ejecutando la consulta: Database error");

    expect(pool.query).toHaveBeenCalledWith("SELECT * FROM users WHERE id = $1", [1]);
  });
});
