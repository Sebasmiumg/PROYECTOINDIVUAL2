Sistema de Gestión de Notas - UMG

Este proyecto es un sistema de gestión de notas desarrollado utilizando Spring Boot en el backend, React en el frontend, y MySQL como base de datos. La rama master contiene todo el proyecto unificado, pero recomendamos que los usuarios clonen cada parte del proyecto desde sus respectivas ramas para facilitar el desarrollo y la gestión de cada módulo. Ramas del Proyecto • frontend: Contiene el código del frontend desarrollado con React. • backend: Contiene el código del backend desarrollado con Spring Boot. • database: Contiene los scripts SQL para la base de datos MySQL.

Clonar el Proyecto Opción 1: Clonar Todo el Proyecto desde la Rama Master Si deseas clonar todo el proyecto completo (frontend, backend, y base de datos), puedes clonar la rama master: git clone https://github.com/Sebasmiumg/PROYECTOINDIVUAL2.git Esto descargará todo el proyecto en tu máquina local.

Opción 2: Clonar Cada Componente por Separado Para una mejor organización y desarrollo, puedes clonar cada parte del proyecto por separado desde sus respectivas ramas. A continuación, se indican los pasos para clonar cada rama.

Clonar el Frontend git clone -b frontend https://github.com/Sebasmiumg/PROYECTOINDIVUAL2.git frontend Este comando clonará solo la rama frontend en un directorio llamado frontend.

Clonar el Backend git clone -b backend https://github.com/Sebasmiumg/PROYECTOINDIVUAL2.git backend Este comando clonará solo la rama backend en un directorio llamado backend.

Clonar la Base de Datos git clone -b database https://github.com/Sebasmiumg/PROYECTOINDIVUAL2.git database Este comando clonará solo la rama database en un directorio llamado database.

Funcionamiento del Sistema de Gestión de Notas El sistema permite gestionar notas de estudiantes, con las siguientes funcionalidades: • Agregar notas: Ingresar una nueva nota para un estudiante en una evaluación. • Editar notas: Modificar las notas ya existentes de un estudiante. • Eliminar notas: Borrar las notas de un estudiante. • Listar todas las notas: Mostrar todas las notas almacenadas en el sistema. • Validaciones de entrada: Asegurar que los datos sean válidos (por ejemplo, puntajes no negativos).

Configuración del Proyecto

Requisitos • Node.js y npm (para el frontend) • Java 17 y Maven (para el backend) • MySQL (para la base de datos)

Instalación del Frontend

Cambia a la rama frontend: git checkout frontend
Navega a la carpeta del frontend y ejecuta: npm install
Ejecuta el servidor de desarrollo: npm run dev
Instalación del Backend

Cambia a la rama backend: git checkout backend
Construye el proyecto con Maven: mvn clean install
Ejecuta el backend: mvn spring-boot
Configuración de la Base de Datos

Cambia a la rama database: git checkout database
Asegúrate de tener MySQL instalado y configurado correctamente.
Ejecuta los scripts SQL en tu servidor MySQL para crear las tablas necesarias para el sistema.
Actualiza el archivo application.properties con las credenciales correctas para la conexión a la base de datos.
