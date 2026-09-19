# KineAgenda Backend

Backend inicial para un sistema de gestión de agenda kinésica, pacientes, sesiones y control financiero.

Este proyecto nace a partir de una necesidad que encuentro cercana a mi trabajo como kinesiólogo: mantener ordenada la información relacionada con la atención de pacientes y, al mismo tiempo, contar con una base que posteriormente permita controlar sesiones, pagos y movimientos asociados a la consulta.

Esta primera versión corresponde al Módulo 6 del proyecto integrador de Desarrollo de Aplicaciones Full Stack JavaScript Trainee.

## Autor

**Kinesiólogo Franco Vásquez**

## Objetivo del proyecto

El objetivo de KineAgenda es construir progresivamente una aplicación que permita centralizar información que normalmente puede terminar distribuida entre agendas, anotaciones y registros separados.

La idea es que el proyecto pueda evolucionar para administrar:

- agenda semanal;
- pacientes;
- horas reservadas;
- sesiones realizadas;
- cantidad de sesiones contratadas;
- pagos y abonos;
- saldos pendientes;
- ingresos y egresos asociados a la consulta.

En el Módulo 6 todavía no se implementan todas estas funciones. En esta etapa se construye la base del servidor y la organización inicial del backend.

## Tecnologías utilizadas

- Node.js
- Express
- dotenv
- nodemon
- HTML5
- CSS3
- módulo `fs` de Node.js
- Git y GitHub

## Node.js dentro de KineAgenda

Node.js permite ejecutar JavaScript fuera del navegador y utilizarlo para desarrollar el backend de una aplicación.

En KineAgenda es el entorno encargado de ejecutar el servidor. También permite utilizar funcionalidades propias de Node, como el módulo `fs`, que actualmente se ocupa para guardar un registro de los accesos realizados al servidor.

El ecosistema de Node también permite administrar dependencias mediante npm y utilizar paquetes externos que facilitan el desarrollo.

## ¿Por qué utilizar Express?

Node.js permite crear un servidor HTTP directamente, pero Express entrega una estructura más simple para trabajar con rutas, middlewares, respuestas y archivos estáticos.

En este proyecto Express se utiliza principalmente para:

- iniciar la aplicación web;
- organizar las rutas;
- conectar middlewares;
- responder con HTML y JSON;
- publicar archivos estáticos;
- separar responsabilidades entre rutas y controladores.

Esto permite que el proyecto pueda crecer sin dejar toda la lógica concentrada en un único archivo.

## Archivo principal

Elegí `app.js` como archivo principal porque representa de manera clara el punto donde se configura e inicia la aplicación Express.

Desde este archivo se cargan las variables de entorno, se conectan los middlewares, se habilitan los archivos estáticos, se incorporan las rutas y finalmente se inicia el servidor.

La configuración también se encuentra declarada en `package.json`:

```json
"main": "app.js"
```

## Estructura del proyecto

```text
kineagenda-backend/
│
├── controllers/
│   ├── homeController.js
│   └── statusController.js
│
├── docs/
│   ├── 0_servidor_npm_run_dev.png
│   └── flujo-servidor-cliente.md
│
├── logs/
│   └── log.txt
│
├── middlewares/
│   └── accessLogger.js
│
├── public/
│   ├── css/
│   │   └── styles.css
│   └── index.html
│
├── routes/
│   └── mainRoutes.js
│
├── .env.example
├── .gitignore
├── app.js
├── package.json
├── package-lock.json
└── README.md
```

La estructura se separó por responsabilidades desde el comienzo para evitar concentrar todo el código en `app.js`.

`routes` contiene la definición de las rutas, `controllers` contiene la lógica que responde a esas rutas, `middlewares` incorpora funciones que se ejecutan durante el flujo de las solicitudes, `public` almacena los recursos visibles desde el navegador y `logs` contiene el registro de accesos.

Esta organización también deja una base más clara para incorporar nuevas capas en las siguientes etapas del proyecto.

## Requisitos

Para ejecutar el proyecto se necesita:

- Node.js 18 o superior;
- npm;
- una terminal;
- un navegador web.

