# Reflexión técnica – Módulo 7

## KineAgenda Backend

**Autor:** Kinesiólogo Franco Vásquez

Durante el Módulo 7 KineAgenda pasó de ser un servidor construido con Node.js y Express a trabajar con persistencia real mediante PostgreSQL y Sequelize.

Uno de los principales aprendizajes de esta etapa fue comprender que conectar una base de datos no consiste solamente en almacenar información. También fue necesario definir modelos, establecer validaciones, organizar las consultas y mantener separadas las responsabilidades entre rutas, controladores y servicios.

La implementación del modelo Paciente me permitió trabajar con operaciones CRUD sobre datos persistentes. A partir de estas pruebas pude comprobar la creación, consulta, modificación y eliminación de registros, además del manejo de situaciones en las que un paciente solicitado no existe.

Posteriormente incorporé el modelo Cita y establecí una relación uno a muchos: un paciente puede tener varias citas y cada cita pertenece a un paciente. El uso de `include` de Sequelize me permitió recuperar una cita junto con la información del paciente relacionado.

También trabajé con dos formas de acceder a los datos. Por una parte utilicé consultas mediante los métodos proporcionados por Sequelize y, por otra, realicé una consulta SQL manual mediante `sequelize.query()`. Esto me ayudó a entender que el ORM simplifica muchas operaciones repetitivas y permite trabajar de una forma más integrada con los modelos, mientras que SQL directo sigue siendo útil cuando se necesita controlar una consulta de manera específica.

Otro aprendizaje importante fue el uso de transacciones. Para comprobar su funcionamiento implementé el registro de un paciente junto con su primera cita dentro de una misma transacción. Si ambas operaciones funcionan, los cambios se confirman. Si ocurre un error, se ejecuta un rollback y los registros parciales no permanecen almacenados. La prueba se verificó posteriormente consultando directamente PostgreSQL.

También mantuve las credenciales de conexión fuera del código fuente mediante variables de entorno y conservé `.env` fuera del repositorio. Esto permite separar la configuración local de la aplicación y evita publicar información sensible.

Comparando esta etapa con el Módulo 6, considero que KineAgenda tiene ahora una estructura de backend más completa. El proyecto mantiene Express como base del servidor, pero incorpora PostgreSQL, modelos, relaciones, servicios, validaciones, operaciones CRUD y transacciones.

Esta evolución deja preparada una base más sólida para continuar con el Módulo 8, donde el proyecto podrá avanzar hacia una API REST con autenticación, autorización y nuevas medidas de seguridad.
