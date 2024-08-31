/**
 * @project Eventos - Coordinadora
 * @file authRoutes.ts
 * @description Definición de las rutas relacionadas con la autenticación de usuarios.
 * @verified SI
 * @status DONE
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este archivo define las rutas relacionadas con la autenticación de usuarios,
 * incluyendo el inicio de sesión y la generación de tokens JWT.
 */

/** @import dependencias */
import {FastifyInstance, FastifyRequest, FastifyReply} from "fastify";
import {UserRepository} from "../../application/interfaces/UserRepository";
import bcrypt from "bcryptjs";

/** Definición de la estructura del cuerpo de la solicitud de inicio de sesión */
interface LoginBody {
  userEmail: string;
  password: string;
}

/**
 * Manejador para el inicio de sesión
 * @param request Solicitud Fastify
 * @param reply Respuesta Fastify
 * @param userRepository Repositorio de usuarios
 * @param server Instancia del servidor Fastify (para acceder a jwt)
 */
async function loginHandler(
  request: FastifyRequest<{Body: LoginBody}>,
  reply: FastifyReply,
  userRepository: UserRepository,
  server: FastifyInstance
) {
  const {userEmail, password} = request.body;
  try {
    /** Buscar el usuario por email */
    const user = await userRepository.getUserByEmail(userEmail);
    console.log("user-Login: ", user);

    if (!user) {
      reply.code(401).send({error: "No hay usuario registrado con esta información"});
      return;
    }

    /** Verificar la contraseña */
    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log("user-Login-password: ", isValidPassword);

    if (!isValidPassword) {
      reply.code(401).send({error: "Credenciales inválidas"});
      return;
    }

    /** Generar token JWT */
    const token = server.jwt.sign({
      userId: user.userId,
      userEmail: user.userEmail
    });

    reply.code(200).send({token});
  } catch (error) {
    console.error("Error en el proceso de inicio de sesión:", error);
    reply.code(500).send({error: "Error interno del servidor"});
  }
}

/**
 * Función para definir y registrar las rutas de autenticación
 * @param server Instancia del servidor Fastify
 * @param userRepository Repositorio de usuarios para realizar operaciones relacionadas con usuarios
 */
export async function authRoutes(server: FastifyInstance, userRepository: UserRepository) {
  server.post<{Body: LoginBody}>(
    "/login",
    {
      schema: {
        description: "Iniciar sesión para obtener un token JWT",
        tags: ["Authentication"],
        body: {
          type: "object",
          required: ["userEmail", "password"],
          properties: {
            userEmail: {type: "string", format: "email"},
            password: {type: "string"}
          }
        },
        response: {
          200: {
            description: "Inicio de sesión exitoso",
            type: "object",
            properties: {
              token: {type: "string"}
            }
          },
          401: {
            description: "Credenciales inválidas",
            type: "object",
            properties: {
              error: {type: "string"}
            }
          },
          500: {
            description: "Error interno del servidor",
            type: "object",
            properties: {
              error: {type: "string"}
            }
          }
        }
      }
    },
    (request, reply) => loginHandler(request, reply, userRepository, server)
  );
}
