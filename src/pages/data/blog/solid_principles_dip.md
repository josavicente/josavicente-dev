---
publishDate: "Jan 15 2023"
title: "Principios SOLID VI: Principio de inversión de dependencias"
description: "Finalmente la D, correspondiente al principio de inversión de dependencias. Depende de las abstracciones, no de las implementaciones concretas."
image: "~/assets/images/solid/solid-5.jpg"
category: "Buenas prácticas"
tags: [buenas prácticas, solid, programación, inversión dependencias, dip, arquitectura]
canonical: https://josavicente.dev/solid_principles_dip
---

El principio de inversión de dependencias indica que las clases de un sistema deben depender de las abstracciones/interfaces y no de las implementaciones concretas. Esto significa que las clases no deben depender directamente de clases específicas, sino de interfaces o clases abstractas. Esto lo haremos inyectando dependencias en el constructor de la clase, pero estas dependencias serán interfaces o clases abstractas, no clases finales.

Un ejemplo de violación del principio de inversión de dependencias en un programa inspirado en Pokemon podría ser el siguiente. Tenemos una clase **PokemonTrainer** que se encarga de entrenar a un Pokemon específico y una clase **Charizard** que representa a un Pokemon de tipo fuego.

```kotlin

class PokemonTrainer {
    fun train(pokemon: Charizard) {
    }
}

class Charizard {
}
```

En este ejemplo, la clase **PokemonTrainer** tiene una dependencia directa con la clase **Charizard** y solo puede entrenar a ese tipo de Pokemon específico, lo cual viola el principio de inversión de dependencias ya que la clase **PokemonTrainer** depende directamente de la implementación concreta de una clase **Charizard** y no de una abstracción o interfaz que represente cualquier Pokemon.

Un ejemplo correcto sería tener una interfaz **Pokemon** y modificar la clase **PokemonTrainer** para depender de esta interfaz:

```kotlin
interface Pokemon {
    fun train()
}

class Charizard : Pokemon {
    override fun train() {

    }
}

class PokemonTrainer {
    fun train(pokemon: Pokemon) {
        pokemon.train()
    }
}
```

De esta manera, la clase **PokemonTrainer** depende de una abstracción, la interfaz **Pokemon**, en lugar de una implementación concreta. Esto permite que se puedan entrenar diferentes tipos de Pokemon en lugar de solo uno específico. Además, si se desea añadir otro tipo de Pokemon, solo se requiere crear una nueva clase que implemente la interfaz **Pokemon** y no tener que modificar la clase **PokemonTrainer**.

Este princpio es una de los más importantes. Cuando escriba sobre arquitectura hexagonal, veremos que se basa en gran medida en el uso de esta inyección de dependencias con el objetivo de facilitar la modificación y la sustitución de implementaciones en entornos cambiantes y que escalan rápidamente tras demostrar una hipótesis. 

Además este principio facilita la testabilidad de las clases porque permite desacoplar las dependencias de las clases. En lugar de crear las dependencias dentro de la clase, las dependencias se pasan a la clase a través de su constructor o métodos de configuración. Esto significa que las dependencias pueden ser fácilmente reemplazadas por sus equivalentes de prueba, lo que permite probar la clase de forma aislada. Veámoslo con un ejemplo:

```kotlin

interface PokemonRepository {
    fun getPokemon(pokemonId: Int): Pokemon
}

class PokemonService(private val repository: PokemonRepository) {
    fun getPokemonName(pokemonId: Int): String {
        val pokemon = repository.getPokemon(pokemonId)
        return pokemon.name
    }
}

```

En este ejemplo, **PokemonService** tiene una dependencia en **PokemonRepository**. En lugar de crear una instancia de **PokemonRepository** dentro de **PokemonService**, se pasa una instancia de **PokemonRepository** al constructor de **PokemonService**. Así podremos proporcionar una implementación de prueba o mock de **PokemonRepository** cuando creamos una instancia de **PokemonService** para probarlo, lo que nos permite aislar la prueba de **PokemonService** de su dependencia en **PokemonRepository**.

Un ejemplo de código para dicho test: 

```kotlin

class TestPokemonRepository : PokemonRepository {
    override fun getPokemon(pokemonId: Int): Pokemon {
        return Pokemon(pokemonId, "Pikachu")
    }
}

class PokemonServiceTest {
    @Test
    fun `test getPokemonName`() {
        val repository = TestPokemonRepository()
        val service = PokemonService(repository)
        val pokemonName = service.getPokemonName(25)
        assertEquals("Pikachu", pokemonName)
    }
}

```
Creamos un mock llamado **TestPokemonRepository** que implementa **PokemonRepository**. **TestPokemonRepository** devuelve siempre un objeto Pokemon de prueba con el nombre "Pikachu" independientemente del ID del Pokemon que se le pase.

En la clase de prueba **PokemonServiceTest**, creamos una instancia de **TestPokemonRepository** y la pasamos al constructor de **PokemonService**. Luego llamamos al método **getPokemonName** con un ID de Pokemon específico y verificamos que el nombre devuelto sea el esperado.

Así aislamos la prueba de **PokemonService** de su dependencia con **PokemonRepository**.

Y hasta aquí la serie de artículos sobre los principios SOLID.