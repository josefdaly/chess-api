(function () {
  window.Chess = window.Chess || {};

  var King = Chess.King = function (params) {
    Chess.Piece.call(this, params);
    this.name = 'king';
  };

  Chess.Utils.inherits(King, Chess.SteppingPiece);

  King.prototype.moveDiffs = function () {
    return [[1, 1],
            [1, 0],
            [0, 1],
            [-1, 1],
            [1, -1],
            [-1, -1],
            [-1, 0],
            [0, -1]];
  }
})();
