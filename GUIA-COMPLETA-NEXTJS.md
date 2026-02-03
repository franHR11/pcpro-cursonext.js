# 🚀 GUÍA DEFINITIVA DE NEXT.JS
## Todo sobre Next.js desde la instalación al despliegue - Nivel DAM (Desarrollo de Aplicaciones Multiplataforma)
### 🆕 ACTUALIZADA A PRISMA 7.0+ - Septiembre 2024

---

## 📑 ÍNDICE

1. [Introducción a Next.js](#1-introducción-a-nextjs)
2. [Instalación y Configuración Inicial](#2-instalación-y-configuración-inicial)
3. [Estructura del Proyecto](#3-estructura-del-proyecto)
4. [El App Router](#4-el-app-router)
5. [Convenciones de Archivos Especiales](#5-convenciones-de-archivos-especiales)
6. [Layouts y Pages](#6-layouts-y-pages)
7. [Estilos y Tailwind CSS](#7-estilos-y-tailwind-css)
8. [Google Fonts](#8-google-fonts)
9. [Componentes y Reutilización](#9-componentes-y-reutilización)
10. [Enrutamiento Dinámico](#10-enrutamiento-dinámico)
11. [API Routes](#11-api-routes)
12. [Estado y Datos](#12-estado-y-datos)
13. [Optimización de Imágenes](#13-optimización-de-imágenes)
14. [SEO y Metadatos](#14-seo-y-metadatos)
15. [Error Handling](#15-error-handling)
16. [Desarrollo Local](#16-desarrollo-local)
17. [Build y Producción](#17-build-y-producción)
18. [Despliegue](#18-despliegue)
19. [Integración con Prisma ORM](#19-integración-con-prisma-orm)
20. [Buenas Prácticas](#20-buenas-prácticas)
21. [Recursos Adicionales](#21-recursos-adicionales)

---

## 1. INTRODUCCIÓN A NEXT.JS

### ¿Qué es Next.js?

**Next.js** es un framework de React que proporciona una infraestructura completa para construir aplicaciones web modernas. Es mantenido por Vercel y es uno de los frameworks más populares en el ecosistema de JavaScript.

### Características Principales

- ✅ **Server-Side Rendering (SSR)**: Renderización en el servidor para mejor SEO
- ✅ **Static Site Generation (SSG)**: Generación de sitios estáticos ultra rápidos
- ✅ **Incremental Static Regeneration (ISR)**: Regeneración estática incremental
- ✅ **File-based Routing**: Enrutamiento basado en archivos
- ✅ **API Routes**: Crear API endpoints directamente en Next.js
- ✅ **Image Optimization**: Optimización automática de imágenes
- ✅ **Code Splitting**: División de código automática
- ✅ **Font Optimization**: Optimización automática de fuentes
- ✅ **TypeScript Support**: Soporte nativo de TypeScript

### App Router vs Pages Router

| Característica | App Router | Pages Router |
|---------------|------------|-------------|
| Directorio | /app | /pages |
| Soporte | Recomendado (desde v13) | Antiguo (aún soportado) |
| Server Components | ✅ Predeterminado | ❌ No soportado |
| Streaming | ✅ | ❌ |
| Layouts Anidados | ✅ Nativo | Manual |

> **Nota para DAM**: Esta guía se centra en **App Router** (el directorio `/app`), que es el estándar actual y lo que aprenderán en el desarrollo profesional.

---

## 2. INSTALACIÓN Y CONFIGURACIÓN INICIAL

### Requisitos Previos

- **Node.js**: Versión 18.17 o superior
- **npm** (o yarn, pnpm) - instalado con Node.js
- Editor de código: Visual Studio Code (recomendado)

### Instalación - Opción 1: Interactive (Interactiva)

```bash
npx create-next-app@latest
```

**Preguntas que aparecerán y respuestas recomendadas**:

```
Would you like to use TypeScript? → Yes (Sí)
Would you like to use ESLint? → Yes (Sí)
Would you like to use Tailwind CSS? → Yes (Sí)
Would you like to use `src/` directory? → No (aunque puedes decir Yes)
Would you like to use App Router? → Yes (recomendado) → Yes (Sí)
Would you like to customize the default import alias (@/*)? → No (No)
```

### Instalación - Opción 2: Non-Interactive (No interactiva)

```bash
npx create-next-app@latest mi-app-next --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"
```

**Parámetros explicados**:

| Parámetro | Significado |
|-----------|-------------|
| `--typescript` | Incluye TypeScript |
| `--tailwind` | Configura Tailwind CSS |
| `--eslint` | Configura ESLint |
| `--app` | Usa App Router (recomendado) |
| `--no-src-dir` | No crea carpeta src (todo en raíz) |
| `--import-alias "@/*"` | Alias de importación |

### Estructura Generada Inicial

```
mi-app-next/
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   └── (archivos estáticos)
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── ... (otros archivos de configuración)
```

### Instalar Dependencias Adicionales

```bash
# Entrar en el proyecto
cd mi-app-next

# Si quieres instalar más librerías después
npm install nombre-paquete
npm install nombre-paquete --save-dev   # Solo desarrollo
```

### Actualizar Dependencias (npm-check-updates)

Es muy útil tener una herramienta para gestionar las versiones de tus dependencias.

**Instalación Global**:
```bash
npm install -g npm-check-updates
```

**Uso**:
```bash
# 1. Comprobar actualizaciones disponibles
ncu

# 2. Actualizar el package.json (sobrescribe versiones)
ncu -u

# 3. Instalar las nuevas versiones
npm install
```

---

## 3. ESTRUCTURA DEL PROYECTO

### Directorio `/app` (App Router)

El directorio **app** es el corazón de Next.js con App Router. Cada carpeta representa una ruta URL.

**Ejemplo de estructura completa**:

```
app/
├── (auth)/                    # Grupo de rutas (sin URL)
│   ├── login/
│   │   └── page.tsx          # /login
│   └── register/
│       └── page.tsx          # /register
├── (dashboard)/              # Grupo de rutas (sin URL)
│   ├── layout.tsx           # Layout compartido
│   ├── settings/
│   │   └── page.tsx          # /settings
│   └── profile/
│       └── page.tsx          # /profile
├── blog/                     # Ruta con segmento
│   ├── page.tsx              # /blog
│   ├── [slug]/              # Ruta dinámica
│   │   ├── page.tsx          # /blog/mi-post
│   │   └── edit/
│   │       └── page.tsx      # /blog/mi-post/edit
│   └── new/
│       └── page.tsx          # /blog/new
├── api/                      # API Routes
│   ├── users/
│   │   └── route.ts         # GET/POST /api/users
│   └── posts/
│   │   ├── [id]/
│   │   │   └── route.ts     # GET/PATCH/DELETE /api/posts/1
│   │   └── route.ts         # GET/POST /api/posts
├── favicon.ico
├── globals.css
├── layout.tsx                # Layout raíz
├── loading.tsx               # Loading global
├── error.tsx                 # Error global
├── not-found.tsx             # 404 global
└── page.tsx                  # Home (/)
```

### Otros Directorios Importantes

```
proyecto/
├── components/                # Componentes reutilizables
│   ├── ui/                   # Componentes UI básicos
│   ├── forms/                # Componentes de formularios
│   └── layout/               # Componentes de layout
├── lib/                      # Utilidades y funciones
│   ├── utils.ts              # Funciones helper
│   ├── api.ts                Cliente API
│   └── validations.ts        Validaciones
├── hooks/                    # Custom React Hooks
├── types/                    # Definiciones TypeScript
├── public/                   # Archivos estáticos
│   ├── images/               # Imágenes
│   ├── icons/                # Iconos
│   └── fonts/                # Fuentes personalizadas
├── styles/                   # Estilos adicionales
│   └── modules/              # CSS Modules
└── config/                   # Configuraciones
    └── constants.ts          # Constantes de la app
```

### Archivos de Configuración

| Archivo | Propósito |
|---------|-----------|
| `next.config.ts` | Configuración de Next.js |
| `tsconfig.json` | Configuración TypeScript |
| `tailwind.config.ts` | Configuración Tailwind CSS |
| `postcss.config.mjs` | Configuración PostCSS |
| `.eslintrc.json` | Configuración ESLint |
| `.gitignore` | Archivos ignorados por Git |

---

## 4. EL APP ROUTER

### ¿Cómo funciona el enrutamiento?

Next.js usa **File-based Routing**: cada archivo `page.tsx` en una carpeta crea una ruta URL.

**Reglas principales**:

1. 📁 **Carpeta** = Segmento de URL
2. 📄 `page.tsx` = Página accesible
3. 🎨 `layout.tsx` = UI compartida
4. 📂 `(nombre)` = Grupo de rutas (no afecta URL)

### Ejemplo de Rutas

```
Estructura de carpetas          → URL generada
─────────────────────────────    ──────────────────
app/page.tsx                     → /
app/about/page.tsx               → /about
app/products/page.tsx            → /products
app/products/[id]/page.tsx       → /products/123
app/products/[id]/edit/page.tsx → /products/123/edit
app/blog/[slug]/page.tsx        → /blog/mi-articulo
```

### Grupos de Rutas

Los grupos entre paréntesis `(nombre)` NO afectan la URL pero sirven para organizar mejor el código.

```
app/
├── (marketing)/
│   ├── about/page.tsx       → /about (no /marketing-about)
│   ├── contact/page.tsx     → /contact
│   └── layout.tsx           # Layout para marketing
├── (app)/
│   ├── dashboard/page.tsx   → /dashboard
│   └── settings/page.tsx    → /settings
└── layout.tsx               # Layout raíz
```

**Ventajas de los grupos**:
- ✅ Organización lógica del código
- ✅ Layouts diferentes para secciones
- ✅ Mantiene URLs limpias y cortas

---

## 5. CONVENCIONES DE ARCHIVOS ESPECIALES

Next.js tiene **convenciones de nombres especiales** que crean comportamientos automáticos.

### Lista Completa de Archivos Especiales

| Archivo | Propósito | Rutas Afectadas |
|---------|-----------|-----------------|
| **page.tsx** | Página principal | ✅ Crea ruta |
| **layout.tsx** | UI compartida | ✅ Aplica a página y subpáginas |
| **loading.tsx** | Estado de carga | ✅ Muestra mientras carga |
| **error.tsx** | Manejo de errores | ✅ Captura errores en la ruta |
| **not-found.tsx** | Página 404 | ✅ Cuando no se encuentra la ruta |
| **template.tsx** | Reinicia componentes | Raro, casos específicos |
| **route.ts** | API endpoint | ✅ Crea API route |

### Jerarquía de Archivos

```
app/
├── productos/
│   ├── page.tsx           # Obligatorio para crear la ruta /productos
│   ├── layout.tsx         # Opcional: layout para /productos y subrutas
│   ├── loading.tsx        # Opcional: loading para /productos
│   ├── error.tsx          # Opcional: error handling para /productos
│   └── not-found.tsx      # Opcional: 404 específico para /productos
```

### Detalle de Cada Archivo Especial

---

### 📄 **page.tsx** - La Página

**Es obligatorio para crear una ruta accesible.**

```tsx
// app/productos/page.tsx
export default function ProductosPage() {
  return (
    <div>
      <h1>Nuestros Productos</h1>
      <p>Lista de productos...</p>
    </div>
  );
}
```

**Con datos (Server Component - predeterminado)**:

```tsx
// app/productos/page.tsx
async function getProductos() {
  const res = await fetch('https://api.ejemplo.com/productos', {
    next: { revalidate: 3600 } // Revalidar cada hora (ISR)
  });
  
  if (!res.ok) throw new Error('Error cargando productos');
  
  return res.json();
}

export default async function ProductosPage() {
  const productos = await getProductos();
  
  return (
    <div>
      <h1>Productos</h1>
      <ul>
        {productos.map((p: any) => (
          <li key={p.id}>{p.nombre} - ${p.precio}</li>
        ))}
      </ul>
    </div>
  );
}
```

**Client Component (cuando necesitas interactividad)**:

```tsx
// app/productos/page.tsx
'use client';

import { useState } from 'react';

export default function ProductosPage() {
  const [contador, setContador] = useState(0);
  
  return (
    <div>
      <h1>Productos</h1>
      <p>Productos vistos: {contador}</p>
      <button onClick={() => setContador(c => c + 1)}>
        Incrementar
      </button>
    </div>
  );
}
```

---

### 🎨 **layout.tsx** - Layout Compartido

**Define la UI que se mantiene consistente entre páginas.**

```tsx
// app/productos/layout.tsx
import Link from 'next/link';

export default function ProductosLayout({
  children,  // ← Contenido de las páginas hijas
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Header del layout - SE MUESTRA EN TODAS LAS SUBRUTAS */}
      <header className="bg-blue-500 text-white p-4">
        <h1>Productos</h1>
      </header>
      
      {/* Sidebar de navegación */}
      <nav className="flex gap-4 p-4">
        <Link href="/productos">Todos</Link>
        <Link href="/productos/featured">Destacados</Link>
        <Link href="/productos/new">Nuevos</Link>
      </nav>
      
      {/* CONTENIDO DINÁMICO DE PÁGINAS HIJAS */}
      <main className="p-4">
        {children}
      </main>
      
      {/* Footer del layout */}
      <footer className="p-4 text-center text-gray-500">
        © 2024 Mi Tienda
      </footer>
    </div>
  );
}
```

**Layout Anidado (múltiples niveles)**:

```
app/
├── layout.tsx           # Layout raíz (html, body, fonts globales)
│
└── productos/
    ├── layout.tsx       # Layout de productos (sidebar, header productos)
    │
    └── [id]/
        ├── layout.tsx   # Layout del producto específico (breadcrumbs)
        └── page.tsx     # Página del producto
```

**Resultado**: Una página hereda TODOS los layouts en su ruta.

---

### ⏳ **loading.tsx** - Estado de Carga

**Se muestra automáticamente mientras carga la página o sus datos.**

```tsx
// app/productos/loading.tsx
export default function ProductosLoading() {
  // Skeleton UI - Esqueleto de carga
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex gap-4">
            <div className="h-24 w-24 bg-gray-300 rounded"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

**Con componente de loading reutilizable**:

```tsx
// components/ui/loading-skeleton.tsx
export function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>
  );
}

// app/productos/loading.tsx
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';

export default function ProductosLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <LoadingSkeleton key={i} />
      ))}
    </div>
  );
}
```

---

### ❌ **error.tsx** - Manejo de Errores

**Captura errores ocurridos en la página o sus componentes.**

```tsx
// app/productos/error.tsx
'use client';

import { useEffect } from 'react';

export default function Error({
  error,      // Error instance
  reset,      // Función para intentar recuperar
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log del error al servicio de error tracking
    console.error('Error en página de productos:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-red-500 text-6xl mb-4">😱</div>
      <h2 className="text-2xl font-bold mb-2">
        ¡Algo salió mal!
      </h2>
      <p className="text-gray-600 mb-6">
        {error.message || 'Ha ocurrido un error inesperado'}
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Intentar de nuevo
        </button>
        <button
          onClick={() => window.location.href = '/'}
          className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
}
```

---

### 🚫 **not-found.tsx** - Página 404

**Se muestra cuando la ruta no existe.** Puedes crear uno global o uno específico por ruta.

```tsx
// app/not-found.tsx (404 global)
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-9xl font-bold text-gray-300 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Página no encontrada
      </h2>
      <p className="text-gray-600 mb-8 max-w-md text-center">
        Lo sentimos, no pudimos encontrar la página que estás buscando.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
```

**404 específico para una ruta**:

```tsx
// app/productos/[id]/not-found.tsx
import Link from 'next/link';

export default function ProductoNotFound() {
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        Producto no encontrado
      </h2>
      <p className="text-gray-600 mb-6">
        El producto que buscas no existe o ha sido eliminado.
      </p>
      <Link
        href="/productos"
        className="text-blue-600 hover:underline"
      >
        Ver todos los productos
      </Link>
    </div>
  );
}
```

**Cómo usarlo desde una página**:

```tsx
// app/productos/[id]/page.tsx
import { notFound } from 'next/navigation';

async function getProducto(id: string) {
  const res = await fetch(`https://api.ejemplo.com/productos/${id}`);
  
  if (!res.ok) {
    return null;  // ← Si retorna null, mostrará not-found.tsx
  }
  
  return res.json();
}

export default async function ProductoPage({ params }: { params: { id: string } }) {
  const producto = await getProducto(params.id);
  
  // Si el producto no existe, muestra el not-found.tsx
  if (!producto) {
    notFound();
  }
  
  return <div>Producto: {producto.nombre}</div>;
}
```

---

## 6. LAYOUTS Y PAGES

### Layout Raíz (app/layout.tsx)

Este es el layout MÁS importante - envuelve toda la aplicación.

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Configuración de fuente
const font = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Metadatos de toda la aplicación
export const metadata: Metadata = {
  title: "Mi Aplicación Next.js",
  description: "Una aplicación increíble con Next.js",
  keywords: ["nextjs", "react", "typescript"],
  authors: [{ name: "Tu Nombre" }],
  openGraph: {
    title: "Mi Aplicación Next.js",
    description: "Una aplicación increíble",
    type: "website",
  },
};

export default function RootLayout({
  children,  // ← Contenido de todas las páginas
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${font.variable} font-sans antialiased`}>
        {/* Navbar global */}
        <nav className="bg-blue-600 text-white p-4">
          <ul className="flex gap-6">
            <li><Link href="/">Inicio</Link></li>
            <li><Link href="/productos">Productos</Link></li>
            <li><Link href="/contacto">Contacto</Link></li>
          </ul>
        </nav>
        
        {/* Contenido principal de cada página */}
        <main className="min-h-screen">
          {children}
        </main>
        
        {/* Footer global */}
        <footer className="bg-gray-800 text-white p-8 text-center">
          <p>© {new Date().getFullYear()} Mi Aplicación. Todos los derechos reservados.</p>
        </footer>
      </body>
    </html>
  );
}
```

### Múltiples Layouts

Cada carpeta puede tener su propio `layout.tsx`.

```
app/
├── layout.tsx              # Layout raíz (aplica a TODO)
│
├── dashboard/
│   ├── layout.tsx          # Layout para dashboard (sidebar usuario)
│   └── page.tsx            # /dashboard
│
├── settings/
│   ├── layout.tsx          # Layout heredado de dashboard
│   └── page.tsx            # /dashboard/settings
│
└── admin/
    ├── layout.tsx          # Layout admin (diferente color/sidebar)
    └── page.tsx            # /admin
```

---

## 7. ESTILOS Y TAILWIND CSS

### Configuración de Tailwind CSS

Next.js ya viene preconfigurado con Tailwind CSS 4+.

```tsx
// app/globals.css
@import "tailwindcss";

/* Tus estilos globales adicionales */
@layer base {
  body {
    @apply bg-gray-50 text-gray-900;
  }
  
  h1 {
    @apply text-3xl font-bold text-gray-900;
  }
}

@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition;
  }
  
  .card {
    @apply bg-white border rounded-lg shadow-sm p-6;
  }
}
```

### CSS Modules (Estilos por componente)

Crea archivos `.module.css`:

```css
/* estilos/productos.module.css */
.productCard {
  @apply bg-white border rounded-lg overflow-hidden shadow-sm;
  transition: transform 0.2s;
}

.productCard:hover {
  transform: translateY(-4px);
}

.productImage {
  @apply w-full h-48 object-cover;
}

.productTitle {
  @apply text-lg font-semibold p-4;
}
```

```tsx
// app/productos/page.tsx
import styles from '@/estilos/productos.module.css';

export default function ProductosPage() {
  return (
    <div className={styles.productCard}>
      <img src="/imagen.jpg" alt="Producto" className={styles.productImage} />
      <h2 className={styles.productTitle}>Mi Producto</h2>
    </div>
  );
}
```

---

## 8. GOOGLE FONTS

### Configuración desde el Layout

```tsx
// app/layout.tsx
import { Inter, Playfair_Display, Roboto_Mono } from "next/font/google";

// Fuente principal (variable)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',  // Optimiza la carga
});

// Fuente para títulos
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: 'swap',
});

// Fuente monoespaciada para código
const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Mi App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable} ${robotoMono.variable}`}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
```

### Usar las fuentes en tus clases

```tsx
// app/page.tsx
export default function HomePage() {
  return (
    <div>
      {/* Usa la fuente por defecto (Inter) */}
      <h1 className="text-2xl font-bold">Título texto normal</h1>
      
      {/* Usa Inter explícitamente */}
      <p className="font-sans">Párrafo en Inter</p>
      
      {/* Usa Playfair con un div con la fuente configurada */}
      <div style={{ fontFamily: 'var(--font-playfair)' }} className="text-4xl font-bold">
        Título elegante en Playfair Display
      </div>
      
      {/* Usa Roboto Mono */}
      <code className="font-mono text-sm">
        const x = 10;
      </code>
    </div>
  );
}
```

### O en globals.css

```css
/* app/globals.css */
@import "tailwindcss";

.titulo-elegante {
  font-family: var(--font-playfair), serif;
}

.codigo {
  font-family: var(--font-roboto-mono), monospace;
}
```

---

## 9. COMPONENTES Y REUTILIZACIÓN

### Componentes Server vs Client

**Server Component (predeterminado)**:
- ✅ Renderizado en el servidor
- ✅ Puede acceder directamente a base de datos
- ✅ No puede usar hooks de React (useState, useEffect, etc.)
- ✅ Mejor rendimiento

**Client Component**:
- ✅ Interactividad (useState, useEffect, etc.)
- ✅ Eventos (onClick, onChange, etc.)
- ❌ No puede acceder a base de datos directamente
- ⚠️ Mayor tamaño del cliente

```tsx
// ✅ Server Component (predeterminado)
async function ProductCard({ id }: { id: string }) {
  const producto = await fetch(`/api/productos/${id}`).then(r => r.json());
  
  return (
    <div className="border p-4">
      <h3>{producto.nombre}</h3>
      <p>${producto.precio}</p>
    </div>
  );
}

// ❌ Esto daría error en Server Component
function ProductCard({ id }: { id: string }) {
  const [likes, setLikes] = useState(0);  // ← Error! useState no permitido
  
  // ...
}
```

**Para usar useState, marca como 'client'**:

```tsx
// ✅ Client Component (con 'use client')
'use client';

import { useState } from 'react';

function LikeButton({ id }: { id: string }) {
  const [likes, setLikes] = useState(0);
  
  return (
    <button onClick={() => setLikes(l => l + 1)}>
      ❤️ {likes} likes
    </button>
  );
}
```

### Organización de Componentes

```
components/
├── ui/                   # Componentes UI básicos
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── modal.tsx
│   └── badge.tsx
│
├── layout/               # Componentes de layout
│   ├── navbar.tsx
│   ├── footer.tsx
│   ├── sidebar.tsx
│   └── header.tsx
│
├── features/             # Componentes por característica
│   ├── products/
│   │   ├── product-card.tsx
│   │   ├── product-filter.tsx
│   │   └── product-list.tsx
│   ├── auth/
│   │   ├── login-form.tsx
│   │   └── register-form.tsx
│   └── cart/
│       ├── cart-item.tsx
│       └── cart-summary.tsx
│
└── common/               # Componentes comunes
    ├── loading-skeleton.tsx
    ├── error-boundary.tsx
    └── markdown-renderer.tsx
```

### Ejemplo de Componente Reutilizable

```tsx
// components/ui/button.tsx
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { 
      variant = 'primary', 
      size = 'md', 
      fullWidth = false,
      className = '',
      children, 
      ...props 
    },
    ref
  ) => {
    const baseClasses = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variantClasses = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
      secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
      ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
    };
    
    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };
    
    const widthClasses = fullWidth ? "w-full" : "";
    
    return (
      <button
        ref={ref}
        className={`
          ${baseClasses}
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${widthClasses}
          ${className}
        `.trim()}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
```

**Uso**:

```tsx
import Button from '@/components/ui/button';

export default function Page() {
  return (
    <div className="space-y-4">
      <Button>Botón primario</Button>
      <Button variant="secondary">Secundario</Button>
      <Button variant="danger">Eliminar</Button>
      <Button variant="ghost">Cancelar</Button>
      <Button size="lg" fullWidth>Botón grande ancho</Button>
    </div>
  );
}
```

---

## 10. ENRUTAMIENTO DINÁMICO

### Rutas Dinámicas con [corchetes]

Crea múltiples páginas desde una sola plantilla.

```
Estructura:                           URLs:
──────────                           ─────────
app/blog/[slug]/page.tsx            → /blog/primer-post
                                     → /blog/articulos-de-technology
                                     → /blog/como-aprender-nextjs
                                     
app/productos/[id]/page.tsx          → /productos/1
                                     → /productos/23
                                     → /productos/456
```

### Ejemplo Completo

```tsx
// app/productos/[id]/page.tsx
async function getProducto(id: string) {
  const res = await fetch(`https://api.ejemplo.com/productos/${id}`, {
    next: { revalidate: 3600 }  // ISR: revalidar cada hora
  });
  
  if (!res.ok) return null;
  
  return res.json();
}

export default async function ProductoPage({ 
  params 
}: { 
  params: { id: string };
}) {
  const producto = await getProducto(params.id);
  
  if (!producto) {
    notFound();  // ← Muestra app/productos/[id]/not-found.tsx
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold">{producto.nombre}</h1>
      <p className="text-2xl text-gray-600">${producto.precio}</p>
      <p>{producto.descripcion}</p>
    </div>
  );
}
```

### Generar Rutas Estáticas (Generate Static Params)

```
app/blog/[slug]/
├── page.tsx
└── generateStaticParams.ts  ← genera las rutas en build time
```

```tsx
// app/blog/[slug]/generateStaticParams.ts
export async function generateStaticParams() {
  const posts = await fetch('https://api.ejemplo.com/posts').then(res => res.json());
  
  // Retorna array de objetos con los params
  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

// Ejemplo de retorno:
// [
//   { slug: "primer-post" },
//   { slug: "como-aprender-nextjs" },
//   { slug: "articulos-tech" }
// ]
```

### Parámetros Múltiples

```
app/[categoria]/[slug]/page.tsx  → /tecnologia/inteligencia-artificial
                                      → /deportes/futbol
                                      → /entretenimiento/peliculas
```

```tsx
// app/[categoria]/[slug]/page.tsx
export default function PostPage({ 
  params 
}: { 
  params: { categoria: string; slug: string };
}) {
  return (
    <div>
      <p>Categoría: {params.categoria}</p>
      <p>Slug: {params.slug}</p>
    </div>
  );
}
```

---

## 11. API ROUTES

### Crear API Endpoints

```
app/api/usuarios/route.ts           → GET/POST /api/usuarios
app/api/usuarios/[id]/route.ts     → GET/PATCH/DELETE /api/usuarios/1
```

### GET y POST en una sola ruta

```tsx
// app/api/productos/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/productos - Obtener todos los productos
export async function GET() {
  try {
    const productos = await prisma.producto.findMany();
    return NextResponse.json(productos);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener productos' },
      { status: 500 }
    );
  }
}

// POST /api/productos - Crear un nuevo producto
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const producto = await prisma.producto.create({
      data: {
        nombre: body.nombre,
        precio: body.precio,
        descripcion: body.descripcion,
      },
    });
    
    return NextResponse.json(producto, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al crear producto' },
      { status: 500 }
    );
  }
}
```

### Ruta con ID (PUT, PATCH, DELETE)

```tsx
// app/api/productos/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/productos/123
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const producto = await prisma.producto.findUnique({
      where: { id: params.id },
    });
    
    if (!producto) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(producto);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener producto' },
      { status: 500 }
    );
  }
}

