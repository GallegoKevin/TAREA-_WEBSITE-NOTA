# WEBSITE DE NOTAS

Consiste en un sitio web para registrar y gestionar notas utilizando HTML, CSS y JavaScript. A continuación se detallan los elementos principales:

## Archivos Principales

- `index.html`: Estructura del sitio web con elementos HTML básicos.
- `styles.css`: Estilos que definen la apariencia visual del sitio.
- `app.js`: Funcionalidad dinámica del sitio, incluyendo interacción con el usuario y almacenamiento local de notas.

## Funcionalidades

- **Registro de Notas:** Permite agregar nuevas notas con título y contenido.
- **Visualización:** Muestra las notas en forma de tabla y tarjetas.
- **Edición y Eliminación:** Opciones para editar, eliminar y ver detalles de cada nota.
- **Persistencia de Datos:** Usa `localStorage` para guardar las notas localmente en el navegador.


**RESULTADO FINAL**


![iamgen](https://i.ibb.co/XSX4XMw/Notas-online-video-cutter-com.gif)





## TEMAS DE LA CLASE: 


## LocalStorage

### Almacenamiento Local

`LocalStorage`: En HTML5 ofrece almacenamiento persistente en el navegador para datos que deben persistir entre sesiones sin caducar automáticamente.

### Uso de LocalStorage

- **Guardar Datos**: Utilizamos `localStorage.setItem('clave', 'valor')` para almacenar datos. La clave y el valor son cadenas de texto.
- **Recuperar Datos**: Se utilizan `localStorage.getItem('clave')` para obtener el valor asociado a una clave específica.
- **Eliminar Datos**: `localStorage.removeItem('clave')` elimina un elemento almacenado bajo una clave dada.

## Cadena de JSON

### JSON (JavaScript Object Notation)

JSON es un formato de datos ligero y legible, utilizado para intercambiar información y ser representado en JavaScript como objetos literales.

### Convertir a JSON

- **Objeto a JSON**: `JSON.stringify(objeto)` convierte un objeto JavaScript en una cadena JSON.

### Convertir desde JSON

- **JSON a Objeto**: `JSON.parse(cadenaJSON)` convierte una cadena JSON en un objeto JavaScript.

## Asincronia en JavaScript

JavaScript es un lenguaje de programación asíncrono y no bloqueante que permite la ejecución de múltiples tareas simultáneamente sin interrumpir el flujo principal del programa.

### API:
- **Fetch**: Permite realizar peticiones HTTP asíncronas. Es nativa del navegador moderno y devuelve Promesas.
- **XMLHttpRequest**: Obsoleta en muchos casos, pero es la API original para hacer peticiones HTTP asíncronas en JavaScript.

## Biblioteca
- **Axios**: Una biblioteca hacer peticiones HTTP desde el navegador o Node.js.

## Empaquetador
- **webpack**: es un Empaquetador de módulos JavaScript que optimiza recursos estáticos como JavaScript, CSS y archivos de imágenes para entornos web. 
