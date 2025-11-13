# Script de despliegue para Glucosa-App Frontend (PowerShell)
# Este script construye y despliega la aplicación en un entorno de producción

Write-Host "🚀 Iniciando despliegue de Glucosa-App Frontend..." -ForegroundColor Green

# Verificar que estamos en el directorio correcto
Set-Location -Path "$PSScriptRoot\.."

# Verificar que Docker esté instalado
if (!(Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Docker no está instalado. Por favor, instala Docker primero." -ForegroundColor Red
    exit 1
}

# Verificar que Docker Compose esté instalado
if (!(Get-Command docker-compose -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Docker Compose no está instalado. Por favor, instala Docker Compose primero." -ForegroundColor Red
    exit 1
}

# Detener contenedores existentes
Write-Host "⏹ Deteniendo contenedores existentes..." -ForegroundColor Yellow
docker-compose down

# Construir imágenes
Write-Host "🏗 Construyendo imágenes Docker..." -ForegroundColor Yellow
docker-compose build

# Iniciar servicios
Write-Host "▶ Iniciando servicios..." -ForegroundColor Yellow
docker-compose up -d

# Esperar a que los servicios estén listos
Write-Host "⏳ Esperando a que los servicios estén listos..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Verificar estado de los contenedores
Write-Host "🔍 Verificando estado de los contenedores..." -ForegroundColor Yellow
docker-compose ps

# Verificar logs
Write-Host "📋 Mostrando logs recientes..." -ForegroundColor Yellow
docker-compose logs --tail=20

Write-Host "✅ Despliegue completado exitosamente!" -ForegroundColor Green
Write-Host "🌐 Frontend disponible en: http://localhost" -ForegroundColor Cyan