Durante el desarrollo de esta versión se utilizó Node.js 24.

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/kinesiologofrancovasquez-source/kineagenda-backend.git
```

Entrar a la carpeta del proyecto:

```bash
cd kineagenda-backend
```

Instalar las dependencias:

```bash
npm install
```

Crear un archivo `.env` tomando como referencia `.env.example`:

```env
PORT=3000
NODE_ENV=development
```

El archivo `.env` no se almacena en Git porque corresponde a la configuración local del entorno.

## Ejecución

### Modo normal

```bash
npm start
```

Este comando ejecuta:

```bash
node app.js
```

Al iniciar correctamente se muestra en la terminal:

```text
Servidor iniciado en http://localhost:3000
```

### Modo desarrollo

```bash
npm run dev
```

Este comando utiliza nodemon para reiniciar automáticamente el servidor cuando se detectan modificaciones en el código.

## Scripts disponibles

Los scripts definidos en `package.json` son:

```json
"scripts": {
  "start": "node app.js",
  "dev": "nodemon app.js"
}
```

Elegí nombres simples y habituales para que sea fácil identificar qué comando se utiliza en ejecución normal y cuál corresponde al desarrollo.

## Variables de entorno

El puerto del servidor se configura mediante dotenv.

Ejemplo:

```env
PORT=3000
NODE_ENV=development
```

Si `PORT` no se encuentra definido, la aplicación utiliza el puerto `3000` como respaldo.

## Rutas disponibles

### Página principal

```http
GET /
```

Entrega la interfaz principal de KineAgenda en formato HTML.

Ejemplo:

```text
http://localhost:3000/
```

### Estado del servidor

```http
GET /status
```

Entrega una respuesta JSON que permite comprobar que el backend está funcionando.

Ejemplo de respuesta:

```json
{
  "status": "ok",
  "message": "KineAgenda Backend funcionando correctamente",
  "data": {
    "environment": "development"
  }
}
```

## Archivos estáticos

Express publica los recursos de la carpeta `public` mediante `express.static()`.

Por ejemplo:

```text
http://localhost:3000/public/css/styles.css
```

Esto permite separar la presentación visual de la lógica del servidor.

## Registro de accesos

KineAgenda incorpora un middleware llamado `accessLogger`.

Cada solicitud recibida por el servidor genera un registro en:

```text
logs/log.txt
```

Ejemplo:

```text
2026-09-19T07:25:22.008Z | GET | /
2026-09-19T07:25:25.743Z | GET | /status
```

Para guardar los registros se utiliza `fs.appendFile()`, de manera que cada nuevo acceso se agrega al archivo sin eliminar los registros anteriores.

Actualmente el middleware registra las solicitudes que ingresan al servidor, incluyendo rutas principales y recursos estáticos.

Esto también permite observar cómo el navegador puede realizar varias solicitudes durante la carga de una página.

## Flujo cliente-servidor

La explicación y el diagrama del flujo utilizado por KineAgenda se encuentran en:

```text
docs/flujo-servidor-cliente.md
```

De manera resumida, el flujo es:

```text
Cliente
   ↓
Servidor Express
   ↓
Middleware
   ↓
Router
   ↓
Controller
   ↓
Respuesta HTML / JSON
```

El cliente realiza una solicitud HTTP. Express recibe la petición y ejecuta el middleware encargado de registrar el acceso.

Posteriormente, el router determina qué controlador debe procesar la solicitud y el controlador devuelve la respuesta correspondiente.

## Decisiones tomadas en esta etapa

En este módulo preferí mantener una estructura simple, pero separada por responsabilidades.

No incorporé todavía una base de datos porque esa integración corresponde a la siguiente etapa del proyecto.

Tampoco agregué un motor de plantillas como EJS, ya que para los requerimientos actuales la página HTML estática y la respuesta JSON permiten demostrar el funcionamiento solicitado sin sumar una dependencia que todavía no es necesaria.

La interfaz presenta algunas funciones que forman parte de la planificación futura de KineAgenda, pero se identifican como próximas funcionalidades y no como herramientas ya implementadas.

También decidí utilizar un archivo externo llamado `mainRoutes.js` para concentrar las rutas iniciales. El nombre permite identificar con mayor claridad que corresponde a las rutas principales de la aplicación.

## Evolución del proyecto

KineAgenda está pensado como un proyecto progresivo.

### Módulo 6

En esta primera etapa se implementa la base del backend:

- Node.js;
- Express;
- rutas;
- controladores;
- middlewares;
- contenido HTML;
- respuesta JSON;
- archivos estáticos;
- variables de entorno;
- registro mediante archivos planos.

### Módulo 7

La siguiente etapa incorporará persistencia mediante una base de datos y un ORM.

La planificación contempla entidades relacionadas con pacientes, profesionales, horas de atención y movimientos asociados a las sesiones.

También se implementarán operaciones CRUD y relaciones entre las entidades.

### Módulo 8

La última etapa incorporará una API REST con autenticación y autorización mediante JWT.

También se contempla el manejo de archivos y las validaciones correspondientes.

## Reflexión técnica

Esta primera etapa me permitió entender mejor que levantar un servidor es solamente una parte del backend. También es importante pensar desde el comienzo cómo se organizará el proyecto.

Separar rutas, controladores y middlewares hace que el código sea más fácil de seguir y evita que `app.js` termine acumulando responsabilidades.

La implementación de `log.txt` también fue útil para visualizar de manera concreta las solicitudes que recibe el servidor.

Una de las cosas que pude observar durante las pruebas es que una carga desde el navegador puede generar varias solicitudes. Además del documento HTML, el navegador necesita solicitar otros recursos, como la hoja de estilos.

También comprobé la diferencia entre ejecutar el proyecto con `npm start` y trabajar con `npm run dev`. En desarrollo, nodemon facilita las pruebas porque puede reiniciar automáticamente el servidor cuando se realizan cambios.

La intención es mantener esta organización cuando KineAgenda incorpore base de datos, operaciones CRUD, autenticación y API en las siguientes etapas.

## Repositorio

El código fuente y el historial de desarrollo del proyecto se encuentran en GitHub:

```text
https://github.com/kinesiologofrancovasquez-source/kineagenda-backend
```

---

**KineAgenda Backend**  
**Kinesiólogo Franco Vásquez:)**  
Proyecto Full Stack JavaScript