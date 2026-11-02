---
name: actividad-real-sin-inventar
description: Mostrar en una interfaz lo que hacen agentes reales (Claude Code, Codex, otros) a partir de su salida, sin inventar progreso ni filtrar datos privados. Usar al conectar un agente a un tablero, oficina virtual o registro de actividad.
---

# Actividad real, sin inventar

## La regla

Un evento existe sólo si pasó. `task.started` cuando el proceso arrancó de verdad;
`task.completed` sólo si salió bien **y** el proveedor informó fin correcto;
si falla, se corta o se cancela, es `task.failed` / `interrupted`, nunca
"terminado". Sin porcentajes: un agente no sabe cuánto le falta.

## Fuentes de verdad por proveedor

- **Claude Code**: `claude -p "<tarea>" --output-format stream-json --verbose`.
  Una línea JSON por evento. Lo útil:
  - `{"type":"system","subtype":"init","model":…,"session_id":…}`
  - `{"type":"assistant","message":{"content":[{"type":"tool_use","name":"Read","input":{…}}]}}` → un paso
  - `{"type":"result","subtype":"success","is_error":false,"permission_denials":[…]}` → fin
  Terminó bien sólo si hay `result` con `subtype: success` y `is_error: false`.
- **Codex**: `codex exec --json …` → terminó bien si hubo `turn.completed`.
- **Agentes que se reportan solos** (MCP): el estado es lo que dicen; marcarlo
  como reportado y **vencerlo** si deja de reportar (en AI HQ, 2 minutos →
  "sin noticias", nunca "trabajando" viejo).

## Convertir un paso en texto seguro

| Herramienta | Texto | Nunca |
|---|---|---|
| Read/Edit/Write | `Lee src/app.js` (ruta relativa al proyecto) | rutas fuera del proyecto: "un archivo fuera del repositorio" |
| Bash | `Ejecuta npm test` (programa + subcomando) | argumentos: pueden tener tokens (`curl -H "Authorization: …"`) |
| WebFetch | `Consulta example.com` (sólo el host) | la URL con query |
| MCP | `Usa el conector github` | los parámetros |

No guardes la respuesta del modelo ni el contenido de archivos en el registro.

## Pasos

1. Leé la salida línea a línea; una línea rota invalida la ejecución (no la
   ignores en silencio).
2. Publicá cada paso como evento (`tool.used`) con la frase segura; poné un tope
   por ejecución (AI HQ: 80) y contá el resto.
3. Escribí el evento a disco **antes** de mostrarlo.
4. Mostrá "Ahora: <último paso>" y la lista desplegable de pasos; nada de barras
   que avanzan solas.
5. Si el servidor se reinicia con una ejecución "en curso", al volver marcala
   `interrupted` con el motivo.

## Cómo saber si salió bien

- Test con líneas reales capturadas de una ejecución (no inventadas).
- Test de que un `result` con error no cuenta como terminado.
- Test de que `curl -H "Authorization: Bearer x"` se muestra como `Ejecuta curl`.
