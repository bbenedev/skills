# Skills

Una biblioteca de skills para agentes (Claude Code y compatibles), ordenada como
una carpeta de conocimiento: de lo general a lo específico, hasta llegar a una
skill precisa para cada situación.

```
negocios/
  ventas/
    ecommerce-argentina/
      cerrar-venta-whatsapp-cliente-que-compara-precio/   ← una situación, una skill
    llamadas-en-frio/
      pyme-b2b-argentina/
    manejar-objeciones-despues-del-precio/
ingenieria/
  agentes/      cómo escribirle una tarea a un agente, revisar lo que hizo, mostrar su actividad
  datos/        guardar sin perder nada nunca
  calidad/      recorrer una app como un usuario y encontrar lo que está mal
  interfaz/     pantallas de trabajo legibles, sin ruido
```

## Qué hace buena a una skill acá

1. **Una situación concreta.** "Ventas" no es una skill; "cerrar por WhatsApp a
   un cliente argentino que está comparando precio con Mercado Libre" sí.
2. **Sale de práctica real.** Cada skill de `ingenieria/` viene de trabajo hecho
   y corregido en [AI HQ](https://github.com/bbenedev) (errores incluidos). Las de
   `negocios/` citan sus fuentes y separan lo verificado de lo que es criterio.
3. **Dice cuándo no usarla.** Y qué preguntar si falta información.
4. **Se puede comprobar.** Termina con cómo saber si salió bien.
5. **Nada inventado.** Leyes, programas y cifras con fuente y fecha; si algo
   cambia seguido (cuotas, tasas, topes), la skill dice que hay que verificarlo.

## Cómo usarlas

**Claude Code**: copiá la carpeta de la skill a `.claude/skills/<nombre>/` de tu
proyecto o a `~/.claude/skills/<nombre>/`. El nombre es el `name:` del
`SKILL.md`.

**AI HQ**: `npm run skills` trae esta biblioteca y la pone a disposición de los
agentes de la oficina.

**Todas de una**: `node tools/instalar.mjs <carpeta-destino>` copia todas las
skills aplanadas (una carpeta por `name`).

## Sumar skills de otros

Sólo con licencia que lo permita (MIT, Apache-2.0, CC-BY y similares), con
atribución en `FUENTES.md` y en la propia skill. Si la licencia no lo permite,
se enlaza la fuente y se escribe una skill propia con otras palabras y otra
estructura. Ver `CONTRIBUIR.md`.

## Licencia

MIT, salvo las partes que indiquen otra licencia en su encabezado.
