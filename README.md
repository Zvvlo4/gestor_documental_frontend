# Gestor Documental

Aplicación web desarrollada para apoyar la gestión de documentos de la Escuela Básica G-733 Chorombo Bajo, ubicada en la comuna de María Pinto.

El proyecto busca facilitar el manejo de documentación utilizada por el equipo directivo, permitiendo centralizar información que anteriormente era gestionada principalmente de forma manual.

El Frontend se encuentra conectado a la API REST del Gestor Documental desarrollada previamente en la asignatura de Desarrollo Backend.

## Problema y solución

La Escuela Básica G-733 Chorombo Bajo requiere mejorar la administración de documentos internos como memos, oficios, citaciones de apoderados, acuerdos, documentos de reuniones y permisos administrativos.

Como solución se desarrolló una interfaz web que permite registrar, visualizar, modificar, buscar, filtrar y eliminar documentos mediante una conexión con la API REST del sistema.

## Funcionalidades

El sistema permite:

- Registrar nuevos documentos.
- Visualizar los documentos registrados.
- Editar documentos existentes.
- Eliminar documentos mediante confirmación previa.
- Buscar documentos por título.
- Filtrar documentos según su tipo.
- Validar campos obligatorios.
- Mostrar mensajes de confirmación y error.
- Adaptar la interfaz a diferentes tamaños de pantalla.

## Tecnologías utilizadas

### Frontend

- HTML5
- CSS3
- JavaScript
- Fetch API

### Backend utilizado

- PHP
- MySQL
- API REST
- XAMPP
- Apache

Durante el desarrollo del Backend también se utilizó Postman para comprobar el funcionamiento de los endpoints.

## Estructura del proyecto

```text
gestor_documental_frontend/
│
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── api.js
│   └── app.js
├── components/
└── README.md
```

La estructura permite mantener separados los elementos principales de la aplicación.

`index.html` contiene la estructura principal de la interfaz.

`styles.css` contiene los estilos visuales y las reglas utilizadas para adaptar la interfaz a diferentes tamaños de pantalla.

`api.js` contiene las funciones encargadas de realizar las solicitudes hacia la API REST.

`app.js` controla la interacción del usuario, la visualización de documentos, formularios, búsqueda, filtros y acciones disponibles.

## Componentes de la aplicación

Aunque la interfaz se encuentra integrada en una misma aplicación, se organizaron sus responsabilidades en diferentes elementos funcionales.

### Formulario de documentos

Permite registrar y editar documentos. Recibe información como título, tipo, fecha, descripción y referencia del archivo. Al guardar la información se comunica con las funciones de la API.

### Listado de documentos

Muestra los documentos obtenidos desde el Backend. Presenta título, tipo, fecha, descripción, archivo y acciones disponibles.

### Búsqueda

Permite localizar documentos utilizando su título. El listado se actualiza según el texto ingresado por el usuario.

### Filtro por tipo

Permite mostrar solamente los documentos correspondientes al tipo seleccionado.

### Acciones de edición y eliminación

Cada documento presenta opciones para editar o eliminar. La edición carga los datos existentes en el formulario y la eliminación solicita confirmación antes de ejecutar la acción.

### Mensajes de estado

La aplicación entrega información al usuario después de determinadas operaciones, por ejemplo, cuando un documento se elimina correctamente o cuando ocurre un problema.

## Conexión con la API

El Frontend consume la API REST desarrollada para el Gestor Documental.

Endpoint base:

`http://localhost/gestor_documental_api/api`

La comunicación entre Frontend y Backend se realiza mediante solicitudes HTTP utilizando Fetch API.

## Endpoints utilizados

| Método | Endpoint | Propósito | Información enviada | Información recibida |
|---|---|---|---|---|
| GET | `/documentos` | Obtener documentos registrados | No requiere cuerpo | Lista de documentos |
| GET | `/documentos/{id}` | Consultar un documento | ID del documento | Información del documento |
| POST | `/documentos` | Registrar un documento | Datos del formulario | Confirmación y documento creado |
| PUT/PATCH | `/documentos/{id}` | Modificar un documento | ID y datos actualizados | Confirmación de actualización |
| DELETE | `/documentos/{id}` | Eliminar un documento | ID del documento | Confirmación de eliminación |
| GET | `/tipos-documento` | Obtener tipos disponibles | No requiere cuerpo | Lista de tipos de documento |

