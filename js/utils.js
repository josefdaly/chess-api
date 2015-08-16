(function () {
  window.Chess = window.Chess || {};
  var Utils = Chess.Utils = {}

  Utils.inherits = function (childClass, parentClass) {
    function Surrogate() {}
    Surrogate.prototype = parentClass.prototype;
    childClass.prototype = new Surrogate();
  };

  Array.prototype.includes = function (el) {
    var returnVal = false
    if (typeof el === 'object') {
      console.log('got here' + el)
      this.forEach(function(pos) {
        console.log(el)
        console.log(pos)
        console.log(((pos[0] == el[0]) && (pos[1] == el[1])))
        if ((pos[0] == el[0]) && (pos[1] == el[1])) {
          returnVal =  true;
        }
      });
    } else {
      for (var i = 0; i < this.length; i++) {
         if (this[i] === el) {
           returnVal = true;
        }
      }
    }
    return returnVal;
  }
})();
