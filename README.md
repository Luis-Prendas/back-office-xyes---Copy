# Front Next App

Este repositorio contiene una aplicación Frontend desarrollada en Next.js. Puedes ejecutar la aplicación en entornos de desarrollo o producción utilizando Docker Compose.

## Requisitos Previos

-   [Docker](https://www.docker.com/)
-   [Docker Compose](https://docs.docker.com/compose/migrate/)

## Instrucciones de Uso

1. **Clonar el Repositorio:**
   **PENDIENTE ajustar **

```bash
 git clone https://github.com/Atcode2023/front-xyes
 cd xyes-front
```

2. Ejecutar la Aplicación en Desarrollo

```bash
 docker-compose -f docker-compose.yml up -d new-front-next
```

3. Ejecutar la Aplicación en Producción:

```bash
 docker-compose -f docker-compose.yml up -d front-next-prod
```

4. Detener la Aplicación:

```bash
 docker-compose -f docker-compose.yml down
```
