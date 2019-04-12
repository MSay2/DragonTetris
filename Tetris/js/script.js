/**
 * Get the TAG @canvas by @Class
 * 
 * I use the method @querySelector();
 */

var canvas = document.querySelector(".canvas");

/**
 * Define an height and width of @Canvas
 */
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
  [L, "#6A1B9A"],
  [I, "#9FB501"],
  [J, "#F15D22"]
];

/**
 * Get @DIV tag for yhe Score, the Hours, the Game  Over message
 */
var score = document.querySelector(".score");
var hours = document.querySelector(".hours-computer");
var gameOverMessage = document.querySelector(".gameover-message");

/**
 * This is for the @SVG (Dragon Ball)
 */
var dragonball = document.querySelector(".dragon-ball");


/**
 * Create variable and instanciate the @Date class
 */
var date = new Date();

/**
 * Write a default value for the hours, the minutes and the seconds of this days
 */
hours.innerHTML = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

/**
 * Initiate a time manager to run every 1 second 
 */
setInterval(showHours, 1000);

/**
 * Get the hours, minutes and seconds of the days
 */
function showHours()
{
  var date = new Date();

  hours.innerHTML = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}

/**
 * Create a default value for the point of the user
 */
var points = 0;

/**
 * Create a default variable to generate variables dynamically
 */
var number = 0;

/**
 * I use @querySelectorAll for get the all class with the name @score-saved
 * 
 * @querySelectorAll get the all elements and create a list 
 * 
 */
var scoreSaved = document.querySelectorAll(".score-saved");

/**
 * Create a default variable for not refresh the number than is assigned
 */
var length;

/**
 * Create a variable for get the fist cookie saved
 */
var cook = getCookie("variableGenerated" + 1);

/**
 * See if the first cookie exist
 * 
 * If he exist, insert all points saved in tag @p
 */
if (cook)
{
  scoreSaved[0].innerHTML = getCookie("variableGenerated" + getCookie("size"));
  scoreSaved[1].innerHTML = getCookie("variableGenerated" + (getCookie("size") -1));
  scoreSaved[2].innerHTML = getCookie("variableGenerated" + (getCookie("size") -2));
  scoreSaved[3].innerHTML = getCookie("variableGenerated" + (getCookie("size") -3));
}
else
{
  console.log("The variable cook is null");
}

/**
 * Create a variable for initiate a dificulty
 */

var dificulty;

/**
 * Get the start button in HTML
 */
var buttonStart = document.querySelector(".button-start");

/**
 * Add a listener for listen the click of the user
 * And execute the start function
 */
buttonStart.addEventListener("click", start);

