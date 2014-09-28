(function() {
  var Chess = window.Chess = (window.Chess || {})

  var Piece = Chess.Piece = function(color, board) {
    this.color = color
    this.board = board
  }
  
  Piece.prototype.move = function() {
    // overwritten for more complicated move logic (i.e. pawn)
    
    if (this.canSlide) {
      
    }
  };
  
  Piece.prototype.isValidMove = function() {
    return true;
  }
  
  Piece.prototype.canSlide = false;
})()