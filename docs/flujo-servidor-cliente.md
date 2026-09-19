# Flujo cliente-servidor de KineAgenda

## Objetivo

Este esquema representa de forma simple cómo se comunica un cliente con el servidor de KineAgenda durante esta primera etapa del proyecto.

Cuando una persona accede desde el navegador, se genera una petición HTTP hacia el servidor desarrollado con Node.js y Express. Express recibe la solicitud, ejecuta los middlewares correspondientes y determina qué ruta debe procesarla.

## Diagrama

```text
┌──────────────────────┐
│      NAVEGADOR       │
│       Cliente        │
└──────────┬───────────┘
           │
           │ Petición HTTP
           │ GET /
           │ GET /status
           ▼
┌──────────────────────┐
│   SERVIDOR NODE.JS   │
│       Express        │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│      MIDDLEWARE      │
│    accessLogger      │
│                      │
│ Registra el acceso   │
│ en logs/log.txt      │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│        ROUTER        │
│    mainRoutes.js     │
└──────────┬───────────┘
           │
      ┌────┴───────────────┐
      │                    │
      ▼                    ▼
┌──────────────┐    ┌──────────────┐
│      /       │    │   /status    │
│              │    │              │
│     HTML     │    │     JSON     │
└──────┬───────┘    └──────┬───────┘
       │                    │
       ▼                    ▼
┌──────────────┐    ┌──────────────┐
│    HOME      │    │    STATUS    │
│ CONTROLLER   │    │ CONTROLLER   │
└──────┬───────┘    └──────┬───────┘
       │                    │
       ▼                    │
┌──────────────┐            │
│ index.html   │            │
│ styles.css   │            │
└──────┬───────┘            │
       │                    │
       └──────────┬─────────┘
                  │
                  ▼
        ┌──────────────────┐
        │ RESPUESTA HTTP   │
        │   AL CLIENTE     │
        └──────────────────┘
```

## ¿Qué función cumple Node.js?

Node.js permite ejecutar JavaScript fuera del navegador. En KineAgenda lo utilizo como entorno de ejecución del backend y como base para levantar el servidor que recibe las solicitudes realizadas por los clientes.

También permite trabajar con módulos propios del entorno. En esta etapa utilizo el módulo `fs` para registrar los accesos al servidor dentro del archivo `logs/log.txt`.

Otra parte importante del ecosistema de Node.js es npm, que permite administrar las dependencias utilizadas por el proyecto, como Express, dotenv y nodemon.

## ¿Qué aporta Express?

Node.js permite crear un servidor utilizando sus herramientas nativas, pero Express simplifica bastante este trabajo.

En KineAgenda utilizo Express para:

- definir las rutas de la aplicación;
- conectar middlewares;
- organizar el flujo de las solicitudes;
- enviar respuestas HTML;
- enviar respuestas JSON;
- publicar archivos estáticos desde la carpeta `public`.

Esto permite mantener el servidor organizado y separar las distintas responsabilidades del backend.

## Flujo aplicado en KineAgenda

El recorrido básico de una solicitud es el siguiente:

1. El cliente realiza una petición HTTP al servidor.
2. Express recibe la solicitud.
3. El middleware `accessLogger` registra el acceso en `logs/log.txt`.
4. `mainRoutes.js` determina qué ruta corresponde procesar.
5. La ruta deriva la solicitud al controlador correspondiente.
6. El controlador prepara la respuesta.
7. Express devuelve al cliente contenido HTML, JSON o un recurso estático.

Por ejemplo, cuando el cliente solicita la ruta `/`, la petición llega al servidor, pasa por el middleware de registro, continúa hacia `mainRoutes.js` y finalmente es procesada por `homeController.js`.

El controlador envía el archivo `public/index.html`, y desde esa página el navegador también solicita recursos estáticos como `public/css/styles.css`.

En cambio, cuando se solicita `/status`, `statusController.js` responde directamente con información en formato JSON.

## Registro de accesos

Durante el recorrido de las solicitudes también se genera un registro utilizando el middleware `accessLogger`.

Cada acceso se agrega a:

```text
logs/log.txt
```

El registro guarda información como:

```text
2026-09-19T07:25:22.008Z | GET | /
2026-09-19T07:25:25.743Z | GET | /status
```

Para realizar esta operación utilizo `fs.appendFile()`, lo que permite agregar nuevas líneas sin reemplazar los registros anteriores.

## Organización del servidor

En esta etapa decidí separar el proyecto en distintas carpetas según su responsabilidad:

```text
routes/
controllers/
middlewares/
public/
logs/
docs/
```

La intención es evitar que toda la lógica quede dentro de `app.js`.

`app.js` funciona como punto de entrada de la aplicación y se encarga principalmente de configurar Express, conectar los middlewares, habilitar los archivos estáticos, incorporar las rutas e iniciar el servidor.

Las rutas se encuentran separadas de los controladores, mientras que el registro de accesos se mantiene como un middleware independiente.

## Preparación para las siguientes etapas

Esta estructura corresponde a la base inicial de KineAgenda.

En el Módulo 6 el objetivo principal es contar con un servidor organizado y funcional. Por esta razón, todavía no se incorporan funcionalidades como gestión real de pacientes, sesiones, pagos o autenticación.

La estructura actual permite que posteriormente se puedan incorporar nuevas capas sin tener que reorganizar completamente el proyecto.

En el Módulo 7 se podrá agregar la persistencia mediante base de datos y ORM, junto con las operaciones CRUD y las relaciones entre entidades.

Posteriormente, en el Módulo 8, el proyecto podrá evolucionar hacia una API REST con autenticación, JWT y manejo de archivos.

## Reflexión

Al desarrollar esta primera estructura pude comprobar que un backend no consiste solamente en iniciar un servidor.

Separar las rutas, los controladores y los middlewares permite entender mejor el recorrido de una solicitud y facilita encontrar dónde se encuentra cada responsabilidad.

El archivo `log.txt` también me permitió observar algo que inicialmente no era tan evidente: cuando se carga una página desde el navegador pueden generarse varias solicitudes, ya que además del HTML se solicitan recursos como las hojas de estilo.

Mi intención es mantener esta organización a medida que KineAgenda vaya incorporando las funcionalidades de los siguientes módulos.

---

**KineAgenda Backend**  
**Kinesiólogo Franco Vásquez:)**