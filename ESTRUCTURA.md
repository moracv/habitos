# 📁 Estructura del Proyecto - Hábitos Atómicos PWA

```
habitos-atomicos/
│
├── 📄 ARCHIVOS PRINCIPALES (Aplicación)
│   ├── index.html              ⭐ Interfaz principal (HTML5 + Tailwind)
│   ├── app.js                  ⭐ Lógica de la app (Vanilla JS)
│   ├── manifest.json           ⭐ Configuración PWA (metadatos)
│   └── service-worker.js       ⭐ Service Worker (offline + caché)
│
├── 🔧 ARCHIVOS DE CONFIGURACIÓN (Cloudflare/Despliegue)
│   ├── _headers                ⭐⭐⭐ CRÍTICO - Headers HTTP Cloudflare
│   ├── _redirects              ⭐⭐⭐ CRÍTICO - Redirecciones Cloudflare
│   ├── wrangler.toml           Configuración Cloudflare Workers (opcional)
│   ├── netlify.toml            Configuración Netlify (respaldo compatible)
│   └── package.json            Scripts NPM + metadatos
│
├── 🧪 ARCHIVOS DE VALIDACIÓN (Desarrollo)
│   ├── validate-pwa.html       Validador PWA interactivo
│   └── diagnose.html           Diagnóstico detallado de headers
│
├── 📚 DOCUMENTACIÓN (Guías)
│   ├── README.md               Guía general del proyecto
│   ├── CLOUDFLARE_DEPLOY.md    Guía detallada de despliegue en Cloudflare
│   ├── CHECKLIST.md            Checklist antes de desplegar
│   └── ESTRUCTURA.md           Este archivo
│
├── .git/                       Repositorio Git (después de git init)
├── .gitignore                  Archivos ignorados por Git
│
└── .claude/                    Configuración de Claude Code (no sincronizar)
    └── launch.json             Configuración del servidor local
```

## 📄 Descripción de Archivos

### Archivos de Aplicación (4 archivos)

| Archivo | Propósito | Tamaño | Crítico |
|---------|-----------|--------|---------|
| `index.html` | Interfaz completa con meta tags PWA | ~10KB | ✅ SÍ |
| `app.js` | Toda la lógica: hábitos, localStorage, eventos | ~11KB | ✅ SÍ |
| `manifest.json` | Metadata PWA (nombre, iconos, display) | ~5KB | ✅ SÍ |
| `service-worker.js` | Caché, offline, sincronización | ~2KB | ✅ SÍ |

### Archivos de Configuración (5 archivos)

| Archivo | Propósito | Crítico para Cloudflare |
|---------|-----------|------------------------|
| `_headers` | Define Content-Type y headers HTTP | ✅✅✅ CRÍTICO |
| `_redirects` | Redirige rutas a index.html (SPA) | ✅✅✅ CRÍTICO |
| `wrangler.toml` | Configuración Cloudflare Workers | ⚠️ Recomendado |
| `netlify.toml` | Configuración Netlify (respaldo) | ℹ️ Opcional |
| `package.json` | Scripts NPM y metadatos | ℹ️ Opcional |

### Archivos de Validación (2 archivos)

| Archivo | Qué Valida | Acceso |
|---------|-----------|--------|
| `validate-pwa.html` | Si PWA está correctamente configurada | `/validate-pwa.html` |
| `diagnose.html` | Headers HTTP y configuración detallada | `/diagnose.html` |

### Documentación (4 archivos)

| Archivo | Contenido |
|---------|-----------|
| `README.md` | Descripción general y características |
| `CLOUDFLARE_DEPLOY.md` | Guía paso-a-paso de despliegue en Cloudflare |
| `CHECKLIST.md` | Checklist antes de desplegar |
| `ESTRUCTURA.md` | Este archivo (estructura del proyecto) |

## 🔐 Archivos Más Importantes para Cloudflare

