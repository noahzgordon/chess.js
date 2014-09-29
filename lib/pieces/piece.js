(function() {
  var Chess = window.Chess = (window.Chess || {})

  var Piece = Chess.Piece = function(color, pos, board) {
    this.color = color;
    this.pos = pos;
    this.board = board;
    this.validMoves = [];
  }
  
  Piece.prototype.resetValidMoves = function() {
    var pos;
    this.validMoves = [];
    
    if (this.canSlide) {
      this.DELTAS.forEach(function(delta){
        // add spaces continuing in each direction
      })
    } else {
      
    }
  };
  
  Piece.prototype.isValidMove = function(pos) {
    this.validMoves.forEach(function(valid_pos) {
      if (valid_pos[0] == pos[0] && valid_pos[1] == pos[1]) {
        return true;
      }
    });
    
    return false;
  };
  
  Piece.prototype.canSlide = false;
})()