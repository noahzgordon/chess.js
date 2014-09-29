(function() {
  var Chess = window.Chess = (window.Chess || {});

  var Board = Chess.Board = function() {
    this.pieces = [];
    this.captures = [];
    this.grid = Board.setGrid(this);
  };
  
  Board.PIECE_ORDER = [
    Chess.Rook,
    Chess.Knight,
    Chess.Bishop,
    Chess.Queen,
    Chess.King,
    Chess.Bishop,
    Chess.Knight,
    Chess.Rook
  ];
  
  Board.setGrid = function(board) {
    var grid = new Array;
    var piece, pos;
    
    for(var i = 0; i < 8; i++) {
      grid.push(new Array);
      for (var j = 0; j < 8; j++) {
        pos = [j, i - 7]
        if (i === 0) {
          piece = new Board.PIECE_ORDER[j]("black", pos, board)
          board.pieces.push(piece);
          grid[i].push(piece);
        } else if (i === 1) {
          piece = new Chess.Pawn("black", pos, board);
          board.pieces.push(piece);
          grid[i].push(piece);
        } else if (i === 6) {
          piece = new Chess.Pawn("white", pos, board)
          board.pieces.push(piece);
          grid[i].push(piece);
        } else if (i === 7) {
          piece = new Board.PIECE_ORDER[j]("white", pos, board);
          board.pieces.push(piece);
          grid[i].push(piece);
        } else {
          grid[i].push(false);
        }
      }
    }
    
    return grid
  };
  
  Board.prototype.pieceAt = function(pos) {
    // takes an X, Y coordinate set with origin at bottom-left
    var x = pos[0];
    var y = 7 - pos[1];
    
    return this.grid[y][x];
  };
  
  Board.prototype.setPos = function(pos, obj) {
    var x = pos[0];
    var y = 7 - pos[1];
    
    if (obj instanceof Chess.Piece) {
      obj.pos = pos;
    }
    
    this.grid[y][x] = obj;
  };
  
  Board.prototype.isEmpty = function(pos) {
    return !this.pieceAt(pos);
  };
  
  Board.prototype.isValidPos = function(pos) {
    if (pos[0] < 0 || pos[0] > 7 || pos[1] < 0 || pos[1] > 7) {
      return false;
    } else {
      return true;
    }
  };
  
  Board.prototype.move = function(start_pos, end_pos) {
    var piece = this.pieceAt(start_pos);
    
    if (piece && piece.isValidMove(end_pos)) {
      if (this.pieceAt(end_pos)) {
        var captured = this.pieceAt(end_pos);
        this.pieces.splice(this.pieces.indexOf(captured), 1);
        this.captures.push(captured);
      };
      
      this.setPos(start_pos, false);
      this.setPos(end_pos, piece);
    } else {
      return false;
    }
  }
  
})()