---
publishDate: "Jan 12 2023"
title: "Principios SOLID V: Principio de segregación de interfaces"
description: "La I, correspondiente al principio de segregación de interfaces. Esta me gusta porque es como yo, todo en su sitio y ordenado. Que no sobre nada."
image: "~/assets/images/isp.jpg"
category: "Buenas prácticas"
tags: [buenas prácticas, solid, programación, segregación, interfaces, arquitectura]
---

Establece que una clase no debe ser obligada a implementar interfaces que no utilizará. En otras palabras, una clase debe implementar solo las interfaces necesarias para su comportamiento específico.

Traduciendolo al mundo real, debemos diseñar las interfaces pensando en quien las usará, sus clientes, no en implementaciones concretas que pudieran tener.

Veámoslo con un ejemplo, como hasta ahora, seguimos con Pokemons.

Tenemos una interfaz PokemonActions que define métodos para realizar acciones comunes a todos los Pokémon, como atacar, defenderse, etc. Además, se tiene una clase FlyingPokemon que representa a un Pokémon volador y otra clase ElectricPokemon que representa a un Pokémon eléctrico.

```kotlin

interface PokemonActions {
    fun attack()
    fun defend()
    fun fly()
    fun electricShock()
}

class FlyingPokemon : PokemonActions {
    override fun attack() {
        // codigo ataque
    }
    override fun defend() {
        // codigo defensa
    }
    override fun fly() {
        // codigo vuelo
    }
    override fun electricShock() {
        // codigo imposible de ejecutar
    }
}

class ElectricPokemon : PokemonActions {
    override fun attack() {
        // codigo ataque
    }
    override fun defend() {
        // codigo defensa
    }
    override fun fly() {
        // codigo imposible de ejecutar
    }
    override fun electricShock() {
        // codigo electricShock
    }
}
```

En este ejemplo, la interfaz **PokemonActions** obliga a las clases **FlyingPokemon** y **ElectricPokemon** a implementar el método **fly()**, a pesar de que solo es relevante para los Pokemon voladores, y **electricShock()**, solo relevante para los Pokemon eléctricos. Por lo tanto, se viola el principio de segregación de interfaces ya que se obliga a las clases a implementar interfaces que no utilizarán.

La forma correcta de implementarlo siguiendo el principio de segregación de interfaces:

```kotlin
interface FlyingPokemonActions {
    fun attack()
    fun defend()
    fun fly()
}

interface ElectricPokemonActions {
    fun attack()
    fun defend()
    fun electricShock()
}

class FlyingPokemon : FlyingPokemonActions {
    override fun attack() {
        // codigo ataque
    }
    override fun defend() {
        // codigo defensa
    }
    override fun fly() {
        // codigo vuelo
    }
}

class ElectricPokemon : ElectricPokemonActions {
    override fun attack() {
        // codigo ataque
    }
    override fun defend() {
        // codigo defensa
    }

```

De esta manera, todo está en su sitio, ninguna clase tiene métodos inservibles y el código es claro y más descriptivo. El objetivo es tener alta cohesión y bajo acoplamiento.