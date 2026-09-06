# Gestor Documental

Aplicación web desarrollada para la gestión de documentos de la Escuela Básica G-733 Chorombo Bajo. El frontend permite administrar documentos mediante una interfaz conectada a la API REST desarrollada previamente en la evaluación numero 3 de desarrollo Backend.

## Funcionalidades

El sistema permite las siguientes funciones:

- Registrar nuevos documentos.
- Visualizar los documentos registrados.
- Editar documentos existentes.
- Eliminar documentos mediante una previa confirmación.
- Buscar documentos por título.
- Filtrar documentos según su tipo.
- Validar campos obligatorios.
- Mostrar mensajes de confirmación y error.
- Adaptar la interfaz a diferentes tamaños de pantalla y tipos de dispositivo (siendo desde Laptop con sistema Operativo Windows para Desktop, así como para un sistema android de tableta y/o celular).

## Tecnologías utilizadas

### Frontend
- HTML5
- CSS3
- JavaScript
- Fetch API

### Backend utilizado de la 3ra evalaución de la asignatura de desarrollo Backend
- PHP
- MySQL
- API REST
- XAMPP
- Postman

## Estructura del proyecto

gestor_documental_frontend/

- index.html
- css/
  - styles.css
- js/
  - api.js
  - app.js
- components/
- README.md

## Conexión con la API

El frontend consume la API REST desarrollada para el Gestor Documental.

Endpoint utilizado:

http://localhost/gestor_documental_api/api

La comunicación entre el frontend y el backend se realiza mediante solicitudes HTTP utilizando Fetch API.

## Ejecución del proyecto

1. Iniciar Apache y MySQL desde el aplicativo XAMPP.
2. Verificar que la base de datos del Gestor Documental esté disponible.
3. Mantener las carpetas `gestor_documental_api` y `gestor_documental_frontend` dentro de `C:\xampp\htdocs`.
4. Abrir el frontend desde el navegador mediante:

http://localhost/gestor_documental_frontend/

## Uso

Para registrar un documento se deben completar el título, tipo de documento y fecha. También es posible agregar una descripción y una referencia al archivo.

Los documentos registrados aparecen en la tabla principal, desde donde pueden ser editados o eliminados.

El buscador permite encontrar documentos según su título y el filtro permite mostrar documentos de un tipo determinado.

## Integración con Backend

Este proyecto corresponde al frontend del sistema Gestor Documental y trabaja en conjunto con la API REST desarrollada en Backend. Las operaciones de creación, consulta, actualización y eliminación se realizan mediante dicha API y los datos son almacenados en MySQL.
