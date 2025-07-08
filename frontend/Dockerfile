FROM node:20-alpine
WORKDIR /app

# Pass API URL at build time so Next can inline it
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

COPY package.json package-lock.json* ./
RUN npm install
COPY . .
# Build with environment variables available
RUN npm run build

CMD ["npm", "run", "start"]
