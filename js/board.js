(function () {
  window.Chess = window.Chess || {};

  var Board = Chess.Board = function (options) {
    this.grid = new Array(8);
    this.setupBoard();
    this.pieces = [];
    if (options.setup === 'true') {
      this.populateBoard();
    }
  }

  Board.prototype.move = function (startPos, endPos, color) {
    var currentPiece = this.pieceAt(startPos);
    console.log(currentPiece.validMoves().includes(endPos))
    if (currentPiece.validMoves().includes(endPos) === true) {
      this.moveBang(startPos, endPos)
      return true;
    } else {
      alert('INVALID MOVE')
      return false;
    }
  }

  Board.prototype.moveBang = function (startPos, endPos) {
    var currentPiece = this.pieceAt(startPos);
    this.grid[startPos[0]][startPos[1]] = 0;
    this.grid[endPos[0]][endPos[1]] = currentPiece;
    currentPiece.pos = endPos;
    currentPiece.moved = true;
  }

  Board.prototype.onBoard = function (pos) {
    var arr = [0,1,2,3,4,5,6,7]
    if (arr.includes(pos[0]) && arr.includes(pos[1])) {
      return true;
    }
    return false;
  }

  Board.prototype.occupied = function (pos) {
    if (this.onBoard(pos) === false) {
      return false;
    }
    if (this.grid[pos[0]][pos[1]] === 0) {
      return false;
    } else {
      return true;
    }
  }

  Board.prototype.won = function () {
    if (this.checkmate('white') || this.checkmate('black')) {
      return true;
    }
    return false;
  }

  Board.prototype.stalemate = function (color) {
    //check for stalemate
  }

  Board.prototype.pieceAt = function (pos) {
    return this.grid[pos[0]][pos[1]];
  }

  Board.prototype.checkmate = function (color) {
    //check for checkmate
  }

  Board.prototype.inCheck = function (color) {
    //check for check
    // if (color === 'white') {
    //   var opponentColor = 'black';
    // }  else {
    //   var opponentColor = 'white';
    // }
    // var enemyPieces =
    return false;
  }

  Board.prototype.deepDup = function () {
    //dup board and pieces
    var newBoard = jQuery.extend(true, {}, this);

    return newBoard;
  }

  Board.prototype.pieces = function (color) {
    var piecesOf = []
    this.pieces.forEach(function(piece) {
      if (piece.color === color) {
        piecesOf.push(piece)
      }
    })
    return piecesOf;
  }

  Board.prototype.king = function (color) {
    this.pieces(color).forEach(function(piece) {
      if (piece.name === 'king') {
        var king = piece
      }
    })
    return king;
  }

  Board.prototype.setupBoard = function () {
    for (var i = 0; i < 8; i++) {
      this.grid[i] = new Array(8);
    }
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        this.grid[i][j] = 0;
      }
    }
  }

  Board.prototype.populateBoard = function () {
    [['black', 0, 1], ['white', 7, 6]].forEach(function (arr) {
      for (var i = 0; i < 8; i++) {
        this.grid[arr[2]][i] = new Chess.Pawn({
          board: this,
          color: arr[0],
          pos: [arr[2], i]
        })
      }
      this.grid[arr[1]][0] = new Chess.Rook({
        board: this,
        color: arr[0],
        pos: [arr[1], 0]
      })
      this.pieces.push(this.grid[arr[1]][0])
      this.grid[arr[1]][1] = new Chess.Knight({
        board: this,
        color: arr[0],
        pos: [arr[1], 1]
      })
      this.pieces.push(this.grid[arr[1]][1])
      this.grid[arr[1]][2] = new Chess.Bishop({
        board: this,
        color: arr[0],
        pos: [arr[1], 2]
      })
      this.pieces.push(this.grid[arr[1]][2])
      this.grid[arr[1]][3] = new Chess.Queen({
        board: this,
        color: arr[0],
        pos: [arr[1], 3]
      })
      this.pieces.push(this.grid[arr[1]][3])
      this.grid[arr[1]][4] = new Chess.King({
        board: this,
        color: arr[0],
        pos: [arr[1], 4]
      })
      this.pieces.push(this.grid[arr[1]][4])
      this.grid[arr[1]][5] = new Chess.Bishop({
        board: this,
        color: arr[0],
        pos: [arr[1], 5]
      })
      this.pieces.push(this.grid[arr[1]][5])
      this.grid[arr[1]][6] = new Chess.Knight({
        board: this,
        color: arr[0],
        pos: [arr[1], 6]
      })
      this.pieces.push(this.grid[arr[1]][6])
      this.grid[arr[1]][7] = new Chess.Rook({
        board: this,
        color: arr[0],
        pos: [arr[1], 7]
      })
      this.pieces.push(this.grid[arr[1]][7])
    }.bind(this));
  }
})();
