'use strict'

var observer = require('./src/observer/observer');

module.exports = {
	observerPattern: observerPattern
};

function observerPattern(){
	return observer;
};
