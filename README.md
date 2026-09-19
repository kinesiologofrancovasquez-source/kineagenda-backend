# KineAgenda Backend

Backend para un sistema de gestión de agenda kinésica desarrollado como proyecto integrador de **Desarrollo de Aplicaciones Full Stack JavaScript Trainee**.

KineAgenda nace a partir de una necesidad relacionada con mi trabajo como kinesiólogo: mantener organizada la información de pacientes y sus atenciones, utilizando una aplicación que pueda crecer progresivamente hacia la gestión de sesiones, pagos y otros movimientos asociados a una consulta.

Esta versión corresponde a la evolución del proyecto durante el **Módulo 7**, incorporando persistencia real mediante PostgreSQL, Sequelize ORM, operaciones CRUD, relaciones entre entidades y transacciones.

---

## Autor

**Kinesiólogo Franco Vásquez:)**

---

## Objetivo del proyecto

El objetivo de KineAgenda es construir progresivamente una aplicación que permita centralizar información que normalmente puede terminar distribuida entre agendas, anotaciones y registros separados.

La idea es que el proyecto pueda evolucionar para administrar:

- pacientes;
- agenda de atención;
- citas kinésicas;
- sesiones realizadas;
- cantidad de sesiones contratadas;
- pagos y abonos;
- saldos pendientes;
- ingresos y egresos asociados a la consulta.

Durante el Módulo 6 se construyó la base inicial del servidor.

En el **Módulo 7** el proyecto evoluciona incorporando una base de datos relacional para comenzar a trabajar con información persistente.

---

# Módulo 7 - Persistencia y acceso a datos

## Objetivo de esta etapa

El objetivo principal de esta etapa fue conectar el servidor desarrollado previamente con una base de datos relacional y comenzar a administrar información persistente.

Para esto incorporé **PostgreSQL** y **Sequelize ORM** al backend de KineAgenda.

Actualmente el proyecto permite:

- conectar Node.js con PostgreSQL;
- almacenar información real en la base de datos;
- administrar pacientes;
- administrar citas kinésicas;
- realizar operaciones CRUD;
- filtrar información;
- validar datos;
- manejar errores;
- relacionar pacientes con sus citas;
- consultar información relacionada mediante Sequelize;
- realizar consultas SQL manuales;
- comparar SQL manual con Sequelize ORM;
- ejecutar operaciones mediante transacciones;
- realizar rollback cuando una transacción falla.

---

## Tecnologías utilizadas

- Node.js
- Express
- PostgreSQL
- Sequelize
- pg
- pg-hstore
- dotenv
- nodemon
- HTML5
- CSS3
- módulo `fs` de Node.js
- Git
- GitHub

---

## Arquitectura del proyecto

KineAgenda mantiene una estructura separada por responsabilidades.

```text
kineagenda-backend/
│
├── config/
│   └── database.js
│
├── controllers/
│   ├── citaController.js
│   ├── homeController.js
│   ├── pacienteController.js
│   ├── registroController.js
│   └── statusController.js
│
├── docs/
│   └── flujo-servidor-cliente.md
│
├── logs/
│   └── log.txt
│
├── middlewares/
│   └── accessLogger.js
│
├── models/
│   ├── Cita.js
│   ├── Paciente.js
│   └── index.js
│
├── public/
│   ├── css/
│   │   └── styles.css
│   └── index.html
│
├── routes/
│   ├── citaRoutes.js
│   ├── mainRoutes.js
│   ├── pacienteRoutes.js
│   └── registroRoutes.js
│
├── scripts/
│   └── seedPacientes.js
│
├── services/
│   ├── citaService.js
│   ├── pacienteService.js
│   └── registroService.js
│
├── .env.example
├── .gitignore
├── app.js
├── package.json
├── package-lock.json
└── README.md
```

La separación entre rutas, controladores, servicios y modelos permite que cada capa tenga una responsabilidad definida.

Las rutas reciben las solicitudes HTTP.

Los controladores manejan las respuestas, validaciones generales y códigos HTTP.

Los servicios concentran las operaciones relacionadas con los datos.

Los modelos representan las entidades almacenadas en PostgreSQL.

Esta organización permite que el proyecto pueda seguir creciendo sin concentrar toda la lógica en `app.js`.

---

# Requisitos

Para ejecutar el proyecto se necesita:

- Node.js 18 o superior;
- npm;
- PostgreSQL;
- Git.

Durante el desarrollo de esta etapa se utilizó **PostgreSQL 17**.

---

# Instalación

## 1. Clonar el repositorio

```bash
git clone https://github.com/kinesiologofrancovasquez-source/kineagenda-backend.git
```

