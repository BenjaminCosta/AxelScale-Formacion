# AXELSCALE 2.0

La plataforma premium de entrenamiento en línea que te enseña a generar más de 50.000€ al mes con la reventa online.

## Características

- **Autenticación Magic Link**: Sistema de login sin contraseñas por email
- **Sistema de Roles**: Admin y usuarios regulares con permisos diferenciados
- **Admin Dashboard**: Panel completo para gestión de usuarios y suscripciones
- **3 Módulos Completos**: Shopify Ghost Dropshipping, Shopify Productos Físicos, y Aplicaciones de Reventa
- **Suscripciones con Stripe**: Planes mensual, trimestral y anual
- **Dashboard Premium**: Interfaz oscura y moderna con sidebar fijo
- **Sistema de Lecciones**: Contenido estructurado con navegación intuitiva
- **Base de Datos MySQL**: Con Prisma ORM para gestión de datos
- **Totalmente Responsive**: Optimizado para móviles y desktop

## Stack Tecnológico

- **Framework**: Next.js 16 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4
- **Base de Datos**: MySQL con Prisma ORM
- **Autenticación**: Magic Link (sin contraseñas)
- **Pagos**: Stripe Checkout
- **Deployment**: Railway (compatible)

## Instalación Local

### Requisitos Previos

- Node.js 18+ 
- MySQL instalado o acceso a una base de datos MySQL
- Cuenta de Stripe (para pagos)

### Pasos de Instalación

1. **Clonar el repositorio**
   \`\`\`bash
   git clone <tu-repo>
   cd axelscale-2-0
   \`\`\`

2. **Instalar dependencias**
   \`\`\`bash
   npm install
   \`\`\`

3. **Configurar variables de entorno**
   
   Copia el archivo `.env.example` a `.env` y configura tus variables:
   
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   
   Edita `.env` con tus credenciales:
   
   \`\`\`env
   DATABASE_URL="mysql://user:password@localhost:3306/axelscale"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   STRIPE_SECRET_KEY="sk_test_..."
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."
   \`\`\`

4. **Configurar la base de datos**
   
   \`\`\`bash
   # Generar el cliente Prisma
   npm run prisma:generate
   
   # Crear las tablas en la base de datos
   npm run prisma:push
   \`\`\`

5. **Poblar la base de datos**
   
   Ejecuta el script SQL de seed desde la interfaz de v0 o usando tu cliente MySQL:
   
   \`\`\`bash
   mysql -u user -p axelscale < scripts/seed-database.sql
   \`\`\`

6. **Configurar Stripe Webhooks (Desarrollo)**
   
   Instala Stripe CLI:
   \`\`\`bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   \`\`\`
   
   Copia el webhook secret que te proporciona y actualiza `STRIPE_WEBHOOK_SECRET` en `.env`

7. **Iniciar el servidor de desarrollo**
   
   \`\`\`bash
   npm run dev
   \`\`\`
   
   Abre [http://localhost:3000](http://localhost:3000)

## Deployment en Railway

### Preparación

1. **Crea una cuenta en Railway**: [railway.app](https://railway.app)

2. **Crear un proyecto nuevo**:
   - Conecta tu repositorio de GitHub
   - Railway detectará automáticamente que es un proyecto Next.js

3. **Agregar MySQL**:
   - En tu proyecto Railway, haz clic en "New"
   - Selecciona "Database" → "Add MySQL"
   - Railway creará automáticamente `DATABASE_URL`

4. **Configurar Variables de Entorno**:
   
   En la sección "Variables" de Railway, agrega:
   
   \`\`\`
   NEXT_PUBLIC_APP_URL=https://tu-app.railway.app
   STRIPE_SECRET_KEY=sk_live_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   \`\`\`

5. **Configurar Stripe Webhook (Producción)**:
   
   - Ve a [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
   - Crea un nuevo webhook apuntando a: `https://tu-app.railway.app/api/stripe/webhook`
   - Selecciona los eventos:
     - `checkout.session.completed`
     - `invoice.paid`
     - `invoice.payment_failed`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
   - Copia el webhook secret y actualízalo en Railway

6. **Deploy**:
   
   Railway desplegará automáticamente tu aplicación. El build script incluye `prisma generate`.

