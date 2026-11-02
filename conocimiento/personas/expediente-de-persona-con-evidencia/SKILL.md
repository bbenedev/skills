---
name: expediente-de-persona-con-evidencia
description: Investigar a una figura pública (emprendedor, inversor, vendedor famoso) y armar un expediente con fuentes clasificadas para convertirlo después en un agente que trabaje "a su manera" sin inventar. Usar cuando piden "un agente como X", "pensá como X" o sumar a X a la oficina.
---

# Expediente de una persona, con evidencia

Es el proceso que usa AI HQ para sumar "simulaciones" de personas reales (el
primero fue Alex Hormozi, foco ventas). La regla de oro: **una regla del agente
sólo existe si tiene evidencia**.

## Cuándo usarla / cuándo no

- Sí: figuras públicas con material propio abundante (libros, podcasts,
  entrevistas, biografía oficial).
- No: personas privadas, ni para imitar la voz de alguien con fines de engaño.
  El agente resultante siempre dice que es una simulación basada en evidencia
  pública, no la persona.

## Qué preguntar antes

- ¿Para qué foco? (ventas, estrategia, diseño, ingeniería, inversiones). El
  expediente es entero, pero las reglas se compilan para un foco.
- ¿Hasta qué fecha? Anotá la fecha de investigación.

## Pasos

1. **Identidad y trayectoria** con la biografía oficial como fuente B (es
   autopromoción) y buscá al menos una fuente independiente para los hitos
   grandes (un comunicado de la otra parte de una operación, prensa).
2. **Cada afirmación lleva un ID** `[E1]`, `[E2]`… y cada evidencia se registra
   con: fuente (URL), autor, fecha de publicación, fecha del hecho, contexto,
   cita textual pertinente, tipo, posibles sesgos, corroboración y confianza.
3. **Clasificá la evidencia**:
   - **A**: documento primario independiente (registro, comunicado de la contraparte).
   - **B**: material propio de la persona (su libro, su podcast, su web).
   - **C**: patrón observado en varias fuentes B a lo largo del tiempo.
   - **D**: interpretación razonable, sin cita directa.
   - **E**: rumor, fuente secundaria floja.
4. **Perfil conductual sólo con lo observable**: rasgo → evidencia → contexto →
   frecuencia → **explicaciones alternativas** → confianza. Nada de diagnósticos
   ni motivos sin fuente.
5. **Frameworks textuales**: si la persona tiene métodos con nombre (en Hormozi:
   CLOSER, AAA, Value Equation, Core Four), registrá los pasos con su cita y el
   episodio o capítulo exacto.
6. **Tensiones**: si dos citas parecen contradecirse ("no pidas la venta si no
   sabés que dice que sí" vs. "pedí la venta más veces"), registrá la tensión y,
   si la resolvés, marcá la resolución como D.
7. **Auditoría**: cobertura por sección, reglas sin evidencia, evidencias sin
   clasificar, exceso de D/E.
8. **Compilar al agente**: sólo las reglas A, B o C se vuelven instrucciones; las
   D/E quedan "a validar". Las incertidumbres pasan textuales.

## Reglas

- Transcripciones automáticas: anotá qué porcentaje verificaste literal.
- Si una fuente da 403 o no se puede leer, decilo en la evidencia; no la cites como leída.
- No copies texto largo de libros o cursos: citas cortas y pertinentes.

## Cómo saber si salió bien

- Ninguna regla del agente compilado sin ID de evidencia A, B o C.
- Cada evidencia tiene fecha, fuente y sesgos anotados.
- Pruebas de evaluación del agente: ante un caso típico del foco, responde con
  el método documentado; ante algo fuera de su evidencia, lo dice.

## Fuentes

- Proceso propio de AI HQ (`docs/personas/PIPELINE.md`, plantilla de 13
  secciones `PERSONA_PROFILE.md`), usado en el expediente de Alex Hormozi
  investigado el 2026-10-27.