## 2. Entrar al proyecto

```bash
cd kineagenda-backend
```

## 3. Instalar las dependencias

```bash
npm install
```

## 4. Crear la base de datos

```bash
createdb kineagenda_db
```

## 5. Configurar las variables de entorno

Crear un archivo `.env` utilizando `.env.example` como referencia.

Ejemplo:

```env
PORT=3000
NODE_ENV=development

DB_NAME=kineagenda_db
DB_USER=tu_usuario_postgres
DB_PASSWORD=tu_password_postgres
DB_HOST=localhost
DB_PORT=5432
DB_DIALECT=postgres
```

Las credenciales reales utilizadas localmente no se almacenan en GitHub.

El archivo `.env` está excluido mediante `.gitignore`.

El repositorio incluye únicamente `.env.example` para indicar qué variables necesita la aplicación.

---

# Conexión con PostgreSQL

La configuración de PostgreSQL se encuentra centralizada en:

```text
config/database.js
```

Sequelize obtiene los datos de conexión desde las variables de entorno.

La aplicación primero comprueba la conexión con PostgreSQL y luego sincroniza los modelos.

Cuando la conexión funciona correctamente se muestra:

```text
Base de datos PostgreSQL conectada correctamente
Modelos sincronizados correctamente
Servidor iniciado en http://localhost:3000
```

Decidí utilizar PostgreSQL porque KineAgenda trabaja con información que presenta relaciones claras entre sus entidades.

Por ejemplo, un paciente puede tener diferentes citas, pero cada cita pertenece a un paciente determinado.

El paquete `pg` funciona como cliente de PostgreSQL para Node.js y Sequelize se utiliza como ORM para trabajar sobre esa conexión.

---

# Modelos

## Paciente

El modelo `Paciente` representa a los pacientes almacenados en KineAgenda.

Sus principales campos son:

```text
id
nombre
apellido
email
telefono
estado
createdAt
updatedAt
```

Los campos:

```text
nombre
apellido
email
```

son obligatorios.

El email también se definió como único para evitar registrar dos pacientes utilizando la misma dirección de correo.

Los estados permitidos son:

```text
activo
inactivo
```

---

## Cita

El modelo `Cita` representa una atención kinésica agendada para un paciente.

Sus campos son:

```text
id
fecha
hora
motivo
estado
observaciones
pacienteId
createdAt
updatedAt
```

Los campos:

```text
fecha
hora
motivo
pacienteId
```

son obligatorios.

Los estados permitidos para una cita son:

```text
pendiente
confirmada
realizada
cancelada
```

---

# Relación entre pacientes y citas

La relación implementada es:

```text
Paciente 1 ───────── N Cita
```

Esto significa que:

```text
un paciente puede tener muchas citas
una cita pertenece a un único paciente
```

La relación se encuentra definida mediante Sequelize:

```js
Paciente.hasMany(Cita, {
  foreignKey: 'pacienteId',
  as: 'citas',
  onDelete: 'CASCADE'
});

Cita.belongsTo(Paciente, {
  foreignKey: 'pacienteId',
  as: 'paciente'
});
```

PostgreSQL crea la correspondiente clave foránea:

```text
FOREIGN KEY ("pacienteId")
REFERENCES pacientes(id)
ON UPDATE CASCADE
ON DELETE CASCADE
```

De esta manera la base de datos mantiene la integridad de la relación entre ambas entidades.

---

# Consultas relacionadas mediante Sequelize

Para consultar las citas junto con la información del paciente utilizo `include` de Sequelize.

Ejemplo conceptual:

```js
Cita.findAll({
  include: [
    {
      model: Paciente,
      as: 'paciente',
      attributes: [
        'id',
        'nombre',
        'apellido',
        'email',
        'telefono'
      ]
    }
  ]
});
```

Esto permite que una cita sea devuelta junto con su paciente relacionado.

Ejemplo:

```json
{
  "id": 1,
  "fecha": "2026-09-22",
  "hora": "10:00:00",
  "motivo": "Evaluación kinésica inicial",
  "estado": "realizada",
  "pacienteId": 1,
  "paciente": {
    "id": 1,
    "nombre": "Camila",
    "apellido": "Rojas",
    "email": "camila.rojas@kineagenda.cl",
    "telefono": "+56987654321"
  }
}
```

Utilizar `include` permite aprovechar directamente las relaciones declaradas entre los modelos.

---

# CRUD de pacientes

## Obtener pacientes

```http
GET /pacientes
```

Devuelve los pacientes almacenados en PostgreSQL.

La respuesta incluye la cantidad de registros encontrados.