## Ejecución del proyecto

1. Iniciar Apache y MySQL desde XAMPP.
2. Verificar que la base de datos del Gestor Documental se encuentre disponible.
3. Mantener las carpetas `gestor_documental_api` y `gestor_documental_frontend` dentro de `C:\xampp\htdocs`.
4. Abrir un navegador web.
5. Ingresar a:

`http://localhost/gestor_documental_frontend/`

Para que todas las operaciones funcionen correctamente, el Backend y la base de datos deben encontrarse activos.

## Uso

Para registrar un documento se deben completar los campos obligatorios de título, tipo de documento y fecha. También se puede agregar una descripción y una referencia al archivo.

Los documentos registrados aparecen en la tabla principal, desde donde pueden ser editados o eliminados.

El buscador permite encontrar documentos según su título y el filtro permite mostrar documentos de un tipo determinado.

## Accesibilidad y usabilidad

Durante el desarrollo se consideraron diferentes aspectos destinados a facilitar el uso de la aplicación:

- Los campos del formulario cuentan con etiquetas que indican la información solicitada.
- Los campos obligatorios se encuentran identificados.
- Los botones utilizan textos comprensibles como "Guardar documento", "Editar" y "Eliminar".
- La eliminación solicita confirmación para evitar acciones accidentales.
- Se utilizan mensajes para informar el resultado de determinadas operaciones.
- La interfaz se adapta a distintos tamaños de pantalla.
- Los controles principales pueden ser utilizados mediante los mecanismos habituales de navegación del navegador.

### Prueba realizada

Se comprobó la interfaz utilizando las herramientas de desarrollo del navegador y modificando el tamaño de visualización a una resolución correspondiente a un dispositivo móvil.

Durante la prueba se observó que la tabla de documentos contenía demasiada información para visualizarse completamente en una pantalla pequeña.

Como solución se adaptó la presentación para dispositivos móviles, permitiendo mantener disponibles los datos y acciones del sistema sin afectar el funcionamiento de la versión de escritorio.

## Buenas prácticas aplicadas al proyecto

### 1. Separación de responsabilidades

**Propósito:** evitar concentrar toda la lógica en un único archivo.

**Aplicación:** se separó la estructura HTML, los estilos CSS y la lógica JavaScript.

**Ejemplo:** `index.html`, `styles.css`, `api.js` y `app.js`.

### 2. Centralización de solicitudes a la API

**Propósito:** facilitar el mantenimiento de la comunicación con el Backend.

**Aplicación:** las operaciones relacionadas con la API se mantienen en `api.js`.

**Ejemplo:** solicitudes para obtener, crear, actualizar y eliminar documentos.

### 3. Validación de datos

**Propósito:** evitar solicitudes incompletas.

**Aplicación:** se comprueban los campos obligatorios antes de registrar información.

**Ejemplo:** título, tipo y fecha son necesarios para guardar un documento.

### 4. Confirmación de acciones importantes

**Propósito:** disminuir eliminaciones accidentales.

**Aplicación:** antes de eliminar un documento se solicita confirmación al usuario.

**Ejemplo:** mensaje "¿Está seguro de que desea eliminar este documento?".

### 5. Diseño adaptable

**Propósito:** permitir el uso de la aplicación en diferentes tamaños de pantalla.

**Aplicación:** se incorporaron reglas CSS para adaptar los elementos de la interfaz.

**Ejemplo:** visualización probada mediante el modo responsive de las herramientas de desarrollo del navegador.

### 6. Manejo de errores y retroalimentación

**Propósito:** informar al usuario sobre el resultado de las operaciones.

**Aplicación:** se muestran mensajes después de determinadas acciones y se controlan errores producidos durante la comunicación con la API.

**Ejemplo:** mensaje de confirmación después de eliminar correctamente un documento.

## Seguridad

Se implementaron medidas básicas de seguridad acordes al alcance del Frontend:

