/**
 * @project Eventos - Coordinadora
 * @file GetAllRegisters.test.ts
 * @description Pruebas unitarias para el caso de uso GetAllRegisters
 * @verified SI
 * @status DONE
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo contiene las pruebas unitarias para el caso de uso GetAllRegisters.
 * Se prueban diferentes escenarios de obtención de todos los registros y el manejo de errores.
 */

/** @import dependencias */
import {GetAllRegisters} from "../application/use-cases/GetAllRegisters";
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
    },
    {
      registerId: 2,
      registerUserId: 2,
      registerEventId: 2,
      registerDate: new Date("2024-11-15T09:00:00Z"),
      registerConfirmation: false
    }
  ];

  async getAllRegisters(): Promise<Register[]> {
    return this.registers;
  }

  async createRegister(register: Register): Promise<Register> {
    throw new Error("Method not implemented.");
  }

  async getRegisterById(registerId: number): Promise<Register | null> {
    throw new Error("Method not implemented.");
  }

  async updateRegister(register: Register): Promise<Register> {
    throw new Error("Method not implemented.");
  }

  async deleteRegister(registerId: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

describe("GetAllRegisters", () => {
  let getAllRegisters: GetAllRegisters;
  let mockRegisterRepository: RegisterRepository;

  beforeEach(() => {
    mockRegisterRepository = new MockRegisterRepository();
    getAllRegisters = new GetAllRegisters(mockRegisterRepository);
  });

  /**
   * @test Obtención exitosa de todos los registros
   * @description Verifica que se puedan obtener todos los registros realizados
   */
  it("should get all registers successfully", async () => {
    const registers = await getAllRegisters.execute();

    expect(registers).not.toBeNull();
    expect(registers.length).toBe(2);
    expect(registers[0].registerUserId).toBe(1);
    expect(registers[1].registerUserId).toBe(2);
  });

  /**
   * @test Llamada correcta al método getAllRegisters del repositorio
   * @description Verifica que el método getAllRegisters del repositorio sea llamado correctamente
   */
  it("should call RegisterRepository.getAllRegisters", async () => {
    const spy = jest.spyOn(mockRegisterRepository, "getAllRegisters");

    await getAllRegisters.execute();

    expect(spy).toHaveBeenCalled();
  });

  /**
   * @test Manejo de errores en la obtención de todos los registros
   * @description Verifica que se manejen correctamente los errores cuando falla la obtención de todos los registros
   */
  it("should throw an error if RegisterRepository.getAllRegisters fails", async () => {
    jest.spyOn(mockRegisterRepository, "getAllRegisters").mockRejectedValue(new Error("Database error"));

    await expect(getAllRegisters.execute()).rejects.toThrow("Database error");
  });
});
