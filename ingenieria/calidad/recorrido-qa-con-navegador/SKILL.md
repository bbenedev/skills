---
name: recorrido-qa-con-navegador
description: Recorrer toda una app web como un usuario nuevo con un navegador automatizado (Playwright), en varias pantallas, para encontrar fallas, cosas feas y lo que quita confianza, y dar un veredicto honesto. Usar cuando piden "probá toda la app", "buscá cosas raras" o antes de mostrársela a alguien.
---

# Recorrido de QA con navegador

## Preparación

- Playwright con Chromium (`npm i playwright && npx playwright install chromium`)
  en una carpeta aparte del proyecto.
- **No ensucies los datos reales**: interceptá las escrituras
  (`page.route('**/api/<guardado>', r => r.request().method() === 'POST' ? r.fulfill({status:200, body:'{}'}) : r.continue())`)
  o levantá el servidor en otro puerto con una carpeta de datos temporal.
- Juntá errores: `page.on('pageerror')` y `console` de tipo error.

## El recorrido

1. **Primera impresión** sin tocar nada (1440×900): ¿se entiende qué es y qué
   hacer? ¿parece que anda o que está roto?
2. **Cada sección y cada pestaña**, cada menú abierto, cada ventana con su "Cerrar".
3. **Clics sueltos y Escape**: hacé clic en un lugar cualquiera dentro de cada
   ventana y apretá Escape. En AI HQ un clic suelto en una plantilla creaba un
   negocio nuevo sin confirmar, y Escape no cerraba la ventana.
4. **Navegar desde adentro**: desde cada pantalla completa, ¿se puede ir a otra
   sección sin volver al inicio?
5. **Tres tamaños**: 1440×900, 1024×700, 390×844.
6. **Elementos aplastados**: si un clic automático falla con "otro elemento
   intercepta", medí el elemento (`getBoundingClientRect`): en AI HQ un botón
   medía 12 px de alto dentro de un contenedor flex y tampoco se podía tocar a mano.
   Arreglo típico: `flex: 0 0 auto`.
7. **Verdad**: ¿algún número, texto o estado es de una demo o está en cero sin
   sentido? ¿Dice "simulación" donde ya no lo es?

## Cómo mirar las capturas

Por cada una: qué molesta a ojo humano (espacio vacío, texto chico, cosas
encimadas, números enormes sin sentido como "939 %"), qué no se entiende, qué no
da confianza.

## Informe

1. Tabla **problema → qué se ve ahora** con lo que arreglaste en el momento.
2. **Lo que sigue flojo**, sin esconderlo.
3. **Veredicto honesto**: "¿lo usaría? ¿le dejaría correr mi negocio?" con las
   razones concretas de sí o de no.

## Reglas

- Arreglá en el momento lo que es corto y seguro; lo grande va al informe.
- Después de arreglar, repetí el recorrido completo, no sólo el paso arreglado.
- Cerrá todo servidor de prueba al terminar (`ss -ltnp`).

## Cómo saber si salió bien

- Cero errores de JavaScript en consola durante todo el recorrido.
- Cada sección, pestaña y ventana se abrió y se cerró (también con Escape).
- Las capturas de los tres tamaños están revisadas y cada problema visto está en
  la tabla del informe (arreglado o pendiente).
- No quedó ningún servidor de prueba escuchando y los datos reales no cambiaron.
