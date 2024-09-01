# Eventos - Coordinadora ~ API

Esta es una API RESTful construida con Fastify y TypeScript, siguiendo los principios de Clean Architecture para la gestión de eventos - Caso Práctico Coordinadora.

## Introducción

Este proyecto es un caso práctico para Coordinadora, donde se implementa una API RESTful para la gestión de eventos. 

Características principales:
- Permite a los usuarios crear, promocionar y gestionar eventos de manera efectiva.
- Los usuarios pueden registrarse para asistir a eventos.
- Proporciona detalles sobre los eventos, incluyendo información detallada y lugares cercanos.

Base tecnológica del proyecto:
1. Estructura con Separación por Funcionalidad.
2. Fastify como framework.
3. TypeScript para tipado estático.
4. PostgreSQL como base de datos.
5. Mapbox para funcionalidades geoespaciales.
6. Docker para containerización y despliegue.

## Estructura del Proyecto

La estructura del proyecto sigue una separación por funcionalidad:

```
src/
├── common/
│   ├── utils/
│   ├── errors/
│   └── middleware/
├── uploaddata/
├── user/
│   ├── domain/
│   │   └── entities/
│   ├── application/
│   │   ├── use-cases/
│   │   └── interfaces/
│   ├── infrastructure/
│   │   ├── repositories/
│   │   ├── controllers/
│   │   └── database/
│   ├── test/
│   └── web/
│       └── routes/
└── server.ts
```

Esta estructura facilita la organización del código y la separación de responsabilidades según los principios de Clean Architecture.

## Instalación y Configuración

### Prerrequisitos

- Node.js (v14 o superior)
- Docker y Docker Compose
- PostgreSQL (si se ejecuta fuera de Docker)

### Pasos de Instalación

1. Clonar el repositorio:
   ```
   git clone https://github.com/gCorredorLab/eventos-coordinadora.git
   cd eventos-coordinadora
   ```

2. Instalar dependencias:
   ```
   npm install
   ```

3. Configurar variables de entorno:
   Crea un archivo `.env` en la raíz del proyecto y configura las variables necesarias (ver `.env.example` para referencia).

4. Iniciar la aplicación con Docker:
   ```
   npm run docker:up
   ```

## Scripts Disponibles

El proyecto incluye varios scripts útiles para el desarrollo y despliegue:

- `npm run init-db`: Inicializa la base de datos con las tablas y datos iniciales necesarios.
- `npm run docker:init-db`: Inicializa la base de datos dentro del contenedor Docker.
- `npm run start`: Inicia la aplicación en modo producción.
- `npm run dev`: Inicia la aplicación en modo desarrollo con recarga en caliente.
- `npm run build`: Compila el proyecto TypeScript.
- `npm run docker:up`: Levanta los contenedores Docker en modo detached.
- `npm run docker:down`: Detiene y elimina los contenedores Docker.
- `npm run docker:build`: Construye las imágenes Docker.
- `npm run docker:clean`: Limpia recursos Docker no utilizados.
- `npm run docker:cleanall`: Limpia todos los recursos Docker, incluyendo imágenes no utilizadas.
- `npm run docker:log`: Muestra los logs de la aplicación en tiempo real.
- `npm run docker:deldb`: Elimina el volumen de datos de PostgreSQL.
- `npm run docker:deldball`: Elimina todos los contenedores, redes y volúmenes asociados al proyecto.
- `npm run test`: Ejecuta las pruebas unitarias con Jest.
- `npm run lint`: Ejecuta el linter (ESLint) en los archivos TypeScript.
- `npm run format`: Formatea el código usando Prettier.

## Uso de la API

La API proporciona endpoints para la gestión de usuarios, eventos, lugares y registros. Consulta la documentación de Swagger disponible en `/documentation` cuando la aplicación esté en ejecución para obtener detalles sobre los endpoints y cómo utilizarlos.

## Características Principales

1. Gestión de Usuarios: Registro, autenticación y gestión de perfiles.
2. Gestión de Eventos: Creación, edición, eliminación y listado de eventos.
3. Gestión de Lugares: Administración de lugares para eventos.
4. Registro a Eventos: Permite a los usuarios registrarse para asistir a eventos.
5. Integración con Mapbox: Funcionalidades geoespaciales para localización de eventos.
6. Carga masiva de datos: Permite la carga de datos desde archivos Excel para usuarios, eventos, lugares y registros.

## Pruebas

El proyecto utiliza Jest para las pruebas unitarias. Ejecuta las pruebas con:

```
npm run test
```

## Despliegue

El proyecto está configurado para desplegarse fácilmente usando Docker. Utiliza los scripts Docker proporcionados para construir y desplegar la aplicación en un entorno de producción.

## Licencia

Este proyecto está bajo la Licencia de uso Coordinadora - Guillermo Corredor Soto.

## Contribuciones

> Guillermo Corredor (gcorredorlab@gmail.com)
> Líder Técnico - FullStack Developer

Para contribuir al proyecto, por favor contacta al autor principal.
