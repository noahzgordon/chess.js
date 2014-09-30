(function() {
  var Chess = window.Chess = (window.Chess || {})

  var Knight = Chess.Knight = function(color, pos, board) {
    Chess.Piece.call(this, color, pos, board)
  }
  
  Chess.utils.inherits(Chess.Piece, Knight);
  
  Knight.prototype.DELTAS = [
    [1, 2],
    [2, 1],
    [-1, 2],
    [-2, 1],
    [1, -2],
    [2, -1],
    [-2, -1],
    [-1, -2]
  ]
  
  Knight.prototype.pieceName = "knight";
  
  Knight.prototype.class = Knight;
  
})()