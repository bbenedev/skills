---
name: revisar-e-integrar-trabajo-de-agente
description: Revisar el diff que dejó un agente en su worktree y pasarlo al checkout principal sin romper nada ni pisar trabajo en paralelo. Usar cada vez que una ejecución de agente termina y hay que decidir si se integra.
---

# Revisar e integrar el trabajo de un agente

Checklist que salió de integrar cinco tareas hechas por agentes en AI HQ. Cada
punto existe porque alguna vez faltó.

## Pasos

1. **Estado de la ejecución**: terminó con éxito (no sólo "salió con código 0":
   el proveedor tiene que haber informado fin correcto). Mirá qué permisos le
   negaron; si negaron algo necesario, el trabajo puede estar incompleto.
2. **Archivos tocados**: `git -C <worktree> status --short` y `git add -N .` para
   ver también los nuevos. Comparalo con el alcance de la tarea.
3. **Descartá lo regenerado**: imágenes, atlas, builds que cambian al correr los
   tests aunque nadie los tocó. En AI HQ los PNG de `apps/web/public/atlas/`
   cambiaban en cada `npm test`: se excluyen con `git diff -- . ':!apps/web/public/atlas'`.
4. **Tests en el worktree**: corré la suite ahí, no confíes en lo que dice el agente.
5. **Leé el código nuevo entero**, buscando:
   - **contratos que cambiaron y rompen a otros**: en AI HQ el agente hizo que
     todos los POST exijan JSON; el botón Cancelar de la interfaz mandaba un POST
     sin cuerpo y hubiera dejado de andar. Buscá todos los que llaman a lo que cambió
     (`grep` de la ruta o función).
   - estados que la interfaz no conoce (un estado nuevo `interrupted` que la
     pantalla no sabía mostrar ni permitía rehacer),
   - escrituras a disco sin manejo de error, ids que se repiten tras reiniciar,
     cosas que se guardan en la carpeta equivocada (la real en vez de la de test).
6. **Aplicá con 3 vías**: `git diff ... > tarea.patch` y en el checkout principal
   `git apply --3way tarea.patch`. Si hay conflicto, resolvelo a mano (suelen ser
   imports agregados por los dos lados) y corré todo de nuevo.
7. **Arreglá lo encontrado en el mismo commit de integración** y decilo en el
   mensaje ("Ajustes en la revisión: …").
8. **Probalo de verdad**: si toca un servidor, levantalo en otro puerto con una
   carpeta de datos temporal y hacé el recorrido real (ver
   `recorrido-qa-con-navegador`). Si toca disco, matalo con `kill -9` y verificá
   que vuelve.
9. **Commit con trazabilidad**: título con la tarea y "hecha por el agente",
   cuerpo con el id de la ejecución, pasos, qué se ajustó.

## Reglas

- Nunca integres sin correr los tests en el checkout principal después de aplicar.
- Nunca pises cambios sin commitear del checkout principal: si hay, commitealos
  o apartalos antes.
- No hagas push si no te lo pidieron.
- Si el diff tiene más de lo pedido, preguntá o descartá lo extra; no lo "aproveches".

## Cómo saber si salió bien

- Suite completa en verde en el checkout principal.
- La prueba real (navegador, kill -9, servidor caído) se comportó como la tarea pedía.
- El commit explica qué hizo el agente y qué se corrigió en la revisión.
