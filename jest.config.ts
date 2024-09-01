/**
 * @project Eventos - Coordinadora
 * @file jest.config.ts
 * @description Configuración de Jest para pruebas unitarias en el proyecto.
 * @verified SI
 * @status DONE
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo configura Jest para realizar pruebas unitarias en un entorno de Node.js,
 * utilizando TypeScript. Define las extensiones de módulos, el entorno de pruebas, y
 * la ubicación de los archivos de pruebas.
 */

export default {
  /**
   * @property preset
   * @description Preset para configurar Jest con TypeScript a través de ts-jest
   * @type {string}
   */
  preset: "ts-jest",

  /**
   * @property testEnvironment
   * @description Especifica el entorno de prueba, en este caso Node.js
   * @type {string}
   */
  testEnvironment: "node",

  /**
   * @property moduleFileExtensions
   * @description Extensiones de archivo que Jest puede procesar
   * @type {string[]}
   */
  moduleFileExtensions: ["ts", "js", "json", "node"],

  /**
   * @property roots
   * @description Directorios raíz donde Jest buscará archivos de prueba
   * @type {string[]}
   */
  roots: ["<rootDir>/src"],

  /**
   * @property transform
   * @description Indica cómo transformar los archivos antes de ejecutarlos en Jest
   * @type {Object.<string, string>}
   */
  transform: {
    "^.+\\.ts$": "ts-jest" // Usa ts-jest para transformar archivos .ts
  },

  /**
   * @property collectCoverage
   * @description Habilita la recolección de cobertura de pruebas
   * @type {boolean}
   */
  collectCoverage: true,

  /**
   * @property coverageDirectory
   * @description Directorio donde se almacenará la cobertura de pruebas
   * @type {string}
   */
  coverageDirectory: "coverage",

  /**
   * @property coverageReporters
   * @description Especifica los reportes de cobertura que se generarán
   * @type {string[]}
   */
  coverageReporters: ["text", "lcov", "json", "html"],

  /**
   * @property testMatch
   * @description Patrones que Jest seguirá para encontrar archivos de prueba
   * @type {string[]}
   */
  testMatch: ["**/tests/**/*.test.ts", "**/?(*.)+(spec|test).[tj]s?(x)"]
};
