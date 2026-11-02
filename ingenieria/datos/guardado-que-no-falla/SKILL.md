---
name: guardado-que-no-falla
description: Hacer que una app local guarde todo en disco desde el primer momento y sobreviva a cortes, kill -9, archivos rotos y servidor caído, avisando siempre si algo quedó sin guardar. Usar cuando el usuario dice "no se puede perder nada" o al pasar datos de localStorage/memoria a disco.
---

# Guardado que no falla

Pedido textual que la originó: "desde que el usuario abre un proyecto eso ya se
tiene que guardar, no puede fallar nada". Lo que sigue es lo que hizo falta para
cumplirlo de verdad en AI HQ.

## Piezas

1. **Escritura atómica** (un archivo JSON):
   temporal en el mismo directorio → `write` → `fsync` → copiar el actual a
   `.bak` → `rename(temporal, archivo)` → `fsync` del directorio. Un corte deja
   el viejo o el nuevo, nunca uno a medias.
2. **Lectura tolerante**: si el archivo falta, está roto o no pasa la validación,
   usar `.bak`. Si tampoco sirve, arrancar vacío pero **renombrar el roto a
   `<nombre>.roto-<fecha>`** (nunca borrarlo ni pisarlo) y avisar.
3. **Diario** para eventos: una línea JSON por registro con `fsync`; al leer,
   ignorar una última línea cortada. Rotar por tamaño con `rename`.
4. **Fuera del repositorio**: `~/.local/share/<app>` (o `XDG_DATA_HOME`, o una
   variable de entorno). Sobrevive a `git clean`.
5. **Nada se borra de verdad**: borrar deja una lápida con fecha y copia la última
   versión a `borrados/`.

## Si los datos viven en el navegador (localStorage)

- Interceptá las escrituras de tus claves (`Storage.prototype.setItem/removeItem`
  para el prefijo de la app) y copiá cada cambio al servidor local.
- Al servir la página, el servidor **inyecta** lo guardado en el HTML (así está
  disponible antes de que arranque la app; `JSON.stringify` escapando `<`, U+2028
  y U+2029).
- Al abrir, comparación clave por clave con fecha: gana la más nueva; lo que sólo
  estaba en el navegador sube enseguida (así se migra lo viejo).
- Cola con reintentos crecientes que **nunca descarta**; un cambio nuevo de la
  misma clave no se pisa con uno viejo que vuelve de un reintento.
- `sendBeacon` al cerrar la pestaña con lo pendiente; `beforeunload` pide
  confirmación si quedó algo sin guardar.
- Copia en memoria: si localStorage se llena o falla, la app sigue leyendo lo último.
- **Indicador visible**: "✓ Guardado en disco" / "Guardando…" /
  "⚠ Sin guardar en disco · reintentando" (con un motivo entendible, no "Failed to fetch").

## Pruebas obligatorias

1. Proceso hijo que escribe un temporal y se mata con SIGKILL antes del rename → el archivo sigue bueno.
2. Archivo roto → se recupera el `.bak`; ambos rotos → arranque vacío y `.roto-*` conservado.
3. Navegador real: abrir con datos vacíos → en <1 s están en disco.
4. Cambio en un navegador → otro navegador limpio lo ve al abrir.
5. Servidor apagado → indicador en aviso; servidor de vuelta → se guarda solo.
6. `kill -9` del servidor → al volver, todo está.

## Trampas que nos pasaron

- **Un servidor de prueba huérfano** en el mismo puerto (de una corrida que se
  cortó) hizo que "apagar el servidor" no apagara nada y los resultados
  parecieran bien. Antes de concluir: `ss -ltnp | grep <puerto>`.
- **El navegador de pruebas escribe en los datos reales** si apunta al servidor
  real: bloqueá los POST de guardado en las pruebas
  (`page.route('**/api/store', …fulfill…)`) o usá una carpeta de datos temporal.
- Si la app escribe sólo cuando algo cambia, "guardado al abrir" puede no pasar:
  comprobalo mirando el disco, no el indicador.

## Cómo saber si salió bien

Las seis pruebas obligatorias pasan, y además: después de un `kill -9` en medio
del uso, un navegador nuevo abre el proyecto exactamente como estaba, y el
indicador nunca dijo "Guardado" mientras el servidor estaba caído.
