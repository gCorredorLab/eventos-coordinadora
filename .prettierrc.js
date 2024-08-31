/**
 * @project Eventos - Coordinadora
 * @file .prettierrc.js
 * @description Configuración de Prettier para el formateo de código en el proyecto.
 * @verified SI
 * @status DONE
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo configura las reglas de formateo de código utilizadas por Prettier para mantener
 * un estilo de código consistente en el proyecto. Incluye configuraciones como el ancho de
 * las líneas, el uso de comillas, y cómo manejar paréntesis y comas.
 */

module.exports = {
  /**
   * @property printWidth
   * @description Ancho máximo de las líneas de código antes de aplicar un salto de línea automático.
   * @type {number}
   */
  printWidth: 150,

  /**
   * @property tabWidth
   * @description Número de espacios utilizados para la indentación de código.
   * @type {number}
   */
  tabWidth: 2,

  /**
   * @property semi
   * @description Añade un punto y coma al final de cada sentencia.
   * @type {boolean}
   */
  semi: true,

  /**
   * @property singleQuote
   * @description Utiliza comillas simples en lugar de comillas dobles para cadenas de texto.
   * @type {boolean}
   */
  singleQuote: false,

  /**
   * @property quoteProps
   * @description Define cuándo deben utilizarse comillas alrededor de las propiedades de objetos.
   * @type {string}
   */
  quoteProps: "as-needed",

  /**
   * @property trailingComma
   * @description Define si las comas deben añadirse al final de listas y objetos, incluyendo después del último elemento.
   * @type {string}
   */
  trailingComma: "none",

  /**
   * @property bracketSameLine
   * @description Coloca el símbolo `>` del JSX en la misma línea que el último atributo en lugar de en una nueva línea.
   * @type {boolean}
   */
  bracketSameLine: true,

  /**
   * @property bracketSpacing
   * @description Añade o remueve espacios entre corchetes en objetos.
   * @type {boolean}
   */
  bracketSpacing: false,

  /**
   * @property arrowParens
   * @description Especifica si las funciones de flecha deben incluir paréntesis alrededor de los parámetros.
   * @type {string}
   */
  arrowParens: "always"
};
