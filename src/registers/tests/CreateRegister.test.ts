/**
 * @project Eventos - Coordinadora
 * @file CreateRegister.test.ts
 * @description Pruebas unitarias para el caso de uso CreateRegister
 * @verified SI
 * @status DONE
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo contiene las pruebas unitarias para el caso de uso CreateRegister.
 * Se prueban diferentes escenarios de creación de registros y el manejo de errores.
 */

/** @import dependencias */
import {CreateRegister} from "../application/use-cases/CreateRegister";
import {Register} from "../domain/entities/Register";
import {RegisterRepository} from "../application/interfaces/RegisterRepository";

/** Implementación mock del RegisterRepository */
class MockRegisterRepository implements RegisterRepository {
  private registers: Register[] = [];

  async createRegister(register: Register): Promise<Register> {
    const newRegister = {...register, registerId: this.registers.length + 1};
    this.registers.push(newRegister);
    return newRegister;
  }

  async getAllRegisters(): Promise<Register[]> {
    return this.registers;
  }

  async getRegisterById(registerId: number): Promise<Register | null> {
    return this.registers.find((register) => register.registerId === registerId) || null;
  }

  async updateRegister(register: Register): Promise<Register> {
    const index = this.registers.findIndex((r) => r.registerId === register.registerId);
    if (index !== -1) {
      this.registers[index] = register;
      return register;
    }
    throw new Error("Register not found");
  }

  async deleteRegister(registerId: number): Promise<void> {
    const index = this.registers.findIndex((r) => r.registerId === registerId);
    if (index !== -1) {
      this.registers.splice(index, 1);
    }
  }
}

describe("CreateRegister", () => {
  let createRegister: CreateRegister;
  let mockRegisterRepository: RegisterRepository;

  beforeEach(() => {
    mockRegisterRepository = new MockRegisterRepository();
    createRegister = new CreateRegister(mockRegisterRepository);
  });

  /**
   * @test Creación exitosa de un nuevo registro
   * @description Verifica que se pueda crear un nuevo registro con todos los campos requeridos
   */
  it("should create a new register successfully", async () => {
    const registerData = {
      registerUserId: 1,
      registerEventId: 2,
      registerDate: new Date("2024-12-01T10:00:00Z"),
      registerConfirmation: true
    };

    const createdRegister = await createRegister.execute(registerData);

    expect(createdRegister).toBeDefined();
    expect(createdRegister.registerId).toBeDefined();
    expect(createdRegister.registerUserId).toBe(registerData.registerUserId);
    expect(createdRegister.registerEventId).toBe(registerData.registerEventId);
    expect(createdRegister.registerDate).toBe(registerData.registerDate);
    expect(createdRegister.registerConfirmation).toBe(registerData.registerConfirmation);
  });

  /**
   * @test Llamada correcta al método createRegister del repositorio
   * @description Verifica que el método createRegister del repositorio sea llamado con los datos correctos
   */
  it("should call RegisterRepository.createRegister with correct data", async () => {
    const registerData = {
      registerUserId: 3,
      registerEventId: 4,
      registerDate: new Date("2024-12-10T15:00:00Z"),
      registerConfirmation: false
    };

    const spy = jest.spyOn(mockRegisterRepository, "createRegister");

    await createRegister.execute(registerData);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        registerId: null,
        ...registerData
      })
    );
  });

  /**
   * @test Manejo de errores en la creación de registros
   * @description Verifica que se manejen correctamente los errores cuando falla la creación de un registro
   */
  it("should throw an error if RegisterRepository.createRegister fails", async () => {
    const registerData = {
      registerUserId: 5,
      registerEventId: 6,
      registerDate: new Date("2024-11-20T18:00:00Z"),
      registerConfirmation: true
    };

    jest.spyOn(mockRegisterRepository, "createRegister").mockRejectedValue(new Error("Database error"));

    await expect(createRegister.execute(registerData)).rejects.toThrow("Database error");
  });
});
