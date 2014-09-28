(function() {
  var Chess = window.Chess = (window.Chess || {})

  var Bishop = Chess.Bishop = function(color, board) {
    Chess.Piece.call(this, color, board)
  }
  
  Chess.utils.inherits(Chess.Piece, Bishop);
  
  Bishop.prototype.DELTAS = [
    [1, 1],
    [-1, 1],
    [1, -1],
    [-1, -1]
  ]
  
  Bishop.prototype.canSlide = true;
  
})()