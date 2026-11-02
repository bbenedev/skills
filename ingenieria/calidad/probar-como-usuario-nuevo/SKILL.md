---
name: probar-como-usuario-nuevo
description: Probar una app como alguien que la abre por primera vez, sin datos y sin saber nada, para encontrar lo que sólo tiene sentido para quien la construyó. Usar antes de mostrarle una app a alguien nuevo o cuando piden "que un usuario sienta que la puede usar sin problemas".
---

# Probar como usuario nuevo

Quien construye una app la abre siempre con sus datos, su configuración y su
contexto. Lo que ve un usuario nuevo es otra app. En AI HQ, esta prueba
encontró en 5 minutos lo que semanas de uso propio no:

- el usuario nuevo caía en **nuestro** proyecto (un edificio de 11 salas que no
  tenía nada que ver con su negocio),
- las sugerencias del chat hablaban de "la tarea 006",
- a una tienda de mates se le ofrecían las tareas del repositorio de la app,
- el chat de su negocio iba a la conversación del desarrollador.

## Cómo

1. **Datos vacíos de verdad**: levantá el servidor con una carpeta de datos
   temporal y otro puerto, y un navegador sin almacenamiento (contexto nuevo de
   Playwright). Verificá que no quede un servidor viejo en ese puerto.
2. **Primera pantalla, sin tocar nada**: ¿dice qué es y qué hacer? ¿hay algo
   que sólo entiende el que la hizo (nombres internos, números de tarea,
   proyectos de ejemplo presentados como si fueran del usuario)?
3. **Inventá un usuario concreto y seguí su camino**: no "un usuario", sino
   "Ana, tienda online de mates, quiere responder más rápido por WhatsApp".
   Hacé lo que ella haría, en orden, con sus palabras.
4. **Buscá filtraciones del constructor**: textos, tareas, sugerencias, datos o
   integraciones que son del desarrollador y aparecen para el usuario.
5. **Recargá** en cada paso importante: ¿se mantuvo lo que hizo? ¿vuelve a
   aparecer la bienvenida?
6. **Repetí con otro perfil** muy distinto (servicios, educación): lo que se
   arregló para uno puede romper al otro.

## Qué arreglar en el momento y qué no

- En el momento: textos y elementos que no corresponden a ese usuario,
  avisos que tapan lo importante, botones que llevan a cosas del constructor.
- Como tarea aparte: lo que es de arquitectura (en AI HQ, que cada negocio
  tenga su propio chat, carpeta y actividad).

## Cómo saber si salió bien

- Un usuario inventado llega desde la primera pantalla a pedir su primera tarea
  sin ver nada que no sea de su negocio.
- Tras recargar, todo sigue y la bienvenida no vuelve.
- La lista de "filtraciones del constructor" encontradas está en cero o en
  tareas abiertas.

## Fuentes

- AI HQ, prueba con datos vacíos del 2026-11-02 (negocio de ejemplo "Mates del Sur").
