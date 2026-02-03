# Admin Todos

Este es un proyecto de [Next.js](https://nextjs.org) inicializado con [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) que utiliza [Prisma](https://www.prisma.io/) como ORM y PostgreSQL como base de datos.

## Prerrequisitos

- **Node.js** (v18 o superior)
- **Docker** y **Docker Compose**

## Comenzar

### Paso 1: Configurar Variables de Entorno

Copia el archivo de plantilla de variables de entorno:

```bash
cp .env.template .env
```

Edita el archivo `.env` y configura la URL de la base de datos:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
```

Las variables de entorno disponibles son:
- `DATABASE_URL`: URL de conexión a la base de datos PostgreSQL

**Nota:** El archivo `.env` está incluido en `.gitignore` por seguridad. Nunca subas credenciales reales a tu repositorio.

### Paso 2: Iniciar la Base de Datos

Inicia la base de datos PostgreSQL usando Docker Compose:

```bash
docker-compose up -d
```

Esto hará lo siguiente:
- Descargará la imagen de PostgreSQL 15.3 (si aún no está descargada)
- Creará un contenedor llamado `todos-db`
- Expondrá la base de datos en el puerto `5432`
- Usará las siguientes credenciales:
  - Usuario: `postgres`
  - Contraseña: `postgres`

Los datos de la base de datos se persistirán en el directorio `./postgres`.

Para detener la base de datos:
```bash
docker-compose down
```

Para ver los logs:
```bash
docker-compose logs -f todosDB
```

### Paso 3: Instalar Dependencias

Instala las dependencias del proyecto:

```bash
npm install
# o
yarn install
# o
pnpm install
```

### Paso 4: Configurar Prisma y Ejecutar Migraciones

Este proyecto utiliza [Prisma](https://www.prisma.io/) como ORM para gestionar la base de datos.

#### Esquema de la Base de Datos

El esquema de Prisma (`prisma/schema.prisma`) define el modelo `Todo` con la siguiente estructura:

```prisma
model Todo {
  id          String   @id @default(uuid())
  description String?
  complete    Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

#### Generar el Cliente de Prisma

Genera el cliente de Prisma:

```bash
npx prisma generate
```

Este comando genera el cliente de Prisma en el directorio `src/generated/prisma`.

#### Ejecutar Migraciones

Crea y aplica las migraciones a la base de datos:

```bash
npx prisma migrate dev --name init
```

Este comando:
- Crea una nueva migración basada en los cambios en el esquema
- Aplica la migración a la base de datos
- Genera el cliente de Prisma automáticamente

#### Verificar la Base de Datos

Puedes abrir Prisma Studio para visualizar y editar tus datos:

```bash
npx prisma studio
```

Esto abrirá una interfaz gráfica en [http://localhost:5555](http://localhost:5555).

### Paso 5: Iniciar el Servidor de Desarrollo

Ejecuta el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
# o
bun dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

Puedes comenzar a editar la página modificando `app/page.tsx`. La página se actualiza automáticamente mientras editas el archivo.

## Uso de Prisma en la Aplicación

### Instanciar el Cliente

Para usar Prisma en tu aplicación, importa el cliente generado:

```typescript
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

// Usa prisma en tus queries
const todos = await prisma.todo.findMany();
```

### Operaciones Comunes

```typescript
// Crear un nuevo todo
const newTodo = await prisma.todo.create({
  data: {
    description: 'Mi primera tarea',
    complete: false,
  },
});

// Obtener todos los todos
const allTodos = await prisma.todo.findMany();

// Obtener un todo por ID
const todo = await prisma.todo.findUnique({
  where: { id: 'uuid-del-todo' },
});

// Actualizar un todo
const updatedTodo = await prisma.todo.update({
  where: { id: 'uuid-del-todo' },
  data: { complete: true },
});

// Eliminar un todo
const deletedTodo = await prisma.todo.delete({
  where: { id: 'uuid-del-todo' },
});
```

## Conexión a la Base de Datos

La base de datos PostgreSQL es accesible en:
- **Host:** localhost
- **Puerto:** 5432
- **Usuario:** postgres
- **Contraseña:** postgres

Puedes conectarte usando herramientas como pgAdmin, DBeaver, o la línea de comandos psql:

```bash
psql -h localhost -U postgres
```

## Comandos de Prisma Útiles

```bash
# Generar el cliente de Prisma
npx prisma generate

# Crear y aplicar una migración
npx prisma migrate dev --name nombre-migracion

# Aplicar migraciones en producción
npx prisma migrate deploy

# Ver el historial de migraciones
npx prisma migrate status

# Abrir Prisma Studio
npx prisma studio

# Formatear el esquema
npx prisma format

# Validar el esquema
npx prisma validate

# Limpiar la base de datos (¡cuidado, esto borra todo!)
npx prisma migrate reset

# Pull del esquema desde la base de datos existente
npx prisma db pull
```

## Estructura del Proyecto

```
03-admin-todos/
├── prisma/
│   ├── schema.prisma          # Esquema de la base de datos
│   ├── migrations/           # Historial de migraciones
│   └── seed.ts               # Script de seeding (opcional)
├── prisma.config.ts          # Configuración centralizada de Prisma
├── .env                      # Variables de entorno (no en git)
├── .env.template             # Plantilla de variables de entorno
├── docker-compose.yml        # Configuración de Docker Compose
├── src/
│   └── generated/
│       └── prisma/          # Cliente de Prisma generado
└── package.json
```

## Aprende Más

### Next.js
- [Documentación de Next.js](https://nextjs.org/docs) - aprende sobre las características y API de Next.js.
- [Learn Next.js](https://nextjs.org/learn) - un tutorial interactivo de Next.js.

### Prisma
- [Documentación de Prisma](https://www.prisma.io/docs) - guía completa de Prisma.
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference) - referencia del esquema.
- [Prisma Client API](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference) - referencia del cliente.

Puedes revisar el [repositorio de Next.js en GitHub](https://github.com/vercel/next.js) y el [repositorio de Prisma](https://github.com/prisma/prisma) - ¡tus comentarios y contribuciones son bienvenidos!

## Desplegar en Vercel

La forma más fácil de desplegar tu aplicación Next.js es usar la [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) de los creadores de Next.js.

### Variables de Entorno en Producción

Al desplegar en producción, necesitarás:
1. Una base de datos PostgreSQL (puedes usar Supabase, Neon, Railway, etc.)
2. Configurar la variable `DATABASE_URL` en las configuraciones de Vercel
3. Ejecutar `npx prisma migrate deploy` durante el build para aplicar las migraciones

Consulta nuestra [documentación de despliegue de Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para más detalles.