---

## Filtrar pacientes por nombre

También se puede utilizar:

```http
GET /pacientes?nombre=Camila
```

El filtro utiliza `Op.iLike` de Sequelize para realizar una búsqueda parcial por nombre sin depender de mayúsculas y minúsculas.

---

## Crear paciente

```http
POST /pacientes
```

Ejemplo:

```json
{
  "nombre": "Camila",
  "apellido": "Rojas",
  "email": "camila.rojas@kineagenda.cl",
  "telefono": "+56987654321",
  "estado": "activo"
}
```

La API valida que nombre, apellido y email estén presentes.

---

## Actualizar paciente

```http
PUT /pacientes/:id
```

Los campos permitidos para actualización son:

```text
nombre
apellido
email
telefono
estado
```

Decidí limitar explícitamente los campos que pueden modificarse para evitar alterar accidentalmente información interna como el identificador o los timestamps.

Antes de realizar la actualización se comprueba que el paciente exista.

---

## Eliminar paciente

```http
DELETE /pacientes/:id
```

Antes de eliminar el registro se comprueba que el paciente exista.

Cuando el identificador no corresponde a un paciente registrado, la API responde con:

```json
{
  "status": "error",
  "message": "Paciente no encontrado"
}
```

---

# CRUD de citas

## Obtener todas las citas

```http
GET /citas
```

La consulta devuelve las citas almacenadas junto con el paciente relacionado.

---

## Filtrar citas por estado

```http
GET /citas?estado=pendiente
```

Esto permite consultar únicamente las citas que coinciden con el estado solicitado.

---

## Obtener una cita

```http
GET /citas/:id
```

Devuelve una cita determinada junto con la información del paciente asociado.

---

## Crear una cita

```http
POST /citas
```

Ejemplo:

```json
{
  "fecha": "2026-09-22",
  "hora": "10:00",
  "motivo": "Evaluación kinésica inicial",
  "estado": "confirmada",
  "observaciones": "Paciente refiere molestias en zona lumbar",
  "pacienteId": 1
}
```

Antes de crear una cita se comprueba que `pacienteId` corresponda a un paciente existente.

Esto evita registrar citas asociadas a pacientes inexistentes.

---

## Actualizar una cita

```http
PUT /citas/:id
```

Los campos permitidos son:

```text
fecha
hora
motivo
estado
observaciones
pacienteId
```

Antes de actualizar se comprueba que la cita exista.

Si se intenta modificar `pacienteId`, también se comprueba que el nuevo paciente exista.

---

## Eliminar una cita

```http
DELETE /citas/:id
```

La existencia de la cita se comprueba antes de realizar la eliminación.

---

# Validaciones y manejo de errores

KineAgenda incorpora validaciones tanto en los controladores como en los modelos de Sequelize.

Entre los casos controlados se encuentran:

- campos obligatorios;
- formato de email;
- email duplicado;
- estados permitidos;
- paciente inexistente;
- cita inexistente;
- paciente asociado inexistente;
- errores internos durante las operaciones.

La API utiliza códigos HTTP según el resultado de la operación.

Entre ellos:

```text
200 OK
201 Created
400 Bad Request
404 Not Found
409 Conflict
500 Internal Server Error
```

Por ejemplo, si se intenta registrar un paciente con un email ya utilizado, la API responde:

```json
{
  "status": "error",
  "message": "Ya existe un paciente registrado con ese email"
}
```

El objetivo es entregar mensajes comprensibles sin exponer directamente detalles internos de PostgreSQL al cliente.

---

# SQL manual y Sequelize ORM

Durante esta etapa implementé dos formas de consultar pacientes para comparar SQL directo con Sequelize.

## Consulta mediante Sequelize ORM

```http
GET /pacientes
```

Internamente utiliza una operación equivalente a:

```js
Paciente.findAll();
```

Sequelize trabaja sobre el modelo `Paciente` y devuelve los registros almacenados.

---

## Consulta mediante SQL manual

También implementé:

```http
GET /pacientes/sql
```

Esta ruta utiliza `sequelize.query()` para ejecutar directamente una sentencia SQL.

La consulta utilizada es:

```sql
SELECT
  id,
  nombre,
  apellido,
  email,
  telefono,
  estado,
  "createdAt",
  "updatedAt"
FROM pacientes
ORDER BY id ASC;
```

Las dos alternativas permiten consultar la información almacenada, pero tienen características diferentes.

El SQL manual entrega control directo sobre la sentencia ejecutada y puede resultar útil para consultas específicas.

Sequelize permite trabajar mediante modelos JavaScript y centralizar operaciones, validaciones y relaciones.