// PATCH /api/productos/123
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    const producto = await prisma.producto.update({
      where: { id: params.id },
      data: {
        nombre: body.nombre,
        precio: body.precio,
        descripcion: body.descripcion,
      },
    });
    
    return NextResponse.json(producto);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al actualizar producto' },
      { status: 500 }
    );
  }
}

// DELETE /api/productos/123
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.producto.delete({
      where: { id: params.id },
    });
    
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al eliminar producto' },
      { status: 500 }
    );
  }
}
```

### Llamar a la API desde una página

```tsx
// app/productos/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/button';

interface Producto {
  id: string;
  nombre: string;
  precio: number;
}

export default function ProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: '', precio: 0 });
  
  // Cargar productos al montar el componente
  useEffect(() => {
    fetch('/api/productos')
      .then(res => res.json())
      .then(data => {
        setProductos(data);
        setLoading(false);
      });
  }, []);
  
  // Crear nuevo producto
  const crearProducto = async () => {
    const res = await fetch('/api/productos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoProducto),
    });
    
    if (res.ok) {
      const producto = await res.json();
      setProductos([...productos, producto]);
      setNuevoProducto({ nombre: '', precio: 0 });
    }
  };
  
  if (loading) return <p>Cargando productos...</p>;
  
  return (
    <div>
      <h1>Productos</h1>
      
      {/* Formulario para crear producto */}
      <div className="mb-6 p-4 border rounded">
        <input
          type="text"
          value={nuevoProducto.nombre}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
          placeholder="Nombre del producto"
          className="border p-2 mr-2"
        />
        <input
          type="number"
          value={nuevoProducto.precio}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: parseFloat(e.target.value) })}
          placeholder="Precio"
          className="border p-2 mr-2"
        />
        <Button onClick={crearProducto}>Crear</Button>
      </div>
      
      {/* Lista de productos */}
      <ul>
        {productos.map((p) => (
          <li key={p.id} className="p-4 border rounded mb-2">
            <strong>{p.nombre}</strong> - ${p.precio}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 12. ESTADO Y DATOS

### Server Components con fetch

```tsx
// app/productos/page.tsx
async function getProductos() {
  // Fetch con ISR (revalidar cada hora)
  const res = await fetch('https://api.ejemplo.com/productos', {
    next: { revalidate: 3600 }
  });
  
  // Fetch sin cache (SSR cada vez)
  // const res = await fetch('https://api.ejemplo.com/productos', {
  //   cache: 'no-store'
  // });
  
  if (!res.ok) {
    throw new Error('Error cargando productos');
  }
  
  return res.json();
}

export default async function ProductosPage() {
  const productos = await getProductos();
  
  return (
    <div>
      <h1>Productos</h1>
      <ul>
        {productos.map((p: any) => (
          <li key={p.id}>{p.nombre}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Client Components con useState y useEffect

```tsx
// app/productos/page.tsx
'use client';

import { useState, useEffect } from 'react';

interface Producto {
  id: string;
  nombre: string;
  precio: number;
}

export default function ProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function cargarProductos() {
      try {
        const res = await fetch('/api/productos');
        const data = await res.json();
        setProductos(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
    
    cargarProductos();
  }, []);
  
  if (loading) return <p>Cargando...</p>;
  
  return (
    <div>
      <h1>Productos ({productos.length})</h1>
      {productos.map((producto) => (
        <div key={producto.id} className="p-4 border rounded">
          <h3>{producto.nombre}</h3>
          <p>${producto.precio}</p>
        </div>
      ))}
    </div>
  );
}
```

### Server Actions (Formularios sin API)

```tsx
// app/actions/productos.ts
'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function crearProducto(formData: FormData) {
  const nombre = formData.get('nombre') as string;
  const precio = parseFloat(formData.get('precio') as string);
  
  await prisma.producto.create({
    data: { nombre, precio }
  });
  
  revalidatePath('/productos');  // Revalidar la página /productos
}
```

```tsx
// app/productos/page.tsx
import { crearProducto } from '@/app/actions/productos';

export default function ProductosPage() {
  return (
    <div>
      <form action={crearProducto} className="space-y-4">
        <div>
          <label>Nombre:</label>
          <input name="nombre" type="text" className="border p-2 w-full" />
        </div>
        <div>
          <label>Precio:</label>
          <input name="precio" type="number" className="border p-2 w-full" />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Crear producto
        </button>
      </form>
    </div>
  );
}
```

---

## 13. OPTIMIZACIÓN DE IMÁGENES

### Uso del componente Image

```tsx
import Image from 'next/image';

export default function Page() {
  return (
    <div>
      {/* Imagen local desde /public */}
      <Image
        src="/hero-image.jpg"
        alt="Imagen principal"
        width={800}
        height={400}
        priority  // ← Cargar inmediatamente para LCP
        className="rounded-lg shadow-lg"
      />
      
      {/* Imagen remota */}
      <Image
        src="https://example.com/producto.jpg"
        alt="Producto"
        width={300}
        height={300}
        className="rounded-lg"
      />
      
      {/* Imagen responsive */}
      <Image
        src="/banner.jpg"
        alt="Banner"
        fill
        className="object-cover"
        priority
      />
      
      {/* Imagen con tamaños responsive */}
      <Image
        src="/responsive.jpg"
        alt="Responsive"
        width={1200}
        height={600}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="w-full"
      />
    </div>
  );
}
```

### Configurar dominios externos

```tsx
// next.config.ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
      },
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',  // Wildcard para subdominios
      },
    ],
  },
};

