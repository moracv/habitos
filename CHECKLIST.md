# ✅ Checklist PWA - Hábitos Atómicos

## Antes de Desplegar en Cloudflare Pages

### 📋 Archivos Requeridos

- [ ] ✅ `index.html` - Archivo principal (existe)
- [ ] ✅ `app.js` - Lógica de la aplicación (existe)
- [ ] ✅ `manifest.json` - Configuración PWA (existe)
- [ ] ✅ `service-worker.js` - Service Worker (existe)
- [ ] ✅ `_headers` - Headers HTTP (existe) ⭐ CRÍTICO
- [ ] ✅ `_redirects` - Redirecciones (existe) ⭐ CRÍTICO
- [ ] ✅ `package.json` - Metadatos (existe)
- [ ] ✅ `README.md` - Documentación (existe)

### 🔧 Verificación Local

Antes de subir a Cloudflare, verifica localmente:

```bash
# 1. Navega a la carpeta
cd "C:\programa\habitos atomicos"

# 2. Inicia servidor local
python -m http.server 8000

# 3. Abre en navegador
http://localhost:8000
```

- [ ] La app se ve correctamente (colores, layout)
- [ ] Los checkboxes funcionan (puedes marcar hábitos)
- [ ] El progreso se actualiza
- [ ] Puedes cambiar de días
- [ ] Los datos persisten al recargar (localStorage)

### 🔍 Validación PWA Local

Abre en navegador:
```
http://localhost:8000/validate-pwa.html
```

Todos los items deben estar ✅:
- [ ] Manifest.json accesible
- [ ] Service Worker registrado
- [ ] Meta viewport presente
- [ ] Meta theme-color presente
- [ ] Link manifest presente
- [ ] Manifest.json válido
- [ ] Service Worker correctamente configurado
- [ ] Icons en manifest.json
- [ ] localStorage disponible

### 📱 Diagnóstico Detallado

Abre en navegador:
```
http://localhost:8000/diagnose.html
```

Todos los items deben estar ✅:
- [ ] index.html accesible
- [ ] manifest.json con Content-Type correcto
- [ ] service-worker.js con Content-Type correcto
- [ ] Cache-Control configurado
- [ ] Headers de seguridad presentes
- [ ] HTTPS habilitado (en Cloudflare sí, en local puede estar en http)

### 🌐 Preparar Git

```bash
cd "C:\programa\habitos atomicos"

# 1. Inicializar repo si no existe
git init

# 2. Agregar todos los archivos
git add .

# 3. Hacer commit
git commit -m "PWA Hábitos Atómicos - Configuración completa"

# 4. Cambiar rama a main si es necesario
git branch -M main
```

- [ ] Repositorio Git inicializado
- [ ] Todos los archivos agregados
- [ ] Primer commit hecho
- [ ] Rama principal es "main"

### 🚀 Desplegar en Cloudflare Pages

1. **Subir a GitHub** (o GitLab):
```bash
git remote add origin https://github.com/tu-usuario/habitos-atomicos.git
git push -u origin main
```
- [ ] Repositorio creado en GitHub
- [ ] Código subido exitosamente

2. **En Cloudflare Pages Dashboard**:
   - [ ] Ir a: dash.cloudflare.com → Pages
   - [ ] Click: "Create project" → "Connect to Git"
   - [ ] Seleccionar: tu-usuario/habitos-atomicos
   - [ ] Framework preset: **None**
   - [ ] Build command: **(dejar VACÍO)**
   - [ ] Build output directory: **.**
   - [ ] Click: "Save and Deploy"

3. **Esperar despliegue**:
   - [ ] Build completado (2-3 minutos)
   - [ ] Status: "Active" ✅
   - [ ] URL asignada (ej: habitos-atomicos.pages.dev)

### ✅ Verificar en Cloudflare

Después del despliegue:

```
https://tu-dominio.pages.dev/diagnose.html
```

Todos los items deben estar ✅:
- [ ] index.html accesible (status 200)
- [ ] manifest.json accesible (status 200)
- [ ] manifest.json Content-Type: application/manifest+json
- [ ] service-worker.js accesible (status 200)
- [ ] service-worker.js Content-Type: application/javascript
- [ ] Service-Worker-Allowed header presente
- [ ] app.js accesible
- [ ] Headers de seguridad presentes
- [ ] HTTPS habilitado

**Si algo está ❌**: 
- Revisa [CLOUDFLARE_DEPLOY.md](CLOUDFLARE_DEPLOY.md) sección "Troubleshooting"

### 📱 Instalación en Android

En tu teléfono:

1. Abre Chrome/Edge
2. Navega a: `https://tu-dominio.pages.dev`
3. Espera 2-3 segundos
4. Debería aparecer popup: **"Instalar"** o **"Añadir a pantalla"**
5. Toca **"Instalar"**
6. Confirma

**Resultado esperado**: 
- [ ] Aparece ícono en pantalla de inicio
- [ ] Abre como app (pantalla completa, sin barra URL)
- [ ] Funciona offline (si visitó antes)
- [ ] Se puede desinstalar como app

**Si no aparece el popup**:
- [ ] Limpia caché: Settings → Storage → Clear site data
- [ ] Recarga la página
- [ ] Intenta en menú (⋮) → "Instalar aplicación"

### 🧪 Pruebas Funcionales

Una vez instalada en Android:

- [ ] Se abre en pantalla completa (sin barra URL)
- [ ] Puedo marcar hábitos
- [ ] Los datos se guardan
- [ ] El progreso se actualiza
- [ ] Puedo cambiar de días
- [ ] Puedo hacer reset del día
- [ ] Funciona sin conexión (si está en caché)
- [ ] El ícono se ve bien (no es genérico)

### 🎯 Resumen Final

Antes de decir "listo":

**En Local:**
- [ ] App funciona perfectamente en http://localhost:8000
- [ ] validate-pwa.html muestra todos ✅
- [ ] diagnose.html muestra todos ✅

**En Cloudflare:**
- [ ] Repositorio Push exitoso
- [ ] Build completado sin errores
- [ ] diagnose.html en Cloudflare muestra todos ✅
- [ ] Se instala correctamente en Android como APP (no acceso directo)
- [ ] Funciona correctamente después de instalar
- [ ] Offline funciona (si está en caché)

## 🆘 Si algo falla

### Compilación falla en Cloudflare
- Revisa: Settings → Builds → View logs
- El error probablemente sea de permisos o configuración

### No aparece opción de instalar
- Verifica que `/manifest.json` tiene status **200** (no 301/302)
- Verifica Content-Type es **application/manifest+json**
- Limpia caché del navegador completamente
- Abre en navegador nuevo (en modo incógnito)

### Instala como acceso directo (no app completa)
- **CAUSA**: Headers MIME incorrectos
- **SOLUCIÓN**: Verifica que `_headers` está en la raíz
- Purga caché en Cloudflare Dashboard
- Reintenta instalar

### Service Worker no funciona
- Verifica que `/service-worker.js` tiene status **200**
- Verifica Content-Type es **application/javascript**
- Verifica que `Service-Worker-Allowed: /` está en headers
- En DevTools → Application → Service Workers debe decir "activated and running"

---

**Estado Actual**: ✅ PWA completa y lista para desplegar

**Próximos Pasos**: 
1. Verifica tu local con este checklist
2. Sube a GitHub
3. Conecta con Cloudflare Pages
4. Instala en Android
5. ¡Disfruta! 🚀
