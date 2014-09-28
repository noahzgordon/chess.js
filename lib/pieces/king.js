(function() {
  var Chess = window.Chess = (window.Chess || {})

  var King = Chess.King = function(color, board) {
    Chess.Piece.call(this, color, board)
  }
  
  Chess.utils.inherits(Chess.Piece, King);
  
  King.prototype.DELTAS = [
    [0, 1],
    [1, 0],
    [1, 1],
    [-1, 1],
    [-1, 0],
    [0, -1],
    [1, -1],
    [-1, -1]
  ]
  
})()