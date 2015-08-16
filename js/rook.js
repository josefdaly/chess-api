(function () {
  window.Chess = window.Chess || {};

  var Rook = Chess.Rook = function (params) {
    Chess.Piece.call(this, params);
    this.name = 'rook';
  };

  Chess.Utils.inherits(Rook, Chess.SlidingPiece);

  Rook.prototype.moveDirs = function () {
    return [[1, 0],
            [0, 1],
            [-1, 0],
            [0, -1]];
  }

})();
