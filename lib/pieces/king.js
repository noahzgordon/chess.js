(function() {
  var Chess = window.Chess = (window.Chess || {})

  var King = Chess.King = function(color, pos, board) {
    Chess.Piece.call(this, color, pos, board)
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
  
  King.prototype.pieceName = "king";
  
})()