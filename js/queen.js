(function () {
  window.Chess = window.Chess || {};

  var Queen = Chess.Queen = function (params) {
    Chess.Piece.call(this, params);
    this.name = 'queen';
  }

  Chess.Utils.inherits(Queen, Chess.SlidingPiece);

  Queen.prototype.moveDirs = function () {
    return [[1, 0],
            [0, 1],
            [-1, 0],
            [0, -1],
            [1, 1],
            [-1, 1],
            [1, -1],
            [-1, -1]];
  }
})();
