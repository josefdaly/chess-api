(function () {
  window.Chess = window.Chess || {};

  var SteppingPiece = Chess.SteppingPiece = function () {}

  Chess.Utils.inherits(SteppingPiece, Chess.Piece);

  SteppingPiece.prototype.moves = function () {
    var moves = [];

    this.moveDiffs().forEach(function (diff) {
      new_pos = [parseInt(this.pos[0]) + parseInt(diff[0]), parseInt(this.pos[1]) + parseInt(diff[1])];
      if (this.board.onBoard(new_pos)) {
        moves.push(new_pos);
      }
      
      if (this.board.occupied(new_pos) &&
            this.board.pieceAt(new_pos).color === this.color) {
        moves.pop();
      }
    }.bind(this))

    return moves;
  }
})();
