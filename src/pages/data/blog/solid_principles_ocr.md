---
publishDate: "Jan 10 2023"
title: "Principios SOLID III: Abierto a extensión y cerrado a modificación"
description: "La O, correspondiente a Open-Close Principle. Evita depender de implementaciones concretas."
image: "~/assets/images/ocr.jpg"
category: "Buenas prácticas"
tags: [buenas prácticas, solid, programación, ocr, arquitectura]
canonical: https://josavicente.dev/solid_principles_ocr
---

El software debería estar abierto a extensión y cerrado a modificación. Para ello, evitemos depende de implementaciones específicas. Es más sencillo con un ejemplo.

Volvamos sobre el ejemplo del post anterior inspirado en Pokemon. 
Vamos a añadir a la clase base el nombre, nivel y hp del pokemon en cuestión. Ahora añadimos clases hijas para los tipos de pokemon, por ejemplo fuego y agua.

La clase base tiene una método **attack**, recibe un pokemon y le reduce su hp basado en el nivel de ataque del pokemon.

Al principio, este diseño funciona bien. Sin embargo, a medida que añades más características al juego, te das cuenta de que necesitas añadir diferentes tipos de ataque, como fuego y agua, que son fuertes o débiles contra ciertos tipos de Pokemon.

Para implementar esto, podrías añadir un nuevo atributo llamado **attackType** a la clase Pokemon y modificar el método de ataque para tener en cuenta el tipo de ataque del Pokemon atacante y el tipo del Pokemon defensor.

Aquí el error, esto violaría el Principio Abierto-Cerrado, que como describía al inicio, establece que una clase debe estar abierta a extensiones, pero cerrada a modificaciones. Deberías ser capaz de añadir nuevas funcionalidades a una clase sin cambiar su código existente.

```kotlin

// Clase Base
open class Pokemon(val name: String, var level: Int, var hp: Int) {
    // Método de ataque
    fun attack(target: Pokemon) {
        when (this) {
            is FirePokemon -> {
                if (target is WaterPokemon) {
                    target.hp -= 2 * level
                } else {
                    target.hp -= level
                }
            }
            is WaterPokemon -> {
                if (target is FirePokemon) {
                    target.hp -= 2 * level
                } else {
                    target.hp -= level
                }
            }
        }
    }
}

// Subclases para tipos de pokemon específicos
class FirePokemon(name: String, level: Int, hp: Int) : Pokemon(name, level, hp)
class WaterPokemon(name: String, level: Int, hp: Int) : Pokemon(name, level, hp)
```

En este ejemplo, la clase Pokemon no está abierta a extensiones porque no puedes añadir nuevos tipos de ataque a un Pokemon sin modificar el método de **attack**. Para añadir un nuevo tipo de ataque, tendrías que modificar el método para tener en cuenta el nuevo tipo de ataque, lo que provocaría cambiar todas las llamadas a dicho métrodo y obviamente viola OCR. 

En su lugar, podrías seguir OCR creando una nueva clase Ataque que tenga un atributo **attackType** y un método **calculateDamage** que reciba un objeto Pokemon y devuelva la cantidad de daño a infligir. Luego puedes extender la clase Ataque para crear tipos de ataque específicos como AtaqueFuego y AtaqueAgua.

La clase Pokemon puede entonces tener una lista de objetos Ataque y un nuevo método **use_attack** que selecciona un ataque de la lista y lo usa para atacar a otro Pokemon. De esta manera, puedes añadir nuevos tipos de ataque al juego sin modificar la clase Pokemon existente. Para ello usaríamos un método **learnAttack**, que como su nombre indica simplemente añadiría ataques a la lista de dicho pokemon.


```kotlin

open class Pokemon(val name: String, var level: Int, var hp: Int) {

    private val attacks = mutableListOf<Attack>()
    
    fun useAttack(attack: Attack, target: Pokemon) {
        val damage = attack.calculateDamage(target)
        target.hp -= damage
    }
    
    fun learnAttack(attack: Attack) {
        attacks.add(attack)
    }
}

// Clase base para ataques
open class Attack(val name: String, val attackType: AttackType) {
    open fun calculateDamage(target: Pokemon): Int {
        return when (attackType) {
            AttackType.FIRE -> {
                if (target is WaterPokemon) {
                    2 * level
                } else {
                    level
                }
            }
            AttackType.WATER -> {
                if (target is FirePokemon) {
                    2 * level
                } else {
                    level
                }
            }
        }
    }
}

class FireAttack(name: String) : Attack(name, AttackType.FIRE)
class WaterAttack(name: String) : Attack(name, AttackType.WATER)

class FirePokemon(name: String, level: Int, hp: Int) : Pokemon(name, level, hp)
class WaterPokemon(name: String, level: Int, hp: Int) : Pokemon(name, level, hp)

enum class AttackType {
    FIRE, WATER
}
```

En este ejemplo, la clase Pokemon está abierta a extensiones (puedes añadir nuevos ataques a un Pokemon usando el método learnAttack), pero cerrada a modificaciones (no necesitas modificar la clase Pokemon para añadir nuevos tipos de ataque). En su lugar, puedes crear nuevos tipos de ataque extendiendo la clase Ataque y sobreescribiendo el método **calculateDamage**.