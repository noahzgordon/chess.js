(function() {
  var Chess = window.Chess = (window.Chess || {})

  var Piece = Chess.Piece = function(color, pos, board) {
    this.color = color;
    this.pos = pos;
    this.board = board;
    this.validMoves = [];
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
        var newPiece = board.pieceAt(newPos);
      
        if (board.isValidPos(newPos) && !(newPiece && newPiece.color == piece.color)) {
          movesArr.push(newPos);
        }
      })
    }
    
    this.validMoves = movesArr;
  };
  
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