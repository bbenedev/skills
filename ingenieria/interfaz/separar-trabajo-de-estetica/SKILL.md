---
name: separar-trabajo-de-estetica
description: Diseñar las pantallas de una herramienta de trabajo (tableros, oficinas virtuales, paneles de agentes) para que se lean bien y no molesten: información primero, detalles al tocar, personalización aparte. Usar al crear o revisar cualquier pantalla donde el usuario trabaja.
---

# Separar trabajo de estética

Reglas que el usuario de AI HQ fue pidiendo, con sus palabras:

- "Una cosa es productividad y la otra estética": **nada de personalización en
  las pantallas de trabajo**. Ni paletas de salas, ni pisos, ni "editar aspecto".
  Todo eso vive en **una sola pestaña "Personalizar"**.
- "Lo importante es que se lea bien la información y que si la clickeo me dé
  detalles": **una línea clara por cosa, detalles al tocar**.
- "El panel es muy chico" / "hay mucho espacio vacío": **ancho cómodo, sin huecos,
  todo distribuido**.
- "No haya trabajadores inútiles": **mostrar sólo lo que existe de verdad**.

## Cómo se aplica

1. **Tarjeta de una línea**: estado (con color), quién, qué. Debajo, en gris,
   el último paso y la hora. Al tocar, se despliega: duración, archivos,
   carpeta, pasos. Lo abierto queda abierto aunque la pantalla se actualice.
2. **Panel lateral acoplado, no flotante**: el contenido principal se achica a
   su lado (no queda tapado). Ancho inicial ~38 % de la pantalla (mín. 420 px),
   ajustable arrastrando el borde y recordado.
3. **Pestañas en vez de apilar**: Chat · Actividad · Detalles, cada una con todo
   el alto. Al elegir algo en el mapa, se pasa a Detalles. Un número en la
   pestaña cuando hay algo en curso.
4. **Arriba lo que importa**: un resumen de 4 números (trabajando ahora,
   terminadas hoy, fallidas hoy, pasos hoy), después las tarjetas, después el detalle.
5. **Estado vacío útil**: nunca un hueco. Decí por qué está vacío y qué hacer
   ("La oficina está esperando trabajo… [Pedirle algo a Claude]"), con
   sugerencias concretas para empezar.
6. **Filtros y opciones en un desplegable**, no una fila de chips permanentes.
7. **Ayudas que se van**: un cartel de ayuda se muestra las primeras veces y
   después dura poco.
8. **La barra de estado habla del trabajo** (quién trabaja, qué terminó), no de
   la construcción (muebles, tiles), salvo en Personalizar.
9. **Sin demo en pantallas de trabajo**: si hay simulación, es opcional y está
   apagada; los datos de ejemplo guardados se ocultan.

## Errores que ya cometimos

- Una ficha con `flex: 1` ocupaba todo el alto y dejaba un hueco enorme debajo.
- Las tarjetas de lista heredaban un grid de 2 columnas y los textos se encimaban.
- Un botón dentro de un contenedor flex quedó de 12 px de alto: invisible e intocable.
- El contenido de prueba (navegador automatizado) guardó sus preferencias de
  ancho en los datos del usuario.

## Cómo saber si salió bien

Capturas en 1440×900 y 1024×700: ninguna zona vacía de más de un tercio del
panel, ningún texto encimado, todo lo de personalización fuera de la vista de
trabajo, y cada tarjeta abre su detalle.