function start()
{  
  /**
   * Add of this condition for returned this function is nothing
   * This is for stoped this function and not executing this function
   */
  if (getState() == CHANGED)
  {
    return;
  }

  /**
   * Set my variable @state and modifying it
   */
  setState(CHANGED);

  /**
   * After modifying my variable @state use another condition
   * this will allow me to put my elements at an initial value
   */
  if (getState() == CHANGED)
  {
    buttonStart.innerHTML = "";
    buttonStart.innerHTML = "Commencer";

    gameOverMessage.style.opacity = "0";
    gameOverMessage.style.visibility = "hidden";

    dragonball.style.opacity = "0";
    dragonball.style.visibility = "hidden";
  }

  /**
   * @brush is returned on the drawing contexte of Canvas
   */
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

  // Create a function for blocked an form

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

    // This is for a full line
    for(i = 0; i < rows; i++)
    {
      var isRow = true;
      for(e = 0; e < columns; e++)
      {
        isRow = isRow && (board[i][e] != BLACK);
      }

      if(isRow)
      {
      // We move down all the rows above it
        for(z = i; z > 1; z--)
        {
          for(b = 0; b < columns; b++)
          {
            board[z][b] = board[z -1][b];
          }
        }
        // The top row board[0][..] has no row above it
        for(n = 0; n < columns; n++)
        {
          board[0][n] = BLACK;
        }

        // Increment the points for the score
        points += 5;

        // +1 each time for generate a number (1 then 2 then 3 then 4...etc)
        number++;

        /**
         * Create variable for cookie and appends a viarable @number
         * each time this is generate a new name by JavaScript
         * Example : @variableGenerated1 then @variableGenerated2 then @variableGenerated3 then @variableGenerated4 etc...
         */
        var variable = "variableGenerated" + number; // this is here
      
        /**
         * Then get cookie function and write a new point (score of user)
         * With the new name created by JavaScript (Create a name dynamically)
         */
        setCookie(variable, points, 300);

        /**
         * Then, set a size (number) for the number of cookie saved
         * 
         * Create a size()
         */
        setCookie("size", number, 300);
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
      // if the square is empty
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
        if(event.keyCode == 37) // Arrow Left 
        {
          random.moveLeft();
          //dropStart = Date.now();
        }
        else if(event.keyCode == 38) // Arrow Top
        {
          random.rotation();
          //dropStart = Date.now();
        }
        else if(event.keyCode == 39) // Arrow Right
        {
          random.moveRight();
          //dropStart = Date.now();
        }
        else if(event.keyCode == 40) // Arrow Bottom
        {
          random.moveDown();
        }
      }
  }

// Moving the piece every 1 second
  var dropStart = Date.now();
  var gameOver = false;
  function drop()
  {
    var now = Date.now();
    var milisecondes = now - dropStart;
    if (points > 50)
    {
      dificulty = 2;
    }
    else if (points < 50)
    {
      dificulty = 1;
    }
    if (dificulty == 1)
    {
      if(milisecondes > 1000)
      {
          random.moveDown();
          dropStart = Date.now();
      }
    }
    else if (dificulty == 2)
    {
      if(milisecondes > 100)
      {
          random.moveDown();
          dropStart = Date.now();
      }
    }

    if (!gameOver)
    {
      requestAnimationFrame(drop);
    }
    else
    {
      buttonStart.innerHTML = "Recommencer";
      setState(UNCHANGED);

      gameOverMessage.style.visibility = "visible";
      gameOverMessage.style.opacity = "1";

      dragonball.style.visibility = "visible";
      dragonball.style.opacity = "1";

      /**
       * Refresh a new size (number) 
       */
      length = getCookie("size");
      setCookie("size", length, 300);

      /**
       * Insert the values in tag @p for see the scores of user
       */
      scoreSaved[0].innerHTML = getCookie("variableGenerated" + getCookie("size"));
      scoreSaved[1].innerHTML = getCookie("variableGenerated" + (getCookie("size") -1));
      scoreSaved[2].innerHTML = getCookie("variableGenerated" + (getCookie("size") -2));
      scoreSaved[3].innerHTML = getCookie("variableGenerated" + (getCookie("size") -3));
    }
  }

  drop();
}

/**
 * Create a variable for create a different state
 */
var CHANGED = 1;
var UNCHANGED = 2;

/**
 * Assign a default state to my variable @state
 */
var state = UNCHANGED;

/**
 * This cookie
 */
var pointsOfScore = "points_of_score";

/**
 * Create a setter for the variable @state
 * 
 * @param {Integer} state 
 */
function setState(state)
{
  this.state = state;
}

/**
 * Create a getter for the variable @state
 */
function getState()
{
  return state;
}

function setCookie(cookieName, cookieValue, expiresDays) 
{
  var date = new Date();
  date.setTime(date.getTime() + (expiresDays * 24 * 60 * 60 * 1000));

  var expires = "expires=" + date.toGMTString();
  document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

function getCookie(cookieName) 
{
  var name = cookieName + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var list = decodedCookie.split(';');

  for(var i = 0; i < list.length; i++) 
  {
    var cookie = list[i];
    while (cookie.charAt(0) == ' ') 
    {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) == 0) 
    {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return "";
}


// function checkCookie() 
// {
//   var userPoints = getCookie(pointsOfScore);

//   if (userPoints != "") 
//   {
//     alert("Welcome again " + userPoints);
//   } 
//   else
//   {
//     userPoints = prompt("Please enter your name:", "");
//     if (userPoints != "" && userPoints != null) 
//     {
//       setCookie(pointsOfScore, userPoints, 30);
//     }
//   }
// }