export default nextConfig;
```

---

## 14. SEO Y METADATOS

### Metadatos en Layout y Page

```tsx
// app/productos/[slug]/page.tsx
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const producto = await fetch(`/api/productos/${params.slug}`).then(r => r.json());
  
  return {
    title: producto.nombre,
    description: producto.descripcion,
    keywords: [producto.nombre, 'producto', 'comprar'],
    openGraph: {
      title: producto.nombre,
      description: producto.descripcion,
      images: [producto.imagen],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: producto.nombre,
      description: producto.descripcion,
      images: [producto.imagen],
    },
  };
}

export default function ProductoPage({ params }: { params: { slug: string } }) {
  return <div>...</div>;
}
```

### Sitemap y Robots.txt

```tsx
// app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://mi-sitio.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://mi-sitio.com/productos',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];
}
```

```tsx
// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: 'https://mi-sitio.com/sitemap.xml',
  };
}
```

---

## 15. ERROR HANDLING

### Error Boundaries

Ya explicado con `error.tsx` en la sección 5.

### Try-Catch en Server Actions

```tsx
// app/actions/crear-producto.ts
'use server';

export async function crearProducto(formData: FormData) {
  try {
    const nombre = formData.get('nombre') as string;
    const precio = parseFloat(formData.get('precio') as string);
    
    if (!nombre || isNaN(precio)) {
      return { error: 'Datos inválidos' };
    }
    
    // Crear producto...
    
    return { success: true };
  } catch (error) {
    return { error: 'Error al crear producto' };
  }
}
```

```tsx
// app/productos/crear/page.tsx
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { crearProducto } from '@/app/actions/crear-producto';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
    >
      {pending ? 'Creando...' : 'Crear producto'}
    </button>
  );
}

