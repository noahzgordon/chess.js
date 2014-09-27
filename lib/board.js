(function() {
  var Chess = window.Chess = (window.Chess || {})

  var Board = Chess.Board = function() {
    this.grid = Board.setGrid();
  }
  
  Board.PIECE_ORDER = [
    Chess.Rook,
    Chess.Knight,
    Chess.Bishop,
    Chess.Queen,
    Chess.King,
    Chess.Bishop,
    Chess.Knight,
    Chess.Rook
  ]
  
  Board.setGrid = function() {
    grid = new Array
    
    for(var i = 0; i < 8; i++) {
      grid.push(new Array)
      for (var j = 0; j < 8; j++) {
        if (i === 0) {
          grid[i].push(new Board.PIECE_ORDER[j]("black"))
        } else if (i === 1) {
          grid[i].push(new Chess.Pawn("black"))
        } else if (i === 6) {
          grid[i].push(new Chess.Pawn("white"))
        } else if (i === 7) {
          grid[i].push(new Board.PIECE_ORDER[j]("white"))
        } else {
          grid[i].push(false)
        }
      }
    }
    
    return grid
  }
  
  Board.prototype.pieceAt = function(pos) {
    // takes an X, Y coordinate set with origin at bottom-left
    var x = pos[0]
    var y = 7 - pos[1]
    
    return this.grid[y][x];
  }
  
  
})()