(function () {
  window.Chess = window.Chess || {};

  var GameView = Chess.GameView = function ($el) {
    this.$el = $el
    this.createBoardElements();
    this.game = new Chess.Game();
    this.renderPieces();
    this.$startSquare = null;
    this.$endSquare = null;
    this.bindEvents();
  }

  GameView.prototype.gameLoop = function () {

  }

  GameView.prototype.bindEvents = function () {
    var game = this.game;
    var that = this;

    $('.square').on('click', function (event) {
      var $selected = $(event.currentTarget);

      if (that.$startSquare) {
        that.$endSquare = $selected;
        that.$startSquare.removeClass('start-square');
      } else {
        that.$startSquare = $selected;
        that.$startSquare.addClass('start-square');
      }

      if (that.$startSquare && that.$endSquare) {
        startPos = [that.$startSquare.attr('id')[0], that.$startSquare.attr('id')[1]];
        endPos = [that.$endSquare.attr('id')[0], that.$endSquare.attr('id')[1]];
        var piece = that.game.board.pieceAt(startPos);
        //move piece
        if (that.game.makeMove(startPos, endPos)) {
          that.movePieceView(piece, startPos, endPos);
          that.getAiMove();
        }
        that.$startSquare = null;
        that.$endSquare = null;
      }
    })
  }

  GameView.prototype.getAiMove = function () {
    var moveString = "";
    this.game.moves.forEach(function(move){
      moveString = moveString + move;
    });
    $.ajax({
        type: "GET",
        url: 'http://chess-api.herokuapp.com/next_best/' + moveString,
        crossDomain: true,
        dataType: "json",
        success: function(response) {
            this.performComputerMove(response.bestNext);
        }.bind(this),
        error: function(response) {
            console.log(response);
        }
    });
  }

  GameView.prototype.performComputerMove = function (moveString) {
    var VERT = {
     '8': 0,
     '7': 1,
     '6': 2,
     '5': 3,
     '4': 4,
     '3': 5,
     '2': 6,
     '1': 7
    }
    var HORIZ = {
      'a': 0,
      'b': 1,
      'c': 2,
      'd': 3,
      'e': 4,
      'f': 5,
      'g': 6,
      'h': 7,
    }
    this.game.moves.push(moveString);
    var startPos = [
      VERT[moveString[1]],
      HORIZ[moveString[0]]
    ]
    var endPos = [
      VERT[moveString[3]],
      HORIZ[moveString[2]]
    ]
    this.game.board.moveBang(startPos, endPos);
    this.movePieceView(this.game.board.pieceAt(endPos), startPos, endPos);
  }

  GameView.prototype.createBoardElements = function () {
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        $newSquare = $('<div></div>')
        $newSquare.addClass('square')
        $newSquare.attr('id', i + '' + j)
        if ((i + j) % 2 === 1) {
          $newSquare.addClass('odd')
        } else {
          $newSquare.addClass('even')
        }
        $newSquare.appendTo(this.$el)
      }
    }
  }

  GameView.prototype.clearPieces = function () {
    //Remove all piece classes from board dom els
    this.$el.empty();
    this.createBoardElements();
  }

  GameView.prototype.renderPieces = function () {
    //Set piece classes to board dom els based on Game.board
    var gameGrid = this.game.board.grid;

    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        var space = gameGrid[i][j];
        if (space != 0) {
          $('#' + i + '' + j).addClass(space.color + '-' + space.name)
        }
      }
    }
  }


  GameView.prototype.movePieceView = function (piece, startPos, endPos) {
    var pieceClass = piece.color + '-' + piece.name;
    $('#' + startPos[0] + '' + startPos[1]).removeClass(pieceClass);
    var $endSpot = $('#' + endPos[0] + '' + endPos[1])
    var classNames = $endSpot.attr('class').split(' ')

    for (var i = 0; i < classNames.length; i++) {
      if (classNames[i] != 'odd' &&
            classNames[i] != 'even' &&
              classNames[i] != 'square') {
        $endSpot.removeClass(classNames[i])
      }
    }
    $endSpot.addClass(pieceClass);
  }

})();