export default function CrearProductoPage() {
  const [state, formAction] = useFormState(crearProducto, null);
  
  return (
    <div>
      <form action={formAction}>
        <input name="nombre" type="text" className="border p-2" />
        <input name="precio" type="number" className="border p-2" />
        <SubmitButton />
      </form>
      
      {state?.error && (
        <p className="text-red-500 mt-4">{state.error}</p>
      )}
    </div>
  );
}
```

---

## 16. DESARROLLO LOCAL

### Scripts de package.json

```json
{
  "scripts": {
    "dev": "next dev",           // Servidor de desarrollo
    "build": "next build",       // Build de producción
    "start": "next start",       // Iniciar producción
    "lint": "next lint"          // Linter
  }
}
```

### Comandos

```bash
# Iniciar servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Iniciar servidor de producción (requiere build)
npm run start

# Linting
npm run lint

# Linting con fix
npm run lint -- --fix
```

### Flags del servidor de desarrollo

```bash
# Puerto específico
npm run dev -- -p 3000

# Puerto específico (alternativo)
PORT=3001 npm run dev

# Turbopack (más rápido) - experimental
npm run dev -- --turbo

# Mostrar información adicional
npm run dev -- --verbose
```

---

## 17. BUILD Y PRODUCCIÓN

### Tipos de Renderizado

| Tipo | Descripción | Cuándo usar |
|------|-------------|------------|
| **SSG** | Static Site Generation - Generado en build time | Páginas estáticas, blogs |
| **SSR** | Server-Side Rendering - Generado en cada petición | Datos que cambian a menudo |
| **ISR** | Incremental Static Regeneration - Static con actualización periódica | Datos que cambian pero no cada petición |

### Configurar Cache en fetch

```tsx
// SSG - Generado en build time (nunca cambia)
fetch('https://api.ejemplo.com/data', { cache: 'force-cache' });

