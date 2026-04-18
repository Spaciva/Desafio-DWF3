# 📚 Sistema de Gestión Académica - Desafío DWF

## Descripción del Proyecto

Sistema completo de gestión académica desarrollado con **Spring Boot 3** y **MySQL**, con un frontend web moderno que incluye:

- ✅ **Autenticación JWT**: Registro e inicio de sesión seguro
- ✅ **CRUD Completo**: Gestión de Alumnos, Profesores, Materias y Notas
- ✅ **Diseño Responsivo**: Interfaz moderna y atractiva
- ✅ **API RESTful**: Backend completamente funcional

---

## 🚀 Requisitos Previos

Asegúrate de tener instalado:

- **Java 17** o superior
- **MySQL 8.0** o superior
- **Maven 3.6** o superior
- **Navegador web moderno** (Chrome, Firefox, Edge, Safari)

---

## 📦 Instalación

### 1. Configurar la Base de Datos

Abre MySQL y ejecuta los siguientes comandos:

```sql
-- Crear base de datos
CREATE DATABASE desafio2db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Usar la base de datos
USE desafio2db;
```

### 2. Iniciar el Backend Spring Boot

En la carpeta raíz del proyecto:

```bash
# Si usas Linux/Mac
./mvnw clean package
./mvnw spring-boot:run

# Si usas Windows
mvnw.cmd clean package
mvnw.cmd spring-boot:run
```

El backend estará disponible en: `http://localhost:8081`

Swagger UI: `http://localhost:8081/swagger-ui.html`

### 3. Abrir el Frontend

Navega a la carpeta `frontend` y abre el archivo `index.html` en tu navegador:

```bash
cd frontend
# Abre index.html en tu navegador
# O puedes usar un servidor web local:
python -m http.server 8000
# Luego accede a http://localhost:8000
```

---

## 🔐 Credenciales de Prueba

**Usuario Administrador (creado automáticamente):**
- Usuario: `admin`
- Contraseña: `admin123`

**Crear un nuevo usuario:**
- Haz clic en "Registrarse"
- Completa los campos
- ¡Listo! Ya puedes acceder con tus credenciales

---

## 📊 Características Principales

### 1. **Autenticación**
- Registro de nuevos usuarios
- Inicio de sesión con generación de token JWT
- Las rutas privadas requieren token válido
- Cierre de sesión seguro

### 2. **Gestión de Alumnos**
- Ver lista de alumnos
- Crear nuevo alumno
- Editar información del alumno
- Eliminar alumno

### 3. **Gestión de Profesores**
- Ver lista de profesores
- Crear nuevo profesor
- Editar información del profesor
- Eliminar profesor
- Asignar profesores a materias

### 4. **Gestión de Materias**
- Ver lista de materias
- Crear nueva materia
- Asignar profesor a materia
- Editar materia
- Eliminar materia

### 5. **Gestión de Notas**
- Registrar calificaciones de alumnos en materias
- Ver calificaciones por alumno
- Actualizar calificaciones
- Eliminar registros de notas

### 6. **Dashboard**
- Resumen estadístico
- Total de alumnos, profesores y materias

---

## 🏗️ Estructura del Proyecto

```
dwfDesafio2/
├── src/
│   ├── main/
│   │   ├── java/udb/edu/sv/desafiodwf/
│   │   │   ├── DesafioDwfApplication.java
│   │   │   ├── config/
│   │   │   │   ├── SecurityConfig.java
│   │   │   │   ├── JwtUtils.java
│   │   │   │   ├── JwtAuthenticationFilter.java
│   │   │   │   └── DataInitializer.java
│   │   │   ├── controller/
│   │   │   │   ├── AuthController.java
│   │   │   │   ├── AlumnoController.java
│   │   │   │   ├── ProfesorController.java
│   │   │   │   ├── MateriaController.java
│   │   │   │   └── AlumnoMateriaController.java
│   │   │   ├── domain/
│   │   │   │   ├── Alumno.java
│   │   │   │   ├── Profesor.java
│   │   │   │   ├── Materia.java
│   │   │   │   ├── AlumnoMateria.java
│   │   │   │   ├── AlumnoMateriaId.java
│   │   │   │   └── AppUser.java
│   │   │   ├── repository/
│   │   │   │   ├── AlumnoRepository.java
│   │   │   │   ├── ProfesorRepository.java
│   │   │   │   ├── MateriaRepository.java
│   │   │   │   ├── AlumnoMateriaRepository.java
│   │   │   │   └── AppUserRepository.java
│   │   │   └── service/
│   │   │       ├── AlumnoService.java
│   │   │       ├── ProfesorService.java
│   │   │       ├── MateriaService.java
│   │   │       ├── AlumnoMateriaService.java
│   │   │       └── AppUserService.java
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── schema.sql
│   │       └── data.sql
│   └── test/
│       └── java/udb/edu/sv/desafiodwf/
│           └── PersistenciaDesafioTest.java
├── frontend/
│   ├── index.html
│   ├── css/
│   │   └── styles.css
│   └── js/
│       ├── api.js
│       ├── ui.js
│       └── main.js
├── pom.xml
└── README.md
```

---

## 🔌 Endpoints API

