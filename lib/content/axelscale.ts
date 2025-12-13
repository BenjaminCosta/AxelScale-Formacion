// Contenido de la plataforma AXELSCALE
// Todos los módulos y lecciones están definidos aquí

export interface Lesson {
  id: string
  title: string
  content: string
  videoUrl?: string
  order: number
}

export interface Module {
  id: string
  slug: string
  title: string
  description: string
  icon: string
  order: number
  lessons: Lesson[]
}

export const AXELSCALE_MODULES: Module[] = [
  {
    id: "mod_1",
    slug: "shopify-ghost-dropshipping",
    title: "Shopify Ghost Dropshipping",
    description: "Reventa de productos digitales con 100% de margen",
    icon: "ghost",
    order: 1,
    lessons: [
      {
        id: "les_1_1",
        title: "Introducción al Ghost Dropshipping",
        content: `# Introducción al Ghost Dropshipping

Aprende los fundamentos de este modelo de negocio que me permitió generar ingresos pasivos escalables.

## ¿Qué es Ghost Dropshipping?

El Ghost Dropshipping es un modelo de negocio digital donde revendes productos digitales sin necesidad de crear el contenido tú mismo.

## Ventajas principales

- **100% de margen**: No hay costes de producto
- **Automatización total**: Una vez configurado, funciona solo
- **Sin inventario**: Stock infinito de productos digitales
- **Envío instantáneo**: Los clientes reciben el producto al momento

## Lo que aprenderás

En este módulo dominarás:

1. Selección de productos digitales rentables
2. Creación y configuración de tu tienda Shopify
3. Automatización del proceso de entrega
4. Marketing efectivo para productos digitales
5. Gestión de reembolsos y atención al cliente`,
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        order: 1,
      },
      {
        id: "les_1_2",
        title: "S.G.D Qué productos digitales usar",
        content: `# Qué Productos Digitales Usar

La clave del éxito está en elegir productos con alta demanda y bajo riesgo de reembolso.

## Tipos de productos más rentables

### 1. Cursos y formaciones
- Marketing digital
- Desarrollo personal
- Habilidades técnicas (programación, diseño)

### 2. Plantillas y recursos
- Plantillas de diseño
- Spreadsheets y herramientas
- Packs de recursos digitales

### 3. Software y licencias
- Herramientas SaaS con licencia de por vida
- Accesos premium a plataformas

## Criterios de selección

✅ Alta demanda comprobada
✅ Precio entre 20-100€
✅ Poco riesgo de piratería
✅ Fácil entrega automatizada

## Dónde encontrar productos

- Plataformas de afiliación
- Marketplaces digitales
- Creadores de contenido
- Revendedores autorizados`,
        order: 2,
      },
      {
        id: "les_1_3",
        title: "S.G.D Creación producto digital",
        content: `# Creación del Producto Digital

Aprende a estructurar y empaquetar tu producto digital para maximizar conversiones.

## Estructura de tu oferta

1. **Producto principal**: El curso, formación o recurso base
2. **Bonuses**: Material complementario que aumenta el valor percibido
3. **Soporte**: Canal de atención (grupo privado, email, etc.)

## Elementos esenciales

### Landing page de producto
- Título llamativo con beneficio claro
- Video de presentación (30-90 segundos)
- Lista de lo que incluye
- Testimonios (si los tienes)
- Garantía de satisfacción

### Sistema de entrega
- Email automático con acceso
- Página de agradecimiento
- Instrucciones claras de uso

## Tips para aumentar valor percibido

💡 Agrupa varios recursos en un "pack"
💡 Ofrece actualizaciones futuras incluidas
💡 Crea una comunidad exclusiva
💡 Añade bonuses por tiempo limitado`,
        order: 3,
      },
      {
        id: "les_1_4",
        title: "S.G.D Creación web",
        content: `# Creación de tu Tienda Shopify

Paso a paso para crear una tienda profesional optimizada para productos digitales.

## Configuración inicial

### 1. Crear cuenta Shopify
- Prueba gratuita de 14 días
- No necesitas plan de pago hasta tener ventas

### 2. Configuración básica
\`\`\`
Configuración > General
- Nombre de tienda
- Email de contacto
- Moneda: EUR
- Zona horaria
\`\`\`

### 3. Tema recomendado
- **Dawn** (gratuito y optimizado)
- Personalización mínima necesaria
- Mobile-first design

## Estructura de páginas

### Página de inicio
- Hero con propuesta de valor
- Productos destacados
- Testimonios / prueba social
- FAQ básico
- CTA claro

### Página de producto
- Imágenes/mockups del producto
- Descripción con beneficios (no características)
- Video demo
- Garantía
- Botón de compra destacado

## Apps esenciales (gratuitas)

1. **Digital Downloads** - Para entregar archivos digitales
2. **Email automático** - Confirmación y entrega
3. **Upsell post-compra** - Maximizar ticket medio`,
        order: 4,
      },
      {
        id: "les_1_5",
        title: "S.G.D Marketing",
        content: `# Marketing para Ghost Dropshipping

Estrategias probadas para generar tráfico y conversiones sin gastar en publicidad.

## Canales de tráfico gratuito

### 1. TikTok orgánico
- Videos cortos mostrando resultados
- Ganchos virales en los primeros 3 segundos
- CTA en bio y comentarios
- Frecuencia: 2-3 videos/día

### 2. Instagram Reels
- Similar a TikTok
- Usa hashtags específicos del nicho
- Colabora con cuentas pequeñas (10-50k)

### 3. Pinterest
- Pins con diseño atractivo
- Keywords en título y descripción
- Link directo al producto

## Estrategia de contenido

### Tipos de contenido que funcionan:
- Antes/después de usar el producto
- Unboxing digital (mostrando lo que incluye)
- Testimonios de clientes
- Comparativas con alternativas caras

## Embudo básico

1. **Awareness**: Video viral → landing page
2. **Consideración**: Contenido de valor → email list
3. **Decisión**: Oferta limitada → compra

## Métricas clave

- CTR del video: >5%
- Tasa de conversión landing: >2%
- Tiempo en página: >60 segundos`,
        order: 5,
      },
      {
        id: "les_1_6",
        title: "S.G.D Automatizaciones IA",
        content: `# Automatizaciones con IA

Usa inteligencia artificial para automatizar atención al cliente, emails y creación de contenido.

## Herramientas esenciales

### 1. ChatGPT + Zapier
- Respuestas automáticas a emails comunes
- Generación de descripciones de producto
- Ideas de contenido para redes sociales

### 2. Tidio / Chatbot
- Chat en vivo automatizado
- Respuestas a FAQ 24/7
- Captura de leads

## Automatización de emails

### Secuencia post-compra
\`\`\`
Email 1 (inmediato): Confirmación + acceso al producto
Email 2 (+1 día): ¿Necesitas ayuda? + tutorial
Email 3 (+3 días): Upsell de producto complementario
Email 4 (+7 días): Pide testimonio
\`\`\`

### Secuencia abandono de carrito
\`\`\`
Email 1 (+1 hora): "Olvidaste algo..."
Email 2 (+24h): Descuento 10%
Email 3 (+48h): Última oportunidad
\`\`\`

## Prompts útiles para ChatGPT

**Para descripciones de producto:**
\`\`\`
Crea una descripción de producto enfocada en beneficios para [PRODUCTO].
Público objetivo: [AUDIENCIA]
Tono: persuasivo pero no agresivo
Incluye: 3 beneficios clave, CTA al final
\`\`\`

## Dashboard de automatización

Usa Make.com (gratuito hasta 1000 ops/mes):
- Webhook de Shopify → Email de entrega
- Nueva venta → Notificación WhatsApp
- Reembolso solicitado → Ticket de soporte`,
        order: 6,
      },
      {
        id: "les_1_7",
        title: "S.G.D Reembolsos",
        content: `# Gestión de Reembolsos

Cómo manejar reembolsos minimizando pérdidas y manteniendo buena reputación.

## Política de reembolso recomendada

**Garantía de 7 días sin preguntas**
- Genera confianza y aumenta conversiones
- 95% de compradores no piden reembolso
- Los que piden suelen tener razones válidas

## Proceso de reembolso

### Paso 1: Respuesta inicial (24h máx)
\`\`\`
Hola [NOMBRE],

Lamento que el producto no haya cumplido tus expectativas.
Antes de procesar el reembolso, ¿puedo preguntarte qué fue lo que no funcionó?

Quizás puedo ayudarte a aprovechar mejor el contenido.

Si aún así prefieres el reembolso, lo proceso de inmediato.

Saludos,
[TU NOMBRE]
\`\`\`

### Paso 2: Intentar resolver
- 30-50% cambian de opinión si ofreces ayuda real
- Ofrece call rápida o tutorial personalizado

### Paso 3: Procesar reembolso
- Hazlo de inmediato (max 48h)
- Sé amable y profesional
- Deja puerta abierta para futuras compras

## Reducir tasa de reembolsos

✅ **Descripción del producto ultra clara**
- Di exactamente qué incluye
- Qué NO incluye
- Para quién es y para quién NO

✅ **Video de presentación honesto**
- Muestra el contenido real
- Sin promesas exageradas
- Resultados realistas

✅ **Email de bienvenida efectivo**
- Tutorial de cómo empezar
- Expectativas claras
- Soporte disponible

## Métricas objetivo

- Tasa de reembolso: <5%
- Tiempo de resolución: <48h
- Conversión reembolso→cliente: >20%`,
        order: 7,
      },
    ],
  },
  {
    id: "mod_2",
    slug: "shopify-productos-fisicos",
    title: "Shopify Productos Físicos",
    description: "Reventa de productos físicos con márgenes escalables",
    icon: "package",
    order: 2,
    lessons: [
      {
        id: "les_2_1",
        title: "Introducción a Productos Físicos",
        content: `# Introducción a Productos Físicos

Descubre cómo construir una marca sólida vendiendo productos físicos de alta demanda.

## ¿Por qué productos físicos?

A diferencia del Ghost Dropshipping, los productos físicos permiten:

- **Clientes recurrentes**: Pueden comprar el mismo producto varias veces
- **Escalabilidad real**: No dependes de viralidad constante
- **Marca sostenible**: Construyes reputación a largo plazo

## Modelo de negocio

### Estructura básica
1. Compra de stock (pequeñas cantidades inicialmente)
2. Fotos propias del producto
3. Venta a través de Shopify
4. Envío desde tu ubicación o dropshipping nacional

### Márgenes típicos
- Coste producto: 40-60% del precio venta
- Envío: 10-15%
- **Margen neto: 25-40%**

## Categorías recomendadas

### Productos de alta rotación:
- **Tech accessories**: Fundas, cargadores, auriculares
- **Moda**: Réplicas de marcas populares
- **Hogar**: Decoración, organización
- **Juguetes**: LEGO compatibles, coleccionables

## Inversión inicial

- Stock: 200-500€
- Shopify: 1€/mes (primer mes)
- Packaging: 50-100€
- **Total: 250-600€** para empezar`,
        order: 1,
      },
      {
        id: "les_2_2",
        title: "S.P.F Qué productos físicos vender",
        content: `# Qué Productos Físicos Vender

Criterios para seleccionar productos ganadores con bajo riesgo y alto potencial.

## Características del producto ideal

✅ **Ligereza**: Menos de 500g (reduce costes de envío)
✅ **Pequeño**: Cabe en un sobre/caja pequeña
✅ **Margen >40%**: Precio venta mínimo 2.5x el coste
✅ **Alta demanda**: Se busca activamente en Google
✅ **Bajo retorno**: Productos que no se devuelven fácil

## Top 10 productos para empezar

### 1. Fundas de móvil personalizadas
- Coste: 2-3€
- Venta: 12-15€
- Margen: 70%+

### 2. AirPods réplica (calidad alta)
- Coste: 15-20€
- Venta: 40-60€
- Margen: 50%+

### 3. Calcetines/medias de marca
- Coste: 3-5€ (pack 3)
- Venta: 15-20€
- Margen: 60%

### 4. Gafas de sol réplica
- Coste: 5-8€
- Venta: 25-35€
- Margen: 65%

### 5. Perfumes (decants 10ml)
- Coste: 4-6€
- Venta: 15-20€
- Margen: 60%

## Dónde conseguir proveedores

### AliExpress
- Para testear productos (envío lento)
- Usa filtros: "Envío desde España"
- Busca proveedores con >95% rating

### Proveedores nacionales
- Menor margen pero envío rápido
- Builds stock propio
- Fotos con calidad real

### Wholesalers locales
- Compra en cantidad (>50 unidades)
- Mejores precios
- Control de calidad

## Validación antes de invertir

1. **Google Trends**: Tendencia del producto
2. **Amazon bestsellers**: Qué se vende
3. **TikTok/IG**: Productos virales actuales
4. **Competencia en Shopify**: Cómo lo venden otros`,
        order: 2,
      },
      {
        id: "les_2_3",
        title: "S.P.F Creación web",
        content: `# Creación Web para Productos Físicos

Configuración de tu tienda Shopify optimizada para productos físicos con alta conversión.

## Diferencias vs. productos digitales

- Fotos REALES del producto (no stock photos)
- Reviews y prueba social esencial
- Página de envíos clara
- Política de devoluciones visible

## Setup inicial Shopify

### Tema recomendado: **Impulse** o **Debut**
- Grid de productos atractivo
- Zoom en imágenes
- Mobile-optimized

### Configuración de envíos
\`\`\`
Ajustes > Envíos y entregas

España Peninsular:
- Gratis a partir de 30€
- 3,95€ para pedidos menores

Baleares/Canarias:
- 6,95€ fijo
- Gratis a partir de 50€

Internacional: No activar inicialmente
\`\`\`

## Estructura de producto

### Fotos (mínimo 5 imágenes)
1. Producto solo, fondo blanco
2. Producto en uso / lifestyle
3. Detalles / texturas
4. Packaging
5. Comparativa tamaño

### Descripción optimizada
\`\`\`markdown
# [NOMBRE PRODUCTO] - [BENEFICIO PRINCIPAL]

## ¿Por qué elegir [PRODUCTO]?
- Beneficio 1 (emotivo)
- Beneficio 2 (práctico)
- Beneficio 3 (exclusivo)

## Características
- Dimensiones
- Materiales
- Colores disponibles

## Envío
📦 Envío en 24-48h
🚚 Gratis a partir de 30€
✅ Devolución en 14 días

## Garantía
⭐ Satisfacción garantizada
\`\`\`

## Apps esenciales

1. **Loox / Reviews.io**: Reviews con fotos
2. **Klaviyo**: Email marketing
3. **Tidio**: Chat en vivo
4. **Oberlo**: Si haces dropshipping
5. **Google Analytics**: Tracking

## Optimización de conversión

### Urgencia
- Stock limitado (real o artificial)
- Descuento por tiempo limitado
- "X personas viendo esto ahora"

### Prueba social
- Reviews de clientes
- Fotos de clientes usando el producto
- "Bestseller" badges

### Trust signals
- Envío gratis
- Devolución fácil
- Pago seguro
- Garantía de satisfacción`,
        order: 3,
      },
      {
        id: "les_2_4",
        title: "S.P.F Marketing",
        content: `# Marketing para Productos Físicos

Estrategias de marketing orgánico y de pago para escalar tu tienda de productos físicos.

## Marketing orgánico (0€ inversión)

### TikTok Shop
- Activa TikTok Shop en tu Shopify
- Crea videos mostrando el producto
- Usa trending sounds
- Hashtags: #tiktokmademebuyit #productreview

### Instagram Shopping
- Etiqueta productos en posts
- Colabora con microinfluencers (cambio por producto)
- Stories diarias mostrando productos

### Pinterest SEO
- Crea pins verticales (1000x1500)
- Keywords en descripción
- Link a colecciones específicas

## Marketing de pago (cuando tengas ventas orgánicas)

### Facebook/Instagram Ads

**Budget inicial**: 5-10€/día

**Estructura de campaña:**
\`\`\`
Campaña: Conversiones
Conjunto: Intereses + Lookalike
Anuncio: Video 15-30 seg
\`\`\`

**Creativos que funcionan:**
- Unboxing del producto
- Comparativa antes/después
- Testimonio en video
- Demostración de uso

### Google Shopping
- Feed de productos automático (app)
- Budget: 3-5€/día inicial
- Bidding: Maximize conversions

## Estrategia de contenido

### Calendario de contenido semanal
- **Lunes**: Producto nuevo / restock
- **Miércoles**: Review de cliente
- **Viernes**: Promo / descuento
- **Domingo**: Lifestyle / behind scenes

## Colaboraciones

### Microinfluencers (1k-10k followers)
- Envía producto gratis
- Pide video review
- Código descuento único (10-15%)
- Comisión por ventas (opcional)

### UGC (User Generated Content)
- Pide a clientes que envíen fotos
- Recompensa con descuento próxima compra
- Republica en tus redes (con permiso)

## Métricas clave

- **CPM**: <10€ (coste por 1000 impresiones)
- **CTR**: >2% (click through rate)
- **CPC**: <0.50€ (coste por click)
- **ROAS**: >2.5 (return on ad spend)
- **CVR**: >1.5% (conversion rate)`,
        order: 4,
      },
      {
        id: "les_2_5",
        title: "S.P.F Automatizaciones",
        content: `# Automatizaciones para Productos Físicos

Automatiza procesos repetitivos para enfocarte en escalar el negocio.

## Automatización de pedidos

### Shopify Flow (gratis en planes Advanced)

**Flujo 1: Etiquetado automático**
\`\`\`
Trigger: Nuevo pedido
Condition: Total > 50€
Action: Añadir tag "VIP"
\`\`\`

**Flujo 2: Prioridad de envío**
\`\`\`
Trigger: Nuevo pedido
Condition: Tag = "VIP" OR Shipping = "Express"
Action: Notificar email urgente
\`\`\`

## Email marketing automatizado

### Secuencia post-compra (Klaviyo)

**Email 1** (+1 hora): Confirmación creativa
\`\`\`
Subject: 🎉 ¡Pedido confirmado! Esto es lo que viene...

Hola [NOMBRE],

Tu pedido #[NÚMERO] está confirmado.

📦 Productos: [LISTA]
🚚 Envío estimado: [FECHA]
📍 Tracking: [LINK]

¿Primera compra? Aquí tienes un código para la próxima: SEGUNDA10

¡Gracias por confiar en nosotros!
\`\`\`

**Email 2** (+3 días): Pedido enviado
**Email 3** (+7 días): ¿Ya lo recibiste? + pide review
**Email 4** (+14 días): Upsell de productos relacionados

### Abandono de carrito (3 emails)
- Email 1 (+1h): "Olvidaste algo"
- Email 2 (+24h): Descuento 10%
- Email 3 (+48h): Última oportunidad + urgencia

## Automatización de inventario

### Avisos de stock bajo
\`\`\`
Si stock < 10 unidades:
→ Email a ti
→ Desactivar ads temporalmente
→ Añadir badge "Últimas unidades"
\`\`\`

### Restock automático (con proveedores integrados)
- Pedido automático cuando stock = 0
- Solo si ventas últimos 30 días > 20

## Chatbot FAQ

### Tidio - Respuestas automáticas

**Preguntas frecuentes:**
- "¿Cuándo llega mi pedido?" → Link tracking
- "¿Puedo cambiar dirección?" → Formulario
- "¿Hacen envíos a X?" → Info envíos
- "¿Cómo devuelvo?" → Política devoluciones

## Reportes automáticos

### Google Data Studio Dashboard
- Ventas diarias/semanales/mensuales
- Productos más vendidos
- Tasa de conversión por fuente
- ROI de ads

**Envío automático cada lunes 9am por email**

## Herramientas recomendadas

1. **Zapier**: Conectar Shopify + otras apps
2. **Klaviyo**: Email marketing
3. **Tidio**: Chatbot
4. **ShipStation**: Automatización de envíos
5. **Inventory Planner**: Gestión de stock`,
        order: 5,
      },
      {
        id: "les_2_6",
        title: "S.P.F Reembolsos",
        content: `# Gestión de Reembolsos - Productos Físicos

Cómo manejar devoluciones y reembolsos minimizando pérdidas y manteniendo buena reputación.

## Política de devoluciones

### Modelo recomendado: **14 días de garantía**

\`\`\`markdown
## Política de Devolución

¿No estás 100% satisfecho? Te devolvemos tu dinero.

Tienes 14 días desde la recepción para:
1. Contactarnos por email/chat
2. Enviarnos el producto (gastos de envío a tu cargo)
3. Recibir reembolso completo (5-7 días laborables)

Condiciones:
✅ Producto sin usar
✅ Embalaje original
✅ Incluye todos los accesorios
\`\`\`

## Proceso de devolución

### Paso 1: Cliente solicita devolución

**Respuesta template (dentro de 24h):**
\`\`\`
Hola [NOMBRE],

Lamento que el producto no haya cumplido tus expectativas.

Antes de procesar la devolución, ¿puedo saber qué fue lo que no te convenció?

Opciones:
1. Cambio por otro producto (sin coste extra)
2. Vale descuento 20% para próxima compra
3. Devolución completa

Dime qué prefieres y te ayudo de inmediato.

Saludos,
[TU NOMBRE]
\`\`\`

### Paso 2: Si insiste en devolución

**Instrucciones claras:**
\`\`\`
Perfecto, procedo con la devolución.

Por favor envía el producto a:
[TU DIRECCIÓN]

Incluye este número en el paquete: #DEV[NÚMERO]

Una vez lo reciba (5-7 días), procesaré el reembolso completo.

¿Necesitas algo más?
\`\`\`

### Paso 3: Recepción y reembolso
- Verifica estado del producto
- Reembolsa en 24-48h
- Email confirmación de reembolso

## Reducir tasa de devoluciones

### 1. Fotos y descripciones ultra claras
- Medidas exactas
- Comparativas de tamaño
- Todos los ángulos
- Materiales especificados

### 2. Reviews con fotos de clientes
- Muestra producto real en manos de clientes
- Variedad de casos de uso
- Diferentes contextos

### 3. Tabla de tallas (si aplica)
- Comparativa con otras marcas
- Guía de medición

### 4. Video del producto
- 15-30 segundos
- Muestra detalles
- Demuestra uso

## Casos especiales

### Producto dañado en envío
- Reembolso o reenvío inmediato
- Pide fotos del daño
- Reclama a transportista

### Producto no llega
- Verifica tracking
- Si está perdido: reembolso/reenvío
- Reclama a transportista

### Cliente insatisfecho pero producto OK
- Ofrece descuento para quedarse el producto
- O acepta devolución amablemente

## Métricas objetivo

- **Tasa de devolución**: <8%
- **Tiempo de resolución**: <48h
- **% devoluciones evitadas**: >30%
- **Satisfacción post-resolución**: >90%`,
        order: 6,
      },
      {
        id: "les_2_7",
        title: "S.P.F Cómo hacer envíos",
        content: `# Cómo Hacer Envíos

Guía completa para gestionar envíos de forma eficiente y profesional.

## Opciones de envío en España

### 1. Correos (CTT)
**Pros:**
- Económico (desde 3€)
- Cobertura nacional
- Oficinas en todas partes

**Contras:**
- A veces lento (3-5 días)
- Atención al cliente limitada

**Cuándo usar:** Pedidos <2kg, no urgentes

### 2. SEUR / MRW
**Pros:**
- Rápido (24-48h)
- Tracking detallado
- Recogida a domicilio

**Contras:**
- Más caro (desde 6€)

**Cuándo usar:** Pedidos urgentes o >2kg

### 3. Correos Express
**Pros:**
- Balance precio-velocidad
- Confiable

**Contras:**
- Limitado a España peninsular

## Materiales de envío

### Esenciales
- **Sobres acolchados** (para productos <500g): 0.15-0.30€/unidad
- **Cajas pequeñas** (para productos frágiles): 0.40-0.80€/unidad
- **Cinta adhesiva**: Branded con tu logo (opcional)
- **Papel de relleno**: Protección y presentación

### Branding
- Pegatinas con logo en el paquete
- Tarjeta de agradecimiento
- Código descuento para próxima compra

**Coste total packaging**: 0.50-1€ por pedido

## Proceso de envío optimizado

### Setup diario (10-15min)
1. Imprimir todas las etiquetas de Shopify
2. Preparar cajas/sobres
3. Embalar productos
4. Pegar etiquetas

### Organización
\`\`\`
Pedidos del día en bandeja:
├── Urgentes (arriba)
├── Normales (medio)
└── Recogidas (abajo)
\`\`\`

### Checklist por pedido
- [ ] Producto correcto
- [ ] Protección adecuada
- [ ] Tarjeta de agradecimiento
- [ ] Etiqueta bien pegada
- [ ] Tracking a cliente

## Envíos internacionales (cuando escales)

### Documentación
- Factura comercial
- Número EORI (para fuera UE)
- Declaración aduanera

### Costes adicionales
- Aranceles (depende del país)
- IVA del país destino
- Gestión aduanera

**Recomendación:** Empezar solo con España

## Integración con Shopify

### Apps útiles
1. **Shopify Shipping**: Tarifas negociadas
2. **AfterShip**: Tracking page branded
3. **ShipStation**: Multi-carrier shipping

### Automatización
\`\`\`
Nuevo pedido →
1. Email confirmación (auto)
2. Imprime etiqueta (auto)
3. Notifica tracking (auto cuando envías)
\`\`\`

## Problemas comunes

### Paquete perdido
1. Verifica tracking
2. Contacta transportista
3. Espera 7 días
4. Si no aparece: reembolso o reenvío

### Dirección incorrecta
1. Cliente te avisa rápido: cambia con transportista
2. Ya enviado: puede ser devuelto o perdido
3. Responsabilidad del cliente (comunicar amablemente)

### Daño en tránsito
1. Pide fotos
2. Reclama a transportista
3. Reembolsa o reenvía al cliente
4. Mejora packaging futuro

## Costes de envío: qué cobrar

### Estrategia recomendada
- **Gratis** a partir de 30-40€
- **Fijo** 3,95€ para pedidos menores
- Incluye coste en precio producto

### Cálculo
\`\`\`
Coste real envío: 3,50€
Coste packaging: 0,80€
Total: 4,30€

Cobrar al cliente: 3,95€
Pérdida: 0,35€ (recuperas con margen producto)
\`\`\``,
        order: 7,
      },
    ],
  },
  {
    id: "mod_3",
    slug: "aplicaciones-de-reventa",
    title: "Aplicaciones de Reventa",
    description: "Wallapop, Vinted y marketplaces para resultados rápidos",
    icon: "smartphone",
    order: 3,
    lessons: [
      {
        id: "les_3_1",
        title: "Introducción al Arbitraje",
        content: `# Introducción al Arbitraje en Apps de Reventa

El método perfecto para empezar con bajo riesgo y obtener resultados rápidos.

## ¿Qué es el arbitraje de reventa?

Comprar productos a bajo precio en una plataforma y revenderlos a mayor precio en otra.

**Ejemplo:**
- Compras AirPods réplica en AliExpress: 18€
- Los vendes en Wallapop: 45€
- Beneficio: 27€ por venta

## Ventajas principales

✅ **Bajo riesgo inicial**
- Inversión mínima (50-100€)
- No necesitas tienda online
- Sin costes fijos mensuales

✅ **Resultados rápidos**
- Primera venta en 24-48h
- Pago instantáneo
- Sin periodo de espera

✅ **Fácil de aprender**
- Curva de aprendizaje corta
- No requiere marketing complejo
- Escalable según tu tiempo

## Desventajas a considerar

⚠️ **Limitaciones de plataforma**
- Wallapop: riesgo de baneo
- Vinted: límite 2.000€ (reporte a Hacienda)
- eBay: comisiones altas

⚠️ **Escalabilidad limitada**
- No puedes vender el mismo producto infinitas veces
- Dependes de políticas de cada app
- Trabajo más manual vs. Shopify

## Plataformas principales

### Wallapop
- Mayor volumen de ventas
- Público español
- Sin límites de facturación
- ⚠️ Riesgo de suspensión de cuenta

### Vinted
- Enfocado en ropa/accesorios
- Muy popular entre jóvenes
- ⚠️ Límite 2.000€/año

### Facebook Marketplace
- Gran alcance
- Gratis (sin comisiones)
- Público de todas las edades

### Milanuncios
- Productos de nicho
- Menos competencia
- Tráfico constante

## Perfil ideal para este método

Este método es para ti si:
- Tienes poco capital inicial (<200€)
- Quieres ganar dinero rápido
- Dispones de 1-2h diarias
- No quieres complicarte con web/marketing

## Expectativas realistas

### Primeros 30 días
- Inversión: 100€
- Ventas: 5-10 productos
- Beneficio: 150-300€
- Tiempo: 1-2h/día

### Después de 3 meses
- Inversión: 300-500€
- Ventas: 30-50 productos/mes
- Beneficio: 800-1.500€
- Tiempo: 2-3h/día`,
        order: 1,
      },
      {
        id: "les_3_2",
        title: "A.D.R Qué productos vender",
        content: `# Qué Productos Vender en Apps de Reventa

Los productos más rentables y con mayor rotación en Wallapop, Vinted y marketplaces.

## Top 10 productos MÁS rentables

### 1. AirPods réplica AAA
- **Compra**: 15-20€ (AliExpress)
- **Venta**: 40-60€ (Wallapop)
- **Margen**: 25-35€
- **Rotación**: ⭐⭐⭐⭐⭐

### 2. Zapatillas deportivas réplica
- **Compra**: 20-30€
- **Venta**: 60-90€
- **Margen**: 35-55€
- **Rotación**: ⭐⭐⭐⭐

### 3. Perfumes (decants 10-30ml)
- **Compra**: 5-8€
- **Venta**: 15-25€
- **Margen**: 10-17€
- **Rotación**: ⭐⭐⭐⭐⭐

### 4. Relojes réplica
- **Compra**: 10-15€
- **Venta**: 35-50€
- **Margen**: 20-30€
- **Rotación**: ⭐⭐⭐⭐

### 5. Bolsos/Mochilas réplica
- **Compra**: 15-25€
- **Venta**: 50-80€
- **Margen**: 30-50€
- **Rotación**: ⭐⭐⭐

### 6. Gafas de sol marca
- **Compra**: 5-10€
- **Venta**: 25-40€
- **Margen**: 15-25€
- **Rotación**: ⭐⭐⭐⭐

### 7. Ropa deportiva (Adidas, Nike)
- **Compra**: 8-15€
- **Venta**: 25-45€
- **Margen**: 15-25€
- **Rotación**: ⭐⭐⭐⭐⭐

### 8. Fundas móvil premium
- **Compra**: 2-4€
- **Venta**: 10-15€
- **Margen**: 8-11€
- **Rotación**: ⭐⭐⭐

### 9. Juguetes LEGO compatible
- **Compra**: 10-20€
- **Venta**: 30-50€
- **Margen**: 18-28€
- **Rotación**: ⭐⭐⭐⭐

### 10. Joyas acero inoxidable
- **Compra**: 3-7€
- **Venta**: 15-30€
- **Margen**: 10-20€
- **Rotación**: ⭐⭐⭐⭐

## Criterios de selección

### ✅ Producto ideal debe tener:
- Tamaño pequeño/medio (fácil envío)
- Peso ligero (<1kg)
- Alta demanda (se busca activamente)
- Margen >50% del coste
- No requiere tallas complicadas
- Larga vida útil

### ❌ Evita:
- Productos muy pesados (>2kg)
- Artículos frágiles
- Productos de moda rápida
- Categorías saturadas
- Réplicas obvias/ilegales

## Dónde conseguir productos

### AliExpress
- Busca "envío desde España" para rapidez
- Lee reviews con fotos
- Proveedores +95% rating
- Pide muestras antes de comprar cantidad

### DHGate
- Réplicas de mejor calidad
- Precios más altos que AliExpress
- Menos riesgo de aduana

### Proveedores locales
- Polígonos industriales
- Mayoristas textil (ropa)
- Outlets de marcas

## Estrategia de validación

Antes de comprar stock:

1. **Busca en Wallapop/Vinted**
   - ¿Se está vendiendo?
   - ¿A qué precio?
   - ¿Cuántos competidores?

2. **Compra 1-2 unidades de prueba**
   - Verifica calidad
   - Toma fotos
   - Testea venta

3. **Si funciona, escala**
   - Compra 10-20 unidades
   - Optimiza fotos/descripción
   - Sube precio gradualmente

## Productos estacionales

### Verano (Jun-Ago)
- Gafas de sol
- Trajes de baño
- Chancletas/sandalias

### Invierno (Nov-Feb)
- Abrigos/chaquetas
- Bufandas/guantes
- Calzado de invierno

### Pre-Navidad (Oct-Dic)
- Juguetes
- Productos para regalo
- Decoración navideña`,
        order: 2,
      },
      {
        id: "les_3_3",
        title: "A.D.R Dónde vender cada producto",
        content: `# Dónde Vender Cada Producto

Estrategias específicas para cada plataforma y qué vender en cada una.

## Wallapop: El todoterreno

### Productos que mejor funcionan
- **Electrónica**: AirPods, smartwatches, consolas
- **Moda premium**: Zapatillas, bolsos de marca
- **Hogar**: Decoración, muebles pequeños
- **Tech accessories**: Fundas, cargadores

### Estrategia de precio
- Precio ligeramente alto al publicar
- Acepta ofertas (hasta 20% descuento)
- "Envío incluido" aumenta ventas

### Tips para vender más
1. **Fotos profesionales**
   - Fondo neutro
   - Luz natural
   - Múltiples ángulos

2. **Título optimizado**
   \`\`\`
   ❌ Airpods pro
   ✅ AirPods Pro NUEVOS Sellados Garantía 🎧
   \`\`\`

3. **Responde rápido**
   - Dentro de 5 minutos = +70% probabilidad de venta
   - Usa respuestas guardadas

4. **Envío rápido**
   - Mismo día o siguiente
   - Tracking automático

### Evitar baneos
- No uses "réplica" en título
- No vendas más de 20 productos similares/mes
- Varía descripciones
- Usa diferentes fotos para productos similares

## Vinted: Rey de la moda

### Productos que mejor funcionan
- **Ropa de marca**: Nike, Adidas, Zara
- **Accesorios**: Bolsos, cinturones, bufandas
- **Calzado**: Zapatillas, botas
- **Joyería**: Pendientes, collares

### Límite importante
⚠️ **2.000€/año**: Vinted notifica a Hacienda
- Controla tus ventas mensuales
- Si llegas al límite, cambia a Wallapop

### Estrategia específica
1. **Etiquetas estratégicas**
   - Marca
   - Talla
   - Color
   - Estilo (vintage, deportivo, etc.)

2. **Bundle deals**
   - Ofrece 2x1 o 3x2
   - Aumenta ticket medio

3. **Envío**
   - Usa servicio de Vinted
   - Etiqueta prepagada
   - Tracking automático

## Facebook Marketplace: Alcance masivo

### Productos que mejor funcionan
- **Electrónica de consumo**: Móviles, tablets, consolas
- **Hogar**: Muebles, electrodomésticos
- **Vehículos** (cuando escales)
- **Todo lo local**: Sin envío

### Ventaja única
- **0% comisión**
- Público de todas las edades
- Integración con grupos de FB

### Estrategia
1. **Fotos con contexto**
   - Producto en uso
   - En ambiente real

2. **Descripción detallada**
   - Estado (nuevo, usado)
   - Razón de venta
   - Ubicación exacta

3. **Publicar en grupos**
   - "Compraventa [tu ciudad]"
   - Grupos específicos (gaming, moda, etc.)

## Milanuncios: Productos de nicho

### Productos que mejor funcionan
- **Herramientas**
- **Antigüedades/coleccionables**
- **Servicios** (instalación, reparación)
- **Vehículos**

### Características
- Público más mayor (30-60 años)
- Menos competencia
- Transacciones en persona

## eBay: Internacional

### Cuándo usar eBay
- Productos únicos/coleccionables
- Envíos internacionales
- Subastas de artículos raros

### Contras
- Comisión alta (10-12%)
- Competencia global
- Proceso más complejo

## Estrategia multi-plataforma

### Producto único valioso (>100€)
1. Wallapop (alcance local)
2. Facebook Marketplace (gratis)
3. Milanuncios (backup)

### Producto de moda (<50€)
1. Vinted (preferente)
2. Wallapop (secundario)

### Producto tech/electrónica
1. Wallapop (principal)
2. Facebook Marketplace (complemento)

### Producto nicho/coleccionable
1. eBay (internacional)
2. Milanuncios (local)

## Optimización por plataforma

| Plataforma | Mejor hora publicar | Mejor día | Duración anuncio |
|------------|-------------------|-----------|-----------------|
| Wallapop | 19:00-22:00 | Vie-Dom | Renovar cada 2-3 días |
| Vinted | 12:00-14:00, 20:00-22:00 | Sab-Dom | Permanente |
| FB Marketplace | 17:00-21:00 | Vie-Dom | Renovar semanal |
| Milanuncios | 10:00-12:00 | Lun-Vie | Renovar cada 5 días |

## Gestión de múltiples cuentas

### Organización
\`\`\`
Spreadsheet con:
- Producto
- Plataforma
- Fecha publicación
- Precio
- Estado (vendido/disponible)
\`\`\`

### Automatización
- Plantillas de respuesta para cada plataforma
- Fotos guardadas por categoría
- Descripciones reutilizables (con variaciones)`,
        order: 3,
      },
    ],
  },
]

// Helper functions
export function getAllModules(): Module[] {
  return AXELSCALE_MODULES.sort((a, b) => a.order - b.order)
}

export function getModuleBySlug(slug: string): Module | undefined {
  return AXELSCALE_MODULES.find((m) => m.slug === slug)
}

export function getLessonById(lessonId: string): { lesson: Lesson; module: Module } | undefined {
  for (const module of AXELSCALE_MODULES) {
    const lesson = module.lessons.find((l) => l.id === lessonId)
    if (lesson) {
      return { lesson, module }
    }
  }
  return undefined
}

export function getModuleLessons(moduleSlug: string): Lesson[] {
  const module = getModuleBySlug(moduleSlug)
  return module ? module.lessons.sort((a, b) => a.order - b.order) : []
}