// ISR - Revalidado cada hora
fetch('https://api.ejemplo.com/data', { next: { revalidate: 3600 } });

// SSR - No cache (cada petición)
fetch('https://api.ejemplo.com/data', { cache: 'no-store' });
```

### Build Options

```tsx
// app/page.tsx - Forzar static
export const dynamic = 'force-static';  // SSG

// app/page.tsx - Forzar dynamic
export const dynamic = 'force-dynamic'; // SSR

// app/page.tsx - ISR con revalidación
export const revalidate = 3600;  // Revalidar cada hora
```

### Optimización de Build

```tsx
// next.config.ts
const nextConfig: NextConfig = {
  // Excluir páginas del build
  excludePaths: ['/admin/*'],
  
  // Optimización de imágenes
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  
  // Compress
  compress: true,
  
  // SWC minification
  swcMinify: true,
  
  // Output mode
  output: 'standalone',  // Para Docker
};

export default nextConfig;
```

---

## 18. DESPLIEGUE

### Opción 1: Vercel (Recomendado)

**Vercel es el creador de Next.js y la plataforma de despliegue más fácil.**

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel

# Desplegar a producción
vercel --prod

# Desplegar usando un archivo específico
vercel --prod --yes
```

### Config .vercelignore

```
# Ignorar archivos en deploy
.next
.git
node_modules
.env.local
*.log
```

