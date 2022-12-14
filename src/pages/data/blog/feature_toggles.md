---
publishDate: "Nov 25 2022"
title: "Feature Toggles"
description: "Seguramente lo has usado muchísimas veces, quizá sin conocer el nombre como me ocurría a mí. Pero más allá de salvarte la vida en ocasiones, esta técnica tiene más ventajas."
image: "~/assets/images/feature-toggle.jpg"
category: "Cultura de empresa"
tags: [TBD, Programación XP, técnicas, agile, Integración continua]
---

Feature Toggles es una mecanismo que te permite en tiempo de ejecución tomar la decisión de ejecutar un código u otro. Se trata de una herramienta que ayuda a mantener un flujo de delivery constante y de integración de código continua (a partir de ahora CD/CI). 

Probablemente, si eres nuevo como yo en conceptos como CD/CI que hasta hace un año tan solo había escuchado de pasada
pero en los que nunca había profundizado debido a que mi día a día no me lo había requerido, este concepto lo has usado sin asociarlo a este nombre tan fancy. En mi experiencia previa, decenas de veces con mi equipo hemos desplegado soluciones alternativas ocultas. Nuestro principal motivo era no disponer de un entorno de pruebas suficientemente fiable como para garantizar que el cambio de lógica pudiera ser testeado de forma eficaz. O en otras ocasiones, las implicaciones a nivel de infraestructura en un sistema vivo con miles de peticiones por segundo.

Fue cuando comencé a interesarme por XP programming, TDD, CD/CI que apareció este nombre. Pero lo que me pareció más interesante no fue el hecho que sea un seguro de vida, sino otras aplicaciones mucho más divertidas. Y digo divertidas, porque me parecen una herramienta, más allá de facilitar CD/CI, súper interesante si trabajas con producto y quieres tener un enfoque lean. Y desde el punto de vista de Engineer Manager son una herramienta de crecimiento, creatividad e innovación para el equipo. Veámoslo.

## Tipos de Feature Toggles

##### Release toggles 

La gracia principal de estos es facilitar una estrategia de Trunk Based Development (TBD), es decir, no usar ramas y hacer siempre push a la rama principal a menudo, diariamente o incluso cada pocas horas. Ya escribiré sobre esta técnica más adelante. 

Al tener este interruptor, sabes que tu feature inacabada no romperá nada, y que ni siquiera se verá. Lo que te da más confianza y seguridad.


##### Experimental toggles
Quizá es el que me parece más útil desde una perspectiva de Engineer Manager. Este tipo de toggles son los que permiten al equipo jugar, experimentar y probar funcionalidades que vayan en la dirección de la visión y misión de la compañía.

Aquí es donde el equipo brilla, y en mi opinión tienen muchísimo potencial para el crecimiento del equipo. Te permiten probar locuras sin miedo a liarla, te permiten fallar con el consiguiente aprendizaje y finalmente permiten al equipo ser creativo y probar una hipótesis de forma rápida.

##### Operational toggles

Este tipo de toggles son de los más longevos, sirven para activar o desactivar funcionalidades concretas que son temporales. Por ejemplo, el típico wrapped de final de año de Spotify. Algo que solo está activo a final de año y salvo cambio de diseño, la base lógica apenas varía, más allá del año a calcular y de alguna característica a añadir.

##### Permission toggles

Estos toggles son los más longevos con diferencia, posiblemente permanentes. Son los más dinámicos. Por ejemplo el típico usuario premium. Son toggles que dan ciertos privilegios a usuarios concretos durante un periodo de tiempo largo.

### Longevidad vs Dinamismo
![](https://github.com/josavicente/josavicente-dev/blob/main/src/assets/images/feature_toggles/toggle_types.png?raw=true)

## Y ahora lo interesante realmente, sus casos de uso.

##### Pruebas A/B

Una técnica usada en la filosofía lean que consiste en ofrecer dos posibles soluciones al mismo problema a grupos distintos de usuarios. De esta manera se obtienen datos empíricos que permiten probar cual es la mejor alternativa. Pueden ser cosas tan sencillas como el diseño o posición de un botón o tan complejas como diferentes pasos para realizar una misma operación.

##### Canary release

Este tipo de toggle se usa para minimizar el riesgo. Desarrollos complejos que aunque son testeados en profundidad antes de ser liberados requieren de un testeo en producción, por ejemplo para acotar impacto en la infraestructura.

Aquí lo que se hace es liberar a un grupo acotado de usuarios la nueva caráctierística y recoger datos para validar el correcto funcionamiento y el impacto que tiene sobre la infraestructura. Más info [aquí](https://martinfowler.com/bliki/CanaryRelease.html).

#### Trunk Based Development

Como ya he comentado, es una estrategia de desarrollo donde las nuevas features son añadidas a la rama principal e integradas en producción. Con estos toggles facilitamos poder entregar e integrar de forma continua (diariamente o cada pocas horas) aún cuando las features están inacabadas.

#### Circuit Breaker

Con esta opción buscamos favorecer una estrategia de mantenimiento y recovery de fallos. Si detectamos problemas técnicos en una función, la desactivamos y así mantenemos el sistema en marcha con partes desactivadas.

*** 
En conclusión, desde el punto de vista de Engineer Manager, en mi opinión son una herramienta de crecimiento y empoderamiento del equipo, permitiéndoles libertad, creatividad, aprendizaje y genera confianza.

También debemos tener en cuenta que los introducen complejidad. Debemos mantener esa complejidad bajo control utilizando buenas prácticas y tooling. Usar solo aquellos necesarios para nuestras necesidades siempre teniendo en cuenta que deben ser de vida corta, salvo tipos concretos para casos de uso concretos.

De lo contrario, acabarás teniendo un campo de minas de toggles que serán dificiles de trackear y que pueden generar confusión y un mantenimiento extra al equipo.





