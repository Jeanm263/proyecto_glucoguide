# ===== Builder (build React app) =====
FROM node:20-alpine AS builder
WORKDIR /app

# Copiamos package.json y package-lock (si existe) para aprovechar cache
COPY package*.json ./
# Instalamos solo dependencias de producción
RUN npm ci --only=production

# Copiamos el resto y construimos
COPY . .
RUN npm run build

# ===== Runtime (nginx server) =====
FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html

# Copiamos archivos generados por el builder
COPY --from=builder /app/dist ./dist

# Copiamos configuración de nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Creamos directorio para logs
RUN mkdir -p /var/log/nginx

# Exponemos puerto
EXPOSE 80

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]