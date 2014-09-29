(function() {
  var Chess = window.Chess = (window.Chess || {})

  var Queen = Chess.Queen = function(color, pos, board) {
    Chess.Piece.call(this, color, pos, board)
  }
  
  Chess.utils.inherits(Chess.Piece, Queen);
  
  Queen.prototype.DELTAS = [
    [0, 1],
    [1, 0],
    [1, 1],
    [-1, 1],
    [-1, 0],
    [0, -1],
    [1, -1],
    [-1, -1]
  ]
  
  Queen.prototype.canSlide = true;
  
  Queen.prototype.pieceName = "queen";
  
})()