En KineAgenda el ORM resulta especialmente útil porque `Paciente` y `Cita` se encuentran relacionados y esa relación puede reutilizarse mediante `include`.

Por este motivo elegí Sequelize como forma principal de acceso a los datos, manteniendo la consulta SQL manual como demostración y comparación.

---

# Transacciones

Para demostrar el uso de transacciones implementé:

```http
POST /registro-completo
```

Esta operación permite registrar dos elementos relacionados:

```text
1. un paciente;
2. su primera cita.
```

Las dos operaciones se ejecutan dentro de una misma transacción.

El flujo es:

```text
BEGIN
  ↓
Crear paciente
  ↓
Crear primera cita
  ↓
¿Las dos operaciones fueron correctas?
  │
  ├── Sí → COMMIT
  │
  └── No → ROLLBACK
```

Si ambas operaciones terminan correctamente se ejecuta:

```js
transaction.commit();
```

Si alguna operación falla se ejecuta:

```js
transaction.rollback();
```

Esto evita que la base de datos quede con información incompleta.

---

## Ejemplo de transacción exitosa

Durante las pruebas se registró un paciente junto con su primera cita.

Ejemplo:

```json
{
  "paciente": {
    "nombre": "Diego",
    "apellido": "Soto",
    "email": "diego.soto@kineagenda.cl",
    "telefono": "+56955554444"
  },
  "cita": {
    "fecha": "2026-09-25",
    "hora": "09:30",
    "motivo": "Evaluación kinésica inicial",
    "estado": "pendiente",
    "observaciones": "Primera evaluación del paciente"
  },
  "simularError": false
}
```

La respuesta confirma que el paciente y la cita fueron registrados.

---

## Prueba de rollback

Para comprobar el comportamiento de una transacción cuando ocurre un problema incorporé una simulación disponible solamente durante el desarrollo.

Ejemplo:

```json
{
  "paciente": {
    "nombre": "Daniela",
    "apellido": "Mora",
    "email": "daniela.rollback@kineagenda.cl",
    "telefono": "+56944443333"
  },
  "cita": {
    "fecha": "2026-09-26",
    "hora": "12:00",
    "motivo": "Evaluación de prueba rollback",
    "estado": "pendiente",
    "observaciones": "Registro utilizado para comprobar rollback"
  },
  "simularError": true
}
```

La API responde:

```json
{
  "status": "error",
  "message": "Transacción revertida correctamente por error simulado"
}
```

Después de la prueba se consultó PostgreSQL buscando el email utilizado en la operación y no se encontró ningún registro.

Esto permitió comprobar que las operaciones realizadas antes del error no fueron persistidas.

---

# Datos iniciales

El proyecto incluye:

```text
scripts/seedPacientes.js
```

Este script permite cargar pacientes iniciales para realizar pruebas.

Los datos se insertan utilizando `findOrCreate()` y el email se utiliza como referencia para evitar duplicar pacientes si el script se ejecuta nuevamente.

Los registros iniciales permiten probar las consultas sin depender de crear manualmente cada paciente antes de iniciar las pruebas.

---

# Ejecución

## Modo desarrollo

```bash
npm run dev
```

Este comando utiliza nodemon para reiniciar automáticamente el servidor cuando se realizan modificaciones.

## Modo normal

```bash
npm start
```

El servidor utiliza por defecto:

```text
http://localhost:3000
```

---

# Rutas disponibles

## Rutas generales

```http
GET /
GET /status
```

## Pacientes

```http
GET    /pacientes
GET    /pacientes?nombre=Camila
GET    /pacientes/sql
POST   /pacientes
PUT    /pacientes/:id
DELETE /pacientes/:id
```

## Citas

```http
GET    /citas
GET    /citas/:id
GET    /citas?estado=pendiente
POST   /citas
PUT    /citas/:id
DELETE /citas/:id
```

## Transacciones

```http
POST /registro-completo
```

---

# Registro de accesos

KineAgenda mantiene el middleware `accessLogger` desarrollado durante la etapa anterior.

Cada solicitud recibida por el servidor genera un registro en:

```text
logs/log.txt
```

Ejemplo:

```text
2026-09-19T07:25:22.008Z | GET | /
2026-09-19T07:25:25.743Z | GET | /status
```

El registro se realiza utilizando `fs.appendFile()` para agregar nuevas líneas sin eliminar los accesos anteriores.

Este middleware también permite observar las solicitudes realizadas durante las pruebas de las rutas del Módulo 7.

---

# Seguridad de configuración

Los datos necesarios para conectar KineAgenda con PostgreSQL se obtienen mediante variables de entorno.

