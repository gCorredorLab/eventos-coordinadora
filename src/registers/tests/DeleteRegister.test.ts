/**
 * @project Eventos - Coordinadora
 * @file DeleteRegister.test.ts
 * @description Pruebas unitarias para el caso de uso DeleteRegister
 * @verified SI
 * @status DONE
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo contiene las pruebas unitarias para el caso de uso DeleteRegister.
 * Se prueban diferentes escenarios de eliminación de registros y el manejo de errores.
 */

/** @import dependencias */
import {DeleteRegister} from "../application/use-cases/DeleteRegister";
import {Register} from "../domain/entities/Register";
import {RegisterRepository} from "../application/interfaces/RegisterRepository";

/** Implementación mock del RegisterRepository */
class MockRegisterRepository implements RegisterRepository {
  private registers: Register[] = [
    {registerId: 1, registerUserId: 1, registerEventId: 1, registerDate: new Date("2024-12-01T10:00:00Z"), registerConfirmation: true}
  ];

  async deleteRegister(registerId: number): Promise<void> {
    const index = this.registers.findIndex((register) => register.registerId === registerId);
    if (index === -1) {
      throw new Error("Register not found");
    }
    this.registers.splice(index, 1);
  }

  async createRegister(register: Register): Promise<Register> {
    throw new Error("Method not implemented.");
  }

  async getAllRegisters(): Promise<Register[]> {
    return this.registers;
  }

  async getRegisterById(registerId: number): Promise<Register | null> {
    return this.registers.find((register) => register.registerId === registerId) || null;
  }

  async updateRegister(register: Register): Promise<Register> {
    throw new Error("Method not implemented.");
  }
}

describe("DeleteRegister", () => {
  let deleteRegister: DeleteRegister;
  let mockRegisterRepository: RegisterRepository;

  beforeEach(() => {
    mockRegisterRepository = new MockRegisterRepository();
    deleteRegister = new DeleteRegister(mockRegisterRepository);
  });

  /**
   * @test Eliminación exitosa de un registro
   * @description Verifica que se pueda eliminar un registro existente por su ID
   */
  it("should delete a register successfully", async () => {
    const registerId = 1;
    await expect(deleteRegister.execute(registerId)).resolves.not.toThrow();
  });

  /**
   * @test Llamada correcta al método deleteRegister del repositorio
   * @description Verifica que el método deleteRegister del repositorio sea llamado con el ID correcto
   */
  it("should call RegisterRepository.deleteRegister with correct registerId", async () => {
    const registerId = 1;
    const spy = jest.spyOn(mockRegisterRepository, "deleteRegister");

    await deleteRegister.execute(registerId);

    expect(spy).toHaveBeenCalledWith(registerId);
  });

  /**
   * @test Manejo de errores en la eliminación de registros
   * @description Verifica que se manejen correctamente los errores cuando falla la eliminación de un registro
   */
  it("should throw an error if RegisterRepository.deleteRegister fails", async () => {
    const registerId = 999; // ID de registro que no existe
    jest.spyOn(mockRegisterRepository, "deleteRegister").mockRejectedValue(new Error("Register not found"));

    await expect(deleteRegister.execute(registerId)).rejects.toThrow("Register not found");
  });

  /**
   * @test Intento de eliminar un registro inexistente
   * @description Verifica el comportamiento cuando se intenta eliminar un registro que no existe
   */
  it("should handle attempt to delete non-existent register", async () => {
    const nonExistentRegisterId = 2;

    /** Modificamos el mock para que lance un error cuando el registro no existe */
    jest.spyOn(mockRegisterRepository, "deleteRegister").mockImplementation(async (registerId) => {
      if (registerId !== 1) {
        throw new Error("Register not found");
      }
    });

    await expect(deleteRegister.execute(nonExistentRegisterId)).rejects.toThrow("Register not found");
  });
});
