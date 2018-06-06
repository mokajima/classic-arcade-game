// Enemies our player must avoid
var Enemy = function(y) {

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';

  // The initial position of the enemy
  this.x = -101 * 3;
  this.y = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {

  // The image/sprite for the player, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/char-boy.png';

  // The initial position of the player
  this.x = 101 * 2; // 3th column
  this.y = 83 * 5 - 83 / 2; // 6th row
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * @description Move the player according to the user input
 * @param {string} key - The key pressed
 */
Player.prototype.handleInput = function(key) {

  if ('left' === key) {

    if (this.x) {
      this.x -= 101;
    }

  } else if ('up' === key) {

    if (41.5 === this.y) {

    } else {
      this.y -= 83;
    }

  } else if ('right' === key) {

    if (404 !== this.x) {
      this.x += 101;
    }

  } else if ('down' === key) {

    if (373.5 !== this.y) {
      this.y += 83;
    }

  }

};

// Instantiate objects
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

for (var i = 0; i < 6; i++) {

  // Set the y coordinate of the enemy
  const y = 83 * (i % 3 + 1) - 83 / 2;

  allEnemies[i] = new Enemy(y);
}

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
