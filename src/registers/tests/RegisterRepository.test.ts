/**
 * @project Eventos - Coordinadora
 * @file RegisterRepository.test.ts
 * @description Pruebas unitarias para la implementación de RegisterRepository usando MockRegisterRepository
 * @verified SI
 * @status DONE
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo contiene pruebas unitarias para la implementación de la interfaz RegisterRepository
 * usando una implementación mock llamada MockRegisterRepository. Las pruebas verifican la funcionalidad
 * completa del repositorio, incluyendo la creación, obtención, actualización, eliminación y manejo
 * de registros.
 */

/** @import dependencias */
import {Register} from "../domain/entities/Register";
import {RegisterRepository} from "../application/interfaces/RegisterRepository";

/** @class MockRegisterRepository */
class MockRegisterRepository implements RegisterRepository {
  private registers: Register[] = [];

  /**
   * @method createRegister
   * @description Crea un nuevo registro en el repositorio mock
   * @param {Register} register - El registro a crear
   * @returns {Promise<Register>} El registro creado con un ID asignado
   */
  async createRegister(register: Register): Promise<Register> {
    const newRegister = {...register, registerId: this.registers.length + 1};
    this.registers.push(newRegister);
    return newRegister;
  }

  /**
   * @method getAllRegisters
   * @description Obtiene todos los registros del repositorio mock
   * @returns {Promise<Register[]>} Un array con todos los registros
   */
  async getAllRegisters(): Promise<Register[]> {
    return this.registers;
  }

  /**
   * @method getRegisterById
   * @description Obtiene un registro por su ID
   * @param {number} registerId - El ID del registro a buscar
   * @returns {Promise<Register | null>} El registro encontrado o null si no existe
   */
  async getRegisterById(registerId: number): Promise<Register | null> {
    return this.registers.find((r) => r.registerId === registerId) || null;
  }

  /**
   * @method updateRegister
   * @description Actualiza un registro existente en el repositorio mock
   * @param {Register} register - El registro con los datos actualizados
   * @returns {Promise<Register>} El registro actualizado
   */
  async updateRegister(register: Register): Promise<Register> {
    const index = this.registers.findIndex((r) => r.registerId === register.registerId);
    if (index !== -1) {
      this.registers[index] = register;
      return register;
    }
    throw new Error("Register not found");
  }

  /**
   * @method deleteRegister
   * @description Elimina un registro del repositorio mock
   * @param {number} registerId - El ID del registro a eliminar
   * @returns {Promise<void>}
   */
  async deleteRegister(registerId: number): Promise<void> {
    const index = this.registers.findIndex((r) => r.registerId === registerId);
    if (index !== -1) {
      this.registers.splice(index, 1);
    }
  }
}

describe("RegisterRepository", () => {
  let repository: RegisterRepository;

  /** @beforeEach Prepara el entorno antes de cada prueba */
  beforeEach(() => {
    repository = new MockRegisterRepository();
  });

  /** @test Crea un registro */
  it("should create a register", async () => {
    const register = new Register(null, 1, 1, new Date("2024-12-01T20:00:00Z"), true);
    const createdRegister = await repository.createRegister(register);
    expect(createdRegister.registerId).toBeDefined();
    expect(createdRegister.registerUserId).toBe(1);
    expect(createdRegister.registerEventId).toBe(1);
  });

  /** @test Obtiene un registro por su ID */
  it("should get a register by id", async () => {
    const register = new Register(null, 1, 1, new Date("2024-12-10T09:00:00Z"), true);
    const createdRegister = await repository.createRegister(register);
    const fetchedRegister = await repository.getRegisterById(createdRegister.registerId!);
    expect(fetchedRegister).toEqual(createdRegister);
  });

  /** @test Retorna null para un ID de registro inexistente */
  it("should return null for non-existent register id", async () => {
    const fetchedRegister = await repository.getRegisterById(999);
    expect(fetchedRegister).toBeNull();
  });

  /** @test Actualiza un registro */
  it("should update a register", async () => {
    const register = new Register(null, 1, 1, new Date("2024-11-15T15:00:00Z"), true);
    const createdRegister = await repository.createRegister(register);
    const updatedRegister = new Register(createdRegister.registerId, 1, 1, new Date("2024-11-15T15:00:00Z"), false);
    const result = await repository.updateRegister(updatedRegister);
    expect(result.registerConfirmation).toBe(false);
  });

  /** @test Lanza un error al intentar actualizar un registro inexistente */
  it("should throw an error when updating non-existent register", async () => {
    const nonExistentRegister = new Register(999, 1, 1, new Date(), true);
    await expect(repository.updateRegister(nonExistentRegister)).rejects.toThrow("Register not found");
  });

  /** @test Elimina un registro */
  it("should delete a register", async () => {
    const register = new Register(null, 1, 1, new Date("2024-12-31T22:00:00Z"), true);
    const createdRegister = await repository.createRegister(register);
    await repository.deleteRegister(createdRegister.registerId!);
    const fetchedRegister = await repository.getRegisterById(createdRegister.registerId!);
    expect(fetchedRegister).toBeNull();
  });

  /** @test Obtiene todos los registros */
  it("should get all registers", async () => {
    await repository.createRegister(new Register(null, 1, 1, new Date(), true));
    await repository.createRegister(new Register(null, 2, 2, new Date(), false));
    const allRegisters = await repository.getAllRegisters();
    expect(allRegisters.length).toBe(2);
    expect(allRegisters[0].registerUserId).toBe(1);
    expect(allRegisters[1].registerUserId).toBe(2);
  });
});
