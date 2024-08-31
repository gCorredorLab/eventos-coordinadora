/**
 * @project Eventos - Coordinadora
 * @file UserController.ts
 * @description Controlador para manejar las solicitudes relacionadas con la entidad User.
 * @verified SI
 * @status DONE
 * @unitTests NO
 * @unitTestsStatus DEVELOP
 * @author Guillermo Corredor Soto
 * @created 31/8/2024
 * @note
 *
 * Este controlador maneja las solicitudes HTTP relacionadas con los usuarios,
 * incluyendo la creación, obtención, actualización y eliminación de usuarios.
 */

/** @import dependencias */
import {FastifyRequest, FastifyReply} from "fastify";
import {User} from "../../domain/entities/User";
import {CreateUser} from "../../application/use-cases/CreateUser";
import {GetAllUsers} from "../../application/use-cases/GetAllUsers";
import {GetUser} from "../../application/use-cases/GetUser";
import {GetUserEmail} from "../../application/use-cases/GetUserEmail";
import {UpdateUser} from "../../application/use-cases/UpdateUser";
import {DeleteUser} from "../../application/use-cases/DeleteUser";

/** Definición de tipos para los parámetros de las rutas */
interface UserParams {
  userId: string; // O "number" si manejas los IDs como números
  userEmail: string;
}

/** @class UserController */
export class UserController {
  constructor(
    private createUser: CreateUser,
    private getAllUsers: GetAllUsers,
    private getUser: GetUser,
    private getUserEmail: GetUserEmail,
    private updateUser: UpdateUser,
    private deleteUser: DeleteUser
  ) {}

  /**
   * @method createUserHandler
   * @description Maneja la creación de un nuevo usuario
   * @param {FastifyRequest} req - La solicitud HTTP
   * @param {FastifyReply} reply - La respuesta HTTP
   * @returns {Promise<void>}
   */
  async createUserHandler(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const userData = req.body as Omit<User, "userId">;
      const user = await this.createUser.execute(userData);
      reply.code(201).send(user);
    } catch (error) {
      reply.code(500).send({error: "Error al crear el usuario"});
    }
  }

  /**
   * @method getAllUsersHandler
   * @description Maneja la obtención de todos los usuarios
   * @param {FastifyRequest} req - La solicitud HTTP
   * @param {FastifyReply} reply - La respuesta HTTP
   * @returns {Promise<void>}
   */
  async getAllUsersHandler(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const users = await this.getAllUsers.execute();
      reply.send(users);
    } catch (error) {
      reply.code(500).send({error: "Error al obtener los usuarios"});
    }
  }

  /**
   * @method getUserHandler
   * @description Maneja la obtención de un usuario por ID
   * @param {FastifyRequest<UserParams>} req - La solicitud HTTP con los parámetros tipados
   * @param {FastifyReply} reply - La respuesta HTTP
   * @returns {Promise<void>}
   */
  async getUserHandler(req: FastifyRequest<{Params: UserParams}>, reply: FastifyReply): Promise<void> {
    try {
      const userId = Number(req.params.userId);
      const user = await this.getUser.execute(userId);
      if (user) {
        reply.send(user);
      } else {
        reply.code(404).send({error: "Usuario no encontrado"});
      }
    } catch (error) {
      reply.code(500).send({error: "Error al obtener el usuario"});
    }
  }

  /**
   * @method getUserEmailHandler
   * @description Maneja la obtención de un usuario por email
   * @param {FastifyRequest<UserParams>} req - La solicitud HTTP con los parámetros tipados
   * @param {FastifyReply} reply - La respuesta HTTP
   * @returns {Promise<void>}
   */
  async getUserEmailHandler(req: FastifyRequest<{Params: UserParams}>, reply: FastifyReply): Promise<void> {
    try {
      const userEmail = String(req.params.userEmail);
      const user = await this.getUserEmail.execute(userEmail);
      if (user) {
        reply.send(user);
      } else {
        reply.code(404).send({error: "Usuario no encontrado"});
      }
    } catch (error) {
      reply.code(500).send({error: "Error al obtener el usuario"});
    }
  }

  /**
   * @method updateUserHandler
   * @description Maneja la actualización de un usuario existente
   * @param {FastifyRequest<UserParams>} req - La solicitud HTTP con los parámetros tipados
   * @param {FastifyReply} reply - La respuesta HTTP
   * @returns {Promise<void>}
   */
  async updateUserHandler(req: FastifyRequest<{Params: UserParams}>, reply: FastifyReply): Promise<void> {
    try {
      const userId = Number(req.params.userId);
      const userData = req.body as Omit<User, "userId">;
      const updatedUser = await this.updateUser.execute(userId, userData);
      reply.send(updatedUser);
    } catch (error) {
      reply.code(500).send({error: "Error al actualizar el usuario"});
    }
  }

  /**
   * @method deleteUserHandler
   * @description Maneja la eliminación de un usuario por ID
   * @param {FastifyRequest<UserParams>} req - La solicitud HTTP con los parámetros tipados
   * @param {FastifyReply} reply - La respuesta HTTP
   * @returns {Promise<void>}
   */
  async deleteUserHandler(req: FastifyRequest<{Params: UserParams}>, reply: FastifyReply): Promise<void> {
    try {
      const userId = Number(req.params.userId);
      await this.deleteUser.execute(userId);
      reply.code(204).send();
    } catch (error) {
      reply.code(500).send({error: "Error al eliminar el usuario"});
    }
  }
}
