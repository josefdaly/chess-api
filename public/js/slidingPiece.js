(function () {
  window.Chess = window.Chess || {};
  var SlidingPiece = Chess.SlidingPiece = function () {}

  Chess.Utils.inherits(SlidingPiece, Chess.Piece);

  SlidingPiece.prototype.moves = function () {
    var moves = []
    var that = this;
    this.moveDirs().forEach(function(dir) {
      moves = moves.concat(that.explore(dir));
      debugger
    })

    return moves;
  }

  SlidingPiece.prototype.explore = function (dir) {
    var pos = [parseInt(this.pos[0]), parseInt(this.pos[1])]
    var positions = []

    while (this.board.onBoard([pos[0] + dir[0], pos[1] + dir[1]])) {
      pos[0] = dir[0] + pos[0]
      pos[1] = dir[1] + pos[1]
      if (this.board.occupied(pos)) {
        if (this.board.pieceAt(pos).color === this.color) {
          break
        } else {
          positions.push([pos[0], pos[1]])
          break
        }
      }
      positions.push([pos[0], pos[1]])
    }

    return positions
  }
})();
