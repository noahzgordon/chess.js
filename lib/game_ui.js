(function() {
  var Chess = window.Chess = (window.Chess || {});

  var UI = Chess.UI = function(board) {
    this.board = board;
  };
  
  UI.prototype.installHandlers = function() {
    var board = this.board;
    var updateCaptures = this.updateCaptures.bind(this);
    var updateCheckStatus = this.updateCheckStatus.bind(this);
    
    $(".tile").hover(function() {
      var piece = board.pieceAt(UI.getCoords($(this)));
      if (piece && board.turn === piece.color) {
        $(this).addClass("hovered")
      }
    }, function() {
      var piece = board.pieceAt(UI.getCoords($(this)));
      if (piece && board.turn === piece.color) {
        $(this).removeClass("hovered")
      }
    })
    
    $(".board").click(".tile", function(event) {
      $firstTile = $(event.target)
      
      if ($firstTile.hasClass("hovered")) {
        var piece = board.pieceAt(UI.getCoords($firstTile));
        $firstTile.addClass("selected")
        
        piece.validMoves.forEach(function(pos) {
          $(".board")
            .find("[data-id='" + pos[0] + "-" + pos[1] + "']")
            .addClass("potential");
        })
        
        $(".board").on("click.sec", ".tile", function(event) {
          $secondTile = $(event.target);
          
          if ($secondTile.hasClass("potential")) {
            var start_pos = UI.getCoords($firstTile);
            var end_pos = UI.getCoords($secondTile);
            
            if (board.move(start_pos, end_pos)) {
              var pieceClass = $firstTile.attr("class");
              $firstTile.removeClass().addClass("tile");
              $secondTile.removeClass().addClass(pieceClass);
              
              $(".turn").html(UI.capitalize(board.turn) + "'s turn")
              updateCaptures(board);
              updateCheckStatus(board);
            }
          }
          
          $(".tile").removeClass("selected potential");
          $(".board").off("click.sec");
          
        });
      } 
    });
  }
  
  UI.prototype.generateBoard = function() {
    $(".white-captured").empty();
    $(".black-captured").empty();
    
    var $board = $("<ul>").addClass("board group");
    $(".board-wrapper").html($board);
    
    for (var i = 0; i < 8; i++) {
      var $row = $("<ul>")
        .addClass("row group")
        .attr("data-id", 7 - i)
      $board.append($row);
      
      for (var j = 0; j < 8; j++) {
        var coords = [j, 7 - i]
        var $tile = $("<li>")
          .addClass("tile")
          .attr("data-id", coords[0] + "-" + coords[1]);
        
        var piece = this.board.pieceAt(coords);
        if (piece) {
          $tile.addClass(piece.pieceName).addClass(piece.color);
        }
        $row.append($tile);
      }
    }
  }
  
  UI.prototype.updateCaptures = function () {
    $whites = $(".white-captured").empty();
    $blacks = $(".black-captured").empty();
    
    this.board.capturedWhites.forEach(function(piece) {
      $div = $("<div>")
        .addClass("capture")
        .addClass(piece.pieceName)
        .addClass(piece.color);
        
      $whites.append($div);
    })
    
    this.board.capturedBlacks.forEach(function(piece) {
      $div = $("<div>")
        .addClass("capture")
        .addClass(piece.pieceName)
        .addClass(piece.color);
        
      $blacks.append($div);
    })
  }
  
  UI.prototype.updateCheckStatus = function() {
    $checkInd = $(".check-indicator")
    
    if (this.board.isInCheckmate("black")) {
      $(".board").fadeOut(400, function() {
        $(".board-wrapper").html("<p>Black is in checkmate. White wins!</p>")
          .append("<a href='#'>Play again?</a>")
        
        $("a").click(function(event) {
          event.preventDefault();
          Chess.newGame();
        })
      });
    } else if (this.board.isInCheckmate("white")) {
      $(".board").fadeOut(400, function() {
        $(".board-wrapper").html("<p>White is in checkmate. Black wins!</p>")
          .append("<a href='#'>Play again?</a>")
          
        $("a").click(function(event) {
          event.preventDefault();
          Chess.newGame();
        })
      });
    } else if (this.board.isInCheck("black")) {
      $checkInd.html("Black is in check!")
    } else if (this.board.isInCheck("white")) {
      $checkInd.html("White is in check!")
    } else {
      $checkInd.empty();
    }
  }
  
  UI.getCoords = function(tile) {
    return tile.data("id").split("-").map(Math.floor);
  }
  
  UI.capitalize = function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
})();