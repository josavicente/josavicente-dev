---
publishDate: "Jan 11 2023"
title: "Principios SOLID IV: Principio de sustitución de Liskov"
description: "La L, correspondiente al principio de sustitución de Liskov. Establece cual sería un buen diseño de herencia entre clases."
image: "~/assets/images/liskov.jpg"
category: "Buenas prácticas"
tags: [buenas prácticas, solid, programación, liskov, arquitectura]
canonical: https://josavicente.dev/solid_principles_liskov
---

LSP o Liskov Substitution Principle es una definición particular de una relación de subtipificación, llamada tipificación (fuerte) del comportamiento, que fue introducido por Barbara Liskov en 1987 en una conferencia y reformulado junto a Jeannette Wing en 1994:

> Sea ϕ(x) una propiedad comprobable acerca de los objetos x de tipo T. Entonces ϕ(y) debe ser verdad para los objetos y del tipo S, donde S es un subtipo de T.

Por la forma en la que tiene siempre de explicarse este principio y por su nombre, parece más complicado de lo que realmente es. Una forma más clara de definirlo es:

> Si una clase B es una subclase de una clase A, entonces un objeto de la clase B debería poder ser utilizado en cualquier lugar donde se espera un objeto de la clase A, sin causar ningún comportamiento inesperado. En otras palabras, una subclase debe ser capaz de sustituir a su superclase sin causar problemas.

Si os ha explotado la cabeza, ok, me pasó igual 🤯

Con un ejemplo lo veremos muy fácil. De nuevo Pokemon.

Tenemos una clase Pokemon que representa a un Pokemon en general, y varias subclases que representan a los diferentes tipos de Pokemon (como **FirePokemon**, **WaterPokemon**, etc.).

Si en la clase **FirePokemon** se incluye un método **burnOpponent()** que reduce la salud del oponente en una cantidad específica de puntos de salud, sin embargo la clase **waterPokemon** no incluye un método equivalente para reducir la salud del oponente. Entonces si tenemos la función **battle(p1: Pokemon, p2: Pokemon)** para simular una combate entre pokemon, vemos que no funcionaría correctamente si se utilizara un WaterPokemon en lugar de un FirePokemon.

```kotlin

class Pokemon {
    var name: String = ""
    var healthPoints: Int = 0
}

class FirePokemon: Pokemon() {
    var firePower: Int = 0
    fun burnOpponent(p: Pokemon) {
        p.healthPoints -= firePower
    }
}

class WaterPokemon: Pokemon() {
    var waterPower: Int = 0
}

fun battle(p1: Pokemon, p2: Pokemon) {
    while (p1.healthPoints > 0 && p2.healthPoints > 0) {
        if(p1 is FirePokemon) p1.burnOpponent(p2)
        // combate aqui
    }
}

val charmander = FirePokemon()
val squirtle = WaterPokemon()

battle(charmander, squirtle)

```

En este ejemplo, un **WaterPokemon** no puede ser utilizado en lugar de un **FirePokemon** en el método battle ya que no tiene una forma de reducir la salud del oponente, lo que causaria un comportamiento inesperado. El principio de sustitución de Liskov se viola ya que un objeto de la subclase no puede ser utilizado en lugar de un objeto de la superclase sin causar problemas.

La forma correcta de implementarlo siguiendo el principio de Liskov sería:

```kotlin
class Pokemon {
    var name: String = ""
    var healthPoints: Int = 0
}

class FirePokemon: Pokemon() {
    var firePower: Int = 0
    fun burnOpponent() {/*...*/}
}

class WaterPokemon: Pokemon() {
    var waterPower: Int = Int = 0
    fun drenchOpponent() {/*...*/}
}

fun battle(p1: Pokemon, p2: Pokemon) {
    while (p1.healthPoints > 0 && p2.healthPoints > 0) {
        // combate aqui
    }
}

val charmander = FirePokemon()
val squirtle = WaterPokemon()

battle(charmander, squirtle)

```
De esta manera, se asegura que los objetos de una subclase se comportan de forma esperada, siempre que se utilicen en lugares donde se espera un objeto de su superclase.

Toda subclase debe ser compatible con todos los métodos y propiedades de la superclase, y no solo aquellos que se utilizan en el contexto actual, ya que cualquier cambio en la superclase podría afectar a la subclase.

El objetivo principal de este principio es mantener correctitud funcional para poder aplicar OCP.