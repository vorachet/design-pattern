(function(exports){

	exports.createSubject = function(){
		return new Subject();
	};

	var Subject = function(){
	  this.observers = new ObserverList();
	};

}(typeof exports === 'undefined' ? this.xPattern = {} : exports));
