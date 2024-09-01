import {Pool} from "pg";
import {query} from "../config/postgres";

jest.mock("pg", () => {
  const mPool = {
    query: jest.fn()
  };
  return {Pool: jest.fn(() => mPool)};
});

describe("Postgres query function", () => {
  let pool: any;
  let consoleErrorMock: jest.SpyInstance;

  beforeAll(() => {
    pool = new Pool();
  });

  beforeEach(() => {
    consoleErrorMock = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
    consoleErrorMock.mockRestore();
  });

  it("should execute query successfully", async () => {
    const mockQueryResult = {rows: [{id: 1, name: "test"}]};
    pool.query.mockResolvedValueOnce(mockQueryResult);

    const result = await query("SELECT * FROM users WHERE id = $1", [1]);

    expect(result).toEqual(mockQueryResult);
    expect(pool.query).toHaveBeenCalledWith("SELECT * FROM users WHERE id = $1", [1]);
  });

  it("should throw an error when the query fails", async () => {
    const mockError = new Error("Database error");
    pool.query.mockRejectedValueOnce(mockError);

    await expect(query("SELECT * FROM users WHERE id = $1", [1])).rejects.toThrow("Error ejecutando la consulta: Database error");

    expect(pool.query).toHaveBeenCalledWith("SELECT * FROM users WHERE id = $1", [1]);
  });
});