### Opción 2: VPS con Docker

**Crear Dockerfile**:

```dockerfile
# Base image
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build Next.js
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

**docker-compose.yml**:

```yaml
version: '3.8'

services:
  nextjs:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

### Opción 3: VPS tradicional

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/tu-proyecto.git
cd tu-proyecto

# Instalar dependencias
npm install

# Build
npm run build

# Iniciar con PM2 (process manager)
npm install -g pm2
pm2 start npm --name "nextjs-app" -- start

# Guardar lista de procesos
pm2 save
pm2 startup

# Configurar nginx
sudo apt update
sudo apt install nginx
```

**Configuración Nginx**:

```nginx
# /etc/nginx/sites-available/nextjs-app
server {
    listen 80;
    server_name tu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Variables de Entorno

**Crear archivo .env.local**:

```env
# Base de datos
DATABASE_URL="postgresql://usuario:password@localhost:5432/mi_bd"

# API Keys
API_KEY="tu-api-key"

# URLs
NEXT_PUBLIC_API_URL="https://api.ejemplo.com"
NEXT_PUBLIC_SITE_URL="https://mi-sitio.com"
```

> **Nota**: Las variables que empiezan con `NEXT_PUBLIC_` están disponibles en el cliente.

```tsx
// Usar variables de entorno
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const dbUrl = process.env.DATABASE_URL; // Solo en el servidor
```

---

## 19. INTEGRACIÓN CON PRISMA ORM

### ¿Qué es Prisma?

**Prisma** es un ORM moderno para TypeScript/Node.js. Ofrece tipado automático, migraciones, y soporte para PostgreSQL, MySQL, SQLite, SQL Server y MongoDB.

> ⚠️ **IMPORTANTE**: Esta guía está actualizada para **Prisma 7.0+** que tiene cambios rupturantes respecto a versiones anteriores.

### Cambios Clave en Prisma 7.0+

| Aspecto | Prisma < 7.0 | Prisma 7.0+ |
|---------|--------------|-------------|
| **DATABASE_URL** | En `schema.prisma` | En `prisma.config.ts` |
| **Constructor** | `new PrismaClient()` | `new PrismaClient({ adapter })` |
| **Driver** | Automático | **Adapter OBLIGATORIO** |
| **Archivos** | Solo `schema.prisma` | `schema.prisma` + `prisma.config.ts` |

---

## 🚀 GUÍA PASO A PASO: Instalar Prisma desde Cero

### Paso 1: Instalar Dependencias

```bash
# 1. Prisma CLI (desarrollo)
npm install prisma --save-dev

# 2. Cliente de Prisma
npm install @prisma/client

# 3. Driver Adapter (OBLIGATORIO en Prisma 7+)
npm install @prisma/adapter-pg              # PostgreSQL
# npm install @prisma/adapter-better-sqlite3  # SQLite

# 4. Herramientas para seeds
npm install --save-dev tsx dotenv
```

### Paso 2: Inicializar Prisma

```bash
npx prisma init
```

Esto crea:
- `prisma/schema.prisma` - Esquema de la base de datos
- `prisma.config.ts` - Configuración de Prisma
- `.env` - Variables de entorno

---

## 📁 ARCHIVOS DE CONFIGURACIÓN

### Archivo 1: `.env`

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mi_base_de_datos"
```

### Archivo 2: `prisma.config.ts` (raíz del proyecto)

```typescript
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
```

### Archivo 3: `prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"  // Ruta personalizada del cliente
}

