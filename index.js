'use strict'

var observer = require('./src/observer'),
		facade = require('./src/facade'),
		prototype = require('./src/prototype');


module.exports = {
	observerPattern: observerPattern,
	facadePattern: facadePattern,
	prototypePattern: prototypePattern
};

function observerPattern(){
	return observer;
}

function facadePattern(){
	return facade;
}

function prototypePattern(){
	return prototype;
}
