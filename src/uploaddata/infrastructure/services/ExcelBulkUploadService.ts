/**
 * @project Eventos - Coordinadora
 * @file ExcelUploadDataService.ts
 * @description Servicio para procesar y cargar datos masivamente desde archivos Excel
 * @verified NO
 * @status DEVELOP
 * @unitTests NO
 * @unitTestsStatus PENDING
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este servicio implementa la lógica para procesar archivos Excel y cargar datos masivamente en la base de datos.
 */

/** @import librerias */
import {Readable} from "stream";
import xlsx from "xlsx";

/** @import dependencias */
import {IUploadDataService} from "../../application/interfaces/IUploadDataService";
import {UploadDataResult} from "../../domain/entities/UploadDataResult";
import {DataUserRepository} from "../../../users/infrastructure/repositories/DataUserRepository";
import {DataPlaceRepository} from "../../../places/infrastructure/repositories/DataPlaceRepository";
import {DataEventRepository} from "../../../events/infrastructure/repositories/DataEventRepository";
import {DataRegisterRepository} from "../../../registers/infrastructure/repositories/DataRegisterRepository";
import {CreateUserDTO} from "../../../users/domain/entities/User";
import {CreatePlaceDTO} from "../../../places/domain/entities/Place";
import {CreateEventDTO} from "../../../events/domain/entities/Event";
import {CreateRegisterDTO} from "../../../registers/domain/entities/Register";

/** @class ExcelUploadDataService */
export class ExcelUploadDataService implements IUploadDataService {
  constructor(
    private userRepository: DataUserRepository,
    private placeRepository: DataPlaceRepository,
    private eventRepository: DataEventRepository,
    private registerRepository: DataRegisterRepository
  ) {}

  /**
   * @method processExcelFile
   * @description Procesa un archivo Excel y lo convierte en un array de objetos
   * @param {Readable} file - El stream del archivo Excel a procesar
   * @returns {Promise<any[]>} Un array de objetos representando las filas del Excel
   */
  async processExcelFile(file: Readable): Promise<any[]> {
    const buffer = await this.streamToBuffer(file);
    const workbook = xlsx.read(buffer, {type: "buffer"});
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return xlsx.utils.sheet_to_json(sheet);
  }

  /**
   * @method uploadUsers
   * @description Carga masivamente usuarios en la base de datos
   * @param {any[]} data - Los datos de usuarios a cargar
   * @returns {Promise<UploadDataResult>} El resultado de la operación de carga masiva
   */
  async uploadUsers(data: any[]): Promise<UploadDataResult> {
    const result: UploadDataResult = {successCount: 0, failureCount: 0, errors: []};
    for (const userData of data) {
      try {
        const user: CreateUserDTO = {
          userName: userData.userName,
          userLastname: userData.userLastname,
          userEmail: userData.userEmail,
          password: userData.password,
          userLatitude: parseFloat(userData.userLatitude),
          userLongitude: parseFloat(userData.userLongitude)
        };
        await this.userRepository.createUser(user);
        result.successCount++;
      } catch (error: any) {
        result.failureCount++;
        result.errors.push(`Error al crear usuario ${userData.userEmail}: ${error.message}`);
      }
    }
    return result;
  }

  /**
   * @method uploadPlaces
   * @description Carga masivamente lugares en la base de datos
   * @param {any[]} data - Los datos de lugares a cargar
   * @returns {Promise<UploadDataResult>} El resultado de la operación de carga masiva
   */
  async uploadPlaces(data: any[]): Promise<UploadDataResult> {
    const result: UploadDataResult = {successCount: 0, failureCount: 0, errors: []};
    for (const placeData of data) {
      try {
        const place: CreatePlaceDTO = {
          placeUserCreateId: parseInt(placeData.placeUserCreateId),
          placeName: placeData.placeName,
          placeDescription: placeData.placeDescription,
          placeEmail: placeData.placeEmail,
          placePhone: placeData.placePhone,
          placeAddress: placeData.placeAddress,
          placeLatitude: parseFloat(placeData.placeLatitude),
          placeLongitude: parseFloat(placeData.placeLongitude)
        };
        await this.placeRepository.createPlace(place);
        result.successCount++;
      } catch (error: any) {
        result.failureCount++;
        result.errors.push(`Error al crear lugar ${placeData.placeName}: ${error.message}`);
      }
    }
    return result;
  }

  /**
   * @method uploadEvents
   * @description Carga masivamente eventos en la base de datos
   * @param {any[]} data - Los datos de eventos a cargar
   * @returns {Promise<UploadDataResult>} El resultado de la operación de carga masiva
   */
  async uploadEvents(data: any[]): Promise<UploadDataResult> {
    const result: UploadDataResult = {successCount: 0, failureCount: 0, errors: []};
    for (const eventData of data) {
      try {
        const event: CreateEventDTO = {
          eventUserCreateId: parseInt(eventData.eventUserCreateId),
          eventPlaceId: parseInt(eventData.eventPlaceId),
          eventName: eventData.eventName,
          eventDescription: eventData.eventDescription,
          eventDate: new Date(eventData.eventDate)
        };
        await this.eventRepository.createEvent(event);
        result.successCount++;
      } catch (error: any) {
        result.failureCount++;
        result.errors.push(`Error al crear evento ${eventData.eventName}: ${error.message}`);
      }
    }
    return result;
  }

  /**
   * @method uploadRegisters
   * @description Carga masivamente registros en la base de datos
   * @param {any[]} data - Los datos de registros a cargar
   * @returns {Promise<UploadDataResult>} El resultado de la operación de carga masiva
   */
  async uploadRegisters(data: any[]): Promise<UploadDataResult> {
    const result: UploadDataResult = {successCount: 0, failureCount: 0, errors: []};
    for (const registersData of data) {
      try {
        const register: CreateRegisterDTO = {
          registerUserId: parseInt(registersData.registerUserId),
          registerEventId: parseInt(registersData.registerEventId),
          registerDate: new Date(registersData.registerDate),
          registerConfirmation: registersData.registerConfirmation
        };
        await this.registerRepository.createRegister(register);
        result.successCount++;
      } catch (error: any) {
        result.failureCount++;
        result.errors.push(`Error al crear evento ${registersData.registerUserId}: ${error.message}`);
      }
    }
    return result;
  }

  /**
   * @method uploadPlacesAndEvents
   * @description Carga masivamente lugares y eventos en la base de datos
   * @param {any[]} data - Los datos combinados de lugares y eventos a cargar
   * @returns {Promise<UploadDataResult>} El resultado de la operación de carga masiva
   */
  async uploadPlacesAndEvents(data: any[]): Promise<UploadDataResult> {
    const placeResult = await this.uploadPlaces(data.filter((item) => item.type === "place"));
    const eventResult = await this.uploadEvents(data.filter((item) => item.type === "event"));

    return {
      successCount: placeResult.successCount + eventResult.successCount,
      failureCount: placeResult.failureCount + eventResult.failureCount,
      errors: [...placeResult.errors, ...eventResult.errors]
    };
  }

  /**
   * @method streamToBuffer
   * @description Convierte un stream en un buffer
   * @param {Readable} stream - El stream a convertir
   * @returns {Promise<Buffer>} El buffer resultante
   * @private
   */
  private async streamToBuffer(stream: Readable): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: any[] = [];
      stream.on("data", (chunk) => chunks.push(chunk));
      stream.on("end", () => resolve(Buffer.concat(chunks)));
      stream.on("error", reject);
    });
  }
}
