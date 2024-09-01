/**
 * @project Eventos - Coordinadora
 * @file UpdateRegister.test.ts
 * @description Pruebas unitarias para el caso de uso UpdateRegister
 * @verified SI
 * @status DONE
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo contiene las pruebas unitarias para el caso de uso UpdateRegister.
 * Se prueban diferentes escenarios de actualización de registros y el manejo de errores.
 */

/** @import dependencias */
import {UpdateRegister} from "../application/use-cases/UpdateRegister";
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

  async updateRegister(register: Register): Promise<Register> {
    const index = this.registers.findIndex((r) => r.registerId === register.registerId);
    if (index === -1) {
      throw new Error("Register not found");
    }
    this.registers[index] = register;
    return register;
  }

  async getRegisterById(registerId: number): Promise<Register | null> {
    return this.registers.find((register) => register.registerId === registerId) || null;
  }

  async getAllRegisters(): Promise<Register[]> {
    throw new Error("Method not implemented.");
  }

  async createRegister(register: Register): Promise<Register> {
    throw new Error("Method not implemented.");
  }

  async deleteRegister(registerId: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

describe("UpdateRegister", () => {
  let updateRegister: UpdateRegister;
  let mockRegisterRepository: RegisterRepository;

  beforeEach(() => {
    mockRegisterRepository = new MockRegisterRepository();
    updateRegister = new UpdateRegister(mockRegisterRepository);
  });

  /**
   * @test Actualización exitosa de un registro existente
   * @description Verifica que se pueda actualizar correctamente un registro existente
   */
  it("should update an existing register successfully", async () => {
    const registerId = 1;
    const updatedRegisterData = {
      registerUserId: 1,
      registerEventId: 2,
      registerDate: new Date("2024-12-15T10:00:00Z"),
      registerConfirmation: false
    };

    const updatedRegister = await updateRegister.execute(registerId, updatedRegisterData);

    expect(updatedRegister).toBeDefined();
    expect(updatedRegister.registerId).toBe(registerId);
    expect(updatedRegister.registerUserId).toBe(updatedRegisterData.registerUserId);
    expect(updatedRegister.registerEventId).toBe(updatedRegisterData.registerEventId);
    expect(updatedRegister.registerDate).toEqual(updatedRegisterData.registerDate);
    expect(updatedRegister.registerConfirmation).toBe(updatedRegisterData.registerConfirmation);
  });

  /**
   * @test Llamada correcta al método updateRegister del repositorio
   * @description Verifica que el método updateRegister del repositorio sea llamado con los datos correctos
   */
  it("should call RegisterRepository.updateRegister with correct data", async () => {
    const registerId = 1;
    const updatedRegisterData = {
      registerUserId: 1,
      registerEventId: 2,
      registerDate: new Date("2024-12-15T10:00:00Z"),
      registerConfirmation: false
    };

    const spy = jest.spyOn(mockRegisterRepository, "updateRegister");

    await updateRegister.execute(registerId, updatedRegisterData);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        registerId,
        ...updatedRegisterData
      })
    );
  });

  /**
   * @test Manejo de errores al actualizar un registro no existente
   * @description Verifica que se lance un error al intentar actualizar un registro que no existe
   */
  it("should throw an error when trying to update a non-existent register", async () => {
    const nonExistentRegisterId = 999;
    const updatedRegisterData = {
      registerUserId: 1,
      registerEventId: 2,
      registerDate: new Date("2024-12-15T10:00:00Z"),
      registerConfirmation: false
    };

    jest.spyOn(mockRegisterRepository, "updateRegister").mockRejectedValue(new Error("Register not found"));

    await expect(updateRegister.execute(nonExistentRegisterId, updatedRegisterData)).rejects.toThrow("Register not found");
  });

  /**
   * @test Manejo de errores en la actualización de registros
   * @description Verifica que se manejen correctamente los errores cuando falla la actualización de un registro
   */
  it("should throw an error if RegisterRepository.updateRegister fails", async () => {
    const registerId = 1;
    const updatedRegisterData = {
      registerUserId: 1,
      registerEventId: 2,
      registerDate: new Date("2024-12-15T10:00:00Z"),
      registerConfirmation: false
    };

    jest.spyOn(mockRegisterRepository, "updateRegister").mockRejectedValue(new Error("Database error"));

    await expect(updateRegister.execute(registerId, updatedRegisterData)).rejects.toThrow("Database error");
  });
});
