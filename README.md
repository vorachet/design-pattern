# Javascript design patterns for both browser and Node.js

Javascript design patterns for both browser and Node.js. I am a customer of text book "Learning JavaScript Design Patterns". I learn javascript design patterns using original source code at [https://github.com/addyosmani/essential-js-design-patterns](https://github.com/addyosmani/essential-js-design-patterns). This project could be an additional support to target audience of the text book and javascript developers who wishing to run the design patterns and some of my extended examples in both browser and Node.js. 


# Install 
```
npm install design-pattern
```
# Usage
* [Facade](#facade)
* [Observer](#observer)

## <a name="facade"></a>Facade pattern

### Implementation example
```javascript
    var ModuleA = function() {
        var name = 'ModuleA',
            _private = {
                pre: function(context) {
                    console.log(name + ' pre',context);
                },
                op1: function(context) {
                    console.log(name + ' op1',context);
                },
                op2: function(context) {
                    console.log(name + ' op2',context);
                },
                op3: function(context) {
                    console.log(name + ' op3',context);
                },
                op4: function(context){
                    console.log(name + ' op4',context);
                },
                op5: function(context){
                    console.log(name + ' op5',context);
                },
                post: function(context) {
                    console.log(name + ' post',context);
                },
            };
     
        return {
     
            facade: function(context) {
                _private.pre(context);
                if (context.param1) _private.op1({data: context.param1});
                if (context.param2) _private.op2({data: context.param2});
                if (context.param3) _private.op3({data: context.param3});
                if (context.param4) _private.op4({data: context.param4});
                if (context.param4 > context.param3) {
                    var total = context.param1 + context.param2 +  
                                context.param3 + context.param4;
                    _private.op5({data: total});
                };
                _private.post(context);
            }
        };
    };

    var ModuleB = function() {
        var name = 'ModuleB',
            _private = {
                pre: function(context) {
                    console.log(name + ' pre',context);
                },
                op1: function(context) {
                    console.log(name + ' op1',context);
                },
                op2: function(context) {
                    console.log(name + ' op2',context);
                },
                op3: function(context) {
                    console.log(name + ' op3',context);
                },
                op4: function(context) {
                    console.log(name + ' op4',context);
                },
                post: function(context) {
                    console.log(name + ' post',context);
                },
            };
     
        return {
     
            facade: function(context) {
                _private.pre(context);

                if (context.param1){
                     _private.op1({data: context.param1});
                };

                if (context.param2){
                     _private.op2({data: context.param2});
                };

                if (context.param3){
                     _private.op3({data: context.param3});
                };

                if (context.param1 && context.param2 && context.param3){
                    var data = context.param1 + context.param2 + context.param3;
                     _private.op4({data: data});
                };

                _private.post(context);
            }
        };
    };
```
### Node.js
```javascript
var designPatterns = require('design-pattern'),
    facadePattern =  designPatterns.facadePattern(),
    moduleA = facadePattern.moduleA(),
    contextA = {param1: 10, param2: 20, param3: 30, param4: 40},
    moduleB = facadePattern.moduleB(),
    contextB = {param1: 'A', param2: 'B', param3: 'C'};

moduleA.facade(contextA);
moduleB.facade(contextB);

```

### Browser

```javascript
<script type="text/javascript" src="../src/facade.js"></script>
<script type="text/javascript">
	
var moduleA = facadePattern.moduleA(),
    contextA = {param1: 10, param2: 20, param3: 30, param4: 40},
    moduleB = facadePattern.moduleB(),
    contextB = {param1: 'A', param2: 'B', param3: 'C'};

moduleA.facade(contextA);
moduleB.facade(contextB);

</script>

```

### Output

```javascript
ModuleA pre { param1: 10, param2: 20, param3: 30, param4: 40 }
ModuleA op1 { data: 10 }
ModuleA op2 { data: 20 }
ModuleA op3 { data: 30 }
ModuleA op4 { data: 40 }
ModuleA op5 { data: 100 }
ModuleA post { param1: 10, param2: 20, param3: 30, param4: 40 }
ModuleB pre { param1: 'A', param2: 'B', param3: 'C' }
ModuleB op1 { data: 'A' }
ModuleB op2 { data: 'B' }
ModuleB op3 { data: 'C' }
ModuleB op4 { data: 'ABC' }
ModuleB post { param1: 'A', param2: 'B', param3: 'C' }
```

## <a name="observer"></a>Observer pattern

### Node.js
```javascript
var designPatterns = require('design-pattern'),
    observerPattern =  designPatterns.observerPattern();

var subject = observerPattern.createSubject();

var MyObserverClass = function(id){
	this.id = id;
	this.update = function(context){ 
	  console.log('Observer(' + this.id + ') context',context);
	};
};	

var observer1 = new MyObserverClass(1);
var observer2 = new MyObserverClass(2);

subject.addObserver(observer1);
subject.addObserver(observer2);

var context = {data: 'data'};
subject.notify(context);
```

### Browser

```javascript
<script type="text/javascript" src="../src/observer.js"></script>
<script type="text/javascript">
	
var subject = new observerPattern.createSubject();

var MyObserverClass = function(id){
	this.id = id;
	this.update = function(context){ 
	  console.log('Observer(' + this.id + ') context',context);
	};
};	

var observer1 = new MyObserverClass(1);
var observer2 = new MyObserverClass(2);

subject.addObserver(observer1);
subject.addObserver(observer2);

var context = {data: 'data'};
subject.notify(context);

</script>
```

### Output

```javascript
Observer(1) context { data: 'data' }
Observer(2) context { data: 'data' }
```

# License

This project is released under a Creative Commons Attribution-Noncommercial- No Derivative Works 3.0 License.

What this means it that the project is free to read and use, but the license does not permit commercial use of the material.

Copyright Vorachet Jaronesawas, 2015.
