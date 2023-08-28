---
publishDate: "Jan 5 2023"
title: "Principios SOLID II: Principio de responsabilidad única"
description: "La S, correspondiente a Single Responsability Principle."
image: "~/assets/images/solid/solid-1.jpg"
category: "Buenas prácticas"
tags: [buenas prácticas, solid, programación, srp, responsabilidad única, arquitectura]
canonical: https://josavicente.dev/solid_principles_srp
---

Seguimos con SOLID, en esta ocasión la **S** que corresponde al principio de responsabilidad única. Es posiblemente el más sencillo de identificar y también uno de los más sencillos de violar. Viene a decirnos que cada clase debe tener una única responsabilidad y que debe estar encapsulada en dicha clase. Por tanto cada clase debe tener un propósito específico que debemos identificar y no ser como una navaja suiza multifunción. Aquí el naming es importante para ser específicos.

Me gusta especialmente porque hace el código fácilmente legible y entendible. Cualquiera que venga a revisar un código que cumple SRP, será capaz de identificar y entender rápidamente su objetivo.

#### Una clase = un concepto = una responsabilidad


Veamos un ejemplo en Kotlin, tenemos esta clase inspirada en Pokemon:

```kotlin
class Pokemon {
    val name: String
    val type: String
    val level: Int

    fun attack() {
    // realiza un ataque
    }

    fun evolve() {
    // evoluciona el Pokemon
    }

    fun calculateExperience() {
    // calcula la experiencia del Pokemon
    }
}
```
En este ejemplo, la clase Pokemon tiene tres responsabilidades: atacar, evolucionar y calcular la experiencia. Por lo tanto estamos violando SRP. Cada tarea debería realizarse por una clase distinta. Lo correcto sería:

```kotlin
class Pokemon {
    val name: String
    val type: String
    val level: Int

    fun attack() {
    // realiza un ataque
    }
}

class Evolution {
    fun evolve(pokemon: Pokemon) {
    // evoluciona el Pokemon
    }
}

class ExperienceCalculator {
    fun calculateExperience(pokemon: Pokemon) {
    // calcula la experiencia del Pokemon
    }
}
```
> Podría haber hecho el típico ejemplo de la impresión o la BBDD, pero ilustrarlo con este ejemplo me ha parecido más divertido. Quizá semánticamente o el significado de negocio no sea tan directo, pero es mi blog, es mi ejemplo.

Aplicar SRP implica ser muy preciso con los nombres. Esto es especialmente importante, ya que según el tamaño del proyecto. la granularidad puede ser elevada y dificultar la navegación en el mismo. Cuanto más descriptiva y clara sea una clase por su nombre, más fácil nos será ubicarnos dentro del código. 

La principal pega que se le achaca a SRP es que aunque facilita el mantenimiento del código, perjudica, sobretodo en un proyecto grande, por la complejidad de la estructura de clases y el número de las mismas. En mi opinión, las ventajas a medio largo plazo compensan esto. Por muy grande que sea la base de código, será mucho más complejo hacer cambios si hay que tocar en muchas clases por una mala arquitectura. Sin embargo, quizá por volumen pueda llevar más tiempo entender la estructura, pero una vez entendida, el cambio será en un solo lugar.

A continuación las principales ventajas que aporta SRP: 

1. Facilita el mantenimiento y la actualización del código: Al tener cada clase una única responsabilidad, es más fácil localizar y modificar el código si es necesario.
2. Mejora la legibilidad del código: Al tener cada clase un propósito específico, es más fácil entender su función y cómo se relaciona con el resto del código.
3. Facilita la reutilización del código: Al tener cada clase una responsabilidad específica, es más fácil utilizar esa clase en diferentes partes del proyecto sin tener que modificarla.

Algunos inconvenientes:

1. Puede aumentar la complejidad del proyecto: Al tener que dividir las responsabilidades en varias clases diferentes, puede resultar en una estructura más compleja y difícil de entender.

2. Puede requerir más tiempo de desarrollo: Al tener que crear más clases y establecer relaciones entre ellas, puede requerir más tiempo de desarrollo.

Como en todo en desarrollo, esto son principios, no leyes, obviamente depende del proyecto/product y del equipo establecer cuando tiene sentido hacer un trade off.