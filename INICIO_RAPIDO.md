# 🚀 INICIO RÁPIDO - Sistema de Gestión Académica

## Pasos para Empezar (5 minutos)

### Paso 1: Preparar la Base de Datos

Abre **MySQL Workbench** o **MySQL CLI** y ejecuta:

```sql
CREATE DATABASE desafio2db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE desafio2db;
```

### Paso 2: Iniciar el Backend

En la carpeta del proyecto (`dwfDesafio2`):

**Windows:**
```bash
mvnw.cmd clean package
mvnw.cmd spring-boot:run
```

**Linux/Mac:**
```bash
./mvnw clean package
./mvnw spring-boot:run
```

✅ El backend debe estar corriendo en `http://localhost:8081`

### Paso 3: Abrir el Frontend

Navega a la carpeta `frontend` y abre `index.html` en tu navegador.

O con Python (para evitar problemas de CORS):

```bash
cd frontend
python -m http.server 8000
# Abre http://localhost:8000 en tu navegador
```

---

## 🔓 Iniciar Sesión

**Credenciales de prueba:**
- Usuario: `admin`
- Contraseña: `admin123`

O crea un nuevo usuario haciendo clic en "Registrarse".

---

## ✨ Funcionalidades Disponibles

### 📊 Dashboard
- Resumen de estadísticas
- Total de alumnos, profesores y materias

### 👨‍🎓 Alumnos
- ➕ Crear nuevo alumno
- ✏️ Editar información del alumno
- 🗑️ Eliminar alumno
- 📋 Ver lista de alumnos

### 👨‍🏫 Profesores
- ➕ Crear nuevo profesor
- ✏️ Editar información del profesor
- 🗑️ Eliminar profesor
- 📋 Ver lista de profesores

### 📖 Materias
- ➕ Crear nueva materia
- ✏️ Editar materia
- ➕ Asignar profesor a materia
- 🗑️ Eliminar materia
- 📋 Ver lista de materias

### 📝 Notas (Calificaciones)
- ➕ Registrar calificación de alumno en materia
- ✏️ Actualizar calificación
- 🗑️ Eliminar calificación
- 📋 Ver lista de todas las calificaciones

---

## 🎨 Diseño

- **Moderno**: Interfaz con gradientes y sombras
- **Responsivo**: Funciona en desktop, tablet y móvil
- **Intuitivo**: Botones y formularios fáciles de usar
- **Feedback**: Notificaciones de éxito/error en cada acción

---

## 🔑 Características Técnicas

✅ Autenticación con JWT (tokens seguros)
✅ Encriptación de contraseñas con BCrypt
✅ API RESTful completa
✅ Base de datos MySQL relacional
✅ CORS habilitado para requests desde el frontend
✅ Validación de datos en frontend y backend
✅ Manejo de errores robusto

---

## 📚 Para Aprender Más

Consulta el archivo `README_COMPLETO.md` para:
- Documentación detallada
- Estructura completa del proyecto
- Ejemplos de código
- Endpoints API completos
- Troubleshooting

---

## ❓ Problemas Comunes

### "No se puede conectar al servidor"
- Verifica que MySQL está corriendo
- Verifica que Spring Boot está corriendo en puerto 8081
- Abre el navegador en `http://localhost:8081`

### "No funciona el login"
- Verifica que escribiste el usuario y contraseña correctos
- Intenta registrarte como nuevo usuario
- Abre la consola del navegador (F12) para ver errores

### "No aparecen los datos en las tablas"
- Verifica que iniciar sesión funcionó correctamente
- Intenta crear un nuevo registro
- Abre F12 y ve la consola para errores

---

## 🆘 Soporte

Si tienes problemas:
1. Abre la consola del navegador (F12)
2. Busca mensajes de error en rojo
3. Verifica los logs del servidor (ventana donde ejecutaste Spring Boot)
4. Consulta el README_COMPLETO.md

---

¡Disfruta del Sistema de Gestión Académica! 🎓