- Validación de campos antes de enviar información al Backend, para reducir el envío de datos incompletos.
- Confirmación previa a la eliminación, para disminuir modificaciones accidentales.
- Manejo controlado de errores, evitando mostrar al usuario información técnica innecesaria.
- No se almacenan contraseñas, credenciales de base de datos ni información sensible directamente en el Frontend.
- Las operaciones sobre los datos se realizan mediante la API REST y no mediante acceso directo del Frontend a MySQL.

Estas medidas complementan las validaciones realizadas por el Backend.

## Optimización

### Optimización 1: filtrado en la interfaz

La búsqueda y el filtro permiten trabajar sobre la información cargada en la interfaz sin generar una nueva solicitud al servidor por cada interacción del usuario.

Esto disminuye solicitudes innecesarias y permite obtener una respuesta inmediata al buscar o filtrar documentos.

### Optimización 2: separación de lógica

La comunicación con el Backend se mantiene separada de la lógica principal de la interfaz mediante `api.js` y `app.js`.

Esta separación reduce código duplicado y facilita realizar modificaciones sin alterar innecesariamente otras partes de la aplicación.

## Problema técnico encontrado y solución

Durante el desarrollo se presentó un problema relacionado con la visualización de la tabla de documentos en dispositivos con pantallas pequeñas.

### Problema

La tabla contenía varias columnas y su contenido no podía visualizarse correctamente en una resolución correspondiente a un teléfono móvil.

### Causa

La cantidad de información presentada horizontalmente superaba el ancho disponible en pantallas pequeñas.

### Alternativas consideradas

Se consideró reducir el tamaño del contenido, eliminar columnas o adaptar la presentación para dispositivos móviles.

### Solución implementada

Se modificaron los estilos CSS utilizando reglas responsive para adaptar la interfaz a pantallas de menor tamaño sin eliminar las funciones principales.

### Resultado

La aplicación puede utilizarse tanto en escritorio como en resoluciones móviles, manteniendo disponibles las funciones de consulta y administración.

### Aprendizaje

El problema permitió comprobar la importancia de considerar distintos tamaños de pantalla durante el desarrollo y no solamente después de finalizar la interfaz.

## Control de versiones

El proyecto utiliza Git y GitHub como herramientas de control de versiones.

Repositorio del Frontend:

`https://github.com/Zvvlo4/gestor_documental_frontend`

El repositorio permite mantener disponible el código fuente y registrar los cambios realizados durante el desarrollo.

## Integración con Backend

El Frontend trabaja en conjunto con la API REST desarrollada para el Gestor Documental.

Las operaciones de creación, consulta, actualización y eliminación se realizan mediante solicitudes HTTP hacia la API y los datos son almacenados de forma persistente en MySQL.

## Retrospectiva y mejora continua

Durante el desarrollo se identificaron las siguientes oportunidades para una futura versión:

| Situación | Mejora propuesta | Prioridad | Responsable | Acción |
|---|---|---|---|---|
| El sistema funciona actualmente en entorno local | Implementar despliegue en un servidor web | Alta | Desarrollador | Configurar Backend, Frontend y base de datos en un entorno accesible por Internet |
| Los documentos se registran mediante una referencia de archivo | Incorporar carga real de archivos | Alta | Desarrollador | Implementar almacenamiento y validación de archivos desde Frontend y Backend |
| La interfaz posee funciones administrativas básicas | Incorporar autenticación de usuarios | Media | Desarrollador | Implementar inicio de sesión y control de acceso para el equipo directivo |

### Mejora implementada durante la evaluación

Una de las mejoras seleccionadas fue adaptar la interfaz a dispositivos con pantallas pequeñas.

Se escogió esta mejora debido a que durante las pruebas se observó que la tabla no se visualizaba correctamente en una resolución móvil. Se modificaron los estilos de la interfaz y posteriormente se volvió a comprobar su funcionamiento utilizando las herramientas responsive del navegador.

## Conclusión

El Gestor Documental permite centralizar y administrar información utilizada por el equipo directivo de la Escuela Básica G-733 Chorombo Bajo.

La integración entre el Frontend y la API REST permite registrar, consultar, modificar y eliminar documentos almacenados en la base de datos. Además, se incorporaron funciones de búsqueda, filtrado, validaciones, mensajes de estado y adaptación a distintos tamaños de pantalla.

El proyecto constituye una solución inicial que puede continuar ampliándose mediante funciones como autenticación, carga real de archivos y despliegue en un servidor.