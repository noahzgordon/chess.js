(function() {
  var Chess = window.Chess = (window.Chess || {});

  var Board = Chess.Board = function(grid, isDup) {
    this.pieces = [];
    this.capturedWhites = [];
    this.capturedBlacks = [];
    this.turn = "white"
    
    this.isDup = isDup ? true : false
    this.grid = grid ? grid : Board.setGrid(this);
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
  
  Board.prototype.isInCheck = function(color) {
    var board = this;
    
    var king = _(this.pieces).find(function(piece) {
      return piece.color === color && piece.pieceName === "king";
    })
    
    var enemyPieces = _(this.pieces).filter(function(piece) {
      return piece.color !== color;
    })
    
    // perhaps a little convoluted; consider refactoring
    return _(enemyPieces).some(function(piece) {
      return piece.validMoves.some(function(validPos) {
        return validPos[0] === king.pos[0] && validPos[1] === king.pos[1]; 
      })
    })
    
  }
  
  Board.prototype.isInCheckmate = function(color) {
    if (!this.isInCheck(color)) {
      return false;
    }
    
    var alliedPieces = _(this.pieces).filter(function(piece) {
      return piece.color === color;
    })
    
    return !_(alliedPieces).some(function(piece) {
      return piece.validMoves.length > 0;
    })
  }
  
  Board.prototype.move = function(start_pos, end_pos) {
    var piece = this.pieceAt(start_pos);
    
    if (piece && piece.isValidMove(end_pos)) {
      if (this.pieceAt(end_pos)) {
        var captured = this.pieceAt(end_pos);
        this.pieces.splice(this.pieces.indexOf(captured), 1);
        if (captured.color === "white") {
          this.capturedWhites.push(captured);
        } else {
          this.capturedBlacks.push(captured);
        }
      };
      
      this.setPos(start_pos, false);
      this.setPos(end_pos, piece);
      
      this.switchTurn();
      this.resetAllMovesets();
      
      if (this.isInCheckmate("black") || this.isInCheckmate("white")) {
        alert("CHECKMATE")
      } else if (this.isInCheck("black") || this.isInCheck("white")) {
        alert("CHECK")
      }
      
      return true;
    } else {
      return false;
    }
  }
  
  Board.prototype.switchTurn = function() {
    this.turn = (this.turn === "white") ? "black" : "white";
  }
  
  Board.prototype.dup = function() {
    var new_board = new Board([], true);
    var new_peice;
    
    for (var i = 0; i < 8; i++) {
      new_board.grid.push([]);
      for (var j = 0; j < 8; j++) {
        new_board.grid[i].push(false);
      }
    }
    
    this.pieces.forEach(function(piece) {
      new_piece = new piece.class(piece.color, piece.pos, new_board);
      new_board.setPos(piece.pos, new_piece);
      new_board.pieces.push(new_piece);
    })

    return new_board;
  }
  
  Board.prototype.resetAllMovesets = function() {
    this.pieces.forEach(function(piece) {
      piece.resetValidMoves();
    })
  }
  
  Board.setGrid = function(board) {
    var grid = new Array;
    var piece, pos;
    
    for(var i = 0; i < 8; i++) {
      grid.push(new Array);
      for (var j = 0; j < 8; j++) {
        pos = [j, 7 - i]
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
  
})()