(function () {
  window.Chess = window.Chess || {};

  var Knight = Chess.Knight = function (params) {
    Chess.Piece.call(this, params);
    this.name = 'knight';
  }

  Chess.Utils.inherits(Knight, Chess.SteppingPiece)

  Knight.prototype.moveDiffs = function () {
    return [[1, 2],
            [2, 1],
            [-1, 2],
            [2, -1],
            [-1, -2],
            [-2, -1],
            [-2, 1],
            [1, -2]];
  }
})();
