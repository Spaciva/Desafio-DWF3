@echo off
REM Script para iniciar el proyecto en Windows

echo.
echo ======================================
echo  Sistema de Gestion Academica DWF
echo ======================================
echo.

REM Verificar si Maven está instalado
where mvn >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Maven no está instalado o no está en el PATH
    echo Por favor, verifica la instalación de Maven
    pause
    exit /b 1
)

REM Verificar si Java está instalado
where java >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Java no está instalado o no está en el PATH
    echo Por favor, verifica la instalación de Java 17+
    pause
    exit /b 1
)

echo [1/2] Compilando proyecto...
call mvnw.cmd clean package -DskipTests

if %errorlevel% neq 0 (
    echo.
    echo ERROR: La compilacion falló
    pause
    exit /b 1
)

echo.
echo [2/2] Iniciando Spring Boot...
echo.
echo El backend estará disponible en: http://localhost:8081
echo Swagger UI: http://localhost:8081/swagger-ui.html
echo.
echo Para abrir el frontend, abre el archivo: frontend/index.html
echo.
echo Credenciales de prueba:
echo   Usuario: admin
echo   Contraseña: admin123
echo.

call mvnw.cmd spring-boot:run

pause
