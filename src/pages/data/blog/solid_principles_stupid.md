---
publishDate: "Dec 29 2022"
title: "Principios SOLID I: Primero, no seas STUPID"
description: "Primera parte de una serie de posts sobre los diferentes principios SOLID. Empezamos con sus principios antagonistas"
image: "~/assets/images/solid.png"
category: "Buenas prácticas"
tags: [buenas prácticas, solid, programación, malas prácticas, arquitectura]
---

Esta es la primera de una serie de entradas sobre los principios SOLID. Mi idea es hacer una entrada por principio 
pero quería comenzar precisamente con sus antagonistas. La mayoría del tiempo trabajamos con código legado. En un 
mundo ideal, lo haríamos todo desacoplado, mantenible y testable. Pero tristemente en muchos proyectos, 
te encuentras el gran marrón del código legado.

He tenido que "remontar" ya más de tres veces grandes bases de código legado. En todas esas ocasiones, cuando tienes 
que rehacer o refactorizar algo, los grandes aliados son precisamente todo lo contrario a SOLID, conocerlos 
bien y por tanto detectarlos rápidamente.


Es por eso, que si he de empezar a hablar de los principios SOLID, casi mejor empezar por precisamente por lo 
contrario, ya que con toda probabilidad, en muchos proyectos te encuentres precisamente con lo contrario. Empecemos.

> Antes un pequeño **disclaimer**. Los principios SOLID así como los patrones de diseño, son opciones que tenemos para solucionar 
> problemas. En software casi todo es un trade off, lo que ganas por un lado lo puedes perder por otro. Por tanto, 
> nada es inamovible y siempre debemos tomar las decisiones que mejor encajen con nuestra situación, es más, 
> esas decisiones cambiarán con el tiempo casi con total probabilidad.

## STUPID

### 1. Singleton

Patrón de diseño singleton, es decir, restringir la instanciación de una clase a una única instancia. El problema en si no 
es el patrón, el problema es su mal uso. 

Ejemplo en Kotlin: 

```kotlin
object Cache{
    fun clearCache(){
        ...
    }
    fun saveOnCache(){
        ...
    }
}
```
Ejemplos típicos serían el de caché o BBDD. Tendriamos nuestra clase Cache, con sus métodos estáticos que estarían siendo llamados 
por todas partes en nuestro código. Teniendo el singleton dejamos de inyectar dependencias en nuestras clases lo que: 

- Te fastidia el testing al depender de un estado global
- Si nuestras clases dependen del objeto singleton, ocultan sus dependencias.
- Todo nuestro sistema se encuentra acoplado al objeto/s singleton.

Casi siempre puedes optar por otra opción antes que el Singleton.

### 2. Tight Coupling - Código fuertemente acoplado

Relacionado con el anterior, consecuencia de utilizar singleton. En el ejemplo anterior, imagínate que queremos modificar la cabecera 
de alguno de los métodos estáticos. Tendríamos que modificar todas y cada una de las llamadas que hagamos a estos en todo nuestro código. Claramente estamos
acoplados a como sea la implementación de la clase.

### 3. Untestability - Código no testable

En muchos de los proyectos los tests brillan por su ausencia, sobretodo en el mundo de la consultoría, donde se considera que los tests no son parte del desarrollo
y por tanto no se contempla dedicarles tiempo. Sin embargo, si pensamos en entornos con CD/CI por bandera, por poner un ejemplo claro, son imprescindibles para 
garantizar que no se rompe el ciclo.

Tu código debe ser fácilmente testable. Es más, si tu código es difícil de testar, claramente tienes un problema. Lo que esa dificultad para testar te dice es que tu código
no es mantenible y probablemente esté sumamente acoplado. Unos buenos tests te permitirán refactorizar sin peligro.

### 4. Premature Optimization

Básicamente, no te **flipes**. Los desarrolladores tendemos a fliparnos y complicarnos la vida. Nos adelantamos a lo que pueda pasar y muchas veces, eso, nunca pasa.
Una optimización prematura lleva a costes innecesarios tanto en tiempo como económicos. Primero, valida tu hipótesis, luego ya montarás la BBDD más actual o la UI 
con el framework de moda.

### 5. Indescriptive naming

Poco que decir, básicamente pon nombres que tu yo del futuro sea capaz de entender de un vistazo para que sirven. Por favor, no sigas esas tendencias de nombres crípticos 
o varibales de una sola letra. Eso es para señoros con riñonera que huelen fuerte.

### 6. Duplication

No dupliques código. Si duplicas código te vas a tener que patear toda la base de código para corregir cualquier pequeño error. A estas alturas diría que es obvio, pero el ser humano
es sorprendende para mal casi siempre.