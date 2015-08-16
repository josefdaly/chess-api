(function () {
  window.Chess = window.Chess || {};

  var Bishop = Chess.Bishop = function (params) {
    Chess.Piece.call(this, params);
    this.name = 'bishop';
  };

  Chess.Utils.inherits(Bishop, Chess.SlidingPiece);

  Bishop.prototype.moveDirs = function () {
    return [[1, 1],
            [-1, 1],
            [1, -1],
            [-1, -1]];
  };

})();
