(function () {
  window.Chess = window.Chess || {};
  var Pawn = Chess.Pawn = function (params) {
    Chess.Piece.call(this, params);
    this.name = 'pawn';
    this.normalMove = [1, 0];
    this.initialMove = [2, 0];
    this.attackMoves = [[1, 1], [1, -1]];
  }

  Chess.Utils.inherits(Pawn, Chess.Piece)

  Pawn.prototype.moves = function () {
    var moves = [];
    if (this.color === 'black') {
      var modifier = 1;
    } else {
      var modifier = -1;
    }
    var normalMove = this.sumPositions(
      [this.normalMove[0] * modifier, this.normalMove[1] * modifier], this.pos)
    if (this.board.occupied(normalMove) === false) {
      moves.push(normalMove)
    }

    var initialMove = this.sumPositions(
      [this.initialMove[0] * modifier, this.initialMove[1] * modifier], this.pos)
    if (this.board.occupied(initialMove) === false &&
          moves.includes(normalMove) === true &&
            this.moved === false) {
      moves.push(initialMove)
    }

    this.attackMoves.forEach(function (move) {
      var potentialPos = this.sumPositions(
        [move[0] * modifier, move[1] * modifier], this.pos);
      if (this.board.occupied(potentialPos) &&
          this.board.pieceAt(potentialPos).color != this.color) {
        moves.push(potentialPos);
        }
    }.bind(this))

    var movesToReturn = [];
    moves.forEach(function(move) {
      if (this.board.onBoard(move) === true) {
        movesToReturn.push(move);
      }
    }.bind(this))

    return movesToReturn;
  }
})();
