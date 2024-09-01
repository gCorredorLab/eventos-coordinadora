/**
 * @project Eventos - Coordinadora
 * @file emailConfig.ts
 * @description Configuración y manejo del envío de correos electrónicos utilizando Nodemailer con Gmail
 * @verified SI
 * @status DONE
 * @unitTests NO
 * @unitTestsStatus DEVELOP
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo configura y exporta un transportador de correos electrónicos usando Nodemailer,
 * para el envío de correos electrónicos a través de Gmail. La configuración utiliza las credenciales
 * almacenadas en las variables de entorno.
 */

/** @import librerias */
import dotenv from "dotenv";
import * as nodemailer from "nodemailer";

/** @load variables de entorno */
dotenv.config();

/**
 * Crea una nueva instancia de Nodemailer Transporter para enviar correos electrónicos
 * @returns Una instancia de Nodemailer Transporter configurada con Gmail
 */
export const createEmailTransporter = (): nodemailer.Transporter => {
  return nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.APP_EMAIL_USER,
      pass: process.env.APP_EMAIL_PSW,
    },
  });
};

/** @note exporta el tipo Transporter para su uso en otros archivos si es necesario */
export { nodemailer };
