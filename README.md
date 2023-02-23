# Ejercicio en Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.7.

## Pasos para clonar el proyecto

En una terminal o en el Git Bash escribir el siguiente comando `git clone https://github.com/MiguelLopez97/MapasAngular` para realizar la descarga de los archivos del proyecto. Una vez realizada la descarga, descargar los paquetes de Node con el siguiente comando `npm install` para reconstruir los paquetes que utiliza el proyecto. Una vez finalizado el paso anterior, correr el proyecto desde el directorio raíz del proyecto con el comando `ng serve` y navegar a `http://localhost:4200/`.

## Login

Las credenciales para el acceso al operador para que pueda visualizar los mapas son: Usuario `OPERADOR01` y Contraseña: `0p3r4d0r2023`. 

## Primer Mapa: One Bus

Para el primer mapa se visualizan todos los registros del archivo `one_bus.csv` y asimismo va realizando la transición de cada coordenada (latitud y longitud) mediante un icono de un coche.

## Segundo Mapa: Many Bus

En el segundo mapa se realizó un filtrado por cada autobús, separando cada autobús en un arreglo respectivamente. En el mapa es posible ver los autobuses que se encuentran disponibles y elegir el que desee visualizar en el mapa. Al igual que en el primer mapa, realiza la transición de cada coordenada, mostrando el movimiento que tiene el autobús seleccionado.