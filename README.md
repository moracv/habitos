# 🌟 Hábitos Atómicos - PWA

Aplicación web progresiva para rastrear hábitos diarios basada en la metodología de Hábitos Atómicos.

## ✨ Características

- ✅ **PWA Completa** - Instalable en Android e iOS como aplicación nativa
- 📱 **Mobile-First** - Optimizada para dispositivos móviles
- 🟣 **Diseño Moderno** - Gradientes y animaciones fluidas
- 💾 **Almacenamiento Local** - Los datos se guardan en `localStorage`
- 🌐 **Funciona Offline** - Service Worker para soporte offline
- 📊 **Seguimiento de Progreso** - Barra de progreso visual diario
- 📅 **Historial de 7 días** - Navega entre días anteriores

## 🚀 Instalación Local

### Opción 1: Con Python
```bash
cd "C:\programa\habitos atomicos"
python -m http.server 8000
# Abre http://localhost:8000
```

### Opción 2: Con Node.js
```bash
npx http-server
```

## 🌐 Desplegar en Cloudflare Pages

### Pasos:

1. **Crear repositorio Git** (si aún no existe):
```bash
git init
git add .
git commit -m "Initial commit"
```

2. **Conectar con Cloudflare Pages**:
   - Ve a [dash.cloudflare.com](https://dash.cloudflare.com)
   - Pages → Crear un proyecto
   - Conecta tu repositorio (GitHub, GitLab)
   - **Build Command**: Dejar vacío (es un sitio estático)
   - **Build output directory**: `.` (raíz del proyecto)

3. **Configuración Importante**:
   - Los archivos `_headers` y `_redirects` serán procesados automáticamente
   - El `wrangler.toml` y `netlify.toml` también funcionan

### Archivos de Configuración Incluidos:

- **`_headers`** - Headers HTTP correctos para MIME types
- **`_redirects`** - Redirección de rutas SPA
- **`wrangler.toml`** - Configuración Cloudflare Workers
- **`netlify.toml`** - Compatible con Netlify/Cloudflare

## 📥 Instalación en Android

### Requisitos:
- ✅ HTTPS habilitado (Cloudflare lo proporciona automáticamente)
- ✅ Manifest.json válido
- ✅ Service Worker registrado
- ✅ Icons en formato correcto

### Pasos:

1. Abre la app en Chrome/Edge móvil
2. Abre el menú (⋮)
3. Selecciona **"Instalar aplicación"** o **"Añadir a pantalla de inicio"**
4. Confirma

### Si no aparece la opción de instalar:

**Problema común**: Los archivos no se sirven con los headers MIME correctos.

**Solución**:
- Verifica que `manifest.json` tenga `Content-Type: application/manifest+json`
- Verifica que `service-worker.js` tenga `Content-Type: application/javascript`
- Los headers en `_headers` deben estar correctos
- Borra caché: Settings → Storage → Clear site data

## 🔍 Validar Configuración PWA

Abre en tu navegador:
```
http://localhost:8000/validate-pwa.html
```

O en Cloudflare Pages:
```
https://tu-dominio.pages.dev/validate-pwa.html
```

Todos los items deben estar ✅

## 📋 Estructura de Hábitos

### 🌅 Mañana (6 hábitos)
- Despertar
- Hidratación
- Café
- Oración
- Lectura Bíblica
- Lectura

### 💪 Actividad (4 hábitos)
- Traslado Gym
- Podcast
- Entrenamiento (con alternativa en casa)
- Recompensa (Ducha + Batido)

### 🌙 Rutina (6 hábitos)
- Hidratación (2 botellas)
- Desconexión
- Repaso del día
- Lectura Final
- Oración Gratitud
- Dormir

**Total: 21 hábitos diarios**

## 💾 Almacenamiento de Datos

Los datos se guardan en `localStorage` con la siguiente estructura:

```javascript
{
  "2026-05-02": {
    "date": "2026-05-02",
    "completed": {
      "despertar": true,
      "hidratacion-mañana": true,
      // ...
    }
  }
}
```

Los datos persisten localmente y nunca se envían a servidores externos.

## 🐛 Solución de Problemas

### Problema: No se instala en Android
**Causa**: Headers MIME incorrectos o redirecciones problemáticas
**Solución**:
1. Verifica que `_headers` esté en la raíz
2. Verifica que `_redirects` esté en la raíz
3. Valida con `validate-pwa.html`
4. Borra caché del navegador

### Problema: Service Worker no se registra
**Causa**: El archivo no está en la ruta correcta o no tiene permisos
**Solución**:
- Asegúrate que `service-worker.js` está en la raíz
- Header requerido: `Service-Worker-Allowed: /`

### Problema: Manifest no se encuentra
**Causa**: Redirección a HTML u headers MIME incorrectos
**Solución**:
- Header requerido: `Content-Type: application/manifest+json`
- Verifica en DevTools → Network que retorna 200 OK

## 🎯 Desarrollo

### Añadir nuevos hábitos
Edita el objeto `habitsData` en `app.js`:

```javascript
const habitsData = {
    Mañana: [
        { id: 'nuevo-habito', title: '🎯 Mi Nuevo Hábito', support: 'Descripción corta' }
    ]
};
```

### Cambiar colores
Edita los valores de color en `index.html`:
- `background` - Fondo principal
- `theme-color` - Color del tema
- Clases Tailwind CSS en HTML

## 📝 Licencia

Libre para usar y modificar.

## 🚀 Notas Finales

- Esta PWA no requiere backend - funciona 100% en el cliente
- Los datos nunca salen de tu dispositivo
- Compatible con todos los navegadores modernos
- Funciona perfectamente offline después de la primera visita
