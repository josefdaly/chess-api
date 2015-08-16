(function () {
  window.Chess = window.Chess || {};

  var Game = Chess.Game = function ($el) {
    this.board = new Chess.Board({setup: 'true'});
    this.current_player = 'white';
    this.moves = [];
  }

  Game.prototype.rightColor = function (pos) {
    return ($('#' + pos).attr('color') === this.current_player);
  }

  Game.prototype.switchPlayer = function () {
    if (this.current_player === 'white') {
      this.current_player = 'black'
    } else {
      this.current_player = 'white'
    }
  }

  Game.prototype.saveMove = function (startPos, endPos) {
    var VERT = {
     '0': '8',
     '1': '7',
     '2': '6',
     '3': '5',
     '4': '4',
     '5': '3',
     '6': '2',
     '7': '1'
    }
    var HORIZ = {
      '0': 'a',
      '1': 'b',
      '2': 'c',
      '3': 'd',
      '4': 'e',
      '5': 'f',
      '6': 'g',
      '7': 'h',
    }
    this.moves.push(
      HORIZ[startPos[1]] +
      VERT[startPos[0]] +
      HORIZ[endPos[1]] +
      VERT[endPos[0]]
    )
  }

  Game.prototype.makeMove = function (startPos, endPos) {
    if (this.board.move(startPos, endPos, this.current_player)) {
      debugger
      this.saveMove(startPos, endPos);
      this.switchPlayer();
      this.game
      return true;
    } else {
      return false;
    }
  }
})();
