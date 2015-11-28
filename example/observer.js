var designPatterns = require('../index');

var observerPattern =  designPatterns.observerPattern();

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