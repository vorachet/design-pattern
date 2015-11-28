'use strict'

var observer = require('./src/observer');
var facade = require('./src/facade');


module.exports = {
	observerPattern: observerPattern,
	facadePattern: facadePattern
};

function observerPattern(){
	return observer;
}

function facadePattern(){
	return facade;
}
