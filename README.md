# reproduction
Universe of interactive things

Preview

```JavaScript

universe

.create('user', alice)

.create('ball', ball)
.create('box', box)

.insert('ball', 'box')
.whereis('ball', locator)

.take('ball', 'box')

.examine('ball', examiner)
.whereis('ball', locator);


```

Result:

    The ball is in the box
    The ball is pretty neat
    Oh, you mean that ball?, that ball is in Alice's hands now.


## Research

I wanted to find the minimal platform but with good structure and fair constraints.

### Development History

1. OOP mostly failed as it demanded too many details
2. OOP+Mixins mostly failed as the code detracted from the point of the code.
3. Fluid DSL with target object editing mostly failed as nothing was constrained
4. A Lodash like library showed promise.
5. Accessing items by ID, shows great promise; fine and easy to remember constraints
6. Using hand coded id for all items great success.
7. Adding Mixins for secondary concerns (Language/Devices)

## TODO

Expressing language/prose via computer generated worlds is tough, in terms of code readability.
I believe improving on the String Templates and Expression Arrays (see test.js) will only harm the program.

A.
