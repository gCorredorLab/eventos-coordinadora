/**
 * @project Eventos - Coordinadora
 * @file .eslintrc.js
 * @description Configuración de ESLint para el proyecto.
 * @verified SI
 * @status DONE
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo configura ESLint para el proyecto, estableciendo el parser de TypeScript,
 * las reglas recomendadas, y la integración con Prettier para el formateo de código.
 */

module.exports = {
  /**
   * @property parser
   * @description Especifica el parser de ESLint para TypeScript.
   * @type {string}
   */
  parser: '@typescript-eslint/parser',

  /**
   * @property parserOptions
   * @description Opciones de configuración para el parser.
   * @type {Object}
   */
  parserOptions: {
    /**
     * @property ecmaVersion
     * @description Versión de ECMAScript que se utilizará.
     * @type {number}
     */
    ecmaVersion: 2020,

    /**
     * @property sourceType
     * @description Tipo de módulo que se utilizará, en este caso 'module' para ES6.
     * @type {string}
     */
    sourceType: 'module',
  },

  /**
   * @property extends
   * @description Configuraciones de ESLint que se extienden para este proyecto.
   * @type {string[]}
   */
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],

  /**
   * @property rules
   * @description Reglas específicas para el proyecto.
   * @type {Object.<string, string>}
   */
  rules: {
    /**
     * @rule @typescript-eslint/no-unused-vars
     * @description Configura ESLint para advertir sobre variables no utilizadas.
     * @type {string}
     */
    '@typescript-eslint/no-unused-vars': 'warn',

    /**
     * @rule @typescript-eslint/no-explicit-any
     * @description Desactiva la regla que prohíbe el uso de 'any' en TypeScript.
     * @type {string}
     */
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
