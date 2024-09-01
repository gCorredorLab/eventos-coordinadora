# @project Eventos - Coordinadora
# @file Dockerfile
# @description Dockerfile para construir y ejecutar la aplicación.
# @verified SI
# @status DONE
# @author Guillermo Corredor Soto
# @created 31/8/2024
# @note
#
# Este archivo configura el entorno de Docker para la aplicación. Define la imagen base,
# el directorio de trabajo, los comandos para instalar dependencias, compilar la aplicación
# y ejecutar el servidor.

# @property FROM
# @description Imagen base de Docker. Se usa la versión 20 de Node.js para la ejecución de la aplicación.
# @type {string}
FROM node:20

# @property WORKDIR
# @description Establece el directorio de trabajo dentro del contenedor.
# @type {string}
WORKDIR /usr/src/app

# @property COPY
# @description Copia los archivos package.json y package-lock.json al contenedor para instalar dependencias.
# @type {string[]}
COPY package*.json ./

# @property RUN
# @description Instala las dependencias necesarias usando npm.
# @type {string}
RUN npm install

# @property COPY
# @description Copia todos los archivos del proyecto al contenedor.
# @type {string[]}
COPY . .

# @property RUN
# @description Compila la aplicación TypeScript en el contenedor.
# @type {string}
RUN npm run build

# @property EXPOSE
# @description Expone el puerto 3000 del contenedor para permitir el acceso a la aplicación desde el host.
# @type {number}
EXPOSE 3000

# @property CMD
# @description Comando por defecto para ejecutar la aplicación. Inicia el servidor Node.js desde el archivo compilado.
# @type {string[]}
CMD ["npm", "start", "dist/server.js"]
