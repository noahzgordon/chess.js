(function() {
  var Chess = window.Chess = (window.Chess || {})

  var Rook = Chess.Rook = function(color, pos, board) {
    Chess.Piece.call(this, color, pos, board)
  }
  
  Chess.utils.inherits(Chess.Piece, Rook);
  
  Rook.prototype.DELTAS = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1]
  ]
  
  Rook.prototype.canSlide = true;
  
  Rook.prototype.pieceName = "rook";
  
  Rook.prototype.class = Rook;
  
})()