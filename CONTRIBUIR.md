# Cómo escribir una skill para esta biblioteca

## Dónde va

Del área más general a la situación concreta:
`<área>/<sub-área>/<contexto>/<situación>/SKILL.md`. Si una carpeta tiene varias
skills, agregale un `README.md` corto que diga cuál usar en cada caso.

## Formato

```markdown
---
name: kebab-case-unico-en-toda-la-biblioteca
description: Una o dos frases: en qué situación exacta usarla (el agente decide con esto).
---

# Título

## Cuándo usarla / cuándo no
## Qué preguntar si falta información
## Pasos
## Reglas (lo que nunca se hace)
## Ejemplos (reales o realistas, en el idioma y registro del cliente)
## Cómo saber si salió bien
## Fuentes
```

## Antes de publicar

- [ ] ¿Es una situación, no un tema?
- [ ] ¿Cada dato que puede cambiar (leyes, programas, tasas) tiene fuente y fecha?
- [ ] ¿Separa lo verificado de lo que es criterio propio?
- [ ] ¿Un agente que no sabe nada del caso podría seguirla sin inventar?
- [ ] ¿La parte "cómo saber si salió bien" se puede comprobar?
- [ ] Si toma algo de otro: ¿la licencia lo permite y está la atribución?
