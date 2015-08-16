(function () {
  window.Chess = window.Chess || {};
  var Piece = Chess.Piece = function (params) {
    this.board = params.board;
    this.color = params.color;
    this.pos = params.pos;
    this.moved = false;
  }

  Piece.prototype.inRangeOfEnemy = function () {
    if (this.color === 'white') {
      var enemyColor = 'black';
    } else {
      var enemyColor = 'white';
    }
    this.board.pieces(enemyColor).forEach(function(piece) {
      if (piece.validMoves.includes(this.pos)) {
        return true;
      }
    })
    return false;
  }

  Piece.prototype.dup = function (dupBoard) {
    //we'll get here
  }

  Piece.prototype.validMoves = function () {
    var validMoves = [];

    this.moves().forEach(function(move) {
      if (this.moveIntoCheck(move) === false) {
        validMoves.push(move);
      }
    }.bind(this))
    return validMoves;
  }

  Piece.prototype.moveIntoCheck = function (move) {
    //we'll get here
    return false;
  }

  Piece.prototype.sumPositions = function (pos1, pos2) {
    return [
      parseInt(pos1[0]) + parseInt(pos2[0]),
      parseInt(pos1[1]) + parseInt(pos2[1])
    ];
  }
})();
