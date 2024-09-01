/**
 * @project Eventos - Coordinadora
 * @file GetRegister.test.ts
 * @description Pruebas unitarias para el caso de uso GetRegister
 * @verified SI
 * @status DONE
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo contiene las pruebas unitarias para el caso de uso GetRegister.
 * Se prueban diferentes escenarios de obtención de registros y el manejo de errores.
 */

/** @import dependencias */
import {GetRegister} from "../application/use-cases/GetRegister";
import {Register} from "../domain/entities/Register";
import {RegisterRepository} from "../application/interfaces/RegisterRepository";

/** Implementación mock del RegisterRepository */
class MockRegisterRepository implements RegisterRepository {
  private registers: Register[] = [
    {
      registerId: 1,
      registerUserId: 1,
      registerEventId: 1,
      registerDate: new Date("2024-12-01T10:00:00Z"),
      registerConfirmation: true
    }
  ];

  async getRegisterById(registerId: number): Promise<Register | null> {
    return this.registers.find((register) => register.registerId === registerId) || null;
  }

  async getAllRegisters(): Promise<Register[]> {
    throw new Error("Method not implemented.");
  }

  async createRegister(register: Register): Promise<Register> {
    throw new Error("Method not implemented.");
  }

  async updateRegister(register: Register): Promise<Register> {
    throw new Error("Method not implemented.");
  }

  async deleteRegister(registerId: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

describe("GetRegister", () => {
  let getRegister: GetRegister;
  let mockRegisterRepository: RegisterRepository;

  beforeEach(() => {
    mockRegisterRepository = new MockRegisterRepository();
    getRegister = new GetRegister(mockRegisterRepository);
  });

  /**
   * @test Obtención exitosa de un registro existente
   * @description Verifica que se pueda obtener un registro existente por su ID
   */
  it("should get an existing register successfully", async () => {
    const registerId = 1;
    const register = await getRegister.execute(registerId);

    expect(register).not.toBeNull();
    expect(register?.registerId).toBe(registerId);
    expect(register?.registerUserId).toBe(1);
    expect(register?.registerEventId).toBe(1);
    expect(register?.registerDate).toEqual(new Date("2024-12-01T10:00:00Z"));
    expect(register?.registerConfirmation).toBe(true);
  });

  /**
   * @test Intento de obtener un registro no existente
   * @description Verifica que se devuelva null al intentar obtener un registro que no existe
   */
  it("should return null for non-existent register", async () => {
    const nonExistentRegisterId = 999;
    const register = await getRegister.execute(nonExistentRegisterId);

    expect(register).toBeNull();
  });

  /**
   * @test Llamada correcta al método getRegisterById del repositorio
   * @description Verifica que el método getRegisterById del repositorio sea llamado con el ID correcto
   */
  it("should call RegisterRepository.getRegisterById with correct registerId", async () => {
    const registerId = 1;
    const spy = jest.spyOn(mockRegisterRepository, "getRegisterById");

    await getRegister.execute(registerId);

    expect(spy).toHaveBeenCalledWith(registerId);
  });

  /**
   * @test Manejo de errores en la obtención de registros
   * @description Verifica que se manejen correctamente los errores cuando falla la obtención de un registro
   */
  it("should throw an error if RegisterRepository.getRegisterById fails", async () => {
    const registerId = 1;
    jest.spyOn(mockRegisterRepository, "getRegisterById").mockRejectedValue(new Error("Database error"));

    await expect(getRegister.execute(registerId)).rejects.toThrow("Database error");
  });
});
