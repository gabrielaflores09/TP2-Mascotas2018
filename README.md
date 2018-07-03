Proyecto Mascotas - Programación Avanzada
=

Proyecto Red social de Mascotas, ejemplo de código para la cátedra "Programación Avanzada" en la Universidad Tecnología Nacional, Facultad Regional Mendoza.

Este proyecto es un ejemplo de como armar un proyecto Node 6 con Typescript como backend, y Angular 6 como frontend.

El proyecto tiene 2 carpetas

angular :  Frontend desarrollado en angular 6.

node-ts : Node con typescript para backend.

Guía de Instalación
-

Instalar Node con npm versión 8
-

https://nodejs.org/

Instalar MongoDB
-

Recomiendo seguir las guiás de instalación de mongo desde el sitio oficial:

https://www.mongodb.com/download-center#community

Crear una carpeta donde se guardara la db de mongo : C:\data por ejemplo

Ejecución :

```bash
"C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe" --dbpath C:\data
````

Sugiero instalar Mongodb Compass para poder navegar la base de datos en forma visual :
https://www.mongodb.com/products/compass

Instalar Redis
-

Seguir los pasos de instalación desde la pagina oficial https://redis.io/download

Para windows conviene un ejecutable : https://sourceforge.net/projects/redis/

Recomiendo instalar FastoRedis para navegar la base de datos https://fastoredis.com/

Ejecución
-

Abrir ventana de comandos en el folder node-ts y ejecutar :

```bash
npm install
npm start
```

El backend expone la documentación de las api abriendo http://localhost:3000/

Front-end en angular
-

Abrir ventana de comandos en la carpeta angular, ejecutar:

```bash
npm install
npm start
```

Desde un browser debemos abrir http://localhost:4200/
