# Usa una imagen base de Node.js
FROM node:18-alpine AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de definición de paquetes e instala dependencias
COPY package.json package-lock.json ./
RUN npm install --omit=dev

# Copia el resto del código de la aplicación
COPY . .

# Compila la aplicación (cliente y servidor)
RUN npm run build

# Etapa de producción
FROM node:18-alpine

WORKDIR /app

# Copia solo los artefactos necesarios de la etapa de construcción
COPY --from=builder /app/package.json /app/package-lock.json ./
RUN npm install --omit=dev --ignore-scripts

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Expone el puerto en el que corre la aplicación
EXPOSE 5001

# Establece el entorno a producción
ENV NODE_ENV=production

# Comando para iniciar la aplicación
CMD ["node", "dist/index.js"]