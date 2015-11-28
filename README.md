# design-pattern
Javascript Design Pattern for Both Browser and Node.js. I am a customer of text book "Learning JavaScript Design Patterns" and learn javascript design pattern using original source code at [https://github.com/addyosmani/essential-js-design-patterns](https://github.com/addyosmani/essential-js-design-patterns). This project could be an additional support to target audience of the text book and professional developers who wishing to run the original source code in Browser and Node.js.

#Install 
```
npm install design-pattern --save-dev
```
#Usage
## Observer pattern
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
Output
```
Observer(1) context { data: 'data' }
Observer(2) context { data: 'data' }
```
#License

This project is released under a Creative Commons Attribution-Noncommercial- No Derivative Works 3.0 License.

What this means it that the project is free to read and use, but the license does not permit commercial use of the material.

Copyright Vorachet Jaronesawas, 2015.