### Autenticación
- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/me` - Obtener datos del usuario actual

### Alumnos
- `GET /api/alumnos` - Listar alumnos
- `POST /api/alumnos` - Crear alumno
- `PUT /api/alumnos/{id}` - Actualizar alumno
- `DELETE /api/alumnos/{id}` - Eliminar alumno

### Profesores
- `GET /api/profesores` - Listar profesores
- `POST /api/profesores` - Crear profesor
- `PUT /api/profesores/{id}` - Actualizar profesor
- `DELETE /api/profesores/{id}` - Eliminar profesor

### Materias
- `GET /api/materias` - Listar materias
- `POST /api/materias` - Crear materia
- `PUT /api/materias/{id}` - Actualizar materia
- `DELETE /api/materias/{id}` - Eliminar materia

### Notas (Calificaciones)
- `GET /api/alumno-materia` - Listar calificaciones
- `POST /api/alumno-materia` - Crear calificación
- `PUT /api/alumno-materia/{idAlumno}/{idMateria}` - Actualizar calificación
- `DELETE /api/alumno-materia/{idAlumno}/{idMateria}` - Eliminar calificación

---

## 🔐 Seguridad

### Características de Seguridad Implementadas:

1. **JWT (JSON Web Tokens)**
   - Tokens seguros con firma HMAC-SHA256
   - Expiración de tokens en 24 horas
   - Token enviado en header `Authorization: Bearer {token}`

2. **Password Encoding**
   - Contraseñas encriptadas con BCrypt
   - Nunca se almacenan en texto plano

3. **CORS**
   - Configurado para permitir requests desde el frontend
   - Protección contra ataques CSRF

4. **Validación**
   - Validación de datos en frontend y backend
   - Constraints en las entidades JPA

---

## 📝 Ejemplos de Uso

### 1. Registrar un usuario

```javascript
// En el frontend
const response = await fetch('http://localhost:8081/api/auth/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username: 'juan',
        password: 'password123'
    })
});

const data = await response.json();
console.log('Token:', data.token);
```

### 2. Crear un alumno

```javascript
const response = await fetch('http://localhost:8081/api/alumnos', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
        nombre: 'Juan',
        apellido: 'Pérez'
    })
});

const alumno = await response.json();
```

---

## 🐛 Troubleshooting

### Error: "Connection refused" en puerto 8081
- Verifica que Spring Boot esté corriendo
- Comprueba que no haya otro proceso usando el puerto
- Intenta cambiar el puerto en `application.properties`

### Error: "No se puede conectar a la base de datos"
- Verifica que MySQL está corriendo
- Comprueba las credenciales en `application.properties`
- Asegúrate de que la base de datos `desafio2db` existe

### Error: "404 Not Found" en los endpoints
- Verifica que el token es válido
- Asegúrate de incluir el header `Authorization: Bearer {token}`
- Verifica que la URL es correcta

### El frontend no carga datos
- Abre la consola del navegador (F12)
- Comprueba los errores en la consola
- Verifica que el backend está corriendo en puerto 8081

---

## 📖 Guía de Uso del Frontend

### Interfaz Principal
1. **Header**: Muestra el usuario actual y botón de cerrar sesión
2. **Sidebar**: Menú de navegación con secciones principales
3. **Contenido Principal**: Muestra tablas y formularios según la sección

### Flujo Típico
1. Registrarse o iniciar sesión
2. Ver Dashboard (resumen estadístico)
3. Navegar a cada sección (Alumnos, Profesores, Materias, Notas)
4. Realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar)

### Crear un Nuevo Registro
1. Haz clic en el botón "+ Nuevo..." en la sección
2. Completa el formulario modal
3. Haz clic en "Guardar"
4. Se mostrará una notificación de éxito

### Editar un Registro
1. Haz clic en el botón "✏️ Editar" en la fila del registro
2. Modifica los valores en el formulario modal
3. Haz clic en "Guardar"

### Eliminar un Registro
1. Haz clic en el botón "🗑️ Eliminar" en la fila del registro
2. Confirma la eliminación
3. El registro será removido

---

## 🛠️ Tecnologías Utilizadas

### Backend
- **Spring Boot 3.3.9**: Framework web Java
- **Spring Data JPA**: Acceso a datos
- **Spring Security**: Autenticación y autorización
- **JWT (JJWT)**: Tokens de autenticación
- **MySQL**: Base de datos relacional
- **Maven**: Gestor de dependencias

### Frontend
- **HTML5**: Estructura del contenido
- **CSS3**: Estilos y responsive design
- **JavaScript Vanilla**: Lógica e interactividad
- **Fetch API**: Comunicación con el backend

---

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

## ✅ Checklist de Completación

- [x] Clases de dominio (Alumno, Profesor, Materia, Nota, Usuario)
- [x] Configuración de MySQL en application.properties
- [x] Autenticación con JWT
- [x] CRUD completo para Alumnos
- [x] CRUD completo para Profesores
- [x] CRUD completo para Materias
- [x] CRUD completo para Notas
- [x] Frontend web completo
- [x] Login y registro de usuarios
- [x] Diseño moderno y responsivo
- [x] Validación de datos
- [x] Manejo de errores
- [x] Notificaciones de usuario

---

## 👨‍💻 Autor

Desarrollado como parte del Desafío DWF - Universidad Don Bosco

---

¡Gracias por usar el Sistema de Gestión Académica! 🎓
