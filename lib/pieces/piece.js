(function() {
  var Chess = window.Chess = (window.Chess || {})

  var Piece = Chess.Piece = function Piece(color, pos, board) {
    this.color = color;
    this.pos = pos;
    this.board = board;
    this.validMoves = [];
    this.hasMoved = false
  }
  
  Piece.prototype.resetValidMoves = function() {
    var piece = this;
    var board = piece.board;
    var movesArr = [];
    
    if (this.canSlide) {
      this.DELTAS.forEach(function(delta){
        var stopped = false;
        var newPos = piece.pos
        do {
          var newPos = [newPos[0] + delta[0], newPos[1] + delta[1]]
          
          if (!board.isValidPos(newPos)) {
            stopped = true;
          } else if (board.pieceAt(newPos)) {
            if (board.pieceAt(newPos).color === piece.color) {
              stopped = true;
            } else {
              movesArr.push(newPos);
              stopped = true;
            }
          } else {
            movesArr.push(newPos);
          }
        } while (!stopped);
        
      })
    } else {
      this.DELTAS.forEach(function(delta){
        var newPos = [piece.pos[0] + delta[0], piece.pos[1] + delta[1]]
      
        if (board.isValidPos(newPos)) {
          var newPiece = board.pieceAt(newPos);
          if (!newPiece || (newPiece.color != piece.color)) {   
            movesArr.push(newPos);
          }
        }
      })
    }
    
    this.validMoves = movesArr;
    
    if (!this.board.isDup) {
      this.filterCheckMoves();
    }
  };
  
  Piece.prototype.filterCheckMoves = function() {
    var piece = this

    this.validMoves.forEach(function(validPos) {
      var newBoard = piece.board.dup();
      var newPiece = newBoard.pieceAt(piece.pos)
      newBoard.setPos(newPiece.pos, false);
      newBoard.setPos(validPos, newPiece);
      newBoard.resetAllMovesets();
      
      if (newBoard.isInCheck(newPiece.color)) {
        piece.validMoves = _(piece.validMoves).reject(function(pos) {
          return pos[0] === validPos[0] && pos[1] === validPos[1];
        })
      }
    })
  }
  
  Piece.prototype.isValidMove = function(pos) {
    var isValid = false;
    
    this.validMoves.forEach(function(valid_pos) {
      if (valid_pos[0] === pos[0] && valid_pos[1] === pos[1]) {
        isValid = true;
      }
    });
    
    return isValid;
  };
  
  Piece.prototype.canSlide = false;
})()