7. **Poblar la Base de Datos**:
   
   Después del primer deploy, ejecuta los scripts SQL:
   - Conéctate a tu base de datos MySQL en Railway
   - Ejecuta el contenido de `scripts/seed-database.sql`
   - Ejecuta el contenido de `scripts/add-admin-fields.sql` para agregar campos de admin

## Estructura del Proyecto

\`\`\`
axelscale-2-0/
├── app/
│   ├── (public)
│   │   ├── page.tsx              # Landing page
│   │   ├── login/                # Autenticación
│   │   ├── verify/               # Verificación magic link
│   │   └── subscribe/            # Página de planes
│   ├── app/                      # Dashboard protegido
│   │   ├── layout.tsx            # Layout con sidebar
│   │   ├── page.tsx              # Dashboard principal
│   │   ├── admin/                # Panel de administración (solo ADMIN)
│   │   ├── module/[slug]/        # Vista de módulo
│   │   └── lesson/[id]/          # Vista de lección
│   ├── api/
│   │   ├── auth/                 # Endpoints de autenticación
│   │   ├── admin/                # Endpoints de admin (protegidos)
│   │   └── stripe/               # Endpoints de Stripe
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Estilos globales
├── components/
│   ├── ui/                       # Componentes shadcn/ui
│   ├── app-sidebar.tsx           # Sidebar del dashboard
│   ├── app-header.tsx            # Header del dashboard
│   └── create-admin-dialog.tsx   # Diálogo para crear admins
├── lib/
│   ├── auth.ts                   # Lógica de autenticación
│   ├── session.ts                # Gestión de sesiones
│   ├── admin.ts                  # Utilidades de admin
│   ├── stripe.ts                 # Configuración de Stripe
│   ├── db.ts                     # Capa de acceso a datos
│   ├── mock-data.ts              # Datos de demostración
│   ├── prisma.ts                 # Cliente Prisma
│   └── utils.ts                  # Utilidades
├── prisma/
│   └── schema.prisma             # Esquema de base de datos
├── scripts/
│   ├── seed-database.sql         # Script de población inicial
│   └── add-admin-fields.sql      # Migración para campos de admin
├── proxy.ts                      # Middleware de Next.js 16
└── package.json
\`\`\`

## Paleta de Colores

- **Background**: `#000000` (Negro puro)
- **Panels/Cards**: `rgba(45,45,45,0.95)`
- **Text Primary**: `#FFFFFF`
- **Text Secondary**: `#D9D9D9` / `#CFCFCF`
- **Gold Accent**: `#DAA520` (Premium gold)
- **Gold Dark**: `#B8860B` (Shadow/hover)
- **CTA Green**: `#00FF9D` (Accent verde)
- **CTA Green Hover**: `#00E589`

## Tipografía

- **Anton**: Títulos grandes, hero sections, uppercase
- **Akshar**: UI, texto de cuerpo, subtítulos

## Funcionalidades Clave

### Autenticación Magic Link

- Los usuarios ingresan su email
- Reciben un link mágico válido por 15 minutos
- Al hacer clic, se autentican sin contraseña
- Sesión segura con cookies HTTP-only

### Sistema de Roles y Permisos

- **Super Admin** (`benjacostm100@gmail.com`): Acceso total sin restricciones
- **Admin**: Acceso al panel de administración y todos los módulos
- **User**: Acceso a módulos solo con suscripción activa
- Middleware protege rutas según rol y estado de suscripción

### Panel de Administración

- Tabla completa con todos los usuarios
- Información de suscripciones y pagos
- Crear y gestionar administradores
- Ver datos de Stripe (Customer ID, nombre, teléfono)
- Días restantes de suscripción

### Sistema de Suscripciones

- **Plan Mensual**: €49/mes
- **Plan 3 Meses**: €129 (€43/mes) - Ahorra 12%
- **Plan Anual**: €399 (€33/mes) - Ahorra 33%

### Control de Acceso

- Middleware protege rutas `/app/*`
- Verifica autenticación y suscripción activa (excepto admins)
- Admin routes protegidas con validación server-side
- Redirecciona a login o subscribe según el caso

## Soporte

Para dudas o problemas:
- WhatsApp: +34 626 04 06 64
- Email: soporte@axelscale.com

## Licencia

© 2025 AXELSCALE 2.0. Todos los derechos reservados.
# AxelScale-Formacion
