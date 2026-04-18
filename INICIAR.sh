#!/bin/bash

# Script para iniciar el proyecto en Linux/Mac

echo ""
echo "======================================"
echo "  Sistema de Gestion Academica DWF"
echo "======================================"
echo ""

# Verificar si Maven está instalado
if ! command -v mvn &> /dev/null; then
    echo "ERROR: Maven no está instalado"
    echo "Por favor, instala Maven primero"
    exit 1
fi

# Verificar si Java está instalado
if ! command -v java &> /dev/null; then
    echo "ERROR: Java no está instalado"
    echo "Por favor, instala Java 17+ primero"
    exit 1
fi

echo "[1/2] Compilando proyecto..."
./mvnw clean package -DskipTests

if [ $? -ne 0 ]; then
    echo ""
    echo "ERROR: La compilacion falló"
    exit 1
fi

echo ""
echo "[2/2] Iniciando Spring Boot..."
echo ""
echo "El backend estará disponible en: http://localhost:8081"
echo "Swagger UI: http://localhost:8081/swagger-ui.html"
echo ""
echo "Para abrir el frontend, abre el archivo: frontend/index.html"
echo ""
echo "Credenciales de prueba:"
echo "  Usuario: admin"
echo "  Contraseña: admin123"
echo ""

./mvnw spring-boot:run
