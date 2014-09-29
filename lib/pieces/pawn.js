(function() {
  var Chess = window.Chess = (window.Chess || {})

  var Pawn = Chess.Pawn = function(color, pos, board) {
    Chess.Piece.call(this, color, pos, board)
  }
  
  Chess.utils.inherits(Chess.Piece, Pawn);
  
  Pawn.prototype.resetValidMoves = function() {
    var newMoves = [];
    var pawn = this;
    var marchSpace, jumpSpace, captureSpaces, startRow;
    if (this.color === "white") {
      startRow = 1;
      marchSpace = [this.pos[0], this.pos[1] + 1];
      jumpSpace = [this.pos[0], this.pos[1] + 2];
      captureSpaces = [
        [this.pos[0] - 1, this.pos[1] + 1],
        [this.pos[0] + 1, this.pos[1] + 1]
      ]
    } else {
      startRow = 6;
      marchSpace = [this.pos[0], this.pos[1] - 1];
      jumpSpace = [this.pos[1], this.pos[1] - 2];
      captureSpaces = [
        [this.pos[0] - 1, this.pos[1] - 1],
        [this.pos[0] + 1, this.pos[1] - 1]
      ]
    }
    
    if (this.board.isValidPos(marchSpace) && !this.board.pieceAt(marchSpace)) {
      newMoves.push(marchSpace);
      
      if (this.board.isValidPos(jumpSpace) && 
          !this.board.pieceAt(jumpSpace) && 
          this.pos[1] == startRow) {
        newMoves.push(jumpSpace);
      }
    }
    
    captureSpaces.forEach(function(space) {
      if (pawn.board.isValidPos(space)) {
        var capturePiece = pawn.board.pieceAt(space)
        if (capturePiece && capturePiece.color !== pawn.color) {
          newMoves.push(space);
        }
      }
    });
    
    this.validMoves = newMoves;
  }
  
  Pawn.prototype.pieceName = "pawn";
  
})()