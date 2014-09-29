(function() {
  var Chess = window.Chess = (window.Chess || {})

  var Pawn = Chess.Pawn = function(color, pos, board) {
    Chess.Piece.call(this, color, pos, board)
  }
  
  Chess.utils.inherits(Chess.Piece, Pawn);
  
})()