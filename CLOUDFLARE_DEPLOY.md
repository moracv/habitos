# 🚀 Guía de Despliegue en Cloudflare Pages

## El Problema y la Solución

Cuando desployas una PWA en Cloudflare sin configuración correcta, Android instala la app como un **acceso directo** en lugar de como una **aplicación nativa**.

**Causa**: Los headers MIME y redirecciones no se configuran correctamente para PWA.

## ✅ Configuración Correcta

Esta carpeta incluye **todos los archivos necesarios** para que funcione correctamente:

### Archivos Críticos:

1. **`_headers`** ⭐ MÁS IMPORTANTE
   - Define Content-Type para manifest.json
   - Define Content-Type para service-worker.js
   - Define headers de seguridad

2. **`_redirects`** ⭐ IMPORTANTE
   - Redirige todas las rutas a index.html (SPA)
   - Retorna status 200 (no 301/302)

3. **`wrangler.toml`**
   - Configuración de Cloudflare
   - Opcional pero recomendado

4. **`netlify.toml`**
   - Respaldo compatible
   - Algunos deployments lo leen

## 📋 Pasos de Despliegue

### 1. Preparar Repositorio Git

```bash
cd "C:\programa\habitos atomicos"
git init
git add .
git commit -m "PWA Hábitos Atómicos inicial"
git branch -M main
```

### 2. Subir a GitHub (o GitLab)

```bash
git remote add origin https://github.com/tu-usuario/habitos-atomicos.git
git push -u origin main
```

### 3. Conectar con Cloudflare Pages

1. Ve a [dash.cloudflare.com](https://dash.cloudflare.com)
2. Navegador → Pages
3. Crear proyecto → Conectar repositorio Git
4. Selecciona: `tu-usuario/habitos-atomicos`

### 4. Configurar Build

**IMPORTANTE**: Estos valores deben estar **EXACTAMENTE** así:

- **Framework**: `None`
- **Build command**: (Dejar VACÍO)
- **Build output directory**: `.` (un punto)
- **Environment variables**: (Dejar vacío)

![Configuración Cloudflare Pages](https://docs.cloudflare.com/images/pages-build-settings.png)

### 5. Desplegar

- Click en "Save and Deploy"
- Espera a que termine (2-3 minutos)
- Tu URL será: `https://habitos-atomicos.pages.dev`

## 🔍 Verificar que Funciona Correctamente

### En tu navegador Chrome/Edge:

1. Abre DevTools (F12)
2. Application → Manifest
3. Deberías ver:
   ```
   name: Hábitos Atómicos - Checklist Diario
   short_name: Hábitos
   start_url: /index.html
   scope: /
   display: standalone
   ```

4. Abre DevTools → Network
5. Recarga la página
6. Busca `manifest.json`:
   - Status: **200** ✅ (NO 301/302/404)
   - Content-Type: **application/manifest+json** ✅

7. Busca `service-worker.js`:
   - Status: **200** ✅
   - Content-Type: **application/javascript** ✅

### Validador PWA:

Abre en el navegador:
```
https://habitos-atomicos.pages.dev/validate-pwa.html
```

Todos los items deben estar ✅

## 📱 Instalar en Android

1. Abre en Chrome Mobile: `https://habitos-atomicos.pages.dev`
2. Espera 2-3 segundos
3. Aparecerá un popup: **"Instalar"** o **"Añadir a pantalla de inicio"**
4. Toca **"Instalar"**
5. La app aparecerá como ícono independiente en tu pantalla de inicio

### Si no aparece el popup:

**Opción A** (Chrome):
- Menú (⋮) → **"Instalar aplicación"**

**Opción B** (Edge):
- Menú (⋮) → **"Aplicaciones"** → **"Instalar este sitio como aplicación"**

**Si sigue sin funcionar**:

1. Abre DevTools (F12) → Console
2. Debería estar limpia (sin errores rojos)
3. Abre DevTools → Application → Service Workers
4. Debería tener estado **"activated and running"** ✅

## 🐛 Troubleshooting

### Error: Manifest no se encuentra (404)

**Problema**: Cloudflare está redirigiendo a HTML
**Solución**:
1. Verifica que `_redirects` tiene SOLO:
   ```
   /* /index.html 200
   ```
2. Verifica que `_headers` existe en raíz
3. Purga caché en Cloudflare Dashboard

### Error: Service Worker falla

**Problema**: Headers MIME incorrectos
**Solución**:
1. En `_headers`, confirma:
   ```
   /service-worker.js
     Content-Type: application/javascript; charset=utf-8
     Cache-Control: max-age=0, no-cache, no-store, must-revalidate
   ```
2. El archivo DEBE estar en la raíz (no en carpeta)

### Instala como acceso directo, no como app

**Problema**: Headers MIME incorrectos en manifest.json
**Solución**:
1. En `_headers`, confirma:
   ```
   /manifest.json
     Content-Type: application/manifest+json; charset=utf-8
     Cache-Control: max-age=86400, public
   ```
2. Limpia caché: DevTools → Storage → Clear Site Data
3. Recarga página
4. Intenta instalar nuevamente

### La app se ve blanca/vacía

**Problema**: Tailwind CSS no carga desde CDN
**Solución**:
1. Abre DevTools → Network
2. Filtra por: `cdn.tailwindcss.com`
3. Si está rojo (404), el CDN está bloqueado
4. Solución alternativa: Descarga CSS localmente

## 🔒 Seguridad

Los headers en `_headers` incluyen:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `X-XSS-Protection: 1; mode=block`

## 📊 Checklist Final

Antes de decir "está listo":

- [ ] `_headers` existe en raíz
- [ ] `_redirects` existe en raíz
- [ ] `manifest.json` en raíz
- [ ] `service-worker.js` en raíz
- [ ] `index.html` en raíz
- [ ] Desploy completó sin errores
- [ ] DevTools muestra manifest.json con status 200
- [ ] DevTools muestra service-worker.js con status 200
- [ ] `validate-pwa.html` muestra todos ✅
- [ ] Se instala en Android como app (no acceso directo)

## 🎯 Resumen Rápido

```bash
# 1. Preparar
cd tu-carpeta
git init && git add . && git commit -m "init"

# 2. Subir a GitHub
git remote add origin https://github.com/tu-usuario/repo.git
git push -u origin main

# 3. En Cloudflare Pages:
# - Conectar repositorio
# - Build command: (vacío)
# - Output directory: .
# - Deploy

# 4. Verificar
# - https://tu-dominio.pages.dev/validate-pwa.html
# - Todos deben estar ✅
```

## 📞 Soporte

Si sigue sin funcionar:

1. Verifica: https://tu-dominio.pages.dev/validate-pwa.html
2. Abre DevTools → Console (no debe haber errores rojos)
3. Abre DevTools → Application → Manifest
4. Abre DevTools → Application → Service Workers

Si todo está ✅ pero Android no instala:
- Limpia caché completo del navegador
- Desinstala y reinstala Chrome
- Intenta en navegador Chrome en lugar de Edge
