/**
 * Get the TAG @canvas by @Class
 * 
 * I use the method @querySelector();
 */

var canvas = document.querySelector(".canvas");

canvas.width = 400;
canvas.height = 520;

var container = document.querySelector(".container-canvas");

/**
 * Create viriables for the Row and Column of grid
 * And size of square
 */

var rows = 26;
var columns = 20;
var square = 20;
var BLACK = "#424242";
var WHITE = "rgba(255, 255, 255, 0.1)"

/**
 * Create a default variable
 */
var newX = 0;
var newY = 0;

var i = 0;
var e = 0;
var z = 0;
var n = 0;
var b = 0;

var x = 0;
var y = 0;

var gameOver = false;

/**
 * Get the all Form [Z, S, S, T, O, L, I, J]
 * and join the colors of each elements
 */
var PIECES =
[
  [Z, "#E9738C"],
  [S, "#2C9010"],
  [T, "#EB7C2B"],
  [O, "#4D5AA8"],
  [L, "#633184"],
  [I, "#9FB501"],
  [J, "#F15D22"]
];

var score = document.querySelector(".score");

var points = 0;

var buttonStart = document.querySelector(".button-start");

buttonStart.addEventListener("click", start);

function start()
{
  if (getState() == CHANGED)
  {
    return;
  }

  setState(CHANGED);

  if (gameOver == false)
  {
    buttonStart.innerHTML = "Commencer";
  }

  canvas = document.querySelector(".canvas");

  canvas.width = 400;
  canvas.height = 520;

  brush = canvas.getContext("2d");

  /**
 * Create function for draw the squares
 * 
 * @param {axe} x [this is the axe of value X]
 * @param {axe} y [this is the axe of value Y]
 * @param {color} color [color of form]
 */
  function drawSquare(x, y, color)
  {
    brush.fillStyle = color;
    brush.fillRect(x * square, y * square, square, square);
    brush.strokeStyle = WHITE;
    brush.strokeRect(x * square, y * square, square, square);
  }

/**
 * Create the board
 * 
 * The loop is for stocked a number in board and apply the White
 * color for empty square
 */
  var board = [];
  for (i = 0; i < rows; i++)
  {
    board[i] = [];
    for (e = 0; e < columns; e++)
    {
      board[i][e] = BLACK;
    }
  }

/**
 * Create function for draw the board with the function @drawSquare
 */
  function drawBoard()
  {
    for (i = 0; i < rows; i++)
    {
      for (e = 0; e < columns; e++)
      {
      /**
       * Call the function @drawSquare for create a square in board
       * and apply color in all square
       */
      drawSquare(e, i, board[i][e]);
      }
    }
  }

/**
 * Call the method @drawBoard for draw the board in @ViewPort
 */
  drawBoard();

/**
 * Create a function to automatically generate random pieces
 */
  function randomPieces()
  {
    var random = Math.floor(Math.random() * PIECES.length);

    return new Piece(PIECES[random][0], PIECES[random][1]);
  }

  var random = randomPieces();

/**
 * Create Constructor Piece, This is for build an Piece
 * 
 * @param {Pieces} form [description]
 * @param {Color} color [description]
 */
  function Piece(form, color)
  {
    this.form = form;
    this.color = color;
    
    this.formFirst = 0;
    this.formActive = this.form[this.formFirst];

    this.x = 9;
    this.y = -2;
  }

/**
 * Create function for colored square
 * 
 * @param {Color} color of square
 */
  Piece.prototype.fill = function(color)
  {
    for (i = 0; i < this.formActive.length; i++)
    {
      for (e = 0; e < this.formActive.length; e++)
      {
        if (this.formActive[i][e])
        {
          drawSquare(this.x + e, this.y + i, color);
        }
      }
    }
  }

/**
 * Create function for draw piece to the board
 */
  Piece.prototype.draw = function()
  {
    this.fill(this.color);
  }

/**
 * Create function for undraw piece to the board (this is a fake undraw)
 */
  Piece.prototype.unDraw = function()
  {
    this.fill(BLACK);
  }

/**
 * Create functions for move the pieces in the board
 */
  Piece.prototype.moveLeft = function()
  {
    if (!this.collision(-1, 0, this.formActive))
    {
      this.unDraw();
      this.x--;
      this.draw();
    }
  }

  Piece.prototype.moveRight = function()
  {
    if (!this.collision(1, 0, this.formActive))
    {
      this.unDraw();
      this.x++;
      this.draw();
    }
  }

  Piece.prototype.moveDown = function()
  {
    if (!this.collision(0, 1, this.formActive))
    {
      this.unDraw();
      this.y++;
      this.draw();
    }
    else
    {
      this.lock();
      random = randomPieces();
    }
  }

/**
 * Create function for exercising an rotation on the piece
 */

  Piece.prototype.rotation = function()
  {
    var nextPiece = this.form[(this.formFirst + 1) % this.form.length];
    var moving = 0;

    if (!this.collision(0, 0, nextPiece))
    {
      if (this.x > columns/2)
      {
        // moving = -1;
      }
      else
      {
        // moving = 1;
      }
    }

    if (!this.collision(moving, 0, nextPiece))
    {
      this.unDraw();
      this.x += moving;
      this.formFirst = (this.formFirst +1) % this.form.length;
      this.formActive = this.form[this.formFirst];
      this.draw();
    }
  }

  Piece.prototype.lock = function()
  {
    for (i = 0; i < this.formActive.length; i++)
    {
      for (e = 0; e < this.formActive.length; e++)
      {
        if (!this.formActive[i][e])
        {
          continue;
        }
      // pieces to lock on top = game over
        if(this.y + i < 0)
        {
        //alert("Game Over");
          gameOver = true;
          break;
        }
        board[this.y + i][this.x + e] = this.color;
      }
    }

    for(i = 0; i < rows; i++)
    {
      var isRow = true;
      for(e = 0; e < columns; e++)
      {
        isRow = isRow && (board[i][e] != BLACK);
      }

      if(isRow)
      {
      // we move down all the rows above it
        for(z = i; z > 1; z--)
        {
          for(b = 0; b < columns; b++)
          {
            board[z][b] = board[z -1][b];
          }
        }
        // the top row board[0][..] has no row above it
        for(n = 0; n < columns; n++)
        {
          board[0][n] = BLACK;
        }

        // icrement the points for the score
        points += 5;
      }
    }
    drawBoard();

    // Update the points
    score.innerHTML = points;
  }

// collision fucntion

  Piece.prototype.collision = function(x, y, piece)
  {
    for(i = 0; i < piece.length; i++)
    {
      for(e = 0; e < piece.length; e++)
      {
      // if the square is empty, we skip it
        if(!piece[i][e])
        {
          continue;
        }
      
      // coordinates of the piece after movement
        newX = this.x + e + x;
        newY = this.y + i + y;
        
      // conditions
        if(newX < 0 || newX >= columns || newY >= rows)
        {
          return true;
        }
      
      // skip newY < 0; board[-1] will crush our game
        if(newY < 0)
        {
          continue;
        }
      
      // check if there is a locked piece alrady in place
        if( board[newY][newX] != BLACK)
        {
          return true;
        }
      }
    }
    return false;
  }

/**
 * Control of the Piece with the Keyboard
 */

  document.addEventListener("keydown", TouchHandle);

  function TouchHandle(event)
  {
      if (!gameOver)
      {
        if(event.keyCode == 37)
        {
          random.moveLeft();
          //dropStart = Date.now();
        }
        else if(event.keyCode == 38)
        {
          random.rotation();
          //dropStart = Date.now();
        }
        else if(event.keyCode == 39)
        {
          random.moveRight();
          //dropStart = Date.now();
        }
        else if(event.keyCode == 40)
        {
          random.moveDown();
        }
      }
  }

// drop the piece every 1sec
  var dropStart = Date.now();
  function drop()
  {
    var now = Date.now();
    var milisecondes = now - dropStart;

    if(milisecondes > 1000)
    {
        random.moveDown();
        dropStart = Date.now();
    }
    if (!gameOver)
    {
      requestAnimationFrame(drop);
    }
    else
    {
      buttonStart.innerHTML = "Recommencer";
      setState(UNCHANGED);

      
      /**
       * var date = new Date();
       * 
       * element.innerHTML = date.toLocaleTimeString();
       */
    }
  }

  drop();
}

var state = 0;

var CHANGED = 1;
var UNCHANGED = 2;

function setState(state)
{
  this.state = state;
}

function getState()
{
  return state;
}