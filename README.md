# 🚀 app-tareas-front - Front (React-router + Docker)


<p align="center">
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
</p>


# App tareas - Frontend

Este es el frontend del proyecto **Lista de tareas**, desarrollado con **React Router v7** y optimizado para ejecutarse en contenedores **Docker**.

## 🛠️ Stack Tecnológico

Esta es la interfaz de usuario del **Lista de tareas**, una aplicación moderna diseñada para ejecutarse de manera aislada en contenedores Docker y consumir la API del backend.

* **Framework Principal:** React Router v7
* **Librería de UI:** React
* **Estilizado:** Tailwind CSS
* **Lenguaje:** TypeScript
* **Infraestructura:** Docker & Docker Compose (Entorno Vite)

## 🚀 Instalación y Despliegue

### 1. Crear y levantar el contenedor
Para construir la imagen necesaria y crear el contenedor de desarrollo por primera vez (o aplicar cambios en la configuración), ejecuta:

```bash
docker compose --env-file ./deploy/.env up -d --build app-tareas-front
```


En el momento que ya este creado y necesites levantar el proyecto se hara con el sigueinte comando

```bash
docker-compose --env-file ./deploy/.env up
```

### 🛠️ Configuración de Red (Docker Network)
Para que los servicios de app-tareas-front puedan comunicarse entre sí mediante nombres de dominio internos, es necesario crear una red puente (bridge network) en Docker antes de levantar los contenedores. 
### 1. Crear la red
Ejecuta el siguiente comando en tu terminal:
```bash
docker network create tareas-network
```

### 2. Verificar la red
Puedes confirmar que la red se ha creado correctamente con:
```bash
docker network ls
```
[!TIP] **Puedes levantar todo el proyecto asegurándote de que la red exista con este "one-liner":**
```bash
docker network create tareas-network 2>/dev/null || true && docker-compose up -d
```


## 🔄 testeo de front

Frontend — app/services/taskServices.test.ts
Testea el servicio de tareas mockeando apiConfig.fetch con vi.spyOn:

getAll — verifica que llame a GET /tasks con los query params correctos.
create — verifica POST /tasks con el body, y que lance error si la respuesta falla.
update — verifica PUT /tasks/:id con el body.
delete — verifica DELETE /tasks/:id y que lance error si falla.

```bash
docker exec -w /app app-tareas-backend npm test
```