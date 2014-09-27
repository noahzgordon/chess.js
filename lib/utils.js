(function() {
  var Chess = window.Chess = (window.Chess || {})

  var utils = Chess.utils = {
    
    inherits: function(BaseClass, SubClass) {
      var Surrogate = function() {};
      Surrogate.prototype = BaseClass.prototype;
      SubClass.prototype = new Surrogate();
    }
  };
})()