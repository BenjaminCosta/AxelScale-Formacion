# Scripts de Testing - AXELSCALE

## Usuario de Prueba

Se ha creado un usuario de prueba con los siguientes datos:

- **Email**: `benjacosta@gmail.com`
- **Plan**: 3 Meses (Más Popular)
- **Estado**: Activo
- **Vencimiento**: 13 de Marzo, 2026 (90 días desde hoy)

## Scripts Disponibles

### 1. Crear Usuario de Prueba

```bash
npx tsx scripts/create-test-user.ts
```

Este script:
- Crea un usuario con email `benjacosta@gmail.com`
- Le asigna una suscripción activa del plan de 3 meses
- Configura la fecha de vencimiento a 90 días en el futuro

### 2. Generar Magic Link

```bash
npx tsx scripts/create-magic-link.ts
```

Este script:
- Genera un magic link válido por 15 minutos
- Te permite iniciar sesión como el usuario de prueba
- Imprime el link en la consola para copiar y pegar en el navegador

## Flujo de Testing

1. **Crear el usuario** (solo primera vez):
   ```bash
   npx tsx scripts/create-test-user.ts
   ```

2. **Generar magic link** (cada vez que quieras iniciar sesión):
   ```bash
   npx tsx scripts/create-magic-link.ts
   ```

3. **Copiar el link** que aparece en la consola y abrirlo en el navegador

4. **Verificar funcionalidades**:
   - ✅ Ver plan actual en `/subscribe`
   - ✅ Ver fecha de vencimiento
   - ✅ Acceso completo a todos los módulos
   - ✅ Dashboard con estadísticas
   - ✅ Botón "Ver Planes" en el sidebar

## Notas

- El magic link expira en 15 minutos
- Puedes generar nuevos magic links cuando lo necesites
- La suscripción está configurada como "activa" por 90 días
- El usuario NO es admin (role: "USER")
