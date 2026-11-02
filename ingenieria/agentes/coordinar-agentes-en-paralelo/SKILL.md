---
name: coordinar-agentes-en-paralelo
description: Poner a varios agentes de código (Claude Code, Codex u otros) a trabajar a la vez sobre el mismo repositorio sin que se pisen, que sepan qué hace cada uno y que se puedan avisar cosas. Usar al pasar de un agente a varios, o cuando dos tareas tocan zonas cercanas del código.
---

# Coordinar agentes en paralelo

Diseño que usa AI HQ (tarea 006), hecho por un agente y revisado.

## Las cuatro piezas

1. **Un worktree por ejecución** (`git worktree add --detach <dir> HEAD`). Es lo
   que garantiza que nadie escribe encima de nadie mientras trabaja. Los
   `git worktree add` van de a uno (comparten el repositorio): una cola.
2. **Tablero compartido en disco**: quién trabaja, en qué tarea, en qué worktree
   y su último paso. Se arma con los eventos reales, no con lo que el agente dice
   que va a hacer.
3. **Reservas de rutas con vencimiento** (30 min, renovables): `claim(agente,
   rutas, motivo)` → aceptada o rechazada con quién la tiene. Dos reservas chocan
   si una ruta contiene a la otra (`src/` y `src/app.js`). Se liberan solas
   cuando la ejecución termina, bien o mal.
4. **Mensajes**: a un agente o a todos, con bandeja y marca de leído. Una
   ejecución nueva recibe en su prompt los mensajes "a todos" del último día y
   los suyos sin leer.

## Qué recibe cada agente al empezar

En el prompt: quién más trabaja y en qué, qué rutas están reservadas y por quién,
sus mensajes sin leer, y la regla: "reservá antes de editar; si algo está
reservado por otro, escribile en vez de editarlo; leé tus mensajes al empezar y
antes de terminar". Las herramientas (`claim_paths`, `release_paths`,
`send_message`, `read_messages`, `who_is_working`) van por un MCP local; con
Claude Code: `--mcp-config` con sólo ese servidor y `--strict-mcp-config`.

## Integrar sin pisar

- Diff del worktree contra su commit base, con un índice temporal
  (`GIT_INDEX_FILE`) para no tocar el worktree, **excluyendo los archivos que se
  regeneran solos** (builds, atlas, capturas).
- Si un archivo del diff tiene cambios sin commitear en el checkout principal:
  no se toca nada.
- `git apply --check`; si falla, no se toca nada y se informa qué archivos chocan
  y contra qué commits (`git log base..HEAD -- archivo`).
- Si pasa, `git apply` todo o nada, sin commit. Marcar la ejecución como
  integrada para no aplicarla dos veces.

## Límites

- Hasta 3 a la vez en una máquina común: más que eso satura y las reservas
  empiezan a bloquear de más.
- Las reservas son un acuerdo, no un candado del sistema de archivos: el
  worktree es lo que protege de verdad; la reserva evita choques al integrar.

## Cómo saber si salió bien

- Test con tres ejecuciones a la vez con un proveedor falso: cada una en su
  worktree, el tablero las muestra a las tres.
- Test de reservas que se solapan (carpeta vs. archivo), vencimiento y
  liberación al terminar.
- Test de integración limpia y con choque en un repositorio git temporal: con
  choque, el checkout queda exactamente igual.

## Fuentes

- AI HQ, tarea 006 (`self-host/engine/board.mjs`, `integrate.mjs`), 2026-11.