datasource db {
  provider = "postgresql"
  // ⚠️ NO poner url aquí en Prisma 7+, va en prisma.config.ts
}

// Ejemplo de modelo
model Todo {
  id          String   @id @default(uuid())
  description String?
  complete    Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### Archivo 4: `src/lib/prisma.ts` (Singleton del Cliente)

```typescript
import { PrismaClient } from "@/src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Crear adapter con la DATABASE_URL
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL || "",
});

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter, // ← OBLIGATORIO en Prisma 7+
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
```

> **Nota sobre la importación**: Si usas `output` personalizado en el generator, importa desde esa ruta (`@/src/generated/prisma/client`), NO desde `@prisma/client`.

---

## 🔧 COMANDOS EN ORDEN

### Primera vez (proyecto nuevo)

```bash
# 1. Generar cliente de Prisma
npx prisma generate

# 2. Crear y aplicar primera migración
npx prisma migrate dev --name init

# 3. (Opcional) Poblar con datos iniciales
npx prisma db seed
```

### Desarrollo diario

```bash
# Después de modificar schema.prisma
npx prisma migrate dev --name descripcion_cambio

# Regenerar cliente (si cambias el schema)
npx prisma generate

# Abrir interfaz visual
npx prisma studio
```

### Producción

```bash
# Aplicar migraciones pendientes
npx prisma migrate deploy
```

---

## 🌱 SEEDS (Datos Iniciales)

### Configurar en `package.json`

```json
{
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```

### Ejemplo: `prisma/seed.ts`

```typescript
import { PrismaClient } from "@/src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { config } from "dotenv";

config({ path: ".env" });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL no está definida en .env");
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Iniciando seed...");

  // Limpiar datos (solo en desarrollo)
  await prisma.todo.deleteMany();

  // Crear datos
  await prisma.todo.createMany({
    data: [
      { description: "Aprender Prisma", complete: false },
      { description: "Crear API con Next.js", complete: false },
      { description: "Desplegar en Vercel", complete: false },
    ],
  });

  console.log("✅ Seed completado");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
```

### Ejecutar seed

```bash
npx prisma db seed
```

---

## 📖 OPERACIONES CRUD

### CREATE

```typescript
// Crear un registro
const todo = await prisma.todo.create({
  data: {
    description: "Nueva tarea",
    complete: false,
  },
});

// Crear varios registros
await prisma.todo.createMany({
  data: [
    { description: "Tarea 1" },
    { description: "Tarea 2" },
  ],
});
```

### READ

```typescript
// Obtener todos
const todos = await prisma.todo.findMany();

// Obtener uno por ID
const todo = await prisma.todo.findUnique({
  where: { id: "uuid-aqui" },
});

// Filtrar y ordenar
const incompleteTodos = await prisma.todo.findMany({
  where: { complete: false },
  orderBy: { createdAt: "desc" },
  take: 10,
});
```

### UPDATE

```typescript
// Actualizar uno
const updated = await prisma.todo.update({
  where: { id: "uuid-aqui" },
  data: { complete: true },
});

// Actualizar varios
await prisma.todo.updateMany({
  where: { complete: false },
  data: { complete: true },
});
```

### DELETE

```typescript
// Eliminar uno
await prisma.todo.delete({
  where: { id: "uuid-aqui" },
});

// Eliminar varios
await prisma.todo.deleteMany({
  where: { complete: true },
});
```

---

## 🔗 USO EN NEXT.JS

### Server Components

```typescript
// app/todos/page.tsx
import { prisma } from "@/src/lib/prisma";

export default async function TodosPage() {
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.description}</li>
      ))}
    </ul>
  );
}
```

### Server Actions

```typescript
// app/actions/todos.ts
"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createTodo(formData: FormData) {
  const description = formData.get("description") as string;

  await prisma.todo.create({
    data: { description },
  });

  revalidatePath("/todos");
}

export async function toggleTodo(id: string) {
  const todo = await prisma.todo.findUnique({ where: { id } });
  
  await prisma.todo.update({
    where: { id },
    data: { complete: !todo?.complete },
  });

  revalidatePath("/todos");
}

export async function deleteTodo(id: string) {
  await prisma.todo.delete({ where: { id } });
  revalidatePath("/todos");
}
```

### API Routes

```typescript
// app/api/todos/route.ts
import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const todos = await prisma.todo.findMany();
  return NextResponse.json(todos);
}

export async function POST(request: Request) {
  const { description } = await request.json();
  
  const todo = await prisma.todo.create({
    data: { description },
  });
  
  return NextResponse.json(todo, { status: 201 });
}
```

---

## 📋 COMANDOS ÚTILES

| Comando | Descripción |
|---------|-------------|
| `npx prisma init` | Inicializar Prisma |
| `npx prisma generate` | Generar/regenerar cliente |
| `npx prisma migrate dev --name xxx` | Crear y aplicar migración |
| `npx prisma migrate deploy` | Aplicar migraciones (producción) |
| `npx prisma migrate status` | Ver estado de migraciones |
| `npx prisma migrate reset` | Resetear BD (⚠️ borra datos) |
| `npx prisma db seed` | Ejecutar seed |
| `npx prisma studio` | Abrir interfaz visual |
| `npx prisma format` | Formatear schema |
| `npx prisma validate` | Validar schema |

---

## ⚠️ ERRORES COMUNES

| Error | Causa | Solución |
|-------|-------|----------|
| `PrismaClientInitializationError` | Falta adapter | Añadir `adapter` al constructor |
| `No se encuentra el módulo "@prisma/client"` | Output personalizado | Importar desde la ruta del output |
| `DATABASE_URL no está definida` | Falta .env | Crear `.env` con la variable |
| `url is no longer supported` | URL en schema.prisma | Mover a `prisma.config.ts` |

---

## 📚 RECURSOS

- [Documentación Oficial](https://www.prisma.io/docs)
- [Prisma Client API](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)
- [Prisma Studio](https://www.prisma.io/studio)

---

## 20. BUENAS PRÁCTICAS

### 1. Server Components primero

```tsx
// ✅ Bien - Server Component por defecto
export default function Page() {
  return <div>Hola</div>;
}

// ❌ Evitar - 'use client' si no necesitas interactividad
'use client';
export default function Page() {
  return <div>Hola</div>;
}
```

### 2. Solo marca 'client' cuando sea necesario

```tsx
// ✅ Bien - Solo usa 'client' para componentes interactivos
'use client';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

### 3. Organiza componentes por características

```
components/
├── features/
│   ├── auth/
│   │   ├── login-form.tsx
│   │   ├── register-form.tsx
│   │   └── reset-password-form.tsx
│   ├── products/
│   │   ├── product-card.tsx
│   │   ├── product-list.tsx
│   │   └── product-filter.tsx
│   └── cart/
│       ├── cart-item.tsx
│       └── cart-summary.tsx
```

### 4. Usa TypeScript estricto

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true
  }
}
```

### 5. Optimiza imágenes

```tsx
// ✅ Bien - Componente Image
<Image src="/imagen.jpg" alt="Desc" width={800} height={400} />

// ❌ Mal - img tag normal (no optimizado)
<img src="/imagen.jpg" alt="Desc" />
```

### 6. Usa loading states

```tsx
// ✅ Bien - archivo loading.tsx
// app/productos/loading.tsx
export default function Loading() {
  return <div>Cargando productos...</div>;
}
```

### 7. Maneja errores

```tsx
// ✅ Bien - archivo error.tsx
// app/productos/error.tsx
'use client';

export default function Error({ error, reset }: { error: Error, reset: () => void }) {
  return (
    <div>
      <p>Error: {error.message}</p>
      <button onClick={reset}>Intentar de nuevo</button>
    </div>
  );
}
```

### 8. Valida datos en Server Actions

```tsx
// ✅ Bien - Validación
'use server';

import { z } from 'zod';

const schema = z.object({
  nombre: z.string().min(3),
  email: z.string().email(),
});

export async function createUser(formData: FormData) {
  const result = schema.safeParse({
    nombre: formData.get('nombre'),
    email: formData.get('email'),
  });
  
  if (!result.success) {
    return { error: 'Datos inválidos' };
  }
  
  // Crear usuario...
}
```

### 9. Reusa componentes de UI

```tsx
// ✅ Bien - Componente Button reutilizable
import Button from '@/components/ui/button';

<Button variant="primary">Crear</Button>
<Button variant="secondary">Cancelar</Button>
<Button variant="danger">Eliminar</Button>
```

### 10. Documenta tu código

```tsx
/**
 * Componente de tarjeta de producto.
 * Muestra información básica de un producto con imagen y botón de compra.
 * 
 * @param producto - Datos del producto a mostrar
 * @param onComprar - Callback cuando se hace click en comprar
 */
export function ProductCard({ producto, onComprar }: ProductCardProps) {
  // ...
}
```

---

## 21. RECURSOS ADICIONALES

### Documentación Oficial

- 📚 [Next.js Documentation](https://nextjs.org/docs)
- 📚 [React Documentation](https://react.dev)
- 📚 [TypeScript Documentation](https://www.typescriptlang.org/docs)
- 📚 [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Cursos y Tutoriales

- 🎓 [Next.js Learn Course](https://nextjs.org/learn)
- 🎓 [React Tutorial](https://react.dev/learn)
- 🎓 [Tailwind CSS Course](https://tailwindcss.com/course)

### Herramientas

- 🛠️ [Vite](https://vitejs.dev) - Build tool rápido
- 🛠️ [SWC](https://swc.rs) - Compilador JavaScript/TypeScript
- 🛠️ [ESLint](https://eslint.org) - Linting
- 🛠️ [Prettier](https://prettier.io) - Formateo
- 🛠️ [Playwright](https://playwright.dev) - Testing E2E

### Comunidades

- 💬 [Next.js GitHub](https://github.com/vercel/next.js)
- 💬 [Next.js Discord](https://discord.gg/nextjs)
- 💬 [Stack Overflow](https://stackoverflow.com/questions/tagged/next.js)
- 💬 [Reddit r/nextjs](https://reddit.com/r/nextjs)

### Inspiración y Ejemplos

- ✨ [Next.js Examples](https://github.com/vercel/next.js/tree/canary/examples)
- ✨ [Vercel Templates](https://vercel.com/templates)
- ✨ [shadcn/ui](https://ui.shadcn.com) - Componentes UI para Next.js
- ✨ [Create T3 App](https://create.t3.gg) - Next.js + TypeScript + Prisma + Tailwind

---

## 🎉 ¡FELICIDADES!

Has completado la **GUÍA DEFINITIVA DE NEXT.JS**. 

💡 **Consejo para estudiantes de DAM**: 
- Practica cada concepto con ejemplos reales
- Lee la documentación oficial cuando tengas dudas
- No tengas miedo de experimentar y hacer errores
- La comunidad de Next.js es muy activa y servicial

---

**¿Próximos pasos?**

1. ✅ Crea tu primer proyecto Next.js
2. ✅ Experimenta con el enrutamiento
3. ✅ Crea componentes reutilizables
4. ✅ Añade interactividad con Client Components
5. ✅ Despliega a Vercel

### 🚀 Comandos rápidos de referencia

```bash
# Crear proyecto
npx create-next-app@latest mi-app --typescript --tailwind --eslint --app

# Desarrollo
npm run dev
npm run dev -- -p 3000  # Puerto específico

# Build y producción
npm run build
npm run start

# Despliegue
npx vercel
npx vercel --prod
```

**Created with ❤️ por GitHub Copilot**

---
*Última actualización: 2024*
*Versión: Next.js 15+ / App Router*