### 1️⃣ `_headers` (CRÍTICO)
```
Define que manifest.json es de tipo application/manifest+json
Define que service-worker.js no se cachea (max-age=0)
Incluye header: Service-Worker-Allowed: /
Sin esto: Android NO reconoce la PWA como instalable
```

### 2️⃣ `_redirects` (CRÍTICO)
```
/* /index.html 200
Redirige todas las rutas a index.html
El "200" es importante: NO es una redirección 301/302
Sin esto: Las redirecciones pueden afectar manifest.json y service-worker.js
```

### 3️⃣ `manifest.json` (IMPORTANTE)
```
Metadata de la PWA
Define nombre, colores, display: standalone
Sin esto: No se instala como app
```

### 4️⃣ `service-worker.js` (IMPORTANTE)
```
Carga archivos en caché
Permite funcionamiento offline
Sin esto: La app no funciona sin conexión
```

## 📊 Tamaño Total

```
Total de código:     ~28 KB
Total del proyecto:  ~35 KB (sin .git)

Muy ligero - carga rápidamente incluso en conexión lenta ✅
```

## 🚀 Flujo de Despliegue

```
1. Desarrollo Local (Python HTTP Server)
   └─→ Verifica con validate-pwa.html y diagnose.html

2. Git (Commit y push a GitHub)
   └─→ git add . && git commit && git push

3. Cloudflare Pages
   └─→ Conecta repositorio GitHub
   └─→ Detecta _headers y _redirects automáticamente
   └─→ Despliega en HTTPS

4. Android
   └─→ Instala como PWA (no acceso directo)
   └─→ Funciona offline con Service Worker
```

## 📱 Estructura de Datos (localStorage)

```javascript
{
  "2026-05-02": {
    "date": "2026-05-02",
    "completed": {
      "despertar": true,
      "hidratacion-mañana": false,
      "cafe": true,
      // ... 18 más
    }
  },
  "2026-05-01": { /* ... */ },
  "2026-04-30": { /* ... */ },
  // ... 7 días de historial
}
```

## 🎯 Checklist de Archivos Antes de Desplegar

```bash
# En la raíz del proyecto, debe haber:
ls -la | grep "^\-"

✅ Debe tener:
  - index.html
  - app.js
  - manifest.json
  - service-worker.js
  - _headers          ← SIN PUNTO AL INICIO EN EL NOMBRE
  - _redirects        ← SIN PUNTO AL INICIO EN EL NOMBRE
  - .gitignore
  - README.md
  - package.json

❌ No debe tener:
  - index.html.bak
  - app.js.old
  - .env (credenciales)
  - node_modules/ (si usas npm)
  - .git/ (se sincroniza, pero no es necesario en Cloudflare)
```

## 🔗 Relación entre Archivos

```
index.html
  ├─ Carga: <link rel="manifest" href="/manifest.json">
  ├─ Carga: <script src="app.js"></script>
  ├─ Carga: <script src="https://cdn.tailwindcss.com"></script>
  └─ Registra: navigator.serviceWorker.register('service-worker.js')

app.js
  ├─ Lee: manifest.json (opcional, para validación)
  └─ Usa: localStorage para guardar estado

service-worker.js
  └─ Cachea: index.html, app.js, manifest.json, Tailwind CDN

manifest.json
  └─ Define: Metadata que Android/iOS leen
```

## 🌍 Accesos en Cloudflare

Después del despliegue:

```
URL base:                https://tu-dominio.pages.dev/
Interfaz principal:      https://tu-dominio.pages.dev/index.html (o /index.html)
Validador PWA:          https://tu-dominio.pages.dev/validate-pwa.html
Diagnóstico:            https://tu-dominio.pages.dev/diagnose.html
Manifest:               https://tu-dominio.pages.dev/manifest.json
Service Worker:         https://tu-dominio.pages.dev/service-worker.js
```

---

**Estado**: ✅ Proyecto completamente estructurado y listo para desplegar

**Próximo paso**: Sigue el [CHECKLIST.md](CHECKLIST.md)
