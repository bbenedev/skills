---
name: escribir-tarea-para-agente
description: Escribir la especificación de una tarea de código para que otro agente (Claude Code, Codex) la haga solo en un worktree aislado y vuelva con un diff revisable. Usar antes de lanzar cualquier ejecución de agente sobre un repositorio.
---

# Escribir una tarea para un agente

Sale de las tareas 003 a 006 de AI HQ, que agentes hicieron solos en 40–50 pasos
cada una y se integraron con correcciones mínimas. Lo que funcionó y lo que falló
está en las reglas.

## Cuándo usarla

- Vas a delegar trabajo de código a un agente que no ve esta conversación.
- El trabajo entra en una sesión (hasta ~50 pasos). Si no, partilo.

No la uses para pedidos de una línea ("renombrá X"): ahí alcanza con el pedido.

## Qué tiene que tener (en este orden)

1. **Título con número y nombre**: `# Tarea 2.3 — Historial que sobrevive a reinicios`.
2. **Objetivo**: 2–4 líneas con el *porqué* en términos del usuario, no de código.
   "Nada de lo que pasa en el puente se puede perder, aunque el proceso muera de
   golpe" es mejor que "persistir eventos".
3. **Alcance numerado**, cada punto con:
   - el archivo nuevo o existente y su nombre exacto,
   - las funciones o rutas con su firma (`POST /api/runs/<id>/revise` con `{ text }` de 1 a 2000 caracteres),
   - los casos borde que importan (qué pasa si el archivo está roto, si se corta a mitad, si hay dos a la vez).
4. **Reutilizar lo que existe**: nombrá el módulo que ya resuelve una parte
   ("usar `durable.mjs`, no reimplementarlo"). Si no lo decís, el agente lo reescribe.
5. **Tests concretos**: la lista de escenarios, no "agregar tests". Incluí al
   menos uno que simule el fallo real (proceso matado con SIGKILL, servidor caído).
   Pedí que nunca llamen al servicio real (Claude, APIs): proceso falso inyectable.
6. **Documentar**: qué archivo de docs y qué marcar en el backlog.
7. **Reglas**:
   - "No hacer commit, merge ni push. Dejar el diff para revisión."
   - "`npm test` tiene que pasar. Sin dependencias nuevas."
   - **Si hay trabajo en paralelo, nombrá los archivos que NO puede tocar**
     ("NO modificar `tools/builder.template.html`: otra persona lo está
     trabajando"). Esto evitó todos los conflictos en AI HQ salvo uno, que fue en
     un archivo que no se nombró.

## Reglas

- Commiteá la tarea antes de lanzarla: el agente trabaja sobre `HEAD`, no sobre
  tu copia sin confirmar.
- Una tarea = un resultado verificable. Si el objetivo tiene "y además", partila.
- Nada de "mejorá", "optimizá", "hacelo lindo": decí qué se tiene que ver o medir.
- Si la tarea toca la interfaz, pedí el texto exacto de los botones y en qué
  idioma/registro (en AI HQ: español rioplatense).
- Pedí verdad: "no decir que terminó si no terminó", "no inventar progreso".

## Plantilla

```markdown
# Tarea N.M — <resultado en palabras del usuario>

## Objetivo
<qué cambia para el usuario y por qué>

## Alcance
1. `<archivo>` (nuevo): <funciones y comportamiento, casos borde>.
2. `<archivo>`: <cambio>. Reutilizar `<módulo existente>`.
3. Tests en `<archivo de test>`: <escenario 1>; <escenario 2>; <fallo simulado>.
4. Documentar en `<doc>` y marcar la tarea en `<backlog>`.

## Reglas
- NO modificar `<archivo que otro está tocando>`.
- No hacer commit, merge ni push. `<comando de tests>` tiene que pasar. Sin dependencias nuevas.
```

## Cómo saber si salió bien

- El agente terminó sin pedir permisos que no tenía (o los pocos que pidió no eran necesarios).
- El diff toca sólo los archivos del alcance (más los generados, que se descartan).
- Los tests nuevos cubren cada escenario que nombraste.
- La revisión (ver `revisar-e-integrar-trabajo-de-agente`) encuentra a lo sumo detalles.
