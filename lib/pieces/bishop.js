(function() {
  var Chess = window.Chess = (window.Chess || {})

  var Bishop = Chess.Bishop = function(color, pos, board) {
    Chess.Piece.call(this, color, pos, board)
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