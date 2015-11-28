# design-pattern
Javascript Design Pattern for both browser and Node.js. I am a customer of text book "Learning JavaScript Design Patterns" and learn javascript design pattern using original source code at [https://github.com/addyosmani/essential-js-design-patterns](https://github.com/addyosmani/essential-js-design-patterns). This project could be an additional support to target audience of the text book and javascript developers who wishing to run the design pattern examples in Browser and Node.js. 

#Install 
```
npm install design-pattern --save-dev
```
#Usage
* [Facade](#facade)
* [Observer](#observer)

## <a name="facade"></a>Facade pattern

### Node.js
```
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

```
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

```
ModuleA pre { param1: 10, param2: 20, param3: 30, param4: 40 }
ModuleA op3 { data: 10 }
ModuleA op4 { data: 20 }
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
```
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

```
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

```
Observer(1) context { data: 'data' }
Observer(2) context { data: 'data' }
```

#License

This project is released under a Creative Commons Attribution-Noncommercial- No Derivative Works 3.0 License.

What this means it that the project is free to read and use, but the license does not permit commercial use of the material.

Copyright Vorachet Jaronesawas, 2015.
