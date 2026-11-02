---
name: retomar-ejecucion-cortada
description: Retomar el trabajo de un agente de código que se cortó a mitad de una tarea (código de salida 1, límite de turnos o de contexto) sin perder lo hecho ni repetirlo. Usar cuando una ejecución falla después de muchos pasos y su worktree tiene cambios.
---

# Retomar una ejecución cortada

Caso real: la tarea 006 de AI HQ se cortó en el paso 57 con "Claude terminó con
código 1". Tenía casi todo hecho. Se retomó en el mismo worktree y terminó en 40
pasos más, sin rehacer nada.

## Pasos

1. **No borres el worktree ni relances la tarea de cero.** Lo hecho está ahí.
2. **Medí qué quedó**: `git -C <worktree> add -N . && git diff --stat` y corré
   los tests ahí. Si pasan, lo hecho es usable.
3. **Compará con el alcance** de la tarea punto por punto: qué está, qué falta.
4. **Relanzá en el mismo worktree** (en AI HQ: "Rehacer con esta corrección")
   con un mensaje que diga, en este orden:
   - que se cortó y en qué paso,
   - **qué ya está y no hay que rehacer** (archivos concretos) y que los tests pasan,
   - **sólo lo que falta**, con el número de punto del alcance,
   - qué correr al final (`npm test`, el build).
5. Revisá el resultado como cualquier otra ejecución.

## Mensaje de ejemplo

> Te cortaste en el paso 57. Lo de engine/board.mjs, integrate.mjs, runner, mcp,
> server y tools/coordination.test.mjs ya está y los tests pasan: no lo rehagas.
> Terminá sólo lo que falta de la tarea 006: el punto 5 (interfaz…) y el punto 7
> (documentar…). Corré npm test y npm run builder al final.

## Reglas

- La corrección es puntual, no una regla general: si tu sistema convierte
  correcciones en reglas fijas, asegurate de que esta quede como puntual.
- Si se corta dos veces en el mismo punto, partí la tarea: es demasiado grande
  para una sesión.

## Cómo saber si salió bien

- La segunda ejecución no tocó (o tocó mínimamente) los archivos que ya estaban.
- El alcance completo quedó cubierto y los tests siguen pasando.

## Fuentes

- AI HQ, ejecuciones 6df0dc18 (cortada) y 6ebfebfd (retomada), 2026-11-02.