El archivo:

```text
.env
```

contiene la configuración utilizada en cada entorno local.

Este archivo no se almacena en Git.

En cambio, el repositorio incluye:

```text
.env.example
```

con valores de referencia.

De esta forma es posible conocer qué variables necesita el proyecto sin publicar directamente la configuración local.

---

# Decisiones tomadas en el Módulo 7

Durante esta etapa decidí mantener la arquitectura modular iniciada anteriormente y agregar una capa de servicios.

Esto permite separar el acceso a PostgreSQL de los controladores HTTP.

PostgreSQL se utiliza como base de datos relacional y Sequelize como ORM principal.

La entidad `Paciente` funciona como uno de los elementos centrales de KineAgenda y `Cita` representa las atenciones programadas.

Elegí una relación uno a muchos porque un paciente puede registrar diferentes citas a lo largo del tiempo, mientras que cada cita corresponde a un paciente específico.

También limité explícitamente los campos que pueden modificarse mediante `PUT`, evitando que una actualización pueda modificar atributos internos que no deberían recibirse directamente desde el cliente.

Para demostrar transacciones elegí el registro de un paciente junto con su primera cita porque representa una situación concreta donde dos operaciones relacionadas deben completarse juntas.

Si el paciente se registra pero la cita falla, no resulta conveniente mantener solamente una parte de la operación. Por este motivo ambas acciones se ejecutan dentro de una misma transacción.

---

# Evolución del proyecto

## Módulo 6

Durante la primera etapa se construyó la base del backend:

```text
Node.js
Express
rutas
controladores
middlewares
HTML
CSS
archivos estáticos
variables de entorno
registro de accesos
```

## Módulo 7

Durante la etapa actual se incorporaron:

```text
PostgreSQL
Sequelize ORM
modelos
servicios
persistencia
CRUD de pacientes
CRUD de citas
filtros
validaciones
manejo de errores
relaciones
consultas con include
SQL manual
transacciones
commit
rollback
```

## Módulo 8

La siguiente etapa continuará la evolución de KineAgenda hacia una API REST con los mecanismos de autenticación y autorización definidos para esa fase del proyecto.

---

# Reflexión técnica del Módulo 7

Esta etapa me permitió observar de manera más concreta la diferencia entre tener un servidor funcionando y contar con un backend capaz de mantener información persistente.

Con PostgreSQL los pacientes y las citas permanecen almacenados aunque el servidor Express se reinicie.

También pude comprender mejor la función que cumple cada capa de la aplicación.

Los modelos representan los datos, los servicios realizan las operaciones sobre esos datos, los controladores procesan las solicitudes y las rutas definen cómo se accede a cada funcionalidad.

Trabajar con Sequelize me permitió entender cómo un ORM representa las tablas mediante modelos JavaScript y cómo las relaciones pueden utilizarse posteriormente mediante `include`.

La comparación con SQL manual también fue útil porque permitió comprobar que utilizar un ORM no significa dejar de trabajar con conceptos propios de SQL. Ambas alternativas acceden finalmente a la misma base de datos, pero ofrecen distintas formas de organizar las consultas.

Otro punto importante fue trabajar con transacciones.

La prueba de rollback permitió comprobar que cuando una operación depende de varios pasos relacionados no siempre es correcto almacenar solamente los pasos que alcanzaron a completarse.

En el caso del registro conjunto de un paciente y su primera cita, ambas operaciones deben confirmarse o ambas deben revertirse.

Finalmente, mantener la separación entre rutas, controladores, servicios y modelos hizo que el crecimiento de KineAgenda desde el Módulo 6 al Módulo 7 fuera más ordenado.

---

# Estado actual del Módulo 7

En esta etapa KineAgenda cuenta con:

```text
Servidor Express funcional
Conexión con PostgreSQL
Variables de entorno
Sequelize ORM
Modelo Paciente
Modelo Cita
Relación Paciente 1:N Cita
CRUD de pacientes
CRUD de citas
Filtros
Validaciones
Manejo de errores
Consulta relacionada mediante include
Consulta SQL manual
Transacciones
Commit
Rollback
Arquitectura modular
Control de versiones con Git
```

Esta base deja preparado el proyecto para continuar su evolución durante la siguiente etapa del proyecto integrador.

---

# Repositorio

El código fuente y el historial de desarrollo del proyecto se encuentran en GitHub:

```text
https://github.com/kinesiologofrancovasquez-source/kineagenda-backend
```

---

**KineAgenda Backend**  
**Kinesiólogo Franco Vásquez:)**  
Proyecto Full Stack JavaScript